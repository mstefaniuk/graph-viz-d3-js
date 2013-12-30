/**
 * Author: Marcin Stefaniuk
 * Date: 30.12.13 05:14
 */

define(["d3"], function (d3) {
  var line = d3.svg
    .line()
    .x(function (d) {
      return d[0];
    })
    .y(function (d) {
      return -d[1];
    })
    .interpolate("bundle");

  return {
    polygon: function (d) {
      return [
        "M",
        [d.points[0][0], -d.points[0][1]].join(','),
        "L",
        d.points.slice(1, d.points.length)
          .map(function (e) {
            return [e[0], -e[1]].join(",")
          }),
        "Z"].join(" ");
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
      return line(d.points)
    },
    bspline: function () {
    },
    polyline: function () {
    }
  };
});