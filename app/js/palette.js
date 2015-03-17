define(['d3'], function (d3) {
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

  var bspline = d3.svg.line()
    .x(function(d) { return d[0]; })
    .y(function(d) { return d[1]; })
    .interpolate("basis");

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
      return bspline(d.points);
    },
    polyline: function (d) {
      return path(d.points, "L");
    }
  };
});