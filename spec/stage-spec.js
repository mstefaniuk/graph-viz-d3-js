define(["rfactory!stage", 'spec/shapes/directed/table'], function (stageFactory, shapes) {

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
      expect(typeof result.document).toBe("function");
      expect(typeof result.canvas).toBe("function");
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

    it("should init graph when element name is provided", function () {
      var element = "element";
      stage.init(element);
      expect(d3Spy.select).toHaveBeenCalledWith(element);
      expect(d3Spy.element.append).toHaveBeenCalledWith("svg");
      expect(d3Spy.element.svg.append).toHaveBeenCalledWith("polygon");
      expect(d3Spy.element.svg.append).toHaveBeenCalledWith("g");
      expect(d3Spy.element.svg.g.append).toHaveBeenCalledWith("g");
    });

    it("should init graph without zoom when object with element only is provided", function () {
      var definition = {
        element: "element"
      };
      stage.init(definition);
      expect(d3Spy.select).toHaveBeenCalledWith(definition.element);
      expect(d3Spy.behavior.zoom).not.toHaveBeenCalled();
      expect(d3Spy.element.append).toHaveBeenCalledWith("svg");
      expect(d3Spy.element.svg.append).toHaveBeenCalledWith("polygon");
      expect(d3Spy.element.svg.append).toHaveBeenCalledWith("g");
    });

    it("should init graph with default zoom when object with zoom true key is provided", function () {
      var definition = {
        element: "element",
        zoom: true
      };
      stage.init(definition);
      expect(d3Spy.select).toHaveBeenCalledWith(definition.element);
      expect(d3Spy.behavior.zoom.scaleExtent).toHaveBeenCalledWith([0.1, 10]);
      expect(d3Spy.behavior.zoom.on).toHaveBeenCalledWith("zoom", jasmine.any(Function));
      expect(d3Spy.element.append).toHaveBeenCalledWith("svg");
      expect(d3Spy.element.svg.append).toHaveBeenCalledWith("polygon");
      expect(d3Spy.element.svg.append).toHaveBeenCalledWith("g");
    });

    it("should init graph with defined extent when object with zoom extent key is provided", function () {
      var expected = [0.5, 20];
      var definition = {
        element: "element",
        zoom: {
          extent: expected
        }
      };
      stage.init(definition);
      expect(d3Spy.select).toHaveBeenCalledWith(definition.element);
      expect(d3Spy.behavior.zoom.scaleExtent).toHaveBeenCalledWith(expected);
      expect(d3Spy.behavior.zoom.on).toHaveBeenCalledWith("zoom", jasmine.any(Function));
      expect(d3Spy.element.append).toHaveBeenCalledWith("svg");
      expect(d3Spy.element.svg.append).toHaveBeenCalledWith("polygon");
      expect(d3Spy.element.svg.append).toHaveBeenCalledWith("g");
    });

    it("should set zoom scale when only scale is provided", function () {
      var expected = 15;
      var zoom = {
        scale: expected
      };
      var definition = {
        element: "element",
        zoom: true
      };
      stage.init(definition);
      stage.setZoom(zoom);
      expect(d3Spy.behavior.zoom.scale).toHaveBeenCalledWith(expected);
    });

    it("should set zoom translate when only translate is provided", function () {
      var expected = [12, 15];
      var zoom = {
        translate: expected
      };
      var definition = {
        element: "element",
        zoom: true
      };
      stage.init(definition);
      stage.setZoom(zoom);
      expect(d3Spy.behavior.zoom.translate).toHaveBeenCalledWith(expected);
    });

    it("should set zoom translate when only translate is provided", function () {
      var expectedTranslate = [12, 15];
      var expectedScale = 15;
      var zoom = {
        scale: expectedScale,
        translate: expectedTranslate
      };
      var definition = {
        element: "element",
        zoom: true
      };
      stage.init(definition);
      stage.setZoom(zoom);
      expect(d3Spy.behavior.zoom.scale).toHaveBeenCalledWith(expectedScale);
      expect(d3Spy.behavior.zoom.translate).toHaveBeenCalledWith(expectedTranslate);
    });

    it("should return contents of parent when svg source is requested", function () {
      var element = "element";
      var source = "svg-source";
      stage.init(element);
      d3Spy.element.svg.node = function () {
        return {
          parentNode: {
            innerHTML: source
          }
        };
      };

      var result = stage.svg();
      expect(result).toEqual(source);
    });

    it("should draw svg and delegate transitions", function () {
      var transitionsSpy = jasmine.createSpyObj('transitions',
              ['document', 'canvas', 'nodes', 'relations', 'shapes', 'exits', 'labels']);

      stage.transitions(transitionsSpy);
      stage.init("root");
      stage.draw(shapes);

      var svg = d3Spy.root.svg;
      expect(transitionsSpy.document).toHaveBeenCalledWith(svg, jasmine.any(Function));
      expect(transitionsSpy.canvas).toHaveBeenCalledWith(svg.polygon, jasmine.any(Function));
      expect(svg.g.g.all$g.data.mostRecentCall.args[0]).toEqual(shapes.groups);

      var groups = svg.g.g.all$g;
      expect(groups.enter).toHaveBeenCalled();
      expect(groups.g['filtered$.node']).toBeDefined();
      expect(transitionsSpy.nodes).toHaveBeenCalledWith(groups.g['filtered$.node'], jasmine.any(Function));
      expect(groups.g['filtered$.relation']).toBeDefined();
      expect(transitionsSpy.relations).toHaveBeenCalledWith(groups.g['filtered$.relation'], jasmine.any(Function));
      expect(groups.exit).toHaveBeenCalled();
      expect(transitionsSpy.exits).toHaveBeenCalledWith(groups, jasmine.any(Function));

      expect(groups.sort).toHaveBeenCalled();
      expect(groups.all$path.data).toHaveBeenCalled();
      expect(groups.all$path.append).toHaveBeenCalled();
      expect(transitionsSpy.shapes).toHaveBeenCalledWith(groups.all$path, jasmine.any(Function));
    });
  });

  function d3SpyFactory() {
    var  d3Spy = d3SelectionSpyGenerator(null, 'selection');

    d3Spy.behavior = jasmine.createSpyObj("behavior", ["zoom"]);
    d3Spy.behavior.zoom.andCallFake(function() {
      var operators = ['on', 'scaleExtent', 'scale', 'translate'];
      var zoomSpy = jasmine.createSpyObj("zoom", operators);
      operators.map(function (key) {
        zoomSpy[key].andReturn(zoomSpy);
        d3Spy.behavior.zoom[key] = zoomSpy[key];
      });
      return zoomSpy;
    });
    return d3Spy;
  }

  function d3SelectionSpyGenerator(parent, name) {
    if (parent && parent[name]) {
      return parent[name];
    }

    var selectors = ['append', 'select', 'selectAll', 'filter'];
    var operators = ['attr', 'enter', 'text', 'data', 'exit', 'sort', 'call'];
    var spy = jasmine.createSpyObj(name, selectors.concat(operators));

    operators.map(function (key) {
      spy[key].andReturn(spy);
    });

    spy.select.andCallFake(function (tag) {
      return d3SelectionSpyGenerator(this, tag);
    });
    spy.selectAll.andCallFake(function (tag) {
      return d3SelectionSpyGenerator(this, "all$" + tag);
    });
    spy.filter.andCallFake(function (filter) {
      return d3SelectionSpyGenerator(this, "filtered$" + filter);
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