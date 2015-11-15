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