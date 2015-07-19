define(["stage", "worker!layout-worker.js"], function(stage, worker) {

  var initialized = false, pending;

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
    }
  };

  return {
    init: function(element) {
      stage.init(element);
    },
    render: function(source) {
      if (initialized) {
        worker.postMessage(source);
      } else {
        pending = source;
      }
    }
  };

});