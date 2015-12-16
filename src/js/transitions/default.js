define([], function() {
  return {
    document: function(selection, canvas) {
      var area = [0, 0, canvas.width, canvas.height];
      var attributer = function() {
        this
          .attr("width", canvas.width + "pt")
          .attr("height", canvas.height + "pt")
          .attr("viewBox", area.join(' '))
          .select("g")
          .attr("transform", "scale(" + canvas.scaleWidth + " " + canvas.scaleHeight + ")" +
            " " + "translate(" + canvas.vtranslate + "," + canvas.htranslate + ")");
      };
      selection
        .transition()
        .delay(150)
        .duration(700)
        .call(attributer);
    },
    canvas: function (svg, canvas) {
      var polygon = svg.select("polygon");
      var attributer = function() {
        this
          .attr("points", function () {
            return [[0,0],[0,canvas.height],[canvas.width,canvas.height],[canvas.width,0]]
              .map(function (e) {
                return e.join(",");
              }).join(" ");
          });
        var self = this;
        canvas.style.forEach(function(e) {
          self.style(e.key, e.value);
        });
      };
      polygon
        .transition()
        .delay(150)
        .duration(900)
        .call(attributer);
    },
    nodes: function (selection) {
      var attributer = function() {
        this
          .style("opacity", 1.0);
      };
      selection
        .style("opacity", 0.0)
        .transition()
        .delay(150)
        .duration(900)
        .call(attributer);
    },
    relations: function (selection) {
      var attributer = function() {
        this
          .style("opacity", 1.0);
      };
      selection
        .style("opacity", 0.0)
        .transition()
        .delay(150)
        .duration(900)
        .call(attributer);
    },
    exits: function (selection) {
      var attributer = function() {
        this
          .style("opacity", 0.0)
          .remove();
      };
      selection
        .transition()
        .duration(100)
        .call(attributer);
    },
    shapes: function (shapes, palette) {
      var attributer = function() {
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
      };
      shapes
        .transition()
        .delay(150)
        .duration(900)
        .call(attributer);
    },
    labels: function (labels) {
      var attributer = function() {
        this
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
      };
      labels
        .transition()
        .delay(150)
        .duration(900)
        .call(attributer);
    }
  };
});