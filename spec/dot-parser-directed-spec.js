define(['pegace', 'dots/directed'], function (pegace, array) {

  describe('DOT parser', function () {
    using("provided gallery graphs", array, function(graph){
      describe("parser", function() {
        it("should not throw an exception in strict mode", function () {
          expect(function(){pegace.parse(graph)}).not.toThrow();
        });
        it("should return clean result in lax mode", function () {
          var result = pegace.lint(graph);
          expect(result.clean).toBe(true);
        });
      })
    });
  });
});