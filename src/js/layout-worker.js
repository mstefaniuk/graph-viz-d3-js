importScripts('../../lib/requirejs/require.js');
importScripts('../main.js');

require({
    baseUrl: "."
  },
  ["transformer"],
  function(transformer) {

    onmessage = function(event) {
      var data = {
        type: "stage",
        body: transformer.generate(event.data)
      };
      postMessage(data);
    };

    postMessage({
      type: "ready"
    });
  }
);