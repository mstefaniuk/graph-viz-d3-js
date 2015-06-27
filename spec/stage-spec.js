define(["rfactory!stage"], function(stageFactory) {

  describe("Stage", function() {

    var d3Spy, paletteSpy, stage;
    beforeEach(function () {
      d3Spy = jasmine.createSpyObj('d3', ["select", "append"]);
      paletteSpy = jasmine.createSpyObj('palette', ['polygon', 'ellipse', 'circle', 'rect', 'path', 'bspline', 'polyline']);
      d3Spy.select.andReturn(d3Spy);
      d3Spy.append.andReturn(d3Spy);
      stage = stageFactory({
        'd3': d3Spy,
        "palette": paletteSpy
      });
    });

    it("should provide current transitions", function() {
      var result = stage.transitions();
      expect(typeof result.stage).toBe("function");
      expect(typeof result.nodes).toBe("function");
      expect(typeof result.relations).toBe("function");
      expect(typeof result.shapes).toBe("function");
      expect(typeof result.exits).toBe("function");
      expect(typeof result.labels).toBe("function");
    });

    it("should allow to replace default transitions", function() {
      var replacement = {};
      stage.transitions(replacement);
      expect(stage.transitions()).toEqual(replacement);
    });

    it("should init graph with svg and g elements", function() {
      var element = "element";
      stage.init(element);
      expect(d3Spy.select.mostRecentCall.args).toEqual([element]);
      expect(d3Spy.append.calls[0].args).toEqual(["svg"]);
      expect(d3Spy.append.calls[1].args).toEqual(["g"]);
    });
  });

});