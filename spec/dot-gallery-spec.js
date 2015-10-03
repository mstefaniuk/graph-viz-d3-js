define(['transformer', 'spec/dots/directed'], function (transformer, array) {

  describe('Transformer', function () {
    using("provided gallery graphs", array, function (graph) {
      describe("returned stage", function() {
        var stage = transformer.generate(graph);

        it("should have shapes to draw canvas", function () {
          expect(stage.main).toBeDefined();
          expect(stage.main.shapes.length).toBeGreaterThan(0);
          expect(stage.main.shapes[0].points.length).toEqual(4);
        });

        it("should have more than one structure on the canvas", function(){
          expect(stage.groups.length).toBeGreaterThan(0);
        });
      });
    });
  });
});