define(['parser/xdot', 'spec/xdots/directed'], function (xdot, array) {

  describe('XDOT parser', function () {
    using("provided gallery graphs", array, function(graph){
      describe("parser", function() {
        it("should not throw an exception", function () {
          expect(function(){xdot.parse(graph)}).not.toThrow();
        });
      })
    });
  });
});