define(["rfactory!renderer"], function(rendererFactory) {

  describe("Dot source renderer", function() {

    var stageSpy, workerSpy, callbackSpy, renderer;
    beforeEach(function () {
      stageSpy = jasmine.createSpyObj('stage', ["init", "draw", "svg", "getImage"]);
      workerSpy = jasmine.createSpyObj('worker', ['postMessage']);
      callbackSpy = jasmine.createSpy("callback");
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

    it("should send source directly when worker is already initialized", function() {
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
      renderer.renderHandler(callbackSpy);
      workerSpy.onmessage({
        data: {
          type: "stage",
          body: {}
        }
      });
      expect(callbackSpy).toHaveBeenCalled();
      expect(stageSpy.draw).toHaveBeenCalledWith({});
    });

    it("should return error when rendering failed", function() {
      var output = "output", source = "source";
      renderer.errorHandler(callbackSpy);
      workerSpy.onmessage({
        data: {
          type: "ready"
        }
      });
      renderer.render(source);
      workerSpy.onmessage({
        data: {
          type: "error",
          body: output
        }
      });
      expect(workerSpy.postMessage).toHaveBeenCalledWith(source);
      expect(stageSpy.draw).not.toHaveBeenCalled();
      expect(callbackSpy).toHaveBeenCalledWith(output);
    });
  });
});