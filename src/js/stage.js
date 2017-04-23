define(["d3", "palette", "transitions/default"], function (d3, palette, defaults) {
    var svg, main, zoom;
    var order = {
      digraph: 0,
      subgraph: 1,
      node: 2,
      relation: 3
    };
    var transitions = defaults;

    function calculateSizes(main) {
      var margin = 4,
        boundingWidth = main.shapes[0].points[2][0] + margin * 2,
        boundingHeight = main.shapes[0].points[2][1] + margin * 2,
        htranslate = main.shapes[0].points[2][1] + margin,
        vtranslate = margin,
        size = main.size || [boundingWidth, boundingHeight];
      var oversized = boundingWidth > size[0] || boundingHeight > size[1];
      var scaleWidth = oversized ? size[0] / boundingWidth : 1;
      var scaleHeight = oversized ? size[1] / boundingHeight : 1;
      var ratio = scaleHeight > scaleWidth ? scaleHeight = scaleWidth : scaleWidth = scaleHeight;
      var height = boundingHeight * ratio;
      var width = boundingWidth * ratio;

      return {
        boundingWidth: boundingWidth,
        boundingHeight: boundingHeight,
        margin: margin,
        width: width,
        height: height,
        htranslate: htranslate,
        vtranslate: vtranslate,
        scaleWidth: scaleWidth,
        scaleHeight: scaleHeight,
        style: main.shapes[0].style
      };
    }

    var labelAttributer = function (selection) {
      selection
        .attr("x", function (d) {
          return d.x;
        })
        .attr("y", function (d) {
          return -d.y;
        })
        .text(function (d) {
          return d.text;
        })
        .attr("text-anchor", function(d){
          return d.anchor;
        });
    };

    function zoomed() {
      svg.select("g")
        .attr('transform', d3.event.transform);
    }

    return {
      init: function (definition) {
        var element = definition.element || definition;
        svg = d3.select(element).append("svg")
          .attr("version", 1.1)
          .attr("xmlns", "http://www.w3.org/2000/svg");
        svg.append("style")
          .attr("type", "text/css")
          .text([
            '.dashed {stroke-dasharray: 5,5}',
            '.dotted {stroke-dasharray: 1,5}',
            '.overlay {fill: none; pointer-events: all}'
          ].join(' '));
        main = svg.append("g").append("g");
        main.append("polygon").attr("stroke", {red: 255, green: 255, blue: 255, opacity: 0});

        if (definition.zoom) {
          var extent = definition.zoom && definition.zoom.extent || [0.1, 10];
          zoom = d3.zoom()
            .scaleExtent(extent)
            .on("zoom", zoomed);

          svg
            .append("rect")
            .attr("class", "overlay")
            .call(zoom);
        }
      },
      svg: function (reset) {
        if (reset) {
          var g = svg.select("g").select("g");
          if (g.node()) {
            g.attr("transform", "translate(0,0)scale(1)");
          }
        }
        return svg.node().parentNode.innerHTML;
      },
      setZoom: function (zoomParams) {
        var g = svg.select("g");
        var k = zoomParams.scale ? zoomParams.scale : d3.zoomTransform().k;
        var [x, y] = zoomParams.translate ? zoomParams.translate : [d3.zoomTransform().x, d3.zoomTransform().y];
        g.call(zoom.transform, d3.zoomIdentity.translate(x, y).scale(k));
      },
      transitions: function (custom) {
        if (custom) {
          transitions = custom;
        } else {
          return transitions;
        }
      },
      draw: function (stage) {
        var sizes = calculateSizes(stage.main);
        var area = [0, 0, sizes.width, sizes.height];

        transitions.document(svg, function (selection) {
          selection
            .attr("width", sizes.width + "pt")
            .attr("height", sizes.height + "pt")
            .attr("viewBox", area.join(' '))
            .select("g")
            .select("g")
            .attr("transform", "scale(" + sizes.scaleWidth + " " + sizes.scaleHeight + ")" +
              " " + "translate(" + sizes.vtranslate + "," + sizes.htranslate + ")");
        });

        var polygon = main.select("polygon").data(stage.main.shapes);
        transitions.canvas(polygon, function (selection) {
          selection
            .attr("points", function () {
              return [
                [-sizes.margin, sizes.margin],
                [-sizes.margin, -sizes.boundingHeight + sizes.margin],
                [sizes.boundingWidth - sizes.margin, -sizes.boundingHeight + sizes.margin],
                [sizes.boundingWidth - sizes.margin, sizes.margin]]
                .map(function (e) {
                  return e.join(",");
                }).join(" ");
            });
        });

        var overlay = svg.select("rect.overlay");
        if (overlay.node()) {
          transitions.canvas(overlay, function (selection) {
            selection
              .attr('width', sizes.width / sizes.scaleWidth)
              .attr('height', sizes.height / sizes.scaleHeight);
          });
        }
        var label = main.selectAll("text")
          .data(stage.main.labels);
        label = label.enter().append("text")
          .merge(label);
        transitions.labels(label, labelAttributer);

        var groups = main.selectAll("g")
          .data(stage.groups, function (d) {
            return d.id;
          });
        var entering = groups.enter()
          .append("g").attr("class", function (d) {
            return d.class;
          });
        entering.append("title").text(function (d) {
          return d.id;
        });

        entering
          .filter(function(d) { return d.url; })
          .append("a")
          .attr("xlink:href", function(d) {return d.url;})
          .attr("xlink:title", function(d) {return d.tooltip;});

        transitions.nodes(entering.filter(".node:empty,.node a"), function (selection) {
          selection.style("opacity", 1.0);
        });
        transitions.relations(entering.filter(".relation"), function (selection) {
          selection.style("opacity", 1.0);
        });
        transitions.exits(groups.exit(), function (selection) {
          selection.remove();
        });

        groups.sort(function (a, b) {
          return order[a.class] - order[b.class];
        });

        var leaves = main
          .selectAll("*")
          .filter(function(d) {
            return this instanceof SVGAElement ||
              (this instanceof SVGGElement && !this.querySelector("a"));
          });
        var shapes = leaves
          .selectAll("path")
          .data(function (d) {
            return d.shapes;
          }, function (d, i) {
            return [d.shape, i].join('-');
          }
        );
        shapes = shapes.enter().append("path")
          .merge(shapes);
        transitions.shapes(shapes, function (selection) {
          selection
            .attr("d", function (d) {
              var shape = d.shape;
              return palette[shape](d);
            });
        });

        var labels = leaves
          .selectAll("text")
          .data(function (d) {
            return d.labels;
          });
        labels = labels.enter().append("text")
          .call(labelAttributer)
          .merge(labels);
        transitions.labels(labels, labelAttributer);
      },
      getImage: function (reset) {
        reset = reset === undefined ? true : reset;
        var svgXml = this.svg(reset);
        var scaleFactor = 1;

        var svgImage = new Image();
        var pngImage = new Image();

        svgImage.onload = function () {
          var canvas = document.createElement("canvas");
          canvas.width = svgImage.width * scaleFactor;
          canvas.height = svgImage.height * scaleFactor;

          var context = canvas.getContext("2d");
          context
            .drawImage(
              svgImage, 0, 0, canvas.width, canvas.height);

          pngImage.src = canvas.toDataURL("image/png");
          pngImage.width = svgImage.width;
          pngImage.height = svgImage.height;
        };

        svgImage.src = "data:image/svg+xml;base64," + btoa(svgXml);
        return pngImage;
      }
    };
  }
);