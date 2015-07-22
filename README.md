Graphviz *dot* in your browser
==============================
Bower component `graphviz-d3-renderer` renders [Graphviz](http://graphviz.org) source in the browser with [d3.js](https://github.com/mbostock/d3).

[![Build Status](https://travis-ci.org/mstefaniuk/graph-viz-d3-js.svg?branch=master)](https://travis-ci.org/mstefaniuk/graph-viz-d3-js)
[![Coverage Status](https://coveralls.io/repos/mstefaniuk/graph-viz-d3-js/badge.svg?branch=master)](https://coveralls.io/r/mstefaniuk/graph-viz-d3-js?branch=master)
[![Forks](https://img.shields.io/github/forks/mstefaniuk/graph-viz-d3-js.svg)]
[![Stars](https://img.shields.io/github/stars/mstefaniuk/graph-viz-d3-js.svg)]

Contents
--------
* DOT parser with lax mode to verify input
* DOT mode for ACE editor
* WebWorker with DOT renderer, XDOT parser and AST transformer to stage data structure
* stage data renderer with d3.js

Design
------
DOT parser is written in [PEG.js](https://github.com/dmajda/pegjs) has lax mode to parse source to the end with all errors. [Graphviz](http://graphviz.org) is embedded in browser using [viz.js](https://github.com/mdaines/viz.js).
Instead of using SVG directly it uses `xdot` format and parses it. Data structure of the output is drawn using
[d3.js](https://github.com/mbostock/d3) with animations during rendering.

Roadmap
-------
* Default transitions and animations allowed to be customized
* Test suite using Graphviz gallery examples (50% done)
* Improve animations with path tweening and concatenation of arrow heads with arrow arcs
* ~~Move `viz.js` and `xdot` parsing to separate WebWorker~~
* Custom `viz.js` compile with `xdot` output only to optimize size

License
-------
Currently project is available on LGPL so you can use it unmodified in free or commercial projects. If you add improvements
to it you must share them.
