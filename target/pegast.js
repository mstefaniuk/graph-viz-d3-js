define([], function () {
  return {
    nodeVisitor: function (functions) {
      return function (node) {
        return functions[node.type]!==undefined ? functions[node.type].apply(null, arguments) : function () {};
      };
    }
  }
});