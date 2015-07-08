define([], function() {
  return {
    stage: function (svg, width, height, scaleWidth, scaleHeight, vtranslate, htranslate) {
      svg
        .transition()
        .delay(150)
        .duration(700)
        .attr("width", width + "pt")
        .attr("height", height + "pt")
        .attr("viewBox", [0, 0, width, height].join(' '))
        .select("g")
        .attr("transform", "scale(" + scaleWidth + " " + scaleHeight + ")" + " " + "translate(" + vtranslate + "," + htranslate + ")");
    },
    nodes: function (nodes) {
      nodes.style("opacity", 0.0)
        .transition()
        .delay(150)
        .duration(900)
        .style("opacity", 1.0);
    },
    relations: function (relations) {
      relations.style("opacity", 0.0)
        .transition()
        .delay(150)
        .duration(900)
        .style("opacity", 1.0);
    },
    exits: function (exits) {
      exits.transition()
        .duration(100)
        .style("opacity", 0.0)
        .remove();
    },
    shapes: function (shapes, palette) {
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
    },
    labels: function (labels) {
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
});