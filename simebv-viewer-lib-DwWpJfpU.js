var Bt = Object.defineProperty;
var Ye = s => {
    throw TypeError(s)
};
var Mt = (s, i, e) => i in s ? Bt(s, i, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: e
}) : s[i] = e;
var M = (s, i, e) => Mt(s, typeof i != "symbol" ? i + "" : i, e),
    Oe = (s, i, e) => i.has(s) || Ye("Cannot " + e);
var l = (s, i, e) => (Oe(s, i, "read from private field"), e ? e.call(s) : i.get(s)),
    x = (s, i, e) => i.has(s) ? Ye("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(s) : i.set(s, e),
    E = (s, i, e, t) => (Oe(s, i, "write to private field"), t ? t.call(s, e) : i.set(s, e), e),
    y = (s, i, e) => (Oe(s, i, "access private method"), e);
var we = (s, i, e, t) => ({
    set _(n) {
        E(s, i, n, e)
    },
    get _() {
        return l(s, i, t)
    }
});
const Nt = function() {
    const i = typeof document < "u" && document.createElement("link").relList;
    return i && i.supports && i.supports("modulepreload") ? "modulepreload" : "preload"
}();
const Rt = function(s, i) {
    return new URL(s, i).href
}, et = {}, B = function(i, e, t) {
    let n = Promise.resolve();
    if (e && e.length > 0) {
        let o = function(c) {
            return Promise.all(c.map(u => Promise.resolve(u).then(b => ({
                status: "fulfilled",
                value: b
            }), b => ({
                status: "rejected",
                reason: b
            }))))
        };
        const a = document.getElementsByTagName("link"),
            d = document.querySelector("meta[property=csp-nonce]"),
            h = (d == null ? void 0 : d.nonce) || (d == null ? void 0 : d.getAttribute("nonce"));
        n = o(e.map(c => {
            if (c = Rt(c, t), c in et) return;
            et[c] = !0;
            const u = c.endsWith(".css"),
                b = u ? '[rel="stylesheet"]' : "";
            if (!!t)
                for (let m = a.length - 1; m >= 0; m--) {
                    const p = a[m];
                    if (p.href === c && (!u || p.rel === "stylesheet")) return
                } else if (document.querySelector(`link[href="${c}"]${b}`)) return;
            const v = document.createElement("link");
            if (v.rel = u ? "stylesheet" : Nt, u || (v.as = "script"), v.crossOrigin = "", v.href = c, h && v.setAttribute("nonce", h), document.head.appendChild(v), u) return new Promise((m, p) => {
                v.addEventListener("load", m), v.addEventListener("error", () => p(new Error(`Unable to preload CSS for ${c}`)))
            })
        }))
    }

    function r(o) {
        const a = new Event("vite:preloadError", {
            cancelable: !0
        });
        if (a.payload = o, window.dispatchEvent(a), !a.defaultPrevented) throw o
    }
    return n.then(o => {
        for (const a of o || []) a.status === "rejected" && r(a.reason);
        return i().catch(r)
    })
}, $t = (s, i) => s.map((e, t, n) => i(e, t, n) ? t : null).filter(e => e != null),
    ct = (s, i) => [-1, ...i, s.length].reduce(({
        xs: e,
        a: t
    }, n) => ({
        xs: (e == null ? void 0 : e.concat([s.slice(t + 1, n)])) ?? [],
        a: n
    }), {}).xs,
    Ot = (s, i) => s.slice(0, -1).concat([s[s.length - 1].concat(i[0])]).concat(i.slice(1)),
    qe = /\d/,
    Ce = /^epubcfi\((.*)\)$/,
    tt = s => s.replace(/[\^[\](),;=]/g, "^$&"),
    dt = s => Ce.test(s) ? s : `epubcfi(${s})`,
    qt = s => {
        var i;
        return ((i = s.match(Ce)) == null ? void 0 : i[1]) ?? s
    },
    Vt = s => (...i) => `epubcfi(${s(...i.map(e => {
        var t;
        return ((t = e.match(Ce)) == null ? void 0 : t[1]) ?? e
    }))})`,
    ht = Vt((...s) => s.join("!")),
    jt = s => {
        const i = [];
        let e, t, n = "";
        const r = a => (i.push(a), e = null, n = ""),
            o = a => (n += a, t = !1);
        for (const a of Array.from(s.trim()).concat("")) {
            if (a === "^" && !t) {
                t = !0;
                continue
            }
            if (e === "!") r(["!"]);
            else if (e === ",") r([","]);
            else if (e === "/" || e === ":")
                if (qe.test(a)) {
                    o(a);
                    continue
                } else r([e, parseInt(n)]);
            else if (e === "~")
                if (qe.test(a) || a === ".") {
                    o(a);
                    continue
                } else r(["~", parseFloat(n)]);
            else if (e === "@") {
                if (a === ":") {
                    r(["@", parseFloat(n)]), e = "@";
                    continue
                }
                if (qe.test(a) || a === ".") {
                    o(a);
                    continue
                } else r(["@", parseFloat(n)])
            } else if (e === "[") {
                a === ";" && !t ? (r(["[", n]), e = ";") : a === "," && !t ? (r(["[", n]), e = "[") : a === "]" && !t ? r(["[", n]) : o(a);
                continue
            }(a === "/" || a === ":" || a === "~" || a === "@" || a === "[" || a === "!" || a === ",") && (e = a)
        }
        return i
    },
    ut = (s, i) => $t(s, ([e]) => e === i),
    Ht = s => {
        const i = [];
        let e;
        for (const [t, n] of s) {
            if (t === "/") i.push({
                index: n
            });
            else {
                const r = i[i.length - 1];
                if (t === ":") r.offset = n;
                else if (t === "~") r.temporal = n;
                else if (t === "@") r.spatial = (r.spatial ?? []).concat(n);
                else if (t === ";s") r.side = n;
                else if (t === "[")
                    if (e === "/" && n) r.id = n;
                    else {
                        r.text = (r.text ?? []).concat(n);
                        continue
                    }
            }
            e = t
        }
        return i
    },
    it = s => ct(s, ut(s, "!")).map(Ht),
    Ae = s => {
        const i = jt(qt(s)),
            e = ut(i, ",");
        if (!e.length) return it(i);
        const [t, n, r] = ct(i, e).map(it);
        return {
            parent: t,
            start: n,
            end: r
        }
    },
    Ut = ({
        index: s,
        id: i,
        offset: e,
        temporal: t,
        spatial: n,
        text: r,
        side: o
    }) => {
        var d;
        const a = o ? `;s=${o}` : "";
        return `/${s}` + (i ? `[${tt(i)}${a}]` : "") + (e != null && s % 2 ? `:${e}` : "") + (t ? `~${t}` : "") + (n ? `@${n.join(":")}` : "") + (r || !i && o ? "[" + (((d = r == null ? void 0 : r.map(tt)) == null ? void 0 : d.join(",")) ?? "") + a + "]" : "")
    },
    mt = s => s.parent ? [s.parent, s.start, s.end].map(mt).join(",") : s.map(i => i.map(Ut).join("")).join("!"),
    Re = s => dt(mt(s)),
    he = (s, i) => typeof s == "string" ? Re(he(Ae(s), i)) : s.parent ? Ot(s.parent, s[i ? "end" : "start"]) : s,
    bt = (s, i) => {
        typeof s == "string" && (s = Ae(s)), typeof i == "string" && (i = Ae(i)), s = he(s), i = he(i, !0);
        const e = s[s.length - 1],
            t = i[i.length - 1],
            n = [],
            r = [],
            o = [];
        let a = !0;
        const d = Math.max(e.length, t.length);
        for (let c = 0; c < d; c++) {
            const u = e[c],
                b = t[c];
            a && (a = (u == null ? void 0 : u.index) === (b == null ? void 0 : b.index) && !(u != null && u.offset) && !(b != null && b.offset)), a ? n.push(u) : (u && r.push(u), b && o.push(b))
        }
        const h = s.slice(0, -1).concat([n]);
        return Re({
            parent: h,
            start: [r],
            end: [o]
        })
    },
    Ve = ({
        nodeType: s
    }) => s === 3 || s === 4,
    _e = ({
        nodeType: s
    }) => s === 1,
    pt = (s, i) => {
        const e = Array.from(s.childNodes).filter(t => Ve(t) || _e(t));
        return i ? e.map(t => {
            const n = i(t);
            return n === NodeFilter.FILTER_REJECT ? null : n === NodeFilter.FILTER_SKIP ? pt(t, i) : t
        }).flat().filter(t => t) : e
    },
    Xe = (s, i) => {
        const e = pt(s, i).reduce((t, n) => {
            let r = t[t.length - 1];
            return r ? Ve(n) ? Array.isArray(r) ? r.push(n) : Ve(r) ? t[t.length - 1] = [r, n] : t.push(n) : _e(r) ? t.push(null, n) : t.push(n) : t.push(n), t
        }, []);
        return _e(e[0]) && e.unshift("first"), _e(e[e.length - 1]) && e.push("last"), e.unshift("before"), e.push("after"), e
    },
    je = (s, i, e) => {
        const {
            id: t
        } = i[i.length - 1];
        if (t) {
            const o = s.ownerDocument.getElementById(t);
            if (o) return {
                node: o,
                offset: 0
            }
        }
        for (const {
                index: o
            } of i) {
            const a = s ? Xe(s, e)[o] : null;
            if (a === "first") return {
                node: s.firstChild ?? s
            };
            if (a === "last") return {
                node: s.lastChild ?? s
            };
            if (a === "before") return {
                node: s,
                before: !0
            };
            if (a === "after") return {
                node: s,
                after: !0
            };
            s = a
        }
        const {
            offset: n
        } = i[i.length - 1];
        if (!Array.isArray(s)) return {
            node: s,
            offset: n
        };
        let r = 0;
        for (const o of s) {
            const {
                length: a
            } = o.nodeValue;
            if (r + a >= n) return {
                node: o,
                offset: n - r
            };
            r += a
        }
    },
    ze = (s, i, e) => {
        const {
            parentNode: t,
            id: n
        } = s,
            r = Xe(t, e),
            o = r.findIndex(h => Array.isArray(h) ? h.some(c => c === s) : h === s),
            a = r[o];
        if (Array.isArray(a)) {
            let h = 0;
            for (const c of a)
                if (c === s) {
                    h += i;
                    break
                } else h += c.nodeValue.length;
            i = h
        }
        const d = {
            id: n,
            index: o,
            offset: i
        };
        return (t !== s.ownerDocument.documentElement ? ze(t, null, e).concat(d) : [d]).filter(h => h.index !== -1)
    },
    vt = (s, i) => {
        const {
            startContainer: e,
            startOffset: t,
            endContainer: n,
            endOffset: r
        } = s,
            o = ze(e, t, i);
        if (s.collapsed) return Re([o]);
        const a = ze(n, r, i);
        return bt([o], [a])
    },
    gt = (s, i, e) => {
        const t = he(i),
            n = he(i, !0),
            r = s.documentElement,
            o = je(r, t[0], e),
            a = je(r, n[0], e),
            d = s.createRange();
        return o.before ? d.setStartBefore(o.node) : o.after ? d.setStartAfter(o.node) : d.setStart(o.node, o.offset), a.before ? d.setEndBefore(a.node) : a.after ? d.setEndAfter(a.node) : d.setEnd(a.node, a.offset), d
    },
    Wt = s => {
        const i = [],
            {
                parentNode: e
            } = s[0],
            t = ze(e);
        for (const [n, r] of Xe(e).entries()) {
            const o = s[i.length];
            r === o && i.push(Re([t.concat({
                id: o.id,
                index: n
            })]))
        }
        return i
    },
    Gt = (s, i) => je(s.documentElement, he(i)).node,
    De = {
        fromIndex: s => dt(`/6/${(s+1)*2}`),
        toIndex: s => (s == null ? void 0 : s.at(-1).index) / 2 - 1
    },
    Jt = ({
        spine_index: s,
        start_cfi: i,
        end_cfi: e
    }) => {
        const t = De.fromIndex(s) + "!";
        return bt(t + i.slice(2), t + e.slice(2))
    },
    Kt = Object.freeze(Object.defineProperty({
        __proto__: null,
        collapse: he,
        fake: De,
        fromCalibreHighlight: Jt,
        fromElements: Wt,
        fromRange: vt,
        isCFI: Ce,
        joinIndir: ht,
        parse: Ae,
        toElement: Gt,
        toRange: gt
    }, Symbol.toStringTag, {
        value: "Module"
    })),
    Zt = s => {
        let i = 0;
        const e = t => {
            if (t.id = i++, t.subitems)
                for (const n of t.subitems) e(n)
        };
        for (const t of s) e(t);
        return s
    },
    ft = s => s.map(i => {
        var e;
        return (e = i.subitems) != null && e.length ? [i, ft(i.subitems)].flat() : i
    }).flat();
class nt {
    async init({
        toc: i,
        ids: e,
        splitHref: t,
        getFragment: n
    }) {
        Zt(i);
        const r = ft(i),
            o = new Map;
        for (const [d, h] of r.entries()) {
            const [c, u] = await t(h == null ? void 0 : h.href) ?? [],
                b = {
                    fragment: u,
                    item: h
                };
            o.has(c) ? o.get(c).items.push(b) : o.set(c, {
                prev: r[d - 1],
                items: [b]
            })
        }
        const a = new Map;
        for (const [d, h] of e.entries()) o.has(h) ? a.set(h, o.get(h)) : a.set(h, a.get(e[d - 1]));
        this.ids = e, this.map = a, this.getFragment = n
    }
    getProgress(i, e) {
        var d;
        if (!this.ids) return;
        const t = this.ids[i],
            n = this.map.get(t);
        if (!n) return null;
        const {
            prev: r,
            items: o
        } = n;
        if (!o) return r;
        if (!e || o.length === 1 && !o[0].fragment) return o[0].item;
        const a = e.startContainer.getRootNode();
        for (const [h, {
                fragment: c
            }] of o.entries()) {
            const u = this.getFragment(a, c);
            if (u && e.comparePoint(u, 0) > 0) return ((d = o[h - 1]) == null ? void 0 : d.item) ?? r
        }
        return o[o.length - 1].item
    }
}
var Be, wt;
class Xt {
    constructor(i, e, t) {
        x(this, Be);
        this.sizes = i.map(n => n.linear != "no" && n.size > 0 ? n.size : 0), this.sizePerLoc = e, this.sizePerTimeUnit = t, this.sizeTotal = this.sizes.reduce((n, r) => n + r, 0), this.sectionFractions = y(this, Be, wt).call(this)
    }
    getProgress(i, e, t = 0) {
        const {
            sizes: n,
            sizePerLoc: r,
            sizePerTimeUnit: o,
            sizeTotal: a
        } = this,
            d = n[i] ?? 0,
            c = n.slice(0, i).reduce((v, m) => v + m, 0) + e * d,
            u = c + t * d,
            b = a - c,
            g = (1 - e) * d;
        return {
            fraction: u / a,
            section: {
                current: i,
                total: n.length
            },
            location: {
                current: Math.floor(c / r),
                next: Math.floor(u / r),
                total: Math.ceil(a / r)
            },
            time: {
                section: g / o,
                total: b / o
            }
        }
    }
    getSection(i) {
        if (i <= 0) return [0, 0];
        if (i >= 1) return [this.sizes.length - 1, 1];
        i = i + Number.EPSILON;
        const {
            sizeTotal: e
        } = this;
        let t = this.sectionFractions.findIndex(r => r > i) - 1;
        if (t < 0) return [0, 0];
        for (; !this.sizes[t];) t++;
        const n = (i - this.sectionFractions[t]) / (this.sizes[t] / e);
        return [t, n]
    }
}
Be = new WeakSet, wt = function() {
    const {
        sizeTotal: i
    } = this, e = [0];
    let t = 0;
    for (const n of this.sizes) e.push((t += n) / i);
    return e
};
const P = s => document.createElementNS("http://www.w3.org/2000/svg", s);
var J, K;
class He {
    constructor() {
        x(this, J, P("svg"));
        x(this, K, new Map);
        Object.assign(l(this, J).style, {
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            pointerEvents: "none"
        })
    }
    get element() {
        return l(this, J)
    }
    add(i, e, t, n) {
        l(this, K).has(i) && this.remove(i), typeof e == "function" && (e = e(l(this, J).getRootNode()));
        const r = e.getClientRects(),
            o = t(r, n);
        l(this, J).append(o), l(this, K).set(i, {
            range: e,
            draw: t,
            options: n,
            element: o,
            rects: r
        })
    }
    remove(i) {
        l(this, K).has(i) && (l(this, J).removeChild(l(this, K).get(i).element), l(this, K).delete(i))
    }
    redraw() {
        for (const i of l(this, K).values()) {
            const {
                range: e,
                draw: t,
                options: n,
                element: r
            } = i;
            l(this, J).removeChild(r);
            const o = e.getClientRects(),
                a = t(o, n);
            l(this, J).append(a), i.element = a, i.rects = o
        }
    }
    hitTest({
        x: i,
        y: e
    }) {
        const t = Array.from(l(this, K).entries());
        for (let n = t.length - 1; n >= 0; n--) {
            const [r, o] = t[n];
            for (const {
                    left: a,
                    top: d,
                    right: h,
                    bottom: c
                } of o.rects)
                if (d <= e && a <= i && c > e && h > i) return [r, o.range]
        }
        return []
    }
    static underline(i, e = {}) {
        const {
            color: t = "red",
            width: n = 2,
            writingMode: r
        } = e, o = P("g");
        if (o.setAttribute("fill", t), r === "vertical-rl" || r === "vertical-lr")
            for (const {
                    right: a,
                    top: d,
                    height: h
                } of i) {
                const c = P("rect");
                c.setAttribute("x", a - n), c.setAttribute("y", d), c.setAttribute("height", h), c.setAttribute("width", n), o.append(c)
            } else
                for (const {
                        left: a,
                        bottom: d,
                        width: h
                    } of i) {
                    const c = P("rect");
                    c.setAttribute("x", a), c.setAttribute("y", d - n), c.setAttribute("height", n), c.setAttribute("width", h), o.append(c)
                }
        return o
    }
    static strikethrough(i, e = {}) {
        const {
            color: t = "red",
            width: n = 2,
            writingMode: r
        } = e, o = P("g");
        if (o.setAttribute("fill", t), r === "vertical-rl" || r === "vertical-lr")
            for (const {
                    right: a,
                    left: d,
                    top: h,
                    height: c
                } of i) {
                const u = P("rect");
                u.setAttribute("x", (a + d) / 2), u.setAttribute("y", h), u.setAttribute("height", c), u.setAttribute("width", n), o.append(u)
            } else
                for (const {
                        left: a,
                        top: d,
                        bottom: h,
                        width: c
                    } of i) {
                    const u = P("rect");
                    u.setAttribute("x", a), u.setAttribute("y", (d + h) / 2), u.setAttribute("height", n), u.setAttribute("width", c), o.append(u)
                }
        return o
    }
    static squiggly(i, e = {}) {
        const {
            color: t = "red",
            width: n = 2,
            writingMode: r
        } = e, o = P("g");
        o.setAttribute("fill", "none"), o.setAttribute("stroke", t), o.setAttribute("stroke-width", n);
        const a = n * 1.5;
        if (r === "vertical-rl" || r === "vertical-lr")
            for (const {
                    right: d,
                    top: h,
                    height: c
                } of i) {
                const u = P("path"),
                    b = Math.round(c / a / 1.5),
                    g = c / b,
                    v = Array.from({
                        length: b
                    }, (m, p) => `l${p%2?-a:a} ${g}`).join("");
                u.setAttribute("d", `M${d} ${h}${v}`), o.append(u)
            } else
            for (const {
                    left: d,
                    bottom: h,
                    width: c
                } of i) {
                const u = P("path"),
                    b = Math.round(c / a / 1.5),
                    g = c / b,
                    v = Array.from({
                        length: b
                    }, (m, p) => `l${g} ${p%2?a:-a}`).join("");
                u.setAttribute("d", `M${d} ${h}${v}`), o.append(u)
            }
        return o
    }
    static highlight(i, e = {}) {
        const {
            color: t = "red"
        } = e, n = P("g");
        n.setAttribute("fill", t), n.style.opacity = "var(--overlayer-highlight-opacity, .3)", n.style.mixBlendMode = "var(--overlayer-highlight-blend-mode, normal)";
        for (const {
                left: r,
                top: o,
                height: a,
                width: d
            } of i) {
            const h = P("rect");
            h.setAttribute("x", r), h.setAttribute("y", o), h.setAttribute("height", a), h.setAttribute("width", d), n.append(h)
        }
        return n
    }
    static outline(i, e = {}) {
        const {
            color: t = "red",
            width: n = 3,
            radius: r = 3
        } = e, o = P("g");
        o.setAttribute("fill", "none"), o.setAttribute("stroke", t), o.setAttribute("stroke-width", n);
        for (const {
                left: a,
                top: d,
                height: h,
                width: c
            } of i) {
            const u = P("rect");
            u.setAttribute("x", a), u.setAttribute("y", d), u.setAttribute("height", h), u.setAttribute("width", c), u.setAttribute("rx", r), o.append(u)
        }
        return o
    }
    static copyImage([i], e = {}) {
        const {
            src: t
        } = e, n = P("image"), {
            left: r,
            top: o,
            height: a,
            width: d
        } = i;
        return n.setAttribute("href", t), n.setAttribute("x", r), n.setAttribute("y", o), n.setAttribute("height", a), n.setAttribute("width", d), n
    }
}
J = new WeakMap, K = new WeakMap;
const Qt = (s, i) => {
        const e = [];
        for (let t = i.currentNode; t; t = i.nextNode()) {
            const n = s.comparePoint(t, 0);
            if (n === 0) e.push(t);
            else if (n > 0) break
        }
        return e
    },
    Yt = (s, i) => {
        const e = [];
        for (let t = i.nextNode(); t; t = i.nextNode()) e.push(t);
        return e
    },
    ei = NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_CDATA_SECTION,
    ti = s => {
        if (s.nodeType === 1) {
            const i = s.tagName.toLowerCase();
            return i === "script" || i === "style" ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_SKIP
        }
        return NodeFilter.FILTER_ACCEPT
    },
    st = function*(s, i) {
        const e = s.commonAncestorContainer ?? s.body ?? s,
            t = document.createTreeWalker(e, ei, {
                acceptNode: ti
            }),
            r = (s.commonAncestorContainer ? Qt : Yt)(s, t),
            o = r.map(d => d.nodeValue),
            a = (d, h, c, u) => {
                const b = document.createRange();
                return b.setStart(r[d], h), b.setEnd(r[c], u), b
            };
        for (const d of i(o, a)) yield d
    },
    ye = "foliate-search:",
    ii = async s => {
        const i = new Uint8Array(await s.slice(0, 4).arrayBuffer());
        return i[0] === 80 && i[1] === 75 && i[2] === 3 && i[3] === 4
    },
    ni = async s => {
        const i = new Uint8Array(await s.slice(0, 5).arrayBuffer());
        return i[0] === 37 && i[1] === 80 && i[2] === 68 && i[3] === 70 && i[4] === 45
    },
    si = ({
        name: s,
        type: i
    }) => i === "application/vnd.comicbook+zip" || s.endsWith(".cbz"),
    ri = ({
        name: s,
        type: i
    }) => i === "application/x-fictionbook+xml" || s.endsWith(".fb2"),
    oi = ({
        name: s,
        type: i
    }) => i === "application/x-zip-compressed-fb2" || s.endsWith(".fb2.zip") || s.endsWith(".fbz"),
    ai = async s => {
        const {
            configure: i,
            ZipReader: e,
            BlobReader: t,
            TextWriter: n,
            BlobWriter: r
        } = await B(async () => {
            const {
                configure: g,
                ZipReader: v,
                BlobReader: m,
                TextWriter: p,
                BlobWriter: f
            } = await import("./zip-w4eY6XnM.js");
            return {
                configure: g,
                ZipReader: v,
                BlobReader: m,
                TextWriter: p,
                BlobWriter: f
            }
        }, [], import.meta.url);
        i({
            useWebWorkers: !1
        });
        const a = await new e(new t(s)).getEntries(),
            d = new Map(a.map(g => [g.filename, g])),
            h = g => (v, ...m) => d.has(v) ? g(d.get(v), ...m) : null,
            c = h(g => g.getData(new n)),
            u = h((g, v) => g.getData(new r(v)));
        return {
            entries: a,
            loadText: c,
            loadBlob: u,
            getSize: g => {
                var v;
                return ((v = d.get(g)) == null ? void 0 : v.uncompressedSize) ?? 0
            }
        }
    },
    yt = async s => s.isFile ? s : (await Promise.all(Array.from(await new Promise((i, e) => s.createReader().readEntries(t => i(t), t => e(t))), yt))).flat(),
    li = async s => {
        const i = await yt(s),
            e = await Promise.all(i.map(c => new Promise((u, b) => c.file(g => u([g, c.fullPath]), g => b(g))))),
            t = new Map(e.map(([c, u]) => [u.replace(s.fullPath + "/", ""), c])),
            n = new TextDecoder,
            r = c => c ? n.decode(c) : null,
            o = c => {
                var u;
                return ((u = t.get(c)) == null ? void 0 : u.arrayBuffer()) ?? null
            };
        return {
            loadText: async c => r(await o(c)),
            loadBlob: c => t.get(c),
            getSize: c => {
                var u;
                return ((u = t.get(c)) == null ? void 0 : u.size) ?? 0
            }
        }
    };
class ci extends Error {}
class di extends Error {}
class hi extends Error {}
const ui = async s => {
        const i = await fetch(s);
        if (!i.ok) throw new ci(`${i.status} ${i.statusText}`, {
            cause: i
        });
        return new File([await i.blob()], new URL(i.url).pathname)
    },
    mi = async s => {
        typeof s == "string" && (s = await ui(s));
        let i;
        if (s.isDirectory) {
            const e = await li(s),
                {
                    EPUB: t
                } = await B(async () => {
                    const {
                        EPUB: n
                    } = await import("./epub-BQqBxsAu.js");
                    return {
                        EPUB: n
                    }
                }, [], import.meta.url);
            i = await new t(e).init()
        } else if (s.size)
            if (await ii(s)) {
                const e = await ai(s);
                if (si(s)) {
                    const {
                        makeComicBook: t
                    } = await B(async () => {
                        const {
                            makeComicBook: n
                        } = await import("./comic-book-CNy7_Hja.js");
                        return {
                            makeComicBook: n
                        }
                    }, [], import.meta.url);
                    i = t(e, s)
                } else if (oi(s)) {
                    const {
                        makeFB2: t
                    } = await B(async () => {
                        const {
                            makeFB2: a
                        } = await import("./fb2-DoA4UCCO.js");
                        return {
                            makeFB2: a
                        }
                    }, [], import.meta.url), {
                        entries: n
                    } = e, r = n.find(a => a.filename.endsWith(".fb2")), o = await e.loadBlob((r ?? n[0]).filename);
                    i = await t(o)
                } else {
                    const {
                        EPUB: t
                    } = await B(async () => {
                        const {
                            EPUB: n
                        } = await import("./epub-BQqBxsAu.js");
                        return {
                            EPUB: n
                        }
                    }, [], import.meta.url);
                    i = await new t(e).init()
                }
            } else if (await ni(s)) {
            const {
                makePDF: e
            } = await B(async () => {
                const {
                    makePDF: t
                } = await import("./pdf-Z5ZBySEz.js").then(n => n.a);
                return {
                    makePDF: t
                }
            }, [], import.meta.url);
            i = await e(s)
        } else {
            const {
                isMOBI: e,
                MOBI: t
            } = await B(async () => {
                const {
                    isMOBI: n,
                    MOBI: r
                } = await import("./mobi-CUP3Mkj_.js");
                return {
                    isMOBI: n,
                    MOBI: r
                }
            }, [], import.meta.url);
            if (await e(s)) {
                const n = await B(() => import("./fflate-Bye76UFF.js"), [], import.meta.url);
                i = await new t({
                    unzlib: n.unzlibSync
                }).open(s)
            } else if (ri(s)) {
                const {
                    makeFB2: n
                } = await B(async () => {
                    const {
                        makeFB2: r
                    } = await import("./fb2-DoA4UCCO.js");
                    return {
                        makeFB2: r
                    }
                }, [], import.meta.url);
                i = await n(s)
            }
        } else throw new di("File not found");
        if (!i) throw new hi("File type not supported");
        return i
    };
var pe, ce, Se, $;
const Qe = class Qe {
    constructor(i, e, t = {}) {
        x(this, pe);
        x(this, ce);
        x(this, Se);
        x(this, $);
        E(this, ce, i), E(this, Se, e), E(this, $, t), l(this, $).hidden && this.hide(), l(this, ce).addEventListener("mousemove", ({
            screenX: n,
            screenY: r
        }) => {
            n === l(this, $).x && r === l(this, $).y || (l(this, $).x = n, l(this, $).y = r, this.show(), l(this, pe) && clearTimeout(l(this, pe)), e() && E(this, pe, setTimeout(this.hide.bind(this), 1e3)))
        }, !1)
    }
    cloneFor(i) {
        return new Qe(i, l(this, Se), l(this, $))
    }
    hide() {
        l(this, ce).style.cursor = "none", l(this, $).hidden = !0
    }
    show() {
        l(this, ce).style.removeProperty("cursor"), l(this, $).hidden = !1
    }
};
pe = new WeakMap, ce = new WeakMap, Se = new WeakMap, $ = new WeakMap;
let Ue = Qe;
var O, D;
class bi extends EventTarget {
    constructor() {
        super(...arguments);
        x(this, O, []);
        x(this, D, -1)
    }
    pushState(e) {
        const t = l(this, O)[l(this, D)];
        t === e || t != null && t.fraction && t.fraction === e.fraction || (l(this, O)[++we(this, D)._] = e, l(this, O).length = l(this, D) + 1, this.dispatchEvent(new Event("index-change")))
    }
    replaceState(e) {
        const t = l(this, D);
        l(this, O)[t] = e
    }
    back() {
        const e = l(this, D);
        if (e <= 0) return;
        const t = {
            state: l(this, O)[e - 1]
        };
        E(this, D, e - 1), this.dispatchEvent(new CustomEvent("popstate", {
            detail: t
        })), this.dispatchEvent(new Event("index-change"))
    }
    forward() {
        const e = l(this, D);
        if (e >= l(this, O).length - 1) return;
        const t = {
            state: l(this, O)[e + 1]
        };
        E(this, D, e + 1), this.dispatchEvent(new CustomEvent("popstate", {
            detail: t
        })), this.dispatchEvent(new Event("index-change"))
    }
    get canGoBack() {
        return l(this, D) > 0
    }
    get canGoForward() {
        return l(this, D) < l(this, O).length - 1
    }
    clear() {
        E(this, O, []), E(this, D, -1)
    }
}
O = new WeakMap, D = new WeakMap;
const pi = s => {
    var i, e;
    if (!s) return {};
    try {
        const t = Intl.getCanonicalLocales(s)[0],
            n = new Intl.Locale(t),
            r = ["zh", "ja", "kr"].includes(n.language),
            o = (e = ((i = n.getTextInfo) == null ? void 0 : i.call(n)) ?? n.textInfo) == null ? void 0 : e.direction;
        return {
            canonical: t,
            locale: n,
            isCJK: r,
            direction: o
        }
    } catch (t) {
        return console.warn(t), {}
    }
};
var Me, Y, U, re, ee, Ne, F, Q, xt, kt, Et, Pe, Lt, At, St;
class vi extends HTMLElement {
    constructor() {
        super();
        x(this, F);
        x(this, Me, this.attachShadow({
            mode: "closed"
        }));
        x(this, Y);
        x(this, U);
        x(this, re);
        x(this, ee, new Map);
        x(this, Ne, new Ue(this, () => this.hasAttribute("autohide-cursor")));
        M(this, "isFixedLayout", !1);
        M(this, "lastLocation");
        M(this, "history", new bi);
        this.history.addEventListener("popstate", ({
            detail: e
        }) => {
            const t = this.resolveNavigation(e.state);
            this.renderer.goTo(t)
        })
    }
    async open(e) {
        var t, n;
        if ((typeof e == "string" || typeof e.arrayBuffer == "function" || e.isDirectory) && (e = await mi(e)), this.book = e, this.language = pi((t = e.metadata) == null ? void 0 : t.language), e.splitTOCHref && e.getTOCFragment) {
            const r = e.sections.map(d => d.id);
            E(this, Y, new Xt(e.sections, 1500, 1600));
            const o = e.splitTOCHref.bind(e),
                a = e.getTOCFragment.bind(e);
            E(this, U, new nt), await l(this, U).init({
                toc: e.toc ?? [],
                ids: r,
                splitHref: o,
                getFragment: a
            }), E(this, re, new nt), await l(this, re).init({
                toc: e.pageList ?? [],
                ids: r,
                splitHref: o,
                getFragment: a
            })
        }
        if (this.isFixedLayout = ((n = this.book.rendition) == null ? void 0 : n.layout) === "pre-paginated", this.isFixedLayout ? (await B(() => import("./fixed-layout-CEdlqyLS.js"), [], import.meta.url), this.renderer = document.createElement("foliate-fxl")) : (await B(() => import("./paginator-DQoPXZqM.js"), [], import.meta.url), this.renderer = document.createElement("foliate-paginator")), this.renderer.setAttribute("exportparts", "head,foot,filter"), this.renderer.addEventListener("load", r => y(this, F, kt).call(this, r.detail)), this.renderer.addEventListener("relocate", r => y(this, F, xt).call(this, r.detail)), this.renderer.addEventListener("create-overlayer", r => r.detail.attach(y(this, F, Lt).call(this, r.detail))), this.renderer.open(e), l(this, Me).append(this.renderer), e.sections.some(r => r.mediaOverlay)) {
            const r = e.media.activeClass,
                o = e.media.playbackActiveClass;
            this.mediaOverlay = e.getMediaOverlay();
            let a;
            this.mediaOverlay.addEventListener("highlight", d => {
                const h = this.resolveNavigation(d.detail.text);
                this.renderer.goTo(h).then(() => {
                    const {
                        doc: c
                    } = this.renderer.getContents().find(b => b.index = h.index),
                        u = h.anchor(c);
                    u.classList.add(r), o && u.ownerDocument.documentElement.classList.add(o), a = new WeakRef(u)
                })
            }), this.mediaOverlay.addEventListener("unhighlight", () => {
                const d = a == null ? void 0 : a.deref();
                d && (d.classList.remove(r), o && d.ownerDocument.documentElement.classList.remove(o))
            })
        }
    }
    close() {
        var e, t;
        (e = this.renderer) == null || e.destroy(), (t = this.renderer) == null || t.remove(), E(this, Y, null), E(this, U, null), E(this, re, null), E(this, ee, new Map), this.lastLocation = null, this.history.clear(), this.tts = null, this.mediaOverlay = null
    }
    goToTextStart() {
        var e, t;
        return this.goTo(((t = (e = this.book.landmarks) == null ? void 0 : e.find(n => n.type.includes("bodymatter") || n.type.includes("text"))) == null ? void 0 : t.href) ?? this.book.sections.findIndex(n => n.linear !== "no"))
    }
    async init({
        lastLocation: e,
        showTextStart: t
    }) {
        const n = e ? this.resolveNavigation(e) : null;
        n ? (await this.renderer.goTo(n), this.history.pushState(e)) : t ? await this.goToTextStart() : (this.history.pushState(0), await this.next())
    }
    async addAnnotation(e, t) {
        var h;
        const {
            value: n
        } = e;
        if (n.startsWith(ye)) {
            const c = n.replace(ye, ""),
                {
                    index: u,
                    anchor: b
                } = await this.resolveNavigation(c),
                g = y(this, F, Pe).call(this, u);
            if (g) {
                const {
                    overlayer: v,
                    doc: m
                } = g;
                if (t) {
                    v.remove(n);
                    return
                }
                const p = m ? b(m) : b;
                v.add(n, p, He.outline)
            }
            return
        }
        const {
            index: r,
            anchor: o
        } = await this.resolveNavigation(n), a = y(this, F, Pe).call(this, r);
        if (a) {
            const {
                overlayer: c,
                doc: u
            } = a;
            if (c.remove(n), !t) {
                const b = u ? o(u) : o,
                    g = (v, m) => c.add(n, b, v, m);
                y(this, F, Q).call(this, "draw-annotation", {
                    draw: g,
                    annotation: e,
                    doc: u,
                    range: b
                })
            }
        }
        const d = ((h = l(this, U).getProgress(r)) == null ? void 0 : h.label) ?? "";
        return {
            index: r,
            label: d
        }
    }
    deleteAnnotation(e) {
        return this.addAnnotation(e, !0)
    }
    async showAnnotation(e) {
        const {
            value: t
        } = e, n = await this.goTo(t);
        if (n) {
            const {
                index: r,
                anchor: o
            } = n, {
                doc: a
            } = y(this, F, Pe).call(this, r), d = o(a);
            y(this, F, Q).call(this, "show-annotation", {
                value: t,
                index: r,
                range: d
            })
        }
    }
    getCFI(e, t) {
        const n = this.book.sections[e].cfi ?? De.fromIndex(e);
        return t ? ht(n, vt(t)) : n
    }
    resolveCFI(e) {
        if (this.book.resolveCFI) return this.book.resolveCFI(e); {
            const t = Ae(e);
            return {
                index: De.toIndex((t.parent ?? t).shift()),
                anchor: o => gt(o, t)
            }
        }
    }
    resolveNavigation(e) {
        try {
            if (typeof e == "number") return {
                index: e
            };
            if (typeof e.fraction == "number") {
                const [t, n] = l(this, Y).getSection(e.fraction);
                return {
                    index: t,
                    anchor: n
                }
            }
            return Ce.test(e) ? this.resolveCFI(e) : this.book.resolveHref(e)
        } catch (t) {
            console.error(t), console.error(`Could not resolve target ${e}`)
        }
    }
    async goTo(e) {
        const t = this.resolveNavigation(e);
        try {
            return await this.renderer.goTo(t), this.history.pushState(e), t
        } catch (n) {
            console.error(n), console.error(`Could not go to ${e}`)
        }
    }
    async goToFraction(e) {
        const [t, n] = l(this, Y).getSection(e);
        await this.renderer.goTo({
            index: t,
            anchor: n
        }), this.history.pushState({
            fraction: e
        })
    }
    async select(e) {
        try {
            const t = await this.resolveNavigation(e);
            await this.renderer.goTo({ ...t,
                select: !0
            }), this.history.pushState(e)
        } catch (t) {
            console.error(t), console.error(`Could not go to ${e}`)
        }
    }
    deselect() {
        for (const {
                doc: e
            } of this.renderer.getContents()) e.defaultView.getSelection().removeAllRanges()
    }
    getSectionFractions() {
        var e;
        return (((e = l(this, Y)) == null ? void 0 : e.sectionFractions) ?? []).map(t => t + Number.EPSILON)
    }
    getProgressOf(e, t) {
        var o, a;
        const n = (o = l(this, U)) == null ? void 0 : o.getProgress(e, t),
            r = (a = l(this, re)) == null ? void 0 : a.getProgress(e, t);
        return {
            tocItem: n,
            pageItem: r
        }
    }
    async getTOCItemOf(e) {
        try {
            const {
                index: t,
                anchor: n
            } = await this.resolveNavigation(e), r = await this.book.sections[t].createDocument(), o = n(r), a = o instanceof Range, d = a ? o : r.createRange();
            return a || d.selectNodeContents(o), l(this, U).getProgress(t, d)
        } catch (t) {
            console.error(t), console.error(`Could not get ${e}`)
        }
    }
    async prev(e) {
        await this.renderer.prev(e)
    }
    async next(e) {
        await this.renderer.next(e)
    }
    goLeft() {
        return this.book.dir === "rtl" ? this.next() : this.prev()
    }
    goRight() {
        return this.book.dir === "rtl" ? this.prev() : this.next()
    }
    async* search(e) {
        var h;
        this.clearSearch();
        const {
            searchMatcher: t
        } = await B(async () => {
            const {
                searchMatcher: c
            } = await import("./search-CeeluKVp.js");
            return {
                searchMatcher: c
            }
        }, [], import.meta.url), {
            query: n,
            index: r
        } = e, o = t(st, {
            defaultLocale: this.language,
            ...e
        }), a = r != null ? y(this, F, At).call(this, o, n, r) : y(this, F, St).call(this, o, n), d = [];
        l(this, ee).set(r, d);
        for await (const c of a)
            if (c.subitems) {
                const u = c.subitems.map(({
                    cfi: b
                }) => ({
                    value: ye + b
                }));
                l(this, ee).set(c.index, u);
                for (const b of u) this.addAnnotation(b);
                yield {
                    label: ((h = l(this, U).getProgress(c.index)) == null ? void 0 : h.label) ?? "",
                    subitems: c.subitems
                }
            } else {
                if (c.cfi) {
                    const u = {
                        value: ye + c.cfi
                    };
                    d.push(u), this.addAnnotation(u)
                }
                yield c
            } yield "done"
    }
    clearSearch() {
        for (const e of l(this, ee).values())
            for (const t of e) this.deleteAnnotation(t);
        l(this, ee).clear()
    }
    async initTTS(e = "word") {
        const t = this.renderer.getContents()[0].doc;
        if (this.tts && this.tts.doc === t) return;
        const {
            TTS: n
        } = await B(async () => {
            const {
                TTS: r
            } = await import("./tts-DmfHnK0f.js");
            return {
                TTS: r
            }
        }, [], import.meta.url);
        this.tts = new n(t, st, r => this.renderer.scrollToAnchor(r, !0), e)
    }
    startMediaOverlay() {
        const {
            index: e
        } = this.renderer.getContents()[0];
        return this.mediaOverlay.start(e)
    }
}
Me = new WeakMap, Y = new WeakMap, U = new WeakMap, re = new WeakMap, ee = new WeakMap, Ne = new WeakMap, F = new WeakSet, Q = function(e, t, n) {
    return this.dispatchEvent(new CustomEvent(e, {
        detail: t,
        cancelable: n
    }))
}, xt = function({
    reason: e,
    range: t,
    index: n,
    fraction: r,
    size: o
}) {
    var u, b, g;
    const a = ((u = l(this, Y)) == null ? void 0 : u.getProgress(n, r, o)) ?? {},
        d = (b = l(this, U)) == null ? void 0 : b.getProgress(n, t),
        h = (g = l(this, re)) == null ? void 0 : g.getProgress(n, t),
        c = this.getCFI(n, t);
    this.lastLocation = { ...a,
        tocItem: d,
        pageItem: h,
        cfi: c,
        range: t
    }, (e === "snap" || e === "page" || e === "scroll") && this.history.replaceState(c), y(this, F, Q).call(this, "relocate", this.lastLocation)
}, kt = function({
    doc: e,
    index: t
}) {
    var n, r;
    (n = e.documentElement).lang || (n.lang = this.language.canonical ?? ""), this.language.isCJK || (r = e.documentElement).dir || (r.dir = this.language.direction ?? ""), y(this, F, Et).call(this, e, t), l(this, Ne).cloneFor(e.documentElement), y(this, F, Q).call(this, "load", {
        doc: e,
        index: t
    })
}, Et = function(e, t) {
    const {
        book: n
    } = this, r = n.sections[t];
    e.addEventListener("click", o => {
        var c, u;
        const a = o.target.closest("a[href]");
        if (!a) return;
        o.preventDefault();
        const d = a.getAttribute("href"),
            h = ((c = r == null ? void 0 : r.resolveHref) == null ? void 0 : c.call(r, d)) ?? d;
        (u = n == null ? void 0 : n.isExternal) != null && u.call(n, h) ? Promise.resolve(y(this, F, Q).call(this, "external-link", {
            a,
            href: h
        }, !0)).then(b => b ? globalThis.open(h, "_blank") : null).catch(b => console.error(b)) : Promise.resolve(y(this, F, Q).call(this, "link", {
            a,
            href: h
        }, !0)).then(b => b ? this.goTo(h) : null).catch(b => console.error(b))
    })
}, Pe = function(e) {
    return this.renderer.getContents().find(t => t.index === e && t.overlayer)
}, Lt = function({
    doc: e,
    index: t
}) {
    const n = new He;
    e.addEventListener("click", o => {
        const [a, d] = n.hitTest(o);
        a && !a.startsWith(ye) && y(this, F, Q).call(this, "show-annotation", {
            value: a,
            index: t,
            range: d
        })
    }, !1);
    const r = l(this, ee).get(t);
    if (r)
        for (const o of r) this.addAnnotation(o);
    return y(this, F, Q).call(this, "create-overlay", {
        index: t
    }), n
}, At = async function*(e, t, n) {
    const r = await this.book.sections[n].createDocument();
    for (const {
            range: o,
            excerpt: a
        } of e(r, t)) yield {
        cfi: this.getCFI(n, o),
        excerpt: a
    }
}, St = async function*(e, t) {
    const {
        sections: n
    } = this.book;
    for (const [r, {
            createDocument: o
        }] of n.entries()) {
        if (!o) continue;
        const a = await o(),
            d = Array.from(e(a, t), ({
                range: c,
                excerpt: u
            }) => ({
                cfi: this.getCFI(r, c),
                excerpt: u
            }));
        yield {
            progress: (r + 1) / n.length
        }, d.length && (yield {
            index: r,
            subitems: d
        })
    }
};
customElements.define("foliate-view", vi);
const rt = s => document.createElementNS("http://www.w3.org/2000/svg", s),
    gi = () => {
        const s = rt("svg");
        s.setAttribute("viewBox", "0 0 13 10"), s.setAttribute("width", "13"), s.setAttribute("height", "13");
        const i = rt("polygon");
        return i.setAttribute("points", "2 1, 12 1, 7 9"), s.append(i), s
    },
    fi = (s, i, e) => {
        let t = 0;
        const n = () => `toc-element-${t++}`,
            r = ({
                label: o,
                href: a,
                subitems: d
            }, h = 0) => {
                const c = document.createElement(a ? "a" : "span");
                c.innerText = o, c.setAttribute("role", "treeitem"), c.tabIndex = -1, c.style.paddingInlineStart = `${(h+1)*24}px`, s.push(c), a ? (i.has(a) || i.set(a, c), c.href = a, c.onclick = b => {
                    b.preventDefault(), e(a)
                }) : c.onclick = b => {
                    var g;
                    return (g = c.firstElementChild) == null ? void 0 : g.onclick(b)
                };
                const u = document.createElement("li");
                if (u.setAttribute("role", "none"), u.append(c), d != null && d.length) {
                    c.setAttribute("aria-expanded", "false");
                    const b = gi();
                    b.onclick = v => {
                        v.preventDefault(), v.stopPropagation();
                        const m = c.getAttribute("aria-expanded");
                        c.setAttribute("aria-expanded", m === "true" ? "false" : "true")
                    }, c.prepend(b);
                    const g = document.createElement("ol");
                    g.id = n(), g.setAttribute("role", "group"), c.setAttribute("aria-owns", g.id), g.replaceChildren(...d.map(v => r(v, h + 1))), u.append(g)
                }
                return u
            };
        return r
    },
    wi = (s, i) => {
        const e = document.createElement("ol");
        e.setAttribute("role", "tree");
        const t = [],
            n = new Map,
            r = fi(t, n, i);
        e.replaceChildren(...s.map(m => r(m)));
        const o = m => (m == null ? void 0 : m.getAttribute("role")) === "treeitem",
            a = function*(m) {
                for (let p = m.parentNode; p !== e; p = p.parentNode) {
                    const f = p.previousElementSibling;
                    o(f) && (yield f)
                }
            };
        let d, h;
        e.addEventListener("focusout", () => {
            if (d) {
                if (h && (h.tabIndex = -1), d.offsetParent) {
                    d.tabIndex = 0;
                    return
                }
                for (const m of a(d))
                    if (m.offsetParent) {
                        m.tabIndex = 0, h = m;
                        break
                    }
            }
        });
        const c = m => {
            d && (d.removeAttribute("aria-current"), d.tabIndex = -1);
            const p = n.get(m);
            if (!p) {
                d = t[0], d.tabIndex = 0;
                return
            }
            for (const f of a(p)) f.setAttribute("aria-expanded", "true");
            p.setAttribute("aria-current", "page"), p.tabIndex = 0, d = p
        }, u = () => d,
            b = m => o(m) && m.offsetParent ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP,
            g = document.createTreeWalker(e, 1, {
                acceptNode: b
            }),
            v = m => (g.currentNode = m, g);
        for (const m of t) m.addEventListener("keydown", p => {
            var I, C, L, _, j, ue;
            let f = !1;
            const {
                currentTarget: w,
                key: S
            } = p;
            switch (S) {
                case " ":
                case "Enter":
                    w.click(), f = !0;
                    break;
                case "ArrowDown":
                    (I = v(w).nextNode()) == null || I.focus(), f = !0;
                    break;
                case "ArrowUp":
                    (C = v(w).previousNode()) == null || C.focus(), f = !0;
                    break;
                case "ArrowLeft":
                    w.getAttribute("aria-expanded") === "true" ? w.setAttribute("aria-expanded", "false") : (_ = (L = a(w).next()) == null ? void 0 : L.value) == null || _.focus(), f = !0;
                    break;
                case "ArrowRight":
                    w.getAttribute("aria-expanded") === "true" ? (j = v(w).nextNode()) == null || j.focus() : w.getAttribute("aria-owns") && w.setAttribute("aria-expanded", "true"), f = !0;
                    break;
                case "Home":
                    t[0].focus(), f = !0;
                    break;
                case "End":
                    {
                        const le = t[t.length - 1];le.offsetParent ? le.focus() : (ue = v(le).previousNode()) == null || ue.focus(), f = !0;
                        break
                    }
            }
            f && (p.preventDefault(), p.stopPropagation())
        });
        return {
            element: e,
            setCurrentHref: c,
            getCurrentItem: u
        }
    },
    yi = (s, i, e, t, n) => {
        const r = document.createElement("fieldset"),
            o = document.createElement("legend");
        o.innerText = s;
        const a = document.createElement("ul");
        a.setAttribute("role", "presentation"), n && a.classList.add("simebv-horizontal");
        const d = new Map;
        let h;
        const c = () => h,
            u = p => {
                if (r.getAttribute("aria-disabled") === "true") return;
                h = p;
                const f = d.get(p);
                for (const w of a.children) w.setAttribute("aria-checked", w === f ? "true" : "false");
                e(p)
            },
            b = p => {
                p === !1 ? r.setAttribute("aria-disabled", "true") : r.removeAttribute("aria-disabled")
            },
            g = p => {
                p === !1 ? r.style.display = "none" : r.style.display = null
            },
            v = [],
            m = t ?? (p => v.includes(p));
        for (const [p, f] of i) {
            const w = document.createElement("li");
            w.setAttribute("role", "menuitemradio"), w.innerText = p;
            let S;
            if (typeof f == "string" || typeof f == "number") S = f;
            else {
                const {
                    val: I,
                    type: C,
                    attrs: L,
                    onchange: _,
                    prefix: j = "",
                    suffix: ue = "",
                    labelID: le
                } = f, $e = document.createElement("span");
                L.id && ($e.id = L.id + "-container");
                const fe = document.createElement("input");
                fe.type = C;
                for (const [zt, Dt] of Object.entries(L)) fe.setAttribute(zt, Dt);
                fe.onchange = _, le && (w.id = le, fe.setAttribute("aria-labelledby", le)), $e.append(j, fe, ue), w.append($e), S = I
            }
            w.onclick = () => u(S), w.onkeydown = I => {
                I.key === " " && u(S)
            }, d.set(S, w), v.push(S), a.append(w)
        }
        return r.append(o, a), {
            element: r,
            select: u,
            enable: b,
            validate: m,
            current: c,
            visible: g
        }
    },
    xi = (s, i, e, t, n, ...r) => {
        const o = document.createElement("p");
        if (o.innerText = s, o.setAttribute("role", "menuitem"), n)
            for (const [h, c] of n) o.setAttribute(h, c);
        if (o.onclick = () => e(...r), t || (t = document.createElement("fieldset"), t.append(o)), i) {
            const h = document.createElement("span");
            h.innerText = i, h.classList.add("simebv-menu-shortcut"), o.append(h)
        }
        return {
            element: t,
            enable: h => {
                h === !1 ? t.setAttribute("aria-disabled", "true") : t.removeAttribute("aria-disabled")
            },
            visible: h => {
                h === !1 ? t.style.display = "none" : t.style.display = null
            }
        }
    },
    ki = (s, i) => {
        const e = document.createElement("fieldset"),
            t = {
                element: e,
                items: {}
            },
            n = document.createElement("legend");
        n.innerText = s;
        const r = document.createElement("ul");
        r.setAttribute("role", "presentation"), e.append(n, r);
        for (const o of i) {
            const a = document.createElement("li");
            a.setAttribute("role", "menuitem"), a.innerText = o.label, o.classList && a.classList.add(...o.classList), a.onclick = () => o.onclick();
            const d = () => a.click(),
                h = c => {
                    c === !1 ? a.setAttribute("aria-disabled", "true") : a.removeAttribute("aria-disabled")
                };
            t.items[o.name] = {
                element: a,
                select: d,
                enable: h
            }, r.append(a)
        }
        return t.enable = o => {
            o === !1 ? e.setAttribute("aria-disabled", "true") : e.removeAttribute("aria-disabled")
        }, t.visible = o => {
            o === !1 ? e.style.display = "none" : e.style.display = null
        }, t
    },
    Ei = s => {
        const i = {},
            e = document.createElement("ul");
        e.setAttribute("role", "menu");
        let t, n;
        e.show = v => {
            e.classList.add("simebv-show");
            const m = e.querySelector("[role^=menuitem]");
            m.tabIndex = 0, m.focus(), t = m, v && (n = v)
        }, e.hide = () => {
            e.classList.remove("simebv-show"), t && (t.tabIndex = -1), n && (n.focus(), n = void 0);
            const v = new CustomEvent("closeMenu", {
                bubbles: !0
            });
            e.dispatchEvent(v)
        };
        const r = v => (...m) => (e.hide(), v(...m)),
            o = (v, m) => {
                v.tabIndex = -1, m.tabIndex = 0;
                const p = m.querySelector("input");
                p ? p.focus() : m.focus(), t = m
            };
        e.addEventListener("click", v => v.stopPropagation());
        for (const {
                name: v,
                label: m,
                type: p,
                items: f,
                onclick: w,
                onvalidate: S,
                horizontal: I,
                shortcut: C,
                attrs: L
            } of s) {
            let _;
            switch (p) {
                case "radio":
                    _ = yi(m, f, w, S, I);
                    break;
                case "action":
                    _ = xi(m, C, r(w), void 0, L);
                    break;
                case "group":
                    _ = ki(m, f);
                    break;
            }
            v && (i[v] = _);
            const j = document.createElement("li");
            j.setAttribute("role", "presentation"), j.append(_.element), e.append(j);
        }
        const a = v => ["menuitem", "menuitemradio", "menuitemcheckbox"].includes(v.getAttribute("role")),
            d = v => !(v.getAttribute("disabled") || v.getAttribute("aria-disabled") === "true" || v.parentElement.getAttribute("disabled") || v.parentElement.getAttribute("aria-disabled") === "true"),
            h = v => {
                let m = v;
                for (; m && m !== e;) {
                    const p = globalThis.getComputedStyle(m);
                    if (p.display === "none" || p.visibility === "hidden" || parseFloat(p.opacity) === 0) return !1;
                    m = m.parentElement;
                }
                return !0;
            },
            c = v => a(v) && h(v) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP,
            u = document.createTreeWalker(e, 1, {
                acceptNode: c
            }),
            b = v => (u.currentNode = v, u),
            g = Array.from(e.querySelectorAll("[role^=menuitem]") || []);
        for (const v of g) v.addEventListener("keydown", m => {
            var S, I;
            let p = !1;
            const {
                currentTarget: f,
                key: w
            } = m;
            switch (w) {
                case " ":
                case "Enter":
                    d(f) && (f.click(), p = !0);
                    break;
                case "ArrowDown":
                    {
                        const L = b(f).nextNode();L && o(f, L), p = !0;
                        break;
                    }
                case "ArrowUp":
                    {
                        const L = b(f).previousNode();L && o(f, L), p = !0;
                        break;
                    }
                case "ArrowLeft":
                    {
                        const L = b(f).previousNode();L && f.parentElement.classList.contains("simebv-horizontal") && f.parentElement === ((S = f.previousSibling) == null ? void 0 : S.parentElement) && o(f, L), p = !0;
                        break;
                    }
                case "ArrowRight":
                    {
                        const L = b(f).nextNode();L && f.parentElement.classList.contains("simebv-horizontal") && f.parentElement === ((I = f.nextSibling) == null ? void 0 : I.parentElement) && o(f, L), p = !0;
                        break;
                    }
                case "Home":
                    let C = b(f).previousNode();
                    for (; C;) {
                        let L = b(C).previousNode();
                        if (L) C = L;
                        else break;
                    }
                    C && o(f, C), p = !0;
                    break;
                case "End":
                    {
                        let L = b(f).nextNode();
                        for (; L;) {
                            let _ = b(L).nextNode();
                            if (_) L = _;
                            else break;
                        }
                        L && o(f, L), p = !0;
                        break;
                    }
            }
            p && (m.preventDefault(), m.stopPropagation());
        });
        return {
            element: e,
            groups: i
        };
    };

function xe(s) {
    let i;
    try {
        i = window[s];
        const e = "__storage_test__";
        return i.setItem(e, e), i.removeItem(e), !0;
    } catch (e) {
        return e instanceof DOMException && e.name === "QuotaExceededError" && i && i.length !== 0;
    }
}


// Li and Ai functions are temporarily bypassed to check for font loading issues
// If font issues are resolved, we will re-evaluate how to implement user-select/copy prevention
function Li(s, i) {
    try {
        let e;
        typeof s == "string" ? e = new DOMParser().parseFromString(s, i) : e = s;

        // 1. Add CSS to disable text selection & right-click
        const style = e.createElement("style");
        style.textContent = `
            * {
                user-select: none !important;
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                pointer-events: none !important; /* Blocks all mouse events */
            }
            body, html {
                cursor: default !important;
            }
        `;
        e.head.appendChild(style);

        // 2. Add JavaScript to block right-click & keyboard shortcuts
        const script = e.createElement("script");
        script.textContent = `
            // Block right-click globally
            document.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                return false;
            }, { capture: true }); // "capture: true" ensures it blocks at the earliest phase

            // Block Ctrl+C, Ctrl+X, Ctrl+V
            document.addEventListener("keydown", (e) => {
                if (e.ctrlKey && ["c", "x", "v"].includes(e.key.toLowerCase())) {
                    e.preventDefault();
                    return false;
                }
            }, { passive: false });

            // Force-disable text selection (extra protection)
            document.addEventListener("selectstart", (e) => {
                e.preventDefault();
                return false;
            });
        `;
        e.head.appendChild(script);

        return e.documentElement.outerHTML;
    } catch (e) {
        console.error("Error in Li function:", e);
        return s;
    }
}

document.getElementById("simebv-reader-container")?.addEventListener(
    "contextmenu",
    (e) => e.preventDefault(),
    { capture: true }
);

function Ai(s, i) {
    try {
        let e;
        // Script removal is commented out to test if it's interfering with font loading.
        return typeof s == "string" ? e = new DOMParser().parseFromString(s, i) : e = s, /* e.querySelectorAll("script").forEach(t => t.remove()), */ e.documentElement.outerHTML;
    } catch (e) {
        console.error(e);
    }
    return s;
}

function Ie(s) {
    return parseFloat(s) === Number(s)
}
const {
    __: ke,
    _x: Ri,
    _n: $i,
    sprintf: Oi
} = wp.i18n;

function Si(s, i, e, t, n) {
    const r = document.createElement("dialog"),
        o = document.createElement("input");
    o.id = "simebv-search-input", o.type = "search", o.setAttribute("aria-label", ke("Search", "simple-ebook-viewer")), o.setAttribute("placeholder", ke("Search", "simple-ebook-viewer")), o.setAttribute("autofocus", !0);
    const a = document.createElement("menu"),
        d = document.createElement("button");
    d.classList.add("simebv-button-icon"), d.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="-1 -2 18 18">
  <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
</svg>`, d.type = "button";
    const h = ke("Previous result", "simple-ebook-viewer");
    d.setAttribute("aria-label", h), d.title = h, d.setAttribute("disabled", !0);
    const c = document.createElement("button");
    c.classList.add("simebv-button-icon"), c.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="-1 -2 18 18">
  <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
</svg>`, c.type = "button";
    const u = ke("Next result", "simple-ebook-viewer");
    c.setAttribute("aria-label", u), c.title = u, c.setAttribute("disabled", !0);
    const b = document.createElement("button");
    b.classList.add("simebv-button-icon"), b.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="CanvasText" viewBox="2 1 12 12">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>`, b.type = "reset";
    const g = ke("Close", "simple-ebook-viewer");
    b.setAttribute("aria-label", g), b.title = g, a.append(d, c, b), r.append(o, a);
    const v = () => {
        t(), d.disabled = !0, c.disabled = !0, r.classList.remove("simebv-show"), r.close(""), n && n.focus()
    };
    let m = !1;
    return o.addEventListener("keydown", async p => {
        switch (p.key) {
            case "Enter":
                if (m) break;
                const f = o.value;
                if (f) {
                    m = !0;
                    try {
                        await s(f), d.disabled = !1, c.disabled = !1
                    } finally {
                        m = !1
                    }
                }
                break;
        }
    }), d.addEventListener("click", i), c.addEventListener("click", e), b.addEventListener("click", v), r.addEventListener("keydown", p => {
        switch (p.key) {
            case "Escape":
                v(), p.stopPropagation(), p.preventDefault();
                break;
        }
    }), r;
}
const {
    __: me,
    _x: qi,
    _n: Vi,
    sprintf: ji
} = wp.i18n;

function Ti(s, i, e = !1) {
    const t = document.createElement("dialog"),
        n = document.createElement("form");
    n.setAttribute("method", "dialog");
    const r = document.createElement("p"),
        o = document.createElement("input");
    o.type = "checkbox", o.id = "simebv-activate-color-filter", o.setAttribute("autofocus", "true");
    const a = document.createElement("label");
    a.htmlFor = "simebv-activate-color-filter", a.innerText = me("Activate color filters", "simple-ebook-viewer"), i != null && i.activateColorFilter && (o.checked = !0), r.append(o, " ", a);
    const d = document.createElement("p"),
        h = document.createElement("input");
    h.id = "simebv-invert-colors-filter", h.type = "range", h.setAttribute("min", 0), h.setAttribute("max", 1), h.setAttribute("step", .01), h.setAttribute("disabled", "true"), h.value = (i == null ? void 0 : i.invertColorsFilter) ?? 0;
    const c = document.createElement("label");
    c.innerText = me("Invert colors:", "simple-ebook-viewer"), c.htmlFor = "simebv-invert-colors-filter", c.classList.add("simebv-label-disabled"), d.append(c, " ", h);
    const u = document.createElement("p"),
        b = document.createElement("input");
    b.id = "simebv-rotate-colors-filter", b.type = "range", b.setAttribute("min", 0), b.setAttribute("max", 360), b.setAttribute("disabled", "true"), b.value = (i == null ? void 0 : i.rotateColorsFilter) ?? 0;
    const g = document.createElement("label");
    g.innerText = me("Rotate hues:", "simple-ebook-viewer"), g.htmlFor = "simebv-rotate-colors-filter", g.classList.add("simebv-label-disabled"), u.append(g, " ", b);
    const v = document.createElement("p"),
        m = document.createElement("input");
    m.id = "simebv-bg-transparent-filter", m.type = "checkbox", m.setAttribute("disabled", "true"), m.checked = (i == null ? void 0 : i.bgFilterTransparent) ?? !0;
    const p = document.createElement("label");
    p.innerText = me("Transparent background:", "simple-ebook-viewer"), p.htmlFor = "simebv-bg-transparent-filter", p.classList.add("simebv-label-disabled"), v.append(p, " ", m);
    const f = document.createElement("p"),
        w = document.createElement("input");
    w.id = "simebv-bg-color-filter", w.type = "color", w.setAttribute("disabled", "true"), w.value = (i == null ? void 0 : i.bgColorsFilter) ?? "#FFFFFF";
    const S = document.createElement("label");
    S.innerText = me("Background color:", "simple-ebook-viewer"), S.htmlFor = "simebv-bg-color-filter", S.classList.add("simebv-label-disabled"), f.append(S, " ", w);
    const I = document.createElement("button");
    I.type = "submit", I.innerText = me("OK", "simple-ebook-viewer");
    const C = () => {
        i && !h.disabled && (i.invertColorsFilter = h.value, i.rotateColorsFilter = b.value, e || (i.bgFilterTransparent = m.checked, m.checked || (i.bgColorsFilter = w.value)));
        const _ = h.disabled ? "none" : `invert(${h.value}) hue-rotate(${b.value}deg)`,
            j = s.querySelector("foliate-view");
        if (j && !e) {
            const ue = w.disabled ? "transparent" : w.value;
            j.style.setProperty("--book-bg-color", ue)
        }
        s.style.setProperty("--book-colors-filter", _)
    }, L = () => {
        o.checked ? (h.disabled = !1, c.classList.remove("simebv-disabled-label"), b.disabled = !1, g.classList.remove("simebv-disabled-label"), e || (m.disabled = !1, p.classList.remove("simebv-disabled-label"), w.disabled = m.checked, w.disabled || S.classList.remove("simebv-disabled-label"))) : (h.disabled = !0, c.classList.add("simebv-disabled-label"), b.disabled = !0, g.classList.add("simebv-disabled-label"), e || (m.disabled = !0, p.classList.add("simebv-disabled-label"), w.disabled = !0, S.classList.add("simebv-disabled-label")))
    };
    return o.addEventListener("change", () => {
        i && (i.activateColorFilter = o.checked), L(), C()
    }), h.addEventListener("change", C), b.addEventListener("change", C), m.addEventListener("change", () => {
        w.disabled = m.checked, S.classList.toggle("simebv-disabled-label"), C()
    }), w.addEventListener("change", C), n.append(r, d, u, v, f, I), t.append(n), e && (v.style.display = "none", f.style.display = "none"), L(), C(), t;
}
const Fi = `:host {
    font-family: ManropeVar, sans-serif;
    color-scheme: light dark;
    --sepia-color: #f9f1cc;
    --bg-light-color: #ffffff;
    --bg-dark-color: #090909;
    --reader-bg: transparent;
    --active-bg: rgba(0, 0, 0, .05);
    --menu-bg: Canvas;
    --sidebar-bg: Canvas;
    --menu-group-separator-color: rgba(200, 200, 200, 1);
    --menu-box-shadow: 0 0 0 1px rgba(0, 0, 0, .2), 0 0 16px rgba(0, 0, 0, .1);
    --border-box-shadow: 0 0 0 1px rgba(0, 0, 0, .2);
    --side-bar-box-shadow-color: rgba(0, 0, 0, .1);
    --enabled-dot: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%2F%3E%3C%2Fsvg%3E');
    --disabled-dot: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20fill%3D%22%23808080%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%2F%3E%3C%2Fsvg%3E');
    --gray-text: GrayText;
    --header-height: 54px;
    --book-colors-filter: invert(0);
    --book-bg-color: transparent;
    --font-size-base: 17px;
    --font-size-input: max(var(--font-size-base), 16px);
}
@supports (color-scheme: light dark) {
    @media all and (prefers-color-scheme: dark) {
        #simebv-reader-root.simebv-supports-dark {
            --active-bg: rgba(255, 255, 255, .1);
            --reader-bg: Canvas;
            --menu-group-separator-color: rgba(255, 255, 255, .3);
            --menu-box-shadow: 0 0 0 1px rgba(255, 255, 255, .3), 0 0 6px rgba(255, 255, 255, .1);
            --border-box-shadow: 0 0 0 1px rgba(255, 255, 255, .3);
            --side-bar-box-shadow-color: rgba(255, 255, 255, .1);
            --enabled-dot: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20fill%3D%22%23FFFFFF%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%2F%3E%3C%2Fsvg%3E');
            --gray-text: rgb(132, 132, 132);
        }
        #simebv-reader-root.simebv-supports-dark a:link {
            color: lightblue;
        }
    }
}
foliate-view::part(filter) {
    background-color: var(--book-bg-color);
    filter: none; /*var(--book-colors-filter);*/
}
foliate-fxl::part(filter) {
    background-color: var(--book-bg-color);
}
#simebv-reader-root {
    height: 100%;
    width: 100%;
    font-size: var(--font-size-base);
    background-color: var(--reader-bg);
    filter: var(--book-colors-filter)
}
#simebv-reader-root.simebv-sepia {
    color-scheme: only light;
    --reader-bg: var(--sepia-color);
    --menu-bg: var(--reader-bg);
    --sidebar-bg: var(--reader-bg);
}
#simebv-reader-root.simebv-light {
    color-scheme: only light;
    --active-bg: rgba(0, 0, 0, .05);
    --reader-bg: var(--bg-light-color);
    --menu-bg: var(--reader-bg);
    --sidebar-bg: var(--reader-bg);
    --menu-group-separator-color: rgba(200, 200, 200, 1);
    --menu-box-shadow: 0 0 0 1px rgba(0, 0, 0, .2), 0 0 16px rgba(0, 0, 0, .1);
    --border-box-shadow: 0 0 0 1px rgba(0, 0, 0, .2);
    --side-bar-box-shadow-color: rgba(0, 0, 0, .1);
    --enabled-dot: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%2F%3E%3C%2Fsvg%3E');
    --gray-text: GrayText;
}
#simebv-reader-root.simebv-dark {
    color-scheme: only dark;
    --active-bg: rgba(255, 255, 255, .1);
    --reader-bg: var(--bg-dark-color);
    --menu-bg: var(--reader-bg);
    --sidebar-bg: var(--reader-bg);
    --menu-group-separator-color: rgba(255, 255, 255, .3);
    --menu-box-shadow: 0 0 0 1px rgba(255, 255, 255, .3), 0 0 6px rgba(255, 255, 255, .1);
    --border-box-shadow: 0 0 0 1px rgba(255, 255, 255, .3);
    --side-bar-box-shadow-color: rgba(255, 255, 255, .1);
    --enabled-dot: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20fill%3D%22%23FFFFFF%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%2F%3E%3C%2Fsvg%3E');
    --gray-text: rgb(132, 132, 132);
}
#simebv-reader-root.simebv-dark a:link {
    color: lightblue;
}
#simebv-book-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
#simebv-book-container.simebv-fxd-layout {
    height: calc(100% - var(--header-height) * 2);
    top: var(--header-height);
}
input, button {
    font-family: inherit;
    font-size: max(var(--font-size-input), 1rem);
}
.simebv-icon {
    display: block;
    fill: none;
    stroke: CanvasText;
    stroke-width: 1.5px;
}
.simebv-icon:active {
    stroke: CanvasText;
    transform: scale(0.95);
}
.simebv-icon-hidden {
    display: none;
}
.simebv-toolbar {
    box-sizing: border-box;
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    width: calc(100% - 12px);
    max-width: 100%;
    height: var(--header-height);
    padding: 6px;
    transition: opacity 250ms ease;
    visibility: hidden;
    color: CanvasText;
}
.simebv-toolbar button {
    padding: 3px;
    border-radius: 6px;
    background: none;
    border: 0;
/* color: GrayText;*/
}
.simebv-toolbar button:hover {
    background: var(--active-bg);
    color: currentcolor;
    cursor: pointer;
}
.simebv-reader-headline {
    flex: 1 1 fit-content;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: thin;
}
.simebv-reader-headline h1 {
    margin-block: 0;
    font-size: 1.3rem;
    white-space: pre;
    text-overflow: ellipsis;
    text-align: center;
}
#simebv-header-bar {
    top: 0;
    z-index: 2;
}
#simebv-nav-bar {
    bottom: 0;
}
#simebv-progress-slider {
    flex-grow: 1;
    margin: 0 12px;
    visibility: hidden;
}
#simebv-progress-percent {
    flex-grow: 1;
    margin: 0 12px;
    display: none;
    text-align: center;
}
@media screen and (max-width: 420px) {
    #simebv-progress-slider {
        display: none;
    }
    #simebv-progress-percent {
        display: block;
    }
}
#simebv-side-bar {
    visibility: hidden;
    box-sizing: border-box;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    height: 100%;
    width: 32ch;
    max-width: 85%;
    transform: translateX(-320px);
    display: flex;
    flex-direction: column;
    background: var(--sidebar-bg);
    color: CanvasText;
    border-right: solid 1px CanvasText;
    box-shadow: 3px 0 5px 1px var(--side-bar-box-shadow-color);
}
#simebv-side-bar.simebv-show {
    visibility: visible;
    transform: translateX(0);
    transition-delay: 0s;
}
#simebv-dimming-overlay {
    visibility: hidden;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: visibility 0s linear 300ms, opacity 300ms ease;
}
#simebv-dimming-overlay.simebv-show {
    visibility: visible;
    opacity: 1;
    transition-delay: 0s;
}
#simebv-loading-overlay {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: Canvas;
    color: CanvasText;
    font-size: 2rem;
    display: none;
    text-align: center;
}
#simebv-loading-overlay.simebv-show {
    display: flex;
    justify-content: center;
    align-items: center;
}
#simebv-side-bar-header {
    padding: 1rem;
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    align-items: center;
}
#simebv-side-bar-cover {
    height: 10vh;
    min-height: 60px;
    max-height: 180px;
    border-radius: 3px;
    border: 0;
    background: lightgray;
    box-shadow: 0 0 1px rgba(0, 0, 0, .1), 0 0 16px rgba(0, 0, 0, .1);
    margin-inline-end: 1rem;
}
#simebv-side-bar-cover:not([src]) {
    display: none;
}
#simebv-side-bar-title {
    margin: .5rem 0;
    font-size: inherit;
}
#simebv-side-bar-author {
    margin: .5rem 0;
    font-size: smaller;
    color: var(--gray-text);
}
#simebv-toc-view {
    padding: .5rem;
    overflow-y: auto;
}
#simebv-toc-view li, #simebv-toc-view ol {
    margin: 0;
    padding: 0;
    list-style: none;
}
#simebv-toc-view a, #simebv-toc-view span {
    display: block;
    border-radius: 6px;
    padding: 8px;
    margin: 2px 0;
}
#simebv-toc-view a {
    color: CanvasText;
    text-decoration: none;
}
#simebv-toc-view a:hover {
    background: var(--active-bg);
}
#simebv-toc-view span {
    color: var(--gray-text);
}
#simebv-toc-view svg {
    margin-inline-start: -24px;
    padding-inline-start: 5px;
    padding-inline-end: 6px;
    fill: CanvasText;
    cursor: default;
    transition: transform .2s ease;
    opacity: .5;
}
#simebv-toc-view svg:hover {
    opacity: 1;
}
#simebv-toc-view [aria-current] {
    font-weight: bold;
    background: var(--active-bg);
}
#simebv-toc-view [aria-expanded="false"] svg {
    transform: rotate(-90deg);
}
#simebv-toc-view [aria-expanded="false"] + [role="group"] {
    display: none;
}
.simebv-right-side-buttons,
.simebv-left-side-buttons {
    display: flex;
    flex-direction: row;
    vertical-align: middle;
    position: relative;
    flex: 0 0 3em;
}
.simebv-left-side-buttons {
    justify-content: start;
}
.simebv-right-side-buttons {
    justify-content: end;
}
.simebv-right-side-button-container {
    text-align: center;
    margin: auto;
}
.simebv-menu-container {
    position: relative;
}
.simebv-menu, .simebv-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
.simebv-menu {
    visibility: hidden;
    position: absolute;
    right: 0;
    background: var(--menu-bg);
    color: CanvasText;
    border-radius: 6px;
    box-shadow: var(--menu-box-shadow);
    padding: 6px;
    cursor: default;
    inline-size: 24ch;
    max-inline-size: 80vw;
    max-block-size: 80vh;
    overflow: auto;
    scrollbar-width: thin;
    user-select: none;
}
.simebv-menu.simebv-show {
    visibility: visible;
}
.simebv-menu li[role="presentation"] {
    padding: 0;
}
.simebv-menu li {
    padding: 6px 12px;
    padding-inline-start: 24px;
    border-radius: 6px;
}
.simebv-menu .simebv-action-menu-item {
    padding-inline-start: 6px;
}
.simebv-menu p[role^=menuitem] {
    padding: 6px 12px;
    border-radius: 6px;
    margin: 0;
}
.simebv-menu li:not([role="presentation"]):hover,
.simebv-menu p[role^=menuitem]:hover {
    background-color: var(--active-bg);
    cursor: pointer;
}
.simebv-menu [aria-disabled="true"] li:hover,
.simebv-menu li[aria-disabled="true"]:hover {
    background-color: transparent;
    cursor: default;
}
.simebv-menu li[aria-checked="true"] {
    background-position: center left;
    background-repeat: no-repeat;
    background-image: var(--enabled-dot);
}
.simebv-menu [aria-disabled="true"] li[aria-checked="true"] {
    background-image: var(--disabled-dot);
}
.simebv-menu .simebv-horizontal {
    margin-block: .3em;
}
.simebv-menu .simebv-horizontal > li {
    display: list-item inline;
}
.simebv-menu fieldset {
    border: none;
    border-block-end: 1px solid var(--menu-group-separator-color);
    padding: 0;
    padding-block: .2em;
    margin-block-end: .6em;
}
.simebv-menu > li:last-child fieldset {
    border-block-end: none;
    margin-block-end: .2em;
}
.simebv-menu legend {
    padding-block-end: .4em;
    font-weight: 500;
}
.simebv-menu-shortcut {
    float: right;
    float: inline-end;
    color: var(--gray-text);
}
.popover {
    background: Canvas;
    color: CanvasText;
    border-radius: 6px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .2), 0 0 16px rgba(0, 0, 0, .1), 0 0 32px rgba(0, 0, 0, .1);
}
.popover-arrow-down {
    fill: Canvas;
    filter: drop-shadow(0 -1px 0 rgba(0, 0, 0, .2));
}
.popover-arrow-up {
    fill: Canvas;
    filter: drop-shadow(0 1px 0 rgba(0, 0, 0, .2));
}
:disabled, [aria-disabled="true"],
.simebv-disabled-label {
    color: var(--gray-text);
}
#simebv-colors-filter-dialog {
    background-color: var(--menu-bg);
    border: none;
    box-shadow: var(--menu-box-shadow);
    border-radius: 3px;
}
#simebv-colors-filter-dialog input {
    vertical-align: middle;
}
#simebv-colors-filter-dialog button {
    padding-inline: 12px;
    padding-block: 3px;
}
#simebv-search-dialog {
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0 16px;
    height: calc(var(--header-height) - 8px);
    z-index: 9999;
    background-color: var(--menu-bg);
    border: none;
    box-shadow: var(--menu-box-shadow);
}
#simebv-search-dialog.simebv-show {
    display: flex;
}
#simebv-search-dialog menu {
    display: flex;
    align-items: center;
    justify-items: center;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0;
    margin-block: 0;
}
#simebv-search-dialog button {
    margin-inline: 6px;
    border-radius: 6px;
    padding: 3px;
    border: 1px solid GrayText;
}
#simebv-search-dialog button:disabled {
    color: var(--gray-text);
}
#simebv-search-dialog button:hover:not(:disabled) {
    background-color: var(--active-bg);
    cursor: pointer;
}
#simebv-search-dialog .simebv-button-icon {
    background: none;
    border: 0;
    text-align: center;
/* color: GrayText;*/
}
#simebv-search-input {
    appearance: none;
    border: none;
    box-shadow: var(--border-box-shadow);
    border-radius: 2px;
    padding-inline: 4px;
    padding-block: 3px;
    color: CanvasText;
    flex: auto 1 1;
    min-inline-size: 15ch;
}
#simebv-zoom-numeric {
    inline-size: 5ch;
    margin-inline-end: .2em;
}
#simebv-zoom-numeric-container {
    white-space: pre;
    margin-inline-start: .5em;
}
`, {
    __: T,
    _x: H,
    _n: Hi,
    sprintf: ot
} = wp.i18n, be = ({
    spacing: s,
    justify: i,
    hyphenate: e,
    fontSize: t,
    colorScheme: n,
    bgColor: r,
    fontFamily: ff, // Added fontFamily
    contentFontStyle: cfs, // Added contentFontStyle
    contentTextColor: ctc, // Added contentTextColor
    contentBgColor: cbc, // Added contentBgColor
    textAlign: a // Added textAlign parameter
}) => `
    @namespace epub "http://www.idpf.org/2007/ops";
    :root {
        color-scheme: ${n} !important;
        font-size: ${t}px;
        background-color: ${r};
        font-family: ${ff}; /* Apply font family to root */
        font-style: ${cfs}; /* Apply font style to root */
        color: ${ctc}; /* Apply text color to root */
    }
    /* https://github.com/whatwg/html/issues/5426 */
    @media all and (prefers-color-scheme: dark) {
        a:link {
            color: ${n.includes("dark")?"lightblue":"LinkText"};
        }
        ${n.includes("dark")?"a:visited { color: VisitedText; }":""}
        ${n.includes("dark")?"":'[epub|type~="se:image.color-depth.black-on-transparent"] { filter: none !important; }'}
    }
    p, li, blockquote, dd {
        line-height: ${s};
        text-align: ${a || (i ? "justify" : "start")} !important;
        -webkit-hyphens: ${e?"auto":"manual"};
        hyphens: ${e?"auto":"manual"};
        -webkit-hyphenate-limit-before: 3;
        -webkit-hyphenate-limit-after: 2;
        -webkit-hyphenate-limit-lines: 2;
        hanging-punctuation: allow-end last;
        widows: 2;
        font-family: ${ff} !important; /* Apply font family to specific elements */
        font-style: ${cfs} !important; /* Apply font style to specific elements */
        color: ${ctc} !important; /* Apply text color to specific elements */
        background-color: ${cbc} !important; /* Apply background color to specific elements */
    }
    /* prevent the above from overriding the align attribute */
    [align="left"] { text-align: left !important; }
    [align="right"] { text-align: right !important; }
    [align="center"] { text-align: center !important; }
    [align="justify"] { text-align: justify !important; }

    pre {
        white-space: pre-wrap !important;
    }
    aside[epub|type~="endnote"],
    aside[epub|type~="footnote"],
    aside[epub|type~="note"],
    aside[epub|type~="rearnote"] {
        display: none;
    }
`, Tt = "en", Ci = new Intl.NumberFormat(Tt, {
    style: "percent"
}), Ii = new Intl.ListFormat(Tt, {
    style: "short",
    type: "conjunction"
}), We = s => {
    if (!s) return "";
    if (typeof s == "string") return s;
    const i = Object.keys(s);
    return s[i[0]]
}, at = s => typeof s == "string" ? s : We(s == null ? void 0 : s.name), _i = s => Array.isArray(s) ? Ii.format(s.map(at)) : at(s);
var A, z, oe, ae, Z, ve, te, de, ie, W, X, ne, Te, N, q, V, ge, G, k, Ft, Pi, Ct, Je, It, _t, zi, Pt, R, Ke, Fe, Ze, Ee;
const Le = class Le {
    constructor(i) {
        x(this, k);
        x(this, A);
        x(this, z);
        x(this, oe);
        x(this, ae);
        x(this, Z);
        x(this, ve);
        x(this, te);
        x(this, de);
        x(this, ie);
        x(this, W);
        x(this, X);
        x(this, ne);
        x(this, Te);
        x(this, N, []);
        x(this, q, -1);
        x(this, V);
        x(this, ge, !1);
        x(this, G, {
            activateColorFilter: !1,
            invertColorsFilter: 0,
            rotateColorsFilter: 0,
            bgFilterTransparent: !0,
            bgColorsFilter: "#FFFFFF"
        });
        M(this, "style", {
            spacing: 1.4,
            justify: !0,
            hyphenate: !0,
            fontSize: 1,
            colorScheme: "light dark",
            bgColor: "transparent",
            fontFamily: "inherit", // Default font family
            contentFontStyle: "normal", // Default font style
            contentTextColor: "CanvasText", // Default text color
            contentBgColor: "transparent" // Default background color
        });
        M(this, "annotations", new Map);
        M(this, "annotationsByValue", new Map);
        M(this, "container");
        M(this, "menu");
        M(this, "boundDoSearch", this.doSearch.bind(this));
        M(this, "boundNextMatch", this.nextMatch.bind(this));
        M(this, "boundPrevMatch", this.prevMatch.bind(this));
        M(this, "boundSearchCleanUp", this.searchCleanUp.bind(this));
        this.container = i ?? document.body, E(this, A, this.container.attachShadow({
            mode: "open"
        })), l(this, A).innerHTML = Di, E(this, z, l(this, A).querySelector("#simebv-reader-root")), this.setLocalizedDefaultInterface(l(this, A)), E(this, oe, l(this, A).querySelector("#simebv-book-container")), E(this, Z, l(this, A).querySelector("#simebv-side-bar")), E(this, ve, l(this, A).querySelector("#simebv-side-bar-button")), E(this, te, l(this, A).querySelector("#simebv-dimming-overlay")), E(this, de, l(this, A).querySelector("#simebv-menu-button")), E(this, ie, l(this, A).querySelector("#full-screen-button")), l(this, ve).addEventListener("click", () => {
            l(this, Z).style.display = null, setTimeout(() => {
                var e;
                l(this, te).classList.add("simebv-show"), l(this, Z).classList.add("simebv-show"), (e = l(this, ae).getCurrentItem()) == null || e.focus()
            }, 20)
        }), l(this, te).addEventListener("click", () => {
            this.closeMenus()
        }), l(this, Z).addEventListener("click", () => {
            var e;
            (e = l(this, ae).getCurrentItem()) == null || e.focus()
        }), l(this, A).addEventListener("closeMenu", () => {
            l(this, Z).classList.contains("simebv-show") || l(this, te).classList.remove("simebv-show")
        }), this.menu = Ei([{
            name: "search",
            label: T("Search...", "simple-ebook-viewer"),
            shortcut: "Ctrl+F",
            type: "action",
            onclick: () => this.openSearchDialog(),
            attrs: [
                ["aria-haspopup", "dialog"]
            ]
        }, {
            name: "history",
            label: T("History", "simple-ebook-viewer"),
            type: "group",
            items: [{
                name: "previous",
                label: T("Previous", "simple-ebook-viewer"),
                classList: ["simebv-action-menu-item"],
                onclick: () => {
                    var e, t;
                    (t = (e = this.view) == null ? void 0 : e.history) == null || t.back()
                }
            }, {
                name: "next",
                label: T("Next", "simple-ebook-viewer"),
                classList: ["simebv-action-menu-item"],
                onclick: () => {
                    var e, t;
                    (t = (e = this.view) == null ? void 0 : e.history) == null || t.forward()
                }
            }]
        }, {
            name: "layout",
            label: T("Layout", "simple-ebook-viewer"),
            type: "radio",
            items: [
                [T("Paginated", "simple-ebook-viewer"), "paginated"],
                [T("Scrolled", "simple-ebook-viewer"), "scrolled"]
            ],
            onclick: e => {
                var t;
                e === "scrolled" ? (this.menu.groups.maxPages.enable(!1), this.menu.groups.margins.enable(!1)) : (this.menu.groups.maxPages.enable(!0), this.menu.groups.margins.enable(!0)), (t = this.view) == null || t.renderer.setAttribute("flow", e), y(this, k, R).call(this, "layout", e)
            },
            horizontal: !1
        }, {
            name: "maxPages",
            label: T("Max pages per view", "simple-ebook-viewer"),
            type: "radio",
            items: [
                ["1", 1],
                ["2", 2],
                ["3", 3],
                ["4", 4]
            ],
            onclick: e => {
                var t;
                (t = this.view) == null || t.renderer.setAttribute("max-column-count", e), y(this, k, R).call(this, "maxPages", e)
            },
            horizontal: !0
        }, {
            name: "fontSize",
            label: T("Font Size", "simple-ebook-viewer"),
            type: "radio",
            items: [
                [H("Small", "Font Size", "simple-ebook-viewer"), 14],
                [H("Medium", "Font Size", "simple-ebook-viewer"), 18],
                [H("Large", "Font Size", "simple-ebook-viewer"), 22],
                [H("X-Large", "Font Size", "simple-ebook-viewer"), 26]
            ],
            onclick: e => {
                var t, n, r;
                this.style.fontSize = e, (r = (t = this.view) == null ? void 0 : (n = t.renderer).setStyles) == null || r.call(n, be(this.style)), y(this, k, R).call(this, "fontSize", e)
            },
            horizontal: !1
        }, 

        {
            name: "margins",
            label: T("Page Margins", "simple-ebook-viewer"),
            type: "radio",
            items: [
                [H("Small", "Margins", "simple-ebook-viewer"), "small"],
                [H("Medium", "Margins", "simple-ebook-viewer"), "medium"],
                [H("Large", "Margins", "simple-ebook-viewer"), "large"]
            ],
            onclick: e => {
                var t, n, r;
                // Get the actual margin value from the t.margins mapping
                const marginValue = t.margins[e];
                
                // Store margin in style object using the actual value (e.g., "8%")
                this.style.marginSize = marginValue;
                
                // Apply to renderer
                (t = this.view) == null || t.renderer.setAttribute("gap", marginValue);
                (n = this.view) == null || n.renderer.setAttribute("max-block-size", 
                    `calc(100% - ${marginValue.slice(0,-1)*2}%)`);
                
                // Update all styles
                (r = (t = this.view) == null ? void 0 : (n = t.renderer).setStyles) == null || r.call(n, be(this.style));
                
                // Save preference using the key (e.g., "medium") not the value
                y(this, k, R).call(this, "margins", e);
            },
            horizontal: !1
        }, 
        {
            name: "colors",
            label: T("Colors", "simple-ebook-viewer"),
            type: "radio",
            items: [
                [H("Auto", "Theme color", "simple-ebook-viewer"), "auto"],
                [H("Sepia", "Theme color", "simple-ebook-viewer"), "simebv-sepia"],
                [H("Light", "Theme color", "simple-ebook-viewer"), "simebv-light"],
                [H("Dark", "Theme color", "simple-ebook-viewer"), "simebv-dark"]
            ],
            onclick: e => {
                var t, n, r, o, a, d, h, c, u, b, g, v;
                switch (e) {
                    case "simebv-sepia":
                        l(this, z).classList.add(e), l(this, z).classList.remove("simebv-supports-dark", "simebv-light", "simebv-dark"), this.style.colorScheme = "only light", this.style.bgColor = "#f9f1cc", (r = (t = this.view) == null ? void 0 : (n = t.renderer).setStyles) == null || r.call(n, be(this.style));
                        break;
                    case "simebv-light":
                        l(this, z).classList.add(e), l(this, z).classList.remove("simebv-supports-dark", "simebv-sepia", "simebv-dark"), this.style.colorScheme = "only light", this.style.bgColor = "#ffffff", (d = (o = this.view) == null ? void 0 : (a = o.renderer).setStyles) == null || d.call(a, be(this.style));
                        break;
                    case "simebv-dark":
                        l(this, z).classList.add(e), l(this, z).classList.remove("simebv-supports-dark", "simebv-sepia", "simebv-light"), this.style.colorScheme = "only dark", this.style.bgColor = "#090909", (u = (h = this.view) == null ? void 0 : (c = h.renderer).setStyles) == null || u.call(c, be(this.style));
                        break;
                    case "auto":
                    default:
                        l(this, z).classList.add("simebv-supports-dark"), l(this, z).classList.remove("simebv-sepia", "simebv-light", "simebv-dark"), this.style.colorScheme = "light dark", this.style.bgColor = "transparent", (v = (b = this.view) == null ? void 0 : (g = b.renderer).setStyles) == null || v.call(g, be(this.style))
                }
                y(this, k, R).call(this, "colors", e)
            },
            horizontal: !1
        }, {
            name: "colorFilter",
            label: T("Color filter...", "simple-ebook-viewer"),
            type: "action",
            onclick: () => this.openFilterDialog(l(this, oe)),
            attrs: [
                ["aria-haspopup", "dialog"]
            ]
        },
        
        {
            name: "alignment",
            label: T("Paragraph Alignment", "simple-ebook-viewer"),
            type: "radio",
            items: [
                ["Left", "left"],
                ["Center", "center"],
                ["Right", "right"],
                ["Justify", "justify"]
            ],
            onclick: (val) => {
                var t, n, r;
                // Update both justify and textAlign properties
                this.style.justify = (val === "justify");
                this.style.textAlign = val; // Store the actual alignment value
                
                // Apply the styles
                (r = (t = this.view) == null ? void 0 : (n = t.renderer).setStyles) == null || r.call(n, be(this.style));
                
                // Save the preference
                y(this, k, R).call(this, "alignment", val);
            }
        },
       
        {
            name: "zoom",
            label: T("Zoom", "simple-ebook-viewer"),
            type: "radio",
            items: [
                [T("Fit page", "simple-ebook-viewer"), "fit-page"],
                [T("Fit width", "simple-ebook-viewer"), "fit-width"],
                [T("Custom", "simple-ebook-viewer"), {
                    val: "custom",
                    type: "number",
                    attrs: {
                        id: "simebv-zoom-numeric",
                        max: 400,
                        min: 10,
                        step: 10,
                        value: 100
                    },
                    onchange: () => {
                        this.menu.groups.zoom.select("custom")
                    },
                    suffix: "%",
                    prefix: "",
                    labelID: "simebv-zoom-label"
                }]
            ],
            onclick: e => {
                var t, n, r, o;
                switch (e) {
                    case "fit-page":
                    case "fit-width":
                        (n = (t = this.view) == null ? void 0 : t.renderer) == null || n.setAttribute("zoom", e), y(this, k, R).call(this, "zoom", e);
                        break;
                    case "custom":
                        let a = l(this, A).getElementById("simebv-zoom-numeric").value;
                        (!Ie(a) || a < 10 || a > 400) && (a = 100), (o = (r = this.view) == null ? void 0 : r.renderer) == null || o.setAttribute("zoom", a / 100), y(this, k, R).call(this, "custom-zoom", a), y(this, k, R).call(this, "zoom", e);
                        break;
                    default:
                        if (!Ie(e)) break;
                        if (e = Number(e), e >= 10 && e <= 400) {
                            const d = l(this, A).getElementById("simebv-zoom-numeric");
                            d.value = e, d.dispatchEvent(new Event("change"))
                        }
                }
            },
            onvalidate: e => ["fit-page", "fit-width", "custom"].includes(e) || Ie(e) && Number(e) >= 10 && Number(e) <= 400
        }]), this.menu.element.classList.add("simebv-menu"), this.menu.element.style.maxBlockSize = "min(85svh, " + Math.round(this.containerHeight - 62) + "px)", screen != null && screen.orientation && screen.orientation.addEventListener("change", () => {
            console.log("orientatin changed"), this.menu.element.style.maxBlockSize = "min(85svh, " + Math.round(this.containerHeight - 62) + "px)"
        }), this.menu.element.addEventListener("click", e => e.stopPropagation()), l(this, de).append(this.menu.element), l(this, de).querySelector("button").addEventListener("click", e => {
            this.menu.element.classList.contains("simebv-show") ? this.closeMenus() : (this.menu.element.show(l(this, de).querySelector("button")), l(this, te).classList.add("simebv-show"))
        }), y(this, k, Ee).call(this, [
            ["fontSize", 18]
        ]), this.menu.groups.history.items.previous.enable(!1), this.menu.groups.history.items.next.enable(!1), l(this, ie).addEventListener("click", y(this, k, Ct).bind(this))
    }
    closeMenus() {
        let i;
        l(this, Z).classList.contains("simebv-show") && (i = l(this, ve)), l(this, te).classList.remove("simebv-show"), l(this, Z).classList.remove("simebv-show"), this.menu.element.hide(), i && i.focus()
    }
    get containerHeight() {
        return this.container.getBoundingClientRect().height
    }
    createFilterDialog(i, e) {
        l(this, W) || (E(this, W, Ti(i, l(this, G), e)), l(this, W).id = "simebv-colors-filter-dialog", l(this, z).append(l(this, W)), l(this, W).addEventListener("close", () => {
            for (const t in l(this, G)) y(this, k, R).call(this, t, l(this, G)[t])
        }))
    }
    openFilterDialog(i) {
        l(this, W) || this.createFilterDialog(i), l(this, W).showModal()
    }
    openSearchDialog() {
        l(this, X) || (E(this, X, Si(this.boundDoSearch, this.boundPrevMatch, this.boundNextMatch, this.boundSearchCleanUp, this.container)), l(this, X).id = "simebv-search-dialog", l(this, z).append(l(this, X))), l(this, X).show(), l(this, X).classList.add("simebv-show")
    }
    async doSearch(i) {
        var e;
        if (l(this, ne) && l(this, Te) === i) {
            await this.nextMatch();
            return
        }
        this.searchCleanUp(), E(this, Te, i), E(this, ne, await((e = this.view) == null ? void 0 : e.search({
            query: i
        }))), await this.nextMatch()
    }
    async nextMatch() {
        var e;
        if (!l(this, ne)) return;
        if (l(this, N) && l(this, N).length > 0 && l(this, q) < l(this, N).length - 1) {
            we(this, q)._++, await this.view.goTo(l(this, N)[l(this, q)].cfi);
            return
        }
        let i = await l(this, ne).next();
        if (!(i.value === "done" || i.done === !0))
            if ((e = i.value) != null && e.subitems) {
                l(this, N).push(...i.value.subitems), we(this, q)._++, await this.view.goTo(l(this, N)[l(this, q)].cfi);
                return
            } else await this.nextMatch()
    }
    async prevMatch() {
        if (l(this, ne) && l(this, N) && l(this, N).length > 0 && l(this, q) > 0) {
            we(this, q)._--, await this.view.goTo(l(this, N)[l(this, q)].cfi);
            return
        }
    }
    async searchCleanUp() {
        E(this, ne, void 0), E(this, N, []), E(this, q, -1), this.view.clearSearch(), this.view.deselect()
    }
    async open(i) {
        var a, d, h, c, u, b, g, v;
        this.view = document.createElement("foliate-view"), l(this, oe).append(this.view), await this.view.open(i), this.view.isFixedLayout ? (l(this, oe).classList.add("simebv-fxd-layout"), this.menu.groups.layout.visible(!1), this.menu.groups.maxPages.visible(!1), this.menu.groups.fontSize.visible(!1), this.menu.groups.margins.visible(!1), this.menu.groups.zoom.visible(!0), this.menu.groups.zoom.element.parentNode.parentNode.append(this.menu.groups.zoom.element.parentNode)) : (l(this, oe).classList.remove("simebv-fxd-layout"), this.menu.groups.layout.visible(!0), this.menu.groups.fontSize.visible(!0), this.menu.groups.maxPages.visible(!0), this.menu.groups.margins.visible(!0), this.menu.groups.zoom.visible(!1), this.menu.groups.colorFilter.element.parentNode.parentNode.append(this.menu.groups.colorFilter.element.parentNode)), this.view.addEventListener("load", y(this, k, It).bind(this)), this.view.addEventListener("relocate", y(this, k, _t).bind(this)), this.view.addEventListener("relocate", () => E(this, ge, !0), {
            once: !0
        }), this.view.history.addEventListener("index-change", y(this, k, Ft).bind(this)), E(this, V, this.getLastReadPage());
        const {
            book: e
        } = this.view;
        if ((a = e.transformTarget) == null || a.addEventListener("data", ({
                detail: m
            }) => {
                m.data = Promise.resolve(m.data).then(p => {
                    switch (m.type) {
                        case "application/xhtml+xml":
                        case "text/html":
                            // Re-enable Li function to apply text selection and copy prevention
                            return Li(p, m.type);
                        case "image/svg+xml":
                        case "application/xml":
                            // Re-enable Ai function if it also needs to be applied, otherwise return p
                            // If Ai is designed to remove scripts, and you want that, uncomment the line in Ai as well.
                            return Ai(p, m.type);
                        default:
                            return p;
                    }
                }).catch(p => (console.error(new Error(`Failed to load ${m.name}`, {
                    cause: p
                })), ""));
            }), l(this, V) != null) try {
            typeof l(this, V) == "string" ? await this.view.init({
                lastLocation: l(this, V)
            }) : l(this, V) <= 1 && l(this, V) >= 0 && await this.view.init({
                lastLocation: {
                    fraction: l(this, V)
                }
            })
        } catch (m) {
            E(this, V, null), console.error("Cannot load last read page:", m)
        }(h = (d = this.view.renderer).setStyles) == null || h.call(d, be(this.style)), l(this, V) || this.view.renderer.next(), l(this, A).querySelector("#simebv-header-bar").style.visibility = "visible", l(this, A).querySelector("#simebv-nav-bar").style.visibility = "visible", l(this, A).querySelector("#simebv-left-button").addEventListener("click", () => this.view.goLeft()), l(this, A).querySelector("#simebv-right-button").addEventListener("click", () => this.view.goRight());
        const t = l(this, A).querySelector("#simebv-progress-slider");
        t.dir = e.dir, t.addEventListener("input", m => this.view.goToFraction(parseFloat(m.target.value)));
        for (const m of this.view.getSectionFractions()) {
            const p = document.createElement("option");
            p.value = m, l(this, A).querySelector("#simebv-tick-marks").append(p)
        }
        this.container.addEventListener("keydown", y(this, k, Je).bind(this));
        const n = We((c = e.metadata) == null ? void 0 : c.title) || "Untitled Book";
        document.title = n, l(this, A).querySelector("#simebv-book-header").innerText = n, l(this, A).querySelector("#simebv-side-bar-title").innerText = n, l(this, A).querySelector("#simebv-side-bar-author").innerText = _i((u = e.metadata) == null ? void 0 : u.author), (g = Promise.resolve((b = e.getCover) == null ? void 0 : b.call(e))) == null || g.then(m => m ? l(this, A).querySelector("#simebv-side-bar-cover").src = URL.createObjectURL(m) : null);
        const r = e.toc;
        r && (E(this, ae, wi(r, m => {
            this.view.goTo(m).catch(p => console.error(p)), this.closeMenus()
        })), l(this, A).querySelector("#simebv-toc-view").append(l(this, ae).element));
        const o = await((v = e.getCalibreBookmarks) == null ? void 0 : v.call(e));
        if (o) {
            const {
                fromCalibreHighlight: m
            } = await B(async () => {
                const {
                    fromCalibreHighlight: p
                } = await Promise.resolve().then(() => Kt);
                return {
                    fromCalibreHighlight: p
                }
            }, void 0, import.meta.url);
            for (const p of o)
                if (p.type === "highlight") {
                    const f = m(p),
                        w = p.style.which,
                        S = p.notes,
                        I = {
                            value: f,
                            color: w,
                            note: S
                        },
                        C = this.annotations.get(p.spine_index);
                    C ? C.push(I) : this.annotations.set(p.spine_index, [I]), this.annotationsByValue.set(f, I)
                } this.view.addEventListener("create-overlay", p => {
                const {
                    index: f
                } = p.detail, w = this.annotations.get(f);
                if (w)
                    for (const S of w) this.view.addAnnotation(S)
            }), this.view.addEventListener("draw-annotation", p => {
                const {
                    draw: f,
                    annotation: w
                } = p.detail, {
                    color: S
                } = w;
                f(He.highlight, {
                    color: S
                })
            }), this.view.addEventListener("show-annotation", p => {
                const f = this.annotationsByValue.get(p.detail.value);
                f.note && alert(f.note)
            })
        }
        this.view.addEventListener("external-link", m => {
            if (m.detail.a.href) try {
                globalThis.open(new URL(m.detail.a.href).href, "_blank"), m.preventDefault()
            } catch (p) {
                console.error(`Failed to open url: ${p.detail.a.href}
`, p)
            }
        }), y(this, k, Ee).call(this, [
            ["colors", "auto"]
        ]), this.view.isFixedLayout ? y(this, k, Ee).call(this, [
            ["zoom", "fit-page"]
        ]) : y(this, k, Ee).call(this, [
            ["maxPages", 2],
            ["margins", "8%"],
            ["layout", "paginated"]
        ]), y(this, k, Pt).call(this), this.createFilterDialog(l(this, z), this.view.isFixedLayout)
    }
    getBookIdentifier() {
        var i, e, t;
        return ((t = (e = (i = this.view) == null ? void 0 : i.book) == null ? void 0 : e.metadata) == null ? void 0 : t.identifier) || null
    }
    getCurrentTitle() {
        var i, e, t;
        return We((t = (e = (i = this.view) == null ? void 0 : i.book) == null ? void 0 : e.metadata) == null ? void 0 : t.title) || "Untitled Book"
    }
    getLastReadPage() {
        const i = this.getBookIdentifier() ?? this.getCurrentTitle();
        return y(this, k, Ke).call(this, i + "_LastPage")
    }
    setLocalizedDefaultInterface(i) {
        i.getElementById("simebv-loading-overlay-text").innerText = T("Loading...", "simple-ebook-viewer");
        const e = i.getElementById("simebv-side-bar-button"),
            t = T("Show sidebar", "simple-ebook-viewer");
        e.setAttribute("aria-label", t), e.title = t, i.getElementById("simebv-book-header").innerText = T("No title", "simple-ebook-viewer");
        const n = i.querySelector("#simebv-menu-button button"),
            r = T("Show settings", "simple-ebook-viewer");
        n.setAttribute("aria-label", r), n.title = r;
        const o = i.getElementById("full-screen-button"),
            a = T("Full screen", "simple-ebook-viewer");
        o.setAttribute("aria-label", a), o.title = a;
        const d = i.getElementById("simebv-left-button"),
            h = T("Go left", "simple-ebook-viewer");
        d.setAttribute("aria-label", h), d.title = h;
        const c = i.getElementById("simebv-right-button"),
            u = T("Go right", "simple-ebook-viewer");
        c.setAttribute("aria-label", u), c.title = u
    }
};
A = new WeakMap, z = new WeakMap, oe = new WeakMap, ae = new WeakMap, Z = new WeakMap, ve = new WeakMap, te = new WeakMap, de = new WeakMap, ie = new WeakMap, W = new WeakMap, X = new WeakMap, ne = new WeakMap, Te = new WeakMap, N = new WeakMap, q = new WeakMap, V = new WeakMap, ge = new WeakMap, G = new WeakMap, k = new WeakSet, Ft = function() {
    var i, e, t, n;
    (e = (i = this.view) == null ? void 0 : i.history) != null && e.canGoBack ? this.menu.groups.history.items.previous.enable(!0) : this.menu.groups.history.items.previous.enable(!1), (n = (t = this.view) == null ? void 0 : t.history) != null && n.canGoForward ? this.menu.groups.history.items.next.enable(!0) : this.menu.groups.history.items.next.enable(!1)
}, Pi = function() {
    this.view && this.view.requestFullscreen && (document.fullscreenElement ? document.exitFullscreen() : this.view.requestFullscreen())
}, Ct = function() {
    this.container.classList.contains("simebv-view-fullscreen") ? (this.container.classList.remove("simebv-view-fullscreen"), l(this, ie).querySelector("#simebv-icon-enter-fullscreen").classList.remove("simebv-icon-hidden"), l(this, ie).querySelector("#simebv-icon-exit-fullscreen").classList.add("simebv-icon-hidden")) : (this.container.classList.add("simebv-view-fullscreen"), l(this, ie).querySelector("#simebv-icon-enter-fullscreen").classList.add("simebv-icon-hidden"), l(this, ie).querySelector("#simebv-icon-exit-fullscreen").classList.remove("simebv-icon-hidden")), this.menu && (this.menu.element.style.maxBlockSize = "min(85svh, " + Math.round(this.containerHeight - 62) + "px)")
}, Je = function(i) {
    var t, n, r;
    if (l(this, W).open) return;
    switch (i.key) {
        case "PageUp":
            i.preventDefault(), this.view.prev();
            break;
        case "PageDown":
            i.preventDefault(), this.view.next();
            break;
        case "ArrowLeft":
            this.view.goLeft();
            break;
        case "ArrowRight":
            this.view.goRight();
            break;
        case "Tab":
            (this.menu.element.classList.contains("simebv-show") || (t = l(this, A).querySelector("#simebv-side-bar")) != null && t.classList.contains("simebv-show")) && this.closeMenus();
            break;
        case "Escape":
            this.menu.element.classList.contains("simebv-show") || (n = l(this, A).querySelector("#simebv-side-bar")) != null && n.classList.contains("simebv-show") || (r = l(this, X)) != null && r.classList.contains("simebv-show") ? this.closeMenus() : this.container.classList.contains("simebv-view-fullscreen") && this.container.classList.remove("simebv-view-fullscreen");
            break;
        case "f":
            i.ctrlKey && (this.openSearchDialog(), i.preventDefault());
            break;
    }
}, It = function({
    detail: {
        doc: i
    }
}) {
    const e = l(this, A).getElementById("simebv-loading-overlay");
    e && e.classList.remove("simebv-show"), i.addEventListener("keydown", y(this, k, Je).bind(this)), this.view.isFixedLayout && i.addEventListener("dblclick", () => {
        ["fit-page", "fit-width"].includes(this.menu.groups.zoom.current()) ? this.menu.groups.zoom.select("custom") : this.menu.groups.zoom.select("fit-page")
    })
}, _t = function({
    detail: i
}) {
    var c, u;
    const {
        fraction: e,
        location: t,
        tocItem: n,
        pageItem: r
    } = i;
    y(this, k, R).call(this, (this.getBookIdentifier() ?? this.getCurrentTitle()) + "_LastPage", i.cfi ?? e);
    const o = Ci.format(e),
        a = r ? ot(T("Page %1$s", "simple-ebook-viewer"), r.label) : ot(T("Loc %1$s/%2$s", "simple-ebook-viewer"), t.current, t.total),
        d = l(this, A).querySelector("#simebv-progress-slider");
    d.style.visibility = "visible", d.value = e, d.title = `${o} · ${a}`;
    const h = l(this, A).querySelector("#simebv-progress-percent");
    h.innerText = o, n != null && n.href && ((u = (c = l(this, ae)) == null ? void 0 : c.setCurrentHref) == null || u.call(c, n.href))
}, zi = function(i) {
    if (!(!xe("localStorage") || !l(this, ge)))
        for (const [e, t] of i) y(this, k, R).call(this, e, t)
}, Pt = function() {
    var i;
    if (l(this, G)) {
        for (const e in l(this, G)) {
            let t = this.container.getAttribute("data-simebv-" + e.toLowerCase());
            t = y(i = Le, Fe, Ze).call(i, e, t), t != null && (l(this, G)[e] = t)
        }
        if (xe("localStorage"))
            for (const e in l(this, G)) {
                let t = JSON.parse(localStorage.getItem("simebv-" + e));
                t != null && (l(this, G)[e] = t)
            }
    }
}, R = function(i, e) {
    !xe("localStorage") || !l(this, ge) || localStorage.setItem("simebv-" + i, JSON.stringify(e))
}, Ke = function(i) {
    if (xe("localStorage")) return JSON.parse(localStorage.getItem("simebv-" + i))
}, Fe = new WeakSet, Ze = function(i, e) {
    var n;
    const t = {
        colors: {
            sepia: "simebv-sepia",
            light: "simebv-light",
            dark: "simebv-dark"
        },
        margins: {
            small: "4%",
            medium: "8%",
            large: "12%"
        },
        fontsize: {
            small: 14,
            medium: 18,
            large: 22,
            "x-large": 26
        },
        activatecolorfilter: {
            true: !0,
            false: !1
        },
        bgfiltertransparent: {
            true: !0,
            false: !1
        }
    };
    return Ie(e) && (e = Number(e)), ((n = t[i.toLowerCase()]) == null ? void 0 : n[e]) ?? e
}, Ee = function(i) {
    if (!this.menu) return;
    const e = i.map(t => {
        var a;
        const [n, r] = t;
        let o = this.container.getAttribute("data-simebv-" + n.toLowerCase());
        return o = y(a = Le, Fe, Ze).call(a, n, o), o && this.menu.groups[n].validate(o) ? [n, o] : t
    });
    if (!xe("localStorage")) {
        for (const [t, n] of e) this.menu.groups[t].select(n);
        return
    }
    for (const [t, n] of e) {
        if (t === "zoom") {
            const o = y(this, k, Ke).call(this, "custom-zoom");
            this.menu.groups.zoom.validate(o) && (this.menu.element.querySelector("#simebv-zoom-numeric").value = o)
        }
        let r = JSON.parse(localStorage.getItem("simebv-" + t));
        this.menu.groups[t].validate(r) ? this.menu.groups[t].select(r) : (this.menu.groups[t].select(n), console.warn(`Invalid value for menu ${t}: ${r}, setting default: ${n}`))
    }
}, x(Le, Fe);
let Ge = Le;
const Di = `
<style>
${Fi}
</style>
<div id="simebv-reader-root">
    <div id="simebv-loading-overlay" class="simebv-show">
        <p id="simebv-loading-overlay-text">Loading...</p>
    </div>
    <div id="simebv-dimming-overlay"></div>
    <div id="simebv-header-bar" class="simebv-toolbar">
        <div class="simebv-left-side-buttons">
            <button id="simebv-side-bar-button" aria-label="Show sidebar">
                <svg class="simebv-icon" width="32" height="32" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M 4 6 h 16 M 4 12 h 16 M 4 18 h 16"/>
                </svg>
            </button>
        </div>
        <header id="simebv-headline-container" class="simebv-reader-headline">
            <h1 id="simebv-book-header">No title</h1>
        </header>
        <div class="simebv-right-side-buttons">
            <div id="simebv-menu-button" class="simebv-menu-container">
                <button aria-label="Show settings" aria-haspopup="true">
                    <svg class="simebv-icon" width="32" height="32" viewBox="0 0 24 24" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12.7a7 7 0 0 1 0-1.4l-1.8-2 2-3.5 2.7.5a7 7 0 0 1 1.2-.7L10 3h4l.9 2.6 1.2.7 2.7-.5 2 3.4-1.8 2a7 7 0 0 1 0 1.5l1.8 2-2 3.5-2.7-.5a7 7 0 0 1-1.2.7L14 21h-4l-.9-2.6a7 7 0 0 1-1.2-.7l-2.7.5-2-3.4 1.8-2Z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                </button>
            </div>
            <div class="simebv-right-side-button-container">
                <button id="full-screen-button" aria-label="Full screen">
                    <svg width="32" height="32" viewBox="-2 -2 28 28" class="simebv-icon" id="simebv-icon-enter-fullscreen" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M8 2H4C2.89543 2 2 2.89543 2 4V8" stroke-width="1.8"/>
                        <path d="M22 8L22 4C22 2.89543 21.1046 2 20 2H16" stroke-width="1.8"/>
                        <path d="M16 22L20 22C21.1046 22 22 21.1046 22 20L22 16" stroke-width="1.8"/>
                        <path d="M8 22L4 22C2.89543 22 2 21.1046 2 20V16" stroke-width="1.8"/>
                    </svg>
                    <svg class="simebv-icon simebv-icon-hidden" id="simebv-icon-exit-fullscreen" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 12 L12 12 12 4 M20 4 L20 12 28 12 M4 20 L12 20 12 28 M28 20 L20 20 20 28" stroke-width="1.8" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
    <section id="simebv-side-bar">
        <div id="simebv-side-bar-header">
            <img id="simebv-side-bar-cover">
            <div>
                <h2 id="simebv-side-bar-title"></h2>
                <p id="simebv-side-bar-author"></p>
            </div>
        </div>
        <div id="simebv-toc-view"></div>
    </section>
    <div id="simebv-book-container"></div>
    <div id="simebv-nav-bar" class="simebv-toolbar">
        <button id="simebv-left-button" aria-label="Go left">
            <svg class="simebv-icon" width="32" height="32" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M 15 6 L 9 12 L 15 18"/>
            </svg>
        </button>
        <input id="simebv-progress-slider" type="range" min="0" max="1" step="any" list="simebv-tick-marks">
        <datalist id="simebv-tick-marks"></datalist>
        <div id="simebv-progress-percent"></div>
        <button id="simebv-right-button" aria-label="Go right">
            <svg class="simebv-icon" width="32" height="32" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M 9 6 L 15 12 L 9 18"/>
            </svg>
        </button>
    </div>
</div>
`, Bi = async s => {
    let i = document.getElementById("simebv-reader-container");
    i || (i = document.createElement("section"), i.id = "simebv-reader-container"), await new Ge(i).open(s)
};
async function Mi(s) {
    await wp.api.loadPromise;
    let e = await new wp.api.models.Media({
        id: s
    }).fetch();
    return new URL(e.source_url).href
}
const se = document.getElementById("simebv-reader-container");
var lt;
if (se) {
    let s;
    try {
        s = await Mi(se.getAttribute("data-ebook-id"))
    } catch (i) {
        s && (s = void 0), se.style.textAlign = "center", se.style.padding = "12px", se.innerText = "";
        const e = T("Error: I couldn't retrieve the book to display.", "simple-ebook-viewer");
        se.append(e), console.error(i), i.status === 404 ? se.append(document.createElement("br"), T("Resource not found on the server", "simple-ebook-viewer")) : (lt = i.responseJSON) != null && lt.message && se.append(document.createElement("br"), i.responseJSON.message)
    }
    s && Bi(s).catch(i => console.error(i))
}
export {
    B as _,
    gt as a,
    Wt as f,
    Ae as p,
    Gt as t
};
