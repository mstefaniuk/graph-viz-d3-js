define(['transformer', 'spec/shapes/longer-labels'], function (transformer, longerLabels) {
  describe('Transformer', function() {
    xit('should extract viz.js error from console', function() {
      var stage = transformer.generate("digraph g {\n{a b} -> {c d}\n");
      expect(stage).toEqual({
        ok: false,
        error: "Error: syntax error in line 3 near ''" // FIXME why it returns line 3120
      });
    });

    it("should extract node shapes correctly when labels are longer than 4 chars", function() {
      var stage = transformer.generate("digraph { longer -> labels -> ok}");
      expect(stage).toEqual(longerLabels);
    });
  });
});