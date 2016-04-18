define(['rfactory!transformer', 'spec/asts/directed/clust4', 'spec/shapes/directed/clust4', 'text!spec/xdots/directed/clust4.xdot'],
  function (transformerFactory, ast_clust4, shape_clust4, xdot_clust4) {

  describe("Transformer of xdot format", function () {

    var vizSpy, xdotSpy, transformer;
    beforeEach(function () {
      vizSpy = jasmine.createSpy('viz');
      xdotSpy = jasmine.createSpyObj('xdotSpy', ['parse']);
      transformer = transformerFactory({
        'viz': vizSpy,
        'parser/xdot': xdotSpy
      });
    });

    it("should provide stage size property in points", function () {
      var source = {
        "type": "digraph",
        "id": "a",
        "commands": [{"type": "graph", "attributes": [{"type": "size", "value": [6, 7]}]}]
      };
      var result = transformer.shapeast(source);
      expect(result.main.size).toEqual([6*72, 7*72]);
    });

    it("should call viz.js with xdot option and call xdot parser with AST", function() {
      vizSpy.and.returnValue(xdot_clust4);
      xdotSpy.parse.and.returnValue(ast_clust4);
      var input = 'source';

      var result = transformer.generate(input);
      expect(vizSpy).toHaveBeenCalledWith(input, { format : 'xdot' });
      expect(xdotSpy.parse).toHaveBeenCalledWith(xdot_clust4);
      expect(result).toEqual(shape_clust4);
    });

    it("should pass error from viz.js", function() {
      var error = "Error: Syntax error from viz.js";
      vizSpy.and.callFake(function(){
        throw error;
      });

      try {
        transformer.generate('invalid');
      } catch (e) {
        expect(e).toEqual(error);
      }
    });

    it("should return error when xdot source parsing failed", function() {
      var error = "Parsing of xdot output failed";
      vizSpy.and.returnValue({invalid: true});
      xdotSpy.parse.and.callFake(function() {
        throw new Error();
      });

      try {
        transformer.generate('invalid');
      } catch (e) {
        expect(e).toEqual(error);
      }
    });
  });
});