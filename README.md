Graphviz *dot* in your browser
==============================

Bower component `graphviz-d3-renderer` renders [Graphviz](http://graphviz.org) source in the browser with [d3.js](https://github.com/mbostock/d3).
Check it out on [Graphviz fiddling website](http://graphviz.it/).

[![Build Status](https://travis-ci.org/mstefaniuk/graph-viz-d3-js.svg?branch=master)](https://travis-ci.org/mstefaniuk/graph-viz-d3-js)
[![Coverage Status](https://coveralls.io/repos/mstefaniuk/graph-viz-d3-js/badge.svg?branch=master)](https://coveralls.io/r/mstefaniuk/graph-viz-d3-js?branch=master)
![Forks](https://img.shields.io/github/forks/mstefaniuk/graph-viz-d3-js.svg)
![Stars](https://img.shields.io/github/stars/mstefaniuk/graph-viz-d3-js.svg)
[![Join the chat at https://gitter.im/mstefaniuk/graph-viz-d3-js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mstefaniuk/graph-viz-d3-js)

Contents
--------
* `dot` parser with lax mode to verify Graphviz input
* `dot` mode for ACE editor
* stage data renderer with `d3.js`

Design
------
DOT parser is written in [PEG.js](https://github.com/dmajda/pegjs) has lax mode to parse source to the end with all errors.
[Graphviz](http://graphviz.org) is embedded in browser using [viz.js](https://github.com/mdaines/viz.js).
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

```javascript
require(["renderer"],
	function (renderer) {
		dotSource = 'digraph xyz ...';
		// initialize svg stage. Have to get a return value from renderer.init 
		//   to properly reset the image.
	    zoomFunc = renderer.init({element:"#graph", extend:[0.1, 10]});

	    // update stage with new dot source
	    renderer.render(dotSource);
	    
	    // for saving the image, 
	    $('#copy-button').on('click', function(){
		    $('#copy-div').html(renderer.getImage({reset:true, zoomFunc:zoomFunc}));
	    });	  
	    
	    // if do not need to reset the image before saving the image
	    $('#copy-button').on('click', function(){
		    $('#copy-div').html(renderer.getImage());
	    });	
});  
```

Roadmap
-------
* Test suite using Graphviz gallery examples (50% done)
* Improve animations with path tweening and concatenation of arrow heads with arrow arcs
* Custom `viz.js` compile with `xdot` output only to optimize size

Building and contributing
-------
To make controlled changes you need `node` and `grunt`. When you add a new feature you must cover it with unit tests.
```bash
> grunt build test
```

When everything is ready you can build also dist version (takes some time).
```bash
> grunt all
```

License
-------
Currently project is available on LGPL so you can use it unmodified in free or commercial projects. If you add improvements
to it you must share them.
