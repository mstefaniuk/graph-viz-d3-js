require.config({
  baseUrl: "js",
  shim: {
    exports: "Viz"
  },
  paths: {
    parser: '../../parser',
    d3: '../../lib/d3/d3',
    worker: '../../lib/requirejs-web-workers/worker',
    viz: '../lib/viz'
  }
});
