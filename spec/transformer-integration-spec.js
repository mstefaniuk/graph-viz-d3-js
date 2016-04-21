define(['transformer', 'spec/shapes/longer-labels',
    'text!spec/dots/directed/switch.gv', 'spec/shapes/directed/switch',
    'text!spec/dots/directed/table.gv', 'spec/shapes/directed/table'],
  function (transformer, longerLabels, switchSource, switchShape, tableSource, tableShape) {
  xdescribe('Transformer', function() {
    it("should extract node shapes correctly when labels are longer than 4 chars", function() {
      var stage = transformer.generate("digraph { longer -> labels -> ok}");
      expect(stage).toEqual(longerLabels);
    });

    it("should handle struct with multiple edges", function() {
      var stage = transformer.generate(switchSource);
      expect(stage).toEqual(switchShape);
    });

    it("should handle diagrams with html tables", function() {
      var stage = transformer.generate(tableSource);
      expect(stage).toEqual(tableShape);
    });
  });
});