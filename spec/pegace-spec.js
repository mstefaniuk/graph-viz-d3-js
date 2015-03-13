define(['rfactory!pegace', 'parser/dot'], function (pegaceFactory, dot) {

  describe('Bridge between ACE and PEG', function () {
    var parserSpy, pegace;
    beforeEach(function () {
      parserSpy = jasmine.createSpyObj('parserMock', ['parse']);
      parserSpy.parse.andCallFake(function(source, options) {
        return dot.parse(source, options);
      });
      pegace = pegaceFactory({
        'parser/dot': parserSpy
      });
    });

    it("should provide proper options when dot source is linted", function () {
      var result = pegace.lint(
        "dgraph {node[sape=box]}"
      );
      expect(result).toEqual({
        clean: false,
        errors: [
          {pos: 0, type: "keyword", string: "dgraph"},
          {pos: 13, type: "attribute", string: "sape"}
        ]
      });
      expect(parserSpy.parse.calls.length).toEqual(1);
      expect(parserSpy.parse.mostRecentCall.args[1]).toEqual({pegace: {mode: 'lint'}});
    });


    it("should provide proper options when dot source parsed", function () {
      expect(function() {
        pegace.parse(
          "dgraph {node[sape=box]}"
        );
      }).toThrow();
      expect(parserSpy.parse.calls.length).toEqual(1);
      expect(parserSpy.parse.mostRecentCall.args[1]).toEqual({pegace: {mode: 'strict'}});
    });
  });
});
