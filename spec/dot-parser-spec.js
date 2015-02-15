define(['pegace', 'spec/dots/directed'], function (pegace, array) {

  describe('Dot parser', function () {
    using("provided gallery graphs", array, function (graph) {
      describe("parser", function () {
        it("should return clean result in lax mode", function () {
          var result = pegace.lint(graph);
          expect(result.clean).toBe(true);
        });
      })
    });

    it("in lax mode should find all unknown statements", function () {
      var result = pegace.lint(
        "dgraph {node[sape=box]}"
      );
      expect(result).toEqualProperties({
        clean: false,
        errors: [
          {pos: 0, type: "keyword", string: "dgraph"},
          {pos: 13, type: "attribute", string: "sape"}
        ]
      });
    });
  });
});