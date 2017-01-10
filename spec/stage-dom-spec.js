define(["stage", 'transformer', 'styliseur', 'spec/shapes/graph-label', 'spec/shapes/courier-fonts', 'spec/jasmine/image-matchers', 'resemble',
  ], function (stage, transformer, styliseur, graphLabelShapes, courierFontsShapes, imageMatchers, resemble) {

  function shortcircut(selection, attributer) {
    selection
      .call(attributer)
      .call(styliseur);
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
        expect(document.querySelector('#graph svg text[font-family*="Courier"]').textContent).toEqual("Courier");
        expect(document.querySelector('#graph svg text[font-family*="Courier-Bold"]').textContent).toEqual("Courier-Bold");
        expect(document.querySelector('#graph svg text[font-family*="Courier-Oblique"]').textContent).toEqual("Courier-Oblique");
        expect(document.querySelector('#graph svg text[font-family*="Courier-BoldOblique"]').textContent).toEqual("Courier-BoldOblique");
        expect(document.querySelectorAll('#graph svg text[stroke]').length).toEqual(0);
        expect(document.querySelectorAll('#graph svg text[fill]').length).toEqual(4);
        expect(document.querySelectorAll('#graph svg text[font-size*="14"]').length).toEqual(4);
      });
      
      it("should handle different font alignments", function() {
        var shapes = transformer.generate(
          ['digraph models_diagram {',
            '"Header" [shape=Mrecord, label="{PaidTimeOff|sick_days_earned :integer\\l}"]',
            '}'].join("\n"));
        stage.draw(shapes);
        expect(document.querySelectorAll('#graph svg text[text-anchor="middle"]').length).toEqual(1);
        expect(document.querySelectorAll('#graph svg text[text-anchor="start"]').length).toEqual(1);
      });

      it("should show head and tail arrows", function() {
        var shapes = transformer.generate("digraph G {nodeA -> nodeB [dir=both]}");
        stage.draw(shapes);
        expect(document.querySelectorAll('#graph svg g.relation path.solid').length).toEqual(2);
      });

      xit("should render links and tooltips", function() {
        var shapes = transformer.generate(
          'digraph G { G[ label="google.com" shape=box URL="http://google.com" tooltip="Click me!" style="filled" fillcolor="#5cb85c" color="#5cb85c" fontcolor="#ffffff"];}'
        );
        stage.draw(shapes);
        expect(document.querySelectorAll('#graph svg g a[*|href="http://google.com"][*|title="Click me!"]').length).toEqual(1);
        expect(document.querySelectorAll('#graph svg g a text[fill="#ffffff"]').length).toEqual(1);
      });
    });
    
    describe("export of PNG image when zoom available", function() {
      beforeEach(function() {
        stage.init({
          element: "#graph",
          zoom: true
        });
        jasmine.addMatchers(imageMatchers);
      });

      it("should return whole diagram when no zoom set", function(done) {
        var shapes = transformer.generate("digraph { A -> B -> C }");
        stage.draw(shapes);

        var actual = stage.getImage(false);
        var expected = new Image();
        expected.src = "/base/spec/img/A-B-C.png";

        actual.onload = function() {
          resemble(actual.src)
            .compareTo("/base/spec/img/A-B-C.png")
            .ignoreAntialiasing()
            .onComplete(function(data) {
              expect(actual).toImageEqual(expected, data, 1);
              done();
            });
        };
      });

      it("should return part of diagram when zoom is set", function(done) {
        var shapes = transformer.generate("digraph { A -> B -> C }");
        stage.draw(shapes);
        stage.setZoom({
          scale: 1.5,
          translate: [-10, 230]
        });

        var actual = stage.getImage();
        var expected = new Image();
        expected.src = "/base/spec/img/B-zoomed.png";

        actual.onload = function() {
          resemble(actual.src)
            .compareTo("/base/spec/img/B-zoomed.png")
            .ignoreAntialiasing()
            .onComplete(function(data) {
              expect(actual).toImageEqual(expected, data, 5);
              done();
            });
        };
      });
    });
  });
});