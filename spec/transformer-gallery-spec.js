define(['transformer', 'spec/dots/directed'], function (transformer, array) {

  describe('Transformer', function () {
    using("provided gallery graphs", array, function (graph) {
      var result = transformer.generate(graph);

      it("returned stageshould have shapes to draw canvas and shapes with diagram itself", function () {
        expect(result.main.shapes.length).toBeGreaterThan(0);
        expect(result.main.shapes[0].points.length).toEqual(4);
        expect(result.groups.length).toBeGreaterThan(0);
      });
    });
  });
});