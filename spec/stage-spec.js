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

    describe("object", function() {
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
        expect(d3Spy.element.svg.append).toHaveBeenCalledWith("g");
        expect(d3Spy.element.svg.g.append).toHaveBeenCalledWith("g");
        expect(d3Spy.element.svg.g.g.append).toHaveBeenCalledWith("polygon");
      });

      it("should init graph without zoom when object with element only is provided", function () {
        var definition = {
          element: "element"
        };
        stage.init(definition);
        expect(d3Spy.select).toHaveBeenCalledWith(definition.element);
        expect(d3Spy.zoom).not.toHaveBeenCalled();
        expect(d3Spy.element.append).toHaveBeenCalledWith("svg");
        expect(d3Spy.element.svg.append).toHaveBeenCalledWith("g");
        expect(d3Spy.element.svg.g.g.append).toHaveBeenCalledWith("polygon");
      });

      it("should init graph with default zoom when object with zoom true key is provided", function () {
        var definition = {
          element: "element",
          zoom: true
        };
        stage.init(definition);
        expect(d3Spy.select).toHaveBeenCalledWith(definition.element);
        expect(d3Spy.zoom.scaleExtent).toHaveBeenCalledWith([0.1, 10]);
        expect(d3Spy.zoom.on).toHaveBeenCalledWith("zoom", jasmine.any(Function));
        expect(d3Spy.element.append).toHaveBeenCalledWith("svg");
        expect(d3Spy.element.svg.append).toHaveBeenCalledWith("g");
        expect(d3Spy.element.svg.g.g.append).toHaveBeenCalledWith("polygon");
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
        expect(d3Spy.zoom.scaleExtent).toHaveBeenCalledWith(expected);
        expect(d3Spy.zoom.on).toHaveBeenCalledWith("zoom", jasmine.any(Function));
        expect(d3Spy.element.append).toHaveBeenCalledWith("svg");
        expect(d3Spy.element.svg.append).toHaveBeenCalledWith("g");
        expect(d3Spy.element.svg.g.g.append).toHaveBeenCalledWith("polygon");
      });
    });

    describe("zoom", function() {
      beforeEach(function() {
        var definition = {
          element: "element",
          zoom: true
        };
        stage.init(definition);
      });

      it("should set zoom scale when only scale is provided", function () {
        var expected = 15;
        var zoom = {
          scale: expected
        };
        var expectedTranslate = [12, 15];
        d3Spy.zoomTransform.and.returnValue({
            k: expected,
            x: expectedTranslate[0],
            y: expectedTranslate[1]
        });
        stage.setZoom(zoom);
        expect(d3Spy.zoomTransform).toHaveBeenCalled();
        expect(d3Spy.zoomIdentity.scale).toHaveBeenCalledWith(expected);
        expect(d3Spy.zoomIdentity.translate).toHaveBeenCalledWith(expectedTranslate[0], expectedTranslate[1]);
      });

      it("should set zoom translate when only translate is provided", function () {
        var expected = [12, 15];
        var zoom = {
          translate: expected
        };
        var expectedScale = 23;
        d3Spy.zoomTransform.and.returnValue({
            k: expectedScale,
            x: expected[0],
            y: expected[1]
        });
        stage.setZoom(zoom);
        expect(d3Spy.zoomTransform).toHaveBeenCalled();
        expect(d3Spy.zoomIdentity.translate).toHaveBeenCalledWith(expected[0], expected[1]);
        expect(d3Spy.zoomIdentity.scale).toHaveBeenCalledWith(expectedScale);
      });

      it("should set zoom translate and scale when both are provided", function () {
        var expectedTranslate = [12, 15];
        var expectedScale = 15;
        var zoom = {
          scale: expectedScale,
          translate: expectedTranslate
        };
        d3Spy.zoomTransform.and.returnValue({
            k: expectedScale,
            x: expectedTranslate[0],
            y: expectedTranslate[1]
        });
        stage.setZoom(zoom);
        expect(d3Spy.zoomTransform).not.toHaveBeenCalled();
        expect(d3Spy.zoomIdentity.scale).toHaveBeenCalledWith(expectedScale);
        expect(d3Spy.zoomIdentity.translate).toHaveBeenCalledWith(expectedTranslate[0], expectedTranslate[1]);
      });
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

    xit("should draw svg and delegate transitions", function () {
      var transitionsSpy = jasmine.createSpyObj('transitions',
              ['document', 'canvas', 'nodes', 'relations', 'shapes', 'exits', 'labels']);

      stage.transitions(transitionsSpy);
      stage.init("root");
      stage.draw(shapes);

      var svg = d3Spy.root.svg;
      expect(transitionsSpy.document).toHaveBeenCalledWith(svg, jasmine.any(Function));
      expect(transitionsSpy.canvas).toHaveBeenCalledWith(svg.g.g.polygon, jasmine.any(Function));
      expect(svg.g.g.all$g.data.calls.mostRecent().args[0]).toEqual(shapes.groups);

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

    d3Spy.zoom = jasmine.createSpyObj("d3", ["zoom"]).zoom;
    d3Spy.zoom.and.callFake(function() {
      var operators = ['on', 'scaleExtent', 'scale', 'translate', 'event'];
      var zoomSpy = jasmine.createSpyObj("zoom", operators);
      operators.map(function (key) {
        zoomSpy[key].and.returnValue(zoomSpy);
        d3Spy.zoom[key] = zoomSpy[key];
      });
      return zoomSpy;
    });
    d3Spy.zoomTransform = jasmine.createSpyObj("d3", ["zoomTransform"]).zoomTransform;
    d3Spy.zoomTransform.and.callFake(function() {
      var operators = ["translate", "scale"];
      var zoomTransformSpy = jasmine.createSpyObj("zoomTransform", operators);
      operators.map(function (key) {
        zoomTransformSpy[key].and.returnValue(zoomTransformSpy);
        d3Spy.zoom[key] = zoomTransformSpy[key];
      });
      return zoomTransformSpy;
    });

    d3Spy.zoomIdentity = jasmine.createSpyObj("zoomIdentity", ["translate", "scale"]);
    d3Spy.zoomIdentity.translate.and.returnValue(d3Spy.zoomIdentity);
    d3Spy.zoomIdentity.scale.and.returnValue(d3Spy.zoomIdentity);
    d3Spy.zoomIdentity.x = 0;
    d3Spy.zoomIdentity.y = 0;
    d3Spy.zoomIdentity.k = 1;
    return d3Spy;
  }

  function d3SelectionSpyGenerator(parent, name) {
    if (parent && parent[name]) {
      return parent[name];
    }

    var selectors = ['append', 'select', 'selectAll', 'filter', 'node'];
    var operators = ['attr', 'enter', 'text', 'data', 'exit', 'sort', 'call'];
    var spy = jasmine.createSpyObj(name, selectors.concat(operators));

    operators.map(function (key) {
      spy[key].and.returnValue(spy);
    });

    spy.select.and.callFake(function (tag) {
      return d3SelectionSpyGenerator(this, tag);
    });
    spy.selectAll.and.callFake(function (tag) {
      return d3SelectionSpyGenerator(this, "all$" + tag);
    });
    spy.filter.and.callFake(function (filter) {
      return d3SelectionSpyGenerator(this, "filtered$" + filter);
    });
    spy.append.and.callFake(function (tag) {
      return d3SelectionSpyGenerator(this, tag);
    });
    spy.node.and.callFake(function () {
      return d3SelectionSpyGenerator(this, null);
    });

    if (parent) {
      parent[name] = spy;
    }

    return spy;
  }

});