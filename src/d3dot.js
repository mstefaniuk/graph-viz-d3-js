define(['viz', 'parser/xdot', 'pegast'], function (viz, xdotparser, pegast) {
  var last = [];
  return {
    generate: function (source) {
//      console.log("Parsing dot source!");
      var xdot = viz(source, "xdot");
      try {
        var ast = xdotparser.parse(xdot);
        var stage = last = this.shapeast(ast);
      } catch(e) {
//        console.log(xdot);
      }
      return last;
    },
    shapeast: function(ast) {
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
        struct: visitSubnodes('commands'),
        node: startGroup('attributes'),
        relation: startGroup('attributes'),
        draw: addToSection('shapes'),
        hdraw: addToSection('shapes'),
        ldraw: addToSection('labels')
      });
      visit(ast);

      return {
        main: result.shift(),
        groups: result
      };
    }
  }
})