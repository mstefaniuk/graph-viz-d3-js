define(["../../lib/d3/d3", "palette"], function (d3, palette) {
    var svg, main;
    var order = {
      digraph: 0,
      subgraph: 1,
      node: 2,
      relation: 3
    };
    return {
      init: function () {
        svg = d3.select("body").select("#graph").append("svg");
        main = svg.append("g");
      },
      draw: function (stage) {
        var margin = 2,
          boundingWidth = stage.main.shapes[0].points[2][0] + margin*2,
          boundingHeight = stage.main.shapes[0].points[2][1] + margin*2,
          htranslate = stage.main.shapes[0].points[2][1] + margin,
          vtranslate = margin,
          size = stage.main.size || [boundingWidth, boundingHeight];
        var oversized = boundingWidth > size[0] || boundingHeight > size[1];
        var scaleWidth = oversized ? size[0] / boundingWidth : 1;
        var scaleHeight = oversized ? size[1] / boundingHeight : 1;
        var ratio = scaleHeight > scaleWidth ? scaleHeight = scaleWidth : scaleWidth = scaleHeight;
        var height = boundingHeight * ratio;
        var width = boundingWidth * ratio;

        svg
          .transition()
          .delay(150)
          .duration(700)
          .attr("width", width + "pt")
          .attr("height", height + "pt")
          .attr("viewBox", [0, 0, width, height].join(' '))
          .select("g")
          .attr("transform", "scale(" + scaleWidth + " " + scaleHeight + ")"+" "+"translate(" + vtranslate + "," + htranslate + ")");

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
        entering.filter(".node")
          .style("opacity", 0.0)
          .transition()
          .delay(150)
          .duration(900)
          .style("opacity", 1.0);
        entering.filter(".relation")
          .style("opacity", 0.0)
          .transition()
          .delay(150)
          .duration(900)
          .style("opacity", 1.0);

        groups.exit()
          .transition()
          .duration(100)
          .style("opacity", 0.0)
          .remove();

        groups.sort(function(a,b){
          return order[a.class]- order[b.class];
        });

        var shapes = groups.selectAll("path").data(function (d) {
            return d.shapes;
          }, function (d, i) {
            return [d.shape, i].join('-');
          }
        );
        shapes.enter().append("path");
        shapes
          .transition()
          .delay(150)
          .duration(900)
          .attr("d", function (d) {
            var shape = d.shape;
            return palette[shape](d);
          })
          .attr("style", function (d) {
            return d.style.map(function (e) {
              return [e.key, e.value].join(':');
            }).join(';');
          });

        var labels = groups.selectAll("text").data(function (d) {
          return d.labels;
        });
        labels.enter().append("text");
        labels
          .transition()
          .delay(150)
          .duration(900)
          .attr("x", function (d) {
            return d.x;
          })
          .attr("y", function (d) {
            return -d.y;
          })
          //.attr("text-anchor","middle")
          //.attr("style", function(d) {
          //  return d.style.map(
          //    function(e){
          //      return [e.key,e.value].join(':');
          //    }).join(';');
          //})
          .text(function (d) {
            return d.text;
          });
      }
    };
  }
);