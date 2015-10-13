define(['viz', 'parser/xdot', 'pegast'], function (viz, xdotparser, pegast) {
  var empty = {stage:{}};
  var last = empty;
  return {
    generate: function (source, strict) {
      var xdot, error;
      last = strict ? empty : last;

      var oldLog = console.log;
      console.log = function (message) {
        error = message.indexOf("Error:")===0 && error===undefined ? message : error;
      };

      try {
        xdot = viz(source, { format: "xdot" });
        var ast = xdotparser.parse(xdot);
        last = this.shapeast(ast);
      } catch(e) {
        error = error || "Parsing of xdot output failed";
        return {
          ok: false,
          error: error,
          stage: last.stage
        };
      } finally {
        console.log = oldLog;
      }
      return last;
    },
    shapeast: function(ast) {
      var result = [];

      function visitSubnodes(propertyName) {
        return function (node) {
          node[propertyName].forEach(visit);
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
          var cursor = result[result.length - 1];
          cursor[section] = cursor[section].concat(node.elements);
        };
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
        ldraw: addToSection('labels'),
        size: function(node) {
          var cursor = result[result.length - 1];
          cursor.size = node.value.map(function(e) {
            return e*72;
          });
        }
      });
      visit(ast);

      return {
        stage : {
          main: result.shift(),
          groups: result
        },
        ok: true
      };
    }
  };
});