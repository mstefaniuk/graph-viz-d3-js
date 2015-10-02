define(['transformer', 'spec/dots/directed'], function (transformer, array) {

  describe('Transformer', function () {
    using("provided gallery graphs", array, function (graph) {
      describe("returned stage", function() {
        it("should have key structures", function () {
          var stage = transformer.generate(graph);
          expect(stage.main).toBeDefined();
          expect(stage.groups.length).toBeGreaterThan(0);
        });
      });
    });
  });
});