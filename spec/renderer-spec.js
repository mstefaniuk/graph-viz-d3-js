define(["rfactory!renderer"], function(rendererFactory) {

  describe("Dot source renderer", function() {

    var stageSpy, workerSpy, renderer;
    beforeEach(function () {
      stageSpy = jasmine.createSpyObj('stage', ["init", "draw"]);
      workerSpy = jasmine.createSpyObj('worker', ['postMessage']);
      renderer = rendererFactory({
        'stage': stageSpy,
        "worker!layout-worker.js": workerSpy
      });
    });

    it("should init stage with provided element", function() {
      var element = "element";
      renderer.init(element);
      expect(stageSpy.init).toHaveBeenCalledWith(element);
    });

    it("should buffer source to be rendered until worker is initialized", function() {
      var source = "source";
      renderer.render(source);
      workerSpy.onmessage({
        data: {
          type: "ready"
        }
      });
      expect(workerSpy.postMessage).toHaveBeenCalledWith(source);
    });

    it("should send source directly wheh worker is already initialized", function() {
      var source = "source";
      workerSpy.onmessage({
        data: {
          type: "ready"
        }
      });
      renderer.render(source);
      expect(workerSpy.postMessage).toHaveBeenCalledWith(source);
    });

    it("should draw stage with output of worker", function() {
      var output = "output";
      workerSpy.onmessage({
        data: {
          type: "stage",
          body: output
        }
      });
      expect(stageSpy.draw).toHaveBeenCalledWith(output);
    });

  });
});