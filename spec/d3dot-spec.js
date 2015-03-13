define(['d3dot', 'spec/asts/directed/clust4', 'spec/shapes/directed/clust4'], function (d3dot, ast_clust4, shape_clust4) {

  describe("Shapes visitor for xdot parser", function () {
    it("returns cluster shapes", function () {
      var shapes = d3dot.shapeast(ast_clust4);
      expect(shape_clust4).toEqual(shapes);
    });

    it("provide size property in points", function () {
      var source = {
        "type": "digraph",
        "id": "a",
        "commands": [{"type": "graph", "attributes": [{"type": "size", "value": [6, 7]}]}]
      };
      var stage = d3dot.shapeast(source);
      expect(stage.main.size).toEqual([6*72, 7*72]);
    });
  });
});