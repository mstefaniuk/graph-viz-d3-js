define(['parser/xdot', 'spec/xdots/directed', 'spec/asts/directed/clust4'],
  function (xdot, array, clust4) {

    describe('XDOT parser', function () {
      using("provided gallery graphs", array, function (graph) {
        describe("should parse", function () {
          it("xdot source into tree with commands and at least one graph", function () {
            var ast = xdot.parse(graph);
            expect(ast).toBeDefined();
            expect(ast.commands.length).toBeGreaterThan(0);
            expect(ast.commands.filter(function(e){
              return e.type === 'graph';
            }).length).toEqual(1);
            expect(ast.type).toBeDefined();
          });
        });
      });

      xit("should return backward compatible AST", function () {
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

        it("to support Unicode labels", function() {
          var ast = xdot.parse(
            'digraph G {' +
            ' graph [_draw_="c 9 -#fffffe00 C 7 -#ffffff P 4 0 0 0 36 404.19 36 404.19 0 ", bb="0,0,404.19,36", xdotversion=1.7 ];' +
            ' node [label="\n"]; installed [_draw_="c 7 -#000000 e 61.44 18 61.38 18 ", _ldraw_="F 14 11 -Times-Roman c 7 -#000000 T 61.44 13.8 0 73.07 15 -已安装状态 ", height=0.5, label=已安装状态, pos="61.442,18", width=1.7067];' +
            ' Контрагенты [_draw_="c 7 -#000000 e 272.44 18 132 18 ", _ldraw_="F 14 11 -Times-Roman c 7 -#000000 T 272.44 13.8 0 175 22 -Контрагенты ", height=0.5, pos="272.44,18", width=3.6597];' +
            ' }'
          );
          expect(ast).toEqual({
            type: 'digraph',
            id: 'G',
            commands: [
              {
                type: 'graph',
                attributes: [
                  {
                    type: 'draw',
                    elements: [
                      {
                        shape: 'polygon',
                        points: [
                          [
                            0,
                            0
                          ],
                          [
                            0,
                            36
                          ],
                          [
                            404.19,
                            36
                          ],
                          [
                            404.19,
                            0
                          ]
                        ],
                        style: [
                          {
                            key: 'stroke',
                            value: 'rgba(255,255,254,1)'
                          },
                          {
                            key: 'fill',
                            value: 'rgba(255,255,255,1)'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    name: 'bb',
                    type: 'skip'
                  },
                  {
                    name: 'xdotversion',
                    type: 'skip'
                  }
                ]
              },
              {
                type: 'skip',
                attributes: [
                  {
                    name: 'label',
                    type: 'skip'
                  }
                ]
              },
              {
                type: 'node',
                id: 'installed',
                attributes: [
                  {
                    type: 'draw',
                    elements: [
                      {
                        shape: 'ellipse',
                        cx: 61.44,
                        cy: 18,
                        rx: 61.38,
                        ry: 18,
                        style: [
                          {
                            key: 'stroke',
                            value: 'rgba(0,0,0,1)'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'ldraw',
                    elements: [
                      {
                        x: 61.44,
                        y: 13.8,
                        text: '已安装状态',
                        style: [
                          {
                            key: 'font-family',
                            value: "'Times-Roman',serif"
                          },
                          {
                            key: 'font-size',
                            value: 14
                          },
                          {
                            key: 'stroke',
                            value: 'rgba(0,0,0,1)'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    name: 'height',
                    type: 'skip'
                  },
                  {
                    name: 'label',
                    type: 'skip'
                  },
                  {
                    name: 'pos',
                    type: 'skip'
                  },
                  {
                    name: 'width',
                    type: 'skip'
                  }
                ]
              },
              {
                type: 'node',
                id: 'Контрагенты',
                attributes: [
                  {
                    type: 'draw',
                    elements: [
                      {
                        shape: 'ellipse',
                        cx: 272.44,
                        cy: 18,
                        rx: 132,
                        ry: 18,
                        style: [
                          {
                            key: 'stroke',
                            value: 'rgba(0,0,0,1)'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'ldraw',
                    elements: [
                      {
                        x: 272.44,
                        y: 13.8,
                        text: 'Контрагенты',
                        style: [
                          {
                            key: 'font-family',
                            value: "'Times-Roman',serif"
                          },
                          {
                            key: 'font-size',
                            value: 14
                          },
                          {
                            key: 'stroke',
                            value: 'rgba(0,0,0,1)'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    name: 'height',
                    type: 'skip'
                  },
                  {
                    name: 'pos',
                    type: 'skip'
                  },
                  {
                    name: 'width',
                    type: 'skip'
                  }
                ]
              }
            ]
          });
        });
      });
    });
  });