define(["d3", "palette", "transitions/default"], function (d3, palette, defaults) {
    var svg, main;
    var order = {
      digraph: 0,
      subgraph: 1,
      node: 2,
      relation: 3
    };
    var transitions = defaults;

    function calculateSizes(main) {
      var margin = 4,
        boundingWidth = main.shapes[0].points[2][0] + margin*2,
        boundingHeight = main.shapes[0].points[2][1] + margin*2,
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
        width: width,
        height: height,
        htranslate: htranslate,
        vtranslate: vtranslate,
        scaleWidth: scaleWidth,
        scaleHeight: scaleHeight,
        style: main.shapes[0].style
      };
    }

    var labelAttributer = function() {
      this
        .attr("x", function (d) {
          return d.x;
        })
        .attr("y", function (d) {
          return -d.y;
        })
        .text(function (d) {
          return d.text;
        });

      this.each(function(d) {
        var self = d3.select(this);
        d.style.map(function(e) {
          switch (e.key) {
            case "stroke":
              return {key: "color", value: e.value};
            case "font-size":
              return {key: e.key, value: e.value + "px"};
            default:
              return e;
          }
        }).forEach(function(e) {
          self.style(e.key, e.value);
        });
      });
    };

    return {
      init: function (element) {
        svg = d3.select(element).append("svg")
          .attr("version", 1.1)
          .attr("xmlns", "http://www.w3.org/2000/svg");
        svg.append("style")
          .attr("type", "text/css")
          .text('path {fill: transparent} text {text-anchor: middle; font-family:"Times-Roman",serif; font-size: 10pt}');
        svg.append("polygon").attr("stroke", "none");
        main = svg.append("g").append("g");
      },
      svg: function () {
        return svg.node().parentNode.innerHTML;
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

        transitions.document(svg, function() {
          this
            .attr("width", sizes.width + "pt")
            .attr("height", sizes.height + "pt")
            .attr("viewBox", area.join(' '))
            .select("g")
            .attr("transform", "scale(" + sizes.scaleWidth + " " + sizes.scaleHeight + ")" +
              " " + "translate(" + sizes.vtranslate + "," + sizes.htranslate + ")");
        });

        var polygon = svg.select("polygon");
        transitions.canvas(polygon, function() {
          this
            .attr("points", function () {
              return [[0,0],[0,sizes.height],[sizes.width,sizes.height],[sizes.width,0]]
                .map(function (e) {
                  return e.join(",");
                }).join(" ");
            });
          var self = this;
          sizes.style.forEach(function(e) {
            self.style(e.key, e.value);
          });
        });

        var label = main.selectAll("text")
          .data(stage.main.labels);
        label.enter().append("text");
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

        transitions.nodes(entering.filter(".node"), function() {
          this.style("opacity", 1.0);
        });
        transitions.relations(entering.filter(".relation"), function() {
          this.style("opacity", 1.0);
        });
        transitions.exits(groups.exit(), function() {
          this.remove();
        });

        groups.sort(function (a, b) {
          return order[a.class] - order[b.class];
        });

        var shapes = groups.selectAll("path").data(function (d) {
            return d.shapes;
          }, function (d, i) {
            return [d.shape, i].join('-');
          }
        );
        shapes.enter().append("path");
        transitions.shapes(shapes, function() {
          this
            .attr("d", function (d) {
              var shape = d.shape;
              return palette[shape](d);
            })
            .attr("style", function (d) {
              return d.style.map(function (e) {
                return [e.key, e.value].join(':');
              }).join(';');
            });
        });

        var labels = groups.selectAll("text").data(function (d) {
          return d.labels;
        });
        labels.enter().append("text");
        transitions.labels(labels, labelAttributer);
      }
    };
  }
);