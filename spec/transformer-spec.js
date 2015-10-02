define(['rfactory!transformer', 'spec/asts/directed/clust4', 'spec/shapes/directed/clust4', 'text!spec/xdots/directed/clust4.xdot'],
  function (transformerFactory, ast_clust4, shape_clust4, xdot_clust4) {

  describe("Shapes visitor for xdot parser", function () {

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
      var stage = transformer.shapeast(source);
      expect(stage.main.size).toEqual([6*72, 7*72]);
    });

    it("should call viz.js with xdot option and call xdot parser with AST", function() {
      vizSpy.andReturn(xdot_clust4);
      xdotSpy.parse.andReturn(ast_clust4);

      var result = transformer.generate('source');
      expect(result).toEqual(shape_clust4);
    });

    it("should return previous result when viz.js generation failed", function() {
      vizSpy.andCallFake(function(source, options){
        if (source==="valid" && options.format==="xdot") {
          return xdot_clust4;
        } else {
          throw new Error();
        }
      });
      xdotSpy.parse.andReturn(ast_clust4);

      var result = transformer.generate('valid');
      expect(result).toEqual(shape_clust4);
      result = transformer.generate('invalid');
      expect(result).toEqual(shape_clust4);
    });

    it("should return previous result when xdot source parsing failed", function() {
      vizSpy.andCallFake(function(source, options){
        if (source==="valid" && options.format==="xdot") {
          return xdot_clust4;
        } else {
          return {invalid: true};
        }
      });
      xdotSpy.parse.andCallFake(function(source){
        if (source.invalid && source.invalid===true) {
          throw new Error();
        } else {
          return ast_clust4;
        }
      });

      var result = transformer.generate('valid');
      expect(result).toEqual(shape_clust4);
      result = transformer.generate('invalid');
      expect(result).toEqual(shape_clust4);
    });
  });
});