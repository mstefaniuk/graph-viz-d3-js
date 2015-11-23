define([], function() {
  return {
    stage: function (svg, canvas) {
      var margin = 4,
        boundingWidth = canvas.shapes[0].points[2][0] + margin*2,
        boundingHeight = canvas.shapes[0].points[2][1] + margin*2,
        htranslate = canvas.shapes[0].points[2][1] + margin,
        vtranslate = margin,
        size = canvas.size || [boundingWidth, boundingHeight];
      var oversized = boundingWidth > size[0] || boundingHeight > size[1];
      var scaleWidth = oversized ? size[0] / boundingWidth : 1;
      var scaleHeight = oversized ? size[1] / boundingHeight : 1;
      var ratio = scaleHeight > scaleWidth ? scaleHeight = scaleWidth : scaleWidth = scaleHeight;
      var height = boundingHeight * ratio;
      var width = boundingWidth * ratio;
      var area = [0, 0, width, height];

      svg
        .transition()
        .delay(150)
        .duration(700)
        .attr("width", width + "pt")
        .attr("height", height + "pt")
        .attr("viewBox", area.join(' '))
        .select("g")
        .attr("transform", "scale(" + scaleWidth + " " + scaleHeight + ")" + " " + "translate(" + vtranslate + "," + htranslate + ")");

      var polygon = svg.select("polygon");
      polygon
        .transition()
        .delay(150)
        .duration(900)
        .attr("points", function () {
          return [[0,0],[0,height],[width,height],[width,0]]
            .map(function (e) {
              return e.join(",");
            }).join(" ");
        });
      canvas.shapes[0].style.forEach(function(e) {
        polygon.style(e.key, e.value);
      });
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