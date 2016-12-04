define({
  type: 'digraph',
  id: null,
  commands: [{
    type: 'graph',
    attributes: [{
      type: 'draw',
      elements: [{
        shape: 'polygon',
        points: [[0, 0], [0, 36], [60, 36], [60, 0]],
        style: [{key: 'stroke', value: {red:255, green:255, blue:254, opacity:1}}, {key: 'fill', value: {red:255, green:255, blue:255, opacity:1}}]
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
        style: [{key: 'stroke', value: {red:0, green:0, blue:0, opacity:1}}]
      }]
    }, {type: 'image', value: 'http://placehold.it/140x100'}]
  }]
});