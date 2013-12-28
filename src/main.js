/**
 * Author: Marcin Stefaniuk
 * Date: 17.12.13 12:17
 */

define(['viz', 'parser/xdot'], function (viz, parser) {
  return {
    generate: function (dot) {
      var xdot = viz(dot, "xdot");
      var ast = parser.parse(xdot);
      return shapes(ast);
    }
  }

  function each(array, callback) {
    var length = array.length;
    for (var i = 0; i < length; i++) {
      callback(array[i], i);
    }
  }

  function buildNodeVisitor(functions) {
    return function (node) {
      return functions[node.type].apply(null, arguments);
    };
  }

  function nop() {
  }

  function shapes(ast) {

    var result = [];

    function visitSubnodes(propertyName) {
      return function(node) { each(node[propertyName], visit); };
    }

    function startGroup(propertyName) {
      return function(node) {
        result.push({id: node.id, shapes: []});
        each(node[propertyName], visit);
      };
    }

    var visit = buildNodeVisitor({
      digraph: startGroup('commands'),
      graph: visitSubnodes('attributes'),
      subgraph: startGroup('commands'),
      node: startGroup('attributes'),
      relation: startGroup('attributes'),
      draw: function(node){
        var last = result[result.length-1];
        last.shapes = last.shapes.concat(node.shapes);
      },
      skip: nop,
    });
    visit(ast);

    return result;
  };
})