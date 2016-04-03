define(["stage", "worker!layout-worker.js"], function(stage, worker) {

  var initialized = false, pending, callback;

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
        break;
      case "error":
        if (callback) {
          callback(event.data.body);
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
    // FIXME: expose stage
    getImage: function(reset) {
      return stage.getImage(reset);
    },
    errorHandler: function(handler) {
      callback = handler;
    }
  };

});