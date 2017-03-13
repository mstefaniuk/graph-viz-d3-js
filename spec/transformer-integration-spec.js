define(['transformer', 'spec/shapes/longer-labels',
    'text!spec/dots/directed/switch.gv', 'spec/shapes/directed/switch',
    'text!spec/dots/directed/table.gv', 'spec/shapes/directed/table',
    'text!spec/dots/adept.gv', 'spec/shapes/adept', 'spec/shapes/double-quotes',
    'spec/shapes/multiple-edges'],
  function (transformer, longerLabels, switchSource, switchShape, tableSource, tableShape,
            adeptSource, adeptShape, doubleQuotesShape, multipleEdgesShape) {
  describe('Transformer', function() {
    it("should extract node shapes correctly when labels are longer than 4 chars", function() {
      var stage = transformer.generate("digraph { longer -> labels -> ok}");
      expect(stage).toEqual(longerLabels);
    });

    xit("should handle struct with multiple edges", function() {
      var stage = transformer.generate(switchSource);
      expect(stage).toEqual(switchShape);
    });

    xit("should handle diagrams with html tables", function() {
      var stage = transformer.generate(tableSource);
      expect(stage).toEqual(tableShape);
    });

    it("should handle undirected diagrams", function() {
      var stage = transformer.generate(adeptSource);
      expect(stage).toEqual(adeptShape);
    });

    xit("should handle diagrams with html tables", function() {
      var stage = transformer.generate(
        'digraph G { G[ label="google.com" shape=box URL="http://google.com" tooltip="Click me!" style="filled" fillcolor="#5cb85c" color="#5cb85c" fontcolor="#ffffff"];}'
      );
      expect(stage).toEqual(tableShape);
    });

    it("should handle diagrams with escaped quotes", function() {
      var stage = transformer.generate('digraph G {mynode [ label="Some \\\" quote" ];}');
      expect(stage).toEqual(doubleQuotesShape);
    });

    it("should handle multiple edges between nodes", function() {
      var stage = transformer.generate([
        "digraph G {",
        "  A; B; C",
        "  subgraph Rel1 {",
        "    edge [dir=none, color=red]",
        "    A -> B -> C -> A",
        "  }",
        "  subgraph Rel2 {",
        "    edge [color=blue]",
        "    B -> C",
        "    C -> A",
        "  }",
        "}"
      ].join("\n"));
      expect(stage).toEqual(multipleEdgesShape);
    });
  });
});