define(["d3", "palette", "transitions/default"], function (d3, palette, defaults) {
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
        svg = d3.select(element).append("svg")
          .attr("version", 1.1)
          .attr("xmlns", "http://www.w3.org/2000/svg");
        svg.append("style")
          .attr("type", "text/css")
          .text('path {fill: transparent} text {text-anchor: middle; font-family:"Times-Roman",serif; font-size: 10pt}');
        svg.append("polygon").attr("stroke", "none");
        main = svg.append("g");
      },
      svg: function() {
        return svg.node().parentNode.innerHTML;
      },
      transitions: function(custom) {
        if (custom) {
          transitions = custom;
        } else {
          return transitions;
        }
      },
      draw: function (stage) {

        transitions.stage(svg, stage.main);

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