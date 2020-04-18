!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = t())
        : "function" == typeof define && define.amd
            ? define(t)
            : ((e = e || self).CodeMirror = t());
})(this, function () {
    "use strict";
    var e = navigator.userAgent,
        t = navigator.platform,
        g = /gecko\/\d/i.test(e),
        r = /MSIE \d/.test(e),
        n = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(e),
        i = /Edge\/(\d+)/.exec(e),
        x = r || n || i,
        C = x && (r ? document.documentMode || 6 : +(i || n)[1]),
        b = !i && /WebKit\//.test(e),
        o = b && /Qt\/\d+\.\d+/.test(e),
        l = !i && /Chrome\//.test(e),
        v = /Opera\//.test(e),
        a = /Apple Computer/.test(navigator.vendor),
        s = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(e),
        u = /PhantomJS/.test(e),
        c = !i && /AppleWebKit/.test(e) && /Mobile\/\w+/.test(e),
        h = /Android/.test(e),
        f = c || h || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(e),
        w = c || /Mac/.test(t),
        d = /\bCrOS\b/.test(e),
        p = /win/i.test(t),
        m = v && e.match(/Version\/(\d*\.\d*)/);
    (m = m && Number(m[1])) && 15 <= m && (b = !(v = !1));
    var y = w && (o || (v && (null == m || m < 12.11))),
        S = g || (x && 9 <= C);
    function L(e) {
        return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*");
    }
    var k,
        T = function (e, t) {
            var r = e.className,
                n = L(t).exec(r);
            if (n) {
                var i = r.slice(n.index + n[0].length);
                e.className = r.slice(0, n.index) + (i ? n[1] + i : "");
            }
        };
    function M(e) {
        for (var t = e.childNodes.length; 0 < t; --t) e.removeChild(e.firstChild);
        return e;
    }
    function N(e, t) {
        return M(e).appendChild(t);
    }
    function A(e, t, r, n) {
        var i = document.createElement(e);
        if (
            (r && (i.className = r), n && (i.style.cssText = n), "string" == typeof t)
        )
            i.appendChild(document.createTextNode(t));
        else if (t) for (var o = 0; o < t.length; ++o) i.appendChild(t[o]);
        return i;
    }
    function O(e, t, r, n) {
        var i = A(e, t, r, n);
        return i.setAttribute("role", "presentation"), i;
    }
    function D(e, t) {
        if ((3 == t.nodeType && (t = t.parentNode), e.contains))
            return e.contains(t);
        do {
            if ((11 == t.nodeType && (t = t.host), t == e)) return !0;
        } while ((t = t.parentNode));
    }
    function W() {
        var t;
        try {
            t = document.activeElement;
        } catch (e) {
            t = document.body || null;
        }
        for (; t && t.shadowRoot && t.shadowRoot.activeElement; )
            t = t.shadowRoot.activeElement;
        return t;
    }
    function H(e, t) {
        var r = e.className;
        L(t).test(r) || (e.className += (r ? " " : "") + t);
    }
    function F(e, t) {
        for (var r = e.split(" "), n = 0; n < r.length; n++)
            r[n] && !L(r[n]).test(t) && (t += " " + r[n]);
        return t;
    }
    k = document.createRange
        ? function (e, t, r, n) {
            var i = document.createRange();
            return i.setEnd(n || e, r), i.setStart(e, t), i;
        }
        : function (e, t, r) {
            var n = document.body.createTextRange();
            try {
                n.moveToElementText(e.parentNode);
            } catch (e) {
                return n;
            }
            return (
                n.collapse(!0),
                n.moveEnd("character", r),
                n.moveStart("character", t),
                n
            );
        };
    var P = function (e) {
        e.select();
    };
    function E(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return function () {
            return e.apply(null, t);
        };
    }
    function I(e, t, r) {
        for (var n in ((t = t || {}), e))
            !e.hasOwnProperty(n) ||
        (!1 === r && t.hasOwnProperty(n)) ||
        (t[n] = e[n]);
        return t;
    }
    function z(e, t, r, n, i) {
        null == t && -1 == (t = e.search(/[^\s\u00a0]/)) && (t = e.length);
        for (var o = n || 0, l = i || 0; ; ) {
            var s = e.indexOf("\t", o);
            if (s < 0 || t <= s) return l + (t - o);
            (l += s - o), (l += r - (l % r)), (o = s + 1);
        }
    }
    c
        ? (P = function (e) {
            (e.selectionStart = 0), (e.selectionEnd = e.value.length);
        })
        : x &&
      (P = function (e) {
          try {
              e.select();
          } catch (e) {}
      });
    var R = function () {
        (this.id = null),
        (this.f = null),
        (this.time = 0),
        (this.handler = E(this.onTimeout, this));
    };
    function B(e, t) {
        for (var r = 0; r < e.length; ++r) if (e[r] == t) return r;
        return -1;
    }
    (R.prototype.onTimeout = function (e) {
        (e.id = 0),
        e.time <= +new Date()
            ? e.f()
            : setTimeout(e.handler, e.time - new Date());
    }),
    (R.prototype.set = function (e, t) {
        this.f = t;
        var r = +new Date() + e;
        (!this.id || r < this.time) &&
        (clearTimeout(this.id),
        (this.id = setTimeout(this.handler, e)),
        (this.time = r));
    });
    var G = 30,
        U = {
            toString: function () {
                return "CodeMirror.Pass";
            },
        },
        V = { scroll: !1 },
        K = { origin: "*mouse" },
        j = { origin: "+move" };
    function X(e, t, r) {
        for (var n = 0, i = 0; ; ) {
            var o = e.indexOf("\t", n);
            -1 == o && (o = e.length);
            var l = o - n;
            if (o == e.length || t <= i + l) return n + Math.min(l, t - i);
            if (((i += o - n), (n = o + 1), t <= (i += r - (i % r)))) return n;
        }
    }
    var Y = [""];
    function _(e) {
        for (; Y.length <= e; ) Y.push($(Y) + " ");
        return Y[e];
    }
    function $(e) {
        return e[e.length - 1];
    }
    function q(e, t) {
        for (var r = [], n = 0; n < e.length; n++) r[n] = t(e[n], n);
        return r;
    }
    function Z() {}
    function Q(e, t) {
        var r;
        return (
            (r = Object.create ? Object.create(e) : ((Z.prototype = e), new Z())),
            t && I(t, r),
            r
        );
    }
    var J = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
    function ee(e) {
        return (
            /\w/.test(e) ||
      ("�" < e && (e.toUpperCase() != e.toLowerCase() || J.test(e)))
        );
    }
    function te(e, t) {
        return t ? !!(-1 < t.source.indexOf("\\w") && ee(e)) || t.test(e) : ee(e);
    }
    function re(e) {
        for (var t in e) if (e.hasOwnProperty(t) && e[t]) return;
        return 1;
    }
    var ne = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
    function ie(e) {
        return 768 <= e.charCodeAt(0) && ne.test(e);
    }
    function oe(e, t, r) {
        for (; (r < 0 ? 0 < t : t < e.length) && ie(e.charAt(t)); ) t += r;
        return t;
    }
    function le(e, t, r) {
        for (var n = r < t ? -1 : 1; ; ) {
            if (t == r) return t;
            var i = (t + r) / 2,
                o = n < 0 ? Math.ceil(i) : Math.floor(i);
            if (o == t) return e(o) ? t : r;
            e(o) ? (r = o) : (t = o + n);
        }
    }
    var se = null;
    function ae(e, t, r) {
        var n;
        se = null;
        for (var i = 0; i < e.length; ++i) {
            var o = e[i];
            if (o.from < t && o.to > t) return i;
            o.to == t && (o.from != o.to && "before" == r ? (n = i) : (se = i)),
            o.from == t && (o.from != o.to && "before" != r ? (n = i) : (se = i));
        }
        return null != n ? n : se;
    }
    var ue,
        ce,
        he,
        fe,
        de,
        pe,
        ge,
        ve =
      ((ue =
        "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN"),
      (ce =
        "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111"),
      (he = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/),
      (fe = /[stwN]/),
      (de = /[LRr]/),
      (pe = /[Lb1n]/),
      (ge = /[1n]/),
      function (e, t) {
          var r = "ltr" == t ? "L" : "R";
          if (0 == e.length || ("ltr" == t && !he.test(e))) return !1;
          for (var n, i = e.length, o = [], l = 0; l < i; ++l)
              o.push(
                  (n = e.charCodeAt(l)) <= 247
                      ? ue.charAt(n)
                      : 1424 <= n && n <= 1524
                          ? "R"
                          : 1536 <= n && n <= 1785
                              ? ce.charAt(n - 1536)
                              : 1774 <= n && n <= 2220
                                  ? "r"
                                  : 8192 <= n && n <= 8203
                                      ? "w"
                                      : 8204 == n
                                          ? "b"
                                          : "L"
              );
          for (var s = 0, a = r; s < i; ++s) {
              var u = o[s];
              "m" == u ? (o[s] = a) : (a = u);
          }
          for (var c = 0, h = r; c < i; ++c) {
              var f = o[c];
              "1" == f && "r" == h
                  ? (o[c] = "n")
                  : de.test(f) && "r" == (h = f) && (o[c] = "R");
          }
          for (var d = 1, p = o[0]; d < i - 1; ++d) {
              var g = o[d];
              "+" == g && "1" == p && "1" == o[d + 1]
                  ? (o[d] = "1")
                  : "," != g || p != o[d + 1] || ("1" != p && "n" != p) || (o[d] = p),
              (p = g);
          }
          for (var v = 0; v < i; ++v) {
              var m = o[v];
              if ("," == m) o[v] = "N";
              else if ("%" == m) {
                  var y = void 0;
                  for (y = v + 1; y < i && "%" == o[y]; ++y);
                  for (
                      var b =
                  (v && "!" == o[v - 1]) || (y < i && "1" == o[y]) ? "1" : "N",
                          w = v;
                      w < y;
                      ++w
                  )
                      o[w] = b;
                  v = y - 1;
              }
          }
          for (var x = 0, C = r; x < i; ++x) {
              var S = o[x];
              "L" == C && "1" == S ? (o[x] = "L") : de.test(S) && (C = S);
          }
          for (var L = 0; L < i; ++L)
              if (fe.test(o[L])) {
                  var k = void 0;
                  for (k = L + 1; k < i && fe.test(o[k]); ++k);
                  for (
                      var T = "L" == (L ? o[L - 1] : r),
                          M = T == ("L" == (k < i ? o[k] : r)) ? (T ? "L" : "R") : r,
                          N = L;
                      N < k;
                      ++N
                  )
                      o[N] = M;
                  L = k - 1;
              }
          for (var O, A = [], D = 0; D < i; )
              if (pe.test(o[D])) {
                  var W = D;
                  for (++D; D < i && pe.test(o[D]); ++D);
                  A.push(new me(0, W, D));
              } else {
                  var H = D,
                      F = A.length,
                      P = "rtl" == t ? 1 : 0;
                  for (++D; D < i && "L" != o[D]; ++D);
                  for (var E = H; E < D; )
                      if (ge.test(o[E])) {
                          H < E && (A.splice(F, 0, new me(1, H, E)), (F += P));
                          var I = E;
                          for (++E; E < D && ge.test(o[E]); ++E);
                          A.splice(F, 0, new me(2, I, E)), (F += P), (H = E);
                      } else ++E;
                  H < D && A.splice(F, 0, new me(1, H, D));
              }
          return (
              "ltr" == t &&
            (1 == A[0].level &&
              (O = e.match(/^\s+/)) &&
              ((A[0].from = O[0].length), A.unshift(new me(0, 0, O[0].length))),
            1 == $(A).level &&
              (O = e.match(/\s+$/)) &&
              (($(A).to -= O[0].length),
              A.push(new me(0, i - O[0].length, i)))),
              "rtl" == t ? A.reverse() : A
          );
      });
    function me(e, t, r) {
        (this.level = e), (this.from = t), (this.to = r);
    }
    function ye(e, t) {
        var r = e.order;
        return null == r && (r = e.order = ve(e.text, t)), r;
    }
    var be = [],
        we = function (e, t, r) {
            if (e.addEventListener) e.addEventListener(t, r, !1);
            else if (e.attachEvent) e.attachEvent("on" + t, r);
            else {
                var n = e._handlers || (e._handlers = {});
                n[t] = (n[t] || be).concat(r);
            }
        };
    function xe(e, t) {
        return (e._handlers && e._handlers[t]) || be;
    }
    function Ce(e, t, r) {
        if (e.removeEventListener) e.removeEventListener(t, r, !1);
        else if (e.detachEvent) e.detachEvent("on" + t, r);
        else {
            var n = e._handlers,
                i = n && n[t];
            if (i) {
                var o = B(i, r);
                -1 < o && (n[t] = i.slice(0, o).concat(i.slice(o + 1)));
            }
        }
    }
    function Se(e, t) {
        var r = xe(e, t);
        if (r.length)
            for (
                var n = Array.prototype.slice.call(arguments, 2), i = 0;
                i < r.length;
                ++i
            )
                r[i].apply(null, n);
    }
    function Le(e, t, r) {
        return (
            "string" == typeof t &&
        (t = {
            type: t,
            preventDefault: function () {
                this.defaultPrevented = !0;
            },
        }),
            Se(e, r || t.type, e, t),
            Ae(t) || t.codemirrorIgnore
        );
    }
    function ke(e) {
        var t = e._handlers && e._handlers.cursorActivity;
        if (t)
            for (
                var r =
            e.curOp.cursorActivityHandlers ||
            (e.curOp.cursorActivityHandlers = []),
                    n = 0;
                n < t.length;
                ++n
            )
                -1 == B(r, t[n]) && r.push(t[n]);
    }
    function Te(e, t) {
        return 0 < xe(e, t).length;
    }
    function Me(e) {
        (e.prototype.on = function (e, t) {
            we(this, e, t);
        }),
        (e.prototype.off = function (e, t) {
            Ce(this, e, t);
        });
    }
    function Ne(e) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
    }
    function Oe(e) {
        e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0);
    }
    function Ae(e) {
        return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue;
    }
    function De(e) {
        Ne(e), Oe(e);
    }
    function We(e) {
        return e.target || e.srcElement;
    }
    function He(e) {
        var t = e.which;
        return (
            null == t &&
        (1 & e.button
            ? (t = 1)
            : 2 & e.button
                ? (t = 3)
                : 4 & e.button && (t = 2)),
            w && e.ctrlKey && 1 == t && (t = 3),
            t
        );
    }
    var Fe,
        Pe,
        Ee = (function () {
            if (x && C < 9) return !1;
            var e = A("div");
            return "draggable" in e || "dragDrop" in e;
        })();
    function Ie(e) {
        if (null == Fe) {
            var t = A("span", "​");
            N(e, A("span", [t, document.createTextNode("x")])),
            0 != e.firstChild.offsetHeight &&
          (Fe = t.offsetWidth <= 1 && 2 < t.offsetHeight && !(x && C < 8));
        }
        var r = Fe
            ? A("span", "​")
            : A(
                "span",
                " ",
                null,
                "display: inline-block; width: 1px; margin-right: -1px"
            );
        return r.setAttribute("cm-text", ""), r;
    }
    function ze(e) {
        if (null != Pe) return Pe;
        var t = N(e, document.createTextNode("AخA")),
            r = k(t, 0, 1).getBoundingClientRect(),
            n = k(t, 1, 2).getBoundingClientRect();
        return M(e), r && r.left != r.right && (Pe = n.right - r.right < 3);
    }
    var Re,
        Be =
      3 != "\n\nb".split(/\n/).length
          ? function (e) {
              for (var t = 0, r = [], n = e.length; t <= n; ) {
                  var i = e.indexOf("\n", t);
                  -1 == i && (i = e.length);
                  var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i),
                      l = o.indexOf("\r");
                  -1 != l
                      ? (r.push(o.slice(0, l)), (t += l + 1))
                      : (r.push(o), (t = i + 1));
              }
              return r;
          }
          : function (e) {
              return e.split(/\r\n?|\n/);
          },
        Ge = window.getSelection
            ? function (e) {
                try {
                    return e.selectionStart != e.selectionEnd;
                } catch (e) {
                    return !1;
                }
            }
            : function (e) {
                var t;
                try {
                    t = e.ownerDocument.selection.createRange();
                } catch (e) {}
                return (
                    !(!t || t.parentElement() != e) &&
            0 != t.compareEndPoints("StartToEnd", t)
                );
            },
        Ue =
      "oncopy" in (Re = A("div")) ||
      (Re.setAttribute("oncopy", "return;"), "function" == typeof Re.oncopy),
        Ve = null;
    var Ke = {},
        je = {};
    function Xe(e) {
        if ("string" == typeof e && je.hasOwnProperty(e)) e = je[e];
        else if (e && "string" == typeof e.name && je.hasOwnProperty(e.name)) {
            var t = je[e.name];
            "string" == typeof t && (t = { name: t }), ((e = Q(t, e)).name = t.name);
        } else {
            if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+xml$/.test(e))
                return Xe("application/xml");
            if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+json$/.test(e))
                return Xe("application/json");
        }
        return "string" == typeof e ? { name: e } : e || { name: "null" };
    }
    function Ye(e, t) {
        t = Xe(t);
        var r = Ke[t.name];
        if (!r) return Ye(e, "text/plain");
        var n = r(e, t);
        if (_e.hasOwnProperty(t.name)) {
            var i = _e[t.name];
            for (var o in i)
                i.hasOwnProperty(o) &&
          (n.hasOwnProperty(o) && (n["_" + o] = n[o]), (n[o] = i[o]));
        }
        if (
            ((n.name = t.name),
            t.helperType && (n.helperType = t.helperType),
            t.modeProps)
        )
            for (var l in t.modeProps) n[l] = t.modeProps[l];
        return n;
    }
    var _e = {};
    function $e(e, t) {
        I(t, _e.hasOwnProperty(e) ? _e[e] : (_e[e] = {}));
    }
    function qe(e, t) {
        if (!0 === t) return t;
        if (e.copyState) return e.copyState(t);
        var r = {};
        for (var n in t) {
            var i = t[n];
            i instanceof Array && (i = i.concat([])), (r[n] = i);
        }
        return r;
    }
    function Ze(e, t) {
        for (var r; e.innerMode && (r = e.innerMode(t)) && r.mode != e; )
            (t = r.state), (e = r.mode);
        return r || { mode: e, state: t };
    }
    function Qe(e, t, r) {
        return !e.startState || e.startState(t, r);
    }
    var Je = function (e, t, r) {
        (this.pos = this.start = 0),
        (this.string = e),
        (this.tabSize = t || 8),
        (this.lastColumnPos = this.lastColumnValue = 0),
        (this.lineStart = 0),
        (this.lineOracle = r);
    };
    function et(e, t) {
        if ((t -= e.first) < 0 || t >= e.size)
            throw new Error(
                "There is no line " + (t + e.first) + " in the document."
            );
        for (var r = e; !r.lines; )
            for (var n = 0; ; ++n) {
                var i = r.children[n],
                    o = i.chunkSize();
                if (t < o) {
                    r = i;
                    break;
                }
                t -= o;
            }
        return r.lines[t];
    }
    function tt(e, r, n) {
        var i = [],
            o = r.line;
        return (
            e.iter(r.line, n.line + 1, function (e) {
                var t = e.text;
                o == n.line && (t = t.slice(0, n.ch)),
                o == r.line && (t = t.slice(r.ch)),
                i.push(t),
                ++o;
            }),
            i
        );
    }
    function rt(e, t, r) {
        var n = [];
        return (
            e.iter(t, r, function (e) {
                n.push(e.text);
            }),
            n
        );
    }
    function nt(e, t) {
        var r = t - e.height;
        if (r) for (var n = e; n; n = n.parent) n.height += r;
    }
    function it(e) {
        if (null == e.parent) return null;
        for (
            var t = e.parent, r = B(t.lines, e), n = t.parent;
            n;
            n = (t = n).parent
        )
            for (var i = 0; n.children[i] != t; ++i) r += n.children[i].chunkSize();
        return r + t.first;
    }
    function ot(e, t) {
        var r = e.first;
        e: do {
            for (var n = 0; n < e.children.length; ++n) {
                var i = e.children[n],
                    o = i.height;
                if (t < o) {
                    e = i;
                    continue e;
                }
                (t -= o), (r += i.chunkSize());
            }
            return r;
        } while (!e.lines);
        for (var l = 0; l < e.lines.length; ++l) {
            var s = e.lines[l].height;
            if (t < s) break;
            t -= s;
        }
        return r + l;
    }
    function lt(e, t) {
        return t >= e.first && t < e.first + e.size;
    }
    function st(e, t) {
        return String(e.lineNumberFormatter(t + e.firstLineNumber));
    }
    function at(e, t, r) {
        if ((void 0 === r && (r = null), !(this instanceof at)))
            return new at(e, t, r);
        (this.line = e), (this.ch = t), (this.sticky = r);
    }
    function ut(e, t) {
        return e.line - t.line || e.ch - t.ch;
    }
    function ct(e, t) {
        return e.sticky == t.sticky && 0 == ut(e, t);
    }
    function ht(e) {
        return at(e.line, e.ch);
    }
    function ft(e, t) {
        return ut(e, t) < 0 ? t : e;
    }
    function dt(e, t) {
        return ut(e, t) < 0 ? e : t;
    }
    function pt(e, t) {
        return Math.max(e.first, Math.min(t, e.first + e.size - 1));
    }
    function gt(e, t) {
        if (t.line < e.first) return at(e.first, 0);
        var r,
            n,
            i,
            o = e.first + e.size - 1;
        return t.line > o
            ? at(o, et(e, o).text.length)
            : ((n = et(e, (r = t).line).text.length),
            null == (i = r.ch) || n < i
                ? at(r.line, n)
                : i < 0
                    ? at(r.line, 0)
                    : r);
    }
    function vt(e, t) {
        for (var r = [], n = 0; n < t.length; n++) r[n] = gt(e, t[n]);
        return r;
    }
    (Je.prototype.eol = function () {
        return this.pos >= this.string.length;
    }),
    (Je.prototype.sol = function () {
        return this.pos == this.lineStart;
    }),
    (Je.prototype.peek = function () {
        return this.string.charAt(this.pos) || void 0;
    }),
    (Je.prototype.next = function () {
        if (this.pos < this.string.length) return this.string.charAt(this.pos++);
    }),
    (Je.prototype.eat = function (e) {
        var t = this.string.charAt(this.pos);
        if ("string" == typeof e ? t == e : t && (e.test ? e.test(t) : e(t)))
            return ++this.pos, t;
    }),
    (Je.prototype.eatWhile = function (e) {
        for (var t = this.pos; this.eat(e); );
        return this.pos > t;
    }),
    (Je.prototype.eatSpace = function () {
        for (var e = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); )
            ++this.pos;
        return this.pos > e;
    }),
    (Je.prototype.skipToEnd = function () {
        this.pos = this.string.length;
    }),
    (Je.prototype.skipTo = function (e) {
        var t = this.string.indexOf(e, this.pos);
        if (-1 < t) return (this.pos = t), !0;
    }),
    (Je.prototype.backUp = function (e) {
        this.pos -= e;
    }),
    (Je.prototype.column = function () {
        return (
            this.lastColumnPos < this.start &&
          ((this.lastColumnValue = z(
              this.string,
              this.start,
              this.tabSize,
              this.lastColumnPos,
              this.lastColumnValue
          )),
          (this.lastColumnPos = this.start)),
            this.lastColumnValue -
          (this.lineStart ? z(this.string, this.lineStart, this.tabSize) : 0)
        );
    }),
    (Je.prototype.indentation = function () {
        return (
            z(this.string, null, this.tabSize) -
        (this.lineStart ? z(this.string, this.lineStart, this.tabSize) : 0)
        );
    }),
    (Je.prototype.match = function (e, t, r) {
        if ("string" != typeof e) {
            var n = this.string.slice(this.pos).match(e);
            return n && 0 < n.index
                ? null
                : (n && !1 !== t && (this.pos += n[0].length), n);
        }
        function i(e) {
            return r ? e.toLowerCase() : e;
        }
        if (i(this.string.substr(this.pos, e.length)) == i(e))
            return !1 !== t && (this.pos += e.length), !0;
    }),
    (Je.prototype.current = function () {
        return this.string.slice(this.start, this.pos);
    }),
    (Je.prototype.hideFirstChars = function (e, t) {
        this.lineStart += e;
        try {
            return t();
        } finally {
            this.lineStart -= e;
        }
    }),
    (Je.prototype.lookAhead = function (e) {
        var t = this.lineOracle;
        return t && t.lookAhead(e);
    }),
    (Je.prototype.baseToken = function () {
        var e = this.lineOracle;
        return e && e.baseToken(this.pos);
    });
    var mt = function (e, t) {
            (this.state = e), (this.lookAhead = t);
        },
        yt = function (e, t, r, n) {
            (this.state = t),
            (this.doc = e),
            (this.line = r),
            (this.maxLookAhead = n || 0),
            (this.baseTokens = null),
            (this.baseTokenPos = 1);
        };
    function bt(t, r, n, e) {
        var a = [t.state.modeGen],
            i = {};
        Nt(
            t,
            r.text,
            t.doc.mode,
            n,
            function (e, t) {
                return a.push(e, t);
            },
            i,
            e
        );
        for (
            var u = n.state,
                o = function (e) {
                    n.baseTokens = a;
                    var o = t.state.overlays[e],
                        l = 1,
                        s = 0;
                    (n.state = !0),
                    Nt(
                        t,
                        r.text,
                        o.mode,
                        n,
                        function (e, t) {
                            for (var r = l; s < e; ) {
                                var n = a[l];
                                e < n && a.splice(l, 1, e, a[l + 1], n),
                                (l += 2),
                                (s = Math.min(e, n));
                            }
                            if (t)
                                if (o.opaque)
                                    a.splice(r, l - r, e, "overlay " + t), (l = r + 2);
                                else
                                    for (; r < l; r += 2) {
                                        var i = a[r + 1];
                                        a[r + 1] = (i ? i + " " : "") + "overlay " + t;
                                    }
                        },
                        i
                    ),
                    (n.state = u),
                    (n.baseTokens = null),
                    (n.baseTokenPos = 1);
                },
                l = 0;
            l < t.state.overlays.length;
            ++l
        )
            o(l);
        return { styles: a, classes: i.bgClass || i.textClass ? i : null };
    }
    function wt(e, t, r) {
        if (!t.styles || t.styles[0] != e.state.modeGen) {
            var n = xt(e, it(t)),
                i =
          t.text.length > e.options.maxHighlightLength &&
          qe(e.doc.mode, n.state),
                o = bt(e, t, n);
            i && (n.state = i),
            (t.stateAfter = n.save(!i)),
            (t.styles = o.styles),
            o.classes
                ? (t.styleClasses = o.classes)
                : t.styleClasses && (t.styleClasses = null),
            r === e.doc.highlightFrontier &&
          (e.doc.modeFrontier = Math.max(
              e.doc.modeFrontier,
              ++e.doc.highlightFrontier
          ));
        }
        return t.styles;
    }
    function xt(r, n, e) {
        var t = r.doc,
            i = r.display;
        if (!t.mode.startState) return new yt(t, !0, n);
        var o = (function (e, t, r) {
                for (
                    var n,
                        i,
                        o = e.doc,
                        l = r ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100),
                        s = t;
                    l < s;
                    --s
                ) {
                    if (s <= o.first) return o.first;
                    var a = et(o, s - 1),
                        u = a.stateAfter;
                    if (
                        u &&
            (!r || s + (u instanceof mt ? u.lookAhead : 0) <= o.modeFrontier)
                    )
                        return s;
                    var c = z(a.text, null, e.options.tabSize);
                    (null == i || c < n) && ((i = s - 1), (n = c));
                }
                return i;
            })(r, n, e),
            l = o > t.first && et(t, o - 1).stateAfter,
            s = l ? yt.fromSaved(t, l, o) : new yt(t, Qe(t.mode), o);
        return (
            t.iter(o, n, function (e) {
                Ct(r, e.text, s);
                var t = s.line;
                (e.stateAfter =
          t == n - 1 || t % 5 == 0 || (t >= i.viewFrom && t < i.viewTo)
              ? s.save()
              : null),
                s.nextLine();
            }),
            e && (t.modeFrontier = s.line),
            s
        );
    }
    function Ct(e, t, r, n) {
        var i = e.doc.mode,
            o = new Je(t, e.options.tabSize, r);
        for (o.start = o.pos = n || 0, "" == t && St(i, r.state); !o.eol(); )
            Lt(i, o, r.state), (o.start = o.pos);
    }
    function St(e, t) {
        if (e.blankLine) return e.blankLine(t);
        if (e.innerMode) {
            var r = Ze(e, t);
            return r.mode.blankLine ? r.mode.blankLine(r.state) : void 0;
        }
    }
    function Lt(e, t, r, n) {
        for (var i = 0; i < 10; i++) {
            n && (n[0] = Ze(e, r).mode);
            var o = e.token(t, r);
            if (t.pos > t.start) return o;
        }
        throw new Error("Mode " + e.name + " failed to advance stream.");
    }
    (yt.prototype.lookAhead = function (e) {
        var t = this.doc.getLine(this.line + e);
        return null != t && e > this.maxLookAhead && (this.maxLookAhead = e), t;
    }),
    (yt.prototype.baseToken = function (e) {
        if (!this.baseTokens) return null;
        for (; this.baseTokens[this.baseTokenPos] <= e; ) this.baseTokenPos += 2;
        var t = this.baseTokens[this.baseTokenPos + 1];
        return {
            type: t && t.replace(/( |^)overlay .*/, ""),
            size: this.baseTokens[this.baseTokenPos] - e,
        };
    }),
    (yt.prototype.nextLine = function () {
        this.line++, 0 < this.maxLookAhead && this.maxLookAhead--;
    }),
    (yt.fromSaved = function (e, t, r) {
        return t instanceof mt
            ? new yt(e, qe(e.mode, t.state), r, t.lookAhead)
            : new yt(e, qe(e.mode, t), r);
    }),
    (yt.prototype.save = function (e) {
        var t = !1 !== e ? qe(this.doc.mode, this.state) : this.state;
        return 0 < this.maxLookAhead ? new mt(t, this.maxLookAhead) : t;
    });
    var kt = function (e, t, r) {
        (this.start = e.start),
        (this.end = e.pos),
        (this.string = e.current()),
        (this.type = t || null),
        (this.state = r);
    };
    function Tt(e, t, r, n) {
        var i,
            o,
            l = e.doc,
            s = l.mode,
            a = et(l, (t = gt(l, t)).line),
            u = xt(e, t.line, r),
            c = new Je(a.text, e.options.tabSize, u);
        for (n && (o = []); (n || c.pos < t.ch) && !c.eol(); )
            (c.start = c.pos),
            (i = Lt(s, c, u.state)),
            n && o.push(new kt(c, i, qe(l.mode, u.state)));
        return n ? o : new kt(c, i, u.state);
    }
    function Mt(e, t) {
        if (e)
            for (;;) {
                var r = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
                if (!r) break;
                e = e.slice(0, r.index) + e.slice(r.index + r[0].length);
                var n = r[1] ? "bgClass" : "textClass";
                null == t[n]
                    ? (t[n] = r[2])
                    : new RegExp("(?:^|s)" + r[2] + "(?:$|s)").test(t[n]) ||
            (t[n] += " " + r[2]);
            }
        return e;
    }
    function Nt(e, t, r, n, i, o, l) {
        var s = r.flattenSpans;
        null == s && (s = e.options.flattenSpans);
        var a,
            u = 0,
            c = null,
            h = new Je(t, e.options.tabSize, n),
            f = e.options.addModeClass && [null];
        for ("" == t && Mt(St(r, n.state), o); !h.eol(); ) {
            if (
                ((a =
          h.pos > e.options.maxHighlightLength
              ? ((s = !1), l && Ct(e, t, n, h.pos), (h.pos = t.length), null)
              : Mt(Lt(r, h, n.state, f), o)),
                f)
            ) {
                var d = f[0].name;
                d && (a = "m-" + (a ? d + " " + a : d));
            }
            if (!s || c != a) {
                for (; u < h.start; ) i((u = Math.min(h.start, u + 5e3)), c);
                c = a;
            }
            h.start = h.pos;
        }
        for (; u < h.pos; ) {
            var p = Math.min(h.pos, u + 5e3);
            i(p, c), (u = p);
        }
    }
    var Ot = !1,
        At = !1;
    function Dt(e, t, r) {
        (this.marker = e), (this.from = t), (this.to = r);
    }
    function Wt(e, t) {
        if (e)
            for (var r = 0; r < e.length; ++r) {
                var n = e[r];
                if (n.marker == t) return n;
            }
    }
    function Ht(e, t) {
        for (var r, n = 0; n < e.length; ++n) e[n] != t && (r = r || []).push(e[n]);
        return r;
    }
    function Ft(e, t) {
        if (t.full) return null;
        var r = lt(e, t.from.line) && et(e, t.from.line).markedSpans,
            n = lt(e, t.to.line) && et(e, t.to.line).markedSpans;
        if (!r && !n) return null;
        var i = t.from.ch,
            o = t.to.ch,
            l = 0 == ut(t.from, t.to),
            s = (function (e, t, r) {
                var n;
                if (e)
                    for (var i = 0; i < e.length; ++i) {
                        var o = e[i],
                            l = o.marker;
                        if (
                            null == o.from ||
              (l.inclusiveLeft ? o.from <= t : o.from < t) ||
              (o.from == t &&
                "bookmark" == l.type &&
                (!r || !o.marker.insertLeft))
                        ) {
                            var s = null == o.to || (l.inclusiveRight ? o.to >= t : o.to > t);
                            (n = n || []).push(new Dt(l, o.from, s ? null : o.to));
                        }
                    }
                return n;
            })(r, i, l),
            a = (function (e, t, r) {
                var n;
                if (e)
                    for (var i = 0; i < e.length; ++i) {
                        var o = e[i],
                            l = o.marker;
                        if (
                            null == o.to ||
              (l.inclusiveRight ? o.to >= t : o.to > t) ||
              (o.from == t &&
                "bookmark" == l.type &&
                (!r || o.marker.insertLeft))
                        ) {
                            var s =
                null == o.from || (l.inclusiveLeft ? o.from <= t : o.from < t);
                            (n = n || []).push(
                                new Dt(l, s ? null : o.from - t, null == o.to ? null : o.to - t)
                            );
                        }
                    }
                return n;
            })(n, o, l),
            u = 1 == t.text.length,
            c = $(t.text).length + (u ? i : 0);
        if (s)
            for (var h = 0; h < s.length; ++h) {
                var f = s[h];
                if (null == f.to) {
                    var d = Wt(a, f.marker);
                    d ? u && (f.to = null == d.to ? null : d.to + c) : (f.to = i);
                }
            }
        if (a)
            for (var p = 0; p < a.length; ++p) {
                var g = a[p];
                if ((null != g.to && (g.to += c), null == g.from))
                    Wt(s, g.marker) || ((g.from = c), u && (s = s || []).push(g));
                else (g.from += c), u && (s = s || []).push(g);
            }
        (s = s && Pt(s)), a && a != s && (a = Pt(a));
        var v = [s];
        if (!u) {
            var m,
                y = t.text.length - 2;
            if (0 < y && s)
                for (var b = 0; b < s.length; ++b)
                    null == s[b].to &&
            (m = m || []).push(new Dt(s[b].marker, null, null));
            for (var w = 0; w < y; ++w) v.push(m);
            v.push(a);
        }
        return v;
    }
    function Pt(e) {
        for (var t = 0; t < e.length; ++t) {
            var r = e[t];
            null != r.from &&
        r.from == r.to &&
        !1 !== r.marker.clearWhenEmpty &&
        e.splice(t--, 1);
        }
        return e.length ? e : null;
    }
    function Et(e) {
        var t = e.markedSpans;
        if (t) {
            for (var r = 0; r < t.length; ++r) t[r].marker.detachLine(e);
            e.markedSpans = null;
        }
    }
    function It(e, t) {
        if (t) {
            for (var r = 0; r < t.length; ++r) t[r].marker.attachLine(e);
            e.markedSpans = t;
        }
    }
    function zt(e) {
        return e.inclusiveLeft ? -1 : 0;
    }
    function Rt(e) {
        return e.inclusiveRight ? 1 : 0;
    }
    function Bt(e, t) {
        var r = e.lines.length - t.lines.length;
        if (0 != r) return r;
        var n = e.find(),
            i = t.find(),
            o = ut(n.from, i.from) || zt(e) - zt(t);
        if (o) return -o;
        var l = ut(n.to, i.to) || Rt(e) - Rt(t);
        return l || t.id - e.id;
    }
    function Gt(e, t) {
        var r,
            n = At && e.markedSpans;
        if (n)
            for (var i = void 0, o = 0; o < n.length; ++o)
                (i = n[o]).marker.collapsed &&
          null == (t ? i.from : i.to) &&
          (!r || Bt(r, i.marker) < 0) &&
          (r = i.marker);
        return r;
    }
    function Ut(e) {
        return Gt(e, !0);
    }
    function Vt(e) {
        return Gt(e, !1);
    }
    function Kt(e, t) {
        var r,
            n = At && e.markedSpans;
        if (n)
            for (var i = 0; i < n.length; ++i) {
                var o = n[i];
                o.marker.collapsed &&
          (null == o.from || o.from < t) &&
          (null == o.to || o.to > t) &&
          (!r || Bt(r, o.marker) < 0) &&
          (r = o.marker);
            }
        return r;
    }
    function jt(e, t, r, n, i) {
        var o = et(e, t),
            l = At && o.markedSpans;
        if (l)
            for (var s = 0; s < l.length; ++s) {
                var a = l[s];
                if (a.marker.collapsed) {
                    var u = a.marker.find(0),
                        c = ut(u.from, r) || zt(a.marker) - zt(i),
                        h = ut(u.to, n) || Rt(a.marker) - Rt(i);
                    if (
                        !((0 <= c && h <= 0) || (c <= 0 && 0 <= h)) &&
            ((c <= 0 &&
              (a.marker.inclusiveRight && i.inclusiveLeft
                  ? 0 <= ut(u.to, r)
                  : 0 < ut(u.to, r))) ||
              (0 <= c &&
                (a.marker.inclusiveRight && i.inclusiveLeft
                    ? ut(u.from, n) <= 0
                    : ut(u.from, n) < 0)))
                    )
                        return 1;
                }
            }
    }
    function Xt(e) {
        for (var t; (t = Ut(e)); ) e = t.find(-1, !0).line;
        return e;
    }
    function Yt(e, t) {
        var r = et(e, t),
            n = Xt(r);
        return r == n ? t : it(n);
    }
    function _t(e, t) {
        if (t > e.lastLine()) return t;
        var r,
            n = et(e, t);
        if (!$t(e, n)) return t;
        for (; (r = Vt(n)); ) n = r.find(1, !0).line;
        return it(n) + 1;
    }
    function $t(e, t) {
        var r = At && t.markedSpans;
        if (r)
            for (var n = void 0, i = 0; i < r.length; ++i)
                if ((n = r[i]).marker.collapsed) {
                    if (null == n.from) return !0;
                    if (
                        !n.marker.widgetNode &&
            0 == n.from &&
            n.marker.inclusiveLeft &&
            qt(e, t, n)
                    )
                        return !0;
                }
    }
    function qt(e, t, r) {
        if (null == r.to) {
            var n = r.marker.find(1, !0);
            return qt(e, n.line, Wt(n.line.markedSpans, r.marker));
        }
        if (r.marker.inclusiveRight && r.to == t.text.length) return !0;
        for (var i = void 0, o = 0; o < t.markedSpans.length; ++o)
            if (
                (i = t.markedSpans[o]).marker.collapsed &&
        !i.marker.widgetNode &&
        i.from == r.to &&
        (null == i.to || i.to != r.from) &&
        (i.marker.inclusiveLeft || r.marker.inclusiveRight) &&
        qt(e, t, i)
            )
                return !0;
    }
    function Zt(e) {
        for (var t = 0, r = (e = Xt(e)).parent, n = 0; n < r.lines.length; ++n) {
            var i = r.lines[n];
            if (i == e) break;
            t += i.height;
        }
        for (var o = r.parent; o; o = (r = o).parent)
            for (var l = 0; l < o.children.length; ++l) {
                var s = o.children[l];
                if (s == r) break;
                t += s.height;
            }
        return t;
    }
    function Qt(e) {
        if (0 == e.height) return 0;
        for (var t, r = e.text.length, n = e; (t = Ut(n)); ) {
            var i = t.find(0, !0);
            (n = i.from.line), (r += i.from.ch - i.to.ch);
        }
        for (n = e; (t = Vt(n)); ) {
            var o = t.find(0, !0);
            (r -= n.text.length - o.from.ch),
            (r += (n = o.to.line).text.length - o.to.ch);
        }
        return r;
    }
    function Jt(e) {
        var r = e.display,
            t = e.doc;
        (r.maxLine = et(t, t.first)),
        (r.maxLineLength = Qt(r.maxLine)),
        (r.maxLineChanged = !0),
        t.iter(function (e) {
            var t = Qt(e);
            t > r.maxLineLength && ((r.maxLineLength = t), (r.maxLine = e));
        });
    }
    var er = function (e, t, r) {
        (this.text = e), It(this, t), (this.height = r ? r(this) : 1);
    };
    (er.prototype.lineNo = function () {
        return it(this);
    }),
    Me(er);
    var tr = {},
        rr = {};
    function nr(e, t) {
        if (!e || /^\s*$/.test(e)) return null;
        var r = t.addModeClass ? rr : tr;
        return r[e] || (r[e] = e.replace(/\S+/g, "cm-$&"));
    }
    function ir(e, t) {
        var r = O("span", null, null, b ? "padding-right: .1px" : null),
            n = {
                pre: O("pre", [r], "CodeMirror-line"),
                content: r,
                col: 0,
                pos: 0,
                cm: e,
                trailingSpace: !1,
                splitSpaces: e.getOption("lineWrapping"),
            };
        t.measure = {};
        for (var i = 0; i <= (t.rest ? t.rest.length : 0); i++) {
            var o = i ? t.rest[i - 1] : t.line,
                l = void 0;
            (n.pos = 0),
            (n.addToken = lr),
            ze(e.display.measure) &&
          (l = ye(o, e.doc.direction)) &&
          (n.addToken = sr(n.addToken, l)),
            (n.map = []),
            ur(o, n, wt(e, o, t != e.display.externalMeasured && it(o))),
            o.styleClasses &&
          (o.styleClasses.bgClass &&
            (n.bgClass = F(o.styleClasses.bgClass, n.bgClass || "")),
          o.styleClasses.textClass &&
            (n.textClass = F(o.styleClasses.textClass, n.textClass || ""))),
            0 == n.map.length &&
          n.map.push(0, 0, n.content.appendChild(Ie(e.display.measure))),
            0 == i
                ? ((t.measure.map = n.map), (t.measure.cache = {}))
                : ((t.measure.maps || (t.measure.maps = [])).push(n.map),
                (t.measure.caches || (t.measure.caches = [])).push({}));
        }
        if (b) {
            var s = n.content.lastChild;
            (/\bcm-tab\b/.test(s.className) ||
        (s.querySelector && s.querySelector(".cm-tab"))) &&
        (n.content.className = "cm-tab-wrap-hack");
        }
        return (
            Se(e, "renderLine", e, t.line, n.pre),
            n.pre.className && (n.textClass = F(n.pre.className, n.textClass || "")),
            n
        );
    }
    function or(e) {
        var t = A("span", "•", "cm-invalidchar");
        return (
            (t.title = "\\u" + e.charCodeAt(0).toString(16)),
            t.setAttribute("aria-label", t.title),
            t
        );
    }
    function lr(e, t, r, n, i, o, l) {
        if (t) {
            var s,
                a = e.splitSpaces
                    ? (function (e, t) {
                        if (1 < e.length && !/ {2}/.test(e)) return e;
                        for (var r = t, n = "", i = 0; i < e.length; i++) {
                            var o = e.charAt(i);
                            " " != o ||
                  !r ||
                  (i != e.length - 1 && 32 != e.charCodeAt(i + 1)) ||
                  (o = " "),
                            (n += o),
                            (r = " " == o);
                        }
                        return n;
                    })(t, e.trailingSpace)
                    : t,
                u = e.cm.state.specialChars,
                c = !1;
            if (u.test(t)) {
                s = document.createDocumentFragment();
                for (var h = 0; ; ) {
                    u.lastIndex = h;
                    var f = u.exec(t),
                        d = f ? f.index - h : t.length - h;
                    if (d) {
                        var p = document.createTextNode(a.slice(h, h + d));
                        x && C < 9 ? s.appendChild(A("span", [p])) : s.appendChild(p),
                        e.map.push(e.pos, e.pos + d, p),
                        (e.col += d),
                        (e.pos += d);
                    }
                    if (!f) break;
                    h += 1 + d;
                    var g = void 0;
                    if ("\t" == f[0]) {
                        var v = e.cm.options.tabSize,
                            m = v - (e.col % v);
                        (g = s.appendChild(A("span", _(m), "cm-tab"))).setAttribute(
                            "role",
                            "presentation"
                        ),
                        g.setAttribute("cm-text", "\t"),
                        (e.col += m);
                    } else
                        "\r" == f[0] || "\n" == f[0]
                            ? (g = s.appendChild(
                                A("span", "\r" == f[0] ? "␍" : "␤", "cm-invalidchar")
                            )).setAttribute("cm-text", f[0])
                            : ((g = e.cm.options.specialCharPlaceholder(f[0])).setAttribute(
                                "cm-text",
                                f[0]
                            ),
                            x && C < 9 ? s.appendChild(A("span", [g])) : s.appendChild(g)),
                        (e.col += 1);
                    e.map.push(e.pos, e.pos + 1, g), e.pos++;
                }
            } else
                (e.col += t.length),
                (s = document.createTextNode(a)),
                e.map.push(e.pos, e.pos + t.length, s),
                x && C < 9 && (c = !0),
                (e.pos += t.length);
            if (
                ((e.trailingSpace = 32 == a.charCodeAt(t.length - 1)),
                r || n || i || c || o)
            ) {
                var y = r || "";
                n && (y += n), i && (y += i);
                var b = A("span", [s], y, o);
                if (l)
                    for (var w in l)
                        l.hasOwnProperty(w) &&
              "style" != w &&
              "class" != w &&
              b.setAttribute(w, l[w]);
                return e.content.appendChild(b);
            }
            e.content.appendChild(s);
        }
    }
    function sr(h, f) {
        return function (e, t, r, n, i, o, l) {
            r = r ? r + " cm-force-border" : "cm-force-border";
            for (var s = e.pos, a = s + t.length; ; ) {
                for (
                    var u = void 0, c = 0;
                    c < f.length && !((u = f[c]).to > s && u.from <= s);
                    c++
                );
                if (u.to >= a) return h(e, t, r, n, i, o, l);
                h(e, t.slice(0, u.to - s), r, n, null, o, l),
                (n = null),
                (t = t.slice(u.to - s)),
                (s = u.to);
            }
        };
    }
    function ar(e, t, r, n) {
        var i = !n && r.widgetNode;
        i && e.map.push(e.pos, e.pos + t, i),
        !n &&
        e.cm.display.input.needsContentAttribute &&
        (i =
          i ||
          e.content.appendChild(document.createElement("span"))).setAttribute(
            "cm-marker",
            r.id
        ),
        i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)),
        (e.pos += t),
        (e.trailingSpace = !1);
    }
    function ur(e, t, r) {
        var n = e.markedSpans,
            i = e.text,
            o = 0;
        if (n)
            for (
                var l, s, a, u, c, h, f, d = i.length, p = 0, g = 1, v = "", m = 0;
                ;

            ) {
                if (m == p) {
                    (a = u = c = s = ""), (h = f = null), (m = 1 / 0);
                    for (var y = [], b = void 0, w = 0; w < n.length; ++w) {
                        var x = n[w],
                            C = x.marker;
                        if ("bookmark" == C.type && x.from == p && C.widgetNode) y.push(C);
                        else if (
                            x.from <= p &&
              (null == x.to ||
                x.to > p ||
                (C.collapsed && x.to == p && x.from == p))
                        ) {
                            if (
                                (null != x.to &&
                  x.to != p &&
                  m > x.to &&
                  ((m = x.to), (u = "")),
                                C.className && (a += " " + C.className),
                                C.css && (s = (s ? s + ";" : "") + C.css),
                                C.startStyle && x.from == p && (c += " " + C.startStyle),
                                C.endStyle && x.to == m && (b = b || []).push(C.endStyle, x.to),
                                C.title && ((f = f || {}).title = C.title),
                                C.attributes)
                            )
                                for (var S in C.attributes) (f = f || {})[S] = C.attributes[S];
                            C.collapsed && (!h || Bt(h.marker, C) < 0) && (h = x);
                        } else x.from > p && m > x.from && (m = x.from);
                    }
                    if (b)
                        for (var L = 0; L < b.length; L += 2)
                            b[L + 1] == m && (u += " " + b[L]);
                    if (!h || h.from == p)
                        for (var k = 0; k < y.length; ++k) ar(t, 0, y[k]);
                    if (h && (h.from || 0) == p) {
                        if (
                            (ar(
                                t,
                                (null == h.to ? d + 1 : h.to) - p,
                                h.marker,
                                null == h.from
                            ),
                            null == h.to)
                        )
                            return;
                        h.to == p && (h = !1);
                    }
                }
                if (d <= p) break;
                for (var T = Math.min(d, m); ; ) {
                    if (v) {
                        var M = p + v.length;
                        if (!h) {
                            var N = T < M ? v.slice(0, T - p) : v;
                            t.addToken(
                                t,
                                N,
                                l ? l + a : a,
                                c,
                                p + N.length == m ? u : "",
                                s,
                                f
                            );
                        }
                        if (T <= M) {
                            (v = v.slice(T - p)), (p = T);
                            break;
                        }
                        (p = M), (c = "");
                    }
                    (v = i.slice(o, (o = r[g++]))), (l = nr(r[g++], t.cm.options));
                }
            }
        else
            for (var O = 1; O < r.length; O += 2)
                t.addToken(t, i.slice(o, (o = r[O])), nr(r[O + 1], t.cm.options));
    }
    function cr(e, t, r) {
        (this.line = t),
        (this.rest = (function (e) {
            for (var t, r; (t = Vt(e)); )
                (e = t.find(1, !0).line), (r = r || []).push(e);
            return r;
        })(t)),
        (this.size = this.rest ? it($(this.rest)) - r + 1 : 1),
        (this.node = this.text = null),
        (this.hidden = $t(e, t));
    }
    function hr(e, t, r) {
        for (var n, i = [], o = t; o < r; o = n) {
            var l = new cr(e.doc, et(e.doc, o), o);
            (n = o + l.size), i.push(l);
        }
        return i;
    }
    var fr = null;
    function dr(e, t) {
        var r = e.ownsGroup;
        if (r)
            try {
                !(function (e) {
                    var t = e.delayedCallbacks,
                        r = 0;
                    do {
                        for (; r < t.length; r++) t[r].call(null);
                        for (var n = 0; n < e.ops.length; n++) {
                            var i = e.ops[n];
                            if (i.cursorActivityHandlers)
                                for (
                                    ;
                                    i.cursorActivityCalled < i.cursorActivityHandlers.length;

                                )
                                    i.cursorActivityHandlers[i.cursorActivityCalled++].call(
                                        null,
                                        i.cm
                                    );
                        }
                    } while (r < t.length);
                })(r);
            } finally {
                (fr = null), t(r);
            }
    }
    var pr = null;
    function gr(e, t) {
        var r = xe(e, t);
        if (r.length) {
            var n,
                i = Array.prototype.slice.call(arguments, 2);
            fr
                ? (n = fr.delayedCallbacks)
                : pr
                    ? (n = pr)
                    : ((n = pr = []), setTimeout(vr, 0));
            for (
                var o = function (e) {
                        n.push(function () {
                            return r[e].apply(null, i);
                        });
                    },
                    l = 0;
                l < r.length;
                ++l
            )
                o(l);
        }
    }
    function vr() {
        var e = pr;
        pr = null;
        for (var t = 0; t < e.length; ++t) e[t]();
    }
    function mr(e, t, r, n) {
        for (var i = 0; i < t.changes.length; i++) {
            var o = t.changes[i];
            "text" == o
                ? wr(e, t)
                : "gutter" == o
                    ? Cr(e, t, r, n)
                    : "class" == o
                        ? xr(e, t)
                        : "widget" == o && Sr(e, t, n);
        }
        t.changes = null;
    }
    function yr(e) {
        return (
            e.node == e.text &&
        ((e.node = A("div", null, null, "position: relative")),
        e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text),
        e.node.appendChild(e.text),
        x && C < 8 && (e.node.style.zIndex = 2)),
            e.node
        );
    }
    function br(e, t) {
        var r = e.display.externalMeasured;
        return r && r.line == t.line
            ? ((e.display.externalMeasured = null), (t.measure = r.measure), r.built)
            : ir(e, t);
    }
    function wr(e, t) {
        var r = t.text.className,
            n = br(e, t);
        t.text == t.node && (t.node = n.pre),
        t.text.parentNode.replaceChild(n.pre, t.text),
        (t.text = n.pre),
        n.bgClass != t.bgClass || n.textClass != t.textClass
            ? ((t.bgClass = n.bgClass), (t.textClass = n.textClass), xr(e, t))
            : r && (t.text.className = r);
    }
    function xr(e, t) {
        !(function (e, t) {
            var r = t.bgClass
                ? t.bgClass + " " + (t.line.bgClass || "")
                : t.line.bgClass;
            if ((r && (r += " CodeMirror-linebackground"), t.background))
                r
                    ? (t.background.className = r)
                    : (t.background.parentNode.removeChild(t.background),
                    (t.background = null));
            else if (r) {
                var n = yr(t);
                (t.background = n.insertBefore(A("div", null, r), n.firstChild)),
                e.display.input.setUneditable(t.background);
            }
        })(e, t),
        t.line.wrapClass
            ? (yr(t).className = t.line.wrapClass)
            : t.node != t.text && (t.node.className = "");
        var r = t.textClass
            ? t.textClass + " " + (t.line.textClass || "")
            : t.line.textClass;
        t.text.className = r || "";
    }
    function Cr(e, t, r, n) {
        if (
            (t.gutter && (t.node.removeChild(t.gutter), (t.gutter = null)),
            t.gutterBackground &&
        (t.node.removeChild(t.gutterBackground), (t.gutterBackground = null)),
            t.line.gutterClass)
        ) {
            var i = yr(t);
            (t.gutterBackground = A(
                "div",
                null,
                "CodeMirror-gutter-background " + t.line.gutterClass,
                "left: " +
          (e.options.fixedGutter ? n.fixedPos : -n.gutterTotalWidth) +
          "px; width: " +
          n.gutterTotalWidth +
          "px"
            )),
            e.display.input.setUneditable(t.gutterBackground),
            i.insertBefore(t.gutterBackground, t.text);
        }
        var o = t.line.gutterMarkers;
        if (e.options.lineNumbers || o) {
            var l = yr(t),
                s = (t.gutter = A(
                    "div",
                    null,
                    "CodeMirror-gutter-wrapper",
                    "left: " +
            (e.options.fixedGutter ? n.fixedPos : -n.gutterTotalWidth) +
            "px"
                ));
            if (
                (e.display.input.setUneditable(s),
                l.insertBefore(s, t.text),
                t.line.gutterClass && (s.className += " " + t.line.gutterClass),
                !e.options.lineNumbers ||
          (o && o["CodeMirror-linenumbers"]) ||
          (t.lineNumber = s.appendChild(
              A(
                  "div",
                  st(e.options, r),
                  "CodeMirror-linenumber CodeMirror-gutter-elt",
                  "left: " +
                n.gutterLeft["CodeMirror-linenumbers"] +
                "px; width: " +
                e.display.lineNumInnerWidth +
                "px"
              )
          )),
                o)
            )
                for (var a = 0; a < e.display.gutterSpecs.length; ++a) {
                    var u = e.display.gutterSpecs[a].className,
                        c = o.hasOwnProperty(u) && o[u];
                    c &&
            s.appendChild(
                A(
                    "div",
                    [c],
                    "CodeMirror-gutter-elt",
                    "left: " +
                  n.gutterLeft[u] +
                  "px; width: " +
                  n.gutterWidth[u] +
                  "px"
                )
            );
                }
        }
    }
    function Sr(e, t, r) {
        t.alignable && (t.alignable = null);
        for (
            var n = L("CodeMirror-linewidget"), i = t.node.firstChild, o = void 0;
            i;
            i = o
        )
            (o = i.nextSibling), n.test(i.className) && t.node.removeChild(i);
        Lr(e, t, r);
    }
    function Lr(e, t, r) {
        if ((kr(e, t.line, t, r, !0), t.rest))
            for (var n = 0; n < t.rest.length; n++) kr(e, t.rest[n], t, r, !1);
    }
    function kr(e, t, r, n, i) {
        if (t.widgets)
            for (var o = yr(r), l = 0, s = t.widgets; l < s.length; ++l) {
                var a = s[l],
                    u = A(
                        "div",
                        [a.node],
                        "CodeMirror-linewidget" + (a.className ? " " + a.className : "")
                    );
                a.handleMouseEvents || u.setAttribute("cm-ignore-events", "true"),
                Tr(a, u, r, n),
                e.display.input.setUneditable(u),
                i && a.above
                    ? o.insertBefore(u, r.gutter || r.text)
                    : o.appendChild(u),
                gr(a, "redraw");
            }
    }
    function Tr(e, t, r, n) {
        if (e.noHScroll) {
            (r.alignable || (r.alignable = [])).push(t);
            var i = n.wrapperWidth;
            (t.style.left = n.fixedPos + "px"),
            e.coverGutter ||
          ((i -= n.gutterTotalWidth),
          (t.style.paddingLeft = n.gutterTotalWidth + "px")),
            (t.style.width = i + "px");
        }
        e.coverGutter &&
      ((t.style.zIndex = 5),
      (t.style.position = "relative"),
      e.noHScroll || (t.style.marginLeft = -n.gutterTotalWidth + "px"));
    }
    function Mr(e) {
        if (null != e.height) return e.height;
        var t = e.doc.cm;
        if (!t) return 0;
        if (!D(document.body, e.node)) {
            var r = "position: relative;";
            e.coverGutter &&
        (r += "margin-left: -" + t.display.gutters.offsetWidth + "px;"),
            e.noHScroll && (r += "width: " + t.display.wrapper.clientWidth + "px;"),
            N(t.display.measure, A("div", [e.node], null, r));
        }
        return (e.height = e.node.parentNode.offsetHeight);
    }
    function Nr(e, t) {
        for (var r = We(t); r != e.wrapper; r = r.parentNode)
            if (
                !r ||
        (1 == r.nodeType && "true" == r.getAttribute("cm-ignore-events")) ||
        (r.parentNode == e.sizer && r != e.mover)
            )
                return 1;
    }
    function Or(e) {
        return e.lineSpace.offsetTop;
    }
    function Ar(e) {
        return e.mover.offsetHeight - e.lineSpace.offsetHeight;
    }
    function Dr(e) {
        if (e.cachedPaddingH) return e.cachedPaddingH;
        var t = N(e.measure, A("pre", "x", "CodeMirror-line-like")),
            r = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle,
            n = { left: parseInt(r.paddingLeft), right: parseInt(r.paddingRight) };
        return isNaN(n.left) || isNaN(n.right) || (e.cachedPaddingH = n), n;
    }
    function Wr(e) {
        return G - e.display.nativeBarWidth;
    }
    function Hr(e) {
        return e.display.scroller.clientWidth - Wr(e) - e.display.barWidth;
    }
    function Fr(e) {
        return e.display.scroller.clientHeight - Wr(e) - e.display.barHeight;
    }
    function Pr(e, t, r) {
        if (e.line == t) return { map: e.measure.map, cache: e.measure.cache };
        for (var n = 0; n < e.rest.length; n++)
            if (e.rest[n] == t)
                return { map: e.measure.maps[n], cache: e.measure.caches[n] };
        for (var i = 0; i < e.rest.length; i++)
            if (it(e.rest[i]) > r)
                return {
                    map: e.measure.maps[i],
                    cache: e.measure.caches[i],
                    before: !0,
                };
    }
    function Er(e, t, r, n) {
        return Rr(e, zr(e, t), r, n);
    }
    function Ir(e, t) {
        if (t >= e.display.viewFrom && t < e.display.viewTo)
            return e.display.view[gn(e, t)];
        var r = e.display.externalMeasured;
        return r && t >= r.lineN && t < r.lineN + r.size ? r : void 0;
    }
    function zr(e, t) {
        var r = it(t),
            n = Ir(e, r);
        n && !n.text
            ? (n = null)
            : n && n.changes && (mr(e, n, r, cn(e)), (e.curOp.forceUpdate = !0));
        var i = Pr(
            (n =
        n ||
        (function (e, t) {
            var r = it((t = Xt(t))),
                n = (e.display.externalMeasured = new cr(e.doc, t, r));
            n.lineN = r;
            var i = (n.built = ir(e, n));
            return (n.text = i.pre), N(e.display.lineMeasure, i.pre), n;
        })(e, t)),
            t,
            r
        );
        return {
            line: t,
            view: n,
            rect: null,
            map: i.map,
            cache: i.cache,
            before: i.before,
            hasHeights: !1,
        };
    }
    function Rr(e, t, r, n, i) {
        t.before && (r = -1);
        var o,
            l = r + (n || "");
        return (
            t.cache.hasOwnProperty(l)
                ? (o = t.cache[l])
                : (t.rect || (t.rect = t.view.text.getBoundingClientRect()),
                t.hasHeights ||
            ((function (e, t, r) {
                var n = e.options.lineWrapping,
                    i = n && Hr(e);
                if (!t.measure.heights || (n && t.measure.width != i)) {
                    var o = (t.measure.heights = []);
                    if (n) {
                        t.measure.width = i;
                        for (
                            var l = t.text.firstChild.getClientRects(), s = 0;
                            s < l.length - 1;
                            s++
                        ) {
                            var a = l[s],
                                u = l[s + 1];
                            2 < Math.abs(a.bottom - u.bottom) &&
                      o.push((a.bottom + u.top) / 2 - r.top);
                        }
                    }
                    o.push(r.bottom - r.top);
                }
            })(e, t.view, t.rect),
            (t.hasHeights = !0)),
                (o = (function (e, t, r, n) {
                    var i,
                        o = Ur(t.map, r, n),
                        l = o.node,
                        s = o.start,
                        a = o.end,
                        u = o.collapse;
                    if (3 == l.nodeType) {
                        for (var c = 0; c < 4; c++) {
                            for (; s && ie(t.line.text.charAt(o.coverStart + s)); ) --s;
                            for (
                                ;
                                o.coverStart + a < o.coverEnd &&
                  ie(t.line.text.charAt(o.coverStart + a));

                            )
                                ++a;
                            if (
                                (i =
                    x && C < 9 && 0 == s && a == o.coverEnd - o.coverStart
                        ? l.parentNode.getBoundingClientRect()
                        : Vr(k(l, s, a).getClientRects(), n)).left ||
                  i.right ||
                  0 == s
                            )
                                break;
                            (a = s), --s, (u = "right");
                        }
                        x &&
                C < 11 &&
                (i = (function (e, t) {
                    if (
                        !window.screen ||
                    null == screen.logicalXDPI ||
                    screen.logicalXDPI == screen.deviceXDPI ||
                    !(function (e) {
                        if (null != Ve) return Ve;
                        var t = N(e, A("span", "x")),
                            r = t.getBoundingClientRect(),
                            n = k(t, 0, 1).getBoundingClientRect();
                        return (Ve = 1 < Math.abs(r.left - n.left));
                    })(e)
                    )
                        return t;
                    var r = screen.logicalXDPI / screen.deviceXDPI,
                        n = screen.logicalYDPI / screen.deviceYDPI;
                    return {
                        left: t.left * r,
                        right: t.right * r,
                        top: t.top * n,
                        bottom: t.bottom * n,
                    };
                })(e.display.measure, i));
                    } else {
                        var h;
                        0 < s && (u = n = "right"),
                        (i =
                  e.options.lineWrapping && 1 < (h = l.getClientRects()).length
                      ? h["right" == n ? h.length - 1 : 0]
                      : l.getBoundingClientRect());
                    }
                    if (x && C < 9 && !s && (!i || (!i.left && !i.right))) {
                        var f = l.parentNode.getClientRects()[0];
                        i = f
                            ? {
                                left: f.left,
                                right: f.left + un(e.display),
                                top: f.top,
                                bottom: f.bottom,
                            }
                            : Gr;
                    }
                    for (
                        var d = i.top - t.rect.top,
                            p = i.bottom - t.rect.top,
                            g = (d + p) / 2,
                            v = t.view.measure.heights,
                            m = 0;
                        m < v.length - 1 && !(g < v[m]);
                        m++
                    );
                    var y = m ? v[m - 1] : 0,
                        b = v[m],
                        w = {
                            left: ("right" == u ? i.right : i.left) - t.rect.left,
                            right: ("left" == u ? i.left : i.right) - t.rect.left,
                            top: y,
                            bottom: b,
                        };
                    i.left || i.right || (w.bogus = !0);
                    e.options.singleCursorHeightPerLine ||
              ((w.rtop = d), (w.rbottom = p));
                    return w;
                })(e, t, r, n)).bogus || (t.cache[l] = o)),
            {
                left: o.left,
                right: o.right,
                top: i ? o.rtop : o.top,
                bottom: i ? o.rbottom : o.bottom,
            }
        );
    }
    var Br,
        Gr = { left: 0, right: 0, top: 0, bottom: 0 };
    function Ur(e, t, r) {
        for (var n, i, o, l, s, a, u = 0; u < e.length; u += 3)
            if (
                ((s = e[u]),
                (a = e[u + 1]),
                t < s
                    ? ((i = 0), (o = 1), (l = "left"))
                    : t < a
                        ? (o = (i = t - s) + 1)
                        : (u == e.length - 3 || (t == a && e[u + 3] > t)) &&
            ((i = (o = a - s) - 1), a <= t && (l = "right")),
                null != i)
            ) {
                if (
                    ((n = e[u + 2]),
                    s == a && r == (n.insertLeft ? "left" : "right") && (l = r),
                    "left" == r && 0 == i)
                )
                    for (; u && e[u - 2] == e[u - 3] && e[u - 1].insertLeft; )
                        (n = e[2 + (u -= 3)]), (l = "left");
                if ("right" == r && i == a - s)
                    for (
                        ;
                        u < e.length - 3 && e[u + 3] == e[u + 4] && !e[u + 5].insertLeft;

                    )
                        (n = e[(u += 3) + 2]), (l = "right");
                break;
            }
        return {
            node: n,
            start: i,
            end: o,
            collapse: l,
            coverStart: s,
            coverEnd: a,
        };
    }
    function Vr(e, t) {
        var r = Gr;
        if ("left" == t)
            for (var n = 0; n < e.length && (r = e[n]).left == r.right; n++);
        else for (var i = e.length - 1; 0 <= i && (r = e[i]).left == r.right; i--);
        return r;
    }
    function Kr(e) {
        if (
            e.measure &&
      ((e.measure.cache = {}), (e.measure.heights = null), e.rest)
        )
            for (var t = 0; t < e.rest.length; t++) e.measure.caches[t] = {};
    }
    function jr(e) {
        (e.display.externalMeasure = null), M(e.display.lineMeasure);
        for (var t = 0; t < e.display.view.length; t++) Kr(e.display.view[t]);
    }
    function Xr(e) {
        jr(e),
        (e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null),
        e.options.lineWrapping || (e.display.maxLineChanged = !0),
        (e.display.lineNumChars = null);
    }
    function Yr() {
        return l && h
            ? -(
                document.body.getBoundingClientRect().left -
          parseInt(getComputedStyle(document.body).marginLeft)
            )
            : window.pageXOffset ||
          (document.documentElement || document.body).scrollLeft;
    }
    function _r() {
        return l && h
            ? -(
                document.body.getBoundingClientRect().top -
          parseInt(getComputedStyle(document.body).marginTop)
            )
            : window.pageYOffset ||
          (document.documentElement || document.body).scrollTop;
    }
    function $r(e) {
        var t = 0;
        if (e.widgets)
            for (var r = 0; r < e.widgets.length; ++r)
                e.widgets[r].above && (t += Mr(e.widgets[r]));
        return t;
    }
    function qr(e, t, r, n, i) {
        if (!i) {
            var o = $r(t);
            (r.top += o), (r.bottom += o);
        }
        if ("line" == n) return r;
        n = n || "local";
        var l = Zt(t);
        if (
            ("local" == n ? (l += Or(e.display)) : (l -= e.display.viewOffset),
            "page" == n || "window" == n)
        ) {
            var s = e.display.lineSpace.getBoundingClientRect();
            l += s.top + ("window" == n ? 0 : _r());
            var a = s.left + ("window" == n ? 0 : Yr());
            (r.left += a), (r.right += a);
        }
        return (r.top += l), (r.bottom += l), r;
    }
    function Zr(e, t, r) {
        if ("div" == r) return t;
        var n = t.left,
            i = t.top;
        if ("page" == r) (n -= Yr()), (i -= _r());
        else if ("local" == r || !r) {
            var o = e.display.sizer.getBoundingClientRect();
            (n += o.left), (i += o.top);
        }
        var l = e.display.lineSpace.getBoundingClientRect();
        return { left: n - l.left, top: i - l.top };
    }
    function Qr(e, t, r, n, i) {
        return qr(e, (n = n || et(e.doc, t.line)), Er(e, n, t.ch, i), r);
    }
    function Jr(n, e, i, o, l, s) {
        function a(e, t) {
            var r = Rr(n, l, e, t ? "right" : "left", s);
            return t ? (r.left = r.right) : (r.right = r.left), qr(n, o, r, i);
        }
        (o = o || et(n.doc, e.line)), (l = l || zr(n, o));
        var u = ye(o, n.doc.direction),
            t = e.ch,
            r = e.sticky;
        if (
            (t >= o.text.length
                ? ((t = o.text.length), (r = "before"))
                : t <= 0 && ((t = 0), (r = "after")),
            !u)
        )
            return a("before" == r ? t - 1 : t, "before" == r);
        function c(e, t, r) {
            return a(r ? e - 1 : e, (1 == u[t].level) != r);
        }
        var h = ae(u, t, r),
            f = se,
            d = c(t, h, "before" == r);
        return null != f && (d.other = c(t, f, "before" != r)), d;
    }
    function en(e, t) {
        var r = 0;
        (t = gt(e.doc, t)), e.options.lineWrapping || (r = un(e.display) * t.ch);
        var n = et(e.doc, t.line),
            i = Zt(n) + Or(e.display);
        return { left: r, right: r, top: i, bottom: i + n.height };
    }
    function tn(e, t, r, n, i) {
        var o = at(e, t, r);
        return (o.xRel = i), n && (o.outside = n), o;
    }
    function rn(e, t, r) {
        var n = e.doc;
        if ((r += e.display.viewOffset) < 0) return tn(n.first, 0, null, -1, -1);
        var i = ot(n, r),
            o = n.first + n.size - 1;
        if (o < i)
            return tn(n.first + n.size - 1, et(n, o).text.length, null, 1, 1);
        t < 0 && (t = 0);
        for (var l = et(n, i); ; ) {
            var s = sn(e, l, i, t, r),
                a = Kt(l, s.ch + (0 < s.xRel || 0 < s.outside ? 1 : 0));
            if (!a) return s;
            var u = a.find(1);
            if (u.line == i) return u;
            l = et(n, (i = u.line));
        }
    }
    function nn(t, e, r, n) {
        n -= $r(e);
        var i = e.text.length,
            o = le(
                function (e) {
                    return Rr(t, r, e - 1).bottom <= n;
                },
                i,
                0
            );
        return {
            begin: o,
            end: (i = le(
                function (e) {
                    return Rr(t, r, e).top > n;
                },
                o,
                i
            )),
        };
    }
    function on(e, t, r, n) {
        return nn(e, t, (r = r || zr(e, t)), qr(e, t, Rr(e, r, n), "line").top);
    }
    function ln(e, t, r, n) {
        return !(e.bottom <= r) && (e.top > r || (n ? e.left : e.right) > t);
    }
    function sn(r, e, t, n, i) {
        i -= Zt(e);
        var o = zr(r, e),
            l = $r(e),
            s = 0,
            a = e.text.length,
            u = !0,
            c = ye(e, r.doc.direction);
        if (c) {
            var h = (r.options.lineWrapping
                ? function (e, t, r, n, i, o, l) {
                    var s = nn(e, t, n, l),
                        a = s.begin,
                        u = s.end;
                    /\s/.test(t.text.charAt(u - 1)) && u--;
                    for (var c = null, h = null, f = 0; f < i.length; f++) {
                        var d = i[f];
                        if (!(d.from >= u || d.to <= a)) {
                            var p = 1 != d.level,
                                g = Rr(e, n, p ? Math.min(u, d.to) - 1 : Math.max(a, d.from))
                                    .right,
                                v = g < o ? o - g + 1e9 : g - o;
                            (!c || v < h) && ((c = d), (h = v));
                        }
                    }
                    c = c || i[i.length - 1];
                    c.from < a && (c = { from: a, to: c.to, level: c.level });
                    c.to > u && (c = { from: c.from, to: u, level: c.level });
                    return c;
                }
                : function (n, i, o, l, s, a, u) {
                    var e = le(
                            function (e) {
                                var t = s[e],
                                    r = 1 != t.level;
                                return ln(
                                    Jr(
                                        n,
                                        at(o, r ? t.to : t.from, r ? "before" : "after"),
                                        "line",
                                        i,
                                        l
                                    ),
                                    a,
                                    u,
                                    !0
                                );
                            },
                            0,
                            s.length - 1
                        ),
                        t = s[e];
                    if (0 < e) {
                        var r = 1 != t.level,
                            c = Jr(
                                n,
                                at(o, r ? t.from : t.to, r ? "after" : "before"),
                                "line",
                                i,
                                l
                            );
                        ln(c, a, u, !0) && c.top > u && (t = s[e - 1]);
                    }
                    return t;
                })(r, e, t, o, c, n, i);
            (s = (u = 1 != h.level) ? h.from : h.to - 1), (a = u ? h.to : h.from - 1);
        }
        var f,
            d,
            p = null,
            g = null,
            v = le(
                function (e) {
                    var t = Rr(r, o, e);
                    return (
                        (t.top += l),
                        (t.bottom += l),
                        ln(t, n, i, !1) &&
              (t.top <= i && t.left <= n && ((p = e), (g = t)), 1)
                    );
                },
                s,
                a
            ),
            m = !1;
        if (g) {
            var y = n - g.left < g.right - n,
                b = y == u;
            (v = p + (b ? 0 : 1)),
            (d = b ? "after" : "before"),
            (f = y ? g.left : g.right);
        } else {
            u || (v != a && v != s) || v++,
            (d =
          0 == v
              ? "after"
              : v == e.text.length
                  ? "before"
                  : Rr(r, o, v - (u ? 1 : 0)).bottom + l <= i == u
                      ? "after"
                      : "before");
            var w = Jr(r, at(t, v, d), "line", e, o);
            (f = w.left), (m = i < w.top ? -1 : i >= w.bottom ? 1 : 0);
        }
        return tn(t, (v = oe(e.text, v, 1)), d, m, n - f);
    }
    function an(e) {
        if (null != e.cachedTextHeight) return e.cachedTextHeight;
        if (null == Br) {
            Br = A("pre", null, "CodeMirror-line-like");
            for (var t = 0; t < 49; ++t)
                Br.appendChild(document.createTextNode("x")), Br.appendChild(A("br"));
            Br.appendChild(document.createTextNode("x"));
        }
        N(e.measure, Br);
        var r = Br.offsetHeight / 50;
        return 3 < r && (e.cachedTextHeight = r), M(e.measure), r || 1;
    }
    function un(e) {
        if (null != e.cachedCharWidth) return e.cachedCharWidth;
        var t = A("span", "xxxxxxxxxx"),
            r = A("pre", [t], "CodeMirror-line-like");
        N(e.measure, r);
        var n = t.getBoundingClientRect(),
            i = (n.right - n.left) / 10;
        return 2 < i && (e.cachedCharWidth = i), i || 10;
    }
    function cn(e) {
        for (
            var t = e.display,
                r = {},
                n = {},
                i = t.gutters.clientLeft,
                o = t.gutters.firstChild,
                l = 0;
            o;
            o = o.nextSibling, ++l
        ) {
            var s = e.display.gutterSpecs[l].className;
            (r[s] = o.offsetLeft + o.clientLeft + i), (n[s] = o.clientWidth);
        }
        return {
            fixedPos: hn(t),
            gutterTotalWidth: t.gutters.offsetWidth,
            gutterLeft: r,
            gutterWidth: n,
            wrapperWidth: t.wrapper.clientWidth,
        };
    }
    function hn(e) {
        return (
            e.scroller.getBoundingClientRect().left -
      e.sizer.getBoundingClientRect().left
        );
    }
    function fn(n) {
        var i = an(n.display),
            o = n.options.lineWrapping,
            l = o && Math.max(5, n.display.scroller.clientWidth / un(n.display) - 3);
        return function (e) {
            if ($t(n.doc, e)) return 0;
            var t = 0;
            if (e.widgets)
                for (var r = 0; r < e.widgets.length; r++)
                    e.widgets[r].height && (t += e.widgets[r].height);
            return o ? t + (Math.ceil(e.text.length / l) || 1) * i : t + i;
        };
    }
    function dn(e) {
        var t = e.doc,
            r = fn(e);
        t.iter(function (e) {
            var t = r(e);
            t != e.height && nt(e, t);
        });
    }
    function pn(e, t, r, n) {
        var i = e.display;
        if (!r && "true" == We(t).getAttribute("cm-not-content")) return null;
        var o,
            l,
            s = i.lineSpace.getBoundingClientRect();
        try {
            (o = t.clientX - s.left), (l = t.clientY - s.top);
        } catch (t) {
            return null;
        }
        var a,
            u = rn(e, o, l);
        if (n && 0 < u.xRel && (a = et(e.doc, u.line).text).length == u.ch) {
            var c = z(a, a.length, e.options.tabSize) - a.length;
            u = at(
                u.line,
                Math.max(0, Math.round((o - Dr(e.display).left) / un(e.display)) - c)
            );
        }
        return u;
    }
    function gn(e, t) {
        if (t >= e.display.viewTo) return null;
        if ((t -= e.display.viewFrom) < 0) return null;
        for (var r = e.display.view, n = 0; n < r.length; n++)
            if ((t -= r[n].size) < 0) return n;
    }
    function vn(e, t, r, n) {
        null == t && (t = e.doc.first),
        null == r && (r = e.doc.first + e.doc.size),
        (n = n || 0);
        var i = e.display;
        if (
            (n &&
        r < i.viewTo &&
        (null == i.updateLineNumbers || i.updateLineNumbers > t) &&
        (i.updateLineNumbers = t),
            (e.curOp.viewChanged = !0),
            t >= i.viewTo)
        )
            At && Yt(e.doc, t) < i.viewTo && yn(e);
        else if (r <= i.viewFrom)
            At && _t(e.doc, r + n) > i.viewFrom
                ? yn(e)
                : ((i.viewFrom += n), (i.viewTo += n));
        else if (t <= i.viewFrom && r >= i.viewTo) yn(e);
        else if (t <= i.viewFrom) {
            var o = bn(e, r, r + n, 1);
            o
                ? ((i.view = i.view.slice(o.index)),
                (i.viewFrom = o.lineN),
                (i.viewTo += n))
                : yn(e);
        } else if (r >= i.viewTo) {
            var l = bn(e, t, t, -1);
            l ? ((i.view = i.view.slice(0, l.index)), (i.viewTo = l.lineN)) : yn(e);
        } else {
            var s = bn(e, t, t, -1),
                a = bn(e, r, r + n, 1);
            s && a
                ? ((i.view = i.view
                    .slice(0, s.index)
                    .concat(hr(e, s.lineN, a.lineN))
                    .concat(i.view.slice(a.index))),
                (i.viewTo += n))
                : yn(e);
        }
        var u = i.externalMeasured;
        u &&
      (r < u.lineN
          ? (u.lineN += n)
          : t < u.lineN + u.size && (i.externalMeasured = null));
    }
    function mn(e, t, r) {
        e.curOp.viewChanged = !0;
        var n = e.display,
            i = e.display.externalMeasured;
        if (
            (i && t >= i.lineN && t < i.lineN + i.size && (n.externalMeasured = null),
            !(t < n.viewFrom || t >= n.viewTo))
        ) {
            var o = n.view[gn(e, t)];
            if (null != o.node) {
                var l = o.changes || (o.changes = []);
                -1 == B(l, r) && l.push(r);
            }
        }
    }
    function yn(e) {
        (e.display.viewFrom = e.display.viewTo = e.doc.first),
        (e.display.view = []),
        (e.display.viewOffset = 0);
    }
    function bn(e, t, r, n) {
        var i,
            o = gn(e, t),
            l = e.display.view;
        if (!At || r == e.doc.first + e.doc.size) return { index: o, lineN: r };
        for (var s = e.display.viewFrom, a = 0; a < o; a++) s += l[a].size;
        if (s != t) {
            if (0 < n) {
                if (o == l.length - 1) return null;
                (i = s + l[o].size - t), o++;
            } else i = s - t;
            (t += i), (r += i);
        }
        for (; Yt(e.doc, r) != r; ) {
            if (o == (n < 0 ? 0 : l.length - 1)) return null;
            (r += n * l[o - (n < 0 ? 1 : 0)].size), (o += n);
        }
        return { index: o, lineN: r };
    }
    function wn(e) {
        for (var t = e.display.view, r = 0, n = 0; n < t.length; n++) {
            var i = t[n];
            i.hidden || (i.node && !i.changes) || ++r;
        }
        return r;
    }
    function xn(e) {
        e.display.input.showSelection(e.display.input.prepareSelection());
    }
    function Cn(e, t) {
        void 0 === t && (t = !0);
        for (
            var r = e.doc,
                n = {},
                i = (n.cursors = document.createDocumentFragment()),
                o = (n.selection = document.createDocumentFragment()),
                l = 0;
            l < r.sel.ranges.length;
            l++
        )
            if (t || l != r.sel.primIndex) {
                var s = r.sel.ranges[l];
                if (
                    !(
                        s.from().line >= e.display.viewTo ||
            s.to().line < e.display.viewFrom
                    )
                ) {
                    var a = s.empty();
                    (a || e.options.showCursorWhenSelecting) && Sn(e, s.head, i),
                    a || kn(e, s, o);
                }
            }
        return n;
    }
    function Sn(e, t, r) {
        var n = Jr(e, t, "div", null, null, !e.options.singleCursorHeightPerLine),
            i = r.appendChild(A("div", " ", "CodeMirror-cursor"));
        if (
            ((i.style.left = n.left + "px"),
            (i.style.top = n.top + "px"),
            (i.style.height =
        Math.max(0, n.bottom - n.top) * e.options.cursorHeight + "px"),
            n.other)
        ) {
            var o = r.appendChild(
                A("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor")
            );
            (o.style.display = ""),
            (o.style.left = n.other.left + "px"),
            (o.style.top = n.other.top + "px"),
            (o.style.height = 0.85 * (n.other.bottom - n.other.top) + "px");
        }
    }
    function Ln(e, t) {
        return e.top - t.top || e.left - t.left;
    }
    function kn(l, e, t) {
        var r = l.display,
            n = l.doc,
            i = document.createDocumentFragment(),
            o = Dr(l.display),
            T = o.left,
            M = Math.max(r.sizerWidth, Hr(l) - r.sizer.offsetLeft) - o.right,
            N = "ltr" == n.direction;
        function O(e, t, r, n) {
            t < 0 && (t = 0),
            (t = Math.round(t)),
            (n = Math.round(n)),
            i.appendChild(
                A(
                    "div",
                    null,
                    "CodeMirror-selected",
                    "position: absolute; left: " +
              e +
              "px;\n                             top: " +
              t +
              "px; width: " +
              (null == r ? M - e : r) +
              "px;\n                             height: " +
              (n - t) +
              "px"
                )
            );
        }
        function s(r, y, b) {
            var w,
                x,
                o = et(n, r),
                C = o.text.length;
            function S(e, t) {
                return Qr(l, at(r, e), "div", o, t);
            }
            function L(e, t, r) {
                var n = on(l, o, null, e),
                    i = ("ltr" == t) == ("after" == r) ? "left" : "right";
                return S(
                    "after" == r
                        ? n.begin
                        : n.end - (/\s/.test(o.text.charAt(n.end - 1)) ? 2 : 1),
                    i
                )[i];
            }
            var k = ye(o, n.direction);
            return (
                (function (e, t, r, n) {
                    if (!e) return n(t, r, "ltr", 0);
                    for (var i = !1, o = 0; o < e.length; ++o) {
                        var l = e[o];
                        ((l.from < r && l.to > t) || (t == r && l.to == t)) &&
              (n(
                  Math.max(l.from, t),
                  Math.min(l.to, r),
                  1 == l.level ? "rtl" : "ltr",
                  o
              ),
              (i = !0));
                    }
                    i || n(t, r, "ltr");
                })(k, y || 0, null == b ? C : b, function (e, t, r, n) {
                    var i = "ltr" == r,
                        o = S(e, i ? "left" : "right"),
                        l = S(t - 1, i ? "right" : "left"),
                        s = null == y && 0 == e,
                        a = null == b && t == C,
                        u = 0 == n,
                        c = !k || n == k.length - 1;
                    if (l.top - o.top <= 3) {
                        var h = (N ? a : s) && c,
                            f = (N ? s : a) && u ? T : (i ? o : l).left,
                            d = h ? M : (i ? l : o).right;
                        O(f, o.top, d - f, o.bottom);
                    } else {
                        var p, g, v, m;
                        (m = i
                            ? ((p = N && s && u ? T : o.left),
                            (g = N ? M : L(e, r, "before")),
                            (v = N ? T : L(t, r, "after")),
                            N && a && c ? M : l.right)
                            : ((p = N ? L(e, r, "before") : T),
                            (g = !N && s && u ? M : o.right),
                            (v = !N && a && c ? T : l.left),
                            N ? L(t, r, "after") : M)),
                        O(p, o.top, g - p, o.bottom),
                        o.bottom < l.top && O(T, o.bottom, null, l.top),
                        O(v, l.top, m - v, l.bottom);
                    }
                    (!w || Ln(o, w) < 0) && (w = o),
                    Ln(l, w) < 0 && (w = l),
                    (!x || Ln(o, x) < 0) && (x = o),
                    Ln(l, x) < 0 && (x = l);
                }),
                { start: w, end: x }
            );
        }
        var a = e.from(),
            u = e.to();
        if (a.line == u.line) s(a.line, a.ch, u.ch);
        else {
            var c = et(n, a.line),
                h = et(n, u.line),
                f = Xt(c) == Xt(h),
                d = s(a.line, a.ch, f ? c.text.length + 1 : null).end,
                p = s(u.line, f ? 0 : null, u.ch).start;
            f &&
        (d.top < p.top - 2
            ? (O(d.right, d.top, null, d.bottom), O(T, p.top, p.left, p.bottom))
            : O(d.right, d.top, p.left - d.right, d.bottom)),
            d.bottom < p.top && O(T, d.bottom, null, p.top);
        }
        t.appendChild(i);
    }
    function Tn(e) {
        if (e.state.focused) {
            var t = e.display;
            clearInterval(t.blinker);
            var r = !0;
            (t.cursorDiv.style.visibility = ""),
            0 < e.options.cursorBlinkRate
                ? (t.blinker = setInterval(function () {
                    return (t.cursorDiv.style.visibility = (r = !r) ? "" : "hidden");
                }, e.options.cursorBlinkRate))
                : e.options.cursorBlinkRate < 0 &&
            (t.cursorDiv.style.visibility = "hidden");
        }
    }
    function Mn(e) {
        e.state.focused || (e.display.input.focus(), On(e));
    }
    function Nn(e) {
        (e.state.delayingBlurEvent = !0),
        setTimeout(function () {
            e.state.delayingBlurEvent && ((e.state.delayingBlurEvent = !1), An(e));
        }, 100);
    }
    function On(e, t) {
        e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1),
        "nocursor" != e.options.readOnly &&
        (e.state.focused ||
          (Se(e, "focus", e, t),
          (e.state.focused = !0),
          H(e.display.wrapper, "CodeMirror-focused"),
          e.curOp ||
            e.display.selForContextMenu == e.doc.sel ||
            (e.display.input.reset(),
            b &&
              setTimeout(function () {
                  return e.display.input.reset(!0);
              }, 20)),
          e.display.input.receivedFocus()),
        Tn(e));
    }
    function An(e, t) {
        e.state.delayingBlurEvent ||
      (e.state.focused &&
        (Se(e, "blur", e, t),
        (e.state.focused = !1),
        T(e.display.wrapper, "CodeMirror-focused")),
      clearInterval(e.display.blinker),
      setTimeout(function () {
          e.state.focused || (e.display.shift = !1);
      }, 150));
    }
    function Dn(e) {
        for (
            var t = e.display, r = t.lineDiv.offsetTop, n = 0;
            n < t.view.length;
            n++
        ) {
            var i = t.view[n],
                o = e.options.lineWrapping,
                l = void 0,
                s = 0;
            if (!i.hidden) {
                if (x && C < 8) {
                    var a = i.node.offsetTop + i.node.offsetHeight;
                    (l = a - r), (r = a);
                } else {
                    var u = i.node.getBoundingClientRect();
                    (l = u.bottom - u.top),
                    !o &&
              i.text.firstChild &&
              (s =
                i.text.firstChild.getBoundingClientRect().right - u.left - 1);
                }
                var c = i.line.height - l;
                if ((0.005 < c || c < -0.005) && (nt(i.line, l), Wn(i.line), i.rest))
                    for (var h = 0; h < i.rest.length; h++) Wn(i.rest[h]);
                if (s > e.display.sizerWidth) {
                    var f = Math.ceil(s / un(e.display));
                    f > e.display.maxLineLength &&
            ((e.display.maxLineLength = f),
            (e.display.maxLine = i.line),
            (e.display.maxLineChanged = !0));
                }
            }
        }
    }
    function Wn(e) {
        if (e.widgets)
            for (var t = 0; t < e.widgets.length; ++t) {
                var r = e.widgets[t],
                    n = r.node.parentNode;
                n && (r.height = n.offsetHeight);
            }
    }
    function Hn(e, t, r) {
        var n = r && null != r.top ? Math.max(0, r.top) : e.scroller.scrollTop;
        n = Math.floor(n - Or(e));
        var i = r && null != r.bottom ? r.bottom : n + e.wrapper.clientHeight,
            o = ot(t, n),
            l = ot(t, i);
        if (r && r.ensure) {
            var s = r.ensure.from.line,
                a = r.ensure.to.line;
            s < o
                ? (l = ot(t, Zt(et(t, (o = s))) + e.wrapper.clientHeight))
                : Math.min(a, t.lastLine()) >= l &&
          ((o = ot(t, Zt(et(t, a)) - e.wrapper.clientHeight)), (l = a));
        }
        return { from: o, to: Math.max(l, o + 1) };
    }
    function Fn(e, t) {
        var r = e.display,
            n = an(e.display);
        t.top < 0 && (t.top = 0);
        var i =
        e.curOp && null != e.curOp.scrollTop
            ? e.curOp.scrollTop
            : r.scroller.scrollTop,
            o = Fr(e),
            l = {};
        t.bottom - t.top > o && (t.bottom = t.top + o);
        var s = e.doc.height + Ar(r),
            a = t.top < n,
            u = t.bottom > s - n;
        if (t.top < i) l.scrollTop = a ? 0 : t.top;
        else if (t.bottom > i + o) {
            var c = Math.min(t.top, (u ? s : t.bottom) - o);
            c != i && (l.scrollTop = c);
        }
        var h =
        e.curOp && null != e.curOp.scrollLeft
            ? e.curOp.scrollLeft
            : r.scroller.scrollLeft,
            f = Hr(e) - (e.options.fixedGutter ? r.gutters.offsetWidth : 0),
            d = t.right - t.left > f;
        return (
            d && (t.right = t.left + f),
            t.left < 10
                ? (l.scrollLeft = 0)
                : t.left < h
                    ? (l.scrollLeft = Math.max(0, t.left - (d ? 0 : 10)))
                    : t.right > f + h - 3 && (l.scrollLeft = t.right + (d ? 0 : 10) - f),
            l
        );
    }
    function Pn(e, t) {
        null != t &&
      (zn(e),
      (e.curOp.scrollTop =
        (null == e.curOp.scrollTop ? e.doc.scrollTop : e.curOp.scrollTop) + t));
    }
    function En(e) {
        zn(e);
        var t = e.getCursor();
        e.curOp.scrollToPos = {
            from: t,
            to: t,
            margin: e.options.cursorScrollMargin,
        };
    }
    function In(e, t, r) {
        (null == t && null == r) || zn(e),
        null != t && (e.curOp.scrollLeft = t),
        null != r && (e.curOp.scrollTop = r);
    }
    function zn(e) {
        var t = e.curOp.scrollToPos;
        t &&
      ((e.curOp.scrollToPos = null),
      Rn(e, en(e, t.from), en(e, t.to), t.margin));
    }
    function Rn(e, t, r, n) {
        var i = Fn(e, {
            left: Math.min(t.left, r.left),
            top: Math.min(t.top, r.top) - n,
            right: Math.max(t.right, r.right),
            bottom: Math.max(t.bottom, r.bottom) + n,
        });
        In(e, i.scrollLeft, i.scrollTop);
    }
    function Bn(e, t) {
        Math.abs(e.doc.scrollTop - t) < 2 ||
      (g || fi(e, { top: t }), Gn(e, t, !0), g && fi(e), si(e, 100));
    }
    function Gn(e, t, r) {
        (t = Math.max(
            0,
            Math.min(
                e.display.scroller.scrollHeight - e.display.scroller.clientHeight,
                t
            )
        )),
        (e.display.scroller.scrollTop == t && !r) ||
        ((e.doc.scrollTop = t),
        e.display.scrollbars.setScrollTop(t),
        e.display.scroller.scrollTop != t &&
          (e.display.scroller.scrollTop = t));
    }
    function Un(e, t, r, n) {
        (t = Math.max(
            0,
            Math.min(
                t,
                e.display.scroller.scrollWidth - e.display.scroller.clientWidth
            )
        )),
        ((r ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) &&
        !n) ||
        ((e.doc.scrollLeft = t),
        gi(e),
        e.display.scroller.scrollLeft != t &&
          (e.display.scroller.scrollLeft = t),
        e.display.scrollbars.setScrollLeft(t));
    }
    function Vn(e) {
        var t = e.display,
            r = t.gutters.offsetWidth,
            n = Math.round(e.doc.height + Ar(e.display));
        return {
            clientHeight: t.scroller.clientHeight,
            viewHeight: t.wrapper.clientHeight,
            scrollWidth: t.scroller.scrollWidth,
            clientWidth: t.scroller.clientWidth,
            viewWidth: t.wrapper.clientWidth,
            barLeft: e.options.fixedGutter ? r : 0,
            docHeight: n,
            scrollHeight: n + Wr(e) + t.barHeight,
            nativeBarWidth: t.nativeBarWidth,
            gutterWidth: r,
        };
    }
    function Kn(e, t, r) {
        this.cm = r;
        var n = (this.vert = A(
                "div",
                [A("div", null, null, "min-width: 1px")],
                "CodeMirror-vscrollbar"
            )),
            i = (this.horiz = A(
                "div",
                [A("div", null, null, "height: 100%; min-height: 1px")],
                "CodeMirror-hscrollbar"
            ));
        (n.tabIndex = i.tabIndex = -1),
        e(n),
        e(i),
        we(n, "scroll", function () {
            n.clientHeight && t(n.scrollTop, "vertical");
        }),
        we(i, "scroll", function () {
            i.clientWidth && t(i.scrollLeft, "horizontal");
        }),
        (this.checkedZeroWidth = !1),
        x &&
        C < 8 &&
        (this.horiz.style.minHeight = this.vert.style.minWidth = "18px");
    }
    (Kn.prototype.update = function (e) {
        var t = e.scrollWidth > e.clientWidth + 1,
            r = e.scrollHeight > e.clientHeight + 1,
            n = e.nativeBarWidth;
        if (r) {
            (this.vert.style.display = "block"),
            (this.vert.style.bottom = t ? n + "px" : "0");
            var i = e.viewHeight - (t ? n : 0);
            this.vert.firstChild.style.height =
        Math.max(0, e.scrollHeight - e.clientHeight + i) + "px";
        } else
            (this.vert.style.display = ""), (this.vert.firstChild.style.height = "0");
        if (t) {
            (this.horiz.style.display = "block"),
            (this.horiz.style.right = r ? n + "px" : "0"),
            (this.horiz.style.left = e.barLeft + "px");
            var o = e.viewWidth - e.barLeft - (r ? n : 0);
            this.horiz.firstChild.style.width =
        Math.max(0, e.scrollWidth - e.clientWidth + o) + "px";
        } else
            (this.horiz.style.display = ""),
            (this.horiz.firstChild.style.width = "0");
        return (
            !this.checkedZeroWidth &&
        0 < e.clientHeight &&
        (0 == n && this.zeroWidthHack(), (this.checkedZeroWidth = !0)),
            { right: r ? n : 0, bottom: t ? n : 0 }
        );
    }),
    (Kn.prototype.setScrollLeft = function (e) {
        this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e),
        this.disableHoriz &&
          this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
    }),
    (Kn.prototype.setScrollTop = function (e) {
        this.vert.scrollTop != e && (this.vert.scrollTop = e),
        this.disableVert &&
          this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
    }),
    (Kn.prototype.zeroWidthHack = function () {
        var e = w && !s ? "12px" : "18px";
        (this.horiz.style.height = this.vert.style.width = e),
        (this.horiz.style.pointerEvents = this.vert.style.pointerEvents =
          "none"),
        (this.disableHoriz = new R()),
        (this.disableVert = new R());
    }),
    (Kn.prototype.enableZeroWidthBar = function (r, n, i) {
        (r.style.pointerEvents = "auto"),
        n.set(1e3, function e() {
            var t = r.getBoundingClientRect();
            ("vert" == i
                ? document.elementFromPoint(t.right - 1, (t.top + t.bottom) / 2)
                : document.elementFromPoint(
                    (t.right + t.left) / 2,
                    t.bottom - 1
                )) != r
                ? (r.style.pointerEvents = "none")
                : n.set(1e3, e);
        });
    }),
    (Kn.prototype.clear = function () {
        var e = this.horiz.parentNode;
        e.removeChild(this.horiz), e.removeChild(this.vert);
    });
    function jn() {}
    function Xn(e, t) {
        t = t || Vn(e);
        var r = e.display.barWidth,
            n = e.display.barHeight;
        Yn(e, t);
        for (
            var i = 0;
            (i < 4 && r != e.display.barWidth) || n != e.display.barHeight;
            i++
        )
            r != e.display.barWidth && e.options.lineWrapping && Dn(e),
            Yn(e, Vn(e)),
            (r = e.display.barWidth),
            (n = e.display.barHeight);
    }
    function Yn(e, t) {
        var r = e.display,
            n = r.scrollbars.update(t);
        (r.sizer.style.paddingRight = (r.barWidth = n.right) + "px"),
        (r.sizer.style.paddingBottom = (r.barHeight = n.bottom) + "px"),
        (r.heightForcer.style.borderBottom = n.bottom + "px solid transparent"),
        n.right && n.bottom
            ? ((r.scrollbarFiller.style.display = "block"),
            (r.scrollbarFiller.style.height = n.bottom + "px"),
            (r.scrollbarFiller.style.width = n.right + "px"))
            : (r.scrollbarFiller.style.display = ""),
        n.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter
            ? ((r.gutterFiller.style.display = "block"),
            (r.gutterFiller.style.height = n.bottom + "px"),
            (r.gutterFiller.style.width = t.gutterWidth + "px"))
            : (r.gutterFiller.style.display = "");
    }
    (jn.prototype.update = function () {
        return { bottom: 0, right: 0 };
    }),
    (jn.prototype.setScrollLeft = function () {}),
    (jn.prototype.setScrollTop = function () {}),
    (jn.prototype.clear = function () {});
    var _n = { native: Kn, null: jn };
    function $n(r) {
        r.display.scrollbars &&
      (r.display.scrollbars.clear(),
      r.display.scrollbars.addClass &&
        T(r.display.wrapper, r.display.scrollbars.addClass)),
        (r.display.scrollbars = new _n[r.options.scrollbarStyle](
            function (e) {
                r.display.wrapper.insertBefore(e, r.display.scrollbarFiller),
                we(e, "mousedown", function () {
                    r.state.focused &&
                setTimeout(function () {
                    return r.display.input.focus();
                }, 0);
                }),
                e.setAttribute("cm-not-content", "true");
            },
            function (e, t) {
                ("horizontal" == t ? Un : Bn)(r, e);
            },
            r
        )),
        r.display.scrollbars.addClass &&
        H(r.display.wrapper, r.display.scrollbars.addClass);
    }
    var qn = 0;
    function Zn(e) {
        var t;
        (e.curOp = {
            cm: e,
            viewChanged: !1,
            startHeight: e.doc.height,
            forceUpdate: !1,
            updateInput: 0,
            typing: !1,
            changeObjs: null,
            cursorActivityHandlers: null,
            cursorActivityCalled: 0,
            selectionChanged: !1,
            updateMaxLine: !1,
            scrollLeft: null,
            scrollTop: null,
            scrollToPos: null,
            focus: !1,
            id: ++qn,
        }),
        (t = e.curOp),
        fr
            ? fr.ops.push(t)
            : (t.ownsGroup = fr = { ops: [t], delayedCallbacks: [] });
    }
    function Qn(e) {
        var t = e.curOp;
        t &&
      dr(t, function (e) {
          for (var t = 0; t < e.ops.length; t++) e.ops[t].cm.curOp = null;
          !(function (e) {
              for (var t = e.ops, r = 0; r < t.length; r++) Jn(t[r]);
              for (var n = 0; n < t.length; n++)
                  (i = t[n]).updatedDisplay = i.mustUpdate && ci(i.cm, i.update);
              var i;
              for (var o = 0; o < t.length; o++) ei(t[o]);
              for (var l = 0; l < t.length; l++) ti(t[l]);
              for (var s = 0; s < t.length; s++) ri(t[s]);
          })(e);
      });
    }
    function Jn(e) {
        var t,
            r,
            n = e.cm,
            i = n.display;
        !(r = (t = n).display).scrollbarsClipped &&
      r.scroller.offsetWidth &&
      ((r.nativeBarWidth = r.scroller.offsetWidth - r.scroller.clientWidth),
      (r.heightForcer.style.height = Wr(t) + "px"),
      (r.sizer.style.marginBottom = -r.nativeBarWidth + "px"),
      (r.sizer.style.borderRightWidth = Wr(t) + "px"),
      (r.scrollbarsClipped = !0)),
        e.updateMaxLine && Jt(n),
        (e.mustUpdate =
        e.viewChanged ||
        e.forceUpdate ||
        null != e.scrollTop ||
        (e.scrollToPos &&
          (e.scrollToPos.from.line < i.viewFrom ||
            e.scrollToPos.to.line >= i.viewTo)) ||
        (i.maxLineChanged && n.options.lineWrapping)),
        (e.update =
        e.mustUpdate &&
        new ui(
            n,
            e.mustUpdate && { top: e.scrollTop, ensure: e.scrollToPos },
            e.forceUpdate
        ));
    }
    function ei(e) {
        var t = e.cm,
            r = t.display;
        e.updatedDisplay && Dn(t),
        (e.barMeasure = Vn(t)),
        r.maxLineChanged &&
        !t.options.lineWrapping &&
        ((e.adjustWidthTo = Er(t, r.maxLine, r.maxLine.text.length).left + 3),
        (t.display.sizerWidth = e.adjustWidthTo),
        (e.barMeasure.scrollWidth = Math.max(
            r.scroller.clientWidth,
            r.sizer.offsetLeft + e.adjustWidthTo + Wr(t) + t.display.barWidth
        )),
        (e.maxScrollLeft = Math.max(
            0,
            r.sizer.offsetLeft + e.adjustWidthTo - Hr(t)
        ))),
        (e.updatedDisplay || e.selectionChanged) &&
        (e.preparedSelection = r.input.prepareSelection());
    }
    function ti(e) {
        var t = e.cm;
        null != e.adjustWidthTo &&
      ((t.display.sizer.style.minWidth = e.adjustWidthTo + "px"),
      e.maxScrollLeft < t.doc.scrollLeft &&
        Un(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0),
      (t.display.maxLineChanged = !1));
        var r = e.focus && e.focus == W();
        e.preparedSelection &&
      t.display.input.showSelection(e.preparedSelection, r),
        (!e.updatedDisplay && e.startHeight == t.doc.height) ||
        Xn(t, e.barMeasure),
        e.updatedDisplay && pi(t, e.barMeasure),
        e.selectionChanged && Tn(t),
        t.state.focused && e.updateInput && t.display.input.reset(e.typing),
        r && Mn(e.cm);
    }
    function ri(e) {
        var t = e.cm,
            r = t.display,
            n = t.doc;
        e.updatedDisplay && hi(t, e.update),
        null == r.wheelStartX ||
        (null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos) ||
        (r.wheelStartX = r.wheelStartY = null),
        null != e.scrollTop && Gn(t, e.scrollTop, e.forceScroll),
        null != e.scrollLeft && Un(t, e.scrollLeft, !0, !0),
        e.scrollToPos &&
        (function (e, t) {
            if (!Le(e, "scrollCursorIntoView")) {
                var r = e.display,
                    n = r.sizer.getBoundingClientRect(),
                    i = null;
                if (
                    (t.top + n.top < 0
                        ? (i = !0)
                        : t.bottom + n.top >
                    (window.innerHeight ||
                      document.documentElement.clientHeight) && (i = !1),
                    null != i && !u)
                ) {
                    var o = A(
                        "div",
                        "​",
                        null,
                        "position: absolute;\n                         top: " +
                  (t.top - r.viewOffset - Or(e.display)) +
                  "px;\n                         height: " +
                  (t.bottom - t.top + Wr(e) + r.barHeight) +
                  "px;\n                         left: " +
                  t.left +
                  "px; width: " +
                  Math.max(2, t.right - t.left) +
                  "px;"
                    );
                    e.display.lineSpace.appendChild(o),
                    o.scrollIntoView(i),
                    e.display.lineSpace.removeChild(o);
                }
            }
        })(
            t,
            (function (e, t, r, n) {
                var i;
                null == n && (n = 0),
                e.options.lineWrapping ||
                t != r ||
                (r =
                  "before" ==
                  (t = t.ch
                      ? at(
                          t.line,
                          "before" == t.sticky ? t.ch - 1 : t.ch,
                          "after"
                      )
                      : t).sticky
                      ? at(t.line, t.ch + 1, "before")
                      : t);
                for (var o = 0; o < 5; o++) {
                    var l = !1,
                        s = Jr(e, t),
                        a = r && r != t ? Jr(e, r) : s,
                        u = Fn(
                            e,
                            (i = {
                                left: Math.min(s.left, a.left),
                                top: Math.min(s.top, a.top) - n,
                                right: Math.max(s.left, a.left),
                                bottom: Math.max(s.bottom, a.bottom) + n,
                            })
                        ),
                        c = e.doc.scrollTop,
                        h = e.doc.scrollLeft;
                    if (
                        (null != u.scrollTop &&
                  (Bn(e, u.scrollTop),
                  1 < Math.abs(e.doc.scrollTop - c) && (l = !0)),
                        null != u.scrollLeft &&
                  (Un(e, u.scrollLeft),
                  1 < Math.abs(e.doc.scrollLeft - h) && (l = !0)),
                        !l)
                    )
                        break;
                }
                return i;
            })(
                t,
                gt(n, e.scrollToPos.from),
                gt(n, e.scrollToPos.to),
                e.scrollToPos.margin
            )
        );
        var i = e.maybeHiddenMarkers,
            o = e.maybeUnhiddenMarkers;
        if (i)
            for (var l = 0; l < i.length; ++l) i[l].lines.length || Se(i[l], "hide");
        if (o)
            for (var s = 0; s < o.length; ++s)
                o[s].lines.length && Se(o[s], "unhide");
        r.wrapper.offsetHeight && (n.scrollTop = t.display.scroller.scrollTop),
        e.changeObjs && Se(t, "changes", t, e.changeObjs),
        e.update && e.update.finish();
    }
    function ni(e, t) {
        if (e.curOp) return t();
        Zn(e);
        try {
            return t();
        } finally {
            Qn(e);
        }
    }
    function ii(e, t) {
        return function () {
            if (e.curOp) return t.apply(e, arguments);
            Zn(e);
            try {
                return t.apply(e, arguments);
            } finally {
                Qn(e);
            }
        };
    }
    function oi(e) {
        return function () {
            if (this.curOp) return e.apply(this, arguments);
            Zn(this);
            try {
                return e.apply(this, arguments);
            } finally {
                Qn(this);
            }
        };
    }
    function li(t) {
        return function () {
            var e = this.cm;
            if (!e || e.curOp) return t.apply(this, arguments);
            Zn(e);
            try {
                return t.apply(this, arguments);
            } finally {
                Qn(e);
            }
        };
    }
    function si(e, t) {
        e.doc.highlightFrontier < e.display.viewTo &&
      e.state.highlight.set(t, E(ai, e));
    }
    function ai(a) {
        var u = a.doc;
        if (!(u.highlightFrontier >= a.display.viewTo)) {
            var c = +new Date() + a.options.workTime,
                h = xt(a, u.highlightFrontier),
                f = [];
            u.iter(
                h.line,
                Math.min(u.first + u.size, a.display.viewTo + 500),
                function (e) {
                    if (h.line >= a.display.viewFrom) {
                        var t = e.styles,
                            r =
                e.text.length > a.options.maxHighlightLength
                    ? qe(u.mode, h.state)
                    : null,
                            n = bt(a, e, h, !0);
                        r && (h.state = r), (e.styles = n.styles);
                        var i = e.styleClasses,
                            o = n.classes;
                        o ? (e.styleClasses = o) : i && (e.styleClasses = null);
                        for (
                            var l =
                  !t ||
                  t.length != e.styles.length ||
                  (i != o &&
                    (!i ||
                      !o ||
                      i.bgClass != o.bgClass ||
                      i.textClass != o.textClass)),
                                s = 0;
                            !l && s < t.length;
                            ++s
                        )
                            l = t[s] != e.styles[s];
                        l && f.push(h.line), (e.stateAfter = h.save()), h.nextLine();
                    } else
                        e.text.length <= a.options.maxHighlightLength && Ct(a, e.text, h),
                        (e.stateAfter = h.line % 5 == 0 ? h.save() : null),
                        h.nextLine();
                    if (+new Date() > c) return si(a, a.options.workDelay), !0;
                }
            ),
            (u.highlightFrontier = h.line),
            (u.modeFrontier = Math.max(u.modeFrontier, h.line)),
            f.length &&
          ni(a, function () {
              for (var e = 0; e < f.length; e++) mn(a, f[e], "text");
          });
        }
    }
    var ui = function (e, t, r) {
        var n = e.display;
        (this.viewport = t),
        (this.visible = Hn(n, e.doc, t)),
        (this.editorIsHidden = !n.wrapper.offsetWidth),
        (this.wrapperHeight = n.wrapper.clientHeight),
        (this.wrapperWidth = n.wrapper.clientWidth),
        (this.oldDisplayWidth = Hr(e)),
        (this.force = r),
        (this.dims = cn(e)),
        (this.events = []);
    };
    function ci(e, t) {
        var r = e.display,
            n = e.doc;
        if (t.editorIsHidden) return yn(e), !1;
        if (
            !t.force &&
      t.visible.from >= r.viewFrom &&
      t.visible.to <= r.viewTo &&
      (null == r.updateLineNumbers || r.updateLineNumbers >= r.viewTo) &&
      r.renderedView == r.view &&
      0 == wn(e)
        )
            return !1;
        vi(e) && (yn(e), (t.dims = cn(e)));
        var i = n.first + n.size,
            o = Math.max(t.visible.from - e.options.viewportMargin, n.first),
            l = Math.min(i, t.visible.to + e.options.viewportMargin);
        r.viewFrom < o &&
      o - r.viewFrom < 20 &&
      (o = Math.max(n.first, r.viewFrom)),
        r.viewTo > l && r.viewTo - l < 20 && (l = Math.min(i, r.viewTo)),
        At && ((o = Yt(e.doc, o)), (l = _t(e.doc, l)));
        var s,
            a,
            u,
            c,
            h =
        o != r.viewFrom ||
        l != r.viewTo ||
        r.lastWrapHeight != t.wrapperHeight ||
        r.lastWrapWidth != t.wrapperWidth;
        (a = o),
        (u = l),
        0 == (c = (s = e).display).view.length || a >= c.viewTo || u <= c.viewFrom
            ? ((c.view = hr(s, a, u)), (c.viewFrom = a))
            : (c.viewFrom > a
                ? (c.view = hr(s, a, c.viewFrom).concat(c.view))
                : c.viewFrom < a && (c.view = c.view.slice(gn(s, a))),
            (c.viewFrom = a),
            c.viewTo < u
                ? (c.view = c.view.concat(hr(s, c.viewTo, u)))
                : c.viewTo > u && (c.view = c.view.slice(0, gn(s, u)))),
        (c.viewTo = u),
        (r.viewOffset = Zt(et(e.doc, r.viewFrom))),
        (e.display.mover.style.top = r.viewOffset + "px");
        var f = wn(e);
        if (
            !h &&
      0 == f &&
      !t.force &&
      r.renderedView == r.view &&
      (null == r.updateLineNumbers || r.updateLineNumbers >= r.viewTo)
        )
            return !1;
        var d = (function (e) {
            if (e.hasFocus()) return null;
            var t = W();
            if (!t || !D(e.display.lineDiv, t)) return null;
            var r = { activeElt: t };
            if (window.getSelection) {
                var n = window.getSelection();
                n.anchorNode &&
          n.extend &&
          D(e.display.lineDiv, n.anchorNode) &&
          ((r.anchorNode = n.anchorNode),
          (r.anchorOffset = n.anchorOffset),
          (r.focusNode = n.focusNode),
          (r.focusOffset = n.focusOffset));
            }
            return r;
        })(e);
        return (
            4 < f && (r.lineDiv.style.display = "none"),
            (function (r, e, t) {
                var n = r.display,
                    i = r.options.lineNumbers,
                    o = n.lineDiv,
                    l = o.firstChild;
                function s(e) {
                    var t = e.nextSibling;
                    return (
                        b && w && r.display.currentWheelTarget == e
                            ? (e.style.display = "none")
                            : e.parentNode.removeChild(e),
                        t
                    );
                }
                for (var a = n.view, u = n.viewFrom, c = 0; c < a.length; c++) {
                    var h = a[c];
                    if (!h.hidden)
                        if (h.node && h.node.parentNode == o) {
                            for (; l != h.node; ) l = s(l);
                            var f = i && null != e && e <= u && h.lineNumber;
                            h.changes &&
                (-1 < B(h.changes, "gutter") && (f = !1), mr(r, h, u, t)),
                            f &&
                  (M(h.lineNumber),
                  h.lineNumber.appendChild(
                      document.createTextNode(st(r.options, u))
                  )),
                            (l = h.node.nextSibling);
                        } else {
                            var d =
                ((v = u),
                (m = t),
                (y = br((p = r), (g = h))),
                (g.text = g.node = y.pre),
                y.bgClass && (g.bgClass = y.bgClass),
                y.textClass && (g.textClass = y.textClass),
                xr(p, g),
                Cr(p, g, v, m),
                Lr(p, g, m),
                g.node);
                            o.insertBefore(d, l);
                        }
                    u += h.size;
                }
                var p, g, v, m, y;
                for (; l; ) l = s(l);
            })(e, r.updateLineNumbers, t.dims),
            4 < f && (r.lineDiv.style.display = ""),
            (r.renderedView = r.view),
            (function (e) {
                if (
                    e &&
          e.activeElt &&
          e.activeElt != W() &&
          (e.activeElt.focus(),
          e.anchorNode &&
            D(document.body, e.anchorNode) &&
            D(document.body, e.focusNode))
                ) {
                    var t = window.getSelection(),
                        r = document.createRange();
                    r.setEnd(e.anchorNode, e.anchorOffset),
                    r.collapse(!1),
                    t.removeAllRanges(),
                    t.addRange(r),
                    t.extend(e.focusNode, e.focusOffset);
                }
            })(d),
            M(r.cursorDiv),
            M(r.selectionDiv),
            (r.gutters.style.height = r.sizer.style.minHeight = 0),
            h &&
        ((r.lastWrapHeight = t.wrapperHeight),
        (r.lastWrapWidth = t.wrapperWidth),
        si(e, 400)),
            !(r.updateLineNumbers = null)
        );
    }
    function hi(e, t) {
        for (var r = t.viewport, n = !0; ; n = !1) {
            if (n && e.options.lineWrapping && t.oldDisplayWidth != Hr(e))
                n && (t.visible = Hn(e.display, e.doc, r));
            else if (
                (r &&
          null != r.top &&
          (r = { top: Math.min(e.doc.height + Ar(e.display) - Fr(e), r.top) }),
                (t.visible = Hn(e.display, e.doc, r)),
                t.visible.from >= e.display.viewFrom &&
          t.visible.to <= e.display.viewTo)
            )
                break;
            if (!ci(e, t)) break;
            Dn(e);
            var i = Vn(e);
            xn(e), Xn(e, i), pi(e, i), (t.force = !1);
        }
        t.signal(e, "update", e),
        (e.display.viewFrom == e.display.reportedViewFrom &&
        e.display.viewTo == e.display.reportedViewTo) ||
        (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo),
        (e.display.reportedViewFrom = e.display.viewFrom),
        (e.display.reportedViewTo = e.display.viewTo));
    }
    function fi(e, t) {
        var r = new ui(e, t);
        if (ci(e, r)) {
            Dn(e), hi(e, r);
            var n = Vn(e);
            xn(e), Xn(e, n), pi(e, n), r.finish();
        }
    }
    function di(e) {
        var t = e.gutters.offsetWidth;
        e.sizer.style.marginLeft = t + "px";
    }
    function pi(e, t) {
        (e.display.sizer.style.minHeight = t.docHeight + "px"),
        (e.display.heightForcer.style.top = t.docHeight + "px"),
        (e.display.gutters.style.height =
        t.docHeight + e.display.barHeight + Wr(e) + "px");
    }
    function gi(e) {
        var t = e.display,
            r = t.view;
        if (t.alignWidgets || (t.gutters.firstChild && e.options.fixedGutter)) {
            for (
                var n = hn(t) - t.scroller.scrollLeft + e.doc.scrollLeft,
                    i = t.gutters.offsetWidth,
                    o = n + "px",
                    l = 0;
                l < r.length;
                l++
            )
                if (!r[l].hidden) {
                    e.options.fixedGutter &&
            (r[l].gutter && (r[l].gutter.style.left = o),
            r[l].gutterBackground && (r[l].gutterBackground.style.left = o));
                    var s = r[l].alignable;
                    if (s) for (var a = 0; a < s.length; a++) s[a].style.left = o;
                }
            e.options.fixedGutter && (t.gutters.style.left = n + i + "px");
        }
    }
    function vi(e) {
        if (e.options.lineNumbers) {
            var t = e.doc,
                r = st(e.options, t.first + t.size - 1),
                n = e.display;
            if (r.length != n.lineNumChars) {
                var i = n.measure.appendChild(
                        A(
                            "div",
                            [A("div", r)],
                            "CodeMirror-linenumber CodeMirror-gutter-elt"
                        )
                    ),
                    o = i.firstChild.offsetWidth,
                    l = i.offsetWidth - o;
                return (
                    (n.lineGutter.style.width = ""),
                    (n.lineNumInnerWidth = Math.max(o, n.lineGutter.offsetWidth - l) + 1),
                    (n.lineNumWidth = n.lineNumInnerWidth + l),
                    (n.lineNumChars = n.lineNumInnerWidth ? r.length : -1),
                    (n.lineGutter.style.width = n.lineNumWidth + "px"),
                    di(e.display),
                    1
                );
            }
        }
    }
    function mi(e, t) {
        for (var r = [], n = !1, i = 0; i < e.length; i++) {
            var o = e[i],
                l = null;
            if (
                ("string" != typeof o && ((l = o.style), (o = o.className)),
                "CodeMirror-linenumbers" == o)
            ) {
                if (!t) continue;
                n = !0;
            }
            r.push({ className: o, style: l });
        }
        return (
            t && !n && r.push({ className: "CodeMirror-linenumbers", style: null }), r
        );
    }
    function yi(e) {
        var t = e.gutters,
            r = e.gutterSpecs;
        M(t), (e.lineGutter = null);
        for (var n = 0; n < r.length; ++n) {
            var i = r[n],
                o = i.className,
                l = i.style,
                s = t.appendChild(A("div", null, "CodeMirror-gutter " + o));
            l && (s.style.cssText = l),
            "CodeMirror-linenumbers" == o &&
          ((e.lineGutter = s).style.width = (e.lineNumWidth || 1) + "px");
        }
        (t.style.display = r.length ? "" : "none"), di(e);
    }
    function bi(e) {
        yi(e.display), vn(e), gi(e);
    }
    function wi(e, t, r, n) {
        var i = this;
        (this.input = r),
        (i.scrollbarFiller = A("div", null, "CodeMirror-scrollbar-filler")),
        i.scrollbarFiller.setAttribute("cm-not-content", "true"),
        (i.gutterFiller = A("div", null, "CodeMirror-gutter-filler")),
        i.gutterFiller.setAttribute("cm-not-content", "true"),
        (i.lineDiv = O("div", null, "CodeMirror-code")),
        (i.selectionDiv = A("div", null, null, "position: relative; z-index: 1")),
        (i.cursorDiv = A("div", null, "CodeMirror-cursors")),
        (i.measure = A("div", null, "CodeMirror-measure")),
        (i.lineMeasure = A("div", null, "CodeMirror-measure")),
        (i.lineSpace = O(
            "div",
            [i.measure, i.lineMeasure, i.selectionDiv, i.cursorDiv, i.lineDiv],
            null,
            "position: relative; outline: none"
        ));
        var o = O("div", [i.lineSpace], "CodeMirror-lines");
        (i.mover = A("div", [o], null, "position: relative")),
        (i.sizer = A("div", [i.mover], "CodeMirror-sizer")),
        (i.sizerWidth = null),
        (i.heightForcer = A(
            "div",
            null,
            null,
            "position: absolute; height: " + G + "px; width: 1px;"
        )),
        (i.gutters = A("div", null, "CodeMirror-gutters")),
        (i.lineGutter = null),
        (i.scroller = A(
            "div",
            [i.sizer, i.heightForcer, i.gutters],
            "CodeMirror-scroll"
        )),
        i.scroller.setAttribute("tabIndex", "-1"),
        (i.wrapper = A(
            "div",
            [i.scrollbarFiller, i.gutterFiller, i.scroller],
            "CodeMirror"
        )),
        x &&
        C < 8 &&
        ((i.gutters.style.zIndex = -1), (i.scroller.style.paddingRight = 0)),
        b || (g && f) || (i.scroller.draggable = !0),
        e && (e.appendChild ? e.appendChild(i.wrapper) : e(i.wrapper)),
        (i.viewFrom = i.viewTo = t.first),
        (i.reportedViewFrom = i.reportedViewTo = t.first),
        (i.view = []),
        (i.renderedView = null),
        (i.externalMeasured = null),
        (i.viewOffset = 0),
        (i.lastWrapHeight = i.lastWrapWidth = 0),
        (i.updateLineNumbers = null),
        (i.nativeBarWidth = i.barHeight = i.barWidth = 0),
        (i.scrollbarsClipped = !1),
        (i.lineNumWidth = i.lineNumInnerWidth = i.lineNumChars = null),
        (i.alignWidgets = !1),
        (i.cachedCharWidth = i.cachedTextHeight = i.cachedPaddingH = null),
        (i.maxLine = null),
        (i.maxLineLength = 0),
        (i.maxLineChanged = !1),
        (i.wheelDX = i.wheelDY = i.wheelStartX = i.wheelStartY = null),
        (i.shift = !1),
        (i.selForContextMenu = null),
        (i.activeTouch = null),
        (i.gutterSpecs = mi(n.gutters, n.lineNumbers)),
        yi(i),
        r.init(i);
    }
    (ui.prototype.signal = function (e, t) {
        Te(e, t) && this.events.push(arguments);
    }),
    (ui.prototype.finish = function () {
        for (var e = 0; e < this.events.length; e++)
            Se.apply(null, this.events[e]);
    });
    var xi = 0,
        Ci = null;
    function Si(e) {
        var t = e.wheelDeltaX,
            r = e.wheelDeltaY;
        return (
            null == t && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail),
            null == r && e.detail && e.axis == e.VERTICAL_AXIS
                ? (r = e.detail)
                : null == r && (r = e.wheelDelta),
            { x: t, y: r }
        );
    }
    function Li(e) {
        var t = Si(e);
        return (t.x *= Ci), (t.y *= Ci), t;
    }
    function ki(e, t) {
        var r = Si(t),
            n = r.x,
            i = r.y,
            o = e.display,
            l = o.scroller,
            s = l.scrollWidth > l.clientWidth,
            a = l.scrollHeight > l.clientHeight;
        if ((n && s) || (i && a)) {
            if (i && w && b)
                e: for (var u = t.target, c = o.view; u != l; u = u.parentNode)
                    for (var h = 0; h < c.length; h++)
                        if (c[h].node == u) {
                            e.display.currentWheelTarget = u;
                            break e;
                        }
            if (n && !g && !v && null != Ci)
                return (
                    i && a && Bn(e, Math.max(0, l.scrollTop + i * Ci)),
                    Un(e, Math.max(0, l.scrollLeft + n * Ci)),
                    (!i || (i && a)) && Ne(t),
                    void (o.wheelStartX = null)
                );
            if (i && null != Ci) {
                var f = i * Ci,
                    d = e.doc.scrollTop,
                    p = d + o.wrapper.clientHeight;
                f < 0
                    ? (d = Math.max(0, d + f - 50))
                    : (p = Math.min(e.doc.height, p + f + 50)),
                fi(e, { top: d, bottom: p });
            }
            xi < 20 &&
        (null == o.wheelStartX
            ? ((o.wheelStartX = l.scrollLeft),
            (o.wheelStartY = l.scrollTop),
            (o.wheelDX = n),
            (o.wheelDY = i),
            setTimeout(function () {
                if (null != o.wheelStartX) {
                    var e = l.scrollLeft - o.wheelStartX,
                        t = l.scrollTop - o.wheelStartY,
                        r =
                    (t && o.wheelDY && t / o.wheelDY) ||
                    (e && o.wheelDX && e / o.wheelDX);
                    (o.wheelStartX = o.wheelStartY = null),
                    r && ((Ci = (Ci * xi + r) / (xi + 1)), ++xi);
                }
            }, 200))
            : ((o.wheelDX += n), (o.wheelDY += i)));
        }
    }
    x ? (Ci = -0.53) : g ? (Ci = 15) : l ? (Ci = -0.7) : a && (Ci = -1 / 3);
    var Ti = function (e, t) {
        (this.ranges = e), (this.primIndex = t);
    };
    (Ti.prototype.primary = function () {
        return this.ranges[this.primIndex];
    }),
    (Ti.prototype.equals = function (e) {
        if (e == this) return !0;
        if (
            e.primIndex != this.primIndex ||
        e.ranges.length != this.ranges.length
        )
            return !1;
        for (var t = 0; t < this.ranges.length; t++) {
            var r = this.ranges[t],
                n = e.ranges[t];
            if (!ct(r.anchor, n.anchor) || !ct(r.head, n.head)) return !1;
        }
        return !0;
    }),
    (Ti.prototype.deepCopy = function () {
        for (var e = [], t = 0; t < this.ranges.length; t++)
            e[t] = new Mi(ht(this.ranges[t].anchor), ht(this.ranges[t].head));
        return new Ti(e, this.primIndex);
    }),
    (Ti.prototype.somethingSelected = function () {
        for (var e = 0; e < this.ranges.length; e++)
            if (!this.ranges[e].empty()) return !0;
        return !1;
    }),
    (Ti.prototype.contains = function (e, t) {
        t = t || e;
        for (var r = 0; r < this.ranges.length; r++) {
            var n = this.ranges[r];
            if (0 <= ut(t, n.from()) && ut(e, n.to()) <= 0) return r;
        }
        return -1;
    });
    var Mi = function (e, t) {
        (this.anchor = e), (this.head = t);
    };
    function Ni(e, t, r) {
        var n = e && e.options.selectionsMayTouch,
            i = t[r];
        t.sort(function (e, t) {
            return ut(e.from(), t.from());
        }),
        (r = B(t, i));
        for (var o = 1; o < t.length; o++) {
            var l = t[o],
                s = t[o - 1],
                a = ut(s.to(), l.from());
            if (n && !l.empty() ? 0 < a : 0 <= a) {
                var u = dt(s.from(), l.from()),
                    c = ft(s.to(), l.to()),
                    h = s.empty() ? l.from() == l.head : s.from() == s.head;
                o <= r && --r, t.splice(--o, 2, new Mi(h ? c : u, h ? u : c));
            }
        }
        return new Ti(t, r);
    }
    function Oi(e, t) {
        return new Ti([new Mi(e, t || e)], 0);
    }
    function Ai(e) {
        return e.text
            ? at(
                e.from.line + e.text.length - 1,
                $(e.text).length + (1 == e.text.length ? e.from.ch : 0)
            )
            : e.to;
    }
    function Di(e, t) {
        if (ut(e, t.from) < 0) return e;
        if (ut(e, t.to) <= 0) return Ai(t);
        var r = e.line + t.text.length - (t.to.line - t.from.line) - 1,
            n = e.ch;
        return e.line == t.to.line && (n += Ai(t).ch - t.to.ch), at(r, n);
    }
    function Wi(e, t) {
        for (var r = [], n = 0; n < e.sel.ranges.length; n++) {
            var i = e.sel.ranges[n];
            r.push(new Mi(Di(i.anchor, t), Di(i.head, t)));
        }
        return Ni(e.cm, r, e.sel.primIndex);
    }
    function Hi(e, t, r) {
        return e.line == t.line
            ? at(r.line, e.ch - t.ch + r.ch)
            : at(r.line + (e.line - t.line), e.ch);
    }
    function Fi(e) {
        (e.doc.mode = Ye(e.options, e.doc.modeOption)), Pi(e);
    }
    function Pi(e) {
        e.doc.iter(function (e) {
            e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null);
        }),
        (e.doc.modeFrontier = e.doc.highlightFrontier = e.doc.first),
        si(e, 100),
        e.state.modeGen++,
        e.curOp && vn(e);
    }
    function Ei(e, t) {
        return (
            0 == t.from.ch &&
      0 == t.to.ch &&
      "" == $(t.text) &&
      (!e.cm || e.cm.options.wholeLineUpdateBefore)
        );
    }
    function Ii(e, n, t, i) {
        function o(e) {
            return t ? t[e] : null;
        }
        function r(e, t, r) {
            !(function (e, t, r, n) {
                (e.text = t),
                e.stateAfter && (e.stateAfter = null),
                e.styles && (e.styles = null),
                null != e.order && (e.order = null),
                Et(e),
                It(e, r);
                var i = n ? n(e) : 1;
                i != e.height && nt(e, i);
            })(e, t, r, i),
            gr(e, "change", e, n);
        }
        function l(e, t) {
            for (var r = [], n = e; n < t; ++n) r.push(new er(u[n], o(n), i));
            return r;
        }
        var s = n.from,
            a = n.to,
            u = n.text,
            c = et(e, s.line),
            h = et(e, a.line),
            f = $(u),
            d = o(u.length - 1),
            p = a.line - s.line;
        if (n.full)
            e.insert(0, l(0, u.length)), e.remove(u.length, e.size - u.length);
        else if (Ei(e, n)) {
            var g = l(0, u.length - 1);
            r(h, h.text, d),
            p && e.remove(s.line, p),
            g.length && e.insert(s.line, g);
        } else if (c == h)
            if (1 == u.length)
                r(c, c.text.slice(0, s.ch) + f + c.text.slice(a.ch), d);
            else {
                var v = l(1, u.length - 1);
                v.push(new er(f + c.text.slice(a.ch), d, i)),
                r(c, c.text.slice(0, s.ch) + u[0], o(0)),
                e.insert(s.line + 1, v);
            }
        else if (1 == u.length)
            r(c, c.text.slice(0, s.ch) + u[0] + h.text.slice(a.ch), o(0)),
            e.remove(s.line + 1, p);
        else {
            r(c, c.text.slice(0, s.ch) + u[0], o(0)), r(h, f + h.text.slice(a.ch), d);
            var m = l(1, u.length - 1);
            1 < p && e.remove(s.line + 1, p - 1), e.insert(s.line + 1, m);
        }
        gr(e, "change", e, n);
    }
    function zi(e, s, a) {
        !(function e(t, r, n) {
            if (t.linked)
                for (var i = 0; i < t.linked.length; ++i) {
                    var o = t.linked[i];
                    if (o.doc != r) {
                        var l = n && o.sharedHist;
                        (a && !l) || (s(o.doc, l), e(o.doc, t, l));
                    }
                }
        })(e, null, !0);
    }
    function Ri(e, t) {
        if (t.cm) throw new Error("This document is already in use.");
        dn(((e.doc = t).cm = e)),
        Fi(e),
        Bi(e),
        e.options.lineWrapping || Jt(e),
        (e.options.mode = t.modeOption),
        vn(e);
    }
    function Bi(e) {
        ("rtl" == e.doc.direction ? H : T)(e.display.lineDiv, "CodeMirror-rtl");
    }
    function Gi(e) {
        (this.done = []),
        (this.undone = []),
        (this.undoDepth = 1 / 0),
        (this.lastModTime = this.lastSelTime = 0),
        (this.lastOp = this.lastSelOp = null),
        (this.lastOrigin = this.lastSelOrigin = null),
        (this.generation = this.maxGeneration = e || 1);
    }
    function Ui(e, t) {
        var r = { from: ht(t.from), to: Ai(t), text: tt(e, t.from, t.to) };
        return (
            Yi(e, r, t.from.line, t.to.line + 1),
            zi(
                e,
                function (e) {
                    return Yi(e, r, t.from.line, t.to.line + 1);
                },
                !0
            ),
            r
        );
    }
    function Vi(e) {
        for (; e.length; ) {
            if (!$(e).ranges) break;
            e.pop();
        }
    }
    function Ki(e, t, r, n) {
        var i = e.history;
        i.undone.length = 0;
        var o,
            l,
            s,
            a = +new Date();
        if (
            (i.lastOp == n ||
        (i.lastOrigin == t.origin &&
          t.origin &&
          (("+" == t.origin.charAt(0) &&
            i.lastModTime >
              a - (e.cm ? e.cm.options.historyEventDelay : 500)) ||
            "*" == t.origin.charAt(0)))) &&
      (o =
        (s = i).lastOp == n
            ? (Vi(s.done), $(s.done))
            : s.done.length && !$(s.done).ranges
                ? $(s.done)
                : 1 < s.done.length && !s.done[s.done.length - 2].ranges
                    ? (s.done.pop(), $(s.done))
                    : void 0)
        )
            (l = $(o.changes)),
            0 == ut(t.from, t.to) && 0 == ut(t.from, l.to)
                ? (l.to = Ai(t))
                : o.changes.push(Ui(e, t));
        else {
            var u = $(i.done);
            for (
                (u && u.ranges) || Xi(e.sel, i.done),
                o = { changes: [Ui(e, t)], generation: i.generation },
                i.done.push(o);
                i.done.length > i.undoDepth;

            )
                i.done.shift(), i.done[0].ranges || i.done.shift();
        }
        i.done.push(r),
        (i.generation = ++i.maxGeneration),
        (i.lastModTime = i.lastSelTime = a),
        (i.lastOp = i.lastSelOp = n),
        (i.lastOrigin = i.lastSelOrigin = t.origin),
        l || Se(e, "historyAdded");
    }
    function ji(e, t, r, n) {
        var i,
            o,
            l,
            s,
            a,
            u = e.history,
            c = n && n.origin;
        r == u.lastSelOp ||
    (c &&
      u.lastSelOrigin == c &&
      ((u.lastModTime == u.lastSelTime && u.lastOrigin == c) ||
        ((i = e),
        (o = c),
        (l = $(u.done)),
        (s = t),
        "*" == (a = o.charAt(0)) ||
          ("+" == a &&
            l.ranges.length == s.ranges.length &&
            l.somethingSelected() == s.somethingSelected() &&
            new Date() - i.history.lastSelTime <=
              (i.cm ? i.cm.options.historyEventDelay : 500)))))
            ? (u.done[u.done.length - 1] = t)
            : Xi(t, u.done),
        (u.lastSelTime = +new Date()),
        (u.lastSelOrigin = c),
        (u.lastSelOp = r),
        n && !1 !== n.clearRedo && Vi(u.undone);
    }
    function Xi(e, t) {
        var r = $(t);
        (r && r.ranges && r.equals(e)) || t.push(e);
    }
    function Yi(t, r, e, n) {
        var i = r["spans_" + t.id],
            o = 0;
        t.iter(Math.max(t.first, e), Math.min(t.first + t.size, n), function (e) {
            e.markedSpans &&
        ((i = i || (r["spans_" + t.id] = {}))[o] = e.markedSpans),
            ++o;
        });
    }
    function _i(e) {
        if (!e) return null;
        for (var t, r = 0; r < e.length; ++r)
            e[r].marker.explicitlyCleared
                ? (t = t || e.slice(0, r))
                : t && t.push(e[r]);
        return t ? (t.length ? t : null) : e;
    }
    function $i(e, t) {
        var r = (function (e, t) {
                var r = t["spans_" + e.id];
                if (!r) return null;
                for (var n = [], i = 0; i < t.text.length; ++i) n.push(_i(r[i]));
                return n;
            })(e, t),
            n = Ft(e, t);
        if (!r) return n;
        if (!n) return r;
        for (var i = 0; i < r.length; ++i) {
            var o = r[i],
                l = n[i];
            if (o && l)
                e: for (var s = 0; s < l.length; ++s) {
                    for (var a = l[s], u = 0; u < o.length; ++u)
                        if (o[u].marker == a.marker) continue e;
                    o.push(a);
                }
            else l && (r[i] = l);
        }
        return r;
    }
    function qi(e, t, r) {
        for (var n = [], i = 0; i < e.length; ++i) {
            var o = e[i];
            if (o.ranges) n.push(r ? Ti.prototype.deepCopy.call(o) : o);
            else {
                var l = o.changes,
                    s = [];
                n.push({ changes: s });
                for (var a = 0; a < l.length; ++a) {
                    var u = l[a],
                        c = void 0;
                    if ((s.push({ from: u.from, to: u.to, text: u.text }), t))
                        for (var h in u)
                            (c = h.match(/^spans_(\d+)$/)) &&
                -1 < B(t, Number(c[1])) &&
                (($(s)[h] = u[h]), delete u[h]);
                }
            }
        }
        return n;
    }
    function Zi(e, t, r, n) {
        if (n) {
            var i = e.anchor;
            if (r) {
                var o = ut(t, i) < 0;
                o != ut(r, i) < 0 ? ((i = t), (t = r)) : o != ut(t, r) < 0 && (t = r);
            }
            return new Mi(i, t);
        }
        return new Mi(r || t, t);
    }
    function Qi(e, t, r, n, i) {
        null == i && (i = e.cm && (e.cm.display.shift || e.extend)),
        no(e, new Ti([Zi(e.sel.primary(), t, r, i)], 0), n);
    }
    function Ji(e, t, r) {
        for (
            var n = [], i = e.cm && (e.cm.display.shift || e.extend), o = 0;
            o < e.sel.ranges.length;
            o++
        )
            n[o] = Zi(e.sel.ranges[o], t[o], null, i);
        no(e, Ni(e.cm, n, e.sel.primIndex), r);
    }
    function eo(e, t, r, n) {
        var i = e.sel.ranges.slice(0);
        (i[t] = r), no(e, Ni(e.cm, i, e.sel.primIndex), n);
    }
    function to(e, t, r, n) {
        no(e, Oi(t, r), n);
    }
    function ro(e, t, r) {
        var n = e.history.done,
            i = $(n);
        i && i.ranges ? io(e, (n[n.length - 1] = t), r) : no(e, t, r);
    }
    function no(e, t, r) {
        io(e, t, r), ji(e, e.sel, e.cm ? e.cm.curOp.id : NaN, r);
    }
    function io(e, t, r) {
        var n, i, o, l;
        (Te(e, "beforeSelectionChange") ||
      (e.cm && Te(e.cm, "beforeSelectionChange"))) &&
      ((n = e),
      (o = r),
      (l = {
          ranges: (i = t).ranges,
          update: function (e) {
              this.ranges = [];
              for (var t = 0; t < e.length; t++)
                  this.ranges[t] = new Mi(gt(n, e[t].anchor), gt(n, e[t].head));
          },
          origin: o && o.origin,
      }),
      Se(n, "beforeSelectionChange", n, l),
      n.cm && Se(n.cm, "beforeSelectionChange", n.cm, l),
      (t = l.ranges != i.ranges ? Ni(n.cm, l.ranges, l.ranges.length - 1) : i));
        var s =
      (r && r.bias) ||
      (ut(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1);
        oo(e, so(e, t, s, !0)), (r && !1 === r.scroll) || !e.cm || En(e.cm);
    }
    function oo(e, t) {
        t.equals(e.sel) ||
      ((e.sel = t),
      e.cm &&
        ((e.cm.curOp.updateInput = 1),
        (e.cm.curOp.selectionChanged = !0),
        ke(e.cm)),
      gr(e, "cursorActivity", e));
    }
    function lo(e) {
        oo(e, so(e, e.sel, null, !1));
    }
    function so(e, t, r, n) {
        for (var i, o = 0; o < t.ranges.length; o++) {
            var l = t.ranges[o],
                s = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o],
                a = uo(e, l.anchor, s && s.anchor, r, n),
                u = uo(e, l.head, s && s.head, r, n);
            (!i && a == l.anchor && u == l.head) ||
        ((i = i || t.ranges.slice(0, o))[o] = new Mi(a, u));
        }
        return i ? Ni(e.cm, i, t.primIndex) : t;
    }
    function ao(e, t, r, n, i) {
        var o = et(e, t.line);
        if (o.markedSpans)
            for (var l = 0; l < o.markedSpans.length; ++l) {
                var s = o.markedSpans[l],
                    a = s.marker,
                    u = "selectLeft" in a ? !a.selectLeft : a.inclusiveLeft,
                    c = "selectRight" in a ? !a.selectRight : a.inclusiveRight;
                if (
                    (null == s.from || (u ? s.from <= t.ch : s.from < t.ch)) &&
          (null == s.to || (c ? s.to >= t.ch : s.to > t.ch))
                ) {
                    if (i && (Se(a, "beforeCursorEnter"), a.explicitlyCleared)) {
                        if (o.markedSpans) {
                            --l;
                            continue;
                        }
                        break;
                    }
                    if (!a.atomic) continue;
                    if (r) {
                        var h = a.find(n < 0 ? 1 : -1),
                            f = void 0;
                        if (
                            ((n < 0 ? c : u) &&
                (h = co(e, h, -n, h && h.line == t.line ? o : null)),
                            h &&
                h.line == t.line &&
                (f = ut(h, r)) &&
                (n < 0 ? f < 0 : 0 < f))
                        )
                            return ao(e, h, t, n, i);
                    }
                    var d = a.find(n < 0 ? -1 : 1);
                    return (
                        (n < 0 ? u : c) && (d = co(e, d, n, d.line == t.line ? o : null)),
                        d ? ao(e, d, t, n, i) : null
                    );
                }
            }
        return t;
    }
    function uo(e, t, r, n, i) {
        var o = n || 1,
            l =
        ao(e, t, r, o, i) ||
        (!i && ao(e, t, r, o, !0)) ||
        ao(e, t, r, -o, i) ||
        (!i && ao(e, t, r, -o, !0));
        return l || ((e.cantEdit = !0), at(e.first, 0));
    }
    function co(e, t, r, n) {
        return r < 0 && 0 == t.ch
            ? t.line > e.first
                ? gt(e, at(t.line - 1))
                : null
            : 0 < r && t.ch == (n || et(e, t.line)).text.length
                ? t.line < e.first + e.size - 1
                    ? at(t.line + 1, 0)
                    : null
                : new at(t.line, t.ch + r);
    }
    function ho(e) {
        e.setSelection(at(e.firstLine(), 0), at(e.lastLine()), V);
    }
    function fo(i, e, t) {
        var o = {
            canceled: !1,
            from: e.from,
            to: e.to,
            text: e.text,
            origin: e.origin,
            cancel: function () {
                return (o.canceled = !0);
            },
        };
        return (
            t &&
        (o.update = function (e, t, r, n) {
            e && (o.from = gt(i, e)),
            t && (o.to = gt(i, t)),
            r && (o.text = r),
            void 0 !== n && (o.origin = n);
        }),
            Se(i, "beforeChange", i, o),
            i.cm && Se(i.cm, "beforeChange", i.cm, o),
            o.canceled
                ? (i.cm && (i.cm.curOp.updateInput = 2), null)
                : { from: o.from, to: o.to, text: o.text, origin: o.origin }
        );
    }
    function po(e, t, r) {
        if (e.cm) {
            if (!e.cm.curOp) return ii(e.cm, po)(e, t, r);
            if (e.cm.state.suppressEdits) return;
        }
        if (
            !(Te(e, "beforeChange") || (e.cm && Te(e.cm, "beforeChange"))) ||
      (t = fo(e, t, !0))
        ) {
            var n =
        Ot &&
        !r &&
        (function (e, t, r) {
            var n = null;
            if (
                (e.iter(t.line, r.line + 1, function (e) {
                    if (e.markedSpans)
                        for (var t = 0; t < e.markedSpans.length; ++t) {
                            var r = e.markedSpans[t].marker;
                            !r.readOnly || (n && -1 != B(n, r)) || (n = n || []).push(r);
                        }
                }),
                !n)
            )
                return null;
            for (var i = [{ from: t, to: r }], o = 0; o < n.length; ++o)
                for (var l = n[o], s = l.find(0), a = 0; a < i.length; ++a) {
                    var u = i[a];
                    if (!(ut(u.to, s.from) < 0 || 0 < ut(u.from, s.to))) {
                        var c = [a, 1],
                            h = ut(u.from, s.from),
                            f = ut(u.to, s.to);
                        (h < 0 || (!l.inclusiveLeft && !h)) &&
                  c.push({ from: u.from, to: s.from }),
                        (0 < f || (!l.inclusiveRight && !f)) &&
                    c.push({ from: s.to, to: u.to }),
                        i.splice.apply(i, c),
                        (a += c.length - 3);
                    }
                }
            return i;
        })(e, t.from, t.to);
            if (n)
                for (var i = n.length - 1; 0 <= i; --i)
                    go(e, {
                        from: n[i].from,
                        to: n[i].to,
                        text: i ? [""] : t.text,
                        origin: t.origin,
                    });
            else go(e, t);
        }
    }
    function go(e, r) {
        if (1 != r.text.length || "" != r.text[0] || 0 != ut(r.from, r.to)) {
            var t = Wi(e, r);
            Ki(e, r, t, e.cm ? e.cm.curOp.id : NaN), yo(e, r, t, Ft(e, r));
            var n = [];
            zi(e, function (e, t) {
                t || -1 != B(n, e.history) || (Co(e.history, r), n.push(e.history)),
                yo(e, r, null, Ft(e, r));
            });
        }
    }
    function vo(i, o, e) {
        var t = i.cm && i.cm.state.suppressEdits;
        if (!t || e) {
            for (
                var l,
                    r = i.history,
                    n = i.sel,
                    s = "undo" == o ? r.done : r.undone,
                    a = "undo" == o ? r.undone : r.done,
                    u = 0;
                u < s.length &&
        ((l = s[u]), e ? !l.ranges || l.equals(i.sel) : l.ranges);
                u++
            );
            if (u != s.length) {
                for (r.lastOrigin = r.lastSelOrigin = null; ; ) {
                    if (!(l = s.pop()).ranges) {
                        if (t) return void s.push(l);
                        break;
                    }
                    if ((Xi(l, a), e && !l.equals(i.sel)))
                        return void no(i, l, { clearRedo: !1 });
                    n = l;
                }
                var c = [];
                Xi(n, a),
                a.push({ changes: c, generation: r.generation }),
                (r.generation = l.generation || ++r.maxGeneration);
                for (
                    var h = Te(i, "beforeChange") || (i.cm && Te(i.cm, "beforeChange")),
                        f = function (e) {
                            var r = l.changes[e];
                            if (((r.origin = o), h && !fo(i, r, !1)))
                                return (s.length = 0), {};
                            c.push(Ui(i, r));
                            var t = e ? Wi(i, r) : $(s);
                            yo(i, r, t, $i(i, r)),
                            !e && i.cm && i.cm.scrollIntoView({ from: r.from, to: Ai(r) });
                            var n = [];
                            zi(i, function (e, t) {
                                t ||
                  -1 != B(n, e.history) ||
                  (Co(e.history, r), n.push(e.history)),
                                yo(e, r, null, $i(e, r));
                            });
                        },
                        d = l.changes.length - 1;
                    0 <= d;
                    --d
                ) {
                    var p = f(d);
                    if (p) return p.v;
                }
            }
        }
    }
    function mo(e, t) {
        if (
            0 != t &&
      ((e.first += t),
      (e.sel = new Ti(
          q(e.sel.ranges, function (e) {
              return new Mi(
                  at(e.anchor.line + t, e.anchor.ch),
                  at(e.head.line + t, e.head.ch)
              );
          }),
          e.sel.primIndex
      )),
      e.cm)
        ) {
            vn(e.cm, e.first, e.first - t, t);
            for (var r = e.cm.display, n = r.viewFrom; n < r.viewTo; n++)
                mn(e.cm, n, "gutter");
        }
    }
    function yo(e, t, r, n) {
        if (e.cm && !e.cm.curOp) return ii(e.cm, yo)(e, t, r, n);
        if (t.to.line < e.first)
            mo(e, t.text.length - 1 - (t.to.line - t.from.line));
        else if (!(t.from.line > e.lastLine())) {
            if (t.from.line < e.first) {
                var i = t.text.length - 1 - (e.first - t.from.line);
                mo(e, i),
                (t = {
                    from: at(e.first, 0),
                    to: at(t.to.line + i, t.to.ch),
                    text: [$(t.text)],
                    origin: t.origin,
                });
            }
            var o = e.lastLine();
            t.to.line > o &&
        (t = {
            from: t.from,
            to: at(o, et(e, o).text.length),
            text: [t.text[0]],
            origin: t.origin,
        }),
            (t.removed = tt(e, t.from, t.to)),
            (r = r || Wi(e, t)),
            e.cm
                ? (function (e, t, r) {
                    var n = e.doc,
                        i = e.display,
                        o = t.from,
                        l = t.to,
                        s = !1,
                        a = o.line;
                    e.options.lineWrapping ||
                ((a = it(Xt(et(n, o.line)))),
                n.iter(a, l.line + 1, function (e) {
                    if (e == i.maxLine) return (s = !0);
                }));
                    -1 < n.sel.contains(t.from, t.to) && ke(e);
                    Ii(n, t, r, fn(e)),
                    e.options.lineWrapping ||
                  (n.iter(a, o.line + t.text.length, function (e) {
                      var t = Qt(e);
                      t > i.maxLineLength &&
                      ((i.maxLine = e),
                      (i.maxLineLength = t),
                      (i.maxLineChanged = !0),
                      (s = !1));
                  }),
                  s && (e.curOp.updateMaxLine = !0));
                    (function (e, t) {
                        if (
                            ((e.modeFrontier = Math.min(e.modeFrontier, t)),
                            !(e.highlightFrontier < t - 10))
                        ) {
                            for (var r = e.first, n = t - 1; r < n; n--) {
                                var i = et(e, n).stateAfter;
                                if (i && (!(i instanceof mt) || n + i.lookAhead < t)) {
                                    r = n + 1;
                                    break;
                                }
                            }
                            e.highlightFrontier = Math.min(e.highlightFrontier, r);
                        }
                    })(n, o.line),
                    si(e, 400);
                    var u = t.text.length - (l.line - o.line) - 1;
                    t.full
                        ? vn(e)
                        : o.line != l.line || 1 != t.text.length || Ei(e.doc, t)
                            ? vn(e, o.line, l.line + 1, u)
                            : mn(e, o.line, "text");
                    var c = Te(e, "changes"),
                        h = Te(e, "change");
                    if (h || c) {
                        var f = {
                            from: o,
                            to: l,
                            text: t.text,
                            removed: t.removed,
                            origin: t.origin,
                        };
                        h && gr(e, "change", e, f),
                        c &&
                    (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(f);
                    }
                    e.display.selForContextMenu = null;
                })(e.cm, t, n)
                : Ii(e, t, n),
            io(e, r, V),
            e.cantEdit && uo(e, at(e.firstLine(), 0)) && (e.cantEdit = !1);
        }
    }
    function bo(e, t, r, n, i) {
        var o;
        ut((n = n || r), r) < 0 && ((r = (o = [n, r])[0]), (n = o[1])),
        "string" == typeof t && (t = e.splitLines(t)),
        po(e, { from: r, to: n, text: t, origin: i });
    }
    function wo(e, t, r, n) {
        r < e.line ? (e.line += n) : t < e.line && ((e.line = t), (e.ch = 0));
    }
    function xo(e, t, r, n) {
        for (var i = 0; i < e.length; ++i) {
            var o = e[i],
                l = !0;
            if (o.ranges) {
                o.copied || ((o = e[i] = o.deepCopy()).copied = !0);
                for (var s = 0; s < o.ranges.length; s++)
                    wo(o.ranges[s].anchor, t, r, n), wo(o.ranges[s].head, t, r, n);
            } else {
                for (var a = 0; a < o.changes.length; ++a) {
                    var u = o.changes[a];
                    if (r < u.from.line)
                        (u.from = at(u.from.line + n, u.from.ch)),
                        (u.to = at(u.to.line + n, u.to.ch));
                    else if (t <= u.to.line) {
                        l = !1;
                        break;
                    }
                }
                l || (e.splice(0, i + 1), (i = 0));
            }
        }
    }
    function Co(e, t) {
        var r = t.from.line,
            n = t.to.line,
            i = t.text.length - (n - r) - 1;
        xo(e.done, r, n, i), xo(e.undone, r, n, i);
    }
    function So(e, t, r, n) {
        var i = t,
            o = t;
        return (
            "number" == typeof t ? (o = et(e, pt(e, t))) : (i = it(t)),
            null == i ? null : (n(o, i) && e.cm && mn(e.cm, i, r), o)
        );
    }
    function Lo(e) {
        (this.lines = e), (this.parent = null);
        for (var t = 0, r = 0; r < e.length; ++r)
            (e[r].parent = this), (t += e[r].height);
        this.height = t;
    }
    function ko(e) {
        this.children = e;
        for (var t = 0, r = 0, n = 0; n < e.length; ++n) {
            var i = e[n];
            (t += i.chunkSize()), (r += i.height), (i.parent = this);
        }
        (this.size = t), (this.height = r), (this.parent = null);
    }
    (Mi.prototype.from = function () {
        return dt(this.anchor, this.head);
    }),
    (Mi.prototype.to = function () {
        return ft(this.anchor, this.head);
    }),
    (Mi.prototype.empty = function () {
        return (
            this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
        );
    }),
    (Lo.prototype = {
        chunkSize: function () {
            return this.lines.length;
        },
        removeInner: function (e, t) {
            for (var r = e, n = e + t; r < n; ++r) {
                var i = this.lines[r];
                (this.height -= i.height),
                ((o = i).parent = null),
                Et(o),
                gr(i, "delete");
            }
            var o;
            this.lines.splice(e, t);
        },
        collapse: function (e) {
            e.push.apply(e, this.lines);
        },
        insertInner: function (e, t, r) {
            (this.height += r),
            (this.lines = this.lines
                .slice(0, e)
                .concat(t)
                .concat(this.lines.slice(e)));
            for (var n = 0; n < t.length; ++n) t[n].parent = this;
        },
        iterN: function (e, t, r) {
            for (var n = e + t; e < n; ++e) if (r(this.lines[e])) return !0;
        },
    }),
    (ko.prototype = {
        chunkSize: function () {
            return this.size;
        },
        removeInner: function (e, t) {
            this.size -= t;
            for (var r = 0; r < this.children.length; ++r) {
                var n = this.children[r],
                    i = n.chunkSize();
                if (e < i) {
                    var o = Math.min(t, i - e),
                        l = n.height;
                    if (
                        (n.removeInner(e, o),
                        (this.height -= l - n.height),
                        i == o && (this.children.splice(r--, 1), (n.parent = null)),
                        0 == (t -= o))
                    )
                        break;
                    e = 0;
                } else e -= i;
            }
            if (
                this.size - t < 25 &&
          (1 < this.children.length || !(this.children[0] instanceof Lo))
            ) {
                var s = [];
                this.collapse(s),
                (this.children = [new Lo(s)]),
                (this.children[0].parent = this);
            }
        },
        collapse: function (e) {
            for (var t = 0; t < this.children.length; ++t)
                this.children[t].collapse(e);
        },
        insertInner: function (e, t, r) {
            (this.size += t.length), (this.height += r);
            for (var n = 0; n < this.children.length; ++n) {
                var i = this.children[n],
                    o = i.chunkSize();
                if (e <= o) {
                    if ((i.insertInner(e, t, r), i.lines && 50 < i.lines.length)) {
                        for (
                            var l = (i.lines.length % 25) + 25, s = l;
                            s < i.lines.length;

                        ) {
                            var a = new Lo(i.lines.slice(s, (s += 25)));
                            (i.height -= a.height),
                            this.children.splice(++n, 0, a),
                            (a.parent = this);
                        }
                        (i.lines = i.lines.slice(0, l)), this.maybeSpill();
                    }
                    break;
                }
                e -= o;
            }
        },
        maybeSpill: function () {
            if (!(this.children.length <= 10)) {
                var e = this;
                do {
                    var t = new ko(e.children.splice(e.children.length - 5, 5));
                    if (e.parent) {
                        (e.size -= t.size), (e.height -= t.height);
                        var r = B(e.parent.children, e);
                        e.parent.children.splice(r + 1, 0, t);
                    } else {
                        var n = new ko(e.children);
                        ((n.parent = e).children = [n, t]), (e = n);
                    }
                    t.parent = e.parent;
                } while (10 < e.children.length);
                e.parent.maybeSpill();
            }
        },
        iterN: function (e, t, r) {
            for (var n = 0; n < this.children.length; ++n) {
                var i = this.children[n],
                    o = i.chunkSize();
                if (e < o) {
                    var l = Math.min(t, o - e);
                    if (i.iterN(e, l, r)) return !0;
                    if (0 == (t -= l)) break;
                    e = 0;
                } else e -= o;
            }
        },
    });
    function To(e, t, r) {
        if (r) for (var n in r) r.hasOwnProperty(n) && (this[n] = r[n]);
        (this.doc = e), (this.node = t);
    }
    function Mo(e, t, r) {
        Zt(t) < ((e.curOp && e.curOp.scrollTop) || e.doc.scrollTop) && Pn(e, r);
    }
    (To.prototype.clear = function () {
        var e = this.doc.cm,
            t = this.line.widgets,
            r = this.line,
            n = it(r);
        if (null != n && t) {
            for (var i = 0; i < t.length; ++i) t[i] == this && t.splice(i--, 1);
            t.length || (r.widgets = null);
            var o = Mr(this);
            nt(r, Math.max(0, r.height - o)),
            e &&
          (ni(e, function () {
              Mo(e, r, -o), mn(e, n, "widget");
          }),
          gr(e, "lineWidgetCleared", e, this, n));
        }
    }),
    (To.prototype.changed = function () {
        var e = this,
            t = this.height,
            r = this.doc.cm,
            n = this.line;
        this.height = null;
        var i = Mr(this) - t;
        i &&
        ($t(this.doc, n) || nt(n, n.height + i),
        r &&
          ni(r, function () {
              (r.curOp.forceUpdate = !0),
              Mo(r, n, i),
              gr(r, "lineWidgetChanged", r, e, it(n));
          }));
    }),
    Me(To);
    var No = 0,
        Oo = function (e, t) {
            (this.lines = []), (this.type = t), (this.doc = e), (this.id = ++No);
        };
    function Ao(t, n, i, e, r) {
        if (e && e.shared)
            return (function (e, r, n, i, o) {
                (i = I(i)).shared = !1;
                var l = [Ao(e, r, n, i, o)],
                    s = l[0],
                    a = i.widgetNode;
                return (
                    zi(e, function (e) {
                        a && (i.widgetNode = a.cloneNode(!0)),
                        l.push(Ao(e, gt(e, r), gt(e, n), i, o));
                        for (var t = 0; t < e.linked.length; ++t)
                            if (e.linked[t].isParent) return;
                        s = $(l);
                    }),
                    new Do(l, s)
                );
            })(t, n, i, e, r);
        if (t.cm && !t.cm.curOp) return ii(t.cm, Ao)(t, n, i, e, r);
        var o = new Oo(t, r),
            l = ut(n, i);
        if ((e && I(e, o, !1), 0 < l || (0 == l && !1 !== o.clearWhenEmpty)))
            return o;
        if (
            (o.replacedWith &&
        ((o.collapsed = !0),
        (o.widgetNode = O("span", [o.replacedWith], "CodeMirror-widget")),
        e.handleMouseEvents ||
          o.widgetNode.setAttribute("cm-ignore-events", "true"),
        e.insertLeft && (o.widgetNode.insertLeft = !0)),
            o.collapsed)
        ) {
            if (
                jt(t, n.line, n, i, o) ||
        (n.line != i.line && jt(t, i.line, n, i, o))
            )
                throw new Error(
                    "Inserting collapsed marker partially overlapping an existing one"
                );
            At = !0;
        }
        o.addToHistory && Ki(t, { from: n, to: i, origin: "markText" }, t.sel, NaN);
        var s,
            a = n.line,
            u = t.cm;
        if (
            (t.iter(a, i.line + 1, function (e) {
                var t, r;
                u &&
          o.collapsed &&
          !u.options.lineWrapping &&
          Xt(e) == u.display.maxLine &&
          (s = !0),
                o.collapsed && a != n.line && nt(e, 0),
                (t = e),
                (r = new Dt(o, a == n.line ? n.ch : null, a == i.line ? i.ch : null)),
                (t.markedSpans = t.markedSpans ? t.markedSpans.concat([r]) : [r]),
                r.marker.attachLine(t),
                ++a;
            }),
            o.collapsed &&
        t.iter(n.line, i.line + 1, function (e) {
            $t(t, e) && nt(e, 0);
        }),
            o.clearOnEnter &&
        we(o, "beforeCursorEnter", function () {
            return o.clear();
        }),
            o.readOnly &&
        ((Ot = !0),
        (t.history.done.length || t.history.undone.length) && t.clearHistory()),
            o.collapsed && ((o.id = ++No), (o.atomic = !0)),
            u)
        ) {
            if ((s && (u.curOp.updateMaxLine = !0), o.collapsed))
                vn(u, n.line, i.line + 1);
            else if (
                o.className ||
        o.startStyle ||
        o.endStyle ||
        o.css ||
        o.attributes ||
        o.title
            )
                for (var c = n.line; c <= i.line; c++) mn(u, c, "text");
            o.atomic && lo(u.doc), gr(u, "markerAdded", u, o);
        }
        return o;
    }
    (Oo.prototype.clear = function () {
        if (!this.explicitlyCleared) {
            var e = this.doc.cm,
                t = e && !e.curOp;
            if ((t && Zn(e), Te(this, "clear"))) {
                var r = this.find();
                r && gr(this, "clear", r.from, r.to);
            }
            for (var n = null, i = null, o = 0; o < this.lines.length; ++o) {
                var l = this.lines[o],
                    s = Wt(l.markedSpans, this);
                e && !this.collapsed
                    ? mn(e, it(l), "text")
                    : e && (null != s.to && (i = it(l)), null != s.from && (n = it(l))),
                (l.markedSpans = Ht(l.markedSpans, s)),
                null == s.from &&
            this.collapsed &&
            !$t(this.doc, l) &&
            e &&
            nt(l, an(e.display));
            }
            if (e && this.collapsed && !e.options.lineWrapping)
                for (var a = 0; a < this.lines.length; ++a) {
                    var u = Xt(this.lines[a]),
                        c = Qt(u);
                    c > e.display.maxLineLength &&
            ((e.display.maxLine = u),
            (e.display.maxLineLength = c),
            (e.display.maxLineChanged = !0));
                }
            null != n && e && this.collapsed && vn(e, n, i + 1),
            (this.lines.length = 0),
            (this.explicitlyCleared = !0),
            this.atomic &&
          this.doc.cantEdit &&
          ((this.doc.cantEdit = !1), e && lo(e.doc)),
            e && gr(e, "markerCleared", e, this, n, i),
            t && Qn(e),
            this.parent && this.parent.clear();
        }
    }),
    (Oo.prototype.find = function (e, t) {
        var r, n;
        null == e && "bookmark" == this.type && (e = 1);
        for (var i = 0; i < this.lines.length; ++i) {
            var o = this.lines[i],
                l = Wt(o.markedSpans, this);
            if (null != l.from && ((r = at(t ? o : it(o), l.from)), -1 == e))
                return r;
            if (null != l.to && ((n = at(t ? o : it(o), l.to)), 1 == e)) return n;
        }
        return r && { from: r, to: n };
    }),
    (Oo.prototype.changed = function () {
        var o = this,
            l = this.find(-1, !0),
            s = this,
            a = this.doc.cm;
        l &&
        a &&
        ni(a, function () {
            var e = l.line,
                t = it(l.line),
                r = Ir(a, t);
            if (
                (r &&
              (Kr(r), (a.curOp.selectionChanged = a.curOp.forceUpdate = !0)),
                (a.curOp.updateMaxLine = !0),
                !$t(s.doc, e) && null != s.height)
            ) {
                var n = s.height;
                s.height = null;
                var i = Mr(s) - n;
                i && nt(e, e.height + i);
            }
            gr(a, "markerChanged", a, o);
        });
    }),
    (Oo.prototype.attachLine = function (e) {
        if (!this.lines.length && this.doc.cm) {
            var t = this.doc.cm.curOp;
            (t.maybeHiddenMarkers && -1 != B(t.maybeHiddenMarkers, this)) ||
          (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this);
        }
        this.lines.push(e);
    }),
    (Oo.prototype.detachLine = function (e) {
        if (
            (this.lines.splice(B(this.lines, e), 1),
            !this.lines.length && this.doc.cm)
        ) {
            var t = this.doc.cm.curOp;
            (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this);
        }
    }),
    Me(Oo);
    var Do = function (e, t) {
        (this.markers = e), (this.primary = t);
        for (var r = 0; r < e.length; ++r) e[r].parent = this;
    };
    function Wo(e) {
        return e.findMarks(at(e.first, 0), e.clipPos(at(e.lastLine())), function (
            e
        ) {
            return e.parent;
        });
    }
    function Ho(o) {
        for (
            var e = function (e) {
                    var t = o[e],
                        r = [t.primary.doc];
                    zi(t.primary.doc, function (e) {
                        return r.push(e);
                    });
                    for (var n = 0; n < t.markers.length; n++) {
                        var i = t.markers[n];
                        -1 == B(r, i.doc) && ((i.parent = null), t.markers.splice(n--, 1));
                    }
                },
                t = 0;
            t < o.length;
            t++
        )
            e(t);
    }
    (Do.prototype.clear = function () {
        if (!this.explicitlyCleared) {
            this.explicitlyCleared = !0;
            for (var e = 0; e < this.markers.length; ++e) this.markers[e].clear();
            gr(this, "clear");
        }
    }),
    (Do.prototype.find = function (e, t) {
        return this.primary.find(e, t);
    }),
    Me(Do);
    var Fo = 0,
        Po = function (e, t, r, n, i) {
            if (!(this instanceof Po)) return new Po(e, t, r, n, i);
            null == r && (r = 0),
            ko.call(this, [new Lo([new er("", null)])]),
            (this.first = r),
            (this.scrollTop = this.scrollLeft = 0),
            (this.cantEdit = !1),
            (this.cleanGeneration = 1),
            (this.modeFrontier = this.highlightFrontier = r);
            var o = at(r, 0);
            (this.sel = Oi(o)),
            (this.history = new Gi(null)),
            (this.id = ++Fo),
            (this.modeOption = t),
            (this.lineSep = n),
            (this.direction = "rtl" == i ? "rtl" : "ltr"),
            (this.extend = !1),
            "string" == typeof e && (e = this.splitLines(e)),
            Ii(this, { from: o, to: o, text: e }),
            no(this, Oi(o), V);
        };
    (Po.prototype = Q(ko.prototype, {
        constructor: Po,
        iter: function (e, t, r) {
            r
                ? this.iterN(e - this.first, t - e, r)
                : this.iterN(this.first, this.first + this.size, e);
        },
        insert: function (e, t) {
            for (var r = 0, n = 0; n < t.length; ++n) r += t[n].height;
            this.insertInner(e - this.first, t, r);
        },
        remove: function (e, t) {
            this.removeInner(e - this.first, t);
        },
        getValue: function (e) {
            var t = rt(this, this.first, this.first + this.size);
            return !1 === e ? t : t.join(e || this.lineSeparator());
        },
        setValue: li(function (e) {
            var t = at(this.first, 0),
                r = this.first + this.size - 1;
            po(
                this,
                {
                    from: t,
                    to: at(r, et(this, r).text.length),
                    text: this.splitLines(e),
                    origin: "setValue",
                    full: !0,
                },
                !0
            ),
            this.cm && In(this.cm, 0, 0),
            no(this, Oi(t), V);
        }),
        replaceRange: function (e, t, r, n) {
            bo(this, e, (t = gt(this, t)), (r = r ? gt(this, r) : t), n);
        },
        getRange: function (e, t, r) {
            var n = tt(this, gt(this, e), gt(this, t));
            return !1 === r ? n : n.join(r || this.lineSeparator());
        },
        getLine: function (e) {
            var t = this.getLineHandle(e);
            return t && t.text;
        },
        getLineHandle: function (e) {
            if (lt(this, e)) return et(this, e);
        },
        getLineNumber: function (e) {
            return it(e);
        },
        getLineHandleVisualStart: function (e) {
            return "number" == typeof e && (e = et(this, e)), Xt(e);
        },
        lineCount: function () {
            return this.size;
        },
        firstLine: function () {
            return this.first;
        },
        lastLine: function () {
            return this.first + this.size - 1;
        },
        clipPos: function (e) {
            return gt(this, e);
        },
        getCursor: function (e) {
            var t = this.sel.primary();
            return null == e || "head" == e
                ? t.head
                : "anchor" == e
                    ? t.anchor
                    : "end" == e || "to" == e || !1 === e
                        ? t.to()
                        : t.from();
        },
        listSelections: function () {
            return this.sel.ranges;
        },
        somethingSelected: function () {
            return this.sel.somethingSelected();
        },
        setCursor: li(function (e, t, r) {
            to(this, gt(this, "number" == typeof e ? at(e, t || 0) : e), null, r);
        }),
        setSelection: li(function (e, t, r) {
            to(this, gt(this, e), gt(this, t || e), r);
        }),
        extendSelection: li(function (e, t, r) {
            Qi(this, gt(this, e), t && gt(this, t), r);
        }),
        extendSelections: li(function (e, t) {
            Ji(this, vt(this, e), t);
        }),
        extendSelectionsBy: li(function (e, t) {
            Ji(this, vt(this, q(this.sel.ranges, e)), t);
        }),
        setSelections: li(function (e, t, r) {
            if (e.length) {
                for (var n = [], i = 0; i < e.length; i++)
                    n[i] = new Mi(gt(this, e[i].anchor), gt(this, e[i].head));
                null == t && (t = Math.min(e.length - 1, this.sel.primIndex)),
                no(this, Ni(this.cm, n, t), r);
            }
        }),
        addSelection: li(function (e, t, r) {
            var n = this.sel.ranges.slice(0);
            n.push(new Mi(gt(this, e), gt(this, t || e))),
            no(this, Ni(this.cm, n, n.length - 1), r);
        }),
        getSelection: function (e) {
            for (var t, r = this.sel.ranges, n = 0; n < r.length; n++) {
                var i = tt(this, r[n].from(), r[n].to());
                t = t ? t.concat(i) : i;
            }
            return !1 === e ? t : t.join(e || this.lineSeparator());
        },
        getSelections: function (e) {
            for (var t = [], r = this.sel.ranges, n = 0; n < r.length; n++) {
                var i = tt(this, r[n].from(), r[n].to());
                !1 !== e && (i = i.join(e || this.lineSeparator())), (t[n] = i);
            }
            return t;
        },
        replaceSelection: function (e, t, r) {
            for (var n = [], i = 0; i < this.sel.ranges.length; i++) n[i] = e;
            this.replaceSelections(n, t, r || "+input");
        },
        replaceSelections: li(function (e, t, r) {
            for (var n = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
                var l = i.ranges[o];
                n[o] = {
                    from: l.from(),
                    to: l.to(),
                    text: this.splitLines(e[o]),
                    origin: r,
                };
            }
            for (
                var s =
            t &&
            "end" != t &&
            (function (e, t, r) {
                for (
                    var n = [], i = at(e.first, 0), o = i, l = 0;
                    l < t.length;
                    l++
                ) {
                    var s = t[l],
                        a = Hi(s.from, i, o),
                        u = Hi(Ai(s), i, o);
                    if (((i = s.to), (o = u), "around" == r)) {
                        var c = e.sel.ranges[l],
                            h = ut(c.head, c.anchor) < 0;
                        n[l] = new Mi(h ? u : a, h ? a : u);
                    } else n[l] = new Mi(a, a);
                }
                return new Ti(n, e.sel.primIndex);
            })(this, n, t),
                    a = n.length - 1;
                0 <= a;
                a--
            )
                po(this, n[a]);
            s ? ro(this, s) : this.cm && En(this.cm);
        }),
        undo: li(function () {
            vo(this, "undo");
        }),
        redo: li(function () {
            vo(this, "redo");
        }),
        undoSelection: li(function () {
            vo(this, "undo", !0);
        }),
        redoSelection: li(function () {
            vo(this, "redo", !0);
        }),
        setExtending: function (e) {
            this.extend = e;
        },
        getExtending: function () {
            return this.extend;
        },
        historySize: function () {
            for (var e = this.history, t = 0, r = 0, n = 0; n < e.done.length; n++)
                e.done[n].ranges || ++t;
            for (var i = 0; i < e.undone.length; i++) e.undone[i].ranges || ++r;
            return { undo: t, redo: r };
        },
        clearHistory: function () {
            var t = this;
            (this.history = new Gi(this.history.maxGeneration)),
            zi(
                this,
                function (e) {
                    return (e.history = t.history);
                },
                !0
            );
        },
        markClean: function () {
            this.cleanGeneration = this.changeGeneration(!0);
        },
        changeGeneration: function (e) {
            return (
                e &&
          (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null),
                this.history.generation
            );
        },
        isClean: function (e) {
            return this.history.generation == (e || this.cleanGeneration);
        },
        getHistory: function () {
            return { done: qi(this.history.done), undone: qi(this.history.undone) };
        },
        setHistory: function (e) {
            var t = (this.history = new Gi(this.history.maxGeneration));
            (t.done = qi(e.done.slice(0), null, !0)),
            (t.undone = qi(e.undone.slice(0), null, !0));
        },
        setGutterMarker: li(function (e, r, n) {
            return So(this, e, "gutter", function (e) {
                var t = e.gutterMarkers || (e.gutterMarkers = {});
                return !(t[r] = n) && re(t) && (e.gutterMarkers = null), 1;
            });
        }),
        clearGutter: li(function (t) {
            var r = this;
            this.iter(function (e) {
                e.gutterMarkers &&
          e.gutterMarkers[t] &&
          So(r, e, "gutter", function () {
              return (
                  (e.gutterMarkers[t] = null),
                  re(e.gutterMarkers) && (e.gutterMarkers = null),
                  1
              );
          });
            });
        }),
        lineInfo: function (e) {
            var t;
            if ("number" == typeof e) {
                if (!lt(this, e)) return null;
                if (!(e = et(this, (t = e)))) return null;
            } else if (null == (t = it(e))) return null;
            return {
                line: t,
                handle: e,
                text: e.text,
                gutterMarkers: e.gutterMarkers,
                textClass: e.textClass,
                bgClass: e.bgClass,
                wrapClass: e.wrapClass,
                widgets: e.widgets,
            };
        },
        addLineClass: li(function (e, r, n) {
            return So(this, e, "gutter" == r ? "gutter" : "class", function (e) {
                var t =
          "text" == r
              ? "textClass"
              : "background" == r
                  ? "bgClass"
                  : "gutter" == r
                      ? "gutterClass"
                      : "wrapClass";
                if (e[t]) {
                    if (L(n).test(e[t])) return;
                    e[t] += " " + n;
                } else e[t] = n;
                return 1;
            });
        }),
        removeLineClass: li(function (e, o, l) {
            return So(this, e, "gutter" == o ? "gutter" : "class", function (e) {
                var t =
            "text" == o
                ? "textClass"
                : "background" == o
                    ? "bgClass"
                    : "gutter" == o
                        ? "gutterClass"
                        : "wrapClass",
                    r = e[t];
                if (r) {
                    if (null == l) e[t] = null;
                    else {
                        var n = r.match(L(l));
                        if (!n) return;
                        var i = n.index + n[0].length;
                        e[t] =
              r.slice(0, n.index) +
                (n.index && i != r.length ? " " : "") +
                r.slice(i) || null;
                    }
                    return 1;
                }
            });
        }),
        addLineWidget: li(function (e, t, r) {
            return (
                (i = e),
                (o = new To((n = this), t, r)),
                (l = n.cm) && o.noHScroll && (l.display.alignWidgets = !0),
                So(n, i, "widget", function (e) {
                    var t = e.widgets || (e.widgets = []);
                    if (
                        (null == o.insertAt
                            ? t.push(o)
                            : t.splice(Math.min(t.length - 1, Math.max(0, o.insertAt)), 0, o),
                        (o.line = e),
                        l && !$t(n, e))
                    ) {
                        var r = Zt(e) < n.scrollTop;
                        nt(e, e.height + Mr(o)),
                        r && Pn(l, o.height),
                        (l.curOp.forceUpdate = !0);
                    }
                    return 1;
                }),
                l && gr(l, "lineWidgetAdded", l, o, "number" == typeof i ? i : it(i)),
                o
            );
            var n, i, o, l;
        }),
        removeLineWidget: function (e) {
            e.clear();
        },
        markText: function (e, t, r) {
            return Ao(this, gt(this, e), gt(this, t), r, (r && r.type) || "range");
        },
        setBookmark: function (e, t) {
            var r = {
                replacedWith: t && (null == t.nodeType ? t.widget : t),
                insertLeft: t && t.insertLeft,
                clearWhenEmpty: !1,
                shared: t && t.shared,
                handleMouseEvents: t && t.handleMouseEvents,
            };
            return Ao(this, (e = gt(this, e)), e, r, "bookmark");
        },
        findMarksAt: function (e) {
            var t = [],
                r = et(this, (e = gt(this, e)).line).markedSpans;
            if (r)
                for (var n = 0; n < r.length; ++n) {
                    var i = r[n];
                    (null == i.from || i.from <= e.ch) &&
            (null == i.to || i.to >= e.ch) &&
            t.push(i.marker.parent || i.marker);
                }
            return t;
        },
        findMarks: function (i, o, l) {
            (i = gt(this, i)), (o = gt(this, o));
            var s = [],
                a = i.line;
            return (
                this.iter(i.line, o.line + 1, function (e) {
                    var t = e.markedSpans;
                    if (t)
                        for (var r = 0; r < t.length; r++) {
                            var n = t[r];
                            (null != n.to && a == i.line && i.ch >= n.to) ||
                (null == n.from && a != i.line) ||
                (null != n.from && a == o.line && n.from >= o.ch) ||
                (l && !l(n.marker)) ||
                s.push(n.marker.parent || n.marker);
                        }
                    ++a;
                }),
                s
            );
        },
        getAllMarks: function () {
            var n = [];
            return (
                this.iter(function (e) {
                    var t = e.markedSpans;
                    if (t)
                        for (var r = 0; r < t.length; ++r)
                            null != t[r].from && n.push(t[r].marker);
                }),
                n
            );
        },
        posFromIndex: function (r) {
            var n,
                i = this.first,
                o = this.lineSeparator().length;
            return (
                this.iter(function (e) {
                    var t = e.text.length + o;
                    if (r < t) return (n = r), !0;
                    (r -= t), ++i;
                }),
                gt(this, at(i, n))
            );
        },
        indexFromPos: function (e) {
            var t = (e = gt(this, e)).ch;
            if (e.line < this.first || e.ch < 0) return 0;
            var r = this.lineSeparator().length;
            return (
                this.iter(this.first, e.line, function (e) {
                    t += e.text.length + r;
                }),
                t
            );
        },
        copy: function (e) {
            var t = new Po(
                rt(this, this.first, this.first + this.size),
                this.modeOption,
                this.first,
                this.lineSep,
                this.direction
            );
            return (
                (t.scrollTop = this.scrollTop),
                (t.scrollLeft = this.scrollLeft),
                (t.sel = this.sel),
                (t.extend = !1),
                e &&
          ((t.history.undoDepth = this.history.undoDepth),
          t.setHistory(this.getHistory())),
                t
            );
        },
        linkedDoc: function (e) {
            e = e || {};
            var t = this.first,
                r = this.first + this.size;
            null != e.from && e.from > t && (t = e.from),
            null != e.to && e.to < r && (r = e.to);
            var n = new Po(
                rt(this, t, r),
                e.mode || this.modeOption,
                t,
                this.lineSep,
                this.direction
            );
            return (
                e.sharedHist && (n.history = this.history),
                (this.linked || (this.linked = [])).push({
                    doc: n,
                    sharedHist: e.sharedHist,
                }),
                (n.linked = [{ doc: this, isParent: !0, sharedHist: e.sharedHist }]),
                (function (e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var n = t[r],
                            i = n.find(),
                            o = e.clipPos(i.from),
                            l = e.clipPos(i.to);
                        if (ut(o, l)) {
                            var s = Ao(e, o, l, n.primary, n.primary.type);
                            n.markers.push(s), (s.parent = n);
                        }
                    }
                })(n, Wo(this)),
                n
            );
        },
        unlinkDoc: function (e) {
            if ((e instanceof Wl && (e = e.doc), this.linked))
                for (var t = 0; t < this.linked.length; ++t) {
                    if (this.linked[t].doc == e) {
                        this.linked.splice(t, 1), e.unlinkDoc(this), Ho(Wo(this));
                        break;
                    }
                }
            if (e.history == this.history) {
                var r = [e.id];
                zi(
                    e,
                    function (e) {
                        return r.push(e.id);
                    },
                    !0
                ),
                (e.history = new Gi(null)),
                (e.history.done = qi(this.history.done, r)),
                (e.history.undone = qi(this.history.undone, r));
            }
        },
        iterLinkedDocs: function (e) {
            zi(this, e);
        },
        getMode: function () {
            return this.mode;
        },
        getEditor: function () {
            return this.cm;
        },
        splitLines: function (e) {
            return this.lineSep ? e.split(this.lineSep) : Be(e);
        },
        lineSeparator: function () {
            return this.lineSep || "\n";
        },
        setDirection: li(function (e) {
            var t;
            "rtl" != e && (e = "ltr"),
            e != this.direction &&
          ((this.direction = e),
          this.iter(function (e) {
              return (e.order = null);
          }),
          this.cm &&
            ni((t = this.cm), function () {
                Bi(t), vn(t);
            }));
        }),
    })),
    (Po.prototype.eachLine = Po.prototype.iter);
    var Eo = 0;
    function Io(e) {
        var n = this;
        if ((zo(n), !Le(n, e) && !Nr(n.display, e))) {
            Ne(e), x && (Eo = +new Date());
            var t = pn(n, e, !0),
                r = e.dataTransfer.files;
            if (t && !n.isReadOnly())
                if (r && r.length && window.FileReader && window.File)
                    for (
                        var i = r.length,
                            o = Array(i),
                            l = 0,
                            s = function () {
                                ++l == i &&
                  ii(n, function () {
                      var e = {
                          from: (t = gt(n.doc, t)),
                          to: t,
                          text: n.doc.splitLines(
                              o
                                  .filter(function (e) {
                                      return null != e;
                                  })
                                  .join(n.doc.lineSeparator())
                          ),
                          origin: "paste",
                      };
                      po(n.doc, e), ro(n.doc, Oi(gt(n.doc, t), gt(n.doc, Ai(e))));
                  })();
                            },
                            a = function (e, t) {
                                if (
                                    n.options.allowDropFileTypes &&
                  -1 == B(n.options.allowDropFileTypes, e.type)
                                )
                                    s();
                                else {
                                    var r = new FileReader();
                                    (r.onerror = function () {
                                        return s();
                                    }),
                                    (r.onload = function () {
                                        var e = r.result;
                                        /[\x00-\x08\x0e-\x1f]{2}/.test(e) || (o[t] = e), s();
                                    }),
                                    r.readAsText(e);
                                }
                            },
                            u = 0;
                        u < r.length;
                        u++
                    )
                        a(r[u], u);
                else {
                    if (n.state.draggingText && -1 < n.doc.sel.contains(t))
                        return (
                            n.state.draggingText(e),
                            void setTimeout(function () {
                                return n.display.input.focus();
                            }, 20)
                        );
                    try {
                        var c = e.dataTransfer.getData("Text");
                        if (c) {
                            var h;
                            if (
                                (n.state.draggingText &&
                  !n.state.draggingText.copy &&
                  (h = n.listSelections()),
                                io(n.doc, Oi(t, t)),
                                h)
                            )
                                for (var f = 0; f < h.length; ++f)
                                    bo(n.doc, "", h[f].anchor, h[f].head, "drag");
                            n.replaceSelection(c, "around", "paste"), n.display.input.focus();
                        }
                    } catch (e) {}
                }
        }
    }
    function zo(e) {
        e.display.dragCursor &&
      (e.display.lineSpace.removeChild(e.display.dragCursor),
      (e.display.dragCursor = null));
    }
    function Ro(t) {
        if (document.getElementsByClassName) {
            for (
                var e = document.getElementsByClassName("CodeMirror"), r = [], n = 0;
                n < e.length;
                n++
            ) {
                var i = e[n].CodeMirror;
                i && r.push(i);
            }
            r.length &&
        r[0].operation(function () {
            for (var e = 0; e < r.length; e++) t(r[e]);
        });
        }
    }
    var Bo = !1;
    function Go() {
        var e;
        Bo ||
      (we(window, "resize", function () {
          null == e &&
          (e = setTimeout(function () {
              (e = null), Ro(Uo);
          }, 100));
      }),
      we(window, "blur", function () {
          return Ro(An);
      }),
      (Bo = !0));
    }
    function Uo(e) {
        var t = e.display;
        (t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null),
        (t.scrollbarsClipped = !1),
        e.setSize();
    }
    for (
        var Vo = {
                3: "Pause",
                8: "Backspace",
                9: "Tab",
                13: "Enter",
                16: "Shift",
                17: "Ctrl",
                18: "Alt",
                19: "Pause",
                20: "CapsLock",
                27: "Esc",
                32: "Space",
                33: "PageUp",
                34: "PageDown",
                35: "End",
                36: "Home",
                37: "Left",
                38: "Up",
                39: "Right",
                40: "Down",
                44: "PrintScrn",
                45: "Insert",
                46: "Delete",
                59: ";",
                61: "=",
                91: "Mod",
                92: "Mod",
                93: "Mod",
                106: "*",
                107: "=",
                109: "-",
                110: ".",
                111: "/",
                145: "ScrollLock",
                173: "-",
                186: ";",
                187: "=",
                188: ",",
                189: "-",
                190: ".",
                191: "/",
                192: "`",
                219: "[",
                220: "\\",
                221: "]",
                222: "'",
                63232: "Up",
                63233: "Down",
                63234: "Left",
                63235: "Right",
                63272: "Delete",
                63273: "Home",
                63275: "End",
                63276: "PageUp",
                63277: "PageDown",
                63302: "Insert",
            },
            Ko = 0;
        Ko < 10;
        Ko++
    )
        Vo[Ko + 48] = Vo[Ko + 96] = String(Ko);
    for (var jo = 65; jo <= 90; jo++) Vo[jo] = String.fromCharCode(jo);
    for (var Xo = 1; Xo <= 12; Xo++) Vo[Xo + 111] = Vo[Xo + 63235] = "F" + Xo;
    var Yo = {};
    function _o(e) {
        var t,
            r,
            n,
            i,
            o = e.split(/-(?!$)/);
        e = o[o.length - 1];
        for (var l = 0; l < o.length - 1; l++) {
            var s = o[l];
            if (/^(cmd|meta|m)$/i.test(s)) i = !0;
            else if (/^a(lt)?$/i.test(s)) t = !0;
            else if (/^(c|ctrl|control)$/i.test(s)) r = !0;
            else {
                if (!/^s(hift)?$/i.test(s))
                    throw new Error("Unrecognized modifier name: " + s);
                n = !0;
            }
        }
        return (
            t && (e = "Alt-" + e),
            r && (e = "Ctrl-" + e),
            i && (e = "Cmd-" + e),
            n && (e = "Shift-" + e),
            e
        );
    }
    function $o(e) {
        var t = {};
        for (var r in e)
            if (e.hasOwnProperty(r)) {
                var n = e[r];
                if (/^(name|fallthrough|(de|at)tach)$/.test(r)) continue;
                if ("..." == n) {
                    delete e[r];
                    continue;
                }
                for (var i = q(r.split(" "), _o), o = 0; o < i.length; o++) {
                    var l = void 0,
                        s = void 0;
                    l =
            o == i.length - 1
                ? ((s = i.join(" ")), n)
                : ((s = i.slice(0, o + 1).join(" ")), "...");
                    var a = t[s];
                    if (a) {
                        if (a != l) throw new Error("Inconsistent bindings for " + s);
                    } else t[s] = l;
                }
                delete e[r];
            }
        for (var u in t) e[u] = t[u];
        return e;
    }
    function qo(e, t, r, n) {
        var i = (t = el(t)).call ? t.call(e, n) : t[e];
        if (!1 === i) return "nothing";
        if ("..." === i) return "multi";
        if (null != i && r(i)) return "handled";
        if (t.fallthrough) {
            if ("[object Array]" != Object.prototype.toString.call(t.fallthrough))
                return qo(e, t.fallthrough, r, n);
            for (var o = 0; o < t.fallthrough.length; o++) {
                var l = qo(e, t.fallthrough[o], r, n);
                if (l) return l;
            }
        }
    }
    function Zo(e) {
        var t = "string" == typeof e ? e : Vo[e.keyCode];
        return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t;
    }
    function Qo(e, t, r) {
        var n = e;
        return (
            t.altKey && "Alt" != n && (e = "Alt-" + e),
            (y ? t.metaKey : t.ctrlKey) && "Ctrl" != n && (e = "Ctrl-" + e),
            (y ? t.ctrlKey : t.metaKey) && "Cmd" != n && (e = "Cmd-" + e),
            !r && t.shiftKey && "Shift" != n && (e = "Shift-" + e),
            e
        );
    }
    function Jo(e, t) {
        if (v && 34 == e.keyCode && e.char) return !1;
        var r = Vo[e.keyCode];
        return (
            null != r &&
      !e.altGraphKey &&
      (3 == e.keyCode && e.code && (r = e.code), Qo(r, e, t))
        );
    }
    function el(e) {
        return "string" == typeof e ? Yo[e] : e;
    }
    function tl(t, e) {
        for (var r = t.doc.sel.ranges, n = [], i = 0; i < r.length; i++) {
            for (var o = e(r[i]); n.length && ut(o.from, $(n).to) <= 0; ) {
                var l = n.pop();
                if (ut(l.from, o.from) < 0) {
                    o.from = l.from;
                    break;
                }
            }
            n.push(o);
        }
        ni(t, function () {
            for (var e = n.length - 1; 0 <= e; e--)
                bo(t.doc, "", n[e].from, n[e].to, "+delete");
            En(t);
        });
    }
    function rl(e, t, r) {
        var n = oe(e.text, t + r, r);
        return n < 0 || n > e.text.length ? null : n;
    }
    function nl(e, t, r) {
        var n = rl(e, t.ch, r);
        return null == n ? null : new at(t.line, n, r < 0 ? "after" : "before");
    }
    function il(e, t, r, n, i) {
        if (e) {
            "rtl" == t.doc.direction && (i = -i);
            var o = ye(r, t.doc.direction);
            if (o) {
                var l,
                    s = i < 0 ? $(o) : o[0],
                    a = i < 0 == (1 == s.level) ? "after" : "before";
                if (0 < s.level || "rtl" == t.doc.direction) {
                    var u = zr(t, r);
                    l = i < 0 ? r.text.length - 1 : 0;
                    var c = Rr(t, u, l).top;
                    (l = le(
                        function (e) {
                            return Rr(t, u, e).top == c;
                        },
                        i < 0 == (1 == s.level) ? s.from : s.to - 1,
                        l
                    )),
                    "before" == a && (l = rl(r, l, 1));
                } else l = i < 0 ? s.to : s.from;
                return new at(n, l, a);
            }
        }
        return new at(n, i < 0 ? r.text.length : 0, i < 0 ? "before" : "after");
    }
    function ol(t, r, s, e) {
        var a = ye(r, t.doc.direction);
        if (!a) return nl(r, s, e);
        s.ch >= r.text.length
            ? ((s.ch = r.text.length), (s.sticky = "before"))
            : s.ch <= 0 && ((s.ch = 0), (s.sticky = "after"));
        var n = ae(a, s.ch, s.sticky),
            i = a[n];
        if (
            "ltr" == t.doc.direction &&
      i.level % 2 == 0 &&
      (0 < e ? i.to > s.ch : i.from < s.ch)
        )
            return nl(r, s, e);
        function u(e, t) {
            return rl(r, e instanceof at ? e.ch : e, t);
        }
        function o(e) {
            return t.options.lineWrapping
                ? ((l = l || zr(t, r)), on(t, r, l, e))
                : { begin: 0, end: r.text.length };
        }
        var l,
            c = o("before" == s.sticky ? u(s, -1) : s.ch);
        if ("rtl" == t.doc.direction || 1 == i.level) {
            var h = (1 == i.level) == e < 0,
                f = u(s, h ? 1 : -1);
            if (
                null != f &&
        (h ? f <= i.to && f <= c.end : f >= i.from && f >= c.begin)
            ) {
                var d = h ? "before" : "after";
                return new at(s.line, f, d);
            }
        }
        function p(e, t, r) {
            for (
                var n = function (e, t) {
                    return t
                        ? new at(s.line, u(e, 1), "before")
                        : new at(s.line, e, "after");
                };
                0 <= e && e < a.length;
                e += t
            ) {
                var i = a[e],
                    o = 0 < t == (1 != i.level),
                    l = o ? r.begin : u(r.end, -1);
                if (i.from <= l && l < i.to) return n(l, o);
                if (((l = o ? i.from : u(i.to, -1)), r.begin <= l && l < r.end))
                    return n(l, o);
            }
        }
        var g = p(n + e, e, c);
        if (g) return g;
        var v = 0 < e ? c.end : u(c.begin, -1);
        return null == v ||
      (0 < e && v == r.text.length) ||
      !(g = p(0 < e ? 0 : a.length - 1, e, o(v)))
            ? null
            : g;
    }
    (Yo.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharAfter",
        Backspace: "delCharBefore",
        "Shift-Backspace": "delCharBefore",
        Tab: "defaultTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite",
        Esc: "singleSelection",
    }),
    (Yo.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Up": "goLineUp",
        "Ctrl-Down": "goLineDown",
        "Ctrl-Left": "goGroupLeft",
        "Ctrl-Right": "goGroupRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delGroupBefore",
        "Ctrl-Delete": "delGroupAfter",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        "Ctrl-U": "undoSelection",
        "Shift-Ctrl-U": "redoSelection",
        "Alt-U": "redoSelection",
        fallthrough: "basic",
    }),
    (Yo.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Alt-F": "goWordRight",
        "Alt-B": "goWordLeft",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageDown",
        "Shift-Ctrl-V": "goPageUp",
        "Ctrl-D": "delCharAfter",
        "Ctrl-H": "delCharBefore",
        "Alt-D": "delWordAfter",
        "Alt-Backspace": "delWordBefore",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars",
        "Ctrl-O": "openLine",
    }),
    (Yo.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Home": "goDocStart",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goGroupLeft",
        "Alt-Right": "goGroupRight",
        "Cmd-Left": "goLineLeft",
        "Cmd-Right": "goLineRight",
        "Alt-Backspace": "delGroupBefore",
        "Ctrl-Alt-Backspace": "delGroupAfter",
        "Alt-Delete": "delGroupAfter",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        "Cmd-Backspace": "delWrappedLineLeft",
        "Cmd-Delete": "delWrappedLineRight",
        "Cmd-U": "undoSelection",
        "Shift-Cmd-U": "redoSelection",
        "Ctrl-Up": "goDocStart",
        "Ctrl-Down": "goDocEnd",
        fallthrough: ["basic", "emacsy"],
    }),
    (Yo.default = w ? Yo.macDefault : Yo.pcDefault);
    var ll = {
        selectAll: ho,
        singleSelection: function (e) {
            return e.setSelection(e.getCursor("anchor"), e.getCursor("head"), V);
        },
        killLine: function (r) {
            return tl(r, function (e) {
                if (e.empty()) {
                    var t = et(r.doc, e.head.line).text.length;
                    return e.head.ch == t && e.head.line < r.lastLine()
                        ? { from: e.head, to: at(e.head.line + 1, 0) }
                        : { from: e.head, to: at(e.head.line, t) };
                }
                return { from: e.from(), to: e.to() };
            });
        },
        deleteLine: function (t) {
            return tl(t, function (e) {
                return {
                    from: at(e.from().line, 0),
                    to: gt(t.doc, at(e.to().line + 1, 0)),
                };
            });
        },
        delLineLeft: function (e) {
            return tl(e, function (e) {
                return { from: at(e.from().line, 0), to: e.from() };
            });
        },
        delWrappedLineLeft: function (r) {
            return tl(r, function (e) {
                var t = r.charCoords(e.head, "div").top + 5;
                return { from: r.coordsChar({ left: 0, top: t }, "div"), to: e.from() };
            });
        },
        delWrappedLineRight: function (n) {
            return tl(n, function (e) {
                var t = n.charCoords(e.head, "div").top + 5,
                    r = n.coordsChar(
                        { left: n.display.lineDiv.offsetWidth + 100, top: t },
                        "div"
                    );
                return { from: e.from(), to: r };
            });
        },
        undo: function (e) {
            return e.undo();
        },
        redo: function (e) {
            return e.redo();
        },
        undoSelection: function (e) {
            return e.undoSelection();
        },
        redoSelection: function (e) {
            return e.redoSelection();
        },
        goDocStart: function (e) {
            return e.extendSelection(at(e.firstLine(), 0));
        },
        goDocEnd: function (e) {
            return e.extendSelection(at(e.lastLine()));
        },
        goLineStart: function (t) {
            return t.extendSelectionsBy(
                function (e) {
                    return sl(t, e.head.line);
                },
                { origin: "+move", bias: 1 }
            );
        },
        goLineStartSmart: function (t) {
            return t.extendSelectionsBy(
                function (e) {
                    return al(t, e.head);
                },
                { origin: "+move", bias: 1 }
            );
        },
        goLineEnd: function (t) {
            return t.extendSelectionsBy(
                function (e) {
                    return (function (e, t) {
                        var r = et(e.doc, t),
                            n = (function (e) {
                                for (var t; (t = Vt(e)); ) e = t.find(1, !0).line;
                                return e;
                            })(r);
                        n != r && (t = it(n));
                        return il(!0, e, r, t, -1);
                    })(t, e.head.line);
                },
                { origin: "+move", bias: -1 }
            );
        },
        goLineRight: function (r) {
            return r.extendSelectionsBy(function (e) {
                var t = r.cursorCoords(e.head, "div").top + 5;
                return r.coordsChar(
                    { left: r.display.lineDiv.offsetWidth + 100, top: t },
                    "div"
                );
            }, j);
        },
        goLineLeft: function (r) {
            return r.extendSelectionsBy(function (e) {
                var t = r.cursorCoords(e.head, "div").top + 5;
                return r.coordsChar({ left: 0, top: t }, "div");
            }, j);
        },
        goLineLeftSmart: function (n) {
            return n.extendSelectionsBy(function (e) {
                var t = n.cursorCoords(e.head, "div").top + 5,
                    r = n.coordsChar({ left: 0, top: t }, "div");
                return r.ch < n.getLine(r.line).search(/\S/) ? al(n, e.head) : r;
            }, j);
        },
        goLineUp: function (e) {
            return e.moveV(-1, "line");
        },
        goLineDown: function (e) {
            return e.moveV(1, "line");
        },
        goPageUp: function (e) {
            return e.moveV(-1, "page");
        },
        goPageDown: function (e) {
            return e.moveV(1, "page");
        },
        goCharLeft: function (e) {
            return e.moveH(-1, "char");
        },
        goCharRight: function (e) {
            return e.moveH(1, "char");
        },
        goColumnLeft: function (e) {
            return e.moveH(-1, "column");
        },
        goColumnRight: function (e) {
            return e.moveH(1, "column");
        },
        goWordLeft: function (e) {
            return e.moveH(-1, "word");
        },
        goGroupRight: function (e) {
            return e.moveH(1, "group");
        },
        goGroupLeft: function (e) {
            return e.moveH(-1, "group");
        },
        goWordRight: function (e) {
            return e.moveH(1, "word");
        },
        delCharBefore: function (e) {
            return e.deleteH(-1, "char");
        },
        delCharAfter: function (e) {
            return e.deleteH(1, "char");
        },
        delWordBefore: function (e) {
            return e.deleteH(-1, "word");
        },
        delWordAfter: function (e) {
            return e.deleteH(1, "word");
        },
        delGroupBefore: function (e) {
            return e.deleteH(-1, "group");
        },
        delGroupAfter: function (e) {
            return e.deleteH(1, "group");
        },
        indentAuto: function (e) {
            return e.indentSelection("smart");
        },
        indentMore: function (e) {
            return e.indentSelection("add");
        },
        indentLess: function (e) {
            return e.indentSelection("subtract");
        },
        insertTab: function (e) {
            return e.replaceSelection("\t");
        },
        insertSoftTab: function (e) {
            for (
                var t = [], r = e.listSelections(), n = e.options.tabSize, i = 0;
                i < r.length;
                i++
            ) {
                var o = r[i].from(),
                    l = z(e.getLine(o.line), o.ch, n);
                t.push(_(n - (l % n)));
            }
            e.replaceSelections(t);
        },
        defaultTab: function (e) {
            e.somethingSelected()
                ? e.indentSelection("add")
                : e.execCommand("insertTab");
        },
        transposeChars: function (l) {
            return ni(l, function () {
                for (var e = l.listSelections(), t = [], r = 0; r < e.length; r++)
                    if (e[r].empty()) {
                        var n = e[r].head,
                            i = et(l.doc, n.line).text;
                        if (i)
                            if (
                                (n.ch == i.length && (n = new at(n.line, n.ch - 1)), 0 < n.ch)
                            )
                                (n = new at(n.line, n.ch + 1)),
                                l.replaceRange(
                                    i.charAt(n.ch - 1) + i.charAt(n.ch - 2),
                                    at(n.line, n.ch - 2),
                                    n,
                                    "+transpose"
                                );
                            else if (n.line > l.doc.first) {
                                var o = et(l.doc, n.line - 1).text;
                                o &&
                  ((n = new at(n.line, 1)),
                  l.replaceRange(
                      i.charAt(0) +
                      l.doc.lineSeparator() +
                      o.charAt(o.length - 1),
                      at(n.line - 1, o.length - 1),
                      n,
                      "+transpose"
                  ));
                            }
                        t.push(new Mi(n, n));
                    }
                l.setSelections(t);
            });
        },
        newlineAndIndent: function (n) {
            return ni(n, function () {
                for (var e = n.listSelections(), t = e.length - 1; 0 <= t; t--)
                    n.replaceRange(
                        n.doc.lineSeparator(),
                        e[t].anchor,
                        e[t].head,
                        "+input"
                    );
                e = n.listSelections();
                for (var r = 0; r < e.length; r++)
                    n.indentLine(e[r].from().line, null, !0);
                En(n);
            });
        },
        openLine: function (e) {
            return e.replaceSelection("\n", "start");
        },
        toggleOverwrite: function (e) {
            return e.toggleOverwrite();
        },
    };
    function sl(e, t) {
        var r = et(e.doc, t),
            n = Xt(r);
        return n != r && (t = it(n)), il(!0, e, n, t, 1);
    }
    function al(e, t) {
        var r = sl(e, t.line),
            n = et(e.doc, r.line),
            i = ye(n, e.doc.direction);
        if (i && 0 != i[0].level) return r;
        var o = Math.max(r.ch, n.text.search(/\S/)),
            l = t.line == r.line && t.ch <= o && t.ch;
        return at(r.line, l ? 0 : o, r.sticky);
    }
    function ul(e, t, r) {
        if ("string" == typeof t && !(t = ll[t])) return !1;
        e.display.input.ensurePolled();
        var n = e.display.shift,
            i = !1;
        try {
            e.isReadOnly() && (e.state.suppressEdits = !0),
            r && (e.display.shift = !1),
            (i = t(e) != U);
        } finally {
            (e.display.shift = n), (e.state.suppressEdits = !1);
        }
        return i;
    }
    var cl = new R();
    function hl(e, t, r, n) {
        var i = e.state.keySeq;
        if (i) {
            if (Zo(t)) return "handled";
            if (
                (/\'$/.test(t)
                    ? (e.state.keySeq = null)
                    : cl.set(50, function () {
                        e.state.keySeq == i &&
                ((e.state.keySeq = null), e.display.input.reset());
                    }),
                fl(e, i + " " + t, r, n))
            )
                return !0;
        }
        return fl(e, t, r, n);
    }
    function fl(e, t, r, n) {
        var i = (function (e, t, r) {
            for (var n = 0; n < e.state.keyMaps.length; n++) {
                var i = qo(t, e.state.keyMaps[n], r, e);
                if (i) return i;
            }
            return (
                (e.options.extraKeys && qo(t, e.options.extraKeys, r, e)) ||
        qo(t, e.options.keyMap, r, e)
            );
        })(e, t, n);
        return (
            "multi" == i && (e.state.keySeq = t),
            "handled" == i && gr(e, "keyHandled", e, t, r),
            ("handled" != i && "multi" != i) || (Ne(r), Tn(e)),
            !!i
        );
    }
    function dl(t, e) {
        var r = Jo(e, !0);
        return (
            !!r &&
      (e.shiftKey && !t.state.keySeq
          ? hl(t, "Shift-" + r, e, function (e) {
              return ul(t, e, !0);
          }) ||
          hl(t, r, e, function (e) {
              if ("string" == typeof e ? /^go[A-Z]/.test(e) : e.motion)
                  return ul(t, e);
          })
          : hl(t, r, e, function (e) {
              return ul(t, e);
          }))
        );
    }
    var pl = null;
    function gl(e) {
        var t = this;
        if (((t.curOp.focus = W()), !Le(t, e))) {
            x && C < 11 && 27 == e.keyCode && (e.returnValue = !1);
            var r = e.keyCode;
            t.display.shift = 16 == r || e.shiftKey;
            var n,
                i = dl(t, e);
            v &&
        ((pl = i ? r : null),
        !i &&
          88 == r &&
          !Ue &&
          (w ? e.metaKey : e.ctrlKey) &&
          t.replaceSelection("", null, "cut")),
            g &&
          !w &&
          !i &&
          46 == r &&
          e.shiftKey &&
          !e.ctrlKey &&
          document.execCommand &&
          document.execCommand("cut"),
            18 != r ||
          /\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) ||
          (H((n = t.display.lineDiv), "CodeMirror-crosshair"),
          we(document, "keyup", o),
          we(document, "mouseover", o));
        }
        function o(e) {
            (18 != e.keyCode && e.altKey) ||
        (T(n, "CodeMirror-crosshair"),
        Ce(document, "keyup", o),
        Ce(document, "mouseover", o));
        }
    }
    function vl(e) {
        16 == e.keyCode && (this.doc.sel.shift = !1), Le(this, e);
    }
    function ml(e) {
        var t = this;
        if (
            !(
                Nr(t.display, e) ||
        Le(t, e) ||
        (e.ctrlKey && !e.altKey) ||
        (w && e.metaKey)
            )
        ) {
            var r = e.keyCode,
                n = e.charCode;
            if (v && r == pl) return (pl = null), void Ne(e);
            if (!v || (e.which && !(e.which < 10)) || !dl(t, e)) {
                var i,
                    o = String.fromCharCode(null == n ? r : n);
                if ("\b" != o)
                    if (
                        !hl((i = t), "'" + o + "'", e, function (e) {
                            return ul(i, e, !0);
                        })
                    )
                        t.display.input.onKeyPress(e);
            }
        }
    }
    var yl,
        bl,
        wl = function (e, t, r) {
            (this.time = e), (this.pos = t), (this.button = r);
        };
    function xl(e) {
        var t = this,
            r = t.display;
        if (!(Le(t, e) || (r.activeTouch && r.input.supportsTouch())))
            if ((r.input.ensurePolled(), (r.shift = e.shiftKey), Nr(r, e)))
                b ||
          ((r.scroller.draggable = !1),
          setTimeout(function () {
              return (r.scroller.draggable = !0);
          }, 100));
            else if (!Ll(t, e)) {
                var n,
                    i,
                    o,
                    l = pn(t, e),
                    s = He(e),
                    a = l
                        ? ((n = l),
                        (i = s),
                        (o = +new Date()),
                        bl && bl.compare(o, n, i)
                            ? ((yl = bl = null), "triple")
                            : yl && yl.compare(o, n, i)
                                ? ((bl = new wl(o, n, i)), (yl = null), "double")
                                : ((yl = new wl(o, n, i)), (bl = null), "single"))
                        : "single";
                window.focus(),
                1 == s && t.state.selectingText && t.state.selectingText(e),
                (l &&
            (function (r, e, n, t, i) {
                var o = "Click";
                "double" == t
                    ? (o = "Double" + o)
                    : "triple" == t && (o = "Triple" + o);
                return hl(
                    r,
                    Qo(
                        (o = (1 == e ? "Left" : 2 == e ? "Middle" : "Right") + o),
                        i
                    ),
                    i,
                    function (e) {
                        if (("string" == typeof e && (e = ll[e]), !e)) return !1;
                        var t = !1;
                        try {
                            r.isReadOnly() && (r.state.suppressEdits = !0),
                            (t = e(r, n) != U);
                        } finally {
                            r.state.suppressEdits = !1;
                        }
                        return t;
                    }
                );
            })(t, s, l, a, e)) ||
            (1 == s
                ? l
                    ? (function (e, t, r, n) {
                        x ? setTimeout(E(Mn, e), 0) : (e.curOp.focus = W());
                        var i,
                            o = (function (e, t, r) {
                                var n = e.getOption("configureMouse"),
                                    i = n ? n(e, t, r) : {};
                                if (null == i.unit) {
                                    var o = d ? r.shiftKey && r.metaKey : r.altKey;
                                    i.unit = o
                                        ? "rectangle"
                                        : "single" == t
                                            ? "char"
                                            : "double" == t
                                                ? "word"
                                                : "line";
                                }
                                (null != i.extend && !e.doc.extend) ||
                          (i.extend = e.doc.extend || r.shiftKey);
                                null == i.addNew &&
                          (i.addNew = w ? r.metaKey : r.ctrlKey);
                                null == i.moveOnDrag &&
                          (i.moveOnDrag = !(w ? r.altKey : r.ctrlKey));
                                return i;
                            })(e, r, n),
                            l = e.doc.sel;
                        (e.options.dragDrop &&
                      Ee &&
                      !e.isReadOnly() &&
                      "single" == r &&
                      -1 < (i = l.contains(t)) &&
                      (ut((i = l.ranges[i]).from(), t) < 0 || 0 < t.xRel) &&
                      (0 < ut(i.to(), t) || t.xRel < 0)
                            ? function (t, r, n, i) {
                                var o = t.display,
                                    l = !1,
                                    s = ii(t, function (e) {
                                        b && (o.scroller.draggable = !1),
                                        (t.state.draggingText = !1),
                                        Ce(o.wrapper.ownerDocument, "mouseup", s),
                                        Ce(o.wrapper.ownerDocument, "mousemove", a),
                                        Ce(o.scroller, "dragstart", u),
                                        Ce(o.scroller, "drop", s),
                                        l ||
                                  (Ne(e),
                                  i.addNew ||
                                    Qi(t.doc, n, null, null, i.extend),
                                  b || (x && 9 == C)
                                      ? setTimeout(function () {
                                          o.wrapper.ownerDocument.body.focus(),
                                          o.input.focus();
                                      }, 20)
                                      : o.input.focus());
                                    }),
                                    a = function (e) {
                                        l =
                                l ||
                                10 <=
                                  Math.abs(r.clientX - e.clientX) +
                                    Math.abs(r.clientY - e.clientY);
                                    },
                                    u = function () {
                                        return (l = !0);
                                    };
                                b && (o.scroller.draggable = !0);
                                ((t.state.draggingText = s).copy = !i.moveOnDrag),
                                o.scroller.dragDrop && o.scroller.dragDrop();
                                we(o.wrapper.ownerDocument, "mouseup", s),
                                we(o.wrapper.ownerDocument, "mousemove", a),
                                we(o.scroller, "dragstart", u),
                                we(o.scroller, "drop", s),
                                Nn(t),
                                setTimeout(function () {
                                    return o.input.focus();
                                }, 20);
                            }
                            : function (v, e, m, y) {
                                var l = v.display,
                                    b = v.doc;
                                Ne(e);
                                var w,
                                    x,
                                    C = b.sel,
                                    t = C.ranges;
                                y.addNew && !y.extend
                                    ? ((x = b.sel.contains(m)),
                                    (w = -1 < x ? t[x] : new Mi(m, m)))
                                    : ((w = b.sel.primary()), (x = b.sel.primIndex));
                                if ("rectangle" == y.unit)
                                    y.addNew || (w = new Mi(m, m)),
                                    (m = pn(v, e, !0, !0)),
                                    (x = -1);
                                else {
                                    var r = Cl(v, m, y.unit);
                                    w = y.extend
                                        ? Zi(w, r.anchor, r.head, y.extend)
                                        : r;
                                }
                                y.addNew
                                    ? -1 == x
                                        ? ((x = t.length),
                                        no(b, Ni(v, t.concat([w]), x), {
                                            scroll: !1,
                                            origin: "*mouse",
                                        }))
                                        : 1 < t.length &&
                                t[x].empty() &&
                                "char" == y.unit &&
                                !y.extend
                                            ? (no(
                                                b,
                                                Ni(
                                                    v,
                                                    t.slice(0, x).concat(t.slice(x + 1)),
                                                    0
                                                ),
                                                { scroll: !1, origin: "*mouse" }
                                            ),
                                            (C = b.sel))
                                            : eo(b, x, w, K)
                                    : (no(b, new Ti([w], (x = 0)), K), (C = b.sel));
                                var S = m;
                                function s(e) {
                                    if (0 != ut(S, e))
                                        if (((S = e), "rectangle" == y.unit)) {
                                            for (
                                                var t = [],
                                                    r = v.options.tabSize,
                                                    n = z(et(b, m.line).text, m.ch, r),
                                                    i = z(et(b, e.line).text, e.ch, r),
                                                    o = Math.min(n, i),
                                                    l = Math.max(n, i),
                                                    s = Math.min(m.line, e.line),
                                                    a = Math.min(
                                                        v.lastLine(),
                                                        Math.max(m.line, e.line)
                                                    );
                                                s <= a;
                                                s++
                                            ) {
                                                var u = et(b, s).text,
                                                    c = X(u, o, r);
                                                o == l
                                                    ? t.push(new Mi(at(s, c), at(s, c)))
                                                    : u.length > c &&
                                      t.push(
                                          new Mi(at(s, c), at(s, X(u, l, r)))
                                      );
                                            }
                                            t.length || t.push(new Mi(m, m)),
                                            no(
                                                b,
                                                Ni(v, C.ranges.slice(0, x).concat(t), x),
                                                { origin: "*mouse", scroll: !1 }
                                            ),
                                            v.scrollIntoView(e);
                                        } else {
                                            var h,
                                                f = w,
                                                d = Cl(v, e, y.unit),
                                                p = f.anchor;
                                            p =
                                  0 < ut(d.anchor, p)
                                      ? ((h = d.head), dt(f.from(), d.anchor))
                                      : ((h = d.anchor), ft(f.to(), d.head));
                                            var g = C.ranges.slice(0);
                                            (g[x] = (function (e, t) {
                                                var r = t.anchor,
                                                    n = t.head,
                                                    i = et(e.doc, r.line);
                                                if (0 == ut(r, n) && r.sticky == n.sticky)
                                                    return t;
                                                var o = ye(i);
                                                if (!o) return t;
                                                var l = ae(o, r.ch, r.sticky),
                                                    s = o[l];
                                                if (s.from != r.ch && s.to != r.ch) return t;
                                                var a,
                                                    u =
                                      l +
                                      ((s.from == r.ch) == (1 != s.level)
                                          ? 0
                                          : 1);
                                                if (0 == u || u == o.length) return t;
                                                if (n.line != r.line)
                                                    a =
                                      0 <
                                      (n.line - r.line) *
                                        ("ltr" == e.doc.direction ? 1 : -1);
                                                else {
                                                    var c = ae(o, n.ch, n.sticky),
                                                        h =
                                        c - l ||
                                        (n.ch - r.ch) * (1 == s.level ? -1 : 1);
                                                    a = c == u - 1 || c == u ? h < 0 : 0 < h;
                                                }
                                                var f = o[u + (a ? -1 : 0)],
                                                    d = a == (1 == f.level),
                                                    p = d ? f.from : f.to,
                                                    g = d ? "after" : "before";
                                                return r.ch == p && r.sticky == g
                                                    ? t
                                                    : new Mi(new at(r.line, p, g), n);
                                            })(v, new Mi(gt(b, p), h))),
                                            no(b, Ni(v, g, x), K);
                                        }
                                }
                                var a = l.wrapper.getBoundingClientRect(),
                                    u = 0;
                                function n(e) {
                                    (v.state.selectingText = !1),
                                    (u = 1 / 0),
                                    e && (Ne(e), l.input.focus()),
                                    Ce(l.wrapper.ownerDocument, "mousemove", i),
                                    Ce(l.wrapper.ownerDocument, "mouseup", o),
                                    (b.history.lastSelOrigin = null);
                                }
                                var i = ii(v, function (e) {
                                        (0 !== e.buttons && He(e)
                                            ? function e(t) {
                                                var r = ++u,
                                                    n = pn(v, t, !0, "rectangle" == y.unit);
                                                if (n)
                                                    if (0 != ut(n, S)) {
                                                        (v.curOp.focus = W()), s(n);
                                                        var i = Hn(l, b);
                                                        (n.line >= i.to || n.line < i.from) &&
                                          setTimeout(
                                              ii(v, function () {
                                                  u == r && e(t);
                                              }),
                                              150
                                          );
                                                    } else {
                                                        var o =
                                          t.clientY < a.top
                                              ? -20
                                              : t.clientY > a.bottom
                                                  ? 20
                                                  : 0;
                                                        o &&
                                          setTimeout(
                                              ii(v, function () {
                                                  u == r &&
                                                ((l.scroller.scrollTop += o),
                                                e(t));
                                              }),
                                              50
                                          );
                                                    }
                                            }
                                            : n)(e);
                                    }),
                                    o = ii(v, n);
                                (v.state.selectingText = o),
                                we(l.wrapper.ownerDocument, "mousemove", i),
                                we(l.wrapper.ownerDocument, "mouseup", o);
                            })(e, n, t, o);
                    })(t, l, a, e)
                    : We(e) == r.scroller && Ne(e)
                : 2 == s
                    ? (l && Qi(t.doc, l),
                    setTimeout(function () {
                        return r.input.focus();
                    }, 20))
                    : 3 == s && (S ? t.display.input.onContextMenu(e) : Nn(t)));
            }
    }
    function Cl(e, t, r) {
        if ("char" == r) return new Mi(t, t);
        if ("word" == r) return e.findWordAt(t);
        if ("line" == r) return new Mi(at(t.line, 0), gt(e.doc, at(t.line + 1, 0)));
        var n = r(e, t);
        return new Mi(n.from, n.to);
    }
    function Sl(e, t, r, n) {
        var i, o;
        if (t.touches) (i = t.touches[0].clientX), (o = t.touches[0].clientY);
        else
            try {
                (i = t.clientX), (o = t.clientY);
            } catch (t) {
                return !1;
            }
        if (i >= Math.floor(e.display.gutters.getBoundingClientRect().right))
            return !1;
        n && Ne(t);
        var l = e.display,
            s = l.lineDiv.getBoundingClientRect();
        if (o > s.bottom || !Te(e, r)) return Ae(t);
        o -= s.top - l.viewOffset;
        for (var a = 0; a < e.display.gutterSpecs.length; ++a) {
            var u = l.gutters.childNodes[a];
            if (u && u.getBoundingClientRect().right >= i)
                return (
                    Se(e, r, e, ot(e.doc, o), e.display.gutterSpecs[a].className, t),
                    Ae(t)
                );
        }
    }
    function Ll(e, t) {
        return Sl(e, t, "gutterClick", !0);
    }
    function kl(e, t) {
        var r, n;
        Nr(e.display, t) ||
      ((n = t),
      Te((r = e), "gutterContextMenu") && Sl(r, n, "gutterContextMenu", !1)) ||
      Le(e, t, "contextmenu") ||
      S ||
      e.display.input.onContextMenu(t);
    }
    function Tl(e) {
        (e.display.wrapper.className =
      e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") +
      e.options.theme.replace(/(^|\s)\s*/g, " cm-s-")),
        Xr(e);
    }
    wl.prototype.compare = function (e, t, r) {
        return this.time + 400 > e && 0 == ut(t, this.pos) && r == this.button;
    };
    var Ml = {
            toString: function () {
                return "CodeMirror.Init";
            },
        },
        Nl = {},
        Ol = {};
    function Al(e, t, r) {
        if (!t != !(r && r != Ml)) {
            var n = e.display.dragFunctions,
                i = t ? we : Ce;
            i(e.display.scroller, "dragstart", n.start),
            i(e.display.scroller, "dragenter", n.enter),
            i(e.display.scroller, "dragover", n.over),
            i(e.display.scroller, "dragleave", n.leave),
            i(e.display.scroller, "drop", n.drop);
        }
    }
    function Dl(e) {
        e.options.lineWrapping
            ? (H(e.display.wrapper, "CodeMirror-wrap"),
            (e.display.sizer.style.minWidth = ""),
            (e.display.sizerWidth = null))
            : (T(e.display.wrapper, "CodeMirror-wrap"), Jt(e)),
        dn(e),
        vn(e),
        Xr(e),
        setTimeout(function () {
            return Xn(e);
        }, 100);
    }
    function Wl(e, t) {
        var r = this;
        if (!(this instanceof Wl)) return new Wl(e, t);
        (this.options = t = t ? I(t) : {}), I(Nl, t, !1);
        var n = t.value;
        "string" == typeof n
            ? (n = new Po(n, t.mode, null, t.lineSeparator, t.direction))
            : t.mode && (n.modeOption = t.mode),
        (this.doc = n);
        var i = new Wl.inputStyles[t.inputStyle](this),
            o = (this.display = new wi(e, n, i, t));
        for (var l in (Tl((o.wrapper.CodeMirror = this)),
        t.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"),
        $n(this),
        (this.state = {
            keyMaps: [],
            overlays: [],
            modeGen: 0,
            overwrite: !1,
            delayingBlurEvent: !1,
            focused: !1,
            suppressEdits: !1,
            pasteIncoming: -1,
            cutIncoming: -1,
            selectingText: !1,
            draggingText: !1,
            highlight: new R(),
            keySeq: null,
            specialChars: null,
        }),
        t.autofocus && !f && o.input.focus(),
        x &&
      C < 11 &&
      setTimeout(function () {
          return r.display.input.reset(!0);
      }, 20),
        (function (i) {
            var o = i.display;
            we(o.scroller, "mousedown", ii(i, xl)),
            we(
                o.scroller,
                "dblclick",
                x && C < 11
                    ? ii(i, function (e) {
                        if (!Le(i, e)) {
                            var t = pn(i, e);
                            if (t && !Ll(i, e) && !Nr(i.display, e)) {
                                Ne(e);
                                var r = i.findWordAt(t);
                                Qi(i.doc, r.anchor, r.head);
                            }
                        }
                    })
                    : function (e) {
                        return Le(i, e) || Ne(e);
                    }
            );
            we(o.scroller, "contextmenu", function (e) {
                return kl(i, e);
            }),
            we(o.input.getField(), "contextmenu", function (e) {
                o.scroller.contains(e.target) || kl(i, e);
            });
            var r,
                n = { end: 0 };
            function l() {
                o.activeTouch &&
          ((r = setTimeout(function () {
              return (o.activeTouch = null);
          }, 1e3)),
          ((n = o.activeTouch).end = +new Date()));
            }
            function s(e, t) {
                if (null == t.left) return 1;
                var r = t.left - e.left,
                    n = t.top - e.top;
                return 400 < r * r + n * n;
            }
            we(o.scroller, "touchstart", function (e) {
                if (
                    !Le(i, e) &&
          !(function (e) {
              if (1 == e.touches.length) {
                  var t = e.touches[0];
                  return t.radiusX <= 1 && t.radiusY <= 1;
              }
          })(e) &&
          !Ll(i, e)
                ) {
                    o.input.ensurePolled(), clearTimeout(r);
                    var t = +new Date();
                    (o.activeTouch = {
                        start: t,
                        moved: !1,
                        prev: t - n.end <= 300 ? n : null,
                    }),
                    1 == e.touches.length &&
              ((o.activeTouch.left = e.touches[0].pageX),
              (o.activeTouch.top = e.touches[0].pageY));
                }
            }),
            we(o.scroller, "touchmove", function () {
                o.activeTouch && (o.activeTouch.moved = !0);
            }),
            we(o.scroller, "touchend", function (e) {
                var t = o.activeTouch;
                if (
                    t &&
            !Nr(o, e) &&
            null != t.left &&
            !t.moved &&
            new Date() - t.start < 300
                ) {
                    var r,
                        n = i.coordsChar(o.activeTouch, "page");
                    (r =
              !t.prev || s(t, t.prev)
                  ? new Mi(n, n)
                  : !t.prev.prev || s(t, t.prev.prev)
                      ? i.findWordAt(n)
                      : new Mi(at(n.line, 0), gt(i.doc, at(n.line + 1, 0)))),
                    i.setSelection(r.anchor, r.head),
                    i.focus(),
                    Ne(e);
                }
                l();
            }),
            we(o.scroller, "touchcancel", l),
            we(o.scroller, "scroll", function () {
                o.scroller.clientHeight &&
            (Bn(i, o.scroller.scrollTop),
            Un(i, o.scroller.scrollLeft, !0),
            Se(i, "scroll", i));
            }),
            we(o.scroller, "mousewheel", function (e) {
                return ki(i, e);
            }),
            we(o.scroller, "DOMMouseScroll", function (e) {
                return ki(i, e);
            }),
            we(o.wrapper, "scroll", function () {
                return (o.wrapper.scrollTop = o.wrapper.scrollLeft = 0);
            }),
            (o.dragFunctions = {
                enter: function (e) {
                    Le(i, e) || De(e);
                },
                over: function (e) {
                    Le(i, e) ||
              ((function (e, t) {
                  var r = pn(e, t);
                  if (r) {
                      var n = document.createDocumentFragment();
                      Sn(e, r, n),
                      e.display.dragCursor ||
                      ((e.display.dragCursor = A(
                          "div",
                          null,
                          "CodeMirror-cursors CodeMirror-dragcursors"
                      )),
                      e.display.lineSpace.insertBefore(
                          e.display.dragCursor,
                          e.display.cursorDiv
                      )),
                      N(e.display.dragCursor, n);
                  }
              })(i, e),
              De(e));
                },
                start: function (e) {
                    return (function (e, t) {
                        if (x && (!e.state.draggingText || new Date() - Eo < 100)) De(t);
                        else if (
                            !Le(e, t) &&
                !Nr(e.display, t) &&
                (t.dataTransfer.setData("Text", e.getSelection()),
                (t.dataTransfer.effectAllowed = "copyMove"),
                t.dataTransfer.setDragImage && !a)
                        ) {
                            var r = A(
                                "img",
                                null,
                                null,
                                "position: fixed; left: 0; top: 0;"
                            );
                            (r.src =
                  "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),
                            v &&
                    ((r.width = r.height = 1),
                    e.display.wrapper.appendChild(r),
                    (r._top = r.offsetTop)),
                            t.dataTransfer.setDragImage(r, 0, 0),
                            v && r.parentNode.removeChild(r);
                        }
                    })(i, e);
                },
                drop: ii(i, Io),
                leave: function (e) {
                    Le(i, e) || zo(i);
                },
            });
            var e = o.input.getField();
            we(e, "keyup", function (e) {
                return vl.call(i, e);
            }),
            we(e, "keydown", ii(i, gl)),
            we(e, "keypress", ii(i, ml)),
            we(e, "focus", function (e) {
                return On(i, e);
            }),
            we(e, "blur", function (e) {
                return An(i, e);
            });
        })(this),
        Go(),
        Zn(this),
        (this.curOp.forceUpdate = !0),
        Ri(this, n),
        (t.autofocus && !f) || this.hasFocus()
            ? setTimeout(E(On, this), 20)
            : An(this),
        Ol))
            Ol.hasOwnProperty(l) && Ol[l](this, t[l], Ml);
        vi(this), t.finishInit && t.finishInit(this);
        for (var s = 0; s < Hl.length; ++s) Hl[s](this);
        Qn(this),
        b &&
        t.lineWrapping &&
        "optimizelegibility" == getComputedStyle(o.lineDiv).textRendering &&
        (o.lineDiv.style.textRendering = "auto");
    }
    (Wl.defaults = Nl), (Wl.optionHandlers = Ol);
    var Hl = [];
    function Fl(e, t, r, n) {
        var i,
            o = e.doc;
        null == r && (r = "add"),
        "smart" == r && (o.mode.indent ? (i = xt(e, t).state) : (r = "prev"));
        var l = e.options.tabSize,
            s = et(o, t),
            a = z(s.text, null, l);
        s.stateAfter && (s.stateAfter = null);
        var u,
            c = s.text.match(/^\s*/)[0];
        if (n || /\S/.test(s.text)) {
            if (
                "smart" == r &&
        ((u = o.mode.indent(i, s.text.slice(c.length), s.text)) == U || 150 < u)
            ) {
                if (!n) return;
                r = "prev";
            }
        } else (u = 0), (r = "not");
        "prev" == r
            ? (u = t > o.first ? z(et(o, t - 1).text, null, l) : 0)
            : "add" == r
                ? (u = a + e.options.indentUnit)
                : "subtract" == r
                    ? (u = a - e.options.indentUnit)
                    : "number" == typeof r && (u = a + r),
        (u = Math.max(0, u));
        var h = "",
            f = 0;
        if (e.options.indentWithTabs)
            for (var d = Math.floor(u / l); d; --d) (f += l), (h += "\t");
        if ((f < u && (h += _(u - f)), h != c))
            return (
                bo(o, h, at(t, 0), at(t, c.length), "+input"), !(s.stateAfter = null)
            );
        for (var p = 0; p < o.sel.ranges.length; p++) {
            var g = o.sel.ranges[p];
            if (g.head.line == t && g.head.ch < c.length) {
                var v = at(t, c.length);
                eo(o, p, new Mi(v, v));
                break;
            }
        }
    }
    Wl.defineInitHook = function (e) {
        return Hl.push(e);
    };
    var Pl = null;
    function El(e) {
        Pl = e;
    }
    function Il(e, t, r, n, i) {
        var o = e.doc;
        (e.display.shift = !1), (n = n || o.sel);
        var l = new Date() - 200,
            s = "paste" == i || e.state.pasteIncoming > l,
            a = Be(t),
            u = null;
        if (s && 1 < n.ranges.length)
            if (Pl && Pl.text.join("\n") == t) {
                if (n.ranges.length % Pl.text.length == 0) {
                    u = [];
                    for (var c = 0; c < Pl.text.length; c++)
                        u.push(o.splitLines(Pl.text[c]));
                }
            } else
                a.length == n.ranges.length &&
          e.options.pasteLinesPerSelection &&
          (u = q(a, function (e) {
              return [e];
          }));
        for (var h = e.curOp.updateInput, f = n.ranges.length - 1; 0 <= f; f--) {
            var d = n.ranges[f],
                p = d.from(),
                g = d.to();
            d.empty() &&
        (r && 0 < r
            ? (p = at(p.line, p.ch - r))
            : e.state.overwrite && !s
                ? (g = at(
                    g.line,
                    Math.min(et(o, g.line).text.length, g.ch + $(a).length)
                ))
                : s &&
            Pl &&
            Pl.lineWise &&
            Pl.text.join("\n") == t &&
            (p = g = at(p.line, 0)));
            var v = {
                from: p,
                to: g,
                text: u ? u[f % u.length] : a,
                origin: i || (s ? "paste" : e.state.cutIncoming > l ? "cut" : "+input"),
            };
            po(e.doc, v), gr(e, "inputRead", e, v);
        }
        t && !s && Rl(e, t),
        En(e),
        e.curOp.updateInput < 2 && (e.curOp.updateInput = h),
        (e.curOp.typing = !0),
        (e.state.pasteIncoming = e.state.cutIncoming = -1);
    }
    function zl(e, t) {
        var r = e.clipboardData && e.clipboardData.getData("Text");
        return (
            r &&
      (e.preventDefault(),
      t.isReadOnly() ||
        t.options.disableInput ||
        ni(t, function () {
            return Il(t, r, 0, null, "paste");
        }),
      1)
        );
    }
    function Rl(e, t) {
        if (e.options.electricChars && e.options.smartIndent)
            for (var r = e.doc.sel, n = r.ranges.length - 1; 0 <= n; n--) {
                var i = r.ranges[n];
                if (
                    !(100 < i.head.ch || (n && r.ranges[n - 1].head.line == i.head.line))
                ) {
                    var o = e.getModeAt(i.head),
                        l = !1;
                    if (o.electricChars) {
                        for (var s = 0; s < o.electricChars.length; s++)
                            if (-1 < t.indexOf(o.electricChars.charAt(s))) {
                                l = Fl(e, i.head.line, "smart");
                                break;
                            }
                    } else
                        o.electricInput &&
              o.electricInput.test(
                  et(e.doc, i.head.line).text.slice(0, i.head.ch)
              ) &&
              (l = Fl(e, i.head.line, "smart"));
                    l && gr(e, "electricInput", e, i.head.line);
                }
            }
    }
    function Bl(e) {
        for (var t = [], r = [], n = 0; n < e.doc.sel.ranges.length; n++) {
            var i = e.doc.sel.ranges[n].head.line,
                o = { anchor: at(i, 0), head: at(i + 1, 0) };
            r.push(o), t.push(e.getRange(o.anchor, o.head));
        }
        return { text: t, ranges: r };
    }
    function Gl(e, t, r, n) {
        e.setAttribute("autocorrect", r ? "" : "off"),
        e.setAttribute("autocapitalize", n ? "" : "off"),
        e.setAttribute("spellcheck", !!t);
    }
    function Ul() {
        var e = A(
                "textarea",
                null,
                null,
                "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none"
            ),
            t = A(
                "div",
                [e],
                null,
                "overflow: hidden; position: relative; width: 3px; height: 0px;"
            );
        return (
            b ? (e.style.width = "1000px") : e.setAttribute("wrap", "off"),
            c && (e.style.border = "1px solid black"),
            Gl(e),
            t
        );
    }
    function Vl(n, i, o, e, l) {
        var t = i,
            r = o,
            s = et(n, i.line),
            a = l && "rtl" == n.direction ? -o : o;
        function u(e) {
            var t, r;
            if (null == (t = l ? ol(n.cm, s, i, o) : nl(s, i, o))) {
                if (
                    e ||
          (r = i.line + a) < n.first ||
          r >= n.first + n.size ||
          ((i = new at(r, i.ch, i.sticky)), !(s = et(n, r)))
                )
                    return;
                i = il(l, n.cm, s, i.line, a);
            } else i = t;
            return 1;
        }
        if ("char" == e) u();
        else if ("column" == e) u(!0);
        else if ("word" == e || "group" == e)
            for (
                var c = null,
                    h = "group" == e,
                    f = n.cm && n.cm.getHelper(i, "wordChars"),
                    d = !0;
                !(o < 0) || u(!d);
                d = !1
            ) {
                var p = s.text.charAt(i.ch) || "\n",
                    g = te(p, f)
                        ? "w"
                        : h && "\n" == p
                            ? "n"
                            : !h || /\s/.test(p)
                                ? null
                                : "p";
                if ((!h || d || g || (g = "s"), c && c != g)) {
                    o < 0 && ((o = 1), u(), (i.sticky = "after"));
                    break;
                }
                if ((g && (c = g), 0 < o && !u(!d))) break;
            }
        var v = uo(n, i, t, r, !0);
        return ct(t, v) && (v.hitSide = !0), v;
    }
    function Kl(e, t, r, n) {
        var i,
            o,
            l = e.doc,
            s = t.left;
        if ("page" == n) {
            var a = Math.min(
                    e.display.wrapper.clientHeight,
                    window.innerHeight || document.documentElement.clientHeight
                ),
                u = Math.max(a - 0.5 * an(e.display), 3);
            i = (0 < r ? t.bottom : t.top) + r * u;
        } else "line" == n && (i = 0 < r ? t.bottom + 3 : t.top - 3);
        for (; (o = rn(e, s, i)).outside; ) {
            if (r < 0 ? i <= 0 : i >= l.height) {
                o.hitSide = !0;
                break;
            }
            i += 5 * r;
        }
        return o;
    }
    function jl(e) {
        (this.cm = e),
        (this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null),
        (this.polling = new R()),
        (this.composing = null),
        (this.gracePeriod = !1),
        (this.readDOMTimeout = null);
    }
    function Xl(e, t) {
        var r = Ir(e, t.line);
        if (!r || r.hidden) return null;
        var n = et(e.doc, t.line),
            i = Pr(r, n, t.line),
            o = ye(n, e.doc.direction),
            l = "left";
        o && (l = ae(o, t.ch) % 2 ? "right" : "left");
        var s = Ur(i.map, t.ch, l);
        return (s.offset = "right" == s.collapse ? s.end : s.start), s;
    }
    function Yl(e, t) {
        return t && (e.bad = !0), e;
    }
    function _l(e, t, r) {
        var n;
        if (t == e.display.lineDiv) {
            if (!(n = e.display.lineDiv.childNodes[r]))
                return Yl(e.clipPos(at(e.display.viewTo - 1)), !0);
            (t = null), (r = 0);
        } else
            for (n = t; ; n = n.parentNode) {
                if (!n || n == e.display.lineDiv) return null;
                if (n.parentNode && n.parentNode == e.display.lineDiv) break;
            }
        for (var i = 0; i < e.display.view.length; i++) {
            var o = e.display.view[i];
            if (o.node == n) return $l(o, t, r);
        }
    }
    function $l(u, e, t) {
        var r = u.text.firstChild,
            n = !1;
        if (!e || !D(r, e)) return Yl(at(it(u.line), 0), !0);
        if (e == r && ((n = !0), (e = r.childNodes[t]), (t = 0), !e)) {
            var i = u.rest ? $(u.rest) : u.line;
            return Yl(at(it(i), i.text.length), n);
        }
        var o = 3 == e.nodeType ? e : null,
            l = e;
        for (
            o ||
      1 != e.childNodes.length ||
      3 != e.firstChild.nodeType ||
      ((o = e.firstChild), (t = t && o.nodeValue.length));
            l.parentNode != r;

        )
            l = l.parentNode;
        var c = u.measure,
            h = c.maps;
        function s(e, t, r) {
            for (var n = -1; n < (h ? h.length : 0); n++)
                for (var i = n < 0 ? c.map : h[n], o = 0; o < i.length; o += 3) {
                    var l = i[o + 2];
                    if (l == e || l == t) {
                        var s = it(n < 0 ? u.line : u.rest[n]),
                            a = i[o] + r;
                        return (r < 0 || l != e) && (a = i[o + (r ? 1 : 0)]), at(s, a);
                    }
                }
        }
        var a = s(o, l, t);
        if (a) return Yl(a, n);
        for (
            var f = l.nextSibling, d = o ? o.nodeValue.length - t : 0;
            f;
            f = f.nextSibling
        ) {
            if ((a = s(f, f.firstChild, 0))) return Yl(at(a.line, a.ch - d), n);
            d += f.textContent.length;
        }
        for (var p = l.previousSibling, g = t; p; p = p.previousSibling) {
            if ((a = s(p, p.firstChild, -1))) return Yl(at(a.line, a.ch + g), n);
            g += p.textContent.length;
        }
    }
    (jl.prototype.init = function (e) {
        var t = this,
            l = this,
            s = l.cm,
            a = (l.div = e.lineDiv);
        function r(e) {
            if (!Le(s, e)) {
                if (s.somethingSelected())
                    El({ lineWise: !1, text: s.getSelections() }),
                    "cut" == e.type && s.replaceSelection("", null, "cut");
                else {
                    if (!s.options.lineWiseCopyCut) return;
                    var t = Bl(s);
                    El({ lineWise: !0, text: t.text }),
                    "cut" == e.type &&
              s.operation(function () {
                  s.setSelections(t.ranges, 0, V),
                  s.replaceSelection("", null, "cut");
              });
                }
                if (e.clipboardData) {
                    e.clipboardData.clearData();
                    var r = Pl.text.join("\n");
                    if (
                        (e.clipboardData.setData("Text", r),
                        e.clipboardData.getData("Text") == r)
                    )
                        return void e.preventDefault();
                }
                var n = Ul(),
                    i = n.firstChild;
                s.display.lineSpace.insertBefore(n, s.display.lineSpace.firstChild),
                (i.value = Pl.text.join("\n"));
                var o = document.activeElement;
                P(i),
                setTimeout(function () {
                    s.display.lineSpace.removeChild(n),
                    o.focus(),
                    o == a && l.showPrimarySelection();
                }, 50);
            }
        }
        Gl(
            a,
            s.options.spellcheck,
            s.options.autocorrect,
            s.options.autocapitalize
        ),
        we(a, "paste", function (e) {
            Le(s, e) ||
          zl(e, s) ||
          (C <= 11 &&
            setTimeout(
                ii(s, function () {
                    return t.updateFromDOM();
                }),
                20
            ));
        }),
        we(a, "compositionstart", function (e) {
            t.composing = { data: e.data, done: !1 };
        }),
        we(a, "compositionupdate", function (e) {
            t.composing || (t.composing = { data: e.data, done: !1 });
        }),
        we(a, "compositionend", function (e) {
            t.composing &&
          (e.data != t.composing.data && t.readFromDOMSoon(),
          (t.composing.done = !0));
        }),
        we(a, "touchstart", function () {
            return l.forceCompositionEnd();
        }),
        we(a, "input", function () {
            t.composing || t.readFromDOMSoon();
        }),
        we(a, "copy", r),
        we(a, "cut", r);
    }),
    (jl.prototype.prepareSelection = function () {
        var e = Cn(this.cm, !1);
        return (e.focus = document.activeElement == this.div), e;
    }),
    (jl.prototype.showSelection = function (e, t) {
        e &&
        this.cm.display.view.length &&
        ((e.focus || t) && this.showPrimarySelection(),
        this.showMultipleSelections(e));
    }),
    (jl.prototype.getSelection = function () {
        return this.cm.display.wrapper.ownerDocument.getSelection();
    }),
    (jl.prototype.showPrimarySelection = function () {
        var e = this.getSelection(),
            t = this.cm,
            r = t.doc.sel.primary(),
            n = r.from(),
            i = r.to();
        if (
            t.display.viewTo == t.display.viewFrom ||
        n.line >= t.display.viewTo ||
        i.line < t.display.viewFrom
        )
            e.removeAllRanges();
        else {
            var o = _l(t, e.anchorNode, e.anchorOffset),
                l = _l(t, e.focusNode, e.focusOffset);
            if (
                !o ||
          o.bad ||
          !l ||
          l.bad ||
          0 != ut(dt(o, l), n) ||
          0 != ut(ft(o, l), i)
            ) {
                var s = t.display.view,
                    a = (n.line >= t.display.viewFrom && Xl(t, n)) || {
                        node: s[0].measure.map[2],
                        offset: 0,
                    },
                    u = i.line < t.display.viewTo && Xl(t, i);
                if (!u) {
                    var c = s[s.length - 1].measure,
                        h = c.maps ? c.maps[c.maps.length - 1] : c.map;
                    u = {
                        node: h[h.length - 1],
                        offset: h[h.length - 2] - h[h.length - 3],
                    };
                }
                if (a && u) {
                    var f,
                        d = e.rangeCount && e.getRangeAt(0);
                    try {
                        f = k(a.node, a.offset, u.offset, u.node);
                    } catch (e) {}
                    f &&
              (!g && t.state.focused
                  ? (e.collapse(a.node, a.offset),
                  f.collapsed || (e.removeAllRanges(), e.addRange(f)))
                  : (e.removeAllRanges(), e.addRange(f)),
              d && null == e.anchorNode
                  ? e.addRange(d)
                  : g && this.startGracePeriod()),
                    this.rememberSelection();
                } else e.removeAllRanges();
            }
        }
    }),
    (jl.prototype.startGracePeriod = function () {
        var e = this;
        clearTimeout(this.gracePeriod),
        (this.gracePeriod = setTimeout(function () {
            (e.gracePeriod = !1),
            e.selectionChanged() &&
              e.cm.operation(function () {
                  return (e.cm.curOp.selectionChanged = !0);
              });
        }, 20));
    }),
    (jl.prototype.showMultipleSelections = function (e) {
        N(this.cm.display.cursorDiv, e.cursors),
        N(this.cm.display.selectionDiv, e.selection);
    }),
    (jl.prototype.rememberSelection = function () {
        var e = this.getSelection();
        (this.lastAnchorNode = e.anchorNode),
        (this.lastAnchorOffset = e.anchorOffset),
        (this.lastFocusNode = e.focusNode),
        (this.lastFocusOffset = e.focusOffset);
    }),
    (jl.prototype.selectionInEditor = function () {
        var e = this.getSelection();
        if (!e.rangeCount) return !1;
        var t = e.getRangeAt(0).commonAncestorContainer;
        return D(this.div, t);
    }),
    (jl.prototype.focus = function () {
        "nocursor" != this.cm.options.readOnly &&
        ((this.selectionInEditor() && document.activeElement == this.div) ||
          this.showSelection(this.prepareSelection(), !0),
        this.div.focus());
    }),
    (jl.prototype.blur = function () {
        this.div.blur();
    }),
    (jl.prototype.getField = function () {
        return this.div;
    }),
    (jl.prototype.supportsTouch = function () {
        return !0;
    }),
    (jl.prototype.receivedFocus = function () {
        var t = this;
        this.selectionInEditor()
            ? this.pollSelection()
            : ni(this.cm, function () {
                return (t.cm.curOp.selectionChanged = !0);
            }),
        this.polling.set(this.cm.options.pollInterval, function e() {
            t.cm.state.focused &&
            (t.pollSelection(), t.polling.set(t.cm.options.pollInterval, e));
        });
    }),
    (jl.prototype.selectionChanged = function () {
        var e = this.getSelection();
        return (
            e.anchorNode != this.lastAnchorNode ||
        e.anchorOffset != this.lastAnchorOffset ||
        e.focusNode != this.lastFocusNode ||
        e.focusOffset != this.lastFocusOffset
        );
    }),
    (jl.prototype.pollSelection = function () {
        if (
            null == this.readDOMTimeout &&
        !this.gracePeriod &&
        this.selectionChanged()
        ) {
            var e = this.getSelection(),
                t = this.cm;
            if (
                h &&
          l &&
          this.cm.display.gutterSpecs.length &&
          (function (e) {
              for (var t = e; t; t = t.parentNode)
                  if (/CodeMirror-gutter-wrapper/.test(t.className)) return 1;
              return;
          })(e.anchorNode)
            )
                return (
                    this.cm.triggerOnKeyDown({
                        type: "keydown",
                        keyCode: 8,
                        preventDefault: Math.abs,
                    }),
                    this.blur(),
                    void this.focus()
                );
            if (!this.composing) {
                this.rememberSelection();
                var r = _l(t, e.anchorNode, e.anchorOffset),
                    n = _l(t, e.focusNode, e.focusOffset);
                r &&
            n &&
            ni(t, function () {
                no(t.doc, Oi(r, n), V),
                (r.bad || n.bad) && (t.curOp.selectionChanged = !0);
            });
            }
        }
    }),
    (jl.prototype.pollContent = function () {
        null != this.readDOMTimeout &&
        (clearTimeout(this.readDOMTimeout), (this.readDOMTimeout = null));
        var e,
            t,
            r,
            n = this.cm,
            i = n.display,
            o = n.doc.sel.primary(),
            l = o.from(),
            s = o.to();
        if (
            (0 == l.ch &&
          l.line > n.firstLine() &&
          (l = at(l.line - 1, et(n.doc, l.line - 1).length)),
            s.ch == et(n.doc, s.line).text.length &&
          s.line < n.lastLine() &&
          (s = at(s.line + 1, 0)),
            l.line < i.viewFrom || s.line > i.viewTo - 1)
        )
            return !1;
        r =
        l.line == i.viewFrom || 0 == (e = gn(n, l.line))
            ? ((t = it(i.view[0].line)), i.view[0].node)
            : ((t = it(i.view[e].line)), i.view[e - 1].node.nextSibling);
        var a,
            u,
            c = gn(n, s.line);
        if (
            ((u =
          c == i.view.length - 1
              ? ((a = i.viewTo - 1), i.lineDiv.lastChild)
              : ((a = it(i.view[c + 1].line) - 1),
              i.view[c + 1].node.previousSibling)),
            !r)
        )
            return !1;
        for (
            var h = n.doc.splitLines(
                    (function (a, e, t, u, c) {
                        var r = "",
                            h = !1,
                            f = a.doc.lineSeparator(),
                            d = !1;
                        function p() {
                            h && ((r += f), d && (r += f), (h = d = !1));
                        }
                        function g(e) {
                            e && (p(), (r += e));
                        }
                        function v(e) {
                            if (1 == e.nodeType) {
                                var t = e.getAttribute("cm-text");
                                if (t) return void g(t);
                                var r,
                                    n = e.getAttribute("cm-marker");
                                if (n) {
                                    var i = a.findMarks(
                                        at(u, 0),
                                        at(c + 1, 0),
                                        ((s = +n),
                                        function (e) {
                                            return e.id == s;
                                        })
                                    );
                                    return void (
                                        i.length &&
                      (r = i[0].find(0)) &&
                      g(tt(a.doc, r.from, r.to).join(f))
                                    );
                                }
                                if ("false" == e.getAttribute("contenteditable")) return;
                                var o = /^(pre|div|p|li|table|br)$/i.test(e.nodeName);
                                if (!/^br$/i.test(e.nodeName) && 0 == e.textContent.length)
                                    return;
                                o && p();
                                for (var l = 0; l < e.childNodes.length; l++)
                                    v(e.childNodes[l]);
                                /^(pre|p)$/i.test(e.nodeName) && (d = !0), o && (h = !0);
                            } else
                                3 == e.nodeType &&
                    g(
                        e.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " ")
                    );
                            var s;
                        }
                        for (; v(e), e != t; ) (e = e.nextSibling), (d = !1);
                        return r;
                    })(n, r, u, t, a)
                ),
                f = tt(n.doc, at(t, 0), at(a, et(n.doc, a).text.length));
            1 < h.length && 1 < f.length;

        )
            if ($(h) == $(f)) h.pop(), f.pop(), a--;
            else {
                if (h[0] != f[0]) break;
                h.shift(), f.shift(), t++;
            }
        for (
            var d = 0, p = 0, g = h[0], v = f[0], m = Math.min(g.length, v.length);
            d < m && g.charCodeAt(d) == v.charCodeAt(d);

        )
            ++d;
        for (
            var y = $(h),
                b = $(f),
                w = Math.min(
                    y.length - (1 == h.length ? d : 0),
                    b.length - (1 == f.length ? d : 0)
                );
            p < w &&
        y.charCodeAt(y.length - p - 1) == b.charCodeAt(b.length - p - 1);

        )
            ++p;
        if (1 == h.length && 1 == f.length && t == l.line)
            for (
                ;
                d &&
          d > l.ch &&
          y.charCodeAt(y.length - p - 1) == b.charCodeAt(b.length - p - 1);

            )
                d--, p++;
        (h[h.length - 1] = y.slice(0, y.length - p).replace(/^\u200b+/, "")),
        (h[0] = h[0].slice(d).replace(/\u200b+$/, ""));
        var x = at(t, d),
            C = at(a, f.length ? $(f).length - p : 0);
        return 1 < h.length || h[0] || ut(x, C)
            ? (bo(n.doc, h, x, C, "+input"), !0)
            : void 0;
    }),
    (jl.prototype.ensurePolled = function () {
        this.forceCompositionEnd();
    }),
    (jl.prototype.reset = function () {
        this.forceCompositionEnd();
    }),
    (jl.prototype.forceCompositionEnd = function () {
        this.composing &&
        (clearTimeout(this.readDOMTimeout),
        (this.composing = null),
        this.updateFromDOM(),
        this.div.blur(),
        this.div.focus());
    }),
    (jl.prototype.readFromDOMSoon = function () {
        var e = this;
        null == this.readDOMTimeout &&
        (this.readDOMTimeout = setTimeout(function () {
            if (((e.readDOMTimeout = null), e.composing)) {
                if (!e.composing.done) return;
                e.composing = null;
            }
            e.updateFromDOM();
        }, 80));
    }),
    (jl.prototype.updateFromDOM = function () {
        var e = this;
        (!this.cm.isReadOnly() && this.pollContent()) ||
        ni(this.cm, function () {
            return vn(e.cm);
        });
    }),
    (jl.prototype.setUneditable = function (e) {
        e.contentEditable = "false";
    }),
    (jl.prototype.onKeyPress = function (e) {
        0 == e.charCode ||
        this.composing ||
        (e.preventDefault(),
        this.cm.isReadOnly() ||
          ii(this.cm, Il)(
              this.cm,
              String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode),
              0
          ));
    }),
    (jl.prototype.readOnlyChanged = function (e) {
        this.div.contentEditable = String("nocursor" != e);
    }),
    (jl.prototype.onContextMenu = function () {}),
    (jl.prototype.resetPosition = function () {}),
    (jl.prototype.needsContentAttribute = !0);
    function ql(e) {
        (this.cm = e),
        (this.prevInput = ""),
        (this.pollingFast = !1),
        (this.polling = new R()),
        (this.hasSelection = !1),
        (this.composing = null);
    }
    var Zl, Ql, Jl, es, ts;
    function rs(e, t, n, r) {
        (Zl.defaults[e] = t),
        n &&
        (Ql[e] = r
            ? function (e, t, r) {
                r != Ml && n(e, t, r);
            }
            : n);
    }
    (ql.prototype.init = function (r) {
        var e = this,
            n = this,
            i = this.cm;
        this.createField(r);
        var o = this.textarea;
        function t(e) {
            if (!Le(i, e)) {
                if (i.somethingSelected())
                    El({ lineWise: !1, text: i.getSelections() });
                else {
                    if (!i.options.lineWiseCopyCut) return;
                    var t = Bl(i);
                    El({ lineWise: !0, text: t.text }),
                    "cut" == e.type
                        ? i.setSelections(t.ranges, null, V)
                        : ((n.prevInput = ""), (o.value = t.text.join("\n")), P(o));
                }
                "cut" == e.type && (i.state.cutIncoming = +new Date());
            }
        }
        r.wrapper.insertBefore(this.wrapper, r.wrapper.firstChild),
        c && (o.style.width = "0px"),
        we(o, "input", function () {
            x && 9 <= C && e.hasSelection && (e.hasSelection = null), n.poll();
        }),
        we(o, "paste", function (e) {
            Le(i, e) ||
          zl(e, i) ||
          ((i.state.pasteIncoming = +new Date()), n.fastPoll());
        }),
        we(o, "cut", t),
        we(o, "copy", t),
        we(r.scroller, "paste", function (e) {
            if (!Nr(r, e) && !Le(i, e)) {
                if (!o.dispatchEvent)
                    return (i.state.pasteIncoming = +new Date()), void n.focus();
                var t = new Event("paste");
                (t.clipboardData = e.clipboardData), o.dispatchEvent(t);
            }
        }),
        we(r.lineSpace, "selectstart", function (e) {
            Nr(r, e) || Ne(e);
        }),
        we(o, "compositionstart", function () {
            var e = i.getCursor("from");
            n.composing && n.composing.range.clear(),
            (n.composing = {
                start: e,
                range: i.markText(e, i.getCursor("to"), {
                    className: "CodeMirror-composing",
                }),
            });
        }),
        we(o, "compositionend", function () {
            n.composing &&
          (n.poll(), n.composing.range.clear(), (n.composing = null));
        });
    }),
    (ql.prototype.createField = function (e) {
        (this.wrapper = Ul()), (this.textarea = this.wrapper.firstChild);
    }),
    (ql.prototype.prepareSelection = function () {
        var e = this.cm,
            t = e.display,
            r = e.doc,
            n = Cn(e);
        if (e.options.moveInputWithCursor) {
            var i = Jr(e, r.sel.primary().head, "div"),
                o = t.wrapper.getBoundingClientRect(),
                l = t.lineDiv.getBoundingClientRect();
            (n.teTop = Math.max(
                0,
                Math.min(t.wrapper.clientHeight - 10, i.top + l.top - o.top)
            )),
            (n.teLeft = Math.max(
                0,
                Math.min(t.wrapper.clientWidth - 10, i.left + l.left - o.left)
            ));
        }
        return n;
    }),
    (ql.prototype.showSelection = function (e) {
        var t = this.cm.display;
        N(t.cursorDiv, e.cursors),
        N(t.selectionDiv, e.selection),
        null != e.teTop &&
          ((this.wrapper.style.top = e.teTop + "px"),
          (this.wrapper.style.left = e.teLeft + "px"));
    }),
    (ql.prototype.reset = function (e) {
        if (!this.contextMenuPending && !this.composing) {
            var t = this.cm;
            if (t.somethingSelected()) {
                this.prevInput = "";
                var r = t.getSelection();
                (this.textarea.value = r),
                t.state.focused && P(this.textarea),
                x && 9 <= C && (this.hasSelection = r);
            } else
                e ||
            ((this.prevInput = this.textarea.value = ""),
            x && 9 <= C && (this.hasSelection = null));
        }
    }),
    (ql.prototype.getField = function () {
        return this.textarea;
    }),
    (ql.prototype.supportsTouch = function () {
        return !1;
    }),
    (ql.prototype.focus = function () {
        if (
            "nocursor" != this.cm.options.readOnly &&
        (!f || W() != this.textarea)
        )
            try {
                this.textarea.focus();
            } catch (e) {}
    }),
    (ql.prototype.blur = function () {
        this.textarea.blur();
    }),
    (ql.prototype.resetPosition = function () {
        this.wrapper.style.top = this.wrapper.style.left = 0;
    }),
    (ql.prototype.receivedFocus = function () {
        this.slowPoll();
    }),
    (ql.prototype.slowPoll = function () {
        var e = this;
        this.pollingFast ||
        this.polling.set(this.cm.options.pollInterval, function () {
            e.poll(), e.cm.state.focused && e.slowPoll();
        });
    }),
    (ql.prototype.fastPoll = function () {
        var t = !1,
            r = this;
        (r.pollingFast = !0),
        r.polling.set(20, function e() {
            r.poll() || t
                ? ((r.pollingFast = !1), r.slowPoll())
                : ((t = !0), r.polling.set(60, e));
        });
    }),
    (ql.prototype.poll = function () {
        var e = this,
            t = this.cm,
            r = this.textarea,
            n = this.prevInput;
        if (
            this.contextMenuPending ||
        !t.state.focused ||
        (Ge(r) && !n && !this.composing) ||
        t.isReadOnly() ||
        t.options.disableInput ||
        t.state.keySeq
        )
            return !1;
        var i = r.value;
        if (i == n && !t.somethingSelected()) return !1;
        if (
            (x && 9 <= C && this.hasSelection === i) ||
        (w && /[\uf700-\uf7ff]/.test(i))
        )
            return t.display.input.reset(), !1;
        if (t.doc.sel == t.display.selForContextMenu) {
            var o = i.charCodeAt(0);
            if ((8203 != o || n || (n = "​"), 8666 == o))
                return this.reset(), this.cm.execCommand("undo");
        }
        for (
            var l = 0, s = Math.min(n.length, i.length);
            l < s && n.charCodeAt(l) == i.charCodeAt(l);

        )
            ++l;
        return (
            ni(t, function () {
                Il(
                    t,
                    i.slice(l),
                    n.length - l,
                    null,
                    e.composing ? "*compose" : null
                ),
                1e3 < i.length || -1 < i.indexOf("\n")
                    ? (r.value = e.prevInput = "")
                    : (e.prevInput = i),
                e.composing &&
              (e.composing.range.clear(),
              (e.composing.range = t.markText(
                  e.composing.start,
                  t.getCursor("to"),
                  { className: "CodeMirror-composing" }
              )));
            }),
            !0
        );
    }),
    (ql.prototype.ensurePolled = function () {
        this.pollingFast && this.poll() && (this.pollingFast = !1);
    }),
    (ql.prototype.onKeyPress = function () {
        x && 9 <= C && (this.hasSelection = null), this.fastPoll();
    }),
    (ql.prototype.onContextMenu = function (e) {
        var r = this,
            n = r.cm,
            i = n.display,
            o = r.textarea;
        r.contextMenuPending && r.contextMenuPending();
        var t = pn(n, e),
            l = i.scroller.scrollTop;
        if (t && !v) {
            n.options.resetSelectionOnContextMenu &&
          -1 == n.doc.sel.contains(t) &&
          ii(n, no)(n.doc, Oi(t), V);
            var s,
                a = o.style.cssText,
                u = r.wrapper.style.cssText,
                c = r.wrapper.offsetParent.getBoundingClientRect();
            if (
                ((r.wrapper.style.cssText = "position: static"),
                (o.style.cssText =
            "position: absolute; width: 30px; height: 30px;\n      top: " +
            (e.clientY - c.top - 5) +
            "px; left: " +
            (e.clientX - c.left - 5) +
            "px;\n      z-index: 1000; background: " +
            (x ? "rgba(255, 255, 255, .05)" : "transparent") +
            ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);"),
                b && (s = window.scrollY),
                i.input.focus(),
                b && window.scrollTo(null, s),
                i.input.reset(),
                n.somethingSelected() || (o.value = r.prevInput = " "),
                (r.contextMenuPending = d),
                (i.selForContextMenu = n.doc.sel),
                clearTimeout(i.detectingSelectAll),
                x && 9 <= C && f(),
                S)
            ) {
                De(e);
                var h = function () {
                    Ce(window, "mouseup", h), setTimeout(d, 20);
                };
                we(window, "mouseup", h);
            } else setTimeout(d, 50);
        }
        function f() {
            if (null != o.selectionStart) {
                var e = n.somethingSelected(),
                    t = "​" + (e ? o.value : "");
                (o.value = "⇚"),
                (o.value = t),
                (r.prevInput = e ? "" : "​"),
                (o.selectionStart = 1),
                (o.selectionEnd = t.length),
                (i.selForContextMenu = n.doc.sel);
            }
        }
        function d() {
            if (
                r.contextMenuPending == d &&
          ((r.contextMenuPending = !1),
          (r.wrapper.style.cssText = u),
          (o.style.cssText = a),
          x && C < 9 && i.scrollbars.setScrollTop((i.scroller.scrollTop = l)),
          null != o.selectionStart)
            ) {
                (!x || (x && C < 9)) && f();
                var e = 0,
                    t = function () {
                        i.selForContextMenu == n.doc.sel &&
              0 == o.selectionStart &&
              0 < o.selectionEnd &&
              "​" == r.prevInput
                            ? ii(n, ho)(n)
                            : e++ < 10
                                ? (i.detectingSelectAll = setTimeout(t, 500))
                                : ((i.selForContextMenu = null), i.input.reset());
                    };
                i.detectingSelectAll = setTimeout(t, 200);
            }
        }
    }),
    (ql.prototype.readOnlyChanged = function (e) {
        e || this.reset(), (this.textarea.disabled = "nocursor" == e);
    }),
    (ql.prototype.setUneditable = function () {}),
    (ql.prototype.needsContentAttribute = !1),
    (Ql = (Zl = Wl).optionHandlers),
    (Zl.defineOption = rs),
    (Zl.Init = Ml),
    rs(
        "value",
        "",
        function (e, t) {
            return e.setValue(t);
        },
        !0
    ),
    rs(
        "mode",
        null,
        function (e, t) {
            (e.doc.modeOption = t), Fi(e);
        },
        !0
    ),
    rs("indentUnit", 2, Fi, !0),
    rs("indentWithTabs", !1),
    rs("smartIndent", !0),
    rs(
        "tabSize",
        4,
        function (e) {
            Pi(e), Xr(e), vn(e);
        },
        !0
    ),
    rs("lineSeparator", null, function (e, n) {
        if ((e.doc.lineSep = n)) {
            var i = [],
                o = e.doc.first;
            e.doc.iter(function (e) {
                for (var t = 0; ; ) {
                    var r = e.text.indexOf(n, t);
                    if (-1 == r) break;
                    (t = r + n.length), i.push(at(o, r));
                }
                o++;
            });
            for (var t = i.length - 1; 0 <= t; t--)
                bo(e.doc, n, i[t], at(i[t].line, i[t].ch + n.length));
        }
    }),
    rs(
        "specialChars",
        /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200f\u2028\u2029\ufeff\ufff9-\ufffc]/g,
        function (e, t, r) {
            (e.state.specialChars = new RegExp(
                t.source + (t.test("\t") ? "" : "|\t"),
                "g"
            )),
            r != Ml && e.refresh();
        }
    ),
    rs(
        "specialCharPlaceholder",
        or,
        function (e) {
            return e.refresh();
        },
        !0
    ),
    rs("electricChars", !0),
    rs(
        "inputStyle",
        f ? "contenteditable" : "textarea",
        function () {
            throw new Error(
                "inputStyle can not (yet) be changed in a running editor"
            );
        },
        !0
    ),
    rs(
        "spellcheck",
        !1,
        function (e, t) {
            return (e.getInputField().spellcheck = t);
        },
        !0
    ),
    rs(
        "autocorrect",
        !1,
        function (e, t) {
            return (e.getInputField().autocorrect = t);
        },
        !0
    ),
    rs(
        "autocapitalize",
        !1,
        function (e, t) {
            return (e.getInputField().autocapitalize = t);
        },
        !0
    ),
    rs("rtlMoveVisually", !p),
    rs("wholeLineUpdateBefore", !0),
    rs(
        "theme",
        "default",
        function (e) {
            Tl(e), bi(e);
        },
        !0
    ),
    rs("keyMap", "default", function (e, t, r) {
        var n = el(t),
            i = r != Ml && el(r);
        i && i.detach && i.detach(e, n), n.attach && n.attach(e, i || null);
    }),
    rs("extraKeys", null),
    rs("configureMouse", null),
    rs("lineWrapping", !1, Dl, !0),
    rs(
        "gutters",
        [],
        function (e, t) {
            (e.display.gutterSpecs = mi(t, e.options.lineNumbers)), bi(e);
        },
        !0
    ),
    rs(
        "fixedGutter",
        !0,
        function (e, t) {
            (e.display.gutters.style.left = t ? hn(e.display) + "px" : "0"),
            e.refresh();
        },
        !0
    ),
    rs(
        "coverGutterNextToScrollbar",
        !1,
        function (e) {
            return Xn(e);
        },
        !0
    ),
    rs(
        "scrollbarStyle",
        "native",
        function (e) {
            $n(e),
            Xn(e),
            e.display.scrollbars.setScrollTop(e.doc.scrollTop),
            e.display.scrollbars.setScrollLeft(e.doc.scrollLeft);
        },
        !0
    ),
    rs(
        "lineNumbers",
        !1,
        function (e, t) {
            (e.display.gutterSpecs = mi(e.options.gutters, t)), bi(e);
        },
        !0
    ),
    rs("firstLineNumber", 1, bi, !0),
    rs(
        "lineNumberFormatter",
        function (e) {
            return e;
        },
        bi,
        !0
    ),
    rs("showCursorWhenSelecting", !1, xn, !0),
    rs("resetSelectionOnContextMenu", !0),
    rs("lineWiseCopyCut", !0),
    rs("pasteLinesPerSelection", !0),
    rs("selectionsMayTouch", !1),
    rs("readOnly", !1, function (e, t) {
        "nocursor" == t && (An(e), e.display.input.blur()),
        e.display.input.readOnlyChanged(t);
    }),
    rs(
        "disableInput",
        !1,
        function (e, t) {
            t || e.display.input.reset();
        },
        !0
    ),
    rs("dragDrop", !0, Al),
    rs("allowDropFileTypes", null),
    rs("cursorBlinkRate", 530),
    rs("cursorScrollMargin", 0),
    rs("cursorHeight", 1, xn, !0),
    rs("singleCursorHeightPerLine", !0, xn, !0),
    rs("workTime", 100),
    rs("workDelay", 100),
    rs("flattenSpans", !0, Pi, !0),
    rs("addModeClass", !1, Pi, !0),
    rs("pollInterval", 100),
    rs("undoDepth", 200, function (e, t) {
        return (e.doc.history.undoDepth = t);
    }),
    rs("historyEventDelay", 1250),
    rs(
        "viewportMargin",
        10,
        function (e) {
            return e.refresh();
        },
        !0
    ),
    rs("maxHighlightLength", 1e4, Pi, !0),
    rs("moveInputWithCursor", !0, function (e, t) {
        t || e.display.input.resetPosition();
    }),
    rs("tabindex", null, function (e, t) {
        return (e.display.input.getField().tabIndex = t || "");
    }),
    rs("autofocus", null),
    rs(
        "direction",
        "ltr",
        function (e, t) {
            return e.doc.setDirection(t);
        },
        !0
    ),
    rs("phrases", null),
    (es = (Jl = Wl).optionHandlers),
    (ts = Jl.helpers = {}),
    (Jl.prototype = {
        constructor: Jl,
        focus: function () {
            window.focus(), this.display.input.focus();
        },
        setOption: function (e, t) {
            var r = this.options,
                n = r[e];
            (r[e] == t && "mode" != e) ||
          ((r[e] = t),
          es.hasOwnProperty(e) && ii(this, es[e])(this, t, n),
          Se(this, "optionChange", this, e));
        },
        getOption: function (e) {
            return this.options[e];
        },
        getDoc: function () {
            return this.doc;
        },
        addKeyMap: function (e, t) {
            this.state.keyMaps[t ? "push" : "unshift"](el(e));
        },
        removeKeyMap: function (e) {
            for (var t = this.state.keyMaps, r = 0; r < t.length; ++r)
                if (t[r] == e || t[r].name == e) return t.splice(r, 1), !0;
        },
        addOverlay: oi(function (e, t) {
            var r = e.token ? e : Jl.getMode(this.options, e);
            if (r.startState) throw new Error("Overlays may not be stateful.");
            !(function (e, t, r) {
                for (var n = 0, i = r(t); n < e.length && r(e[n]) <= i; ) n++;
                e.splice(n, 0, t);
            })(
                this.state.overlays,
                {
                    mode: r,
                    modeSpec: e,
                    opaque: t && t.opaque,
                    priority: (t && t.priority) || 0,
                },
                function (e) {
                    return e.priority;
                }
            ),
            this.state.modeGen++,
            vn(this);
        }),
        removeOverlay: oi(function (e) {
            for (var t = this.state.overlays, r = 0; r < t.length; ++r) {
                var n = t[r].modeSpec;
                if (n == e || ("string" == typeof e && n.name == e))
                    return t.splice(r, 1), this.state.modeGen++, void vn(this);
            }
        }),
        indentLine: oi(function (e, t, r) {
            "string" != typeof t &&
          "number" != typeof t &&
          (t =
            null == t
                ? this.options.smartIndent
                    ? "smart"
                    : "prev"
                : t
                    ? "add"
                    : "subtract"),
            lt(this.doc, e) && Fl(this, e, t, r);
        }),
        indentSelection: oi(function (e) {
            for (var t = this.doc.sel.ranges, r = -1, n = 0; n < t.length; n++) {
                var i = t[n];
                if (i.empty())
                    i.head.line > r &&
              (Fl(this, i.head.line, e, !0),
              (r = i.head.line),
              n == this.doc.sel.primIndex && En(this));
                else {
                    var o = i.from(),
                        l = i.to(),
                        s = Math.max(r, o.line);
                    r = Math.min(this.lastLine(), l.line - (l.ch ? 0 : 1)) + 1;
                    for (var a = s; a < r; ++a) Fl(this, a, e);
                    var u = this.doc.sel.ranges;
                    0 == o.ch &&
              t.length == u.length &&
              0 < u[n].from().ch &&
              eo(this.doc, n, new Mi(o, u[n].to()), V);
                }
            }
        }),
        getTokenAt: function (e, t) {
            return Tt(this, e, t);
        },
        getLineTokens: function (e, t) {
            return Tt(this, at(e), t, !0);
        },
        getTokenTypeAt: function (e) {
            e = gt(this.doc, e);
            var t,
                r = wt(this, et(this.doc, e.line)),
                n = 0,
                i = (r.length - 1) / 2,
                o = e.ch;
            if (0 == o) t = r[2];
            else
                for (;;) {
                    var l = (n + i) >> 1;
                    if ((l ? r[2 * l - 1] : 0) >= o) i = l;
                    else {
                        if (!(r[2 * l + 1] < o)) {
                            t = r[2 * l + 2];
                            break;
                        }
                        n = 1 + l;
                    }
                }
            var s = t ? t.indexOf("overlay ") : -1;
            return s < 0 ? t : 0 == s ? null : t.slice(0, s - 1);
        },
        getModeAt: function (e) {
            var t = this.doc.mode;
            return t.innerMode ? Jl.innerMode(t, this.getTokenAt(e).state).mode : t;
        },
        getHelper: function (e, t) {
            return this.getHelpers(e, t)[0];
        },
        getHelpers: function (e, t) {
            var r = [];
            if (!ts.hasOwnProperty(t)) return r;
            var n = ts[t],
                i = this.getModeAt(e);
            if ("string" == typeof i[t]) n[i[t]] && r.push(n[i[t]]);
            else if (i[t])
                for (var o = 0; o < i[t].length; o++) {
                    var l = n[i[t][o]];
                    l && r.push(l);
                }
            else
                i.helperType && n[i.helperType]
                    ? r.push(n[i.helperType])
                    : n[i.name] && r.push(n[i.name]);
            for (var s = 0; s < n._global.length; s++) {
                var a = n._global[s];
                a.pred(i, this) && -1 == B(r, a.val) && r.push(a.val);
            }
            return r;
        },
        getStateAfter: function (e, t) {
            var r = this.doc;
            return xt(
                this,
                (e = pt(r, null == e ? r.first + r.size - 1 : e)) + 1,
                t
            ).state;
        },
        cursorCoords: function (e, t) {
            var r = this.doc.sel.primary();
            return Jr(
                this,
                null == e
                    ? r.head
                    : "object" == typeof e
                        ? gt(this.doc, e)
                        : e
                            ? r.from()
                            : r.to(),
                t || "page"
            );
        },
        charCoords: function (e, t) {
            return Qr(this, gt(this.doc, e), t || "page");
        },
        coordsChar: function (e, t) {
            return rn(this, (e = Zr(this, e, t || "page")).left, e.top);
        },
        lineAtHeight: function (e, t) {
            return (
                (e = Zr(this, { top: e, left: 0 }, t || "page").top),
                ot(this.doc, e + this.display.viewOffset)
            );
        },
        heightAtLine: function (e, t, r) {
            var n,
                i = !1;
            if ("number" == typeof e) {
                var o = this.doc.first + this.doc.size - 1;
                e < this.doc.first
                    ? (e = this.doc.first)
                    : o < e && ((e = o), (i = !0)),
                (n = et(this.doc, e));
            } else n = e;
            return (
                qr(this, n, { top: 0, left: 0 }, t || "page", r || i).top +
          (i ? this.doc.height - Zt(n) : 0)
            );
        },
        defaultTextHeight: function () {
            return an(this.display);
        },
        defaultCharWidth: function () {
            return un(this.display);
        },
        getViewport: function () {
            return { from: this.display.viewFrom, to: this.display.viewTo };
        },
        addWidget: function (e, t, r, n, i) {
            var o,
                l,
                s,
                a = this.display,
                u = (e = Jr(this, gt(this.doc, e))).bottom,
                c = e.left;
            if (
                ((t.style.position = "absolute"),
                t.setAttribute("cm-ignore-events", "true"),
                this.display.input.setUneditable(t),
                a.sizer.appendChild(t),
                "over" == n)
            )
                u = e.top;
            else if ("above" == n || "near" == n) {
                var h = Math.max(a.wrapper.clientHeight, this.doc.height),
                    f = Math.max(a.sizer.clientWidth, a.lineSpace.clientWidth);
                ("above" == n || e.bottom + t.offsetHeight > h) &&
          e.top > t.offsetHeight
                    ? (u = e.top - t.offsetHeight)
                    : e.bottom + t.offsetHeight <= h && (u = e.bottom),
                c + t.offsetWidth > f && (c = f - t.offsetWidth);
            }
            (t.style.top = u + "px"),
            (t.style.left = t.style.right = ""),
            "right" == i
                ? ((c = a.sizer.clientWidth - t.offsetWidth),
                (t.style.right = "0px"))
                : ("left" == i
                    ? (c = 0)
                    : "middle" == i &&
                  (c = (a.sizer.clientWidth - t.offsetWidth) / 2),
                (t.style.left = c + "px")),
            r &&
            ((o = this),
            (l = {
                left: c,
                top: u,
                right: c + t.offsetWidth,
                bottom: u + t.offsetHeight,
            }),
            null != (s = Fn(o, l)).scrollTop && Bn(o, s.scrollTop),
            null != s.scrollLeft && Un(o, s.scrollLeft));
        },
        triggerOnKeyDown: oi(gl),
        triggerOnKeyPress: oi(ml),
        triggerOnKeyUp: vl,
        triggerOnMouseDown: oi(xl),
        execCommand: function (e) {
            if (ll.hasOwnProperty(e)) return ll[e].call(null, this);
        },
        triggerElectric: oi(function (e) {
            Rl(this, e);
        }),
        findPosH: function (e, t, r, n) {
            var i = 1;
            t < 0 && ((i = -1), (t = -t));
            for (
                var o = gt(this.doc, e), l = 0;
                l < t && !(o = Vl(this.doc, o, i, r, n)).hitSide;
                ++l
            );
            return o;
        },
        moveH: oi(function (t, r) {
            var n = this;
            this.extendSelectionsBy(function (e) {
                return n.display.shift || n.doc.extend || e.empty()
                    ? Vl(n.doc, e.head, t, r, n.options.rtlMoveVisually)
                    : t < 0
                        ? e.from()
                        : e.to();
            }, j);
        }),
        deleteH: oi(function (r, n) {
            var e = this.doc.sel,
                i = this.doc;
            e.somethingSelected()
                ? i.replaceSelection("", null, "+delete")
                : tl(this, function (e) {
                    var t = Vl(i, e.head, r, n, !1);
                    return r < 0 ? { from: t, to: e.head } : { from: e.head, to: t };
                });
        }),
        findPosV: function (e, t, r, n) {
            var i = 1,
                o = n;
            t < 0 && ((i = -1), (t = -t));
            for (var l = gt(this.doc, e), s = 0; s < t; ++s) {
                var a = Jr(this, l, "div");
                if (
                    (null == o ? (o = a.left) : (a.left = o),
                    (l = Kl(this, a, i, r)).hitSide)
                )
                    break;
            }
            return l;
        },
        moveV: oi(function (n, i) {
            var o = this,
                l = this.doc,
                s = [],
                a = !this.display.shift && !l.extend && l.sel.somethingSelected();
            if (
                (l.extendSelectionsBy(function (e) {
                    if (a) return n < 0 ? e.from() : e.to();
                    var t = Jr(o, e.head, "div");
                    null != e.goalColumn && (t.left = e.goalColumn), s.push(t.left);
                    var r = Kl(o, t, n, i);
                    return (
                        "page" == i &&
                e == l.sel.primary() &&
                Pn(o, Qr(o, r, "div").top - t.top),
                        r
                    );
                }, j),
                s.length)
            )
                for (var e = 0; e < l.sel.ranges.length; e++)
                    l.sel.ranges[e].goalColumn = s[e];
        }),
        findWordAt: function (e) {
            var t = et(this.doc, e.line).text,
                r = e.ch,
                n = e.ch;
            if (t) {
                var i = this.getHelper(e, "wordChars");
                ("before" != e.sticky && n != t.length) || !r ? ++n : --r;
                for (
                    var o = t.charAt(r),
                        l = te(o, i)
                            ? function (e) {
                                return te(e, i);
                            }
                            : /\s/.test(o)
                                ? function (e) {
                                    return /\s/.test(e);
                                }
                                : function (e) {
                                    return !/\s/.test(e) && !te(e);
                                };
                    0 < r && l(t.charAt(r - 1));

                )
                    --r;
                for (; n < t.length && l(t.charAt(n)); ) ++n;
            }
            return new Mi(at(e.line, r), at(e.line, n));
        },
        toggleOverwrite: function (e) {
            (null != e && e == this.state.overwrite) ||
          (((this.state.overwrite = !this.state.overwrite) ? H : T)(
              this.display.cursorDiv,
              "CodeMirror-overwrite"
          ),
          Se(this, "overwriteToggle", this, this.state.overwrite));
        },
        hasFocus: function () {
            return this.display.input.getField() == W();
        },
        isReadOnly: function () {
            return !(!this.options.readOnly && !this.doc.cantEdit);
        },
        scrollTo: oi(function (e, t) {
            In(this, e, t);
        }),
        getScrollInfo: function () {
            var e = this.display.scroller;
            return {
                left: e.scrollLeft,
                top: e.scrollTop,
                height: e.scrollHeight - Wr(this) - this.display.barHeight,
                width: e.scrollWidth - Wr(this) - this.display.barWidth,
                clientHeight: Fr(this),
                clientWidth: Hr(this),
            };
        },
        scrollIntoView: oi(function (e, t) {
            var r, n;
            null == e
                ? ((e = { from: this.doc.sel.primary().head, to: null }),
                null == t && (t = this.options.cursorScrollMargin))
                : "number" == typeof e
                    ? (e = { from: at(e, 0), to: null })
                    : null == e.from && (e = { from: e, to: null }),
            e.to || (e.to = e.from),
            (e.margin = t || 0),
            null != e.from.line
                ? ((n = e), zn((r = this)), (r.curOp.scrollToPos = n))
                : Rn(this, e.from, e.to, e.margin);
        }),
        setSize: oi(function (e, t) {
            function r(e) {
                return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e;
            }
            var n = this;
            null != e && (this.display.wrapper.style.width = r(e)),
            null != t && (this.display.wrapper.style.height = r(t)),
            this.options.lineWrapping && jr(this);
            var i = this.display.viewFrom;
            this.doc.iter(i, this.display.viewTo, function (e) {
                if (e.widgets)
                    for (var t = 0; t < e.widgets.length; t++)
                        if (e.widgets[t].noHScroll) {
                            mn(n, i, "widget");
                            break;
                        }
                ++i;
            }),
            (this.curOp.forceUpdate = !0),
            Se(this, "refresh", this);
        }),
        operation: function (e) {
            return ni(this, e);
        },
        startOperation: function () {
            return Zn(this);
        },
        endOperation: function () {
            return Qn(this);
        },
        refresh: oi(function () {
            var e = this.display.cachedTextHeight;
            vn(this),
            (this.curOp.forceUpdate = !0),
            Xr(this),
            In(this, this.doc.scrollLeft, this.doc.scrollTop),
            di(this.display),
            (null == e || 0.5 < Math.abs(e - an(this.display))) && dn(this),
            Se(this, "refresh", this);
        }),
        swapDoc: oi(function (e) {
            var t = this.doc;
            return (
                (t.cm = null),
                this.state.selectingText && this.state.selectingText(),
                Ri(this, e),
                Xr(this),
                this.display.input.reset(),
                In(this, e.scrollLeft, e.scrollTop),
                (this.curOp.forceScroll = !0),
                gr(this, "swapDoc", this, t),
                t
            );
        }),
        phrase: function (e) {
            var t = this.options.phrases;
            return t && Object.prototype.hasOwnProperty.call(t, e) ? t[e] : e;
        },
        getInputField: function () {
            return this.display.input.getField();
        },
        getWrapperElement: function () {
            return this.display.wrapper;
        },
        getScrollerElement: function () {
            return this.display.scroller;
        },
        getGutterElement: function () {
            return this.display.gutters;
        },
    }),
    Me(Jl),
    (Jl.registerHelper = function (e, t, r) {
        ts.hasOwnProperty(e) || (ts[e] = Jl[e] = { _global: [] }), (ts[e][t] = r);
    }),
    (Jl.registerGlobalHelper = function (e, t, r, n) {
        Jl.registerHelper(e, t, n), ts[e]._global.push({ pred: r, val: n });
    });
    var ns,
        is = "iter insert remove copy getEditor constructor".split(" ");
    for (var os in Po.prototype)
        Po.prototype.hasOwnProperty(os) &&
      B(is, os) < 0 &&
      (Wl.prototype[os] = (function (e) {
          return function () {
              return e.apply(this.doc, arguments);
          };
      })(Po.prototype[os]));
    return (
        Me(Po),
        (Wl.inputStyles = { textarea: ql, contenteditable: jl }),
        (Wl.defineMode = function (e) {
            Wl.defaults.mode || "null" == e || (Wl.defaults.mode = e),
            function (e, t) {
                2 < arguments.length &&
            (t.dependencies = Array.prototype.slice.call(arguments, 2)),
                (Ke[e] = t);
            }.apply(this, arguments);
        }),
        (Wl.defineMIME = function (e, t) {
            je[e] = t;
        }),
        Wl.defineMode("null", function () {
            return {
                token: function (e) {
                    return e.skipToEnd();
                },
            };
        }),
        Wl.defineMIME("text/plain", "null"),
        (Wl.defineExtension = function (e, t) {
            Wl.prototype[e] = t;
        }),
        (Wl.defineDocExtension = function (e, t) {
            Po.prototype[e] = t;
        }),
        (Wl.fromTextArea = function (t, r) {
            if (
                (((r = r ? I(r) : {}).value = t.value),
                !r.tabindex && t.tabIndex && (r.tabindex = t.tabIndex),
                !r.placeholder && t.placeholder && (r.placeholder = t.placeholder),
                null == r.autofocus)
            ) {
                var e = W();
                r.autofocus =
          e == t || (null != t.getAttribute("autofocus") && e == document.body);
            }
            function n() {
                t.value = s.getValue();
            }
            var i;
            if (t.form && (we(t.form, "submit", n), !r.leaveSubmitMethodAlone)) {
                var o = t.form;
                i = o.submit;
                try {
                    var l = (o.submit = function () {
                        n(), (o.submit = i), o.submit(), (o.submit = l);
                    });
                } catch (e) {}
            }
            (r.finishInit = function (e) {
                (e.save = n),
                (e.getTextArea = function () {
                    return t;
                }),
                (e.toTextArea = function () {
                    (e.toTextArea = isNaN),
                    n(),
                    t.parentNode.removeChild(e.getWrapperElement()),
                    (t.style.display = ""),
                    t.form &&
                (Ce(t.form, "submit", n),
                r.leaveSubmitMethodAlone ||
                  "function" != typeof t.form.submit ||
                  (t.form.submit = i));
                });
            }),
            (t.style.display = "none");
            var s = Wl(function (e) {
                return t.parentNode.insertBefore(e, t.nextSibling);
            }, r);
            return s;
        }),
        ((ns = Wl).off = Ce),
        (ns.on = we),
        (ns.wheelEventPixels = Li),
        (ns.Doc = Po),
        (ns.splitLines = Be),
        (ns.countColumn = z),
        (ns.findColumn = X),
        (ns.isWordChar = ee),
        (ns.Pass = U),
        (ns.signal = Se),
        (ns.Line = er),
        (ns.changeEnd = Ai),
        (ns.scrollbarModel = _n),
        (ns.Pos = at),
        (ns.cmpPos = ut),
        (ns.modes = Ke),
        (ns.mimeModes = je),
        (ns.resolveMode = Xe),
        (ns.getMode = Ye),
        (ns.modeExtensions = _e),
        (ns.extendMode = $e),
        (ns.copyState = qe),
        (ns.startState = Qe),
        (ns.innerMode = Ze),
        (ns.commands = ll),
        (ns.keyMap = Yo),
        (ns.keyName = Jo),
        (ns.isModifierKey = Zo),
        (ns.lookupKey = qo),
        (ns.normalizeKeyMap = $o),
        (ns.StringStream = Je),
        (ns.SharedTextMarker = Do),
        (ns.TextMarker = Oo),
        (ns.LineWidget = To),
        (ns.e_preventDefault = Ne),
        (ns.e_stopPropagation = Oe),
        (ns.e_stop = De),
        (ns.addClass = H),
        (ns.contains = D),
        (ns.rmClass = T),
        (ns.keyNames = Vo),
        (Wl.version = "5.52.2"),
        Wl
    );
});
!(function (t) {
    "object" == typeof exports && "object" == typeof module
        ? t(
            require("../../lib/codemirror"),
            require("../xml/xml"),
            require("../meta")
        )
        : "function" == typeof define && define.amd
            ? define(["../../lib/codemirror", "../xml/xml", "../meta"], t)
            : t(CodeMirror);
})(function (H) {
    "use strict";
    H.defineMode(
        "markdown",
        function (c, x) {
            var A = H.getMode(c, "text/html"),
                u = "null" == A.name;
            void 0 === x.highlightFormatting && (x.highlightFormatting = !1),
            void 0 === x.maxBlockquoteDepth && (x.maxBlockquoteDepth = 0),
            void 0 === x.taskLists && (x.taskLists = !1),
            void 0 === x.strikethrough && (x.strikethrough = !1),
            void 0 === x.emoji && (x.emoji = !1),
            void 0 === x.fencedCodeBlockHighlighting &&
          (x.fencedCodeBlockHighlighting = !0),
            void 0 === x.xml && (x.xml = !0),
            void 0 === x.tokenTypeOverrides && (x.tokenTypeOverrides = {});
            var S = {
                header: "header",
                code: "comment",
                quote: "quote",
                list1: "variable-2",
                list2: "variable-3",
                list3: "keyword",
                hr: "hr",
                image: "image",
                imageAltText: "image-alt-text",
                imageMarker: "image-marker",
                formatting: "formatting",
                linkInline: "link",
                linkEmail: "link",
                linkText: "link",
                linkHref: "string",
                em: "em",
                strong: "strong",
                strikethrough: "strikethrough",
                emoji: "builtin",
            };
            for (var t in S)
                S.hasOwnProperty(t) &&
          x.tokenTypeOverrides[t] &&
          (S[t] = x.tokenTypeOverrides[t]);
            var d = /^([*\-_])(?:\s*\1){2,}\s*$/,
                k = /^(?:[*\-+]|^[0-9]+([.)]))\s+/,
                C = /^\[(x| )\](?=\s)/i,
                F = x.allowAtxHeaderWithoutSpace ? /^(#+)/ : /^(#+)(?: |$)/,
                D = /^ {0,3}(?:\={1,}|-{2,})\s*$/,
                i = /^[^#!\[\]*_\\<>` "'(~:]+/,
                p = /^(~~~+|```+)[ \t]*([\w+#-]*)[^\n`]*$/,
                E = /^\s*\[[^\]]+?\]:.*$/,
                v = /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/;
            function B(t, e, i) {
                return (e.f = e.inline = i), i(t, e);
            }
            function L(t, e, i) {
                return (e.f = e.block = i), i(t, e);
            }
            function n(t) {
                if (
                    ((t.linkTitle = !1),
                    (t.linkHref = !1),
                    (t.linkText = !1),
                    (t.em = !1),
                    (t.strong = !1),
                    (t.strikethrough = !1),
                    (t.quote = 0),
                    (t.indentedCode = !1),
                    t.f == T)
                ) {
                    var e = u;
                    if (!e) {
                        var i = H.innerMode(A, t.htmlState);
                        e =
              "xml" == i.mode.name &&
              null === i.state.tagStart &&
              !i.state.context &&
              i.state.tokenize.isInText;
                    }
                    e && ((t.f = b), (t.block = a), (t.htmlState = null));
                }
                return (
                    (t.trailingSpace = 0),
                    (t.trailingSpaceNewLine = !1),
                    (t.prevLine = t.thisLine),
                    (t.thisLine = { stream: null }),
                    null
                );
            }
            function a(t, e) {
                var i,
                    n = t.column() === e.indentation,
                    u = !(i = e.prevLine.stream) || !/\S/.test(i.string),
                    r = e.indentedCode,
                    a = e.prevLine.hr,
                    l = !1 !== e.list,
                    o = (e.listStack[e.listStack.length - 1] || 0) + 3;
                e.indentedCode = !1;
                var h = e.indentation;
                if (
                    null === e.indentationDiff &&
          ((e.indentationDiff = e.indentation), l)
                ) {
                    for (e.list = null; h < e.listStack[e.listStack.length - 1]; )
                        e.listStack.pop(),
                        e.listStack.length
                            ? (e.indentation = e.listStack[e.listStack.length - 1])
                            : (e.list = !1);
                    !1 !== e.list &&
            (e.indentationDiff = h - e.listStack[e.listStack.length - 1]);
                }
                var s = !(
                        u ||
            a ||
            e.prevLine.header ||
            (l && r) ||
            e.prevLine.fencedCodeEnd
                    ),
                    g = (!1 === e.list || a || u) && e.indentation <= o && t.match(d),
                    m = null;
                if (
                    4 <= e.indentationDiff &&
          (r || e.prevLine.fencedCodeEnd || e.prevLine.header || u)
                )
                    return t.skipToEnd(), (e.indentedCode = !0), S.code;
                if (t.eatSpace()) return null;
                if (n && e.indentation <= o && (m = t.match(F)) && m[1].length <= 6)
                    return (
                        (e.quote = 0),
                        (e.header = m[1].length),
                        (e.thisLine.header = !0),
                        x.highlightFormatting && (e.formatting = "header"),
                        (e.f = e.inline),
                        M(e)
                    );
                if (e.indentation <= o && t.eat(">"))
                    return (
                        (e.quote = n ? 1 : e.quote + 1),
                        x.highlightFormatting && (e.formatting = "quote"),
                        t.eatSpace(),
                        M(e)
                    );
                if (!g && !e.setext && n && e.indentation <= o && (m = t.match(k))) {
                    var f = m[1] ? "ol" : "ul";
                    return (
                        (e.indentation = h + t.current().length),
                        (e.list = !0),
                        (e.quote = 0),
                        e.listStack.push(e.indentation),
                        (e.em = !1),
                        (e.strong = !1),
                        (e.code = !1),
                        (e.strikethrough = !1),
                        x.taskLists && t.match(C, !1) && (e.taskList = !0),
                        (e.f = e.inline),
                        x.highlightFormatting && (e.formatting = ["list", "list-" + f]),
                        M(e)
                    );
                }
                return n && e.indentation <= o && (m = t.match(p, !0))
                    ? ((e.quote = 0),
                    (e.fencedEndRE = new RegExp(m[1] + "+ *$")),
                    (e.localMode =
              x.fencedCodeBlockHighlighting &&
              (function (t) {
                  if (H.findModeByName) {
                      var e = H.findModeByName(t);
                      e && (t = e.mime || e.mimes[0]);
                  }
                  var i = H.getMode(c, t);
                  return "null" == i.name ? null : i;
              })(m[2])),
                    e.localMode && (e.localState = H.startState(e.localMode)),
                    (e.f = e.block = q),
                    x.highlightFormatting && (e.formatting = "code-block"),
                    (e.code = -1),
                    M(e))
                    : e.setext ||
            (!(
                (s && l) ||
              e.quote ||
              !1 !== e.list ||
              e.code ||
              g ||
              E.test(t.string)
            ) &&
              (m = t.lookAhead(1)) &&
              (m = m.match(D)))
                        ? (e.setext
                            ? ((e.header = e.setext),
                            (e.setext = 0),
                            t.skipToEnd(),
                            x.highlightFormatting && (e.formatting = "header"))
                            : ((e.header = "=" == m[0].charAt(0) ? 1 : 2),
                            (e.setext = e.header)),
                        (e.thisLine.header = !0),
                        (e.f = e.inline),
                        M(e))
                        : g
                            ? (t.skipToEnd(), (e.hr = !0), (e.thisLine.hr = !0), S.hr)
                            : "[" === t.peek()
                                ? B(t, e, y)
                                : B(t, e, e.inline);
            }
            function T(t, e) {
                var i = A.token(t, e.htmlState);
                if (!u) {
                    var n = H.innerMode(A, e.htmlState);
                    (("xml" == n.mode.name &&
            null === n.state.tagStart &&
            !n.state.context &&
            n.state.tokenize.isInText) ||
            (e.md_inside && -1 < t.current().indexOf(">"))) &&
            ((e.f = b), (e.block = a), (e.htmlState = null));
                }
                return i;
            }
            function q(t, e) {
                var i,
                    n = e.listStack[e.listStack.length - 1] || 0,
                    u = e.indentation < n,
                    r = n + 3;
                return e.fencedEndRE &&
          e.indentation <= r &&
          (u || t.match(e.fencedEndRE))
                    ? (x.highlightFormatting && (e.formatting = "code-block"),
                    u || (i = M(e)),
                    (e.localMode = e.localState = null),
                    (e.block = a),
                    (e.f = b),
                    (e.fencedEndRE = null),
                    (e.code = 0),
                    (e.thisLine.fencedCodeEnd = !0),
                    u ? L(t, e, e.block) : i)
                    : e.localMode
                        ? e.localMode.token(t, e.localState)
                        : (t.skipToEnd(), S.code);
            }
            function M(t) {
                var e = [];
                if (t.formatting) {
                    e.push(S.formatting),
                    "string" == typeof t.formatting && (t.formatting = [t.formatting]);
                    for (var i = 0; i < t.formatting.length; i++)
                        e.push(S.formatting + "-" + t.formatting[i]),
                        "header" === t.formatting[i] &&
                e.push(S.formatting + "-" + t.formatting[i] + "-" + t.header),
                        "quote" === t.formatting[i] &&
                (!x.maxBlockquoteDepth || x.maxBlockquoteDepth >= t.quote
                    ? e.push(S.formatting + "-" + t.formatting[i] + "-" + t.quote)
                    : e.push("error"));
                }
                if (t.taskOpen) return e.push("meta"), e.length ? e.join(" ") : null;
                if (t.taskClosed)
                    return e.push("property"), e.length ? e.join(" ") : null;
                if (
                    (t.linkHref
                        ? e.push(S.linkHref, "url")
                        : (t.strong && e.push(S.strong),
                        t.em && e.push(S.em),
                        t.strikethrough && e.push(S.strikethrough),
                        t.emoji && e.push(S.emoji),
                        t.linkText && e.push(S.linkText),
                        t.code && e.push(S.code),
                        t.image && e.push(S.image),
                        t.imageAltText && e.push(S.imageAltText, "link"),
                        t.imageMarker && e.push(S.imageMarker)),
                    t.header && e.push(S.header, S.header + "-" + t.header),
                    t.quote &&
            (e.push(S.quote),
            !x.maxBlockquoteDepth || x.maxBlockquoteDepth >= t.quote
                ? e.push(S.quote + "-" + t.quote)
                : e.push(S.quote + "-" + x.maxBlockquoteDepth)),
                    !1 !== t.list)
                ) {
                    var n = (t.listStack.length - 1) % 3;
                    n ? (1 == n ? e.push(S.list2) : e.push(S.list3)) : e.push(S.list1);
                }
                return (
                    t.trailingSpaceNewLine
                        ? e.push("trailing-space-new-line")
                        : t.trailingSpace &&
              e.push("trailing-space-" + (t.trailingSpace % 2 ? "a" : "b")),
                    e.length ? e.join(" ") : null
                );
            }
            function e(t, e) {
                if (t.match(i, !0)) return M(e);
            }
            function b(t, e) {
                var i = e.text(t, e);
                if (void 0 !== i) return i;
                if (e.list) return (e.list = null), M(e);
                if (e.taskList)
                    return (
                        " " === t.match(C, !0)[1] ? (e.taskOpen = !0) : (e.taskClosed = !0),
                        x.highlightFormatting && (e.formatting = "task"),
                        (e.taskList = !1),
                        M(e)
                    );
                if (
                    ((e.taskOpen = !1),
                    (e.taskClosed = !1),
                    e.header && t.match(/^#+$/, !0))
                )
                    return x.highlightFormatting && (e.formatting = "header"), M(e);
                var n = t.next();
                if (e.linkTitle) {
                    e.linkTitle = !1;
                    var u = n;
                    "(" === n && (u = ")");
                    var r =
            "^\\s*(?:[^" +
            (u = (u + "").replace(/([.?*+^\[\]\\(){}|-])/g, "\\$1")) +
            "\\\\]+|\\\\\\\\|\\\\.)" +
            u;
                    if (t.match(new RegExp(r), !0)) return S.linkHref;
                }
                if ("`" === n) {
                    var a = e.formatting;
                    x.highlightFormatting && (e.formatting = "code"), t.eatWhile("`");
                    var l = t.current().length;
                    if (0 != e.code || (e.quote && 1 != l)) {
                        if (l != e.code) return (e.formatting = a), M(e);
                        var o = M(e);
                        return (e.code = 0), o;
                    }
                    return (e.code = l), M(e);
                }
                if (e.code) return M(e);
                if ("\\" === n && (t.next(), x.highlightFormatting)) {
                    var h = M(e),
                        s = S.formatting + "-escape";
                    return h ? h + " " + s : s;
                }
                if ("!" === n && t.match(/\[[^\]]*\] ?(?:\(|\[)/, !1))
                    return (
                        (e.imageMarker = !0),
                        (e.image = !0),
                        x.highlightFormatting && (e.formatting = "image"),
                        M(e)
                    );
                if (
                    "[" === n &&
          e.imageMarker &&
          t.match(/[^\]]*\](\(.*?\)| ?\[.*?\])/, !1)
                )
                    return (
                        (e.imageMarker = !1),
                        (e.imageAltText = !0),
                        x.highlightFormatting && (e.formatting = "image"),
                        M(e)
                    );
                if ("]" === n && e.imageAltText) {
                    x.highlightFormatting && (e.formatting = "image");
                    var h = M(e);
                    return (e.imageAltText = !1), (e.image = !1), (e.inline = e.f = j), h;
                }
                if ("[" === n && !e.image)
                    return (
                        (e.linkText && t.match(/^.*?\]/)) ||
              ((e.linkText = !0),
              x.highlightFormatting && (e.formatting = "link")),
                        M(e)
                    );
                if ("]" === n && e.linkText) {
                    x.highlightFormatting && (e.formatting = "link");
                    var h = M(e);
                    return (
                        (e.linkText = !1),
                        (e.inline = e.f = t.match(/\(.*?\)| ?\[.*?\]/, !1) ? j : b),
                        h
                    );
                }
                if ("<" === n && t.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, !1))
                    return (
                        (e.f = e.inline = w),
                        x.highlightFormatting && (e.formatting = "link"),
                        (h = M(e)) ? (h += " ") : (h = ""),
                        h + S.linkInline
                    );
                if ("<" === n && t.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, !1))
                    return (
                        (e.f = e.inline = w),
                        x.highlightFormatting && (e.formatting = "link"),
                        (h = M(e)) ? (h += " ") : (h = ""),
                        h + S.linkEmail
                    );
                if (
                    x.xml &&
          "<" === n &&
          t.match(
              /^(!--|\?|!\[CDATA\[|[a-z][a-z0-9-]*(?:\s+[a-z_:.\-]+(?:\s*=\s*[^>]+)?)*\s*(?:>|$))/i,
              !1
          )
                ) {
                    var g = t.string.indexOf(">", t.pos);
                    if (-1 != g) {
                        var m = t.string.substring(t.start, g);
                        /markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(m) &&
              (e.md_inside = !0);
                    }
                    return t.backUp(1), (e.htmlState = H.startState(A)), L(t, e, T);
                }
                if (x.xml && "<" === n && t.match(/^\/\w*?>/))
                    return (e.md_inside = !1), "tag";
                if ("*" === n || "_" === n) {
                    for (
                        var f = 1, c = 1 == t.pos ? " " : t.string.charAt(t.pos - 2);
                        f < 3 && t.eat(n);

                    )
                        f++;
                    var d = t.peek() || " ",
                        k = !/\s/.test(d) && (!v.test(d) || /\s/.test(c) || v.test(c)),
                        F = !/\s/.test(c) && (!v.test(c) || /\s/.test(d) || v.test(d)),
                        D = null,
                        p = null;
                    if (
                        (f % 2 &&
              (e.em || !k || ("*" !== n && F && !v.test(c))
                  ? e.em != n || !F || ("*" !== n && k && !v.test(d)) || (D = !1)
                  : (D = !0)),
                        1 < f &&
              (e.strong || !k || ("*" !== n && F && !v.test(c))
                  ? e.strong != n ||
                  !F ||
                  ("*" !== n && k && !v.test(d)) ||
                  (p = !1)
                  : (p = !0)),
                        null != p || null != D)
                    ) {
                        x.highlightFormatting &&
              (e.formatting =
                null == D ? "strong" : null == p ? "em" : "strong em"),
                        !0 === D && (e.em = n),
                        !0 === p && (e.strong = n);
                        o = M(e);
                        return !1 === D && (e.em = !1), !1 === p && (e.strong = !1), o;
                    }
                } else if (" " === n && (t.eat("*") || t.eat("_"))) {
                    if (" " === t.peek()) return M(e);
                    t.backUp(1);
                }
                if (x.strikethrough)
                    if ("~" === n && t.eatWhile(n)) {
                        if (e.strikethrough) {
                            x.highlightFormatting && (e.formatting = "strikethrough");
                            o = M(e);
                            return (e.strikethrough = !1), o;
                        }
                        if (t.match(/^[^\s]/, !1))
                            return (
                                (e.strikethrough = !0),
                                x.highlightFormatting && (e.formatting = "strikethrough"),
                                M(e)
                            );
                    } else if (" " === n && t.match(/^~~/, !0)) {
                        if (" " === t.peek()) return M(e);
                        t.backUp(2);
                    }
                if (
                    x.emoji &&
          ":" === n &&
          t.match(/^(?:[a-z_\d+][a-z_\d+-]*|\-[a-z_\d+][a-z_\d+-]*):/)
                ) {
                    (e.emoji = !0), x.highlightFormatting && (e.formatting = "emoji");
                    var E = M(e);
                    return (e.emoji = !1), E;
                }
                return (
                    " " === n &&
            (t.match(/^ +$/, !1)
                ? e.trailingSpace++
                : e.trailingSpace && (e.trailingSpaceNewLine = !0)),
                    M(e)
                );
            }
            function w(t, e) {
                if (">" !== t.next()) return t.match(/^[^>]+/, !0), S.linkInline;
                (e.f = e.inline = b), x.highlightFormatting && (e.formatting = "link");
                var i = M(e);
                return i ? (i += " ") : (i = ""), i + S.linkInline;
            }
            function j(t, e) {
                if (t.eatSpace()) return null;
                var n,
                    i = t.next();
                return "(" === i || "[" === i
                    ? ((e.f = e.inline =
              ((n = "(" === i ? ")" : "]"),
              function (t, e) {
                  if (t.next() !== n)
                      return t.match(r[n]), (e.linkHref = !0), M(e);
                  (e.f = e.inline = b),
                  x.highlightFormatting && (e.formatting = "link-string");
                  var i = M(e);
                  return (e.linkHref = !1), i;
              })),
                    x.highlightFormatting && (e.formatting = "link-string"),
                    (e.linkHref = !0),
                    M(e))
                    : "error";
            }
            var r = {
                ")": /^(?:[^\\\(\)]|\\.|\((?:[^\\\(\)]|\\.)*\))*?(?=\))/,
                "]": /^(?:[^\\\[\]]|\\.|\[(?:[^\\\[\]]|\\.)*\])*?(?=\])/,
            };
            function y(t, e) {
                return t.match(/^([^\]\\]|\\.)*\]:/, !1)
                    ? ((e.f = l),
                    t.next(),
                    x.highlightFormatting && (e.formatting = "link"),
                    (e.linkText = !0),
                    M(e))
                    : B(t, e, b);
            }
            function l(t, e) {
                if (t.match(/^\]:/, !0)) {
                    (e.f = e.inline = o),
                    x.highlightFormatting && (e.formatting = "link");
                    var i = M(e);
                    return (e.linkText = !1), i;
                }
                return t.match(/^([^\]\\]|\\.)+/, !0), S.linkText;
            }
            function o(t, e) {
                return t.eatSpace()
                    ? null
                    : (t.match(/^[^\s]+/, !0),
                    void 0 === t.peek()
                        ? (e.linkTitle = !0)
                        : t.match(
                            /^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/,
                            !0
                        ),
                    (e.f = e.inline = b),
                    S.linkHref + " url");
            }
            var h = {
                startState: function () {
                    return {
                        f: a,
                        prevLine: { stream: null },
                        thisLine: { stream: null },
                        block: a,
                        htmlState: null,
                        indentation: 0,
                        inline: b,
                        text: e,
                        formatting: !1,
                        linkText: !1,
                        linkHref: !1,
                        linkTitle: !1,
                        code: 0,
                        em: !1,
                        strong: !1,
                        header: 0,
                        setext: 0,
                        hr: !1,
                        taskList: !1,
                        list: !1,
                        listStack: [],
                        quote: 0,
                        trailingSpace: 0,
                        trailingSpaceNewLine: !1,
                        strikethrough: !1,
                        emoji: !1,
                        fencedEndRE: null,
                    };
                },
                copyState: function (t) {
                    return {
                        f: t.f,
                        prevLine: t.prevLine,
                        thisLine: t.thisLine,
                        block: t.block,
                        htmlState: t.htmlState && H.copyState(A, t.htmlState),
                        indentation: t.indentation,
                        localMode: t.localMode,
                        localState: t.localMode
                            ? H.copyState(t.localMode, t.localState)
                            : null,
                        inline: t.inline,
                        text: t.text,
                        formatting: !1,
                        linkText: t.linkText,
                        linkTitle: t.linkTitle,
                        linkHref: t.linkHref,
                        code: t.code,
                        em: t.em,
                        strong: t.strong,
                        strikethrough: t.strikethrough,
                        emoji: t.emoji,
                        header: t.header,
                        setext: t.setext,
                        hr: t.hr,
                        taskList: t.taskList,
                        list: t.list,
                        listStack: t.listStack.slice(0),
                        quote: t.quote,
                        indentedCode: t.indentedCode,
                        trailingSpace: t.trailingSpace,
                        trailingSpaceNewLine: t.trailingSpaceNewLine,
                        md_inside: t.md_inside,
                        fencedEndRE: t.fencedEndRE,
                    };
                },
                token: function (t, e) {
                    if (((e.formatting = !1), t != e.thisLine.stream)) {
                        if (((e.header = 0), (e.hr = !1), t.match(/^\s*$/, !0)))
                            return n(e), null;
                        if (
                            ((e.prevLine = e.thisLine),
                            (e.thisLine = { stream: t }),
                            (e.taskList = !1),
                            (e.trailingSpace = 0),
                            (e.trailingSpaceNewLine = !1),
                            !e.localState && ((e.f = e.block), e.f != T))
                        ) {
                            var i = t.match(/^\s*/, !0)[0].replace(/\t/g, "    ").length;
                            if (((e.indentation = i), (e.indentationDiff = null), 0 < i))
                                return null;
                        }
                    }
                    return e.f(t, e);
                },
                innerMode: function (t) {
                    return t.block == T
                        ? { state: t.htmlState, mode: A }
                        : t.localState
                            ? { state: t.localState, mode: t.localMode }
                            : { state: t, mode: h };
                },
                indent: function (t, e, i) {
                    return t.block == T && A.indent
                        ? A.indent(t.htmlState, e, i)
                        : t.localState && t.localMode.indent
                            ? t.localMode.indent(t.localState, e, i)
                            : H.Pass;
                },
                blankLine: n,
                getType: M,
                blockCommentStart: "\x3c!--",
                blockCommentEnd: "--\x3e",
                closeBrackets: "()[]{}''\"\"``",
                fold: "markdown",
            };
            return h;
        },
        "xml"
    ),
    H.defineMIME("text/markdown", "markdown"),
    H.defineMIME("text/x-markdown", "markdown");
});
!(function (e) {
    "object" == typeof exports && "object" == typeof module
        ? e(require("../../lib/codemirror"))
        : "function" == typeof define && define.amd
            ? define(["../../lib/codemirror"], e)
            : e(CodeMirror);
})(function (i) {
    "use strict";
    i.defineOption("fullScreen", !1, function (e, t, o) {
        var r, l;
        o == i.Init && (o = !1),
        !o != !t &&
        (t
            ? ((l = (r = e).getWrapperElement()),
            (r.state.fullScreenRestore = {
                scrollTop: window.pageYOffset,
                scrollLeft: window.pageXOffset,
                width: l.style.width,
                height: l.style.height,
            }),
            (l.style.width = ""),
            (l.style.height = "auto"),
            (l.className += " CodeMirror-fullscreen"),
            (document.documentElement.style.overflow = "hidden"),
            r.refresh())
            : (function (e) {
                var t = e.getWrapperElement();
                (t.className = t.className.replace(
                    /\s*CodeMirror-fullscreen\b/,
                    ""
                )),
                (document.documentElement.style.overflow = "");
                var o = e.state.fullScreenRestore;
                (t.style.width = o.width),
                (t.style.height = o.height),
                window.scrollTo(o.scrollLeft, o.scrollTop),
                e.refresh();
            })(e));
    });
});
!(function (e) {
    "object" == typeof exports && "object" == typeof module
        ? e(
            require("../lib/codemirror"),
            require("../addon/search/searchcursor"),
            require("../addon/dialog/dialog"),
            require("../addon/edit/matchbrackets.js")
        )
        : "function" == typeof define && define.amd
            ? define([
                "../lib/codemirror",
                "../addon/search/searchcursor",
                "../addon/dialog/dialog",
                "../addon/edit/matchbrackets",
            ], e)
            : e(CodeMirror);
})(function (Ye) {
    "use strict";
    var et = [
            { keys: "<Left>", type: "keyToKey", toKeys: "h" },
            { keys: "<Right>", type: "keyToKey", toKeys: "l" },
            { keys: "<Up>", type: "keyToKey", toKeys: "k" },
            { keys: "<Down>", type: "keyToKey", toKeys: "j" },
            { keys: "<Space>", type: "keyToKey", toKeys: "l" },
            { keys: "<BS>", type: "keyToKey", toKeys: "h", context: "normal" },
            { keys: "<Del>", type: "keyToKey", toKeys: "x", context: "normal" },
            { keys: "<C-Space>", type: "keyToKey", toKeys: "W" },
            { keys: "<C-BS>", type: "keyToKey", toKeys: "B", context: "normal" },
            { keys: "<S-Space>", type: "keyToKey", toKeys: "w" },
            { keys: "<S-BS>", type: "keyToKey", toKeys: "b", context: "normal" },
            { keys: "<C-n>", type: "keyToKey", toKeys: "j" },
            { keys: "<C-p>", type: "keyToKey", toKeys: "k" },
            { keys: "<C-[>", type: "keyToKey", toKeys: "<Esc>" },
            { keys: "<C-c>", type: "keyToKey", toKeys: "<Esc>" },
            { keys: "<C-[>", type: "keyToKey", toKeys: "<Esc>", context: "insert" },
            { keys: "<C-c>", type: "keyToKey", toKeys: "<Esc>", context: "insert" },
            { keys: "s", type: "keyToKey", toKeys: "cl", context: "normal" },
            { keys: "s", type: "keyToKey", toKeys: "c", context: "visual" },
            { keys: "S", type: "keyToKey", toKeys: "cc", context: "normal" },
            { keys: "S", type: "keyToKey", toKeys: "VdO", context: "visual" },
            { keys: "<Home>", type: "keyToKey", toKeys: "0" },
            { keys: "<End>", type: "keyToKey", toKeys: "$" },
            { keys: "<PageUp>", type: "keyToKey", toKeys: "<C-b>" },
            { keys: "<PageDown>", type: "keyToKey", toKeys: "<C-f>" },
            { keys: "<CR>", type: "keyToKey", toKeys: "j^", context: "normal" },
            {
                keys: "<Ins>",
                type: "action",
                action: "toggleOverwrite",
                context: "insert",
            },
            {
                keys: "H",
                type: "motion",
                motion: "moveToTopLine",
                motionArgs: { linewise: !0, toJumplist: !0 },
            },
            {
                keys: "M",
                type: "motion",
                motion: "moveToMiddleLine",
                motionArgs: { linewise: !0, toJumplist: !0 },
            },
            {
                keys: "L",
                type: "motion",
                motion: "moveToBottomLine",
                motionArgs: { linewise: !0, toJumplist: !0 },
            },
            {
                keys: "h",
                type: "motion",
                motion: "moveByCharacters",
                motionArgs: { forward: !1 },
            },
            {
                keys: "l",
                type: "motion",
                motion: "moveByCharacters",
                motionArgs: { forward: !0 },
            },
            {
                keys: "j",
                type: "motion",
                motion: "moveByLines",
                motionArgs: { forward: !0, linewise: !0 },
            },
            {
                keys: "k",
                type: "motion",
                motion: "moveByLines",
                motionArgs: { forward: !1, linewise: !0 },
            },
            {
                keys: "gj",
                type: "motion",
                motion: "moveByDisplayLines",
                motionArgs: { forward: !0 },
            },
            {
                keys: "gk",
                type: "motion",
                motion: "moveByDisplayLines",
                motionArgs: { forward: !1 },
            },
            {
                keys: "w",
                type: "motion",
                motion: "moveByWords",
                motionArgs: { forward: !0, wordEnd: !1 },
            },
            {
                keys: "W",
                type: "motion",
                motion: "moveByWords",
                motionArgs: { forward: !0, wordEnd: !1, bigWord: !0 },
            },
            {
                keys: "e",
                type: "motion",
                motion: "moveByWords",
                motionArgs: { forward: !0, wordEnd: !0, inclusive: !0 },
            },
            {
                keys: "E",
                type: "motion",
                motion: "moveByWords",
                motionArgs: { forward: !0, wordEnd: !0, bigWord: !0, inclusive: !0 },
            },
            {
                keys: "b",
                type: "motion",
                motion: "moveByWords",
                motionArgs: { forward: !1, wordEnd: !1 },
            },
            {
                keys: "B",
                type: "motion",
                motion: "moveByWords",
                motionArgs: { forward: !1, wordEnd: !1, bigWord: !0 },
            },
            {
                keys: "ge",
                type: "motion",
                motion: "moveByWords",
                motionArgs: { forward: !1, wordEnd: !0, inclusive: !0 },
            },
            {
                keys: "gE",
                type: "motion",
                motion: "moveByWords",
                motionArgs: { forward: !1, wordEnd: !0, bigWord: !0, inclusive: !0 },
            },
            {
                keys: "{",
                type: "motion",
                motion: "moveByParagraph",
                motionArgs: { forward: !1, toJumplist: !0 },
            },
            {
                keys: "}",
                type: "motion",
                motion: "moveByParagraph",
                motionArgs: { forward: !0, toJumplist: !0 },
            },
            {
                keys: "(",
                type: "motion",
                motion: "moveBySentence",
                motionArgs: { forward: !1 },
            },
            {
                keys: ")",
                type: "motion",
                motion: "moveBySentence",
                motionArgs: { forward: !0 },
            },
            {
                keys: "<C-f>",
                type: "motion",
                motion: "moveByPage",
                motionArgs: { forward: !0 },
            },
            {
                keys: "<C-b>",
                type: "motion",
                motion: "moveByPage",
                motionArgs: { forward: !1 },
            },
            {
                keys: "<C-d>",
                type: "motion",
                motion: "moveByScroll",
                motionArgs: { forward: !0, explicitRepeat: !0 },
            },
            {
                keys: "<C-u>",
                type: "motion",
                motion: "moveByScroll",
                motionArgs: { forward: !1, explicitRepeat: !0 },
            },
            {
                keys: "gg",
                type: "motion",
                motion: "moveToLineOrEdgeOfDocument",
                motionArgs: {
                    forward: !1,
                    explicitRepeat: !0,
                    linewise: !0,
                    toJumplist: !0,
                },
            },
            {
                keys: "G",
                type: "motion",
                motion: "moveToLineOrEdgeOfDocument",
                motionArgs: {
                    forward: !0,
                    explicitRepeat: !0,
                    linewise: !0,
                    toJumplist: !0,
                },
            },
            { keys: "0", type: "motion", motion: "moveToStartOfLine" },
            {
                keys: "^",
                type: "motion",
                motion: "moveToFirstNonWhiteSpaceCharacter",
            },
            {
                keys: "+",
                type: "motion",
                motion: "moveByLines",
                motionArgs: { forward: !0, toFirstChar: !0 },
            },
            {
                keys: "-",
                type: "motion",
                motion: "moveByLines",
                motionArgs: { forward: !1, toFirstChar: !0 },
            },
            {
                keys: "_",
                type: "motion",
                motion: "moveByLines",
                motionArgs: { forward: !0, toFirstChar: !0, repeatOffset: -1 },
            },
            {
                keys: "$",
                type: "motion",
                motion: "moveToEol",
                motionArgs: { inclusive: !0 },
            },
            {
                keys: "%",
                type: "motion",
                motion: "moveToMatchedSymbol",
                motionArgs: { inclusive: !0, toJumplist: !0 },
            },
            {
                keys: "f<character>",
                type: "motion",
                motion: "moveToCharacter",
                motionArgs: { forward: !0, inclusive: !0 },
            },
            {
                keys: "F<character>",
                type: "motion",
                motion: "moveToCharacter",
                motionArgs: { forward: !1 },
            },
            {
                keys: "t<character>",
                type: "motion",
                motion: "moveTillCharacter",
                motionArgs: { forward: !0, inclusive: !0 },
            },
            {
                keys: "T<character>",
                type: "motion",
                motion: "moveTillCharacter",
                motionArgs: { forward: !1 },
            },
            {
                keys: ";",
                type: "motion",
                motion: "repeatLastCharacterSearch",
                motionArgs: { forward: !0 },
            },
            {
                keys: ",",
                type: "motion",
                motion: "repeatLastCharacterSearch",
                motionArgs: { forward: !1 },
            },
            {
                keys: "'<character>",
                type: "motion",
                motion: "goToMark",
                motionArgs: { toJumplist: !0, linewise: !0 },
            },
            {
                keys: "`<character>",
                type: "motion",
                motion: "goToMark",
                motionArgs: { toJumplist: !0 },
            },
            {
                keys: "]`",
                type: "motion",
                motion: "jumpToMark",
                motionArgs: { forward: !0 },
            },
            {
                keys: "[`",
                type: "motion",
                motion: "jumpToMark",
                motionArgs: { forward: !1 },
            },
            {
                keys: "]'",
                type: "motion",
                motion: "jumpToMark",
                motionArgs: { forward: !0, linewise: !0 },
            },
            {
                keys: "['",
                type: "motion",
                motion: "jumpToMark",
                motionArgs: { forward: !1, linewise: !0 },
            },
            {
                keys: "]p",
                type: "action",
                action: "paste",
                isEdit: !0,
                actionArgs: { after: !0, isEdit: !0, matchIndent: !0 },
            },
            {
                keys: "[p",
                type: "action",
                action: "paste",
                isEdit: !0,
                actionArgs: { after: !1, isEdit: !0, matchIndent: !0 },
            },
            {
                keys: "]<character>",
                type: "motion",
                motion: "moveToSymbol",
                motionArgs: { forward: !0, toJumplist: !0 },
            },
            {
                keys: "[<character>",
                type: "motion",
                motion: "moveToSymbol",
                motionArgs: { forward: !1, toJumplist: !0 },
            },
            { keys: "|", type: "motion", motion: "moveToColumn" },
            {
                keys: "o",
                type: "motion",
                motion: "moveToOtherHighlightedEnd",
                context: "visual",
            },
            {
                keys: "O",
                type: "motion",
                motion: "moveToOtherHighlightedEnd",
                motionArgs: { sameLine: !0 },
                context: "visual",
            },
            { keys: "d", type: "operator", operator: "delete" },
            { keys: "y", type: "operator", operator: "yank" },
            { keys: "c", type: "operator", operator: "change" },
            { keys: "=", type: "operator", operator: "indentAuto" },
            {
                keys: ">",
                type: "operator",
                operator: "indent",
                operatorArgs: { indentRight: !0 },
            },
            {
                keys: "<",
                type: "operator",
                operator: "indent",
                operatorArgs: { indentRight: !1 },
            },
            { keys: "g~", type: "operator", operator: "changeCase" },
            {
                keys: "gu",
                type: "operator",
                operator: "changeCase",
                operatorArgs: { toLower: !0 },
                isEdit: !0,
            },
            {
                keys: "gU",
                type: "operator",
                operator: "changeCase",
                operatorArgs: { toLower: !1 },
                isEdit: !0,
            },
            {
                keys: "n",
                type: "motion",
                motion: "findNext",
                motionArgs: { forward: !0, toJumplist: !0 },
            },
            {
                keys: "N",
                type: "motion",
                motion: "findNext",
                motionArgs: { forward: !1, toJumplist: !0 },
            },
            {
                keys: "x",
                type: "operatorMotion",
                operator: "delete",
                motion: "moveByCharacters",
                motionArgs: { forward: !0 },
                operatorMotionArgs: { visualLine: !1 },
            },
            {
                keys: "X",
                type: "operatorMotion",
                operator: "delete",
                motion: "moveByCharacters",
                motionArgs: { forward: !1 },
                operatorMotionArgs: { visualLine: !0 },
            },
            {
                keys: "D",
                type: "operatorMotion",
                operator: "delete",
                motion: "moveToEol",
                motionArgs: { inclusive: !0 },
                context: "normal",
            },
            {
                keys: "D",
                type: "operator",
                operator: "delete",
                operatorArgs: { linewise: !0 },
                context: "visual",
            },
            {
                keys: "Y",
                type: "operatorMotion",
                operator: "yank",
                motion: "expandToLine",
                motionArgs: { linewise: !0 },
                context: "normal",
            },
            {
                keys: "Y",
                type: "operator",
                operator: "yank",
                operatorArgs: { linewise: !0 },
                context: "visual",
            },
            {
                keys: "C",
                type: "operatorMotion",
                operator: "change",
                motion: "moveToEol",
                motionArgs: { inclusive: !0 },
                context: "normal",
            },
            {
                keys: "C",
                type: "operator",
                operator: "change",
                operatorArgs: { linewise: !0 },
                context: "visual",
            },
            {
                keys: "~",
                type: "operatorMotion",
                operator: "changeCase",
                motion: "moveByCharacters",
                motionArgs: { forward: !0 },
                operatorArgs: { shouldMoveCursor: !0 },
                context: "normal",
            },
            {
                keys: "~",
                type: "operator",
                operator: "changeCase",
                context: "visual",
            },
            {
                keys: "<C-w>",
                type: "operatorMotion",
                operator: "delete",
                motion: "moveByWords",
                motionArgs: { forward: !1, wordEnd: !1 },
                context: "insert",
            },
            { keys: "<C-w>", type: "idle", context: "normal" },
            {
                keys: "<C-i>",
                type: "action",
                action: "jumpListWalk",
                actionArgs: { forward: !0 },
            },
            {
                keys: "<C-o>",
                type: "action",
                action: "jumpListWalk",
                actionArgs: { forward: !1 },
            },
            {
                keys: "<C-e>",
                type: "action",
                action: "scroll",
                actionArgs: { forward: !0, linewise: !0 },
            },
            {
                keys: "<C-y>",
                type: "action",
                action: "scroll",
                actionArgs: { forward: !1, linewise: !0 },
            },
            {
                keys: "a",
                type: "action",
                action: "enterInsertMode",
                isEdit: !0,
                actionArgs: { insertAt: "charAfter" },
                context: "normal",
            },
            {
                keys: "A",
                type: "action",
                action: "enterInsertMode",
                isEdit: !0,
                actionArgs: { insertAt: "eol" },
                context: "normal",
            },
            {
                keys: "A",
                type: "action",
                action: "enterInsertMode",
                isEdit: !0,
                actionArgs: { insertAt: "endOfSelectedArea" },
                context: "visual",
            },
            {
                keys: "i",
                type: "action",
                action: "enterInsertMode",
                isEdit: !0,
                actionArgs: { insertAt: "inplace" },
                context: "normal",
            },
            {
                keys: "gi",
                type: "action",
                action: "enterInsertMode",
                isEdit: !0,
                actionArgs: { insertAt: "lastEdit" },
                context: "normal",
            },
            {
                keys: "I",
                type: "action",
                action: "enterInsertMode",
                isEdit: !0,
                actionArgs: { insertAt: "firstNonBlank" },
                context: "normal",
            },
            {
                keys: "gI",
                type: "action",
                action: "enterInsertMode",
                isEdit: !0,
                actionArgs: { insertAt: "bol" },
                context: "normal",
            },
            {
                keys: "I",
                type: "action",
                action: "enterInsertMode",
                isEdit: !0,
                actionArgs: { insertAt: "startOfSelectedArea" },
                context: "visual",
            },
            {
                keys: "o",
                type: "action",
                action: "newLineAndEnterInsertMode",
                isEdit: !0,
                interlaceInsertRepeat: !0,
                actionArgs: { after: !0 },
                context: "normal",
            },
            {
                keys: "O",
                type: "action",
                action: "newLineAndEnterInsertMode",
                isEdit: !0,
                interlaceInsertRepeat: !0,
                actionArgs: { after: !1 },
                context: "normal",
            },
            { keys: "v", type: "action", action: "toggleVisualMode" },
            {
                keys: "V",
                type: "action",
                action: "toggleVisualMode",
                actionArgs: { linewise: !0 },
            },
            {
                keys: "<C-v>",
                type: "action",
                action: "toggleVisualMode",
                actionArgs: { blockwise: !0 },
            },
            {
                keys: "<C-q>",
                type: "action",
                action: "toggleVisualMode",
                actionArgs: { blockwise: !0 },
            },
            { keys: "gv", type: "action", action: "reselectLastSelection" },
            { keys: "J", type: "action", action: "joinLines", isEdit: !0 },
            {
                keys: "gJ",
                type: "action",
                action: "joinLines",
                actionArgs: { keepSpaces: !0 },
                isEdit: !0,
            },
            {
                keys: "p",
                type: "action",
                action: "paste",
                isEdit: !0,
                actionArgs: { after: !0, isEdit: !0 },
            },
            {
                keys: "P",
                type: "action",
                action: "paste",
                isEdit: !0,
                actionArgs: { after: !1, isEdit: !0 },
            },
            { keys: "r<character>", type: "action", action: "replace", isEdit: !0 },
            { keys: "@<character>", type: "action", action: "replayMacro" },
            { keys: "q<character>", type: "action", action: "enterMacroRecordMode" },
            {
                keys: "R",
                type: "action",
                action: "enterInsertMode",
                isEdit: !0,
                actionArgs: { replace: !0 },
                context: "normal",
            },
            {
                keys: "R",
                type: "operator",
                operator: "change",
                operatorArgs: { linewise: !0, fullLine: !0 },
                context: "visual",
                exitVisualBlock: !0,
            },
            { keys: "u", type: "action", action: "undo", context: "normal" },
            {
                keys: "u",
                type: "operator",
                operator: "changeCase",
                operatorArgs: { toLower: !0 },
                context: "visual",
                isEdit: !0,
            },
            {
                keys: "U",
                type: "operator",
                operator: "changeCase",
                operatorArgs: { toLower: !1 },
                context: "visual",
                isEdit: !0,
            },
            { keys: "<C-r>", type: "action", action: "redo" },
            { keys: "m<character>", type: "action", action: "setMark" },
            { keys: "\"<character>", type: "action", action: "setRegister" },
            {
                keys: "zz",
                type: "action",
                action: "scrollToCursor",
                actionArgs: { position: "center" },
            },
            {
                keys: "z.",
                type: "action",
                action: "scrollToCursor",
                actionArgs: { position: "center" },
                motion: "moveToFirstNonWhiteSpaceCharacter",
            },
            {
                keys: "zt",
                type: "action",
                action: "scrollToCursor",
                actionArgs: { position: "top" },
            },
            {
                keys: "z<CR>",
                type: "action",
                action: "scrollToCursor",
                actionArgs: { position: "top" },
                motion: "moveToFirstNonWhiteSpaceCharacter",
            },
            {
                keys: "z-",
                type: "action",
                action: "scrollToCursor",
                actionArgs: { position: "bottom" },
            },
            {
                keys: "zb",
                type: "action",
                action: "scrollToCursor",
                actionArgs: { position: "bottom" },
                motion: "moveToFirstNonWhiteSpaceCharacter",
            },
            { keys: ".", type: "action", action: "repeatLastEdit" },
            {
                keys: "<C-a>",
                type: "action",
                action: "incrementNumberToken",
                isEdit: !0,
                actionArgs: { increase: !0, backtrack: !1 },
            },
            {
                keys: "<C-x>",
                type: "action",
                action: "incrementNumberToken",
                isEdit: !0,
                actionArgs: { increase: !1, backtrack: !1 },
            },
            {
                keys: "<C-t>",
                type: "action",
                action: "indent",
                actionArgs: { indentRight: !0 },
                context: "insert",
            },
            {
                keys: "<C-d>",
                type: "action",
                action: "indent",
                actionArgs: { indentRight: !1 },
                context: "insert",
            },
            {
                keys: "a<character>",
                type: "motion",
                motion: "textObjectManipulation",
            },
            {
                keys: "i<character>",
                type: "motion",
                motion: "textObjectManipulation",
                motionArgs: { textObjectInner: !0 },
            },
            {
                keys: "/",
                type: "search",
                searchArgs: { forward: !0, querySrc: "prompt", toJumplist: !0 },
            },
            {
                keys: "?",
                type: "search",
                searchArgs: { forward: !1, querySrc: "prompt", toJumplist: !0 },
            },
            {
                keys: "*",
                type: "search",
                searchArgs: {
                    forward: !0,
                    querySrc: "wordUnderCursor",
                    wholeWordOnly: !0,
                    toJumplist: !0,
                },
            },
            {
                keys: "#",
                type: "search",
                searchArgs: {
                    forward: !1,
                    querySrc: "wordUnderCursor",
                    wholeWordOnly: !0,
                    toJumplist: !0,
                },
            },
            {
                keys: "g*",
                type: "search",
                searchArgs: {
                    forward: !0,
                    querySrc: "wordUnderCursor",
                    toJumplist: !0,
                },
            },
            {
                keys: "g#",
                type: "search",
                searchArgs: {
                    forward: !1,
                    querySrc: "wordUnderCursor",
                    toJumplist: !0,
                },
            },
            { keys: ":", type: "ex" },
        ],
        tt = et.length,
        rt = [
            { name: "colorscheme", shortName: "colo" },
            { name: "map" },
            { name: "imap", shortName: "im" },
            { name: "nmap", shortName: "nm" },
            { name: "vmap", shortName: "vm" },
            { name: "unmap" },
            { name: "write", shortName: "w" },
            { name: "undo", shortName: "u" },
            { name: "redo", shortName: "red" },
            { name: "set", shortName: "se" },
            { name: "set", shortName: "se" },
            { name: "setlocal", shortName: "setl" },
            { name: "setglobal", shortName: "setg" },
            { name: "sort", shortName: "sor" },
            { name: "substitute", shortName: "s", possiblyAsync: !0 },
            { name: "nohlsearch", shortName: "noh" },
            { name: "yank", shortName: "y" },
            { name: "delmarks", shortName: "delm" },
            { name: "registers", shortName: "reg", excludeFromCommandHistory: !0 },
            { name: "global", shortName: "g" },
        ],
        nt = Ye.Pos;
    Ye.Vim = (function () {
        function e(e, t) {
            var r, n;
            this == Ye.keyMap.vim &&
        (Ye.rmClass(e.getWrapperElement(), "cm-fat-cursor"),
        "contenteditable" == e.getOption("inputStyle") &&
          null != document.body.style.caretColor &&
          (a((r = e)),
          r.off("cursorActivity", i),
          (r.state.fatCursorMarks = null),
          (e.getInputField().style.caretColor = ""))),
            (t && t.attach == o) ||
          ((n = e).setOption("disableInput", !1),
          n.off("cursorActivity", qe),
          Ye.off(n.getInputField(), "paste", c(n)),
          (n.state.vim = null));
        }
        function o(e, t) {
            var r, n;
            this == Ye.keyMap.vim &&
        (Ye.addClass(e.getWrapperElement(), "cm-fat-cursor"),
        "contenteditable" == e.getOption("inputStyle") &&
          null != document.body.style.caretColor &&
          (((r = e).state.fatCursorMarks = []),
          i(r),
          r.on("cursorActivity", i),
          (e.getInputField().style.caretColor = "transparent"))),
            (t && t.attach == o) ||
          ((n = e).setOption("disableInput", !0),
          n.setOption("showCursorWhenSelecting", !1),
          Ye.signal(n, "vim-mode-change", { mode: "normal" }),
          n.on("cursorActivity", qe),
          E(n),
          Ye.on(n.getInputField(), "paste", c(n)));
        }
        function i(e) {
            if (e.state.fatCursorMarks) {
                a(e);
                for (var t = e.listSelections(), r = [], n = 0; n < t.length; n++) {
                    var o = t[n];
                    if (o.empty())
                        if (o.anchor.ch < e.getLine(o.anchor.line).length)
                            r.push(
                                e.markText(o.anchor, nt(o.anchor.line, o.anchor.ch + 1), {
                                    className: "cm-fat-cursor-mark",
                                })
                            );
                        else {
                            var i = document.createElement("span");
                            (i.textContent = " "),
                            (i.className = "cm-fat-cursor-mark"),
                            r.push(e.setBookmark(o.anchor, { widget: i }));
                        }
                }
                e.state.fatCursorMarks = r;
            }
        }
        function a(e) {
            var t = e.state.fatCursorMarks;
            if (t) for (var r = 0; r < t.length; r++) t[r].clear();
        }
        function t(e, t) {
            if (t) {
                if (this[e]) return this[e];
                var r = (function (e) {
                    if ("'" == e.charAt(0)) return e.charAt(1);
                    var t = e.split(/-(?!$)/),
                        r = t[t.length - 1];
                    {
                        if (1 == t.length && 1 == t[0].length) return !1;
                        if (2 == t.length && "Shift" == t[0] && 1 == r.length) return !1;
                    }
                    for (var n = !1, o = 0; o < t.length; o++) {
                        var i = t[o];
                        i in s ? (t[o] = s[i]) : (n = !0), i in l && (t[o] = l[i]);
                    }
                    if (!n) return !1;
                    k(r) && (t[t.length - 1] = r.toLowerCase());
                    return "<" + t.join("-") + ">";
                })(e);
                if (!r) return !1;
                var n = Ye.Vim.findKey(t, r);
                return "function" == typeof n && Ye.signal(t, "vim-keypress", r), n;
            }
        }
        Ye.defineOption("vimMode", !1, function (e, t, r) {
            t && "vim" != e.getOption("keyMap")
                ? e.setOption("keyMap", "vim")
                : !t &&
          r != Ye.Init &&
          /^vim/.test(e.getOption("keyMap")) &&
          e.setOption("keyMap", "default");
        });
        var s = { Shift: "S", Ctrl: "C", Alt: "A", Cmd: "D", Mod: "A" },
            l = { Enter: "CR", Backspace: "BS", Delete: "Del", Insert: "Ins" };
        function c(e) {
            var t = e.state.vim;
            return (
                t.onPasteFn ||
          (t.onPasteFn = function () {
              t.insertMode ||
              (e.setCursor(q(e.getCursor(), 0, 1)),
              U.enterInsertMode(e, {}, t));
          }),
                t.onPasteFn
            );
        }
        var g = /[\d]/,
            m = [
                Ye.isWordChar,
                function (e) {
                    return e && !Ye.isWordChar(e) && !/\s/.test(e);
                },
            ],
            v = [
                function (e) {
                    return /\S/.test(e);
                },
            ];
        function r(e, t) {
            for (var r = [], n = e; n < e + t; n++) r.push(String.fromCharCode(n));
            return r;
        }
        var n = r(65, 26),
            u = r(97, 26),
            h = r(48, 10),
            p = [].concat(n, u, h, ["<", ">"]),
            f = [].concat(n, u, h, ["-", "\"", ".", ":", "/"]);
        function y(e, t) {
            return t >= e.firstLine() && t <= e.lastLine();
        }
        function d(e) {
            return /^[a-z]$/.test(e);
        }
        function k(e) {
            return /^[A-Z]$/.test(e);
        }
        function I(e) {
            return /^\s*$/.test(e);
        }
        function C(e) {
            return -1 != ".?!".indexOf(e);
        }
        function w(e, t) {
            for (var r = 0; r < t.length; r++) if (t[r] == e) return !0;
            return !1;
        }
        var x = {};
        function M(e, t, r, n, o) {
            if (void 0 === t && !o)
                throw Error("defaultValue is required unless callback is provided");
            if (
                ((r = r || "string"),
                (x[e] = { type: r, defaultValue: t, callback: o }),
                n)
            )
                for (var i = 0; i < n.length; i++) x[n[i]] = x[e];
            t && S(e, t);
        }
        function S(e, t, r, n) {
            var o = x[e],
                i = (n = n || {}).scope;
            if (!o) return new Error("Unknown option: " + e);
            if ("boolean" == o.type) {
                if (t && !0 !== t) return new Error("Invalid argument: " + e + "=" + t);
                !1 !== t && (t = !0);
            }
            o.callback
                ? ("local" !== i && o.callback(t, void 0),
                "global" !== i && r && o.callback(t, r))
                : ("local" !== i && (o.value = "boolean" == o.type ? !!t : t),
                "global" !== i && r && (r.state.vim.options[e] = { value: t }));
        }
        function A(e, t, r) {
            var n = x[e],
                o = (r = r || {}).scope;
            if (!n) return new Error("Unknown option: " + e);
            if (n.callback) {
                var i = t && n.callback(void 0, t);
                return "global" !== o && void 0 !== i
                    ? i
                    : "local" !== o
                        ? n.callback()
                        : void 0;
            }
            return (
                (i = "global" !== o && t && t.state.vim.options[e]) ||
        ("local" !== o && n) ||
        {}
            ).value;
        }
        M("filetype", void 0, "string", ["ft"], function (e, t) {
            if (void 0 !== t) {
                if (void 0 === e) return "null" == (r = t.getOption("mode")) ? "" : r;
                var r = "" == e ? "null" : e;
                t.setOption("mode", r);
            }
        });
        function b() {
            var a = 100,
                s = -1,
                l = 0,
                c = 0,
                u = new Array(a);
            function o(e, t) {
                l < (s += t) ? (s = l) : s < c && (s = c);
                var r = u[(a + s) % a];
                if (r && !r.find()) {
                    var n,
                        o = 0 < t ? 1 : -1,
                        i = e.getCursor();
                    do {
                        if ((r = u[(a + (s += o)) % a]) && (n = r.find()) && !Z(i, n))
                            break;
                    } while (s < l && c < s);
                }
                return r;
            }
            return {
                cachedCursor: void 0,
                add: function (n, e, t) {
                    var r = u[s % a];
                    function o(e) {
                        var t = ++s % a,
                            r = u[t];
                        r && r.clear(), (u[t] = n.setBookmark(e));
                    }
                    if (r) {
                        var i = r.find();
                        i && !Z(i, e) && o(e);
                    } else o(e);
                    o(t), (c = (l = s) - a + 1) < 0 && (c = 0);
                },
                find: function (e, t) {
                    var r = s,
                        n = o(e, t);
                    return (s = r), n && n.find();
                },
                move: o,
            };
        }
        var B,
            L,
            T = function (e) {
                return e
                    ? {
                        changes: e.changes,
                        expectCursorActivityForChange: e.expectCursorActivityForChange,
                    }
                    : { changes: [], expectCursorActivityForChange: !1 };
            };
        function R() {
            (this.latestRegister = void 0),
            (this.isPlaying = !1),
            (this.isRecording = !1),
            (this.replaySearchQueries = []),
            (this.onRecordingDone = void 0),
            (this.lastInsertModeChanges = T());
        }
        function E(e) {
            return (
                e.state.vim ||
          (e.state.vim = {
              inputState: new N(),
              lastEditInputState: void 0,
              lastEditActionCommand: void 0,
              lastHPos: -1,
              lastHSPos: -1,
              lastMotion: null,
              marks: {},
              fakeCursor: null,
              insertMode: !1,
              insertModeRepeat: void 0,
              visualMode: !1,
              visualLine: !1,
              visualBlock: !1,
              lastSelection: null,
              lastPastedText: null,
              sel: {},
              options: {},
          }),
                e.state.vim
            );
        }
        function O() {
            for (var e in ((B = {
                searchQuery: null,
                searchIsReversed: !1,
                lastSubstituteReplacePart: void 0,
                jumpList: b(),
                macroModeState: new R(),
                lastCharacterSearch: {
                    increment: 0,
                    forward: !0,
                    selectedCharacter: "",
                },
                registerController: new _({}),
                searchHistoryController: new H(),
                exCommandHistoryController: new H(),
            }),
            x)) {
                var t = x[e];
                t.value = t.defaultValue;
            }
        }
        var K = {
            buildKeyMap: function () {},
            getRegisterController: function () {
                return B.registerController;
            },
            resetVimGlobalState_: O,
            getVimGlobalState_: function () {
                return B;
            },
            maybeInitVimState_: E,
            suppressErrorLogging: !(R.prototype = {
                exitMacroRecordMode: function () {
                    var e = B.macroModeState;
                    e.onRecordingDone && e.onRecordingDone(),
                    (e.onRecordingDone = void 0),
                    (e.isRecording = !1);
                },
                enterMacroRecordMode: function (e, t) {
                    var r = B.registerController.getRegister(t);
                    r &&
            (r.clear(),
            (this.latestRegister = t),
            e.openDialog &&
              (this.onRecordingDone = e.openDialog(
                  "(recording)[" + t + "]",
                  null,
                  { bottom: !0 }
              )),
            (this.isRecording = !0));
                },
            }),
            InsertModeKey: ze,
            map: function (e, t, r) {
                Ve.map(e, t, r);
            },
            unmap: function (e, t) {
                Ve.unmap(e, t);
            },
            noremap: function (e, t, r) {
                function n(e) {
                    return e ? [e] : ["normal", "insert", "visual"];
                }
                for (var o = n(r), i = et.length, a = i - tt; a < i && o.length; a++) {
                    var s = et[a];
                    if (
                        !(
                            s.keys != t ||
              (r && s.context && s.context !== r) ||
              "ex" === s.type.substr(0, 2) ||
              "key" === s.type.substr(0, 3)
                        )
                    ) {
                        var l = {};
                        for (var c in s) l[c] = s[c];
                        (l.keys = e),
                        r && !l.context && (l.context = r),
                        this._mapCommand(l);
                        var u = n(s.context);
                        o = o.filter(function (e) {
                            return -1 === u.indexOf(e);
                        });
                    }
                }
            },
            mapclear: function (e) {
                var t = et.length,
                    r = tt,
                    n = et.slice(0, t - r);
                if (((et = et.slice(t - r)), e))
                    for (var o = n.length - 1; 0 <= o; o--) {
                        var i = n[o];
                        if (e !== i.context)
                            if (i.context) this._mapCommand(i);
                            else {
                                var a = ["normal", "insert", "visual"];
                                for (var s in a)
                                    if (a[s] !== e) {
                                        var l = {};
                                        for (var c in i) l[c] = i[c];
                                        (l.context = a[s]), this._mapCommand(l);
                                    }
                            }
                    }
            },
            setOption: S,
            getOption: A,
            defineOption: M,
            defineEx: function (e, t, r) {
                if (t) {
                    if (0 !== e.indexOf(t))
                        throw new Error(
                            "(Vim.defineEx) \"" +
                t +
                "\" is not a prefix of \"" +
                e +
                "\", command not registered"
                        );
                } else t = e;
                (We[e] = r),
                (Ve.commandMap_[t] = { name: e, shortName: t, type: "api" });
            },
            handleKey: function (e, t, r) {
                var n = this.findKey(e, t, r);
                if ("function" == typeof n) return n();
            },
            findKey: function (s, l, t) {
                var e,
                    c = E(s);
                function o() {
                    var e = B.macroModeState;
                    if (e.isRecording) {
                        if ("q" == l) return e.exitMacroRecordMode(), P(s), 1;
                        "mapping" != t &&
              (function (e, t) {
                  if (e.isPlaying) return;
                  var r = e.latestRegister,
                      n = B.registerController.getRegister(r);
                  n && n.pushText(t);
              })(e, l);
                    }
                }
                function u() {
                    return (
                        "<Esc>" == l &&
            (P(s), c.visualMode ? ue(s) : c.insertMode && De(s), 1)
                    );
                }
                return !1 ===
          (e = (c.insertMode
              ? function () {
                  if (u()) return !0;
                  for (
                      var e = (c.inputState.keyBuffer = c.inputState.keyBuffer + l),
                          t = 1 == l.length,
                          r = F.matchCommand(e, et, c.inputState, "insert");
                      1 < e.length && "full" != r.type;

                  ) {
                      e = c.inputState.keyBuffer = e.slice(1);
                      var n = F.matchCommand(e, et, c.inputState, "insert");
                      "none" != n.type && (r = n);
                  }
                  if ("none" == r.type) return P(s), !1;
                  if ("partial" == r.type)
                      return (
                          L && window.clearTimeout(L),
                          (L = window.setTimeout(function () {
                              c.insertMode && c.inputState.keyBuffer && P(s);
                          }, A("insertModeEscKeysTimeout"))),
                          !t
                      );
                  if ((L && window.clearTimeout(L), t)) {
                      for (var o = s.listSelections(), i = 0; i < o.length; i++) {
                          var a = o[i].head;
                          s.replaceRange("", q(a, 0, -(e.length - 1)), a, "+input");
                      }
                      B.macroModeState.lastInsertModeChanges.changes.pop();
                  }
                  return P(s), r.command;
              }
              : function () {
                  if (o() || u()) return !0;
                  var e = (c.inputState.keyBuffer = c.inputState.keyBuffer + l);
                  if (/^[1-9]\d*$/.test(e)) return !0;
                  if (!(t = /^(\d*)(.*)$/.exec(e))) return P(s), !1;
                  var t,
                      r = c.visualMode ? "visual" : "normal",
                      n = F.matchCommand(t[2] || t[1], et, c.inputState, r);
                  return "none" == n.type
                      ? (P(s), !1)
                      : "partial" == n.type ||
                      ((c.inputState.keyBuffer = ""),
                      (t = /^(\d*)(.*)$/.exec(e))[1] &&
                        "0" != t[1] &&
                        c.inputState.pushRepeatDigit(t[1]),
                      n.command);
              })())
                    ? c.insertMode || 1 !== l.length
                        ? void 0
                        : function () {
                            return !0;
                        }
                    : !0 === e
                        ? function () {
                            return !0;
                        }
                        : function () {
                            return s.operation(function () {
                                s.curOp.isVimOp = !0;
                                try {
                                    "keyToKey" == e.type
                                        ? (function (e) {
                                            for (var t; e; )
                                                (t = /<\w+-.+?>|<\w+>|./.exec(e)),
                                                (l = t[0]),
                                                (e = e.substring(t.index + l.length)),
                                                Ye.Vim.handleKey(s, l, "mapping");
                                        })(e.toKeys)
                                        : F.processCommand(s, c, e);
                                } catch (e) {
                                    throw (
                                        ((s.state.vim = void 0),
                                        E(s),
                                        Ye.Vim.suppressErrorLogging || console.log(e),
                                        e)
                                    );
                                }
                                return !0;
                            });
                        };
            },
            handleEx: function (e, t) {
                Ve.processCommand(e, t);
            },
            defineMotion: function (e, t) {
                W[e] = t;
            },
            defineAction: function (e, t) {
                U[e] = t;
            },
            defineOperator: function (e, t) {
                D[e] = t;
            },
            mapCommand: function (e, t, r, n, o) {
                var i = { keys: e, type: t };
                for (var a in ((i[t] = r), (i[t + "Args"] = n), o)) i[a] = o[a];
                Ue(i);
            },
            _mapCommand: Ue,
            defineRegister: function (e, t) {
                var r = B.registerController.registers;
                if (!e || 1 != e.length)
                    throw Error("Register name must be 1 character");
                if (r[e]) throw Error("Register already defined " + e);
                (r[e] = t), f.push(e);
            },
            exitVisualMode: ue,
            exitInsertMode: De,
        };
        function N() {
            (this.prefixRepeat = []),
            (this.motionRepeat = []),
            (this.operator = null),
            (this.operatorArgs = null),
            (this.motion = null),
            (this.motionArgs = null),
            (this.keyBuffer = []),
            (this.registerName = null);
        }
        function P(e, t) {
            (e.state.vim.inputState = new N()), Ye.signal(e, "vim-command-done", t);
        }
        function j(e, t, r) {
            this.clear(),
            (this.keyBuffer = [e || ""]),
            (this.insertModeChanges = []),
            (this.searchQueries = []),
            (this.linewise = !!t),
            (this.blockwise = !!r);
        }
        function _(e) {
            (this.registers = e),
            (this.unnamedRegister = e["\""] = new j()),
            (e["."] = new j()),
            (e[":"] = new j()),
            (e["/"] = new j());
        }
        function H() {
            (this.historyBuffer = []),
            (this.iterator = 0),
            (this.initialPrefix = null);
        }
        (N.prototype.pushRepeatDigit = function (e) {
            this.operator
                ? (this.motionRepeat = this.motionRepeat.concat(e))
                : (this.prefixRepeat = this.prefixRepeat.concat(e));
        }),
        (N.prototype.getRepeat = function () {
            var e = 0;
            return (
                (0 < this.prefixRepeat.length || 0 < this.motionRepeat.length) &&
            ((e = 1),
            0 < this.prefixRepeat.length &&
              (e *= parseInt(this.prefixRepeat.join(""), 10)),
            0 < this.motionRepeat.length &&
              (e *= parseInt(this.motionRepeat.join(""), 10))),
                e
            );
        }),
        (j.prototype = {
            setText: function (e, t, r) {
                (this.keyBuffer = [e || ""]),
                (this.linewise = !!t),
                (this.blockwise = !!r);
            },
            pushText: function (e, t) {
                t &&
            (this.linewise || this.keyBuffer.push("\n"), (this.linewise = !0)),
                this.keyBuffer.push(e);
            },
            pushInsertModeChanges: function (e) {
                this.insertModeChanges.push(T(e));
            },
            pushSearchQuery: function (e) {
                this.searchQueries.push(e);
            },
            clear: function () {
                (this.keyBuffer = []),
                (this.insertModeChanges = []),
                (this.searchQueries = []),
                (this.linewise = !1);
            },
            toString: function () {
                return this.keyBuffer.join("");
            },
        }),
        (_.prototype = {
            pushText: function (e, t, r, n, o) {
                n && "\n" !== r.charAt(r.length - 1) && (r += "\n");
                var i = this.isValidRegister(e) ? this.getRegister(e) : null;
                if (i) {
                    k(e) ? i.pushText(r, n) : i.setText(r, n, o),
                    this.unnamedRegister.setText(i.toString(), n);
                } else {
                    switch (t) {
                    case "yank":
                        this.registers[0] = new j(r, n, o);
                        break;
                    case "delete":
                    case "change":
                        -1 == r.indexOf("\n")
                            ? (this.registers["-"] = new j(r, n))
                            : (this.shiftNumericRegisters_(),
                            (this.registers[1] = new j(r, n)));
                    }
                    this.unnamedRegister.setText(r, n, o);
                }
            },
            getRegister: function (e) {
                return this.isValidRegister(e)
                    ? ((e = e.toLowerCase()),
                    this.registers[e] || (this.registers[e] = new j()),
                    this.registers[e])
                    : this.unnamedRegister;
            },
            isValidRegister: function (e) {
                return e && w(e, f);
            },
            shiftNumericRegisters_: function () {
                for (var e = 9; 2 <= e; e--)
                    this.registers[e] = this.getRegister("" + (e - 1));
            },
        }),
        (H.prototype = {
            nextMatch: function (e, t) {
                var r = this.historyBuffer,
                    n = t ? -1 : 1;
                null === this.initialPrefix && (this.initialPrefix = e);
                for (var o = this.iterator + n; t ? 0 <= o : o < r.length; o += n)
                    for (var i = r[o], a = 0; a <= i.length; a++)
                        if (this.initialPrefix == i.substring(0, a))
                            return (this.iterator = o), i;
                return o >= r.length
                    ? ((this.iterator = r.length), this.initialPrefix)
                    : o < 0
                        ? e
                        : void 0;
            },
            pushInput: function (e) {
                var t = this.historyBuffer.indexOf(e);
                -1 < t && this.historyBuffer.splice(t, 1),
                e.length && this.historyBuffer.push(e);
            },
            reset: function () {
                (this.initialPrefix = null),
                (this.iterator = this.historyBuffer.length);
            },
        });
        var F = {
                matchCommand: function (e, t, r, n) {
                    var o,
                        i = (function (e, t, r, n) {
                            for (var o, i = [], a = [], s = 0; s < t.length; s++) {
                                var l = t[s];
                                ("insert" == r && "insert" != l.context) ||
                  (l.context && l.context != r) ||
                  (n.operator && "action" == l.type) ||
                  !(o = Q(e, l.keys)) ||
                  ("partial" == o && i.push(l), "full" == o && a.push(l));
                            }
                            return { partial: i.length && i, full: a.length && a };
                        })(e, t, n, r);
                    if (!i.full && !i.partial) return { type: "none" };
                    if (!i.full && i.partial) return { type: "partial" };
                    for (var a = 0; a < i.full.length; a++) {
                        var s = i.full[a];
                        o = o || s;
                    }
                    if ("<character>" == o.keys.slice(-11)) {
                        var l = (function (e) {
                            var t = /^.*(<[^>]+>)$/.exec(e),
                                r = t ? t[1] : e.slice(-1);
                            if (1 < r.length)
                                switch (r) {
                                case "<CR>":
                                    r = "\n";
                                    break;
                                case "<Space>":
                                    r = " ";
                                    break;
                                default:
                                    r = "";
                                }
                            return r;
                        })(e);
                        if (!l) return { type: "none" };
                        r.selectedCharacter = l;
                    }
                    return { type: "full", command: o };
                },
                processCommand: function (e, t, r) {
                    switch (((t.inputState.repeatOverride = r.repeatOverride), r.type)) {
                    case "motion":
                        this.processMotion(e, t, r);
                        break;
                    case "operator":
                        this.processOperator(e, t, r);
                        break;
                    case "operatorMotion":
                        this.processOperatorMotion(e, t, r);
                        break;
                    case "action":
                        this.processAction(e, t, r);
                        break;
                    case "search":
                        this.processSearch(e, t, r);
                        break;
                    case "ex":
                    case "keyToEx":
                        this.processEx(e, t, r);
                    }
                },
                processMotion: function (e, t, r) {
                    (t.inputState.motion = r.motion),
                    (t.inputState.motionArgs = $(r.motionArgs)),
                    this.evalInput(e, t);
                },
                processOperator: function (e, t, r) {
                    var n = t.inputState;
                    if (n.operator) {
                        if (n.operator == r.operator)
                            return (
                                (n.motion = "expandToLine"),
                                (n.motionArgs = { linewise: !0 }),
                                void this.evalInput(e, t)
                            );
                        P(e);
                    }
                    (n.operator = r.operator),
                    (n.operatorArgs = $(r.operatorArgs)),
                    r.exitVisualBlock && ((t.visualBlock = !1), le(e)),
                    t.visualMode && this.evalInput(e, t);
                },
                processOperatorMotion: function (e, t, r) {
                    var n = t.visualMode,
                        o = $(r.operatorMotionArgs);
                    o && n && o.visualLine && (t.visualLine = !0),
                    this.processOperator(e, t, r),
                    n || this.processMotion(e, t, r);
                },
                processAction: function (e, t, r) {
                    var n = t.inputState,
                        o = n.getRepeat(),
                        i = !!o,
                        a = $(r.actionArgs) || {};
                    n.selectedCharacter && (a.selectedCharacter = n.selectedCharacter),
                    r.operator && this.processOperator(e, t, r),
                    r.motion && this.processMotion(e, t, r),
                    (r.motion || r.operator) && this.evalInput(e, t),
                    (a.repeat = o || 1),
                    (a.repeatIsExplicit = i),
                    (a.registerName = n.registerName),
                    P(e),
                    (t.lastMotion = null),
                    r.isEdit && this.recordLastEdit(t, n, r),
                    U[r.action](e, a, t);
                },
                processSearch: function (s, n, o) {
                    if (s.getSearchCursor) {
                        var l = o.searchArgs.forward,
                            e = o.searchArgs.wholeWordOnly;
                        Me(s).setReversed(!l);
                        var t = l ? "/" : "?",
                            i = Me(s).getQuery(),
                            c = s.getScrollInfo();
                        switch (o.searchArgs.querySrc) {
                        case "prompt":
                            var r = B.macroModeState;
                            if (r.isPlaying) p((h = r.replaySearchQueries.shift()), !0, !1);
                            else
                                Oe(s, {
                                    onClose: function (e) {
                                        s.scrollTo(c.left, c.top), p(e, !0, !0);
                                        var t = B.macroModeState;
                                        t.isRecording &&
                        (function (e, t) {
                            if (e.isPlaying) return;
                            var r = e.latestRegister,
                                n = B.registerController.getRegister(r);
                            n && n.pushSearchQuery && n.pushSearchQuery(t);
                        })(t, e);
                                    },
                                    prefix: t,
                                    desc: Ee,
                                    onKeyUp: function (e, t, r) {
                                        var n,
                                            o,
                                            i,
                                            a = Ye.keyName(e);
                                        "Up" == a || "Down" == a
                                            ? ((n = "Up" == a),
                                            (o = e.target ? e.target.selectionEnd : 0),
                                            r(
                                                (t =
                              B.searchHistoryController.nextMatch(t, n) || "")
                                            ),
                                            o &&
                            e.target &&
                            (e.target.selectionEnd = e.target.selectionStart = Math.min(
                                o,
                                e.target.value.length
                            )))
                                            : "Left" != a &&
                          "Right" != a &&
                          "Ctrl" != a &&
                          "Alt" != a &&
                          "Shift" != a &&
                          B.searchHistoryController.reset();
                                        try {
                                            i = Ie(s, t, !0, !0);
                                        } catch (e) {}
                                        i
                                            ? s.scrollIntoView(Ne(s, !l, i), 30)
                                            : (Pe(s), s.scrollTo(c.left, c.top));
                                    },
                                    onKeyDown: function (e, t, r) {
                                        var n = Ye.keyName(e);
                                        "Esc" == n ||
                      "Ctrl-C" == n ||
                      "Ctrl-[" == n ||
                      ("Backspace" == n && "" == t)
                                            ? (B.searchHistoryController.pushInput(t),
                                            B.searchHistoryController.reset(),
                                            Ie(s, i),
                                            Pe(s),
                                            s.scrollTo(c.left, c.top),
                                            Ye.e_stop(e),
                                            P(s),
                                            r(),
                                            s.focus())
                                            : "Up" == n || "Down" == n
                                                ? Ye.e_stop(e)
                                                : "Ctrl-U" == n && (Ye.e_stop(e), r(""));
                                    },
                                });
                            break;
                        case "wordUnderCursor":
                            var a = pe(s, !1, !0, !1, !0),
                                u = !0;
                            if ((a || ((a = pe(s, !1, !0, !1, !1)), (u = !1)), !a)) return;
                            var h = s.getLine(a.start.line).substring(a.start.ch, a.end.ch);
                            (h =
                  u && e
                      ? "\\b" + h + "\\b"
                      : h.replace(/([.?*+$\[\]\/\\(){}|\-])/g, "\\$1")),
                            (B.jumpList.cachedCursor = s.getCursor()),
                            s.setCursor(a.start),
                            p(h, !0, !1);
                        }
                    }
                    function p(t, e, r) {
                        B.searchHistoryController.pushInput(t),
                        B.searchHistoryController.reset();
                        try {
                            Ie(s, t, e, r);
                        } catch (e) {
                            return Re(s, "Invalid regex: " + t), void P(s);
                        }
                        F.processMotion(s, n, {
                            type: "motion",
                            motion: "findNext",
                            motionArgs: { forward: !0, toJumplist: o.searchArgs.toJumplist },
                        });
                    }
                },
                processEx: function (a, e, t) {
                    function r(e) {
                        B.exCommandHistoryController.pushInput(e),
                        B.exCommandHistoryController.reset(),
                        Ve.processCommand(a, e);
                    }
                    function n(e, t, r) {
                        var n,
                            o,
                            i = Ye.keyName(e);
                        ("Esc" == i ||
              "Ctrl-C" == i ||
              "Ctrl-[" == i ||
              ("Backspace" == i && "" == t)) &&
              (B.exCommandHistoryController.pushInput(t),
              B.exCommandHistoryController.reset(),
              Ye.e_stop(e),
              P(a),
              r(),
              a.focus()),
                        "Up" == i || "Down" == i
                            ? (Ye.e_stop(e),
                            (n = "Up" == i),
                            (o = e.target ? e.target.selectionEnd : 0),
                            r((t = B.exCommandHistoryController.nextMatch(t, n) || "")),
                            o &&
                    e.target &&
                    (e.target.selectionEnd = e.target.selectionStart = Math.min(
                        o,
                        e.target.value.length
                    )))
                            : "Ctrl-U" == i
                                ? (Ye.e_stop(e), r(""))
                                : "Left" != i &&
                  "Right" != i &&
                  "Ctrl" != i &&
                  "Alt" != i &&
                  "Shift" != i &&
                  B.exCommandHistoryController.reset();
                    }
                    "keyToEx" == t.type
                        ? Ve.processCommand(a, t.exArgs.input)
                        : e.visualMode
                            ? Oe(a, {
                                onClose: r,
                                prefix: ":",
                                value: "'<,'>",
                                onKeyDown: n,
                                selectValueOnOpen: !1,
                            })
                            : Oe(a, { onClose: r, prefix: ":", onKeyDown: n });
                },
                evalInput: function (e, t) {
                    var r,
                        n,
                        o,
                        i,
                        a = t.inputState,
                        s = a.motion,
                        l = a.motionArgs || {},
                        c = a.operator,
                        u = a.operatorArgs || {},
                        h = a.registerName,
                        p = t.sel,
                        f = X(t.visualMode ? J(e, p.head) : e.getCursor("head")),
                        d = X(t.visualMode ? J(e, p.anchor) : e.getCursor("anchor")),
                        m = X(f),
                        g = X(d);
                    if (
                        (c && this.recordLastEdit(t, a),
                        0 <
              (o =
                void 0 !== a.repeatOverride
                    ? a.repeatOverride
                    : a.getRepeat()) && l.explicitRepeat
                            ? (l.repeatIsExplicit = !0)
                            : (l.noRepeat || (!l.explicitRepeat && 0 === o)) &&
                ((o = 1), (l.repeatIsExplicit = !1)),
                        a.selectedCharacter &&
              (l.selectedCharacter = u.selectedCharacter = a.selectedCharacter),
                        (l.repeat = o),
                        P(e),
                        s)
                    ) {
                        var v = W[s](e, f, l, t);
                        if (((t.lastMotion = W[s]), !v)) return;
                        if (l.toJumplist) {
                            var y = B.jumpList,
                                k = y.cachedCursor;
                            k ? (fe(e, k, v), delete y.cachedCursor) : fe(e, f, v);
                        }
                        (r = (r = v instanceof Array ? ((n = v[0]), v[1]) : v) || X(f)),
                        t.visualMode
                            ? ((t.visualBlock && r.ch === 1 / 0) ||
                    (r = J(e, r, t.visualBlock)),
                            (n = (n = n && J(e, n, !0)) || g),
                            (p.anchor = n),
                            (p.head = r),
                            le(e),
                            ke(e, t, "<", G(n, r) ? n : r),
                            ke(e, t, ">", G(n, r) ? r : n))
                            : c || ((r = J(e, r)), e.setCursor(r.line, r.ch));
                    }
                    if (c) {
                        if (u.lastSel) {
                            n = g;
                            var C = u.lastSel,
                                w = Math.abs(C.head.line - C.anchor.line),
                                x = Math.abs(C.head.ch - C.anchor.ch);
                            (r = C.visualLine
                                ? nt(g.line + w, g.ch)
                                : C.visualBlock
                                    ? nt(g.line + w, g.ch + x)
                                    : C.head.line == C.anchor.line
                                        ? nt(g.line, g.ch + x)
                                        : nt(g.line + w, g.ch)),
                            (t.visualMode = !0),
                            (t.visualLine = C.visualLine),
                            (t.visualBlock = C.visualBlock),
                            (p = t.sel = { anchor: n, head: r }),
                            le(e);
                        } else
                            t.visualMode &&
                (u.lastSel = {
                    anchor: X(p.anchor),
                    head: X(p.head),
                    visualBlock: t.visualBlock,
                    visualLine: t.visualLine,
                });
                        var M, S, A, b, L;
                        if (t.visualMode) {
                            if (
                                ((M = Y(p.head, p.anchor)),
                                (S = ee(p.head, p.anchor)),
                                (A = t.visualLine || u.linewise),
                                (L = ce(
                                    e,
                                    { anchor: M, head: S },
                                    (b = t.visualBlock ? "block" : A ? "line" : "char")
                                )),
                                A)
                            ) {
                                var T = L.ranges;
                                if ("block" == b)
                                    for (var R = 0; R < T.length; R++)
                                        T[R].head.ch = re(e, T[R].head.line);
                                else "line" == b && (T[0].head = nt(T[0].head.line + 1, 0));
                            }
                        } else {
                            if (((M = X(n || g)), G((S = X(r || m)), M))) {
                                var E = M;
                                (M = S), (S = E);
                            }
                            (A = l.linewise || u.linewise)
                                ? ((i = S), (M.ch = 0), (i.ch = 0), i.line++)
                                : l.forward &&
                  (function (e, t, r) {
                      var n = e.getRange(t, r);
                      if (/\n\s*$/.test(n)) {
                          var o = n.split("\n");
                          o.pop();
                          for (
                              var i = o.pop();
                              0 < o.length && i && I(i);
                              i = o.pop()
                          )
                              r.line--, (r.ch = 0);
                          i ? (r.line--, (r.ch = re(e, r.line))) : (r.ch = 0);
                      }
                  })(e, M, S),
                            (L = ce(
                                e,
                                { anchor: M, head: S },
                                (b = "char"),
                                !l.inclusive || A
                            ));
                        }
                        e.setSelections(L.ranges, L.primary),
                        (t.lastMotion = null),
                        (u.repeat = o),
                        (u.registerName = h),
                        (u.linewise = A);
                        var O = D[c](e, u, L.ranges, g, r);
                        t.visualMode && ue(e, null != O), O && e.setCursor(O);
                    }
                },
                recordLastEdit: function (e, t, r) {
                    var n = B.macroModeState;
                    n.isPlaying ||
            ((e.lastEditInputState = t),
            (e.lastEditActionCommand = r),
            (n.lastInsertModeChanges.changes = []),
            (n.lastInsertModeChanges.expectCursorActivityForChange = !1),
            (n.lastInsertModeChanges.visualBlock = e.visualBlock
                ? e.sel.head.line - e.sel.anchor.line
                : 0));
                },
            },
            W = {
                moveToTopLine: function (e, t, r) {
                    var n = je(e).top + r.repeat - 1;
                    return nt(n, he(e.getLine(n)));
                },
                moveToMiddleLine: function (e) {
                    var t = je(e),
                        r = Math.floor(0.5 * (t.top + t.bottom));
                    return nt(r, he(e.getLine(r)));
                },
                moveToBottomLine: function (e, t, r) {
                    var n = je(e).bottom - r.repeat + 1;
                    return nt(n, he(e.getLine(n)));
                },
                expandToLine: function (e, t, r) {
                    return nt(t.line + r.repeat - 1, 1 / 0);
                },
                findNext: function (e, t, r) {
                    var n = Me(e),
                        o = n.getQuery();
                    if (o) {
                        var i = !r.forward;
                        return (
                            (i = n.isReversed() ? !i : i), Ke(e, o), Ne(e, i, o, r.repeat)
                        );
                    }
                },
                goToMark: function (e, t, r, n) {
                    var o = _e(e, n, r.selectedCharacter);
                    return o
                        ? r.linewise
                            ? { line: o.line, ch: he(e.getLine(o.line)) }
                            : o
                        : null;
                },
                moveToOtherHighlightedEnd: function (e, t, r, n) {
                    if (n.visualBlock && r.sameLine) {
                        var o = n.sel;
                        return [
                            J(e, nt(o.anchor.line, o.head.ch)),
                            J(e, nt(o.head.line, o.anchor.ch)),
                        ];
                    }
                    return [n.sel.head, n.sel.anchor];
                },
                jumpToMark: function (e, t, r, n) {
                    for (var o = t, i = 0; i < r.repeat; i++) {
                        var a = o;
                        for (var s in n.marks)
                            if (d(s)) {
                                var l = n.marks[s].find();
                                if (
                                    !(
                                        (r.forward ? G(l, a) : G(a, l)) ||
                    (r.linewise && l.line == a.line)
                                    )
                                ) {
                                    var c = Z(a, o),
                                        u = r.forward ? te(a, l, o) : te(o, l, a);
                                    (c || u) && (o = l);
                                }
                            }
                    }
                    return r.linewise && (o = nt(o.line, he(e.getLine(o.line)))), o;
                },
                moveByCharacters: function (e, t, r) {
                    var n = r.repeat,
                        o = r.forward ? t.ch + n : t.ch - n;
                    return nt(t.line, o);
                },
                moveByLines: function (e, t, r, n) {
                    var o = t,
                        i = o.ch;
                    switch (n.lastMotion) {
                    case this.moveByLines:
                    case this.moveByDisplayLines:
                    case this.moveByScroll:
                    case this.moveToColumn:
                    case this.moveToEol:
                        i = n.lastHPos;
                        break;
                    default:
                        n.lastHPos = i;
                    }
                    var a = r.repeat + (r.repeatOffset || 0),
                        s = r.forward ? o.line + a : o.line - a,
                        l = e.firstLine(),
                        c = e.lastLine(),
                        u = e.findPosV(o, r.forward ? a : -a, "line", n.lastHSPos);
                    return (
                        (r.forward ? u.line > s : u.line < s) && ((s = u.line), (i = u.ch)),
                        s < l && o.line == l
                            ? this.moveToStartOfLine(e, t, r, n)
                            : c < s && o.line == c
                                ? this.moveToEol(e, t, r, n, !0)
                                : (r.toFirstChar && ((i = he(e.getLine(s))), (n.lastHPos = i)),
                                (n.lastHSPos = e.charCoords(nt(s, i), "div").left),
                                nt(s, i))
                    );
                },
                moveByDisplayLines: function (e, t, r, n) {
                    var o = t;
                    switch (n.lastMotion) {
                    case this.moveByDisplayLines:
                    case this.moveByScroll:
                    case this.moveByLines:
                    case this.moveToColumn:
                    case this.moveToEol:
                        break;
                    default:
                        n.lastHSPos = e.charCoords(o, "div").left;
                    }
                    var i = r.repeat;
                    if (
                        (s = e.findPosV(o, r.forward ? i : -i, "line", n.lastHSPos)).hitSide
                    )
                        if (r.forward)
                            var a = {
                                    top: e.charCoords(s, "div").top + 8,
                                    left: n.lastHSPos,
                                },
                                s = e.coordsChar(a, "div");
                        else {
                            var l = e.charCoords(nt(e.firstLine(), 0), "div");
                            (l.left = n.lastHSPos), (s = e.coordsChar(l, "div"));
                        }
                    return (n.lastHPos = s.ch), s;
                },
                moveByPage: function (e, t, r) {
                    var n = t,
                        o = r.repeat;
                    return e.findPosV(n, r.forward ? o : -o, "page");
                },
                moveByParagraph: function (e, t, r) {
                    var n = r.forward ? 1 : -1;
                    return we(e, t, r.repeat, n);
                },
                moveBySentence: function (e, t, r) {
                    var n = r.forward ? 1 : -1;
                    return (function (e, t, r, n) {
                        function u(e, t) {
                            if (t.pos + t.dir < 0 || t.pos + t.dir >= t.line.length) {
                                if (((t.ln += t.dir), !y(e, t.ln)))
                                    return (t.line = null), (t.ln = null), void (t.pos = null);
                                (t.line = e.getLine(t.ln)),
                                (t.pos = 0 < t.dir ? 0 : t.line.length - 1);
                            } else t.pos += t.dir;
                        }
                        function o(e, t, r, n) {
                            var o = "" === (l = e.getLine(t)),
                                i = { line: l, ln: t, pos: r, dir: n },
                                a = { ln: i.ln, pos: i.pos },
                                s = "" === i.line;
                            for (u(e, i); null !== i.line; ) {
                                if (((a.ln = i.ln), (a.pos = i.pos), "" === i.line && !s))
                                    return { ln: i.ln, pos: i.pos };
                                if (o && "" !== i.line && !I(i.line[i.pos]))
                                    return { ln: i.ln, pos: i.pos };
                                !C(i.line[i.pos]) ||
                  o ||
                  (i.pos !== i.line.length - 1 && !I(i.line[i.pos + 1])) ||
                  (o = !0),
                                u(e, i);
                            }
                            var l = e.getLine(a.ln);
                            a.pos = 0;
                            for (var c = l.length - 1; 0 <= c; --c)
                                if (!I(l[c])) {
                                    a.pos = c;
                                    break;
                                }
                            return a;
                        }
                        function i(e, t, r, n) {
                            var o = { line: (s = e.getLine(t)), ln: t, pos: r, dir: n },
                                i = { ln: o.ln, pos: null },
                                a = "" === o.line;
                            for (u(e, o); null !== o.line; ) {
                                if ("" === o.line && !a)
                                    return null !== i.pos ? i : { ln: o.ln, pos: o.pos };
                                if (
                                    C(o.line[o.pos]) &&
                  null !== i.pos &&
                  (o.ln !== i.ln || o.pos + 1 !== i.pos)
                                )
                                    return i;
                                "" === o.line ||
                  I(o.line[o.pos]) ||
                  ((a = !1), (i = { ln: o.ln, pos: o.pos })),
                                u(e, o);
                            }
                            for (var s = e.getLine(i.ln), l = (i.pos = 0); l < s.length; ++l)
                                if (!I(s[l])) {
                                    i.pos = l;
                                    break;
                                }
                            return i;
                        }
                        var a = { ln: t.line, pos: t.ch };
                        for (; 0 < r; ) (a = (n < 0 ? i : o)(e, a.ln, a.pos, n)), r--;
                        return nt(a.ln, a.pos);
                    })(e, t, r.repeat, n);
                },
                moveByScroll: function (e, t, r, n) {
                    var o = e.getScrollInfo(),
                        i = null,
                        a = r.repeat;
                    a = a || o.clientHeight / (2 * e.defaultTextHeight());
                    var s = e.charCoords(t, "local");
                    if (((r.repeat = a), !(i = W.moveByDisplayLines(e, t, r, n))))
                        return null;
                    var l = e.charCoords(i, "local");
                    return e.scrollTo(null, o.top + l.top - s.top), i;
                },
                moveByWords: function (e, t, r) {
                    return (function (e, t, r, n, o, i) {
                        var a = X(t),
                            s = [];
                        ((n && !o) || (!n && o)) && r++;
                        for (var l = !(n && o), c = 0; c < r; c++) {
                            var u = ve(e, t, n, i, l);
                            if (!u) {
                                var h = re(e, e.lastLine());
                                s.push(
                                    n
                                        ? { line: e.lastLine(), from: h, to: h }
                                        : { line: 0, from: 0, to: 0 }
                                );
                                break;
                            }
                            s.push(u), (t = nt(u.line, n ? u.to - 1 : u.from));
                        }
                        var p = s.length != r,
                            f = s[0],
                            d = s.pop();
                        return n && !o
                            ? (p || (f.from == a.ch && f.line == a.line) || (d = s.pop()),
                            nt(d.line, d.from))
                            : n && o
                                ? nt(d.line, d.to - 1)
                                : !n && o
                                    ? (p || (f.to == a.ch && f.line == a.line) || (d = s.pop()),
                                    nt(d.line, d.to))
                                    : nt(d.line, d.from);
                    })(e, t, r.repeat, !!r.forward, !!r.wordEnd, !!r.bigWord);
                },
                moveTillCharacter: function (e, t, r) {
                    var n = ye(e, r.repeat, r.forward, r.selectedCharacter),
                        o = r.forward ? -1 : 1;
                    return de(o, r), n ? ((n.ch += o), n) : null;
                },
                moveToCharacter: function (e, t, r) {
                    var n = r.repeat;
                    return de(0, r), ye(e, n, r.forward, r.selectedCharacter) || t;
                },
                moveToSymbol: function (e, t, r) {
                    return (
                        (function (e, t, r, n) {
                            var o = X(e.getCursor()),
                                i = r ? 1 : -1,
                                a = r ? e.lineCount() : -1,
                                s = o.ch,
                                l = o.line,
                                c = e.getLine(l),
                                u = {
                                    lineText: c,
                                    nextCh: c.charAt(s),
                                    lastCh: null,
                                    index: s,
                                    symb: n,
                                    reverseSymb: (r
                                        ? { ")": "(", "}": "{" }
                                        : { "(": ")", "{": "}" })[n],
                                    forward: r,
                                    depth: 0,
                                    curMoveThrough: !1,
                                },
                                h = me[n];
                            if (!h) return o;
                            var p = ge[h].init,
                                f = ge[h].isComplete;
                            p && p(u);
                            for (; l !== a && t; ) {
                                if (
                                    ((u.index += i),
                                    (u.nextCh = u.lineText.charAt(u.index)),
                                    !u.nextCh)
                                ) {
                                    if (((l += i), (u.lineText = e.getLine(l) || ""), 0 < i))
                                        u.index = 0;
                                    else {
                                        var d = u.lineText.length;
                                        u.index = 0 < d ? d - 1 : 0;
                                    }
                                    u.nextCh = u.lineText.charAt(u.index);
                                }
                                f(u) && ((o.line = l), (o.ch = u.index), t--);
                            }
                            if (u.nextCh || u.curMoveThrough) return nt(l, u.index);
                            return o;
                        })(e, r.repeat, r.forward, r.selectedCharacter) || t
                    );
                },
                moveToColumn: function (e, t, r, n) {
                    var o,
                        i,
                        a,
                        s = r.repeat;
                    return (
                        (n.lastHPos = s - 1),
                        (n.lastHSPos = e.charCoords(t, "div").left),
                        (i = s),
                        (a = (o = e).getCursor().line),
                        J(o, nt(a, i - 1))
                    );
                },
                moveToEol: function (e, t, r, n, o) {
                    var i = nt(t.line + r.repeat - 1, 1 / 0),
                        a = e.clipPos(i);
                    return (
                        a.ch--,
                        o ||
              ((n.lastHPos = 1 / 0),
              (n.lastHSPos = e.charCoords(a, "div").left)),
                        i
                    );
                },
                moveToFirstNonWhiteSpaceCharacter: function (e, t) {
                    return nt(t.line, he(e.getLine(t.line)));
                },
                moveToMatchedSymbol: function (e, t) {
                    for (
                        var r, n = t, o = n.line, i = n.ch, a = e.getLine(o);
                        i < a.length;
                        i++
                    )
                        if ((r = a.charAt(i)) && -1 != "()[]{}".indexOf(r)) {
                            var s = e.getTokenTypeAt(nt(o, i + 1));
                            if ("string" !== s && "comment" !== s) break;
                        }
                    if (i < a.length) {
                        var l = "<" === i || ">" === i ? /[(){}[\]<>]/ : /[(){}[\]]/;
                        return e.findMatchingBracket(nt(o, i), { bracketRegex: l }).to;
                    }
                    return n;
                },
                moveToStartOfLine: function (e, t) {
                    return nt(t.line, 0);
                },
                moveToLineOrEdgeOfDocument: function (e, t, r) {
                    var n = r.forward ? e.lastLine() : e.firstLine();
                    return (
                        r.repeatIsExplicit &&
              (n = r.repeat - e.getOption("firstLineNumber")),
                        nt(n, he(e.getLine(n)))
                    );
                },
                textObjectManipulation: function (e, t, r, n) {
                    var o = r.selectedCharacter;
                    "b" == o ? (o = "(") : "B" == o && (o = "{");
                    var i,
                        a = !r.textObjectInner;
                    if (
                        {
                            "(": ")",
                            ")": "(",
                            "{": "}",
                            "}": "{",
                            "[": "]",
                            "]": "[",
                            "<": ">",
                            ">": "<",
                        }[o]
                    )
                        i = (function (e, t, r, n) {
                            var o,
                                i,
                                a = t,
                                s = {
                                    "(": /[()]/,
                                    ")": /[()]/,
                                    "[": /[[\]]/,
                                    "]": /[[\]]/,
                                    "{": /[{}]/,
                                    "}": /[{}]/,
                                    "<": /[<>]/,
                                    ">": /[<>]/,
                                }[r],
                                l = {
                                    "(": "(",
                                    ")": "(",
                                    "[": "[",
                                    "]": "[",
                                    "{": "{",
                                    "}": "{",
                                    "<": "<",
                                    ">": "<",
                                }[r],
                                c = e.getLine(a.line).charAt(a.ch) === l ? 1 : 0;
                            if (
                                ((o = e.scanForBracket(nt(a.line, a.ch + c), -1, void 0, {
                                    bracketRegex: s,
                                })),
                                (i = e.scanForBracket(nt(a.line, a.ch + c), 1, void 0, {
                                    bracketRegex: s,
                                })),
                                !o || !i)
                            )
                                return { start: a, end: a };
                            if (
                                ((o = o.pos),
                                (i = i.pos),
                                (o.line == i.line && o.ch > i.ch) || o.line > i.line)
                            ) {
                                var u = o;
                                (o = i), (i = u);
                            }
                            n ? (i.ch += 1) : (o.ch += 1);
                            return { start: o, end: i };
                        })(e, t, o, a);
                    else if ({ "'": !0, "\"": !0, "`": !0 }[o])
                        i = (function (e, t, r, n) {
                            var o,
                                i,
                                a,
                                s,
                                l = X(t),
                                c = e.getLine(l.line).split(""),
                                u = c.indexOf(r);
                            l.ch < u
                                ? (l.ch = u)
                                : u < l.ch && c[l.ch] == r && ((i = l.ch), --l.ch);
                            if (c[l.ch] != r || i)
                                for (a = l.ch; -1 < a && !o; a--) c[a] == r && (o = a + 1);
                            else o = l.ch + 1;
                            if (o && !i)
                                for (a = o, s = c.length; a < s && !i; a++)
                                    c[a] == r && (i = a);
                            if (!o || !i) return { start: l, end: l };
                            n && (--o, ++i);
                            return { start: nt(l.line, o), end: nt(l.line, i) };
                        })(e, t, o, a);
                    else if ("W" === o) i = pe(e, a, !0, !0);
                    else if ("w" === o) i = pe(e, a, !0, !1);
                    else {
                        if ("p" !== o) return null;
                        if (
                            ((i = we(e, t, r.repeat, 0, a)), (r.linewise = !0), n.visualMode)
                        )
                            n.visualLine || (n.visualLine = !0);
                        else {
                            var s = n.inputState.operatorArgs;
                            s && (s.linewise = !0), i.end.line--;
                        }
                    }
                    return e.state.vim.visualMode
                        ? (function (e, t, r) {
                            var n,
                                o = e.state.vim.sel,
                                i = o.head,
                                a = o.anchor;
                            G(r, t) && ((n = r), (r = t), (t = n));
                            G(i, a)
                                ? ((i = Y(t, i)), (a = ee(a, r)))
                                : ((a = Y(t, a)),
                                -1 == (i = q((i = ee(i, r)), 0, -1)).ch &&
                      i.line != e.firstLine() &&
                      (i = nt(i.line - 1, re(e, i.line - 1))));
                            return [a, i];
                        })(e, i.start, i.end)
                        : [i.start, i.end];
                },
                repeatLastCharacterSearch: function (e, t, r) {
                    var n = B.lastCharacterSearch,
                        o = r.repeat,
                        i = r.forward === n.forward,
                        a = (n.increment ? 1 : 0) * (i ? -1 : 1);
                    e.moveH(-a, "char");
                    var s = ye(e, o, (r.inclusive = i), n.selectedCharacter);
                    return s ? ((s.ch += a), s) : (e.moveH(a, "char"), t);
                },
            };
        function V(e, t) {
            for (var r = [], n = 0; n < t; n++) r.push(e);
            return r;
        }
        var D = {
            change: function (e, t, r) {
                var n,
                    o,
                    i = e.state.vim,
                    a = r[0].anchor,
                    s = r[0].head;
                if (i.visualMode)
                    if (t.fullLine)
                        (s.ch = Number.MAX_VALUE),
                        s.line--,
                        e.setSelection(a, s),
                        (o = e.getSelection()),
                        e.replaceSelection(""),
                        (n = a);
                    else {
                        o = e.getSelection();
                        var l = V("", r.length);
                        e.replaceSelections(l), (n = Y(r[0].head, r[0].anchor));
                    }
                else {
                    o = e.getRange(a, s);
                    var c = i.lastEditInputState || {};
                    if ("moveByWords" == c.motion && !I(o)) {
                        var u = /\s+$/.exec(o);
                        u &&
              c.motionArgs &&
              c.motionArgs.forward &&
              ((s = q(s, 0, -u[0].length)), (o = o.slice(0, -u[0].length)));
                    }
                    var h = new nt(a.line - 1, Number.MAX_VALUE),
                        p = e.firstLine() == e.lastLine();
                    s.line > e.lastLine() && t.linewise && !p
                        ? e.replaceRange("", h, s)
                        : e.replaceRange("", a, s),
                    t.linewise &&
              (p || (e.setCursor(h), Ye.commands.newlineAndIndent(e)),
              (a.ch = Number.MAX_VALUE)),
                    (n = a);
                }
                B.registerController.pushText(
                    t.registerName,
                    "change",
                    o,
                    t.linewise,
                    1 < r.length
                ),
                U.enterInsertMode(e, { head: n }, e.state.vim);
            },
            delete: function (e, t, r) {
                var n,
                    o,
                    i = e.state.vim;
                if (i.visualBlock) {
                    o = e.getSelection();
                    var a = V("", r.length);
                    e.replaceSelections(a), (n = r[0].anchor);
                } else {
                    var s = r[0].anchor,
                        l = r[0].head;
                    t.linewise &&
            l.line != e.firstLine() &&
            s.line == e.lastLine() &&
            s.line == l.line - 1 &&
            (s.line == e.firstLine()
                ? (s.ch = 0)
                : (s = nt(s.line - 1, re(e, s.line - 1)))),
                    (o = e.getRange(s, l)),
                    e.replaceRange("", s, l),
                    (n = s),
                    t.linewise && (n = W.moveToFirstNonWhiteSpaceCharacter(e, s));
                }
                return (
                    B.registerController.pushText(
                        t.registerName,
                        "delete",
                        o,
                        t.linewise,
                        i.visualBlock
                    ),
                    J(e, n, i.insertMode)
                );
            },
            indent: function (e, t, r) {
                var n = e.state.vim,
                    o = r[0].anchor.line,
                    i = n.visualBlock ? r[r.length - 1].anchor.line : r[0].head.line,
                    a = n.visualMode ? t.repeat : 1;
                t.linewise && i--;
                for (var s = o; s <= i; s++)
                    for (var l = 0; l < a; l++) e.indentLine(s, t.indentRight);
                return W.moveToFirstNonWhiteSpaceCharacter(e, r[0].anchor);
            },
            indentAuto: function (e, t, r) {
                return (
                    e.execCommand("indentAuto"),
                    W.moveToFirstNonWhiteSpaceCharacter(e, r[0].anchor)
                );
            },
            changeCase: function (e, t, r, n, o) {
                for (
                    var i = e.getSelections(), a = [], s = t.toLower, l = 0;
                    l < i.length;
                    l++
                ) {
                    var c = i[l],
                        u = "";
                    if (!0 === s) u = c.toLowerCase();
                    else if (!1 === s) u = c.toUpperCase();
                    else
                        for (var h = 0; h < c.length; h++) {
                            var p = c.charAt(h);
                            u += k(p) ? p.toLowerCase() : p.toUpperCase();
                        }
                    a.push(u);
                }
                return (
                    e.replaceSelections(a),
                    t.shouldMoveCursor
                        ? o
                        : !e.state.vim.visualMode &&
              t.linewise &&
              r[0].anchor.line + 1 == r[0].head.line
                            ? W.moveToFirstNonWhiteSpaceCharacter(e, n)
                            : t.linewise
                                ? n
                                : Y(r[0].anchor, r[0].head)
                );
            },
            yank: function (e, t, r, n) {
                var o = e.state.vim,
                    i = e.getSelection(),
                    a = o.visualMode
                        ? Y(o.sel.anchor, o.sel.head, r[0].head, r[0].anchor)
                        : n;
                return (
                    B.registerController.pushText(
                        t.registerName,
                        "yank",
                        i,
                        t.linewise,
                        o.visualBlock
                    ),
                    a
                );
            },
        };
        var U = {
            jumpListWalk: function (e, t, r) {
                if (!r.visualMode) {
                    var n = t.repeat,
                        o = t.forward,
                        i = B.jumpList.move(e, o ? n : -n),
                        a = i ? i.find() : void 0;
                    (a = a || e.getCursor()), e.setCursor(a);
                }
            },
            scroll: function (e, t, r) {
                if (!r.visualMode) {
                    var n = t.repeat || 1,
                        o = e.defaultTextHeight(),
                        i = e.getScrollInfo().top,
                        a = o * n,
                        s = t.forward ? i + a : i - a,
                        l = X(e.getCursor()),
                        c = e.charCoords(l, "local");
                    if (t.forward)
                        s > c.top
                            ? ((l.line += (s - c.top) / o),
                            (l.line = Math.ceil(l.line)),
                            e.setCursor(l),
                            (c = e.charCoords(l, "local")),
                            e.scrollTo(null, c.top))
                            : e.scrollTo(null, s);
                    else {
                        var u = s + e.getScrollInfo().clientHeight;
                        u < c.bottom
                            ? ((l.line -= (c.bottom - u) / o),
                            (l.line = Math.floor(l.line)),
                            e.setCursor(l),
                            (c = e.charCoords(l, "local")),
                            e.scrollTo(null, c.bottom - e.getScrollInfo().clientHeight))
                            : e.scrollTo(null, s);
                    }
                }
            },
            scrollToCursor: function (e, t) {
                var r = e.getCursor().line,
                    n = e.charCoords(nt(r, 0), "local"),
                    o = e.getScrollInfo().clientHeight,
                    i = n.top,
                    a = n.bottom - i;
                switch (t.position) {
                case "center":
                    i = i - o / 2 + a;
                    break;
                case "bottom":
                    i = i - o + a;
                }
                e.scrollTo(null, i);
            },
            replayMacro: function (e, t, r) {
                var n = t.selectedCharacter,
                    o = t.repeat,
                    i = B.macroModeState;
                for ("@" == n ? (n = i.latestRegister) : (i.latestRegister = n); o--; )
                    Je(e, r, i, n);
            },
            enterMacroRecordMode: function (e, t) {
                var r = B.macroModeState,
                    n = t.selectedCharacter;
                B.registerController.isValidRegister(n) && r.enterMacroRecordMode(e, n);
            },
            toggleOverwrite: function (e) {
                e.state.overwrite
                    ? (e.toggleOverwrite(!1),
                    e.setOption("keyMap", "vim-insert"),
                    Ye.signal(e, "vim-mode-change", { mode: "insert" }))
                    : (e.toggleOverwrite(!0),
                    e.setOption("keyMap", "vim-replace"),
                    Ye.signal(e, "vim-mode-change", { mode: "replace" }));
            },
            enterInsertMode: function (e, t, r) {
                if (!e.getOption("readOnly")) {
                    (r.insertMode = !0), (r.insertModeRepeat = (t && t.repeat) || 1);
                    var n = t ? t.insertAt : null,
                        o = r.sel,
                        i = t.head || e.getCursor("head"),
                        a = e.listSelections().length;
                    if ("eol" == n) i = nt(i.line, re(e, i.line));
                    else if ("bol" == n) i = nt(i.line, 0);
                    else if ("charAfter" == n) i = q(i, 0, 1);
                    else if ("firstNonBlank" == n)
                        i = W.moveToFirstNonWhiteSpaceCharacter(e, i);
                    else if ("startOfSelectedArea" == n) {
                        if (!r.visualMode) return;
                        r.visualBlock
                            ? ((i = nt(
                                Math.min(o.head.line, o.anchor.line),
                                Math.min(o.head.ch, o.anchor.ch)
                            )),
                            (a = Math.abs(o.head.line - o.anchor.line) + 1))
                            : (i =
                  o.head.line < o.anchor.line ? o.head : nt(o.anchor.line, 0));
                    } else if ("endOfSelectedArea" == n) {
                        if (!r.visualMode) return;
                        r.visualBlock
                            ? ((i = nt(
                                Math.min(o.head.line, o.anchor.line),
                                Math.max(o.head.ch + 1, o.anchor.ch)
                            )),
                            (a = Math.abs(o.head.line - o.anchor.line) + 1))
                            : (i =
                  o.head.line >= o.anchor.line
                      ? q(o.head, 0, 1)
                      : nt(o.anchor.line, 0));
                    } else if ("inplace" == n) {
                        if (r.visualMode) return;
                    } else "lastEdit" == n && (i = He(e) || i);
                    e.setOption("disableInput", !1),
                    t && t.replace
                        ? (e.toggleOverwrite(!0),
                        e.setOption("keyMap", "vim-replace"),
                        Ye.signal(e, "vim-mode-change", { mode: "replace" }))
                        : (e.toggleOverwrite(!1),
                        e.setOption("keyMap", "vim-insert"),
                        Ye.signal(e, "vim-mode-change", { mode: "insert" })),
                    B.macroModeState.isPlaying ||
              (e.on("change", $e), Ye.on(e.getInputField(), "keydown", Xe)),
                    r.visualMode && ue(e),
                    ae(e, i, a);
                }
            },
            toggleVisualMode: function (e, t, r) {
                var n,
                    o = t.repeat,
                    i = e.getCursor();
                r.visualMode
                    ? r.visualLine ^ t.linewise || r.visualBlock ^ t.blockwise
                        ? ((r.visualLine = !!t.linewise),
                        (r.visualBlock = !!t.blockwise),
                        Ye.signal(e, "vim-mode-change", {
                            mode: "visual",
                            subMode: r.visualLine
                                ? "linewise"
                                : r.visualBlock
                                    ? "blockwise"
                                    : "",
                        }),
                        le(e))
                        : ue(e)
                    : ((r.visualMode = !0),
                    (r.visualLine = !!t.linewise),
                    (r.visualBlock = !!t.blockwise),
                    (n = J(e, nt(i.line, i.ch + o - 1), !0)),
                    (r.sel = { anchor: i, head: n }),
                    Ye.signal(e, "vim-mode-change", {
                        mode: "visual",
                        subMode: r.visualLine
                            ? "linewise"
                            : r.visualBlock
                                ? "blockwise"
                                : "",
                    }),
                    le(e),
                    ke(e, r, "<", Y(i, n)),
                    ke(e, r, ">", ee(i, n)));
            },
            reselectLastSelection: function (e, t, r) {
                var n = r.lastSelection;
                if ((r.visualMode && se(e, r), n)) {
                    var o = n.anchorMark.find(),
                        i = n.headMark.find();
                    if (!o || !i) return;
                    (r.sel = { anchor: o, head: i }),
                    (r.visualMode = !0),
                    (r.visualLine = n.visualLine),
                    (r.visualBlock = n.visualBlock),
                    le(e),
                    ke(e, r, "<", Y(o, i)),
                    ke(e, r, ">", ee(o, i)),
                    Ye.signal(e, "vim-mode-change", {
                        mode: "visual",
                        subMode: r.visualLine
                            ? "linewise"
                            : r.visualBlock
                                ? "blockwise"
                                : "",
                    });
                }
            },
            joinLines: function (e, t, r) {
                var n, o;
                if (r.visualMode) {
                    if (((n = e.getCursor("anchor")), G((o = e.getCursor("head")), n))) {
                        var i = o;
                        (o = n), (n = i);
                    }
                    o.ch = re(e, o.line) - 1;
                } else {
                    var a = Math.max(t.repeat, 2);
                    (n = e.getCursor()), (o = J(e, nt(n.line + a - 1, 1 / 0)));
                }
                for (var s = 0, l = n.line; l < o.line; l++) {
                    s = re(e, n.line);
                    i = nt(n.line + 1, re(e, n.line + 1));
                    var c = e.getRange(n, i);
                    (c = t.keepSpaces
                        ? c.replace(/\n\r?/g, "")
                        : c.replace(/\n\s*/g, " ")),
                    e.replaceRange(c, n, i);
                }
                var u = nt(n.line, s);
                r.visualMode && ue(e, !1), e.setCursor(u);
            },
            newLineAndEnterInsertMode: function (e, t, r) {
                r.insertMode = !0;
                var n = X(e.getCursor());
                n.line !== e.firstLine() || t.after
                    ? ((n.line = t.after ? n.line : n.line - 1),
                    (n.ch = re(e, n.line)),
                    e.setCursor(n),
                    (
                        Ye.commands.newlineAndIndentContinueComment ||
              Ye.commands.newlineAndIndent
                    )(e))
                    : (e.replaceRange("\n", nt(e.firstLine(), 0)),
                    e.setCursor(e.firstLine(), 0));
                this.enterInsertMode(e, { repeat: t.repeat }, r);
            },
            paste: function (n, e, t) {
                var r = X(n.getCursor()),
                    o = B.registerController.getRegister(e.registerName);
                if ((p = o.toString())) {
                    if (e.matchIndent) {
                        var i = n.getOption("tabSize"),
                            a = function (e) {
                                var t = e.split("\t").length - 1,
                                    r = e.split(" ").length - 1;
                                return t * i + r;
                            },
                            s = n.getLine(n.getCursor().line),
                            l = a(s.match(/^\s*/)[0]),
                            c = p.replace(/\n$/, ""),
                            u = p !== c,
                            h = a(p.match(/^\s*/)[0]),
                            p = c.replace(/^\s*/gm, function (e) {
                                var t = l + (a(e) - h);
                                if (t < 0) return "";
                                if (n.getOption("indentWithTabs")) {
                                    var r = Math.floor(t / i);
                                    return Array(r + 1).join("\t");
                                }
                                return Array(t + 1).join(" ");
                            });
                        p += u ? "\n" : "";
                    }
                    if (1 < e.repeat) p = Array(e.repeat + 1).join(p);
                    var f,
                        d,
                        m,
                        g,
                        v,
                        y = o.linewise,
                        k = o.blockwise;
                    if (k) {
                        (p = p.split("\n")), y && p.pop();
                        for (var C = 0; C < p.length; C++) p[C] = "" == p[C] ? " " : p[C];
                        (r.ch += e.after ? 1 : 0), (r.ch = Math.min(re(n, r.line), r.ch));
                    } else
                        y
                            ? t.visualMode
                                ? (p = t.visualLine
                                    ? p.slice(0, -1)
                                    : "\n" + p.slice(0, p.length - 1) + "\n")
                                : e.after
                                    ? ((p = "\n" + p.slice(0, p.length - 1)),
                                    (r.ch = re(n, r.line)))
                                    : (r.ch = 0)
                            : (r.ch += e.after ? 1 : 0);
                    if (t.visualMode) {
                        var w;
                        t.lastPastedText = p;
                        var x =
                ((m = n),
                (v = (g = t).lastSelection),
                (g.visualMode
                    ? function () {
                        var e = m.listSelections(),
                            t = e[0],
                            r = e[e.length - 1];
                        return [
                            G(t.anchor, t.head) ? t.anchor : t.head,
                            G(r.anchor, r.head) ? r.head : r.anchor,
                        ];
                    }
                    : function () {
                        var e = m.getCursor(),
                            t = m.getCursor(),
                            r = v.visualBlock;
                        if (r) {
                            var n = r.width,
                                o = r.height;
                            t = nt(e.line + o, e.ch + n);
                            for (var i = [], a = e.line; a < t.line; a++) {
                                var s = { anchor: nt(a, e.ch), head: nt(a, t.ch) };
                                i.push(s);
                            }
                            m.setSelections(i);
                        } else {
                            var l = v.anchorMark.find(),
                                c = v.headMark.find(),
                                u = c.line - l.line,
                                h = c.ch - l.ch;
                            (t = { line: t.line + u, ch: u ? t.ch : h + t.ch }),
                            v.visualLine &&
                            ((e = nt(e.line, 0)),
                            (t = nt(t.line, re(m, t.line)))),
                            m.setSelection(e, t);
                        }
                        return [e, t];
                    })()),
                            M = x[0],
                            S = x[1],
                            A = n.getSelection(),
                            b = n.listSelections(),
                            L = new Array(b.length).join("1").split("1");
                        t.lastSelection && (w = t.lastSelection.headMark.find()),
                        B.registerController.unnamedRegister.setText(A),
                        (f = k
                            ? (n.replaceSelections(L),
                            (S = nt(M.line + p.length - 1, M.ch)),
                            n.setCursor(M),
                            ie(n, S),
                            n.replaceSelections(p),
                            M)
                            : t.visualBlock
                                ? (n.replaceSelections(L),
                                n.setCursor(M),
                                n.replaceRange(p, M, M),
                                M)
                                : (n.replaceRange(p, M, S),
                                n.posFromIndex(n.indexFromPos(M) + p.length - 1))),
                        w && (t.lastSelection.headMark = n.setBookmark(w)),
                        y && (f.ch = 0);
                    } else if (k) {
                        n.setCursor(r);
                        for (C = 0; C < p.length; C++) {
                            var T = r.line + C;
                            T > n.lastLine() && n.replaceRange("\n", nt(T, 0)),
                            re(n, T) < r.ch && oe(n, T, r.ch);
                        }
                        n.setCursor(r),
                        ie(n, nt(r.line + p.length - 1, r.ch)),
                        n.replaceSelections(p),
                        (f = r);
                    } else
                        n.replaceRange(p, r),
                        (f =
                y && e.after
                    ? nt(r.line + 1, he(n.getLine(r.line + 1)))
                    : y && !e.after
                        ? nt(r.line, he(n.getLine(r.line)))
                        : !y && e.after
                            ? ((d = n.indexFromPos(r)), n.posFromIndex(d + p.length - 1))
                            : ((d = n.indexFromPos(r)), n.posFromIndex(d + p.length)));
                    t.visualMode && ue(n, !1), n.setCursor(f);
                }
            },
            undo: function (e, t) {
                e.operation(function () {
                    z(e, Ye.commands.undo, t.repeat)(),
                    e.setCursor(e.getCursor("anchor"));
                });
            },
            redo: function (e, t) {
                z(e, Ye.commands.redo, t.repeat)();
            },
            setRegister: function (e, t, r) {
                r.inputState.registerName = t.selectedCharacter;
            },
            setMark: function (e, t, r) {
                ke(e, r, t.selectedCharacter, e.getCursor());
            },
            replace: function (e, t, r) {
                var n,
                    o,
                    i = t.selectedCharacter,
                    a = e.getCursor(),
                    s = e.listSelections();
                if (r.visualMode) (a = e.getCursor("start")), (o = e.getCursor("end"));
                else {
                    var l = e.getLine(a.line);
                    (n = a.ch + t.repeat) > l.length && (n = l.length),
                    (o = nt(a.line, n));
                }
                if ("\n" == i)
                    r.visualMode || e.replaceRange("", a, o),
                    (
                        Ye.commands.newlineAndIndentContinueComment ||
              Ye.commands.newlineAndIndent
                    )(e);
                else {
                    var c = e.getRange(a, o);
                    if (((c = c.replace(/[^\n]/g, i)), r.visualBlock)) {
                        var u = new Array(e.getOption("tabSize") + 1).join(" ");
                        (c = (c = e.getSelection())
                            .replace(/\t/g, u)
                            .replace(/[^\n]/g, i)
                            .split("\n")),
                        e.replaceSelections(c);
                    } else e.replaceRange(c, a, o);
                    r.visualMode
                        ? ((a = G(s[0].anchor, s[0].head) ? s[0].anchor : s[0].head),
                        e.setCursor(a),
                        ue(e, !1))
                        : e.setCursor(q(o, 0, -1));
                }
            },
            incrementNumberToken: function (e, t) {
                for (
                    var r,
                        n,
                        o,
                        i,
                        a = e.getCursor(),
                        s = e.getLine(a.line),
                        l = /(-?)(?:(0x)([\da-f]+)|(0b|0|)(\d+))/gi;
                    null !== (r = l.exec(s)) &&
          ((o = (n = r.index) + r[0].length), !(a.ch < o));

                );
                if ((t.backtrack || !(o <= a.ch)) && r) {
                    var c = r[2] || r[4],
                        u = r[3] || r[5],
                        h = t.increase ? 1 : -1,
                        p = { "0b": 2, 0: 8, "": 10, "0x": 16 }[c.toLowerCase()];
                    i = (parseInt(r[1] + u, p) + h * t.repeat).toString(p);
                    var f = c
                        ? new Array(u.length - i.length + 1 + r[1].length).join("0")
                        : "";
                    i = "-" === i.charAt(0) ? "-" + c + f + i.substr(1) : c + f + i;
                    var d = nt(a.line, n),
                        m = nt(a.line, o);
                    e.replaceRange(i, d, m), e.setCursor(nt(a.line, n + i.length - 1));
                }
            },
            repeatLastEdit: function (e, t, r) {
                if (r.lastEditInputState) {
                    var n = t.repeat;
                    n && t.repeatIsExplicit
                        ? (r.lastEditInputState.repeatOverride = n)
                        : (n = r.lastEditInputState.repeatOverride || n),
                    Ze(e, r, n, !1);
                }
            },
            indent: function (e, t) {
                e.indentLine(e.getCursor().line, t.indentRight);
            },
            exitInsertMode: De,
        };
        function J(e, t, r) {
            var n = Math.min(Math.max(e.firstLine(), t.line), e.lastLine()),
                o = re(e, n) - 1;
            o = r ? o + 1 : o;
            var i = Math.min(Math.max(0, t.ch), o);
            return nt(n, i);
        }
        function $(e) {
            var t = {};
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
            return t;
        }
        function q(e, t, r) {
            return (
                "object" == typeof t && ((r = t.ch), (t = t.line)),
                nt(e.line + t, e.ch + r)
            );
        }
        function Q(e, t) {
            if ("<character>" != t.slice(-11))
                return e == t ? "full" : 0 == t.indexOf(e) && "partial";
            var r = t.length - 11,
                n = e.slice(0, r),
                o = t.slice(0, r);
            return n == o && e.length > r ? "full" : 0 == o.indexOf(n) && "partial";
        }
        function z(t, r, n) {
            return function () {
                for (var e = 0; e < n; e++) r(t);
            };
        }
        function X(e) {
            return nt(e.line, e.ch);
        }
        function Z(e, t) {
            return e.ch == t.ch && e.line == t.line;
        }
        function G(e, t) {
            return e.line < t.line || (e.line == t.line && e.ch < t.ch);
        }
        function Y(e, t) {
            return (
                2 < arguments.length &&
          (t = Y.apply(void 0, Array.prototype.slice.call(arguments, 1))),
                G(e, t) ? e : t
            );
        }
        function ee(e, t) {
            return (
                2 < arguments.length &&
          (t = ee.apply(void 0, Array.prototype.slice.call(arguments, 1))),
                G(e, t) ? t : e
            );
        }
        function te(e, t, r) {
            var n = G(e, t),
                o = G(t, r);
            return n && o;
        }
        function re(e, t) {
            return e.getLine(t).length;
        }
        function ne(e) {
            return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
        }
        function oe(e, t, r) {
            var n = re(e, t),
                o = new Array(r - n + 1).join(" ");
            e.setCursor(nt(t, n)), e.replaceRange(o, e.getCursor());
        }
        function ie(e, t) {
            var r = [],
                n = e.listSelections(),
                o = X(e.clipPos(t)),
                i = !Z(t, o),
                a = (function (e, t, r) {
                    for (var n = 0; n < e.length; n++) {
                        var o = "head" != r && Z(e[n].anchor, t),
                            i = "anchor" != r && Z(e[n].head, t);
                        if (o || i) return n;
                    }
                    return -1;
                })(n, e.getCursor("head")),
                s = Z(n[a].head, n[a].anchor),
                l = n.length - 1,
                c = a < l - a ? l : 0,
                u = n[c].anchor,
                h = Math.min(u.line, o.line),
                p = Math.max(u.line, o.line),
                f = u.ch,
                d = o.ch,
                m = n[c].head.ch - f,
                g = d - f;
            0 < m && g <= 0
                ? (f++, i || d--)
                : m < 0 && 0 <= g
                    ? (f--, s || d++)
                    : m < 0 && -1 == g && (f--, d++);
            for (var v = h; v <= p; v++) {
                var y = { anchor: new nt(v, f), head: new nt(v, d) };
                r.push(y);
            }
            return e.setSelections(r), (t.ch = d), (u.ch = f), u;
        }
        function ae(e, t, r) {
            for (var n = [], o = 0; o < r; o++) {
                var i = q(t, o, 0);
                n.push({ anchor: i, head: i });
            }
            e.setSelections(n, 0);
        }
        function se(e, t) {
            var r = t.sel.anchor,
                n = t.sel.head;
            t.lastPastedText &&
        ((n = e.posFromIndex(e.indexFromPos(r) + t.lastPastedText.length)),
        (t.lastPastedText = null)),
            (t.lastSelection = {
                anchorMark: e.setBookmark(r),
                headMark: e.setBookmark(n),
                anchor: X(r),
                head: X(n),
                visualMode: t.visualMode,
                visualLine: t.visualLine,
                visualBlock: t.visualBlock,
            });
        }
        function le(e, t, r) {
            var n = e.state.vim,
                o = ce(
                    e,
                    (t = t || n.sel),
                    (r = r || n.visualLine ? "line" : n.visualBlock ? "block" : "char")
                );
            e.setSelections(o.ranges, o.primary), Qe(e);
        }
        function ce(e, t, r, n) {
            var o = X(t.head),
                i = X(t.anchor);
            if ("char" == r) {
                var a = n || G(t.head, t.anchor) ? 0 : 1,
                    s = G(t.head, t.anchor) ? 1 : 0;
                return (
                    (o = q(t.head, 0, a)),
                    { ranges: [{ anchor: (i = q(t.anchor, 0, s)), head: o }], primary: 0 }
                );
            }
            if ("line" == r) {
                if (G(t.head, t.anchor)) (o.ch = 0), (i.ch = re(e, i.line));
                else {
                    i.ch = 0;
                    var l = e.lastLine();
                    o.line > l && (o.line = l), (o.ch = re(e, o.line));
                }
                return { ranges: [{ anchor: i, head: o }], primary: 0 };
            }
            if ("block" == r) {
                for (
                    var c = Math.min(i.line, o.line),
                        u = Math.min(i.ch, o.ch),
                        h = Math.max(i.line, o.line),
                        p = Math.max(i.ch, o.ch) + 1,
                        f = h - c + 1,
                        d = o.line == c ? 0 : f - 1,
                        m = [],
                        g = 0;
                    g < f;
                    g++
                )
                    m.push({ anchor: nt(c + g, u), head: nt(c + g, p) });
                return { ranges: m, primary: d };
            }
        }
        function ue(e, t) {
            var r = e.state.vim;
            !1 !== t && e.setCursor(J(e, r.sel.head)),
            se(e, r),
            (r.visualMode = !1),
            (r.visualLine = !1),
            (r.visualBlock = !1),
            Ye.signal(e, "vim-mode-change", { mode: "normal" }),
            r.fakeCursor && r.fakeCursor.clear();
        }
        function he(e) {
            if (!e) return 0;
            var t = e.search(/\S/);
            return -1 == t ? e.length : t;
        }
        function pe(e, t, r, n, o) {
            for (
                var i,
                    a,
                    s =
            ((a = (i = e).getCursor("head")),
            1 == i.getSelection().length && (a = Y(a, i.getCursor("anchor"))),
            a),
                    l = e.getLine(s.line),
                    c = s.ch,
                    u = o ? m[0] : v[0];
                !u(l.charAt(c));

            )
                if (++c >= l.length) return null;
            n ? (u = v[0]) : (u = m[0])(l.charAt(c)) || (u = m[1]);
            for (var h = c, p = c; u(l.charAt(h)) && h < l.length; ) h++;
            for (; u(l.charAt(p)) && 0 <= p; ) p--;
            if ((p++, t)) {
                for (var f = h; /\s/.test(l.charAt(h)) && h < l.length; ) h++;
                if (f == h) {
                    for (var d = p; /\s/.test(l.charAt(p - 1)) && 0 < p; ) p--;
                    p = p || d;
                }
            }
            return { start: nt(s.line, p), end: nt(s.line, h) };
        }
        function fe(e, t, r) {
            Z(t, r) || B.jumpList.add(e, t, r);
        }
        function de(e, t) {
            (B.lastCharacterSearch.increment = e),
            (B.lastCharacterSearch.forward = t.forward),
            (B.lastCharacterSearch.selectedCharacter = t.selectedCharacter);
        }
        var me = {
                "(": "bracket",
                ")": "bracket",
                "{": "bracket",
                "}": "bracket",
                "[": "section",
                "]": "section",
                "*": "comment",
                "/": "comment",
                m: "method",
                M: "method",
                "#": "preprocess",
            },
            ge = {
                bracket: {
                    isComplete: function (e) {
                        if (e.nextCh === e.symb) {
                            if ((e.depth++, 1 <= e.depth)) return !0;
                        } else e.nextCh === e.reverseSymb && e.depth--;
                        return !1;
                    },
                },
                section: {
                    init: function (e) {
                        (e.curMoveThrough = !0),
                        (e.symb = (e.forward ? "]" : "[") === e.symb ? "{" : "}");
                    },
                    isComplete: function (e) {
                        return 0 === e.index && e.nextCh === e.symb;
                    },
                },
                comment: {
                    isComplete: function (e) {
                        var t = "*" === e.lastCh && "/" === e.nextCh;
                        return (e.lastCh = e.nextCh), t;
                    },
                },
                method: {
                    init: function (e) {
                        (e.symb = "m" === e.symb ? "{" : "}"),
                        (e.reverseSymb = "{" === e.symb ? "}" : "{");
                    },
                    isComplete: function (e) {
                        return e.nextCh === e.symb;
                    },
                },
                preprocess: {
                    init: function (e) {
                        e.index = 0;
                    },
                    isComplete: function (e) {
                        if ("#" === e.nextCh) {
                            var t = e.lineText.match(/#(\w+)/)[1];
                            if ("endif" === t) {
                                if (e.forward && 0 === e.depth) return !0;
                                e.depth++;
                            } else if ("if" === t) {
                                if (!e.forward && 0 === e.depth) return !0;
                                e.depth--;
                            }
                            if ("else" === t && 0 === e.depth) return !0;
                        }
                        return !1;
                    },
                },
            };
        function ve(e, t, r, n, o) {
            var i = t.line,
                a = t.ch,
                s = e.getLine(i),
                l = r ? 1 : -1,
                c = n ? v : m;
            if (o && "" == s) {
                if (((i += l), (s = e.getLine(i)), !y(e, i))) return null;
                a = r ? 0 : s.length;
            }
            for (;;) {
                if (o && "" == s) return { from: 0, to: 0, line: i };
                for (var u = 0 < l ? s.length : -1, h = u, p = u; a != u; ) {
                    for (var f = !1, d = 0; d < c.length && !f; ++d)
                        if (c[d](s.charAt(a))) {
                            for (h = a; a != u && c[d](s.charAt(a)); ) a += l;
                            if (((f = h != (p = a)), h == t.ch && i == t.line && p == h + l))
                                continue;
                            return { from: Math.min(h, p + 1), to: Math.max(h, p), line: i };
                        }
                    f || (a += l);
                }
                if (!y(e, (i += l))) return null;
                (s = e.getLine(i)), (a = 0 < l ? 0 : s.length);
            }
        }
        function ye(e, t, r, n) {
            for (var o, i = e.getCursor(), a = i.ch, s = 0; s < t; s++) {
                if (-1 == (o = Ce(a, e.getLine(i.line), n, r, !0))) return null;
                a = o;
            }
            return nt(e.getCursor().line, o);
        }
        function ke(e, t, r, n) {
            w(r, p) &&
        (t.marks[r] && t.marks[r].clear(), (t.marks[r] = e.setBookmark(n)));
        }
        function Ce(e, t, r, n, o) {
            var i;
            return (
                n
                    ? -1 == (i = t.indexOf(r, e + 1)) || o || --i
                    : -1 == (i = t.lastIndexOf(r, e - 1)) || o || (i += 1),
                i
            );
        }
        function we(t, e, r, n, o) {
            var i,
                a = e.line,
                s = t.firstLine(),
                l = t.lastLine(),
                c = a;
            function u(e) {
                return !t.getLine(e);
            }
            function h(e, t, r) {
                return r ? u(e) != u(e + t) : !u(e) && u(e + t);
            }
            if (n) {
                for (; s <= c && c <= l && 0 < r; ) h(c, n) && r--, (c += n);
                return new nt(c, 0);
            }
            var p = t.state.vim;
            if (p.visualLine && h(a, 1, !0)) {
                var f = p.sel.anchor;
                h(f.line, -1, !0) && ((o && f.line == a) || (a += 1));
            }
            var d = u(a);
            for (c = a; c <= l && r; c++) h(c, 1, !0) && ((o && u(c) == d) || r--);
            for (
                i = new nt(c, 0), l < c && !d ? (d = !0) : (o = !1), c = a;
                s < c && ((o && u(c) != d && c != a) || !h(c, -1, !0));
                c--
            );
            return { start: new nt(c, 0), end: i };
        }
        function xe() {}
        function Me(e) {
            var t = e.state.vim;
            return t.searchState_ || (t.searchState_ = new xe());
        }
        function Se(e, t) {
            var r = Ae(e, t) || [];
            if (!r.length) return [];
            var n = [];
            if (0 === r[0]) {
                for (var o = 0; o < r.length; o++)
                    "number" == typeof r[o] && n.push(e.substring(r[o] + 1, r[o + 1]));
                return n;
            }
        }
        function Ae(e, t) {
            t = t || "/";
            for (var r = !1, n = [], o = 0; o < e.length; o++) {
                var i = e.charAt(o);
                r || i != t || n.push(o), (r = !r && "\\" == i);
            }
            return n;
        }
        M("pcre", !0, "boolean"),
        (xe.prototype = {
            getQuery: function () {
                return B.query;
            },
            setQuery: function (e) {
                B.query = e;
            },
            getOverlay: function () {
                return this.searchOverlay;
            },
            setOverlay: function (e) {
                this.searchOverlay = e;
            },
            isReversed: function () {
                return B.isReversed;
            },
            setReversed: function (e) {
                B.isReversed = e;
            },
            getScrollbarAnnotate: function () {
                return this.annotate;
            },
            setScrollbarAnnotate: function (e) {
                this.annotate = e;
            },
        });
        var be = { "\\n": "\n", "\\r": "\r", "\\t": "\t" };
        var Le = {
            "\\/": "/",
            "\\\\": "\\",
            "\\n": "\n",
            "\\r": "\r",
            "\\t": "\t",
            "\\&": "&",
        };
        function Te(e, t, r) {
            if (
                (B.registerController.getRegister("/").setText(e), e instanceof RegExp)
            )
                return e;
            var n,
                o,
                i = Ae(e, "/");
            i.length
                ? ((n = e.substring(0, i[0])),
                (o = -1 != e.substring(i[0]).indexOf("i")))
                : (n = e);
            return n
                ? (A("pcre") ||
            (n = (function (e) {
                for (var t = !1, r = [], n = -1; n < e.length; n++) {
                    var o = e.charAt(n) || "",
                        i = e.charAt(n + 1) || "",
                        a = i && -1 != "|(){".indexOf(i);
                    t
                        ? (("\\" === o && a) || r.push(o), (t = !1))
                        : "\\" === o
                            ? ((t = !0),
                            i && -1 != "}".indexOf(i) && (a = !0),
                            (a && "\\" !== i) || r.push(o))
                            : (r.push(o), a && "\\" !== i && r.push("\\"));
                }
                return r.join("");
            })(n)),
                r && (t = /^[^A-Z]*$/.test(n)),
                new RegExp(n, t || o ? "i" : void 0))
                : null;
        }
        function Re(e, t) {
            e.openNotification
                ? e.openNotification("<span style=\"color: red\">" + t + "</span>", {
                    bottom: !0,
                    duration: 5e3,
                })
                : alert(t);
        }
        var Ee = "(Javascript regexp)";
        function Oe(e, t) {
            var r,
                n,
                o,
                i,
                a,
                s,
                l,
                c,
                u = (t.prefix || "") + " " + (t.desc || ""),
                h =
          ((r = t.prefix),
          (n = t.desc),
          (o =
            "<span style=\"font-family: monospace; white-space: pre\">" +
            (r || "") +
            "<input type=\"text\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\"></span>"),
          n && (o += " <span style=\"color: #888\">" + n + "</span>"),
          o);
            (i = e),
            (a = h),
            (s = u),
            (l = t.onClose),
            (c = t),
            i.openDialog
                ? i.openDialog(a, l, {
                    bottom: !0,
                    value: c.value,
                    onKeyDown: c.onKeyDown,
                    onKeyUp: c.onKeyUp,
                    selectValueOnOpen: !1,
                })
                : l(prompt(s, ""));
        }
        function Ie(e, t, r, n) {
            if (t) {
                var o = Me(e),
                    i = Te(t, !!r, !!n);
                if (i)
                    return (
                        Ke(e, i),
                        (function (e, t) {
                            if (e instanceof RegExp && t instanceof RegExp) {
                                for (
                                    var r = ["global", "multiline", "ignoreCase", "source"],
                                        n = 0;
                                    n < r.length;
                                    n++
                                ) {
                                    var o = r[n];
                                    if (e[o] !== t[o]) return;
                                }
                                return 1;
                            }
                        })(i, o.getQuery()) || o.setQuery(i),
                        i
                    );
            }
        }
        var Be = 0;
        function Ke(r, n) {
            clearTimeout(Be),
            (Be = setTimeout(function () {
                var e = Me(r),
                    t = e.getOverlay();
                (t && n == t.query) ||
            (t && r.removeOverlay(t),
            (t = (function (r) {
                if ("^" == r.source.charAt(0)) var n = !0;
                return {
                    token: function (e) {
                        if (!n || e.sol()) {
                            var t = e.match(r, !1);
                            if (t)
                                return 0 == t[0].length
                                    ? (e.next(), "searching")
                                    : e.sol() || (e.backUp(1), r.exec(e.next() + t[0]))
                                        ? (e.match(r), "searching")
                                        : (e.next(), null);
                            for (; !e.eol() && (e.next(), !e.match(r, !1)); );
                        } else e.skipToEnd();
                    },
                    query: r,
                };
            })(n)),
            r.addOverlay(t),
            r.showMatchesOnScrollbar &&
              (e.getScrollbarAnnotate() && e.getScrollbarAnnotate().clear(),
              e.setScrollbarAnnotate(r.showMatchesOnScrollbar(n))),
            e.setOverlay(t));
            }, 50));
        }
        function Ne(o, i, a, s) {
            return (
                void 0 === s && (s = 1),
                o.operation(function () {
                    for (
                        var e = o.getCursor(), t = o.getSearchCursor(a, e), r = 0;
                        r < s;
                        r++
                    ) {
                        var n = t.find(i);
                        if (
                            (0 == r && n && Z(t.from(), e) && (n = t.find(i)),
                            !n &&
                !(t = o.getSearchCursor(
                    a,
                    i ? nt(o.lastLine()) : nt(o.firstLine(), 0)
                )).find(i))
                        )
                            return;
                    }
                    return t.from();
                })
            );
        }
        function Pe(e) {
            var t = Me(e);
            e.removeOverlay(Me(e).getOverlay()),
            t.setOverlay(null),
            t.getScrollbarAnnotate() &&
          (t.getScrollbarAnnotate().clear(), t.setScrollbarAnnotate(null));
        }
        function je(e) {
            var t = e.getScrollInfo(),
                r = e.coordsChar({ left: 0, top: 6 + t.top }, "local"),
                n = t.clientHeight - 10 + t.top,
                o = e.coordsChar({ left: 0, top: n }, "local");
            return { top: r.line, bottom: o.line };
        }
        function _e(e, t, r) {
            if ("'" == r || "`" == r) return B.jumpList.find(e, -1) || nt(0, 0);
            if ("." == r) return He(e);
            var n = t.marks[r];
            return n && n.find();
        }
        function He(e) {
            for (var t = e.doc.history.done, r = t.length; r--; )
                if (t[r].changes) return X(t[r].changes[0].to);
        }
        function Fe() {
            this.buildCommandMap_();
        }
        Fe.prototype = {
            processCommand: function (e, t, r) {
                var n = this;
                e.operation(function () {
                    (e.curOp.isVimOp = !0), n._processCommand(e, t, r);
                });
            },
            _processCommand: function (t, e, r) {
                var n = t.state.vim,
                    o = B.registerController.getRegister(":"),
                    i = o.toString();
                n.visualMode && ue(t);
                var a = new Ye.StringStream(e);
                o.setText(e);
                var s,
                    l,
                    c = r || {};
                c.input = e;
                try {
                    this.parseInput_(t, a, c);
                } catch (e) {
                    throw (Re(t, e), e);
                }
                if (c.commandName) {
                    if ((s = this.matchCommand_(c.commandName))) {
                        if (
                            ((l = s.name),
                            s.excludeFromCommandHistory && o.setText(i),
                            this.parseCommandArgs_(a, c, s),
                            "exToKey" == s.type)
                        ) {
                            for (var u = 0; u < s.toKeys.length; u++)
                                Ye.Vim.handleKey(t, s.toKeys[u], "mapping");
                            return;
                        }
                        if ("exToEx" == s.type)
                            return void this.processCommand(t, s.toInput);
                    }
                } else void 0 !== c.line && (l = "move");
                if (l)
                    try {
                        We[l](t, c), (s && s.possiblyAsync) || !c.callback || c.callback();
                    } catch (e) {
                        throw (Re(t, e), e);
                    }
                else Re(t, "Not an editor command \":" + e + "\"");
            },
            parseInput_: function (e, t, r) {
                t.eatWhile(":"),
                t.eat("%")
                    ? ((r.line = e.firstLine()), (r.lineEnd = e.lastLine()))
                    : ((r.line = this.parseLineSpec_(e, t)),
                    void 0 !== r.line &&
                t.eat(",") &&
                (r.lineEnd = this.parseLineSpec_(e, t)));
                var n = t.match(/^(\w+)/);
                return (r.commandName = n ? n[1] : t.match(/.*/)[0]), r;
            },
            parseLineSpec_: function (e, t) {
                var r = t.match(/^(\d+)/);
                if (r) return parseInt(r[1], 10) - 1;
                switch (t.next()) {
                case ".":
                    return this.parseLineSpecOffset_(t, e.getCursor().line);
                case "$":
                    return this.parseLineSpecOffset_(t, e.lastLine());
                case "'":
                    var n = t.next(),
                        o = _e(e, e.state.vim, n);
                    if (!o) throw new Error("Mark not set");
                    return this.parseLineSpecOffset_(t, o.line);
                case "-":
                case "+":
                    return (
                        t.backUp(1), this.parseLineSpecOffset_(t, e.getCursor().line)
                    );
                default:
                    return void t.backUp(1);
                }
            },
            parseLineSpecOffset_: function (e, t) {
                var r = e.match(/^([+-])?(\d+)/);
                if (r) {
                    var n = parseInt(r[2], 10);
                    "-" == r[1] ? (t -= n) : (t += n);
                }
                return t;
            },
            parseCommandArgs_: function (e, t, r) {
                if (!e.eol()) {
                    t.argString = e.match(/.*/)[0];
                    var n = r.argDelimiter || /\s+/,
                        o = ne(t.argString).split(n);
                    o.length && o[0] && (t.args = o);
                }
            },
            matchCommand_: function (e) {
                for (var t = e.length; 0 < t; t--) {
                    var r = e.substring(0, t);
                    if (this.commandMap_[r]) {
                        var n = this.commandMap_[r];
                        if (0 === n.name.indexOf(e)) return n;
                    }
                }
                return null;
            },
            buildCommandMap_: function () {
                this.commandMap_ = {};
                for (var e = 0; e < rt.length; e++) {
                    var t = rt[e],
                        r = t.shortName || t.name;
                    this.commandMap_[r] = t;
                }
            },
            map: function (e, t, r) {
                if (":" != e && ":" == e.charAt(0)) {
                    if (r) throw Error("Mode not supported for ex mappings");
                    var n = e.substring(1);
                    ":" != t && ":" == t.charAt(0)
                        ? (this.commandMap_[n] = {
                            name: n,
                            type: "exToEx",
                            toInput: t.substring(1),
                            user: !0,
                        })
                        : (this.commandMap_[n] = {
                            name: n,
                            type: "exToKey",
                            toKeys: t,
                            user: !0,
                        });
                } else if (":" != t && ":" == t.charAt(0)) {
                    var o = {
                        keys: e,
                        type: "keyToEx",
                        exArgs: { input: t.substring(1) },
                    };
                    r && (o.context = r), et.unshift(o);
                } else {
                    o = { keys: e, type: "keyToKey", toKeys: t };
                    r && (o.context = r), et.unshift(o);
                }
            },
            unmap: function (e, t) {
                if (":" != e && ":" == e.charAt(0)) {
                    if (t) throw Error("Mode not supported for ex mappings");
                    var r = e.substring(1);
                    if (this.commandMap_[r] && this.commandMap_[r].user)
                        return void delete this.commandMap_[r];
                } else
                    for (var n = e, o = 0; o < et.length; o++)
                        if (n == et[o].keys && et[o].context === t)
                            return void et.splice(o, 1);
                throw Error("No such mapping.");
            },
        };
        var We = {
                colorscheme: function (e, t) {
                    !t.args || t.args.length < 1
                        ? Re(e, e.getOption("theme"))
                        : e.setOption("theme", t.args[0]);
                },
                map: function (e, t, r) {
                    var n = t.args;
                    !n || n.length < 2
                        ? e && Re(e, "Invalid mapping: " + t.input)
                        : Ve.map(n[0], n[1], r);
                },
                imap: function (e, t) {
                    this.map(e, t, "insert");
                },
                nmap: function (e, t) {
                    this.map(e, t, "normal");
                },
                vmap: function (e, t) {
                    this.map(e, t, "visual");
                },
                unmap: function (e, t, r) {
                    var n = t.args;
                    !n || n.length < 1
                        ? e && Re(e, "No such mapping: " + t.input)
                        : Ve.unmap(n[0], r);
                },
                move: function (e, t) {
                    F.processCommand(e, e.state.vim, {
                        type: "motion",
                        motion: "moveToLineOrEdgeOfDocument",
                        motionArgs: { forward: !1, explicitRepeat: !0, linewise: !0 },
                        repeatOverride: t.line + 1,
                    });
                },
                set: function (e, t) {
                    var r = t.args,
                        n = t.setCfg || {};
                    if (!r || r.length < 1) e && Re(e, "Invalid mapping: " + t.input);
                    else {
                        var o = r[0].split("="),
                            i = o[0],
                            a = o[1],
                            s = !1;
                        if ("?" == i.charAt(i.length - 1)) {
                            if (a) throw Error("Trailing characters: " + t.argString);
                            (i = i.substring(0, i.length - 1)), (s = !0);
                        }
                        void 0 === a &&
              "no" == i.substring(0, 2) &&
              ((i = i.substring(2)), (a = !1));
                        var l = x[i] && "boolean" == x[i].type;
                        if ((l && null == a && (a = !0), (!l && void 0 === a) || s)) {
                            var c = A(i, e, n);
                            c instanceof Error
                                ? Re(e, c.message)
                                : Re(
                                    e,
                                    !0 === c || !1 === c
                                        ? " " + (c ? "" : "no") + i
                                        : "  " + i + "=" + c
                                );
                        } else {
                            var u = S(i, a, e, n);
                            u instanceof Error && Re(e, u.message);
                        }
                    }
                },
                setlocal: function (e, t) {
                    (t.setCfg = { scope: "local" }), this.set(e, t);
                },
                setglobal: function (e, t) {
                    (t.setCfg = { scope: "global" }), this.set(e, t);
                },
                registers: function (e, t) {
                    var r = t.args,
                        n = B.registerController.registers,
                        o = "----------Registers----------<br><br>";
                    if (r) {
                        r = r.join("");
                        for (var i = 0; i < r.length; i++) {
                            if (((a = r.charAt(i)), B.registerController.isValidRegister(a)))
                                o += "\"" + a + "    " + (n[a] || new j()).toString() + "<br>";
                        }
                    } else
                        for (var a in n) {
                            var s = n[a].toString();
                            s.length && (o += "\"" + a + "    " + s + "<br>");
                        }
                    Re(e, o);
                },
                sort: function (e, i) {
                    var a, s, l, c, u;
                    var t = (function () {
                        if (i.argString) {
                            var e = new Ye.StringStream(i.argString);
                            if ((e.eat("!") && (a = !0), e.eol())) return;
                            if (!e.eatSpace()) return "Invalid arguments";
                            var t = e.match(/([dinuox]+)?\s*(\/.+\/)?\s*/);
                            if (!t && !e.eol()) return "Invalid arguments";
                            if (t[1]) {
                                (s = -1 != t[1].indexOf("i")), (l = -1 != t[1].indexOf("u"));
                                var r =
                    -1 != t[1].indexOf("d") || (-1 != t[1].indexOf("n") && 1),
                                    n = -1 != t[1].indexOf("x") && 1,
                                    o = -1 != t[1].indexOf("o") && 1;
                                if (1 < r + n + o) return "Invalid arguments";
                                c = (r ? "decimal" : n && "hex") || (o && "octal");
                            }
                            t[2] &&
                (u = new RegExp(t[2].substr(1, t[2].length - 2), s ? "i" : ""));
                        }
                    })();
                    if (t) Re(e, t + ": " + i.argString);
                    else {
                        var r = i.line || e.firstLine(),
                            n = i.lineEnd || i.line || e.lastLine();
                        if (r != n) {
                            var o = nt(r, 0),
                                h = nt(n, re(e, n)),
                                p = e.getRange(o, h).split("\n"),
                                f =
                  u ||
                  ("decimal" == c
                      ? /(-?)([\d]+)/
                      : "hex" == c
                          ? /(-?)(?:0x)?([0-9a-f]+)/i
                          : "octal" == c
                              ? /([0-7]+)/
                              : null),
                                d =
                  "decimal" == c
                      ? 10
                      : "hex" == c
                          ? 16
                          : "octal" == c
                              ? 8
                              : null,
                                m = [],
                                g = [];
                            if (c || u)
                                for (var v = 0; v < p.length; v++) {
                                    var y = u ? p[v].match(u) : null;
                                    y && "" != y[0]
                                        ? m.push(y)
                                        : !u && f.exec(p[v])
                                            ? m.push(p[v])
                                            : g.push(p[v]);
                                }
                            else g = p;
                            if (
                                (m.sort(
                                    u
                                        ? function (e, t) {
                                            var r;
                                            return (
                                                a && ((r = e), (e = t), (t = r)),
                                                s &&
                            ((e[0] = e[0].toLowerCase()),
                            (t[0] = t[0].toLowerCase())),
                                                e[0] < t[0] ? -1 : 1
                                            );
                                        }
                                        : w
                                ),
                                u)
                            )
                                for (v = 0; v < m.length; v++) m[v] = m[v].input;
                            else c || g.sort(w);
                            if (((p = a ? m.concat(g) : g.concat(m)), l)) {
                                var k,
                                    C = p;
                                p = [];
                                for (v = 0; v < C.length; v++)
                                    C[v] != k && p.push(C[v]), (k = C[v]);
                            }
                            e.replaceRange(p.join("\n"), o, h);
                        }
                    }
                    function w(e, t) {
                        var r;
                        a && ((r = e), (e = t), (t = r));
                        s && ((e = e.toLowerCase()), (t = t.toLowerCase()));
                        var n = c && f.exec(e),
                            o = c && f.exec(t);
                        return n
                            ? (n = parseInt((n[1] + n[2]).toLowerCase(), d)) -
                  (o = parseInt((o[1] + o[2]).toLowerCase(), d))
                            : e < t
                                ? -1
                                : 1;
                    }
                },
                global: function (t, e) {
                    var r = e.argString;
                    if (r) {
                        var n,
                            o = void 0 !== e.line ? e.line : t.firstLine(),
                            i = e.lineEnd || e.line || t.lastLine(),
                            a = Se(r, "/"),
                            s = r;
                        if (
                            (a.length && ((s = a[0]), (n = a.slice(1, a.length).join("/"))),
                            s)
                        )
                            try {
                                Ie(t, s, !0, !0);
                            } catch (e) {
                                return void Re(t, "Invalid regex: " + s);
                            }
                        for (var l = Me(t).getQuery(), c = [], u = "", h = o; h <= i; h++) {
                            l.test(t.getLine(h)) &&
                (c.push(h + 1), (u += t.getLine(h) + "<br>"));
                        }
                        if (n) {
                            var p = 0,
                                f = function () {
                                    if (p < c.length) {
                                        var e = c[p] + n;
                                        Ve.processCommand(t, e, { callback: f });
                                    }
                                    p++;
                                };
                            f();
                        } else Re(t, u);
                    } else Re(t, "Regular Expression missing from global");
                },
                substitute: function (t, e) {
                    if (!t.getSearchCursor)
                        throw new Error(
                            "Search feature not available. Requires searchcursor.js or any other getSearchCursor implementation."
                        );
                    var r,
                        n,
                        o,
                        i,
                        a = e.argString,
                        s = a ? Se(a, a[0]) : [],
                        l = "",
                        c = !1,
                        u = !1;
                    if (s.length)
                        (r = s[0]),
                        A("pcre") && "" !== r && (r = new RegExp(r).source),
                        (l = s[1]),
                        r &&
                "$" === r[r.length - 1] &&
                ((r = r.slice(0, r.length - 1) + "\\n"),
                (l = l ? l + "\n" : "\n")),
                        void 0 !== l &&
                ((l = A("pcre")
                    ? (function (e) {
                        for (var t = new Ye.StringStream(e), r = []; !t.eol(); ) {
                            for (; t.peek() && "\\" != t.peek(); ) r.push(t.next());
                            var n = !1;
                            for (var o in Le)
                                if (t.match(o, !0)) {
                                    (n = !0), r.push(Le[o]);
                                    break;
                                }
                            n || r.push(t.next());
                        }
                        return r.join("");
                    })(l.replace(/([^\\])&/g, "$1$$&"))
                    : (function (e) {
                        for (var t, r = !1, n = [], o = -1; o < e.length; o++) {
                            var i = e.charAt(o) || "",
                                a = e.charAt(o + 1) || "";
                            be[i + a]
                                ? (n.push(be[i + a]), o++)
                                : r
                                    ? (n.push(i), (r = !1))
                                    : "\\" === i
                                        ? ((r = !0),
                                        (t = a),
                                        g.test(t) || "$" === a
                                            ? n.push("$")
                                            : "/" !== a && "\\" !== a && n.push("\\"))
                                        : ("$" === i && n.push("$"),
                                        n.push(i),
                                        "/" === a && n.push("\\"));
                        }
                        return n.join("");
                    })(l)),
                (B.lastSubstituteReplacePart = l)),
                        (n = s[2] ? s[2].split(" ") : []);
                    else if (a && a.length)
                        return void Re(
                            t,
                            "Substitutions should be of the form :s/pattern/replace/"
                        );
                    if (
                        (n &&
              ((o = n[0]),
              (i = parseInt(n[1])),
              o &&
                (-1 != o.indexOf("c") && ((c = !0), o.replace("c", "")),
                -1 != o.indexOf("g") && ((u = !0), o.replace("g", "")),
                (r = A("pcre")
                    ? r + "/" + o
                    : r.replace(/\//g, "\\/") + "/" + o))),
                        r)
                    )
                        try {
                            Ie(t, r, !0, !0);
                        } catch (e) {
                            return void Re(t, "Invalid regex: " + r);
                        }
                    if (void 0 !== (l = l || B.lastSubstituteReplacePart)) {
                        var h = Me(t).getQuery(),
                            p = void 0 !== e.line ? e.line : t.getCursor().line,
                            f = e.lineEnd || p;
                        p == t.firstLine() && f == t.lastLine() && (f = 1 / 0),
                        i && (f = (p = f) + i - 1);
                        var d = J(t, nt(p, 0)),
                            m = t.getSearchCursor(h, d);
                        !(function (o, e, n, i, a, s, t, r, l) {
                            o.state.vim.exMode = !0;
                            var c = !1,
                                u = s.from();
                            function h() {
                                o.operation(function () {
                                    for (; !c; ) p(), f();
                                    d();
                                });
                            }
                            function p() {
                                var e = o.getRange(s.from(), s.to()).replace(t, r);
                                s.replace(e);
                            }
                            function f() {
                                for (
                                    ;
                                    s.findNext() &&
                  ((e = s.from()),
                  (t = i),
                  (r = a),
                  "number" != typeof e && (e = e.line),
                  t instanceof Array ? w(e, t) : r ? t <= e && e <= r : e == t);

                                )
                                    if (n || !u || s.from().line != u.line)
                                        return (
                                            o.scrollIntoView(s.from(), 30),
                                            o.setSelection(s.from(), s.to()),
                                            (u = s.from()),
                                            void (c = !1)
                                        );
                                var e, t, r;
                                c = !0;
                            }
                            function d(e) {
                                if ((e && e(), o.focus(), u)) {
                                    o.setCursor(u);
                                    var t = o.state.vim;
                                    (t.exMode = !1), (t.lastHPos = t.lastHSPos = u.ch);
                                }
                                l && l();
                            }
                            if ((f(), c)) return Re(o, "No matches for " + t.source);
                            if (!e) return h(), l && l();
                            Oe(o, {
                                prefix: "replace with <strong>" + r + "</strong> (y/n/a/q/l)",
                                onKeyDown: function (e, t, r) {
                                    switch ((Ye.e_stop(e), Ye.keyName(e))) {
                                    case "Y":
                                        p(), f();
                                        break;
                                    case "N":
                                        f();
                                        break;
                                    case "A":
                                        var n = l;
                                        (l = void 0), o.operation(h), (l = n);
                                        break;
                                    case "L":
                                        p();
                                    case "Q":
                                    case "Esc":
                                    case "Ctrl-C":
                                    case "Ctrl-[":
                                        d(r);
                                    }
                                    return c && d(r), !0;
                                },
                            });
                        })(t, c, u, p, f, m, h, l, e.callback);
                    } else Re(t, "No previous substitute regular expression");
                },
                redo: Ye.commands.redo,
                undo: Ye.commands.undo,
                write: function (e) {
                    Ye.commands.save ? Ye.commands.save(e) : e.save && e.save();
                },
                nohlsearch: function (e) {
                    Pe(e);
                },
                yank: function (e) {
                    var t = X(e.getCursor()).line,
                        r = e.getLine(t);
                    B.registerController.pushText("0", "yank", r, !0, !0);
                },
                delmarks: function (e, t) {
                    if (t.argString && ne(t.argString))
                        for (
                            var r = e.state.vim, n = new Ye.StringStream(ne(t.argString));
                            !n.eol();

                        ) {
                            n.eatSpace();
                            var o = n.pos;
                            if (!n.match(/[a-zA-Z]/, !1))
                                return void Re(
                                    e,
                                    "Invalid argument: " + t.argString.substring(o)
                                );
                            var i = n.next();
                            if (n.match("-", !0)) {
                                if (!n.match(/[a-zA-Z]/, !1))
                                    return void Re(
                                        e,
                                        "Invalid argument: " + t.argString.substring(o)
                                    );
                                var a = i,
                                    s = n.next();
                                if (!((d(a) && d(s)) || (k(a) && k(s))))
                                    return void Re(e, "Invalid argument: " + a + "-");
                                var l = a.charCodeAt(0),
                                    c = s.charCodeAt(0);
                                if (c <= l)
                                    return void Re(
                                        e,
                                        "Invalid argument: " + t.argString.substring(o)
                                    );
                                for (var u = 0; u <= c - l; u++) {
                                    var h = String.fromCharCode(l + u);
                                    delete r.marks[h];
                                }
                            } else delete r.marks[i];
                        }
                    else Re(e, "Argument required");
                },
            },
            Ve = new Fe();
        function De(e) {
            var t = e.state.vim,
                r = B.macroModeState,
                n = B.registerController.getRegister("."),
                o = r.isPlaying,
                i = r.lastInsertModeChanges;
            o || (e.off("change", $e), Ye.off(e.getInputField(), "keydown", Xe)),
            !o &&
          1 < t.insertModeRepeat &&
          (Ze(e, t, t.insertModeRepeat - 1, !0),
          (t.lastEditInputState.repeatOverride = t.insertModeRepeat)),
            delete t.insertModeRepeat,
            (t.insertMode = !1),
            e.setCursor(e.getCursor().line, e.getCursor().ch - 1),
            e.setOption("keyMap", "vim"),
            e.setOption("disableInput", !0),
            e.toggleOverwrite(!1),
            n.setText(i.changes.join("")),
            Ye.signal(e, "vim-mode-change", { mode: "normal" }),
            r.isRecording &&
          (function (e) {
              if (e.isPlaying) return;
              var t = e.latestRegister,
                  r = B.registerController.getRegister(t);
              r &&
              r.pushInsertModeChanges &&
              r.pushInsertModeChanges(e.lastInsertModeChanges);
          })(r);
        }
        function Ue(e) {
            et.unshift(e);
        }
        function Je(e, t, r, n) {
            var o = B.registerController.getRegister(n);
            if (":" == n)
                return (
                    o.keyBuffer[0] && Ve.processCommand(e, o.keyBuffer[0]),
                    void (r.isPlaying = !1)
                );
            var i = o.keyBuffer,
                a = 0;
            (r.isPlaying = !0), (r.replaySearchQueries = o.searchQueries.slice(0));
            for (var s = 0; s < i.length; s++)
                for (var l, c, u = i[s]; u; )
                    if (
                        ((c = (l = /<\w+-.+?>|<\w+>|./.exec(u))[0]),
                        (u = u.substring(l.index + c.length)),
                        Ye.Vim.handleKey(e, c, "macro"),
                        t.insertMode)
                    ) {
                        var h = o.insertModeChanges[a++].changes;
                        Ge(e, (B.macroModeState.lastInsertModeChanges.changes = h), 1),
                        De(e);
                    }
            r.isPlaying = !1;
        }
        function $e(e, t) {
            var r = B.macroModeState,
                n = r.lastInsertModeChanges;
            if (!r.isPlaying)
                for (; t; ) {
                    if (((n.expectCursorActivityForChange = !0), 1 < n.ignoreCount))
                        n.ignoreCount--;
                    else if (
                        "+input" == t.origin ||
            "paste" == t.origin ||
            void 0 === t.origin
                    ) {
                        var o = e.listSelections().length;
                        1 < o && (n.ignoreCount = o);
                        var i = t.text.join("\n");
                        n.maybeReset && ((n.changes = []), (n.maybeReset = !1)),
                        i &&
                (e.state.overwrite && !/\n/.test(i)
                    ? n.changes.push([i])
                    : n.changes.push(i));
                    }
                    t = t.next;
                }
        }
        function qe(e) {
            var t = e.state.vim;
            if (t.insertMode) {
                var r = B.macroModeState;
                if (r.isPlaying) return;
                var n = r.lastInsertModeChanges;
                n.expectCursorActivityForChange
                    ? (n.expectCursorActivityForChange = !1)
                    : (n.maybeReset = !0);
            } else
                e.curOp.isVimOp ||
          (function (e, t) {
              var r = e.getCursor("anchor"),
                  n = e.getCursor("head");
              t.visualMode && !e.somethingSelected()
                  ? ue(e, !1)
                  : t.visualMode ||
                t.insertMode ||
                !e.somethingSelected() ||
                ((t.visualMode = !0),
                (t.visualLine = !1),
                Ye.signal(e, "vim-mode-change", { mode: "visual" }));
              if (t.visualMode) {
                  var o = G(n, r) ? 0 : -1,
                      i = G(n, r) ? -1 : 0;
                  (n = q(n, 0, o)),
                  (r = q(r, 0, i)),
                  (t.sel = { anchor: r, head: n }),
                  ke(e, t, "<", Y(n, r)),
                  ke(e, t, ">", ee(n, r));
              } else t.insertMode || (t.lastHPos = e.getCursor().ch);
          })(e, t);
            t.visualMode && Qe(e);
        }
        function Qe(e) {
            var t = e.state.vim,
                r = J(e, X(t.sel.head)),
                n = q(r, 0, 1);
            t.fakeCursor && t.fakeCursor.clear(),
            (t.fakeCursor = e.markText(r, n, {
                className: "cm-animate-fat-cursor",
            }));
        }
        function ze(e) {
            this.keyName = e;
        }
        function Xe(e) {
            var t = B.macroModeState.lastInsertModeChanges,
                r = Ye.keyName(e);
            r &&
        ((-1 == r.indexOf("Delete") && -1 == r.indexOf("Backspace")) ||
          Ye.lookupKey(r, "vim-insert", function () {
              return (
                  t.maybeReset && ((t.changes = []), (t.maybeReset = !1)),
                  t.changes.push(new ze(r)),
                  !0
              );
          }));
        }
        function Ze(r, n, e, t) {
            var o = B.macroModeState;
            o.isPlaying = !0;
            var i = !!n.lastEditActionCommand,
                a = n.inputState;
            function s() {
                i ? F.processAction(r, n, n.lastEditActionCommand) : F.evalInput(r, n);
            }
            function l(e) {
                if (0 < o.lastInsertModeChanges.changes.length) {
                    e = n.lastEditActionCommand ? e : 1;
                    var t = o.lastInsertModeChanges;
                    Ge(r, t.changes, e);
                }
            }
            if (
                ((n.inputState = n.lastEditInputState),
                i && n.lastEditActionCommand.interlaceInsertRepeat)
            )
                for (var c = 0; c < e; c++) s(), l(1);
            else t || s(), l(e);
            (n.inputState = a), n.insertMode && !t && De(r), (o.isPlaying = !1);
        }
        function Ge(t, e, r) {
            function n(e) {
                return "string" == typeof e ? Ye.commands[e](t) : e(t), !0;
            }
            var o = t.getCursor("head"),
                i = B.macroModeState.lastInsertModeChanges.visualBlock;
            i && (ae(t, o, i + 1), (r = t.listSelections().length), t.setCursor(o));
            for (var a = 0; a < r; a++) {
                i && t.setCursor(q(o, a, 0));
                for (var s = 0; s < e.length; s++) {
                    var l = e[s];
                    if (l instanceof ze) Ye.lookupKey(l.keyName, "vim-insert", n);
                    else if ("string" == typeof l) {
                        var c = t.getCursor();
                        t.replaceRange(l, c, c);
                    } else {
                        var u = t.getCursor(),
                            h = q(u, 0, l[0].length);
                        t.replaceRange(l[0], u, h);
                    }
                }
            }
            i && t.setCursor(q(o, 0, 1));
        }
        return (
            (Ye.keyMap.vim = { attach: o, detach: e, call: t }),
            M("insertModeEscKeysTimeout", 200, "number"),
            (Ye.keyMap["vim-insert"] = {
                fallthrough: ["default"],
                attach: o,
                detach: e,
                call: t,
            }),
            (Ye.keyMap["vim-replace"] = {
                Backspace: "goCharLeft",
                fallthrough: ["vim-insert"],
                attach: o,
                detach: e,
                call: t,
            }),
            O(),
            K
        );
    })();
});
!(function (e) {
    "object" == typeof exports && "object" == typeof module
        ? e(require("../../lib/codemirror"))
        : "function" == typeof define && define.amd
            ? define(["../../lib/codemirror"], e)
            : e(CodeMirror);
})(function (s) {
    function f(e, o, n) {
        var t,
            i = e.getWrapperElement();
        return (
            ((t = i.appendChild(document.createElement("div"))).className = n
                ? "CodeMirror-dialog CodeMirror-dialog-bottom"
                : "CodeMirror-dialog CodeMirror-dialog-top"),
            "string" == typeof o ? (t.innerHTML = o) : t.appendChild(o),
            s.addClass(i, "dialog-opened"),
            t
        );
    }
    function p(e, o) {
        e.state.currentNotificationClose && e.state.currentNotificationClose(),
        (e.state.currentNotificationClose = o);
    }
    s.defineExtension("openDialog", function (e, o, n) {
        (n = n || {}), p(this, null);
        var t = f(this, e, n.bottom),
            i = !1,
            r = this;
        function u(e) {
            if ("string" == typeof e) a.value = e;
            else {
                if (i) return;
                (i = !0),
                s.rmClass(t.parentNode, "dialog-opened"),
                t.parentNode.removeChild(t),
                r.focus(),
                n.onClose && n.onClose(t);
            }
        }
        var l,
            a = t.getElementsByTagName("input")[0];
        return (
            a
                ? (a.focus(),
                n.value &&
            ((a.value = n.value), !1 !== n.selectValueOnOpen && a.select()),
                n.onInput &&
            s.on(a, "input", function (e) {
                n.onInput(e, a.value, u);
            }),
                n.onKeyUp &&
            s.on(a, "keyup", function (e) {
                n.onKeyUp(e, a.value, u);
            }),
                s.on(a, "keydown", function (e) {
                    (n && n.onKeyDown && n.onKeyDown(e, a.value, u)) ||
              ((27 == e.keyCode ||
                (!1 !== n.closeOnEnter && 13 == e.keyCode)) &&
                (a.blur(), s.e_stop(e), u()),
              13 == e.keyCode && o(a.value, e));
                }),
                !1 !== n.closeOnBlur && s.on(a, "blur", u))
                : (l = t.getElementsByTagName("button")[0]) &&
          (s.on(l, "click", function () {
              u(), r.focus();
          }),
          !1 !== n.closeOnBlur && s.on(l, "blur", u),
          l.focus()),
            u
        );
    }),
    s.defineExtension("openConfirm", function (e, o, n) {
        p(this, null);
        var t = f(this, e, n && n.bottom),
            i = t.getElementsByTagName("button"),
            r = !1,
            u = this,
            l = 1;
        function a() {
            r ||
          ((r = !0),
          s.rmClass(t.parentNode, "dialog-opened"),
          t.parentNode.removeChild(t),
          u.focus());
        }
        i[0].focus();
        for (var c = 0; c < i.length; ++c) {
            var d = i[c];
            !(function (o) {
                s.on(d, "click", function (e) {
                    s.e_preventDefault(e), a(), o && o(u);
                });
            })(o[c]),
            s.on(d, "blur", function () {
                --l,
                setTimeout(function () {
                    l <= 0 && a();
                }, 200);
            }),
            s.on(d, "focus", function () {
                ++l;
            });
        }
    }),
    s.defineExtension("openNotification", function (e, o) {
        p(this, u);
        var n,
            t = f(this, e, o && o.bottom),
            i = !1,
            r = o && void 0 !== o.duration ? o.duration : 5e3;
        function u() {
            i ||
          ((i = !0),
          clearTimeout(n),
          s.rmClass(t.parentNode, "dialog-opened"),
          t.parentNode.removeChild(t));
        }
        return (
            s.on(t, "click", function (e) {
                s.e_preventDefault(e), u();
            }),
            r && (n = setTimeout(u, r)),
            u
        );
    });
});
!(function (e) {
    "object" == typeof exports && "object" == typeof module
        ? e(require("../../lib/codemirror"), require("../dialog/dialog"))
        : "function" == typeof define && define.amd
            ? define(["../../lib/codemirror", "../dialog/dialog"], e)
            : e(CodeMirror);
})(function (e) {
    "use strict";
    function u(e, r) {
        var o = Number(r);
        return /^[-+]/.test(r) ? e.getCursor().line + o : o - 1;
    }
    (e.commands.jumpToLine = function (s) {
        var e,
            r,
            o,
            i,
            t,
            n,
            l = s.getCursor();
        (r =
      (n = e = s).phrase("Jump to line:") +
      " <input type=\"text\" style=\"width: 10em\" class=\"CodeMirror-search-field\"/> <span style=\"color: #888\" class=\"CodeMirror-search-hint\">" +
      n.phrase("(Use line:column or scroll% syntax)") +
      "</span>"),
        (o = s.phrase("Jump to line:")),
        (i = l.line + 1 + ":" + l.ch),
        (t = function (e) {
            var r;
            if (e)
                if ((r = /^\s*([\+\-]?\d+)\s*\:\s*(\d+)\s*$/.exec(e)))
                    s.setCursor(u(s, r[1]), Number(r[2]));
                else if ((r = /^\s*([\+\-]?\d+(\.\d+)?)\%\s*/.exec(e))) {
                    var o = Math.round((s.lineCount() * Number(r[1])) / 100);
                    /^[-+]/.test(r[1]) && (o = l.line + o + 1),
                    s.setCursor(o - 1, l.ch);
                } else
                    (r = /^\s*\:?\s*([\+\-]?\d+)\s*/.exec(e)) &&
              s.setCursor(u(s, r[1]), l.ch);
        }),
        e.openDialog
            ? e.openDialog(r, t, { value: i, selectValueOnOpen: !0 })
            : t(prompt(o, i));
    }),
    (e.keyMap.default["Alt-G"] = "jumpToLine");
});
!(function (t) {
    "object" == typeof exports && "object" == typeof module
        ? t(require("../../lib/codemirror"), require("./matchesonscrollbar"))
        : "function" == typeof define && define.amd
            ? define(["../../lib/codemirror", "./matchesonscrollbar"], t)
            : t(CodeMirror);
})(function (n) {
    "use strict";
    var o = {
        style: "matchhighlight",
        minChars: 2,
        delay: 100,
        wordsOnly: !1,
        annotateScrollbar: !1,
        showToken: !1,
        trim: !0,
    };
    function r(t) {
        for (var e in ((this.options = {}), o))
            this.options[e] = (t && t.hasOwnProperty(e) ? t : o)[e];
        (this.overlay = this.timeout = null),
        (this.matchesonscroll = null),
        (this.active = !1);
    }
    function a(t) {
        var e = t.state.matchHighlighter;
        (e.active || t.hasFocus()) && i(t, e);
    }
    function s(t) {
        var e = t.state.matchHighlighter;
        e.active || ((e.active = !0), i(t, e));
    }
    function i(t, e) {
        clearTimeout(e.timeout),
        (e.timeout = setTimeout(function () {
            l(t);
        }, e.options.delay));
    }
    function h(t, e, o, i) {
        var n,
            r,
            a,
            s = t.state.matchHighlighter;
        if (
            (t.addOverlay(
                (s.overlay =
          ((n = e),
          (r = o),
          (a = i),
          {
              token: function (t) {
                  if (
                      t.match(n) &&
                (!r ||
                  ((o = r),
                  !(
                      ((e = t).start && o.test(e.string.charAt(e.start - 1))) ||
                    (e.pos != e.string.length && o.test(e.string.charAt(e.pos)))
                  )))
                  )
                      return a;
                  var e, o;
                  t.next(), t.skipTo(n.charAt(0)) || t.skipToEnd();
              },
          }))
            ),
            s.options.annotateScrollbar && t.showMatchesOnScrollbar)
        ) {
            var l = o
                ? new RegExp("\\b" + e.replace(/[\\\[.+*?(){|^$]/g, "\\$&") + "\\b")
                : e;
            s.matchesonscroll = t.showMatchesOnScrollbar(l, !1, {
                className: "CodeMirror-selection-highlight-scrollbar",
            });
        }
    }
    function u(t) {
        var e = t.state.matchHighlighter;
        e.overlay &&
      (t.removeOverlay(e.overlay),
      (e.overlay = null),
      e.matchesonscroll &&
        (e.matchesonscroll.clear(), (e.matchesonscroll = null)));
    }
    function l(c) {
        c.operation(function () {
            var t = c.state.matchHighlighter;
            if ((u(c), c.somethingSelected() || !t.options.showToken)) {
                var e = c.getCursor("from"),
                    o = c.getCursor("to");
                if (
                    e.line == o.line &&
          (!t.options.wordsOnly ||
            (function (t, e, o) {
                {
                    if (null === t.getRange(e, o).match(/^\w+$/)) return;
                    if (0 < e.ch) {
                        var i = { line: e.line, ch: e.ch - 1 };
                        if (null === t.getRange(i, e).match(/\W/)) return;
                    }
                    if (o.ch < t.getLine(e.line).length) {
                        i = { line: o.line, ch: o.ch + 1 };
                        if (null === t.getRange(o, i).match(/\W/)) return;
                    }
                    return 1;
                }
            })(c, e, o))
                ) {
                    var i = c.getRange(e, o);
                    t.options.trim && (i = i.replace(/^\s+|\s+$/g, "")),
                    i.length >= t.options.minChars && h(c, i, !1, t.options.style);
                }
            } else {
                for (
                    var n = !0 === t.options.showToken ? /[\w$]/ : t.options.showToken,
                        r = c.getCursor(),
                        a = c.getLine(r.line),
                        s = r.ch,
                        l = s;
                    s && n.test(a.charAt(s - 1));

                )
                    --s;
                for (; l < a.length && n.test(a.charAt(l)); ) ++l;
                s < l && h(c, a.slice(s, l), n, t.options.style);
            }
        });
    }
    n.defineOption("highlightSelectionMatches", !1, function (t, e, o) {
        if (
            (o &&
        o != n.Init &&
        (u(t),
        clearTimeout(t.state.matchHighlighter.timeout),
        (t.state.matchHighlighter = null),
        t.off("cursorActivity", a),
        t.off("focus", s)),
            e)
        ) {
            var i = (t.state.matchHighlighter = new r(e));
            t.hasFocus() ? ((i.active = !0), l(t)) : t.on("focus", s),
            t.on("cursorActivity", a);
        }
    });
});
!(function (e) {
    "object" == typeof exports && "object" == typeof module
        ? e(
            require("../../lib/codemirror"),
            require("./searchcursor"),
            require("../dialog/dialog")
        )
        : "function" == typeof define && define.amd
            ? define(["../../lib/codemirror", "./searchcursor", "../dialog/dialog"], e)
            : e(CodeMirror);
})(function (d) {
    "use strict";
    function r() {
        (this.posFrom = this.posTo = this.lastQuery = this.query = null),
        (this.overlay = null);
    }
    function y(e) {
        return e.state.search || (e.state.search = new r());
    }
    function a(e) {
        return "string" == typeof e && e == e.toLowerCase();
    }
    function m(e, r, n) {
        return e.getSearchCursor(r, n, { caseFold: a(r), multiline: !0 });
    }
    function h(e, r, n, o, t) {
        e.openDialog
            ? e.openDialog(r, t, { value: o, selectValueOnOpen: !0 })
            : t(prompt(n, o));
    }
    function o(e) {
        return e.replace(/\\([nrt\\])/g, function (e, r) {
            return "n" == r
                ? "\n"
                : "r" == r
                    ? "\r"
                    : "t" == r
                        ? "\t"
                        : "\\" == r
                            ? "\\"
                            : e;
        });
    }
    function i(e) {
        var r = e.match(/^\/(.*)\/([a-z]*)$/);
        if (r)
            try {
                e = new RegExp(r[1], -1 == r[2].indexOf("i") ? "" : "i");
            } catch (e) {}
        else e = o(e);
        return ("string" == typeof e ? "" == e : e.test("")) && (e = /x^/), e;
    }
    function g(e, r, n) {
        var o, t;
        (r.queryText = n),
        (r.query = i(n)),
        e.removeOverlay(r.overlay, a(r.query)),
        (r.overlay =
        ((o = r.query),
        (t = a(r.query)),
        "string" == typeof o
            ? (o = new RegExp(
                o.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"),
                t ? "gi" : "g"
            ))
            : o.global || (o = new RegExp(o.source, o.ignoreCase ? "gi" : "g")),
        {
            token: function (e) {
                o.lastIndex = e.pos;
                var r = o.exec(e.string);
                if (r && r.index == e.pos)
                    return (e.pos += r[0].length || 1), "searching";
                r ? (e.pos = r.index) : e.skipToEnd();
            },
        })),
        e.addOverlay(r.overlay),
        e.showMatchesOnScrollbar &&
        (r.annotate && (r.annotate.clear(), (r.annotate = null)),
        (r.annotate = e.showMatchesOnScrollbar(r.query, a(r.query))));
    }
    function n(a, r, e, n) {
        var o = y(a);
        if (o.query) return v(a, r);
        var t,
            i,
            s,
            c,
            l,
            u = a.getSelection() || o.lastQuery;
        if (
            (u instanceof RegExp && "x^" == u.source && (u = null), e && a.openDialog)
        ) {
            var f = null,
                p = function (e, r) {
                    d.e_stop(r),
                    e &&
              (e != o.queryText &&
                (g(a, o, e), (o.posFrom = o.posTo = a.getCursor())),
              f && (f.style.opacity = 1),
              v(a, r.shiftKey, function (e, r) {
                  var n;
                  r.line < 3 &&
                  document.querySelector &&
                  (n = a.display.wrapper.querySelector(".CodeMirror-dialog")) &&
                  n.getBoundingClientRect().bottom - 4 >
                    a.cursorCoords(r, "window").top &&
                  ((f = n).style.opacity = 0.4);
              }));
                };
            (i = C((t = a))),
            (s = u),
            (c = p),
            (l = function (e, r) {
                var n = d.keyName(e),
                    o = a.getOption("extraKeys"),
                    t = (o && o[n]) || d.keyMap[a.getOption("keyMap")][n];
                "findNext" == t ||
          "findPrev" == t ||
          "findPersistentNext" == t ||
          "findPersistentPrev" == t
                    ? (d.e_stop(e), g(a, y(a), r), a.execCommand(t))
                    : ("find" != t && "findPersistent" != t) || (d.e_stop(e), p(r, e));
            }),
            t.openDialog(i, c, {
                value: s,
                selectValueOnOpen: !0,
                closeOnEnter: !1,
                onClose: function () {
                    x(t);
                },
                onKeyDown: l,
            }),
            n && u && (g(a, o, u), v(a, r));
        } else
            h(a, C(a), "Search for:", u, function (e) {
                e &&
          !o.query &&
          a.operation(function () {
              g(a, o, e), (o.posFrom = o.posTo = a.getCursor()), v(a, r);
          });
            });
    }
    function v(n, o, t) {
        n.operation(function () {
            var e = y(n),
                r = m(n, e.query, o ? e.posFrom : e.posTo);
            (r.find(o) ||
        (r = m(
            n,
            e.query,
            o ? d.Pos(n.lastLine()) : d.Pos(n.firstLine(), 0)
        )).find(o)) &&
        (n.setSelection(r.from(), r.to()),
        n.scrollIntoView({ from: r.from(), to: r.to() }, 20),
        (e.posFrom = r.from()),
        (e.posTo = r.to()),
        t && t(r.from(), r.to()));
        });
    }
    function x(r) {
        r.operation(function () {
            var e = y(r);
            (e.lastQuery = e.query),
            e.query &&
          ((e.query = e.queryText = null),
          r.removeOverlay(e.overlay),
          e.annotate && (e.annotate.clear(), (e.annotate = null)));
        });
    }
    function C(e) {
        return (
            "<span class=\"CodeMirror-search-label\">" +
      e.phrase("Search:") +
      "</span> <input type=\"text\" style=\"width: 10em\" class=\"CodeMirror-search-field\"/> <span style=\"color: #888\" class=\"CodeMirror-search-hint\">" +
      e.phrase("(Use /re/ syntax for regexp search)") +
      "</span>"
        );
    }
    function q(r, o, t) {
        r.operation(function () {
            for (var e = m(r, o); e.findNext(); )
                if ("string" != typeof o) {
                    var n = r.getRange(e.from(), e.to()).match(o);
                    e.replace(
                        t.replace(/\$(\d)/g, function (e, r) {
                            return n[r];
                        })
                    );
                } else e.replace(t);
        });
    }
    function t(p, e) {
        if (!p.getOption("readOnly")) {
            var r = p.getSelection() || y(p).lastQuery,
                n =
          "<span class=\"CodeMirror-search-label\">" +
          (e ? p.phrase("Replace all:") : p.phrase("Replace:")) +
          "</span>";
            h(
                p,
                n +
          (" <input type=\"text\" style=\"width: 10em\" class=\"CodeMirror-search-field\"/> <span style=\"color: #888\" class=\"CodeMirror-search-hint\">" +
            p.phrase("(Use /re/ syntax for regexp search)") +
            "</span>"),
                n,
                r,
                function (f) {
                    f &&
            ((f = i(f)),
            h(
                p,
                "<span class=\"CodeMirror-search-label\">" +
                p.phrase("With:") +
                "</span> <input type=\"text\" style=\"width: 10em\" class=\"CodeMirror-search-field\"/>",
                p.phrase("Replace with:"),
                "",
                function (s) {
                    if (((s = o(s)), e)) q(p, f, s);
                    else {
                        x(p);
                        var c = m(p, f, p.getCursor("from")),
                            l = function () {
                                var e,
                                    r,
                                    n,
                                    o,
                                    t,
                                    a,
                                    i = c.from();
                                (!(e = c.findNext()) &&
                        ((c = m(p, f)),
                        !(e = c.findNext()) ||
                          (i &&
                            c.from().line == i.line &&
                            c.from().ch == i.ch))) ||
                        (p.setSelection(c.from(), c.to()),
                        p.scrollIntoView({ from: c.from(), to: c.to() }),
                        (n =
                          "<span class=\"CodeMirror-search-label\">" +
                          (a = r = p).phrase("Replace?") +
                          "</span> <button>" +
                          a.phrase("Yes") +
                          "</button> <button>" +
                          a.phrase("No") +
                          "</button> <button>" +
                          a.phrase("All") +
                          "</button> <button>" +
                          a.phrase("Stop") +
                          "</button> "),
                        (o = p.phrase("Replace?")),
                        (t = [
                            function () {
                                u(e);
                            },
                            l,
                            function () {
                                q(p, f, s);
                            },
                        ]),
                        r.openConfirm
                            ? r.openConfirm(n, t)
                            : confirm(o) && t[0]());
                            },
                            u = function (n) {
                                c.replace(
                                    "string" == typeof f
                                        ? s
                                        : s.replace(/\$(\d)/g, function (e, r) {
                                            return n[r];
                                        })
                                ),
                                l();
                            };
                        l();
                    }
                }
            ));
                }
            );
        }
    }
    (d.commands.find = function (e) {
        x(e), n(e);
    }),
    (d.commands.findPersistent = function (e) {
        x(e), n(e, !1, !0);
    }),
    (d.commands.findPersistentNext = function (e) {
        n(e, !1, !0, !0);
    }),
    (d.commands.findPersistentPrev = function (e) {
        n(e, !0, !0, !0);
    }),
    (d.commands.findNext = n),
    (d.commands.findPrev = function (e) {
        n(e, !0);
    }),
    (d.commands.clearSearch = x),
    (d.commands.replace = t),
    (d.commands.replaceAll = function (e) {
        t(e, !0);
    });
});
!(function (t) {
    "object" == typeof exports && "object" == typeof module
        ? t(require("../../lib/codemirror"))
        : "function" == typeof define && define.amd
            ? define(["../../lib/codemirror"], t)
            : t(CodeMirror);
})(function (i) {
    "use strict";
    var p,
        x,
        L = i.Pos;
    function d(t, e) {
        for (
            var n,
                r,
                i =
          null != (r = (n = t).flags)
              ? r
              : (n.ignoreCase ? "i" : "") +
              (n.global ? "g" : "") +
              (n.multiline ? "m" : ""),
                o = i,
                l = 0;
            l < e.length;
            l++
        )
            -1 == o.indexOf(e.charAt(l)) && (o += e.charAt(l));
        return i == o ? t : new RegExp(t.source, o);
    }
    function v(t) {
        return /\\s|\\n|\n|\\W|\\D|\[\^/.test(t.source);
    }
    function m(t, e, n) {
        e = d(e, "g");
        for (var r = n.line, i = n.ch, o = t.lastLine(); r <= o; r++, i = 0) {
            e.lastIndex = i;
            var l = t.getLine(r),
                h = e.exec(l);
            if (h)
                return {
                    from: L(r, h.index),
                    to: L(r, h.index + h[0].length),
                    match: h,
                };
        }
    }
    function C(t, e, n) {
        for (var r, i = 0; i <= t.length; ) {
            e.lastIndex = i;
            var o = e.exec(t);
            if (!o) break;
            var l = o.index + o[0].length;
            if (l > t.length - n) break;
            (!r || l > r.index + r[0].length) && (r = o), (i = o.index + 1);
        }
        return r;
    }
    function O(t, e, n) {
        e = d(e, "g");
        for (var r = n.line, i = n.ch, o = t.firstLine(); o <= r; r--, i = -1) {
            var l = t.getLine(r),
                h = C(l, e, i < 0 ? 0 : l.length - i);
            if (h)
                return {
                    from: L(r, h.index),
                    to: L(r, h.index + h[0].length),
                    match: h,
                };
        }
    }
    function b(t, e, n, r) {
        if (t.length == e.length) return n;
        for (var i = 0, o = n + Math.max(0, t.length - e.length); ; ) {
            if (i == o) return i;
            var l = (i + o) >> 1,
                h = r(t.slice(0, l)).length;
            if (h == n) return l;
            n < h ? (o = l) : (i = 1 + l);
        }
    }
    function r(n, r, t, e) {
        var i;
        (this.atOccurrence = !1),
        (this.doc = n),
        (t = t ? n.clipPos(t) : L(0, 0)),
        (this.pos = { from: t, to: t }),
        "object" == typeof e ? (i = e.caseFold) : ((i = e), (e = null)),
        "string" == typeof r
            ? (null == i && (i = !1),
            (this.matches = function (t, e) {
                return (t
                    ? function (t, e, n, r) {
                        if (!e.length) return null;
                        var i = r ? p : x,
                            o = i(e).split(/\r|\n\r?/);
                        t: for (
                            var l = n.line, h = n.ch, s = t.firstLine() - 1 + o.length;
                            s <= l;
                            l--, h = -1
                        ) {
                            var f = t.getLine(l);
                            -1 < h && (f = f.slice(0, h));
                            var c = i(f);
                            if (1 == o.length) {
                                var u = c.lastIndexOf(o[0]);
                                if (-1 == u) continue t;
                                return {
                                    from: L(l, b(f, c, u, i)),
                                    to: L(l, b(f, c, u + o[0].length, i)),
                                };
                            }
                            var g = o[o.length - 1];
                            if (c.slice(0, g.length) == g) {
                                var a = 1;
                                for (n = l - o.length + 1; a < o.length - 1; a++)
                                    if (i(t.getLine(n + a)) != o[a]) continue t;
                                var m = t.getLine(l + 1 - o.length),
                                    d = i(m);
                                if (d.slice(d.length - o[0].length) == o[0])
                                    return {
                                        from: L(
                                            l + 1 - o.length,
                                            b(m, d, m.length - o[0].length, i)
                                        ),
                                        to: L(l, b(f, c, g.length, i)),
                                    };
                            }
                        }
                    }
                    : function (t, e, n, r) {
                        if (!e.length) return null;
                        var i = r ? p : x,
                            o = i(e).split(/\r|\n\r?/);
                        t: for (
                            var l = n.line, h = n.ch, s = t.lastLine() + 1 - o.length;
                            l <= s;
                            l++, h = 0
                        ) {
                            var f = t.getLine(l).slice(h),
                                c = i(f);
                            if (1 == o.length) {
                                var u = c.indexOf(o[0]);
                                if (-1 == u) continue t;
                                n = b(f, c, u, i) + h;
                                return {
                                    from: L(l, b(f, c, u, i) + h),
                                    to: L(l, b(f, c, u + o[0].length, i) + h),
                                };
                            }
                            var g = c.length - o[0].length;
                            if (c.slice(g) == o[0]) {
                                for (var a = 1; a < o.length - 1; a++)
                                    if (i(t.getLine(l + a)) != o[a]) continue t;
                                var m = t.getLine(l + o.length - 1),
                                    d = i(m),
                                    v = o[o.length - 1];
                                if (d.slice(0, v.length) == v)
                                    return {
                                        from: L(l, b(f, c, g, i) + h),
                                        to: L(l + o.length - 1, b(m, d, v.length, i)),
                                    };
                            }
                        }
                    })(n, r, e, i);
            }))
            : ((r = d(r, "gm")),
            e && !1 === e.multiline
                ? (this.matches = function (t, e) {
                    return (t ? O : m)(n, r, e);
                })
                : (this.matches = function (t, e) {
                    return (t
                        ? function (t, e, n) {
                            if (!v(e)) return O(t, e, n);
                            e = d(e, "gm");
                            for (
                                var r,
                                    i = 1,
                                    o = t.getLine(n.line).length - n.ch,
                                    l = n.line,
                                    h = t.firstLine();
                                h <= l;

                            ) {
                                for (var s = 0; s < i && h <= l; s++) {
                                    var f = t.getLine(l--);
                                    r = null == r ? f : f + "\n" + r;
                                }
                                i *= 2;
                                var c = C(r, e, o);
                                if (c) {
                                    var u = r.slice(0, c.index).split("\n"),
                                        g = c[0].split("\n"),
                                        a = l + u.length,
                                        m = u[u.length - 1].length;
                                    return {
                                        from: L(a, m),
                                        to: L(
                                            a + g.length - 1,
                                            1 == g.length
                                                ? m + g[0].length
                                                : g[g.length - 1].length
                                        ),
                                        match: c,
                                    };
                                }
                            }
                        }
                        : function (t, e, n) {
                            if (!v(e)) return m(t, e, n);
                            e = d(e, "gm");
                            for (
                                var r, i = 1, o = n.line, l = t.lastLine();
                                o <= l;

                            ) {
                                for (var h = 0; h < i && !(l < o); h++) {
                                    var s = t.getLine(o++);
                                    r = null == r ? s : r + "\n" + s;
                                }
                                (i *= 2), (e.lastIndex = n.ch);
                                var f = e.exec(r);
                                if (f) {
                                    var c = r.slice(0, f.index).split("\n"),
                                        u = f[0].split("\n"),
                                        g = n.line + c.length - 1,
                                        a = c[c.length - 1].length;
                                    return {
                                        from: L(g, a),
                                        to: L(
                                            g + u.length - 1,
                                            1 == u.length
                                                ? a + u[0].length
                                                : u[u.length - 1].length
                                        ),
                                        match: f,
                                    };
                                }
                            }
                        })(n, r, e);
                }));
    }
    (x = String.prototype.normalize
        ? ((p = function (t) {
            return t.normalize("NFD").toLowerCase();
        }),
        function (t) {
            return t.normalize("NFD");
        })
        : ((p = function (t) {
            return t.toLowerCase();
        }),
        function (t) {
            return t;
        })),
    (r.prototype = {
        findNext: function () {
            return this.find(!1);
        },
        findPrevious: function () {
            return this.find(!0);
        },
        find: function (t) {
            for (
                var e = this.matches(
                    t,
                    this.doc.clipPos(t ? this.pos.from : this.pos.to)
                );
                e && 0 == i.cmpPos(e.from, e.to);

            )
                t
                    ? e.from.ch
                        ? (e.from = L(e.from.line, e.from.ch - 1))
                        : (e =
                  e.from.line == this.doc.firstLine()
                      ? null
                      : this.matches(t, this.doc.clipPos(L(e.from.line - 1))))
                    : e.to.ch < this.doc.getLine(e.to.line).length
                        ? (e.to = L(e.to.line, e.to.ch + 1))
                        : (e =
                e.to.line == this.doc.lastLine()
                    ? null
                    : this.matches(t, L(e.to.line + 1, 0)));
            if (e)
                return (this.pos = e), (this.atOccurrence = !0), this.pos.match || !0;
            var n = L(t ? this.doc.firstLine() : this.doc.lastLine() + 1, 0);
            return (this.pos = { from: n, to: n }), (this.atOccurrence = !1);
        },
        from: function () {
            if (this.atOccurrence) return this.pos.from;
        },
        to: function () {
            if (this.atOccurrence) return this.pos.to;
        },
        replace: function (t, e) {
            if (this.atOccurrence) {
                var n = i.splitLines(t);
                this.doc.replaceRange(n, this.pos.from, this.pos.to, e),
                (this.pos.to = L(
                    this.pos.from.line + n.length - 1,
                    n[n.length - 1].length + (1 == n.length ? this.pos.from.ch : 0)
                ));
            }
        },
    }),
    i.defineExtension("getSearchCursor", function (t, e, n) {
        return new r(this.doc, t, e, n);
    }),
    i.defineDocExtension("getSearchCursor", function (t, e, n) {
        return new r(this, t, e, n);
    }),
    i.defineExtension("selectMatches", function (t, e) {
        for (
            var n = [], r = this.getSearchCursor(t, this.getCursor("from"), e);
            r.findNext() && !(0 < i.cmpPos(r.to(), this.getCursor("to")));

        )
            n.push({ anchor: r.from(), head: r.to() });
        n.length && this.setSelections(n, 0);
    });
});
