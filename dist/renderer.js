define('palette',[],function () {
  function path(points, command, close) {
    return [
      "M",
      [points[0][0], -points[0][1]].join(','),
      command,
      points.slice(1, points.length)
        .map(function (e) {
          return [e[0], -e[1]].join(",");
        }), close===true ? "Z" : ""
    ].join(" ").trim();
  }

  return {
    polygon: function (d) {
      return path(d.points, "L", true);
    },
    ellipse: function (d) {
      return [
        'M', [d.cx, -d.cy].join(','),
        'm', [-d.rx, 0].join(','),
        'a', [d.rx, d.ry].join(','),
        0, "1,0", [2 * d.rx, 0].join(','),
        'a', [d.rx, d.ry].join(','),
        0, "1,0", [-2 * d.rx, 0].join(',')].join(' ');
    },
    circle: function (d) {
      return this.ellipse({
        cx: d.cx,
        cy: -d.cy,
        rx: d.r,
        ry: d.r
      });
    },
    rect: function (d) {
      return this.polygon({
        points: [
          [d.x, -d.y],
          [d.x + d.width, -d.y],
          [d.x + d.width, -d.y + d.height],
          [d.x, -d.y + d.height]
        ]
      });
    },
    path: function (d) {
      return path(d.points, "C");
    },
    bspline: function (d) {
      return path(d.points, "C");
    },
    polyline: function (d) {
      return path(d.points, "L");
    }
  };
});
define('transitions/default',[], function() {
  return {
    document: function(selection, attributer) {
      selection
        .transition()
        .delay(150)
        .duration(700)
        .call(attributer);
    },
    canvas: function (selection, attributer) {
      selection
        .transition()
        .delay(150)
        .duration(900)
        .call(attributer);
    },
    nodes: function (selection, attributer) {
      selection
        .style("opacity", 0.0)
        .transition()
        .delay(150)
        .duration(900)
        .call(attributer);
    },
    relations: function (selection, attributer) {
      selection
        .style("opacity", 0.0)
        .transition()
        .delay(150)
        .duration(900)
        .call(attributer);
    },
    exits: function (selection, attributer) {
      selection
        .transition()
        .duration(100)
        .style("opacity", 0.0)
        .call(attributer);
    },
    shapes: function (shapes, attributer) {
      shapes
        .transition()
        .delay(150)
        .duration(900)
        .call(attributer);
    },
    labels: function (labels, attributer) {
      labels
        .transition()
        .delay(150)
        .duration(900)
        .call(attributer);
    }
  };
});
define('stage',["d3", "palette", "transitions/default"], function (d3, palette, defaults) {
    var svg, main;
    var order = {
      digraph: 0,
      subgraph: 1,
      node: 2,
      relation: 3
    };
    var transitions = defaults;

    function calculateSizes(main) {
      var margin = 4,
        boundingWidth = main.shapes[0].points[2][0] + margin*2,
        boundingHeight = main.shapes[0].points[2][1] + margin*2,
        htranslate = main.shapes[0].points[2][1] + margin,
        vtranslate = margin,
        size = main.size || [boundingWidth, boundingHeight];
      var oversized = boundingWidth > size[0] || boundingHeight > size[1];
      var scaleWidth = oversized ? size[0] / boundingWidth : 1;
      var scaleHeight = oversized ? size[1] / boundingHeight : 1;
      var ratio = scaleHeight > scaleWidth ? scaleHeight = scaleWidth : scaleWidth = scaleHeight;
      var height = boundingHeight * ratio;
      var width = boundingWidth * ratio;

      return {
        width: width,
        height: height,
        htranslate: htranslate,
        vtranslate: vtranslate,
        scaleWidth: scaleWidth,
        scaleHeight: scaleHeight,
        style: main.shapes[0].style
      };
    }

    var labelAttributer = function() {
      this
        .attr("x", function (d) {
          return d.x;
        })
        .attr("y", function (d) {
          return -d.y;
        })
        .text(function (d) {
          return d.text;
        });

      this.each(function(d) {
        var self = d3.select(this);
        d.style.forEach(function(e) {
          self.style(e.key, e.value);
        });
      });
    };

    return {
      init: function (element) {
        svg = d3.select(element).append("svg")
          .attr("version", 1.1)
          .attr("xmlns", "http://www.w3.org/2000/svg");
        svg.append("style")
          .attr("type", "text/css")
          .text('path {fill: transparent} text {text-anchor: middle; font-family:"Times-Roman",serif; font-size: 10pt}');
        svg.append("polygon").attr("stroke", "none");
        main = svg.append("g");
      },
      svg: function () {
        return svg.node().parentNode.innerHTML;
      },
      transitions: function (custom) {
        if (custom) {
          transitions = custom;
        } else {
          return transitions;
        }
      },
      draw: function (stage) {
        var sizes = calculateSizes(stage.main);
        var area = [0, 0, sizes.width, sizes.height];

        transitions.document(svg, function() {
          this
            .attr("width", sizes.width + "pt")
            .attr("height", sizes.height + "pt")
            .attr("viewBox", area.join(' '))
            .select("g")
            .attr("transform", "scale(" + sizes.scaleWidth + " " + sizes.scaleHeight + ")" +
              " " + "translate(" + sizes.vtranslate + "," + sizes.htranslate + ")");
        });

        var polygon = svg.select("polygon");
        transitions.canvas(polygon, function() {
          this
            .attr("points", function () {
              return [[0,0],[0,sizes.height],[sizes.width,sizes.height],[sizes.width,0]]
                .map(function (e) {
                  return e.join(",");
                }).join(" ");
            });
          var self = this;
          sizes.style.forEach(function(e) {
            self.style(e.key, e.value);
          });
        });

        var label = main.selectAll("text")
          .data(stage.main.labels);
        label.enter().append("text");
        transitions.labels(label, labelAttributer);

        var groups = main.selectAll("g")
          .data(stage.groups, function (d) {
            return d.id;
          });
        var entering = groups.enter()
          .append("g").attr("class", function (d) {
            return d.class;
          });
        entering.append("title").text(function (d) {
          return d.id;
        });

        transitions.nodes(entering.filter(".node"), function() {
          this.style("opacity", 1.0);
        });
        transitions.relations(entering.filter(".relation"), function() {
          this.style("opacity", 1.0);
        });
        transitions.exits(groups.exit(), function() {
          this.remove();
        });

        groups.sort(function (a, b) {
          return order[a.class] - order[b.class];
        });

        var shapes = groups.selectAll("path").data(function (d) {
            return d.shapes;
          }, function (d, i) {
            return [d.shape, i].join('-');
          }
        );
        shapes.enter().append("path");
        transitions.shapes(shapes, function() {
          this
            .attr("d", function (d) {
              var shape = d.shape;
              return palette[shape](d);
            })
            .attr("style", function (d) {
              return d.style.map(function (e) {
                return [e.key, e.value].join(':');
              }).join(';');
            });
        });

        var labels = groups.selectAll("text").data(function (d) {
          return d.labels;
        });
        labels.enter().append("text");
        transitions.labels(labels, labelAttributer);
      }
    };
  }
);
define('worker',[],function () {
	return {
		version: "1.0.1",
		load: function (name, req, onLoad, config) {
			if (config.isBuild) {
				//don't do anything if this is a build, can't inline a web worker
				onLoad();
				return;
			}

			var url = req.toUrl(name);

			if (window.Worker) {
				onLoad(new Worker(url));
			} else {
				req(["worker-fake"], function () {
					onLoad(new Worker(url));
				});
			}
		}
	};
});

define('renderer',["stage", "worker!layout-worker.js"], function(stage, worker) {

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
      stage.init(element);
    },
    render: function(source) {
      if (initialized) {
        worker.postMessage(source);
      } else {
        pending = source;
      }
    },
    getImage: function() {
      var svgXml = stage.svg();
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
