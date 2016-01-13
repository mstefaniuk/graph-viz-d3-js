define(["viz"], function(viz) {

  xdescribe("Viz.js", function() {

    it("should recover after unclosed quotes error", function() {
      expect(function() {
        viz([
          'digraph {',
          ' a -> b [label="erroneous]',
          '}'].join("\n"));
      }).toThrow();
      var svg = viz([
        'digraph {',
        ' a -> b [label="correcteous"]',
        '}'].join("\n"));
      expect(svg).toBeDefined();
    });
  });
});