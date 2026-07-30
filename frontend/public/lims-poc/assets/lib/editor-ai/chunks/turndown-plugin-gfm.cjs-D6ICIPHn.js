import { t as e } from "./chunk-jwUa06l-.js";
//#region ../../node_modules/@joplin/turndown-plugin-gfm/lib/turndown-plugin-gfm.cjs.js
var t = /* @__PURE__ */ e(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = /highlight-(?:text|source)-([a-z0-9]+)/;
	function n(e) {
		e.addRule("highlightedCodeBlock", {
			filter: function(e) {
				var n = e.firstChild;
				return e.nodeName === "DIV" && t.test(e.className) && n && n.nodeName === "PRE";
			},
			replacement: function(e, n, r) {
				var i = ((n.className || "").match(t) || [null, ""])[1];
				return "\n\n" + r.fence + i + "\n" + n.firstChild.textContent + "\n" + r.fence + "\n\n";
			}
		});
	}
	function r(e) {
		e.addRule("strikethrough", {
			filter: [
				"del",
				"s",
				"strike"
			],
			replacement: function(e) {
				return "~~" + e + "~~";
			}
		});
	}
	var i = Array.prototype.indexOf, a = Array.prototype.every, o = {}, s = {
		left: ":---",
		right: "---:",
		center: ":---:"
	}, c = null, l = null, u = /* @__PURE__ */ new WeakMap();
	function d(e) {
		return e ? (e.getAttribute("align") || e.style.textAlign || "").toLowerCase() : "";
	}
	function f(e) {
		return e ? s[e] : "---";
	}
	function p(e, t) {
		for (var n = {
			left: 0,
			right: 0,
			center: 0,
			"": 0
		}, r = "", i = 0; i < e.rows.length; ++i) {
			var a = e.rows[i];
			if (t < a.childNodes.length) {
				var o = d(a.childNodes[t]);
				++n[o], n[o] > n[r] && (r = o);
			}
		}
		return r;
	}
	o.tableCell = {
		filter: ["th", "td"],
		replacement: function(e, t) {
			return D(A(t)) ? e : g(e, t);
		}
	}, o.tableRow = {
		filter: "tr",
		replacement: function(e, t) {
			let n = A(t);
			if (D(n)) return e;
			var r = "";
			if (m(t)) {
				let e = M(n);
				for (var i = 0; i < e; i++) {
					let e = i < t.childNodes.length ? t.childNodes[i] : null;
					var a = f(p(n, i));
					r += g(a, e, i);
				}
			}
			return "\n" + e + (r ? "\n" + r : "");
		}
	}, o.table = {
		filter: function(e, t) {
			return e.nodeName === "TABLE";
		},
		replacement: function(e, t) {
			if (E(t, l)) {
				let e = t.outerHTML, n = k(t);
				return n === null || !n.classList.contains("joplin-table-wrapper") ? `\n\n<div class="joplin-table-wrapper">${e}</div>\n\n` : e;
			} else {
				if (D(t)) return e;
				e = e.replace(/\n+/g, "\n");
				var n = e.trim().split("\n");
				n.length >= 2 && (n = n[1]);
				var r = /\| :?---/.test(n), i = M(t), a = "";
				if (i && !r) {
					a = "|" + "     |".repeat(i) + "\n|";
					for (var o = 0; o < i; ++o) a += " " + f(p(t, o)) + " |";
				}
				let s = t.querySelector ? t.querySelector("caption") : t.caption, c = s && s.textContent || "";
				return `\n\n${c ? `${c}\n\n` : ""}${`${a}${e}`.trimStart()}\n\n`;
			}
		}
	}, o.tableCaption = {
		filter: ["caption"],
		replacement: () => ""
	}, o.tableColgroup = {
		filter: ["colgroup", "col"],
		replacement: () => ""
	}, o.tableSection = {
		filter: [
			"thead",
			"tbody",
			"tfoot"
		],
		replacement: function(e) {
			return e;
		}
	};
	function m(e) {
		var t = e.parentNode;
		return t.nodeName === "THEAD" || t.firstChild === e && (t.nodeName === "TABLE" || h(t)) && a.call(e.childNodes, function(e) {
			return e.nodeName === "TH";
		});
	}
	function h(e) {
		var t = e.previousSibling;
		return e.nodeName === "TBODY" && (!t || t.nodeName === "THEAD" && /^\s*$/i.test(t.textContent));
	}
	function g(e, t = null, n = null) {
		n === null && (n = i.call(t.parentNode.childNodes, t));
		var r = " ";
		n === 0 && (r = "| ");
		let a = e.trim().replace(/\n\r/g, "<br>").replace(/\n/g, "<br>");
		for (a = a.replace(/\|+/g, "\\|"); a.length < 3;) a += " ";
		return t && (a = j(a, t, " ")), r + a + " |";
	}
	function _(e) {
		if (!e.childNodes) return !1;
		for (let t = 0; t < e.childNodes.length; t++) {
			let n = e.childNodes[t];
			if (n.nodeName === "TABLE" || _(n)) return !0;
		}
		return !1;
	}
	var v = (e, t) => {
		if (!e.childNodes) return !1;
		for (let n = 0; n < e.childNodes.length; n++) {
			let r = e.childNodes[n];
			if (t === "code" && c && c(r) || t.includes(r.nodeName) || v(r, t)) return !0;
		}
		return !1;
	}, y = [
		"background-color",
		"background",
		"border-color",
		"border",
		"border-top",
		"border-right",
		"border-bottom",
		"border-left",
		"border-style",
		"border-width",
		"padding",
		"padding-top",
		"padding-right",
		"padding-bottom",
		"padding-left",
		"float",
		"margin-left",
		"margin-right"
	], b = [
		"bgcolor",
		"bordercolor",
		"background"
	], x = (e) => {
		if (!e || !e.getAttribute) return !1;
		let t = e.getAttribute("style");
		if (!t) return !1;
		let n = t.split(";").map((e) => e.split(":")[0].trim().toLowerCase()).filter((e) => e.length > 0);
		for (let e = 0; e < n.length; e++) if (y.includes(n[e])) return !0;
		return !1;
	}, S = (e, t) => {
		if (!e || !e.getAttribute) return !1;
		let n = e.getAttribute(t);
		if (n === null) return !1;
		let r = `${n}`.trim().toLowerCase();
		return !(!r || r === "0" || r === "0px");
	}, C = (e) => {
		if (!e || !e.getAttribute) return !1;
		for (let t = 0; t < b.length; t++) {
			let n = e.getAttribute(b[t]);
			if (n !== null && `${n}`.trim() !== "") return !0;
		}
		return !!(e.nodeName === "TABLE" && (S(e, "cellpadding") || S(e, "cellspacing")));
	}, w = (e) => x(e) || C(e), T = (e) => {
		if (w(e)) return !0;
		let t = e.rows;
		if (!t) return !1;
		for (let e = 0; e < t.length; e++) {
			let n = t[e];
			if (w(n)) return !0;
			for (let e = 0; e < n.childNodes.length; e++) {
				let t = n.childNodes[e];
				if ((t.nodeName === "TD" || t.nodeName === "TH") && w(t)) return !0;
			}
		}
		return !1;
	}, E = (e, t) => {
		let n = [
			"UL",
			"OL",
			"H1",
			"H2",
			"H3",
			"H4",
			"H5",
			"H6",
			"HR",
			"BLOCKQUOTE"
		];
		return t.preserveNestedTables && n.push("TABLE"), v(e, "code") || v(e, n) || t.preserveTableStyles && T(e);
	};
	function D(e) {
		let t = u.get(e);
		if (t !== void 0) return t;
		let n = O(e);
		return u.set(e, n), n;
	}
	function O(e) {
		return !!(!e || !e.rows || e.rows.length === 1 && e.rows[0].childNodes.length <= 1 || _(e));
	}
	function k(e) {
		let t = e.parentNode;
		for (; t.nodeName !== "DIV";) if (t = t.parentNode, !t) return null;
		return t;
	}
	function A(e) {
		let t = e.parentNode;
		for (; t.nodeName !== "TABLE";) if (t = t.parentNode, !t) return null;
		return t;
	}
	function j(e, t, n) {
		let r = t.getAttribute("colspan") || 1;
		for (let t = 1; t < r; t++) e += " | " + n.repeat(3);
		return e;
	}
	function M(e) {
		let t = 0;
		for (let n = 0; n < e.rows.length; n++) {
			let r = e.rows[n].childNodes.length;
			r > t && (t = r);
		}
		return t;
	}
	function N(e) {
		for (var t in c = e.isCodeBlock, l = e.options, e.keep(function(t) {
			return !!(t.nodeName === "TABLE" && E(t, e.options));
		}), o) e.addRule(t, o[t]);
	}
	function P(e) {
		e.addRule("taskListItems", {
			filter: function(e) {
				let t = e.parentNode, n = t.parentNode, r = !!n && n.nodeName === "LI";
				return (e.type === "checkbox" || e.getAttribute("role") === "checkbox") && (t.nodeName === "LI" || t.nodeName === "LABEL" && r || t.nodeName === "SPAN" && r);
			},
			replacement: function(e, t) {
				return ((t.nodeName === "INPUT" ? t.checked : t.getAttribute("aria-checked") === "true") ? "[x]" : "[ ]") + " ";
			}
		});
	}
	function F(e) {
		e.use([
			n,
			r,
			N,
			P
		]);
	}
	e.gfm = F, e.highlightedCodeBlock = n, e.strikethrough = r, e.tables = N, e.taskListItems = P;
}));
//#endregion
export default t();
