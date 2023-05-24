(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    12: function (t, e, r) {
      t.exports = r(27);
    },
    25: function (t, e, r) {},
    27: function (t, e, r) {
      "use strict";
      r.r(e);
      var n = r(2),
        o = r.n(n),
        a = r(10),
        i = r.n(a),
        c = r(11),
        u = r(9),
        l = r(4);
      function s() {
        return o.a.createElement(
          "thead",
          null,
          o.a.createElement(
            "tr",
            null,
            o.a.createElement("th", null, "Name"),
            o.a.createElement("th", null, "Job"),
            o.a.createElement("th", null, "Id")
          )
        );
      }
      function h(t) {
        var e = t.characterData.map(function (e, r) {
          return o.a.createElement(
            "tr",
            { key: r },
            o.a.createElement("td", null, e.name),
            o.a.createElement("td", null, e.job),
            o.a.createElement("td", null, e.id),
            o.a.createElement(
              "td",
              null,
              o.a.createElement(
                "button",
                {
                  onClick: function () {
                    return t.removeCharacter(r);
                  },
                },
                "Delete"
              )
            )
          );
        });
        return o.a.createElement("tbody", null, e);
      }
      var f = function (t) {
        return o.a.createElement(
          "table",
          null,
          o.a.createElement(s, null),
          o.a.createElement(h, {
            characterData: t.characterData,
            removeCharacter: t.removeCharacter,
          })
        );
      };
      var p = function (t) {
          var e = Object(n.useState)({ name: "", job: "" }),
            r = Object(l.a)(e, 2),
            a = r[0],
            i = r[1];
          function c(t) {
            var e = t.target,
              r = e.name,
              n = e.value;
            i("job" === r ? { name: a.name, job: n } : { name: n, job: a.job });
          }
          return o.a.createElement(
            "form",
            null,
            o.a.createElement("label", { htmlFor: "name" }, "Name"),
            o.a.createElement("input", {
              type: "text",
              name: "name",
              id: "name",
              value: a.name,
              onChange: c,
            }),
            o.a.createElement("label", { htmlFor: "job" }, "Job"),
            o.a.createElement("input", {
              type: "text",
              name: "job",
              id: "job",
              value: a.job,
              onChange: c,
            }),
            o.a.createElement("input", {
              type: "button",
              value: "Submit",
              onClick: function () {
                t.handleSubmit(a), i({ name: "", job: "" });
              },
            })
          );
        },
        v = r(29);
      function m() {
        m = function () {
          return t;
        };
        var t = {},
          e = Object.prototype,
          r = e.hasOwnProperty,
          n =
            Object.defineProperty ||
            function (t, e, r) {
              t[e] = r.value;
            },
          o = "function" == typeof Symbol ? Symbol : {},
          a = o.iterator || "@@iterator",
          i = o.asyncIterator || "@@asyncIterator",
          c = o.toStringTag || "@@toStringTag";
        function u(t, e, r) {
          return (
            Object.defineProperty(t, e, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            }),
            t[e]
          );
        }
        try {
          u({}, "");
        } catch (N) {
          u = function (t, e, r) {
            return (t[e] = r);
          };
        }
        function l(t, e, r, o) {
          var a = e && e.prototype instanceof f ? e : f,
            i = Object.create(a.prototype),
            c = new k(o || []);
          return n(i, "_invoke", { value: x(t, r, c) }), i;
        }
        function s(t, e, r) {
          try {
            return { type: "normal", arg: t.call(e, r) };
          } catch (N) {
            return { type: "throw", arg: N };
          }
        }
        t.wrap = l;
        var h = {};
        function f() {}
        function p() {}
        function v() {}
        var d = {};
        u(d, a, function () {
          return this;
        });
        var y = Object.getPrototypeOf,
          g = y && y(y(_([])));
        g && g !== e && r.call(g, a) && (d = g);
        var b = (v.prototype = f.prototype = Object.create(d));
        function w(t) {
          ["next", "throw", "return"].forEach(function (e) {
            u(t, e, function (t) {
              return this._invoke(e, t);
            });
          });
        }
        function E(t, e) {
          var o;
          n(this, "_invoke", {
            value: function (n, a) {
              function i() {
                return new e(function (o, i) {
                  !(function n(o, a, i, c) {
                    var u = s(t[o], t, a);
                    if ("throw" !== u.type) {
                      var l = u.arg,
                        h = l.value;
                      return h && "object" == typeof h && r.call(h, "__await")
                        ? e.resolve(h.__await).then(
                            function (t) {
                              n("next", t, i, c);
                            },
                            function (t) {
                              n("throw", t, i, c);
                            }
                          )
                        : e.resolve(h).then(
                            function (t) {
                              (l.value = t), i(l);
                            },
                            function (t) {
                              return n("throw", t, i, c);
                            }
                          );
                    }
                    c(u.arg);
                  })(n, a, o, i);
                });
              }
              return (o = o ? o.then(i, i) : i());
            },
          });
        }
        function x(t, e, r) {
          var n = "suspendedStart";
          return function (o, a) {
            if ("executing" === n)
              throw new Error("Generator is already running");
            if ("completed" === n) {
              if ("throw" === o) throw a;
              return S();
            }
            for (r.method = o, r.arg = a; ; ) {
              var i = r.delegate;
              if (i) {
                var c = j(i, r);
                if (c) {
                  if (c === h) continue;
                  return c;
                }
              }
              if ("next" === r.method) r.sent = r._sent = r.arg;
              else if ("throw" === r.method) {
                if ("suspendedStart" === n) throw ((n = "completed"), r.arg);
                r.dispatchException(r.arg);
              } else "return" === r.method && r.abrupt("return", r.arg);
              n = "executing";
              var u = s(t, e, r);
              if ("normal" === u.type) {
                if (
                  ((n = r.done ? "completed" : "suspendedYield"), u.arg === h)
                )
                  continue;
                return { value: u.arg, done: r.done };
              }
              "throw" === u.type &&
                ((n = "completed"), (r.method = "throw"), (r.arg = u.arg));
            }
          };
        }
        function j(t, e) {
          var r = e.method,
            n = t.iterator[r];
          if (void 0 === n)
            return (
              (e.delegate = null),
              ("throw" === r &&
                t.iterator.return &&
                ((e.method = "return"),
                (e.arg = void 0),
                j(t, e),
                "throw" === e.method)) ||
                ("return" !== r &&
                  ((e.method = "throw"),
                  (e.arg = new TypeError(
                    "The iterator does not provide a '" + r + "' method"
                  )))),
              h
            );
          var o = s(n, t.iterator, e.arg);
          if ("throw" === o.type)
            return (
              (e.method = "throw"), (e.arg = o.arg), (e.delegate = null), h
            );
          var a = o.arg;
          return a
            ? a.done
              ? ((e[t.resultName] = a.value),
                (e.next = t.nextLoc),
                "return" !== e.method &&
                  ((e.method = "next"), (e.arg = void 0)),
                (e.delegate = null),
                h)
              : a
            : ((e.method = "throw"),
              (e.arg = new TypeError("iterator result is not an object")),
              (e.delegate = null),
              h);
        }
        function L(t) {
          var e = { tryLoc: t[0] };
          1 in t && (e.catchLoc = t[1]),
            2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
            this.tryEntries.push(e);
        }
        function O(t) {
          var e = t.completion || {};
          (e.type = "normal"), delete e.arg, (t.completion = e);
        }
        function k(t) {
          (this.tryEntries = [{ tryLoc: "root" }]),
            t.forEach(L, this),
            this.reset(!0);
        }
        function _(t) {
          if (t) {
            var e = t[a];
            if (e) return e.call(t);
            if ("function" == typeof t.next) return t;
            if (!isNaN(t.length)) {
              var n = -1,
                o = function e() {
                  for (; ++n < t.length; )
                    if (r.call(t, n)) return (e.value = t[n]), (e.done = !1), e;
                  return (e.value = void 0), (e.done = !0), e;
                };
              return (o.next = o);
            }
          }
          return { next: S };
        }
        function S() {
          return { value: void 0, done: !0 };
        }
        return (
          (p.prototype = v),
          n(b, "constructor", { value: v, configurable: !0 }),
          n(v, "constructor", { value: p, configurable: !0 }),
          (p.displayName = u(v, c, "GeneratorFunction")),
          (t.isGeneratorFunction = function (t) {
            var e = "function" == typeof t && t.constructor;
            return (
              !!e &&
              (e === p || "GeneratorFunction" === (e.displayName || e.name))
            );
          }),
          (t.mark = function (t) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(t, v)
                : ((t.__proto__ = v), u(t, c, "GeneratorFunction")),
              (t.prototype = Object.create(b)),
              t
            );
          }),
          (t.awrap = function (t) {
            return { __await: t };
          }),
          w(E.prototype),
          u(E.prototype, i, function () {
            return this;
          }),
          (t.AsyncIterator = E),
          (t.async = function (e, r, n, o, a) {
            void 0 === a && (a = Promise);
            var i = new E(l(e, r, n, o), a);
            return t.isGeneratorFunction(r)
              ? i
              : i.next().then(function (t) {
                  return t.done ? t.value : i.next();
                });
          }),
          w(b),
          u(b, c, "Generator"),
          u(b, a, function () {
            return this;
          }),
          u(b, "toString", function () {
            return "[object Generator]";
          }),
          (t.keys = function (t) {
            var e = Object(t),
              r = [];
            for (var n in e) r.push(n);
            return (
              r.reverse(),
              function t() {
                for (; r.length; ) {
                  var n = r.pop();
                  if (n in e) return (t.value = n), (t.done = !1), t;
                }
                return (t.done = !0), t;
              }
            );
          }),
          (t.values = _),
          (k.prototype = {
            constructor: k,
            reset: function (t) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = void 0),
                (this.done = !1),
                (this.delegate = null),
                (this.method = "next"),
                (this.arg = void 0),
                this.tryEntries.forEach(O),
                !t)
              )
                for (var e in this)
                  "t" === e.charAt(0) &&
                    r.call(this, e) &&
                    !isNaN(+e.slice(1)) &&
                    (this[e] = void 0);
            },
            stop: function () {
              this.done = !0;
              var t = this.tryEntries[0].completion;
              if ("throw" === t.type) throw t.arg;
              return this.rval;
            },
            dispatchException: function (t) {
              if (this.done) throw t;
              var e = this;
              function n(r, n) {
                return (
                  (i.type = "throw"),
                  (i.arg = t),
                  (e.next = r),
                  n && ((e.method = "next"), (e.arg = void 0)),
                  !!n
                );
              }
              for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                var a = this.tryEntries[o],
                  i = a.completion;
                if ("root" === a.tryLoc) return n("end");
                if (a.tryLoc <= this.prev) {
                  var c = r.call(a, "catchLoc"),
                    u = r.call(a, "finallyLoc");
                  if (c && u) {
                    if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                    if (this.prev < a.finallyLoc) return n(a.finallyLoc);
                  } else if (c) {
                    if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                  } else {
                    if (!u)
                      throw new Error("try statement without catch or finally");
                    if (this.prev < a.finallyLoc) return n(a.finallyLoc);
                  }
                }
              }
            },
            abrupt: function (t, e) {
              for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                var o = this.tryEntries[n];
                if (
                  o.tryLoc <= this.prev &&
                  r.call(o, "finallyLoc") &&
                  this.prev < o.finallyLoc
                ) {
                  var a = o;
                  break;
                }
              }
              a &&
                ("break" === t || "continue" === t) &&
                a.tryLoc <= e &&
                e <= a.finallyLoc &&
                (a = null);
              var i = a ? a.completion : {};
              return (
                (i.type = t),
                (i.arg = e),
                a
                  ? ((this.method = "next"), (this.next = a.finallyLoc), h)
                  : this.complete(i)
              );
            },
            complete: function (t, e) {
              if ("throw" === t.type) throw t.arg;
              return (
                "break" === t.type || "continue" === t.type
                  ? (this.next = t.arg)
                  : "return" === t.type
                  ? ((this.rval = this.arg = t.arg),
                    (this.method = "return"),
                    (this.next = "end"))
                  : "normal" === t.type && e && (this.next = e),
                h
              );
            },
            finish: function (t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var r = this.tryEntries[e];
                if (r.finallyLoc === t)
                  return this.complete(r.completion, r.afterLoc), O(r), h;
              }
            },
            catch: function (t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var r = this.tryEntries[e];
                if (r.tryLoc === t) {
                  var n = r.completion;
                  if ("throw" === n.type) {
                    var o = n.arg;
                    O(r);
                  }
                  return o;
                }
              }
              throw new Error("illegal catch attempt");
            },
            delegateYield: function (t, e, r) {
              return (
                (this.delegate = { iterator: _(t), resultName: e, nextLoc: r }),
                "next" === this.method && (this.arg = void 0),
                h
              );
            },
          }),
          t
        );
      }
      var d = function () {
          var t = Object(n.useState)([]),
            e = Object(l.a)(t, 2),
            r = e[0],
            a = e[1];
          function i() {
            return (i = Object(u.a)(
              m().mark(function t() {
                var e;
                return m().wrap(
                  function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (t.prev = 0),
                            (t.next = 3),
                            v.a.get("http://localhost:5000/users")
                          );
                        case 3:
                          return (
                            (e = t.sent), t.abrupt("return", e.data.users_list)
                          );
                        case 7:
                          return (
                            (t.prev = 7),
                            (t.t0 = t.catch(0)),
                            console.log(t.t0),
                            t.abrupt("return", !1)
                          );
                        case 11:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  null,
                  [[0, 7]]
                );
              })
            )).apply(this, arguments);
          }
          function s() {
            return (s = Object(u.a)(
              m().mark(function t(e) {
                var r;
                return m().wrap(
                  function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (t.prev = 0),
                            (t.next = 3),
                            v.a.post("http://localhost:5000/users", e)
                          );
                        case 3:
                          return (r = t.sent), t.abrupt("return", r);
                        case 7:
                          return (
                            (t.prev = 7),
                            (t.t0 = t.catch(0)),
                            console.log(t.t0),
                            t.abrupt("return", !1)
                          );
                        case 11:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  null,
                  [[0, 7]]
                );
              })
            )).apply(this, arguments);
          }
          return (
            Object(n.useEffect)(function () {
              (function () {
                return i.apply(this, arguments);
              })().then(function (t) {
                t && a(t);
              });
            }),
            o.a.createElement(
              "div",
              { className: "container" },
              o.a.createElement(f, {
                characterData: r,
                removeCharacter: function (t) {
                  var e = r.filter(
                    (function () {
                      var e = Object(u.a)(
                        m().mark(function e(r, n) {
                          return m().wrap(function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  if (n !== t) {
                                    e.next = 4;
                                    break;
                                  }
                                  return (
                                    console.log(r),
                                    (e.next = 4),
                                    v.a.delete(
                                      "http://localhost:5000/users/" + r.id
                                    )
                                  );
                                case 4:
                                  return e.abrupt("return", n !== t);
                                case 5:
                                case "end":
                                  return e.stop();
                              }
                          }, e);
                        })
                      );
                      return function (t, r) {
                        return e.apply(this, arguments);
                      };
                    })()
                  );
                  console.log("hit"), a(e);
                },
              }),
              o.a.createElement(p, {
                handleSubmit: function (t) {
                  (function (t) {
                    return s.apply(this, arguments);
                  })(t).then(function (e) {
                    e && 201 === e.status && a([].concat(Object(c.a)(r), [t]));
                  });
                },
              })
            )
          );
        },
        y = (r(25), document.getElementById("root"));
      i.a.createRoot(y).render(o.a.createElement(d, null));
    },
  },
  [[12, 2, 1]],
]);
//# sourceMappingURL=main.5dca97e5.chunk.js.map
