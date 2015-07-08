define(["d3", "palette", "transitions-default"], function (d3, palette, defaults) {
    var svg, main;
    var order = {
      digraph: 0,
      subgraph: 1,
      node: 2,
      relation: 3
    };
    var transitions = defaults;

    return {
      init: function (element) {
        svg = d3.select(element).append("svg");
        main = svg.append("g");
      },
      transitions: function(custom) {
        if (custom) {
          transitions = custom;
        } else {
          return transitions;
        }
      },
      draw: function (stage) {
        var margin = 2,
          boundingWidth = stage.main.shapes[0].points[2][0] + margin*2,
          boundingHeight = stage.main.shapes[0].points[2][1] + margin*2,
          htranslate = stage.main.shapes[0].points[2][1] + margin,
          vtranslate = margin,
          size = stage.main.size || [boundingWidth, boundingHeight];
        var oversized = boundingWidth > size[0] || boundingHeight > size[1];
        var scaleWidth = oversized ? size[0] / boundingWidth : 1;
        var scaleHeight = oversized ? size[1] / boundingHeight : 1;
        var ratio = scaleHeight > scaleWidth ? scaleHeight = scaleWidth : scaleWidth = scaleHeight;
        var height = boundingHeight * ratio;
        var width = boundingWidth * ratio;

        transitions.stage(svg, width, height, scaleWidth, scaleHeight, vtranslate, htranslate);

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

        transitions.nodes(entering.filter(".node"));
        transitions.relations(entering.filter(".relation"));
        transitions.exits(groups.exit());

        groups.sort(function(a,b){
          return order[a.class]- order[b.class];
        });

        var shapes = groups.selectAll("path").data(function (d) {
            return d.shapes;
          }, function (d, i) {
            return [d.shape, i].join('-');
          }
        );
        shapes.enter().append("path");
        transitions.shapes(shapes, palette);

        var labels = groups.selectAll("text").data(function (d) {
          return d.labels;
        });
        labels.enter().append("text");
        transitions.labels(labels);
      }
    };
  }
);