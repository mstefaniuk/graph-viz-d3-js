Graphviz *dot* in your browser
==============================
Bower component `graphviz-d3-renderer` renders [Graphviz](http://graphviz.org) source in the browser with [d3.js](https://github.com/mbostock/d3). Check it out on [Graphviz fiddling website](http://graphviz.it/).

[![Build Status](https://travis-ci.org/mstefaniuk/graph-viz-d3-js.svg?branch=master)](https://travis-ci.org/mstefaniuk/graph-viz-d3-js)
[![Coverage Status](https://coveralls.io/repos/mstefaniuk/graph-viz-d3-js/badge.svg?branch=master)](https://coveralls.io/r/mstefaniuk/graph-viz-d3-js?branch=master)
![Forks](https://img.shields.io/github/forks/mstefaniuk/graph-viz-d3-js.svg)
![Stars](https://img.shields.io/github/stars/mstefaniuk/graph-viz-d3-js.svg)

Contents
--------
* `dot` parser with lax mode to verify Graphviz input
* `dot` mode for ACE editor
* stage data renderer with `d3.js`

Design
------
DOT parser is written in [PEG.js](https://github.com/dmajda/pegjs) has lax mode to parse source to the end with all errors. [Graphviz](http://graphviz.org) is embedded in browser using [viz.js](https://github.com/mdaines/viz.js).
Instead of using SVG directly it uses `xdot` format and parses it. Data structure of the output is drawn using
[d3.js](https://github.com/mbostock/d3) with animations during rendering.

Usage
-----
To include it in your project simply use `Bower`:
```
bower install graphviz-d3-renderer --save
```
Note that it needs `require.js` to work. Before loading proper paths should be defined for renderer and its dependecies (`d3.js` and `worker` for `require.js` plugin):
```javascript
requirejs.config({
	//By default load any module IDs from js/lib
	baseUrl: 'js',
	//except, if the module ID starts with "app",
	//load it from the js/app directory. paths
	//config is relative to the baseUrl, and
	//never includes a ".js" extension since
	//the paths config could be for a directory.
	paths: {
		d3: '/bower_components/d3/d3',
		"dot-checker": '/bower_components/graphviz-d3-renderer/dist/dot-checker',
		"layout-worker": '/bower_components/graphviz-d3-renderer/dist/layout-worker',
		worker: '/bower_components/requirejs-web-workers/src/worker',
		renderer: '/bower_components/graphviz-d3-renderer/dist/renderer'
	}
});
```
Then you can inject it into you app:
```javascript
require(["renderer"],
  function (renderer) {

  dotSource = 'digraph xyz ...';
  // initialize svg stage
  renderer.init("#graph");

  // update stage with new dot source
  renderer.render(dotSource);
});
```
Now you can even zoom / drag your graph
```css
<style>
  .overlay {
  	fill: none;
  	pointer-events: all;
  }
</style>
```
...
```javascript
require(["renderer"],
  function (renderer) {
    var data = some_data;
    renderer.init("#graph");
    renderer.render(data);
    var svg = d3.select("div#graph").select('svg').select('g')
        .call(d3.behavior.zoom().scaleExtent([0.1, 10.0]).on('zoom', zoom));
    svg.select('g').append('rect')
        .attr('class', 'overlay')
        .attr('width', 3000)
        .attr('height', 1000)
        .attr('x', 0)
        .attr('y', -800);
    function zoom() {
        svg.select('g').attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
    }
});
```
Roadmap
-------
* Test suite using Graphviz gallery examples (50% done)
* Improve animations with path tweening and concatenation of arrow heads with arrow arcs
* Custom `viz.js` compile with `xdot` output only to optimize size

License
-------
Currently project is available on LGPL so you can use it unmodified in free or commercial projects. If you add improvements
to it you must share them.
