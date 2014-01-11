define(['d3dot','spec/asts/directed/clust4','spec/shapes/directed/clust4'], function(d3dot, ast_clust4, shape_clust4) {

  beforeEach(function() {
    this.addMatchers(objectDiff.jasmine);
  });

  describe("Shapes visitor for xdot parser", function() {
    it("returns cluster shapes", function() {
      expect(shape_clust4).not.toBeUndefined();
      var shapes = d3dot.shapeast(ast_clust4)
      var diff = objectDiff.diff(shapes, shape_clust4);
      expect(shapes).toEqualProperties(shape_clust4);
    });
  });
});