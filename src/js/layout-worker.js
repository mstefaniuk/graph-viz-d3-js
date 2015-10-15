importScripts('../../lib/requirejs/require.js');
importScripts('../main.js');

require({
    baseUrl: "."
  },
  ["transformer"],
  function(transformer) {

    onmessage = function(event) {
      var result;
      try {
        result = transformer.generate(event.data);
      } catch (e) {
        postMessage({
          type: "error",
          body: e
        });
      }
      postMessage({
        type: "stage",
        body: result
      });
    };

    postMessage({
      type: "ready"
    });
  }
);