define(['parser/xdot', 'spec/xdots/directed', 'spec/asts/directed/clust4', 'spec/asts/unicode-labels',
    'spec/asts/image', 'text!spec/xdots/class-diagram.xdot', 'spec/asts/class-diagram',
    'text!spec/xdots/adept.xdot', 'spec/asts/adept', 'spec/asts/node-id', 'spec/asts/backslash'],
  function (xdot, array, clust4, unicodeLabels, image, classDiagramSource, classDiagramAst, adeptSource, adeptAst, nodeId, backslash) {

    describe('XDOT parser', function () {

      using("provided gallery graphs", array, function (graph) {
        it("should parse xdot source into tree with commands and at least one graph", function () {
          var ast = xdot.parse(graph);
          expect(ast).toBeDefined();
          expect(ast.commands.length).toBeGreaterThan(0);
          expect(ast.commands.filter(function (e) {
            return e.type === 'graph';
          }).length).toEqual(1);
          expect(ast.type).toBeDefined();
        });
      });

      xit("should return backward compatible AST", function () {
        var actual = xdot.parse(array[10]);
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
          expect(ast).toEqual(image);
        });

        it("to support Unicode labels", function () {
          var ast = xdot.parse(
            'digraph G {' +
            ' graph [_draw_="c 9 -#fffffe00 C 7 -#ffffff P 4 0 0 0 36 404.19 36 404.19 0 ", bb="0,0,404.19,36", xdotversion=1.7 ];' +
            ' node [label="\n"]; installed [_draw_="c 7 -#000000 e 61.44 18 61.38 18 ", _ldraw_="F 14 11 -Times-Roman c 7 -#000000 T 61.44 13.8 0 73.07 15 -已安装状态 ", height=0.5, label=已安装状态, pos="61.442,18", width=1.7067];' +
            ' Контрагенты [_draw_="c 7 -#000000 e 272.44 18 132 18 ", _ldraw_="F 14 11 -Times-Roman c 7 -#000000 T 272.44 13.8 0 175 22 -Контрагенты ", height=0.5, pos="272.44,18", width=3.6597];' +
            ' }'
          );
          expect(ast).toEqual(unicodeLabels);
        });

        it("to parse class diagram", function () {
          var ast = xdot.parse(classDiagramSource);
          expect(ast).toEqual(classDiagramAst);
        });

        it("to parse undirected graph", function () {
          var ast = xdot.parse(adeptSource);
          expect(ast).toEqual(adeptAst);
        });

        it("to parse strict graph", function () {
          var ast = xdot.parse(
            'strict graph {' +
            ' graph [_draw_="c 9 -#fffffe00 C 7 -#ffffff P 4 0 0 0 0 0 0 0 0 ", bb="0,0,0,0", xdotversion=1.7 ]; node [label="\N"]; ' +
            '}'
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
                  points: [[0, 0], [0, 0], [0, 0], [0, 0]],
                  style: [{key: 'stroke', value: '#fffffe00'}, {key: 'fill', value: '#ffffff'}]
                }]
              }, {
                name: 'bb', type: 'skip'
              }, {
                name: 'xdotversion', type: 'skip'
              }]
            }, {
              type: 'skip',
              attributes: [{
                name: 'label', type: 'skip'
              }]
            }]
          });
        });

        it("to handle id of nodes", function () {
          var ast = xdot.parse(
            'digraph G {' +
            ' graph [_draw_="c 9 -#fffffe00 C 7 -#ffffff P 4 0 0 0 36 95.02 36 95.02 0 ", bb="0,0,95.018,36", xdotversion=1.7 ];' +
            ' node [label="\N"];' +
            ' foo_node [' +
              '_draw_="c 7 -#000000 e 47.51 18 47.52 18 ", ' +
              '_ldraw_="F 14 11 -Times-Roman c 7 -#000000 T 47.51 13.8 0 52.88 8 ' +
              '-foo_node ", ' +
              'height=0.5, ' +
              'id=foo_node_id, ' +
              'pos="47.509,18", ' +
              'width=1.3197]; } '
          );
          expect(ast).toEqual(nodeId);
        });

        it("to parse node label transparently with backslash not followed by quote", function () {
          var ast = xdot.parse(
            'digraph G {' +
            ' graph [_draw_="c 9 -#fffffe00 C 7 -#ffffff P 4 0 0 0 36 129.32 36 129.32 0 ", bb="0,0,129.32,36", xdotversion=1.7 ];' +
            ' node [label="\\N"];' +
            ' Test [' +
              '_draw_="c 7 -#000000 e 64.66 18 64.82 18 ", ' +
              '_ldraw_="F 14 11 -Times-Roman c 7 -#000000 T 64.66 13.8 0 77.74 31 -alpha\\beta\\\\gamma\\\\\\delta space ", ' +
              'height=0.5, ' +
              'label="alpha\\\\beta\\\\\\\\gamma\\\\\\\\\\\\delta space", ' +
              'pos="64.661,18", ' +
              'width=1.7961]; } '
          );
          expect(ast).toEqual(backslash);
        });
      });
    });
  });