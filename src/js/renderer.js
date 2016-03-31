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
    getImage: function(obj) {
      if (!obj){
      	var obj = {reset: false};
      }
      var svgXml = stage.svg(obj);
      var scaleFactor = 1;

      if ("devicePixelRatio" in window) {
        if (window.devicePixelRatio > 1) {
          scaleFactor = window.devicePixelRatio;
        }
      }

      var svgImage = new Image();
      svgImage.src = "data:image/svg+xml;utf8," + svgXml;

      var pngImage = new Image();

      svgImage.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width = svgImage.width * scaleFactor;
        canvas.height = svgImage.height * scaleFactor;

        var context = canvas.getContext("2d");
        context.drawImage(svgImage, 0, 0, canvas.width, canvas.height);

        pngImage.src = canvas.toDataURL("image/png");
        pngImage.width = svgImage.width;
        pngImage.height = svgImage.height;
      };

      return pngImage;
    },
    errorHandler: function(handler) {
      callback = handler;
    }
  };

});