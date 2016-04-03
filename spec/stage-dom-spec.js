define(["stage", 'spec/shapes/graph-label', 'spec/shapes/courier-fonts', 'imagediff',
  ], function (stage, graphLabelShapes, courierFontsShapes, imagediff) {

  function shortcircut(selection, attributes) {
    selection.call(attributes);
  }

  var immediate = {
    document: shortcircut,
    canvas: shortcircut,
    nodes: shortcircut,
    relations: shortcircut,
    exits: shortcircut,
    shapes: shortcircut,
    labels: shortcircut
  };

  describe("Stage", function() {

    beforeEach(function() {
      this.addMatchers(imagediff.jasmine);

      var fixture = '<div id="graph"></div>';
      document.body.insertAdjacentHTML(
        'afterbegin',
        fixture);

      stage.transitions(immediate);
    });

    afterEach(function() {
      document.body.removeChild(document.getElementById('graph'));
    });

    describe("generated SVG", function() {
      beforeEach(function() {
        stage.init("#graph");
      });

      it("should contain label", function() {
        stage.draw(graphLabelShapes);
        expect(document.querySelector("#graph svg > g > g > text").textContent).toEqual("Graph");
      });

      it("should render non default fonts properly", function() {
        stage.draw(courierFontsShapes);
        expect(document.querySelector('#graph svg text[style*="Courier"]').textContent).toEqual("Courier");
        expect(document.querySelector('#graph svg text[style*="Courier-Bold"]').textContent).toEqual("Courier-Bold");
        expect(document.querySelector('#graph svg text[style*="Courier-Oblique"]').textContent).toEqual("Courier-Oblique");
        expect(document.querySelector('#graph svg text[style*="Courier-BoldOblique"]').textContent).toEqual("Courier-BoldOblique");
        expect(document.querySelectorAll('#graph svg text[style*="stroke:"]').length).toEqual(0);
        expect(document.querySelectorAll('#graph svg text[style*="color:"]').length).toEqual(4);
        expect(document.querySelectorAll('#graph svg text[style*="font-size: 14px"]').length).toEqual(4);
      });
    });
  });
});