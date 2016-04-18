define(['rfactory!dot-checker', 'parser/dot'], function (dotCheckerFactory, dot) {

  describe('Bridge between ACE and PEG', function () {
    var parserSpy, dotChecker;
    beforeEach(function () {
      parserSpy = jasmine.createSpyObj('parserMock', ['parse']);
      dotChecker = dotCheckerFactory({
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
      parserSpy.parse.and.callFake(function () {
        return expectation;
      });
      var result = dotChecker.lint(
        "dgraph {node[sape=box]}"
      );
      expect(result).toEqual(expectation);
      expect(parserSpy.parse.calls.count()).toEqual(1);
      expect(parserSpy.parse.calls.mostRecent().args[1]).toEqual({pegace: {mode: 'lint'}});
    });


    it("should provide proper options when dot source is parsed", function () {
      parserSpy.parse.and.callFake(function (source, options) {
        throw new Error();
      });
      expect(function () {
        dotChecker.parse(
          "dgraph {node[sape=box]}"
        );
      }).toThrow();
      expect(parserSpy.parse.calls.count()).toEqual(1);
      expect(parserSpy.parse.calls.mostRecent().args[1]).toEqual({pegace: {mode: 'strict'}});
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
      parserSpy.parse.and.callFake(function (source, options) {
        throw provided;
      });
      var result = dotChecker.lint(
        ""
      );
      expect(result.clean).toEqual(false);
      expect(result.level).toEqual("fatal");
      expect(result.exception).toEqual(provided);
      expect(result.errors).toEqual([{pos: 0, type: 'syntax', string: null}]);
    });
  });
});