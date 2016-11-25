define(["stage", "worker!layout-worker.js"], function(stage, worker) {

  var initialized = false, pending, errorCallback, renderCallback;

  worker.onmessage = function (event) {
    switch (event.data.type) {
      case "ready":
        initialized = true;
        if (pending) {
          worker.postMessage(pending);
        }
        break;
      case "stage":
        stage.draw(event.data.body);
        renderCallback && renderCallback();
        break;
      case "error":
        if (errorCallback) {
          errorCallback(event.data.body);
        }
    }
  };

  return {
    init: function(element) {
      return stage.init(element);
    },
    render: function(source) {
      if (initialized) {
        worker.postMessage(source);
      } else {
        pending = source;
      }
    },
    stage: stage,
    errorHandler: function(handler) {
      errorCallback = handler;
    },
    renderHandler: function(handler) {
      renderCallback = handler;
    }
  };

});