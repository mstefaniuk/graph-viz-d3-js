define([], function() {
  return {
    document: function(selection, attributer) {
      selection
        .transition()
        .delay(150)
        .duration(700)
        .call(attributer);
    },
    canvas: function (selection, attributer) {
      selection
        .transition()
        .delay(150)
        .duration(900)
        .call(attributer);
    },
    nodes: function (selection, attributer) {
      selection
        .style("opacity", 0.0)
        .transition()
        .delay(150)
        .duration(900)
        .call(attributer);
    },
    relations: function (selection, attributer) {
      selection
        .style("opacity", 0.0)
        .transition()
        .delay(150)
        .duration(900)
        .call(attributer);
    },
    exits: function (selection, attributer) {
      selection
        .transition()
        .duration(100)
        .style("opacity", 0.0)
        .call(attributer);
    },
    shapes: function (shapes, attributer) {
      shapes
        .transition()
        .delay(150)
        .duration(900)
        .call(attributer);
    },
    labels: function (labels, attributer) {
      labels
        .transition()
        .delay(150)
        .duration(900)
        .call(attributer);
    }
  };
});