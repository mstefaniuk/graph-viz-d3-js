importScripts('../../lib/requirejs/require.js');
importScripts('../main.js');

require({
    baseUrl: "."
  },
  ["transformer"],
  function(transformer) {

    onmessage = function(event) {
      try {
        var result = transformer.generate(event.data);
        postMessage({
          type: "stage",
          body: result
        });
      } catch (e) {
        postMessage({
          type: "error",
          body: e
        });
      }
    };

    postMessage({
      type: "ready"
    });
  }
);