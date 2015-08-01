define("palette", [], function () {
  function e(e, t, n) {
    return ["M", [e[0][0], -e[0][1]].join(","), t, e.slice(1, e.length).map(function (e) {
      return [e[0], -e[1]].join(",")
    }), n === !0 ? "Z" : ""].join(" ").trim()
  }

  return {
    polygon: function (t) {
      return e(t.points, "L", !0)
    }, ellipse: function (e) {
      return ["M", [e.cx, -e.cy].join(","), "m", [-e.rx, 0].join(","), "a", [e.rx, e.ry].join(","), 0, "1,0", [2 * e.rx, 0].join(","), "a", [e.rx, e.ry].join(","), 0, "1,0", [-2 * e.rx, 0].join(",")].join(" ")
    }, circle: function (e) {
      return this.ellipse({cx: e.cx, cy: -e.cy, rx: e.r, ry: e.r})
    }, rect: function (e) {
      return this.polygon({points: [[e.x, -e.y], [e.x + e.width, -e.y], [e.x + e.width, -e.y + e.height], [e.x, -e.y + e.height]]})
    }, path: function (t) {
      return e(t.points, "C")
    }, bspline: function (t) {
      return e(t.points, "C")
    }, polyline: function (t) {
      return e(t.points, "L")
    }
  }
}), define("transitions/default", [], function () {
  return {
    stage: function (e, t, n, r, i, s, o) {
      e.transition().delay(150).duration(700).attr("width", t + "pt").attr("height", n + "pt").attr("viewBox", [0, 0, t, n].join(" ")).select("g").attr("transform", "scale(" + r + " " + i + ")" + " " + "translate(" + s + "," + o + ")")
    }, nodes: function (e) {
      e.style("opacity", 0).transition().delay(150).duration(900).style("opacity", 1)
    }, relations: function (e) {
      e.style("opacity", 0).transition().delay(150).duration(900).style("opacity", 1)
    }, exits: function (e) {
      e.transition().duration(100).style("opacity", 0).remove()
    }, shapes: function (e, t) {
      e.transition().delay(150).duration(900).attr("d", function (e) {
        var n = e.shape;
        return t[n](e)
      }).attr("style", function (e) {
        return e.style.map(function (e) {
          return [e.key, e.value].join(":")
        }).join(";")
      })
    }, labels: function (e) {
      e.transition().delay(150).duration(900).attr("x", function (e) {
        return e.x
      }).attr("y", function (e) {
        return -e.y
      }).text(function (e) {
        return e.text
      })
    }
  }
}), define("stage", ["d3", "palette", "transitions/default"], function (e, t, n) {
  var r, i, s = {digraph: 0, subgraph: 1, node: 2, relation: 3}, o = n;
  return {
    init: function (t) {
      r = e.select(t).append("svg"), i = r.append("g")
    }, transitions: function (e) {
      if (!e)return o;
      o = e
    }, draw: function (e) {
      var n = 2, u = e.main.shapes[0].points[2][0] + n * 2, a = e.main.shapes[0].points[2][1] + n * 2, f = e.main.shapes[0].points[2][1] + n, l = n, c = e.main.size || [u, a], h = u > c[0] || a > c[1], p = h ? c[0] / u : 1, d = h ? c[1] / a : 1, v = d > p ? d = p : p = d, m = a * v, g = u * v;
      o.stage(r, g, m, p, d, l, f);
      var y = i.selectAll("g").data(e.groups, function (e) {
        return e.id
      }), b = y.enter().append("g").attr("class", function (e) {
        return e.class
      });
      b.append("title").text(function (e) {
        return e.id
      }), o.nodes(b.filter(".node")), o.relations(b.filter(".relation")), o.exits(y.exit()), y.sort(function (e, t) {
        return s[e.class] - s[t.class]
      });
      var w = y.selectAll("path").data(function (e) {
        return e.shapes
      }, function (e, t) {
        return [e.shape, t].join("-")
      });
      w.enter().append("path"), o.shapes(w, t);
      var E = y.selectAll("text").data(function (e) {
        return e.labels
      });
      E.enter().append("text"), o.labels(E)
    }
  }
}), define("worker", [], function () {
  return {
    version: "1.0.1", load: function (e, t, n, r) {
      if (r.isBuild) {
        n();
        return
      }
      var i = t.toUrl(e);
      window.Worker ? n(new Worker(i)) : t(["worker-fake"], function () {
        n(new Worker(i))
      })
    }
  }
}), define("renderer", ["stage", "worker!layout-worker.js"], function (e, t) {
  var n = !1, r;
  return t.onmessage = function (i) {
    switch (i.data.type) {
      case"ready":
        n = !0, r && t.postMessage(r);
        break;
      case"stage":
        e.draw(i.data.body)
    }
  }, {
    init: function (t) {
      e.init(t)
    }, render: function (e) {
      n ? t.postMessage(e) : r = e
    }
  }
});