define(['parser/xdot', 'spec/xdots/directed', 'spec/asts/directed/clust4'],
  function (xdot, array, clust4) {

    describe('XDOT parser', function () {
      using("provided gallery graphs", array, function (graph) {
        describe("parser", function () {
          it("should not throw an exception", function () {
            expect(function () {
              xdot.parse(graph)
            }).not.toThrow();
          });
        })
      });

      it("should return backward compatible AST", function () {
        var actual = xdot.parse(array[10][0]);
        expect(actual).toEqual(clust4);
      });

      describe("should cover language features", function () {
        it("to extract graph size for rescaling", function () {
          var source = 'digraph a {graph [size="6,6"]; }';
          var ast = xdot.parse(source);
          expect(ast).toEqual({
            "type": "digraph",
            "id": "a",
            "commands": [{"type": "graph", "attributes": [{"type": "size", "value": [6, 6]}]}]
          });
        });

        it("to handle graphs with images", function () {
          var ast = xdot.parse(
            'digraph {' +
            'graph [_draw_="c 9 -#fffffe00 C 7 -#ffffff P 4 0 0 0 36 60 36 60 0 " ]; ' +
            'TitleNode [_draw_="c 7 -#000000 e 27 18 27 18 ", ' +
            'image="http://placehold.it/140x100"]; }'
          );
          expect(ast).toEqual({
            type: 'digraph',
            id: null,
            commands: [{
              type: 'graph',
              attributes: [{
                type: 'draw',
                elements: [{
                  shape: 'polygon',
                  points: [[0, 0], [0, 36], [60, 36], [60, 0]],
                  style: [{key: 'stroke', value: 'rgba(255,255,254,1)'}, {key: 'fill', value: 'rgba(255,255,255,1)'}]
                }]
              }]
            }, {
              type: 'node',
              id: 'TitleNode',
              attributes: [{
                type: 'draw',
                elements: [{
                  shape: 'ellipse',
                  cx: 27,
                  cy: 18,
                  rx: 27,
                  ry: 18,
                  style: [{key: 'stroke', value: 'rgba(0,0,0,1)'}]
                }]
              }, {type: 'image', value: 'http://placehold.it/140x100'}]
            }]
          });
        });
      });
    });
  });