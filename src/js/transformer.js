define(['viz', 'parser/xdot', 'pegast'], function (viz, xdotparser, pegast) {
  return {
    generate: function (source) {
      var xdot, result;

      xdot = viz(source, { format: "xdot" });

      try {
        var ast = xdotparser.parse(xdot);
        result = this.shapeast(ast);
      } catch(e) {
        throw "Parsing of xdot output failed";
      }
      return result;
    },
    shapeast: function(ast) {
      var result = [];
      var cursor;

      function visitSubnodes(propertyName) {
        return function (node) {
          node[propertyName] && node[propertyName].forEach(visit);
        };
      }

      function startGroup(propertyName) {
        return function (node) {
          var groupById = result.filter(function(e) {
            return e.id === node.id;
          });
          cursor =
            groupById.length > 0
            ? groupById[0]
            : {id: node.id, class: node.type, shapes: [], labels: []};
          groupById.length === 0 && result.push(cursor);
          node[propertyName] && node[propertyName].forEach(visit);
        };
      }

      function addShapesAndLabels(node) {
        cursor.shapes = cursor.shapes.concat(node.elements.filter(function(e){
          return e.shape;
        })).map(fixShapeStyles);
        cursor.labels = cursor.labels.concat(node.elements.filter(function(e){
          return e.text;
        }));
      }

      function fixShapeStyles(element) {
        if (element.style) {
          var keys = element.style.map(function(e) {return e.key});
          keys.indexOf("fill") < 0 && element.style.push({key: 'fill', value: "none"});
          keys.indexOf("stroke") < 0 && element.style.push({key: 'stroke', value: "black"});
        }
        return element;
      }

      function addNodeAttribute(name) {
        return function(node) {
          cursor[name] = node.value;
        };
      }

      var visit = pegast.nodeVisitor({
        digraph: startGroup('commands'),
        graph: visitSubnodes('attributes'),
        subgraph: startGroup('commands'),
        struct: visitSubnodes('commands'),
        node: startGroup('attributes'),
        relation: startGroup('attributes'),
        draw: addShapesAndLabels,
        hdraw: addShapesAndLabels,
        tdraw: addShapesAndLabels,
        ldraw: addShapesAndLabels,
        hldraw: addShapesAndLabels,
        tldraw: addShapesAndLabels,
        url: addNodeAttribute('url'),
        tooltip: addNodeAttribute('tooltip'),
        size: function(node) {
          cursor.size = node.value.map(function(e) {
            return e*72;
          });
        }
      });
      visit(ast);

      return {
        main: result.shift(),
        groups: result
      };
    }
  };
});