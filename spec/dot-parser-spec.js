define(['parser/dot', 'spec/dots/directed'], function (dot, array) {

  describe('Dot parser', function () {
    var lint = {pegace: {mode: 'lint'}};

    using("provided gallery graphs", array, function (graph) {
      describe("parser", function () {
        it("should succeed in lint mode", function () {
          var result = dot.parse(graph, lint);
          expect(result.clean).toEqual(true);
        });
      });
    });

    using("provided gallery graphs", array, function (graph) {
      describe("parser", function () {
        it("should succeed in strict mode", function () {
          var result = dot.parse(graph);
          expect(result.clean).toEqual(true);
        });
      });
    });

    describe("during lax parsing", function() {

      it("should report unclosed curly brackets", function() {
        var result = dot.parse("digraph {unclosed", lint);
        expect(result.errors).toEqual([ { pos : 8, type : 'unterminated', string : '{' } ]);
      });

      it("should report unclosed square brackets", function() {
        var result = dot.parse("digraph {unclosed[}", lint);
        expect(result.errors).toEqual([ { pos : 17, type : 'unterminated', string : '[' } ]);
      });

      it("should report unclosed double angular brackets", function() {
        var result = dot.parse("digraph {uncl[url=<<]}", lint);
        expect(result.errors).toEqual([ { pos : 18, type : 'unterminated', string : '<<' } ]);
      });

      it("should report unknown keyword", function() {
        var result = dot.parse("digrh {}", lint);
        expect(result.errors).toEqual([ { pos : 0, type : 'keyword', string : 'digrh' } ]);
      });

      it("should report unknown attribute for node", function() {
        var result = dot.parse('graph {b->l[u="eee"]}', lint);
        expect(result.errors).toEqual([ { pos : 12, type : 'attribute', string : 'u' } ]);
      });
    });
  });
});