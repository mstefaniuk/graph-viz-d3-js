define({
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
                  value: {red:255, green:255, blue:254, opacity:1}
                },
                {
                  key: 'fill',
                  value: {red:255, green:255, blue:255, opacity:1}
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
                  value: {red:0, green:0, blue:0, opacity:1}
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
                  value: {red:0, green:0, blue:0, opacity:1}
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
                  value: {red:0, green:0, blue:0, opacity:1}
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
                  value: {red:0, green:0, blue:0, opacity:1}
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