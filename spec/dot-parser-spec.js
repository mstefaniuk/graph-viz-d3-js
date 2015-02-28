define(['parser/dot', 'spec/dots/directed'], function (dot, array) {

  describe('Dot parser', function () {
    beforeEach(function () {
      this.addMatchers(objectDiff.jasmine);
    });

    var lint = {pegace: {mode: 'lint'}};

    using("provided gallery graphs", array, function (graph) {
      describe("parser", function () {
        it("should succeed in lint mode", function () {
          expect(function () {
            dot.parse(graph, lint);
          }).not.toThrow();
        });
      });
    });

    //using("provided gallery graphs", array, function (graph) {
    //  describe("parser", function () {
    //    it("should succeed in strict mode", function () {
    //      expect(function () {
    //        dot.parse(graph);
    //      }).not.toThrow();
    //    });
    //  });
    //});
  });
});