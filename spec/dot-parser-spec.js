define(['parser/dot', 'spec/dots/directed'], function (dot, array) {

  describe('Dot parser', function () {
    var lint = {pegace: {mode: 'lint'}};

    using("provided gallery graphs", array, function (graph) {
      describe("parser", function () {
        it("should succeed in lint mode", function () {
          var result = dot.parse(graph, lint);
          expect(result.clean).toEqual(true);
        });
      });
    });

    using("provided gallery graphs", array, function (graph) {
      describe("parser", function () {
        it("should succeed in strict mode", function () {
          var result = dot.parse(graph);
          expect(result.clean).toEqual(true);
        });
      });
    });
  });
});