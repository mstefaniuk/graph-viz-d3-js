require.config({
  baseUrl: "js",
  paths: {
    parser: 'parser',
    d3: '../lib/d3/d3',
    ace: '../lib/ace',
    worker: '../lib/requirejs-web-workers/worker'
  },
  deps: ["app"]
});
