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

    it("should init graph with svg and g elements", function () {
      var element = "element";
      stage.init(element);
      expect(d3Spy.select).toHaveBeenCalledWith(element);
      expect(d3Spy.element.append).toHaveBeenCalledWith("svg");
      expect(d3Spy.element.svg.append).toHaveBeenCalledWith("polygon");
      expect(d3Spy.element.svg.append).toHaveBeenCalledWith("g");
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
      var transitionsSpy = jasmine.createSpyObj('transitions', ['document', 'canvas', 'nodes', 'relations', 'shapes', 'exits', 'labels']);

      stage.transitions(transitionsSpy);
      stage.init("root");
      stage.draw(shapes);

      var svg = d3Spy.root.svg;
      var sizes = {
        width: 424,
        height: 250,
        htranslate: 246,
        vtranslate: 4,
        scaleWidth: 1,
        scaleHeight: 1,
        style: shapes.main.shapes[0].style
      };
      expect(transitionsSpy.document).toHaveBeenCalledWith(svg, sizes);
      expect(transitionsSpy.canvas).toHaveBeenCalledWith(svg, sizes);
      expect(svg.g.all$g.data.mostRecentCall.args[0]).toEqual(shapes.groups);

      var groups = svg.g.all$g;
      expect(groups.enter).toHaveBeenCalled();
      expect(groups.g['filtered$.node']).toBeDefined();
      expect(transitionsSpy.nodes).toHaveBeenCalledWith(groups.g['filtered$.node']);
      expect(groups.g['filtered$.relation']).toBeDefined();
      expect(transitionsSpy.relations).toHaveBeenCalledWith(groups.g['filtered$.relation']);
      expect(groups.exit).toHaveBeenCalled();
      expect(transitionsSpy.exits).toHaveBeenCalledWith(groups);

      expect(groups.sort).toHaveBeenCalled();
      expect(groups.all$path.data).toHaveBeenCalled();
      expect(groups.all$path.append).toHaveBeenCalled();
      expect(transitionsSpy.shapes).toHaveBeenCalledWith(groups.all$path, paletteSpy);
    });
  });

  function d3SpyFactory() {
    return d3SelectionSpyGenerator(null, 'selection');
  }

  function d3SelectionSpyGenerator(parent, name) {
    if (parent && parent[name]) {
      return parent[name];
    }

    var selectors = ['append', 'select', 'selectAll', 'filter'];
    var operators = ['attr', 'enter', 'text', 'data', 'exit', 'sort'];
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