define(["d3", "d3dot", "palette"], function (d3, d3dot, palette) {
    var svg, main;
    return {
      init: function () {
        svg = d3.select("body").select("#graph").append("svg");
        main = svg.append("g");
      },
      draw: function (source) {
        var stage = d3dot.generate(source);

        var width = stage.main.shapes[0].points[2][0],
          height = stage.main.shapes[0].points[2][1];

        svg
          .transition()
          .delay(150)
          .duration(500)
          .attr("width", width + "px")
          .attr("height", height + "px")
          .select("g")
          .attr("transform", "translate(0," + height + ")");

        var groups = main.selectAll("g").data(stage.groups, function (d) {
          return d.id;
        });
        var entering = groups.enter().append("g").attr("class", function (d) {
          return d.class
        });
        entering.append("title").text(function (d) {
          return d.id
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
              return [e.key, e.value].join(':')
            }).join(';')
          });

        var labels = groups.selectAll("text").data(function (d) {
          return d.labels
        })
        labels.enter().append("text");
        labels
          .transition()
          .delay(150)
          .duration(900)
          .attr("x", function (d) {
            return d.x
          })
          .attr("y", function (d) {
            return -d.y
          })
//            .attr("style", function(d) {return d.style.map(function(e){return [e.key,e.value].join(':')}).join(';')})
          .text(function (d) {
            return d.text
          });
      }
    }
  }
);