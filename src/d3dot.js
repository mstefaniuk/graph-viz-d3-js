/**
 * Author: Marcin Stefaniuk
 * Date: 17.12.13 12:17
 */

define(['parser/dot', 'viz', 'parser/xdot', 'pegast'], function (dotparser, viz, xdotparser, pegast) {
  return {
    validate: function (source) {
      dotparser.parse(source);
    },
    generate: function (source) {
      var xdot = viz(source, "xdot");
      var ast = xdotparser.parse(xdot);
      return shapes(ast);
    }
  }

  function shapes(ast) {
    var result = [];

    function visitSubnodes(propertyName) {
      return function (node) {
        node[propertyName].forEach(visit)
      };
    }

    function startGroup(propertyName) {
      return function (node) {
        result.push({id: node.id, class: node.type, shapes: [], labels: []});
        node[propertyName].forEach(visit);
      };
    }

    function addToSection(section) {
      return function (node) {
        var last = result[result.length - 1];
        last[section] = last[section].concat(node.elements);
      }
    }

    var visit = pegast.nodeVisitor({
      digraph: startGroup('commands'),
      graph: visitSubnodes('attributes'),
      subgraph: startGroup('commands'),
      node: startGroup('attributes'),
      relation: startGroup('attributes'),
      draw: addToSection('shapes'),
      hdraw: addToSection('shapes'),
      ldraw: addToSection('labels')
    });
    visit(ast);

    return result;
  };
})