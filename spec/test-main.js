var tests = [];
for (var file in window.__karma__.files) {
  if (/spec\.js$/.test(file)) {
    tests.push(file);
  }
}

requirejs.config({
  baseUrl: '/base/src/js',
  waitSeconds: 20,

  paths: {
    text: '../../lib/requirejs-text/text',
    d3: '../../lib/d3/d3',
    ace: '../../lib/ace',
    viz: '../../lib/viz.js/viz',
    spec: '../../spec',
    parser: '../../parser',
    rfactory: '../../lib/rfactory/rfactory',
    worker: '../../lib/requirejs-web-workers/worker'
  },

  shim: {
    d3: {
      exports: 'd3'
    },
    viz: {
      exports: "Viz"
    }
  },

  deps: ["rfactory"].concat(tests),

  callback: window.__karma__.start
});