define(['transformer'], function (transformer) {
  xdescribe('Transformer', function() {
    it('should extract viz.js error from console', function() {
      var stage = transformer.generate("digraph g {\n{a b} -> {c d}\n", true);
      expect(stage).toEqual({
        ok: false,
        stage: {},
        error: "Error: syntax error in line 3 near ''" // FIXME why it returns line 3120
      });
    });
  });
});