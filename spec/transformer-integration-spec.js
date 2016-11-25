define(['transformer', 'spec/shapes/longer-labels',
    'text!spec/dots/directed/switch.gv', 'spec/shapes/directed/switch',
    'text!spec/dots/directed/table.gv', 'spec/shapes/directed/table',
    'text!spec/dots/adept.gv', 'spec/shapes/adept'],
  function (transformer, longerLabels, switchSource, switchShape, tableSource, tableShape, adeptSource, adeptShape) {
  describe('Transformer', function() {
    it("should extract node shapes correctly when labels are longer than 4 chars", function() {
      var stage = transformer.generate("digraph { longer -> labels -> ok}");
      expect(stage).toEqual(longerLabels);
    });

    xit("should handle struct with multiple edges", function() {
      var stage = transformer.generate(switchSource);
      expect(stage).toEqual(switchShape);
    });

    xit("should handle diagrams with html tables", function() {
      var stage = transformer.generate(tableSource);
      expect(stage).toEqual(tableShape);
    });

    it("should handle undirected diagrams", function() {
      var stage = transformer.generate(adeptSource);
      expect(stage).toEqual(adeptShape);
    });

    xit("should handle diagrams with html tables", function() {
      var stage = transformer.generate(
        'digraph G { G[ label="google.com" shape=box URL="http://google.com" tooltip="Click me!" style="filled" fillcolor="#5cb85c" color="#5cb85c" fontcolor="#ffffff"];}'
      );
      expect(stage).toEqual(tableShape);
    });
  });
});