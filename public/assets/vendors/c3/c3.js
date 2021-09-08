!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t = t || self).c3 = e());
})(this, function () {
  "use strict";
  function s(t) {
    return (s =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          })(t);
  }
  function l(t) {
    var e = this;
    (e.d3 = window.d3
      ? window.d3
      : "undefined" != typeof require
      ? require("d3")
      : void 0),
      (e.api = t),
      (e.config = e.getDefaultConfig()),
      (e.data = {}),
      (e.cache = {}),
      (e.axes = {});
  }
  function n(t) {
    (this.internal = new l(this)),
      this.internal.loadConfig(t),
      this.internal.beforeInit(t),
      this.internal.init(),
      this.internal.afterInit(t),
      (function e(i, n, r) {
        Object.keys(i).forEach(function (t) {
          (n[t] = i[t].bind(r)),
            0 < Object.keys(i[t]).length && e(i[t], n[t], r);
        });
      })(n.prototype, this, this);
  }
  function e(t, e) {
    var i = this;
    (i.component = t),
      (i.params = e || {}),
      (i.d3 = t.d3),
      (i.scale = i.d3.scaleLinear()),
      i.range,
      (i.orient = "bottom"),
      (i.innerTickSize = 6),
      (i.outerTickSize = this.params.withOuterTick ? 6 : 0),
      (i.tickPadding = 3),
      (i.tickValues = null),
      i.tickFormat,
      i.tickArguments,
      (i.tickOffset = 0),
      (i.tickCulling = !0),
      i.tickCentered,
      i.tickTextCharSize,
      (i.tickTextRotate = i.params.tickTextRotate),
      i.tickLength,
      (i.axis = i.generateAxis());
  }
  (e.prototype.axisX = function (t, e, i) {
    t.attr("transform", function (t) {
      return "translate(" + Math.ceil(e(t) + i) + ", 0)";
    });
  }),
    (e.prototype.axisY = function (t, e) {
      t.attr("transform", function (t) {
        return "translate(0," + Math.ceil(e(t)) + ")";
      });
    }),
    (e.prototype.scaleExtent = function (t) {
      var e = t[0],
        i = t[t.length - 1];
      return e < i ? [e, i] : [i, e];
    }),
    (e.prototype.generateTicks = function (t) {
      var e,
        i,
        n = [];
      if (t.ticks) return t.ticks.apply(t, this.tickArguments);
      for (i = t.domain(), e = Math.ceil(i[0]); e < i[1]; e++) n.push(e);
      return 0 < n.length && 0 < n[0] && n.unshift(n[0] - (n[1] - n[0])), n;
    }),
    (e.prototype.copyScale = function () {
      var t,
        e = this.scale.copy();
      return (
        this.params.isCategory &&
          ((t = this.scale.domain()), e.domain([t[0], t[1] - 1])),
        e
      );
    }),
    (e.prototype.textFormatted = function (t) {
      var e = this.tickFormat ? this.tickFormat(t) : t;
      return void 0 !== e ? e : "";
    }),
    (e.prototype.updateRange = function () {
      var t = this;
      return (
        (t.range = t.scale.rangeExtent
          ? t.scale.rangeExtent()
          : t.scaleExtent(t.scale.range())),
        t.range
      );
    }),
    (e.prototype.updateTickTextCharSize = function (t) {
      var a = this;
      if (a.tickTextCharSize) return a.tickTextCharSize;
      var o = { h: 11.5, w: 5.5 };
      return (
        t
          .select("text")
          .text(function (t) {
            return a.textFormatted(t);
          })
          .each(function (t) {
            var e = this.getBoundingClientRect(),
              i = a.textFormatted(t),
              n = e.height,
              r = i ? e.width / i.length : void 0;
            n && r && ((o.h = n), (o.w = r));
          })
          .text(""),
        (a.tickTextCharSize = o)
      );
    }),
    (e.prototype.isVertical = function () {
      return "left" === this.orient || "right" === this.orient;
    }),
    (e.prototype.tspanData = function (t, e, i) {
      var n = this,
        r = n.params.tickMultiline
          ? n.splitTickText(t, i)
          : [].concat(n.textFormatted(t));
      return (
        n.params.tickMultiline &&
          0 < n.params.tickMultilineMax &&
          (r = n.ellipsify(r, n.params.tickMultilineMax)),
        r.map(function (t) {
          return { index: e, splitted: t, length: r.length };
        })
      );
    }),
    (e.prototype.splitTickText = function (t, e) {
      var r,
        a,
        o,
        s = this,
        i = s.textFormatted(t),
        c = s.params.tickWidth;
      return "[object Array]" === Object.prototype.toString.call(i)
        ? i
        : ((!c || c <= 0) &&
            (c = s.isVertical()
              ? 95
              : s.params.isCategory
              ? Math.ceil(e(1) - e(0)) - 12
              : 110),
          (function t(e, i) {
            a = void 0;
            for (var n = 1; n < i.length; n++)
              if (
                (" " === i.charAt(n) && (a = n),
                (r = i.substr(0, n + 1)),
                (o = s.tickTextCharSize.w * r.length),
                c < o)
              )
                return t(e.concat(i.substr(0, a || n)), i.slice(a ? a + 1 : n));
            return e.concat(i);
          })([], i + ""));
    }),
    (e.prototype.ellipsify = function (t, e) {
      if (t.length <= e) return t;
      for (var i = t.slice(0, e), n = 3, r = e - 1; 0 <= r; r--) {
        var a = i[r].length;
        if (((i[r] = i[r].substr(0, a - n).padEnd(a, ".")), (n -= a) <= 0))
          break;
      }
      return i;
    }),
    (e.prototype.updateTickLength = function () {
      this.tickLength = Math.max(this.innerTickSize, 0) + this.tickPadding;
    }),
    (e.prototype.lineY2 = function (t) {
      var e = this,
        i = e.scale(t) + (e.tickCentered ? 0 : e.tickOffset);
      return e.range[0] < i && i < e.range[1] ? e.innerTickSize : 0;
    }),
    (e.prototype.textY = function () {
      var t = this.tickTextRotate;
      return t ? 11.5 - (t / 15) * 2.5 * (0 < t ? 1 : -1) : this.tickLength;
    }),
    (e.prototype.textTransform = function () {
      var t = this.tickTextRotate;
      return t ? "rotate(" + t + ")" : "";
    }),
    (e.prototype.textTextAnchor = function () {
      var t = this.tickTextRotate;
      return t ? (0 < t ? "start" : "end") : "middle";
    }),
    (e.prototype.tspanDx = function () {
      var t = this.tickTextRotate;
      return t ? 8 * Math.sin(Math.PI * (t / 180)) : 0;
    }),
    (e.prototype.tspanDy = function (t, e) {
      var i = this.tickTextCharSize.h;
      return (
        0 === e &&
          (i = this.isVertical()
            ? -((t.length - 1) * (this.tickTextCharSize.h / 2) - 3)
            : ".71em"),
        i
      );
    }),
    (e.prototype.generateAxis = function () {
      var w = this,
        v = w.d3,
        b = w.params;
      function T(t, m) {
        var S;
        return (
          t.each(function () {
            var t,
              e,
              i,
              n = (T.g = v.select(this)),
              r = this.__chart__ || w.scale,
              a = (this.__chart__ = w.copyScale()),
              o = w.tickValues ? w.tickValues : w.generateTicks(a),
              s = n.selectAll(".tick").data(o, a),
              c = s
                .enter()
                .insert("g", ".domain")
                .attr("class", "tick")
                .style("opacity", 1e-6),
              d = s.exit().remove(),
              l = s.merge(c);
            b.isCategory
              ? ((w.tickOffset = Math.ceil((a(1) - a(0)) / 2)),
                (e = w.tickCentered ? 0 : w.tickOffset),
                (i = w.tickCentered ? w.tickOffset : 0))
              : (w.tickOffset = e = 0),
              w.updateRange(),
              w.updateTickLength(),
              w.updateTickTextCharSize(n.select(".tick"));
            var u = l.select("line").merge(c.append("line")),
              h = l.select("text").merge(c.append("text")),
              g = l
                .selectAll("text")
                .selectAll("tspan")
                .data(function (t, e) {
                  return w.tspanData(t, e, a);
                }),
              p = g
                .enter()
                .append("tspan")
                .merge(g)
                .text(function (t) {
                  return t.splitted;
                });
            g.exit().remove();
            var f = n.selectAll(".domain").data([0]),
              _ = f.enter().append("path").merge(f).attr("class", "domain");
            switch (w.orient) {
              case "bottom":
                (t = w.axisX),
                  u
                    .attr("x1", e)
                    .attr("x2", e)
                    .attr("y2", function (t, e) {
                      return w.lineY2(t, e);
                    }),
                  h
                    .attr("x", 0)
                    .attr("y", function (t, e) {
                      return w.textY(t, e);
                    })
                    .attr("transform", function (t, e) {
                      return w.textTransform(t, e);
                    })
                    .style("text-anchor", function (t, e) {
                      return w.textTextAnchor(t, e);
                    }),
                  p
                    .attr("x", 0)
                    .attr("dy", function (t, e) {
                      return w.tspanDy(t, e);
                    })
                    .attr("dx", function (t, e) {
                      return w.tspanDx(t, e);
                    }),
                  _.attr(
                    "d",
                    "M" +
                      w.range[0] +
                      "," +
                      w.outerTickSize +
                      "V0H" +
                      w.range[1] +
                      "V" +
                      w.outerTickSize
                  );
                break;
              case "top":
                (t = w.axisX),
                  u
                    .attr("x1", e)
                    .attr("x2", e)
                    .attr("y2", function (t, e) {
                      return -1 * w.lineY2(t, e);
                    }),
                  h
                    .attr("x", 0)
                    .attr("y", function (t, e) {
                      return (
                        -1 * w.textY(t, e) -
                        (b.isCategory ? 2 : w.tickLength - 2)
                      );
                    })
                    .attr("transform", function (t, e) {
                      return w.textTransform(t, e);
                    })
                    .style("text-anchor", function (t, e) {
                      return w.textTextAnchor(t, e);
                    }),
                  p
                    .attr("x", 0)
                    .attr("dy", function (t, e) {
                      return w.tspanDy(t, e);
                    })
                    .attr("dx", function (t, e) {
                      return w.tspanDx(t, e);
                    }),
                  _.attr(
                    "d",
                    "M" +
                      w.range[0] +
                      "," +
                      -w.outerTickSize +
                      "V0H" +
                      w.range[1] +
                      "V" +
                      -w.outerTickSize
                  );
                break;
              case "left":
                (t = w.axisY),
                  u.attr("x2", -w.innerTickSize).attr("y1", i).attr("y2", i),
                  h
                    .attr("x", -w.tickLength)
                    .attr("y", w.tickOffset)
                    .style("text-anchor", "end"),
                  p.attr("x", -w.tickLength).attr("dy", function (t, e) {
                    return w.tspanDy(t, e);
                  }),
                  _.attr(
                    "d",
                    "M" +
                      -w.outerTickSize +
                      "," +
                      w.range[0] +
                      "H0V" +
                      w.range[1] +
                      "H" +
                      -w.outerTickSize
                  );
                break;
              case "right":
                (t = w.axisY),
                  u.attr("x2", w.innerTickSize).attr("y1", i).attr("y2", i),
                  h
                    .attr("x", w.tickLength)
                    .attr("y", w.tickOffset)
                    .style("text-anchor", "start"),
                  p.attr("x", w.tickLength).attr("dy", function (t, e) {
                    return w.tspanDy(t, e);
                  }),
                  _.attr(
                    "d",
                    "M" +
                      w.outerTickSize +
                      "," +
                      w.range[0] +
                      "H0V" +
                      w.range[1] +
                      "H" +
                      w.outerTickSize
                  );
            }
            if (a.rangeBand) {
              var x = a,
                y = x.rangeBand() / 2;
              r = a = function (t) {
                return x(t) + y;
              };
            } else r.rangeBand ? (r = a) : d.call(t, a, w.tickOffset);
            c.call(t, r, w.tickOffset),
              (S = (m ? l.transition(m) : l)
                .style("opacity", 1)
                .call(t, a, w.tickOffset));
          }),
          S
        );
      }
      return (
        (T.scale = function (t) {
          return arguments.length ? ((w.scale = t), T) : w.scale;
        }),
        (T.orient = function (t) {
          return arguments.length
            ? ((w.orient =
                t in { top: 1, right: 1, bottom: 1, left: 1 }
                  ? t + ""
                  : "bottom"),
              T)
            : w.orient;
        }),
        (T.tickFormat = function (t) {
          return arguments.length ? ((w.tickFormat = t), T) : w.tickFormat;
        }),
        (T.tickCentered = function (t) {
          return arguments.length ? ((w.tickCentered = t), T) : w.tickCentered;
        }),
        (T.tickOffset = function () {
          return w.tickOffset;
        }),
        (T.tickInterval = function () {
          var t;
          return (t = b.isCategory
            ? 2 * w.tickOffset
            : (T.g.select("path.domain").node().getTotalLength() -
                2 * w.outerTickSize) /
              T.g.selectAll("line").size()) ==
            1 / 0
            ? 0
            : t;
        }),
        (T.ticks = function () {
          return arguments.length
            ? ((w.tickArguments = arguments), T)
            : w.tickArguments;
        }),
        (T.tickCulling = function (t) {
          return arguments.length ? ((w.tickCulling = t), T) : w.tickCulling;
        }),
        (T.tickValues = function (t) {
          if ("function" == typeof t)
            w.tickValues = function () {
              return t(w.scale.domain());
            };
          else {
            if (!arguments.length) return w.tickValues;
            w.tickValues = t;
          }
          return T;
        }),
        T
      );
    });
  var Y = {
      target: "c3-target",
      chart: "c3-chart",
      chartLine: "c3-chart-line",
      chartLines: "c3-chart-lines",
      chartBar: "c3-chart-bar",
      chartBars: "c3-chart-bars",
      chartText: "c3-chart-text",
      chartTexts: "c3-chart-texts",
      chartArc: "c3-chart-arc",
      chartArcs: "c3-chart-arcs",
      chartArcsTitle: "c3-chart-arcs-title",
      chartArcsBackground: "c3-chart-arcs-background",
      chartArcsGaugeUnit: "c3-chart-arcs-gauge-unit",
      chartArcsGaugeMax: "c3-chart-arcs-gauge-max",
      chartArcsGaugeMin: "c3-chart-arcs-gauge-min",
      selectedCircle: "c3-selected-circle",
      selectedCircles: "c3-selected-circles",
      eventRect: "c3-event-rect",
      eventRects: "c3-event-rects",
      eventRectsSingle: "c3-event-rects-single",
      eventRectsMultiple: "c3-event-rects-multiple",
      zoomRect: "c3-zoom-rect",
      brush: "c3-brush",
      dragZoom: "c3-drag-zoom",
      focused: "c3-focused",
      defocused: "c3-defocused",
      region: "c3-region",
      regions: "c3-regions",
      title: "c3-title",
      tooltipContainer: "c3-tooltip-container",
      tooltip: "c3-tooltip",
      tooltipName: "c3-tooltip-name",
      shape: "c3-shape",
      shapes: "c3-shapes",
      line: "c3-line",
      lines: "c3-lines",
      bar: "c3-bar",
      bars: "c3-bars",
      circle: "c3-circle",
      circles: "c3-circles",
      arc: "c3-arc",
      arcLabelLine: "c3-arc-label-line",
      arcs: "c3-arcs",
      area: "c3-area",
      areas: "c3-areas",
      empty: "c3-empty",
      text: "c3-text",
      texts: "c3-texts",
      gaugeValue: "c3-gauge-value",
      grid: "c3-grid",
      gridLines: "c3-grid-lines",
      xgrid: "c3-xgrid",
      xgrids: "c3-xgrids",
      xgridLine: "c3-xgrid-line",
      xgridLines: "c3-xgrid-lines",
      xgridFocus: "c3-xgrid-focus",
      ygrid: "c3-ygrid",
      ygrids: "c3-ygrids",
      ygridLine: "c3-ygrid-line",
      ygridLines: "c3-ygrid-lines",
      axis: "c3-axis",
      axisX: "c3-axis-x",
      axisXLabel: "c3-axis-x-label",
      axisY: "c3-axis-y",
      axisYLabel: "c3-axis-y-label",
      axisY2: "c3-axis-y2",
      axisY2Label: "c3-axis-y2-label",
      legendBackground: "c3-legend-background",
      legendItem: "c3-legend-item",
      legendItemEvent: "c3-legend-item-event",
      legendItemTile: "c3-legend-item-tile",
      legendItemHidden: "c3-legend-item-hidden",
      legendItemFocused: "c3-legend-item-focused",
      dragarea: "c3-dragarea",
      EXPANDED: "_expanded_",
      SELECTED: "_selected_",
      INCLUDED: "_included_",
    },
    a = function (t) {
      return Math.ceil(t) + 0.5;
    },
    r = function (t) {
      return 10 * Math.ceil(t / 10);
    },
    R = function (t) {
      return t[1] - t[0];
    },
    N = function (t, e, i) {
      return k(t[e]) ? t[e] : i;
    },
    y = function (t) {
      var e = t.getBoundingClientRect(),
        i = [t.pathSegList.getItem(0), t.pathSegList.getItem(1)];
      return {
        x: i[0].x,
        y: Math.min(i[0].y, i[1].y),
        width: e.width,
        height: e.height,
      };
    },
    o = function (t) {
      return Array.isArray(t);
    },
    k = function (t) {
      return void 0 !== t;
    },
    u = function (t) {
      return (
        null == t ||
        (c(t) && 0 === t.length) ||
        ("object" === s(t) && 0 === Object.keys(t).length)
      );
    },
    h = function (t) {
      return "function" == typeof t;
    },
    c = function (t) {
      return "string" == typeof t;
    },
    v = function (t) {
      return void 0 === t;
    },
    P = function (t) {
      return t || 0 === t;
    },
    C = function (t) {
      return !u(t);
    },
    _ = function (t) {
      return "string" == typeof t
        ? t.replace(/</g, "&lt;").replace(/>/g, "&gt;")
        : t;
    },
    d = function i(t) {
      !(function (t, e) {
        if (!(t instanceof i))
          throw new TypeError("Cannot call a class as a function");
      })(this),
        (this.owner = t),
        (this.d3 = t.d3),
        (this.internal = e);
    };
  (d.prototype.init = function () {
    var t = this.owner,
      e = t.config,
      i = t.main;
    (t.axes.x = i
      .append("g")
      .attr("class", Y.axis + " " + Y.axisX)
      .attr("clip-path", e.axis_x_inner ? "" : t.clipPathForXAxis)
      .attr("transform", t.getTranslate("x"))
      .style("visibility", e.axis_x_show ? "visible" : "hidden")),
      t.axes.x
        .append("text")
        .attr("class", Y.axisXLabel)
        .attr("transform", e.axis_rotated ? "rotate(-90)" : "")
        .style("text-anchor", this.textAnchorForXAxisLabel.bind(this)),
      (t.axes.y = i
        .append("g")
        .attr("class", Y.axis + " " + Y.axisY)
        .attr("clip-path", e.axis_y_inner ? "" : t.clipPathForYAxis)
        .attr("transform", t.getTranslate("y"))
        .style("visibility", e.axis_y_show ? "visible" : "hidden")),
      t.axes.y
        .append("text")
        .attr("class", Y.axisYLabel)
        .attr("transform", e.axis_rotated ? "" : "rotate(-90)")
        .style("text-anchor", this.textAnchorForYAxisLabel.bind(this)),
      (t.axes.y2 = i
        .append("g")
        .attr("class", Y.axis + " " + Y.axisY2)
        .attr("transform", t.getTranslate("y2"))
        .style("visibility", e.axis_y2_show ? "visible" : "hidden")),
      t.axes.y2
        .append("text")
        .attr("class", Y.axisY2Label)
        .attr("transform", e.axis_rotated ? "" : "rotate(-90)")
        .style("text-anchor", this.textAnchorForY2AxisLabel.bind(this));
  }),
    (d.prototype.getXAxis = function (t, e, i, n, r, a, o) {
      var s = this.owner,
        c = s.config,
        d = {
          isCategory: s.isCategorized(),
          withOuterTick: r,
          tickMultiline: c.axis_x_tick_multiline,
          tickMultilineMax: c.axis_x_tick_multiline
            ? Number(c.axis_x_tick_multilineMax)
            : 0,
          tickWidth: c.axis_x_tick_width,
          tickTextRotate: o ? 0 : c.axis_x_tick_rotate,
          withoutTransition: a,
        },
        l = new this.internal(this, d).axis.scale(t).orient(e);
      return (
        s.isTimeSeries() &&
          n &&
          "function" != typeof n &&
          (n = n.map(function (t) {
            return s.parseDate(t);
          })),
        l.tickFormat(i).tickValues(n),
        s.isCategorized() &&
          (l.tickCentered(c.axis_x_tick_centered),
          u(c.axis_x_tick_culling) && (c.axis_x_tick_culling = !1)),
        l
      );
    }),
    (d.prototype.updateXAxisTickValues = function (t, e) {
      var i,
        n = this.owner,
        r = n.config;
      return (
        (r.axis_x_tick_fit || r.axis_x_tick_count) &&
          (i = this.generateTickValues(
            n.mapTargetsToUniqueXs(t),
            r.axis_x_tick_count,
            n.isTimeSeries()
          )),
        e ? e.tickValues(i) : (n.xAxis.tickValues(i), n.subXAxis.tickValues(i)),
        i
      );
    }),
    (d.prototype.getYAxis = function (t, e, i, n, r, a, o) {
      var s = this.owner,
        c = s.config,
        d = {
          withOuterTick: r,
          withoutTransition: a,
          tickTextRotate: o ? 0 : c.axis_y_tick_rotate,
        },
        l = new this.internal(this, d).axis.scale(t).orient(e).tickFormat(i);
      return (
        s.isTimeSeriesY()
          ? l.ticks(c.axis_y_tick_time_type, c.axis_y_tick_time_interval)
          : l.tickValues(n),
        l
      );
    }),
    (d.prototype.getId = function (t) {
      var e = this.owner.config;
      return t in e.data_axes ? e.data_axes[t] : "y";
    }),
    (d.prototype.getXAxisTickFormat = function () {
      var e = this.owner,
        i = e.config,
        n = e.isTimeSeries()
          ? e.defaultAxisTimeFormat
          : e.isCategorized()
          ? e.categoryName
          : function (t) {
              return t;
            };
      return (
        i.axis_x_tick_format &&
          (h(i.axis_x_tick_format)
            ? (n = i.axis_x_tick_format)
            : e.isTimeSeries() &&
              (n = function (t) {
                return t ? e.axisTimeFormat(i.axis_x_tick_format)(t) : "";
              })),
        h(n)
          ? function (t) {
              return n.call(e, t);
            }
          : n
      );
    }),
    (d.prototype.getTickValues = function (t, e) {
      return t || (e ? e.tickValues() : void 0);
    }),
    (d.prototype.getXAxisTickValues = function () {
      return this.getTickValues(
        this.owner.config.axis_x_tick_values,
        this.owner.xAxis
      );
    }),
    (d.prototype.getYAxisTickValues = function () {
      return this.getTickValues(
        this.owner.config.axis_y_tick_values,
        this.owner.yAxis
      );
    }),
    (d.prototype.getY2AxisTickValues = function () {
      return this.getTickValues(
        this.owner.config.axis_y2_tick_values,
        this.owner.y2Axis
      );
    }),
    (d.prototype.getLabelOptionByAxisId = function (t) {
      var e,
        i = this.owner.config;
      return (
        "y" === t
          ? (e = i.axis_y_label)
          : "y2" === t
          ? (e = i.axis_y2_label)
          : "x" === t && (e = i.axis_x_label),
        e
      );
    }),
    (d.prototype.getLabelText = function (t) {
      var e = this.getLabelOptionByAxisId(t);
      return c(e) ? e : e ? e.text : null;
    }),
    (d.prototype.setLabelText = function (t, e) {
      var i = this.owner.config,
        n = this.getLabelOptionByAxisId(t);
      c(n)
        ? "y" === t
          ? (i.axis_y_label = e)
          : "y2" === t
          ? (i.axis_y2_label = e)
          : "x" === t && (i.axis_x_label = e)
        : n && (n.text = e);
    }),
    (d.prototype.getLabelPosition = function (t, e) {
      var i = this.getLabelOptionByAxisId(t),
        n = i && "object" === s(i) && i.position ? i.position : e;
      return {
        isInner: 0 <= n.indexOf("inner"),
        isOuter: 0 <= n.indexOf("outer"),
        isLeft: 0 <= n.indexOf("left"),
        isCenter: 0 <= n.indexOf("center"),
        isRight: 0 <= n.indexOf("right"),
        isTop: 0 <= n.indexOf("top"),
        isMiddle: 0 <= n.indexOf("middle"),
        isBottom: 0 <= n.indexOf("bottom"),
      };
    }),
    (d.prototype.getXAxisLabelPosition = function () {
      return this.getLabelPosition(
        "x",
        this.owner.config.axis_rotated ? "inner-top" : "inner-right"
      );
    }),
    (d.prototype.getYAxisLabelPosition = function () {
      return this.getLabelPosition(
        "y",
        this.owner.config.axis_rotated ? "inner-right" : "inner-top"
      );
    }),
    (d.prototype.getY2AxisLabelPosition = function () {
      return this.getLabelPosition(
        "y2",
        this.owner.config.axis_rotated ? "inner-right" : "inner-top"
      );
    }),
    (d.prototype.getLabelPositionById = function (t) {
      return "y2" === t
        ? this.getY2AxisLabelPosition()
        : "y" === t
        ? this.getYAxisLabelPosition()
        : this.getXAxisLabelPosition();
    }),
    (d.prototype.textForXAxisLabel = function () {
      return this.getLabelText("x");
    }),
    (d.prototype.textForYAxisLabel = function () {
      return this.getLabelText("y");
    }),
    (d.prototype.textForY2AxisLabel = function () {
      return this.getLabelText("y2");
    }),
    (d.prototype.xForAxisLabel = function (t, e) {
      var i = this.owner;
      return t
        ? e.isLeft
          ? 0
          : e.isCenter
          ? i.width / 2
          : i.width
        : e.isBottom
        ? -i.height
        : e.isMiddle
        ? -i.height / 2
        : 0;
    }),
    (d.prototype.dxForAxisLabel = function (t, e) {
      return t
        ? e.isLeft
          ? "0.5em"
          : e.isRight
          ? "-0.5em"
          : "0"
        : e.isTop
        ? "-0.5em"
        : e.isBottom
        ? "0.5em"
        : "0";
    }),
    (d.prototype.textAnchorForAxisLabel = function (t, e) {
      return t
        ? e.isLeft
          ? "start"
          : e.isCenter
          ? "middle"
          : "end"
        : e.isBottom
        ? "start"
        : e.isMiddle
        ? "middle"
        : "end";
    }),
    (d.prototype.xForXAxisLabel = function () {
      return this.xForAxisLabel(
        !this.owner.config.axis_rotated,
        this.getXAxisLabelPosition()
      );
    }),
    (d.prototype.xForYAxisLabel = function () {
      return this.xForAxisLabel(
        this.owner.config.axis_rotated,
        this.getYAxisLabelPosition()
      );
    }),
    (d.prototype.xForY2AxisLabel = function () {
      return this.xForAxisLabel(
        this.owner.config.axis_rotated,
        this.getY2AxisLabelPosition()
      );
    }),
    (d.prototype.dxForXAxisLabel = function () {
      return this.dxForAxisLabel(
        !this.owner.config.axis_rotated,
        this.getXAxisLabelPosition()
      );
    }),
    (d.prototype.dxForYAxisLabel = function () {
      return this.dxForAxisLabel(
        this.owner.config.axis_rotated,
        this.getYAxisLabelPosition()
      );
    }),
    (d.prototype.dxForY2AxisLabel = function () {
      return this.dxForAxisLabel(
        this.owner.config.axis_rotated,
        this.getY2AxisLabelPosition()
      );
    }),
    (d.prototype.dyForXAxisLabel = function () {
      var t = this.owner,
        e = t.config,
        i = this.getXAxisLabelPosition();
      return e.axis_rotated
        ? i.isInner
          ? "1.2em"
          : -25 - (t.config.axis_x_inner ? 0 : this.getMaxTickWidth("x"))
        : i.isInner
        ? "-0.5em"
        : e.axis_x_height
        ? e.axis_x_height - 10
        : "3em";
    }),
    (d.prototype.dyForYAxisLabel = function () {
      var t = this.owner,
        e = this.getYAxisLabelPosition();
      return t.config.axis_rotated
        ? e.isInner
          ? "-0.5em"
          : "3em"
        : e.isInner
        ? "1.2em"
        : -10 - (t.config.axis_y_inner ? 0 : this.getMaxTickWidth("y") + 10);
    }),
    (d.prototype.dyForY2AxisLabel = function () {
      var t = this.owner,
        e = this.getY2AxisLabelPosition();
      return t.config.axis_rotated
        ? e.isInner
          ? "1.2em"
          : "-2.2em"
        : e.isInner
        ? "-0.5em"
        : 15 + (t.config.axis_y2_inner ? 0 : this.getMaxTickWidth("y2") + 15);
    }),
    (d.prototype.textAnchorForXAxisLabel = function () {
      var t = this.owner;
      return this.textAnchorForAxisLabel(
        !t.config.axis_rotated,
        this.getXAxisLabelPosition()
      );
    }),
    (d.prototype.textAnchorForYAxisLabel = function () {
      var t = this.owner;
      return this.textAnchorForAxisLabel(
        t.config.axis_rotated,
        this.getYAxisLabelPosition()
      );
    }),
    (d.prototype.textAnchorForY2AxisLabel = function () {
      var t = this.owner;
      return this.textAnchorForAxisLabel(
        t.config.axis_rotated,
        this.getY2AxisLabelPosition()
      );
    }),
    (d.prototype.getMaxTickWidth = function (t, e) {
      var i,
        n,
        r,
        a,
        o = this.owner,
        s = o.config,
        c = 0;
      return (
        (e && o.currentMaxTickWidths[t]) ||
          (o.svg &&
            ((i = o.filterTargetsToShow(o.data.targets)),
            "y" === t
              ? ((n = o.y.copy().domain(o.getYDomain(i, "y"))),
                (r = this.getYAxis(
                  n,
                  o.yOrient,
                  s.axis_y_tick_format,
                  o.yAxisTickValues,
                  !1,
                  !0,
                  !0
                )))
              : "y2" === t
              ? ((n = o.y2.copy().domain(o.getYDomain(i, "y2"))),
                (r = this.getYAxis(
                  n,
                  o.y2Orient,
                  s.axis_y2_tick_format,
                  o.y2AxisTickValues,
                  !1,
                  !0,
                  !0
                )))
              : ((n = o.x.copy().domain(o.getXDomain(i))),
                (r = this.getXAxis(
                  n,
                  o.xOrient,
                  o.xAxisTickFormat,
                  o.xAxisTickValues,
                  !1,
                  !0,
                  !0
                )),
                this.updateXAxisTickValues(i, r)),
            (a = o.d3.select("body").append("div").classed("c3", !0))
              .append("svg")
              .style("visibility", "hidden")
              .style("position", "fixed")
              .style("top", 0)
              .style("left", 0)
              .append("g")
              .call(r)
              .each(function () {
                o.d3
                  .select(this)
                  .selectAll("text")
                  .each(function () {
                    var t = this.getBoundingClientRect();
                    c < t.width && (c = t.width);
                  }),
                  a.remove();
              })),
          (o.currentMaxTickWidths[t] = c <= 0 ? o.currentMaxTickWidths[t] : c)),
        o.currentMaxTickWidths[t]
      );
    }),
    (d.prototype.updateLabels = function (t) {
      var e = this.owner,
        i = e.main.select("." + Y.axisX + " ." + Y.axisXLabel),
        n = e.main.select("." + Y.axisY + " ." + Y.axisYLabel),
        r = e.main.select("." + Y.axisY2 + " ." + Y.axisY2Label);
      (t ? i.transition() : i)
        .attr("x", this.xForXAxisLabel.bind(this))
        .attr("dx", this.dxForXAxisLabel.bind(this))
        .attr("dy", this.dyForXAxisLabel.bind(this))
        .text(this.textForXAxisLabel.bind(this)),
        (t ? n.transition() : n)
          .attr("x", this.xForYAxisLabel.bind(this))
          .attr("dx", this.dxForYAxisLabel.bind(this))
          .attr("dy", this.dyForYAxisLabel.bind(this))
          .text(this.textForYAxisLabel.bind(this)),
        (t ? r.transition() : r)
          .attr("x", this.xForY2AxisLabel.bind(this))
          .attr("dx", this.dxForY2AxisLabel.bind(this))
          .attr("dy", this.dyForY2AxisLabel.bind(this))
          .text(this.textForY2AxisLabel.bind(this));
    }),
    (d.prototype.getPadding = function (t, e, i, n) {
      var r = "number" == typeof t ? t : t[e];
      return P(r)
        ? "ratio" === t.unit
          ? t[e] * n
          : this.convertPixelsToAxisPadding(r, n)
        : i;
    }),
    (d.prototype.convertPixelsToAxisPadding = function (t, e) {
      var i = this.owner;
      return e * (t / (i.config.axis_rotated ? i.width : i.height));
    }),
    (d.prototype.generateTickValues = function (t, e, i) {
      var n,
        r,
        a,
        o,
        s,
        c,
        d,
        l = t;
      if (e)
        if (1 === (n = h(e) ? e() : e)) l = [t[0]];
        else if (2 === n) l = [t[0], t[t.length - 1]];
        else if (2 < n) {
          for (
            o = n - 2,
              r = t[0],
              s = ((a = t[t.length - 1]) - r) / (o + 1),
              l = [r],
              c = 0;
            c < o;
            c++
          )
            (d = +r + s * (c + 1)), l.push(i ? new Date(d) : d);
          l.push(a);
        }
      return (
        i ||
          (l = l.sort(function (t, e) {
            return t - e;
          })),
        l
      );
    }),
    (d.prototype.generateTransitions = function (t) {
      var e = this.owner.axes;
      return {
        axisX: t ? e.x.transition().duration(t) : e.x,
        axisY: t ? e.y.transition().duration(t) : e.y,
        axisY2: t ? e.y2.transition().duration(t) : e.y2,
        axisSubX: t ? e.subx.transition().duration(t) : e.subx,
      };
    }),
    (d.prototype.redraw = function (t, e) {
      var i = this.owner,
        n = t ? i.d3.transition().duration(t) : null;
      i.axes.x.style("opacity", e ? 0 : 1).call(i.xAxis, n),
        i.axes.y.style("opacity", e ? 0 : 1).call(i.yAxis, n),
        i.axes.y2.style("opacity", e ? 0 : 1).call(i.y2Axis, n),
        i.axes.subx.style("opacity", e ? 0 : 1).call(i.subXAxis, n);
    });
  var t = {
    version: "0.6.14",
    chart: {
      fn: n.prototype,
      internal: {
        fn: l.prototype,
        axis: { fn: d.prototype, internal: { fn: e.prototype } },
      },
    },
    generate: function (t) {
      return new n(t);
    },
  };
  return (
    (l.prototype.beforeInit = function () {}),
    (l.prototype.afterInit = function () {}),
    (l.prototype.init = function () {
      var t = this,
        e = t.config;
      if ((t.initParams(), e.data_url))
        t.convertUrlToData(
          e.data_url,
          e.data_mimeType,
          e.data_headers,
          e.data_keys,
          t.initWithData
        );
      else if (e.data_json)
        t.initWithData(t.convertJsonToData(e.data_json, e.data_keys));
      else if (e.data_rows) t.initWithData(t.convertRowsToData(e.data_rows));
      else {
        if (!e.data_columns)
          throw Error("url or json or rows or columns is required.");
        t.initWithData(t.convertColumnsToData(e.data_columns));
      }
    }),
    (l.prototype.initParams = function () {
      var t = this,
        e = t.d3,
        i = t.config;
      (t.clipId = "c3-" + +new Date() + "-clip"),
        (t.clipIdForXAxis = t.clipId + "-xaxis"),
        (t.clipIdForYAxis = t.clipId + "-yaxis"),
        (t.clipIdForGrid = t.clipId + "-grid"),
        (t.clipIdForSubchart = t.clipId + "-subchart"),
        (t.clipPath = t.getClipPath(t.clipId)),
        (t.clipPathForXAxis = t.getClipPath(t.clipIdForXAxis)),
        (t.clipPathForYAxis = t.getClipPath(t.clipIdForYAxis)),
        (t.clipPathForGrid = t.getClipPath(t.clipIdForGrid)),
        (t.clipPathForSubchart = t.getClipPath(t.clipIdForSubchart)),
        (t.dragStart = null),
        (t.dragging = !1),
        (t.flowing = !1),
        (t.cancelClick = !1),
        (t.mouseover = !1),
        (t.transiting = !1),
        (t.color = t.generateColor()),
        (t.levelColor = t.generateLevelColor()),
        (t.dataTimeParse = (i.data_xLocaltime ? e.timeParse : e.utcParse)(
          t.config.data_xFormat
        )),
        (t.axisTimeFormat = i.axis_x_localtime ? e.timeFormat : e.utcFormat),
        (t.defaultAxisTimeFormat = function (t) {
          return t.getMilliseconds()
            ? e.timeFormat(".%L")(t)
            : t.getSeconds()
            ? e.timeFormat(":%S")(t)
            : t.getMinutes()
            ? e.timeFormat("%I:%M")(t)
            : t.getHours()
            ? e.timeFormat("%I %p")(t)
            : t.getDay() && 1 !== t.getDate()
            ? e.timeFormat("%-m/%-d")(t)
            : 1 !== t.getDate()
            ? e.timeFormat("%-m/%-d")(t)
            : t.getMonth()
            ? e.timeFormat("%-m/%-d")(t)
            : e.timeFormat("%Y/%-m/%-d")(t);
        }),
        (t.hiddenTargetIds = []),
        (t.hiddenLegendIds = []),
        (t.focusedTargetIds = []),
        (t.defocusedTargetIds = []),
        (t.xOrient = i.axis_rotated
          ? i.axis_x_inner
            ? "right"
            : "left"
          : i.axis_x_inner
          ? "top"
          : "bottom"),
        (t.yOrient = i.axis_rotated
          ? i.axis_y_inner
            ? "top"
            : "bottom"
          : i.axis_y_inner
          ? "right"
          : "left"),
        (t.y2Orient = i.axis_rotated
          ? i.axis_y2_inner
            ? "bottom"
            : "top"
          : i.axis_y2_inner
          ? "left"
          : "right"),
        (t.subXOrient = i.axis_rotated ? "left" : "bottom"),
        (t.isLegendRight = "right" === i.legend_position),
        (t.isLegendInset = "inset" === i.legend_position),
        (t.isLegendTop =
          "top-left" === i.legend_inset_anchor ||
          "top-right" === i.legend_inset_anchor),
        (t.isLegendLeft =
          "top-left" === i.legend_inset_anchor ||
          "bottom-left" === i.legend_inset_anchor),
        (t.legendStep = 0),
        (t.legendItemWidth = 0),
        (t.legendItemHeight = 0),
        (t.currentMaxTickWidths = { x: 0, y: 0, y2: 0 }),
        (t.rotated_padding_left = 30),
        (t.rotated_padding_right = i.axis_rotated && !i.axis_x_show ? 0 : 30),
        (t.rotated_padding_top = 5),
        (t.withoutFadeIn = {}),
        (t.intervalForObserveInserted = void 0),
        (t.axes.subx = e.selectAll([]));
    }),
    (l.prototype.initChartElements = function () {
      this.initBar && this.initBar(),
        this.initLine && this.initLine(),
        this.initArc && this.initArc(),
        this.initGauge && this.initGauge(),
        this.initText && this.initText();
    }),
    (l.prototype.initWithData = function (t) {
      var e,
        i,
        n = this,
        r = n.d3,
        a = n.config,
        o = !0;
      (n.axis = new d(n)),
        a.bindto
          ? "function" == typeof a.bindto.node
            ? (n.selectChart = a.bindto)
            : (n.selectChart = r.select(a.bindto))
          : (n.selectChart = r.selectAll([])),
        n.selectChart.empty() &&
          ((n.selectChart = r
            .select(document.createElement("div"))
            .style("opacity", 0)),
          n.observeInserted(n.selectChart),
          (o = !1)),
        n.selectChart.html("").classed("c3", !0),
        (n.data.xs = {}),
        (n.data.targets = n.convertDataToTargets(t)),
        a.data_filter &&
          (n.data.targets = n.data.targets.filter(a.data_filter)),
        a.data_hide &&
          n.addHiddenTargetIds(
            !0 === a.data_hide ? n.mapToIds(n.data.targets) : a.data_hide
          ),
        a.legend_hide &&
          n.addHiddenLegendIds(
            !0 === a.legend_hide ? n.mapToIds(n.data.targets) : a.legend_hide
          ),
        n.updateSizes(),
        n.updateScales(),
        n.x.domain(r.extent(n.getXDomain(n.data.targets))),
        n.y.domain(n.getYDomain(n.data.targets, "y")),
        n.y2.domain(n.getYDomain(n.data.targets, "y2")),
        n.subX.domain(n.x.domain()),
        n.subY.domain(n.y.domain()),
        n.subY2.domain(n.y2.domain()),
        (n.orgXDomain = n.x.domain()),
        (n.svg = n.selectChart
          .append("svg")
          .style("overflow", "hidden")
          .on("mouseenter", function () {
            return a.onmouseover.call(n);
          })
          .on("mouseleave", function () {
            return a.onmouseout.call(n);
          })),
        n.config.svg_classname && n.svg.attr("class", n.config.svg_classname),
        (e = n.svg.append("defs")),
        (n.clipChart = n.appendClip(e, n.clipId)),
        (n.clipXAxis = n.appendClip(e, n.clipIdForXAxis)),
        (n.clipYAxis = n.appendClip(e, n.clipIdForYAxis)),
        (n.clipGrid = n.appendClip(e, n.clipIdForGrid)),
        (n.clipSubchart = n.appendClip(e, n.clipIdForSubchart)),
        n.updateSvgSize(),
        (i = n.main =
          n.svg.append("g").attr("transform", n.getTranslate("main"))),
        n.initPie && n.initPie(),
        n.initDragZoom && n.initDragZoom(),
        n.initSubchart && n.initSubchart(),
        n.initTooltip && n.initTooltip(),
        n.initLegend && n.initLegend(),
        n.initTitle && n.initTitle(),
        n.initZoom && n.initZoom(),
        n.initSubchartBrush && n.initSubchartBrush(),
        i
          .append("text")
          .attr("class", Y.text + " " + Y.empty)
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle"),
        n.initRegion(),
        n.initGrid(),
        i.append("g").attr("clip-path", n.clipPath).attr("class", Y.chart),
        a.grid_lines_front && n.initGridLines(),
        n.initEventRect(),
        n.initChartElements(),
        n.axis.init(),
        n.updateTargets(n.data.targets),
        a.axis_x_selection && n.brush.selectionAsValue(n.getDefaultSelection()),
        o &&
          (n.updateDimension(),
          n.config.oninit.call(n),
          n.redraw({
            withTransition: !1,
            withTransform: !0,
            withUpdateXDomain: !0,
            withUpdateOrgXDomain: !0,
            withTransitionForAxis: !1,
          })),
        n.bindResize(),
        n.bindWindowFocus(),
        (n.api.element = n.selectChart.node());
    }),
    (l.prototype.smoothLines = function (t, e) {
      var a = this;
      "grid" === e &&
        t.each(function () {
          var t = a.d3.select(this),
            e = t.attr("x1"),
            i = t.attr("x2"),
            n = t.attr("y1"),
            r = t.attr("y2");
          t.attr({
            x1: Math.ceil(e),
            x2: Math.ceil(i),
            y1: Math.ceil(n),
            y2: Math.ceil(r),
          });
        });
    }),
    (l.prototype.updateSizes = function () {
      var t = this,
        e = t.config,
        i = t.legend ? t.getLegendHeight() : 0,
        n = t.legend ? t.getLegendWidth() : 0,
        r = t.isLegendRight || t.isLegendInset ? 0 : i,
        a = t.hasArcType(),
        o = e.axis_rotated || a ? 0 : t.getHorizontalAxisHeight("x"),
        s = e.subchart_show && !a ? e.subchart_size_height + o : 0;
      (t.currentWidth = t.getCurrentWidth()),
        (t.currentHeight = t.getCurrentHeight()),
        (t.margin = e.axis_rotated
          ? {
              top: t.getHorizontalAxisHeight("y2") + t.getCurrentPaddingTop(),
              right: a ? 0 : t.getCurrentPaddingRight(),
              bottom:
                t.getHorizontalAxisHeight("y") +
                r +
                t.getCurrentPaddingBottom(),
              left: s + (a ? 0 : t.getCurrentPaddingLeft()),
            }
          : {
              top: 4 + t.getCurrentPaddingTop(),
              right: a ? 0 : t.getCurrentPaddingRight(),
              bottom: o + s + r + t.getCurrentPaddingBottom(),
              left: a ? 0 : t.getCurrentPaddingLeft(),
            }),
        (t.margin2 = e.axis_rotated
          ? {
              top: t.margin.top,
              right: NaN,
              bottom: 20 + r,
              left: t.rotated_padding_left,
            }
          : {
              top: t.currentHeight - s - r,
              right: NaN,
              bottom: o + r,
              left: t.margin.left,
            }),
        (t.margin3 = { top: 0, right: NaN, bottom: 0, left: 0 }),
        t.updateSizeForLegend && t.updateSizeForLegend(i, n),
        (t.width = t.currentWidth - t.margin.left - t.margin.right),
        (t.height = t.currentHeight - t.margin.top - t.margin.bottom),
        t.width < 0 && (t.width = 0),
        t.height < 0 && (t.height = 0),
        (t.width2 = e.axis_rotated
          ? t.margin.left - t.rotated_padding_left - t.rotated_padding_right
          : t.width),
        (t.height2 = e.axis_rotated
          ? t.height
          : t.currentHeight - t.margin2.top - t.margin2.bottom),
        t.width2 < 0 && (t.width2 = 0),
        t.height2 < 0 && (t.height2 = 0),
        (t.arcWidth = t.width - (t.isLegendRight ? n + 10 : 0)),
        (t.arcHeight = t.height - (t.isLegendRight ? 0 : 10)),
        t.hasType("gauge") &&
          !e.gauge_fullCircle &&
          (t.arcHeight += t.height - t.getGaugeLabelHeight()),
        t.updateRadius && t.updateRadius(),
        t.isLegendRight &&
          a &&
          (t.margin3.left = t.arcWidth / 2 + 1.1 * t.radiusExpanded);
    }),
    (l.prototype.updateTargets = function (t) {
      var e = this;
      e.updateTargetsForText(t),
        e.updateTargetsForBar(t),
        e.updateTargetsForLine(t),
        e.hasArcType() && e.updateTargetsForArc && e.updateTargetsForArc(t),
        e.updateTargetsForSubchart && e.updateTargetsForSubchart(t),
        e.showTargets();
    }),
    (l.prototype.showTargets = function () {
      var e = this;
      e.svg
        .selectAll("." + Y.target)
        .filter(function (t) {
          return e.isTargetToShow(t.id);
        })
        .transition()
        .duration(e.config.transition_duration)
        .style("opacity", 1);
    }),
    (l.prototype.redraw = function (t, e) {
      var i,
        n,
        r,
        a,
        o,
        s,
        c,
        d,
        l,
        u,
        h,
        g,
        p,
        f,
        _,
        x,
        y,
        m,
        S,
        w,
        v,
        b,
        T,
        A,
        P,
        C,
        L,
        V,
        G,
        E,
        I,
        O = this,
        R = O.main,
        k = O.d3,
        D = O.config,
        F = O.getShapeIndices(O.isAreaType),
        X = O.getShapeIndices(O.isBarType),
        M = O.getShapeIndices(O.isLineType),
        z = O.hasArcType(),
        H = O.filterTargetsToShow(O.data.targets),
        B = O.xv.bind(O);
      if (
        ((i = N((t = t || {}), "withY", !0)),
        (n = N(t, "withSubchart", !0)),
        (r = N(t, "withTransition", !0)),
        (s = N(t, "withTransform", !1)),
        (c = N(t, "withUpdateXDomain", !1)),
        (d = N(t, "withUpdateOrgXDomain", !1)),
        (l = N(t, "withTrimXDomain", !0)),
        (p = N(t, "withUpdateXAxis", c)),
        (u = N(t, "withLegend", !1)),
        (h = N(t, "withEventRect", !0)),
        (g = N(t, "withDimension", !0)),
        (a = N(t, "withTransitionForExit", r)),
        (o = N(t, "withTransitionForAxis", r)),
        (S = r ? D.transition_duration : 0),
        (w = a ? S : 0),
        (v = o ? S : 0),
        (e = e || O.axis.generateTransitions(v)),
        u && D.legend_show
          ? O.updateLegend(O.mapToIds(O.data.targets), t, e)
          : g && O.updateDimension(!0),
        O.isCategorized() &&
          0 === H.length &&
          O.x.domain([0, O.axes.x.selectAll(".tick").size()]),
        H.length
          ? (O.updateXDomain(H, c, d, l),
            D.axis_x_tick_values || (C = O.axis.updateXAxisTickValues(H)))
          : (O.xAxis.tickValues([]), O.subXAxis.tickValues([])),
        D.zoom_rescale && !t.flow && (G = O.x.orgDomain()),
        O.y.domain(O.getYDomain(H, "y", G)),
        O.y2.domain(O.getYDomain(H, "y2", G)),
        !D.axis_y_tick_values &&
          D.axis_y_tick_count &&
          O.yAxis.tickValues(
            O.axis.generateTickValues(O.y.domain(), D.axis_y_tick_count)
          ),
        !D.axis_y2_tick_values &&
          D.axis_y2_tick_count &&
          O.y2Axis.tickValues(
            O.axis.generateTickValues(O.y2.domain(), D.axis_y2_tick_count)
          ),
        O.axis.redraw(v, z),
        O.axis.updateLabels(r),
        (c || p) && H.length)
      )
        if (D.axis_x_tick_culling && C) {
          for (L = 1; L < C.length; L++)
            if (C.length / L < D.axis_x_tick_culling_max) {
              V = L;
              break;
            }
          O.svg.selectAll("." + Y.axisX + " .tick text").each(function (t) {
            var e = C.indexOf(t);
            0 <= e && k.select(this).style("display", e % V ? "none" : "block");
          });
        } else
          O.svg
            .selectAll("." + Y.axisX + " .tick text")
            .style("display", "block");
      (f = O.generateDrawArea ? O.generateDrawArea(F, !1) : void 0),
        (_ = O.generateDrawBar ? O.generateDrawBar(X) : void 0),
        (x = O.generateDrawLine ? O.generateDrawLine(M, !1) : void 0),
        (y = O.generateXYForText(F, X, M, !0)),
        (m = O.generateXYForText(F, X, M, !1)),
        O.updateCircleY(),
        (E = (O.config.axis_rotated ? O.circleY : O.circleX).bind(O)),
        (I = (O.config.axis_rotated ? O.circleX : O.circleY).bind(O)),
        i &&
          (O.subY.domain(O.getYDomain(H, "y")),
          O.subY2.domain(O.getYDomain(H, "y2"))),
        O.updateXgridFocus(),
        R.select("text." + Y.text + "." + Y.empty)
          .attr("x", O.width / 2)
          .attr("y", O.height / 2)
          .text(D.data_empty_label_text)
          .transition()
          .style("opacity", H.length ? 0 : 1),
        h && O.redrawEventRect(),
        O.updateGrid(S),
        O.updateRegion(S),
        O.updateBar(w),
        O.updateLine(w),
        O.updateArea(w),
        O.updateCircle(E, I),
        O.hasDataLabel() && O.updateText(y, m, w),
        O.redrawTitle && O.redrawTitle(),
        O.redrawArc && O.redrawArc(S, w, s),
        O.redrawSubchart && O.redrawSubchart(n, e, S, w, F, X, M),
        R.selectAll("." + Y.selectedCircles)
          .filter(O.isBarType.bind(O))
          .selectAll("circle")
          .remove(),
        t.flow &&
          (A = O.generateFlow({
            targets: H,
            flow: t.flow,
            duration: t.flow.duration,
            drawBar: _,
            drawLine: x,
            drawArea: f,
            cx: E,
            cy: I,
            xv: B,
            xForText: y,
            yForText: m,
          })),
        O.isTabVisible() &&
          (S
            ? ((P = k.transition().duration(S)),
              (b = []),
              [
                O.redrawBar(_, !0, P),
                O.redrawLine(x, !0, P),
                O.redrawArea(f, !0, P),
                O.redrawCircle(E, I, !0, P),
                O.redrawText(y, m, t.flow, !0, P),
                O.redrawRegion(!0, P),
                O.redrawGrid(!0, P),
              ].forEach(function (t) {
                t.forEach(function (t) {
                  b.push(t);
                });
              }),
              (T = O.generateWait()),
              b.forEach(function (t) {
                T.add(t);
              }),
              T(function () {
                A && A(), D.onrendered && D.onrendered.call(O);
              }))
            : (O.redrawBar(_),
              O.redrawLine(x),
              O.redrawArea(f),
              O.redrawCircle(E, I),
              O.redrawText(y, m, t.flow),
              O.redrawRegion(),
              O.redrawGrid(),
              A && A(),
              D.onrendered && D.onrendered.call(O))),
        O.mapToIds(O.data.targets).forEach(function (t) {
          O.withoutFadeIn[t] = !0;
        });
    }),
    (l.prototype.updateAndRedraw = function (t) {
      var e,
        i = this,
        n = i.config;
      ((t = t || {}).withTransition = N(t, "withTransition", !0)),
        (t.withTransform = N(t, "withTransform", !1)),
        (t.withLegend = N(t, "withLegend", !1)),
        (t.withUpdateXDomain = N(t, "withUpdateXDomain", !0)),
        (t.withUpdateOrgXDomain = N(t, "withUpdateOrgXDomain", !0)),
        (t.withTransitionForExit = !1),
        (t.withTransitionForTransform = N(
          t,
          "withTransitionForTransform",
          t.withTransition
        )),
        i.updateSizes(),
        (t.withLegend && n.legend_show) ||
          ((e = i.axis.generateTransitions(
            t.withTransitionForAxis ? n.transition_duration : 0
          )),
          i.updateScales(),
          i.updateSvgSize(),
          i.transformAll(t.withTransitionForTransform, e)),
        i.redraw(t, e);
    }),
    (l.prototype.redrawWithoutRescale = function () {
      this.redraw({
        withY: !1,
        withSubchart: !1,
        withEventRect: !1,
        withTransitionForAxis: !1,
      });
    }),
    (l.prototype.isTimeSeries = function () {
      return "timeseries" === this.config.axis_x_type;
    }),
    (l.prototype.isCategorized = function () {
      return 0 <= this.config.axis_x_type.indexOf("categor");
    }),
    (l.prototype.isCustomX = function () {
      var t = this.config;
      return !this.isTimeSeries() && (t.data_x || C(t.data_xs));
    }),
    (l.prototype.isTimeSeriesY = function () {
      return "timeseries" === this.config.axis_y_type;
    }),
    (l.prototype.getTranslate = function (t) {
      var e,
        i,
        n = this,
        r = n.config;
      return (
        "main" === t
          ? ((e = a(n.margin.left)), (i = a(n.margin.top)))
          : "context" === t
          ? ((e = a(n.margin2.left)), (i = a(n.margin2.top)))
          : "legend" === t
          ? ((e = n.margin3.left), (i = n.margin3.top))
          : "x" === t
          ? ((e = 0), (i = r.axis_rotated ? 0 : n.height))
          : "y" === t
          ? ((e = 0), (i = r.axis_rotated ? n.height : 0))
          : "y2" === t
          ? ((e = r.axis_rotated ? 0 : n.width), (i = r.axis_rotated ? 1 : 0))
          : "subx" === t
          ? ((e = 0), (i = r.axis_rotated ? 0 : n.height2))
          : "arc" === t &&
            ((e = n.arcWidth / 2),
            (i = n.arcHeight / 2 - (n.hasType("gauge") ? 6 : 0))),
        "translate(" + e + "," + i + ")"
      );
    }),
    (l.prototype.initialOpacity = function (t) {
      return null !== t.value && this.withoutFadeIn[t.id] ? 1 : 0;
    }),
    (l.prototype.initialOpacityForCircle = function (t) {
      return null !== t.value && this.withoutFadeIn[t.id]
        ? this.opacityForCircle(t)
        : 0;
    }),
    (l.prototype.opacityForCircle = function (t) {
      var e = (
        h(this.config.point_show)
          ? this.config.point_show(t)
          : this.config.point_show
      )
        ? 1
        : 0;
      return P(t.value) ? (this.isScatterType(t) ? 0.5 : e) : 0;
    }),
    (l.prototype.opacityForText = function () {
      return this.hasDataLabel() ? 1 : 0;
    }),
    (l.prototype.xx = function (t) {
      return t ? this.x(t.x) : null;
    }),
    (l.prototype.xv = function (t) {
      var e = this,
        i = t.value;
      return (
        e.isTimeSeries()
          ? (i = e.parseDate(t.value))
          : e.isCategorized() &&
            "string" == typeof t.value &&
            (i = e.config.axis_x_categories.indexOf(t.value)),
        Math.ceil(e.x(i))
      );
    }),
    (l.prototype.yv = function (t) {
      var e = t.axis && "y2" === t.axis ? this.y2 : this.y;
      return Math.ceil(e(t.value));
    }),
    (l.prototype.subxx = function (t) {
      return t ? this.subX(t.x) : null;
    }),
    (l.prototype.transformMain = function (t, e) {
      var i,
        n,
        r,
        a = this;
      e && e.axisX
        ? (i = e.axisX)
        : ((i = a.main.select("." + Y.axisX)), t && (i = i.transition())),
        e && e.axisY
          ? (n = e.axisY)
          : ((n = a.main.select("." + Y.axisY)), t && (n = n.transition())),
        e && e.axisY2
          ? (r = e.axisY2)
          : ((r = a.main.select("." + Y.axisY2)), t && (r = r.transition())),
        (t ? a.main.transition() : a.main).attr(
          "transform",
          a.getTranslate("main")
        ),
        i.attr("transform", a.getTranslate("x")),
        n.attr("transform", a.getTranslate("y")),
        r.attr("transform", a.getTranslate("y2")),
        a.main
          .select("." + Y.chartArcs)
          .attr("transform", a.getTranslate("arc"));
    }),
    (l.prototype.transformAll = function (t, e) {
      var i = this;
      i.transformMain(t, e),
        i.config.subchart_show && i.transformContext(t, e),
        i.legend && i.transformLegend(t);
    }),
    (l.prototype.updateSvgSize = function () {
      var t = this,
        e = t.svg.select(".c3-brush .overlay");
      t.svg.attr("width", t.currentWidth).attr("height", t.currentHeight),
        t.svg
          .selectAll(["#" + t.clipId, "#" + t.clipIdForGrid])
          .select("rect")
          .attr("width", t.width)
          .attr("height", t.height),
        t.svg
          .select("#" + t.clipIdForXAxis)
          .select("rect")
          .attr("x", t.getXAxisClipX.bind(t))
          .attr("y", t.getXAxisClipY.bind(t))
          .attr("width", t.getXAxisClipWidth.bind(t))
          .attr("height", t.getXAxisClipHeight.bind(t)),
        t.svg
          .select("#" + t.clipIdForYAxis)
          .select("rect")
          .attr("x", t.getYAxisClipX.bind(t))
          .attr("y", t.getYAxisClipY.bind(t))
          .attr("width", t.getYAxisClipWidth.bind(t))
          .attr("height", t.getYAxisClipHeight.bind(t)),
        t.svg
          .select("#" + t.clipIdForSubchart)
          .select("rect")
          .attr("width", t.width)
          .attr("height", e.size() ? e.attr("height") : 0),
        t.selectChart.style("max-height", t.currentHeight + "px");
    }),
    (l.prototype.updateDimension = function (t) {
      var e = this;
      t ||
        (e.config.axis_rotated
          ? (e.axes.x.call(e.xAxis), e.axes.subx.call(e.subXAxis))
          : (e.axes.y.call(e.yAxis), e.axes.y2.call(e.y2Axis))),
        e.updateSizes(),
        e.updateScales(),
        e.updateSvgSize(),
        e.transformAll(!1);
    }),
    (l.prototype.observeInserted = function (e) {
      var i,
        n = this;
      "undefined" != typeof MutationObserver
        ? (i = new MutationObserver(function (t) {
            t.forEach(function (t) {
              "childList" === t.type &&
                t.previousSibling &&
                (i.disconnect(),
                (n.intervalForObserveInserted = window.setInterval(function () {
                  e.node().parentNode &&
                    (window.clearInterval(n.intervalForObserveInserted),
                    n.updateDimension(),
                    n.brush && n.brush.update(),
                    n.config.oninit.call(n),
                    n.redraw({
                      withTransform: !0,
                      withUpdateXDomain: !0,
                      withUpdateOrgXDomain: !0,
                      withTransition: !1,
                      withTransitionForTransform: !1,
                      withLegend: !0,
                    }),
                    e.transition().style("opacity", 1));
                }, 10)));
            });
          })).observe(e.node(), {
            attributes: !0,
            childList: !0,
            characterData: !0,
          })
        : window.console.error("MutationObserver not defined.");
    }),
    (l.prototype.bindResize = function () {
      var t = this,
        e = t.config;
      if (
        ((t.resizeFunction = t.generateResize()),
        t.resizeFunction.add(function () {
          e.onresize.call(t);
        }),
        e.resize_auto &&
          t.resizeFunction.add(function () {
            void 0 !== t.resizeTimeout && window.clearTimeout(t.resizeTimeout),
              (t.resizeTimeout = window.setTimeout(function () {
                delete t.resizeTimeout,
                  t.updateAndRedraw({
                    withUpdateXDomain: !1,
                    withUpdateOrgXDomain: !1,
                    withTransition: !1,
                    withTransitionForTransform: !1,
                    withLegend: !0,
                  }),
                  t.brush && t.brush.update();
              }, 100));
          }),
        t.resizeFunction.add(function () {
          e.onresized.call(t);
        }),
        (t.resizeIfElementDisplayed = function () {
          null != t.api && t.api.element.offsetParent && t.resizeFunction();
        }),
        window.attachEvent)
      )
        window.attachEvent("onresize", t.resizeIfElementDisplayed);
      else if (window.addEventListener)
        window.addEventListener("resize", t.resizeIfElementDisplayed, !1);
      else {
        var i = window.onresize;
        i
          ? (i.add && i.remove) || (i = t.generateResize()).add(window.onresize)
          : (i = t.generateResize()),
          i.add(t.resizeFunction),
          (window.onresize = function () {
            t.api.element.offsetParent && i();
          });
      }
    }),
    (l.prototype.bindWindowFocus = function () {
      var t = this;
      this.windowFocusHandler ||
        ((this.windowFocusHandler = function () {
          t.redraw();
        }),
        window.addEventListener("focus", this.windowFocusHandler));
    }),
    (l.prototype.unbindWindowFocus = function () {
      window.removeEventListener("focus", this.windowFocusHandler),
        delete this.windowFocusHandler;
    }),
    (l.prototype.generateResize = function () {
      var i = [];
      function t() {
        i.forEach(function (t) {
          t();
        });
      }
      return (
        (t.add = function (t) {
          i.push(t);
        }),
        (t.remove = function (t) {
          for (var e = 0; e < i.length; e++)
            if (i[e] === t) {
              i.splice(e, 1);
              break;
            }
        }),
        t
      );
    }),
    (l.prototype.endall = function (t, e) {
      var i = 0;
      t.each(function () {
        ++i;
      }).on("end", function () {
        --i || e.apply(this, arguments);
      });
    }),
    (l.prototype.generateWait = function () {
      var n = this,
        r = [],
        t = function (t) {
          var i = setInterval(function () {
            if (n.isTabVisible()) {
              var e = 0;
              r.forEach(function (t) {
                if (t.empty()) e += 1;
                else
                  try {
                    t.transition();
                  } catch (t) {
                    e += 1;
                  }
              }),
                e === r.length && (clearInterval(i), t && t());
            }
          }, 50);
        };
      return (
        (t.add = function (t) {
          r.push(t);
        }),
        t
      );
    }),
    (l.prototype.parseDate = function (t) {
      var e;
      return (
        t instanceof Date
          ? (e = t)
          : "string" == typeof t
          ? (e = this.dataTimeParse(t))
          : "object" === s(t)
          ? (e = new Date(+t))
          : "number" != typeof t || isNaN(t) || (e = new Date(+t)),
        (e && !isNaN(+e)) ||
          window.console.error("Failed to parse x '" + t + "' to Date object"),
        e
      );
    }),
    (l.prototype.isTabVisible = function () {
      return !document.hidden;
    }),
    (l.prototype.getPathBox = y),
    (l.prototype.CLASS = Y),
    "SVGPathSeg" in window ||
      ((window.SVGPathSeg = function (t, e, i) {
        (this.pathSegType = t),
          (this.pathSegTypeAsLetter = e),
          (this._owningPathSegList = i);
      }),
      (window.SVGPathSeg.prototype.classname = "SVGPathSeg"),
      (window.SVGPathSeg.PATHSEG_UNKNOWN = 0),
      (window.SVGPathSeg.PATHSEG_CLOSEPATH = 1),
      (window.SVGPathSeg.PATHSEG_MOVETO_ABS = 2),
      (window.SVGPathSeg.PATHSEG_MOVETO_REL = 3),
      (window.SVGPathSeg.PATHSEG_LINETO_ABS = 4),
      (window.SVGPathSeg.PATHSEG_LINETO_REL = 5),
      (window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS = 6),
      (window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL = 7),
      (window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS = 8),
      (window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL = 9),
      (window.SVGPathSeg.PATHSEG_ARC_ABS = 10),
      (window.SVGPathSeg.PATHSEG_ARC_REL = 11),
      (window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS = 12),
      (window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL = 13),
      (window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS = 14),
      (window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL = 15),
      (window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS = 16),
      (window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL = 17),
      (window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS = 18),
      (window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL = 19),
      (window.SVGPathSeg.prototype._segmentChanged = function () {
        this._owningPathSegList && this._owningPathSegList.segmentChanged(this);
      }),
      (window.SVGPathSegClosePath = function (t) {
        window.SVGPathSeg.call(
          this,
          window.SVGPathSeg.PATHSEG_CLOSEPATH,
          "z",
          t
        );
      }),
      (window.SVGPathSegClosePath.prototype = Object.create(
        window.SVGPathSeg.prototype
      )),
      (window.SVGPathSegClosePath.prototype.toString = function () {
        return "[object SVGPathSegClosePath]";
      }),
      (window.SVGPathSegClosePath.prototype._asPathString = function () {
        return this.pathSegTypeAsLetter;
      }),
      (window.SVGPathSegClosePath.prototype.clone = function () {
        return new window.SVGPathSegClosePath(void 0);
      }),
      (window.SVGPathSegMovetoAbs = function (t, e, i) {
        window.SVGPathSeg.call(
          this,
          window.SVGPathSeg.PATHSEG_MOVETO_ABS,
          "M",
          t
        ),
          (this._x = e),
          (this._y = i);
      }),
      (window.SVGPathSegMovetoAbs.prototype = Object.create(
        window.SVGPathSeg.prototype
      )),
      (window.SVGPathSegMovetoAbs.prototype.toString = function () {
        return "[object SVGPathSegMovetoAbs]";
      }),
      (window.SVGPathSegMovetoAbs.prototype._asPathString = function () {
        return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
      }),
      (window.SVGPathSegMovetoAbs.prototype.clone = function () {
        return new window.SVGPathSegMovetoAbs(void 0, this._x, this._y);
      }),
      Object.defineProperty(window.SVGPathSegMovetoAbs.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (t) {
          (this._x = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegMovetoAbs.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (t) {
          (this._y = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      (window.SVGPathSegMovetoRel = function (t, e, i) {
        window.SVGPathSeg.call(
          this,
          window.SVGPathSeg.PATHSEG_MOVETO_REL,
          "m",
          t
        ),
          (this._x = e),
          (this._y = i);
      }),
      (window.SVGPathSegMovetoRel.prototype = Object.create(
        window.SVGPathSeg.prototype
      )),
      (window.SVGPathSegMovetoRel.prototype.toString = function () {
        return "[object SVGPathSegMovetoRel]";
      }),
      (window.SVGPathSegMovetoRel.prototype._asPathString = function () {
        return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
      }),
      (window.SVGPathSegMovetoRel.prototype.clone = function () {
        return new window.SVGPathSegMovetoRel(void 0, this._x, this._y);
      }),
      Object.defineProperty(window.SVGPathSegMovetoRel.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (t) {
          (this._x = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegMovetoRel.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (t) {
          (this._y = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      (window.SVGPathSegLinetoAbs = function (t, e, i) {
        window.SVGPathSeg.call(
          this,
          window.SVGPathSeg.PATHSEG_LINETO_ABS,
          "L",
          t
        ),
          (this._x = e),
          (this._y = i);
      }),
      (window.SVGPathSegLinetoAbs.prototype = Object.create(
        window.SVGPathSeg.prototype
      )),
      (window.SVGPathSegLinetoAbs.prototype.toString = function () {
        return "[object SVGPathSegLinetoAbs]";
      }),
      (window.SVGPathSegLinetoAbs.prototype._asPathString = function () {
        return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
      }),
      (window.SVGPathSegLinetoAbs.prototype.clone = function () {
        return new window.SVGPathSegLinetoAbs(void 0, this._x, this._y);
      }),
      Object.defineProperty(window.SVGPathSegLinetoAbs.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (t) {
          (this._x = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegLinetoAbs.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (t) {
          (this._y = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      (window.SVGPathSegLinetoRel = function (t, e, i) {
        window.SVGPathSeg.call(
          this,
          window.SVGPathSeg.PATHSEG_LINETO_REL,
          "l",
          t
        ),
          (this._x = e),
          (this._y = i);
      }),
      (window.SVGPathSegLinetoRel.prototype = Object.create(
        window.SVGPathSeg.prototype
      )),
      (window.SVGPathSegLinetoRel.prototype.toString = function () {
        return "[object SVGPathSegLinetoRel]";
      }),
      (window.SVGPathSegLinetoRel.prototype._asPathString = function () {
        return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
      }),
      (window.SVGPathSegLinetoRel.prototype.clone = function () {
        return new window.SVGPathSegLinetoRel(void 0, this._x, this._y);
      }),
      Object.defineProperty(window.SVGPathSegLinetoRel.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (t) {
          (this._x = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegLinetoRel.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (t) {
          (this._y = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      (window.SVGPathSegCurvetoCubicAbs = function (t, e, i, n, r, a, o) {
        window.SVGPathSeg.call(
          this,
          window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS,
          "C",
          t
        ),
          (this._x = e),
          (this._y = i),
          (this._x1 = n),
          (this._y1 = r),
          (this._x2 = a),
          (this._y2 = o);
      }),
      (window.SVGPathSegCurvetoCubicAbs.prototype = Object.create(
        window.SVGPathSeg.prototype
      )),
      (window.SVGPathSegCurvetoCubicAbs.prototype.toString = function () {
        return "[object SVGPathSegCurvetoCubicAbs]";
      }),
      (window.SVGPathSegCurvetoCubicAbs.prototype._asPathString = function () {
        return (
          this.pathSegTypeAsLetter +
          " " +
          this._x1 +
          " " +
          this._y1 +
          " " +
          this._x2 +
          " " +
          this._y2 +
          " " +
          this._x +
          " " +
          this._y
        );
      }),
      (window.SVGPathSegCurvetoCubicAbs.prototype.clone = function () {
        return new window.SVGPathSegCurvetoCubicAbs(
          void 0,
          this._x,
          this._y,
          this._x1,
          this._y1,
          this._x2,
          this._y2
        );
      }),
      Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (t) {
          (this._x = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (t) {
          (this._y = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x1", {
        get: function () {
          return this._x1;
        },
        set: function (t) {
          (this._x1 = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y1", {
        get: function () {
          return this._y1;
        },
        set: function (t) {
          (this._y1 = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x2", {
        get: function () {
          return this._x2;
        },
        set: function (t) {
          (this._x2 = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y2", {
        get: function () {
          return this._y2;
        },
        set: function (t) {
          (this._y2 = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      (window.SVGPathSegCurvetoCubicRel = function (t, e, i, n, r, a, o) {
        window.SVGPathSeg.call(
          this,
          window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL,
          "c",
          t
        ),
          (this._x = e),
          (this._y = i),
          (this._x1 = n),
          (this._y1 = r),
          (this._x2 = a),
          (this._y2 = o);
      }),
      (window.SVGPathSegCurvetoCubicRel.prototype = Object.create(
        window.SVGPathSeg.prototype
      )),
      (window.SVGPathSegCurvetoCubicRel.prototype.toString = function () {
        return "[object SVGPathSegCurvetoCubicRel]";
      }),
      (window.SVGPathSegCurvetoCubicRel.prototype._asPathString = function () {
        return (
          this.pathSegTypeAsLetter +
          " " +
          this._x1 +
          " " +
          this._y1 +
          " " +
          this._x2 +
          " " +
          this._y2 +
          " " +
          this._x +
          " " +
          this._y
        );
      }),
      (window.SVGPathSegCurvetoCubicRel.prototype.clone = function () {
        return new window.SVGPathSegCurvetoCubicRel(
          void 0,
          this._x,
          this._y,
          this._x1,
          this._y1,
          this._x2,
          this._y2
        );
      }),
      Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (t) {
          (this._x = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (t) {
          (this._y = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x1", {
        get: function () {
          return this._x1;
        },
        set: function (t) {
          (this._x1 = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y1", {
        get: function () {
          return this._y1;
        },
        set: function (t) {
          (this._y1 = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x2", {
        get: function () {
          return this._x2;
        },
        set: function (t) {
          (this._x2 = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y2", {
        get: function () {
          return this._y2;
        },
        set: function (t) {
          (this._y2 = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      (window.SVGPathSegCurvetoQuadraticAbs = function (t, e, i, n, r) {
        window.SVGPathSeg.call(
          this,
          window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS,
          "Q",
          t
        ),
          (this._x = e),
          (this._y = i),
          (this._x1 = n),
          (this._y1 = r);
      }),
      (window.SVGPathSegCurvetoQuadraticAbs.prototype = Object.create(
        window.SVGPathSeg.prototype
      )),
      (window.SVGPathSegCurvetoQuadraticAbs.prototype.toString = function () {
        return "[object SVGPathSegCurvetoQuadraticAbs]";
      }),
      (window.SVGPathSegCurvetoQuadraticAbs.prototype._asPathString =
        function () {
          return (
            this.pathSegTypeAsLetter +
            " " +
            this._x1 +
            " " +
            this._y1 +
            " " +
            this._x +
            " " +
            this._y
          );
        }),
      (window.SVGPathSegCurvetoQuadraticAbs.prototype.clone = function () {
        return new window.SVGPathSegCurvetoQuadraticAbs(
          void 0,
          this._x,
          this._y,
          this._x1,
          this._y1
        );
      }),
      Object.defineProperty(
        window.SVGPathSegCurvetoQuadraticAbs.prototype,
        "x",
        {
          get: function () {
            return this._x;
          },
          set: function (t) {
            (this._x = t), this._segmentChanged();
          },
          enumerable: !0,
        }
      ),
      Object.defineProperty(
        window.SVGPathSegCurvetoQuadraticAbs.prototype,
        "y",
        {
          get: function () {
            return this._y;
          },
          set: function (t) {
            (this._y = t), this._segmentChanged();
          },
          enumerable: !0,
        }
      ),
      Object.defineProperty(
        window.SVGPathSegCurvetoQuadraticAbs.prototype,
        "x1",
        {
          get: function () {
            return this._x1;
          },
          set: function (t) {
            (this._x1 = t), this._segmentChanged();
          },
          enumerable: !0,
        }
      ),
      Object.defineProperty(
        window.SVGPathSegCurvetoQuadraticAbs.prototype,
        "y1",
        {
          get: function () {
            return this._y1;
          },
          set: function (t) {
            (this._y1 = t), this._segmentChanged();
          },
          enumerable: !0,
        }
      ),
      (window.SVGPathSegCurvetoQuadraticRel = function (t, e, i, n, r) {
        window.SVGPathSeg.call(
          this,
          window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL,
          "q",
          t
        ),
          (this._x = e),
          (this._y = i),
          (this._x1 = n),
          (this._y1 = r);
      }),
      (window.SVGPathSegCurvetoQuadraticRel.prototype = Object.create(
        window.SVGPathSeg.prototype
      )),
      (window.SVGPathSegCurvetoQuadraticRel.prototype.toString = function () {
        return "[object SVGPathSegCurvetoQuadraticRel]";
      }),
      (window.SVGPathSegCurvetoQuadraticRel.prototype._asPathString =
        function () {
          return (
            this.pathSegTypeAsLetter +
            " " +
            this._x1 +
            " " +
            this._y1 +
            " " +
            this._x +
            " " +
            this._y
          );
        }),
      (window.SVGPathSegCurvetoQuadraticRel.prototype.clone = function () {
        return new window.SVGPathSegCurvetoQuadraticRel(
          void 0,
          this._x,
          this._y,
          this._x1,
          this._y1
        );
      }),
      Object.defineProperty(
        window.SVGPathSegCurvetoQuadraticRel.prototype,
        "x",
        {
          get: function () {
            return this._x;
          },
          set: function (t) {
            (this._x = t), this._segmentChanged();
          },
          enumerable: !0,
        }
      ),
      Object.defineProperty(
        window.SVGPathSegCurvetoQuadraticRel.prototype,
        "y",
        {
          get: function () {
            return this._y;
          },
          set: function (t) {
            (this._y = t), this._segmentChanged();
          },
          enumerable: !0,
        }
      ),
      Object.defineProperty(
        window.SVGPathSegCurvetoQuadraticRel.prototype,
        "x1",
        {
          get: function () {
            return this._x1;
          },
          set: function (t) {
            (this._x1 = t), this._segmentChanged();
          },
          enumerable: !0,
        }
      ),
      Object.defineProperty(
        window.SVGPathSegCurvetoQuadraticRel.prototype,
        "y1",
        {
          get: function () {
            return this._y1;
          },
          set: function (t) {
            (this._y1 = t), this._segmentChanged();
          },
          enumerable: !0,
        }
      ),
      (window.SVGPathSegArcAbs = function (t, e, i, n, r, a, o, s) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_ARC_ABS, "A", t),
          (this._x = e),
          (this._y = i),
          (this._r1 = n),
          (this._r2 = r),
          (this._angle = a),
          (this._largeArcFlag = o),
          (this._sweepFlag = s);
      }),
      (window.SVGPathSegArcAbs.prototype = Object.create(
        window.SVGPathSeg.prototype
      )),
      (window.SVGPathSegArcAbs.prototype.toString = function () {
        return "[object SVGPathSegArcAbs]";
      }),
      (window.SVGPathSegArcAbs.prototype._asPathString = function () {
        return (
          this.pathSegTypeAsLetter +
          " " +
          this._r1 +
          " " +
          this._r2 +
          " " +
          this._angle +
          " " +
          (this._largeArcFlag ? "1" : "0") +
          " " +
          (this._sweepFlag ? "1" : "0") +
          " " +
          this._x +
          " " +
          this._y
        );
      }),
      (window.SVGPathSegArcAbs.prototype.clone = function () {
        return new window.SVGPathSegArcAbs(
          void 0,
          this._x,
          this._y,
          this._r1,
          this._r2,
          this._angle,
          this._largeArcFlag,
          this._sweepFlag
        );
      }),
      Object.defineProperty(window.SVGPathSegArcAbs.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (t) {
          (this._x = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegArcAbs.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (t) {
          (this._y = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegArcAbs.prototype, "r1", {
        get: function () {
          return this._r1;
        },
        set: function (t) {
          (this._r1 = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegArcAbs.prototype, "r2", {
        get: function () {
          return this._r2;
        },
        set: function (t) {
          (this._r2 = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegArcAbs.prototype, "angle", {
        get: function () {
          return this._angle;
        },
        set: function (t) {
          (this._angle = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegArcAbs.prototype, "largeArcFlag", {
        get: function () {
          return this._largeArcFlag;
        },
        set: function (t) {
          (this._largeArcFlag = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegArcAbs.prototype, "sweepFlag", {
        get: function () {
          return this._sweepFlag;
        },
        set: function (t) {
          (this._sweepFlag = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      (window.SVGPathSegArcRel = function (t, e, i, n, r, a, o, s) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_ARC_REL, "a", t),
          (this._x = e),
          (this._y = i),
          (this._r1 = n),
          (this._r2 = r),
          (this._angle = a),
          (this._largeArcFlag = o),
          (this._sweepFlag = s);
      }),
      (window.SVGPathSegArcRel.prototype = Object.create(
        window.SVGPathSeg.prototype
      )),
      (window.SVGPathSegArcRel.prototype.toString = function () {
        return "[object SVGPathSegArcRel]";
      }),
      (window.SVGPathSegArcRel.prototype._asPathString = function () {
        return (
          this.pathSegTypeAsLetter +
          " " +
          this._r1 +
          " " +
          this._r2 +
          " " +
          this._angle +
          " " +
          (this._largeArcFlag ? "1" : "0") +
          " " +
          (this._sweepFlag ? "1" : "0") +
          " " +
          this._x +
          " " +
          this._y
        );
      }),
      (window.SVGPathSegArcRel.prototype.clone = function () {
        return new window.SVGPathSegArcRel(
          void 0,
          this._x,
          this._y,
          this._r1,
          this._r2,
          this._angle,
          this._largeArcFlag,
          this._sweepFlag
        );
      }),
      Object.defineProperty(window.SVGPathSegArcRel.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (t) {
          (this._x = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegArcRel.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (t) {
          (this._y = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegArcRel.prototype, "r1", {
        get: function () {
          return this._r1;
        },
        set: function (t) {
          (this._r1 = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegArcRel.prototype, "r2", {
        get: function () {
          return this._r2;
        },
        set: function (t) {
          (this._r2 = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegArcRel.prototype, "angle", {
        get: function () {
          return this._angle;
        },
        set: function (t) {
          (this._angle = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegArcRel.prototype, "largeArcFlag", {
        get: function () {
          return this._largeArcFlag;
        },
        set: function (t) {
          (this._largeArcFlag = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathSegArcRel.prototype, "sweepFlag", {
        get: function () {
          return this._sweepFlag;
        },
        set: function (t) {
          (this._sweepFlag = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      (window.SVGPathSegLinetoHorizontalAbs = function (t, e) {
        window.SVGPathSeg.call(
          this,
          window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS,
          "H",
          t
        ),
          (this._x = e);
      }),
      (window.SVGPathSegLinetoHorizontalAbs.prototype = Object.create(
        window.SVGPathSeg.prototype
      )),
      (window.SVGPathSegLinetoHorizontalAbs.prototype.toString = function () {
        return "[object SVGPathSegLinetoHorizontalAbs]";
      }),
      (window.SVGPathSegLinetoHorizontalAbs.prototype._asPathString =
        function () {
          return this.pathSegTypeAsLetter + " " + this._x;
        }),
      (window.SVGPathSegLinetoHorizontalAbs.prototype.clone = function () {
        return new window.SVGPathSegLinetoHorizontalAbs(void 0, this._x);
      }),
      Object.defineProperty(
        window.SVGPathSegLinetoHorizontalAbs.prototype,
        "x",
        {
          get: function () {
            return this._x;
          },
          set: function (t) {
            (this._x = t), this._segmentChanged();
          },
          enumerable: !0,
        }
      ),
      (window.SVGPathSegLinetoHorizontalRel = function (t, e) {
        window.SVGPathSeg.call(
          this,
          window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL,
          "h",
          t
        ),
          (this._x = e);
      }),
      (window.SVGPathSegLinetoHorizontalRel.prototype = Object.create(
        window.SVGPathSeg.prototype
      )),
      (window.SVGPathSegLinetoHorizontalRel.prototype.toString = function () {
        return "[object SVGPathSegLinetoHorizontalRel]";
      }),
      (window.SVGPathSegLinetoHorizontalRel.prototype._asPathString =
        function () {
          return this.pathSegTypeAsLetter + " " + this._x;
        }),
      (window.SVGPathSegLinetoHorizontalRel.prototype.clone = function () {
        return new window.SVGPathSegLinetoHorizontalRel(void 0, this._x);
      }),
      Object.defineProperty(
        window.SVGPathSegLinetoHorizontalRel.prototype,
        "x",
        {
          get: function () {
            return this._x;
          },
          set: function (t) {
            (this._x = t), this._segmentChanged();
          },
          enumerable: !0,
        }
      ),
      (window.SVGPathSegLinetoVerticalAbs = function (t, e) {
        window.SVGPathSeg.call(
          this,
          window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS,
          "V",
          t
        ),
          (this._y = e);
      }),
      (window.SVGPathSegLinetoVerticalAbs.prototype = Object.create(
        window.SVGPathSeg.prototype
      )),
      (window.SVGPathSegLinetoVerticalAbs.prototype.toString = function () {
        return "[object SVGPathSegLinetoVerticalAbs]";
      }),
      (window.SVGPathSegLinetoVerticalAbs.prototype._asPathString =
        function () {
          return this.pathSegTypeAsLetter + " " + this._y;
        }),
      (window.SVGPathSegLinetoVerticalAbs.prototype.clone = function () {
        return new window.SVGPathSegLinetoVerticalAbs(void 0, this._y);
      }),
      Object.defineProperty(window.SVGPathSegLinetoVerticalAbs.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (t) {
          (this._y = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      (window.SVGPathSegLinetoVerticalRel = function (t, e) {
        window.SVGPathSeg.call(
          this,
          window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL,
          "v",
          t
        ),
          (this._y = e);
      }),
      (window.SVGPathSegLinetoVerticalRel.prototype = Object.create(
        window.SVGPathSeg.prototype
      )),
      (window.SVGPathSegLinetoVerticalRel.prototype.toString = function () {
        return "[object SVGPathSegLinetoVerticalRel]";
      }),
      (window.SVGPathSegLinetoVerticalRel.prototype._asPathString =
        function () {
          return this.pathSegTypeAsLetter + " " + this._y;
        }),
      (window.SVGPathSegLinetoVerticalRel.prototype.clone = function () {
        return new window.SVGPathSegLinetoVerticalRel(void 0, this._y);
      }),
      Object.defineProperty(window.SVGPathSegLinetoVerticalRel.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (t) {
          (this._y = t), this._segmentChanged();
        },
        enumerable: !0,
      }),
      (window.SVGPathSegCurvetoCubicSmoothAbs = function (t, e, i, n, r) {
        window.SVGPathSeg.call(
          this,
          window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS,
          "S",
          t
        ),
          (this._x = e),
          (this._y = i),
          (this._x2 = n),
          (this._y2 = r);
      }),
      (window.SVGPathSegCurvetoCubicSmoothAbs.prototype = Object.create(
        window.SVGPathSeg.prototype
      )),
      (window.SVGPathSegCurvetoCubicSmoothAbs.prototype.toString = function () {
        return "[object SVGPathSegCurvetoCubicSmoothAbs]";
      }),
      (window.SVGPathSegCurvetoCubicSmoothAbs.prototype._asPathString =
        function () {
          return (
            this.pathSegTypeAsLetter +
            " " +
            this._x2 +
            " " +
            this._y2 +
            " " +
            this._x +
            " " +
            this._y
          );
        }),
      (window.SVGPathSegCurvetoCubicSmoothAbs.prototype.clone = function () {
        return new window.SVGPathSegCurvetoCubicSmoothAbs(
          void 0,
          this._x,
          this._y,
          this._x2,
          this._y2
        );
      }),
      Object.defineProperty(
        window.SVGPathSegCurvetoCubicSmoothAbs.prototype,
        "x",
        {
          get: function () {
            return this._x;
          },
          set: function (t) {
            (this._x = t), this._segmentChanged();
          },
          enumerable: !0,
        }
      ),
      Object.defineProperty(
        window.SVGPathSegCurvetoCubicSmoothAbs.prototype,
        "y",
        {
          get: function () {
            return this._y;
          },
          set: function (t) {
            (this._y = t), this._segmentChanged();
          },
          enumerable: !0,
        }
      ),
      Object.defineProperty(
        window.SVGPathSegCurvetoCubicSmoothAbs.prototype,
        "x2",
        {
          get: function () {
            return this._x2;
          },
          set: function (t) {
            (this._x2 = t), this._segmentChanged();
          },
          enumerable: !0,
        }
      ),
      Object.defineProperty(
        window.SVGPathSegCurvetoCubicSmoothAbs.prototype,
        "y2",
        {
          get: function () {
            return this._y2;
          },
          set: function (t) {
            (this._y2 = t), this._segmentChanged();
          },
          enumerable: !0,
        }
      ),
      (window.SVGPathSegCurvetoCubicSmoothRel = function (t, e, i, n, r) {
        window.SVGPathSeg.call(
          this,
          window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL,
          "s",
          t
        ),
          (this._x = e),
          (this._y = i),
          (this._x2 = n),
          (this._y2 = r);
      }),
      (window.SVGPathSegCurvetoCubicSmoothRel.prototype = Object.create(
        window.SVGPathSeg.prototype
      )),
      (window.SVGPathSegCurvetoCubicSmoothRel.prototype.toString = function () {
        return "[object SVGPathSegCurvetoCubicSmoothRel]";
      }),
      (window.SVGPathSegCurvetoCubicSmoothRel.prototype._asPathString =
        function () {
          return (
            this.pathSegTypeAsLetter +
            " " +
            this._x2 +
            " " +
            this._y2 +
            " " +
            this._x +
            " " +
            this._y
          );
        }),
      (window.SVGPathSegCurvetoCubicSmoothRel.prototype.clone = function () {
        return new window.SVGPathSegCurvetoCubicSmoothRel(
          void 0,
          this._x,
          this._y,
          this._x2,
          this._y2
        );
      }),
      Object.defineProperty(
        window.SVGPathSegCurvetoCubicSmoothRel.prototype,
        "x",
        {
          get: function () {
            return this._x;
          },
          set: function (t) {
            (this._x = t), this._segmentChanged();
          },
          enumerable: !0,
        }
      ),
      Object.defineProperty(
        window.SVGPathSegCurvetoCubicSmoothRel.prototype,
        "y",
        {
          get: function () {
            return this._y;
          },
          set: function (t) {
            (this._y = t), this._segmentChanged();
          },
          enumerable: !0,
        }
      ),
      Object.defineProperty(
        window.SVGPathSegCurvetoCubicSmoothRel.prototype,
        "x2",
        {
          get: function () {
            return this._x2;
          },
          set: function (t) {
            (this._x2 = t), this._segmentChanged();
          },
          enumerable: !0,
        }
      ),
      Object.defineProperty(
        window.SVGPathSegCurvetoCubicSmoothRel.prototype,
        "y2",
        {
          get: function () {
            return this._y2;
          },
          set: function (t) {
            (this._y2 = t), this._segmentChanged();
          },
          enumerable: !0,
        }
      ),
      (window.SVGPathSegCurvetoQuadraticSmoothAbs = function (t, e, i) {
        window.SVGPathSeg.call(
          this,
          window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS,
          "T",
          t
        ),
          (this._x = e),
          (this._y = i);
      }),
      (window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype = Object.create(
        window.SVGPathSeg.prototype
      )),
      (window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.toString =
        function () {
          return "[object SVGPathSegCurvetoQuadraticSmoothAbs]";
        }),
      (window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype._asPathString =
        function () {
          return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
        }),
      (window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.clone =
        function () {
          return new window.SVGPathSegCurvetoQuadraticSmoothAbs(
            void 0,
            this._x,
            this._y
          );
        }),
      Object.defineProperty(
        window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype,
        "x",
        {
          get: function () {
            return this._x;
          },
          set: function (t) {
            (this._x = t), this._segmentChanged();
          },
          enumerable: !0,
        }
      ),
      Object.defineProperty(
        window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype,
        "y",
        {
          get: function () {
            return this._y;
          },
          set: function (t) {
            (this._y = t), this._segmentChanged();
          },
          enumerable: !0,
        }
      ),
      (window.SVGPathSegCurvetoQuadraticSmoothRel = function (t, e, i) {
        window.SVGPathSeg.call(
          this,
          window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL,
          "t",
          t
        ),
          (this._x = e),
          (this._y = i);
      }),
      (window.SVGPathSegCurvetoQuadraticSmoothRel.prototype = Object.create(
        window.SVGPathSeg.prototype
      )),
      (window.SVGPathSegCurvetoQuadraticSmoothRel.prototype.toString =
        function () {
          return "[object SVGPathSegCurvetoQuadraticSmoothRel]";
        }),
      (window.SVGPathSegCurvetoQuadraticSmoothRel.prototype._asPathString =
        function () {
          return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
        }),
      (window.SVGPathSegCurvetoQuadraticSmoothRel.prototype.clone =
        function () {
          return new window.SVGPathSegCurvetoQuadraticSmoothRel(
            void 0,
            this._x,
            this._y
          );
        }),
      Object.defineProperty(
        window.SVGPathSegCurvetoQuadraticSmoothRel.prototype,
        "x",
        {
          get: function () {
            return this._x;
          },
          set: function (t) {
            (this._x = t), this._segmentChanged();
          },
          enumerable: !0,
        }
      ),
      Object.defineProperty(
        window.SVGPathSegCurvetoQuadraticSmoothRel.prototype,
        "y",
        {
          get: function () {
            return this._y;
          },
          set: function (t) {
            (this._y = t), this._segmentChanged();
          },
          enumerable: !0,
        }
      ),
      (window.SVGPathElement.prototype.createSVGPathSegClosePath = function () {
        return new window.SVGPathSegClosePath(void 0);
      }),
      (window.SVGPathElement.prototype.createSVGPathSegMovetoAbs = function (
        t,
        e
      ) {
        return new window.SVGPathSegMovetoAbs(void 0, t, e);
      }),
      (window.SVGPathElement.prototype.createSVGPathSegMovetoRel = function (
        t,
        e
      ) {
        return new window.SVGPathSegMovetoRel(void 0, t, e);
      }),
      (window.SVGPathElement.prototype.createSVGPathSegLinetoAbs = function (
        t,
        e
      ) {
        return new window.SVGPathSegLinetoAbs(void 0, t, e);
      }),
      (window.SVGPathElement.prototype.createSVGPathSegLinetoRel = function (
        t,
        e
      ) {
        return new window.SVGPathSegLinetoRel(void 0, t, e);
      }),
      (window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicAbs =
        function (t, e, i, n, r, a) {
          return new window.SVGPathSegCurvetoCubicAbs(void 0, t, e, i, n, r, a);
        }),
      (window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicRel =
        function (t, e, i, n, r, a) {
          return new window.SVGPathSegCurvetoCubicRel(void 0, t, e, i, n, r, a);
        }),
      (window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticAbs =
        function (t, e, i, n) {
          return new window.SVGPathSegCurvetoQuadraticAbs(void 0, t, e, i, n);
        }),
      (window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticRel =
        function (t, e, i, n) {
          return new window.SVGPathSegCurvetoQuadraticRel(void 0, t, e, i, n);
        }),
      (window.SVGPathElement.prototype.createSVGPathSegArcAbs = function (
        t,
        e,
        i,
        n,
        r,
        a,
        o
      ) {
        return new window.SVGPathSegArcAbs(void 0, t, e, i, n, r, a, o);
      }),
      (window.SVGPathElement.prototype.createSVGPathSegArcRel = function (
        t,
        e,
        i,
        n,
        r,
        a,
        o
      ) {
        return new window.SVGPathSegArcRel(void 0, t, e, i, n, r, a, o);
      }),
      (window.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalAbs =
        function (t) {
          return new window.SVGPathSegLinetoHorizontalAbs(void 0, t);
        }),
      (window.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalRel =
        function (t) {
          return new window.SVGPathSegLinetoHorizontalRel(void 0, t);
        }),
      (window.SVGPathElement.prototype.createSVGPathSegLinetoVerticalAbs =
        function (t) {
          return new window.SVGPathSegLinetoVerticalAbs(void 0, t);
        }),
      (window.SVGPathElement.prototype.createSVGPathSegLinetoVerticalRel =
        function (t) {
          return new window.SVGPathSegLinetoVerticalRel(void 0, t);
        }),
      (window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothAbs =
        function (t, e, i, n) {
          return new window.SVGPathSegCurvetoCubicSmoothAbs(void 0, t, e, i, n);
        }),
      (window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothRel =
        function (t, e, i, n) {
          return new window.SVGPathSegCurvetoCubicSmoothRel(void 0, t, e, i, n);
        }),
      (window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothAbs =
        function (t, e) {
          return new window.SVGPathSegCurvetoQuadraticSmoothAbs(void 0, t, e);
        }),
      (window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothRel =
        function (t, e) {
          return new window.SVGPathSegCurvetoQuadraticSmoothRel(void 0, t, e);
        }),
      "getPathSegAtLength" in window.SVGPathElement.prototype ||
        (window.SVGPathElement.prototype.getPathSegAtLength = function (t) {
          if (void 0 === t || !isFinite(t)) throw "Invalid arguments.";
          var e = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          e.setAttribute("d", this.getAttribute("d"));
          var i = e.pathSegList.numberOfItems - 1;
          if (i <= 0) return 0;
          do {
            if ((e.pathSegList.removeItem(i), t > e.getTotalLength())) break;
            i--;
          } while (0 < i);
          return i;
        })),
    "SVGPathSegList" in window ||
      ((window.SVGPathSegList = function (t) {
        (this._pathElement = t),
          (this._list = this._parsePath(this._pathElement.getAttribute("d"))),
          (this._mutationObserverConfig = {
            attributes: !0,
            attributeFilter: ["d"],
          }),
          (this._pathElementMutationObserver = new MutationObserver(
            this._updateListFromPathMutations.bind(this)
          )),
          this._pathElementMutationObserver.observe(
            this._pathElement,
            this._mutationObserverConfig
          );
      }),
      (window.SVGPathSegList.prototype.classname = "SVGPathSegList"),
      Object.defineProperty(window.SVGPathSegList.prototype, "numberOfItems", {
        get: function () {
          return this._checkPathSynchronizedToList(), this._list.length;
        },
        enumerable: !0,
      }),
      Object.defineProperty(window.SVGPathElement.prototype, "pathSegList", {
        get: function () {
          return (
            this._pathSegList ||
              (this._pathSegList = new window.SVGPathSegList(this)),
            this._pathSegList
          );
        },
        enumerable: !0,
      }),
      Object.defineProperty(
        window.SVGPathElement.prototype,
        "normalizedPathSegList",
        {
          get: function () {
            return this.pathSegList;
          },
          enumerable: !0,
        }
      ),
      Object.defineProperty(
        window.SVGPathElement.prototype,
        "animatedPathSegList",
        {
          get: function () {
            return this.pathSegList;
          },
          enumerable: !0,
        }
      ),
      Object.defineProperty(
        window.SVGPathElement.prototype,
        "animatedNormalizedPathSegList",
        {
          get: function () {
            return this.pathSegList;
          },
          enumerable: !0,
        }
      ),
      (window.SVGPathSegList.prototype._checkPathSynchronizedToList =
        function () {
          this._updateListFromPathMutations(
            this._pathElementMutationObserver.takeRecords()
          );
        }),
      (window.SVGPathSegList.prototype._updateListFromPathMutations = function (
        t
      ) {
        if (this._pathElement) {
          var e = !1;
          t.forEach(function (t) {
            "d" == t.attributeName && (e = !0);
          }),
            e &&
              (this._list = this._parsePath(
                this._pathElement.getAttribute("d")
              ));
        }
      }),
      (window.SVGPathSegList.prototype._writeListToPath = function () {
        this._pathElementMutationObserver.disconnect(),
          this._pathElement.setAttribute(
            "d",
            window.SVGPathSegList._pathSegArrayAsString(this._list)
          ),
          this._pathElementMutationObserver.observe(
            this._pathElement,
            this._mutationObserverConfig
          );
      }),
      (window.SVGPathSegList.prototype.segmentChanged = function (t) {
        this._writeListToPath();
      }),
      (window.SVGPathSegList.prototype.clear = function () {
        this._checkPathSynchronizedToList(),
          this._list.forEach(function (t) {
            t._owningPathSegList = null;
          }),
          (this._list = []),
          this._writeListToPath();
      }),
      (window.SVGPathSegList.prototype.initialize = function (t) {
        return (
          this._checkPathSynchronizedToList(),
          (this._list = [t]),
          (t._owningPathSegList = this)._writeListToPath(),
          t
        );
      }),
      (window.SVGPathSegList.prototype._checkValidIndex = function (t) {
        if (isNaN(t) || t < 0 || t >= this.numberOfItems)
          throw "INDEX_SIZE_ERR";
      }),
      (window.SVGPathSegList.prototype.getItem = function (t) {
        return (
          this._checkPathSynchronizedToList(),
          this._checkValidIndex(t),
          this._list[t]
        );
      }),
      (window.SVGPathSegList.prototype.insertItemBefore = function (t, e) {
        return (
          this._checkPathSynchronizedToList(),
          e > this.numberOfItems && (e = this.numberOfItems),
          t._owningPathSegList && (t = t.clone()),
          this._list.splice(e, 0, t),
          (t._owningPathSegList = this)._writeListToPath(),
          t
        );
      }),
      (window.SVGPathSegList.prototype.replaceItem = function (t, e) {
        return (
          this._checkPathSynchronizedToList(),
          t._owningPathSegList && (t = t.clone()),
          this._checkValidIndex(e),
          ((this._list[e] = t)._owningPathSegList = this)._writeListToPath(),
          t
        );
      }),
      (window.SVGPathSegList.prototype.removeItem = function (t) {
        this._checkPathSynchronizedToList(), this._checkValidIndex(t);
        var e = this._list[t];
        return this._list.splice(t, 1), this._writeListToPath(), e;
      }),
      (window.SVGPathSegList.prototype.appendItem = function (t) {
        return (
          this._checkPathSynchronizedToList(),
          t._owningPathSegList && (t = t.clone()),
          this._list.push(t),
          (t._owningPathSegList = this)._writeListToPath(),
          t
        );
      }),
      (window.SVGPathSegList._pathSegArrayAsString = function (t) {
        var e = "",
          i = !0;
        return (
          t.forEach(function (t) {
            i
              ? ((i = !1), (e += t._asPathString()))
              : (e += " " + t._asPathString());
          }),
          e
        );
      }),
      (window.SVGPathSegList.prototype._parsePath = function (t) {
        if (!t || 0 == t.length) return [];
        var n = this,
          e = function () {
            this.pathSegList = [];
          };
        e.prototype.appendSegment = function (t) {
          this.pathSegList.push(t);
        };
        var i = function (t) {
          (this._string = t),
            (this._currentIndex = 0),
            (this._endIndex = this._string.length),
            (this._previousCommand = window.SVGPathSeg.PATHSEG_UNKNOWN),
            this._skipOptionalSpaces();
        };
        (i.prototype._isCurrentSpace = function () {
          var t = this._string[this._currentIndex];
          return (
            t <= " " &&
            (" " == t || "\n" == t || "\t" == t || "\r" == t || "\f" == t)
          );
        }),
          (i.prototype._skipOptionalSpaces = function () {
            for (
              ;
              this._currentIndex < this._endIndex && this._isCurrentSpace();

            )
              this._currentIndex++;
            return this._currentIndex < this._endIndex;
          }),
          (i.prototype._skipOptionalSpacesOrDelimiter = function () {
            return (
              !(
                this._currentIndex < this._endIndex &&
                !this._isCurrentSpace() &&
                "," != this._string.charAt(this._currentIndex)
              ) &&
              (this._skipOptionalSpaces() &&
                this._currentIndex < this._endIndex &&
                "," == this._string.charAt(this._currentIndex) &&
                (this._currentIndex++, this._skipOptionalSpaces()),
              this._currentIndex < this._endIndex)
            );
          }),
          (i.prototype.hasMoreData = function () {
            return this._currentIndex < this._endIndex;
          }),
          (i.prototype.peekSegmentType = function () {
            var t = this._string[this._currentIndex];
            return this._pathSegTypeFromChar(t);
          }),
          (i.prototype._pathSegTypeFromChar = function (t) {
            switch (t) {
              case "Z":
              case "z":
                return window.SVGPathSeg.PATHSEG_CLOSEPATH;
              case "M":
                return window.SVGPathSeg.PATHSEG_MOVETO_ABS;
              case "m":
                return window.SVGPathSeg.PATHSEG_MOVETO_REL;
              case "L":
                return window.SVGPathSeg.PATHSEG_LINETO_ABS;
              case "l":
                return window.SVGPathSeg.PATHSEG_LINETO_REL;
              case "C":
                return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS;
              case "c":
                return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL;
              case "Q":
                return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS;
              case "q":
                return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL;
              case "A":
                return window.SVGPathSeg.PATHSEG_ARC_ABS;
              case "a":
                return window.SVGPathSeg.PATHSEG_ARC_REL;
              case "H":
                return window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS;
              case "h":
                return window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL;
              case "V":
                return window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS;
              case "v":
                return window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL;
              case "S":
                return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS;
              case "s":
                return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL;
              case "T":
                return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS;
              case "t":
                return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL;
              default:
                return window.SVGPathSeg.PATHSEG_UNKNOWN;
            }
          }),
          (i.prototype._nextCommandHelper = function (t, e) {
            return ("+" == t ||
              "-" == t ||
              "." == t ||
              ("0" <= t && t <= "9")) &&
              e != window.SVGPathSeg.PATHSEG_CLOSEPATH
              ? e == window.SVGPathSeg.PATHSEG_MOVETO_ABS
                ? window.SVGPathSeg.PATHSEG_LINETO_ABS
                : e == window.SVGPathSeg.PATHSEG_MOVETO_REL
                ? window.SVGPathSeg.PATHSEG_LINETO_REL
                : e
              : window.SVGPathSeg.PATHSEG_UNKNOWN;
          }),
          (i.prototype.initialCommandIsMoveTo = function () {
            if (!this.hasMoreData()) return !0;
            var t = this.peekSegmentType();
            return (
              t == window.SVGPathSeg.PATHSEG_MOVETO_ABS ||
              t == window.SVGPathSeg.PATHSEG_MOVETO_REL
            );
          }),
          (i.prototype._parseNumber = function () {
            var t = 0,
              e = 0,
              i = 1,
              n = 0,
              r = 1,
              a = 1,
              o = this._currentIndex;
            if (
              (this._skipOptionalSpaces(),
              this._currentIndex < this._endIndex &&
              "+" == this._string.charAt(this._currentIndex)
                ? this._currentIndex++
                : this._currentIndex < this._endIndex &&
                  "-" == this._string.charAt(this._currentIndex) &&
                  (this._currentIndex++, (r = -1)),
              !(
                this._currentIndex == this._endIndex ||
                ((this._string.charAt(this._currentIndex) < "0" ||
                  "9" < this._string.charAt(this._currentIndex)) &&
                  "." != this._string.charAt(this._currentIndex))
              ))
            ) {
              for (
                var s = this._currentIndex;
                this._currentIndex < this._endIndex &&
                "0" <= this._string.charAt(this._currentIndex) &&
                this._string.charAt(this._currentIndex) <= "9";

              )
                this._currentIndex++;
              if (this._currentIndex != s)
                for (var c = this._currentIndex - 1, d = 1; s <= c; )
                  (e += d * (this._string.charAt(c--) - "0")), (d *= 10);
              if (
                this._currentIndex < this._endIndex &&
                "." == this._string.charAt(this._currentIndex)
              ) {
                if (
                  (this._currentIndex++,
                  this._currentIndex >= this._endIndex ||
                    this._string.charAt(this._currentIndex) < "0" ||
                    "9" < this._string.charAt(this._currentIndex))
                )
                  return;
                for (
                  ;
                  this._currentIndex < this._endIndex &&
                  "0" <= this._string.charAt(this._currentIndex) &&
                  this._string.charAt(this._currentIndex) <= "9";

                )
                  (i *= 10),
                    (n += (this._string.charAt(this._currentIndex) - "0") / i),
                    (this._currentIndex += 1);
              }
              if (
                this._currentIndex != o &&
                this._currentIndex + 1 < this._endIndex &&
                ("e" == this._string.charAt(this._currentIndex) ||
                  "E" == this._string.charAt(this._currentIndex)) &&
                "x" != this._string.charAt(this._currentIndex + 1) &&
                "m" != this._string.charAt(this._currentIndex + 1)
              ) {
                if (
                  (this._currentIndex++,
                  "+" == this._string.charAt(this._currentIndex)
                    ? this._currentIndex++
                    : "-" == this._string.charAt(this._currentIndex) &&
                      (this._currentIndex++, (a = -1)),
                  this._currentIndex >= this._endIndex ||
                    this._string.charAt(this._currentIndex) < "0" ||
                    "9" < this._string.charAt(this._currentIndex))
                )
                  return;
                for (
                  ;
                  this._currentIndex < this._endIndex &&
                  "0" <= this._string.charAt(this._currentIndex) &&
                  this._string.charAt(this._currentIndex) <= "9";

                )
                  (t *= 10),
                    (t += this._string.charAt(this._currentIndex) - "0"),
                    this._currentIndex++;
              }
              var l = e + n;
              if (
                ((l *= r),
                t && (l *= Math.pow(10, a * t)),
                o != this._currentIndex)
              )
                return this._skipOptionalSpacesOrDelimiter(), l;
            }
          }),
          (i.prototype._parseArcFlag = function () {
            if (!(this._currentIndex >= this._endIndex)) {
              var t = !1,
                e = this._string.charAt(this._currentIndex++);
              if ("0" == e) t = !1;
              else {
                if ("1" != e) return;
                t = !0;
              }
              return this._skipOptionalSpacesOrDelimiter(), t;
            }
          }),
          (i.prototype.parseSegment = function () {
            var t = this._string[this._currentIndex],
              e = this._pathSegTypeFromChar(t);
            if (e == window.SVGPathSeg.PATHSEG_UNKNOWN) {
              if (this._previousCommand == window.SVGPathSeg.PATHSEG_UNKNOWN)
                return null;
              if (
                (e = this._nextCommandHelper(t, this._previousCommand)) ==
                window.SVGPathSeg.PATHSEG_UNKNOWN
              )
                return null;
            } else this._currentIndex++;
            switch ((this._previousCommand = e)) {
              case window.SVGPathSeg.PATHSEG_MOVETO_REL:
                return new window.SVGPathSegMovetoRel(
                  n,
                  this._parseNumber(),
                  this._parseNumber()
                );
              case window.SVGPathSeg.PATHSEG_MOVETO_ABS:
                return new window.SVGPathSegMovetoAbs(
                  n,
                  this._parseNumber(),
                  this._parseNumber()
                );
              case window.SVGPathSeg.PATHSEG_LINETO_REL:
                return new window.SVGPathSegLinetoRel(
                  n,
                  this._parseNumber(),
                  this._parseNumber()
                );
              case window.SVGPathSeg.PATHSEG_LINETO_ABS:
                return new window.SVGPathSegLinetoAbs(
                  n,
                  this._parseNumber(),
                  this._parseNumber()
                );
              case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
                return new window.SVGPathSegLinetoHorizontalRel(
                  n,
                  this._parseNumber()
                );
              case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
                return new window.SVGPathSegLinetoHorizontalAbs(
                  n,
                  this._parseNumber()
                );
              case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
                return new window.SVGPathSegLinetoVerticalRel(
                  n,
                  this._parseNumber()
                );
              case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
                return new window.SVGPathSegLinetoVerticalAbs(
                  n,
                  this._parseNumber()
                );
              case window.SVGPathSeg.PATHSEG_CLOSEPATH:
                return (
                  this._skipOptionalSpaces(), new window.SVGPathSegClosePath(n)
                );
              case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL:
                var i = {
                  x1: this._parseNumber(),
                  y1: this._parseNumber(),
                  x2: this._parseNumber(),
                  y2: this._parseNumber(),
                  x: this._parseNumber(),
                  y: this._parseNumber(),
                };
                return new window.SVGPathSegCurvetoCubicRel(
                  n,
                  i.x,
                  i.y,
                  i.x1,
                  i.y1,
                  i.x2,
                  i.y2
                );
              case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                return (
                  (i = {
                    x1: this._parseNumber(),
                    y1: this._parseNumber(),
                    x2: this._parseNumber(),
                    y2: this._parseNumber(),
                    x: this._parseNumber(),
                    y: this._parseNumber(),
                  }),
                  new window.SVGPathSegCurvetoCubicAbs(
                    n,
                    i.x,
                    i.y,
                    i.x1,
                    i.y1,
                    i.x2,
                    i.y2
                  )
                );
              case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
                return (
                  (i = {
                    x2: this._parseNumber(),
                    y2: this._parseNumber(),
                    x: this._parseNumber(),
                    y: this._parseNumber(),
                  }),
                  new window.SVGPathSegCurvetoCubicSmoothRel(
                    n,
                    i.x,
                    i.y,
                    i.x2,
                    i.y2
                  )
                );
              case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
                return (
                  (i = {
                    x2: this._parseNumber(),
                    y2: this._parseNumber(),
                    x: this._parseNumber(),
                    y: this._parseNumber(),
                  }),
                  new window.SVGPathSegCurvetoCubicSmoothAbs(
                    n,
                    i.x,
                    i.y,
                    i.x2,
                    i.y2
                  )
                );
              case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
                return (
                  (i = {
                    x1: this._parseNumber(),
                    y1: this._parseNumber(),
                    x: this._parseNumber(),
                    y: this._parseNumber(),
                  }),
                  new window.SVGPathSegCurvetoQuadraticRel(
                    n,
                    i.x,
                    i.y,
                    i.x1,
                    i.y1
                  )
                );
              case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
                return (
                  (i = {
                    x1: this._parseNumber(),
                    y1: this._parseNumber(),
                    x: this._parseNumber(),
                    y: this._parseNumber(),
                  }),
                  new window.SVGPathSegCurvetoQuadraticAbs(
                    n,
                    i.x,
                    i.y,
                    i.x1,
                    i.y1
                  )
                );
              case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
                return new window.SVGPathSegCurvetoQuadraticSmoothRel(
                  n,
                  this._parseNumber(),
                  this._parseNumber()
                );
              case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
                return new window.SVGPathSegCurvetoQuadraticSmoothAbs(
                  n,
                  this._parseNumber(),
                  this._parseNumber()
                );
              case window.SVGPathSeg.PATHSEG_ARC_REL:
                return (
                  (i = {
                    x1: this._parseNumber(),
                    y1: this._parseNumber(),
                    arcAngle: this._parseNumber(),
                    arcLarge: this._parseArcFlag(),
                    arcSweep: this._parseArcFlag(),
                    x: this._parseNumber(),
                    y: this._parseNumber(),
                  }),
                  new window.SVGPathSegArcRel(
                    n,
                    i.x,
                    i.y,
                    i.x1,
                    i.y1,
                    i.arcAngle,
                    i.arcLarge,
                    i.arcSweep
                  )
                );
              case window.SVGPathSeg.PATHSEG_ARC_ABS:
                return (
                  (i = {
                    x1: this._parseNumber(),
                    y1: this._parseNumber(),
                    arcAngle: this._parseNumber(),
                    arcLarge: this._parseArcFlag(),
                    arcSweep: this._parseArcFlag(),
                    x: this._parseNumber(),
                    y: this._parseNumber(),
                  }),
                  new window.SVGPathSegArcAbs(
                    n,
                    i.x,
                    i.y,
                    i.x1,
                    i.y1,
                    i.arcAngle,
                    i.arcLarge,
                    i.arcSweep
                  )
                );
              default:
                throw "Unknown path seg type.";
            }
          });
        var r = new e(),
          a = new i(t);
        if (!a.initialCommandIsMoveTo()) return [];
        for (; a.hasMoreData(); ) {
          var o = a.parseSegment();
          if (!o) return [];
          r.appendSegment(o);
        }
        return r.pathSegList;
      })),
    String.prototype.padEnd ||
      (String.prototype.padEnd = function (t, e) {
        return (
          (t >>= 0),
          (e = String(void 0 !== e ? e : " ")),
          this.length > t
            ? String(this)
            : ((t -= this.length) > e.length && (e += e.repeat(t / e.length)),
              String(this) + e.slice(0, t))
        );
      }),
    ((n.prototype.axis = function () {}).labels = function (e) {
      var i = this.internal;
      arguments.length &&
        (Object.keys(e).forEach(function (t) {
          i.axis.setLabelText(t, e[t]);
        }),
        i.axis.updateLabels());
    }),
    (n.prototype.axis.max = function (t) {
      var e = this.internal,
        i = e.config;
      if (!arguments.length)
        return { x: i.axis_x_max, y: i.axis_y_max, y2: i.axis_y2_max };
      "object" === s(t)
        ? (P(t.x) && (i.axis_x_max = t.x),
          P(t.y) && (i.axis_y_max = t.y),
          P(t.y2) && (i.axis_y2_max = t.y2))
        : (i.axis_y_max = i.axis_y2_max = t),
        e.redraw({ withUpdateOrgXDomain: !0, withUpdateXDomain: !0 });
    }),
    (n.prototype.axis.min = function (t) {
      var e = this.internal,
        i = e.config;
      if (!arguments.length)
        return { x: i.axis_x_min, y: i.axis_y_min, y2: i.axis_y2_min };
      "object" === s(t)
        ? (P(t.x) && (i.axis_x_min = t.x),
          P(t.y) && (i.axis_y_min = t.y),
          P(t.y2) && (i.axis_y2_min = t.y2))
        : (i.axis_y_min = i.axis_y2_min = t),
        e.redraw({ withUpdateOrgXDomain: !0, withUpdateXDomain: !0 });
    }),
    (n.prototype.axis.range = function (t) {
      if (!arguments.length)
        return { max: this.axis.max(), min: this.axis.min() };
      k(t.max) && this.axis.max(t.max), k(t.min) && this.axis.min(t.min);
    }),
    (n.prototype.category = function (t, e) {
      var i = this.internal,
        n = i.config;
      return (
        1 < arguments.length && ((n.axis_x_categories[t] = e), i.redraw()),
        n.axis_x_categories[t]
      );
    }),
    (n.prototype.categories = function (t) {
      var e = this.internal,
        i = e.config;
      return (
        arguments.length && ((i.axis_x_categories = t), e.redraw()),
        i.axis_x_categories
      );
    }),
    (n.prototype.resize = function (t) {
      var e = this.internal.config;
      (e.size_width = t ? t.width : null),
        (e.size_height = t ? t.height : null),
        this.flush();
    }),
    (n.prototype.flush = function () {
      this.internal.updateAndRedraw({
        withLegend: !0,
        withTransition: !1,
        withTransitionForTransform: !1,
      });
    }),
    (n.prototype.destroy = function () {
      var e = this.internal;
      if (
        (window.clearInterval(e.intervalForObserveInserted),
        void 0 !== e.resizeTimeout && window.clearTimeout(e.resizeTimeout),
        window.detachEvent)
      )
        window.detachEvent("onresize", e.resizeIfElementDisplayed);
      else if (window.removeEventListener)
        window.removeEventListener("resize", e.resizeIfElementDisplayed);
      else {
        var t = window.onresize;
        t && t.add && t.remove && t.remove(e.resizeFunction);
      }
      return (
        e.resizeFunction.remove(),
        e.unbindWindowFocus(),
        e.selectChart.classed("c3", !1).html(""),
        Object.keys(e).forEach(function (t) {
          e[t] = null;
        }),
        null
      );
    }),
    (n.prototype.color = function (t) {
      return this.internal.color(t);
    }),
    ((n.prototype.data = function (e) {
      var t = this.internal.data.targets;
      return void 0 === e
        ? t
        : t.filter(function (t) {
            return 0 <= [].concat(e).indexOf(t.id);
          });
    }).shown = function (t) {
      return this.internal.filterTargetsToShow(this.data(t));
    }),
    (n.prototype.data.values = function (t) {
      var e,
        i = null;
      return (
        t &&
          (i = (e = this.data(t))[0]
            ? e[0].values.map(function (t) {
                return t.value;
              })
            : null),
        i
      );
    }),
    (n.prototype.data.names = function (t) {
      return (
        this.internal.clearLegendItemTextBoxCache(),
        this.internal.updateDataAttributes("names", t)
      );
    }),
    (n.prototype.data.colors = function (t) {
      return this.internal.updateDataAttributes("colors", t);
    }),
    (n.prototype.data.axes = function (t) {
      return this.internal.updateDataAttributes("axes", t);
    }),
    (n.prototype.flow = function (t) {
      var r,
        e,
        i,
        n,
        a,
        o,
        s,
        c = this.internal,
        d = [],
        l = c.getMaxDataCount(),
        u = 0,
        h = 0;
      if (t.json) e = c.convertJsonToData(t.json, t.keys);
      else if (t.rows) e = c.convertRowsToData(t.rows);
      else {
        if (!t.columns) return;
        e = c.convertColumnsToData(t.columns);
      }
      (r = c.convertDataToTargets(e, !0)),
        c.data.targets.forEach(function (t) {
          var e,
            i,
            n = !1;
          for (e = 0; e < r.length; e++)
            if (t.id === r[e].id) {
              for (
                n = !0,
                  t.values[t.values.length - 1] &&
                    (h = t.values[t.values.length - 1].index + 1),
                  u = r[e].values.length,
                  i = 0;
                i < u;
                i++
              )
                (r[e].values[i].index = h + i),
                  c.isTimeSeries() || (r[e].values[i].x = h + i);
              (t.values = t.values.concat(r[e].values)), r.splice(e, 1);
              break;
            }
          n || d.push(t.id);
        }),
        c.data.targets.forEach(function (t) {
          var e, i;
          for (e = 0; e < d.length; e++)
            if (t.id === d[e])
              for (
                h = t.values[t.values.length - 1].index + 1, i = 0;
                i < u;
                i++
              )
                t.values.push({
                  id: t.id,
                  index: h + i,
                  x: c.isTimeSeries() ? c.getOtherTargetX(h + i) : h + i,
                  value: null,
                });
        }),
        c.data.targets.length &&
          r.forEach(function (t) {
            var e,
              i = [];
            for (e = c.data.targets[0].values[0].index; e < h; e++)
              i.push({
                id: t.id,
                index: e,
                x: c.isTimeSeries() ? c.getOtherTargetX(e) : e,
                value: null,
              });
            t.values.forEach(function (t) {
              (t.index += h), c.isTimeSeries() || (t.x += h);
            }),
              (t.values = i.concat(t.values));
          }),
        (c.data.targets = c.data.targets.concat(r)),
        c.getMaxDataCount(),
        (a = (n = c.data.targets[0]).values[0]),
        k(t.to)
          ? ((u = 0),
            (s = c.isTimeSeries() ? c.parseDate(t.to) : t.to),
            n.values.forEach(function (t) {
              t.x < s && u++;
            }))
          : k(t.length) && (u = t.length),
        l
          ? 1 === l &&
            c.isTimeSeries() &&
            ((o = (n.values[n.values.length - 1].x - a.x) / 2),
            (i = [new Date(+a.x - o), new Date(+a.x + o)]),
            c.updateXDomain(null, !0, !0, !1, i))
          : ((o = c.isTimeSeries()
              ? 1 < n.values.length
                ? n.values[n.values.length - 1].x - a.x
                : a.x - c.getXDomain(c.data.targets)[0]
              : 1),
            (i = [a.x - o, a.x]),
            c.updateXDomain(null, !0, !0, !1, i)),
        c.updateTargets(c.data.targets),
        c.redraw({
          flow: {
            index: a.index,
            length: u,
            duration: P(t.duration) ? t.duration : c.config.transition_duration,
            done: t.done,
            orgDataCount: l,
          },
          withLegend: !0,
          withTransition: 1 < l,
          withTrimXDomain: !1,
          withUpdateXAxis: !0,
        });
    }),
    (l.prototype.generateFlow = function (G) {
      var E = this,
        I = E.config,
        O = E.d3;
      return function () {
        var t,
          e,
          n,
          r,
          a,
          o,
          s,
          c,
          d,
          l,
          i = G.targets,
          u = G.flow,
          h = G.drawBar,
          g = G.drawLine,
          p = G.drawArea,
          f = G.cx,
          _ = G.cy,
          x = G.xv,
          y = G.xForText,
          m = G.yForText,
          S = G.duration,
          w = u.index,
          v = u.length,
          b = E.getValueOnIndex(E.data.targets[0].values, w),
          T = E.getValueOnIndex(E.data.targets[0].values, w + v),
          A = E.x.domain(),
          P = u.duration || S,
          C = u.done || function () {},
          L = E.generateWait();
        (E.flowing = !0),
          E.data.targets.forEach(function (t) {
            t.values.splice(0, v);
          }),
          (e = E.updateXDomain(i, !0, !0)),
          E.updateXGrid && E.updateXGrid(!0),
          (n = E.xgrid || O.selectAll([])),
          (r = E.xgridLines || O.selectAll([])),
          (a = E.mainRegion || O.selectAll([])),
          (o = E.mainText || O.selectAll([])),
          (s = E.mainBar || O.selectAll([])),
          (c = E.mainLine || O.selectAll([])),
          (d = E.mainArea || O.selectAll([])),
          (l = E.mainCircle || O.selectAll([])),
          (t =
            "translate(" +
            (u.orgDataCount
              ? 1 === u.orgDataCount || (b && b.x) === (T && T.x)
                ? E.x(A[0]) - E.x(e[0])
                : E.isTimeSeries()
                ? E.x(A[0]) - E.x(e[0])
                : E.x(b.x) - E.x(T.x)
              : 1 !== E.data.targets[0].values.length
              ? E.x(A[0]) - E.x(e[0])
              : E.isTimeSeries()
              ? ((b = E.getValueOnIndex(E.data.targets[0].values, 0)),
                (T = E.getValueOnIndex(
                  E.data.targets[0].values,
                  E.data.targets[0].values.length - 1
                )),
                E.x(b.x) - E.x(T.x))
              : R(e) / 2) +
            ",0) scale(" +
            R(A) / R(e) +
            ",1)"),
          E.hideXGridFocus();
        var V = O.transition().ease(O.easeLinear).duration(P);
        L.add(E.xAxis(E.axes.x, V)),
          L.add(s.transition(V).attr("transform", t)),
          L.add(c.transition(V).attr("transform", t)),
          L.add(d.transition(V).attr("transform", t)),
          L.add(l.transition(V).attr("transform", t)),
          L.add(o.transition(V).attr("transform", t)),
          L.add(a.filter(E.isRegionOnX).transition(V).attr("transform", t)),
          L.add(n.transition(V).attr("transform", t)),
          L.add(r.transition(V).attr("transform", t)),
          L(function () {
            var t,
              e = [],
              i = [];
            if (v) {
              for (t = 0; t < v; t++)
                e.push("." + Y.shape + "-" + (w + t)),
                  i.push("." + Y.text + "-" + (w + t));
              E.svg
                .selectAll("." + Y.shapes)
                .selectAll(e)
                .remove(),
                E.svg
                  .selectAll("." + Y.texts)
                  .selectAll(i)
                  .remove(),
                E.svg.select("." + Y.xgrid).remove();
            }
            n
              .attr("transform", null)
              .attr("x1", E.xgridAttr.x1)
              .attr("x2", E.xgridAttr.x2)
              .attr("y1", E.xgridAttr.y1)
              .attr("y2", E.xgridAttr.y2)
              .style("opacity", E.xgridAttr.opacity),
              r.attr("transform", null),
              r
                .select("line")
                .attr("x1", I.axis_rotated ? 0 : x)
                .attr("x2", I.axis_rotated ? E.width : x),
              r
                .select("text")
                .attr("x", I.axis_rotated ? E.width : 0)
                .attr("y", x),
              s.attr("transform", null).attr("d", h),
              c.attr("transform", null).attr("d", g),
              d.attr("transform", null).attr("d", p),
              l.attr("transform", null).attr("cx", f).attr("cy", _),
              o
                .attr("transform", null)
                .attr("x", y)
                .attr("y", m)
                .style("fill-opacity", E.opacityForText.bind(E)),
              a.attr("transform", null),
              a
                .filter(E.isRegionOnX)
                .attr("x", E.regionX.bind(E))
                .attr("width", E.regionWidth.bind(E)),
              C(),
              (E.flowing = !1);
          });
      };
    }),
    (n.prototype.focus = function (e) {
      var t,
        i = this.internal;
      (e = i.mapToTargetIds(e)),
        (t = i.svg.selectAll(i.selectorTargets(e.filter(i.isTargetToShow, i)))),
        this.revert(),
        this.defocus(),
        t.classed(Y.focused, !0).classed(Y.defocused, !1),
        i.hasArcType() && i.expandArc(e),
        i.toggleFocusLegend(e, !0),
        (i.focusedTargetIds = e),
        (i.defocusedTargetIds = i.defocusedTargetIds.filter(function (t) {
          return e.indexOf(t) < 0;
        }));
    }),
    (n.prototype.defocus = function (e) {
      var t = this.internal;
      (e = t.mapToTargetIds(e)),
        t.svg
          .selectAll(t.selectorTargets(e.filter(t.isTargetToShow, t)))
          .classed(Y.focused, !1)
          .classed(Y.defocused, !0),
        t.hasArcType() && t.unexpandArc(e),
        t.toggleFocusLegend(e, !1),
        (t.focusedTargetIds = t.focusedTargetIds.filter(function (t) {
          return e.indexOf(t) < 0;
        })),
        (t.defocusedTargetIds = e);
    }),
    (n.prototype.revert = function (t) {
      var e = this.internal;
      (t = e.mapToTargetIds(t)),
        e.svg
          .selectAll(e.selectorTargets(t))
          .classed(Y.focused, !1)
          .classed(Y.defocused, !1),
        e.hasArcType() && e.unexpandArc(t),
        e.config.legend_show &&
          (e.showLegend(t.filter(e.isLegendToShow.bind(e))),
          e.legend
            .selectAll(e.selectorLegends(t))
            .filter(function () {
              return e.d3.select(this).classed(Y.legendItemFocused);
            })
            .classed(Y.legendItemFocused, !1)),
        (e.focusedTargetIds = []),
        (e.defocusedTargetIds = []);
    }),
    ((n.prototype.xgrids = function (t) {
      var e = this.internal,
        i = e.config;
      return (
        t && ((i.grid_x_lines = t), e.redrawWithoutRescale()), i.grid_x_lines
      );
    }).add = function (t) {
      var e = this.internal;
      return this.xgrids(e.config.grid_x_lines.concat(t || []));
    }),
    (n.prototype.xgrids.remove = function (t) {
      this.internal.removeGridLines(t, !0);
    }),
    ((n.prototype.ygrids = function (t) {
      var e = this.internal,
        i = e.config;
      return (
        t && ((i.grid_y_lines = t), e.redrawWithoutRescale()), i.grid_y_lines
      );
    }).add = function (t) {
      var e = this.internal;
      return this.ygrids(e.config.grid_y_lines.concat(t || []));
    }),
    (n.prototype.ygrids.remove = function (t) {
      this.internal.removeGridLines(t, !1);
    }),
    (n.prototype.groups = function (t) {
      var e = this.internal,
        i = e.config;
      return v(t) || ((i.data_groups = t), e.redraw()), i.data_groups;
    }),
    ((n.prototype.legend = function () {}).show = function (t) {
      var e = this.internal;
      e.showLegend(e.mapToTargetIds(t)), e.updateAndRedraw({ withLegend: !0 });
    }),
    (n.prototype.legend.hide = function (t) {
      var e = this.internal;
      e.hideLegend(e.mapToTargetIds(t)), e.updateAndRedraw({ withLegend: !1 });
    }),
    (n.prototype.load = function (e) {
      var t = this.internal,
        i = t.config;
      e.xs && t.addXs(e.xs),
        "names" in e && n.prototype.data.names.bind(this)(e.names),
        "classes" in e &&
          Object.keys(e.classes).forEach(function (t) {
            i.data_classes[t] = e.classes[t];
          }),
        "categories" in e &&
          t.isCategorized() &&
          (i.axis_x_categories = e.categories),
        "axes" in e &&
          Object.keys(e.axes).forEach(function (t) {
            i.data_axes[t] = e.axes[t];
          }),
        "colors" in e &&
          Object.keys(e.colors).forEach(function (t) {
            i.data_colors[t] = e.colors[t];
          }),
        "cacheIds" in e && t.hasCaches(e.cacheIds)
          ? t.load(t.getCaches(e.cacheIds), e.done)
          : "unload" in e
          ? t.unload(
              t.mapToTargetIds(
                "boolean" == typeof e.unload && e.unload ? null : e.unload
              ),
              function () {
                t.loadFromArgs(e);
              }
            )
          : t.loadFromArgs(e);
    }),
    (n.prototype.unload = function (t) {
      var e = this.internal;
      (t = t || {}) instanceof Array
        ? (t = { ids: t })
        : "string" == typeof t && (t = { ids: [t] }),
        e.unload(e.mapToTargetIds(t.ids), function () {
          e.redraw({
            withUpdateOrgXDomain: !0,
            withUpdateXDomain: !0,
            withLegend: !0,
          }),
            t.done && t.done();
        });
    }),
    ((n.prototype.regions = function (t) {
      var e = this.internal,
        i = e.config;
      return t && ((i.regions = t), e.redrawWithoutRescale()), i.regions;
    }).add = function (t) {
      var e = this.internal,
        i = e.config;
      return (
        t && ((i.regions = i.regions.concat(t)), e.redrawWithoutRescale()),
        i.regions
      );
    }),
    (n.prototype.regions.remove = function (t) {
      var e,
        i,
        n,
        r = this.internal,
        a = r.config;
      return (
        (e = N((t = t || {}), "duration", a.transition_duration)),
        (i = N(t, "classes", [Y.region])),
        (n = r.main.select("." + Y.regions).selectAll(
          i.map(function (t) {
            return "." + t;
          })
        )),
        (e ? n.transition().duration(e) : n).style("opacity", 0).remove(),
        (a.regions = a.regions.filter(function (t) {
          var e = !1;
          return (
            !t.class ||
            (t.class.split(" ").forEach(function (t) {
              0 <= i.indexOf(t) && (e = !0);
            }),
            !e)
          );
        })),
        a.regions
      );
    }),
    (n.prototype.selected = function (t) {
      var e = this.internal,
        i = e.d3;
      return e.main
        .selectAll("." + Y.shapes + e.getTargetSelectorSuffix(t))
        .selectAll("." + Y.shape)
        .filter(function () {
          return i.select(this).classed(Y.SELECTED);
        })
        .nodes()
        .map(function (t) {
          var e = t.__data__;
          return e.data ? e.data : e;
        });
    }),
    (n.prototype.select = function (c, d, l) {
      var u = this.internal,
        h = u.d3,
        g = u.config;
      g.data_selection_enabled &&
        u.main
          .selectAll("." + Y.shapes)
          .selectAll("." + Y.shape)
          .each(function (t, e) {
            var i = h.select(this),
              n = t.data ? t.data.id : t.id,
              r = u.getToggle(this, t).bind(u),
              a = g.data_selection_grouped || !c || 0 <= c.indexOf(n),
              o = !d || 0 <= d.indexOf(e),
              s = i.classed(Y.SELECTED);
            i.classed(Y.line) ||
              i.classed(Y.area) ||
              (a && o
                ? g.data_selection_isselectable(t) &&
                  !s &&
                  r(!0, i.classed(Y.SELECTED, !0), t, e)
                : k(l) && l && s && r(!1, i.classed(Y.SELECTED, !1), t, e));
          });
    }),
    (n.prototype.unselect = function (c, d) {
      var l = this.internal,
        u = l.d3,
        h = l.config;
      h.data_selection_enabled &&
        l.main
          .selectAll("." + Y.shapes)
          .selectAll("." + Y.shape)
          .each(function (t, e) {
            var i = u.select(this),
              n = t.data ? t.data.id : t.id,
              r = l.getToggle(this, t).bind(l),
              a = h.data_selection_grouped || !c || 0 <= c.indexOf(n),
              o = !d || 0 <= d.indexOf(e),
              s = i.classed(Y.SELECTED);
            i.classed(Y.line) ||
              i.classed(Y.area) ||
              (a &&
                o &&
                h.data_selection_isselectable(t) &&
                s &&
                r(!1, i.classed(Y.SELECTED, !1), t, e));
          });
    }),
    (n.prototype.show = function (t, e) {
      var i,
        n = this.internal;
      (t = n.mapToTargetIds(t)),
        (e = e || {}),
        n.removeHiddenTargetIds(t),
        (i = n.svg.selectAll(n.selectorTargets(t)))
          .transition()
          .style("display", "initial", "important")
          .style("opacity", 1, "important")
          .call(n.endall, function () {
            i.style("opacity", null).style("opacity", 1);
          }),
        e.withLegend && n.showLegend(t),
        n.redraw({
          withUpdateOrgXDomain: !0,
          withUpdateXDomain: !0,
          withLegend: !0,
        });
    }),
    (n.prototype.hide = function (t, e) {
      var i,
        n = this.internal;
      (t = n.mapToTargetIds(t)),
        (e = e || {}),
        n.addHiddenTargetIds(t),
        (i = n.svg.selectAll(n.selectorTargets(t)))
          .transition()
          .style("opacity", 0, "important")
          .call(n.endall, function () {
            i.style("opacity", null).style("opacity", 0),
              i.style("display", "none");
          }),
        e.withLegend && n.hideLegend(t),
        n.redraw({
          withUpdateOrgXDomain: !0,
          withUpdateXDomain: !0,
          withLegend: !0,
        });
    }),
    (n.prototype.toggle = function (t, e) {
      var i = this,
        n = this.internal;
      n.mapToTargetIds(t).forEach(function (t) {
        n.isTargetToShow(t) ? i.hide(t, e) : i.show(t, e);
      });
    }),
    ((n.prototype.tooltip = function () {}).show = function (e) {
      var t,
        i,
        n,
        r = this.internal;
      (n = e.mouse
        ? e.mouse
        : (e.data
            ? (i = e.data)
            : void 0 !== e.x &&
              ((t = e.id
                ? r.data.targets.filter(function (t) {
                    return t.id === e.id;
                  })
                : r.data.targets),
              (i = r.filterByX(t, e.x).slice(0, 1)[0])),
          i ? r.getMousePosition(i) : null)),
        r.dispatchEvent("mousemove", n),
        r.config.tooltip_onshow.call(r, i);
    }),
    (n.prototype.tooltip.hide = function () {
      this.internal.dispatchEvent("mouseout", 0),
        this.internal.config.tooltip_onhide.call(this);
    }),
    (n.prototype.transform = function (t, e) {
      var i = this.internal,
        n = 0 <= ["pie", "donut"].indexOf(t) ? { withTransform: !0 } : null;
      i.transformTo(e, t, n);
    }),
    (l.prototype.transformTo = function (t, e, i) {
      var n = this,
        r = !n.hasArcType(),
        a = i || { withTransitionForAxis: r };
      (a.withTransitionForTransform = !1),
        (n.transiting = !1),
        n.setTargetType(t, e),
        n.updateTargets(n.data.targets),
        n.updateAndRedraw(a);
    }),
    (n.prototype.x = function (t) {
      var e = this.internal;
      return (
        arguments.length &&
          (e.updateTargetX(e.data.targets, t),
          e.redraw({ withUpdateOrgXDomain: !0, withUpdateXDomain: !0 })),
        e.data.xs
      );
    }),
    (n.prototype.xs = function (t) {
      var e = this.internal;
      return (
        arguments.length &&
          (e.updateTargetXs(e.data.targets, t),
          e.redraw({ withUpdateOrgXDomain: !0, withUpdateXDomain: !0 })),
        e.data.xs
      );
    }),
    ((n.prototype.zoom = function (t) {
      var e = this.internal;
      return t
        ? (e.isTimeSeries() &&
            (t = t.map(function (t) {
              return e.parseDate(t);
            })),
          e.config.subchart_show
            ? e.brush.selectionAsValue(t, !0)
            : (e.updateXDomain(null, !0, !1, !1, t),
              e.redraw({ withY: e.config.zoom_rescale, withSubchart: !1 })),
          e.config.zoom_onzoom.call(this, e.x.orgDomain()),
          t)
        : e.x.domain();
    }).enable = function (t) {
      var e = this.internal;
      (e.config.zoom_enabled = t), e.updateAndRedraw();
    }),
    (n.prototype.unzoom = function () {
      var t = this.internal;
      t.config.subchart_show
        ? t.brush.clear()
        : (t.updateXDomain(null, !0, !1, !1, t.subX.domain()),
          t.redraw({ withY: t.config.zoom_rescale, withSubchart: !1 }));
    }),
    (n.prototype.zoom.max = function (t) {
      var e = this.internal,
        i = e.config,
        n = e.d3;
      if (0 !== t && !t) return i.zoom_x_max;
      i.zoom_x_max = n.max([e.orgXDomain[1], t]);
    }),
    (n.prototype.zoom.min = function (t) {
      var e = this.internal,
        i = e.config,
        n = e.d3;
      if (0 !== t && !t) return i.zoom_x_min;
      i.zoom_x_min = n.min([e.orgXDomain[0], t]);
    }),
    (n.prototype.zoom.range = function (t) {
      if (!arguments.length)
        return { max: this.domain.max(), min: this.domain.min() };
      k(t.max) && this.domain.max(t.max), k(t.min) && this.domain.min(t.min);
    }),
    (l.prototype.initPie = function () {
      var t = this,
        e = t.d3;
      t.pie = e.pie().value(function (t) {
        return t.values.reduce(function (t, e) {
          return t + e.value;
        }, 0);
      });
      var i = t.getOrderFunction();
      if (i && (t.isOrderAsc() || t.isOrderDesc())) {
        var n = i;
        i = function (t, e) {
          return -1 * n(t, e);
        };
      }
      t.pie.sort(i || null);
    }),
    (l.prototype.updateRadius = function () {
      var t = this,
        e = t.config,
        i = e.gauge_width || e.donut_width,
        n =
          t.filterTargetsToShow(t.data.targets).length *
          t.config.gauge_arcs_minWidth;
      (t.radiusExpanded =
        (Math.min(t.arcWidth, t.arcHeight) / 2) *
        (t.hasType("gauge") ? 0.85 : 1)),
        (t.radius = 0.95 * t.radiusExpanded),
        (t.innerRadiusRatio = i ? (t.radius - i) / t.radius : 0.6),
        (t.innerRadius =
          t.hasType("donut") || t.hasType("gauge")
            ? t.radius * t.innerRadiusRatio
            : 0),
        (t.gaugeArcWidth =
          i ||
          (n <= t.radius - t.innerRadius
            ? t.radius - t.innerRadius
            : n <= t.radius
            ? n
            : t.radius));
    }),
    (l.prototype.updateArc = function () {
      var t = this;
      (t.svgArc = t.getSvgArc()),
        (t.svgArcExpanded = t.getSvgArcExpanded()),
        (t.svgArcExpandedSub = t.getSvgArcExpanded(0.98));
    }),
    (l.prototype.updateAngle = function (e) {
      var t,
        i,
        n,
        r,
        a = this,
        o = a.config,
        s = !1,
        c = 0;
      return o
        ? (a.pie(a.filterTargetsToShow(a.data.targets)).forEach(function (t) {
            s || t.data.id !== e.data.id || ((s = !0), ((e = t).index = c)),
              c++;
          }),
          isNaN(e.startAngle) && (e.startAngle = 0),
          isNaN(e.endAngle) && (e.endAngle = e.startAngle),
          a.isGaugeType(e.data) &&
            ((t = o.gauge_min),
            (i = o.gauge_max),
            (n = (Math.PI * (o.gauge_fullCircle ? 2 : 1)) / (i - t)),
            (r = e.value < t ? 0 : e.value < i ? e.value - t : i - t),
            (e.startAngle = o.gauge_startingAngle),
            (e.endAngle = e.startAngle + n * r)),
          s ? e : null)
        : null;
    }),
    (l.prototype.getSvgArc = function () {
      var n = this,
        e = n.hasType("gauge"),
        i = n.gaugeArcWidth / n.filterTargetsToShow(n.data.targets).length,
        r = n.d3
          .arc()
          .outerRadius(function (t) {
            return e ? n.radius - i * t.index : n.radius;
          })
          .innerRadius(function (t) {
            return e ? n.radius - i * (t.index + 1) : n.innerRadius;
          }),
        t = function (t, e) {
          var i;
          return e ? r(t) : (i = n.updateAngle(t)) ? r(i) : "M 0 0";
        };
      return (t.centroid = r.centroid), t;
    }),
    (l.prototype.getSvgArcExpanded = function (e) {
      e = e || 1;
      var i = this,
        n = i.hasType("gauge"),
        r = i.gaugeArcWidth / i.filterTargetsToShow(i.data.targets).length,
        a = Math.min(i.radiusExpanded * e - i.radius, 0.8 * r - 100 * (1 - e)),
        o = i.d3
          .arc()
          .outerRadius(function (t) {
            return n ? i.radius - r * t.index + a : i.radiusExpanded * e;
          })
          .innerRadius(function (t) {
            return n ? i.radius - r * (t.index + 1) : i.innerRadius;
          });
      return function (t) {
        var e = i.updateAngle(t);
        return e ? o(e) : "M 0 0";
      };
    }),
    (l.prototype.getArc = function (t, e, i) {
      return i || this.isArcType(t.data) ? this.svgArc(t, e) : "M 0 0";
    }),
    (l.prototype.transformForArcLabel = function (t) {
      var e,
        i,
        n,
        r,
        a,
        o = this,
        s = o.config,
        c = o.updateAngle(t),
        d = "",
        l = o.hasType("gauge");
      if (c && !l)
        (e = this.svgArc.centroid(c)),
          (i = isNaN(e[0]) ? 0 : e[0]),
          (n = isNaN(e[1]) ? 0 : e[1]),
          (r = Math.sqrt(i * i + n * n)),
          (d =
            "translate(" +
            i *
              (a =
                o.hasType("donut") && s.donut_label_ratio
                  ? h(s.donut_label_ratio)
                    ? s.donut_label_ratio(t, o.radius, r)
                    : s.donut_label_ratio
                  : o.hasType("pie") && s.pie_label_ratio
                  ? h(s.pie_label_ratio)
                    ? s.pie_label_ratio(t, o.radius, r)
                    : s.pie_label_ratio
                  : o.radius && r
                  ? ((0.375 < 36 / o.radius ? 1.175 - 36 / o.radius : 0.8) *
                      o.radius) /
                    r
                  : 0) +
            "," +
            n * a +
            ")");
      else if (c && l && 1 < o.filterTargetsToShow(o.data.targets).length) {
        var u = Math.sin(c.endAngle - Math.PI / 2);
        d =
          "translate(" +
          (i = Math.cos(c.endAngle - Math.PI / 2) * (o.radiusExpanded + 25)) +
          "," +
          (n = u * (o.radiusExpanded + 15 - Math.abs(10 * u)) + 3) +
          ")";
      }
      return d;
    }),
    (l.prototype.getArcRatio = function (t) {
      var e = this.config,
        i = Math.PI * (this.hasType("gauge") && !e.gauge_fullCircle ? 1 : 2);
      return t ? (t.endAngle - t.startAngle) / i : null;
    }),
    (l.prototype.convertToArcData = function (t) {
      return this.addName({
        id: t.data.id,
        value: t.value,
        ratio: this.getArcRatio(t),
        index: t.index,
      });
    }),
    (l.prototype.textForArcLabel = function (t) {
      var e,
        i,
        n,
        r,
        a,
        o = this;
      return o.shouldShowArcLabel()
        ? ((i = (e = o.updateAngle(t)) ? e.value : null),
          (n = o.getArcRatio(e)),
          (r = t.data.id),
          o.hasType("gauge") || o.meetsArcLabelThreshold(n)
            ? (a = o.getArcLabelFormat())
              ? a(i, n, r)
              : o.defaultArcValueFormat(i, n)
            : "")
        : "";
    }),
    (l.prototype.textForGaugeMinMax = function (t, e) {
      var i = this.getGaugeLabelExtents();
      return i ? i(t, e) : t;
    }),
    (l.prototype.expandArc = function (t) {
      var e,
        i = this;
      i.transiting
        ? (e = window.setInterval(function () {
            i.transiting ||
              (window.clearInterval(e),
              0 < i.legend.selectAll(".c3-legend-item-focused").size() &&
                i.expandArc(t));
          }, 10))
        : ((t = i.mapToTargetIds(t)),
          i.svg
            .selectAll(i.selectorTargets(t, "." + Y.chartArc))
            .each(function (t) {
              i.shouldExpand(t.data.id) &&
                i.d3
                  .select(this)
                  .selectAll("path")
                  .transition()
                  .duration(i.expandDuration(t.data.id))
                  .attr("d", i.svgArcExpanded)
                  .transition()
                  .duration(2 * i.expandDuration(t.data.id))
                  .attr("d", i.svgArcExpandedSub)
                  .each(function (t) {
                    i.isDonutType(t.data);
                  });
            }));
    }),
    (l.prototype.unexpandArc = function (t) {
      var e = this;
      e.transiting ||
        ((t = e.mapToTargetIds(t)),
        e.svg
          .selectAll(e.selectorTargets(t, "." + Y.chartArc))
          .selectAll("path")
          .transition()
          .duration(function (t) {
            return e.expandDuration(t.data.id);
          })
          .attr("d", e.svgArc),
        e.svg.selectAll("." + Y.arc));
    }),
    (l.prototype.expandDuration = function (t) {
      var e = this.config;
      return this.isDonutType(t)
        ? e.donut_expand_duration
        : this.isGaugeType(t)
        ? e.gauge_expand_duration
        : this.isPieType(t)
        ? e.pie_expand_duration
        : 50;
    }),
    (l.prototype.shouldExpand = function (t) {
      var e = this.config;
      return (
        (this.isDonutType(t) && e.donut_expand) ||
        (this.isGaugeType(t) && e.gauge_expand) ||
        (this.isPieType(t) && e.pie_expand)
      );
    }),
    (l.prototype.shouldShowArcLabel = function () {
      var t = this.config,
        e = !0;
      return (
        this.hasType("donut")
          ? (e = t.donut_label_show)
          : this.hasType("pie") && (e = t.pie_label_show),
        e
      );
    }),
    (l.prototype.meetsArcLabelThreshold = function (t) {
      var e = this.config;
      return (
        (this.hasType("donut")
          ? e.donut_label_threshold
          : e.pie_label_threshold) <= t
      );
    }),
    (l.prototype.getArcLabelFormat = function () {
      var t = this.config,
        e = t.pie_label_format;
      return (
        this.hasType("gauge")
          ? (e = t.gauge_label_format)
          : this.hasType("donut") && (e = t.donut_label_format),
        e
      );
    }),
    (l.prototype.getGaugeLabelExtents = function () {
      return this.config.gauge_label_extents;
    }),
    (l.prototype.getArcTitle = function () {
      return this.hasType("donut") ? this.config.donut_title : "";
    }),
    (l.prototype.updateTargetsForArc = function (t) {
      var e,
        i = this,
        n = i.main,
        r = i.classChartArc.bind(i),
        a = i.classArcs.bind(i),
        o = i.classFocus.bind(i);
      (e = n
        .select("." + Y.chartArcs)
        .selectAll("." + Y.chartArc)
        .data(i.pie(t))
        .attr("class", function (t) {
          return r(t) + o(t.data);
        })
        .enter()
        .append("g")
        .attr("class", r))
        .append("g")
        .attr("class", a),
        e
          .append("text")
          .attr("dy", i.hasType("gauge") ? "-.1em" : ".35em")
          .style("opacity", 0)
          .style("text-anchor", "middle")
          .style("pointer-events", "none");
    }),
    (l.prototype.initArc = function () {
      var t = this;
      (t.arcs = t.main
        .select("." + Y.chart)
        .append("g")
        .attr("class", Y.chartArcs)
        .attr("transform", t.getTranslate("arc"))),
        t.arcs
          .append("text")
          .attr("class", Y.chartArcsTitle)
          .style("text-anchor", "middle")
          .text(t.getArcTitle());
    }),
    (l.prototype.redrawArc = function (t, e, i) {
      var n,
        r,
        a,
        o,
        l = this,
        u = l.d3,
        s = l.config,
        c = l.main,
        d = l.hasType("gauge");
      if (
        ((r = (n = c
          .selectAll("." + Y.arcs)
          .selectAll("." + Y.arc)
          .data(l.arcData.bind(l)))
          .enter()
          .append("path")
          .attr("class", l.classArc.bind(l))
          .style("fill", function (t) {
            return l.color(t.data);
          })
          .style("cursor", function (t) {
            return s.interaction_enabled && s.data_selection_isselectable(t)
              ? "pointer"
              : null;
          })
          .each(function (t) {
            l.isGaugeType(t.data) &&
              (t.startAngle = t.endAngle = s.gauge_startingAngle),
              (this._current = t);
          })
          .merge(n)),
        d &&
          ((o = (a = c
            .selectAll("." + Y.arcs)
            .selectAll("." + Y.arcLabelLine)
            .data(l.arcData.bind(l)))
            .enter()
            .append("rect")
            .attr("class", function (t) {
              return (
                Y.arcLabelLine +
                " " +
                Y.target +
                " " +
                Y.target +
                "-" +
                t.data.id
              );
            })
            .merge(a)),
          1 === l.filterTargetsToShow(l.data.targets).length
            ? o.style("display", "none")
            : o
                .style("fill", function (t) {
                  return l.levelColor
                    ? l.levelColor(t.data.values[0].value)
                    : l.color(t.data);
                })
                .style("display", s.gauge_labelLine_show ? "" : "none")
                .each(function (t) {
                  var e = 0,
                    i = 0,
                    n = 0,
                    r = "";
                  if (l.hiddenTargetIds.indexOf(t.data.id) < 0) {
                    var a = l.updateAngle(t),
                      o =
                        (l.gaugeArcWidth /
                          l.filterTargetsToShow(l.data.targets).length) *
                        (a.index + 1),
                      s = a.endAngle - Math.PI / 2,
                      c = l.radius - o,
                      d = s - (0 === c ? 0 : 1 / c);
                    (e = l.radiusExpanded - l.radius + o),
                      (i = Math.cos(d) * c),
                      (n = Math.sin(d) * c),
                      (r =
                        "rotate(" +
                        (180 * s) / Math.PI +
                        ", " +
                        i +
                        ", " +
                        n +
                        ")");
                  }
                  u.select(this)
                    .attr("x", i)
                    .attr("y", n)
                    .attr("width", e)
                    .attr("height", 2)
                    .attr("transform", r)
                    .style("stroke-dasharray", "0, " + (e + 2) + ", 0");
                })),
        r
          .attr("transform", function (t) {
            return !l.isGaugeType(t.data) && i ? "scale(0)" : "";
          })
          .on(
            "mouseover",
            s.interaction_enabled
              ? function (t) {
                  var e, i;
                  l.transiting ||
                    ((e = l.updateAngle(t)) &&
                      ((i = l.convertToArcData(e)),
                      l.expandArc(e.data.id),
                      l.api.focus(e.data.id),
                      l.toggleFocusLegend(e.data.id, !0),
                      l.config.data_onmouseover(i, this)));
                }
              : null
          )
          .on(
            "mousemove",
            s.interaction_enabled
              ? function (t) {
                  var e,
                    i = l.updateAngle(t);
                  i && ((e = [l.convertToArcData(i)]), l.showTooltip(e, this));
                }
              : null
          )
          .on(
            "mouseout",
            s.interaction_enabled
              ? function (t) {
                  var e, i;
                  l.transiting ||
                    ((e = l.updateAngle(t)) &&
                      ((i = l.convertToArcData(e)),
                      l.unexpandArc(e.data.id),
                      l.api.revert(),
                      l.revertLegend(),
                      l.hideTooltip(),
                      l.config.data_onmouseout(i, this)));
                }
              : null
          )
          .on(
            "click",
            s.interaction_enabled
              ? function (t, e) {
                  var i,
                    n = l.updateAngle(t);
                  n &&
                    ((i = l.convertToArcData(n)),
                    l.toggleShape && l.toggleShape(this, i, e),
                    l.config.data_onclick.call(l.api, i, this));
                }
              : null
          )
          .each(function () {
            l.transiting = !0;
          })
          .transition()
          .duration(t)
          .attrTween("d", function (i) {
            var n,
              t = l.updateAngle(i);
            return t
              ? (isNaN(this._current.startAngle) &&
                  (this._current.startAngle = 0),
                isNaN(this._current.endAngle) &&
                  (this._current.endAngle = this._current.startAngle),
                (n = u.interpolate(this._current, t)),
                (this._current = n(0)),
                function (t) {
                  var e = n(t);
                  return (e.data = i.data), l.getArc(e, !0);
                })
              : function () {
                  return "M 0 0";
                };
          })
          .attr("transform", i ? "scale(1)" : "")
          .style("fill", function (t) {
            return l.levelColor
              ? l.levelColor(t.data.values[0].value)
              : l.color(t.data.id);
          })
          .call(l.endall, function () {
            l.transiting = !1;
          }),
        n.exit().transition().duration(e).style("opacity", 0).remove(),
        c
          .selectAll("." + Y.chartArc)
          .select("text")
          .style("opacity", 0)
          .attr("class", function (t) {
            return l.isGaugeType(t.data) ? Y.gaugeValue : "";
          })
          .text(l.textForArcLabel.bind(l))
          .attr("transform", l.transformForArcLabel.bind(l))
          .style("font-size", function (t) {
            return l.isGaugeType(t.data) &&
              1 === l.filterTargetsToShow(l.data.targets).length
              ? Math.round(l.radius / 5) + "px"
              : "";
          })
          .transition()
          .duration(t)
          .style("opacity", function (t) {
            return l.isTargetToShow(t.data.id) && l.isArcType(t.data) ? 1 : 0;
          }),
        c
          .select("." + Y.chartArcsTitle)
          .style("opacity", l.hasType("donut") || d ? 1 : 0),
        d)
      ) {
        var h = 0,
          g = l.arcs
            .select("g." + Y.chartArcsBackground)
            .selectAll("path." + Y.chartArcsBackground)
            .data(l.data.targets);
        g
          .enter()
          .append("path")
          .attr("class", function (t, e) {
            return (
              Y.chartArcsBackground + " " + Y.chartArcsBackground + "-" + e
            );
          })
          .merge(g)
          .attr("d", function (t) {
            if (0 <= l.hiddenTargetIds.indexOf(t.id)) return "M 0 0";
            var e = {
              data: [{ value: s.gauge_max }],
              startAngle: s.gauge_startingAngle,
              endAngle:
                -1 * s.gauge_startingAngle * (s.gauge_fullCircle ? Math.PI : 1),
              index: h++,
            };
            return l.getArc(e, !0, !0);
          }),
          g.exit().remove(),
          l.arcs
            .select("." + Y.chartArcsGaugeUnit)
            .attr("dy", ".75em")
            .text(s.gauge_label_show ? s.gauge_units : ""),
          l.arcs
            .select("." + Y.chartArcsGaugeMin)
            .attr(
              "dx",
              -1 *
                (l.innerRadius +
                  (l.radius - l.innerRadius) / (s.gauge_fullCircle ? 1 : 2)) +
                "px"
            )
            .attr("dy", "1.2em")
            .text(
              s.gauge_label_show ? l.textForGaugeMinMax(s.gauge_min, !1) : ""
            ),
          l.arcs
            .select("." + Y.chartArcsGaugeMax)
            .attr(
              "dx",
              l.innerRadius +
                (l.radius - l.innerRadius) / (s.gauge_fullCircle ? 1 : 2) +
                "px"
            )
            .attr("dy", "1.2em")
            .text(
              s.gauge_label_show ? l.textForGaugeMinMax(s.gauge_max, !0) : ""
            );
      }
    }),
    (l.prototype.initGauge = function () {
      var t = this.arcs;
      this.hasType("gauge") &&
        (t.append("g").attr("class", Y.chartArcsBackground),
        t
          .append("text")
          .attr("class", Y.chartArcsGaugeUnit)
          .style("text-anchor", "middle")
          .style("pointer-events", "none"),
        t
          .append("text")
          .attr("class", Y.chartArcsGaugeMin)
          .style("text-anchor", "middle")
          .style("pointer-events", "none"),
        t
          .append("text")
          .attr("class", Y.chartArcsGaugeMax)
          .style("text-anchor", "middle")
          .style("pointer-events", "none"));
    }),
    (l.prototype.getGaugeLabelHeight = function () {
      return this.config.gauge_label_show ? 20 : 0;
    }),
    (l.prototype.hasCaches = function (t) {
      for (var e = 0; e < t.length; e++) if (!(t[e] in this.cache)) return !1;
      return !0;
    }),
    (l.prototype.addCache = function (t, e) {
      this.cache[t] = this.cloneTarget(e);
    }),
    (l.prototype.getCaches = function (t) {
      var e,
        i = [];
      for (e = 0; e < t.length; e++)
        t[e] in this.cache && i.push(this.cloneTarget(this.cache[t[e]]));
      return i;
    }),
    (l.prototype.categoryName = function (t) {
      var e = this.config;
      return t < e.axis_x_categories.length ? e.axis_x_categories[t] : t;
    }),
    (l.prototype.generateTargetClass = function (t) {
      return t || 0 === t ? ("-" + t).replace(/\s/g, "-") : "";
    }),
    (l.prototype.generateClass = function (t, e) {
      return " " + t + " " + t + this.generateTargetClass(e);
    }),
    (l.prototype.classText = function (t) {
      return this.generateClass(Y.text, t.index);
    }),
    (l.prototype.classTexts = function (t) {
      return this.generateClass(Y.texts, t.id);
    }),
    (l.prototype.classShape = function (t) {
      return this.generateClass(Y.shape, t.index);
    }),
    (l.prototype.classShapes = function (t) {
      return this.generateClass(Y.shapes, t.id);
    }),
    (l.prototype.classLine = function (t) {
      return this.classShape(t) + this.generateClass(Y.line, t.id);
    }),
    (l.prototype.classLines = function (t) {
      return this.classShapes(t) + this.generateClass(Y.lines, t.id);
    }),
    (l.prototype.classCircle = function (t) {
      return this.classShape(t) + this.generateClass(Y.circle, t.index);
    }),
    (l.prototype.classCircles = function (t) {
      return this.classShapes(t) + this.generateClass(Y.circles, t.id);
    }),
    (l.prototype.classBar = function (t) {
      return this.classShape(t) + this.generateClass(Y.bar, t.index);
    }),
    (l.prototype.classBars = function (t) {
      return this.classShapes(t) + this.generateClass(Y.bars, t.id);
    }),
    (l.prototype.classArc = function (t) {
      return this.classShape(t.data) + this.generateClass(Y.arc, t.data.id);
    }),
    (l.prototype.classArcs = function (t) {
      return this.classShapes(t.data) + this.generateClass(Y.arcs, t.data.id);
    }),
    (l.prototype.classArea = function (t) {
      return this.classShape(t) + this.generateClass(Y.area, t.id);
    }),
    (l.prototype.classAreas = function (t) {
      return this.classShapes(t) + this.generateClass(Y.areas, t.id);
    }),
    (l.prototype.classRegion = function (t, e) {
      return (
        this.generateClass(Y.region, e) + " " + ("class" in t ? t.class : "")
      );
    }),
    (l.prototype.classEvent = function (t) {
      return this.generateClass(Y.eventRect, t.index);
    }),
    (l.prototype.classTarget = function (t) {
      var e = this.config.data_classes[t],
        i = "";
      return (
        e && (i = " " + Y.target + "-" + e), this.generateClass(Y.target, t) + i
      );
    }),
    (l.prototype.classFocus = function (t) {
      return this.classFocused(t) + this.classDefocused(t);
    }),
    (l.prototype.classFocused = function (t) {
      return " " + (0 <= this.focusedTargetIds.indexOf(t.id) ? Y.focused : "");
    }),
    (l.prototype.classDefocused = function (t) {
      return (
        " " + (0 <= this.defocusedTargetIds.indexOf(t.id) ? Y.defocused : "")
      );
    }),
    (l.prototype.classChartText = function (t) {
      return Y.chartText + this.classTarget(t.id);
    }),
    (l.prototype.classChartLine = function (t) {
      return Y.chartLine + this.classTarget(t.id);
    }),
    (l.prototype.classChartBar = function (t) {
      return Y.chartBar + this.classTarget(t.id);
    }),
    (l.prototype.classChartArc = function (t) {
      return Y.chartArc + this.classTarget(t.data.id);
    }),
    (l.prototype.getTargetSelectorSuffix = function (t) {
      return this.generateTargetClass(t).replace(
        /([?!@#$%^&*()_=+,.<>'":;\[\]\/|~`{}\\])/g,
        "\\$1"
      );
    }),
    (l.prototype.selectorTarget = function (t, e) {
      return (e || "") + "." + Y.target + this.getTargetSelectorSuffix(t);
    }),
    (l.prototype.selectorTargets = function (t, e) {
      var i = this;
      return (t = t || []).length
        ? t.map(function (t) {
            return i.selectorTarget(t, e);
          })
        : null;
    }),
    (l.prototype.selectorLegend = function (t) {
      return "." + Y.legendItem + this.getTargetSelectorSuffix(t);
    }),
    (l.prototype.selectorLegends = function (t) {
      var e = this;
      return t && t.length
        ? t.map(function (t) {
            return e.selectorLegend(t);
          })
        : null;
    }),
    (l.prototype.getClipPath = function (t) {
      return (
        "url(" +
        (0 <= window.navigator.appVersion.toLowerCase().indexOf("msie 9.")
          ? ""
          : document.URL.split("#")[0]) +
        "#" +
        t +
        ")"
      );
    }),
    (l.prototype.appendClip = function (t, e) {
      return t.append("clipPath").attr("id", e).append("rect");
    }),
    (l.prototype.getAxisClipX = function (t) {
      var e = Math.max(30, this.margin.left);
      return t ? -(1 + e) : -(e - 1);
    }),
    (l.prototype.getAxisClipY = function (t) {
      return t ? -20 : -this.margin.top;
    }),
    (l.prototype.getXAxisClipX = function () {
      return this.getAxisClipX(!this.config.axis_rotated);
    }),
    (l.prototype.getXAxisClipY = function () {
      return this.getAxisClipY(!this.config.axis_rotated);
    }),
    (l.prototype.getYAxisClipX = function () {
      return this.config.axis_y_inner
        ? -1
        : this.getAxisClipX(this.config.axis_rotated);
    }),
    (l.prototype.getYAxisClipY = function () {
      return this.getAxisClipY(this.config.axis_rotated);
    }),
    (l.prototype.getAxisClipWidth = function (t) {
      var e = Math.max(30, this.margin.left),
        i = Math.max(30, this.margin.right);
      return t ? this.width + 2 + e + i : this.margin.left + 20;
    }),
    (l.prototype.getAxisClipHeight = function (t) {
      return (t ? this.margin.bottom : this.margin.top + this.height) + 20;
    }),
    (l.prototype.getXAxisClipWidth = function () {
      return this.getAxisClipWidth(!this.config.axis_rotated);
    }),
    (l.prototype.getXAxisClipHeight = function () {
      return this.getAxisClipHeight(!this.config.axis_rotated);
    }),
    (l.prototype.getYAxisClipWidth = function () {
      return (
        this.getAxisClipWidth(this.config.axis_rotated) +
        (this.config.axis_y_inner ? 20 : 0)
      );
    }),
    (l.prototype.getYAxisClipHeight = function () {
      return this.getAxisClipHeight(this.config.axis_rotated);
    }),
    (l.prototype.generateColor = function () {
      var t = this.config,
        e = this.d3,
        n = t.data_colors,
        r = C(t.color_pattern) ? t.color_pattern : e.schemeCategory10,
        a = t.data_color,
        o = [];
      return function (t) {
        var e,
          i = t.id || (t.data && t.data.id) || t;
        return (
          n[i] instanceof Function
            ? (e = n[i](t))
            : n[i]
            ? (e = n[i])
            : (o.indexOf(i) < 0 && o.push(i),
              (e = r[o.indexOf(i) % r.length]),
              (n[i] = e)),
          a instanceof Function ? a(e, t) : e
        );
      };
    }),
    (l.prototype.generateLevelColor = function () {
      var t = this.config,
        n = t.color_pattern,
        e = t.color_threshold,
        r = "value" === e.unit,
        a = e.values && e.values.length ? e.values : [],
        o = e.max || 100;
      return C(e) && C(n)
        ? function (t) {
            var e,
              i = n[n.length - 1];
            for (e = 0; e < a.length; e++)
              if ((r ? t : (100 * t) / o) < a[e]) {
                i = n[e];
                break;
              }
            return i;
          }
        : null;
    }),
    (l.prototype.getDefaultConfig = function () {
      var e = {
        bindto: "#chart",
        svg_classname: void 0,
        size_width: void 0,
        size_height: void 0,
        padding_left: void 0,
        padding_right: void 0,
        padding_top: void 0,
        padding_bottom: void 0,
        resize_auto: !0,
        zoom_enabled: !1,
        zoom_initialRange: void 0,
        zoom_type: "scroll",
        zoom_disableDefaultBehavior: !1,
        zoom_privileged: !1,
        zoom_rescale: !1,
        zoom_onzoom: function () {},
        zoom_onzoomstart: function () {},
        zoom_onzoomend: function () {},
        zoom_x_min: void 0,
        zoom_x_max: void 0,
        interaction_brighten: !0,
        interaction_enabled: !0,
        onmouseover: function () {},
        onmouseout: function () {},
        onresize: function () {},
        onresized: function () {},
        oninit: function () {},
        onrendered: function () {},
        transition_duration: 350,
        data_x: void 0,
        data_xs: {},
        data_xFormat: "%Y-%m-%d",
        data_xLocaltime: !0,
        data_xSort: !0,
        data_idConverter: function (t) {
          return t;
        },
        data_names: {},
        data_classes: {},
        data_groups: [],
        data_axes: {},
        data_type: void 0,
        data_types: {},
        data_labels: {},
        data_order: "desc",
        data_regions: {},
        data_color: void 0,
        data_colors: {},
        data_hide: !1,
        data_filter: void 0,
        data_selection_enabled: !1,
        data_selection_grouped: !1,
        data_selection_isselectable: function () {
          return !0;
        },
        data_selection_multiple: !0,
        data_selection_draggable: !1,
        data_onclick: function () {},
        data_onmouseover: function () {},
        data_onmouseout: function () {},
        data_onselected: function () {},
        data_onunselected: function () {},
        data_url: void 0,
        data_headers: void 0,
        data_json: void 0,
        data_rows: void 0,
        data_columns: void 0,
        data_mimeType: void 0,
        data_keys: void 0,
        data_empty_label_text: "",
        subchart_show: !1,
        subchart_size_height: 60,
        subchart_axis_x_show: !0,
        subchart_onbrush: function () {},
        color_pattern: [],
        color_threshold: {},
        legend_show: !0,
        legend_hide: !1,
        legend_position: "bottom",
        legend_inset_anchor: "top-left",
        legend_inset_x: 10,
        legend_inset_y: 0,
        legend_inset_step: void 0,
        legend_item_onclick: void 0,
        legend_item_onmouseover: void 0,
        legend_item_onmouseout: void 0,
        legend_equally: !1,
        legend_padding: 0,
        legend_item_tile_width: 10,
        legend_item_tile_height: 10,
        axis_rotated: !1,
        axis_x_show: !0,
        axis_x_type: "indexed",
        axis_x_localtime: !0,
        axis_x_categories: [],
        axis_x_tick_centered: !1,
        axis_x_tick_format: void 0,
        axis_x_tick_culling: {},
        axis_x_tick_culling_max: 10,
        axis_x_tick_count: void 0,
        axis_x_tick_fit: !0,
        axis_x_tick_values: null,
        axis_x_tick_rotate: 0,
        axis_x_tick_outer: !0,
        axis_x_tick_multiline: !0,
        axis_x_tick_multilineMax: 0,
        axis_x_tick_width: null,
        axis_x_max: void 0,
        axis_x_min: void 0,
        axis_x_padding: {},
        axis_x_height: void 0,
        axis_x_selection: void 0,
        axis_x_label: {},
        axis_x_inner: void 0,
        axis_y_show: !0,
        axis_y_type: void 0,
        axis_y_max: void 0,
        axis_y_min: void 0,
        axis_y_inverted: !1,
        axis_y_center: void 0,
        axis_y_inner: void 0,
        axis_y_label: {},
        axis_y_tick_format: void 0,
        axis_y_tick_outer: !0,
        axis_y_tick_values: null,
        axis_y_tick_rotate: 0,
        axis_y_tick_count: void 0,
        axis_y_tick_time_type: void 0,
        axis_y_tick_time_interval: void 0,
        axis_y_padding: {},
        axis_y_default: void 0,
        axis_y2_show: !1,
        axis_y2_max: void 0,
        axis_y2_min: void 0,
        axis_y2_inverted: !1,
        axis_y2_center: void 0,
        axis_y2_inner: void 0,
        axis_y2_label: {},
        axis_y2_tick_format: void 0,
        axis_y2_tick_outer: !0,
        axis_y2_tick_values: null,
        axis_y2_tick_count: void 0,
        axis_y2_padding: {},
        axis_y2_default: void 0,
        grid_x_show: !1,
        grid_x_type: "tick",
        grid_x_lines: [],
        grid_y_show: !1,
        grid_y_lines: [],
        grid_y_ticks: 10,
        grid_focus_show: !0,
        grid_lines_front: !0,
        point_show: !0,
        point_r: 2.5,
        point_sensitivity: 10,
        point_focus_expand_enabled: !0,
        point_focus_expand_r: void 0,
        point_select_r: void 0,
        line_connectNull: !1,
        line_step_type: "step",
        bar_width: void 0,
        bar_width_ratio: 0.6,
        bar_width_max: void 0,
        bar_zerobased: !0,
        bar_space: 0,
        area_zerobased: !0,
        area_above: !1,
        pie_label_show: !0,
        pie_label_format: void 0,
        pie_label_threshold: 0.05,
        pie_label_ratio: void 0,
        pie_expand: {},
        pie_expand_duration: 50,
        gauge_fullCircle: !1,
        gauge_label_show: !0,
        gauge_labelLine_show: !0,
        gauge_label_format: void 0,
        gauge_min: 0,
        gauge_max: 100,
        gauge_startingAngle: (-1 * Math.PI) / 2,
        gauge_label_extents: void 0,
        gauge_units: void 0,
        gauge_width: void 0,
        gauge_arcs_minWidth: 5,
        gauge_expand: {},
        gauge_expand_duration: 50,
        donut_label_show: !0,
        donut_label_format: void 0,
        donut_label_threshold: 0.05,
        donut_label_ratio: void 0,
        donut_width: void 0,
        donut_title: "",
        donut_expand: {},
        donut_expand_duration: 50,
        spline_interpolation_type: "cardinal",
        regions: [],
        tooltip_show: !0,
        tooltip_grouped: !0,
        tooltip_order: void 0,
        tooltip_format_title: void 0,
        tooltip_format_name: void 0,
        tooltip_format_value: void 0,
        tooltip_position: void 0,
        tooltip_contents: function (t, e, i, n) {
          return this.getTooltipContent
            ? this.getTooltipContent(t, e, i, n)
            : "";
        },
        tooltip_init_show: !1,
        tooltip_init_x: 0,
        tooltip_init_position: { top: "0px", left: "50px" },
        tooltip_onshow: function () {},
        tooltip_onhide: function () {},
        title_text: void 0,
        title_padding: { top: 0, right: 0, bottom: 0, left: 0 },
        title_position: "top-center",
      };
      return (
        Object.keys(this.additionalConfig).forEach(function (t) {
          e[t] = this.additionalConfig[t];
        }, this),
        e
      );
    }),
    (l.prototype.additionalConfig = {}),
    (l.prototype.loadConfig = function (e) {
      var i,
        n,
        r,
        a = this.config;
      Object.keys(a).forEach(function (t) {
        (i = e),
          (n = t.split("_")),
          (r = (function t() {
            var e = n.shift();
            return e && i && "object" === s(i) && e in i
              ? ((i = i[e]), t())
              : e
              ? void 0
              : i;
          })()),
          k(r) && (a[t] = r);
      });
    }),
    (l.prototype.convertUrlToData = function (t, e, i, n, r) {
      var a,
        o,
        s = this,
        c = e || "csv";
      (o =
        "json" === c
          ? ((a = s.d3.json), s.convertJsonToData)
          : ((a = "tsv" === c ? s.d3.tsv : s.d3.csv), s.convertXsvToData)),
        a(t, i)
          .then(function (t) {
            r.call(s, o.call(s, t, n));
          })
          .catch(function (t) {
            throw t;
          });
    }),
    (l.prototype.convertXsvToData = function (t) {
      var e = t.columns;
      return 0 === t.length
        ? {
            keys: e,
            rows: [
              e.reduce(function (t, e) {
                return Object.assign(
                  t,
                  (null,
                  (n = e) in (i = {})
                    ? Object.defineProperty(i, n, {
                        value: null,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                      })
                    : (i[n] = null),
                  i)
                );
                var i, n;
              }, {}),
            ],
          }
        : { keys: e, rows: [].concat(t) };
    }),
    (l.prototype.convertJsonToData = function (e, t) {
      var r,
        a = this,
        o = [];
      return t
        ? (t.x
            ? ((r = t.value.concat(t.x)), (a.config.data_x = t.x))
            : (r = t.value),
          o.push(r),
          e.forEach(function (i) {
            var n = [];
            r.forEach(function (t) {
              var e = a.findValueInJson(i, t);
              v(e) && (e = null), n.push(e);
            }),
              o.push(n);
          }),
          a.convertRowsToData(o))
        : (Object.keys(e).forEach(function (t) {
            o.push([t].concat(e[t]));
          }),
          a.convertColumnsToData(o));
    }),
    (l.prototype.findValueInJson = function (t, e) {
      for (
        var i = (e = (e = e.replace(/\[(\w+)\]/g, ".$1")).replace(
            /^\./,
            ""
          )).split("."),
          n = 0;
        n < i.length;
        ++n
      ) {
        var r = i[n];
        if (!(r in t)) return;
        t = t[r];
      }
      return t;
    }),
    (l.prototype.convertRowsToData = function (t) {
      for (var e = [], i = t[0], n = 1; n < t.length; n++) {
        for (var r = {}, a = 0; a < t[n].length; a++) {
          if (v(t[n][a]))
            throw new Error(
              "Source data is missing a component at (" + n + "," + a + ")!"
            );
          r[i[a]] = t[n][a];
        }
        e.push(r);
      }
      return { keys: i, rows: e };
    }),
    (l.prototype.convertColumnsToData = function (t) {
      for (var e = [], i = [], n = 0; n < t.length; n++) {
        for (var r = t[n][0], a = 1; a < t[n].length; a++) {
          if ((v(e[a - 1]) && (e[a - 1] = {}), v(t[n][a])))
            throw new Error(
              "Source data is missing a component at (" + n + "," + a + ")!"
            );
          e[a - 1][r] = t[n][a];
        }
        i.push(r);
      }
      return { keys: i, rows: e };
    }),
    (l.prototype.convertDataToTargets = function (t, n) {
      var e,
        i,
        r,
        a,
        c = this,
        d = c.config;
      return (
        o(t) ? (a = Object.keys(t[0])) : ((a = t.keys), (t = t.rows)),
        (i = a.filter(c.isNotX, c)),
        (r = a.filter(c.isX, c)),
        i.forEach(function (i) {
          var e = c.getXKey(i);
          c.isCustomX() || c.isTimeSeries()
            ? 0 <= r.indexOf(e)
              ? (c.data.xs[i] = (n && c.data.xs[i] ? c.data.xs[i] : []).concat(
                  t
                    .map(function (t) {
                      return t[e];
                    })
                    .filter(P)
                    .map(function (t, e) {
                      return c.generateTargetX(t, i, e);
                    })
                ))
              : d.data_x
              ? (c.data.xs[i] = c.getOtherTargetXs())
              : C(d.data_xs) &&
                (c.data.xs[i] = c.getXValuesOfXKey(e, c.data.targets))
            : (c.data.xs[i] = t.map(function (t, e) {
                return e;
              }));
        }),
        i.forEach(function (t) {
          if (!c.data.xs[t])
            throw new Error('x is not defined for id = "' + t + '".');
        }),
        (e = i.map(function (a, o) {
          var s = d.data_idConverter(a);
          return {
            id: s,
            id_org: a,
            values: t
              .map(function (t, e) {
                var i,
                  n = t[c.getXKey(a)],
                  r = null === t[a] || isNaN(t[a]) ? null : +t[a];
                return (
                  c.isCustomX() && c.isCategorized() && !v(n)
                    ? (0 === o && 0 === e && (d.axis_x_categories = []),
                      -1 === (i = d.axis_x_categories.indexOf(n)) &&
                        ((i = d.axis_x_categories.length),
                        d.axis_x_categories.push(n)))
                    : (i = c.generateTargetX(n, a, e)),
                  (v(t[a]) || c.data.xs[a].length <= e) && (i = void 0),
                  { x: i, value: r, id: s }
                );
              })
              .filter(function (t) {
                return k(t.x);
              }),
          };
        })).forEach(function (t) {
          var e;
          d.data_xSort &&
            (t.values = t.values.sort(function (t, e) {
              return (
                (t.x || 0 === t.x ? t.x : 1 / 0) -
                (e.x || 0 === e.x ? e.x : 1 / 0)
              );
            })),
            (e = 0),
            t.values.forEach(function (t) {
              t.index = e++;
            }),
            c.data.xs[t.id].sort(function (t, e) {
              return t - e;
            });
        }),
        (c.hasNegativeValue = c.hasNegativeValueInTargets(e)),
        (c.hasPositiveValue = c.hasPositiveValueInTargets(e)),
        d.data_type &&
          c.setTargetType(
            c.mapToIds(e).filter(function (t) {
              return !(t in d.data_types);
            }),
            d.data_type
          ),
        e.forEach(function (t) {
          c.addCache(t.id_org, t);
        }),
        e
      );
    }),
    (l.prototype.isX = function (t) {
      var e,
        i,
        n,
        r = this.config;
      return (
        (r.data_x && t === r.data_x) ||
        (C(r.data_xs) &&
          ((e = r.data_xs),
          (i = t),
          (n = !1),
          Object.keys(e).forEach(function (t) {
            e[t] === i && (n = !0);
          }),
          n))
      );
    }),
    (l.prototype.isNotX = function (t) {
      return !this.isX(t);
    }),
    (l.prototype.getXKey = function (t) {
      var e = this.config;
      return e.data_x ? e.data_x : C(e.data_xs) ? e.data_xs[t] : null;
    }),
    (l.prototype.getXValuesOfXKey = function (e, t) {
      var i,
        n = this;
      return (
        (t && C(t) ? n.mapToIds(t) : []).forEach(function (t) {
          n.getXKey(t) === e && (i = n.data.xs[t]);
        }),
        i
      );
    }),
    (l.prototype.getXValue = function (t, e) {
      return t in this.data.xs && this.data.xs[t] && P(this.data.xs[t][e])
        ? this.data.xs[t][e]
        : e;
    }),
    (l.prototype.getOtherTargetXs = function () {
      var t = Object.keys(this.data.xs);
      return t.length ? this.data.xs[t[0]] : null;
    }),
    (l.prototype.getOtherTargetX = function (t) {
      var e = this.getOtherTargetXs();
      return e && t < e.length ? e[t] : null;
    }),
    (l.prototype.addXs = function (e) {
      var i = this;
      Object.keys(e).forEach(function (t) {
        i.config.data_xs[t] = e[t];
      });
    }),
    (l.prototype.addName = function (t) {
      var e;
      return (
        t &&
          ((e = this.config.data_names[t.id]),
          (t.name = void 0 !== e ? e : t.id)),
        t
      );
    }),
    (l.prototype.getValueOnIndex = function (t, e) {
      var i = t.filter(function (t) {
        return t.index === e;
      });
      return i.length ? i[0] : null;
    }),
    (l.prototype.updateTargetX = function (t, n) {
      var r = this;
      t.forEach(function (i) {
        i.values.forEach(function (t, e) {
          t.x = r.generateTargetX(n[e], i.id, e);
        }),
          (r.data.xs[i.id] = n);
      });
    }),
    (l.prototype.updateTargetXs = function (t, e) {
      var i = this;
      t.forEach(function (t) {
        e[t.id] && i.updateTargetX([t], e[t.id]);
      });
    }),
    (l.prototype.generateTargetX = function (t, e, i) {
      var n = this;
      return n.isTimeSeries()
        ? t
          ? n.parseDate(t)
          : n.parseDate(n.getXValue(e, i))
        : n.isCustomX() && !n.isCategorized()
        ? P(t)
          ? +t
          : n.getXValue(e, i)
        : i;
    }),
    (l.prototype.cloneTarget = function (t) {
      return {
        id: t.id,
        id_org: t.id_org,
        values: t.values.map(function (t) {
          return { x: t.x, value: t.value, id: t.id };
        }),
      };
    }),
    (l.prototype.getMaxDataCount = function () {
      return this.d3.max(this.data.targets, function (t) {
        return t.values.length;
      });
    }),
    (l.prototype.mapToIds = function (t) {
      return t.map(function (t) {
        return t.id;
      });
    }),
    (l.prototype.mapToTargetIds = function (t) {
      return t ? [].concat(t) : this.mapToIds(this.data.targets);
    }),
    (l.prototype.hasTarget = function (t, e) {
      var i,
        n = this.mapToIds(t);
      for (i = 0; i < n.length; i++) if (n[i] === e) return !0;
      return !1;
    }),
    (l.prototype.isTargetToShow = function (t) {
      return this.hiddenTargetIds.indexOf(t) < 0;
    }),
    (l.prototype.isLegendToShow = function (t) {
      return this.hiddenLegendIds.indexOf(t) < 0;
    }),
    (l.prototype.filterTargetsToShow = function (t) {
      var e = this;
      return t.filter(function (t) {
        return e.isTargetToShow(t.id);
      });
    }),
    (l.prototype.mapTargetsToUniqueXs = function (t) {
      var e = this.d3
        .set(
          this.d3.merge(
            t.map(function (t) {
              return t.values.map(function (t) {
                return +t.x;
              });
            })
          )
        )
        .values();
      return (e = this.isTimeSeries()
        ? e.map(function (t) {
            return new Date(+t);
          })
        : e.map(function (t) {
            return +t;
          })).sort(function (t, e) {
        return t < e ? -1 : e < t ? 1 : e <= t ? 0 : NaN;
      });
    }),
    (l.prototype.addHiddenTargetIds = function (t) {
      t = t instanceof Array ? t : new Array(t);
      for (var e = 0; e < t.length; e++)
        this.hiddenTargetIds.indexOf(t[e]) < 0 &&
          (this.hiddenTargetIds = this.hiddenTargetIds.concat(t[e]));
    }),
    (l.prototype.removeHiddenTargetIds = function (e) {
      this.hiddenTargetIds = this.hiddenTargetIds.filter(function (t) {
        return e.indexOf(t) < 0;
      });
    }),
    (l.prototype.addHiddenLegendIds = function (t) {
      t = t instanceof Array ? t : new Array(t);
      for (var e = 0; e < t.length; e++)
        this.hiddenLegendIds.indexOf(t[e]) < 0 &&
          (this.hiddenLegendIds = this.hiddenLegendIds.concat(t[e]));
    }),
    (l.prototype.removeHiddenLegendIds = function (e) {
      this.hiddenLegendIds = this.hiddenLegendIds.filter(function (t) {
        return e.indexOf(t) < 0;
      });
    }),
    (l.prototype.getValuesAsIdKeyed = function (t) {
      var i = {};
      return (
        t.forEach(function (e) {
          (i[e.id] = []),
            e.values.forEach(function (t) {
              i[e.id].push(t.value);
            });
        }),
        i
      );
    }),
    (l.prototype.checkValueInTargets = function (t, e) {
      var i,
        n,
        r,
        a = Object.keys(t);
      for (i = 0; i < a.length; i++)
        for (r = t[a[i]].values, n = 0; n < r.length; n++)
          if (e(r[n].value)) return !0;
      return !1;
    }),
    (l.prototype.hasNegativeValueInTargets = function (t) {
      return this.checkValueInTargets(t, function (t) {
        return t < 0;
      });
    }),
    (l.prototype.hasPositiveValueInTargets = function (t) {
      return this.checkValueInTargets(t, function (t) {
        return 0 < t;
      });
    }),
    (l.prototype.isOrderDesc = function () {
      var t = this.config;
      return (
        "string" == typeof t.data_order && "desc" === t.data_order.toLowerCase()
      );
    }),
    (l.prototype.isOrderAsc = function () {
      var t = this.config;
      return (
        "string" == typeof t.data_order && "asc" === t.data_order.toLowerCase()
      );
    }),
    (l.prototype.getOrderFunction = function () {
      var t = this.config,
        r = this.isOrderAsc(),
        e = this.isOrderDesc();
      if (r || e) {
        var a = function (t, e) {
          return t + Math.abs(e.value);
        };
        return function (t, e) {
          var i = t.values.reduce(a, 0),
            n = e.values.reduce(a, 0);
          return r ? n - i : i - n;
        };
      }
      if (h(t.data_order)) return t.data_order;
      if (o(t.data_order)) {
        var i = t.data_order;
        return function (t, e) {
          return i.indexOf(t.id) - i.indexOf(e.id);
        };
      }
    }),
    (l.prototype.orderTargets = function (t) {
      var e = this.getOrderFunction();
      return e && t.sort(e), t;
    }),
    (l.prototype.filterByX = function (t, e) {
      return this.d3
        .merge(
          t.map(function (t) {
            return t.values;
          })
        )
        .filter(function (t) {
          return t.x - e == 0;
        });
    }),
    (l.prototype.filterRemoveNull = function (t) {
      return t.filter(function (t) {
        return P(t.value);
      });
    }),
    (l.prototype.filterByXDomain = function (t, e) {
      return t.map(function (t) {
        return {
          id: t.id,
          id_org: t.id_org,
          values: t.values.filter(function (t) {
            return e[0] <= t.x && t.x <= e[1];
          }),
        };
      });
    }),
    (l.prototype.hasDataLabel = function () {
      var t = this.config;
      return (
        !("boolean" != typeof t.data_labels || !t.data_labels) ||
        !("object" !== s(t.data_labels) || !C(t.data_labels))
      );
    }),
    (l.prototype.getDataLabelLength = function (t, e, i) {
      var n = this,
        r = [0, 0];
      return (
        n.selectChart
          .select("svg")
          .selectAll(".dummy")
          .data([t, e])
          .enter()
          .append("text")
          .text(function (t) {
            return n.dataLabelFormat(t.id)(t);
          })
          .each(function (t, e) {
            r[e] = 1.3 * this.getBoundingClientRect()[i];
          })
          .remove(),
        r
      );
    }),
    (l.prototype.isNoneArc = function (t) {
      return this.hasTarget(this.data.targets, t.id);
    }),
    (l.prototype.isArc = function (t) {
      return "data" in t && this.hasTarget(this.data.targets, t.data.id);
    }),
    (l.prototype.findClosestFromTargets = function (t, e) {
      var i,
        n = this;
      return (
        (i = t.map(function (t) {
          return n.findClosest(t.values, e);
        })),
        n.findClosest(i, e)
      );
    }),
    (l.prototype.findClosest = function (t, i) {
      var n,
        r = this,
        a = r.config.point_sensitivity;
      return (
        t
          .filter(function (t) {
            return t && r.isBarType(t.id);
          })
          .forEach(function (t) {
            var e = r.main
              .select(
                "." +
                  Y.bars +
                  r.getTargetSelectorSuffix(t.id) +
                  " ." +
                  Y.bar +
                  "-" +
                  t.index
              )
              .node();
            !n && r.isWithinBar(r.d3.mouse(e), e) && (n = t);
          }),
        t
          .filter(function (t) {
            return t && !r.isBarType(t.id);
          })
          .forEach(function (t) {
            var e = r.dist(t, i);
            e < a && ((a = e), (n = t));
          }),
        n
      );
    }),
    (l.prototype.dist = function (t, e) {
      var i = this.config,
        n = i.axis_rotated ? 1 : 0,
        r = i.axis_rotated ? 0 : 1,
        a = this.circleY(t, t.index),
        o = this.x(t.x);
      return Math.sqrt(Math.pow(o - e[n], 2) + Math.pow(a - e[r], 2));
    }),
    (l.prototype.convertValuesToStep = function (t) {
      var e,
        i = [].concat(t);
      if (!this.isCategorized()) return t;
      for (e = t.length + 1; 0 < e; e--) i[e] = i[e - 1];
      return (
        (i[0] = { x: i[0].x - 1, value: i[0].value, id: i[0].id }),
        (i[t.length + 1] = {
          x: i[t.length].x + 1,
          value: i[t.length].value,
          id: i[t.length].id,
        }),
        i
      );
    }),
    (l.prototype.updateDataAttributes = function (t, e) {
      var i = this.config["data_" + t];
      return (
        void 0 === e ||
          (Object.keys(e).forEach(function (t) {
            i[t] = e[t];
          }),
          this.redraw({ withLegend: !0 })),
        i
      );
    }),
    (l.prototype.load = function (i, n) {
      var r = this;
      i &&
        (n.filter && (i = i.filter(n.filter)),
        (n.type || n.types) &&
          i.forEach(function (t) {
            var e = n.types && n.types[t.id] ? n.types[t.id] : n.type;
            r.setTargetType(t.id, e);
          }),
        r.data.targets.forEach(function (t) {
          for (var e = 0; e < i.length; e++)
            if (t.id === i[e].id) {
              (t.values = i[e].values), i.splice(e, 1);
              break;
            }
        }),
        (r.data.targets = r.data.targets.concat(i))),
        r.updateTargets(r.data.targets),
        r.redraw({
          withUpdateOrgXDomain: !0,
          withUpdateXDomain: !0,
          withLegend: !0,
        }),
        n.done && n.done();
    }),
    (l.prototype.loadFromArgs = function (e) {
      var i = this;
      e.data
        ? i.load(i.convertDataToTargets(e.data), e)
        : e.url
        ? i.convertUrlToData(
            e.url,
            e.mimeType,
            e.headers,
            e.keys,
            function (t) {
              i.load(i.convertDataToTargets(t), e);
            }
          )
        : e.json
        ? i.load(i.convertDataToTargets(i.convertJsonToData(e.json, e.keys)), e)
        : e.rows
        ? i.load(i.convertDataToTargets(i.convertRowsToData(e.rows)), e)
        : e.columns
        ? i.load(i.convertDataToTargets(i.convertColumnsToData(e.columns)), e)
        : i.load(null, e);
    }),
    (l.prototype.unload = function (t, e) {
      var i = this;
      e || (e = function () {}),
        (t = t.filter(function (t) {
          return i.hasTarget(i.data.targets, t);
        })) && 0 !== t.length
          ? (i.svg
              .selectAll(
                t.map(function (t) {
                  return i.selectorTarget(t);
                })
              )
              .transition()
              .style("opacity", 0)
              .remove()
              .call(i.endall, e),
            t.forEach(function (e) {
              (i.withoutFadeIn[e] = !1),
                i.legend &&
                  i.legend
                    .selectAll(
                      "." + Y.legendItem + i.getTargetSelectorSuffix(e)
                    )
                    .remove(),
                (i.data.targets = i.data.targets.filter(function (t) {
                  return t.id !== e;
                }));
            }))
          : e();
    }),
    (l.prototype.getYDomainMin = function (t) {
      var e,
        i,
        n,
        r,
        a,
        o,
        s = this,
        c = s.config,
        d = s.mapToIds(t),
        l = s.getValuesAsIdKeyed(t);
      if (0 < c.data_groups.length)
        for (
          o = s.hasNegativeValueInTargets(t), e = 0;
          e < c.data_groups.length;
          e++
        )
          if (
            0 !==
            (r = c.data_groups[e].filter(function (t) {
              return 0 <= d.indexOf(t);
            })).length
          )
            for (
              n = r[0],
                o &&
                  l[n] &&
                  l[n].forEach(function (t, e) {
                    l[n][e] = t < 0 ? t : 0;
                  }),
                i = 1;
              i < r.length;
              i++
            )
              (a = r[i]),
                l[a] &&
                  l[a].forEach(function (t, e) {
                    s.axis.getId(a) !== s.axis.getId(n) ||
                      !l[n] ||
                      (o && 0 < +t) ||
                      (l[n][e] += +t);
                  });
      return s.d3.min(
        Object.keys(l).map(function (t) {
          return s.d3.min(l[t]);
        })
      );
    }),
    (l.prototype.getYDomainMax = function (t) {
      var e,
        i,
        n,
        r,
        a,
        o,
        s = this,
        c = s.config,
        d = s.mapToIds(t),
        l = s.getValuesAsIdKeyed(t);
      if (0 < c.data_groups.length)
        for (
          o = s.hasPositiveValueInTargets(t), e = 0;
          e < c.data_groups.length;
          e++
        )
          if (
            0 !==
            (r = c.data_groups[e].filter(function (t) {
              return 0 <= d.indexOf(t);
            })).length
          )
            for (
              n = r[0],
                o &&
                  l[n] &&
                  l[n].forEach(function (t, e) {
                    l[n][e] = 0 < t ? t : 0;
                  }),
                i = 1;
              i < r.length;
              i++
            )
              (a = r[i]),
                l[a] &&
                  l[a].forEach(function (t, e) {
                    s.axis.getId(a) !== s.axis.getId(n) ||
                      !l[n] ||
                      (o && +t < 0) ||
                      (l[n][e] += +t);
                  });
      return s.d3.max(
        Object.keys(l).map(function (t) {
          return s.d3.max(l[t]);
        })
      );
    }),
    (l.prototype.getYDomain = function (t, e, i) {
      var n,
        r,
        a,
        o,
        s,
        c,
        d,
        l,
        u,
        h,
        g = this,
        p = g.config,
        f = t.filter(function (t) {
          return g.axis.getId(t.id) === e;
        }),
        _ = i ? g.filterByXDomain(f, i) : f,
        x = "y2" === e ? p.axis_y2_min : p.axis_y_min,
        y = "y2" === e ? p.axis_y2_max : p.axis_y_max,
        m = g.getYDomainMin(_),
        S = g.getYDomainMax(_),
        w = "y2" === e ? p.axis_y2_center : p.axis_y_center,
        v =
          (g.hasType("bar", _) && p.bar_zerobased) ||
          (g.hasType("area", _) && p.area_zerobased),
        b = "y2" === e ? p.axis_y2_inverted : p.axis_y_inverted,
        T = g.hasDataLabel() && p.axis_rotated,
        A = g.hasDataLabel() && !p.axis_rotated;
      return (
        (m = P(x) ? x : P(y) ? (m < y ? m : y - 10) : m),
        (S = P(y) ? y : P(x) ? (x < S ? S : x + 10) : S),
        0 === _.length
          ? "y2" === e
            ? g.y2.domain()
            : g.y.domain()
          : (isNaN(m) && (m = 0),
            isNaN(S) && (S = m),
            m === S && (m < 0 ? (S = 0) : (m = 0)),
            (u = 0 <= m && 0 <= S),
            (h = m <= 0 && S <= 0),
            ((P(x) && u) || (P(y) && h)) && (v = !1),
            v && (u && (m = 0), h && (S = 0)),
            (a = o = 0.1 * (r = Math.abs(S - m))),
            void 0 !== w &&
              ((S = w + (s = Math.max(Math.abs(m), Math.abs(S)))), (m = w - s)),
            T
              ? ((c = g.getDataLabelLength(m, S, "width")),
                (d = R(g.y.range())),
                (a += r * ((l = [c[0] / d, c[1] / d])[1] / (1 - l[0] - l[1]))),
                (o += r * (l[0] / (1 - l[0] - l[1]))))
              : A &&
                ((c = g.getDataLabelLength(m, S, "height")),
                (a += g.axis.convertPixelsToAxisPadding(c[1], r)),
                (o += g.axis.convertPixelsToAxisPadding(c[0], r))),
            "y" === e &&
              C(p.axis_y_padding) &&
              ((a = g.axis.getPadding(p.axis_y_padding, "top", a, r)),
              (o = g.axis.getPadding(p.axis_y_padding, "bottom", o, r))),
            "y2" === e &&
              C(p.axis_y2_padding) &&
              ((a = g.axis.getPadding(p.axis_y2_padding, "top", a, r)),
              (o = g.axis.getPadding(p.axis_y2_padding, "bottom", o, r))),
            v && (u && (o = m), h && (a = -S)),
            (n = [m - o, S + a]),
            b ? n.reverse() : n)
      );
    }),
    (l.prototype.getXDomainMin = function (t) {
      var e = this,
        i = e.config;
      return k(i.axis_x_min)
        ? e.isTimeSeries()
          ? this.parseDate(i.axis_x_min)
          : i.axis_x_min
        : e.d3.min(t, function (t) {
            return e.d3.min(t.values, function (t) {
              return t.x;
            });
          });
    }),
    (l.prototype.getXDomainMax = function (t) {
      var e = this,
        i = e.config;
      return k(i.axis_x_max)
        ? e.isTimeSeries()
          ? this.parseDate(i.axis_x_max)
          : i.axis_x_max
        : e.d3.max(t, function (t) {
            return e.d3.max(t.values, function (t) {
              return t.x;
            });
          });
    }),
    (l.prototype.getXDomainPadding = function (t) {
      var e,
        i,
        n,
        r,
        a = this.config,
        o = t[1] - t[0];
      return (
        (i = this.isCategorized()
          ? 0
          : this.hasType("bar")
          ? 1 < (e = this.getMaxDataCount())
            ? o / (e - 1) / 2
            : 0.5
          : 0.01 * o),
        "object" === s(a.axis_x_padding) && C(a.axis_x_padding)
          ? ((n = P(a.axis_x_padding.left) ? a.axis_x_padding.left : i),
            (r = P(a.axis_x_padding.right) ? a.axis_x_padding.right : i))
          : (n = r =
              "number" == typeof a.axis_x_padding ? a.axis_x_padding : i),
        { left: n, right: r }
      );
    }),
    (l.prototype.getXDomain = function (t) {
      var e = this,
        i = [e.getXDomainMin(t), e.getXDomainMax(t)],
        n = i[0],
        r = i[1],
        a = e.getXDomainPadding(i),
        o = 0,
        s = 0;
      return (
        n - r != 0 ||
          e.isCategorized() ||
          (r = e.isTimeSeries()
            ? ((n = new Date(0.5 * n.getTime())), new Date(1.5 * r.getTime()))
            : ((n = 0 === n ? 1 : 0.5 * n), 0 === r ? -1 : 1.5 * r)),
        (n || 0 === n) &&
          (o = e.isTimeSeries() ? new Date(n.getTime() - a.left) : n - a.left),
        (r || 0 === r) &&
          (s = e.isTimeSeries()
            ? new Date(r.getTime() + a.right)
            : r + a.right),
        [o, s]
      );
    }),
    (l.prototype.updateXDomain = function (t, e, i, n, r) {
      var a = this,
        o = a.config;
      return (
        i &&
          (a.x.domain(r || a.d3.extent(a.getXDomain(t))),
          (a.orgXDomain = a.x.domain()),
          o.zoom_enabled && a.zoom.update(),
          a.subX.domain(a.x.domain()),
          a.brush && a.brush.updateScale(a.subX)),
        e &&
          a.x.domain(
            r ||
              (!a.brush || a.brush.empty()
                ? a.orgXDomain
                : a.brush.selectionAsValue())
          ),
        n && a.x.domain(a.trimXDomain(a.x.orgDomain())),
        a.x.domain()
      );
    }),
    (l.prototype.trimXDomain = function (t) {
      var e = this.getZoomDomain(),
        i = e[0],
        n = e[1];
      return (
        t[0] <= i && ((t[1] = +t[1] + (i - t[0])), (t[0] = i)),
        n <= t[1] && ((t[0] = +t[0] - (t[1] - n)), (t[1] = n)),
        t
      );
    }),
    (l.prototype.drag = function (t) {
      var e,
        i,
        n,
        r,
        h,
        g,
        p,
        f,
        _ = this,
        a = _.config,
        o = _.main,
        x = _.d3;
      _.hasArcType() ||
        (a.data_selection_enabled &&
          a.data_selection_multiple &&
          ((e = _.dragStart[0]),
          (i = _.dragStart[1]),
          (n = t[0]),
          (r = t[1]),
          (h = Math.min(e, n)),
          (g = Math.max(e, n)),
          (p = a.data_selection_grouped ? _.margin.top : Math.min(i, r)),
          (f = a.data_selection_grouped ? _.height : Math.max(i, r)),
          o
            .select("." + Y.dragarea)
            .attr("x", h)
            .attr("y", p)
            .attr("width", g - h)
            .attr("height", f - p),
          o
            .selectAll("." + Y.shapes)
            .selectAll("." + Y.shape)
            .filter(function (t) {
              return a.data_selection_isselectable(t);
            })
            .each(function (t, e) {
              var i,
                n,
                r,
                a,
                o,
                s,
                c = x.select(this),
                d = c.classed(Y.SELECTED),
                l = c.classed(Y.INCLUDED),
                u = !1;
              if (c.classed(Y.circle))
                (i = 1 * c.attr("cx")),
                  (n = 1 * c.attr("cy")),
                  (o = _.togglePoint),
                  (u = h < i && i < g && p < n && n < f);
              else {
                if (!c.classed(Y.bar)) return;
                (i = (s = y(this)).x),
                  (n = s.y),
                  (r = s.width),
                  (a = s.height),
                  (o = _.togglePath),
                  (u = !(g < i || i + r < h || f < n || n + a < p));
              }
              u ^ l &&
                (c.classed(Y.INCLUDED, !l),
                c.classed(Y.SELECTED, !d),
                o.call(_, !d, c, t, e));
            })));
    }),
    (l.prototype.dragstart = function (t) {
      var e = this,
        i = e.config;
      e.hasArcType() ||
        (i.data_selection_enabled &&
          ((e.dragStart = t),
          e.main
            .select("." + Y.chart)
            .append("rect")
            .attr("class", Y.dragarea)
            .style("opacity", 0.1),
          (e.dragging = !0)));
    }),
    (l.prototype.dragend = function () {
      var t = this,
        e = t.config;
      t.hasArcType() ||
        (e.data_selection_enabled &&
          (t.main
            .select("." + Y.dragarea)
            .transition()
            .duration(100)
            .style("opacity", 0)
            .remove(),
          t.main.selectAll("." + Y.shape).classed(Y.INCLUDED, !1),
          (t.dragging = !1)));
    }),
    (l.prototype.getYFormat = function (t) {
      var n = this,
        r = t && !n.hasType("gauge") ? n.defaultArcValueFormat : n.yFormat,
        a = t && !n.hasType("gauge") ? n.defaultArcValueFormat : n.y2Format;
      return function (t, e, i) {
        return ("y2" === n.axis.getId(i) ? a : r).call(n, t, e);
      };
    }),
    (l.prototype.yFormat = function (t) {
      var e = this.config;
      return (
        e.axis_y_tick_format ? e.axis_y_tick_format : this.defaultValueFormat
      )(t);
    }),
    (l.prototype.y2Format = function (t) {
      var e = this.config;
      return (
        e.axis_y2_tick_format ? e.axis_y2_tick_format : this.defaultValueFormat
      )(t);
    }),
    (l.prototype.defaultValueFormat = function (t) {
      return P(t) ? +t : "";
    }),
    (l.prototype.defaultArcValueFormat = function (t, e) {
      return (100 * e).toFixed(1) + "%";
    }),
    (l.prototype.dataLabelFormat = function (t) {
      var e = this.config.data_labels,
        i = function (t) {
          return P(t) ? +t : "";
        };
      return "function" == typeof e.format
        ? e.format
        : "object" === s(e.format)
        ? e.format[t]
          ? !0 === e.format[t]
            ? i
            : e.format[t]
          : function () {
              return "";
            }
        : i;
    }),
    (l.prototype.initGrid = function () {
      var t = this,
        e = t.config,
        i = t.d3;
      (t.grid = t.main
        .append("g")
        .attr("clip-path", t.clipPathForGrid)
        .attr("class", Y.grid)),
        e.grid_x_show && t.grid.append("g").attr("class", Y.xgrids),
        e.grid_y_show && t.grid.append("g").attr("class", Y.ygrids),
        e.grid_focus_show &&
          t.grid
            .append("g")
            .attr("class", Y.xgridFocus)
            .append("line")
            .attr("class", Y.xgridFocus),
        (t.xgrid = i.selectAll([])),
        e.grid_lines_front || t.initGridLines();
    }),
    (l.prototype.initGridLines = function () {
      var t = this,
        e = t.d3;
      (t.gridLines = t.main
        .append("g")
        .attr("clip-path", t.clipPathForGrid)
        .attr("class", Y.grid + " " + Y.gridLines)),
        t.gridLines.append("g").attr("class", Y.xgridLines),
        t.gridLines.append("g").attr("class", Y.ygridLines),
        (t.xgridLines = e.selectAll([]));
    }),
    (l.prototype.updateXGrid = function (t) {
      var e = this,
        i = e.config,
        n = e.d3,
        r = e.generateGridData(i.grid_x_type, e.x),
        a = e.isCategorized() ? e.xAxis.tickOffset() : 0;
      (e.xgridAttr = i.axis_rotated
        ? {
            x1: 0,
            x2: e.width,
            y1: function (t) {
              return e.x(t) - a;
            },
            y2: function (t) {
              return e.x(t) - a;
            },
          }
        : {
            x1: function (t) {
              return e.x(t) + a;
            },
            x2: function (t) {
              return e.x(t) + a;
            },
            y1: 0,
            y2: e.height,
          }),
        (e.xgridAttr.opacity = function () {
          return +n.select(this).attr(i.axis_rotated ? "y1" : "x1") ===
            (i.axis_rotated ? e.height : 0)
            ? 0
            : 1;
        });
      var o = e.main
          .select("." + Y.xgrids)
          .selectAll("." + Y.xgrid)
          .data(r),
        s = o
          .enter()
          .append("line")
          .attr("class", Y.xgrid)
          .attr("x1", e.xgridAttr.x1)
          .attr("x2", e.xgridAttr.x2)
          .attr("y1", e.xgridAttr.y1)
          .attr("y2", e.xgridAttr.y2)
          .style("opacity", 0);
      (e.xgrid = s.merge(o)),
        t ||
          e.xgrid
            .attr("x1", e.xgridAttr.x1)
            .attr("x2", e.xgridAttr.x2)
            .attr("y1", e.xgridAttr.y1)
            .attr("y2", e.xgridAttr.y2)
            .style("opacity", e.xgridAttr.opacity),
        o.exit().remove();
    }),
    (l.prototype.updateYGrid = function () {
      var t = this,
        e = t.config,
        i = t.yAxis.tickValues() || t.y.ticks(e.grid_y_ticks),
        n = t.main
          .select("." + Y.ygrids)
          .selectAll("." + Y.ygrid)
          .data(i),
        r = n.enter().append("line").attr("class", Y.ygrid);
      (t.ygrid = r.merge(n)),
        t.ygrid
          .attr("x1", e.axis_rotated ? t.y : 0)
          .attr("x2", e.axis_rotated ? t.y : t.width)
          .attr("y1", e.axis_rotated ? 0 : t.y)
          .attr("y2", e.axis_rotated ? t.height : t.y),
        n.exit().remove(),
        t.smoothLines(t.ygrid, "grid");
    }),
    (l.prototype.gridTextAnchor = function (t) {
      return t.position ? t.position : "end";
    }),
    (l.prototype.gridTextDx = function (t) {
      return "start" === t.position ? 4 : "middle" === t.position ? 0 : -4;
    }),
    (l.prototype.xGridTextX = function (t) {
      return "start" === t.position
        ? -this.height
        : "middle" === t.position
        ? -this.height / 2
        : 0;
    }),
    (l.prototype.yGridTextX = function (t) {
      return "start" === t.position
        ? 0
        : "middle" === t.position
        ? this.width / 2
        : this.width;
    }),
    (l.prototype.updateGrid = function (t) {
      var e,
        i,
        n,
        r,
        a = this,
        o = a.main,
        s = a.config,
        c = a.xv.bind(a),
        d = a.yv.bind(a),
        l = a.xGridTextX.bind(a),
        u = a.yGridTextX.bind(a);
      a.grid.style("visibility", a.hasArcType() ? "hidden" : "visible"),
        o.select("line." + Y.xgridFocus).style("visibility", "hidden"),
        s.grid_x_show && a.updateXGrid(),
        (i = (e = o
          .select("." + Y.xgridLines)
          .selectAll("." + Y.xgridLine)
          .data(s.grid_x_lines))
          .enter()
          .append("g")
          .attr("class", function (t) {
            return Y.xgridLine + (t.class ? " " + t.class : "");
          }))
          .append("line")
          .attr("x1", s.axis_rotated ? 0 : c)
          .attr("x2", s.axis_rotated ? a.width : c)
          .attr("y1", s.axis_rotated ? c : 0)
          .attr("y2", s.axis_rotated ? c : a.height)
          .style("opacity", 0),
        i
          .append("text")
          .attr("text-anchor", a.gridTextAnchor)
          .attr("transform", s.axis_rotated ? "" : "rotate(-90)")
          .attr("x", s.axis_rotated ? u : l)
          .attr("y", c)
          .attr("dx", a.gridTextDx)
          .attr("dy", -5)
          .style("opacity", 0),
        (a.xgridLines = i.merge(e)),
        e.exit().transition().duration(t).style("opacity", 0).remove(),
        s.grid_y_show && a.updateYGrid(),
        (r = (n = o
          .select("." + Y.ygridLines)
          .selectAll("." + Y.ygridLine)
          .data(s.grid_y_lines))
          .enter()
          .append("g")
          .attr("class", function (t) {
            return Y.ygridLine + (t.class ? " " + t.class : "");
          }))
          .append("line")
          .attr("x1", s.axis_rotated ? d : 0)
          .attr("x2", s.axis_rotated ? d : a.width)
          .attr("y1", s.axis_rotated ? 0 : d)
          .attr("y2", s.axis_rotated ? a.height : d)
          .style("opacity", 0),
        r
          .append("text")
          .attr("text-anchor", a.gridTextAnchor)
          .attr("transform", s.axis_rotated ? "rotate(-90)" : "")
          .attr("x", s.axis_rotated ? l : u)
          .attr("y", d)
          .attr("dx", a.gridTextDx)
          .attr("dy", -5)
          .style("opacity", 0),
        (a.ygridLines = r.merge(n)),
        a.ygridLines
          .select("line")
          .transition()
          .duration(t)
          .attr("x1", s.axis_rotated ? d : 0)
          .attr("x2", s.axis_rotated ? d : a.width)
          .attr("y1", s.axis_rotated ? 0 : d)
          .attr("y2", s.axis_rotated ? a.height : d)
          .style("opacity", 1),
        a.ygridLines
          .select("text")
          .transition()
          .duration(t)
          .attr(
            "x",
            s.axis_rotated ? a.xGridTextX.bind(a) : a.yGridTextX.bind(a)
          )
          .attr("y", d)
          .text(function (t) {
            return t.text;
          })
          .style("opacity", 1),
        n.exit().transition().duration(t).style("opacity", 0).remove();
    }),
    (l.prototype.redrawGrid = function (t, e) {
      var i = this,
        n = i.config,
        r = i.xv.bind(i),
        a = i.xgridLines.select("line"),
        o = i.xgridLines.select("text");
      return [
        (t ? a.transition(e) : a)
          .attr("x1", n.axis_rotated ? 0 : r)
          .attr("x2", n.axis_rotated ? i.width : r)
          .attr("y1", n.axis_rotated ? r : 0)
          .attr("y2", n.axis_rotated ? r : i.height)
          .style("opacity", 1),
        (t ? o.transition(e) : o)
          .attr(
            "x",
            n.axis_rotated ? i.yGridTextX.bind(i) : i.xGridTextX.bind(i)
          )
          .attr("y", r)
          .text(function (t) {
            return t.text;
          })
          .style("opacity", 1),
      ];
    }),
    (l.prototype.showXGridFocus = function (t) {
      var e = this,
        i = e.config,
        n = t.filter(function (t) {
          return t && P(t.value);
        }),
        r = e.main.selectAll("line." + Y.xgridFocus),
        a = e.xx.bind(e);
      i.tooltip_show &&
        (e.hasType("scatter") ||
          e.hasArcType() ||
          (r
            .style("visibility", "visible")
            .data([n[0]])
            .attr(i.axis_rotated ? "y1" : "x1", a)
            .attr(i.axis_rotated ? "y2" : "x2", a),
          e.smoothLines(r, "grid")));
    }),
    (l.prototype.hideXGridFocus = function () {
      this.main.select("line." + Y.xgridFocus).style("visibility", "hidden");
    }),
    (l.prototype.updateXgridFocus = function () {
      var t = this.config;
      this.main
        .select("line." + Y.xgridFocus)
        .attr("x1", t.axis_rotated ? 0 : -10)
        .attr("x2", t.axis_rotated ? this.width : -10)
        .attr("y1", t.axis_rotated ? -10 : 0)
        .attr("y2", t.axis_rotated ? -10 : this.height);
    }),
    (l.prototype.generateGridData = function (t, e) {
      var i,
        n,
        r,
        a,
        o = [],
        s = this.main
          .select("." + Y.axisX)
          .selectAll(".tick")
          .size();
      if ("year" === t)
        for (
          n = (i = this.getXDomain())[0].getFullYear(),
            r = i[1].getFullYear(),
            a = n;
          a <= r;
          a++
        )
          o.push(new Date(a + "-01-01 00:00:00"));
      else
        (o = e.ticks(10)).length > s &&
          (o = o.filter(function (t) {
            return ("" + t).indexOf(".") < 0;
          }));
      return o;
    }),
    (l.prototype.getGridFilterToRemove = function (t) {
      return t
        ? function (e) {
            var i = !1;
            return (
              [].concat(t).forEach(function (t) {
                (("value" in t && e.value === t.value) ||
                  ("class" in t && e.class === t.class)) &&
                  (i = !0);
              }),
              i
            );
          }
        : function () {
            return !0;
          };
    }),
    (l.prototype.removeGridLines = function (t, e) {
      var i = this.config,
        n = this.getGridFilterToRemove(t),
        r = function (t) {
          return !n(t);
        },
        a = e ? Y.xgridLines : Y.ygridLines,
        o = e ? Y.xgridLine : Y.ygridLine;
      this.main
        .select("." + a)
        .selectAll("." + o)
        .filter(n)
        .transition()
        .duration(i.transition_duration)
        .style("opacity", 0)
        .remove(),
        e
          ? (i.grid_x_lines = i.grid_x_lines.filter(r))
          : (i.grid_y_lines = i.grid_y_lines.filter(r));
    }),
    (l.prototype.initEventRect = function () {
      var t = this,
        e = t.config;
      t.main
        .select("." + Y.chart)
        .append("g")
        .attr("class", Y.eventRects)
        .style("fill-opacity", 0),
        (t.eventRect = t.main
          .select("." + Y.eventRects)
          .append("rect")
          .attr("class", Y.eventRect)),
        e.zoom_enabled &&
          t.zoom &&
          (t.eventRect.call(t.zoom).on("dblclick.zoom", null),
          e.zoom_initialRange &&
            t.eventRect
              .transition()
              .duration(0)
              .call(t.zoom.transform, t.zoomTransform(e.zoom_initialRange)));
    }),
    (l.prototype.redrawEventRect = function () {
      var t,
        e,
        r = this,
        a = r.d3,
        o = r.config;
      function s() {
        r.svg.select("." + Y.eventRect).style("cursor", null),
          r.hideXGridFocus(),
          r.hideTooltip(),
          r.unexpandCircles(),
          r.unexpandBars();
      }
      (t = r.width),
        (e = r.height),
        r.main
          .select("." + Y.eventRects)
          .style(
            "cursor",
            o.zoom_enabled ? (o.axis_rotated ? "ns-resize" : "ew-resize") : null
          ),
        r.eventRect
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", t)
          .attr("height", e)
          .on(
            "mouseout",
            o.interaction_enabled
              ? function () {
                  o && (r.hasArcType() || s());
                }
              : null
          )
          .on(
            "mousemove",
            o.interaction_enabled
              ? function () {
                  var t, e, i, n;
                  r.dragging ||
                    r.hasArcType(t) ||
                    ((t = r.filterTargetsToShow(r.data.targets)),
                    (e = a.mouse(this)),
                    (i = r.findClosestFromTargets(t, e)),
                    !r.mouseover ||
                      (i && i.id === r.mouseover.id) ||
                      (o.data_onmouseout.call(r.api, r.mouseover),
                      (r.mouseover = void 0)),
                    i
                      ? ((n = (
                          r.isScatterType(i) || !o.tooltip_grouped
                            ? [i]
                            : r.filterByX(t, i.x)
                        ).map(function (t) {
                          return r.addName(t);
                        })),
                        r.showTooltip(n, this),
                        o.point_focus_expand_enabled &&
                          (r.unexpandCircles(),
                          n.forEach(function (t) {
                            r.expandCircles(t.index, t.id, !1);
                          })),
                        r.expandBars(i.index, i.id, !0),
                        r.showXGridFocus(n),
                        (r.isBarType(i.id) ||
                          r.dist(i, e) < o.point_sensitivity) &&
                          (r.svg
                            .select("." + Y.eventRect)
                            .style("cursor", "pointer"),
                          r.mouseover ||
                            (o.data_onmouseover.call(r.api, i),
                            (r.mouseover = i))))
                      : s());
                }
              : null
          )
          .on(
            "click",
            o.interaction_enabled
              ? function () {
                  var t, e, i;
                  r.hasArcType(t) ||
                    ((t = r.filterTargetsToShow(r.data.targets)),
                    (e = a.mouse(this)),
                    (i = r.findClosestFromTargets(t, e)) &&
                      (r.isBarType(i.id) ||
                        r.dist(i, e) < o.point_sensitivity) &&
                      (r.isScatterType(i) || !o.data_selection_grouped
                        ? [i]
                        : r.filterByX(t, i.x)
                      ).forEach(function (t) {
                        r.main
                          .selectAll(
                            "." + Y.shapes + r.getTargetSelectorSuffix(t.id)
                          )
                          .selectAll("." + Y.shape + "-" + t.index)
                          .each(function () {
                            (o.data_selection_grouped ||
                              r.isWithinShape(this, t)) &&
                              (r.toggleShape(this, t, t.index),
                              o.data_onclick.call(r.api, t, this));
                          });
                      }));
                }
              : null
          )
          .call(
            o.interaction_enabled && o.data_selection_draggable && r.drag
              ? a
                  .drag()
                  .on("drag", function () {
                    r.drag(a.mouse(this));
                  })
                  .on("start", function () {
                    r.dragstart(a.mouse(this));
                  })
                  .on("end", function () {
                    r.dragend();
                  })
              : function () {}
          );
    }),
    (l.prototype.getMousePosition = function (t) {
      return [this.x(t.x), this.getYScale(t.id)(t.value)];
    }),
    (l.prototype.dispatchEvent = function (t, e) {
      var i = "." + Y.eventRect,
        n = this.main.select(i).node(),
        r = n.getBoundingClientRect(),
        a = r.left + (e ? e[0] : 0),
        o = r.top + (e ? e[1] : 0),
        s = document.createEvent("MouseEvents");
      s.initMouseEvent(
        t,
        !0,
        !0,
        window,
        0,
        a,
        o,
        a,
        o,
        !1,
        !1,
        !1,
        !1,
        0,
        null
      ),
        n.dispatchEvent(s);
    }),
    (l.prototype.initLegend = function () {
      var t = this;
      if (
        ((t.legendItemTextBox = {}),
        (t.legendHasRendered = !1),
        (t.legend = t.svg
          .append("g")
          .attr("transform", t.getTranslate("legend"))),
        !t.config.legend_show)
      )
        return (
          t.legend.style("visibility", "hidden"),
          void (t.hiddenLegendIds = t.mapToIds(t.data.targets))
        );
      t.updateLegendWithDefaults();
    }),
    (l.prototype.updateLegendWithDefaults = function () {
      this.updateLegend(this.mapToIds(this.data.targets), {
        withTransform: !1,
        withTransitionForTransform: !1,
        withTransition: !1,
      });
    }),
    (l.prototype.updateSizeForLegend = function (t, e) {
      var i = this,
        n = i.config,
        r = {
          top: i.isLegendTop
            ? i.getCurrentPaddingTop() + n.legend_inset_y + 5.5
            : i.currentHeight -
              t -
              i.getCurrentPaddingBottom() -
              n.legend_inset_y,
          left: i.isLegendLeft
            ? i.getCurrentPaddingLeft() + n.legend_inset_x + 0.5
            : i.currentWidth -
              e -
              i.getCurrentPaddingRight() -
              n.legend_inset_x +
              0.5,
        };
      i.margin3 = {
        top: i.isLegendRight
          ? 0
          : i.isLegendInset
          ? r.top
          : i.currentHeight - t,
        right: NaN,
        bottom: 0,
        left: i.isLegendRight
          ? i.currentWidth - e
          : i.isLegendInset
          ? r.left
          : 0,
      };
    }),
    (l.prototype.transformLegend = function (t) {
      (t ? this.legend.transition() : this.legend).attr(
        "transform",
        this.getTranslate("legend")
      );
    }),
    (l.prototype.updateLegendStep = function (t) {
      this.legendStep = t;
    }),
    (l.prototype.updateLegendItemWidth = function (t) {
      this.legendItemWidth = t;
    }),
    (l.prototype.updateLegendItemHeight = function (t) {
      this.legendItemHeight = t;
    }),
    (l.prototype.getLegendWidth = function () {
      var t = this;
      return t.config.legend_show
        ? t.isLegendRight || t.isLegendInset
          ? t.legendItemWidth * (t.legendStep + 1)
          : t.currentWidth
        : 0;
    }),
    (l.prototype.getLegendHeight = function () {
      var t = this,
        e = 0;
      return (
        t.config.legend_show &&
          (e = t.isLegendRight
            ? t.currentHeight
            : Math.max(20, t.legendItemHeight) * (t.legendStep + 1)),
        e
      );
    }),
    (l.prototype.opacityForLegend = function (t) {
      return t.classed(Y.legendItemHidden) ? null : 1;
    }),
    (l.prototype.opacityForUnfocusedLegend = function (t) {
      return t.classed(Y.legendItemHidden) ? null : 0.3;
    }),
    (l.prototype.toggleFocusLegend = function (e, t) {
      var i = this;
      (e = i.mapToTargetIds(e)),
        i.legend
          .selectAll("." + Y.legendItem)
          .filter(function (t) {
            return 0 <= e.indexOf(t);
          })
          .classed(Y.legendItemFocused, t)
          .transition()
          .duration(100)
          .style("opacity", function () {
            return (t ? i.opacityForLegend : i.opacityForUnfocusedLegend).call(
              i,
              i.d3.select(this)
            );
          });
    }),
    (l.prototype.revertLegend = function () {
      var t = this,
        e = t.d3;
      t.legend
        .selectAll("." + Y.legendItem)
        .classed(Y.legendItemFocused, !1)
        .transition()
        .duration(100)
        .style("opacity", function () {
          return t.opacityForLegend(e.select(this));
        });
    }),
    (l.prototype.showLegend = function (t) {
      var e = this,
        i = e.config;
      i.legend_show ||
        ((i.legend_show = !0),
        e.legend.style("visibility", "visible"),
        e.legendHasRendered || e.updateLegendWithDefaults()),
        e.removeHiddenLegendIds(t),
        e.legend
          .selectAll(e.selectorLegends(t))
          .style("visibility", "visible")
          .transition()
          .style("opacity", function () {
            return e.opacityForLegend(e.d3.select(this));
          });
    }),
    (l.prototype.hideLegend = function (t) {
      var e = this,
        i = e.config;
      i.legend_show &&
        u(t) &&
        ((i.legend_show = !1), e.legend.style("visibility", "hidden")),
        e.addHiddenLegendIds(t),
        e.legend
          .selectAll(e.selectorLegends(t))
          .style("opacity", 0)
          .style("visibility", "hidden");
    }),
    (l.prototype.clearLegendItemTextBoxCache = function () {
      this.legendItemTextBox = {};
    }),
    (l.prototype.updateLegend = function (f, t, e) {
      var i,
        n,
        r,
        a,
        o,
        s,
        c,
        d,
        l,
        u,
        h,
        g,
        p,
        _,
        x,
        y,
        m = this,
        S = m.config,
        w = 4,
        v = 10,
        b = 0,
        T = 0,
        A = 10,
        P = S.legend_item_tile_width + 5,
        C = 0,
        L = {},
        V = {},
        G = {},
        E = [0],
        I = {},
        O = 0;
      function R(t, e, i) {
        var n,
          r,
          a,
          o,
          s = 0 === i,
          c = i === f.length - 1,
          d =
            ((a = t),
            (o = e),
            m.legendItemTextBox[o] ||
              (m.legendItemTextBox[o] = m.getTextRect(
                a.textContent,
                Y.legendItem,
                a
              )),
            m.legendItemTextBox[o]),
          l =
            d.width +
            P +
            (!c || m.isLegendRight || m.isLegendInset ? v : 0) +
            S.legend_padding,
          u = d.height + w,
          h = m.isLegendRight || m.isLegendInset ? u : l,
          g =
            m.isLegendRight || m.isLegendInset
              ? m.getLegendHeight()
              : m.getLegendWidth();
        function p(t, e) {
          e || ((n = (g - C - h) / 2) < A && ((n = (g - h) / 2), (C = 0), O++)),
            (I[t] = O),
            (E[O] = m.isLegendInset ? 10 : n),
            (L[t] = C),
            (C += h);
        }
        s && (T = b = O = C = 0),
          !S.legend_show || m.isLegendToShow(e)
            ? ((V[e] = l),
              (G[e] = u),
              (!b || b <= l) && (b = l),
              (!T || T <= u) && (T = u),
              (r = m.isLegendRight || m.isLegendInset ? T : b),
              S.legend_equally
                ? (Object.keys(V).forEach(function (t) {
                    V[t] = b;
                  }),
                  Object.keys(G).forEach(function (t) {
                    G[t] = T;
                  }),
                  (n = (g - r * f.length) / 2) < A
                    ? ((O = C = 0),
                      f.forEach(function (t) {
                        p(t);
                      }))
                    : p(e, !0))
                : p(e))
            : (V[e] = G[e] = I[e] = L[e] = 0);
      }
      (f = f.filter(function (t) {
        return !k(S.data_names[t]) || null !== S.data_names[t];
      })),
        (h = N((t = t || {}), "withTransition", !0)),
        (g = N(t, "withTransitionForTransform", !0)),
        m.isLegendInset &&
          ((O = S.legend_inset_step ? S.legend_inset_step : f.length),
          m.updateLegendStep(O)),
        (a = m.isLegendRight
          ? ((i = function (t) {
              return b * I[t];
            }),
            function (t) {
              return E[I[t]] + L[t];
            })
          : m.isLegendInset
          ? ((i = function (t) {
              return b * I[t] + 10;
            }),
            function (t) {
              return E[I[t]] + L[t];
            })
          : ((i = function (t) {
              return E[I[t]] + L[t];
            }),
            function (t) {
              return T * I[t];
            })),
        (n = function (t, e) {
          return i(t, e) + 4 + S.legend_item_tile_width;
        }),
        (o = function (t, e) {
          return a(t, e) + 9;
        }),
        (r = function (t, e) {
          return i(t, e);
        }),
        (s = function (t, e) {
          return a(t, e) - 5;
        }),
        (c = function (t, e) {
          return i(t, e) - 2;
        }),
        (d = function (t, e) {
          return i(t, e) - 2 + S.legend_item_tile_width;
        }),
        (l = function (t, e) {
          return a(t, e) + 4;
        }),
        (u = m.legend
          .selectAll("." + Y.legendItem)
          .data(f)
          .enter()
          .append("g")
          .attr("class", function (t) {
            return m.generateClass(Y.legendItem, t);
          })
          .style("visibility", function (t) {
            return m.isLegendToShow(t) ? "visible" : "hidden";
          })
          .style("cursor", "pointer")
          .on("click", function (t) {
            S.legend_item_onclick
              ? S.legend_item_onclick.call(m, t)
              : m.d3.event.altKey
              ? (m.api.hide(), m.api.show(t))
              : (m.api.toggle(t),
                m.isTargetToShow(t) ? m.api.focus(t) : m.api.revert());
          })
          .on("mouseover", function (t) {
            S.legend_item_onmouseover
              ? S.legend_item_onmouseover.call(m, t)
              : (m.d3.select(this).classed(Y.legendItemFocused, !0),
                !m.transiting && m.isTargetToShow(t) && m.api.focus(t));
          })
          .on("mouseout", function (t) {
            S.legend_item_onmouseout
              ? S.legend_item_onmouseout.call(m, t)
              : (m.d3.select(this).classed(Y.legendItemFocused, !1),
                m.api.revert());
          }))
          .append("text")
          .text(function (t) {
            return k(S.data_names[t]) ? S.data_names[t] : t;
          })
          .each(function (t, e) {
            R(this, t, e);
          })
          .style("pointer-events", "none")
          .attr("x", m.isLegendRight || m.isLegendInset ? n : -200)
          .attr("y", m.isLegendRight || m.isLegendInset ? -200 : o),
        u
          .append("rect")
          .attr("class", Y.legendItemEvent)
          .style("fill-opacity", 0)
          .attr("x", m.isLegendRight || m.isLegendInset ? r : -200)
          .attr("y", m.isLegendRight || m.isLegendInset ? -200 : s),
        u
          .append("line")
          .attr("class", Y.legendItemTile)
          .style("stroke", m.color)
          .style("pointer-events", "none")
          .attr("x1", m.isLegendRight || m.isLegendInset ? c : -200)
          .attr("y1", m.isLegendRight || m.isLegendInset ? -200 : l)
          .attr("x2", m.isLegendRight || m.isLegendInset ? d : -200)
          .attr("y2", m.isLegendRight || m.isLegendInset ? -200 : l)
          .attr("stroke-width", S.legend_item_tile_height),
        (y = m.legend.select("." + Y.legendBackground + " rect")),
        m.isLegendInset &&
          0 < b &&
          0 === y.size() &&
          (y = m.legend
            .insert("g", "." + Y.legendItem)
            .attr("class", Y.legendBackground)
            .append("rect")),
        (p = m.legend
          .selectAll("text")
          .data(f)
          .text(function (t) {
            return k(S.data_names[t]) ? S.data_names[t] : t;
          })
          .each(function (t, e) {
            R(this, t, e);
          })),
        (h ? p.transition() : p).attr("x", n).attr("y", o),
        (_ = m.legend.selectAll("rect." + Y.legendItemEvent).data(f)),
        (h ? _.transition() : _)
          .attr("width", function (t) {
            return V[t];
          })
          .attr("height", function (t) {
            return G[t];
          })
          .attr("x", r)
          .attr("y", s),
        (x = m.legend.selectAll("line." + Y.legendItemTile).data(f)),
        (h ? x.transition() : x)
          .style(
            "stroke",
            m.levelColor
              ? function (t) {
                  return m.levelColor(m.cache[t].values[0].value);
                }
              : m.color
          )
          .attr("x1", c)
          .attr("y1", l)
          .attr("x2", d)
          .attr("y2", l),
        y &&
          (h ? y.transition() : y)
            .attr("height", m.getLegendHeight() - 12)
            .attr("width", b * (O + 1) + 10),
        m.legend
          .selectAll("." + Y.legendItem)
          .classed(Y.legendItemHidden, function (t) {
            return !m.isTargetToShow(t);
          }),
        m.updateLegendItemWidth(b),
        m.updateLegendItemHeight(T),
        m.updateLegendStep(O),
        m.updateSizes(),
        m.updateScales(),
        m.updateSvgSize(),
        m.transformAll(g, e),
        (m.legendHasRendered = !0);
    }),
    (l.prototype.initRegion = function () {
      this.region = this.main
        .append("g")
        .attr("clip-path", this.clipPath)
        .attr("class", Y.regions);
    }),
    (l.prototype.updateRegion = function (t) {
      var e = this,
        i = e.config;
      e.region.style("visibility", e.hasArcType() ? "hidden" : "visible");
      var n = e.main
          .select("." + Y.regions)
          .selectAll("." + Y.region)
          .data(i.regions),
        r = n
          .enter()
          .append("rect")
          .attr("x", e.regionX.bind(e))
          .attr("y", e.regionY.bind(e))
          .attr("width", e.regionWidth.bind(e))
          .attr("height", e.regionHeight.bind(e))
          .style("fill-opacity", 0);
      (e.mainRegion = r.merge(n).attr("class", e.classRegion.bind(e))),
        n.exit().transition().duration(t).style("opacity", 0).remove();
    }),
    (l.prototype.redrawRegion = function (t, e) {
      var i = this,
        n = i.mainRegion;
      return [
        (t ? n.transition(e) : n)
          .attr("x", i.regionX.bind(i))
          .attr("y", i.regionY.bind(i))
          .attr("width", i.regionWidth.bind(i))
          .attr("height", i.regionHeight.bind(i))
          .style("fill-opacity", function (t) {
            return P(t.opacity) ? t.opacity : 0.1;
          }),
      ];
    }),
    (l.prototype.regionX = function (t) {
      var e = this,
        i = e.config,
        n = "y" === t.axis ? e.y : e.y2;
      return "y" === t.axis || "y2" === t.axis
        ? i.axis_rotated && "start" in t
          ? n(t.start)
          : 0
        : i.axis_rotated
        ? 0
        : "start" in t
        ? e.x(e.isTimeSeries() ? e.parseDate(t.start) : t.start)
        : 0;
    }),
    (l.prototype.regionY = function (t) {
      var e = this,
        i = e.config,
        n = "y" === t.axis ? e.y : e.y2;
      return "y" === t.axis || "y2" === t.axis
        ? i.axis_rotated
          ? 0
          : "end" in t
          ? n(t.end)
          : 0
        : i.axis_rotated && "start" in t
        ? e.x(e.isTimeSeries() ? e.parseDate(t.start) : t.start)
        : 0;
    }),
    (l.prototype.regionWidth = function (t) {
      var e,
        i = this,
        n = i.config,
        r = i.regionX(t),
        a = "y" === t.axis ? i.y : i.y2;
      return (e =
        "y" === t.axis || "y2" === t.axis
          ? n.axis_rotated && "end" in t
            ? a(t.end)
            : i.width
          : n.axis_rotated
          ? i.width
          : "end" in t
          ? i.x(i.isTimeSeries() ? i.parseDate(t.end) : t.end)
          : i.width) < r
        ? 0
        : e - r;
    }),
    (l.prototype.regionHeight = function (t) {
      var e,
        i = this,
        n = i.config,
        r = this.regionY(t),
        a = "y" === t.axis ? i.y : i.y2;
      return (e =
        "y" === t.axis || "y2" === t.axis
          ? n.axis_rotated
            ? i.height
            : "start" in t
            ? a(t.start)
            : i.height
          : n.axis_rotated && "end" in t
          ? i.x(i.isTimeSeries() ? i.parseDate(t.end) : t.end)
          : i.height) < r
        ? 0
        : e - r;
    }),
    (l.prototype.isRegionOnX = function (t) {
      return !t.axis || "x" === t.axis;
    }),
    (l.prototype.getScale = function (t, e, i) {
      return (i ? this.d3.scaleTime() : this.d3.scaleLinear()).range([t, e]);
    }),
    (l.prototype.getX = function (t, e, i, n) {
      var r,
        a = this.getScale(t, e, this.isTimeSeries()),
        o = i ? a.domain(i) : a;
      for (r in ((a = this.isCategorized()
        ? ((n =
            n ||
            function () {
              return 0;
            }),
          function (t, e) {
            var i = o(t) + n(t);
            return e ? i : Math.ceil(i);
          })
        : function (t, e) {
            var i = o(t);
            return e ? i : Math.ceil(i);
          }),
      o))
        a[r] = o[r];
      return (
        (a.orgDomain = function () {
          return o.domain();
        }),
        this.isCategorized() &&
          (a.domain = function (t) {
            return arguments.length
              ? (o.domain(t), a)
              : [(t = this.orgDomain())[0], t[1] + 1];
          }),
        a
      );
    }),
    (l.prototype.getY = function (t, e, i) {
      var n = this.getScale(t, e, this.isTimeSeriesY());
      return i && n.domain(i), n;
    }),
    (l.prototype.getYScale = function (t) {
      return "y2" === this.axis.getId(t) ? this.y2 : this.y;
    }),
    (l.prototype.getSubYScale = function (t) {
      return "y2" === this.axis.getId(t) ? this.subY2 : this.subY;
    }),
    (l.prototype.updateScales = function () {
      var e = this,
        t = e.config,
        i = !e.x;
      (e.xMin = t.axis_rotated ? 1 : 0),
        (e.xMax = t.axis_rotated ? e.height : e.width),
        (e.yMin = t.axis_rotated ? 0 : e.height),
        (e.yMax = t.axis_rotated ? e.width : 1),
        (e.subXMin = e.xMin),
        (e.subXMax = e.xMax),
        (e.subYMin = t.axis_rotated ? 0 : e.height2),
        (e.subYMax = t.axis_rotated ? e.width2 : 1),
        (e.x = e.getX(
          e.xMin,
          e.xMax,
          i ? void 0 : e.x.orgDomain(),
          function () {
            return e.xAxis.tickOffset();
          }
        )),
        (e.y = e.getY(e.yMin, e.yMax, i ? t.axis_y_default : e.y.domain())),
        (e.y2 = e.getY(e.yMin, e.yMax, i ? t.axis_y2_default : e.y2.domain())),
        (e.subX = e.getX(e.xMin, e.xMax, e.orgXDomain, function (t) {
          return t % 1 ? 0 : e.subXAxis.tickOffset();
        })),
        (e.subY = e.getY(
          e.subYMin,
          e.subYMax,
          i ? t.axis_y_default : e.subY.domain()
        )),
        (e.subY2 = e.getY(
          e.subYMin,
          e.subYMax,
          i ? t.axis_y2_default : e.subY2.domain()
        )),
        (e.xAxisTickFormat = e.axis.getXAxisTickFormat()),
        (e.xAxisTickValues = e.axis.getXAxisTickValues()),
        (e.yAxisTickValues = e.axis.getYAxisTickValues()),
        (e.y2AxisTickValues = e.axis.getY2AxisTickValues()),
        (e.xAxis = e.axis.getXAxis(
          e.x,
          e.xOrient,
          e.xAxisTickFormat,
          e.xAxisTickValues,
          t.axis_x_tick_outer
        )),
        (e.subXAxis = e.axis.getXAxis(
          e.subX,
          e.subXOrient,
          e.xAxisTickFormat,
          e.xAxisTickValues,
          t.axis_x_tick_outer
        )),
        (e.yAxis = e.axis.getYAxis(
          e.y,
          e.yOrient,
          t.axis_y_tick_format,
          e.yAxisTickValues,
          t.axis_y_tick_outer
        )),
        (e.y2Axis = e.axis.getYAxis(
          e.y2,
          e.y2Orient,
          t.axis_y2_tick_format,
          e.y2AxisTickValues,
          t.axis_y2_tick_outer
        )),
        i || (e.brush && e.brush.updateScale(e.subX)),
        e.updateArc && e.updateArc();
    }),
    (l.prototype.selectPoint = function (t, e, i) {
      var n = this,
        r = n.config,
        a = (r.axis_rotated ? n.circleY : n.circleX).bind(n),
        o = (r.axis_rotated ? n.circleX : n.circleY).bind(n),
        s = n.pointSelectR.bind(n);
      r.data_onselected.call(n.api, e, t.node()),
        n.main
          .select("." + Y.selectedCircles + n.getTargetSelectorSuffix(e.id))
          .selectAll("." + Y.selectedCircle + "-" + i)
          .data([e])
          .enter()
          .append("circle")
          .attr("class", function () {
            return n.generateClass(Y.selectedCircle, i);
          })
          .attr("cx", a)
          .attr("cy", o)
          .attr("stroke", function () {
            return n.color(e);
          })
          .attr("r", function (t) {
            return 1.4 * n.pointSelectR(t);
          })
          .transition()
          .duration(100)
          .attr("r", s);
    }),
    (l.prototype.unselectPoint = function (t, e, i) {
      this.config.data_onunselected.call(this.api, e, t.node()),
        this.main
          .select("." + Y.selectedCircles + this.getTargetSelectorSuffix(e.id))
          .selectAll("." + Y.selectedCircle + "-" + i)
          .transition()
          .duration(100)
          .attr("r", 0)
          .remove();
    }),
    (l.prototype.togglePoint = function (t, e, i, n) {
      t ? this.selectPoint(e, i, n) : this.unselectPoint(e, i, n);
    }),
    (l.prototype.selectPath = function (t, e) {
      var i = this;
      i.config.data_onselected.call(i, e, t.node()),
        i.config.interaction_brighten &&
          t
            .transition()
            .duration(100)
            .style("fill", function () {
              return i.d3.rgb(i.color(e)).brighter(0.75);
            });
    }),
    (l.prototype.unselectPath = function (t, e) {
      var i = this;
      i.config.data_onunselected.call(i, e, t.node()),
        i.config.interaction_brighten &&
          t
            .transition()
            .duration(100)
            .style("fill", function () {
              return i.color(e);
            });
    }),
    (l.prototype.togglePath = function (t, e, i, n) {
      t ? this.selectPath(e, i, n) : this.unselectPath(e, i, n);
    }),
    (l.prototype.getToggle = function (t, e) {
      var i;
      return (
        "circle" === t.nodeName
          ? (i = this.isStepType(e) ? function () {} : this.togglePoint)
          : "path" === t.nodeName && (i = this.togglePath),
        i
      );
    }),
    (l.prototype.toggleShape = function (t, e, i) {
      var n = this,
        r = n.d3,
        a = n.config,
        o = r.select(t),
        s = o.classed(Y.SELECTED),
        c = n.getToggle(t, e).bind(n);
      a.data_selection_enabled &&
        a.data_selection_isselectable(e) &&
        (a.data_selection_multiple ||
          n.main
            .selectAll(
              "." +
                Y.shapes +
                (a.data_selection_grouped
                  ? n.getTargetSelectorSuffix(e.id)
                  : "")
            )
            .selectAll("." + Y.shape)
            .each(function (t, e) {
              var i = r.select(this);
              i.classed(Y.SELECTED) && c(!1, i.classed(Y.SELECTED, !1), t, e);
            }),
        o.classed(Y.SELECTED, !s),
        c(!s, o, e, i));
    }),
    (l.prototype.initBar = function () {
      this.main
        .select("." + Y.chart)
        .append("g")
        .attr("class", Y.chartBars);
    }),
    (l.prototype.updateTargetsForBar = function (t) {
      var e = this,
        i = e.config,
        n = e.classChartBar.bind(e),
        r = e.classBars.bind(e),
        a = e.classFocus.bind(e);
      e.main
        .select("." + Y.chartBars)
        .selectAll("." + Y.chartBar)
        .data(t)
        .attr("class", function (t) {
          return n(t) + a(t);
        })
        .enter()
        .append("g")
        .attr("class", n)
        .style("pointer-events", "none")
        .append("g")
        .attr("class", r)
        .style("cursor", function (t) {
          return i.data_selection_isselectable(t) ? "pointer" : null;
        });
    }),
    (l.prototype.updateBar = function (t) {
      var e = this,
        i = e.barData.bind(e),
        n = e.classBar.bind(e),
        r = e.initialOpacity.bind(e),
        a = function (t) {
          return e.color(t.id);
        },
        o = e.main
          .selectAll("." + Y.bars)
          .selectAll("." + Y.bar)
          .data(i),
        s = o
          .enter()
          .append("path")
          .attr("class", n)
          .style("stroke", a)
          .style("fill", a);
      (e.mainBar = s.merge(o).style("opacity", r)),
        o.exit().transition().duration(t).style("opacity", 0);
    }),
    (l.prototype.redrawBar = function (t, e, i) {
      return [
        (e ? this.mainBar.transition(i) : this.mainBar)
          .attr("d", t)
          .style("stroke", this.color)
          .style("fill", this.color)
          .style("opacity", 1),
      ];
    }),
    (l.prototype.getBarW = function (t, e) {
      var i = this.config,
        n =
          "number" == typeof i.bar_width
            ? i.bar_width
            : e
            ? (t.tickInterval() * i.bar_width_ratio) / e
            : 0;
      return i.bar_width_max && n > i.bar_width_max ? i.bar_width_max : n;
    }),
    (l.prototype.getBars = function (t, e) {
      return (
        e
          ? this.main.selectAll("." + Y.bars + this.getTargetSelectorSuffix(e))
          : this.main
      ).selectAll("." + Y.bar + (P(t) ? "-" + t : ""));
    }),
    (l.prototype.expandBars = function (t, e, i) {
      i && this.unexpandBars(), this.getBars(t, e).classed(Y.EXPANDED, !0);
    }),
    (l.prototype.unexpandBars = function (t) {
      this.getBars(t).classed(Y.EXPANDED, !1);
    }),
    (l.prototype.generateDrawBar = function (t, e) {
      var a = this.config,
        o = this.generateGetBarPoints(t, e);
      return function (t, e) {
        var i = o(t, e),
          n = a.axis_rotated ? 1 : 0,
          r = a.axis_rotated ? 0 : 1;
        return (
          "M " +
          i[0][n] +
          "," +
          i[0][r] +
          " L" +
          i[1][n] +
          "," +
          i[1][r] +
          " L" +
          i[2][n] +
          "," +
          i[2][r] +
          " L" +
          i[3][n] +
          "," +
          i[3][r] +
          " z"
        );
      };
    }),
    (l.prototype.generateGetBarPoints = function (t, e) {
      var o = this,
        i = e ? o.subXAxis : o.xAxis,
        n = t.__max__ + 1,
        s = o.getBarW(i, n),
        c = o.getShapeX(s, n, t, !!e),
        d = o.getShapeY(!!e),
        l = o.getShapeOffset(o.isBarType, t, !!e),
        u = s * (o.config.bar_space / 2),
        h = e ? o.getSubYScale : o.getYScale;
      return function (t, e) {
        var i = h.call(o, t.id)(0),
          n = l(t, e) || i,
          r = c(t),
          a = d(t);
        return (
          o.config.axis_rotated &&
            ((0 < t.value && a < i) || (t.value < 0 && i < a)) &&
            (a = i),
          [
            [r + u, n],
            [r + u, a - (i - n)],
            [r + s - u, a - (i - n)],
            [r + s - u, n],
          ]
        );
      };
    }),
    (l.prototype.isWithinBar = function (t, e) {
      var i = e.getBoundingClientRect(),
        n = e.pathSegList.getItem(0),
        r = e.pathSegList.getItem(1),
        a = Math.min(n.x, r.x),
        o = Math.min(n.y, r.y),
        s = a + i.width + 2,
        c = o + i.height + 2,
        d = o - 2;
      return a - 2 < t[0] && t[0] < s && d < t[1] && t[1] < c;
    }),
    (l.prototype.getShapeIndices = function (t) {
      var e,
        i,
        n = this.config,
        r = {},
        a = 0;
      return (
        this.filterTargetsToShow(this.data.targets.filter(t, this)).forEach(
          function (t) {
            for (e = 0; e < n.data_groups.length; e++)
              if (!(n.data_groups[e].indexOf(t.id) < 0))
                for (i = 0; i < n.data_groups[e].length; i++)
                  if (n.data_groups[e][i] in r) {
                    r[t.id] = r[n.data_groups[e][i]];
                    break;
                  }
            v(r[t.id]) && (r[t.id] = a++);
          }
        ),
        (r.__max__ = a - 1),
        r
      );
    }),
    (l.prototype.getShapeX = function (i, n, r, t) {
      var a = t ? this.subX : this.x;
      return function (t) {
        var e = t.id in r ? r[t.id] : 0;
        return t.x || 0 === t.x ? a(t.x) - i * (n / 2 - e) : 0;
      };
    }),
    (l.prototype.getShapeY = function (e) {
      var i = this;
      return function (t) {
        return (e ? i.getSubYScale(t.id) : i.getYScale(t.id))(t.value);
      };
    }),
    (l.prototype.getShapeOffset = function (t, s, e) {
      var c = this,
        d = c.orderTargets(c.filterTargetsToShow(c.data.targets.filter(t, c))),
        l = d.map(function (t) {
          return t.id;
        });
      return function (i, n) {
        var r = e ? c.getSubYScale(i.id) : c.getYScale(i.id),
          a = r(0),
          o = a;
        return (
          d.forEach(function (t) {
            var e = c.isStepType(i)
              ? c.convertValuesToStep(t.values)
              : t.values;
            t.id !== i.id &&
              s[t.id] === s[i.id] &&
              l.indexOf(t.id) < l.indexOf(i.id) &&
              ((void 0 !== e[n] && +e[n].x == +i.x) ||
                ((n = -1),
                e.forEach(function (t, e) {
                  t.x === i.x && (n = e);
                })),
              n in e && 0 <= e[n].value * i.value && (o += r(e[n].value) - a));
          }),
          o
        );
      };
    }),
    (l.prototype.isWithinShape = function (t, e) {
      var i,
        n = this,
        r = n.d3.select(t);
      return (
        n.isTargetToShow(e.id)
          ? "circle" === t.nodeName
            ? (i = n.isStepType(e)
                ? n.isWithinStep(t, n.getYScale(e.id)(e.value))
                : n.isWithinCircle(t, 1.5 * n.pointSelectR(e)))
            : "path" === t.nodeName &&
              (i = !r.classed(Y.bar) || n.isWithinBar(n.d3.mouse(t), t))
          : (i = !1),
        i
      );
    }),
    (l.prototype.getInterpolate = function (t) {
      var e = this,
        i = e.d3,
        n = {
          linear: i.curveLinear,
          "linear-closed": i.curveLinearClosed,
          basis: i.curveBasis,
          "basis-open": i.curveBasisOpen,
          "basis-closed": i.curveBasisClosed,
          bundle: i.curveBundle,
          cardinal: i.curveCardinal,
          "cardinal-open": i.curveCardinalOpen,
          "cardinal-closed": i.curveCardinalClosed,
          monotone: i.curveMonotoneX,
          step: i.curveStep,
          "step-before": i.curveStepBefore,
          "step-after": i.curveStepAfter,
        };
      return e.isSplineType(t)
        ? n[e.config.spline_interpolation_type] || n.cardinal
        : e.isStepType(t)
        ? n[e.config.line_step_type]
        : n.linear;
    }),
    (l.prototype.initLine = function () {
      this.main
        .select("." + Y.chart)
        .append("g")
        .attr("class", Y.chartLines);
    }),
    (l.prototype.updateTargetsForLine = function (t) {
      var e,
        i = this,
        n = i.config,
        r = i.classChartLine.bind(i),
        a = i.classLines.bind(i),
        o = i.classAreas.bind(i),
        s = i.classCircles.bind(i),
        c = i.classFocus.bind(i);
      (e = i.main
        .select("." + Y.chartLines)
        .selectAll("." + Y.chartLine)
        .data(t)
        .attr("class", function (t) {
          return r(t) + c(t);
        })
        .enter()
        .append("g")
        .attr("class", r)
        .style("opacity", 0)
        .style("pointer-events", "none"))
        .append("g")
        .attr("class", a),
        e.append("g").attr("class", o),
        e.append("g").attr("class", function (t) {
          return i.generateClass(Y.selectedCircles, t.id);
        }),
        e
          .append("g")
          .attr("class", s)
          .style("cursor", function (t) {
            return n.data_selection_isselectable(t) ? "pointer" : null;
          }),
        t.forEach(function (e) {
          i.main
            .selectAll(
              "." + Y.selectedCircles + i.getTargetSelectorSuffix(e.id)
            )
            .selectAll("." + Y.selectedCircle)
            .each(function (t) {
              t.value = e.values[t.index].value;
            });
        });
    }),
    (l.prototype.updateLine = function (t) {
      var e = this,
        i = e.main
          .selectAll("." + Y.lines)
          .selectAll("." + Y.line)
          .data(e.lineData.bind(e)),
        n = i
          .enter()
          .append("path")
          .attr("class", e.classLine.bind(e))
          .style("stroke", e.color);
      (e.mainLine = n
        .merge(i)
        .style("opacity", e.initialOpacity.bind(e))
        .style("shape-rendering", function (t) {
          return e.isStepType(t) ? "crispEdges" : "";
        })
        .attr("transform", null)),
        i.exit().transition().duration(t).style("opacity", 0);
    }),
    (l.prototype.redrawLine = function (t, e, i) {
      return [
        (e ? this.mainLine.transition(i) : this.mainLine)
          .attr("d", t)
          .style("stroke", this.color)
          .style("opacity", 1),
      ];
    }),
    (l.prototype.generateDrawLine = function (t, o) {
      var s = this,
        c = s.config,
        d = s.d3.line(),
        i = s.generateGetLinePoints(t, o),
        l = o ? s.getSubYScale : s.getYScale,
        e = function (t) {
          return (o ? s.subxx : s.xx).call(s, t);
        },
        n = function (t, e) {
          return 0 < c.data_groups.length
            ? i(t, e)[0][1]
            : l.call(s, t.id)(t.value);
        };
      return (
        (d = c.axis_rotated ? d.x(n).y(e) : d.x(e).y(n)),
        c.line_connectNull ||
          (d = d.defined(function (t) {
            return null != t.value;
          })),
        function (t) {
          var e = c.line_connectNull ? s.filterRemoveNull(t.values) : t.values,
            i = o ? s.subX : s.x,
            n = l.call(s, t.id),
            r = 0,
            a = 0;
          return (
            (s.isLineType(t)
              ? c.data_regions[t.id]
                ? s.lineWithRegions(e, i, n, c.data_regions[t.id])
                : (s.isStepType(t) && (e = s.convertValuesToStep(e)),
                  d.curve(s.getInterpolate(t))(e))
              : (e[0] && ((r = i(e[0].x)), (a = n(e[0].value))),
                c.axis_rotated ? "M " + a + " " + r : "M " + r + " " + a)) ||
            "M 0 0"
          );
        }
      );
    }),
    (l.prototype.generateGetLinePoints = function (t, e) {
      var o = this,
        s = o.config,
        i = t.__max__ + 1,
        c = o.getShapeX(0, i, t, !!e),
        d = o.getShapeY(!!e),
        l = o.getShapeOffset(o.isLineType, t, !!e),
        u = e ? o.getSubYScale : o.getYScale;
      return function (t, e) {
        var i = u.call(o, t.id)(0),
          n = l(t, e) || i,
          r = c(t),
          a = d(t);
        return (
          s.axis_rotated &&
            ((0 < t.value && a < i) || (t.value < 0 && i < a)) &&
            (a = i),
          [
            [r, a - (i - n)],
            [r, a - (i - n)],
            [r, a - (i - n)],
            [r, a - (i - n)],
          ]
        );
      };
    }),
    (l.prototype.lineWithRegions = function (t, c, d, e) {
      var i,
        n,
        r,
        a,
        l,
        o,
        s,
        u,
        h,
        g,
        p,
        f = this,
        _ = f.config,
        x = "M",
        y = f.isCategorized() ? 0.5 : 0,
        m = [];
      function S(t, e) {
        var i;
        for (i = 0; i < e.length; i++)
          if (e[i].start < t && t <= e[i].end) return !0;
        return !1;
      }
      if (k(e))
        for (i = 0; i < e.length; i++)
          (m[i] = {}),
            v(e[i].start)
              ? (m[i].start = t[0].x)
              : (m[i].start = f.isTimeSeries()
                  ? f.parseDate(e[i].start)
                  : e[i].start),
            v(e[i].end)
              ? (m[i].end = t[t.length - 1].x)
              : (m[i].end = f.isTimeSeries()
                  ? f.parseDate(e[i].end)
                  : e[i].end);
      function w(t) {
        return "M" + t[0][0] + " " + t[0][1] + " " + t[1][0] + " " + t[1][1];
      }
      for (
        g = _.axis_rotated
          ? function (t) {
              return d(t.value);
            }
          : function (t) {
              return c(t.x);
            },
          p = _.axis_rotated
            ? function (t) {
                return c(t.x);
              }
            : function (t) {
                return d(t.value);
              },
          r = f.isTimeSeries()
            ? function (t, e, i, n) {
                var r = t.x.getTime(),
                  a = e.x - t.x,
                  o = new Date(r + a * i),
                  s = new Date(r + a * (i + n));
                return w(
                  _.axis_rotated
                    ? [
                        [d(l(i)), c(o)],
                        [d(l(i + n)), c(s)],
                      ]
                    : [
                        [c(o), d(l(i))],
                        [c(s), d(l(i + n))],
                      ]
                );
              }
            : function (t, e, i, n) {
                return w(
                  _.axis_rotated
                    ? [
                        [d(l(i), !0), c(a(i))],
                        [d(l(i + n), !0), c(a(i + n))],
                      ]
                    : [
                        [c(a(i), !0), d(l(i))],
                        [c(a(i + n), !0), d(l(i + n))],
                      ]
                );
              },
          i = 0;
        i < t.length;
        i++
      ) {
        if (v(m) || !S(t[i].x, m)) x += " " + g(t[i]) + " " + p(t[i]);
        else
          for (
            a = f.getScale(t[i - 1].x + y, t[i].x + y, f.isTimeSeries()),
              l = f.getScale(t[i - 1].value, t[i].value),
              o = c(t[i].x) - c(t[i - 1].x),
              s = d(t[i].value) - d(t[i - 1].value),
              h = 2 * (u = 2 / Math.sqrt(Math.pow(o, 2) + Math.pow(s, 2))),
              n = u;
            n <= 1;
            n += h
          )
            x += r(t[i - 1], t[i], n, u);
        t[i].x;
      }
      return x;
    }),
    (l.prototype.updateArea = function (t) {
      var e = this,
        i = e.d3,
        n = e.main
          .selectAll("." + Y.areas)
          .selectAll("." + Y.area)
          .data(e.lineData.bind(e)),
        r = n
          .enter()
          .append("path")
          .attr("class", e.classArea.bind(e))
          .style("fill", e.color)
          .style("opacity", function () {
            return (e.orgAreaOpacity = +i.select(this).style("opacity")), 0;
          });
      (e.mainArea = r.merge(n).style("opacity", e.orgAreaOpacity)),
        n.exit().transition().duration(t).style("opacity", 0);
    }),
    (l.prototype.redrawArea = function (t, e, i) {
      return [
        (e ? this.mainArea.transition(i) : this.mainArea)
          .attr("d", t)
          .style("fill", this.color)
          .style("opacity", this.orgAreaOpacity),
      ];
    }),
    (l.prototype.generateDrawArea = function (t, e) {
      var r = this,
        a = r.config,
        o = r.d3.area(),
        i = r.generateGetAreaPoints(t, e),
        n = e ? r.getSubYScale : r.getYScale,
        s = function (t) {
          return (e ? r.subxx : r.xx).call(r, t);
        },
        c = function (t, e) {
          return 0 < a.data_groups.length
            ? i(t, e)[0][1]
            : n.call(r, t.id)(r.getAreaBaseValue(t.id));
        },
        d = function (t, e) {
          return 0 < a.data_groups.length
            ? i(t, e)[1][1]
            : n.call(r, t.id)(t.value);
        };
      return (
        (o = a.axis_rotated
          ? o.x0(c).x1(d).y(s)
          : o
              .x(s)
              .y0(a.area_above ? 0 : c)
              .y1(d)),
        a.line_connectNull ||
          (o = o.defined(function (t) {
            return null !== t.value;
          })),
        function (t) {
          var e = a.line_connectNull ? r.filterRemoveNull(t.values) : t.values,
            i = 0,
            n = 0;
          return (
            (r.isAreaType(t)
              ? (r.isStepType(t) && (e = r.convertValuesToStep(e)),
                o.curve(r.getInterpolate(t))(e))
              : (e[0] &&
                  ((i = r.x(e[0].x)), (n = r.getYScale(t.id)(e[0].value))),
                a.axis_rotated ? "M " + n + " " + i : "M " + i + " " + n)) ||
            "M 0 0"
          );
        }
      );
    }),
    (l.prototype.getAreaBaseValue = function () {
      return 0;
    }),
    (l.prototype.generateGetAreaPoints = function (t, e) {
      var o = this,
        s = o.config,
        i = t.__max__ + 1,
        c = o.getShapeX(0, i, t, !!e),
        d = o.getShapeY(!!e),
        l = o.getShapeOffset(o.isAreaType, t, !!e),
        u = e ? o.getSubYScale : o.getYScale;
      return function (t, e) {
        var i = u.call(o, t.id)(0),
          n = l(t, e) || i,
          r = c(t),
          a = d(t);
        return (
          s.axis_rotated &&
            ((0 < t.value && a < i) || (t.value < 0 && i < a)) &&
            (a = i),
          [
            [r, n],
            [r, a - (i - n)],
            [r, a - (i - n)],
            [r, n],
          ]
        );
      };
    }),
    (l.prototype.updateCircle = function (t, e) {
      var i = this,
        n = i.main
          .selectAll("." + Y.circles)
          .selectAll("." + Y.circle)
          .data(i.lineOrScatterData.bind(i)),
        r = n
          .enter()
          .append("circle")
          .attr("class", i.classCircle.bind(i))
          .attr("cx", t)
          .attr("cy", e)
          .attr("r", i.pointR.bind(i))
          .style("fill", i.color);
      (i.mainCircle = r
        .merge(n)
        .style("opacity", i.initialOpacityForCircle.bind(i))),
        n.exit().style("opacity", 0);
    }),
    (l.prototype.redrawCircle = function (t, e, i, n) {
      var r = this,
        a = r.main.selectAll("." + Y.selectedCircle);
      return [
        (i ? r.mainCircle.transition(n) : r.mainCircle)
          .style("opacity", this.opacityForCircle.bind(r))
          .style("fill", r.color)
          .attr("cx", t)
          .attr("cy", e),
        (i ? a.transition(n) : a).attr("cx", t).attr("cy", e),
      ];
    }),
    (l.prototype.circleX = function (t) {
      return t.x || 0 === t.x ? this.x(t.x) : null;
    }),
    (l.prototype.updateCircleY = function () {
      var t,
        i,
        e = this;
      0 < e.config.data_groups.length
        ? ((t = e.getShapeIndices(e.isLineType)),
          (i = e.generateGetLinePoints(t)),
          (e.circleY = function (t, e) {
            return i(t, e)[0][1];
          }))
        : (e.circleY = function (t) {
            return e.getYScale(t.id)(t.value);
          });
    }),
    (l.prototype.getCircles = function (t, e) {
      return (
        e
          ? this.main.selectAll(
              "." + Y.circles + this.getTargetSelectorSuffix(e)
            )
          : this.main
      ).selectAll("." + Y.circle + (P(t) ? "-" + t : ""));
    }),
    (l.prototype.expandCircles = function (t, e, i) {
      var n = this.pointExpandedR.bind(this);
      i && this.unexpandCircles(),
        this.getCircles(t, e).classed(Y.EXPANDED, !0).attr("r", n);
    }),
    (l.prototype.unexpandCircles = function (t) {
      var e = this,
        i = e.pointR.bind(e);
      e.getCircles(t)
        .filter(function () {
          return e.d3.select(this).classed(Y.EXPANDED);
        })
        .classed(Y.EXPANDED, !1)
        .attr("r", i);
    }),
    (l.prototype.pointR = function (t) {
      var e = this.config;
      return this.isStepType(t) ? 0 : h(e.point_r) ? e.point_r(t) : e.point_r;
    }),
    (l.prototype.pointExpandedR = function (t) {
      var e = this.config;
      return e.point_focus_expand_enabled
        ? h(e.point_focus_expand_r)
          ? e.point_focus_expand_r(t)
          : e.point_focus_expand_r
          ? e.point_focus_expand_r
          : 1.75 * this.pointR(t)
        : this.pointR(t);
    }),
    (l.prototype.pointSelectR = function (t) {
      var e = this.config;
      return h(e.point_select_r)
        ? e.point_select_r(t)
        : e.point_select_r
        ? e.point_select_r
        : 4 * this.pointR(t);
    }),
    (l.prototype.isWithinCircle = function (t, e) {
      var i = this.d3,
        n = i.mouse(t),
        r = i.select(t),
        a = +r.attr("cx"),
        o = +r.attr("cy");
      return Math.sqrt(Math.pow(a - n[0], 2) + Math.pow(o - n[1], 2)) < e;
    }),
    (l.prototype.isWithinStep = function (t, e) {
      return Math.abs(e - this.d3.mouse(t)[1]) < 30;
    }),
    (l.prototype.getCurrentWidth = function () {
      var t = this.config;
      return t.size_width ? t.size_width : this.getParentWidth();
    }),
    (l.prototype.getCurrentHeight = function () {
      var t = this.config,
        e = t.size_height ? t.size_height : this.getParentHeight();
      return 0 < e
        ? e
        : 320 / (this.hasType("gauge") && !t.gauge_fullCircle ? 2 : 1);
    }),
    (l.prototype.getCurrentPaddingTop = function () {
      var t = this.config,
        e = P(t.padding_top) ? t.padding_top : 0;
      return (
        this.title && this.title.node() && (e += this.getTitlePadding()), e
      );
    }),
    (l.prototype.getCurrentPaddingBottom = function () {
      var t = this.config;
      return P(t.padding_bottom) ? t.padding_bottom : 0;
    }),
    (l.prototype.getCurrentPaddingLeft = function (t) {
      var e = this.config;
      return P(e.padding_left)
        ? e.padding_left
        : e.axis_rotated
        ? !e.axis_x_show || e.axis_x_inner
          ? 1
          : Math.max(r(this.getAxisWidthByAxisId("x", t)), 40)
        : !e.axis_y_show || e.axis_y_inner
        ? this.axis.getYAxisLabelPosition().isOuter
          ? 30
          : 1
        : r(this.getAxisWidthByAxisId("y", t));
    }),
    (l.prototype.getCurrentPaddingRight = function () {
      var t = this,
        e = t.config,
        i = t.isLegendRight ? t.getLegendWidth() + 20 : 0;
      return P(e.padding_right)
        ? e.padding_right + 1
        : e.axis_rotated
        ? 10 + i
        : !e.axis_y2_show || e.axis_y2_inner
        ? 2 + i + (t.axis.getY2AxisLabelPosition().isOuter ? 20 : 0)
        : r(t.getAxisWidthByAxisId("y2")) + i;
    }),
    (l.prototype.getParentRectValue = function (e) {
      for (var i, n = this.selectChart.node(); n && "BODY" !== n.tagName; ) {
        try {
          i = n.getBoundingClientRect()[e];
        } catch (t) {
          "width" === e && (i = n.offsetWidth);
        }
        if (i) break;
        n = n.parentNode;
      }
      return i;
    }),
    (l.prototype.getParentWidth = function () {
      return this.getParentRectValue("width");
    }),
    (l.prototype.getParentHeight = function () {
      var t = this.selectChart.style("height");
      return 0 < t.indexOf("px") ? +t.replace("px", "") : 0;
    }),
    (l.prototype.getSvgLeft = function (t) {
      var e = this,
        i = e.config,
        n = i.axis_rotated || (!i.axis_rotated && !i.axis_y_inner),
        r = i.axis_rotated ? Y.axisX : Y.axisY,
        a = e.main.select("." + r).node(),
        o = a && n ? a.getBoundingClientRect() : { right: 0 },
        s = e.selectChart.node().getBoundingClientRect(),
        c = e.hasArcType(),
        d = o.right - s.left - (c ? 0 : e.getCurrentPaddingLeft(t));
      return 0 < d ? d : 0;
    }),
    (l.prototype.getAxisWidthByAxisId = function (t, e) {
      var i = this.axis.getLabelPositionById(t);
      return this.axis.getMaxTickWidth(t, e) + (i.isInner ? 20 : 40);
    }),
    (l.prototype.getHorizontalAxisHeight = function (t) {
      var e = this,
        i = e.config,
        n = 30;
      return "x" !== t || i.axis_x_show
        ? "x" === t && i.axis_x_height
          ? i.axis_x_height
          : "y" !== t || i.axis_y_show
          ? "y2" !== t || i.axis_y2_show
            ? ("x" === t &&
                !i.axis_rotated &&
                i.axis_x_tick_rotate &&
                (n =
                  30 +
                  e.axis.getMaxTickWidth(t) *
                    Math.cos(
                      (Math.PI * (90 - Math.abs(i.axis_x_tick_rotate))) / 180
                    )),
              "y" === t &&
                i.axis_rotated &&
                i.axis_y_tick_rotate &&
                (n =
                  30 +
                  e.axis.getMaxTickWidth(t) *
                    Math.cos(
                      (Math.PI * (90 - Math.abs(i.axis_y_tick_rotate))) / 180
                    )),
              n +
                (e.axis.getLabelPositionById(t).isInner ? 0 : 10) +
                ("y2" === t ? -10 : 0))
            : e.rotated_padding_top
          : !i.legend_show || e.isLegendRight || e.isLegendInset
          ? 1
          : 10
        : 8;
    }),
    (l.prototype.initBrush = function (t) {
      var r = this,
        e = r.d3;
      return (
        (r.brush = (r.config.axis_rotated ? e.brushY() : e.brushX())
          .on("brush", function () {
            var t = e.event.sourceEvent;
            (t && "zoom" === t.type) || r.redrawForBrush();
          })
          .on("end", function () {
            var t = e.event.sourceEvent;
            (t && "zoom" === t.type) ||
              (r.brush.empty() && t && "end" !== t.type && r.brush.clear());
          })),
        (r.brush.updateExtent = function () {
          var t,
            e = this.scale.range();
          return (
            (t = r.config.axis_rotated
              ? [
                  [0, e[0]],
                  [r.width2, e[1]],
                ]
              : [
                  [e[0], 0],
                  [e[1], r.height2],
                ]),
            this.extent(t),
            this
          );
        }),
        (r.brush.updateScale = function (t) {
          return (this.scale = t), this;
        }),
        (r.brush.update = function (t) {
          this.updateScale(t || r.subX).updateExtent(),
            r.context.select("." + Y.brush).call(this);
        }),
        (r.brush.clear = function () {
          r.context.select("." + Y.brush).call(r.brush.move, null);
        }),
        (r.brush.selection = function () {
          return e.brushSelection(r.context.select("." + Y.brush).node());
        }),
        (r.brush.selectionAsValue = function (t, e) {
          var i, n;
          return t
            ? (r.context &&
                ((i = [this.scale(t[0]), this.scale(t[1])]),
                (n = r.context.select("." + Y.brush)),
                e && (n = n.transition()),
                r.brush.move(n, i)),
              [])
            : ((i = r.brush.selection() || [0, 0]),
              [this.scale.invert(i[0]), this.scale.invert(i[1])]);
        }),
        (r.brush.empty = function () {
          var t = r.brush.selection();
          return !t || t[0] === t[1];
        }),
        r.brush.updateScale(t)
      );
    }),
    (l.prototype.initSubchart = function () {
      var t = this,
        e = t.config,
        i = (t.context = t.svg
          .append("g")
          .attr("transform", t.getTranslate("context"))),
        n = e.subchart_show ? "visible" : "hidden";
      i.style("visibility", n),
        i
          .append("g")
          .attr("clip-path", t.clipPathForSubchart)
          .attr("class", Y.chart),
        i
          .select("." + Y.chart)
          .append("g")
          .attr("class", Y.chartBars),
        i
          .select("." + Y.chart)
          .append("g")
          .attr("class", Y.chartLines),
        i.append("g").attr("clip-path", t.clipPath).attr("class", Y.brush),
        (t.axes.subx = i
          .append("g")
          .attr("class", Y.axisX)
          .attr("transform", t.getTranslate("subx"))
          .attr("clip-path", e.axis_rotated ? "" : t.clipPathForXAxis));
    }),
    (l.prototype.initSubchartBrush = function () {
      this.initBrush(this.subX).updateExtent(),
        this.context.select("." + Y.brush).call(this.brush);
    }),
    (l.prototype.updateTargetsForSubchart = function (t) {
      var e,
        i,
        n,
        r,
        a = this,
        o = a.context,
        s = a.config,
        c = a.classChartBar.bind(a),
        d = a.classBars.bind(a),
        l = a.classChartLine.bind(a),
        u = a.classLines.bind(a),
        h = a.classAreas.bind(a);
      s.subchart_show &&
        ((n = (r = o
          .select("." + Y.chartBars)
          .selectAll("." + Y.chartBar)
          .data(t))
          .enter()
          .append("g")
          .style("opacity", 0))
          .merge(r)
          .attr("class", c),
        n.append("g").attr("class", d),
        (e = (i = o
          .select("." + Y.chartLines)
          .selectAll("." + Y.chartLine)
          .data(t))
          .enter()
          .append("g")
          .style("opacity", 0))
          .merge(i)
          .attr("class", l),
        e.append("g").attr("class", u),
        e.append("g").attr("class", h),
        o
          .selectAll("." + Y.brush + " rect")
          .attr(
            s.axis_rotated ? "width" : "height",
            s.axis_rotated ? a.width2 : a.height2
          ));
    }),
    (l.prototype.updateBarForSubchart = function (t) {
      var e = this,
        i = e.context
          .selectAll("." + Y.bars)
          .selectAll("." + Y.bar)
          .data(e.barData.bind(e)),
        n = i
          .enter()
          .append("path")
          .attr("class", e.classBar.bind(e))
          .style("stroke", "none")
          .style("fill", e.color);
      i.exit().transition().duration(t).style("opacity", 0).remove(),
        (e.contextBar = n.merge(i).style("opacity", e.initialOpacity.bind(e)));
    }),
    (l.prototype.redrawBarForSubchart = function (t, e, i) {
      (e
        ? this.contextBar.transition(Math.random().toString()).duration(i)
        : this.contextBar
      )
        .attr("d", t)
        .style("opacity", 1);
    }),
    (l.prototype.updateLineForSubchart = function (t) {
      var e = this,
        i = e.context
          .selectAll("." + Y.lines)
          .selectAll("." + Y.line)
          .data(e.lineData.bind(e)),
        n = i
          .enter()
          .append("path")
          .attr("class", e.classLine.bind(e))
          .style("stroke", e.color);
      i.exit().transition().duration(t).style("opacity", 0).remove(),
        (e.contextLine = n.merge(i).style("opacity", e.initialOpacity.bind(e)));
    }),
    (l.prototype.redrawLineForSubchart = function (t, e, i) {
      (e
        ? this.contextLine.transition(Math.random().toString()).duration(i)
        : this.contextLine
      )
        .attr("d", t)
        .style("opacity", 1);
    }),
    (l.prototype.updateAreaForSubchart = function (t) {
      var e = this,
        i = e.d3,
        n = e.context
          .selectAll("." + Y.areas)
          .selectAll("." + Y.area)
          .data(e.lineData.bind(e)),
        r = n
          .enter()
          .append("path")
          .attr("class", e.classArea.bind(e))
          .style("fill", e.color)
          .style("opacity", function () {
            return (e.orgAreaOpacity = +i.select(this).style("opacity")), 0;
          });
      n.exit().transition().duration(t).style("opacity", 0).remove(),
        (e.contextArea = r.merge(n).style("opacity", 0));
    }),
    (l.prototype.redrawAreaForSubchart = function (t, e, i) {
      (e
        ? this.contextArea.transition(Math.random().toString()).duration(i)
        : this.contextArea
      )
        .attr("d", t)
        .style("fill", this.color)
        .style("opacity", this.orgAreaOpacity);
    }),
    (l.prototype.redrawSubchart = function (t, e, i, n, r, a, o) {
      var s,
        c,
        d,
        l = this,
        u = l.d3,
        h = l.config;
      l.context.style("visibility", h.subchart_show ? "visible" : "hidden"),
        h.subchart_show &&
          (u.event &&
            "zoom" === u.event.type &&
            l.brush.selectionAsValue(l.x.orgDomain()),
          t &&
            (l.brush.empty() || l.brush.selectionAsValue(l.x.orgDomain()),
            (s = l.generateDrawArea(r, !0)),
            (c = l.generateDrawBar(a, !0)),
            (d = l.generateDrawLine(o, !0)),
            l.updateBarForSubchart(i),
            l.updateLineForSubchart(i),
            l.updateAreaForSubchart(i),
            l.redrawBarForSubchart(c, i, i),
            l.redrawLineForSubchart(d, i, i),
            l.redrawAreaForSubchart(s, i, i)));
    }),
    (l.prototype.redrawForBrush = function () {
      var t,
        e = this,
        i = e.x,
        n = e.d3;
      e.redraw({
        withTransition: !1,
        withY: e.config.zoom_rescale,
        withSubchart: !1,
        withUpdateXDomain: !0,
        withEventRect: !1,
        withDimension: !1,
      }),
        (t = n.event.selection || e.brush.scale.range()),
        e.main
          .select("." + Y.eventRect)
          .call(
            e.zoom.transform,
            n.zoomIdentity.scale(e.width / (t[1] - t[0])).translate(-t[0], 0)
          ),
        e.config.subchart_onbrush.call(e.api, i.orgDomain());
    }),
    (l.prototype.transformContext = function (t, e) {
      var i;
      e && e.axisSubX
        ? (i = e.axisSubX)
        : ((i = this.context.select("." + Y.axisX)), t && (i = i.transition())),
        this.context.attr("transform", this.getTranslate("context")),
        i.attr("transform", this.getTranslate("subx"));
    }),
    (l.prototype.getDefaultSelection = function () {
      var t = this,
        e = t.config,
        i = h(e.axis_x_selection)
          ? e.axis_x_selection(t.getXDomain(t.data.targets))
          : e.axis_x_selection;
      return (
        t.isTimeSeries() && (i = [t.parseDate(i[0]), t.parseDate(i[1])]), i
      );
    }),
    (l.prototype.initText = function () {
      this.main
        .select("." + Y.chart)
        .append("g")
        .attr("class", Y.chartTexts),
        (this.mainText = this.d3.selectAll([]));
    }),
    (l.prototype.updateTargetsForText = function (t) {
      var e = this,
        i = e.classChartText.bind(e),
        n = e.classTexts.bind(e),
        r = e.classFocus.bind(e),
        a = e.main
          .select("." + Y.chartTexts)
          .selectAll("." + Y.chartText)
          .data(t),
        o = a
          .enter()
          .append("g")
          .attr("class", i)
          .style("opacity", 0)
          .style("pointer-events", "none");
      o.append("g").attr("class", n),
        o.merge(a).attr("class", function (t) {
          return i(t) + r(t);
        });
    }),
    (l.prototype.updateText = function (t, e, i) {
      var n = this,
        r = n.config,
        a = n.barOrLineData.bind(n),
        o = n.classText.bind(n),
        s = n.main
          .selectAll("." + Y.texts)
          .selectAll("." + Y.text)
          .data(a),
        c = s
          .enter()
          .append("text")
          .attr("class", o)
          .attr("text-anchor", function (t) {
            return r.axis_rotated ? (t.value < 0 ? "end" : "start") : "middle";
          })
          .style("stroke", "none")
          .attr("x", t)
          .attr("y", e)
          .style("fill", function (t) {
            return n.color(t);
          })
          .style("fill-opacity", 0);
      (n.mainText = c.merge(s).text(function (t, e, i) {
        return n.dataLabelFormat(t.id)(t.value, t.id, e, i);
      })),
        s.exit().transition().duration(i).style("fill-opacity", 0).remove();
    }),
    (l.prototype.redrawText = function (t, e, i, n, r) {
      return [
        (n ? this.mainText.transition(r) : this.mainText)
          .attr("x", t)
          .attr("y", e)
          .style("fill", this.color)
          .style("fill-opacity", i ? 0 : this.opacityForText.bind(this)),
      ];
    }),
    (l.prototype.getTextRect = function (t, e, i) {
      var n,
        r = this.d3.select("body").append("div").classed("c3", !0),
        a = r
          .append("svg")
          .style("visibility", "hidden")
          .style("position", "fixed")
          .style("top", 0)
          .style("left", 0),
        o = this.d3.select(i).style("font");
      return (
        a
          .selectAll(".dummy")
          .data([t])
          .enter()
          .append("text")
          .classed(e || "", !0)
          .style("font", o)
          .text(t)
          .each(function () {
            n = this.getBoundingClientRect();
          }),
        r.remove(),
        n
      );
    }),
    (l.prototype.generateXYForText = function (t, e, i, n) {
      var r = this,
        a = r.generateGetAreaPoints(t, !1),
        o = r.generateGetBarPoints(e, !1),
        s = r.generateGetLinePoints(i, !1),
        c = n ? r.getXForText : r.getYForText;
      return function (t, e) {
        var i = r.isAreaType(t) ? a : r.isBarType(t) ? o : s;
        return c.call(r, i(t, e), t, this);
      };
    }),
    (l.prototype.getXForText = function (t, e, i) {
      var n,
        r,
        a = this,
        o = i.getBoundingClientRect();
      return (
        (n = a.config.axis_rotated
          ? ((r = a.isBarType(e) ? 4 : 6), t[2][1] + r * (e.value < 0 ? -1 : 1))
          : a.hasType("bar")
          ? (t[2][0] + t[0][0]) / 2
          : t[0][0]),
        null === e.value &&
          (n > a.width ? (n = a.width - o.width) : n < 0 && (n = 4)),
        n
      );
    }),
    (l.prototype.getYForText = function (t, e, i) {
      var n,
        r = this,
        a = i.getBoundingClientRect();
      return (
        r.config.axis_rotated
          ? (n = (t[0][0] + t[2][0] + 0.6 * a.height) / 2)
          : ((n = t[2][1]),
            e.value < 0 || (0 === e.value && !r.hasPositiveValue)
              ? ((n += a.height),
                r.isBarType(e) && r.isSafari()
                  ? (n -= 3)
                  : !r.isBarType(e) && r.isChrome() && (n += 3))
              : (n += r.isBarType(e) ? -3 : -6)),
        null !== e.value ||
          r.config.axis_rotated ||
          (n < a.height
            ? (n = a.height)
            : n > this.height && (n = this.height - 4)),
        n
      );
    }),
    (l.prototype.initTitle = function () {
      this.title = this.svg
        .append("text")
        .text(this.config.title_text)
        .attr("class", this.CLASS.title);
    }),
    (l.prototype.redrawTitle = function () {
      var t = this;
      t.title.attr("x", t.xForTitle.bind(t)).attr("y", t.yForTitle.bind(t));
    }),
    (l.prototype.xForTitle = function () {
      var t = this,
        e = t.config,
        i = e.title_position || "left";
      return 0 <= i.indexOf("right")
        ? t.currentWidth -
            t.getTextRect(
              t.title.node().textContent,
              t.CLASS.title,
              t.title.node()
            ).width -
            e.title_padding.right
        : 0 <= i.indexOf("center")
        ? (t.currentWidth -
            t.getTextRect(
              t.title.node().textContent,
              t.CLASS.title,
              t.title.node()
            ).width) /
          2
        : e.title_padding.left;
    }),
    (l.prototype.yForTitle = function () {
      var t = this;
      return (
        t.config.title_padding.top +
        t.getTextRect(t.title.node().textContent, t.CLASS.title, t.title.node())
          .height
      );
    }),
    (l.prototype.getTitlePadding = function () {
      return this.yForTitle() + this.config.title_padding.bottom;
    }),
    (l.prototype.initTooltip = function () {
      var t,
        e = this,
        i = e.config;
      if (
        ((e.tooltip = e.selectChart
          .style("position", "relative")
          .append("div")
          .attr("class", Y.tooltipContainer)
          .style("position", "absolute")
          .style("pointer-events", "none")
          .style("display", "none")),
        i.tooltip_init_show)
      ) {
        if (e.isTimeSeries() && c(i.tooltip_init_x)) {
          for (
            i.tooltip_init_x = e.parseDate(i.tooltip_init_x), t = 0;
            t < e.data.targets[0].values.length &&
            e.data.targets[0].values[t].x - i.tooltip_init_x != 0;
            t++
          );
          i.tooltip_init_x = t;
        }
        e.tooltip.html(
          i.tooltip_contents.call(
            e,
            e.data.targets.map(function (t) {
              return e.addName(t.values[i.tooltip_init_x]);
            }),
            e.axis.getXAxisTickFormat(),
            e.getYFormat(e.hasArcType()),
            e.color
          )
        ),
          e.tooltip
            .style("top", i.tooltip_init_position.top)
            .style("left", i.tooltip_init_position.left)
            .style("display", "block");
      }
    }),
    (l.prototype.getTooltipSortFunction = function () {
      var t = this,
        e = t.config;
      if (0 !== e.data_groups.length && void 0 === e.tooltip_order) {
        var i = t.orderTargets(t.data.targets).map(function (t) {
          return t.id;
        });
        return (
          (t.isOrderAsc() || t.isOrderDesc()) && (i = i.reverse()),
          function (t, e) {
            return i.indexOf(t.id) - i.indexOf(e.id);
          }
        );
      }
      var n = e.tooltip_order;
      void 0 === n && (n = e.data_order);
      var r = function (t) {
        return t ? t.value : null;
      };
      if (c(n) && "asc" === n.toLowerCase())
        return function (t, e) {
          return r(t) - r(e);
        };
      if (c(n) && "desc" === n.toLowerCase())
        return function (t, e) {
          return r(e) - r(t);
        };
      if (h(n)) {
        var a = n;
        return (
          void 0 === e.tooltip_order &&
            (a = function (t, e) {
              return n(
                t ? { id: t.id, values: [t] } : null,
                e ? { id: e.id, values: [e] } : null
              );
            }),
          a
        );
      }
      return o(n)
        ? function (t, e) {
            return n.indexOf(t.id) - n.indexOf(e.id);
          }
        : void 0;
    }),
    (l.prototype.getTooltipContent = function (t, e, i, n) {
      var r,
        a,
        o,
        s,
        c,
        d,
        l = this,
        u = l.config,
        h = u.tooltip_format_title || e,
        g =
          u.tooltip_format_name ||
          function (t) {
            return t;
          },
        p = u.tooltip_format_value || i,
        f = this.getTooltipSortFunction();
      for (f && t.sort(f), a = 0; a < t.length; a++)
        if (
          t[a] &&
          (t[a].value || 0 === t[a].value) &&
          (r ||
            ((o = _(h ? h(t[a].x, t[a].index) : t[a].x)),
            (r =
              "<table class='" +
              l.CLASS.tooltip +
              "'>" +
              (o || 0 === o ? "<tr><th colspan='2'>" + o + "</th></tr>" : ""))),
          void 0 !== (s = _(p(t[a].value, t[a].ratio, t[a].id, t[a].index, t))))
        ) {
          if (null === t[a].name) continue;
          (c = _(g(t[a].name, t[a].ratio, t[a].id, t[a].index))),
            (d = l.levelColor ? l.levelColor(t[a].value) : n(t[a].id)),
            (r +=
              "<tr class='" +
              l.CLASS.tooltipName +
              "-" +
              l.getTargetSelectorSuffix(t[a].id) +
              "'>"),
            (r +=
              "<td class='name'><span style='background-color:" +
              d +
              "'></span>" +
              c +
              "</td>"),
            (r += "<td class='value'>" + s + "</td>"),
            (r += "</tr>");
        }
      return r + "</table>";
    }),
    (l.prototype.tooltipPosition = function (t, e, i, n) {
      var r,
        a,
        o,
        s,
        c,
        d = this,
        l = d.config,
        u = d.d3,
        h = d.hasArcType(),
        g = u.mouse(n);
      return (
        h
          ? ((a =
              (d.width - (d.isLegendRight ? d.getLegendWidth() : 0)) / 2 +
              g[0]),
            (s = (d.hasType("gauge") ? d.height : d.height / 2) + g[1] + 20))
          : ((r = d.getSvgLeft(!0)),
            (s = l.axis_rotated
              ? ((o = (a = r + g[0] + 100) + e),
                (c = d.currentWidth - d.getCurrentPaddingRight()),
                d.x(t[0].x) + 20)
              : ((o =
                  (a = r + d.getCurrentPaddingLeft(!0) + d.x(t[0].x) + 20) + e),
                (c = r + d.currentWidth - d.getCurrentPaddingRight()),
                g[1] + 15)),
            c < o && (a -= o - c + 20),
            s + i > d.currentHeight && (s -= i + 30)),
        s < 0 && (s = 0),
        { top: s, left: a }
      );
    }),
    (l.prototype.showTooltip = function (t, e) {
      var i,
        n,
        r,
        a = this,
        o = a.config,
        s = a.hasArcType(),
        c = t.filter(function (t) {
          return t && P(t.value);
        }),
        d = o.tooltip_position || l.prototype.tooltipPosition;
      0 !== c.length &&
        o.tooltip_show &&
        (a.tooltip
          .html(
            o.tooltip_contents.call(
              a,
              t,
              a.axis.getXAxisTickFormat(),
              a.getYFormat(s),
              a.color
            )
          )
          .style("display", "block"),
        (i = a.tooltip.property("offsetWidth")),
        (n = a.tooltip.property("offsetHeight")),
        (r = d.call(this, c, i, n, e)),
        a.tooltip.style("top", r.top + "px").style("left", r.left + "px"));
    }),
    (l.prototype.hideTooltip = function () {
      this.tooltip.style("display", "none");
    }),
    (l.prototype.setTargetType = function (t, e) {
      var i = this,
        n = i.config;
      i.mapToTargetIds(t).forEach(function (t) {
        (i.withoutFadeIn[t] = e === n.data_types[t]), (n.data_types[t] = e);
      }),
        t || (n.data_type = e);
    }),
    (l.prototype.hasType = function (i, t) {
      var n = this.config.data_types,
        r = !1;
      return (
        (t = t || this.data.targets) && t.length
          ? t.forEach(function (t) {
              var e = n[t.id];
              ((e && 0 <= e.indexOf(i)) || (!e && "line" === i)) && (r = !0);
            })
          : Object.keys(n).length
          ? Object.keys(n).forEach(function (t) {
              n[t] === i && (r = !0);
            })
          : (r = this.config.data_type === i),
        r
      );
    }),
    (l.prototype.hasArcType = function (t) {
      return (
        this.hasType("pie", t) ||
        this.hasType("donut", t) ||
        this.hasType("gauge", t)
      );
    }),
    (l.prototype.isLineType = function (t) {
      var e = this.config,
        i = c(t) ? t : t.id;
      return (
        !e.data_types[i] ||
        0 <=
          [
            "line",
            "spline",
            "area",
            "area-spline",
            "step",
            "area-step",
          ].indexOf(e.data_types[i])
      );
    }),
    (l.prototype.isStepType = function (t) {
      var e = c(t) ? t : t.id;
      return 0 <= ["step", "area-step"].indexOf(this.config.data_types[e]);
    }),
    (l.prototype.isSplineType = function (t) {
      var e = c(t) ? t : t.id;
      return 0 <= ["spline", "area-spline"].indexOf(this.config.data_types[e]);
    }),
    (l.prototype.isAreaType = function (t) {
      var e = c(t) ? t : t.id;
      return (
        0 <=
        ["area", "area-spline", "area-step"].indexOf(this.config.data_types[e])
      );
    }),
    (l.prototype.isBarType = function (t) {
      var e = c(t) ? t : t.id;
      return "bar" === this.config.data_types[e];
    }),
    (l.prototype.isScatterType = function (t) {
      var e = c(t) ? t : t.id;
      return "scatter" === this.config.data_types[e];
    }),
    (l.prototype.isPieType = function (t) {
      var e = c(t) ? t : t.id;
      return "pie" === this.config.data_types[e];
    }),
    (l.prototype.isGaugeType = function (t) {
      var e = c(t) ? t : t.id;
      return "gauge" === this.config.data_types[e];
    }),
    (l.prototype.isDonutType = function (t) {
      var e = c(t) ? t : t.id;
      return "donut" === this.config.data_types[e];
    }),
    (l.prototype.isArcType = function (t) {
      return this.isPieType(t) || this.isDonutType(t) || this.isGaugeType(t);
    }),
    (l.prototype.lineData = function (t) {
      return this.isLineType(t) ? [t] : [];
    }),
    (l.prototype.arcData = function (t) {
      return this.isArcType(t.data) ? [t] : [];
    }),
    (l.prototype.barData = function (t) {
      return this.isBarType(t) ? t.values : [];
    }),
    (l.prototype.lineOrScatterData = function (t) {
      return this.isLineType(t) || this.isScatterType(t) ? t.values : [];
    }),
    (l.prototype.barOrLineData = function (t) {
      return this.isBarType(t) || this.isLineType(t) ? t.values : [];
    }),
    (l.prototype.isSafari = function () {
      var t = window.navigator.userAgent;
      return 0 <= t.indexOf("Safari") && t.indexOf("Chrome") < 0;
    }),
    (l.prototype.isChrome = function () {
      return 0 <= window.navigator.userAgent.indexOf("Chrome");
    }),
    (l.prototype.initZoom = function () {
      var e,
        i = this,
        n = i.d3,
        r = i.config;
      return (
        (i.zoom = n
          .zoom()
          .on("start", function () {
            if ("scroll" === r.zoom_type) {
              var t = n.event.sourceEvent;
              (t && "brush" === t.type) ||
                ((e = t), r.zoom_onzoomstart.call(i.api, t));
            }
          })
          .on("zoom", function () {
            if ("scroll" === r.zoom_type) {
              var t = n.event.sourceEvent;
              (t && "brush" === t.type) ||
                (i.redrawForZoom(), r.zoom_onzoom.call(i.api, i.x.orgDomain()));
            }
          })
          .on("end", function () {
            if ("scroll" === r.zoom_type) {
              var t = n.event.sourceEvent;
              (t && "brush" === t.type) ||
                (t && e.clientX === t.clientX && e.clientY === t.clientY) ||
                r.zoom_onzoomend.call(i.api, i.x.orgDomain());
            }
          })),
        (i.zoom.updateDomain = function () {
          return (
            n.event &&
              n.event.transform &&
              i.x.domain(n.event.transform.rescaleX(i.subX).domain()),
            this
          );
        }),
        (i.zoom.updateExtent = function () {
          return (
            this.scaleExtent([1, 1 / 0])
              .translateExtent([
                [0, 0],
                [i.width, i.height],
              ])
              .extent([
                [0, 0],
                [i.width, i.height],
              ]),
            this
          );
        }),
        (i.zoom.update = function () {
          return this.updateExtent().updateDomain();
        }),
        i.zoom.updateExtent()
      );
    }),
    (l.prototype.zoomTransform = function (t) {
      var e = [this.x(t[0]), this.x(t[1])];
      return this.d3.zoomIdentity
        .scale(this.width / (e[1] - e[0]))
        .translate(-e[0], 0);
    }),
    (l.prototype.initDragZoom = function () {
      var e = this,
        i = e.d3,
        n = e.config,
        t = (e.context = e.svg),
        r = e.margin.left + 20.5,
        a = e.margin.top + 0.5;
      if ("drag" === n.zoom_type && n.zoom_enabled) {
        var o = function (t) {
            return (
              t &&
              t.map(function (t) {
                return e.x.invert(t);
              })
            );
          },
          s = (e.dragZoomBrush = i
            .brushX()
            .on("start", function () {
              e.api.unzoom(),
                e.svg.select("." + Y.dragZoom).classed("disabled", !1),
                n.zoom_onzoomstart.call(e.api, i.event.sourceEvent);
            })
            .on("brush", function () {
              n.zoom_onzoom.call(e.api, o(i.event.selection));
            })
            .on("end", function () {
              if (null != i.event.selection) {
                var t = o(i.event.selection);
                n.zoom_disableDefaultBehavior || e.api.zoom(t),
                  e.svg.select("." + Y.dragZoom).classed("disabled", !0),
                  n.zoom_onzoomend.call(e.api, t);
              }
            }));
        t.append("g")
          .classed(Y.dragZoom, !0)
          .attr("clip-path", e.clipPath)
          .attr("transform", "translate(" + r + "," + a + ")")
          .call(s);
      }
    }),
    (l.prototype.getZoomDomain = function () {
      var t = this.config,
        e = this.d3;
      return [
        e.min([this.orgXDomain[0], t.zoom_x_min]),
        e.max([this.orgXDomain[1], t.zoom_x_max]),
      ];
    }),
    (l.prototype.redrawForZoom = function () {
      var t = this,
        e = t.d3,
        i = t.config,
        n = t.zoom,
        r = t.x;
      i.zoom_enabled &&
        0 !== t.filterTargetsToShow(t.data.targets).length &&
        (n.update(),
        i.zoom_disableDefaultBehavior ||
          (t.isCategorized() &&
            r.orgDomain()[0] === t.orgXDomain[0] &&
            r.domain([t.orgXDomain[0] - 1e-10, r.orgDomain()[1]]),
          t.redraw({
            withTransition: !1,
            withY: i.zoom_rescale,
            withSubchart: !1,
            withEventRect: !1,
            withDimension: !1,
          }),
          e.event.sourceEvent &&
            "mousemove" === e.event.sourceEvent.type &&
            (t.cancelClick = !0)));
    }),
    t
  );
});
