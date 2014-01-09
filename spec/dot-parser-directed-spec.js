define(['parser/dot', 'dots/directed'], function (dot, array) {

  describe('Testing parsing graphs', function () {
    using("directed example", array, function(graph){
      describe("ffff", function() {
        it("Should parse without errors", function () {
          var result = dot.parse(graph);
          expect(result.clean).toBe(true);
        });
      })
    });
  });
});