define(['rfactory!pegace', 'parser/dot'], function (pegaceFactory, dot) {

  describe('Bridge between ACE and PEG', function () {
    var parserSpy, pegace;
    beforeEach(function () {
      parserSpy = jasmine.createSpyObj('parserMock', ['parse']);
      pegace = pegaceFactory({
        'parser/dot': parserSpy
      });
    });

    it("should provide proper options when dot source is linted", function () {
      var expectation = {
        clean: false,
        errors: [
          {pos: 0, type: "keyword", string: "dgraph"},
          {pos: 13, type: "attribute", string: "sape"}
        ]
      };
      parserSpy.parse.andCallFake(function () {
        return expectation;
      });
      var result = pegace.lint(
        "dgraph {node[sape=box]}"
      );
      expect(result).toEqual(expectation);
      expect(parserSpy.parse.calls.length).toEqual(1);
      expect(parserSpy.parse.mostRecentCall.args[1]).toEqual({pegace: {mode: 'lint'}});
    });


    it("should provide proper options when dot source is parsed", function () {
      parserSpy.parse.andCallFake(function (source, options) {
        throw new Error();
      });
      expect(function () {
        pegace.parse(
          "dgraph {node[sape=box]}"
        );
      }).toThrow();
      expect(parserSpy.parse.calls.length).toEqual(1);
      expect(parserSpy.parse.mostRecentCall.args[1]).toEqual({pegace: {mode: 'strict'}});
    });

    it("should enrich parser exception with standard result flags when dot source is linted", function () {
      var provided = {
        message: 'Expected "digraph", "graph", "strict", [^ ] or whitespace but end of input found.',
        expected: [
          {type: 'literal', value: 'digraph', description: '"digraph"'}
        ],
        found: null,
        offset: 0,
        line: 1,
        column: 1,
        name: 'SyntaxError'
      };
      parserSpy.parse.andCallFake(function (source, options) {
        throw provided;
      });
      var result = pegace.lint(
        ""
      );
      expect(result.clean).toEqual(false);
      expect(result.level).toEqual("fatal");
      expect(result.exception).toEqual(provided);
      expect(result.errors).toEqual([{pos: 0, type: 'syntax', string: null}]);
    });
  });
});