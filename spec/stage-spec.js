define(["rfactory!stage"], function (stageFactory) {

  describe("Stage", function () {

    var paletteSpy, d3Spy, stage;
    beforeEach(function () {
      d3Spy = d3SpyFactory();
      paletteSpy = jasmine.createSpyObj('palette', ['polygon', 'ellipse', 'circle', 'rect', 'path', 'bspline', 'polyline']);
      stage = stageFactory({
        'd3': d3Spy,
        "palette": paletteSpy
      });
    });

    it("should provide current transitions", function () {
      var result = stage.transitions();
      expect(typeof result.stage).toBe("function");
      expect(typeof result.nodes).toBe("function");
      expect(typeof result.relations).toBe("function");
      expect(typeof result.shapes).toBe("function");
      expect(typeof result.exits).toBe("function");
      expect(typeof result.labels).toBe("function");
    });

    it("should allow to replace default transitions", function () {
      var replacement = {};
      stage.transitions(replacement);
      expect(stage.transitions()).toEqual(replacement);
    });

    it("should init graph with svg and g elements", function () {
      var element = "element";
      stage.init(element);
      expect(d3Spy.select).toHaveBeenCalledWith(element);
      expect(d3Spy.element.append).toHaveBeenCalledWith("svg");
      expect(d3Spy.element.svg.append).toHaveBeenCalledWith("g");
    });
  });

  function d3SpyFactory() {
    return d3SelectionSpyGenerator(null, 'selection');
  }

  function d3SelectionSpyGenerator(parent, name) {
    if (parent && parent[name]) {
      return parent[name];
    }

    var spy = jasmine.createSpyObj(name, ['append', 'select', 'attr', 'enter', 'text', 'data']);

    spy.attr.andReturn(spy);
    spy.enter.andReturn(spy);
    spy.data.andReturn(spy);

    spy.select.andCallFake(function(tag) {
      return d3SelectionSpyGenerator(this, tag);
    });
    spy.append.andCallFake(function (tag) {
      return d3SelectionSpyGenerator(this, tag);
    });

    if (parent) {
      parent[name] = spy;
    }

    return spy;
  }

});