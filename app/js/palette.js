/**
 * Author: Marcin Stefaniuk
 * Date: 30.12.13 05:14
 */

define([], function () {
  function path(points, command, close) {
    return [
      "M",
      [points[0][0], -points[0][1]].join(','),
      command,
      points.slice(1, points.length)
        .map(function (e) {
          return [e[0], -e[1]].join(",")
        }), close===true ? "Z" : ""
    ].join(" ");
  };

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
    bspline: function () {
    },
    polyline: function () {
    }
  };
});