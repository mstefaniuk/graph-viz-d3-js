define(["d3"], function(d3) {
  var styliseur = function (selection) {
    this.each(function (d) {
      var self = d3.select(this);
      var colorInsteadOfStroke = this instanceof SVGTextElement || false;
      d && d.style && d.style.forEach(function (e) {
        switch (e.key) {
          case "stroke":
          case "fill":
            var attribute = e.key==="stroke" && colorInsteadOfStroke ? "color" : e.key;
            var color = d3.rgb(e.value.red, e.value.green, e.value.blue);
            color.opacity = e.value.opacity;
            self.attr(attribute, color);
            break;
          case "font-size":
            self.style(e.key, e.value);
            break;
          case "style":
            if (e.value.indexOf('setline') === 0) {
              self.attr('stroke-width', 2);
            } else {
              self.attr('class', e.value);
            }
        }
      });
    });
  };

  return styliseur;
});