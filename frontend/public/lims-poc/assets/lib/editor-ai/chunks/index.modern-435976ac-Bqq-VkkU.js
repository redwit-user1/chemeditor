import { o as e, t } from "./chunk-jwUa06l-.js";
import { t as n } from "./react-BRYFygvR.js";
import { n as r } from "./client-Ca2DVHqA.js";
import { t as i } from "./jsx-runtime-Am32fJlP.js";
import { $ as a, $n as o, $t as s, A as c, An as l, At as u, B as d, Bn as f, Bt as p, C as m, Cn as h, Ct as g, D as _, Dn as v, Dt as y, E as b, En as x, Et as S, F as C, Fn as w, Ft as T, G as E, Gn as D, Gt as O, H as k, Hn as ee, Ht as te, I as ne, In as re, It as A, J as j, Jt as ie, K as ae, Kn as oe, Kt as se, L as ce, Ln as le, Lt as ue, M as de, Mn as M, Mt as fe, N as pe, Nn as me, Nt as he, O as ge, On as _e, Ot as ve, P as ye, Pn as N, Pt as be, Q as xe, Qn as Se, Qt as Ce, R as we, Rn as Te, Rt as Ee, S as De, Sn as Oe, St as ke, T as Ae, Tn as je, Tt as Me, U as Ne, Un as Pe, Ut as Fe, V as Ie, Vn as Le, Vt as Re, W as ze, Wn as Be, Wt as Ve, X as He, Xt as Ue, Y as We, Yn as Ge, Yt as Ke, Z as qe, Zn as Je, Zt as Ye, _ as Xe, _n as Ze, _r as Qe, _t as $e, ar as et, at as tt, b as nt, bn as rt, br as it, bt as at, c as ot, cn as st, cr as ct, ct as lt, d as ut, dn as dt, dr as ft, dt as pt, en as mt, er as P, et as ht, f as gt, fn as _t, fr as vt, ft as yt, g as bt, gn as xt, gr as St, gt as Ct, h as wt, hn as Tt, hr as Et, ht as Dt, i as Ot, in as kt, ir as At, it as jt, j as Mt, jn as Nt, jt as Pt, k as Ft, kn as It, kt as Lt, l as Rt, ln as zt, lr as Bt, lt as Vt, m as Ht, mn as Ut, mr as Wt, mt as Gt, n as Kt, nn as qt, nr as Jt, nt as Yt, o as F, on as Xt, or as Zt, ot as Qt, p as $t, pn as en, pr as tn, pt as nn, q as rn, qn as an, qt as on, r as sn, rn as cn, rr as ln, rt as un, s as dn, sn as fn, sr as pn, st as mn, t as hn, tn as gn, tr as _n, tt as vn, u as yn, un as bn, ur as xn, ut as Sn, v as Cn, vn as wn, vr as Tn, vt as En, w as Dn, wt as On, x as kn, xn as An, xr as I, xt as jn, y as Mn, yn as Nn, yr as L, yt as Pn, z as Fn, zn as In, zt as Ln } from "./dist-Bm-p1kM9.js";
import { t as Rn } from "./lodash-COYbioQ7.js";
//#region ../../node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js
var R = /* @__PURE__ */ e(i());
Et();
var z = /* @__PURE__ */ e(n());
Tn(), Qe();
var B = R.Fragment, V = function(e, t, n) {
	return Wt.call(t, "css") ? R.jsx(ft, tn(e, t), n) : R.jsx(e, t, n);
}, H = function(e, t, n) {
	return Wt.call(t, "css") ? R.jsxs(ft, tn(e, t), n) : R.jsxs(e, t, n);
};
//#endregion
//#region ../../node_modules/@mui/system/node_modules/clsx/dist/clsx.mjs
function zn(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = zn(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function Bn() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = zn(e)) && (r && (r += " "), r += t);
	return r;
}
it(), ln(), Se(), oe();
var Vn = ["className", "component"];
function Hn(e = {}) {
	let { themeId: t, defaultTheme: n, defaultClassName: r = "MuiBox-root", generateClassName: i } = e, a = o("div", { shouldForwardProp: (e) => e !== "theme" && e !== "sx" && e !== "as" })(Je);
	return /* @__PURE__ */ z.forwardRef(function(e, o) {
		let s = Ge(n), c = an(e), { className: l, component: u = "div" } = c, d = Jt(c, Vn);
		return /*#__PURE__*/ (0, R.jsx)(a, L({
			as: u,
			ref: o,
			className: Bn(l, i ? i(r) : r),
			theme: t && s[t] || s
		}, d));
	});
}
//#endregion
//#region ../../node_modules/@mui/utils/esm/getValidReactChildren/getValidReactChildren.js
function Un(e) {
	return z.Children.toArray(e).filter((e) => /*#__PURE__*/ z.isValidElement(e));
}
//#endregion
//#region ../../node_modules/@mui/material/Typography/typographyClasses.js
function Wn(e) {
	return Be("MuiTypography", e);
}
Pe("MuiTypography", [
	"root",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"subtitle1",
	"subtitle2",
	"body1",
	"body2",
	"inherit",
	"button",
	"caption",
	"overline",
	"alignLeft",
	"alignRight",
	"alignCenter",
	"alignJustify",
	"noWrap",
	"gutterBottom",
	"paragraph"
]), ln(), it(), oe();
var Gn = [
	"align",
	"className",
	"component",
	"gutterBottom",
	"noWrap",
	"paragraph",
	"variant",
	"variantMapping"
], Kn = (e) => {
	let { align: t, gutterBottom: n, noWrap: r, paragraph: i, variant: a, classes: o } = e;
	return Le({ root: [
		"root",
		a,
		e.align !== "inherit" && `align${He(t)}`,
		n && "gutterBottom",
		r && "noWrap",
		i && "paragraph"
	] }, Wn, o);
}, qn = re("span", {
	name: "MuiTypography",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.root,
			n.variant && t[n.variant],
			n.align !== "inherit" && t[`align${He(n.align)}`],
			n.noWrap && t.noWrap,
			n.gutterBottom && t.gutterBottom,
			n.paragraph && t.paragraph
		];
	}
})(({ theme: e, ownerState: t }) => L({ margin: 0 }, t.variant === "inherit" && { font: "inherit" }, t.variant !== "inherit" && e.typography[t.variant], t.align !== "inherit" && { textAlign: t.align }, t.noWrap && {
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap"
}, t.gutterBottom && { marginBottom: "0.35em" }, t.paragraph && { marginBottom: 16 })), Jn = {
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4",
	h5: "h5",
	h6: "h6",
	subtitle1: "h6",
	subtitle2: "h6",
	body1: "p",
	body2: "p",
	inherit: "p"
}, Yn = {
	primary: "primary.main",
	textPrimary: "text.primary",
	secondary: "secondary.main",
	textSecondary: "text.secondary",
	error: "error.main"
}, Xn = (e) => Yn[e] || e, Zn = /*#__PURE__*/ z.forwardRef(function(e, t) {
	let n = j({
		props: e,
		name: "MuiTypography"
	}), r = Xn(n.color), i = an(L({}, n, { color: r })), { align: a = "inherit", className: o, component: s, gutterBottom: c = !1, noWrap: l = !1, paragraph: u = !1, variant: d = "body1", variantMapping: f = Jn } = i, p = Jt(i, Gn), m = L({}, i, {
		align: a,
		color: r,
		className: o,
		component: s,
		gutterBottom: c,
		noWrap: l,
		paragraph: u,
		variant: d,
		variantMapping: f
	});
	return /*#__PURE__*/ (0, R.jsx)(qn, L({
		as: s || (u ? "p" : f[d] || Jn[d]) || "span",
		ref: t,
		ownerState: m,
		className: We(Kn(m).root, o)
	}, p));
}), Qn = Pe("MuiBox", ["root"]), $n = Hn({
	themeId: At,
	defaultTheme: Te(),
	defaultClassName: Qn.root,
	generateClassName: D.generate
});
//#endregion
//#region ../../node_modules/@mui/material/ButtonGroup/buttonGroupClasses.js
function er(e) {
	return Be("MuiButtonGroup", e);
}
var tr = Pe("MuiButtonGroup", /* @__PURE__ */ "root.contained.outlined.text.disableElevation.disabled.firstButton.fullWidth.vertical.grouped.groupedHorizontal.groupedVertical.groupedText.groupedTextHorizontal.groupedTextVertical.groupedTextPrimary.groupedTextSecondary.groupedOutlined.groupedOutlinedHorizontal.groupedOutlinedVertical.groupedOutlinedPrimary.groupedOutlinedSecondary.groupedContained.groupedContainedHorizontal.groupedContainedVertical.groupedContainedPrimary.groupedContainedSecondary.lastButton.middleButton".split("."));
ln(), it();
var nr = In(), rr = [
	"children",
	"className",
	"color",
	"component",
	"disabled",
	"disableElevation",
	"disableFocusRipple",
	"disableRipple",
	"fullWidth",
	"orientation",
	"size",
	"variant"
], ir = (e, t) => {
	let { ownerState: n } = e;
	return [
		{ [`& .${tr.grouped}`]: t.grouped },
		{ [`& .${tr.grouped}`]: t[`grouped${He(n.orientation)}`] },
		{ [`& .${tr.grouped}`]: t[`grouped${He(n.variant)}`] },
		{ [`& .${tr.grouped}`]: t[`grouped${He(n.variant)}${He(n.orientation)}`] },
		{ [`& .${tr.grouped}`]: t[`grouped${He(n.variant)}${He(n.color)}`] },
		{ [`& .${tr.firstButton}`]: t.firstButton },
		{ [`& .${tr.lastButton}`]: t.lastButton },
		{ [`& .${tr.middleButton}`]: t.middleButton },
		t.root,
		t[n.variant],
		n.disableElevation === !0 && t.disableElevation,
		n.fullWidth && t.fullWidth,
		n.orientation === "vertical" && t.vertical
	];
}, ar = (e) => {
	let { classes: t, color: n, disabled: r, disableElevation: i, fullWidth: a, orientation: o, variant: s } = e;
	return Le({
		root: [
			"root",
			s,
			o === "vertical" && "vertical",
			a && "fullWidth",
			i && "disableElevation"
		],
		grouped: [
			"grouped",
			`grouped${He(o)}`,
			`grouped${He(s)}`,
			`grouped${He(s)}${He(o)}`,
			`grouped${He(s)}${He(n)}`,
			r && "disabled"
		],
		firstButton: ["firstButton"],
		lastButton: ["lastButton"],
		middleButton: ["middleButton"]
	}, er, t);
}, or = re("div", {
	name: "MuiButtonGroup",
	slot: "Root",
	overridesResolver: ir
})(({ theme: e, ownerState: t }) => L({
	display: "inline-flex",
	borderRadius: (e.vars || e).shape.borderRadius
}, t.variant === "contained" && { boxShadow: (e.vars || e).shadows[2] }, t.disableElevation && { boxShadow: "none" }, t.fullWidth && { width: "100%" }, t.orientation === "vertical" && { flexDirection: "column" }, {
	[`& .${tr.grouped}`]: L({
		minWidth: 40,
		"&:hover": L({}, t.variant === "contained" && { boxShadow: "none" })
	}, t.variant === "contained" && { boxShadow: "none" }),
	[`& .${tr.firstButton},& .${tr.middleButton}`]: L({}, t.orientation === "horizontal" && {
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0
	}, t.orientation === "vertical" && {
		borderBottomRightRadius: 0,
		borderBottomLeftRadius: 0
	}, t.variant === "text" && t.orientation === "horizontal" && {
		borderRight: e.vars ? `1px solid rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : `1px solid ${e.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"}`,
		[`&.${tr.disabled}`]: { borderRight: `1px solid ${(e.vars || e).palette.action.disabled}` }
	}, t.variant === "text" && t.orientation === "vertical" && {
		borderBottom: e.vars ? `1px solid rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : `1px solid ${e.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"}`,
		[`&.${tr.disabled}`]: { borderBottom: `1px solid ${(e.vars || e).palette.action.disabled}` }
	}, t.variant === "text" && t.color !== "inherit" && { borderColor: e.vars ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.5)` : (0, nr.alpha)(e.palette[t.color].main, .5) }, t.variant === "outlined" && t.orientation === "horizontal" && { borderRightColor: "transparent" }, t.variant === "outlined" && t.orientation === "vertical" && { borderBottomColor: "transparent" }, t.variant === "contained" && t.orientation === "horizontal" && {
		borderRight: `1px solid ${(e.vars || e).palette.grey[400]}`,
		[`&.${tr.disabled}`]: { borderRight: `1px solid ${(e.vars || e).palette.action.disabled}` }
	}, t.variant === "contained" && t.orientation === "vertical" && {
		borderBottom: `1px solid ${(e.vars || e).palette.grey[400]}`,
		[`&.${tr.disabled}`]: { borderBottom: `1px solid ${(e.vars || e).palette.action.disabled}` }
	}, t.variant === "contained" && t.color !== "inherit" && { borderColor: (e.vars || e).palette[t.color].dark }, { "&:hover": L({}, t.variant === "outlined" && t.orientation === "horizontal" && { borderRightColor: "currentColor" }, t.variant === "outlined" && t.orientation === "vertical" && { borderBottomColor: "currentColor" }) }),
	[`& .${tr.lastButton},& .${tr.middleButton}`]: L({}, t.orientation === "horizontal" && {
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0
	}, t.orientation === "vertical" && {
		borderTopRightRadius: 0,
		borderTopLeftRadius: 0
	}, t.variant === "outlined" && t.orientation === "horizontal" && { marginLeft: -1 }, t.variant === "outlined" && t.orientation === "vertical" && { marginTop: -1 })
})), sr = /*#__PURE__*/ z.forwardRef(function(e, t) {
	let n = j({
		props: e,
		name: "MuiButtonGroup"
	}), { children: r, className: i, color: a = "primary", component: o = "div", disabled: s = !1, disableElevation: c = !1, disableFocusRipple: l = !1, disableRipple: u = !1, fullWidth: f = !1, orientation: p = "horizontal", size: m = "medium", variant: h = "outlined" } = n, g = Jt(n, rr), _ = L({}, n, {
		color: a,
		component: o,
		disabled: s,
		disableElevation: c,
		disableFocusRipple: l,
		disableRipple: u,
		fullWidth: f,
		orientation: p,
		size: m,
		variant: h
	}), v = ar(_), y = z.useMemo(() => ({
		className: v.grouped,
		color: a,
		disabled: s,
		disableElevation: c,
		disableFocusRipple: l,
		disableRipple: u,
		fullWidth: f,
		size: m,
		variant: h
	}), [
		a,
		s,
		c,
		l,
		u,
		f,
		m,
		h,
		v.grouped
	]), b = Un(r), x = b.length, S = (e) => {
		let t = e === 0, n = e === x - 1;
		return t && n ? "" : t ? v.firstButton : n ? v.lastButton : v.middleButton;
	};
	return /*#__PURE__*/ (0, R.jsx)(or, L({
		as: o,
		role: "group",
		className: We(v.root, i),
		ref: t,
		ownerState: _
	}, g, { children: /*#__PURE__*/ (0, R.jsx)(Ie.Provider, {
		value: y,
		children: b.map((e, t) => /*#__PURE__*/ (0, R.jsx)(d.Provider, {
			value: S(t),
			children: e
		}, t))
	}) }));
});
//#endregion
//#region ../../node_modules/@mui/material/Dialog/dialogClasses.js
function cr(e) {
	return Be("MuiDialog", e);
}
var lr = Pe("MuiDialog", [
	"root",
	"scrollPaper",
	"scrollBody",
	"container",
	"paper",
	"paperScrollPaper",
	"paperScrollBody",
	"paperWidthFalse",
	"paperWidthXs",
	"paperWidthSm",
	"paperWidthMd",
	"paperWidthLg",
	"paperWidthXl",
	"paperFullWidth",
	"paperFullScreen"
]), ur = /*#__PURE__*/ z.createContext({});
ln(), it();
var dr = [
	"aria-describedby",
	"aria-labelledby",
	"BackdropComponent",
	"BackdropProps",
	"children",
	"className",
	"disableEscapeKeyDown",
	"fullScreen",
	"fullWidth",
	"maxWidth",
	"onBackdropClick",
	"onClick",
	"onClose",
	"open",
	"PaperComponent",
	"PaperProps",
	"scroll",
	"TransitionComponent",
	"transitionDuration",
	"TransitionProps"
], fr = re(k, {
	name: "MuiDialog",
	slot: "Backdrop",
	overrides: (e, t) => t.backdrop
})({ zIndex: -1 }), pr = (e) => {
	let { classes: t, scroll: n, maxWidth: r, fullWidth: i, fullScreen: a } = e;
	return Le({
		root: ["root"],
		container: ["container", `scroll${He(n)}`],
		paper: [
			"paper",
			`paperScroll${He(n)}`,
			`paperWidth${He(String(r))}`,
			i && "paperFullWidth",
			a && "paperFullScreen"
		]
	}, cr, t);
}, mr = re(ce, {
	name: "MuiDialog",
	slot: "Root",
	overridesResolver: (e, t) => t.root
})({ "@media print": { position: "absolute !important" } }), hr = re("div", {
	name: "MuiDialog",
	slot: "Container",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [t.container, t[`scroll${He(n.scroll)}`]];
	}
})(({ ownerState: e }) => L({
	height: "100%",
	"@media print": { height: "auto" },
	outline: 0
}, e.scroll === "paper" && {
	display: "flex",
	justifyContent: "center",
	alignItems: "center"
}, e.scroll === "body" && {
	overflowY: "auto",
	overflowX: "hidden",
	textAlign: "center",
	"&::after": {
		content: "\"\"",
		display: "inline-block",
		verticalAlign: "middle",
		height: "100%",
		width: "0"
	}
})), gr = re(ae, {
	name: "MuiDialog",
	slot: "Paper",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.paper,
			t[`scrollPaper${He(n.scroll)}`],
			t[`paperWidth${He(String(n.maxWidth))}`],
			n.fullWidth && t.paperFullWidth,
			n.fullScreen && t.paperFullScreen
		];
	}
})(({ theme: e, ownerState: t }) => L({
	margin: 32,
	position: "relative",
	overflowY: "auto",
	"@media print": {
		overflowY: "visible",
		boxShadow: "none"
	}
}, t.scroll === "paper" && {
	display: "flex",
	flexDirection: "column",
	maxHeight: "calc(100% - 64px)"
}, t.scroll === "body" && {
	display: "inline-block",
	verticalAlign: "middle",
	textAlign: "left"
}, !t.maxWidth && { maxWidth: "calc(100% - 64px)" }, t.maxWidth === "xs" && {
	maxWidth: e.breakpoints.unit === "px" ? Math.max(e.breakpoints.values.xs, 444) : `max(${e.breakpoints.values.xs}${e.breakpoints.unit}, 444px)`,
	[`&.${lr.paperScrollBody}`]: { [e.breakpoints.down(Math.max(e.breakpoints.values.xs, 444) + 64)]: { maxWidth: "calc(100% - 64px)" } }
}, t.maxWidth && t.maxWidth !== "xs" && {
	maxWidth: `${e.breakpoints.values[t.maxWidth]}${e.breakpoints.unit}`,
	[`&.${lr.paperScrollBody}`]: { [e.breakpoints.down(e.breakpoints.values[t.maxWidth] + 64)]: { maxWidth: "calc(100% - 64px)" } }
}, t.fullWidth && { width: "calc(100% - 64px)" }, t.fullScreen && {
	margin: 0,
	width: "100%",
	maxWidth: "100%",
	height: "100%",
	maxHeight: "none",
	borderRadius: 0,
	[`&.${lr.paperScrollBody}`]: {
		margin: 0,
		maxWidth: "100%"
	}
})), _r = /*#__PURE__*/ z.forwardRef(function(e, t) {
	let n = j({
		props: e,
		name: "MuiDialog"
	}), r = le(), i = {
		enter: r.transitions.duration.enteringScreen,
		exit: r.transitions.duration.leavingScreen
	}, { "aria-describedby": a, "aria-labelledby": o, BackdropComponent: s, BackdropProps: c, children: l, className: u, disableEscapeKeyDown: d = !1, fullScreen: f = !1, fullWidth: p = !1, maxWidth: m = "sm", onBackdropClick: h, onClick: g, onClose: _, open: v, PaperComponent: y = ae, PaperProps: b = {}, scroll: x = "paper", TransitionComponent: S = Ne, transitionDuration: C = i, TransitionProps: w } = n, T = Jt(n, dr), E = L({}, n, {
		disableEscapeKeyDown: d,
		fullScreen: f,
		fullWidth: p,
		maxWidth: m,
		scroll: x
	}), D = pr(E), O = z.useRef(), k = (e) => {
		O.current = e.target === e.currentTarget;
	}, te = (e) => {
		g && g(e), O.current && (O.current = null, h && h(e), _ && _(e, "backdropClick"));
	}, ne = ee(o), re = z.useMemo(() => ({ titleId: ne }), [ne]);
	return /*#__PURE__*/ (0, R.jsx)(mr, L({
		className: We(D.root, u),
		closeAfterTransition: !0,
		components: { Backdrop: fr },
		componentsProps: { backdrop: L({
			transitionDuration: C,
			as: s
		}, c) },
		disableEscapeKeyDown: d,
		onClose: _,
		open: v,
		ref: t,
		onClick: te,
		ownerState: E
	}, T, { children: /*#__PURE__*/ (0, R.jsx)(S, L({
		appear: !0,
		in: v,
		timeout: C,
		role: "presentation"
	}, w, { children: /*#__PURE__*/ (0, R.jsx)(hr, {
		className: We(D.container),
		onMouseDown: k,
		ownerState: E,
		children: /*#__PURE__*/ (0, R.jsx)(gr, L({
			as: y,
			elevation: 24,
			role: "dialog",
			"aria-describedby": a,
			"aria-labelledby": ne
		}, b, {
			className: We(D.paper, b.className),
			ownerState: E,
			children: /*#__PURE__*/ (0, R.jsx)(ur.Provider, {
				value: re,
				children: l
			})
		}))
	}) })) }));
});
//#endregion
//#region ../../node_modules/@mui/material/DialogActions/dialogActionsClasses.js
function vr(e) {
	return Be("MuiDialogActions", e);
}
Pe("MuiDialogActions", ["root", "spacing"]), ln(), it();
var yr = ["className", "disableSpacing"], br = (e) => {
	let { classes: t, disableSpacing: n } = e;
	return Le({ root: ["root", !n && "spacing"] }, vr, t);
}, xr = re("div", {
	name: "MuiDialogActions",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [t.root, !n.disableSpacing && t.spacing];
	}
})(({ ownerState: e }) => L({
	display: "flex",
	alignItems: "center",
	padding: 8,
	justifyContent: "flex-end",
	flex: "0 0 auto"
}, !e.disableSpacing && { "& > :not(style) ~ :not(style)": { marginLeft: 8 } })), Sr = /*#__PURE__*/ z.forwardRef(function(e, t) {
	let n = j({
		props: e,
		name: "MuiDialogActions"
	}), { className: r, disableSpacing: i = !1 } = n, a = Jt(n, yr), o = L({}, n, { disableSpacing: i });
	return /*#__PURE__*/ (0, R.jsx)(xr, L({
		className: We(br(o).root, r),
		ownerState: o,
		ref: t
	}, a));
});
//#endregion
//#region ../../node_modules/@mui/material/DialogContent/dialogContentClasses.js
function Cr(e) {
	return Be("MuiDialogContent", e);
}
Pe("MuiDialogContent", ["root", "dividers"]);
//#endregion
//#region ../../node_modules/@mui/material/DialogTitle/dialogTitleClasses.js
function wr(e) {
	return Be("MuiDialogTitle", e);
}
var Tr = Pe("MuiDialogTitle", ["root"]);
ln(), it();
var Er = ["className", "dividers"], Dr = (e) => {
	let { classes: t, dividers: n } = e;
	return Le({ root: ["root", n && "dividers"] }, Cr, t);
}, Or = re("div", {
	name: "MuiDialogContent",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [t.root, n.dividers && t.dividers];
	}
})(({ theme: e, ownerState: t }) => L({
	flex: "1 1 auto",
	WebkitOverflowScrolling: "touch",
	overflowY: "auto",
	padding: "20px 24px"
}, t.dividers ? {
	padding: "16px 24px",
	borderTop: `1px solid ${(e.vars || e).palette.divider}`,
	borderBottom: `1px solid ${(e.vars || e).palette.divider}`
} : { [`.${Tr.root} + &`]: { paddingTop: 0 } })), kr = /*#__PURE__*/ z.forwardRef(function(e, t) {
	let n = j({
		props: e,
		name: "MuiDialogContent"
	}), { className: r, dividers: i = !1 } = n, a = Jt(n, Er), o = L({}, n, { dividers: i });
	return /*#__PURE__*/ (0, R.jsx)(Or, L({
		className: We(Dr(o).root, r),
		ownerState: o,
		ref: t
	}, a));
});
it(), ln();
var Ar = ["className", "id"], jr = (e) => {
	let { classes: t } = e;
	return Le({ root: ["root"] }, wr, t);
}, Mr = re(Zn, {
	name: "MuiDialogTitle",
	slot: "Root",
	overridesResolver: (e, t) => t.root
})({
	padding: "16px 24px",
	flex: "0 0 auto"
}), Nr = /*#__PURE__*/ z.forwardRef(function(e, t) {
	let n = j({
		props: e,
		name: "MuiDialogTitle"
	}), { className: r, id: i } = n, a = Jt(n, Ar), o = n, s = jr(o), { titleId: c = i } = z.useContext(ur);
	return /*#__PURE__*/ (0, R.jsx)(Mr, L({
		component: "h2",
		className: We(s.root, r),
		ownerState: o,
		ref: t,
		variant: "h6",
		id: i ?? c
	}, a));
});
ln(), it();
var Pr = [
	"children",
	"className",
	"disableTypography",
	"inset",
	"primary",
	"primaryTypographyProps",
	"secondary",
	"secondaryTypographyProps"
], Fr = (e) => {
	let { classes: t, inset: n, primary: r, secondary: i, dense: a } = e;
	return Le({
		root: [
			"root",
			n && "inset",
			a && "dense",
			r && i && "multiline"
		],
		primary: ["primary"],
		secondary: ["secondary"]
	}, pe, t);
}, Ir = re("div", {
	name: "MuiListItemText",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			{ [`& .${ye.primary}`]: t.primary },
			{ [`& .${ye.secondary}`]: t.secondary },
			t.root,
			n.inset && t.inset,
			n.primary && n.secondary && t.multiline,
			n.dense && t.dense
		];
	}
})(({ ownerState: e }) => L({
	flex: "1 1 auto",
	minWidth: 0,
	marginTop: 4,
	marginBottom: 4
}, e.primary && e.secondary && {
	marginTop: 6,
	marginBottom: 6
}, e.inset && { paddingLeft: 56 })), Lr = /*#__PURE__*/ z.forwardRef(function(e, t) {
	let n = j({
		props: e,
		name: "MuiListItemText"
	}), { children: r, className: i, disableTypography: a = !1, inset: o = !1, primary: s, primaryTypographyProps: c, secondary: l, secondaryTypographyProps: u } = n, d = Jt(n, Pr), { dense: f } = z.useContext(C), p = s ?? r, m = l, h = L({}, n, {
		disableTypography: a,
		inset: o,
		primary: !!p,
		secondary: !!m,
		dense: f
	}), g = Fr(h);
	return p != null && p.type !== Zn && !a && (p = /*#__PURE__*/ (0, R.jsx)(Zn, L({
		variant: f ? "body2" : "body1",
		className: g.primary,
		component: c != null && c.variant ? void 0 : "span",
		display: "block"
	}, c, { children: p }))), m != null && m.type !== Zn && !a && (m = /*#__PURE__*/ (0, R.jsx)(Zn, L({
		variant: "body2",
		className: g.secondary,
		color: "text.secondary",
		display: "block"
	}, u, { children: m }))), /*#__PURE__*/ (0, R.jsxs)(Ir, L({
		className: We(g.root, i),
		ownerState: h,
		ref: t
	}, d, { children: [p, m] }));
}), Rr = /* @__PURE__ */ t(((e, t) => {
	function n(e, t) {
		for (var n = -1, r = e == null ? 0 : e.length, i = Array(r); ++n < r;) i[n] = t(e[n], n, e);
		return i;
	}
	t.exports = n;
})), zr = /* @__PURE__ */ t(((e, t) => {
	function n() {
		this.__data__ = [], this.size = 0;
	}
	t.exports = n;
})), Br = /* @__PURE__ */ t(((e, t) => {
	function n(e, t) {
		return e === t || e !== e && t !== t;
	}
	t.exports = n;
})), Vr = /* @__PURE__ */ t(((e, t) => {
	var n = Br();
	function r(e, t) {
		for (var r = e.length; r--;) if (n(e[r][0], t)) return r;
		return -1;
	}
	t.exports = r;
})), Hr = /* @__PURE__ */ t(((e, t) => {
	var n = Vr(), r = Array.prototype.splice;
	function i(e) {
		var t = this.__data__, i = n(t, e);
		return i < 0 ? !1 : (i == t.length - 1 ? t.pop() : r.call(t, i, 1), --this.size, !0);
	}
	t.exports = i;
})), Ur = /* @__PURE__ */ t(((e, t) => {
	var n = Vr();
	function r(e) {
		var t = this.__data__, r = n(t, e);
		return r < 0 ? void 0 : t[r][1];
	}
	t.exports = r;
})), Wr = /* @__PURE__ */ t(((e, t) => {
	var n = Vr();
	function r(e) {
		return n(this.__data__, e) > -1;
	}
	t.exports = r;
})), Gr = /* @__PURE__ */ t(((e, t) => {
	var n = Vr();
	function r(e, t) {
		var r = this.__data__, i = n(r, e);
		return i < 0 ? (++this.size, r.push([e, t])) : r[i][1] = t, this;
	}
	t.exports = r;
})), Kr = /* @__PURE__ */ t(((e, t) => {
	var n = zr(), r = Hr(), i = Ur(), a = Wr(), o = Gr();
	function s(e) {
		var t = -1, n = e == null ? 0 : e.length;
		for (this.clear(); ++t < n;) {
			var r = e[t];
			this.set(r[0], r[1]);
		}
	}
	s.prototype.clear = n, s.prototype.delete = r, s.prototype.get = i, s.prototype.has = a, s.prototype.set = o, t.exports = s;
})), qr = /* @__PURE__ */ t(((e, t) => {
	var n = Kr();
	function r() {
		this.__data__ = new n(), this.size = 0;
	}
	t.exports = r;
})), Jr = /* @__PURE__ */ t(((e, t) => {
	function n(e) {
		var t = this.__data__, n = t.delete(e);
		return this.size = t.size, n;
	}
	t.exports = n;
})), Yr = /* @__PURE__ */ t(((e, t) => {
	function n(e) {
		return this.__data__.get(e);
	}
	t.exports = n;
})), Xr = /* @__PURE__ */ t(((e, t) => {
	function n(e) {
		return this.__data__.has(e);
	}
	t.exports = n;
})), Zr = /* @__PURE__ */ t(((e, t) => {
	t.exports = typeof globalThis == "object" && globalThis && globalThis.Object === Object && globalThis;
})), Qr = /* @__PURE__ */ t(((e, t) => {
	var n = Zr(), r = typeof self == "object" && self && self.Object === Object && self;
	t.exports = n || r || Function("return this")();
})), $r = /* @__PURE__ */ t(((e, t) => {
	t.exports = Qr().Symbol;
})), ei = /* @__PURE__ */ t(((e, t) => {
	var n = $r(), r = Object.prototype, i = r.hasOwnProperty, a = r.toString, o = n ? n.toStringTag : void 0;
	function s(e) {
		var t = i.call(e, o), n = e[o];
		try {
			e[o] = void 0;
			var r = !0;
		} catch {}
		var s = a.call(e);
		return r && (t ? e[o] = n : delete e[o]), s;
	}
	t.exports = s;
})), ti = /* @__PURE__ */ t(((e, t) => {
	var n = Object.prototype.toString;
	function r(e) {
		return n.call(e);
	}
	t.exports = r;
})), ni = /* @__PURE__ */ t(((e, t) => {
	var n = $r(), r = ei(), i = ti(), a = "[object Null]", o = "[object Undefined]", s = n ? n.toStringTag : void 0;
	function c(e) {
		return e == null ? e === void 0 ? o : a : s && s in Object(e) ? r(e) : i(e);
	}
	t.exports = c;
})), ri = /* @__PURE__ */ t(((e, t) => {
	function n(e) {
		var t = typeof e;
		return e != null && (t == "object" || t == "function");
	}
	t.exports = n;
})), ii = /* @__PURE__ */ t(((e, t) => {
	var n = ni(), r = ri(), i = "[object AsyncFunction]", a = "[object Function]", o = "[object GeneratorFunction]", s = "[object Proxy]";
	function c(e) {
		if (!r(e)) return !1;
		var t = n(e);
		return t == a || t == o || t == i || t == s;
	}
	t.exports = c;
})), ai = /* @__PURE__ */ t(((e, t) => {
	t.exports = Qr()["__core-js_shared__"];
})), oi = /* @__PURE__ */ t(((e, t) => {
	var n = ai(), r = function() {
		var e = /[^.]+$/.exec(n && n.keys && n.keys.IE_PROTO || "");
		return e ? "Symbol(src)_1." + e : "";
	}();
	function i(e) {
		return !!r && r in e;
	}
	t.exports = i;
})), si = /* @__PURE__ */ t(((e, t) => {
	var n = Function.prototype.toString;
	function r(e) {
		if (e != null) {
			try {
				return n.call(e);
			} catch {}
			try {
				return e + "";
			} catch {}
		}
		return "";
	}
	t.exports = r;
})), ci = /* @__PURE__ */ t(((e, t) => {
	var n = ii(), r = oi(), i = ri(), a = si(), o = /[\\^$.*+?()[\]{}|]/g, s = /^\[object .+?Constructor\]$/, c = Function.prototype, l = Object.prototype, u = c.toString, d = l.hasOwnProperty, f = RegExp("^" + u.call(d).replace(o, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
	function p(e) {
		return !i(e) || r(e) ? !1 : (n(e) ? f : s).test(a(e));
	}
	t.exports = p;
})), li = /* @__PURE__ */ t(((e, t) => {
	function n(e, t) {
		return e?.[t];
	}
	t.exports = n;
})), ui = /* @__PURE__ */ t(((e, t) => {
	var n = ci(), r = li();
	function i(e, t) {
		var i = r(e, t);
		return n(i) ? i : void 0;
	}
	t.exports = i;
})), di = /* @__PURE__ */ t(((e, t) => {
	t.exports = ui()(Qr(), "Map");
})), fi = /* @__PURE__ */ t(((e, t) => {
	t.exports = ui()(Object, "create");
})), pi = /* @__PURE__ */ t(((e, t) => {
	var n = fi();
	function r() {
		this.__data__ = n ? n(null) : {}, this.size = 0;
	}
	t.exports = r;
})), mi = /* @__PURE__ */ t(((e, t) => {
	function n(e) {
		var t = this.has(e) && delete this.__data__[e];
		return this.size -= +!!t, t;
	}
	t.exports = n;
})), hi = /* @__PURE__ */ t(((e, t) => {
	var n = fi(), r = "__lodash_hash_undefined__", i = Object.prototype.hasOwnProperty;
	function a(e) {
		var t = this.__data__;
		if (n) {
			var a = t[e];
			return a === r ? void 0 : a;
		}
		return i.call(t, e) ? t[e] : void 0;
	}
	t.exports = a;
})), gi = /* @__PURE__ */ t(((e, t) => {
	var n = fi(), r = Object.prototype.hasOwnProperty;
	function i(e) {
		var t = this.__data__;
		return n ? t[e] !== void 0 : r.call(t, e);
	}
	t.exports = i;
})), _i = /* @__PURE__ */ t(((e, t) => {
	var n = fi(), r = "__lodash_hash_undefined__";
	function i(e, t) {
		var i = this.__data__;
		return this.size += +!this.has(e), i[e] = n && t === void 0 ? r : t, this;
	}
	t.exports = i;
})), vi = /* @__PURE__ */ t(((e, t) => {
	var n = pi(), r = mi(), i = hi(), a = gi(), o = _i();
	function s(e) {
		var t = -1, n = e == null ? 0 : e.length;
		for (this.clear(); ++t < n;) {
			var r = e[t];
			this.set(r[0], r[1]);
		}
	}
	s.prototype.clear = n, s.prototype.delete = r, s.prototype.get = i, s.prototype.has = a, s.prototype.set = o, t.exports = s;
})), yi = /* @__PURE__ */ t(((e, t) => {
	var n = vi(), r = Kr(), i = di();
	function a() {
		this.size = 0, this.__data__ = {
			hash: new n(),
			map: new (i || r)(),
			string: new n()
		};
	}
	t.exports = a;
})), bi = /* @__PURE__ */ t(((e, t) => {
	function n(e) {
		var t = typeof e;
		return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
	}
	t.exports = n;
})), xi = /* @__PURE__ */ t(((e, t) => {
	var n = bi();
	function r(e, t) {
		var r = e.__data__;
		return n(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
	}
	t.exports = r;
})), Si = /* @__PURE__ */ t(((e, t) => {
	var n = xi();
	function r(e) {
		var t = n(this, e).delete(e);
		return this.size -= +!!t, t;
	}
	t.exports = r;
})), Ci = /* @__PURE__ */ t(((e, t) => {
	var n = xi();
	function r(e) {
		return n(this, e).get(e);
	}
	t.exports = r;
})), wi = /* @__PURE__ */ t(((e, t) => {
	var n = xi();
	function r(e) {
		return n(this, e).has(e);
	}
	t.exports = r;
})), Ti = /* @__PURE__ */ t(((e, t) => {
	var n = xi();
	function r(e, t) {
		var r = n(this, e), i = r.size;
		return r.set(e, t), this.size += r.size == i ? 0 : 1, this;
	}
	t.exports = r;
})), Ei = /* @__PURE__ */ t(((e, t) => {
	var n = yi(), r = Si(), i = Ci(), a = wi(), o = Ti();
	function s(e) {
		var t = -1, n = e == null ? 0 : e.length;
		for (this.clear(); ++t < n;) {
			var r = e[t];
			this.set(r[0], r[1]);
		}
	}
	s.prototype.clear = n, s.prototype.delete = r, s.prototype.get = i, s.prototype.has = a, s.prototype.set = o, t.exports = s;
})), Di = /* @__PURE__ */ t(((e, t) => {
	var n = Kr(), r = di(), i = Ei(), a = 200;
	function o(e, t) {
		var o = this.__data__;
		if (o instanceof n) {
			var s = o.__data__;
			if (!r || s.length < a - 1) return s.push([e, t]), this.size = ++o.size, this;
			o = this.__data__ = new i(s);
		}
		return o.set(e, t), this.size = o.size, this;
	}
	t.exports = o;
})), Oi = /* @__PURE__ */ t(((e, t) => {
	var n = Kr(), r = qr(), i = Jr(), a = Yr(), o = Xr(), s = Di();
	function c(e) {
		var t = this.__data__ = new n(e);
		this.size = t.size;
	}
	c.prototype.clear = r, c.prototype.delete = i, c.prototype.get = a, c.prototype.has = o, c.prototype.set = s, t.exports = c;
})), ki = /* @__PURE__ */ t(((e, t) => {
	function n(e, t) {
		for (var n = -1, r = e == null ? 0 : e.length; ++n < r && t(e[n], n, e) !== !1;);
		return e;
	}
	t.exports = n;
})), Ai = /* @__PURE__ */ t(((e, t) => {
	var n = ui();
	t.exports = function() {
		try {
			var e = n(Object, "defineProperty");
			return e({}, "", {}), e;
		} catch {}
	}();
})), ji = /* @__PURE__ */ t(((e, t) => {
	var n = Ai();
	function r(e, t, r) {
		t == "__proto__" && n ? n(e, t, {
			configurable: !0,
			enumerable: !0,
			value: r,
			writable: !0
		}) : e[t] = r;
	}
	t.exports = r;
})), Mi = /* @__PURE__ */ t(((e, t) => {
	var n = ji(), r = Br(), i = Object.prototype.hasOwnProperty;
	function a(e, t, a) {
		var o = e[t];
		(!(i.call(e, t) && r(o, a)) || a === void 0 && !(t in e)) && n(e, t, a);
	}
	t.exports = a;
})), Ni = /* @__PURE__ */ t(((e, t) => {
	var n = Mi(), r = ji();
	function i(e, t, i, a) {
		var o = !i;
		i ||= {};
		for (var s = -1, c = t.length; ++s < c;) {
			var l = t[s], u = a ? a(i[l], e[l], l, i, e) : void 0;
			u === void 0 && (u = e[l]), o ? r(i, l, u) : n(i, l, u);
		}
		return i;
	}
	t.exports = i;
})), Pi = /* @__PURE__ */ t(((e, t) => {
	function n(e, t) {
		for (var n = -1, r = Array(e); ++n < e;) r[n] = t(n);
		return r;
	}
	t.exports = n;
})), Fi = /* @__PURE__ */ t(((e, t) => {
	function n(e) {
		return typeof e == "object" && !!e;
	}
	t.exports = n;
})), Ii = /* @__PURE__ */ t(((e, t) => {
	var n = ni(), r = Fi(), i = "[object Arguments]";
	function a(e) {
		return r(e) && n(e) == i;
	}
	t.exports = a;
})), Li = /* @__PURE__ */ t(((e, t) => {
	var n = Ii(), r = Fi(), i = Object.prototype, a = i.hasOwnProperty, o = i.propertyIsEnumerable;
	t.exports = n(function() {
		return arguments;
	}()) ? n : function(e) {
		return r(e) && a.call(e, "callee") && !o.call(e, "callee");
	};
})), Ri = /* @__PURE__ */ t(((e, t) => {
	t.exports = Array.isArray;
})), zi = /* @__PURE__ */ t(((e, t) => {
	function n() {
		return !1;
	}
	t.exports = n;
})), Bi = /* @__PURE__ */ t(((e, t) => {
	var n = Qr(), r = zi(), i = typeof e == "object" && e && !e.nodeType && e, a = i && typeof t == "object" && t && !t.nodeType && t, o = a && a.exports === i ? n.Buffer : void 0;
	t.exports = (o ? o.isBuffer : void 0) || r;
})), Vi = /* @__PURE__ */ t(((e, t) => {
	var n = 9007199254740991, r = /^(?:0|[1-9]\d*)$/;
	function i(e, t) {
		var i = typeof e;
		return t ??= n, !!t && (i == "number" || i != "symbol" && r.test(e)) && e > -1 && e % 1 == 0 && e < t;
	}
	t.exports = i;
})), Hi = /* @__PURE__ */ t(((e, t) => {
	var n = 9007199254740991;
	function r(e) {
		return typeof e == "number" && e > -1 && e % 1 == 0 && e <= n;
	}
	t.exports = r;
})), Ui = /* @__PURE__ */ t(((e, t) => {
	var n = ni(), r = Hi(), i = Fi(), a = "[object Arguments]", o = "[object Array]", s = "[object Boolean]", c = "[object Date]", l = "[object Error]", u = "[object Function]", d = "[object Map]", f = "[object Number]", p = "[object Object]", m = "[object RegExp]", h = "[object Set]", g = "[object String]", _ = "[object WeakMap]", v = "[object ArrayBuffer]", y = "[object DataView]", b = "[object Float32Array]", x = "[object Float64Array]", S = "[object Int8Array]", C = "[object Int16Array]", w = "[object Int32Array]", T = "[object Uint8Array]", E = "[object Uint8ClampedArray]", D = "[object Uint16Array]", O = "[object Uint32Array]", k = {};
	k[b] = k[x] = k[S] = k[C] = k[w] = k[T] = k[E] = k[D] = k[O] = !0, k[a] = k[o] = k[v] = k[s] = k[y] = k[c] = k[l] = k[u] = k[d] = k[f] = k[p] = k[m] = k[h] = k[g] = k[_] = !1;
	function ee(e) {
		return i(e) && r(e.length) && !!k[n(e)];
	}
	t.exports = ee;
})), Wi = /* @__PURE__ */ t(((e, t) => {
	function n(e) {
		return function(t) {
			return e(t);
		};
	}
	t.exports = n;
})), Gi = /* @__PURE__ */ t(((e, t) => {
	var n = Zr(), r = typeof e == "object" && e && !e.nodeType && e, i = r && typeof t == "object" && t && !t.nodeType && t, a = i && i.exports === r && n.process;
	t.exports = function() {
		try {
			return i && i.require && i.require("util").types || a && a.binding && a.binding("util");
		} catch {}
	}();
})), Ki = /* @__PURE__ */ t(((e, t) => {
	var n = Ui(), r = Wi(), i = Gi(), a = i && i.isTypedArray;
	t.exports = a ? r(a) : n;
})), qi = /* @__PURE__ */ t(((e, t) => {
	var n = Pi(), r = Li(), i = Ri(), a = Bi(), o = Vi(), s = Ki(), c = Object.prototype.hasOwnProperty;
	function l(e, t) {
		var l = i(e), u = !l && r(e), d = !l && !u && a(e), f = !l && !u && !d && s(e), p = l || u || d || f, m = p ? n(e.length, String) : [], h = m.length;
		for (var g in e) (t || c.call(e, g)) && !(p && (g == "length" || d && (g == "offset" || g == "parent") || f && (g == "buffer" || g == "byteLength" || g == "byteOffset") || o(g, h))) && m.push(g);
		return m;
	}
	t.exports = l;
})), Ji = /* @__PURE__ */ t(((e, t) => {
	var n = Object.prototype;
	function r(e) {
		var t = e && e.constructor;
		return e === (typeof t == "function" && t.prototype || n);
	}
	t.exports = r;
})), Yi = /* @__PURE__ */ t(((e, t) => {
	function n(e, t) {
		return function(n) {
			return e(t(n));
		};
	}
	t.exports = n;
})), Xi = /* @__PURE__ */ t(((e, t) => {
	t.exports = Yi()(Object.keys, Object);
})), Zi = /* @__PURE__ */ t(((e, t) => {
	var n = Ji(), r = Xi(), i = Object.prototype.hasOwnProperty;
	function a(e) {
		if (!n(e)) return r(e);
		var t = [];
		for (var a in Object(e)) i.call(e, a) && a != "constructor" && t.push(a);
		return t;
	}
	t.exports = a;
})), Qi = /* @__PURE__ */ t(((e, t) => {
	var n = ii(), r = Hi();
	function i(e) {
		return e != null && r(e.length) && !n(e);
	}
	t.exports = i;
})), $i = /* @__PURE__ */ t(((e, t) => {
	var n = qi(), r = Zi(), i = Qi();
	function a(e) {
		return i(e) ? n(e) : r(e);
	}
	t.exports = a;
})), ea = /* @__PURE__ */ t(((e, t) => {
	var n = Ni(), r = $i();
	function i(e, t) {
		return e && n(t, r(t), e);
	}
	t.exports = i;
})), ta = /* @__PURE__ */ t(((e, t) => {
	function n(e) {
		var t = [];
		if (e != null) for (var n in Object(e)) t.push(n);
		return t;
	}
	t.exports = n;
})), na = /* @__PURE__ */ t(((e, t) => {
	var n = ri(), r = Ji(), i = ta(), a = Object.prototype.hasOwnProperty;
	function o(e) {
		if (!n(e)) return i(e);
		var t = r(e), o = [];
		for (var s in e) s == "constructor" && (t || !a.call(e, s)) || o.push(s);
		return o;
	}
	t.exports = o;
})), ra = /* @__PURE__ */ t(((e, t) => {
	var n = qi(), r = na(), i = Qi();
	function a(e) {
		return i(e) ? n(e, !0) : r(e);
	}
	t.exports = a;
})), ia = /* @__PURE__ */ t(((e, t) => {
	var n = Ni(), r = ra();
	function i(e, t) {
		return e && n(t, r(t), e);
	}
	t.exports = i;
})), aa = /* @__PURE__ */ t(((e, t) => {
	var n = Qr(), r = typeof e == "object" && e && !e.nodeType && e, i = r && typeof t == "object" && t && !t.nodeType && t, a = i && i.exports === r ? n.Buffer : void 0, o = a ? a.allocUnsafe : void 0;
	function s(e, t) {
		if (t) return e.slice();
		var n = e.length, r = o ? o(n) : new e.constructor(n);
		return e.copy(r), r;
	}
	t.exports = s;
})), oa = /* @__PURE__ */ t(((e, t) => {
	function n(e, t) {
		var n = -1, r = e.length;
		for (t ||= Array(r); ++n < r;) t[n] = e[n];
		return t;
	}
	t.exports = n;
})), sa = /* @__PURE__ */ t(((e, t) => {
	function n(e, t) {
		for (var n = -1, r = e == null ? 0 : e.length, i = 0, a = []; ++n < r;) {
			var o = e[n];
			t(o, n, e) && (a[i++] = o);
		}
		return a;
	}
	t.exports = n;
})), ca = /* @__PURE__ */ t(((e, t) => {
	function n() {
		return [];
	}
	t.exports = n;
})), la = /* @__PURE__ */ t(((e, t) => {
	var n = sa(), r = ca(), i = Object.prototype.propertyIsEnumerable, a = Object.getOwnPropertySymbols;
	t.exports = a ? function(e) {
		return e == null ? [] : (e = Object(e), n(a(e), function(t) {
			return i.call(e, t);
		}));
	} : r;
})), ua = /* @__PURE__ */ t(((e, t) => {
	var n = Ni(), r = la();
	function i(e, t) {
		return n(e, r(e), t);
	}
	t.exports = i;
})), da = /* @__PURE__ */ t(((e, t) => {
	function n(e, t) {
		for (var n = -1, r = t.length, i = e.length; ++n < r;) e[i + n] = t[n];
		return e;
	}
	t.exports = n;
})), fa = /* @__PURE__ */ t(((e, t) => {
	t.exports = Yi()(Object.getPrototypeOf, Object);
})), pa = /* @__PURE__ */ t(((e, t) => {
	var n = da(), r = fa(), i = la(), a = ca();
	t.exports = Object.getOwnPropertySymbols ? function(e) {
		for (var t = []; e;) n(t, i(e)), e = r(e);
		return t;
	} : a;
})), ma = /* @__PURE__ */ t(((e, t) => {
	var n = Ni(), r = pa();
	function i(e, t) {
		return n(e, r(e), t);
	}
	t.exports = i;
})), ha = /* @__PURE__ */ t(((e, t) => {
	var n = da(), r = Ri();
	function i(e, t, i) {
		var a = t(e);
		return r(e) ? a : n(a, i(e));
	}
	t.exports = i;
})), ga = /* @__PURE__ */ t(((e, t) => {
	var n = ha(), r = la(), i = $i();
	function a(e) {
		return n(e, i, r);
	}
	t.exports = a;
})), _a = /* @__PURE__ */ t(((e, t) => {
	var n = ha(), r = pa(), i = ra();
	function a(e) {
		return n(e, i, r);
	}
	t.exports = a;
})), va = /* @__PURE__ */ t(((e, t) => {
	t.exports = ui()(Qr(), "DataView");
})), ya = /* @__PURE__ */ t(((e, t) => {
	t.exports = ui()(Qr(), "Promise");
})), ba = /* @__PURE__ */ t(((e, t) => {
	t.exports = ui()(Qr(), "Set");
})), xa = /* @__PURE__ */ t(((e, t) => {
	t.exports = ui()(Qr(), "WeakMap");
})), Sa = /* @__PURE__ */ t(((e, t) => {
	var n = va(), r = di(), i = ya(), a = ba(), o = xa(), s = ni(), c = si(), l = "[object Map]", u = "[object Object]", d = "[object Promise]", f = "[object Set]", p = "[object WeakMap]", m = "[object DataView]", h = c(n), g = c(r), _ = c(i), v = c(a), y = c(o), b = s;
	(n && b(new n(/* @__PURE__ */ new ArrayBuffer(1))) != m || r && b(new r()) != l || i && b(i.resolve()) != d || a && b(new a()) != f || o && b(new o()) != p) && (b = function(e) {
		var t = s(e), n = t == u ? e.constructor : void 0, r = n ? c(n) : "";
		if (r) switch (r) {
			case h: return m;
			case g: return l;
			case _: return d;
			case v: return f;
			case y: return p;
		}
		return t;
	}), t.exports = b;
})), Ca = /* @__PURE__ */ t(((e, t) => {
	var n = Object.prototype.hasOwnProperty;
	function r(e) {
		var t = e.length, r = new e.constructor(t);
		return t && typeof e[0] == "string" && n.call(e, "index") && (r.index = e.index, r.input = e.input), r;
	}
	t.exports = r;
})), wa = /* @__PURE__ */ t(((e, t) => {
	t.exports = Qr().Uint8Array;
})), Ta = /* @__PURE__ */ t(((e, t) => {
	var n = wa();
	function r(e) {
		var t = new e.constructor(e.byteLength);
		return new n(t).set(new n(e)), t;
	}
	t.exports = r;
})), Ea = /* @__PURE__ */ t(((e, t) => {
	var n = Ta();
	function r(e, t) {
		var r = t ? n(e.buffer) : e.buffer;
		return new e.constructor(r, e.byteOffset, e.byteLength);
	}
	t.exports = r;
})), Da = /* @__PURE__ */ t(((e, t) => {
	var n = /\w*$/;
	function r(e) {
		var t = new e.constructor(e.source, n.exec(e));
		return t.lastIndex = e.lastIndex, t;
	}
	t.exports = r;
})), Oa = /* @__PURE__ */ t(((e, t) => {
	var n = $r(), r = n ? n.prototype : void 0, i = r ? r.valueOf : void 0;
	function a(e) {
		return i ? Object(i.call(e)) : {};
	}
	t.exports = a;
})), ka = /* @__PURE__ */ t(((e, t) => {
	var n = Ta();
	function r(e, t) {
		var r = t ? n(e.buffer) : e.buffer;
		return new e.constructor(r, e.byteOffset, e.length);
	}
	t.exports = r;
})), Aa = /* @__PURE__ */ t(((e, t) => {
	var n = Ta(), r = Ea(), i = Da(), a = Oa(), o = ka(), s = "[object Boolean]", c = "[object Date]", l = "[object Map]", u = "[object Number]", d = "[object RegExp]", f = "[object Set]", p = "[object String]", m = "[object Symbol]", h = "[object ArrayBuffer]", g = "[object DataView]", _ = "[object Float32Array]", v = "[object Float64Array]", y = "[object Int8Array]", b = "[object Int16Array]", x = "[object Int32Array]", S = "[object Uint8Array]", C = "[object Uint8ClampedArray]", w = "[object Uint16Array]", T = "[object Uint32Array]";
	function E(e, t, E) {
		var D = e.constructor;
		switch (t) {
			case h: return n(e);
			case s:
			case c: return new D(+e);
			case g: return r(e, E);
			case _:
			case v:
			case y:
			case b:
			case x:
			case S:
			case C:
			case w:
			case T: return o(e, E);
			case l: return new D();
			case u:
			case p: return new D(e);
			case d: return i(e);
			case f: return new D();
			case m: return a(e);
		}
	}
	t.exports = E;
})), ja = /* @__PURE__ */ t(((e, t) => {
	var n = ri(), r = Object.create;
	t.exports = function() {
		function e() {}
		return function(t) {
			if (!n(t)) return {};
			if (r) return r(t);
			e.prototype = t;
			var i = new e();
			return e.prototype = void 0, i;
		};
	}();
})), Ma = /* @__PURE__ */ t(((e, t) => {
	var n = ja(), r = fa(), i = Ji();
	function a(e) {
		return typeof e.constructor == "function" && !i(e) ? n(r(e)) : {};
	}
	t.exports = a;
})), Na = /* @__PURE__ */ t(((e, t) => {
	var n = Sa(), r = Fi(), i = "[object Map]";
	function a(e) {
		return r(e) && n(e) == i;
	}
	t.exports = a;
})), Pa = /* @__PURE__ */ t(((e, t) => {
	var n = Na(), r = Wi(), i = Gi(), a = i && i.isMap;
	t.exports = a ? r(a) : n;
})), Fa = /* @__PURE__ */ t(((e, t) => {
	var n = Sa(), r = Fi(), i = "[object Set]";
	function a(e) {
		return r(e) && n(e) == i;
	}
	t.exports = a;
})), Ia = /* @__PURE__ */ t(((e, t) => {
	var n = Fa(), r = Wi(), i = Gi(), a = i && i.isSet;
	t.exports = a ? r(a) : n;
})), La = /* @__PURE__ */ t(((e, t) => {
	var n = Oi(), r = ki(), i = Mi(), a = ea(), o = ia(), s = aa(), c = oa(), l = ua(), u = ma(), d = ga(), f = _a(), p = Sa(), m = Ca(), h = Aa(), g = Ma(), _ = Ri(), v = Bi(), y = Pa(), b = ri(), x = Ia(), S = $i(), C = ra(), w = 1, T = 2, E = 4, D = "[object Arguments]", O = "[object Array]", k = "[object Boolean]", ee = "[object Date]", te = "[object Error]", ne = "[object Function]", re = "[object GeneratorFunction]", A = "[object Map]", j = "[object Number]", ie = "[object Object]", ae = "[object RegExp]", oe = "[object Set]", se = "[object String]", ce = "[object Symbol]", le = "[object WeakMap]", ue = "[object ArrayBuffer]", de = "[object DataView]", M = "[object Float32Array]", fe = "[object Float64Array]", pe = "[object Int8Array]", me = "[object Int16Array]", he = "[object Int32Array]", ge = "[object Uint8Array]", _e = "[object Uint8ClampedArray]", ve = "[object Uint16Array]", ye = "[object Uint32Array]", N = {};
	N[D] = N[O] = N[ue] = N[de] = N[k] = N[ee] = N[M] = N[fe] = N[pe] = N[me] = N[he] = N[A] = N[j] = N[ie] = N[ae] = N[oe] = N[se] = N[ce] = N[ge] = N[_e] = N[ve] = N[ye] = !0, N[te] = N[ne] = N[le] = !1;
	function be(e, t, O, k, ee, te) {
		var A, j = t & w, ae = t & T, oe = t & E;
		if (O && (A = ee ? O(e, k, ee, te) : O(e)), A !== void 0) return A;
		if (!b(e)) return e;
		var se = _(e);
		if (se) {
			if (A = m(e), !j) return c(e, A);
		} else {
			var ce = p(e), le = ce == ne || ce == re;
			if (v(e)) return s(e, j);
			if (ce == ie || ce == D || le && !ee) {
				if (A = ae || le ? {} : g(e), !j) return ae ? u(e, o(A, e)) : l(e, a(A, e));
			} else {
				if (!N[ce]) return ee ? e : {};
				A = h(e, ce, j);
			}
		}
		te ||= new n();
		var ue = te.get(e);
		if (ue) return ue;
		te.set(e, A), x(e) ? e.forEach(function(n) {
			A.add(be(n, t, O, n, e, te));
		}) : y(e) && e.forEach(function(n, r) {
			A.set(r, be(n, t, O, r, e, te));
		});
		var de = se ? void 0 : (oe ? ae ? f : d : ae ? C : S)(e);
		return r(de || e, function(n, r) {
			de && (r = n, n = e[r]), i(A, r, be(n, t, O, r, e, te));
		}), A;
	}
	t.exports = be;
})), Ra = /* @__PURE__ */ t(((e, t) => {
	var n = ni(), r = Fi(), i = "[object Symbol]";
	function a(e) {
		return typeof e == "symbol" || r(e) && n(e) == i;
	}
	t.exports = a;
})), za = /* @__PURE__ */ t(((e, t) => {
	var n = Ri(), r = Ra(), i = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, a = /^\w*$/;
	function o(e, t) {
		if (n(e)) return !1;
		var o = typeof e;
		return o == "number" || o == "symbol" || o == "boolean" || e == null || r(e) ? !0 : a.test(e) || !i.test(e) || t != null && e in Object(t);
	}
	t.exports = o;
})), Ba = /* @__PURE__ */ t(((e, t) => {
	var n = Ei(), r = "Expected a function";
	function i(e, t) {
		if (typeof e != "function" || t != null && typeof t != "function") throw TypeError(r);
		var a = function() {
			var n = arguments, r = t ? t.apply(this, n) : n[0], i = a.cache;
			if (i.has(r)) return i.get(r);
			var o = e.apply(this, n);
			return a.cache = i.set(r, o) || i, o;
		};
		return a.cache = new (i.Cache || n)(), a;
	}
	i.Cache = n, t.exports = i;
})), Va = /* @__PURE__ */ t(((e, t) => {
	var n = Ba(), r = 500;
	function i(e) {
		var t = n(e, function(e) {
			return i.size === r && i.clear(), e;
		}), i = t.cache;
		return t;
	}
	t.exports = i;
})), Ha = /* @__PURE__ */ t(((e, t) => {
	var n = Va(), r = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, i = /\\(\\)?/g;
	t.exports = n(function(e) {
		var t = [];
		return e.charCodeAt(0) === 46 && t.push(""), e.replace(r, function(e, n, r, a) {
			t.push(r ? a.replace(i, "$1") : n || e);
		}), t;
	});
})), Ua = /* @__PURE__ */ t(((e, t) => {
	var n = $r(), r = Rr(), i = Ri(), a = Ra(), o = Infinity, s = n ? n.prototype : void 0, c = s ? s.toString : void 0;
	function l(e) {
		if (typeof e == "string") return e;
		if (i(e)) return r(e, l) + "";
		if (a(e)) return c ? c.call(e) : "";
		var t = e + "";
		return t == "0" && 1 / e == -o ? "-0" : t;
	}
	t.exports = l;
})), Wa = /* @__PURE__ */ t(((e, t) => {
	var n = Ua();
	function r(e) {
		return e == null ? "" : n(e);
	}
	t.exports = r;
})), Ga = /* @__PURE__ */ t(((e, t) => {
	var n = Ri(), r = za(), i = Ha(), a = Wa();
	function o(e, t) {
		return n(e) ? e : r(e, t) ? [e] : i(a(e));
	}
	t.exports = o;
})), Ka = /* @__PURE__ */ t(((e, t) => {
	function n(e) {
		var t = e == null ? 0 : e.length;
		return t ? e[t - 1] : void 0;
	}
	t.exports = n;
})), qa = /* @__PURE__ */ t(((e, t) => {
	var n = Ra(), r = Infinity;
	function i(e) {
		if (typeof e == "string" || n(e)) return e;
		var t = e + "";
		return t == "0" && 1 / e == -r ? "-0" : t;
	}
	t.exports = i;
})), Ja = /* @__PURE__ */ t(((e, t) => {
	var n = Ga(), r = qa();
	function i(e, t) {
		t = n(t, e);
		for (var i = 0, a = t.length; e != null && i < a;) e = e[r(t[i++])];
		return i && i == a ? e : void 0;
	}
	t.exports = i;
})), Ya = /* @__PURE__ */ t(((e, t) => {
	function n(e, t, n) {
		var r = -1, i = e.length;
		t < 0 && (t = -t > i ? 0 : i + t), n = n > i ? i : n, n < 0 && (n += i), i = t > n ? 0 : n - t >>> 0, t >>>= 0;
		for (var a = Array(i); ++r < i;) a[r] = e[r + t];
		return a;
	}
	t.exports = n;
})), Xa = /* @__PURE__ */ t(((e, t) => {
	var n = Ja(), r = Ya();
	function i(e, t) {
		return t.length < 2 ? e : n(e, r(t, 0, -1));
	}
	t.exports = i;
})), Za = /* @__PURE__ */ t(((e, t) => {
	var n = Ga(), r = Ka(), i = Xa(), a = qa(), o = Object.prototype.hasOwnProperty;
	function s(e, t) {
		t = n(t, e);
		var s = -1, c = t.length;
		if (!c) return !0;
		for (; ++s < c;) {
			var l = a(t[s]);
			if (l === "__proto__" && !o.call(e, "__proto__") || (l === "constructor" || l === "prototype") && s < c - 1) return !1;
		}
		var u = i(e, t);
		return u == null || delete u[a(r(t))];
	}
	t.exports = s;
})), Qa = /* @__PURE__ */ t(((e, t) => {
	var n = ni(), r = fa(), i = Fi(), a = "[object Object]", o = Function.prototype, s = Object.prototype, c = o.toString, l = s.hasOwnProperty, u = c.call(Object);
	function d(e) {
		if (!i(e) || n(e) != a) return !1;
		var t = r(e);
		if (t === null) return !0;
		var o = l.call(t, "constructor") && t.constructor;
		return typeof o == "function" && o instanceof o && c.call(o) == u;
	}
	t.exports = d;
})), $a = /* @__PURE__ */ t(((e, t) => {
	var n = Qa();
	function r(e) {
		return n(e) ? void 0 : e;
	}
	t.exports = r;
})), eo = /* @__PURE__ */ t(((e, t) => {
	var n = $r(), r = Li(), i = Ri(), a = n ? n.isConcatSpreadable : void 0;
	function o(e) {
		return i(e) || r(e) || !!(a && e && e[a]);
	}
	t.exports = o;
})), to = /* @__PURE__ */ t(((e, t) => {
	var n = da(), r = eo();
	function i(e, t, a, o, s) {
		var c = -1, l = e.length;
		for (a ||= r, s ||= []; ++c < l;) {
			var u = e[c];
			t > 0 && a(u) ? t > 1 ? i(u, t - 1, a, o, s) : n(s, u) : o || (s[s.length] = u);
		}
		return s;
	}
	t.exports = i;
})), no = /* @__PURE__ */ t(((e, t) => {
	var n = to();
	function r(e) {
		return e != null && e.length ? n(e, 1) : [];
	}
	t.exports = r;
})), ro = /* @__PURE__ */ t(((e, t) => {
	function n(e, t, n) {
		switch (n.length) {
			case 0: return e.call(t);
			case 1: return e.call(t, n[0]);
			case 2: return e.call(t, n[0], n[1]);
			case 3: return e.call(t, n[0], n[1], n[2]);
		}
		return e.apply(t, n);
	}
	t.exports = n;
})), io = /* @__PURE__ */ t(((e, t) => {
	var n = ro(), r = Math.max;
	function i(e, t, i) {
		return t = r(t === void 0 ? e.length - 1 : t, 0), function() {
			for (var a = arguments, o = -1, s = r(a.length - t, 0), c = Array(s); ++o < s;) c[o] = a[t + o];
			o = -1;
			for (var l = Array(t + 1); ++o < t;) l[o] = a[o];
			return l[t] = i(c), n(e, this, l);
		};
	}
	t.exports = i;
})), ao = /* @__PURE__ */ t(((e, t) => {
	function n(e) {
		return function() {
			return e;
		};
	}
	t.exports = n;
})), oo = /* @__PURE__ */ t(((e, t) => {
	function n(e) {
		return e;
	}
	t.exports = n;
})), so = /* @__PURE__ */ t(((e, t) => {
	var n = ao(), r = Ai(), i = oo();
	t.exports = r ? function(e, t) {
		return r(e, "toString", {
			configurable: !0,
			enumerable: !1,
			value: n(t),
			writable: !0
		});
	} : i;
})), co = /* @__PURE__ */ t(((e, t) => {
	var n = 800, r = 16, i = Date.now;
	function a(e) {
		var t = 0, a = 0;
		return function() {
			var o = i(), s = r - (o - a);
			if (a = o, s > 0) {
				if (++t >= n) return arguments[0];
			} else t = 0;
			return e.apply(void 0, arguments);
		};
	}
	t.exports = a;
})), lo = /* @__PURE__ */ t(((e, t) => {
	var n = so();
	t.exports = co()(n);
})), uo = /* @__PURE__ */ t(((e, t) => {
	var n = no(), r = io(), i = lo();
	function a(e) {
		return i(r(e, void 0, n), e + "");
	}
	t.exports = a;
})), fo = /* @__PURE__ */ t(((e, t) => {
	var n = Rr(), r = La(), i = Za(), a = Ga(), o = Ni(), s = $a(), c = uo(), l = _a(), u = 1, d = 2, f = 4;
	t.exports = c(function(e, t) {
		var c = {};
		if (e == null) return c;
		var p = !1;
		t = n(t, function(t) {
			return t = a(t, e), p ||= t.length > 1, t;
		}), o(e, l(e), c), p && (c = r(c, u | d | f, s));
		for (var m = t.length; m--;) i(c, t[m]);
		return c;
	});
})), po = /* @__PURE__ */ t(((e, t) => {
	var n = /\s/;
	function r(e) {
		for (var t = e.length; t-- && n.test(e.charAt(t)););
		return t;
	}
	t.exports = r;
})), mo = /* @__PURE__ */ t(((e, t) => {
	var n = po(), r = /^\s+/;
	function i(e) {
		return e && e.slice(0, n(e) + 1).replace(r, "");
	}
	t.exports = i;
})), ho = /* @__PURE__ */ t(((e, t) => {
	var n = mo(), r = ri(), i = Ra(), a = NaN, o = /^[-+]0x[0-9a-f]+$/i, s = /^0b[01]+$/i, c = /^0o[0-7]+$/i, l = parseInt;
	function u(e) {
		if (typeof e == "number") return e;
		if (i(e)) return a;
		if (r(e)) {
			var t = typeof e.valueOf == "function" ? e.valueOf() : e;
			e = r(t) ? t + "" : t;
		}
		if (typeof e != "string") return e === 0 ? e : +e;
		e = n(e);
		var u = s.test(e);
		return u || c.test(e) ? l(e.slice(2), u ? 2 : 8) : o.test(e) ? a : +e;
	}
	t.exports = u;
})), go = /* @__PURE__ */ t(((e, t) => {
	var n = ho(), r = Infinity, i = 17976931348623157e292;
	function a(e) {
		return e ? (e = n(e), e === r || e === -r ? (e < 0 ? -1 : 1) * i : e === e ? e : 0) : e === 0 ? e : 0;
	}
	t.exports = a;
})), _o = /* @__PURE__ */ t(((e, t) => {
	var n = go();
	function r(e) {
		var t = n(e), r = t % 1;
		return t === t ? r ? t - r : t : 0;
	}
	t.exports = r;
})), vo = /* @__PURE__ */ t(((e, t) => {
	var n = Qr(), r = _o(), i = ho(), a = Wa(), o = n.isFinite, s = Math.min;
	function c(e) {
		var t = Math[e];
		return function(e, n) {
			if (e = i(e), n = n == null ? 0 : s(r(n), 292), n && o(e)) {
				var c = (a(e) + "e").split("e");
				return c = (a(t(c[0] + "e" + (+c[1] + n))) + "e").split("e"), +(c[0] + "e" + (+c[1] - n));
			}
			return t(e);
		};
	}
	t.exports = c;
})), yo = /* @__PURE__ */ t(((e, t) => {
	t.exports = vo()("round");
})), bo = /* @__PURE__ */ t(((e, t) => {
	var n = "__lodash_hash_undefined__";
	function r(e) {
		return this.__data__.set(e, n), this;
	}
	t.exports = r;
})), xo = /* @__PURE__ */ t(((e, t) => {
	function n(e) {
		return this.__data__.has(e);
	}
	t.exports = n;
})), So = /* @__PURE__ */ t(((e, t) => {
	var n = Ei(), r = bo(), i = xo();
	function a(e) {
		var t = -1, r = e == null ? 0 : e.length;
		for (this.__data__ = new n(); ++t < r;) this.add(e[t]);
	}
	a.prototype.add = a.prototype.push = r, a.prototype.has = i, t.exports = a;
})), Co = /* @__PURE__ */ t(((e, t) => {
	function n(e, t) {
		for (var n = -1, r = e == null ? 0 : e.length; ++n < r;) if (t(e[n], n, e)) return !0;
		return !1;
	}
	t.exports = n;
})), wo = /* @__PURE__ */ t(((e, t) => {
	function n(e, t) {
		return e.has(t);
	}
	t.exports = n;
})), To = /* @__PURE__ */ t(((e, t) => {
	var n = So(), r = Co(), i = wo(), a = 1, o = 2;
	function s(e, t, s, c, l, u) {
		var d = s & a, f = e.length, p = t.length;
		if (f != p && !(d && p > f)) return !1;
		var m = u.get(e), h = u.get(t);
		if (m && h) return m == t && h == e;
		var g = -1, _ = !0, v = s & o ? new n() : void 0;
		for (u.set(e, t), u.set(t, e); ++g < f;) {
			var y = e[g], b = t[g];
			if (c) var x = d ? c(b, y, g, t, e, u) : c(y, b, g, e, t, u);
			if (x !== void 0) {
				if (x) continue;
				_ = !1;
				break;
			}
			if (v) {
				if (!r(t, function(e, t) {
					if (!i(v, t) && (y === e || l(y, e, s, c, u))) return v.push(t);
				})) {
					_ = !1;
					break;
				}
			} else if (!(y === b || l(y, b, s, c, u))) {
				_ = !1;
				break;
			}
		}
		return u.delete(e), u.delete(t), _;
	}
	t.exports = s;
})), Eo = /* @__PURE__ */ t(((e, t) => {
	function n(e) {
		var t = -1, n = Array(e.size);
		return e.forEach(function(e, r) {
			n[++t] = [r, e];
		}), n;
	}
	t.exports = n;
})), Do = /* @__PURE__ */ t(((e, t) => {
	function n(e) {
		var t = -1, n = Array(e.size);
		return e.forEach(function(e) {
			n[++t] = e;
		}), n;
	}
	t.exports = n;
})), Oo = /* @__PURE__ */ t(((e, t) => {
	var n = $r(), r = wa(), i = Br(), a = To(), o = Eo(), s = Do(), c = 1, l = 2, u = "[object Boolean]", d = "[object Date]", f = "[object Error]", p = "[object Map]", m = "[object Number]", h = "[object RegExp]", g = "[object Set]", _ = "[object String]", v = "[object Symbol]", y = "[object ArrayBuffer]", b = "[object DataView]", x = n ? n.prototype : void 0, S = x ? x.valueOf : void 0;
	function C(e, t, n, x, C, w, T) {
		switch (n) {
			case b:
				if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
				e = e.buffer, t = t.buffer;
			case y: return !(e.byteLength != t.byteLength || !w(new r(e), new r(t)));
			case u:
			case d:
			case m: return i(+e, +t);
			case f: return e.name == t.name && e.message == t.message;
			case h:
			case _: return e == t + "";
			case p: var E = o;
			case g:
				var D = x & c;
				if (E ||= s, e.size != t.size && !D) return !1;
				var O = T.get(e);
				if (O) return O == t;
				x |= l, T.set(e, t);
				var k = a(E(e), E(t), x, C, w, T);
				return T.delete(e), k;
			case v: if (S) return S.call(e) == S.call(t);
		}
		return !1;
	}
	t.exports = C;
})), ko = /* @__PURE__ */ t(((e, t) => {
	var n = ga(), r = 1, i = Object.prototype.hasOwnProperty;
	function a(e, t, a, o, s, c) {
		var l = a & r, u = n(e), d = u.length;
		if (d != n(t).length && !l) return !1;
		for (var f = d; f--;) {
			var p = u[f];
			if (!(l ? p in t : i.call(t, p))) return !1;
		}
		var m = c.get(e), h = c.get(t);
		if (m && h) return m == t && h == e;
		var g = !0;
		c.set(e, t), c.set(t, e);
		for (var _ = l; ++f < d;) {
			p = u[f];
			var v = e[p], y = t[p];
			if (o) var b = l ? o(y, v, p, t, e, c) : o(v, y, p, e, t, c);
			if (!(b === void 0 ? v === y || s(v, y, a, o, c) : b)) {
				g = !1;
				break;
			}
			_ ||= p == "constructor";
		}
		if (g && !_) {
			var x = e.constructor, S = t.constructor;
			x != S && "constructor" in e && "constructor" in t && !(typeof x == "function" && x instanceof x && typeof S == "function" && S instanceof S) && (g = !1);
		}
		return c.delete(e), c.delete(t), g;
	}
	t.exports = a;
})), Ao = /* @__PURE__ */ t(((e, t) => {
	var n = Oi(), r = To(), i = Oo(), a = ko(), o = Sa(), s = Ri(), c = Bi(), l = Ki(), u = 1, d = "[object Arguments]", f = "[object Array]", p = "[object Object]", m = Object.prototype.hasOwnProperty;
	function h(e, t, h, g, _, v) {
		var y = s(e), b = s(t), x = y ? f : o(e), S = b ? f : o(t);
		x = x == d ? p : x, S = S == d ? p : S;
		var C = x == p, w = S == p, T = x == S;
		if (T && c(e)) {
			if (!c(t)) return !1;
			y = !0, C = !1;
		}
		if (T && !C) return v ||= new n(), y || l(e) ? r(e, t, h, g, _, v) : i(e, t, x, h, g, _, v);
		if (!(h & u)) {
			var E = C && m.call(e, "__wrapped__"), D = w && m.call(t, "__wrapped__");
			if (E || D) {
				var O = E ? e.value() : e, k = D ? t.value() : t;
				return v ||= new n(), _(O, k, h, g, v);
			}
		}
		return T ? (v ||= new n(), a(e, t, h, g, _, v)) : !1;
	}
	t.exports = h;
})), jo = /* @__PURE__ */ t(((e, t) => {
	var n = Ao(), r = Fi();
	function i(e, t, a, o, s) {
		return e === t ? !0 : e == null || t == null || !r(e) && !r(t) ? e !== e && t !== t : n(e, t, a, o, i, s);
	}
	t.exports = i;
})), Mo = /* @__PURE__ */ t(((e, t) => {
	var n = Oi(), r = jo(), i = 1, a = 2;
	function o(e, t, o, s) {
		var c = o.length, l = c, u = !s;
		if (e == null) return !l;
		for (e = Object(e); c--;) {
			var d = o[c];
			if (u && d[2] ? d[1] !== e[d[0]] : !(d[0] in e)) return !1;
		}
		for (; ++c < l;) {
			d = o[c];
			var f = d[0], p = e[f], m = d[1];
			if (u && d[2]) {
				if (p === void 0 && !(f in e)) return !1;
			} else {
				var h = new n();
				if (s) var g = s(p, m, f, e, t, h);
				if (!(g === void 0 ? r(m, p, i | a, s, h) : g)) return !1;
			}
		}
		return !0;
	}
	t.exports = o;
})), No = /* @__PURE__ */ t(((e, t) => {
	var n = ri();
	function r(e) {
		return e === e && !n(e);
	}
	t.exports = r;
})), Po = /* @__PURE__ */ t(((e, t) => {
	var n = No(), r = $i();
	function i(e) {
		for (var t = r(e), i = t.length; i--;) {
			var a = t[i], o = e[a];
			t[i] = [
				a,
				o,
				n(o)
			];
		}
		return t;
	}
	t.exports = i;
})), Fo = /* @__PURE__ */ t(((e, t) => {
	function n(e, t) {
		return function(n) {
			return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
		};
	}
	t.exports = n;
})), Io = /* @__PURE__ */ t(((e, t) => {
	var n = Mo(), r = Po(), i = Fo();
	function a(e) {
		var t = r(e);
		return t.length == 1 && t[0][2] ? i(t[0][0], t[0][1]) : function(r) {
			return r === e || n(r, e, t);
		};
	}
	t.exports = a;
})), Lo = /* @__PURE__ */ t(((e, t) => {
	var n = Ja();
	function r(e, t, r) {
		var i = e == null ? void 0 : n(e, t);
		return i === void 0 ? r : i;
	}
	t.exports = r;
})), Ro = /* @__PURE__ */ t(((e, t) => {
	function n(e, t) {
		return e != null && t in Object(e);
	}
	t.exports = n;
})), zo = /* @__PURE__ */ t(((e, t) => {
	var n = Ga(), r = Li(), i = Ri(), a = Vi(), o = Hi(), s = qa();
	function c(e, t, c) {
		t = n(t, e);
		for (var l = -1, u = t.length, d = !1; ++l < u;) {
			var f = s(t[l]);
			if (!(d = e != null && c(e, f))) break;
			e = e[f];
		}
		return d || ++l != u ? d : (u = e == null ? 0 : e.length, !!u && o(u) && a(f, u) && (i(e) || r(e)));
	}
	t.exports = c;
})), Bo = /* @__PURE__ */ t(((e, t) => {
	var n = Ro(), r = zo();
	function i(e, t) {
		return e != null && r(e, t, n);
	}
	t.exports = i;
})), Vo = /* @__PURE__ */ t(((e, t) => {
	var n = jo(), r = Lo(), i = Bo(), a = za(), o = No(), s = Fo(), c = qa(), l = 1, u = 2;
	function d(e, t) {
		return a(e) && o(t) ? s(c(e), t) : function(a) {
			var o = r(a, e);
			return o === void 0 && o === t ? i(a, e) : n(t, o, l | u);
		};
	}
	t.exports = d;
})), Ho = /* @__PURE__ */ t(((e, t) => {
	function n(e) {
		return function(t) {
			return t?.[e];
		};
	}
	t.exports = n;
})), Uo = /* @__PURE__ */ t(((e, t) => {
	var n = Ja();
	function r(e) {
		return function(t) {
			return n(t, e);
		};
	}
	t.exports = r;
})), Wo = /* @__PURE__ */ t(((e, t) => {
	var n = Ho(), r = Uo(), i = za(), a = qa();
	function o(e) {
		return i(e) ? n(a(e)) : r(e);
	}
	t.exports = o;
})), Go = /* @__PURE__ */ t(((e, t) => {
	var n = Io(), r = Vo(), i = oo(), a = Ri(), o = Wo();
	function s(e) {
		return typeof e == "function" ? e : e == null ? i : typeof e == "object" ? a(e) ? r(e[0], e[1]) : n(e) : o(e);
	}
	t.exports = s;
})), Ko = /* @__PURE__ */ t(((e, t) => {
	function n(e) {
		return function(t, n, r) {
			for (var i = -1, a = Object(t), o = r(t), s = o.length; s--;) {
				var c = o[e ? s : ++i];
				if (n(a[c], c, a) === !1) break;
			}
			return t;
		};
	}
	t.exports = n;
})), qo = /* @__PURE__ */ t(((e, t) => {
	t.exports = Ko()();
})), Jo = /* @__PURE__ */ t(((e, t) => {
	var n = qo(), r = $i();
	function i(e, t) {
		return e && n(e, t, r);
	}
	t.exports = i;
})), Yo = /* @__PURE__ */ t(((e, t) => {
	var n = Qi();
	function r(e, t) {
		return function(r, i) {
			if (r == null) return r;
			if (!n(r)) return e(r, i);
			for (var a = r.length, o = t ? a : -1, s = Object(r); (t ? o-- : ++o < a) && i(s[o], o, s) !== !1;);
			return r;
		};
	}
	t.exports = r;
})), Xo = /* @__PURE__ */ t(((e, t) => {
	var n = Jo();
	t.exports = Yo()(n);
})), Zo = /* @__PURE__ */ t(((e, t) => {
	var n = Xo(), r = Qi();
	function i(e, t) {
		var i = -1, a = r(e) ? Array(e.length) : [];
		return n(e, function(e, n, r) {
			a[++i] = t(e, n, r);
		}), a;
	}
	t.exports = i;
})), Qo = /* @__PURE__ */ t(((e, t) => {
	var n = Rr(), r = Go(), i = Zo(), a = Ri();
	function o(e, t) {
		return (a(e) ? n : i)(e, r(t, 3));
	}
	t.exports = o;
}));
//#endregion
//#region ../../node_modules/ketcher-react/dist/index.modern-435976ac.js
pn();
var $o = /* @__PURE__ */ e(Rn());
_n();
var es = /* @__PURE__ */ e(fo()), ts = /* @__PURE__ */ e(r()), ns = /* @__PURE__ */ e(l()), rs = _e(), is = /* @__PURE__ */ e(yo()), as = /* @__PURE__ */ e(Qo()), os = Object.defineProperty, ss = Object.getOwnPropertySymbols, cs = Object.prototype.hasOwnProperty, ls = Object.prototype.propertyIsEnumerable, us = (e, t, n) => t in e ? os(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, ds = (e, t) => {
	for (var n in t ||= {}) cs.call(t, n) && us(e, n, t[n]);
	if (ss) for (var n of ss(t)) ls.call(t, n) && us(e, n, t[n]);
	return e;
}, fs = Symbol.for("immer-nothing"), ps = Symbol.for("immer-draftable"), ms = Symbol.for("immer-state");
function hs(e, ...t) {
	throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`);
}
var gs = Object.getPrototypeOf;
function _s(e) {
	return !!e && !!e[ms];
}
function vs(e) {
	return e ? bs(e) || Array.isArray(e) || !!e[ps] || !!e.constructor?.[ps] || Es(e) || Ds(e) : !1;
}
var ys = Object.prototype.constructor.toString();
function bs(e) {
	if (!e || typeof e != "object") return !1;
	let t = gs(e);
	if (t === null) return !0;
	let n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
	return n === Object ? !0 : typeof n == "function" && Function.toString.call(n) === ys;
}
function xs(e, t) {
	Ss(e) === 0 ? Reflect.ownKeys(e).forEach((n) => {
		t(n, e[n], e);
	}) : e.forEach((n, r) => t(r, n, e));
}
function Ss(e) {
	let t = e[ms];
	return t ? t.type_ : Array.isArray(e) ? 1 : Es(e) ? 2 : Ds(e) ? 3 : 0;
}
function Cs(e, t) {
	return Ss(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function ws(e, t, n) {
	let r = Ss(e);
	r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : e[t] = n;
}
function Ts(e, t) {
	return e === t ? e !== 0 || 1 / e == 1 / t : e !== e && t !== t;
}
function Es(e) {
	return e instanceof Map;
}
function Ds(e) {
	return e instanceof Set;
}
function Os(e) {
	return e.copy_ || e.base_;
}
function ks(e, t) {
	if (Es(e)) return new Map(e);
	if (Ds(e)) return new Set(e);
	if (Array.isArray(e)) return Array.prototype.slice.call(e);
	let n = bs(e);
	if (t === !0 || t === "class_only" && !n) {
		let t = Object.getOwnPropertyDescriptors(e);
		delete t[ms];
		let n = Reflect.ownKeys(t);
		for (let r = 0; r < n.length; r++) {
			let i = n[r], a = t[i];
			a.writable === !1 && (a.writable = !0, a.configurable = !0), (a.get || a.set) && (t[i] = {
				configurable: !0,
				writable: !0,
				enumerable: a.enumerable,
				value: e[i]
			});
		}
		return Object.create(gs(e), t);
	} else {
		let t = gs(e);
		return t !== null && n ? ds({}, e) : Object.assign(Object.create(t), e);
	}
}
function As(e, t = !1) {
	return Ms(e) || _s(e) || !vs(e) ? e : (Ss(e) > 1 && (e.set = e.add = e.clear = e.delete = js), Object.freeze(e), t && Object.entries(e).forEach(([e, t]) => As(t, !0)), e);
}
function js() {
	hs(2);
}
function Ms(e) {
	return Object.isFrozen(e);
}
var Ns = {};
function Ps(e) {
	let t = Ns[e];
	return t || hs(0, e), t;
}
var Fs;
function Is() {
	return Fs;
}
function Ls(e, t) {
	return {
		drafts_: [],
		parent_: e,
		immer_: t,
		canAutoFreeze_: !0,
		unfinalizedDrafts_: 0
	};
}
function Rs(e, t) {
	t && (Ps("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function zs(e) {
	Bs(e), e.drafts_.forEach(Hs), e.drafts_ = null;
}
function Bs(e) {
	e === Fs && (Fs = e.parent_);
}
function Vs(e) {
	return Fs = Ls(Fs, e);
}
function Hs(e) {
	let t = e[ms];
	t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function Us(e, t) {
	t.unfinalizedDrafts_ = t.drafts_.length;
	let n = t.drafts_[0];
	return e !== void 0 && e !== n ? (n[ms].modified_ && (zs(t), hs(4)), vs(e) && (e = Ws(t, e), t.parent_ || Ks(t, e)), t.patches_ && Ps("Patches").generateReplacementPatches_(n[ms].base_, e, t.patches_, t.inversePatches_)) : e = Ws(t, n, []), zs(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e === fs ? void 0 : e;
}
function Ws(e, t, n) {
	if (Ms(t)) return t;
	let r = t[ms];
	if (!r) return xs(t, (i, a) => Gs(e, r, t, i, a, n)), t;
	if (r.scope_ !== e) return t;
	if (!r.modified_) return Ks(e, r.base_, !0), r.base_;
	if (!r.finalized_) {
		r.finalized_ = !0, r.scope_.unfinalizedDrafts_--;
		let t = r.copy_, i = t, a = !1;
		r.type_ === 3 && (i = new Set(t), t.clear(), a = !0), xs(i, (i, o) => Gs(e, r, t, i, o, n, a)), Ks(e, t, !1), n && e.patches_ && Ps("Patches").generatePatches_(r, n, e.patches_, e.inversePatches_);
	}
	return r.copy_;
}
function Gs(e, t, n, r, i, a, o) {
	if (_s(i)) {
		let o = Ws(e, i, a && t && t.type_ !== 3 && !Cs(t.assigned_, r) ? a.concat(r) : void 0);
		if (ws(n, r, o), _s(o)) e.canAutoFreeze_ = !1;
		else return;
	} else o && n.add(i);
	if (vs(i) && !Ms(i)) {
		if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1) return;
		Ws(e, i), (!t || !t.scope_.parent_) && typeof r != "symbol" && Object.prototype.propertyIsEnumerable.call(n, r) && Ks(e, i);
	}
}
function Ks(e, t, n = !1) {
	!e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && As(t, n);
}
function qs(e, t) {
	let n = Array.isArray(e), r = {
		type_: +!!n,
		scope_: t ? t.scope_ : Is(),
		modified_: !1,
		finalized_: !1,
		assigned_: {},
		parent_: t,
		base_: e,
		draft_: null,
		copy_: null,
		revoke_: null,
		isManual_: !1
	}, i = r, a = Js;
	n && (i = [r], a = Ys);
	let { revoke: o, proxy: s } = Proxy.revocable(i, a);
	return r.draft_ = s, r.revoke_ = o, s;
}
var Js = {
	get(e, t) {
		if (t === ms) return e;
		let n = Os(e);
		if (!Cs(n, t)) return Zs(e, n, t);
		let r = n[t];
		return e.finalized_ || !vs(r) ? r : r === Xs(e.base_, t) ? (ec(e), e.copy_[t] = nc(r, e)) : r;
	},
	has(e, t) {
		return t in Os(e);
	},
	ownKeys(e) {
		return Reflect.ownKeys(Os(e));
	},
	set(e, t, n) {
		let r = Qs(Os(e), t);
		if (r?.set) return r.set.call(e.draft_, n), !0;
		if (!e.modified_) {
			let r = Xs(Os(e), t), i = r?.[ms];
			if (i && i.base_ === n) return e.copy_[t] = n, e.assigned_[t] = !1, !0;
			if (Ts(n, r) && (n !== void 0 || Cs(e.base_, t))) return !0;
			ec(e), $s(e);
		}
		return e.copy_[t] === n && (n !== void 0 || t in e.copy_) || Number.isNaN(n) && Number.isNaN(e.copy_[t]) ? !0 : (e.copy_[t] = n, e.assigned_[t] = !0, !0);
	},
	deleteProperty(e, t) {
		return Xs(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_[t] = !1, ec(e), $s(e)) : delete e.assigned_[t], e.copy_ && delete e.copy_[t], !0;
	},
	getOwnPropertyDescriptor(e, t) {
		let n = Os(e), r = Reflect.getOwnPropertyDescriptor(n, t);
		return r && {
			writable: !0,
			configurable: e.type_ !== 1 || t !== "length",
			enumerable: r.enumerable,
			value: n[t]
		};
	},
	defineProperty() {
		hs(11);
	},
	getPrototypeOf(e) {
		return gs(e.base_);
	},
	setPrototypeOf() {
		hs(12);
	}
}, Ys = {};
xs(Js, (e, t) => {
	Ys[e] = function() {
		return arguments[0] = arguments[0][0], t.apply(this, arguments);
	};
}), Ys.deleteProperty = function(e, t) {
	return Ys.set.call(this, e, t, void 0);
}, Ys.set = function(e, t, n) {
	return Js.set.call(this, e[0], t, n, e[0]);
};
function Xs(e, t) {
	let n = e[ms];
	return (n ? Os(n) : e)[t];
}
function Zs(e, t, n) {
	let r = Qs(t, n);
	return r ? "value" in r ? r.value : r.get?.call(e.draft_) : void 0;
}
function Qs(e, t) {
	if (!(t in e)) return;
	let n = gs(e);
	for (; n;) {
		let e = Object.getOwnPropertyDescriptor(n, t);
		if (e) return e;
		n = gs(n);
	}
}
function $s(e) {
	e.modified_ || (e.modified_ = !0, e.parent_ && $s(e.parent_));
}
function ec(e) {
	e.copy_ ||= ks(e.base_, e.scope_.immer_.useStrictShallowCopy_);
}
var tc = class {
	constructor(e) {
		this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.produce = (e, t, n) => {
			if (typeof e == "function" && typeof t != "function") {
				let n = t;
				t = e;
				let r = this;
				return function(e = n, ...i) {
					return r.produce(e, (e) => t.call(this, e, ...i));
				};
			}
			typeof t != "function" && hs(6), n !== void 0 && typeof n != "function" && hs(7);
			let r;
			if (vs(e)) {
				let i = Vs(this), a = nc(e, void 0), o = !0;
				try {
					r = t(a), o = !1;
				} finally {
					o ? zs(i) : Bs(i);
				}
				return Rs(i, n), Us(r, i);
			} else if (!e || typeof e != "object") {
				if (r = t(e), r === void 0 && (r = e), r === fs && (r = void 0), this.autoFreeze_ && As(r, !0), n) {
					let t = [], i = [];
					Ps("Patches").generateReplacementPatches_(e, r, t, i), n(t, i);
				}
				return r;
			} else hs(1, e);
		}, this.produceWithPatches = (e, t) => {
			if (typeof e == "function") return (t, ...n) => this.produceWithPatches(t, (t) => e(t, ...n));
			let n, r;
			return [
				this.produce(e, t, (e, t) => {
					n = e, r = t;
				}),
				n,
				r
			];
		}, typeof e?.autoFreeze == "boolean" && this.setAutoFreeze(e.autoFreeze), typeof e?.useStrictShallowCopy == "boolean" && this.setUseStrictShallowCopy(e.useStrictShallowCopy);
	}
	createDraft(e) {
		vs(e) || hs(8), _s(e) && (e = rc(e));
		let t = Vs(this), n = nc(e, void 0);
		return n[ms].isManual_ = !0, Bs(t), n;
	}
	finishDraft(e, t) {
		let n = e && e[ms];
		(!n || !n.isManual_) && hs(9);
		let { scope_: r } = n;
		return Rs(r, t), Us(void 0, r);
	}
	setAutoFreeze(e) {
		this.autoFreeze_ = e;
	}
	setUseStrictShallowCopy(e) {
		this.useStrictShallowCopy_ = e;
	}
	applyPatches(e, t) {
		let n;
		for (n = t.length - 1; n >= 0; n--) {
			let r = t[n];
			if (r.path.length === 0 && r.op === "replace") {
				e = r.value;
				break;
			}
		}
		n > -1 && (t = t.slice(n + 1));
		let r = Ps("Patches").applyPatches_;
		return _s(e) ? r(e, t) : this.produce(e, (e) => r(e, t));
	}
};
function nc(e, t) {
	let n = Es(e) ? Ps("MapSet").proxyMap_(e, t) : Ds(e) ? Ps("MapSet").proxySet_(e, t) : qs(e, t);
	return (t ? t.scope_ : Is()).drafts_.push(n), n;
}
function rc(e) {
	return _s(e) || hs(10, e), ic(e);
}
function ic(e) {
	if (!vs(e) || Ms(e)) return e;
	let t = e[ms], n;
	if (t) {
		if (!t.modified_) return t.base_;
		t.finalized_ = !0, n = ks(e, t.scope_.immer_.useStrictShallowCopy_);
	} else n = ks(e, !0);
	return xs(n, (e, t) => {
		ws(n, e, ic(t));
	}), t && (t.finalized_ = !1), n;
}
var ac = new tc(), oc = ac.produce;
ac.produceWithPatches.bind(ac), ac.setAutoFreeze.bind(ac), ac.setUseStrictShallowCopy.bind(ac), ac.applyPatches.bind(ac), ac.createDraft.bind(ac), ac.finishDraft.bind(ac);
var sc = Object.defineProperty, cc = Object.defineProperties, lc = Object.getOwnPropertyDescriptors, uc = Object.getOwnPropertySymbols, dc = Object.prototype.hasOwnProperty, fc = Object.prototype.propertyIsEnumerable, pc = (e, t, n) => t in e ? sc(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, mc = (e, t) => {
	for (var n in t ||= {}) dc.call(t, n) && pc(e, n, t[n]);
	if (uc) for (var n of uc(t)) fc.call(t, n) && pc(e, n, t[n]);
	return e;
}, hc = (e, t) => cc(e, lc(t)), gc = (e, t) => {
	var n = {};
	for (var r in e) dc.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && uc) for (var r of uc(e)) t.indexOf(r) < 0 && fc.call(e, r) && (n[r] = e[r]);
	return n;
}, _c = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
	if (arguments.length !== 0) return typeof arguments[0] == "object" ? Yt : Yt.apply(null, arguments);
};
function vc(e, t) {
	function n(...n) {
		if (t) {
			let r = t(...n);
			if (!r) throw Error(Uc(0));
			return mc(mc({
				type: e,
				payload: r.payload
			}, "meta" in r && { meta: r.meta }), "error" in r && { error: r.error });
		}
		return {
			type: e,
			payload: n[0]
		};
	}
	return n.toString = () => `${e}`, n.type = e, n.match = (t) => jt(t) && t.type === e, n;
}
var yc = class e extends Array {
	constructor(...t) {
		super(...t), Object.setPrototypeOf(this, e.prototype);
	}
	static get [Symbol.species]() {
		return e;
	}
	concat(...e) {
		return super.concat.apply(this, e);
	}
	prepend(...t) {
		return t.length === 1 && Array.isArray(t[0]) ? new e(...t[0].concat(this)) : new e(...t.concat(this));
	}
};
function bc(e) {
	return vs(e) ? oc(e, () => {}) : e;
}
function xc(e, t, n) {
	return e.has(t) ? e.get(t) : e.set(t, n(t)).get(t);
}
function Sc(e) {
	return typeof e == "boolean";
}
var Cc = () => function(e) {
	let { thunk: t = !0, immutableCheck: n = !0, serializableCheck: r = !0, actionCreatorCheck: i = !0 } = e ?? {}, o = new yc();
	return t && (Sc(t) ? o.push(xe) : o.push(a(t.extraArgument))), o;
}, wc = "RTK_autoBatch", Tc = (e) => (t) => {
	setTimeout(t, e);
}, Ec = (e = { type: "raf" }) => (t) => (...n) => {
	let r = t(...n), i = !0, a = !1, o = !1, s = /* @__PURE__ */ new Set(), c = e.type === "tick" ? queueMicrotask : e.type === "raf" ? typeof window < "u" && window.requestAnimationFrame ? window.requestAnimationFrame : Tc(10) : e.type === "callback" ? e.queueNotification : Tc(e.timeout), l = () => {
		o = !1, a && (a = !1, s.forEach((e) => e()));
	};
	return Object.assign({}, r, {
		subscribe(e) {
			let t = r.subscribe(() => i && e());
			return s.add(e), () => {
				t(), s.delete(e);
			};
		},
		dispatch(e) {
			try {
				return i = !e?.meta?.[wc], a = !i, a && (o || (o = !0, c(l))), r.dispatch(e);
			} finally {
				i = !0;
			}
		}
	});
}, Dc = (e) => function(t) {
	let { autoBatch: n = !0 } = t ?? {}, r = new yc(e);
	return n && r.push(Ec(typeof n == "object" ? n : void 0)), r;
};
function Oc(e) {
	let t = Cc(), { reducer: n = void 0, middleware: r, devTools: i = !0, duplicateMiddlewareCheck: a = !0, preloadedState: o = void 0, enhancers: s = void 0 } = e || {}, c;
	if (typeof n == "function") c = n;
	else if (tt(n)) c = vn(n);
	else throw Error(Uc(1));
	let l;
	l = typeof r == "function" ? r(t) : t();
	let u = Yt;
	i && (u = _c(mc({ trace: !1 }, typeof i == "object" && i)));
	let d = Dc(ht(...l)), f = typeof s == "function" ? s(d) : d(), p = u(...f);
	return un(c, o, p);
}
function kc(e) {
	let t = {}, n = [], r, i = {
		addCase(e, n) {
			let r = typeof e == "string" ? e : e.type;
			if (!r) throw Error(Uc(28));
			if (r in t) throw Error(Uc(29));
			return t[r] = n, i;
		},
		addMatcher(e, t) {
			return n.push({
				matcher: e,
				reducer: t
			}), i;
		},
		addDefaultCase(e) {
			return r = e, i;
		}
	};
	return e(i), [
		t,
		n,
		r
	];
}
function Ac(e) {
	return typeof e == "function";
}
function jc(e, t) {
	let [n, r, i] = kc(t), a;
	if (Ac(e)) a = () => bc(e());
	else {
		let t = bc(e);
		a = () => t;
	}
	function o(e = a(), t) {
		let o = [n[t.type], ...r.filter(({ matcher: e }) => e(t)).map(({ reducer: e }) => e)];
		return o.filter((e) => !!e).length === 0 && (o = [i]), o.reduce((e, n) => {
			if (n) if (_s(e)) {
				let r = n(e, t);
				return r === void 0 ? e : r;
			} else if (vs(e)) return oc(e, (e) => n(e, t));
			else {
				let r = n(e, t);
				if (r === void 0) {
					if (e === null) return e;
					throw Error("A case reducer on a non-draftable value must not return undefined");
				}
				return r;
			}
			return e;
		}, e);
	}
	return o.getInitialState = a, o;
}
var Mc = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function Nc(e, t) {
	return `${e}/${t}`;
}
function Pc({ creators: e } = {}) {
	let t = e?.asyncThunk?.[Mc];
	return function(e) {
		let { name: n, reducerPath: r = n } = e;
		if (!n) throw Error(Uc(11));
		let i = (typeof e.reducers == "function" ? e.reducers(Lc()) : e.reducers) || {}, a = Object.keys(i), o = {
			sliceCaseReducersByName: {},
			sliceCaseReducersByType: {},
			actionCreators: {},
			sliceMatchers: []
		}, s = {
			addCase(e, t) {
				let n = typeof e == "string" ? e : e.type;
				if (!n) throw Error(Uc(12));
				if (n in o.sliceCaseReducersByType) throw Error(Uc(13));
				return o.sliceCaseReducersByType[n] = t, s;
			},
			addMatcher(e, t) {
				return o.sliceMatchers.push({
					matcher: e,
					reducer: t
				}), s;
			},
			exposeAction(e, t) {
				return o.actionCreators[e] = t, s;
			},
			exposeCaseReducer(e, t) {
				return o.sliceCaseReducersByName[e] = t, s;
			}
		};
		a.forEach((r) => {
			let a = i[r], o = {
				reducerName: r,
				type: Nc(n, r),
				createNotation: typeof e.reducers == "function"
			};
			zc(a) ? Vc(o, a, s, t) : Rc(o, a, s);
		});
		function c() {
			let [t = {}, n = [], r = void 0] = typeof e.extraReducers == "function" ? kc(e.extraReducers) : [e.extraReducers], i = mc(mc({}, t), o.sliceCaseReducersByType);
			return jc(e.initialState, (e) => {
				for (let t in i) e.addCase(t, i[t]);
				for (let t of o.sliceMatchers) e.addMatcher(t.matcher, t.reducer);
				for (let t of n) e.addMatcher(t.matcher, t.reducer);
				r && e.addDefaultCase(r);
			});
		}
		let l = (e) => e, u = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new WeakMap(), f;
		function p(e, t) {
			return f ||= c(), f(e, t);
		}
		function m() {
			return f ||= c(), f.getInitialState();
		}
		function h(t, n = !1) {
			function r(e) {
				let i = e[t];
				return i === void 0 && n && (i = xc(d, r, m)), i;
			}
			function i(t = l) {
				return xc(xc(u, n, () => /* @__PURE__ */ new WeakMap()), t, () => {
					let r = {};
					for (let [i, a] of Object.entries(e.selectors ?? {})) r[i] = Fc(a, t, () => xc(d, t, m), n);
					return r;
				});
			}
			return {
				reducerPath: t,
				getSelectors: i,
				get selectors() {
					return i(r);
				},
				selectSlice: r
			};
		}
		let g = hc(mc({
			name: n,
			reducer: p,
			actions: o.actionCreators,
			caseReducers: o.sliceCaseReducersByName,
			getInitialState: m
		}, h(r)), { injectInto(e, t = {}) {
			var n = t, { reducerPath: i } = n, a = gc(n, ["reducerPath"]);
			let o = i ?? r;
			return e.inject({
				reducerPath: o,
				reducer: p
			}, a), mc(mc({}, g), h(o, !0));
		} });
		return g;
	};
}
function Fc(e, t, n, r) {
	function i(i, ...a) {
		let o = t(i);
		return o === void 0 && r && (o = n()), e(o, ...a);
	}
	return i.unwrapped = e, i;
}
var Ic = /* @__PURE__ */ Pc();
function Lc() {
	function e(e, t) {
		return mc({
			_reducerDefinitionType: "asyncThunk",
			payloadCreator: e
		}, t);
	}
	return e.withTypes = () => e, {
		reducer(e) {
			return Object.assign({ [e.name](...t) {
				return e(...t);
			} }[e.name], { _reducerDefinitionType: "reducer" });
		},
		preparedReducer(e, t) {
			return {
				_reducerDefinitionType: "reducerWithPrepare",
				prepare: e,
				reducer: t
			};
		},
		asyncThunk: e
	};
}
function Rc({ type: e, reducerName: t, createNotation: n }, r, i) {
	let a, o;
	if ("reducer" in r) {
		if (n && !Bc(r)) throw Error(Uc(17));
		a = r.reducer, o = r.prepare;
	} else a = r;
	i.addCase(e, a).exposeCaseReducer(t, a).exposeAction(t, o ? vc(e, o) : vc(e));
}
function zc(e) {
	return e._reducerDefinitionType === "asyncThunk";
}
function Bc(e) {
	return e._reducerDefinitionType === "reducerWithPrepare";
}
function Vc({ type: e, reducerName: t }, n, r, i) {
	if (!i) throw Error(Uc(18));
	let { payloadCreator: a, fulfilled: o, pending: s, rejected: c, settled: l, options: u } = n, d = i(e, a, u);
	r.exposeAction(t, d), o && r.addCase(d.fulfilled, o), s && r.addCase(d.pending, s), c && r.addCase(d.rejected, c), l && r.addMatcher(d.settled, l), r.exposeCaseReducer(t, {
		fulfilled: o || Hc,
		pending: s || Hc,
		rejected: c || Hc,
		settled: l || Hc
	});
}
function Hc() {}
function Uc(e) {
	return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
function Wc(e, t) {
	return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Gc(e, t) {
	return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Kc(e) {
	let t, n, r;
	e.length === 2 ? (t = e === Wc || e === Gc ? e : qc, n = e, r = e) : (t = Wc, n = (t, n) => Wc(e(t), n), r = (t, n) => e(t) - n);
	function i(e, r, i = 0, a = e.length) {
		if (i < a) {
			if (t(r, r) !== 0) return a;
			do {
				let t = i + a >>> 1;
				n(e[t], r) < 0 ? i = t + 1 : a = t;
			} while (i < a);
		}
		return i;
	}
	function a(e, r, i = 0, a = e.length) {
		if (i < a) {
			if (t(r, r) !== 0) return a;
			do {
				let t = i + a >>> 1;
				n(e[t], r) <= 0 ? i = t + 1 : a = t;
			} while (i < a);
		}
		return i;
	}
	function o(e, t, n = 0, a = e.length) {
		let o = i(e, t, n, a - 1);
		return o > n && r(e[o - 1], t) > -r(e[o], t) ? o - 1 : o;
	}
	return {
		left: i,
		center: o,
		right: a
	};
}
function qc() {
	return 0;
}
function Jc(e) {
	return e === null ? NaN : +e;
}
var Yc = Kc(Wc).right;
Kc(Jc).center;
var Xc = Yc, Zc = Math.sqrt(50), Qc = Math.sqrt(10), $c = Math.sqrt(2);
function el(e, t, n) {
	let r = (t - e) / Math.max(0, n), i = Math.floor(Math.log10(r)), a = r / 10 ** i, o = a >= Zc ? 10 : a >= Qc ? 5 : a >= $c ? 2 : 1, s, c, l;
	return i < 0 ? (l = 10 ** -i / o, s = Math.round(e * l), c = Math.round(t * l), s / l < e && ++s, c / l > t && --c, l = -l) : (l = 10 ** i * o, s = Math.round(e / l), c = Math.round(t / l), s * l < e && ++s, c * l > t && --c), c < s && .5 <= n && n < 2 ? el(e, t, n * 2) : [
		s,
		c,
		l
	];
}
function tl(e, t, n) {
	if (t = +t, e = +e, n = +n, !(n > 0)) return [];
	if (e === t) return [e];
	let r = t < e, [i, a, o] = r ? el(t, e, n) : el(e, t, n);
	if (!(a >= i)) return [];
	let s = a - i + 1, c = Array(s);
	if (r) if (o < 0) for (let e = 0; e < s; ++e) c[e] = (a - e) / -o;
	else for (let e = 0; e < s; ++e) c[e] = (a - e) * o;
	else if (o < 0) for (let e = 0; e < s; ++e) c[e] = (i + e) / -o;
	else for (let e = 0; e < s; ++e) c[e] = (i + e) * o;
	return c;
}
function nl(e, t, n) {
	return t = +t, e = +e, n = +n, el(e, t, n)[2];
}
function rl(e, t, n) {
	t = +t, e = +e, n = +n;
	let r = t < e, i = r ? nl(t, e, n) : nl(e, t, n);
	return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function il(e) {
	return e;
}
var al = 1, ol = 2, sl = 3, cl = 4, ll = 1e-6;
function ul(e) {
	return "translate(" + e + ",0)";
}
function dl(e) {
	return "translate(0," + e + ")";
}
function fl(e) {
	return (t) => +e(t);
}
function pl(e, t) {
	return t = Math.max(0, e.bandwidth() - t * 2) / 2, e.round() && (t = Math.round(t)), (n) => +e(n) + t;
}
function ml() {
	return !this.__axis;
}
function hl(e, t) {
	var n = [], r = null, i = null, a = 6, o = 6, s = 3, c = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : .5, l = e === al || e === cl ? -1 : 1, u = e === cl || e === ol ? "x" : "y", d = e === al || e === sl ? ul : dl;
	function f(f) {
		var p = r ?? (t.ticks ? t.ticks.apply(t, n) : t.domain()), m = i ?? (t.tickFormat ? t.tickFormat.apply(t, n) : il), h = Math.max(a, 0) + s, g = t.range(), _ = +g[0] + c, v = +g[g.length - 1] + c, y = (t.bandwidth ? pl : fl)(t.copy(), c), b = f.selection ? f.selection() : f, x = b.selectAll(".domain").data([null]), S = b.selectAll(".tick").data(p, t).order(), C = S.exit(), w = S.enter().append("g").attr("class", "tick"), T = S.select("line"), E = S.select("text");
		x = x.merge(x.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), S = S.merge(w), T = T.merge(w.append("line").attr("stroke", "currentColor").attr(u + "2", l * a)), E = E.merge(w.append("text").attr("fill", "currentColor").attr(u, l * h).attr("dy", e === al ? "0em" : e === sl ? "0.71em" : "0.32em")), f !== b && (x = x.transition(f), S = S.transition(f), T = T.transition(f), E = E.transition(f), C = C.transition(f).attr("opacity", ll).attr("transform", function(e) {
			return isFinite(e = y(e)) ? d(e + c) : this.getAttribute("transform");
		}), w.attr("opacity", ll).attr("transform", function(e) {
			var t = this.parentNode.__axis;
			return d((t && isFinite(t = t(e)) ? t : y(e)) + c);
		})), C.remove(), x.attr("d", e === cl || e === ol ? o ? "M" + l * o + "," + _ + "H" + c + "V" + v + "H" + l * o : "M" + c + "," + _ + "V" + v : o ? "M" + _ + "," + l * o + "V" + c + "H" + v + "V" + l * o : "M" + _ + "," + c + "H" + v), S.attr("opacity", 1).attr("transform", function(e) {
			return d(y(e) + c);
		}), T.attr(u + "2", l * a), E.attr(u, l * h).text(m), b.filter(ml).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", e === ol ? "start" : e === cl ? "end" : "middle"), b.each(function() {
			this.__axis = y;
		});
	}
	return f.scale = function(e) {
		return arguments.length ? (t = e, f) : t;
	}, f.ticks = function() {
		return n = Array.from(arguments), f;
	}, f.tickArguments = function(e) {
		return arguments.length ? (n = e == null ? [] : Array.from(e), f) : n.slice();
	}, f.tickValues = function(e) {
		return arguments.length ? (r = e == null ? null : Array.from(e), f) : r && r.slice();
	}, f.tickFormat = function(e) {
		return arguments.length ? (i = e, f) : i;
	}, f.tickSize = function(e) {
		return arguments.length ? (a = o = +e, f) : a;
	}, f.tickSizeInner = function(e) {
		return arguments.length ? (a = +e, f) : a;
	}, f.tickSizeOuter = function(e) {
		return arguments.length ? (o = +e, f) : o;
	}, f.tickPadding = function(e) {
		return arguments.length ? (s = +e, f) : s;
	}, f.offset = function(e) {
		return arguments.length ? (c = +e, f) : c;
	}, f;
}
function gl(e) {
	return hl(sl, e);
}
function _l(e) {
	return hl(cl, e);
}
var vl = { value: () => {} };
function yl() {
	for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
		if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r)) throw Error("illegal type: " + r);
		n[r] = [];
	}
	return new bl(n);
}
function bl(e) {
	this._ = e;
}
function xl(e, t) {
	return e.trim().split(/^|\s+/).map(function(e) {
		var n = "", r = e.indexOf(".");
		if (r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), e && !t.hasOwnProperty(e)) throw Error("unknown type: " + e);
		return {
			type: e,
			name: n
		};
	});
}
bl.prototype = yl.prototype = {
	constructor: bl,
	on: function(e, t) {
		var n = this._, r = xl(e + "", n), i, a = -1, o = r.length;
		if (arguments.length < 2) {
			for (; ++a < o;) if ((i = (e = r[a]).type) && (i = Sl(n[i], e.name))) return i;
			return;
		}
		if (t != null && typeof t != "function") throw Error("invalid callback: " + t);
		for (; ++a < o;) if (i = (e = r[a]).type) n[i] = Cl(n[i], e.name, t);
		else if (t == null) for (i in n) n[i] = Cl(n[i], e.name, null);
		return this;
	},
	copy: function() {
		var e = {}, t = this._;
		for (var n in t) e[n] = t[n].slice();
		return new bl(e);
	},
	call: function(e, t) {
		if ((i = arguments.length - 2) > 0) for (var n = Array(i), r = 0, i, a; r < i; ++r) n[r] = arguments[r + 2];
		if (!this._.hasOwnProperty(e)) throw Error("unknown type: " + e);
		for (a = this._[e], r = 0, i = a.length; r < i; ++r) a[r].value.apply(t, n);
	},
	apply: function(e, t, n) {
		if (!this._.hasOwnProperty(e)) throw Error("unknown type: " + e);
		for (var r = this._[e], i = 0, a = r.length; i < a; ++i) r[i].value.apply(t, n);
	}
};
function Sl(e, t) {
	for (var n = 0, r = e.length, i; n < r; ++n) if ((i = e[n]).name === t) return i.value;
}
function Cl(e, t, n) {
	for (var r = 0, i = e.length; r < i; ++r) if (e[r].name === t) {
		e[r] = vl, e = e.slice(0, r).concat(e.slice(r + 1));
		break;
	}
	return n != null && e.push({
		name: t,
		value: n
	}), e;
}
var wl = "http://www.w3.org/1999/xhtml", Tl = {
	svg: "http://www.w3.org/2000/svg",
	xhtml: wl,
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace",
	xmlns: "http://www.w3.org/2000/xmlns/"
};
function El(e) {
	var t = e += "", n = t.indexOf(":");
	return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), Tl.hasOwnProperty(t) ? {
		space: Tl[t],
		local: e
	} : e;
}
function Dl(e) {
	return function() {
		var t = this.ownerDocument, n = this.namespaceURI;
		return n === wl && t.documentElement.namespaceURI === wl ? t.createElement(e) : t.createElementNS(n, e);
	};
}
function Ol(e) {
	return function() {
		return this.ownerDocument.createElementNS(e.space, e.local);
	};
}
function kl(e) {
	var t = El(e);
	return (t.local ? Ol : Dl)(t);
}
function Al() {}
function jl(e) {
	return e == null ? Al : function() {
		return this.querySelector(e);
	};
}
function Ml(e) {
	typeof e != "function" && (e = jl(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = Array(o), c, l, u = 0; u < o; ++u) (c = a[u]) && (l = e.call(c, c.__data__, u, a)) && ("__data__" in c && (l.__data__ = c.__data__), s[u] = l);
	return new bd(r, this._parents);
}
function Nl(e) {
	return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Pl() {
	return [];
}
function Fl(e) {
	return e == null ? Pl : function() {
		return this.querySelectorAll(e);
	};
}
function Il(e) {
	return function() {
		return Nl(e.apply(this, arguments));
	};
}
function Ll(e) {
	e = typeof e == "function" ? Il(e) : Fl(e);
	for (var t = this._groups, n = t.length, r = [], i = [], a = 0; a < n; ++a) for (var o = t[a], s = o.length, c, l = 0; l < s; ++l) (c = o[l]) && (r.push(e.call(c, c.__data__, l, o)), i.push(c));
	return new bd(r, i);
}
function Rl(e) {
	return function() {
		return this.matches(e);
	};
}
function zl(e) {
	return function(t) {
		return t.matches(e);
	};
}
var Bl = Array.prototype.find;
function Vl(e) {
	return function() {
		return Bl.call(this.children, e);
	};
}
function Hl() {
	return this.firstElementChild;
}
function Ul(e) {
	return this.select(e == null ? Hl : Vl(typeof e == "function" ? e : zl(e)));
}
var Wl = Array.prototype.filter;
function Gl() {
	return Array.from(this.children);
}
function Kl(e) {
	return function() {
		return Wl.call(this.children, e);
	};
}
function ql(e) {
	return this.selectAll(e == null ? Gl : Kl(typeof e == "function" ? e : zl(e)));
}
function Jl(e) {
	typeof e != "function" && (e = Rl(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = [], c, l = 0; l < o; ++l) (c = a[l]) && e.call(c, c.__data__, l, a) && s.push(c);
	return new bd(r, this._parents);
}
function Yl(e) {
	return Array(e.length);
}
function Xl() {
	return new bd(this._enter || this._groups.map(Yl), this._parents);
}
function Zl(e, t) {
	this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Zl.prototype = {
	constructor: Zl,
	appendChild: function(e) {
		return this._parent.insertBefore(e, this._next);
	},
	insertBefore: function(e, t) {
		return this._parent.insertBefore(e, t);
	},
	querySelector: function(e) {
		return this._parent.querySelector(e);
	},
	querySelectorAll: function(e) {
		return this._parent.querySelectorAll(e);
	}
};
function Ql(e) {
	return function() {
		return e;
	};
}
function $l(e, t, n, r, i, a) {
	for (var o = 0, s, c = t.length, l = a.length; o < l; ++o) (s = t[o]) ? (s.__data__ = a[o], r[o] = s) : n[o] = new Zl(e, a[o]);
	for (; o < c; ++o) (s = t[o]) && (i[o] = s);
}
function eu(e, t, n, r, i, a, o) {
	var s, c, l = /* @__PURE__ */ new Map(), u = t.length, d = a.length, f = Array(u), p;
	for (s = 0; s < u; ++s) (c = t[s]) && (f[s] = p = o.call(c, c.__data__, s, t) + "", l.has(p) ? i[s] = c : l.set(p, c));
	for (s = 0; s < d; ++s) p = o.call(e, a[s], s, a) + "", (c = l.get(p)) ? (r[s] = c, c.__data__ = a[s], l.delete(p)) : n[s] = new Zl(e, a[s]);
	for (s = 0; s < u; ++s) (c = t[s]) && l.get(f[s]) === c && (i[s] = c);
}
function tu(e) {
	return e.__data__;
}
function nu(e, t) {
	if (!arguments.length) return Array.from(this, tu);
	var n = t ? eu : $l, r = this._parents, i = this._groups;
	typeof e != "function" && (e = Ql(e));
	for (var a = i.length, o = Array(a), s = Array(a), c = Array(a), l = 0; l < a; ++l) {
		var u = r[l], d = i[l], f = d.length, p = ru(e.call(u, u && u.__data__, l, r)), m = p.length, h = s[l] = Array(m), g = o[l] = Array(m);
		n(u, d, h, g, c[l] = Array(f), p, t);
		for (var _ = 0, v = 0, y, b; _ < m; ++_) if (y = h[_]) {
			for (_ >= v && (v = _ + 1); !(b = g[v]) && ++v < m;);
			y._next = b || null;
		}
	}
	return o = new bd(o, r), o._enter = s, o._exit = c, o;
}
function ru(e) {
	return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function iu() {
	return new bd(this._exit || this._groups.map(Yl), this._parents);
}
function au(e, t, n) {
	var r = this.enter(), i = this, a = this.exit();
	return typeof e == "function" ? (r = e(r), r &&= r.selection()) : r = r.append(e + ""), t != null && (i = t(i), i &&= i.selection()), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
function ou(e) {
	for (var t = e.selection ? e.selection() : e, n = this._groups, r = t._groups, i = n.length, a = r.length, o = Math.min(i, a), s = Array(i), c = 0; c < o; ++c) for (var l = n[c], u = r[c], d = l.length, f = s[c] = Array(d), p, m = 0; m < d; ++m) (p = l[m] || u[m]) && (f[m] = p);
	for (; c < i; ++c) s[c] = n[c];
	return new bd(s, this._parents);
}
function su() {
	for (var e = this._groups, t = -1, n = e.length; ++t < n;) for (var r = e[t], i = r.length - 1, a = r[i], o; --i >= 0;) (o = r[i]) && (a && o.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(o, a), a = o);
	return this;
}
function cu(e) {
	e ||= lu;
	function t(t, n) {
		return t && n ? e(t.__data__, n.__data__) : !t - !n;
	}
	for (var n = this._groups, r = n.length, i = Array(r), a = 0; a < r; ++a) {
		for (var o = n[a], s = o.length, c = i[a] = Array(s), l, u = 0; u < s; ++u) (l = o[u]) && (c[u] = l);
		c.sort(t);
	}
	return new bd(i, this._parents).order();
}
function lu(e, t) {
	return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function uu() {
	var e = arguments[0];
	return arguments[0] = this, e.apply(null, arguments), this;
}
function du() {
	return Array.from(this);
}
function fu() {
	for (var e = this._groups, t = 0, n = e.length; t < n; ++t) for (var r = e[t], i = 0, a = r.length; i < a; ++i) {
		var o = r[i];
		if (o) return o;
	}
	return null;
}
function pu() {
	let e = 0;
	for (let t of this) ++e;
	return e;
}
function mu() {
	return !this.node();
}
function hu(e) {
	for (var t = this._groups, n = 0, r = t.length; n < r; ++n) for (var i = t[n], a = 0, o = i.length, s; a < o; ++a) (s = i[a]) && e.call(s, s.__data__, a, i);
	return this;
}
function gu(e) {
	return function() {
		this.removeAttribute(e);
	};
}
function _u(e) {
	return function() {
		this.removeAttributeNS(e.space, e.local);
	};
}
function vu(e, t) {
	return function() {
		this.setAttribute(e, t);
	};
}
function yu(e, t) {
	return function() {
		this.setAttributeNS(e.space, e.local, t);
	};
}
function bu(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
	};
}
function xu(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
	};
}
function Su(e, t) {
	var n = El(e);
	if (arguments.length < 2) {
		var r = this.node();
		return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
	}
	return this.each((t == null ? n.local ? _u : gu : typeof t == "function" ? n.local ? xu : bu : n.local ? yu : vu)(n, t));
}
function Cu(e) {
	return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function wu(e) {
	return function() {
		this.style.removeProperty(e);
	};
}
function Tu(e, t, n) {
	return function() {
		this.style.setProperty(e, t, n);
	};
}
function Eu(e, t, n) {
	return function() {
		var r = t.apply(this, arguments);
		r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
	};
}
function Du(e, t, n) {
	return arguments.length > 1 ? this.each((t == null ? wu : typeof t == "function" ? Eu : Tu)(e, t, n ?? "")) : Ou(this.node(), e);
}
function Ou(e, t) {
	return e.style.getPropertyValue(t) || Cu(e).getComputedStyle(e, null).getPropertyValue(t);
}
function ku(e) {
	return function() {
		delete this[e];
	};
}
function Au(e, t) {
	return function() {
		this[e] = t;
	};
}
function ju(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? delete this[e] : this[e] = n;
	};
}
function Mu(e, t) {
	return arguments.length > 1 ? this.each((t == null ? ku : typeof t == "function" ? ju : Au)(e, t)) : this.node()[e];
}
function Nu(e) {
	return e.trim().split(/^|\s+/);
}
function Pu(e) {
	return e.classList || new Fu(e);
}
function Fu(e) {
	this._node = e, this._names = Nu(e.getAttribute("class") || "");
}
Fu.prototype = {
	add: function(e) {
		this._names.indexOf(e) < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
	},
	remove: function(e) {
		var t = this._names.indexOf(e);
		t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
	},
	contains: function(e) {
		return this._names.indexOf(e) >= 0;
	}
};
function Iu(e, t) {
	for (var n = Pu(e), r = -1, i = t.length; ++r < i;) n.add(t[r]);
}
function Lu(e, t) {
	for (var n = Pu(e), r = -1, i = t.length; ++r < i;) n.remove(t[r]);
}
function Ru(e) {
	return function() {
		Iu(this, e);
	};
}
function zu(e) {
	return function() {
		Lu(this, e);
	};
}
function Bu(e, t) {
	return function() {
		(t.apply(this, arguments) ? Iu : Lu)(this, e);
	};
}
function Vu(e, t) {
	var n = Nu(e + "");
	if (arguments.length < 2) {
		for (var r = Pu(this.node()), i = -1, a = n.length; ++i < a;) if (!r.contains(n[i])) return !1;
		return !0;
	}
	return this.each((typeof t == "function" ? Bu : t ? Ru : zu)(n, t));
}
function Hu() {
	this.textContent = "";
}
function Uu(e) {
	return function() {
		this.textContent = e;
	};
}
function Wu(e) {
	return function() {
		var t = e.apply(this, arguments);
		this.textContent = t ?? "";
	};
}
function Gu(e) {
	return arguments.length ? this.each(e == null ? Hu : (typeof e == "function" ? Wu : Uu)(e)) : this.node().textContent;
}
function Ku() {
	this.innerHTML = "";
}
function qu(e) {
	return function() {
		this.innerHTML = e;
	};
}
function Ju(e) {
	return function() {
		var t = e.apply(this, arguments);
		this.innerHTML = t ?? "";
	};
}
function Yu(e) {
	return arguments.length ? this.each(e == null ? Ku : (typeof e == "function" ? Ju : qu)(e)) : this.node().innerHTML;
}
function Xu() {
	this.nextSibling && this.parentNode.appendChild(this);
}
function Zu() {
	return this.each(Xu);
}
function Qu() {
	this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function $u() {
	return this.each(Qu);
}
function ed(e) {
	var t = typeof e == "function" ? e : kl(e);
	return this.select(function() {
		return this.appendChild(t.apply(this, arguments));
	});
}
function td() {
	return null;
}
function nd(e, t) {
	var n = typeof e == "function" ? e : kl(e), r = t == null ? td : typeof t == "function" ? t : jl(t);
	return this.select(function() {
		return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
	});
}
function rd() {
	var e = this.parentNode;
	e && e.removeChild(this);
}
function id() {
	return this.each(rd);
}
function ad() {
	var e = this.cloneNode(!1), t = this.parentNode;
	return t ? t.insertBefore(e, this.nextSibling) : e;
}
function od() {
	var e = this.cloneNode(!0), t = this.parentNode;
	return t ? t.insertBefore(e, this.nextSibling) : e;
}
function sd(e) {
	return this.select(e ? od : ad);
}
function cd(e) {
	return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function ld(e) {
	return function(t) {
		e.call(this, t, this.__data__);
	};
}
function ud(e) {
	return e.trim().split(/^|\s+/).map(function(e) {
		var t = "", n = e.indexOf(".");
		return n >= 0 && (t = e.slice(n + 1), e = e.slice(0, n)), {
			type: e,
			name: t
		};
	});
}
function dd(e) {
	return function() {
		var t = this.__on;
		if (t) {
			for (var n = 0, r = -1, i = t.length, a; n < i; ++n) a = t[n], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++r] = a;
			++r ? t.length = r : delete this.__on;
		}
	};
}
function fd(e, t, n) {
	return function() {
		var r = this.__on, i, a = ld(t);
		if (r) {
			for (var o = 0, s = r.length; o < s; ++o) if ((i = r[o]).type === e.type && i.name === e.name) {
				this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = a, i.options = n), i.value = t;
				return;
			}
		}
		this.addEventListener(e.type, a, n), i = {
			type: e.type,
			name: e.name,
			value: t,
			listener: a,
			options: n
		}, r ? r.push(i) : this.__on = [i];
	};
}
function pd(e, t, n) {
	var r = ud(e + ""), i, a = r.length, o;
	if (arguments.length < 2) {
		var s = this.node().__on;
		if (s) {
			for (var c = 0, l = s.length, u; c < l; ++c) for (i = 0, u = s[c]; i < a; ++i) if ((o = r[i]).type === u.type && o.name === u.name) return u.value;
		}
		return;
	}
	for (s = t ? fd : dd, i = 0; i < a; ++i) this.each(s(r[i], t, n));
	return this;
}
function md(e, t, n) {
	var r = Cu(e), i = r.CustomEvent;
	typeof i == "function" ? i = new i(t, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(t, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
}
function hd(e, t) {
	return function() {
		return md(this, e, t);
	};
}
function gd(e, t) {
	return function() {
		return md(this, e, t.apply(this, arguments));
	};
}
function _d(e, t) {
	return this.each((typeof t == "function" ? gd : hd)(e, t));
}
function* vd() {
	for (var e = this._groups, t = 0, n = e.length; t < n; ++t) for (var r = e[t], i = 0, a = r.length, o; i < a; ++i) (o = r[i]) && (yield o);
}
var yd = [null];
function bd(e, t) {
	this._groups = e, this._parents = t;
}
function xd() {
	return new bd([[document.documentElement]], yd);
}
function Sd() {
	return this;
}
bd.prototype = xd.prototype = {
	constructor: bd,
	select: Ml,
	selectAll: Ll,
	selectChild: Ul,
	selectChildren: ql,
	filter: Jl,
	data: nu,
	enter: Xl,
	exit: iu,
	join: au,
	merge: ou,
	selection: Sd,
	order: su,
	sort: cu,
	call: uu,
	nodes: du,
	node: fu,
	size: pu,
	empty: mu,
	each: hu,
	attr: Su,
	style: Du,
	property: Mu,
	classed: Vu,
	text: Gu,
	html: Yu,
	raise: Zu,
	lower: $u,
	append: ed,
	insert: nd,
	remove: id,
	clone: sd,
	datum: cd,
	on: pd,
	dispatch: _d,
	[Symbol.iterator]: vd
};
function Cd(e) {
	return typeof e == "string" ? new bd([[document.querySelector(e)]], [document.documentElement]) : new bd([[e]], yd);
}
function wd(e) {
	let t;
	for (; t = e.sourceEvent;) e = t;
	return e;
}
function Td(e, t) {
	if (e = wd(e), t === void 0 && (t = e.currentTarget), t) {
		var n = t.ownerSVGElement || t;
		if (n.createSVGPoint) {
			var r = n.createSVGPoint();
			return r.x = e.clientX, r.y = e.clientY, r = r.matrixTransform(t.getScreenCTM().inverse()), [r.x, r.y];
		}
		if (t.getBoundingClientRect) {
			var i = t.getBoundingClientRect();
			return [e.clientX - i.left - t.clientLeft, e.clientY - i.top - t.clientTop];
		}
	}
	return [e.pageX, e.pageY];
}
var Ed = { passive: !1 }, Dd = {
	capture: !0,
	passive: !1
};
function Od(e) {
	e.stopImmediatePropagation();
}
function kd(e) {
	e.preventDefault(), e.stopImmediatePropagation();
}
function Ad(e) {
	var t = e.document.documentElement, n = Cd(e).on("dragstart.drag", kd, Dd);
	"onselectstart" in t ? n.on("selectstart.drag", kd, Dd) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function jd(e, t) {
	var n = e.document.documentElement, r = Cd(e).on("dragstart.drag", null);
	t && (r.on("click.drag", kd, Dd), setTimeout(function() {
		r.on("click.drag", null);
	}, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
var Md = (e) => () => e;
function Nd(e, { sourceEvent: t, subject: n, target: r, identifier: i, active: a, x: o, y: s, dx: c, dy: l, dispatch: u }) {
	Object.defineProperties(this, {
		type: {
			value: e,
			enumerable: !0,
			configurable: !0
		},
		sourceEvent: {
			value: t,
			enumerable: !0,
			configurable: !0
		},
		subject: {
			value: n,
			enumerable: !0,
			configurable: !0
		},
		target: {
			value: r,
			enumerable: !0,
			configurable: !0
		},
		identifier: {
			value: i,
			enumerable: !0,
			configurable: !0
		},
		active: {
			value: a,
			enumerable: !0,
			configurable: !0
		},
		x: {
			value: o,
			enumerable: !0,
			configurable: !0
		},
		y: {
			value: s,
			enumerable: !0,
			configurable: !0
		},
		dx: {
			value: c,
			enumerable: !0,
			configurable: !0
		},
		dy: {
			value: l,
			enumerable: !0,
			configurable: !0
		},
		_: { value: u }
	});
}
Nd.prototype.on = function() {
	var e = this._.on.apply(this._, arguments);
	return e === this._ ? this : e;
};
function Pd(e) {
	return !e.ctrlKey && !e.button;
}
function Fd() {
	return this.parentNode;
}
function Id(e, t) {
	return t ?? {
		x: e.x,
		y: e.y
	};
}
function Ld() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Rd() {
	var e = Pd, t = Fd, n = Id, r = Ld, i = {}, a = yl("start", "drag", "end"), o = 0, s, c, l, u, d = 0;
	function f(e) {
		e.on("mousedown.drag", p).filter(r).on("touchstart.drag", g).on("touchmove.drag", _, Ed).on("touchend.drag touchcancel.drag", v).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	function p(n, r) {
		if (!(u || !e.call(this, n, r))) {
			var i = y(this, t.call(this, n, r), n, r, "mouse");
			i && (Cd(n.view).on("mousemove.drag", m, Dd).on("mouseup.drag", h, Dd), Ad(n.view), Od(n), l = !1, s = n.clientX, c = n.clientY, i("start", n));
		}
	}
	function m(e) {
		if (kd(e), !l) {
			var t = e.clientX - s, n = e.clientY - c;
			l = t * t + n * n > d;
		}
		i.mouse("drag", e);
	}
	function h(e) {
		Cd(e.view).on("mousemove.drag mouseup.drag", null), jd(e.view, l), kd(e), i.mouse("end", e);
	}
	function g(n, r) {
		if (e.call(this, n, r)) {
			var i = n.changedTouches, a = t.call(this, n, r), o = i.length, s, c;
			for (s = 0; s < o; ++s) (c = y(this, a, n, r, i[s].identifier, i[s])) && (Od(n), c("start", n, i[s]));
		}
	}
	function _(e) {
		var t = e.changedTouches, n = t.length, r, a;
		for (r = 0; r < n; ++r) (a = i[t[r].identifier]) && (kd(e), a("drag", e, t[r]));
	}
	function v(e) {
		var t = e.changedTouches, n = t.length, r, a;
		for (u && clearTimeout(u), u = setTimeout(function() {
			u = null;
		}, 500), r = 0; r < n; ++r) (a = i[t[r].identifier]) && (Od(e), a("end", e, t[r]));
	}
	function y(e, t, r, s, c, l) {
		var u = a.copy(), d = Td(l || r, t), p, m, h;
		if ((h = n.call(e, new Nd("beforestart", {
			sourceEvent: r,
			target: f,
			identifier: c,
			active: o,
			x: d[0],
			y: d[1],
			dx: 0,
			dy: 0,
			dispatch: u
		}), s)) != null) return p = h.x - d[0] || 0, m = h.y - d[1] || 0, function n(r, a, l) {
			var g = d, _;
			switch (r) {
				case "start":
					i[c] = n, _ = o++;
					break;
				case "end": delete i[c], --o;
				case "drag":
					d = Td(l || a, t), _ = o;
					break;
			}
			u.call(r, e, new Nd(r, {
				sourceEvent: a,
				subject: h,
				target: f,
				identifier: c,
				active: _,
				x: d[0] + p,
				y: d[1] + m,
				dx: d[0] - g[0],
				dy: d[1] - g[1],
				dispatch: u
			}), s);
		};
	}
	return f.filter = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : Md(!!t), f) : e;
	}, f.container = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : Md(e), f) : t;
	}, f.subject = function(e) {
		return arguments.length ? (n = typeof e == "function" ? e : Md(e), f) : n;
	}, f.touchable = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : Md(!!e), f) : r;
	}, f.on = function() {
		var e = a.on.apply(a, arguments);
		return e === a ? f : e;
	}, f.clickDistance = function(e) {
		return arguments.length ? (d = (e = +e) * e, f) : Math.sqrt(d);
	}, f;
}
function zd(e, t, n) {
	e.prototype = t.prototype = n, n.constructor = e;
}
function Bd(e, t) {
	var n = Object.create(e.prototype);
	for (var r in t) n[r] = t[r];
	return n;
}
function Vd() {}
var Hd = .7, Ud = 1 / Hd, Wd = "\\s*([+-]?\\d+)\\s*", Gd = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Kd = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", qd = /^#([0-9a-f]{3,8})$/, Jd = RegExp(`^rgb\\(${Wd},${Wd},${Wd}\\)$`), Yd = RegExp(`^rgb\\(${Kd},${Kd},${Kd}\\)$`), Xd = RegExp(`^rgba\\(${Wd},${Wd},${Wd},${Gd}\\)$`), Zd = RegExp(`^rgba\\(${Kd},${Kd},${Kd},${Gd}\\)$`), Qd = RegExp(`^hsl\\(${Gd},${Kd},${Kd}\\)$`), $d = RegExp(`^hsla\\(${Gd},${Kd},${Kd},${Gd}\\)$`), ef = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	rebeccapurple: 6697881,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
};
zd(Vd, of, {
	copy(e) {
		return Object.assign(new this.constructor(), this, e);
	},
	displayable() {
		return this.rgb().displayable();
	},
	hex: tf,
	formatHex: tf,
	formatHex8: nf,
	formatHsl: rf,
	formatRgb: af,
	toString: af
});
function tf() {
	return this.rgb().formatHex();
}
function nf() {
	return this.rgb().formatHex8();
}
function rf() {
	return yf(this).formatHsl();
}
function af() {
	return this.rgb().formatRgb();
}
function of(e) {
	var t, n;
	return e = (e + "").trim().toLowerCase(), (t = qd.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? sf(t) : n === 3 ? new df(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? cf(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? cf(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Jd.exec(e)) ? new df(t[1], t[2], t[3], 1) : (t = Yd.exec(e)) ? new df(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Xd.exec(e)) ? cf(t[1], t[2], t[3], t[4]) : (t = Zd.exec(e)) ? cf(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Qd.exec(e)) ? vf(t[1], t[2] / 100, t[3] / 100, 1) : (t = $d.exec(e)) ? vf(t[1], t[2] / 100, t[3] / 100, t[4]) : ef.hasOwnProperty(e) ? sf(ef[e]) : e === "transparent" ? new df(NaN, NaN, NaN, 0) : null;
}
function sf(e) {
	return new df(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function cf(e, t, n, r) {
	return r <= 0 && (e = t = n = NaN), new df(e, t, n, r);
}
function lf(e) {
	return e instanceof Vd || (e = of(e)), e ? (e = e.rgb(), new df(e.r, e.g, e.b, e.opacity)) : new df();
}
function uf(e, t, n, r) {
	return arguments.length === 1 ? lf(e) : new df(e, t, n, r ?? 1);
}
function df(e, t, n, r) {
	this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
zd(df, uf, Bd(Vd, {
	brighter(e) {
		return e = e == null ? Ud : Ud ** +e, new df(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? Hd : Hd ** +e, new df(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	rgb() {
		return this;
	},
	clamp() {
		return new df(gf(this.r), gf(this.g), gf(this.b), hf(this.opacity));
	},
	displayable() {
		return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
	},
	hex: ff,
	formatHex: ff,
	formatHex8: pf,
	formatRgb: mf,
	toString: mf
}));
function ff() {
	return `#${_f(this.r)}${_f(this.g)}${_f(this.b)}`;
}
function pf() {
	return `#${_f(this.r)}${_f(this.g)}${_f(this.b)}${_f((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function mf() {
	let e = hf(this.opacity);
	return `${e === 1 ? "rgb(" : "rgba("}${gf(this.r)}, ${gf(this.g)}, ${gf(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function hf(e) {
	return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function gf(e) {
	return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function _f(e) {
	return e = gf(e), (e < 16 ? "0" : "") + e.toString(16);
}
function vf(e, t, n, r) {
	return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new xf(e, t, n, r);
}
function yf(e) {
	if (e instanceof xf) return new xf(e.h, e.s, e.l, e.opacity);
	if (e instanceof Vd || (e = of(e)), !e) return new xf();
	if (e instanceof xf) return e;
	e = e.rgb();
	var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), a = Math.max(t, n, r), o = NaN, s = a - i, c = (a + i) / 2;
	return s ? (o = t === a ? (n - r) / s + (n < r) * 6 : n === a ? (r - t) / s + 2 : (t - n) / s + 4, s /= c < .5 ? a + i : 2 - a - i, o *= 60) : s = c > 0 && c < 1 ? 0 : o, new xf(o, s, c, e.opacity);
}
function bf(e, t, n, r) {
	return arguments.length === 1 ? yf(e) : new xf(e, t, n, r ?? 1);
}
function xf(e, t, n, r) {
	this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
zd(xf, bf, Bd(Vd, {
	brighter(e) {
		return e = e == null ? Ud : Ud ** +e, new xf(this.h, this.s, this.l * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? Hd : Hd ** +e, new xf(this.h, this.s, this.l * e, this.opacity);
	},
	rgb() {
		var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < .5 ? n : 1 - n) * t, i = 2 * n - r;
		return new df(wf(e >= 240 ? e - 240 : e + 120, i, r), wf(e, i, r), wf(e < 120 ? e + 240 : e - 120, i, r), this.opacity);
	},
	clamp() {
		return new xf(Sf(this.h), Cf(this.s), Cf(this.l), hf(this.opacity));
	},
	displayable() {
		return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
	},
	formatHsl() {
		let e = hf(this.opacity);
		return `${e === 1 ? "hsl(" : "hsla("}${Sf(this.h)}, ${Cf(this.s) * 100}%, ${Cf(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
	}
}));
function Sf(e) {
	return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Cf(e) {
	return Math.max(0, Math.min(1, e || 0));
}
function wf(e, t, n) {
	return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
var Tf = (e) => () => e;
function Ef(e, t) {
	return function(n) {
		return e + n * t;
	};
}
function Df(e, t, n) {
	return e **= +n, t = t ** +n - e, n = 1 / n, function(r) {
		return (e + r * t) ** +n;
	};
}
function Of(e) {
	return (e = +e) == 1 ? kf : function(t, n) {
		return n - t ? Df(t, n, e) : Tf(isNaN(t) ? n : t);
	};
}
function kf(e, t) {
	var n = t - e;
	return n ? Ef(e, n) : Tf(isNaN(e) ? t : e);
}
var Af = (function e(t) {
	var n = Of(t);
	function r(e, t) {
		var r = n((e = uf(e)).r, (t = uf(t)).r), i = n(e.g, t.g), a = n(e.b, t.b), o = kf(e.opacity, t.opacity);
		return function(t) {
			return e.r = r(t), e.g = i(t), e.b = a(t), e.opacity = o(t), e + "";
		};
	}
	return r.gamma = e, r;
})(1);
function jf(e, t) {
	t ||= [];
	var n = e ? Math.min(t.length, e.length) : 0, r = t.slice(), i;
	return function(a) {
		for (i = 0; i < n; ++i) r[i] = e[i] * (1 - a) + t[i] * a;
		return r;
	};
}
function Mf(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function Nf(e, t) {
	var n = t ? t.length : 0, r = e ? Math.min(n, e.length) : 0, i = Array(r), a = Array(n), o;
	for (o = 0; o < r; ++o) i[o] = Hf(e[o], t[o]);
	for (; o < n; ++o) a[o] = t[o];
	return function(e) {
		for (o = 0; o < r; ++o) a[o] = i[o](e);
		return a;
	};
}
function Pf(e, t) {
	var n = /* @__PURE__ */ new Date();
	return e = +e, t = +t, function(r) {
		return n.setTime(e * (1 - r) + t * r), n;
	};
}
function Ff(e, t) {
	return e = +e, t = +t, function(n) {
		return e * (1 - n) + t * n;
	};
}
function If(e, t) {
	var n = {}, r = {}, i;
	for (i in (typeof e != "object" || !e) && (e = {}), (typeof t != "object" || !t) && (t = {}), t) i in e ? n[i] = Hf(e[i], t[i]) : r[i] = t[i];
	return function(e) {
		for (i in n) r[i] = n[i](e);
		return r;
	};
}
var Lf = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Rf = new RegExp(Lf.source, "g");
function zf(e) {
	return function() {
		return e;
	};
}
function Bf(e) {
	return function(t) {
		return e(t) + "";
	};
}
function Vf(e, t) {
	var n = Lf.lastIndex = Rf.lastIndex = 0, r, i, a, o = -1, s = [], c = [];
	for (e += "", t += ""; (r = Lf.exec(e)) && (i = Rf.exec(t));) (a = i.index) > n && (a = t.slice(n, a), s[o] ? s[o] += a : s[++o] = a), (r = r[0]) === (i = i[0]) ? s[o] ? s[o] += i : s[++o] = i : (s[++o] = null, c.push({
		i: o,
		x: Ff(r, i)
	})), n = Rf.lastIndex;
	return n < t.length && (a = t.slice(n), s[o] ? s[o] += a : s[++o] = a), s.length < 2 ? c[0] ? Bf(c[0].x) : zf(t) : (t = c.length, function(e) {
		for (var n = 0, r; n < t; ++n) s[(r = c[n]).i] = r.x(e);
		return s.join("");
	});
}
function Hf(e, t) {
	var n = typeof t, r;
	return t == null || n === "boolean" ? Tf(t) : (n === "number" ? Ff : n === "string" ? (r = of(t)) ? (t = r, Af) : Vf : t instanceof of ? Af : t instanceof Date ? Pf : Mf(t) ? jf : Array.isArray(t) ? Nf : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? If : Ff)(e, t);
}
function Uf(e, t) {
	return e = +e, t = +t, function(n) {
		return Math.round(e * (1 - n) + t * n);
	};
}
var Wf = 180 / Math.PI, Gf = {
	translateX: 0,
	translateY: 0,
	rotate: 0,
	skewX: 0,
	scaleX: 1,
	scaleY: 1
};
function Kf(e, t, n, r, i, a) {
	var o, s, c;
	return (o = Math.sqrt(e * e + t * t)) && (e /= o, t /= o), (c = e * n + t * r) && (n -= e * c, r -= t * c), (s = Math.sqrt(n * n + r * r)) && (n /= s, r /= s, c /= s), e * r < t * n && (e = -e, t = -t, c = -c, o = -o), {
		translateX: i,
		translateY: a,
		rotate: Math.atan2(t, e) * Wf,
		skewX: Math.atan(c) * Wf,
		scaleX: o,
		scaleY: s
	};
}
var qf;
function Jf(e) {
	let t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
	return t.isIdentity ? Gf : Kf(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Yf(e) {
	return e == null || (qf ||= document.createElementNS("http://www.w3.org/2000/svg", "g"), qf.setAttribute("transform", e), !(e = qf.transform.baseVal.consolidate())) ? Gf : (e = e.matrix, Kf(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Xf(e, t, n, r) {
	function i(e) {
		return e.length ? e.pop() + " " : "";
	}
	function a(e, r, i, a, o, s) {
		if (e !== i || r !== a) {
			var c = o.push("translate(", null, t, null, n);
			s.push({
				i: c - 4,
				x: Ff(e, i)
			}, {
				i: c - 2,
				x: Ff(r, a)
			});
		} else (i || a) && o.push("translate(" + i + t + a + n);
	}
	function o(e, t, n, a) {
		e === t ? t && n.push(i(n) + "rotate(" + t + r) : (e - t > 180 ? t += 360 : t - e > 180 && (e += 360), a.push({
			i: n.push(i(n) + "rotate(", null, r) - 2,
			x: Ff(e, t)
		}));
	}
	function s(e, t, n, a) {
		e === t ? t && n.push(i(n) + "skewX(" + t + r) : a.push({
			i: n.push(i(n) + "skewX(", null, r) - 2,
			x: Ff(e, t)
		});
	}
	function c(e, t, n, r, a, o) {
		if (e !== n || t !== r) {
			var s = a.push(i(a) + "scale(", null, ",", null, ")");
			o.push({
				i: s - 4,
				x: Ff(e, n)
			}, {
				i: s - 2,
				x: Ff(t, r)
			});
		} else (n !== 1 || r !== 1) && a.push(i(a) + "scale(" + n + "," + r + ")");
	}
	return function(t, n) {
		var r = [], i = [];
		return t = e(t), n = e(n), a(t.translateX, t.translateY, n.translateX, n.translateY, r, i), o(t.rotate, n.rotate, r, i), s(t.skewX, n.skewX, r, i), c(t.scaleX, t.scaleY, n.scaleX, n.scaleY, r, i), t = n = null, function(e) {
			for (var t = -1, n = i.length, a; ++t < n;) r[(a = i[t]).i] = a.x(e);
			return r.join("");
		};
	};
}
var Zf = Xf(Jf, "px, ", "px)", "deg)"), Qf = Xf(Yf, ", ", ")", ")"), $f = 0, ep = 0, tp = 0, np = 1e3, rp, ip, ap = 0, op = 0, sp = 0, cp = typeof performance == "object" && performance.now ? performance : Date, lp = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
	setTimeout(e, 17);
};
function up() {
	return op ||= (lp(dp), cp.now() + sp);
}
function dp() {
	op = 0;
}
function fp() {
	this._call = this._time = this._next = null;
}
fp.prototype = pp.prototype = {
	constructor: fp,
	restart: function(e, t, n) {
		if (typeof e != "function") throw TypeError("callback is not a function");
		n = (n == null ? up() : +n) + (t == null ? 0 : +t), !this._next && ip !== this && (ip ? ip._next = this : rp = this, ip = this), this._call = e, this._time = n, vp();
	},
	stop: function() {
		this._call && (this._call = null, this._time = Infinity, vp());
	}
};
function pp(e, t, n) {
	var r = new fp();
	return r.restart(e, t, n), r;
}
function mp() {
	up(), ++$f;
	for (var e = rp, t; e;) (t = op - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
	--$f;
}
function hp() {
	op = (ap = cp.now()) + sp, $f = ep = 0;
	try {
		mp();
	} finally {
		$f = 0, _p(), op = 0;
	}
}
function gp() {
	var e = cp.now(), t = e - ap;
	t > np && (sp -= t, ap = e);
}
function _p() {
	for (var e, t = rp, n, r = Infinity; t;) t._call ? (r > t._time && (r = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : rp = n);
	ip = e, vp(r);
}
function vp(e) {
	$f || (ep &&= clearTimeout(ep), e - op > 24 ? (e < Infinity && (ep = setTimeout(hp, e - cp.now() - sp)), tp &&= clearInterval(tp)) : (tp ||= (ap = cp.now(), setInterval(gp, np)), $f = 1, lp(hp)));
}
function yp(e, t, n) {
	var r = new fp();
	return t = t == null ? 0 : +t, r.restart((n) => {
		r.stop(), e(n + t);
	}, t, n), r;
}
var bp = yl("start", "end", "cancel", "interrupt"), xp = [], Sp = 0, Cp = 1, wp = 2, Tp = 3, Ep = 4, Dp = 5, Op = 6;
function kp(e, t, n, r, i, a) {
	var o = e.__transition;
	if (!o) e.__transition = {};
	else if (n in o) return;
	Np(e, n, {
		name: t,
		index: r,
		group: i,
		on: bp,
		tween: xp,
		time: a.time,
		delay: a.delay,
		duration: a.duration,
		ease: a.ease,
		timer: null,
		state: Sp
	});
}
function Ap(e, t) {
	var n = Mp(e, t);
	if (n.state > Sp) throw Error("too late; already scheduled");
	return n;
}
function jp(e, t) {
	var n = Mp(e, t);
	if (n.state > Tp) throw Error("too late; already running");
	return n;
}
function Mp(e, t) {
	var n = e.__transition;
	if (!n || !(n = n[t])) throw Error("transition not found");
	return n;
}
function Np(e, t, n) {
	var r = e.__transition, i;
	r[t] = n, n.timer = pp(a, 0, n.time);
	function a(e) {
		n.state = Cp, n.timer.restart(o, n.delay, n.time), n.delay <= e && o(e - n.delay);
	}
	function o(a) {
		var l, u, d, f;
		if (n.state !== Cp) return c();
		for (l in r) if (f = r[l], f.name === n.name) {
			if (f.state === Tp) return yp(o);
			f.state === Ep ? (f.state = Op, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete r[l]) : +l < t && (f.state = Op, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete r[l]);
		}
		if (yp(function() {
			n.state === Tp && (n.state = Ep, n.timer.restart(s, n.delay, n.time), s(a));
		}), n.state = wp, n.on.call("start", e, e.__data__, n.index, n.group), n.state === wp) {
			for (n.state = Tp, i = Array(d = n.tween.length), l = 0, u = -1; l < d; ++l) (f = n.tween[l].value.call(e, e.__data__, n.index, n.group)) && (i[++u] = f);
			i.length = u + 1;
		}
	}
	function s(t) {
		for (var r = t < n.duration ? n.ease.call(null, t / n.duration) : (n.timer.restart(c), n.state = Dp, 1), a = -1, o = i.length; ++a < o;) i[a].call(e, r);
		n.state === Dp && (n.on.call("end", e, e.__data__, n.index, n.group), c());
	}
	function c() {
		for (var i in n.state = Op, n.timer.stop(), delete r[t], r) return;
		delete e.__transition;
	}
}
function Pp(e, t) {
	var n = e.__transition, r, i, a = !0, o;
	if (n) {
		for (o in t = t == null ? null : t + "", n) {
			if ((r = n[o]).name !== t) {
				a = !1;
				continue;
			}
			i = r.state > wp && r.state < Dp, r.state = Op, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", e, e.__data__, r.index, r.group), delete n[o];
		}
		a && delete e.__transition;
	}
}
function Fp(e) {
	return this.each(function() {
		Pp(this, e);
	});
}
function Ip(e, t) {
	var n, r;
	return function() {
		var i = jp(this, e), a = i.tween;
		if (a !== n) {
			r = n = a;
			for (var o = 0, s = r.length; o < s; ++o) if (r[o].name === t) {
				r = r.slice(), r.splice(o, 1);
				break;
			}
		}
		i.tween = r;
	};
}
function Lp(e, t, n) {
	var r, i;
	if (typeof n != "function") throw Error();
	return function() {
		var a = jp(this, e), o = a.tween;
		if (o !== r) {
			i = (r = o).slice();
			for (var s = {
				name: t,
				value: n
			}, c = 0, l = i.length; c < l; ++c) if (i[c].name === t) {
				i[c] = s;
				break;
			}
			c === l && i.push(s);
		}
		a.tween = i;
	};
}
function Rp(e, t) {
	var n = this._id;
	if (e += "", arguments.length < 2) {
		for (var r = Mp(this.node(), n).tween, i = 0, a = r.length, o; i < a; ++i) if ((o = r[i]).name === e) return o.value;
		return null;
	}
	return this.each((t == null ? Ip : Lp)(n, e, t));
}
function zp(e, t, n) {
	var r = e._id;
	return e.each(function() {
		var e = jp(this, r);
		(e.value ||= {})[t] = n.apply(this, arguments);
	}), function(e) {
		return Mp(e, r).value[t];
	};
}
function Bp(e, t) {
	var n;
	return (typeof t == "number" ? Ff : t instanceof of ? Af : (n = of(t)) ? (t = n, Af) : Vf)(e, t);
}
function Vp(e) {
	return function() {
		this.removeAttribute(e);
	};
}
function Hp(e) {
	return function() {
		this.removeAttributeNS(e.space, e.local);
	};
}
function Up(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = this.getAttribute(e);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function Wp(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = this.getAttributeNS(e.space, e.local);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function Gp(e, t, n) {
	var r, i, a;
	return function() {
		var o, s = n(this), c;
		return s == null ? void this.removeAttribute(e) : (o = this.getAttribute(e), c = s + "", o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s)));
	};
}
function Kp(e, t, n) {
	var r, i, a;
	return function() {
		var o, s = n(this), c;
		return s == null ? void this.removeAttributeNS(e.space, e.local) : (o = this.getAttributeNS(e.space, e.local), c = s + "", o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s)));
	};
}
function qp(e, t) {
	var n = El(e), r = n === "transform" ? Qf : Bp;
	return this.attrTween(e, typeof t == "function" ? (n.local ? Kp : Gp)(n, r, zp(this, "attr." + e, t)) : t == null ? (n.local ? Hp : Vp)(n) : (n.local ? Wp : Up)(n, r, t));
}
function Jp(e, t) {
	return function(n) {
		this.setAttribute(e, t.call(this, n));
	};
}
function Yp(e, t) {
	return function(n) {
		this.setAttributeNS(e.space, e.local, t.call(this, n));
	};
}
function Xp(e, t) {
	var n, r;
	function i() {
		var i = t.apply(this, arguments);
		return i !== r && (n = (r = i) && Yp(e, i)), n;
	}
	return i._value = t, i;
}
function Zp(e, t) {
	var n, r;
	function i() {
		var i = t.apply(this, arguments);
		return i !== r && (n = (r = i) && Jp(e, i)), n;
	}
	return i._value = t, i;
}
function Qp(e, t) {
	var n = "attr." + e;
	if (arguments.length < 2) return (n = this.tween(n)) && n._value;
	if (t == null) return this.tween(n, null);
	if (typeof t != "function") throw Error();
	var r = El(e);
	return this.tween(n, (r.local ? Xp : Zp)(r, t));
}
function $p(e, t) {
	return function() {
		Ap(this, e).delay = +t.apply(this, arguments);
	};
}
function em(e, t) {
	return t = +t, function() {
		Ap(this, e).delay = t;
	};
}
function tm(e) {
	var t = this._id;
	return arguments.length ? this.each((typeof e == "function" ? $p : em)(t, e)) : Mp(this.node(), t).delay;
}
function nm(e, t) {
	return function() {
		jp(this, e).duration = +t.apply(this, arguments);
	};
}
function rm(e, t) {
	return t = +t, function() {
		jp(this, e).duration = t;
	};
}
function im(e) {
	var t = this._id;
	return arguments.length ? this.each((typeof e == "function" ? nm : rm)(t, e)) : Mp(this.node(), t).duration;
}
function am(e, t) {
	if (typeof t != "function") throw Error();
	return function() {
		jp(this, e).ease = t;
	};
}
function om(e) {
	var t = this._id;
	return arguments.length ? this.each(am(t, e)) : Mp(this.node(), t).ease;
}
function sm(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		if (typeof n != "function") throw Error();
		jp(this, e).ease = n;
	};
}
function cm(e) {
	if (typeof e != "function") throw Error();
	return this.each(sm(this._id, e));
}
function lm(e) {
	typeof e != "function" && (e = Rl(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = [], c, l = 0; l < o; ++l) (c = a[l]) && e.call(c, c.__data__, l, a) && s.push(c);
	return new Rm(r, this._parents, this._name, this._id);
}
function um(e) {
	if (e._id !== this._id) throw Error();
	for (var t = this._groups, n = e._groups, r = t.length, i = n.length, a = Math.min(r, i), o = Array(r), s = 0; s < a; ++s) for (var c = t[s], l = n[s], u = c.length, d = o[s] = Array(u), f, p = 0; p < u; ++p) (f = c[p] || l[p]) && (d[p] = f);
	for (; s < r; ++s) o[s] = t[s];
	return new Rm(o, this._parents, this._name, this._id);
}
function dm(e) {
	return (e + "").trim().split(/^|\s+/).every(function(e) {
		var t = e.indexOf(".");
		return t >= 0 && (e = e.slice(0, t)), !e || e === "start";
	});
}
function fm(e, t, n) {
	var r, i, a = dm(t) ? Ap : jp;
	return function() {
		var o = a(this, e), s = o.on;
		s !== r && (i = (r = s).copy()).on(t, n), o.on = i;
	};
}
function pm(e, t) {
	var n = this._id;
	return arguments.length < 2 ? Mp(this.node(), n).on.on(e) : this.each(fm(n, e, t));
}
function mm(e) {
	return function() {
		var t = this.parentNode;
		for (var n in this.__transition) if (+n !== e) return;
		t && t.removeChild(this);
	};
}
function hm() {
	return this.on("end.remove", mm(this._id));
}
function gm(e) {
	var t = this._name, n = this._id;
	typeof e != "function" && (e = jl(e));
	for (var r = this._groups, i = r.length, a = Array(i), o = 0; o < i; ++o) for (var s = r[o], c = s.length, l = a[o] = Array(c), u, d, f = 0; f < c; ++f) (u = s[f]) && (d = e.call(u, u.__data__, f, s)) && ("__data__" in u && (d.__data__ = u.__data__), l[f] = d, kp(l[f], t, n, f, l, Mp(u, n)));
	return new Rm(a, this._parents, t, n);
}
function _m(e) {
	var t = this._name, n = this._id;
	typeof e != "function" && (e = Fl(e));
	for (var r = this._groups, i = r.length, a = [], o = [], s = 0; s < i; ++s) for (var c = r[s], l = c.length, u, d = 0; d < l; ++d) if (u = c[d]) {
		for (var f = e.call(u, u.__data__, d, c), p, m = Mp(u, n), h = 0, g = f.length; h < g; ++h) (p = f[h]) && kp(p, t, n, h, f, m);
		a.push(f), o.push(u);
	}
	return new Rm(a, o, t, n);
}
var vm = xd.prototype.constructor;
function ym() {
	return new vm(this._groups, this._parents);
}
function bm(e, t) {
	var n, r, i;
	return function() {
		var a = Ou(this, e), o = (this.style.removeProperty(e), Ou(this, e));
		return a === o ? null : a === n && o === r ? i : i = t(n = a, r = o);
	};
}
function xm(e) {
	return function() {
		this.style.removeProperty(e);
	};
}
function Sm(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = Ou(this, e);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function Cm(e, t, n) {
	var r, i, a;
	return function() {
		var o = Ou(this, e), s = n(this), c = s + "";
		return s ?? (c = s = (this.style.removeProperty(e), Ou(this, e))), o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s));
	};
}
function wm(e, t) {
	var n, r, i, a = "style." + t, o = "end." + a, s;
	return function() {
		var c = jp(this, e), l = c.on, u = c.value[a] == null ? s ||= xm(t) : void 0;
		(l !== n || i !== u) && (r = (n = l).copy()).on(o, i = u), c.on = r;
	};
}
function Tm(e, t, n) {
	var r = (e += "") == "transform" ? Zf : Bp;
	return t == null ? this.styleTween(e, bm(e, r)).on("end.style." + e, xm(e)) : typeof t == "function" ? this.styleTween(e, Cm(e, r, zp(this, "style." + e, t))).each(wm(this._id, e)) : this.styleTween(e, Sm(e, r, t), n).on("end.style." + e, null);
}
function Em(e, t, n) {
	return function(r) {
		this.style.setProperty(e, t.call(this, r), n);
	};
}
function Dm(e, t, n) {
	var r, i;
	function a() {
		var a = t.apply(this, arguments);
		return a !== i && (r = (i = a) && Em(e, a, n)), r;
	}
	return a._value = t, a;
}
function Om(e, t, n) {
	var r = "style." + (e += "");
	if (arguments.length < 2) return (r = this.tween(r)) && r._value;
	if (t == null) return this.tween(r, null);
	if (typeof t != "function") throw Error();
	return this.tween(r, Dm(e, t, n ?? ""));
}
function km(e) {
	return function() {
		this.textContent = e;
	};
}
function Am(e) {
	return function() {
		var t = e(this);
		this.textContent = t ?? "";
	};
}
function jm(e) {
	return this.tween("text", typeof e == "function" ? Am(zp(this, "text", e)) : km(e == null ? "" : e + ""));
}
function Mm(e) {
	return function(t) {
		this.textContent = e.call(this, t);
	};
}
function Nm(e) {
	var t, n;
	function r() {
		var r = e.apply(this, arguments);
		return r !== n && (t = (n = r) && Mm(r)), t;
	}
	return r._value = e, r;
}
function Pm(e) {
	var t = "text";
	if (arguments.length < 1) return (t = this.tween(t)) && t._value;
	if (e == null) return this.tween(t, null);
	if (typeof e != "function") throw Error();
	return this.tween(t, Nm(e));
}
function Fm() {
	for (var e = this._name, t = this._id, n = zm(), r = this._groups, i = r.length, a = 0; a < i; ++a) for (var o = r[a], s = o.length, c, l = 0; l < s; ++l) if (c = o[l]) {
		var u = Mp(c, t);
		kp(c, e, n, l, o, {
			time: u.time + u.delay + u.duration,
			delay: 0,
			duration: u.duration,
			ease: u.ease
		});
	}
	return new Rm(r, this._parents, e, n);
}
function Im() {
	var e, t, n = this, r = n._id, i = n.size();
	return new Promise(function(a, o) {
		var s = { value: o }, c = { value: function() {
			--i === 0 && a();
		} };
		n.each(function() {
			var n = jp(this, r), i = n.on;
			i !== e && (t = (e = i).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(c)), n.on = t;
		}), i === 0 && a();
	});
}
var Lm = 0;
function Rm(e, t, n, r) {
	this._groups = e, this._parents = t, this._name = n, this._id = r;
}
function zm() {
	return ++Lm;
}
var Bm = xd.prototype;
Rm.prototype = {
	constructor: Rm,
	select: gm,
	selectAll: _m,
	selectChild: Bm.selectChild,
	selectChildren: Bm.selectChildren,
	filter: lm,
	merge: um,
	selection: ym,
	transition: Fm,
	call: Bm.call,
	nodes: Bm.nodes,
	node: Bm.node,
	size: Bm.size,
	empty: Bm.empty,
	each: Bm.each,
	on: pm,
	attr: qp,
	attrTween: Qp,
	style: Tm,
	styleTween: Om,
	text: jm,
	textTween: Pm,
	remove: hm,
	tween: Rp,
	delay: tm,
	duration: im,
	ease: om,
	easeVarying: cm,
	end: Im,
	[Symbol.iterator]: Bm[Symbol.iterator]
};
function Vm(e) {
	return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Hm = {
	time: null,
	delay: 0,
	duration: 250,
	ease: Vm
};
function Um(e, t) {
	for (var n; !(n = e.__transition) || !(n = n[t]);) if (!(e = e.parentNode)) throw Error(`transition ${t} not found`);
	return n;
}
function Wm(e) {
	var t, n;
	e instanceof Rm ? (t = e._id, e = e._name) : (t = zm(), (n = Hm).time = up(), e = e == null ? null : e + "");
	for (var r = this._groups, i = r.length, a = 0; a < i; ++a) for (var o = r[a], s = o.length, c, l = 0; l < s; ++l) (c = o[l]) && kp(c, e, t, l, o, n || Um(c, t));
	return new Rm(r, this._parents, e, t);
}
xd.prototype.interrupt = Fp, xd.prototype.transition = Wm;
var Gm = Math.PI, Km = 2 * Gm, qm = 1e-6, Jm = Km - qm;
function Ym(e) {
	this._ += e[0];
	for (let t = 1, n = e.length; t < n; ++t) this._ += arguments[t] + e[t];
}
function Xm(e) {
	let t = Math.floor(e);
	if (!(t >= 0)) throw Error(`invalid digits: ${e}`);
	if (t > 15) return Ym;
	let n = 10 ** t;
	return function(e) {
		this._ += e[0];
		for (let t = 1, r = e.length; t < r; ++t) this._ += Math.round(arguments[t] * n) / n + e[t];
	};
}
var Zm = class {
	constructor(e) {
		this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "", this._append = e == null ? Ym : Xm(e);
	}
	moveTo(e, t) {
		this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +t}`;
	}
	closePath() {
		this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
	}
	lineTo(e, t) {
		this._append`L${this._x1 = +e},${this._y1 = +t}`;
	}
	quadraticCurveTo(e, t, n, r) {
		this._append`Q${+e},${+t},${this._x1 = +n},${this._y1 = +r}`;
	}
	bezierCurveTo(e, t, n, r, i, a) {
		this._append`C${+e},${+t},${+n},${+r},${this._x1 = +i},${this._y1 = +a}`;
	}
	arcTo(e, t, n, r, i) {
		if (e = +e, t = +t, n = +n, r = +r, i = +i, i < 0) throw Error(`negative radius: ${i}`);
		let a = this._x1, o = this._y1, s = n - e, c = r - t, l = a - e, u = o - t, d = l * l + u * u;
		if (this._x1 === null) this._append`M${this._x1 = e},${this._y1 = t}`;
		else if (d > qm) if (!(Math.abs(u * s - c * l) > qm) || !i) this._append`L${this._x1 = e},${this._y1 = t}`;
		else {
			let f = n - a, p = r - o, m = s * s + c * c, h = f * f + p * p, g = Math.sqrt(m), _ = Math.sqrt(d), v = i * Math.tan((Gm - Math.acos((m + d - h) / (2 * g * _))) / 2), y = v / _, b = v / g;
			Math.abs(y - 1) > qm && this._append`L${e + y * l},${t + y * u}`, this._append`A${i},${i},0,0,${+(u * f > l * p)},${this._x1 = e + b * s},${this._y1 = t + b * c}`;
		}
	}
	arc(e, t, n, r, i, a) {
		if (e = +e, t = +t, n = +n, a = !!a, n < 0) throw Error(`negative radius: ${n}`);
		let o = n * Math.cos(r), s = n * Math.sin(r), c = e + o, l = t + s, u = 1 ^ a, d = a ? r - i : i - r;
		this._x1 === null ? this._append`M${c},${l}` : (Math.abs(this._x1 - c) > qm || Math.abs(this._y1 - l) > qm) && this._append`L${c},${l}`, n && (d < 0 && (d = d % Km + Km), d > Jm ? this._append`A${n},${n},0,1,${u},${e - o},${t - s}A${n},${n},0,1,${u},${this._x1 = c},${this._y1 = l}` : d > qm && this._append`A${n},${n},0,${+(d >= Gm)},${u},${this._x1 = e + n * Math.cos(i)},${this._y1 = t + n * Math.sin(i)}`);
	}
	rect(e, t, n, r) {
		this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +t}h${n = +n}v${+r}h${-n}Z`;
	}
	toString() {
		return this._;
	}
};
function Qm(e) {
	return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function $m(e, t) {
	if ((n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e")) < 0) return null;
	var n, r = e.slice(0, n);
	return [r.length > 1 ? r[0] + r.slice(2) : r, +e.slice(n + 1)];
}
function eh(e) {
	return e = $m(Math.abs(e)), e ? e[1] : NaN;
}
function th(e, t) {
	return function(n, r) {
		for (var i = n.length, a = [], o = 0, s = e[0], c = 0; i > 0 && s > 0 && (c + s + 1 > r && (s = Math.max(1, r - c)), a.push(n.substring(i -= s, i + s)), !((c += s + 1) > r));) s = e[o = (o + 1) % e.length];
		return a.reverse().join(t);
	};
}
function nh(e) {
	return function(t) {
		return t.replace(/[0-9]/g, function(t) {
			return e[+t];
		});
	};
}
var rh = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function ih(e) {
	if (!(t = rh.exec(e))) throw Error("invalid format: " + e);
	var t;
	return new ah({
		fill: t[1],
		align: t[2],
		sign: t[3],
		symbol: t[4],
		zero: t[5],
		width: t[6],
		comma: t[7],
		precision: t[8] && t[8].slice(1),
		trim: t[9],
		type: t[10]
	});
}
ih.prototype = ah.prototype;
function ah(e) {
	this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
ah.prototype.toString = function() {
	return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function oh(e) {
	out: for (var t = e.length, n = 1, r = -1, i; n < t; ++n) switch (e[n]) {
		case ".":
			r = i = n;
			break;
		case "0":
			r === 0 && (r = n), i = n;
			break;
		default:
			if (!+e[n]) break out;
			r > 0 && (r = 0);
			break;
	}
	return r > 0 ? e.slice(0, r) + e.slice(i + 1) : e;
}
var sh;
function ch(e, t) {
	var n = $m(e, t);
	if (!n) return e + "";
	var r = n[0], i = n[1], a = i - (sh = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, o = r.length;
	return a === o ? r : a > o ? r + Array(a - o + 1).join("0") : a > 0 ? r.slice(0, a) + "." + r.slice(a) : "0." + Array(1 - a).join("0") + $m(e, Math.max(0, t + a - 1))[0];
}
function lh(e, t) {
	var n = $m(e, t);
	if (!n) return e + "";
	var r = n[0], i = n[1];
	return i < 0 ? "0." + Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + Array(i - r.length + 2).join("0");
}
var uh = {
	"%": (e, t) => (e * 100).toFixed(t),
	b: (e) => Math.round(e).toString(2),
	c: (e) => e + "",
	d: Qm,
	e: (e, t) => e.toExponential(t),
	f: (e, t) => e.toFixed(t),
	g: (e, t) => e.toPrecision(t),
	o: (e) => Math.round(e).toString(8),
	p: (e, t) => lh(e * 100, t),
	r: lh,
	s: ch,
	X: (e) => Math.round(e).toString(16).toUpperCase(),
	x: (e) => Math.round(e).toString(16)
};
function dh(e) {
	return e;
}
var fh = Array.prototype.map, ph = [
	"y",
	"z",
	"a",
	"f",
	"p",
	"n",
	"µ",
	"m",
	"",
	"k",
	"M",
	"G",
	"T",
	"P",
	"E",
	"Z",
	"Y"
];
function mh(e) {
	var t = e.grouping === void 0 || e.thousands === void 0 ? dh : th(fh.call(e.grouping, Number), e.thousands + ""), n = e.currency === void 0 ? "" : e.currency[0] + "", r = e.currency === void 0 ? "" : e.currency[1] + "", i = e.decimal === void 0 ? "." : e.decimal + "", a = e.numerals === void 0 ? dh : nh(fh.call(e.numerals, String)), o = e.percent === void 0 ? "%" : e.percent + "", s = e.minus === void 0 ? "−" : e.minus + "", c = e.nan === void 0 ? "NaN" : e.nan + "";
	function l(e) {
		e = ih(e);
		var l = e.fill, u = e.align, d = e.sign, f = e.symbol, p = e.zero, m = e.width, h = e.comma, g = e.precision, _ = e.trim, v = e.type;
		v === "n" ? (h = !0, v = "g") : uh[v] || (g === void 0 && (g = 12), _ = !0, v = "g"), (p || l === "0" && u === "=") && (p = !0, l = "0", u = "=");
		var y = f === "$" ? n : f === "#" && /[boxX]/.test(v) ? "0" + v.toLowerCase() : "", b = f === "$" ? r : /[%p]/.test(v) ? o : "", x = uh[v], S = /[defgprs%]/.test(v);
		g = g === void 0 ? 6 : /[gprs]/.test(v) ? Math.max(1, Math.min(21, g)) : Math.max(0, Math.min(20, g));
		function C(e) {
			var n = y, r = b, o, f, C;
			if (v === "c") r = x(e) + r, e = "";
			else {
				e = +e;
				var w = e < 0 || 1 / e < 0;
				if (e = isNaN(e) ? c : x(Math.abs(e), g), _ && (e = oh(e)), w && +e == 0 && d !== "+" && (w = !1), n = (w ? d === "(" ? d : s : d === "-" || d === "(" ? "" : d) + n, r = (v === "s" ? ph[8 + sh / 3] : "") + r + (w && d === "(" ? ")" : ""), S) {
					for (o = -1, f = e.length; ++o < f;) if (C = e.charCodeAt(o), 48 > C || C > 57) {
						r = (C === 46 ? i + e.slice(o + 1) : e.slice(o)) + r, e = e.slice(0, o);
						break;
					}
				}
			}
			h && !p && (e = t(e, Infinity));
			var T = n.length + e.length + r.length, E = T < m ? Array(m - T + 1).join(l) : "";
			switch (h && p && (e = t(E + e, E.length ? m - r.length : Infinity), E = ""), u) {
				case "<":
					e = n + e + r + E;
					break;
				case "=":
					e = n + E + e + r;
					break;
				case "^":
					e = E.slice(0, T = E.length >> 1) + n + e + r + E.slice(T);
					break;
				default:
					e = E + n + e + r;
					break;
			}
			return a(e);
		}
		return C.toString = function() {
			return e + "";
		}, C;
	}
	function u(e, t) {
		var n = l((e = ih(e), e.type = "f", e)), r = Math.max(-8, Math.min(8, Math.floor(eh(t) / 3))) * 3, i = 10 ** -r, a = ph[8 + r / 3];
		return function(e) {
			return n(i * e) + a;
		};
	}
	return {
		format: l,
		formatPrefix: u
	};
}
var hh, gh, _h;
vh({
	thousands: ",",
	grouping: [3],
	currency: ["$", ""]
});
function vh(e) {
	return hh = mh(e), gh = hh.format, _h = hh.formatPrefix, hh;
}
function yh(e) {
	return Math.max(0, -eh(Math.abs(e)));
}
function bh(e, t) {
	return Math.max(0, Math.max(-8, Math.min(8, Math.floor(eh(t) / 3))) * 3 - eh(Math.abs(e)));
}
function xh(e, t) {
	return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, eh(t) - eh(e)) + 1;
}
function Sh(e, t) {
	switch (arguments.length) {
		case 0: break;
		case 1:
			this.range(e);
			break;
		default:
			this.range(t).domain(e);
			break;
	}
	return this;
}
function Ch(e) {
	return function() {
		return e;
	};
}
function wh(e) {
	return +e;
}
var Th = [0, 1];
function Eh(e) {
	return e;
}
function Dh(e, t) {
	return (t -= e = +e) ? function(n) {
		return (n - e) / t;
	} : Ch(isNaN(t) ? NaN : .5);
}
function Oh(e, t) {
	var n;
	return e > t && (n = e, e = t, t = n), function(n) {
		return Math.max(e, Math.min(t, n));
	};
}
function kh(e, t, n) {
	var r = e[0], i = e[1], a = t[0], o = t[1];
	return i < r ? (r = Dh(i, r), a = n(o, a)) : (r = Dh(r, i), a = n(a, o)), function(e) {
		return a(r(e));
	};
}
function Ah(e, t, n) {
	var r = Math.min(e.length, t.length) - 1, i = Array(r), a = Array(r), o = -1;
	for (e[r] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++o < r;) i[o] = Dh(e[o], e[o + 1]), a[o] = n(t[o], t[o + 1]);
	return function(t) {
		var n = Xc(e, t, 1, r) - 1;
		return a[n](i[n](t));
	};
}
function jh(e, t) {
	return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function Mh() {
	var e = Th, t = Th, n = Hf, r, i, a, o = Eh, s, c, l;
	function u() {
		var n = Math.min(e.length, t.length);
		return o !== Eh && (o = Oh(e[0], e[n - 1])), s = n > 2 ? Ah : kh, c = l = null, d;
	}
	function d(i) {
		return i == null || isNaN(i = +i) ? a : (c ||= s(e.map(r), t, n))(r(o(i)));
	}
	return d.invert = function(n) {
		return o(i((l ||= s(t, e.map(r), Ff))(n)));
	}, d.domain = function(t) {
		return arguments.length ? (e = Array.from(t, wh), u()) : e.slice();
	}, d.range = function(e) {
		return arguments.length ? (t = Array.from(e), u()) : t.slice();
	}, d.rangeRound = function(e) {
		return t = Array.from(e), n = Uf, u();
	}, d.clamp = function(e) {
		return arguments.length ? (o = e ? !0 : Eh, u()) : o !== Eh;
	}, d.interpolate = function(e) {
		return arguments.length ? (n = e, u()) : n;
	}, d.unknown = function(e) {
		return arguments.length ? (a = e, d) : a;
	}, function(e, t) {
		return r = e, i = t, u();
	};
}
function Nh() {
	return Mh()(Eh, Eh);
}
function Ph(e, t, n, r) {
	var i = rl(e, t, n), a;
	switch (r = ih(r ?? ",f"), r.type) {
		case "s":
			var o = Math.max(Math.abs(e), Math.abs(t));
			return r.precision == null && !isNaN(a = bh(i, o)) && (r.precision = a), _h(r, o);
		case "":
		case "e":
		case "g":
		case "p":
		case "r":
			r.precision == null && !isNaN(a = xh(i, Math.max(Math.abs(e), Math.abs(t)))) && (r.precision = a - (r.type === "e"));
			break;
		case "f":
		case "%":
			r.precision == null && !isNaN(a = yh(i)) && (r.precision = a - (r.type === "%") * 2);
			break;
	}
	return gh(r);
}
function Fh(e) {
	var t = e.domain;
	return e.ticks = function(e) {
		var n = t();
		return tl(n[0], n[n.length - 1], e ?? 10);
	}, e.tickFormat = function(e, n) {
		var r = t();
		return Ph(r[0], r[r.length - 1], e ?? 10, n);
	}, e.nice = function(n) {
		n ??= 10;
		var r = t(), i = 0, a = r.length - 1, o = r[i], s = r[a], c, l, u = 10;
		for (s < o && (l = o, o = s, s = l, l = i, i = a, a = l); u-- > 0;) {
			if (l = nl(o, s, n), l === c) return r[i] = o, r[a] = s, t(r);
			if (l > 0) o = Math.floor(o / l) * l, s = Math.ceil(s / l) * l;
			else if (l < 0) o = Math.ceil(o * l) / l, s = Math.floor(s * l) / l;
			else break;
			c = l;
		}
		return e;
	}, e;
}
function Ih() {
	var e = Nh();
	return e.copy = function() {
		return jh(e, Ih());
	}, Sh.apply(e, arguments), Fh(e);
}
function Lh(e) {
	return function() {
		return e;
	};
}
function Rh(e) {
	let t = 3;
	return e.digits = function(n) {
		if (!arguments.length) return t;
		if (n == null) t = null;
		else {
			let e = Math.floor(n);
			if (!(e >= 0)) throw RangeError(`invalid digits: ${n}`);
			t = e;
		}
		return e;
	}, () => new Zm(t);
}
function zh(e) {
	return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Bh(e) {
	this._context = e;
}
Bh.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._point = 0;
	},
	lineEnd: function() {
		(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1: this._point = 2;
			default:
				this._context.lineTo(e, t);
				break;
		}
	}
};
function Vh(e) {
	return new Bh(e);
}
function Hh(e) {
	return e[0];
}
function Uh(e) {
	return e[1];
}
function Wh(e, t) {
	var n = Lh(!0), r = null, i = Vh, a = null, o = Rh(s);
	e = typeof e == "function" ? e : e === void 0 ? Hh : Lh(e), t = typeof t == "function" ? t : t === void 0 ? Uh : Lh(t);
	function s(s) {
		var c, l = (s = zh(s)).length, u, d = !1, f;
		for (r ?? (a = i(f = o())), c = 0; c <= l; ++c) !(c < l && n(u = s[c], c, s)) === d && ((d = !d) ? a.lineStart() : a.lineEnd()), d && a.point(+e(u, c, s), +t(u, c, s));
		if (f) return a = null, f + "" || null;
	}
	return s.x = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : Lh(+t), s) : e;
	}, s.y = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : Lh(+e), s) : t;
	}, s.defined = function(e) {
		return arguments.length ? (n = typeof e == "function" ? e : Lh(!!e), s) : n;
	}, s.curve = function(e) {
		return arguments.length ? (i = e, r != null && (a = i(r)), s) : i;
	}, s.context = function(e) {
		return arguments.length ? (e == null ? r = a = null : a = i(r = e), s) : r;
	}, s;
}
function Gh(e, t, n) {
	this.k = e, this.x = t, this.y = n;
}
Gh.prototype = {
	constructor: Gh,
	scale: function(e) {
		return e === 1 ? this : new Gh(this.k * e, this.x, this.y);
	},
	translate: function(e, t) {
		return e === 0 & t === 0 ? this : new Gh(this.k, this.x + this.k * e, this.y + this.k * t);
	},
	apply: function(e) {
		return [e[0] * this.k + this.x, e[1] * this.k + this.y];
	},
	applyX: function(e) {
		return e * this.k + this.x;
	},
	applyY: function(e) {
		return e * this.k + this.y;
	},
	invert: function(e) {
		return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
	},
	invertX: function(e) {
		return (e - this.x) / this.k;
	},
	invertY: function(e) {
		return (e - this.y) / this.k;
	},
	rescaleX: function(e) {
		return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
	},
	rescaleY: function(e) {
		return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
	},
	toString: function() {
		return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
	}
}, new Gh(1, 0, 0), Gh.prototype;
var Kh;
(function(e) {
	e.Monomer = "monomer", e.Preset = "preset", e.Bond = "bond", e.AmbiguousMonomer = "ambiguousMonomer";
})(Kh ||= {});
var qh;
(function(e) {
	e.Library = "library", e.ChainStart = "chainStart", e.ChainMiddle = "chainMiddle", e.ChainEnd = "chainEnd";
})(qh ||= {});
var Jh = "select-submenu";
function Yh(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Xh(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Yh(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Yh(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var Zh;
(function(e) {
	e.nanoMol = "nM", e.microMol = "μM", e.milliMol = "mM";
})(Zh ||= {});
var Qh = M(M(M({}, Zh.nanoMol, 10 ** 9), Zh.microMol, 10 ** 6), Zh.milliMol, 10 ** 3), $h = Ic({
	name: "editor",
	initialState: {
		ketcherId: "",
		isReady: null,
		activeTool: "select",
		editor: void 0,
		editorLayoutMode: void 0,
		editorLineLength: se.editorLineLength,
		preview: {
			type: Kh.Monomer,
			monomer: void 0,
			style: {}
		},
		position: void 0,
		isContextMenuActive: !1,
		isMacromoleculesPropertiesWindowOpened: !1,
		macromoleculesProperties: void 0,
		unipositiveIonsMeasurementUnit: Zh.milliMol,
		oligonucleotidesMeasurementUnit: Zh.microMol,
		unipositiveIonsValue: 140,
		oligonucleotidesValue: 200,
		app: {
			buildDate: "2026-06-10T09:31:40",
			indigoVersion: {}.INDIGO_VERSION || "",
			indigoMachine: {}.INDIGO_MACHINE || "",
			version: "3.14.0"
		},
		selectedMenuGroupItems: {}
	},
	reducers: {
		init: function(e) {
			e.isReady = !1;
		},
		initKetcherId: function(e, t) {
			e.ketcherId = t.payload;
		},
		initSuccess: function(e) {
			e.isReady = !0;
		},
		initFailure: function(e) {
			e.isReady = !1;
		},
		selectTool: function(e, t) {
			e.activeTool = t.payload;
		},
		setPosition: function(e, t) {
			e.position = t.payload;
		},
		createEditor: function(e, t) {
			var n, r, i = new Dt({
				theme: t.payload.theme,
				canvas: t.payload.canvas
			});
			i.initializeMonomersLibraryFromKetcher(t.payload.monomersLibraryUpdate, t.payload.monomersLibraryReplace), e.editor = i, (n = (r = t.payload).onInit) == null || n.call(r, i);
		},
		destroyEditor: function(e) {
			var t;
			e.editorLayoutMode = e.editor?.mode.modeName, (t = e.editor) == null || t.destroy(), e.editor = void 0;
		},
		showPreview: function(e, t) {
			e.preview = t.payload || {
				monomer: void 0,
				style: ""
			};
		},
		setContextMenuActive: function(e, t) {
			e.isContextMenuActive = t.payload;
		},
		setMacromoleculesPropertiesWindowVisibility: function(e, t) {
			e.isMacromoleculesPropertiesWindowOpened = t.payload;
		},
		toggleMacromoleculesPropertiesWindowVisibility: function(e) {
			e.isMacromoleculesPropertiesWindowOpened = !e.isMacromoleculesPropertiesWindowOpened;
		},
		setMacromoleculesProperties: function(e, t) {
			e.macromoleculesProperties = t.payload;
		},
		setUnipositiveIonsMeasurementUnit: function(e, t) {
			e.unipositiveIonsMeasurementUnit = t.payload;
		},
		setOligonucleotidesMeasurementUnit: function(e, t) {
			e.oligonucleotidesMeasurementUnit = t.payload;
		},
		setEditorLineLength: function(e, t) {
			e.editorLineLength = Xh(Xh({}, e.editorLineLength), t.payload);
		},
		setUnipositiveIonsValue: function(e, t) {
			e.unipositiveIonsValue = t.payload;
		},
		setOligonucleotidesValue: function(e, t) {
			e.oligonucleotidesValue = t.payload;
		},
		setAppMeta: function(e, t) {
			e.app = t.payload;
		},
		setSelectedMenuGroupItem: function(e, t) {
			e.selectedMenuGroupItems = Xh(Xh({}, e.selectedMenuGroupItems), {}, M({}, t.payload.groupName, t.payload.activeItemName));
		}
	}
}), U = $h.actions;
U.init, U.initSuccess, U.initFailure;
var eg = U.initKetcherId, tg = U.selectTool;
U.setPosition;
var ng = U.createEditor, rg = U.destroyEditor, ig = U.showPreview, ag = U.setContextMenuActive, og = U.setMacromoleculesPropertiesWindowVisibility, sg = U.toggleMacromoleculesPropertiesWindowVisibility, cg = U.setMacromoleculesProperties, lg = U.setUnipositiveIonsMeasurementUnit, ug = U.setOligonucleotidesMeasurementUnit, dg = U.setEditorLineLength, fg = U.setUnipositiveIonsValue, pg = U.setOligonucleotidesValue, mg = U.setAppMeta, hg = U.setSelectedMenuGroupItem, gg = function(e) {
	return e.editor.preview;
}, _g = function(e) {
	return e.editor.activeTool;
}, vg = function(e) {
	return e.editor.ketcherId;
}, W = function(e) {
	return e.editor.editor;
}, yg = function(e) {
	return e.editor.editor?.isSequenceEditInRNABuilderMode;
}, bg = function(e) {
	return e.editor.editor?.isSequenceMode;
}, xg = function(e) {
	return e.editor.editorLayoutMode;
}, Sg = function(e) {
	return e.editor.editor?.isHandToolSelected;
}, Cg = function(e) {
	var t;
	return (t = e.editor.editor) == null || (t = t.drawingEntitiesManager) == null ? void 0 : t.hasAntisenseChains;
}, wg = function(e) {
	return e.editor.isContextMenuActive;
}, Tg = function(e) {
	return e.editor.isMacromoleculesPropertiesWindowOpened;
}, Eg = function(e) {
	return e.editor.macromoleculesProperties;
}, Dg = function(e) {
	return e.editor.unipositiveIonsMeasurementUnit;
}, Og = function(e) {
	return e.editor.oligonucleotidesMeasurementUnit;
}, kg = function(e) {
	return e.editor.unipositiveIonsValue;
}, Ag = function(e) {
	return e.editor.oligonucleotidesValue;
}, jg = function(e) {
	return e.editor.editorLineLength;
}, Mg = function(e) {
	return e.editor.app;
}, Ng = function(e) {
	return function(t) {
		return t.editor.selectedMenuGroupItems[e];
	};
}, Pg = function(e) {
	return e.editor.selectedMenuGroupItems[Jh] || "select-rectangle";
}, Fg = $h.reducer, Ig = "FAVORITES", Lg = "PEPTIDE", Rg = {
	PEPTIDE: "PEPTIDE",
	CHEM: "CHEM",
	RNA: "RNA"
}, G;
(function(e) {
	e.SUGARS = "Sugars", e.BASES = "Bases", e.PHOSPHATES = "Phosphates", e.PEPTIDES = "Amino Acids", e.NUCLEOTIDES = "Nucleotides";
})(G ||= {});
var zg;
(function(e) {
	e.R = "R", e.A = "A", e.C = "C", e.G = "G", e.T = "T", e.U = "U", e.X = "X", e.P = "P";
})(zg ||= {}), G.SUGARS, G.BASES, G.BASES, G.BASES, G.BASES, G.BASES, G.BASES, G.PHOSPHATES;
var Bg = "favoriteItemsUniqueKeys", Vg = "ketcher_custom_presets", Hg = "Z", Ug = "No natural analogue", Wg = "thymine", Gg = "uracil", Kg = {
	FAVORITES: 0,
	PEPTIDES: 1,
	RNA: 2,
	CHEM: 3
}, qg = "★", Jg = new (function() {
	function e() {
		N(this, e), this.localStorage = window.localStorage;
	}
	return me(e, [
		{
			key: "getItem",
			value: function(e) {
				var t = this.localStorage.getItem(e);
				return t ? JSON.parse(t) : null;
			}
		},
		{
			key: "setItem",
			value: function(e, t) {
				this.localStorage.setItem(e, JSON.stringify(t));
			}
		},
		{
			key: "removeItem",
			value: function(e) {
				this.localStorage.removeItem(e);
			}
		}
	]), e;
}())();
function Yg(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Xg(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Yg(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Yg(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var Zg = M(M({}, he.PEPTIDES, S.AminoAcid), he.BASES, S.Base), Qg = {
	monomers: [],
	defaultRnaPresets: [],
	favorites: {},
	searchFilter: "",
	selectedTabIndex: Kg.RNA
};
function $g(e) {
	return bn(e) ? e.id || e.label : `${e.props.MonomerName}___${e.props?.Name}`;
}
function e_(e) {
	return `${e.name}_${e.base?.label || "."}_${e.sugar?.label || "."}_${e.phosphate?.label || "."}`;
}
var t_ = Ic({
	name: "library",
	initialState: Qg,
	reducers: {
		loadMonomerLibrary: function(e, t) {
			e.monomers = t.payload.map(function(e) {
				return Xg(Xg({}, e), {}, { props: Xg({}, e.props) });
			});
		},
		loadDefaultPresets: function(e, t) {
			e.defaultRnaPresets = t.payload.map(function(e) {
				return Xg({}, e);
			});
		},
		setFavoriteMonomersFromLocalStorage: function(e) {
			var t = {}, n = Jg.getItem(Bg);
			!n || !Array.isArray(n) || (e.monomers.forEach(function(e) {
				var r = $g(e);
				n.find(function(e) {
					return e === r;
				}) && (t[r] = Xg(Xg({}, e), {}, { favorite: !0 }));
			}), e.favorites = t);
		},
		clearFavorites: function(e) {
			e.favorites = {};
		},
		toggleMonomerFavorites: function(e, t) {
			var n = $g(t.payload), r = Jg.getItem(Bg) || [];
			e.favorites[n] ? (delete e.favorites[n], Jg.setItem(Bg, r.filter(function(e) {
				return e !== n;
			}))) : (e.favorites[n] = Xg(Xg({}, t.payload), {}, { favorite: !0 }), r.push(n), Jg.setItem(Bg, r));
		},
		setSearchFilter: function(e, t) {
			e.searchFilter = t.payload;
		},
		setSelectedTabIndex: function(e, t) {
			e.selectedTabIndex = t.payload;
		}
	}
}), n_ = t_.actions, r_ = n_.loadMonomerLibrary, i_ = n_.loadDefaultPresets, a_ = n_.setFavoriteMonomersFromLocalStorage;
n_.clearFavorites;
var o_ = n_.toggleMonomerFavorites, s_ = n_.setSearchFilter, c_ = n_.setSelectedTabIndex, l_ = function(e) {
	return e.library.searchFilter;
}, u_ = function(e, t) {
	return e.filter(function(e) {
		return !e.isAmbiguous && e.props?.MonomerType === t;
	});
}, d_ = function(e, t) {
	var n = e.filter(function(e) {
		if (!bn(e)) return !1;
		var n = new mn(e, void 0, !1);
		return Zg[t] === n.monomerClass;
	});
	if (n.length === 0) return [];
	var r = [];
	t === he.BASES ? r = [
		{
			groupTitle: "Ambiguous Bases",
			groupItems: n.filter(function(e) {
				return bn(e) && e.options.every(function(e) {
					return !e.templateId.toLowerCase().includes(Wg) && !e.templateId.toLowerCase().includes(Gg);
				});
			})
		},
		{
			groupTitle: "Ambiguous DNA Bases",
			groupItems: n.filter(function(e) {
				return bn(e) && e.options.find(function(e) {
					return e.templateId.toLowerCase().includes(Wg);
				});
			})
		},
		{
			groupTitle: "Ambiguous RNA Bases",
			groupItems: n.filter(function(e) {
				return bn(e) && e.options.find(function(e) {
					return e.templateId.toLowerCase().includes(Gg);
				});
			})
		}
	] : r.push({
		groupTitle: `Ambiguous ${t}`,
		groupItems: n
	});
	var i = ["X", "N"];
	return r.forEach(function(e) {
		e.groupItems.sort(function(e, t) {
			return e.label.localeCompare(t.label);
		}), e.groupItems.sort(function(e) {
			return i.includes(e.label) ? -1 : 1;
		});
	}), r;
}, f_ = function(e) {
	return e.filter(function(e) {
		return !e.isAmbiguous && (e.props?.MonomerClass === S.RNA || e.props?.MonomerClass === S.DNA);
	});
}, p_ = function(e) {
	return e.filter(function(e) {
		return e.favorite && !e.isAmbiguous;
	});
}, m_ = function(e) {
	var t = [];
	for (var n in he) {
		var r = d_(e, he[n]);
		t = [].concat(w(t), w(r));
	}
	return t.forEach(function(e) {
		e.groupItems = e.groupItems.filter(function(e) {
			return e.favorite;
		});
	}), t.filter(function(e) {
		return e.groupItems.length;
	});
}, h_ = Dn(function(e) {
	return e.library;
}, function(e) {
	var t = e.searchFilter, n = e.monomers, r = e.favorites, i = t.toLowerCase(), a = function(e, t) {
		var n, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "", i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "", a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : "", o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : "", s = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : [], c = r.toLowerCase(), l = i.toLowerCase(), u = e == null || (n = e.base) == null ? void 0 : n.toLowerCase(), d = e != null && e.modifications ? Object.values(e.modifications).map(function(e) {
			return e.toLowerCase();
		}).join(" ") : "", f = a?.toLowerCase() ?? "", p = o?.toLowerCase() ?? "", m = s && s.length > 0 ? s.map(function(e) {
			return e.toLowerCase();
		}).join(" ") : "";
		if (t === "/") return !!(u || d);
		if (t.includes("/")) {
			var h = t.split("/");
			if (h.length > 3 || h.length === 3 && h[2] !== "") return !1;
			if (h.length === 3 && h[1] !== "") {
				var g = h[1], _ = u?.length === g.length && Array.from(u).every(function(e, t) {
					return e === g[t];
				}), v = d ? d.split(" ").some(function(e) {
					return e.length === g.length && Array.from(e).every(function(e, t) {
						return e === g[t];
					});
				}) : !1;
				return _ || v;
			}
			var y = h[0], b = h[1];
			if (t.startsWith("/") && t.length > 1) {
				var x = t.slice(1);
				return u?.startsWith(x) || d?.split(" ").some(function(e) {
					return e.startsWith(x);
				});
			}
			if (t.endsWith("/") && t.length > 1) {
				var S = t.slice(0, -1);
				return u?.endsWith(S) || d && d.split(" ").some(function(e) {
					return e.endsWith(S);
				});
			}
			var C = u?.startsWith(b) && u?.endsWith(y), w = d ? d.split(" ").some(function(e) {
				return e.startsWith(b) && e.endsWith(y);
			}) : !1;
			return C || w;
		}
		var T = u ? u.includes(t) : !1, E = d ? d.includes(t) : !1, D = f ? f.includes(t) : !1, O = p ? p.includes(t) : !1, k = m ? m.includes(t) : !1;
		return c.includes(t) || l.includes(t) || T || E || D || O || k;
	};
	return n.filter(function(e) {
		var t;
		if (!e.isAmbiguous && (t = e.props) != null && t.hidden) return !1;
		if (e.isAmbiguous) {
			var n = e.label, r = e.id, o = e.idtAliases, s = e.monomers;
			return a(o, i, n, r) || s.some(function(e) {
				var t = e.monomerItem.props, n = t.Name, r = t.MonomerName, o = t.idtAliases, s = t.aliasHELM, c = t.aliasAxoLabs, l = t.modificationTypes;
				return a(o, i, n, r, s, c, l);
			});
		} else {
			var c = e.props, l = c.Name, u = c.MonomerName, d = c.idtAliases, f = c.aliasHELM, p = c.aliasAxoLabs, m = c.modificationTypes;
			return a(d, i, l, u, f, p, m);
		}
	}).map(function(e) {
		return Xg(Xg({}, e), {}, { favorite: !!r[$g(e)] });
	});
}), g_ = function(e) {
	var t = e.reduce(function(e, t) {
		var n = t.props.MonomerNaturalAnalogCode || Hg;
		return e[n] || (e[n] = []), e[n].push(Xg(Xg({}, t), {}, { label: t.props.MonomerName })), e;
	}, {}), n = Object.entries(t).reduce(function(e, t) {
		var n = I(t, 2), r = n[0], i = n[1], a = w(i);
		a.sort(function(e, t) {
			return e.label.localeCompare(t.label);
		});
		var o = a.findIndex(function(e) {
			return e.label === r;
		});
		if (o !== -1) {
			var s = a.splice(o, 1);
			a.unshift(s[0]);
		}
		return e[r] = a, e;
	}, {}), r = [], i = Object.keys(n);
	return i.sort(function(e, t) {
		return e.localeCompare(t);
	}), i.reduce(function(e, t) {
		var r = {
			groupTitle: t === Hg ? Ug : t,
			groupItems: []
		};
		return n[t].forEach(function(e) {
			r.groupItems.push(Xg(Xg({}, e), {}, { props: Xg({}, e.props) }));
		}), r.groupItems.length && e.push(r), e;
	}, r);
}, __ = function(e) {
	return e.library.selectedTabIndex;
}, v_ = t_.reducer, y_ = function(e) {
	return e.library.defaultRnaPresets;
}, b_ = Ic({
	name: "modal",
	initialState: {
		name: null,
		isOpen: !1,
		additionalProps: null,
		errorTooltipText: "",
		errorModalText: "",
		errorModalTitle: ""
	},
	reducers: {
		openModal: function(e, t) {
			typeof t.payload == "string" ? e.name = t.payload : (e.name = t.payload.name, e.additionalProps = t.payload.additionalProps), e.isOpen = !0;
		},
		closeModal: function(e) {
			e.name = null, e.isOpen = !1, e.additionalProps = null;
		},
		openErrorTooltip: function(e, t) {
			e.errorTooltipText = t.payload;
		},
		closeErrorTooltip: function(e) {
			e.errorTooltipText = "";
		},
		openErrorModal: function(e, t) {
			if (typeof t.payload == "string") e.errorModalText = t.payload;
			else {
				var n = t.payload, r = n.errorMessage, i = n.errorTitle;
				e.errorModalText = r, e.errorModalTitle = i;
			}
		},
		closeErrorModal: function(e) {
			e.errorModalText = "";
		}
	}
}), x_ = b_.actions, S_ = x_.openModal, C_ = x_.closeModal, w_ = x_.openErrorTooltip, T_ = x_.closeErrorTooltip, E_ = x_.openErrorModal, D_ = x_.closeErrorModal, O_ = function(e) {
	return e.modal.name;
}, k_ = function(e) {
	return e.modal.isOpen;
}, A_ = function(e) {
	return e.modal.additionalProps;
}, j_ = function(e) {
	return e.modal.errorTooltipText;
}, M_ = function(e) {
	return e.modal.errorModalText;
}, N_ = function(e) {
	return e.modal.errorModalTitle;
}, P_ = b_.reducer;
function F_(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function I_(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? F_(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : F_(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var L_ = function() {
	return Jg.getItem(Vg);
}, R_ = function(e) {
	return L_()?.findIndex(function(t) {
		return t.name === e;
	}) ?? -1;
}, z_ = function(e) {
	var t = I_({}, e), n = L_() || [], r = R_(t.nameInList);
	t.nameInList = t.name, r > -1 ? (n.splice(r, 1, t), Jg.setItem(Vg, n)) : Jg.setItem(Vg, [].concat(w(n), [t]));
}, B_ = function(e) {
	if (e) {
		var t = L_(), n = R_(e);
		t && (t.splice(n, 1), t.length ? Jg.setItem(Vg, t) : Jg.removeItem(Vg));
	}
}, V_ = function(e) {
	if (e) {
		var t = L_(), n = R_(e);
		t && n > -1 && (t[n].favorite = !t[n].favorite, Jg.setItem(Vg, t));
	}
}, H_ = function(e) {
	var t = [
		"sugar",
		"base",
		"phosphate"
	], n = (0, es.default)(e, t);
	n.templates = [];
	for (var r = 0, i = t; r < i.length; r++) {
		var a, o = e[i[r]], s = (o == null || (a = o.props) == null ? void 0 : a.id) || o?.id;
		s && n.templates.push({ $ref: o.isAmbiguous ? x(s) : v(s) });
	}
	return n;
}, U_ = function(e, t) {
	var n, r, i = [], a = [], o = [];
	return !t || !(e != null && e.sugar) && !(e != null && e.phosphate) && !(e != null && e.base) ? {
		sugarValidations: i,
		phosphateValidations: a,
		baseValidations: o
	} : (e != null && e.phosphate && i.push("R2"), e != null && e.base && i.push("R3"), o.push("R1"), e != null && (n = e.sugar) != null && (n = n.props) != null && n.MonomerCaps && !("R3" in e.sugar.props.MonomerCaps) && o.push("DISABLED"), a.push("R1"), e != null && (r = e.sugar) != null && (r = r.props) != null && r.MonomerCaps && !("R2" in e.sugar.props.MonomerCaps) && a.push("DISABLED"), {
		sugarValidations: i,
		phosphateValidations: a,
		baseValidations: o
	});
};
function W_(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function G_(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? W_(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : W_(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var K_;
(function(e) {
	e.Presets = "Presets";
})(K_ ||= {});
var q_ = {
	activePreset: null,
	sequenceSelection: void 0,
	sequenceSelectionName: void 0,
	isSequenceFirstsOnlyNucleoelementsSelected: void 0,
	activePresetMonomerGroup: null,
	groupItemValidations: M(M(M({}, G.BASES, []), G.SUGARS, []), G.PHOSPHATES, []),
	presetsDefault: [],
	presetsCustom: [],
	activeRnaBuilderItem: null,
	activeMonomerKey: null,
	isEditMode: !1,
	uniqueNameError: "",
	invalidPresetError: "",
	activePresetForContextMenu: null
}, J_ = M(M(M({}, G.BASES, "base"), G.SUGARS, "sugar"), G.PHOSPHATES, "phosphate"), Y_ = Ic({
	name: "rna-builder",
	initialState: q_,
	reducers: {
		createNewPreset: function(e) {
			e.activePreset = {
				base: void 0,
				sugar: void 0,
				phosphate: void 0,
				name: "",
				nameInList: ""
			};
		},
		setActivePreset: function(e, t) {
			e.activePreset = G_(G_({}, t.payload), {}, { nameInList: t.payload.name });
		},
		setSequenceSelection: function(e, t) {
			e.sequenceSelection = w(t.payload);
		},
		setSequenceSelectionName: function(e, t) {
			e.sequenceSelectionName = t.payload;
		},
		setIsSequenceFirstsOnlyNucleoelementsSelected: function(e, t) {
			e.isSequenceFirstsOnlyNucleoelementsSelected = t.payload;
		},
		setActivePresetForContextMenu: function(e, t) {
			e.activePresetForContextMenu = t.payload;
		},
		setActivePresetName: function(e, t) {
			e.activePreset.name = t.payload;
		},
		setActiveRnaBuilderItem: function(e, t) {
			e.activeRnaBuilderItem = t.payload;
		},
		recalculateRnaBuilderValidations: function(e, t) {
			var n = U_(t.payload.rnaPreset, t.payload.isEditMode), r = n.sugarValidations, i = n.phosphateValidations, a = n.baseValidations;
			e.groupItemValidations[G.SUGARS] = r, e.groupItemValidations[G.BASES] = a, e.groupItemValidations[G.PHOSPHATES] = i;
		},
		setActivePresetMonomerGroup: function(e, t) {
			e.activePresetMonomerGroup = t.payload;
		},
		savePreset: function(e, t) {
			var n = t.payload, r = G_({}, n);
			if (z_(H_(r)), r.nameInList) {
				var i = e.presetsCustom.findIndex(function(e) {
					return e.name === r.nameInList;
				});
				r.nameInList = r.name, i === -1 ? e.presetsCustom.push(r) : e.presetsCustom.splice(i, 1, r);
			} else e.presetsCustom.push(r);
			e.activePreset && (e.activePreset.nameInList = r.name);
		},
		deletePreset: function(e, t) {
			var n = t.payload;
			B_(n.name);
			var r = e.presetsCustom.findIndex(function(e) {
				return e.name === n.name;
			});
			e.presetsCustom.splice(r, 1), n.nameInList && (e.activePreset = null);
		},
		setIsEditMode: function(e, t) {
			e.isEditMode = t.payload;
		},
		setUniqueNameError: function(e, t) {
			e.uniqueNameError = t.payload;
		},
		setInvalidPresetError: function(e, t) {
			e.invalidPresetError = t.payload;
		},
		setDefaultPresets: function(e, t) {
			var n = t.payload[0];
			n && (e.presetsDefault.find(function(e) {
				return e.name === n.name;
			}) || (e.presetsDefault = t.payload));
		},
		setCustomPresets: function(e, t) {
			e.presetsCustom = t.payload;
		},
		setFavoritePresetsFromLocalStorage: function(e) {
			var t = Jg.getItem(Bg);
			!t || !Array.isArray(t) || (e.presetsDefault = e.presetsDefault.map(function(e) {
				var n = `${e.name}_${Pt.RNA}`;
				return t.find(function(e) {
					return e === n;
				}) ? G_(G_({}, e), {}, { favorite: !0 }) : e;
			}));
		},
		clearFavorites: function(e) {
			e.presetsDefault = [];
		},
		setActiveMonomerKey: function(e, t) {
			e.activeMonomerKey = t.payload;
		},
		togglePresetFavorites: function(e, t) {
			var n = e.presetsDefault.findIndex(function(e) {
				return e.name === t.payload.name;
			}), r = e.presetsCustom.findIndex(function(e) {
				return e.name === t.payload.name;
			});
			if (n >= 0) {
				var i = e.presetsDefault[n].favorite;
				e.presetsDefault[n].favorite = !i;
			} else if (r >= 0) {
				V_(e.presetsCustom[r].name);
				var a = e.presetsCustom[r].favorite;
				e.presetsCustom[r].favorite = !a;
				return;
			}
			var o = `${t.payload.name}_${Pt.RNA}`, s = Jg.getItem(Bg) || [];
			s.some(function(e) {
				return e === o;
			}) ? Jg.setItem(Bg, s.filter(function(e) {
				return e !== o;
			})) : (s.push(o), Jg.setItem(Bg, s));
		}
	}
}), X_ = function(e) {
	return e.rnaBuilder;
}, Z_ = function(e) {
	return e.rnaBuilder.activeRnaBuilderItem;
}, Q_ = function(e) {
	return e.rnaBuilder.groupItemValidations;
}, $_ = function(e) {
	return e.rnaBuilder.activePreset;
}, ev = function(e) {
	return e.rnaBuilder.sequenceSelection;
}, tv = function(e) {
	return e.rnaBuilder.sequenceSelectionName;
}, nv = function(e) {
	return e.rnaBuilder.isSequenceFirstsOnlyNucleoelementsSelected;
}, rv = function(e, t) {
	if (!(!J_[t] || !e)) return e[J_[t]];
}, iv = function(e) {
	return e.rnaBuilder.activePresetMonomerGroup;
}, av = function(e) {
	return !!(e.name && e.sugar && (e.base || e.phosphate));
}, ov = function(e) {
	return e.rnaBuilder.isEditMode;
}, sv = function(e) {
	if (!e) return "";
	var t = e.sugar?.label || e.sugar?.props.MonomerName || "", n = e.base?.label || e.base?.props.MonomerName || "", r = e.phosphate?.label || e.phosphate?.props.MonomerName || "", i = t;
	return t && r || (t || r) && n ? i += `(${n})` : i += n, i += r, i;
}, cv = function(e) {
	return e.rnaBuilder.uniqueNameError;
}, lv = function(e) {
	return e.rnaBuilder.invalidPresetError;
}, uv = function(e) {
	var t = e.rnaBuilder.activePreset;
	return t && !t.nameInList && !t.name && !t.sugar && !t.base && !t.phosphate;
}, dv = function(e) {
	return e.rnaBuilder.activePresetForContextMenu;
}, fv = function(e) {
	return e.filter(function(e) {
		return e.favorite;
	});
}, pv = function(e) {
	return e.rnaBuilder.activeMonomerKey;
}, mv = Dn(X_, function(e) {
	var t = e.presetsDefault, n = t === void 0 ? [] : t, r = e.presetsCustom, i = r === void 0 ? [] : r;
	return [].concat(w(n), w(i));
}), hv = Dn(mv, l_, function(e, t) {
	var n = t.toLowerCase();
	return e.filter(function(e) {
		var t, r, i, a, o, s = e.name?.toLowerCase(), c = (t = e.sugar) == null || (t = t.label) == null ? void 0 : t.toLowerCase(), l = (r = e.phosphate) == null || (r = r.label) == null ? void 0 : r.toLowerCase(), u = (i = e.base) == null || (i = i.label) == null ? void 0 : i.toLowerCase(), d = (a = e.idtAliases) == null || (a = a.base) == null ? void 0 : a.toLowerCase(), f = e.idtAliases?.modifications, p = d;
		if (d && (o = e.name) != null && o.includes("MOE")) {
			var m = d;
			p = `${f?.endpoint5 ?? `5${m}`}, ${f?.internal ?? `i${m}`}`;
		}
		var h = (n.match(/\//g) || []).length, g = n.split("/");
		if (h >= 2 && g[2] !== void 0 && g[2] !== "") return !1;
		if (n.startsWith("/") && n.length > 1) {
			var _ = n.slice(1);
			return p?.toLowerCase().startsWith(_) || d?.startsWith(_) || f && Object.values(f).some(function(e) {
				return e?.toLowerCase().startsWith(_);
			});
		}
		if (n.endsWith("/") && n.length > 1) {
			var v = n.slice(0, -1), y = n[n.length - 2];
			return p?.toLowerCase().endsWith(v) && p[p.length - 1] === y || d?.endsWith(v) && d[d.length - 1] === y || f && Object.values(f).some(function(e) {
				return e?.toLowerCase().endsWith(v) && e[e.length - 1] === y;
			});
		}
		return n === "/" ? !!e.idtAliases : s?.includes(n) || c?.includes(n) || l?.includes(n) || u?.includes(n) || p?.toLowerCase().includes(n);
	});
}), K = Y_.actions, gv = K.setActivePreset, _v = K.setSequenceSelection, vv = K.setSequenceSelectionName, yv = K.setIsSequenceFirstsOnlyNucleoelementsSelected;
K.setActivePresetName;
var bv = K.setActiveRnaBuilderItem, xv = K.setActiveMonomerKey, Sv = K.recalculateRnaBuilderValidations, Cv = K.setActivePresetMonomerGroup, wv = K.savePreset, Tv = K.deletePreset, Ev = K.createNewPreset, Dv = K.setIsEditMode, Ov = K.setUniqueNameError, kv = K.setInvalidPresetError, Av = K.setDefaultPresets, jv = K.setCustomPresets, Mv = K.setActivePresetForContextMenu, Nv = K.togglePresetFavorites, Pv = K.setFavoritePresetsFromLocalStorage, Fv = K.clearFavorites, Iv = Y_.reducer;
function Lv() {
	var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
	return Oc({
		reducer: {
			editor: Fg,
			modal: P_,
			library: v_,
			rnaBuilder: Iv
		},
		middleware: function(e) {
			return e({ serializableCheck: !1 });
		},
		preloadedState: e
	});
}
var Rv = Lv(), q = {
	colorA: {
		regular: "#5ADC11",
		hover: "#4FC218"
	},
	colorCM: {
		regular: "#59D0FF",
		hover: "#3CB9EB"
	},
	colorDQ: {
		regular: "#AD4551",
		hover: "#AB0014"
	},
	colorEN: {
		regular: "#93F5F5",
		hover: "#00F0F0"
	},
	colorFY: {
		regular: "#5656BF",
		hover: "#2626BF"
	},
	colorGX: {
		regular: "#FFE97B",
		hover: "#F8DC50"
	},
	colorH: {
		regular: "#BFC9FF",
		hover: "#99AAFF"
	},
	colorILV: {
		regular: "#50E576",
		hover: "#00D936"
	},
	colorKR: {
		regular: "#365CFF",
		hover: "#002CEB"
	},
	colorP: {
		regular: "#F2C5B6",
		hover: "#FFA98C"
	},
	colorST: {
		regular: "#FF8D8D",
		hover: "#ED6868"
	},
	colorW: {
		regular: "#99458B",
		hover: "#7F006B"
	},
	colorU: {
		regular: "#FF973C",
		hover: "#2EE55D"
	},
	colorX: {
		regular: "#CAD3DD",
		hover: "#B8BBCC"
	},
	chem: {
		regular: "#333333",
		hover: "#555555"
	},
	default: {
		regular: "#CCCBD6",
		hover: "#B8BBCC"
	}
}, J = {
	D: {
		regular: "#FF8C69",
		hover: "#0097A8"
	},
	E: {
		regular: "#DC143C",
		hover: "#0097A8"
	},
	K: {
		regular: "#B0E0E6",
		hover: "#0097A8"
	},
	H: {
		regular: "#007FFF",
		hover: "#0097A8"
	},
	O: {
		regular: "#2A52BE",
		hover: "#0097A8"
	},
	R: {
		regular: "#0A12FF",
		hover: "#0097A8"
	},
	Q: {
		regular: "#EDB4ED",
		hover: "#0097A8"
	},
	Y: {
		regular: "#D65CBC",
		hover: "#0097A8"
	},
	U: {
		regular: "#CA7DE3",
		hover: "#0097A8"
	},
	S: {
		regular: "#9966CC",
		hover: "#0097A8"
	},
	C: {
		regular: "#BF00FF",
		hover: "#0097A8"
	},
	N: {
		regular: "#800080",
		hover: "#0097A8"
	},
	T: {
		regular: "#FF00FF",
		hover: "#0097A8"
	},
	L: {
		regular: "#7FFF00",
		hover: "#0097A8"
	},
	I: {
		regular: "#4CBB17",
		hover: "#0097A8"
	},
	F: {
		regular: "#008A00",
		hover: "#0097A8"
	},
	A: {
		regular: "#008080",
		hover: "#0097A8"
	},
	W: {
		regular: "#50E576",
		hover: "#0097A8"
	},
	P: {
		regular: "#D2D900",
		hover: "#0097A8"
	},
	G: {
		regular: "#BDB76B",
		hover: "#0097A8"
	},
	M: {
		regular: "#FFF600",
		hover: "#0097A8"
	},
	V: {
		regular: "#FFD700",
		hover: "#0097A8"
	}
}, zv = {
	color: {
		background: {
			canvas: "#F5F5F5",
			primary: "#FFFFFF",
			secondary: "#F8FEFF",
			overlay: "rgba(94,94,94,.8)"
		},
		border: {
			primary: "#CAD3DD",
			secondary: "#7C7C7F"
		},
		text: {
			primary: "#333333",
			secondary: "#167782",
			light: "#585858",
			dark: "#000000",
			error: "#FF4A4A",
			lightgrey: "#7C7C7F"
		},
		tab: {
			regular: "#FFFFFF",
			active: "#E1E5EA",
			hover: "#00838F",
			content: "#EFF2F5"
		},
		scroll: {
			regular: "#717171",
			inactive: "#DDDDDD"
		},
		button: {
			primary: {
				active: "#167782",
				hover: "#00838F",
				clicked: "#4FB3BF",
				disabled: "rgba(113, 113, 113, 0.4)"
			},
			secondary: {
				active: "#585858",
				hover: "#333333",
				clicked: "#AEAEAE",
				disabled: "rgba(113, 113, 113, 0.4)"
			},
			group: {
				active: "#167782",
				hover: "#2E858F"
			},
			transparent: { active: "transparent" },
			text: {
				primary: "#FFFFFF",
				secondary: "#005662",
				disabled: "#7A7A7A"
			}
		},
		dropdown: {
			primary: "#333333",
			secondary: "#FFFFFF",
			hover: "#DDDDDD",
			disabled: "#7A7A7A"
		},
		tooltip: {
			background: "#FFFFFF",
			text: "#333333"
		},
		link: {
			active: "#00838F",
			hover: "#005662"
		},
		divider: "#AEAEAE",
		spinner: "#005662",
		error: "#FF4A4A",
		input: {
			text: {
				default: "#585858",
				active: "#333333",
				disabled: "#585858",
				error: "#FF4A4A"
			},
			background: {
				primary: "#FFFFFF",
				default: "#EFF2F5",
				hover: "#DDDDDD",
				disabled: "#eff2f5"
			},
			border: {
				regular: "#cad3dd",
				active: "#FFFFFF",
				hover: "#43b5c0",
				focus: "#EFF2F5",
				error: "#FF4A4A"
			}
		},
		icon: {
			grey: "#B4B9D6",
			hover: "#005662",
			active: "#525252",
			activeMenu: "#005662",
			clicked: "#FFFFFF",
			disabled: "rgba(82, 82, 82, 0.4)"
		},
		monomer: { default: "#C8C8C8" },
		editMode: { sequenceInRNABuilder: "#99d7dc" }
	},
	font: {
		size: {
			small: "10px",
			regular: "12px",
			medium: "14px",
			xsmall: "6px"
		},
		family: {
			montserrat: "Montserrat, sans-serif",
			inter: "Inter, FreeSans, Arimo, 'Droid Sans', Helvetica, 'Helvetica Neue',\nArial, sans-serif",
			roboto: "Roboto, FreeSans, Arimo, Droid Sans, Helvetica, Helvetica Neue, Arial, sans-serif"
		},
		weight: {
			light: 300,
			regular: 400,
			bold: 600
		}
	},
	monomer: { color: {
		A: q.colorA,
		C: q.colorCM,
		M: q.colorCM,
		D: q.colorDQ,
		Q: q.colorDQ,
		E: q.colorEN,
		N: q.colorEN,
		F: q.colorFY,
		Y: q.colorFY,
		G: q.colorGX,
		X: q.colorX,
		Other: q.colorX,
		H: q.colorH,
		I: q.colorILV,
		L: q.colorILV,
		V: q.colorILV,
		K: q.colorKR,
		R: q.colorKR,
		P: q.colorP,
		S: q.colorST,
		T: q.colorST,
		W: q.colorW,
		U: q.colorU,
		CHEM: q.chem,
		default: q.default
	} },
	peptide: { color: {
		D: J.D,
		E: J.E,
		K: J.K,
		H: J.H,
		O: J.O,
		R: J.R,
		Q: J.Q,
		Y: J.Y,
		U: J.U,
		S: J.S,
		C: J.C,
		N: J.N,
		T: J.T,
		L: J.L,
		I: J.I,
		F: J.F,
		A: J.A,
		W: J.W,
		P: J.P,
		G: J.G,
		M: J.M,
		V: J.V,
		Other: q.colorX
	} },
	border: {
		regular: "1px solid #CAD3DD",
		small: "1px solid #E1E5EA",
		radius: { regular: "4px" }
	},
	shadow: {
		regular: "0px 1px 1px rgba(197, 203, 207, 0.7)",
		mainLayoutBlocks: "0px 2px 5px rgba(103, 104, 132, 0.15)"
	},
	outline: {
		small: "1px solid #B4B9D6",
		medium: "2px solid #B4B9D6",
		color: "#B4B9D6",
		selected: {
			color: "#167782",
			small: "1px solid #167782",
			medium: "2px solid #167782"
		},
		grey: { small: "1px solid #585858" }
	},
	transition: { regular: "all .3s" },
	zIndex: {
		base: 0,
		toolbar: 10,
		sticky: 100,
		overlay: 200,
		modal: 1e3,
		critical: 9999
	}
}, Bv = {}, Vv = function(e) {
	return Zt({
		all: "unset",
		".Ketcher-polymer-editor-root": {
			all: "unset",
			fontSize: e.ketcher.font.size.medium,
			fontFamily: e.ketcher.font.family.inter,
			fontWeight: e.ketcher.font.weight.regular,
			backgroundColor: e.ketcher.color.background.primary,
			color: e.ketcher.color.text.primary,
			boxSizing: "border-box"
		},
		":where(.Ketcher-polymer-editor-root) div": { boxSizing: "border-box" },
		":where(.Ketcher-polymer-editor-root) input": {
			fontFamily: e.ketcher.font.family.inter,
			fontWeight: e.ketcher.font.weight.regular,
			fontSize: e.ketcher.font.size.regular,
			boxSizing: "border-box"
		},
		":where(.Ketcher-polymer-editor-root) h1": { fontSize: 96 },
		":where(.Ketcher-polymer-editor-root) h2": { fontSize: 60 },
		":where(.Ketcher-polymer-editor-root) h3": { fontSize: 48 },
		":where(.Ketcher-polymer-editor-root) h4": { fontSize: 34 },
		":where(.Ketcher-polymer-editor-root) h5": { fontSize: 24 },
		":where(.Ketcher-polymer-editor-root) h6": {
			fontSize: 20,
			fontWeight: e.ketcher.font.weight.bold
		},
		":where(.Ketcher-polymer-editor-root) p": { fontSize: e.ketcher.font.size.regular },
		":where(.Ketcher-polymer-editor-root) button": {
			textTransform: "uppercase",
			fontWeight: e.ketcher.font.weight.bold
		}
	}, "", "");
}, Hv = "254px", Uv = "100px", Wv = P("div", { target: "e1vkl5kv5" })("width:", Hv, ";height:calc(100% - 16px);display:flex;flex-direction:column;background-color:", function(e) {
	return e.theme.ketcher.color.background.primary;
}, ";box-shadow:", function(e) {
	return e.theme.ketcher.shadow.mainLayoutBlocks;
}, ";border-radius:4px;z-index:", function(e) {
	return e.theme.ketcher.zIndex.toolbar;
}, ";"), Gv = P("div", { target: "e1vkl5kv4" })({
	name: "n1y6qf",
	styles: "padding:10px 0 10px 8px;position:relative;display:flex;align-items:center;gap:8px"
}), Kv = P("div", { target: "e1vkl5kv3" })("height:24px;display:flex;flex-grow:1;gap:4px;align-items:center;padding:4px;background-color:", function(e) {
	return e.theme.ketcher.color.input.background.default;
}, ";border-radius:4px;&:hover,&:has(input:focus){outline:", function(e) {
	return e.theme.ketcher.outline.selected.small;
}, ";}"), qv = P("button", { target: "e1vkl5kv2" })("height:24px;display:flex;align-items:center;gap:2px;border:none;border-radius:4px 0 0 4px;cursor:pointer;background-color:#e2e5e9;text-transform:none;font-weight:", function(e) {
	return e.theme.ketcher.font.weight.regular;
}, ";font-size:", function(e) {
	return e.theme.ketcher.font.size.regular;
}, ";color:", function(e) {
	return e.theme.ketcher.color.text.secondary;
}, ";"), Jv = P(F, { target: "e1vkl5kv1" })("height:16px;width:16px;color:", function(e) {
	return e.theme.ketcher.color.text.secondary;
}, ";"), Yv = P(Rt, { target: "e1vkl5kv0" })({
	name: "pmmg8c",
	styles: "flex-grow:1;padding:0;margin:0;background-color:transparent;border:none;outline:none;&:hover{outline:none;}&:focus{outline:none;}"
}), Xv = ["children"];
function Zv(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Qv(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Zv(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Zv(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var $v = P("div", { target: "e1pv9pa12" })(function(e) {
	var t = e.fullWidth, n = e.withPaddingRight;
	return {
		width: t ? "100%" : "fit-content",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		paddingRight: n ? "12px" : 0,
		overflow: t ? "hidden" : "initial"
	};
}, ""), ey = P("div", { target: "e1pv9pa11" })(function(e) {
	return {
		height: "100%",
		width: "100%",
		position: "relative",
		padding: "12px",
		paddingBottom: 0,
		backgroundColor: e.theme.ketcher.color.background.canvas,
		display: "flex",
		justifyContent: "space-between",
		containerType: "size",
		overflow: "clip"
	};
}, ""), ty = P("div", { target: "e1pv9pa10" })(function(e) {
	return {
		height: "100%",
		width: "100%",
		position: "relative",
		paddingBottom: 0,
		backgroundColor: e.theme.ketcher.color.background.canvas,
		display: "flex",
		justifyContent: "space-between",
		columnGap: "3px"
	};
}, ""), ny = P("div", { target: "e1pv9pa9" })(function(e) {
	var t = e.hide;
	return {
		height: "100%",
		width: "fit-content",
		display: t !== void 0 && t ? "none" : "flex",
		flexDirection: "column"
	};
}, ""), ry = P(ny, { target: "e1pv9pa8" })(""), iy = P(ny, { target: "e1pv9pa7" })(""), ay = P("div", { target: "e1pv9pa6" })({
	name: "oixulj",
	styles: "display:flex;justify-content:space-between;width:100cqw"
}), oy = P("div", { target: "e1pv9pa5" })(function(e) {
	var t = e.shortened, n = t === void 0 ? !1 : t, r = e.theme;
	return {
		height: "36px",
		width: n ? "100%" : `calc(100% - ${Uv})`,
		marginBottom: "6px",
		display: "flex",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		boxShadow: r.ketcher.shadow.mainLayoutBlocks,
		borderRadius: "4px",
		overflowX: "hidden"
	};
}, ""), sy = P("div", { target: "e1pv9pa4" })("width:42px;height:36px;display:flex;position:relative;right:0;cursor:pointer;background:white;box-shadow:", function(e) {
	return e.theme.ketcher.shadow.mainLayoutBlocks;
}, ";border-radius:4px;"), cy = P("div", { target: "e1pv9pa3" })({
	name: "1gavlve",
	styles: "&:not(:empty){margin-bottom:15px;}"
}), ly = P("div", { target: "e1pv9pa2" })({
	name: "nc15h",
	styles: "height:100%;width:100%;position:relative;overflow:hidden"
}), uy = P("div", { target: "e1pv9pa1" })({
	name: "0",
	styles: ""
}), dy = P("div", { target: "e1pv9pa0" })({
	name: "1k18kha",
	styles: "height:40px"
}), fy = function(e) {
	var t = I(qe({ threshold: 1 }), 2), n = t[0], r = t[1], i = I(qe({ threshold: 1 }), 2), a = i[0], o = i[1], s = e.children, c = It(e, Xv), l = (0, z.useRef)(null), u = 300;
	return H("div", {
		style: {
			display: "flex",
			position: "relative"
		},
		children: [H(oy, Qv(Qv({}, c), {}, {
			ref: l,
			children: [
				V("span", { ref: n }),
				V(ay, { children: V(B, { children: s }) }),
				V("span", { ref: a })
			]
		})), !r || !o ? V(sy, { children: V(sn, {
			startInView: r,
			endInView: o,
			scrollBack: function(e) {
				l.current && (l.current.scrollLeft -= u * e / 1e3);
			},
			scrollForward: function(e) {
				l.current && (l.current.scrollLeft += u * e / 1e3);
			},
			isLeftRight: !0
		}) }) : null]
	});
}, py = function(e) {
	var t = e.children, n = {
		Left: null,
		Main: null,
		Right: null,
		Top: null,
		Bottom: null,
		InsideRoot: null
	};
	return z.Children.forEach(t, function(e) {
		e.type === ry ? n.Left = e : e.type === iy ? n.Right = e : e.type === fy ? n.Top = e : e.type === cy ? n.Bottom = e : e.type === ly ? n.Main = e : e.type === uy && (n.InsideRoot = e);
	}), H(ey, { children: [
		H($v, {
			fullWidth: !0,
			withPaddingRight: !0,
			children: [
				n.Top,
				H(ty, { children: [
					n.Left,
					V(dy, {}),
					n.Main
				] }),
				n.Bottom
			]
		}),
		V($v, { children: n.Right }),
		n.InsideRoot
	] });
};
py.Left = ry, py.Top = fy, py.Bottom = cy, py.Right = iy, py.Main = ly, py.InsideRoot = uy;
var my = {
	tabPanelDiv: "TabPanel-module_tabPanelDiv__wMffZ",
	tabPanelBox: "TabPanel-module_tabPanelBox__LY-BB"
}, hy = function(e) {
	var t = e.children, n = e.value, r = e.index;
	return V("div", {
		className: my.tabPanelDiv,
		role: "tabpanel",
		hidden: n !== r,
		id: r.toString(),
		children: n === r && V($n, {
			className: my.tabPanelBox,
			children: V(B, { children: t })
		})
	});
}, gy = P(Ae, {
	shouldForwardProp: function(e) {
		return e !== "isLayoutToRight";
	},
	target: "e1rrs7vg3"
})("height:32px;min-height:32px;list-style-type:none;margin:0;padding:4px 8px 0 8px;border-bottom:", function(e) {
	return `1px solid ${e.theme.ketcher.color.border.primary}`;
}, ";overflow:unset;& .MuiTabs-scroller,& .MuiTabs-flexContainer{height:100%;overflow:unset!important;}& .MuiTabs-flexContainer{justify-content:", function(e) {
	return e.isLayoutToRight ? "flex-end" : "flex-start";
}, ";padding-right:", function(e) {
	return e.isLayoutToRight ? "16px" : "0";
}, ";}& .MuiTabs-indicator{display:none;}"), _y = P(b, {
	shouldForwardProp: function(e) {
		return e !== "isLayoutToRight";
	},
	target: "e1rrs7vg2"
})("min-height:24px;min-width:0;position:relative;padding:7px 12px;font-size:", function(e) {
	return e.theme.ketcher.font.size.regular;
}, ";text-transform:none;cursor:pointer;text-align:center;background-color:", function(e) {
	return e.theme.ketcher.color.tab.regular;
}, ";color:", function(e) {
	return e.theme.ketcher.color.text.light;
}, ";list-style-type:none;margin-left:1px;align-items:center;flex:", function(e) {
	return e.isLayoutToRight ? void 0 : "1 1 auto;";
}, ";border:1px solid transparent;border-bottom:none;border-radius:4px 4px 0 0;&:first-of-type{margin-left:0;}&:hover{background-color:", function(e) {
	return e.theme.ketcher.color.tab.regular;
}, ";color:", function(e) {
	return e.theme.ketcher.color.text.primary;
}, ";border-color:", function(e) {
	return e.theme.ketcher.color.border.primary;
}, ";}&.Mui-selected{background-color:", function(e) {
	return e.theme.ketcher.color.tab.active;
}, ";color:", function(e) {
	return e.theme.ketcher.color.text.primary;
}, ";border-color:", function(e) {
	return e.theme.ketcher.color.border.primary;
}, ";margin-bottom:-1px;padding-bottom:8px;&::after{content:'';position:absolute;left:0;bottom:-1px;height:1px;background-color:", function(e) {
	return e.theme.ketcher.color.tab.active;
}, ";}}&[data-tab='Favorites']{font-size:16px;color:#faa500;}"), vy = P(b, { target: "e1rrs7vg1" })({
	name: "2934o7",
	styles: "width:0;height:0;min-width:0;min-height:0;padding:0;margin:0;visibility:hidden"
}), yy = P("div", { target: "e1rrs7vg0" })({
	name: "2r6rpv",
	styles: "display:flex;flex-direction:row;flex-wrap:wrap;justify-content:flex-start;width:100%;height:100%"
});
function by(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function xy(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? by(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : by(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var Sy = function(e) {
	return {
		id: `simple-tab-${e}`,
		"aria-controls": `simple-tabpanel-${e}`
	};
}, Cy = (0, z.memo)(function(e) {
	var t = e.tabs, n = e.selectedTabIndex, r = e.isLayoutToRight, i = e.onChange, a = t[n], o = a?.component, s = a?.props;
	return H(B, { children: [H(gy, {
		value: n,
		onChange: i,
		isLayoutToRight: r,
		children: [t.map(function(e, t) {
			return V(_y, xy({
				label: e.caption,
				title: e.tooltip,
				isLayoutToRight: r,
				"data-testid": e.testId,
				"data-tab": e.tooltip
			}, Sy(t)), e.caption || e.testId);
		}), V(vy, { value: -1 })]
	}), a && V(hy, {
		value: n,
		index: n,
		children: V(yy, { children: V(o, xy({}, s)) })
	})] });
}), wy = function() {};
function Ty(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Ey(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Ty(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ty(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var Dy = function(e, t, n) {
	var r = new Map(e.map(function(e) {
		return [bn(e) ? x(e.id) : v(e.props.id || $g(e)), e];
	}));
	return t.filter(function(e) {
		return e.templates.every(function(e) {
			return !!r.get(e.$ref);
		});
	}).map(function(e) {
		var t = new Map(e.templates.map(function(e) {
			var t = r.get(e.$ref);
			return [I(rt(t), 3)[2], t];
		})), i = t.get(S.Sugar), a = t.get(S.Base), o = t.get(S.Phosphate), s = {
			base: a ? Ey(Ey({}, a), {}, { label: a.label }) : void 0,
			name: e.name,
			phosphate: o ? Ey(Ey({}, o), {}, { label: o.label }) : void 0,
			sugar: i ? Ey(Ey({}, i), {}, { label: i.label }) : void 0,
			favorite: e.favorite,
			default: n || e.default
		};
		return e.idtAliases ? Ey(Ey({}, s), {}, { idtAliases: e.idtAliases }) : s;
	});
}, Oy = function(e) {
	return Object.entries(e).filter(function(e) {
		var t = I(e, 2);
		return t[0], !!t[1];
	}).map(function(e) {
		return I(e, 1)[0];
	});
}, ky = function(e) {
	return e && e.replace(/(?:^\/+)|(?:\/+$)/g, "");
}, Y = function() {
	return Bt();
}, X = xn;
function Ay() {
	var e, t = X(vg), n = X(W), r = X(xg), i;
	try {
		i = xt.getKetcher(t);
	} catch (e) {
		Lt.error(`Failed to get ketcher instance with id ${t}`, e);
	}
	var a = !((e = i) == null || (e = e.editor) == null) && e.struct().isBlank() ? Ct : ke, o = I((0, z.useState)(r || a), 2), s = o[0], c = o[1], l = (0, z.useCallback)(function(e) {
		c(e);
	}, []);
	return (0, z.useEffect)(function() {
		return n?.events.layoutModeChange.add(l), function() {
			l(Ct), n?.events.layoutModeChange.remove(l);
		};
	}, [l, n]), s;
}
function jy() {
	var e = X(W), t = I((0, z.useState)(X(yg)), 2), n = t[0], r = t[1], i = (0, z.useCallback)(function(e) {
		r(e);
	}, []);
	return (0, z.useEffect)(function() {
		return e?.events.toggleSequenceEditInRNABuilderMode.add(i), function() {
			e?.events.toggleSequenceEditInRNABuilderMode.remove(i);
		};
	}, [i, e]), n;
}
var My = z.createContext({}), Ny = (0, z.createContext)({
	width: 0,
	height: 0
}), Py = function(e) {
	var t = e.children, n = e.rootRef, r = e.isMacromoleculesEditorTurnedOn, i = I((0, z.useState)({
		width: 0,
		height: 0
	}), 2), a = i[0], o = i[1], s = (0, z.useCallback)(function() {
		if (n != null && n.current) {
			var e = n.current.getBoundingClientRect(), t = e.width, r = e.height;
			o({
				width: t,
				height: r
			});
		}
	}, [n]), c = (0, z.useCallback)((0, $o.debounce)(s, 100), [s]);
	return (0, z.useEffect)(function() {
		s();
	}, [r]), (0, z.useEffect)(function() {
		return c(), window.addEventListener("resize", c), function() {
			window.removeEventListener("resize", c);
		};
	}, [c]), V(Ny.Provider, {
		value: a,
		children: t
	});
}, Fy = function() {
	return (0, z.useContext)(Ny).height < 720;
}, Iy = function(e) {
	if (e) return Array.isArray(e) ? e.join(", ") : e;
}, Ly = P("div", { target: "e719szw4" })("background:white;height:48px;text-align:center;cursor:", function(e) {
	return e.disabled ? "default" : "pointer";
}, ";opacity:", function(e) {
	return e.disabled ? "0.4" : "1";
}, ";display:flex;justify-content:space-between;align-items:center;font-size:", function(e) {
	return e.theme.ketcher.font.size.small;
}, ";color:", function(e) {
	return e.theme.ketcher.color.text.primary;
}, ";position:relative;overflow:hidden;border-radius:4px;box-shadow:0 2px 5px 0 rgba(103, 104, 132, 0.149);margin:0;user-select:none;border-color:#167782;border-width:", function(e) {
	return e.selected ? "2px 2px 2px" : "0px";
}, ";border-style:solid;box-sizing:border-box;z-index:", function(e) {
	return e.selected ? 2 : void 0;
}, ";.hidden & .star{visibility:hidden!important;}&:hover{outline:1px solid #b4b9d6;>.star,.autochain{visibility:visible;opacity:1;}}&::after{content:'';display:block;position:absolute;top:0;left:0;width:100%;height:8px;border-bottom:", function(e) {
	return e.isVariantMonomer ? "1px solid #CAD3DD" : "none";
}, ";background:", function(e) {
	var t, n = e.code, r = e.theme, i = e.item;
	return i ? i.props?.MonomerType === "PEPTIDE" && (t = r.ketcher.peptide.color[n]) != null && t.regular ? r.ketcher.peptide.color[n]?.regular : r.ketcher.monomer.color[n]?.regular || r.ketcher.monomer.color.default?.regular : r.ketcher.monomer.color.default?.regular;
}, ";},>span{position:absolute;bottom:", function(e) {
	return e.selected ? "4px" : "6px";
}, ";left:", function(e) {
	return e.selected ? "4px" : "6px";
}, ";overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:85%;}>.star{color:#cad3dd;position:absolute;left:calc(50% - 7px);top:11px;font-size:13px;line-height:13px;opacity:0;transition:0.2s ease;flex-shrink:0;&.visible{visibility:visible;opacity:1;}&:active{transform:scale(1.4);}&:hover,&.visible{color:#faa500;}}"), Ry = P("div", { target: "e719szw3" })("display:flex;justify-content:center;align-items:center;height:15px;width:", function(e) {
	return e.monomersAmount >= 10 ? "20px" : "15px";
}, ";border-radius:", function(e) {
	return e.monomersAmount >= 10 ? "20px" : "50%";
}, ";border:1px solid #cceaee;position:absolute;bottom:", function(e) {
	return e.selected ? "4px" : "6px";
}, ";left:", function(e) {
	return e.selected ? "18px" : "20px";
}, ";font-size:12px;line-height:12px;"), zy = P("span", { target: "e719szw2" })({
	name: "rnnx2x",
	styles: "font-size:12px"
}), By = P(F, { target: "e719szw1" })("color:#cad3dd;stroke-width:0;opacity:0;transition:0.2s ease;flex-shrink:0;width:13px;&:active{transform:scale(1.2);}&:hover{color:", function(e) {
	return e.disabled ? "#cad3dd" : "#333333";
}, ";}"), Vy = P("div", { target: "e719szw0" })({
	name: "evdt6m",
	styles: "position:absolute;top:12px;left:4px"
}), Hy = function(e, t) {
	var n, r, i, a = X(yg), o = xn(nv), s = I((0, z.useState)(!1), 2), c = s[0], l = s[1];
	return (0, z.useEffect)(function() {
		if (!a) return l(!1);
		if (t === he.BASES) {
			var n;
			l(!(e != null && (n = e.props) != null && (n = n.MonomerCaps) != null && n.R1));
		} else if (t === he.PHOSPHATES) {
			var r, i;
			l(!(e != null && (r = e.props) != null && (r = r.MonomerCaps) != null && r.R1 && e != null && (i = e.props) != null && (i = i.MonomerCaps) != null && i.R2));
		} else if (t === he.SUGARS) if (o) {
			var s, c;
			l(!(e != null && (s = e.props) != null && (s = s.MonomerCaps) != null && s.R3 && e != null && (c = e.props) != null && (c = c.MonomerCaps) != null && c.R2));
		} else {
			var u, d, f;
			l(!(e != null && (u = e.props) != null && (u = u.MonomerCaps) != null && u.R3 && e != null && (d = e.props) != null && (d = d.MonomerCaps) != null && d.R2 && e != null && (f = e.props) != null && (f = f.MonomerCaps) != null && f.R1));
		}
	}, [
		t,
		a,
		o,
		e == null || (n = e.props) == null || (n = n.MonomerCaps) == null ? void 0 : n.R1,
		e == null || (r = e.props) == null || (r = r.MonomerCaps) == null ? void 0 : r.R2,
		e == null || (i = e.props) == null || (i = i.MonomerCaps) == null ? void 0 : i.R3,
		l
	]), c;
}, Uy = function(e, t) {
	var n = xn(W);
	(0, z.useEffect)(function() {
		if (!(!n || !t.current)) {
			var r = Cd(t.current), i = Rd().on("start", function() {
				n.isLibraryItemDragCancelled = n.mode.modeName === "sequence-layout-mode", n.isLibraryItemDragCancelled || (document.body.style.cursor = "grabbing");
			}).on("drag", function(t) {
				if (!n.isLibraryItemDragCancelled) {
					var r = t.sourceEvent, i = r.clientX, a = r.clientY;
					n.events.setLibraryItemDragState.dispatch({
						item: e,
						position: {
							x: i - (n.ketcherRootElementBoundingClientRect?.left || 0),
							y: a - (n.ketcherRootElementBoundingClientRect?.top || 0)
						}
					});
				}
			}).on("end", function(t) {
				if (!n.isLibraryItemDragCancelled) {
					var r = t.sourceEvent, i = r.clientX, a = r.clientY, o = s.instance.canvasWrapper.node()?.getBoundingClientRect();
					if (o) {
						var c = o.top, l = o.left, u = o.right, d = o.bottom, f = s.instance.zoomTransform, p = i - l + f.k * 15, m = a - c + f.k * 15, h = I(f.invert([p, m]), 2), g = h[0], _ = h[1];
						i >= l && i <= u && a >= c && a <= d && n.events.placeLibraryItemOnCanvas.dispatch(e, {
							x: g,
							y: _
						});
					}
				}
				n.events.setLibraryItemDragState.dispatch(null), n.isLibraryItemDragCancelled = !1, document.body.style.cursor = "";
			});
			return r.call(i), function() {
				r.on(".drag", null);
			};
		}
	}, [
		n,
		e,
		t
	]);
}, Wy = function(e, t) {
	var n = e.getDataForAutochain(), r = n.selectedMonomersWithFreeR2;
	return n.selectedMonomers.length > 0 && r.length !== 1 ? "Select a monomer or a chain that has one R2 available." : r.length === 1 && !wn(t) ? "This monomer cannot be added to a chain using this button, as it lacks R1." : "";
}, Gy = function(e, t, n) {
	n(Wy(e, t));
};
function Ky(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function qy(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Ky(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ky(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var Jy = "autochain", Yy = function(e) {
	var t, n, r, i, a = e.item, o = e.groupName, s = e.onMouseLeave, c = e.onMouseMove, l = e.isSelected, u = e.disabled, d = e.onClick, f = d === void 0 ? wy : d, p = Y(), m = X(W), h = X(bg), g = I((0, z.useState)(""), 2), v = g[0], y = g[1], b = (0, z.useRef)(null), x = Hy(a, o) || u, S = "";
	bn(a) || (S = a.props.MonomerType === Rg.CHEM ? a.props.MonomerType : a.props.MonomerNaturalAnalogCode);
	var C = $g(a), w = bn(a) ? void 0 : a, T = (0, z.useCallback)(function(e) {
		e.stopPropagation(), p(o_(a));
	}, [p, a]), E = (0, z.useCallback)(function(e) {
		(e.key === "Enter" || e.key === " ") && (e.preventDefault(), e.stopPropagation(), p(o_(a)));
	}, [p, a]), D = (0, z.useCallback)(function(e) {
		if (e.stopPropagation(), m) {
			var t = Wy(m, a);
			if (y(t), t) return;
		}
		m?.events.autochain.dispatch(a);
	}, [m, a]), O = (0, z.useCallback)(function() {
		return m && Gy(m, a, y);
	}, [m, a]), k = (0, z.useCallback)(function() {
		if (m) {
			var e = Wy(m, a);
			if (y(e), e) return;
		}
		m?.events.previewAutochain.dispatch(a);
	}, [m, a]), ee = (0, z.useCallback)(function() {
		m?.events.removeAutochainPreview.dispatch(a);
	}, [m, a]);
	return Uy(a, b), H(Ly, qy(qy({
		selected: l,
		disabled: x,
		"data-testid": C,
		"data-monomer-item-id": C,
		item: w,
		isVariantMonomer: a.isAmbiguous,
		code: S,
		onMouseOver: O,
		onMouseLeave: s,
		onMouseMove: c,
		onDoubleClick: function(e) {
			D(e), ee();
		}
	}, x ? {} : { onClick: f }), {}, {
		ref: b,
		"data-idtalias-base": (w == null || (t = w.props.idtAliases) == null ? void 0 : t.base) ?? void 0,
		"data-idtalias-modifications-endpoint5": (w == null || (n = w.props.idtAliases) == null || (n = n.modifications) == null ? void 0 : n.endpoint5) ?? void 0,
		"data-idtalias-modifications-endpoint3": (w == null || (r = w.props.idtAliases) == null || (r = r.modifications) == null ? void 0 : r.endpoint3) ?? void 0,
		"data-idtalias-modifications-internal": (w == null || (i = w.props.idtAliases) == null || (i = i.modifications) == null ? void 0 : i.internal) ?? void 0,
		"data-axolabs": w?.props.aliasAxoLabs ?? void 0,
		"data-helm": w?.props.aliasHELM ?? void 0,
		"data-modificationtype": Iy(w?.props.modificationTypes),
		children: [
			V(zy, { children: a.label }),
			!x && H(B, { children: [!h && V(_, {
				title: v,
				children: V(Vy, { children: V(By, {
					className: Jy,
					name: "monomer-autochain",
					disabled: !!v,
					onMouseOver: k,
					onMouseOut: ee,
					onClick: D,
					onDoubleClick: function(e) {
						return e.stopPropagation();
					}
				}) })
			}), V("div", {
				onClick: T,
				onKeyDown: E,
				className: `star ${a.favorite ? "visible" : ""}`,
				role: "button",
				tabIndex: 0,
				"aria-label": "Toggle favorite",
				children: qg
			})] }),
			bn(a) && V(Ry, {
				selected: l,
				monomersAmount: a.monomers.length,
				children: a.monomers.length
			})
		]
	}));
}, Xy = P("div", { target: "e10tnh3n3" })({
	name: "37420",
	styles: "display:grid;grid-template-columns:repeat(3, 1fr);grid-template-rows:auto;flex:1;gap:4px;&::after{content:'';flex:auto;}"
}), Zy = P("div", { target: "e10tnh3n2" })("position:relative;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:flex-start;font-size:", function(e) {
	return e.theme.ketcher.font.size.small;
}, ";font-family:", function(e) {
	return e.theme.ketcher.font.family.roboto;
}, ";color:", function(e) {
	return e.theme.ketcher.color.divider;
}, ";margin:0;gap:4px;"), Qy = P(Zy, { target: "e10tnh3n1" })({
	name: "qdeacm",
	styles: "flex-direction:column"
}), $y = P("div", { target: "e10tnh3n0" })("height:100%;display:flex;flex-grow:0;flex-basis:14px;flex-direction:column;flex-wrap:wrap;justify-content:flex-start;font-size:", function(e) {
	return e.theme.ketcher.font.size.medium;
}, ";font-family:", function(e) {
	return e.theme.ketcher.font.family.roboto;
}, ";color:", function(e) {
	return e.theme.ketcher.color.text.primary;
}, ";margin:0;"), eb = [Jy], tb = function(e) {
	return eb.some(function(t) {
		return e.classList.contains(t) || e.closest(`.${t}`);
	});
};
function nb(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (!n) {
		if (Array.isArray(e) || (n = rb(e)) || t && e && typeof e.length == "number") {
			n && (e = n);
			var r = 0, i = function() {};
			return {
				s: i,
				n: function() {
					return r >= e.length ? { done: !0 } : {
						done: !1,
						value: e[r++]
					};
				},
				e: function(e) {
					throw e;
				},
				f: i
			};
		}
		throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	var a, o = !0, s = !1;
	return {
		s: function() {
			n = n.call(e);
		},
		n: function() {
			var e = n.next();
			return o = e.done, e;
		},
		e: function(e) {
			s = !0, a = e;
		},
		f: function() {
			try {
				o || n.return == null || n.return();
			} finally {
				if (s) throw a;
			}
		}
	};
}
function rb(e, t) {
	if (e) {
		if (typeof e == "string") return ib(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ib(e, t) : void 0;
	}
}
function ib(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
var ab = function(e) {
	var t = e.items, n = e.title, r = e.groupName, i = e.selectedMonomerUniqueKey, a = e.libraryName, o = e.disabled, s = e.onItemClick, c = s === void 0 ? wy : s, l = Y(), u = X(W), d = X(Q_), f = function(e) {
		var t = !1;
		if (bn(e)) return !1;
		if (o) t = o;
		else {
			var n, r = d[`${e.props?.MonomerClass}s`];
			if (r?.length > 0 && (n = e.props) != null && n.MonomerCaps) {
				var i = nb(r), a;
				try {
					for (i.s(); !(a = i.n()).done;) a.value in e.props.MonomerCaps || (t = !0);
				} catch (e) {
					i.e(e);
				} finally {
					i.f();
				}
			}
		}
		return t;
	}, p = (0, z.useCallback)(function(e) {
		return l(ig(e));
	}, [l]), m = (0, z.useCallback)((0, $o.debounce)(function(e) {
		return p(e);
	}, 500), [p]), h = function() {
		m.cancel(), l(ig(void 0));
	}, g = function(e, t) {
		if (h(), !tb(t.target)) {
			var n = t.currentTarget.getBoundingClientRect(), r, i, a;
			if (bn(e)) {
				a = e ? ut(e)(n) : "";
				var o = `${n.left + n.width / 2}px`;
				i = Kh.AmbiguousMonomer, r = {
					left: o,
					top: a,
					transform: "translate(-50%, 0)"
				};
			} else a = e ? $t(n) : "", r = {
				right: "-88px",
				top: a,
				transform: "translate(-50%, 0)"
			}, i = Kh.Monomer;
			m({
				type: i,
				monomer: e,
				style: r
			});
		}
	}, _ = function(e) {
		[
			"FAVORITES",
			"PEPTIDE",
			"CHEM"
		].includes(a ?? "") && u?.events.selectMonomer.dispatch(e), c(e);
	}, v = function(e) {
		return i === $g(e);
	};
	return !t || t.length === 0 ? null : H(Qy, { children: [n && V($y, { children: n }), V(Xy, { children: t.map(function(e) {
		return V(Yy, {
			disabled: f(e),
			item: e,
			groupName: r,
			isSelected: v(e),
			onMouseLeave: h,
			onMouseMove: function(t) {
				return g(e, t);
			},
			onClick: function() {
				return _(e);
			}
		}, $g(e));
	}) })] });
}, ob = P("div", { target: "e1bp6il60" })({
	name: "8z91a1",
	styles: "width:100%;display:flex;flex-direction:column;justify-items:center;gap:8px;padding:8px"
}), sb = P(Ly, { target: "e1txcvj90" })("&::after{content:'';background:", function(e) {
	var t = e.theme;
	return e.selected ? t.ketcher.color.button.primary.active : "#faa500";
}, ";}.dots{visibility:hidden;position:absolute;right:2px;top:10px;}&:hover .dots{visibility:visible;}>.star{right:0;left:calc(50% - 7px);top:11px;width:min-content;}"), cb = P("div", { target: "e1h0dkll2" })(function(e) {
	return {
		minHeight: "32px",
		display: "flex",
		alignItems: "center",
		padding: "8px 12px",
		gap: "8px",
		borderBottom: e.theme.ketcher.border.small
	};
}, ""), lb = P("span", { target: "e1h0dkll1" })(function(e) {
	return {
		flexGrow: 1,
		fontSize: e.theme.ketcher.font.size.regular
	};
}, ""), ub = P(F, { target: "e1h0dkll0" })(function(e) {
	return {
		width: "16px",
		height: "16px",
		color: e.theme.ketcher.color.icon.grey,
		transition: e.theme.ketcher.transition.regular,
		transform: e.expanded ? "rotate(180deg)" : "none"
	};
}, ""), db = (0, z.memo)(function(e) {
	var t = e.preset, n = e.isSelected, r = e.onClick, i = r === void 0 ? wy : r, a = e.onContextMenu, o = a === void 0 ? wy : a, s = e.onMouseLeave, c = s === void 0 ? wy : s, l = e.onMouseMove, u = l === void 0 ? wy : l, d = Y(), f = X(W), p = X(bg), m = I((0, z.useState)(""), 2), h = m[0], g = m[1], v = (0, z.useRef)(null), y = (0, z.useCallback)(function(e) {
		e.stopPropagation(), d(Nv(t));
	}, [d, t]), b = (0, z.useCallback)(function(e) {
		e.stopPropagation(), !h && f?.events.autochain.dispatch(t);
	}, [
		h,
		f,
		t
	]), x = (0, z.useCallback)(function() {
		return f && Gy(f, t, g);
	}, [f, t]), S = (0, z.useCallback)(function() {
		h || f?.events.previewAutochain.dispatch(t);
	}, [
		h,
		f,
		t
	]), C = (0, z.useCallback)(function() {
		f?.events.removeAutochainPreview.dispatch(t);
	}, [f, t]);
	return Uy(t, v), H(sb, {
		"data-testid": e_(t),
		onClick: i,
		onContextMenu: o,
		onMouseOver: x,
		onMouseLeave: c,
		onMouseMove: u,
		onDoubleClick: function(e) {
			b(e), C();
		},
		selected: n,
		code: t.name,
		"data-rna-preset-item-name": t.name,
		ref: v,
		children: [
			!p && V(_, {
				title: h,
				children: V(Vy, { children: V(By, {
					className: Jy,
					name: "monomer-autochain",
					disabled: !!h,
					onMouseOver: S,
					onMouseOut: C,
					onClick: b,
					onDoubleClick: function(e) {
						return e.stopPropagation();
					}
				}) })
			}),
			V("span", { children: t.name }),
			V(ub, {
				name: "vertical-dots",
				className: "dots",
				onClick: o
			}),
			V("div", {
				"aria-hidden": !0,
				onClick: y,
				className: `star ${t.favorite ? "visible" : ""}`,
				children: qg
			})
		]
	});
}), fb;
(function(e) {
	e.FOR_RNA = "context-menu-for-RNA", e.FOR_SEQUENCE = "context-menu-for-sequence", e.FOR_POLYMER_BOND = "context-menu-for-polymer-bond", e.FOR_SELECTED_MONOMERS = "context-menu-for-selected-monomers";
})(fb ||= {});
var pb = P(De, { target: "ekj16lc0" })("--contexify-activeItem-bgColor:rgba(243, 245, 247, 1);--contexify-menu-minWidth:140px;--contexify-activeItem-color:rgba(51, 51, 51, 1);--contexify-menu-padding:4px;--contexify-itemContent-padding:6px 8px;--contexify-separator-margin:4px 0;--contexify-separator-color:#e1e5ea;.contexify_itemContent{font-family:", function(e) {
	return e.theme.ketcher.font.family.inter;
}, ";font-size:", function(e) {
	return e.theme.ketcher.font.size.regular;
}, ";height:28px;}.contexify_item-title{opacity:1;font-weight:bold;background:#e1e5ea;margin:-4px 0 4px -4px;width:calc(100% + 8px);border-radius:4px 4px 0 0;}.context_menu-icon{width:16px;height:16px;display:flex;align-items:center;margin-right:4px;}.context_menu-text{display:flex;align-items:center;line-height:", function(e) {
	return e.theme.ketcher.font.size.regular;
}, ";}.context_menu-delete-text{display:flex;align-items:center;line-height:", function(e) {
	return e.theme.ketcher.font.size.regular;
}, ";margin-left:-3px;}"), mb = function e(t, n) {
	var r = 500, i = !1, a = [];
	return t.forEach(function(t) {
		var o = t.name, s = t.title, c = t.icon, l = t.hidden, u = t.disabled, d = t.isMenuTitle, f = t.separator, p = t.subMenuItems, h = t.onMouseOver, g = t.onMouseOut, _ = p != null && p.length ? V(kn, {
			label: s,
			"data-testid": o,
			children: e(p, n)
		}, o) : H(m, {
			id: o,
			onClick: function(e) {
				i = !0, setTimeout(function() {
					i = !1;
				}, r), n(e);
			},
			"data-testid": o,
			hidden: l,
			disabled: u,
			className: d ? "contexify_item-title" : "",
			onMouseOver: function() {
				i || h?.(o);
			},
			onMouseOut: function() {
				return g?.(o);
			},
			children: [c && V("span", {
				className: "context_menu-icon",
				children: c
			}), V("span", {
				className: o === "delete" ? "context_menu-delete-text" : "context_menu-text",
				children: s
			})]
		}, o);
		a.push(_), f && a.push(V(Mn, {}, `separator-${o}`));
	}), a;
}, hb = function(e) {
	var t = e.id, n = e.handleMenuChange, r = e.menuItems, i = Y();
	return (0, z.useEffect)(function() {
		var e = function(e) {
			var t, n;
			if (!((t = e.target) == null || (t = t.__data__) == null) && t.node || !((n = e.target) == null || (n = n.__data__) == null) && n.monomer) {
				e.stopPropagation();
				return;
			}
			i(ag(!1));
		};
		return document.addEventListener("click", e), document.addEventListener("contextmenu", e), function() {
			document.removeEventListener("click", e), document.removeEventListener("contextmenu", e);
		};
	}, [i, t]), V(pb, {
		id: t,
		children: mb(r, n)
	});
}, gb = function() {
	var e = Kg.RNA, t = Y(), n = X(dv), r = X(__), i = X(yg), a = [
		{
			name: "duplicateandedit",
			title: "Duplicate and Edit...",
			disabled: !1
		},
		{
			name: "edit",
			title: "Edit...",
			separator: !0,
			disabled: n?.default
		},
		{
			name: "deletepreset",
			title: "Delete Preset",
			disabled: n?.default
		}
	], o = function(i) {
		var a = i.id, o = i.props;
		switch (a) {
			case "duplicateandedit":
				o.duplicatePreset(n), r !== e && t(c_(e));
				break;
			case "edit":
				o.editPreset(n), r !== e && t(c_(e));
				break;
			case "deletepreset":
				t(S_("delete"));
				break;
		}
	}, s = document.querySelector(On);
	return s && !i ? (0, ts.createPortal)(V(hb, {
		id: fb.FOR_RNA,
		menuItems: a,
		handleMenuChange: o
	}), s) : null;
}, _b = function(e) {
	var t = e.presets, n = e.duplicatePreset, r = e.editPreset, i = X($_), a = X(W), o = nt({ id: fb.FOR_RNA }).show, s = Bt(), c = function(e) {
		var t, n, r, i = !0, a = !0, o = !0;
		if (e != null && (t = e.base) != null && (t = t.props) != null && t.MonomerCaps && (i = "R1" in e.base.props.MonomerCaps), e != null && (n = e.sugar) != null && (n = n.props) != null && n.MonomerCaps) {
			var s;
			i && e != null && (s = e.base) != null && (s = s.props) != null && s.MonomerCaps && (a = "R3" in e.sugar.props.MonomerCaps);
		}
		if (e != null && (r = e.phosphate) != null && (r = r.props) != null && r.MonomerCaps) {
			var c;
			o = "R1" in e.phosphate.props.MonomerCaps, a && e != null && (c = e.sugar) != null && (c = c.props) != null && c.MonomerCaps && (a = "R2" in e.sugar.props.MonomerCaps);
		}
		return i && a && o;
	}, l = function(e) {
		return function() {
			if (!c(e) && e.name) {
				s(kv(e.name));
				return;
			}
			s(gv(e)), a?.events.selectPreset.dispatch(e), e.name !== i.name && s(Dv(!1));
		};
	}, u = function(e) {
		!(e instanceof HTMLDivElement) && e.parentElement && (e = e.parentElement);
		var t = e.getBoundingClientRect(), n = e.offsetParent?.getBoundingClientRect(), r = t.right - 140, i = t.y + t.height / 2;
		return n != null && n.x && n?.x > r && (r = t.x), {
			x: r,
			y: i
		};
	}, d = X(gg), f = (0, z.useCallback)(function(e) {
		return s(ig(e));
	}, [s]), p = (0, z.useCallback)((0, $o.debounce)(function(e) {
		return f(e);
	}, 500), [f]), m = function() {
		p.cancel(), s(ig(void 0));
	}, h = function(e, t) {
		if (m(), !tb(t.target) && !(d.type === Kh.Preset || !t.currentTarget)) {
			var n = [
				e.sugar,
				e.base,
				e.phosphate
			], r = t.currentTarget.getBoundingClientRect(), i = {
				left: `${r.left + r.width}px`,
				top: bn(e.base) ? ut(e.base)(r) : Ht(r),
				transform: "translate(-100%, 0)"
			};
			p(bn(e.base) ? {
				type: Kh.AmbiguousMonomer,
				monomer: e.base,
				presetMonomers: n,
				style: i
			} : {
				type: Kh.Preset,
				monomers: n,
				name: e.name,
				idtAliases: e.idtAliases,
				position: qh.Library,
				style: i
			});
		}
	}, g = function(e) {
		return function(t) {
			t.stopPropagation(), s(Mv(e)), o({
				event: t,
				props: {
					duplicatePreset: n,
					editPreset: r
				},
				position: u(t.currentTarget)
			});
		};
	};
	return H(Zy, {
		"data-testid": "rna-preset-group",
		children: [V(Xy, { children: t.map(function(e, t) {
			return V(db, {
				isSelected: i?.name === e.name,
				preset: e,
				onClick: l(e),
				onContextMenu: g(e),
				onMouseMove: function(t) {
					return h(e, t);
				},
				onMouseLeave: m
			}, `${e.name}${t}`);
		}) }), V(gb, {})]
	});
}, vb = function(e) {
	var t = e.onItemClick, n = e.libraryName, r = e.duplicatePreset, i = e.editPreset, a = X(h_), o = X(hv), s = X(_g), c = n === Ig, l = c ? {
		monomers: p_(a),
		presets: fv(o)
	} : u_(a, n), u = g_(c ? l.monomers : l), d = c ? m_(a) : d_(a, G.PEPTIDES), f = I((0, z.useState)(""), 2), p = f[0], m = f[1];
	return (0, z.useEffect)(function() {
		s !== "monomer" && m("");
	}, [s]), H(ob, { children: [
		c && u.length > 0 && V("div", { children: "Monomers" }),
		u.map(function(e, r, i) {
			var a = e.groupItems, o = e.groupTitle;
			return V(ab, {
				title: i.length === 1 ? void 0 : o,
				items: a,
				libraryName: n,
				onItemClick: t,
				selectedMonomerUniqueKey: p
			}, o);
		}),
		c && l.presets.length > 0 && H(B, { children: [V("div", { children: "Presets" }), V(_b, {
			duplicatePreset: r,
			editPreset: i,
			presets: l.presets
		})] }),
		V(B, { children: (n === Lg || c) && d.map(function(e) {
			return V(ab, {
				title: e.groupTitle,
				items: e.groupItems,
				libraryName: n,
				onItemClick: t,
				selectedMonomerUniqueKey: p
			}, e.groupTitle);
		}) })
	] });
}, yb = P("div", { target: "e1fsx6x2" })({
	name: "kxxltl",
	styles: "display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding:8px;background-color:#f7f9fa;border-radius:0 0 4px 4px"
}), bb = P("span", { target: "e1fsx6x1" })("font-size:", function(e) {
	return e.theme.ketcher.font.size.medium;
}, ";overflow:hidden;text-overflow:ellipsis;color:", function(e) {
	return e.theme.ketcher.color.text.primary;
}, ";"), xb = P("div", { target: "e1fsx6x0" })({
	name: "1x17g94",
	styles: "display:flex;align-items:center;width:100%"
}), Sb = (0, z.memo)(function(e) {
	var t = e.name, n = e.fullName;
	return !t && !n ? null : V(yb, { children: V(xb, { children: V(bb, { children: t ?? n }) }) });
}), Cb = P("div", { target: "e1ie5fzr8" })(function(e) {
	var t = e.selected, n = e.isEditMode, r = e.theme, i = "transparent";
	return t ? i = r.ketcher.color.button.primary.active : n && (i = r.ketcher.color.background.primary), {
		height: "40px",
		position: "relative",
		marginLeft: n ? "30px" : "28.5px",
		display: "flex",
		alignItems: "center",
		border: n ? "none" : `1.5px solid ${r.ketcher.outline.color}`,
		backgroundColor: i,
		borderRadius: r.ketcher.border.radius.regular,
		boxShadow: n ? r.ketcher.shadow.regular : "none",
		padding: "5px 10px",
		color: t ? "white" : "black",
		gap: "8px",
		cursor: "pointer",
		outlineOffset: "1px",
		boxSizing: "border-box",
		":hover": { outline: r.ketcher.outline.small },
		":not(:last-child)": { ":after": {
			content: "\"\"",
			position: "absolute",
			right: "100%",
			bottom: "calc(50% - 1px)",
			borderLeft: r.ketcher.outline.medium,
			borderBottom: r.ketcher.outline.medium,
			height: "2px",
			width: "17px"
		} },
		":last-child": { ":after": {
			content: "\"\"",
			position: "absolute",
			right: "100%",
			bottom: "calc(50% - 1px)",
			borderLeft: r.ketcher.outline.medium,
			borderBottom: r.ketcher.outline.medium,
			borderRadius: "0 0 0 4px",
			height: "130px",
			width: "17px"
		} }
	};
}, ""), wb = P("div", { target: "e1ie5fzr7" })({
	name: "1fttcpj",
	styles: "display:flex;flex-direction:column"
}), Tb = P("span", { target: "e1ie5fzr6" })("font-size:", function(e) {
	return e.theme.ketcher.font.size.small;
}, ";color:", function(e) {
	var t = e.selected, n = e.theme;
	return t ? n.ketcher.color.background.primary : n.ketcher.color.text.light;
}, ";opacity:", function(e) {
	return e.selected ? .4 : 1;
}, ";"), Eb = P("span", { target: "e1ie5fzr5" })("margin-top:1px;font-size:", function(e) {
	return e.theme.ketcher.font.size.medium;
}, ";color:", function(e) {
	var t = e.selected, n = e.empty, r = e.theme;
	return t ? r.ketcher.color.button.text.primary : n ? "#b4b9d6" : r.ketcher.color.text.primary;
}, ";opacity:", function(e) {
	var t = e.selected, n = e.empty;
	return t && n ? .4 : 1;
}, ";"), Db = P("div", { target: "e1ie5fzr4" })({
	name: "wgokoh",
	styles: "position:relative;width:16px;height:16px;display:flex;align-items:center;justify-content:center"
}), Ob = P(F, { target: "e1ie5fzr3" })("fill:", function(e) {
	var t = e.selected, n = e.empty, r = e.theme;
	return n ? "none" : t ? r.ketcher.color.background.primary : r.ketcher.color.icon.grey;
}, ";color:", function(e) {
	var t = e.selected, n = e.theme;
	return t ? n.ketcher.color.background.primary : n.ketcher.color.icon.grey;
}, ";"), kb = P("div", { target: "e1ie5fzr2" })("position:relative;width:60px;display:flex;flex-direction:column;gap:8px;padding:4px;border-radius:4px;box-shadow:0 1px 2px 0 rgba(180, 185, 214, 0.6);cursor:pointer;background-color:", function(e) {
	var t = e.selected, n = e.theme;
	return t ? n.ketcher.color.button.primary.active : n.ketcher.color.background.primary;
}, ";&:hover{outline:", function(e) {
	return e.theme.ketcher.outline.selected.small;
}, ";}"), Ab = P("div", { target: "e1ie5fzr1" })("position:absolute;top:-35%;left:50%;height:15px;width:2px;background-color:", function(e) {
	return e.theme.ketcher.outline.color;
}, ";"), jb = P("p", { target: "e1ie5fzr0" })("margin:0;font-size:", function(e) {
	return e.theme.ketcher.font.size.small;
}, ";font-weight:", function(e) {
	return e.theme.ketcher.font.weight.regular;
}, ";color:", function(e) {
	var t = e.selected, n = e.empty, r = e.theme;
	return t ? r.ketcher.color.button.text.primary : n ? "#b4b9d6" : r.ketcher.color.text.primary;
}, ";opacity:", function(e) {
	var t = e.selected, n = e.empty;
	return t && n ? .4 : 1;
}, ";"), Mb = M(M(M({}, G.SUGARS, "Sugar"), G.BASES, "Base"), G.PHOSPHATES, "Phosphate"), Nb = (0, z.memo)(function(e) {
	var t = e.selected, n = e.empty, r = e.name;
	return V(Db, { children: V(Ob, {
		selected: t,
		empty: n,
		name: r
	}) });
}), Pb = function(e) {
	var t = e.groupName, n = e.iconName, r = e.monomerName, i = e.selected, a = e.onClick, o = e.testid, s = X(ov), c = !r;
	return H(kb, {
		selected: i,
		onClick: a,
		isEditMode: s,
		"data-testid": o,
		children: [
			V(Ab, {}),
			V(Nb, {
				name: n,
				selected: i,
				empty: c
			}),
			V(jb, {
				selected: i,
				empty: c,
				children: r ?? Mb[t]
			})
		]
	});
}, Fb = function(e) {
	var t = e.groupName, n = e.iconName, r = e.monomerName, i = e.selected, a = e.onClick, o = e.testid, s = X(ov), c = !r;
	return H(Cb, {
		selected: i,
		onClick: a,
		isEditMode: s,
		"data-testid": o,
		children: [V(Nb, {
			name: n,
			selected: i,
			empty: c
		}), H(wb, { children: [V(Tb, {
			selected: i,
			children: Mb[t]
		}), V(Eb, {
			empty: c,
			selected: i,
			children: r ?? "Not selected"
		})] })]
	});
};
function Ib(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Lb(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Ib(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ib(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var Rb = function(e) {
	return Fy() ? V(Pb, Lb({}, e)) : V(Fb, Lb({}, e));
}, zb = P("div", { target: "e18wzlbg8" })(function(e) {
	return {
		display: "flex",
		flexDirection: "column",
		padding: "10px",
		backgroundColor: "#F7F9FA",
		borderRadius: "0 0 4px 4px",
		"&.rna-editor-expanded--sequence-edit-mode": {
			padding: "8px",
			paddingTop: "10px",
			border: `2px ${e.theme.ketcher.color.editMode.sequenceInRNABuilder} solid`,
			borderTop: "none"
		}
	};
}, ""), Bb = P("input", { target: "e18wzlbg7" })("width:100%;padding:6px;border:none;border-radius:4px;box-shadow:0 1px 2px 0 rgba(180, 185, 214, 0.6);&:hover,&:focus{outline:", function(e) {
	return e.theme.ketcher.outline.selected.small;
}, ";}"), Vb = P("div", { target: "e18wzlbg6" })("width:100%;display:flex;flex-direction:", function(e) {
	return e.compact ? "row" : "column";
}, ";justify-content:", function(e) {
	return e.compact ? "space-between" : "flex-start";
}, ";gap:8px;margin-top:16px;"), Hb = P("div", { target: "e18wzlbg5" })({
	name: "zmhcg5",
	styles: "margin-top:16px;display:flex;justify-content:space-evenly;align-items:center;gap:8px"
}), Ub = P(Ot, { target: "e18wzlbg4" })(function(e) {
	return {
		width: "100%",
		whiteSpace: "nowrap",
		fontSize: e.theme.ketcher.font.size.regular,
		backgroundColor: e.primary ? e.theme.ketcher.color.button.primary.active : void 0,
		color: e.primary && !e.disabled ? e.theme.ketcher.color.button.text.primary : e.theme.ketcher.color.text.light,
		outline: e.primary && !e.disabled ? e.theme.ketcher.outline.selected.small : e.theme.ketcher.outline.grey.small
	};
}, ""), Wb = P("div", { target: "e18wzlbg3" })(function(e) {
	return {
		position: "relative",
		borderRadius: e.theme.ketcher.border.radius.regular,
		backgroundColor: e.theme.ketcher.color.background.primary,
		boxShadow: e.theme.ketcher.shadow.regular,
		cursor: "pointer",
		overflow: "hidden",
		padding: "0 6px 6px 6px",
		display: "flex",
		alignItems: "flex-end",
		height: "48px",
		outline: e.selected ? e.theme.ketcher.outline.selected.medium : "none",
		":hover": { outline: e.selected ? void 0 : e.theme.ketcher.outline.small }
	};
}, ""), Gb = P("span", { target: "e18wzlbg2" })(function(e) {
	return {
		position: "absolute",
		top: "0",
		left: "0",
		width: "100%",
		height: "8px",
		backgroundColor: e.selected ? e.theme.ketcher.outline.selected.color : e.theme.ketcher.outline.color
	};
}, ""), Kb = P(Rt, { target: "e18wzlbg1" })({
	name: "1jdipvd",
	styles: "width:100%;&:disabled{background:none;outline:none;color:inherit;}"
}), qb = P("div", { target: "e18wzlbg0" })({
	name: "1gz2b5f",
	styles: "overflow:hidden;text-overflow:ellipsis"
});
function Jb(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (!n) {
		if (Array.isArray(e) || (n = Yb(e)) || t && e && typeof e.length == "number") {
			n && (e = n);
			var r = 0, i = function() {};
			return {
				s: i,
				n: function() {
					return r >= e.length ? { done: !0 } : {
						done: !1,
						value: e[r++]
					};
				},
				e: function(e) {
					throw e;
				},
				f: i
			};
		}
		throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	var a, o = !0, s = !1;
	return {
		s: function() {
			n = n.call(e);
		},
		n: function() {
			var e = n.next();
			return o = e.done, e;
		},
		e: function(e) {
			s = !0, a = e;
		},
		f: function() {
			try {
				o || n.return == null || n.return();
			} finally {
				if (s) throw a;
			}
		}
	};
}
function Yb(e, t) {
	if (e) {
		if (typeof e == "string") return Xb(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Xb(e, t) : void 0;
	}
}
function Xb(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
var Zb = function(e) {
	return e.size === 0 ? "" : e.size === 1 ? w(e)[0] : "[multiple]";
}, Qb = function(e) {
	if (e != null && e.length) {
		var t = {
			sugarLabel: /* @__PURE__ */ new Set(),
			baseLabel: /* @__PURE__ */ new Set(),
			phosphateLabel: /* @__PURE__ */ new Set()
		}, n = Jb(e), r;
		try {
			for (n.s(); !(r = n.n()).done;) for (var i = r.value, a = 0, o = [
				"sugarLabel",
				"baseLabel",
				"phosphateLabel"
			]; a < o.length; a++) {
				var s = o[a];
				(i != null && i[s] || !(i != null && i[s]) && i.type === at.Nucleoside && !i.isNucleosideConnectedAndSelectedWithPhosphate) && t[s].add(i?.[s]);
			}
		} catch (e) {
			n.e(e);
		} finally {
			n.f();
		}
		return {
			Sugars: Zb(t.sugarLabel),
			Bases: Zb(t.baseLabel),
			Phosphates: Zb(t.phosphateLabel)
		};
	}
}, $b = function(e) {
	var t = Qb(e);
	return `${t?.Sugars}(${t?.Bases})${t?.Phosphates ?? ""}`;
}, ex = function(e) {
	e(Cv(null)), e(Dv(!1));
}, tx = function(e) {
	ex(e);
}, nx = function(e, t) {
	ex(e), e(_v([])), t?.events.turnOffSequenceEditInRNABuilderMode.dispatch(), t?.mode instanceof te && t.mode.turnOffEditMode();
}, rx = function(e) {
	return e.filter(function(e) {
		return e.type ? e.type === at.Nucleotide || e.type === at.Nucleoside : e.node ? e.node instanceof A || e.node instanceof T : !1;
	}).length;
};
function ix(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function ax(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? ix(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ix(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var ox = function(e) {
	var t = e.isEditMode, n = e.onDuplicate, r = [
		{
			groupName: G.SUGARS,
			iconName: "sugar",
			testId: "rna-builder-slot--sugar"
		},
		{
			groupName: G.BASES,
			iconName: "base",
			testId: "rna-builder-slot--base"
		},
		{
			groupName: G.PHOSPHATES,
			iconName: "phosphate",
			testId: "rna-builder-slot--phosphate"
		}
	], i = Bt(), a = X($_), o = X(uv), s = X(Z_), c = X(W), l = X(mv), u = X(iv), d = I((0, z.useState)(a), 2), f = d[0], p = d[1], m = X(ev), h = X(tv), g = X(yg), _ = I((0, z.useState)(!1), 2), v = _[0], y = _[1], b = I((0, z.useState)(Qb(m)), 2), x = b[0], S = b[1], C = Ay() === "sequence-layout-mode", w = function() {
		if (u) {
			var e = J_[u.groupName], t = ax(ax({}, f), {}, M({}, e, u.groupItem));
			return p(t), t;
		}
		return f;
	};
	(0, z.useEffect)(function() {
		p(a);
	}, [a]), (0, z.useEffect)(function() {
		m && (rx(m) === 1 && i(vv($b(m))), S(Qb(m)));
	}, [i, m]), (0, z.useEffect)(function() {
		if (s !== K_.Presets && t) if (g && u) {
			var e = `${J_[u.groupName]}Label`, n = m.map(function(t) {
				return t.isNucleosideConnectedAndSelectedWithPhosphate && e === "phosphateLabel" || t.type === at.Phosphate && (e === "sugarLabel" || e === "baseLabel") ? t : ax(ax({}, t), {}, M(M({}, e, u.groupItem.label), "rnaBaseMonomerItem", u.groupName === "Bases" ? u.groupItem : t.rnaBaseMonomerItem));
			});
			y(!0), i(_v(n));
		} else {
			var r = w(), a = f?.name;
			r.editedName || (a = sv(r)), p(ax(ax({}, r), {}, { name: a }));
		}
	}, [u?.groupItem, g]);
	var T = function(e, t) {
		if (e === K_.Presets) {
			dx(f?.name), f && c?.events.selectPreset.dispatch(f);
			return;
		}
		var n = f[J_[e]];
		n ? fx($g(n)) : t && fx(t);
	}, E = function(e) {
		return function() {
			var n = rv(f, e);
			n && !C && c?.events.selectMonomer.dispatch(n), f[J_[e]] && i(xv($g(f[J_[e]]))), i(bv(e)), i(Sv({
				rnaPreset: f,
				isEditMode: t
			}));
			var r = "";
			if (g && m.length > 0) {
				var a = m[0].baseLabel;
				if (a && m.every(function(e) {
					return e.baseLabel === a;
				})) {
					var o = m[0].rnaBaseMonomerItem;
					o && (r = $g(o), i(xv(r)));
				}
			}
			setTimeout(function() {
				return T(e, r);
			}, 100);
		};
	}, D = function(e) {
		if (t) {
			var n = e.target.value;
			p(ax(ax({}, f), {}, {
				name: n.trim(),
				editedName: !0
			}));
		}
	}, O = function() {
		rx(m) > 1 ? i(S_("updateSequenceInRNABuilder")) : (c?.events.modifySequenceInRnaBuilder.dispatch(m), nx(i, c));
	}, k = function() {
		if (f != null && f.name) {
			var e = l.find(function(e) {
				return e.name === f.name;
			});
			if (e && a.nameInList !== e.name) {
				i(Ov(f.name));
				return;
			}
			i(wv(f)), i(gv(f)), C || c?.events.selectPreset.dispatch(f), setTimeout(function() {
				dx(f.name);
			}, 0), tx(i);
		}
	}, ee = function() {
		g ? nx(i, c) : (p(a), tx(i));
	}, te = function() {
		i(Dv(!0));
	}, ne = function(e) {
		return u && u.groupName === e ? u.groupItem.label : (rv(f, e)?.label ?? rv(f, e)?.props.MonomerName) || void 0;
	}, re = function(e) {
		return x ? x[e] : "";
	};
	(0, z.useEffect)(function() {
		var e = function(e) {
			e.key === "Escape" ? (ee(), e.preventDefault(), e.stopPropagation()) : e.key === "Enter" && (g ? O() : c?.events.startNewSequence.dispatch({}), e.preventDefault(), e.stopPropagation());
		};
		return c?.events.keyDown.add(e), function() {
			c?.events.keyDown.remove(e);
		};
	}, [c, m]);
	var A = o && !g ? V(Ub, {
		disabled: !av(f),
		primary: !0,
		"data-testid": "add-to-presets-btn",
		onClick: k,
		children: "Add to Presets"
	}) : t ? V(Ub, {
		primary: !0,
		disabled: g ? !v : !1,
		"data-testid": "save-btn",
		onClick: g ? O : k,
		children: g ? "Update" : "Save"
	}) : V(Ub, {
		"data-testid": "edit-btn",
		onClick: te,
		disabled: a.default,
		children: "Edit"
	}), j = Fy();
	return H(zb, {
		"data-testid": "rna-editor-expanded",
		className: Qt(g && "rna-editor-expanded--sequence-edit-mode"),
		children: [
			j ? V(Bb, {
				value: g ? h : f?.name,
				placeholder: "Name your structure",
				"data-testid": "name-your-structure-editbox",
				disabled: g,
				onChange: D
			}) : H(Wb, {
				selected: s === K_.Presets,
				onClick: function() {
					return E(K_.Presets);
				},
				children: [t ? V(Kb, {
					value: g ? h : f?.name,
					placeholder: "Name your structure",
					"data-testid": "name-your-structure-editbox",
					disabled: g,
					onChange: D
				}) : V(qb, { children: f?.name }), V(Gb, { selected: s === K_.Presets })]
			}),
			V(Vb, {
				compact: j,
				children: r.map(function(e) {
					var t = e.groupName, n = e.iconName, r = e.testId;
					return V(Rb, {
						selected: s === t,
						groupName: t,
						monomerName: g ? re(t) : ne(t),
						iconName: n,
						testid: r,
						onClick: E(t)
					}, t);
				})
			}),
			H(Hb, { children: [t ? V(Ub, {
				"data-testid": "cancel-btn",
				onClick: ee,
				children: "Cancel"
			}) : V(Ub, {
				"data-testid": "duplicate-btn",
				disabled: !av(f),
				onClick: function() {
					return n(f);
				},
				children: "Duplicate and Edit"
			}), A] })
		]
	});
}, sx = P("div", { target: "e1ms1w5g2" })({
	name: "1tk8yx0",
	styles: "padding:8px"
}), cx = P("button", { target: "e1ms1w5g1" })("width:100%;display:flex;justify-content:space-between;align-items:center;padding:8px;background-color:", function(e) {
	return e.theme.ketcher.color.background.primary;
}, ";font-weight:", function(e) {
	return e.theme.ketcher.font.weight.regular;
}, ";font-size:", function(e) {
	return e.theme.ketcher.font.size.regular;
}, ";border:none;border-radius:4px;text-transform:none;cursor:pointer;&.styled-header--sequence-edit-mode{background-color:", function(e) {
	return e.theme.ketcher.color.editMode.sequenceInRNABuilder;
}, ";}&.styled-header--expanded,&.styled-header--active-preset{border-radius:4px 4px 0 0;}"), lx = P(F, { target: "e1ms1w5g0" })("height:16px;width:16px;transform:", function(e) {
	return e.expanded ? "rotate(180deg)" : "none";
}, ";"), ux = function(e) {
	document.body.querySelector(e)?.scrollIntoView();
}, dx = function(e) {
	ux(`[data-rna-preset-item-name="${e}"]`);
}, fx = function(e) {
	ux(`[data-monomer-item-id="${e}"]`);
}, px = function(e) {
	var t = e.duplicatePreset, n = X($_), r = X(ov), i = X(yg), a = sv(n), o = Y(), s = I((0, z.useState)(!1), 2), c = s[0], l = s[1];
	return (0, z.useEffect)(function() {
		if (n) {
			(n.name || r) && l(!0);
			return;
		}
		o(Ev()), o(bv(K_.Presets));
	}, [n]), (0, z.useEffect)(function() {
		o(Sv({
			rnaPreset: n,
			isEditMode: r
		}));
	}, [r]), H(sx, {
		"data-testid": "rna-editor",
		children: [H(cx, {
			className: Qt(i && "styled-header--sequence-edit-mode", c && "styled-header--expanded", n?.name && "styled-header--active-preset"),
			onClick: function() {
				l(!c), n != null && n.nameInList || o(Dv(!0));
			},
			"data-testid": "rna-builder-expand-button",
			children: ["RNA Builder", V(lx, {
				expanded: c,
				name: "chevron"
			})]
		}), n && (c ? V(ox, {
			isEditMode: r,
			onDuplicate: t
		}) : V(Sb, {
			name: n.name,
			fullName: a
		}))]
	});
}, mx = P("div", { target: "e1ocltcl0" })({
	name: "16fpk5u",
	styles: "height:100%;width:100%;display:flex;flex-direction:column;justify-content:space-between"
}), hx = function(e) {
	var t = e.ketcher;
	return Zt("scrollbar-width:thin;scrollbar-color:", t.color.scroll.regular, " ", t.color.scroll.inactive, ";&::-webkit-scrollbar{width:4px;height:4px;background-color:", t.color.scroll.inactive, ";border-radius:2px;-webkit-border-radius:2px;}&::-webkit-scrollbar-thumb{background-color:", t.color.scroll.regular, ";border-radius:2px;-webkit-border-radius:2px;}&::-webkit-scrollbar-thumb:active{background-color:", t.color.scroll.regular, ";}", "");
}, gx = { expandButton: "Modal-module_expandButton__J1QYl" };
function _x(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function vx(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? _x(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : _x(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var yx = P(_r, { target: "e45wfhi5" })({
	name: "dzuq2w",
	styles: ".MuiPaper-root{min-width:304px;}"
}), bx = P(Nr, { target: "e45wfhi4" })(function(e) {
	var t = e.theme, n = e.hideborder;
	return {
		padding: "2px 4px 2px 12px",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		fontFamily: `${t.ketcher.font.family.inter}`,
		fontSize: `${t.ketcher.font.size.medium}`,
		fontWeight: 500,
		textTransform: "capitalize",
		borderBottom: n ? "none" : "1px solid rgba(202, 211, 221, 1)"
	};
}, ""), xx = P("div", { target: "e45wfhi3" })({
	name: "10by1a4",
	styles: "margin-right:10px;font-size:14px"
}), Sx = P(F, { target: "e45wfhi2" })({
	name: "4jxctt",
	styles: "width:16px;height:16px;color:rgba(51, 51, 51, 1)"
}), Cx = P(kr, { target: "e45wfhi1" })("padding:0;font-size:", function(e) {
	return e.theme.ketcher.font.size.medium;
}, ";line-height:17px;color:#000000;", function(e) {
	var t = e.theme;
	return hx(t);
}, ";"), wx = P(Sr, { target: "e45wfhi0" })("height:52px;margin:0;padding:0 12px;border-top:", function(e) {
	var t = e.theme;
	return e.withborder === "true" ? t.ketcher.border.small : "none";
}, ";justify-content:flex-end;.MuiButtonBase-root{border-radius:4px;font-size:", function(e) {
	return e.theme.ketcher.font.size.regular;
}, ";}"), Z = function(e) {
	var t = e.children, n = e.title, r = e.isOpen, i = e.showCloseButton, a = i === void 0 ? !0 : i, o = e.showExpandButton, s = o === void 0 ? !1 : o, c = e.onClose, l = e.className, u = e.modalWidth, d = e.expanded, f = d === void 0 ? !1 : d, p = e.setExpanded, m = p === void 0 ? wy : p, h = e.testId, g = e.hideHeaderBorder, _ = St(), v = (0, z.useMemo)(function() {
		return vx(vx({}, h ? { testid: h } : {}), {}, {
			"data-testid": h,
			style: vx({
				background: _.ketcher.color.background.primary,
				borderRadius: "8px",
				color: _.ketcher.color.text.primary
			}, s && {
				margin: "auto",
				width: f ? "100%" : u,
				height: f ? "100%" : void 0,
				maxWidth: "calc(min(1280px, 100%))",
				maxHeight: "calc(min(980px, 100%))"
			})
		});
	}, [
		h,
		_.ketcher.color.text.primary,
		_.ketcher.color.background.canvas,
		f
	]), y = (0, z.useMemo)(function() {
		return { style: {
			background: _.ketcher.color.background.overlay,
			opacity: .4
		} };
	}, [_.ketcher.color.background.overlay]), b = {
		Content: null,
		Footer: null
	};
	return z.Children.forEach(t, function(e) {
		e.type === Cx ? b.Content = e : e.type === wx && (b.Footer = e);
	}), H(yx, {
		BackdropProps: y,
		PaperProps: v,
		open: r,
		onClose: c,
		container: document.querySelector(On),
		disableEscapeKeyDown: !a,
		className: l,
		sx: { padding: "24px" },
		children: [
			n || a || s ? H(bx, {
				hideborder: g,
				children: [V(xx, { children: n }), H("span", { children: [s && V(ze, {
					title: f ? "Minimize window" : "Expand window",
					"data-testid": "expand-window-button",
					className: gx.expandButton,
					onClick: function() {
						m(!f);
					},
					children: V(Sx, { name: f ? "minimize-expansion" : "expand" })
				}), a && V(ze, {
					title: "Close window",
					onClick: c,
					"data-testid": "close-window-button",
					children: V(Sx, { name: "close" })
				})] })]
			}) : "",
			b.Content,
			b.Footer
		]
	});
};
Z.Content = Cx, Z.Footer = wx;
var Tx = P("div", { target: "e117eqk610" })({
	name: "uawiic",
	styles: "display:flex;flex-direction:column;justify-content:flex-start;overflow:hidden;height:100%"
}), Ex = P(hn, { target: "e117eqk69" })({
	name: "u6kpdv",
	styles: "min-height:32px"
}), Dx = P("div", { target: "e117eqk68" })({
	name: "vz8pb8",
	styles: "flex-grow:2;min-height:32px"
}), Ox = P("div", { target: "e117eqk67" })("position:relative;width:100%;display:flex;flex-direction:column;gap:8px;justify-content:start;padding:", function(e) {
	return e.compact ? "4px" : "8px";
}, ";"), kx = P("div", { target: "e117eqk66" })({
	name: "6imefc",
	styles: "flex-grow:1;min-height:0;background-color:#f7f9fa;border-radius:4px;margin:4px 8px;padding:4px;&.first-tab{border-radius:0 4px 4px 4px;}&.last-tab{border-radius:4px 0 4px 4px;}"
}), Ax = P("div", { target: "e117eqk65" })("height:100%;background-color:", function(e) {
	return e.theme.ketcher.color.tab.content;
}, ";border-radius:2px;overflow:auto;"), jx = P(Ot, { target: "e117eqk64" })("background-color:", function(e) {
	return e.theme.ketcher.color.button.transparent.active;
}, ";color:", function(e) {
	return e.theme.ketcher.color.text.light;
}, ";border-color:", function(e) {
	return e.theme.ketcher.color.text.light;
}, ";"), Mx = P("div", { target: "e117eqk63" })({
	name: "1q5khk2",
	styles: "width:100%;height:100%;background-color:#eff2f594;position:absolute;top:0;left:0"
}), Nx = P("div", { target: "e117eqk62" })({
	name: "bimmx8",
	styles: "display:flex;justify-content:space-between;gap:8px;padding:6px 8px 0"
}), Px = P("div", { target: "e117eqk61" })({
	name: "qnk899",
	styles: "position:relative;display:flex;align-items:center;&.rna-tab--selected{& button{border-radius:4px 4px 0 0;background-color:#f7f9fa;}&::after{content:'';position:absolute;bottom:-4px;left:0;right:0;height:8px;background-color:#f7f9fa;}}"
}), Fx = P(b, { target: "e117eqk60" })("height:24px;min-height:24px;min-width:24px;", function(e) {
	return e.selected ? "min-width: 104px;" : "";
}, " display:flex;flex-direction:row;gap:4px;align-items:center;justify-content:center;padding:4px;", function(e) {
	return e.selected ? "margin-top: -8px;" : "";
}, " font-weight:400;font-size:10px;border-radius:4px;background-color:white;opacity:", function(e) {
	return e.selected ? 1 : .6;
}, ";text-transform:none;&:hover{background-color:#f3f8f9;}>svg{height:16px;width:16px;color:#b4b9d6;&.MuiTab-iconWrapper{margin:0;}}");
function Ix(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Lx(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Ix(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ix(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var Rx = function(e) {
	var t = X(h_), n = X(hv), r = g_(u_(t, e)), i = g_(f_(t));
	return (0, z.useMemo)(function() {
		return [
			{
				groupName: K_.Presets,
				iconName: "preset",
				groups: [{ groupItems: n }]
			},
			{
				groupName: G.SUGARS,
				iconName: "sugar",
				groups: r.map(function(e) {
					return Lx(Lx({}, e), {}, { groupItems: e.groupItems.filter(function(e) {
						return e.props?.MonomerClass === S.Sugar;
					}) });
				}).filter(function(e) {
					return e.groupItems.length;
				})
			},
			{
				groupName: G.BASES,
				iconName: "base",
				groups: r.map(function(e) {
					return Lx(Lx({}, e), {}, { groupItems: e.groupItems.filter(function(e) {
						return e.props?.MonomerClass === S.Base;
					}) });
				}).filter(function(e) {
					return e.groupItems.length;
				})
			},
			{
				groupName: G.PHOSPHATES,
				iconName: "phosphate",
				groups: r.map(function(e) {
					return Lx(Lx({}, e), {}, { groupItems: e.groupItems.filter(function(e) {
						return e.props?.MonomerClass === S.Phosphate;
					}) });
				}).filter(function(e) {
					return e.groupItems.length;
				})
			},
			{
				groupName: G.NUCLEOTIDES,
				iconName: "nucleotide",
				groups: i
			}
		];
	}, [
		r,
		n,
		i
	]);
}, zx = (0, z.memo)(function(e) {
	var t = e.activeRnaBuilderItem, n = e.groupsData, r = e.onNewPresetClick, i = e.onSelectItem, a = e.duplicatePreset, o = e.editPreset, s = e.libraryName, c = Bt(), l = X(hv), u = X(h_), d = X(ov), f = X(uv), p = X(pv);
	return H(B, { children: [V(Nx, { children: n.map(function(e) {
		var n = e.groupName, r = e.groups, i = e.iconName, a = n === t, o = d_(u, n), s = [].concat(w(r), w(o)).reduce(function(e, t) {
			return e + (t.groupItems.length || 0);
		}, 0), l = a ? `${n} (${s})` : null;
		return V(Px, {
			className: Qt(a && "rna-tab--selected"),
			children: V(Fx, {
				label: l,
				title: n,
				selected: a,
				icon: V(F, { name: i }),
				onClick: function() {
					return c(bv(n));
				},
				"data-testid": `summary-${n}`
			})
		}, n);
	}) }), n.map(function(e) {
		var n = e.groupName, c = e.groups;
		if (n !== t) return null;
		var m = d_(u, n), h = n === K_.Presets ? H(Ox, {
			compact: !0,
			children: [
				V(jx, {
					onClick: r,
					"data-testid": "new-preset-button",
					children: "New Preset"
				}),
				V(_b, {
					duplicatePreset: a,
					editPreset: o,
					presets: l
				}),
				d && !f && V(Mx, {})
			]
		}) : V(Ox, {
			compact: !0,
			children: H(B, { children: [c.map(function(e) {
				var t = e.groupItems, r = e.groupTitle;
				return V(ab, {
					title: c.length > 1 ? r : void 0,
					groupName: n,
					items: t,
					selectedMonomerUniqueKey: p,
					onItemClick: function(e) {
						return i(e, n);
					}
				}, r);
			}), m.map(function(e) {
				var t = e.groupTitle, r = e.groupItems;
				return V(ab, {
					title: t,
					items: r,
					libraryName: s,
					selectedMonomerUniqueKey: p,
					onItemClick: function(e) {
						return i(e, n);
					}
				}, t);
			})] })
		}), g = t === K_.Presets, _ = t === G.NUCLEOTIDES;
		return V(kx, {
			className: Qt(g && "first-tab", _ && "last-tab"),
			children: V(Ax, { children: h })
		}, n);
	})] });
}), Bx = function(e) {
	var t = e.groupName, n = e.quantity, r = e.expanded, i = e.iconName;
	return H(cb, {
		"data-testid": `summary-${t}`,
		children: [
			V(ub, { name: i }),
			H(lb, { children: [
				t,
				" (",
				n,
				")"
			] }),
			V(ub, {
				name: "chevron",
				expanded: r
			})
		]
	});
}, Vx = (0, z.memo)(function(e) {
	var t = e.activeRnaBuilderItem, n = e.groupsData, r = e.newPreset, i = e.onNewPresetClick, a = e.onSelectItem, o = e.duplicatePreset, s = e.editPreset, c = e.libraryName, l = Bt(), u = X(hv), d = X(h_), f = X(ov), p = X(uv), m = X(pv), h = I((0, z.useState)(t), 2), g = h[0], _ = h[1], v = function(e) {
		g === e ? _(null) : (_(e), l(Sv({
			rnaPreset: r,
			isEditMode: f
		})));
	};
	return (0, z.useEffect)(function() {
		_(t);
	}, [t]), V(B, { children: n.map(function(e) {
		var t = g === e.groupName, n = d_(d, e.groupName), r = [].concat(w(e.groups), w(n)).reduce(function(e, t) {
			return e + (t.groupItems.length || 0);
		}, 0), l = V(Bx, {
			iconName: e.iconName,
			groupName: e.groupName,
			quantity: r,
			expanded: t
		}), h = e.groupName === K_.Presets ? H(Ox, { children: [
			V(jx, {
				onClick: i,
				"data-testid": "new-preset-button",
				children: "New Preset"
			}),
			V(_b, {
				duplicatePreset: o,
				editPreset: s,
				presets: u
			}),
			f && !p && V(Mx, {})
		] }) : V(Ox, { children: H(B, { children: [e.groups.map(function(t) {
			var n = t.groupItems, r = t.groupTitle;
			return V(ab, {
				title: [
					G.BASES,
					G.NUCLEOTIDES,
					G.PEPTIDES
				].includes(e.groupName) ? r : void 0,
				groupName: e.groupName,
				items: n,
				selectedMonomerUniqueKey: m,
				onItemClick: function(t) {
					return a(t, e.groupName);
				}
			}, r);
		}), n.map(function(t) {
			return V(ab, {
				title: t.groupTitle,
				items: t.groupItems,
				libraryName: c,
				selectedMonomerUniqueKey: m,
				onItemClick: function(t) {
					return a(t, e.groupName);
				}
			}, t.groupTitle);
		})] }) });
		return e.groupName === K_.Presets && t ? V(Dx, { children: V(Ex, {
			"data-testid": "styled-accordion",
			dataTestIdDetails: `rna-accordion-details-${e.groupName}`,
			summary: l,
			details: h,
			expanded: t,
			onSummaryClick: function() {
				return v(e.groupName);
			}
		}) }, e.groupName) : V(Ex, {
			"data-testid": "styled-accordion",
			dataTestIdDetails: `rna-accordion-details-${e.groupName}`,
			summary: l,
			details: h,
			expanded: t,
			onSummaryClick: function() {
				return v(e.groupName);
			}
		}, e.groupName);
	}) });
});
function Hx(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Ux(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Hx(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Hx(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var Wx = function(e) {
	var t = e.view, n = e.libraryName, r = e.duplicatePreset, i = e.editPreset, a = Bt(), o = X(Z_), s = X($_), c = X(ov), l = X(W), u = X(yg), d = I((0, z.useState)(s), 2), f = d[0], p = d[1];
	(0, z.useEffect)(function() {
		a(bv(c && s ? o : K_.Presets));
	}, [c]);
	var m = Rx(n), h = (0, z.useCallback)(function() {
		a(Ev()), a(bv(K_.Presets)), a(Dv(!0));
	}, [a]), g = (0, z.useCallback)(function(e, t) {
		if (c && a(xv($g(e))), !u && !c && l?.events.selectMonomer.dispatch(e), c) {
			var n = bn(e) ? e.monomers[0].monomerItem.props.MonomerClass?.toLowerCase() : e.props.MonomerClass.toLowerCase();
			p(Ux(Ux({}, f), {}, M({}, n, e))), a(Cv({
				groupName: t,
				groupItem: e
			})), a(bv(t));
		}
	}, [
		a,
		l,
		c,
		u,
		f
	]);
	return V(Tx, {
		"data-testid": "rna-accordion",
		children: t === "tabs" ? V(zx, {
			activeRnaBuilderItem: o,
			groupsData: m,
			onNewPresetClick: h,
			onSelectItem: g,
			libraryName: n,
			editPreset: i,
			duplicatePreset: r
		}) : V(Vx, {
			activeRnaBuilderItem: o,
			groupsData: m,
			newPreset: f,
			onNewPresetClick: h,
			onSelectItem: g,
			libraryName: n,
			editPreset: i,
			duplicatePreset: r
		})
	});
}, Gx = function(e) {
	var t = e.libraryName, n = e.duplicatePreset, r = e.editPreset, i = Y(), a = X(cv), o = X(lv), s = Fy(), c = function() {
		a.length > 0 && i(Ov("")), o.length > 0 && i(kv(""));
	};
	return H(mx, { children: [
		V(px, { duplicatePreset: n }),
		V(Wx, {
			libraryName: t,
			duplicatePreset: n,
			editPreset: r,
			view: s ? "tabs" : "accordion"
		}),
		H(Z, {
			isOpen: !!a || !!o,
			title: "Error Message",
			onClose: c,
			children: [V(Z.Content, { children: H("div", {
				style: { padding: "12px" },
				children: [a && `Preset with name "${a}" already exists. Please choose another name.`, o && `Preset with name "${o}" can't be used. Because it is impossible to establish bonds between monomers. Edit it's structure or choose another one.`]
			}) }), V(Z.Footer, { children: V(jx, {
				onClick: c,
				children: "Close"
			}) })]
		})
	] });
}, Kx = function(e, t) {
	return [
		{
			caption: qg,
			tooltip: "Favorites",
			component: vb,
			testId: "FAVORITES-TAB",
			props: {
				libraryName: Ig,
				duplicatePreset: e,
				editPreset: t
			}
		},
		{
			caption: "Peptides",
			component: vb,
			testId: "PEPTIDES-TAB",
			props: { libraryName: Rg.PEPTIDE }
		},
		{
			caption: "RNA",
			testId: "RNA-TAB",
			component: Gx,
			props: {
				libraryName: Rg.RNA,
				duplicatePreset: e,
				editPreset: t
			}
		},
		{
			caption: "CHEM",
			component: vb,
			testId: "CHEM-TAB",
			props: { libraryName: Rg.CHEM }
		}
	];
};
function qx(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Jx(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? qx(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : qx(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var Yx = "_Copy", Xx = function(e) {
	var t = e.toggleLibraryVisibility, n = (0, z.useRef)([]), r = Y(), i = X(__);
	(0, z.useEffect)(function() {
		r(s_(""));
	}, [r]), X(mv, function(e) {
		return n.current = e, !0;
	});
	var a = (0, z.useCallback)(function(e) {
		r(s_(e.target.value));
	}, [r]), o = (0, z.useCallback)(function(e) {
		var t = `${e?.name}${Yx}`, i;
		do
			i = n.current.find(function(e) {
				return e.name === t;
			}), i && (t += Yx);
		while (i);
		if (i) {
			r(Ov(t));
			return;
		}
		var a = i ? `${t}${Yx}` : t;
		r(gv(Jx(Jx({}, e), {}, {
			name: a,
			nameInList: a,
			default: !1,
			favorite: !1
		}))), r(Dv(!0)), dx(e?.name);
	}, [r]), s = (0, z.useCallback)(function(e) {
		r(gv(e)), r(Dv(!0));
	}, [r]), c = (0, z.useMemo)(function() {
		return Kx(o, s);
	}, [o, s]), l = (0, z.useCallback)(function(e, t) {
		r(c_(t));
	}, [r]);
	return H(Wv, {
		"data-testid": "monomer-library",
		children: [H(Gv, { children: [H(Kv, { children: [V(Jv, { name: "search" }), V(Yv, {
			type: "search",
			"data-testid": "monomer-library-input",
			onChange: a,
			placeholder: "Search by name..."
		})] }), V(qv, {
			title: "Hide library",
			onClick: t,
			"data-testid": "hide-monomer-library",
			children: V(F, { name: "arrows-right" })
		})] }), V(Cy, {
			tabs: c,
			selectedTabIndex: i,
			onChange: l
		})]
	});
}, Zx = P("div", { target: "emj253a0" })(function(e) {
	var t = e.theme;
	return {
		margin: 0,
		fontSize: t.ketcher.font.size.regular,
		position: "absolute",
		top: "12px",
		cursor: "pointer",
		visibility: "visible",
		opacity: 1,
		whiteSpace: "nowrap",
		display: "flex",
		alignItems: "center",
		lineHeight: 1,
		userSelect: "none",
		backgroundColor: t.ketcher.color.button.primary.active,
		color: t.ketcher.color.button.text.primary,
		right: "12px",
		padding: "10px 8px",
		borderRadius: "4px",
		"& > span": {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			"&.icon": { marginRight: "2px" }
		}
	};
}, ""), Qx = function(e) {
	var t = e.onClick;
	return H(Zx, {
		onClick: t,
		"data-testid": "show-monomer-library",
		children: [
			V("span", {
				className: "icon",
				children: V(F, { name: "arrows-left" })
			}),
			" ",
			"Show Library"
		]
	});
}, $x = P("div", { target: "e10ckbgw0" })("display:flex;flex-direction:row;justify-content:space-between;align-items:flex-start;width:40px;height:12px;margin-top:10px;& span{display:inline-block;width:8px;height:8px;border:2px solid ", function(e) {
	return e.theme.ketcher.color.spinner;
}, ";border-radius:100%;box-sizing:border-box;&:nth-of-type(1){animation:bounce 1s ease-in-out infinite;}&:nth-of-type(2){animation:bounce 1s ease-in-out 0.33s infinite;}&:nth-of-type(3){animation:bounce 1s ease-in-out 0.66s infinite;}}@keyframes bounce{0%,75%,100%{-webkit-transform:translateY(0);-ms-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0);}25%{-webkit-transform:translateY(-100%);-ms-transform:translateY(-100%);-o-transform:translateY(-100%);transform:translateY(-100%);}}"), eS = function() {
	return H($x, {
		className: "loading-spinner",
		"data-testid": "loading-spinner",
		children: [
			V("span", {}),
			V("span", {}),
			V("span", {})
		]
	});
}, tS = "file-thumbnail", nS = P("div", { target: "ep0evuw1" })({
	name: "1btsn9l",
	styles: "width:410px;min-height:23em;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center"
}), rS = P("div", { target: "ep0evuw0" })({
	name: "vbftiw",
	styles: "display:flex;flex-direction:row;align-items:center;svg{margin-right:13px;}p{color:#585858;font-size:16px;line-height:19px;}"
}), iS = function(e) {
	var t = e.fileName;
	return H(nS, { children: [t && H(rS, { children: [V(F, { name: tS }), V("p", { children: t })] }), V(eS, {})] });
}, aS = [
	"textLabel",
	"iconName",
	"disabled",
	"disabledText"
];
function oS(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function sS(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? oS(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : oS(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var cS = {
	width: "100%",
	height: "100%",
	display: "flex",
	alignItems: "center",
	flexDirection: "column",
	justifyContent: "space-between"
}, lS = P(F, { target: "erk2iw52" })("filter:", function(e) {
	return e.disabled ? "grayscale(1)" : "";
}, ";opacity:", function(e) {
	return e.disabled ? "0.6" : "1";
}, ";"), uS = { backgroundColor: "#F8FEFFFF" }, dS = P("div", { target: "erk2iw51" })("display:flex;flex-direction:column;align-items:center;&>span{font-size:", function(e) {
	return e.theme.ketcher.font.size.small;
}, ";color:", function(e) {
	return e.theme.ketcher.color.text.primary;
}, ";opacity:50%;}&>svg{margin-bottom:8px;}"), fS = P("button", { target: "erk2iw50" })({
	name: "1tt0jw3",
	styles: "all:unset;width:100%;height:100%;display:flex;align-items:center;flex-direction:column;justify-content:space-between;cursor:pointer;&:disabled{cursor:default;}"
}), pS = function(e) {
	var t = e.textLabel, n = e.iconName, r = e.disabled, i = e.disabledText, a = It(e, aS), o = Cn(sS({
		multiple: !1,
		noClick: !0,
		disabled: r
	}, a)), s = o.getRootProps, c = o.getInputProps, l = o.isDragActive, u = o.open;
	return H(fS, sS(sS({}, s({ style: (0, z.useMemo)(function() {
		return sS(sS({}, cS), l ? uS : {});
	}, [l]) })), {}, {
		role: void 0,
		onClick: u,
		onKeyDown: function(e) {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), r || u());
		},
		tabIndex: r ? -1 : 0,
		disabled: r,
		type: "button",
		children: [
			V("input", sS({}, c())),
			V(lS, {
				name: n,
				disabled: r
			}),
			r ? V(gS, { children: i }) : H(B, { children: [V(dS, { children: t && V("span", { children: t }) }), V(hS, { children: "Open from file" })] })
		]
	}));
}, mS = {
	PASTE: "open-window-paste-icon",
	FILE: "open-window-upload-icon",
	IMAGE: "image-frame"
}, hS = P("p", { target: "e1035cyz3" })("font-size:10px;text-transform:uppercase;color:", function(e) {
	return e.theme.ketcher.color.text.light;
}, ";margin:0;text-align:center;line-height:12px;"), gS = P("p", { target: "e1035cyz2" })("font-size:10px;margin:0;text-align:center;color:", function(e) {
	return e.theme.ketcher.color.text.primary;
}, ";opacity:50%;line-height:12px;"), _S = P("div", { target: "e1035cyz1" })({
	name: "h9hj7s",
	styles: "display:flex;flex-direction:row;justify-content:space-between;align-items:flex-start;margin-bottom:20px;&>*{margin-right:18px;}& :last-child{margin-right:0;}"
}), vS = P("div", { target: "e1035cyz0" })("width:128px;height:134px;box-shadow:0 4px 12px rgba(103, 104, 132, 0.18);padding:16px;border-radius:12px;flex:1;display:flex;flex-direction:column;justify-content:space-between;align-items:center;box-sizing:border-box;position:relative;cursor:pointer;&>p{margin-top:6px;text-align:center;}svg{fill:", function(e) {
	return e.theme.ketcher.color.button.primary.active;
}, ";}"), yS = function(e) {
	var t = e.selectClipboard, n = e.fileLoadHandler, r = e.errorHandler;
	return H(_S, { children: [
		H(vS, {
			"data-testid": "paste-from-clipboard-button",
			onClick: t,
			children: [V(F, { name: mS.PASTE }), V(hS, { children: "Paste from clipboard" })]
		}),
		V(vS, {
			"data-testid": "open-from-file-button",
			children: V(pS, {
				onDropAccepted: n,
				onDropRejected: function(e) {
					return r(`Unable to accept file(s). ${e}`);
				},
				buttonLabel: "Open from file",
				textLabel: "or drag file here",
				iconName: mS.FILE
			})
		}),
		V(vS, {
			"data-testid": "open-from-image-button",
			children: V(pS, {
				accept: "image/*",
				onDropAccepted: n,
				onDropRejected: function(e) {
					return r(`Unable to accept file(s). ${e}`);
				},
				buttonLabel: "Open from image",
				textLabel: "or drag file here",
				iconName: mS.IMAGE,
				disabled: !0,
				disabledText: "Image Recognition service is not available"
			})
		})
	] });
}, bS = P("textarea", { target: "e1q335jk0" })("min-width:430px;padding:12px;width:100%;height:100%;overflow:auto;white-space:pre-wrap;resize:none;box-sizing:border-box;outline:transparent;border:none;color:", function(e) {
	return e.theme.ketcher.color.input.text.active;
}, ";font-size:", function(e) {
	return e.theme.ketcher.font.size.regular;
}, ";background-color:", function(e) {
	var t = e.theme;
	return e.readOnly ? t.ketcher.color.input.background.disabled : t.ketcher.color.input.background.primary;
}, ";", function(e) {
	var t = e.theme;
	return hx(t);
}, ";"), xS = function(e) {
	var t = e.value, n = e.inputHandler, r = e.readonly, i = r === void 0 ? !1 : r, a = e.selectOnInit, o = a === void 0 ? !1 : a, s = e.className, c = e.testId, l = (0, z.useRef)(null);
	return (0, z.useEffect)(function() {
		if (o) {
			var e;
			(e = l.current) == null || e.select();
		}
	}, [
		l,
		t,
		o
	]), V(bS, {
		value: t,
		readOnly: i,
		onChange: n && function(e) {
			return n(e.target.value);
		},
		ref: l,
		className: s,
		"data-testid": c
	});
};
function SS(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function CS(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? SS(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : SS(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var wS = P(xS, { target: "e17hogtk0" })({
	name: "17fmpnb",
	styles: "width:100%;height:320px"
}), TS = function(e) {
	if (e.isAnalyzingFile) return V(iS, { fileName: e.fileName });
	switch (e.currentState) {
		case e.states.openOptions: return V(yS, CS({}, e));
		case e.states.textEditor: return V(wS, CS({ testId: "open-structure-textarea" }, e));
		default: return null;
	}
}, ES = [
	"label",
	"clickHandler",
	"children",
	"styleType"
];
function DS(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function OS(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? DS(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : DS(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var kS = {
	name: "zlt300",
	styles: "padding:5px 8px;border-radius:2px;text-transform:none;line-height:14px;font-size:12px;text-align:center;&.MuiButtonBase-root{width:unset;min-width:70px;}"
}, AS = P(E, { target: "ejign8b1" })(function(e) {
	var t = e.theme;
	return {
		backgroundColor: t.ketcher.color.button.primary.active,
		border: `1px solid ${t.ketcher.color.button.primary.active}`,
		color: "rgb(245, 245, 245)",
		fontWeight: t.ketcher.font.weight.regular,
		width: "62px",
		height: "24px",
		"&:hover": { backgroundColor: t.ketcher.color.button.primary.hover },
		"&:disabled": {
			background: t.ketcher.color.button.primary.disabled,
			border: "1px solid transparent",
			opacity: .4
		}
	};
}, kS, ""), jS = P(E, { target: "ejign8b0" })(function(e) {
	var t = e.theme;
	return {
		backgroundColor: "transparent",
		border: `1px solid ${t.ketcher.color.button.secondary.active}`,
		color: t.ketcher.color.button.secondary.active,
		fontWeight: t.ketcher.font.weight.regular,
		width: "72px",
		height: "24px",
		"&:hover": {
			border: `1px solid ${t.ketcher.color.button.secondary.hover}`,
			color: t.ketcher.color.button.secondary.hover
		},
		"&:disabled": {
			border: `1px solid ${t.ketcher.color.button.secondary.disabled}`,
			color: t.ketcher.color.button.secondary.disabled
		},
		"&:clicked": {
			border: `1px solid ${t.ketcher.color.button.secondary.clicked}`,
			color: t.ketcher.color.button.secondary.clicked
		}
	};
}, kS, ""), MS = function(e) {
	var t = e.label, n = e.clickHandler, r = e.children, i = e.styleType, a = It(e, ES);
	return V(i === "secondary" ? jS : AS, OS(OS({
		onClick: n,
		title: a.title || t
	}, a), {}, { children: r || t }));
};
function NS() {
	return new Promise(function(e, t) {
		globalThis.FileReader ? e(PS) : t(/* @__PURE__ */ Error("Your browser does not support opening files locally"));
	});
}
function PS(e) {
	return new Promise(function(t, n) {
		var r = new FileReader();
		r.onload = function() {
			var n = r.result;
			e.msClose && e.msClose(), t(n);
		}, r.onerror = function(e) {
			n(/* @__PURE__ */ Error(`Failed to read file: ${e.type}`));
		}, r.readAsText(e, "UTF-8");
	});
}
var FS = P("div", { target: "efvrr8x1" })("position:relative;padding:", function(e) {
	return e.currentState === yC.openOptions ? "10px 12px" : "0";
}, ";");
P(MS, { target: "efvrr8x0" })({
	name: "1tx1l5v",
	styles: "margin-right:auto"
}), P(F, { target: "e23iben1" })({
	name: "1ux2zfx",
	styles: "fill:#343434"
});
var IS = P(F, { target: "e23iben0" })({
	name: "wpnrak",
	styles: "user-select:none;width:16px;height:1em;display:inline-block;flex-shrink:0;transition:fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;font-size:1.5rem;position:absolute;right:7px;top:calc(50% - 0.5em);pointer-events:none;fill:#5b6077"
}), LS = function(e) {
	var t = e.className;
	return V(IS, {
		name: "chevron",
		className: t
	});
};
function RS(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function zS(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? RS(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : RS(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var BS = P(ne, { target: "e944g1i2" })({
	name: "1pt8ucq",
	styles: "width:100%;padding:0 8px;& label{font-size:12px;line-height:unset;}"
}), VS = {
	name: "af34ib",
	styles: "background-color:white;border-bottom-left-radius:0;border-bottom-right-radius:0"
}, HS = P(c, { target: "e944g1i1" })("height:24px;border:1px solid #e1e5ea;border-radius:4px;font-size:12px;background-color:white;", function(e) {
	return e.open && VS;
}, " & .MuiSelect-select{padding:0 24px 0 8px;height:100%;display:flex;align-items:center;}& span{", function(e) {
	return `font-size: ${e.theme.ketcher.font.size.regular}`;
}, ";}& .MuiOutlinedInput-notchedOutline{border:0;}"), US = {
	backgroundColor: "white",
	border: "1px solid #5B6077",
	borderTopWidth: "0",
	borderRadius: "0px 0px 2px 2px",
	boxShadow: "0 6px 10px rgba(103, 104, 132, 0.15)"
}, WS = P(Mt, { target: "e944g1i0" })("display:flex;flex-direction:row;justify-content:space-between;padding:0 8px;height:28px;font-size:12px;&.MuiButtonBase-root:hover{border-left:2px solid #167782;}& .MuiTypography-root{", function(e) {
	return `font-size: ${e.theme.ketcher.font.size.regular}`;
}, ";}"), GS = function(e) {
	var t = e.options, n = e.currentSelection, r = e.selectionHandler, i = e.className, a = e.label, o = e.testId, s = e.customStylesForExpanded, c = s === void 0 ? {} : s, l = e.disabled, u = l === void 0 ? !1 : l, d = I((0, z.useState)(!1), 2), f = d[0], p = d[1];
	return H(BS, {
		className: i,
		children: [a && V("label", {
			htmlFor: "fileformat",
			children: "File format:"
		}), V(HS, {
			value: n,
			onChange: function(e) {
				r(e.target.value);
			},
			open: f,
			onOpen: function(e) {
				e.type !== "keydown" && p(!0);
			},
			onClose: function() {
				p(!1);
			},
			renderValue: function(e) {
				var n = t.filter(function(t) {
					return t.id === e;
				})[0];
				return V("span", { children: n.label });
			},
			IconComponent: LS,
			disabled: u,
			fullWidth: !0,
			"data-testid": o ?? "dropdown-select",
			MenuProps: {
				PaperProps: { style: zS(zS({}, US), c) },
				MenuListProps: { style: { padding: "0" } }
			},
			children: t.map(function(e) {
				return V(WS, {
					value: e.id,
					"data-testid": `${e.label}-option`,
					children: V(Lr, { primary: e.label })
				}, e.id);
			})
		})]
	});
}, KS = P("form", { target: "el6v3ot5" })({
	name: "9pd72t",
	styles: "display:flex;flex-direction:column;height:300px"
}), qS = P("div", { target: "el6v3ot4" })({
	name: "itz7qk",
	styles: "display:flex;justify-content:space-between;margin-bottom:16px"
}), JS = P(GS, { target: "el6v3ot3" })(function(e) {
	var t = e.theme;
	return {
		width: "230px",
		height: "28px",
		flexShrink: 0,
		"& .MuiOutlinedInput-root:hover:not(.Mui-disabled)": { border: `1px solid ${t.ketcher.color.input.border.hover}` },
		"& .MuiOutlinedInput-root": {
			border: `1px solid ${t.ketcher.color.input.border.regular}`,
			backgroundColor: t.ketcher.color.background.primary,
			color: t.ketcher.color.text.primary,
			fontFamily: t.ketcher.font.family.inter
		}
	};
}, ""), YS = { border: "none" }, XS = P("div", { target: "el6v3ot2" })({
	name: "kq43v2",
	styles: "position:absolute;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:#fff"
}), ZS = P("div", { target: "el6v3ot1" })(function(e) {
	return {
		height: "100%",
		position: "relative",
		border: `1px solid ${e.theme.ketcher.color.input.border.regular}`,
		"& svg": {
			width: "100%",
			height: "100%",
			"& .drawn-structures": { "& .monomer": { lineHeight: "initial !important" } }
		}
	};
}, ""), QS = P("div", { target: "el6v3ot0" })(function(e) {
	var t = e.theme;
	return {
		display: "flex",
		flexGrow: 1,
		position: "relative",
		"& button": {
			opacity: 0,
			position: "absolute",
			right: "12px",
			top: "12px",
			borderRadius: "4px",
			padding: "2px",
			width: "28px",
			height: "28px",
			"&:not(:active)": {
				backgroundColor: t.ketcher.color.background.primary,
				color: t.ketcher.color.text.primary
			}
		},
		"&:hover button": { opacity: 1 },
		"&:focus-within button": { opacity: 0 },
		"&:focus-within button:hover": { opacity: 1 }
	};
}, ""), $S = P(Z, { target: "e1oaegu38" })(function(e) {
	var t = e.modalWidth;
	return `
    .MuiPaper-root {
      width: ${t};
      max-width: ${t};
    }`;
}, ""), eC = P("div", { target: "e1oaegu37" })({
	name: "kj5rtd",
	styles: "width:100%;display:flex;flex-direction:row;justify-content:space-between;align-items:center"
}), tC = P("div", { target: "e1oaegu36" })({
	name: "rpuipy",
	styles: "display:flex;height:24px;font-size:12px"
}), nC = P(JS, { target: "e1oaegu35" })({
	name: "7nflbq",
	styles: "padding:0;font-size:12px;& .MuiSelect-select{display:flex;align-items:center;padding:0 20px 0 8px;padding-right:20px !important;height:100%;}& span{font-size:12px;}"
}), rC = P(nC, { target: "e1oaegu34" })(function() {
	return { width: "140px" };
}, ""), iC = P(nC, { target: "e1oaegu33" })({
	name: "16zm0c",
	styles: "width:76px;margin-left:8px"
}), aC = P(nC, { target: "e1oaegu32" })({
	name: "l4tg7k",
	styles: "width:105px;margin-left:8px"
}), oC = P("div", { target: "e1oaegu31" })({
	name: "oq6u0f",
	styles: "display:flex;gap:10px"
}), sC = P(MS, { target: "e1oaegu30" })({
	name: "b9l38d",
	styles: "width:min-content"
}), cC = "ket", lC = "seq", uC = "rna", dC = "peptide", fC = "fasta", pC = "one-letter", mC = "three-letter", hC = [
	{
		id: "ket",
		label: "Ket Format"
	},
	{
		id: "mol",
		label: "MDL Molfile V3000"
	},
	{
		id: "seq",
		label: "Sequence"
	},
	{
		id: "fasta",
		label: "FASTA"
	},
	{
		id: "idt",
		label: "IDT"
	},
	{
		id: "axo-labs",
		label: "AxoLabs"
	},
	{
		id: "helm",
		label: "HELM"
	}
], gC = [
	{
		id: uC,
		label: "RNA"
	},
	{
		id: "dna",
		label: "DNA"
	},
	{
		id: dC,
		label: "Peptide"
	}
], _C = [{
	id: pC,
	label: "1-letter code"
}, {
	id: mC,
	label: "3-letter code"
}], vC = Nn, yC = {
	openOptions: "openOptions",
	textEditor: "textEditor"
}, bC = function(e) {
	var t = e.ketSerializer, n = e.editor, r = e.struct, i = !n.drawingEntitiesManager.hasDrawingEntities, a = t.deserializeToDrawingEntities(r);
	if (!a) throw Error("Error during parsing file");
	a.drawingEntitiesManager.centerMacroStructure();
	var o = a.drawingEntitiesManager.mergeInto(n.drawingEntitiesManager).command, s = En.getInstance(n), c = n.mode instanceof te, l = n.mode instanceof on;
	n.mode instanceof jn && n.drawingEntitiesManager.hasAntisenseChains && (o.merge(n.drawingEntitiesManager.applySnakeLayout(!0, !0, !0)), o.setUndoOperationsByPriority()), n.drawingEntitiesManager.detectBondsOverlappedByMonomers(), n.renderersContainer.update(o), s.update(o), c && (o.setUndoOperationReverse(), n.events.selectMode.dispatch({
		mode: fe.sequence,
		mergeWithLatestHistoryCommand: !0
	})), l && (o.setUndoOperationReverse(), n.events.selectMode.dispatch({
		mode: fe.snake,
		mergeWithLatestHistoryCommand: !0
	})), i && n.zoomToStructuresIfNeeded(), n.calculateAndStoreNextAutochainPosition(a.drawingEntitiesManager);
}, xC = function() {
	var e = Nt(ns.default.mark(function e(t) {
		var n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, b;
		return ns.default.wrap(function(e) {
			for (;;) switch (e.prev = e.next) {
				case 0:
					if (n = t.struct, r = t.formatSelection, i = t.additionalSelection, a = t.peptideLettersFormatSelection, o = t.onCloseCallback, s = t.setIsLoading, c = t.dispatch, l = r === cC, u = r === lC, d = r === fC, f = new y(), p = Dt.provideEditorInstance(), h = n, g = function(e) {
						var t = "Convert error! " + e;
						c(E_({
							errorMessage: t,
							errorTitle: u || d ? "Unsupported symbols" : ""
						}));
					}, !l) {
						e.next = 13;
						break;
					}
					try {
						bC({
							struct: n,
							ketSerializer: f,
							editor: p
						}), o();
					} catch {
						g("Error during file parsing.");
					}
					return e.abrupt("return");
				case 13: d || u && a !== mC ? (m = vC[r][i], h = h.toUpperCase()) : m = u && a === mC ? vC.seq.peptide3Letter : vC[r];
				case 14: return _ = ot.getIndigo(), e.prev = 15, s(!0), e.next = 19, _.convert({
					struct: h,
					output_format: nn.KET,
					input_format: m
				});
				case 19:
					v = e.sent, bC({
						struct: v.struct,
						ketSerializer: f,
						editor: p
					}), o(), e.next = 29;
					break;
				case 24: e.prev = 24, e.t0 = e.catch(15), b = An(e.t0).message, g(b), Lt.error(e.t0);
				case 29: return e.prev = 29, s(!1), e.finish(29);
				case 32:
				case "end": return e.stop();
			}
		}, e, null, [[
			15,
			24,
			29,
			32
		]]);
	}));
	return function(t) {
		return e.apply(this, arguments);
	};
}(), SC = !1, CC = function(e) {}, wC = function(e) {
	var t = e.isModalOpen, n = e.onClose, r = Y(), i = I((0, z.useState)(""), 2), a = i[0], o = i[1], s = I((0, z.useState)(""), 2), c = s[0], l = s[1], u = I((0, z.useState)(!1), 2), d = u[0], f = u[1], p = I((0, z.useState)(), 2), m = p[0], h = p[1], g = I((0, z.useState)(yC.openOptions), 2), _ = g[0], v = g[1], y = I((0, z.useState)(cC), 2), b = y[0], x = y[1], S = I((0, z.useState)(uC), 2), C = S[0], w = S[1], T = I((0, z.useState)(pC), 2), E = T[0], D = T[1];
	(0, z.useEffect)(function() {
		var e = c?.split("."), t = e[e.length - 1];
		if (t) {
			var n = hC.find(function(e) {
				return e.id === t;
			});
			x(n != null && n.id ? n.id : lC);
		}
	}, [c]), (0, z.useEffect)(function() {
		NS().then(function(e) {
			h({ chosenOpener: e });
		});
	}, []);
	var O = (0, z.useCallback)(function() {
		v(yC.openOptions), o(""), x(cC), w(uC), n();
	}, [n]), k = function(e) {
		l(e[0].name), m?.chosenOpener(e[0]).then(function(e) {
			o(e), v(yC.textEditor);
		}, function() {});
	}, ee = function() {
		xC({
			struct: a,
			formatSelection: b,
			additionalSelection: C,
			peptideLettersFormatSelection: E,
			onCloseCallback: O,
			setIsLoading: f,
			dispatch: r
		});
	}, te = function() {
		var e = Dt.provideEditorInstance(), t = En.getInstance(e), n = e.drawingEntitiesManager.deleteAllEntities();
		t.update(n), e.renderersContainer.update(n), e.zoomToStructuresIfNeeded(), xC({
			struct: a,
			formatSelection: b,
			additionalSelection: C,
			peptideLettersFormatSelection: E,
			onCloseCallback: O,
			setIsLoading: f,
			dispatch: r
		});
	};
	return H($S, {
		isOpen: t,
		title: "Open Structure",
		onClose: O,
		modalWidth: _ === yC.textEditor ? "620px" : "",
		testId: "openStructureModal",
		children: [V(Z.Content, { children: H(FS, {
			currentState: _,
			children: [V(TS, {
				isAnalyzingFile: SC,
				fileName: c,
				currentState: _,
				states: yC,
				selectClipboard: function() {
					return v(yC.textEditor);
				},
				fileLoadHandler: k,
				errorHandler: CC,
				value: a,
				inputHandler: o
			}), d && V(XS, { children: V(eS, {}) })]
		}) }), _ === yC.textEditor && !SC ? V(Z.Footer, {
			withborder: "true",
			children: function() {
				return H(eC, { children: [H(tC, { children: [
					V(rC, {
						options: hC,
						currentSelection: b,
						selectionHandler: x,
						customStylesForExpanded: YS
					}, b),
					b === lC || b === fC ? V(iC, {
						options: gC,
						currentSelection: C,
						selectionHandler: w,
						customStylesForExpanded: YS,
						testId: "dropdown-select-type"
					}, C) : null,
					b === lC && C === dC ? V(aC, {
						options: _C,
						currentSelection: E,
						selectionHandler: D,
						testId: "dropdown-select-peptide-letters-format"
					}) : null
				] }), H(oC, { children: [V(sC, {
					disabled: !a.trim(),
					clickHandler: te,
					label: "Open as New",
					styleType: "secondary",
					"data-testid": "open-as-new-button"
				}, "openButton"), V(sC, {
					disabled: !a.trim(),
					clickHandler: ee,
					label: "Add to Canvas",
					title: "Structure will be loaded as fragment and added to Clipboard",
					"data-testid": "add-to-canvas-button"
				}, "copyButton")] })] });
			}()
		}) : V(B, {})]
	});
}, TC = [
	"value",
	"id",
	"onChange",
	"label",
	"type",
	"className",
	"inputClassName"
];
function EC(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function DC(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? EC(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : EC(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var OC = P("label", { target: "e10m4n7r1" })(function(e) {
	return {
		display: "flex",
		flexDirection: "column",
		marginRight: "8px",
		color: e.theme.ketcher.color.text.primary,
		fontSize: "12px"
	};
}, ""), kC = P("input", { target: "e10m4n7r0" })(function(e) {
	var t = e.theme;
	return {
		height: "24px",
		padding: "3px 7px",
		border: `1px solid ${t.ketcher.color.input.border.regular}`,
		fontSize: "14px",
		borderRadius: "4px",
		backgroundColor: t.ketcher.color.input.background.primary,
		color: t.ketcher.color.text.primary,
		outline: "transparent",
		width: "164px",
		letterSpacing: "normal",
		"&:active, &:focus": { color: t.ketcher.color.input.text.active },
		"&:hover": { border: `1px solid ${t.ketcher.color.input.border.hover}` }
	};
}, ""), AC = function(e) {
	var t = e.value, n = e.id, r = e.onChange, i = e.label, a = e.type, o = e.className, s = e.inputClassName, c = It(e, TC);
	return H(OC, {
		htmlFor: n,
		className: o,
		children: [i && V("span", { children: i }), V(kC, DC({
			type: a || "text",
			id: n,
			value: t,
			className: s,
			onChange: function(e) {
				r(e.target.value);
			}
		}, c))]
	});
}, jC;
(function(e) {
	e.Ket = "chemical/x-ket", e.Mol = "chemical/x-mdl-molfile", e.HELM = "chemincal/x-helm", e.Fasta = "chemical/x-fasta", e.Sequence = "chemical/x-sequence", e.Idt = "chemical/x-idt", e.AxoLabs = "chemical/x-axo-labs", e.Svg = "image/svg+xml";
})(jC ||= {});
var MC = me(function e(t, n, r, i, a) {
	N(this, e), this.name = t, this.mime = n, this.extensions = r, this.supportsCoords = i || !1, this.options = a || {};
}), NC = {
	ket: new MC("Ket file", jC.Ket, [".ket"], !0, {}),
	mol: new MC("MDL Molfile V3000", jC.Mol, [".mol"], !0, { "molfile-saving-mode": "3000" }),
	fasta: new MC("FASTA", jC.Fasta, [".fasta"], !1, {}),
	sequence: new MC("SEQUENCE", jC.Sequence, [".seq"], !1, {}),
	"sequence-3-letter": new MC("SEQUENCE (3-letter code)", jC.Sequence, [".seq"], !1, {}),
	idt: new MC("IDT", jC.Idt, [".idt"], !1, {}),
	"axo-labs": new MC("AxoLabs", jC.AxoLabs, [".axolabs"], !1, {}),
	helm: new MC("HELM", jC.HELM, [".helm"]),
	svg: new MC("SVG Document", jC.Svg, [".svg"])
}, PC = function(e) {
	return NC[e];
}, FC = [
	{
		id: "ket",
		label: "Ket Format"
	},
	{
		id: "mol",
		label: "MDL Molfile V3000"
	},
	{
		id: "sequence",
		label: "Sequence (1-letter code)"
	},
	{
		id: "sequence-3-letter",
		label: "Sequence (3-letter code)"
	},
	{
		id: "fasta",
		label: "FASTA"
	},
	{
		id: "idt",
		label: "IDT"
	},
	{
		id: "axo-labs",
		label: "AxoLabs"
	},
	{
		id: "svg",
		label: "SVG Document"
	},
	{
		id: "helm",
		label: "HELM"
	}
], IC = {
	mol: nn.Mol,
	fasta: nn.FASTA,
	sequence: nn.SEQUENCE,
	"sequence-3-letter": nn.PeptideSequenceThreeLetter,
	idt: nn.IDT,
	"axo-labs": nn.AXOLABS,
	helm: nn.HELM
}, LC = P(Z, { target: "e12csxs60" })({
	name: "krpfk5",
	styles: "& div.MuiPaper-root{background:white;min-height:400px;min-width:430px;}& .MuiDialogContent-root{overflow:hidden;height:100%;}"
}), RC = function(e) {
	var t = e.onClose, n = e.isModalOpen, r = Y(), i = I((0, z.useState)("ket"), 2), a = i[0], o = i[1], s = I((0, z.useState)("ketcher"), 2), c = s[0], l = s[1], u = I((0, z.useState)(""), 2), d = u[0], f = u[1], p = I((0, z.useState)(!1), 2), m = p[0], h = p[1], g = I((0, z.useState)(), 2), _ = g[0], v = g[1], b = ot.getIndigo(), x = Dt.provideEditorInstance(), S = function() {
		var e = Nt(ns.default.mark(function e(t) {
			var n, i, a, s, c, l, u, d, p, m;
			return ns.default.wrap(function(e) {
				for (;;) switch (e.prev = e.next) {
					case 0:
						if (o(t), n = new y(), i = n.serialize(x.drawingEntitiesManager.micromoleculesHiddenEntities.clone(), x.drawingEntitiesManager), v(void 0), t !== "ket") {
							e.next = 7;
							break;
						}
						return f(i), e.abrupt("return");
					case 7:
						if (t !== "svg") {
							e.next = 14;
							break;
						}
						return a = x.ketcherRootElementBoundingClientRect, s = a?.x || 0, c = a?.y || 0, l = st(x.canvas, "preview", {
							horizontal: s,
							vertical: c
						}), v(l), e.abrupt("return");
					case 14:
						if (t === "helm" && !_t(Array.from(x.drawingEntitiesManager.monomers.values()), x.monomersLibrary) && x.events.error.dispatch("Some of the monomers do not have aliases in the HELM Core Library - they are exported using Ketcher aliases."), e.prev = 15, h(!0), !(t === "fasta" || t === "sequence")) {
							e.next = 21;
							break;
						}
						if (u = x.drawingEntitiesManager.validateIfApplicableForFasta(), u) {
							e.next = 21;
							break;
						}
						throw Error("Error during sequence type recognition(RNA, DNA or Peptide)");
					case 21: return e.next = 23, b.convert({
						struct: i,
						output_format: IC[t]
					});
					case 23:
						d = e.sent, f(d.struct), e.next = 34;
						break;
					case 27: e.prev = 27, e.t0 = e.catch(15), p = e.t0 instanceof Error ? e.t0.message : typeof e.t0 == "string" ? e.t0 : JSON.stringify(e.t0), m = "Convert error! " + p, r(E_(m)), Lt.error(m), o("ket");
					case 34: return e.prev = 34, h(!1), e.finish(34);
					case 37:
					case "end": return e.stop();
				}
			}, e, null, [[
				15,
				27,
				34,
				37
			]]);
		}));
		return function(t) {
			return e.apply(this, arguments);
		};
	}(), C = function(e) {
		l(e);
	}, w = function() {
		var e;
		if (a === "svg") {
			var n = x.ketcherRootElementBoundingClientRect, r = n?.x || 0, i = n?.y || 0, o = st(x.canvas, "file", {
				horizontal: r,
				vertical: i
			});
			if (!o) {
				t();
				return;
			}
			e = o;
		} else e = d;
		var s = new Blob([e], { type: PC(a).mime }), l = PC(a);
		(0, rs.saveAs)(s, `${c}${l.extensions[0]}`), t();
	};
	return (0, z.useEffect)(function() {
		a === "ket" && f(new y().serialize(x.drawingEntitiesManager.micromoleculesHiddenEntities.clone(), x.drawingEntitiesManager));
	}, [a]), H(LC, {
		title: "save structure",
		isOpen: n,
		onClose: t,
		testId: "save-structure-dialog",
		children: [V(Z.Content, { children: H(KS, {
			onSubmit: w,
			id: "save",
			children: [H(qS, {
				style: { padding: "12px 12px 10px" },
				children: [V("div", { children: V(AC, {
					value: c,
					id: "filename",
					onChange: C,
					label: "File name:",
					"data-testid": "filename-input"
				}) }), V(JS, {
					label: "File format:",
					options: FC,
					currentSelection: a,
					selectionHandler: S,
					customStylesForExpanded: YS,
					testId: "file-format-list"
				})]
			}), _ ? V(ZS, {
				dangerouslySetInnerHTML: { __html: _ },
				"data-testid": "preview-area"
			}) : H(QS, { children: [
				V(xS, {
					testId: "preview-area",
					value: d,
					readonly: !0
				}),
				V(dn, {
					onClick: function(e) {
						e.preventDefault();
						try {
							dt() ? navigator.clipboard.writeText(d) : Ze(e.clipboardData, { "text/plain": d });
						} catch (e) {
							Lt.error("copyAs.js::copyAs", e), r(E_("This feature is not available in your browser"));
						}
					},
					iconName: "copy",
					title: "Copy to clipboard",
					testId: "copy-to-clipboard"
				}),
				m && V(XS, { children: V(eS, {}) })
			] })]
		}) }), H(Z.Footer, { children: [V(MS, {
			label: "Cancel",
			styleType: "secondary",
			clickHandler: t,
			"data-testid": "cancel-button"
		}), V(MS, {
			label: "Save",
			clickHandler: w,
			disabled: !c,
			"data-testid": "save-button"
		})] })]
	});
}, zC = P(MS, { target: "e1kgbmg80" })(function() {
	return { width: "72px" };
}, ""), BC = P("div", { target: "e11sfr0q0" })({
	name: "606i4c",
	styles: "padding:12px"
}), VC = function(e) {
	var t = e.isModalOpen, n = e.onClose, r = Y(), i = X(dv), a = X(W), o = (0, z.useCallback)(function() {
		n();
	}, [n]);
	return H(Z, {
		isOpen: t,
		title: "Delete RNA Preset",
		onClose: o,
		"data-testid": "delete-preset-modal",
		children: [V(Z.Content, { children: H(BC, {
			"data-testid": "delete-preset-popup-content",
			children: [
				V("div", { children: "You are about to delete" }),
				H("div", { children: [
					"\"",
					i.name,
					"\" RNA preset."
				] }),
				V("div", { children: "This operation cannot be undone." })
			]
		}) }), H(Z.Footer, { children: [V(zC, {
			clickHandler: function() {
				o();
			},
			label: "Cancel",
			styleType: "secondary",
			"data-testid": "cancel-delete-preset-button"
		}, "cancel"), V(zC, {
			clickHandler: function() {
				o(), r(Tv(i)), r(Dv(!1)), r(Ev()), a?.events.selectPreset.dispatch(null);
			},
			label: "Delete",
			"data-testid": "delete-preset-button"
		}, "delete")] })]
	});
}, HC = P("div", { target: "e1wvbgsi0" })({
	name: "606i4c",
	styles: "padding:12px"
}), UC = function(e) {
	var t = e.isModalOpen, n = e.onClose, r = Y(), i = X(ev), a = X(W), o = rx(i), s = (0, z.useCallback)(function() {
		n();
	}, [n]), c = function() {
		nx(r, a);
	};
	return H(Z, {
		isOpen: t,
		title: "Update sequence",
		onClose: s,
		children: [V(Z.Content, { children: H(HC, { children: [
			"You are going to modify ",
			o,
			" nucleotides. Are you sure?"
		] }) }), H(Z.Footer, { children: [V(MS, {
			clickHandler: function() {
				s();
			},
			label: "Cancel",
			styleType: "secondary",
			title: "",
			"data-testid": "update-sequence-cancel-button"
		}, "cancel"), V(MS, {
			clickHandler: function() {
				s(), a?.events.modifySequenceInRnaBuilder.dispatch(i), c();
			},
			label: "Yes",
			title: "",
			"data-testid": "update-sequence-yes-button"
		}, "update")] })]
	});
}, WC = P("div", { target: "e1tvvbc92" })(function() {
	return {
		display: "flex",
		flexDirection: "column",
		rowGap: "2px",
		alignItems: "center",
		marginBottom: "5px"
	};
}, ""), GC = P("span", { target: "e1tvvbc91" })(function(e) {
	return {
		margin: 0,
		padding: 0,
		textAlign: "center",
		display: "block",
		font: e.theme.ketcher.font.family.inter,
		fontSize: e.theme.ketcher.font.size.small,
		fontWeight: e.theme.ketcher.font.weight.regular,
		color: e.disabled ? "rgba(180, 185, 214, 1)" : e.theme.ketcher.color.text.light
	};
}, ""), KC = P("div", { target: "e1tvvbc90" })(function() {
	return { height: "100%" };
}, ""), qC = function(e) {
	return e === "O" ? "OH" : e;
}, JC = P(yn, { target: "e1huhxto1" })(function(e) {
	var t = e.theme, n = e.isExpanded;
	return {
		display: "flex",
		border: `1.5px solid ${t.ketcher.outline.color}`,
		borderRadius: "6px",
		padding: 5,
		maxHeight: "100%",
		minHeight: "150px",
		height: n ? "auto" : "150px",
		width: n ? "auto" : "150px",
		alignSelf: "stretch",
		"& svg": {
			maxWidth: "fit-content",
			margin: "auto"
		}
	};
}, ""), YC = P("div", { target: "e1huhxto0" })({
	name: "wfzm1y",
	styles: "display:flex;flex-wrap:wrap;justify-content:center;align-self:flex-start;width:100%;gap:7px"
}), XC = P("div", { target: "e8i5wzj0" })({
	name: "2oefzz",
	styles: "display:flex;flex-direction:column;justify-content:center;align-items:center;gap:8px;padding:8px;color:#7c7c7f;border:1px solid #cad3dd;width:100%;height:100%"
}), ZC = function(e) {
	var t = e.testId;
	return H(XC, {
		"data-testid": t,
		children: [V(F, { name: "questionMark" }), "Unknown structure"]
	});
}, QC = P("div", { target: "e1q9gayd0" })(function(e) {
	var t = e.theme, n = e.expanded;
	return {
		display: "flex",
		border: `1.5px solid ${t.ketcher.outline.color}`,
		borderRadius: "6px",
		padding: 5,
		maxHeight: "100%",
		minHeight: "150px",
		height: n ? "auto" : "150px",
		width: n ? "auto" : "150px",
		alignSelf: "stretch",
		"& svg": {
			maxWidth: "fit-content",
			margin: "auto"
		}
	};
}, ""), $C = function(e) {
	var t = e.monomer, n = e.expanded, r = e.selectedAttachmentPoint, i = e.connectedAttachmentPoints, a = e.usage, o = e.testId, s = (0, z.useRef)(null);
	return (0, z.useLayoutEffect)(function() {
		var e = s.current;
		if (e) {
			var n = Cd(e);
			if (t instanceof mn) {
				var o = new Ce((e.width.baseVal.value - e.x.baseVal.value) / 2, (e.height.baseVal.value - e.y.baseVal.value) / 2), c = Gt.canvasToModel(o);
				new lt(new mn(t.variantMonomerItem, c)).showExternal({
					canvas: n,
					usage: a,
					selectedAttachmentPoint: r,
					connectedAttachmentPoints: i
				});
			}
		}
	}, [r, i]), V(QC, {
		expanded: n,
		"data-testid": o,
		children: V("svg", { ref: s })
	});
}, ew = function(e) {
	var t = e.monomer, n = e.attachmentPoints, r = e.connectedAttachmentPoints, i = e.selectedAttachmentPoint, a = e.usage, o = e.needCache, s = e.update, c = e.expanded, l = e.testId, u = t instanceof mn, d = t.monomerItem.props.unresolved;
	return H(B, { children: [u ? V($C, {
		monomer: t,
		expanded: c,
		selectedAttachmentPoint: i,
		connectedAttachmentPoints: r,
		usage: a,
		testId: l
	}) : d ? V(ZC, { testId: l }) : V(JC, {
		struct: t.monomerItem.struct,
		options: {
			connectedMonomerAttachmentPoints: r,
			currentlySelectedMonomerAttachmentPoint: i ?? void 0,
			usageInMacromolecule: a,
			labelInMonomerConnectionsModal: !0,
			needCache: o ?? !1
		},
		update: s,
		isExpanded: c,
		testId: l
	}), V(YC, { children: V(B, { children: n }) })] });
}, tw = P("div", { target: "e14t14ao2" })(function(e) {
	var t = e.theme, n = e.isExpanded;
	return {
		margin: 0,
		padding: 0,
		textAlign: "center",
		alignSelf: "flex-end",
		display: "block",
		font: t.ketcher.font.family.inter,
		fontSize: t.ketcher.font.size.regular,
		fontWeight: t.ketcher.font.weight.regular,
		flexBasis: "200px",
		lineHeight: "14px",
		maxWidth: n ? void 0 : "150px"
	};
}, ""), nw = P("div", { target: "e14t14ao1" })(function(e) {
	var t = e.theme;
	return {
		width: 10,
		height: 2,
		display: "block",
		color: t.ketcher.color.button.secondary.hover,
		backgroundColor: t.ketcher.color.button.secondary.hover,
		borderRadius: 20,
		margin: "auto"
	};
}, ""), rw = P("div", { target: "e14t14ao0" })(function() {
	return {
		display: "grid",
		gridAutoFlow: "column",
		gridTemplateRows: "auto auto auto",
		gridTemplateColumns: "1fr 10px 1fr",
		justifyContent: "center",
		alignItems: "flex-start",
		padding: "12px",
		paddingBottom: 0,
		height: "100%",
		columnGap: "12px",
		rowGap: "8px"
	};
}, ""), iw = "thymine", aw = "uracil", ow = function(e) {
	var t = e.monomerClass, n = e.variantMonomerItem, r = n.label, i = n.options || [];
	if (t === S.Base) {
		var a = i.some(function(e) {
			return e.templateId.toLowerCase().includes(iw);
		}), o = i.some(function(e) {
			return e.templateId.toLowerCase().includes(aw);
		});
		return a ? r === "N" ? "Any DNA base" : "Ambiguous DNA Base" : o ? r === "N" ? "Any RNA Base" : "Ambiguous RNA Base" : "Ambiguous Base";
	}
	return t === S.AminoAcid ? r === "X" ? "Any Amino acid" : "Ambiguous Amino acid" : `Ambiguous ${t}`;
}, sw = function(e) {
	return e instanceof mn ? ow(e) : e.monomerItem.props.Name;
}, cw = function(e) {
	var t = e.firstMonomer, n = e.secondMonomer, r = e.expanded, i = e.firstMonomerOverview, a = e.secondMonomerOverview, o = sw(t), s = sw(n);
	return V(rw, { children: H(B, { children: [
		V(tw, {
			isExpanded: r,
			children: o
		}),
		i,
		V("span", {}),
		V(nw, {}),
		V("span", {}),
		V(tw, {
			isExpanded: r,
			children: s
		}),
		a
	] }) });
};
function lw(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function uw(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? lw(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : lw(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var dw = P(Z, { target: "e1byht5d3" })({
	name: "1j7jcep",
	styles: "& .MuiPaper-root{background:#fff !important;}& .MuiDialogContent-root{overflow:hidden;}"
}), fw = P(MS, { target: "e1byht5d2" })(function() {
	return { width: "97px !important" };
}, ""), pw = P(MS, { target: "e1byht5d1" })(function(e) {
	return {
		width: "97px !important",
		color: e.disabled ? "rgba(51, 51, 51, 0.6)" : "",
		background: e.disabled ? "rgba(225, 229, 234, 1) !important" : "",
		opacity: "1 !important",
		minHeight: "0"
	};
}, ""), mw = P(MS, { target: "e1byht5d0" })(function(e) {
	return {
		borderRadius: 5,
		minWidth: "45px !important",
		padding: "4px",
		border: `1px solid ${e.theme.ketcher.color.border.secondary}`,
		color: e.disabled ? "rgba(51, 51, 51, 0.6) !important" : "",
		background: e.disabled ? "rgba(225, 229, 234)" : "",
		borderColor: e.disabled ? "rgba(225, 229, 234) !important" : ""
	};
}, ""), hw = function(e) {
	var t = e.onClose, n = e.isModalOpen, r = e.firstMonomer, i = e.secondMonomer, a = e.polymerBond, o = e.isReconnectionDialog, s = X(W), c = (0, z.useRef)(a?.firstMonomerAttachmentPoint), l = (0, z.useRef)(a?.secondMonomerAttachmentPoint), u = (0, z.useRef)(r?.hasFreeAttachmentPoint || i?.hasFreeAttachmentPoint);
	if (!r || !i) throw Error("Monomers must exist!");
	var d = I((0, z.useState)(c.current || _w(r)), 2), f = d[0], p = d[1], m = I((0, z.useState)(l.current || _w(i)), 2), h = m[0], g = m[1], _ = I((0, z.useState)(!1), 2), v = _[0], y = _[1], b = function() {
		if (o) {
			var e;
			a?.firstMonomer.setBond(c.current, a), a == null || (e = a.secondMonomer) == null || e.setBond(l.current, a), t();
		} else s?.events.cancelBondCreationViaModal.dispatch(i), t();
	};
	return H(dw, {
		title: o ? "Edit Attachment Points" : "Select Attachment Points",
		isOpen: n,
		onClose: b,
		showExpandButton: !0,
		modalWidth: "358px",
		expanded: v,
		setExpanded: y,
		testId: "monomer-connection-modal",
		children: [V(Z.Content, { children: V(KC, { children: V(cw, {
			firstMonomer: r,
			secondMonomer: i,
			expanded: v,
			firstMonomerOverview: V(gw, {
				monomer: r,
				selectedAttachmentPoint: f,
				onSelectAttachmentPoint: p,
				expanded: v,
				position: "left"
			}),
			secondMonomerOverview: V(gw, {
				monomer: i,
				selectedAttachmentPoint: h,
				onSelectAttachmentPoint: g,
				expanded: v,
				position: "right"
			})
		}) }) }), H(Z.Footer, { children: [V(fw, {
			label: "Cancel",
			"data-testid": "cancel-button",
			styleType: "secondary",
			clickHandler: b
		}), V(pw, {
			label: o ? "Reconnect" : "Connect",
			"data-testid": o ? "Reconnect-button" : "Connect-button",
			disabled: !f || !h || !u.current,
			clickHandler: function() {
				if (!f || !h) throw Error("Attachment points cannot be falsy");
				if (f === c.current && h === l.current) {
					b();
					return;
				}
				s?.events.createBondViaModal.dispatch({
					firstMonomer: r,
					secondMonomer: i,
					firstSelectedAttachmentPoint: f,
					secondSelectedAttachmentPoint: h,
					polymerBond: a,
					isReconnection: o,
					initialFirstMonomerAttachmentPoint: c.current,
					initialSecondMonomerAttachmentPoint: l.current
				}), t();
			}
		})] })]
	});
};
function gw(e) {
	var t = e.monomer, n = e.selectedAttachmentPoint, r = e.onSelectAttachmentPoint, i = e.expanded, a = i === void 0 ? !1 : i, o = e.position, s = I((0, z.useState)(t.attachmentPointsToBonds), 2), c = s[0], l = s[1], u = I((0, z.useState)(function() {
		return Oy(c);
	}), 2), d = u[0], f = u[1];
	(0, z.useEffect)(function() {
		l(t.attachmentPointsToBonds);
	}, [n]), (0, z.useEffect)(function() {
		f(Oy(c));
	}, [c]);
	var p = function(e) {
		var n = t.monomerCaps, r = t instanceof mn;
		if (!n) return r ? null : "H";
		var i = n[e];
		return qC(i);
	}, m = function(e) {
		var i = uw({}, t.attachmentPointsToBonds), a = n ? i[n] : null;
		n && a && t.removeBond(a), i[e] = t.getPotentialBond(e), l(i), r(e), f(Oy(i));
	};
	return V(ew, {
		monomer: t,
		connectedAttachmentPoints: d,
		selectedAttachmentPoint: n,
		usage: Ye.MonomerConnectionsModal,
		update: a,
		expanded: a,
		attachmentPoints: t.listOfAttachmentPoints.map(function(e) {
			var t = !!(d.includes(e) && e !== n);
			return H(WC, { children: [V(mw, {
				label: e,
				styleType: e === n ? "primary" : "secondary",
				clickHandler: function() {
					return m(e);
				},
				disabled: t,
				"data-testid": `${o}-${e}`,
				"data-isactive": e === n
			}), V(GC, {
				"data-testid": "leaving-group-value",
				disabled: t,
				children: p(e)
			})] }, e);
		}),
		testId: `${o}-monomer-preview`
	});
}
function _w(e) {
	if (e.chosenFirstAttachmentPointForBond) return e.chosenFirstAttachmentPointForBond;
	if (e.chosenSecondAttachmentPointForBond) return e.chosenSecondAttachmentPointForBond;
	var t = Object.entries(e.attachmentPointsToBonds).filter(function(e) {
		var t = I(e, 2);
		return t[0], t[1] == null;
	});
	return t.length === 1 ? I(t[0], 1)[0] : null;
}
var vw = P("p", { target: "e1e4h5hm0" })({
	name: "1fayh9l",
	styles: "padding:12px;font-size:12px;color:#000"
}), yw = {
	open: wC,
	save: RC,
	delete: VC,
	updateSequenceInRNABuilder: UC,
	monomerConnection: hw,
	confirmationDialog: function(e) {
		var t = e.title, n = e.confirmationText, r = e.onConfirm, i = e.isModalOpen, a = e.onClose;
		return H(Z, {
			isOpen: i,
			title: t ?? "Confirm your action",
			onClose: a,
			testId: "confirmation-dialog",
			children: [V(Z.Content, { children: V(vw, {
				"data-testid": "confirmation-text",
				children: n
			}) }), H(Z.Footer, { children: [V(MS, {
				label: "Cancel",
				clickHandler: a,
				"data-testid": "cancel-button"
			}), V(MS, {
				label: "Yes",
				clickHandler: function() {
					r(), a();
				},
				styleType: "secondary",
				"data-testid": "yes-button"
			})] })]
		});
	}
};
function bw(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function xw(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? bw(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : bw(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var Sw = function() {
	var e = X(k_), t = X(O_), n = X(A_), r = Y(), i = (0, z.useCallback)(function() {
		r(C_());
	}, [r]);
	if (!t) return null;
	var a = yw[t];
	if (!a) throw Error(`There is no modal window named ${t}`);
	return n ? V(a, xw({
		onClose: i,
		isModalOpen: e
	}, n)) : V(a, {
		onClose: i,
		isModalOpen: e
	});
}, Cw = P("div", { target: "e15avtnm2" })({
	name: "1bweptz",
	styles: "background-color:#333333;max-height:40px;display:flex;align-items:stretch"
}), ww = P("div", { target: "e15avtnm1" })({
	name: "1my6l07",
	styles: "max-width:356px;padding:4px 10px 4px 10px;color:white;display:flex"
}), Tw = P(dn, { target: "e15avtnm0" })({
	name: "1c8hqv0",
	styles: "color:white;width:24px;height:auto;display:flex;align-items:center;justify-content:center;&:hover{background-color:#585858;color:white;}svg{width:16px;height:16px;}"
}), Ew = function() {
	return H(B, { children: [
		V("symbol", {
			id: "chem",
			viewBox: "0 0 59 59",
			width: "59",
			height: "59",
			children: V("rect", {
				className: "monomer-body",
				width: "29.5",
				height: "29.5",
				"data-actual-width": "29.5",
				"data-actual-height": "29.5",
				x: "0.5",
				y: "0.5",
				rx: "0.75"
			})
		}),
		V("symbol", {
			id: "chem-selection",
			viewBox: "0 0 59 59",
			width: "59",
			height: "59",
			children: V("rect", {
				width: "29.5",
				height: "29.5",
				x: "0.5",
				y: "0.5",
				rx: "0.75",
				stroke: "#0097A8",
				fill: "none",
				strokeWidth: "1.5"
			})
		}),
		H("symbol", {
			id: "chem-autochain-preview",
			viewBox: "0 0 32 32",
			width: "32",
			height: "32",
			"data-actual-width": "32",
			"data-actual-height": "32",
			children: [
				V("path", { d: "M1 4.63574V2.63574C1 1.53117 1.89543 0.635742 3 0.635742H5" }),
				V("path", { d: "M1 26.6357V28.6357C1 29.7403 1.89543 30.6357 3 30.6357H5" }),
				V("path", { d: "M31 4.63574V2.63574C31 1.53117 30.1046 0.635742 29 0.635742H27" }),
				V("path", { d: "M31 26.6357V28.6357C31 29.7403 30.1046 30.6357 29 30.6357H27" }),
				V("path", { d: "M7.02142 30.6357L10.0214 30.6357" }),
				V("path", { d: "M12.0013 30.6357L15.0013 30.6357" }),
				V("path", { d: "M16.9816 30.6357L19.9816 30.6357" }),
				V("path", { d: "M22.0222 30.6357L25.0222 30.6357" }),
				V("path", { d: "M1.02185 6.63574L1.02185 9.63574" }),
				V("path", { d: "M1.02185 11.6152L1.02185 14.6152" }),
				V("path", { d: "M1.02185 16.5957L1.02185 19.5957" }),
				V("path", { d: "M1.02185 21.6367L1.02185 24.6367" }),
				V("path", { d: "M7.02142 0.635742L10.0214 0.635742" }),
				V("path", { d: "M12.0013 0.635742L15.0013 0.635742" }),
				V("path", { d: "M16.9816 0.635742L19.9816 0.635742" }),
				V("path", { d: "M22.0222 0.635742L25.0222 0.635742" }),
				V("path", { d: "M31.0219 6.63574L31.0219 9.63574" }),
				V("path", { d: "M31.0219 11.6152L31.0219 14.6152" }),
				V("path", { d: "M31.0219 16.5957L31.0219 19.5957" }),
				V("path", { d: "M31.0219 21.6367L31.0219 24.6367" })
			]
		})
	] });
}, Dw = function() {
	return H(B, { children: [
		V("symbol", {
			id: "peptide",
			viewBox: "0 0 70 61",
			width: "70",
			height: "61",
			children: V("path", {
				className: "monomer-body",
				transform: "scale(0.5)",
				"data-actual-width": "35",
				"data-actual-height": "30.5",
				d: "M16.9236 1.00466C17.2801 0.383231 17.9418 6.10888e-07 18.6583 5.98224e-07L51.3417 2.04752e-08C52.0582 7.81036e-09 52.7199 0.383234 53.0764 1.00466L69.4289 29.5047C69.7826 30.1211 69.7826 30.8789 69.4289 31.4953L53.0764 59.9953C52.7199 60.6168 52.0582 61 51.3417 61H18.6583C17.9418 61 17.2801 60.6168 16.9236 59.9953L0.571095 31.4953C0.217407 30.8789 0.217408 30.1211 0.571096 29.5047L16.9236 1.00466Z"
			})
		}),
		H("symbol", {
			id: "peptide-hover",
			viewBox: "0 0 70 61",
			width: "70",
			height: "61",
			children: [V("path", {
				d: "M18.2246 1.75116C18.3137 1.59581 18.4792 1.5 18.6583 1.5L51.3417 1.5C51.5208 1.5 51.6863 1.59581 51.7754 1.75116L53.06 1.01408L51.7754 1.75117L68.1279 30.2512C68.2163 30.4053 68.2163 30.5947 68.1279 30.7488L51.7754 59.2488C51.6863 59.4042 51.5208 59.5 51.3417 59.5H18.6583C18.4792 59.5 18.3137 59.4042 18.2246 59.2488L1.87215 30.7488C1.78372 30.5947 1.78372 30.4053 1.87215 30.2512L18.2246 1.75116Z",
				fill: "none",
				transform: "scale(0.5)",
				stroke: "#0097A8",
				strokeWidth: "3"
			}), " "]
		}),
		V("symbol", {
			id: "modified-background",
			viewBox: "0 0 60 20",
			width: "30",
			height: "20",
			x: "2.5",
			y: "5",
			children: V("path", {
				xmlns: "http://www.w3.org/2000/svg",
				d: "M6.52702 20C5.81057 20 5.14885 19.6168 4.79229 18.9953L0.570974 11.6382C0.217285 11.0218 \n           0.217285 10.2639 0.570974 9.64751L5.52999 1.00466C5.88654 0.383235 6.54827 0 7.26472 0H52.735C53.4515\n           0 54.1132 0.383234 54.4698 1.00466L59.4288 9.64751C59.7825 10.2639 59.7825 11.0218 59.4288 11.6382\n           L55.2075 18.9953C54.8509 19.6168 54.1892 20 53.4727 20H6.52702Z",
				fillOpacity: "0.6"
			})
		}),
		H("symbol", {
			id: "peptide-autochain-preview",
			viewBox: "0 0 37 32",
			width: "37",
			height: "32",
			"data-actual-width": "37",
			"data-actual-height": "32",
			children: [
				V("path", { d: "M8.27143 3.53027L9.29272 1.77462C9.65083 1.15901 10.3093 0.780274 11.0215 0.780274L13.1642 0.780274M29.2131 3.53027L28.1919 1.77462C27.8337 1.15901 27.1753 0.780273 26.4631 0.780273L24.3164 0.780273M2.45429 13.5303L1.585 15.0246C1.22337 15.6463 1.22337 16.4143 1.585 17.0359L2.45429 18.5303M29.0386 28.5303L28.0233 30.2756C27.6619 30.897 26.991 31.2803 26.2646 31.2803L24.1459 31.2803M8.09693 28.5303L9.11221 30.2756C9.47371 30.897 10.1446 31.2803 10.871 31.2803H12.9936M34.8558 18.5303L35.7311 17.0256C36.0896 16.4092 36.0896 15.6514 35.7311 15.0349L34.8558 13.5303" }),
				V("path", { d: "M14.8937 0.780178L17.8937 0.780178" }),
				V("path", { d: "M19.597 0.780178L22.597 0.780178" }),
				V("path", { d: "M14.8937 31.2804H17.8937" }),
				V("path", { d: "M19.597 31.2804H22.597" }),
				V("path", { d: "M3.61253 11.7412L5.11253 9.14309" }),
				V("path", { d: "M5.96421 7.66792L7.46421 5.06984" }),
				V("path", { d: "M30.1034 26.877L31.6034 24.2789" }),
				V("path", { d: "M32.455 22.8038L33.955 20.2057" }),
				V("path", { d: "M7.32633 26.9903L5.82633 24.3922" }),
				V("path", { d: "M4.97465 22.917L3.47465 20.319" }),
				V("path", { d: "M33.9528 11.8759L32.4782 9.26339" }),
				V("path", { d: "M31.6409 7.78023L30.1662 5.16769" })
			]
		})
	] });
}, Ow = function() {
	return H(B, { children: [
		V("symbol", {
			id: "sugar",
			viewBox: "0 0 70 70",
			width: "70",
			height: "70",
			children: V("rect", {
				className: "monomer-body",
				width: "28.5",
				height: "28.5",
				"data-actual-width": "28.5",
				"data-actual-height": "28.5",
				rx: "5"
			})
		}),
		V("symbol", {
			id: "sugar-selection",
			viewBox: "-1 -1 100 100",
			width: "70",
			height: "70",
			children: V("rect", {
				width: "39",
				height: "39",
				rx: "5",
				fill: "none",
				stroke: "#0097A8",
				strokeWidth: "2.5"
			})
		}),
		V("symbol", {
			id: "sugar-variant",
			viewBox: "0 0 72 72",
			width: "70",
			height: "70",
			children: V("rect", {
				className: "monomer-body",
				width: "28.5",
				height: "28.5",
				"data-actual-width": "28.5",
				"data-actual-height": "28.5",
				x: "0.5",
				y: "0.5",
				rx: "5",
				stroke: "#585858",
				strokeWidth: "0.5"
			})
		}),
		V("symbol", {
			id: "sugar-modified-background",
			viewBox: "0 0 28 10",
			width: "27",
			height: "10",
			x: "0.7",
			y: "10",
			children: V("path", {
				d: "M1.5 10C0.947715 10 0.5 9.55229 0.5 9V1C0.5 0.447715 0.947715 0 1.5 0H26.5C27.0523 0 27.5 0.447715 27.5 1V9C27.5 9.55228 27.0523 10 26.5 10H1.5Z",
				fill: "white",
				fillOpacity: "0.6"
			})
		}),
		H("symbol", {
			id: "sugar-autochain-preview",
			viewBox: "0 0 32 32",
			width: "32",
			height: "32",
			"data-actual-width": "32",
			"data-actual-height": "32",
			children: [
				V("path", { d: "M1 4.63574V2.63574C1 1.53117 1.89543 0.635742 3 0.635742H5" }),
				V("path", { d: "M1 26.6357V28.6357C1 29.7403 1.89543 30.6357 3 30.6357H5" }),
				V("path", { d: "M31 4.63574V2.63574C31 1.53117 30.1046 0.635742 29 0.635742H27" }),
				V("path", { d: "M31 26.6357V28.6357C31 29.7403 30.1046 30.6357 29 30.6357H27" }),
				V("path", { d: "M7.02142 30.6357L10.0214 30.6357" }),
				V("path", { d: "M12.0013 30.6357L15.0013 30.6357" }),
				V("path", { d: "M16.9816 30.6357L19.9816 30.6357" }),
				V("path", { d: "M22.0222 30.6357L25.0222 30.6357" }),
				V("path", { d: "M1.02185 6.63574L1.02185 9.63574" }),
				V("path", { d: "M1.02185 11.6152L1.02185 14.6152" }),
				V("path", { d: "M1.02185 16.5957L1.02185 19.5957" }),
				V("path", { d: "M1.02185 21.6367L1.02185 24.6367" }),
				V("path", { d: "M7.02142 0.635742L10.0214 0.635742" }),
				V("path", { d: "M12.0013 0.635742L15.0013 0.635742" }),
				V("path", { d: "M16.9816 0.635742L19.9816 0.635742" }),
				V("path", { d: "M22.0222 0.635742L25.0222 0.635742" }),
				V("path", { d: "M31.0219 6.63574L31.0219 9.63574" }),
				V("path", { d: "M31.0219 11.6152L31.0219 14.6152" }),
				V("path", { d: "M31.0219 16.5957L31.0219 19.5957" }),
				V("path", { d: "M31.0219 21.6367L31.0219 24.6367" })
			]
		})
	] });
}, kw = function() {
	return H(B, { children: [
		V("symbol", {
			id: "phosphate",
			viewBox: "0 0 70 70",
			width: "70",
			height: "70",
			children: V("rect", {
				className: "monomer-body",
				width: "28",
				height: "28",
				"data-actual-width": "28",
				"data-actual-height": "28",
				rx: "15"
			})
		}),
		V("symbol", {
			id: "phosphate-selection",
			viewBox: "-1 -1 75 75",
			width: "70",
			height: "70",
			children: V("rect", {
				width: "28",
				height: "28",
				rx: "15",
				fill: "none",
				stroke: "#0097A8",
				strokeWidth: "1.5"
			})
		}),
		V("symbol", {
			id: "phosphate-variant",
			viewBox: "0 0 70 70",
			width: "70",
			height: "70",
			children: V("rect", {
				className: "monomer-body",
				width: "27",
				height: "27",
				"data-actual-width": "27",
				"data-actual-height": "27",
				stroke: "#585858",
				strokeWidth: "0.5",
				x: "0.5",
				y: "0.5",
				rx: "15"
			})
		}),
		V("symbol", {
			id: "phosphate-modified-background",
			viewBox: "0 0 28 10",
			width: "26",
			height: "10",
			x: "1",
			y: "9.5",
			children: V("path", {
				d: "M2.13388 0C1.72465 0 1.35333 0.248229 1.22109 0.635509C0.753639 2.00455 0.5 3.47265 0.5 5C0.5 6.52735 0.753639 7.99545 1.22109 9.36449C1.35333 9.75177 1.72465 10 2.13389 10H25.8661C26.2753 10 26.6467 9.75177 26.7789 9.36449C27.2464 7.99545 27.5 6.52735 27.5 5C27.5 3.47265 27.2464 2.00455 26.7789 0.635509C26.6467 0.248229 26.2753 0 25.8661 0H2.13388Z",
				fill: "#333333",
				fillOpacity: "0.6"
			})
		}),
		V("symbol", {
			id: "phosphate-autochain-preview",
			viewBox: "-1 -1 30 30",
			width: "30",
			height: "30",
			"data-actual-width": "30",
			"data-actual-height": "30",
			children: V("rect", {
				width: "28",
				height: "28",
				rx: "15",
				strokeDasharray: "4 4"
			})
		})
	] });
}, Aw = function() {
	return H(B, { children: [
		V("symbol", {
			id: "rna-base",
			viewBox: "-16 0 65 65",
			width: "65",
			height: "95",
			children: V("rect", {
				width: "22.5",
				height: "22.5",
				"data-actual-width": "31.82",
				"data-actual-height": "31.82",
				rx: "1",
				x: "-11.25",
				y: "-11.25",
				transform: "rotate(45)",
				className: "monomer-body"
			})
		}),
		V("symbol", {
			id: "rna-base-selection",
			viewBox: "-15.75 -0.25 65 65",
			width: "65",
			height: "95",
			children: V("rect", {
				width: "21",
				height: "21",
				rx: "1",
				x: "-10.5",
				y: "-10.5",
				transform: "rotate(45)",
				stroke: "#0097A8",
				strokeWidth: "1.5",
				fill: "none"
			})
		}),
		V("symbol", {
			id: "rna-base-variant",
			viewBox: "-16 0 65 65",
			width: "65",
			height: "94",
			children: V("rect", {
				width: "21.5",
				height: "21.5",
				"data-actual-width": "30",
				"data-actual-height": "30",
				stroke: "#585858",
				strokeWidth: "0.5",
				rx: "1",
				x: "-10.25",
				y: "-10.25",
				transform: "rotate(45)",
				className: "monomer-body"
			})
		}),
		V("symbol", {
			id: "rna-base-modified-background",
			viewBox: "0 0 32 10",
			width: "30",
			height: "9",
			x: "0.8",
			y: "10.8",
			children: V("path", {
				fillRule: "evenodd",
				clipRule: "evenodd",
				d: "M6.30156 10C6.03634 10 5.78199 9.89464 5.59445 9.70711L1.1508 5.26346C0.760279 4.87293 0.760279 4.23977 1.1508 3.84924L4.70715 0.292893C4.89469 0.105357 5.14904 0 5.41426 0H26.5858C26.851 0 27.1054 0.105357 27.2929 0.292893L30.8493 3.84924C31.2398 4.23977 31.2398 4.87293 30.8493 5.26346L26.4056 9.70711C26.2181 9.89464 25.9637 10 25.6985 10H6.30156Z",
				fill: "#333333",
				fillOpacity: "0.6"
			})
		}),
		H("symbol", {
			id: "rna-base-autochain-preview",
			viewBox: "0 0 36 36",
			width: "36",
			height: "36",
			"data-actual-width": "36",
			"data-actual-height": "36",
			children: [
				V("path", { d: "M2.77636 20.2837L1.83359 19.341C1.05254 18.5599 1.05254 17.2936 1.83359 16.5125L2.77468 15.5715" }),
				V("path", { d: "M15.7398 33.2465L16.6826 34.1893C17.4636 34.9704 18.73 34.9704 19.511 34.1893L20.4521 33.2482" }),
				V("path", { d: "M20.4412 2.61969L19.4984 1.67691C18.7173 0.89586 17.451 0.895861 16.67 1.67691L15.7289 2.618" }),
				V("path", { d: "M33.4046 15.5825L34.3474 16.5252C35.1284 17.3063 35.1284 18.5726 34.3474 19.3537L33.4063 20.2948" }),
				V("path", { d: "M21.6425 32.0586L23.4089 30.2921" }),
				V("path", { d: "M24.5747 29.126L26.3412 27.3595" }),
				V("path", { d: "M27.5073 26.1934L29.2737 24.4269" }),
				V("path", { d: "M30.4753 23.2256L32.2418 21.4591" }),
				V("path", { d: "M3.96771 21.4492L5.73546 23.217" }),
				V("path", { d: "M6.90216 24.3838L8.6699 26.1515" }),
				V("path", { d: "M9.83673 27.3184L11.6045 29.0861" }),
				V("path", { d: "M12.8069 30.2881L14.5747 32.0558" }),
				V("path", { d: "M3.96497 14.3809L5.73145 12.6144" }),
				V("path", { d: "M6.89728 11.4482L8.66376 9.68176" }),
				V("path", { d: "M9.82977 8.5166L11.5963 6.75012" }),
				V("path", { d: "M12.7979 5.54785L14.5643 3.78137" }),
				V("path", { d: "M21.6326 3.78418L23.4003 5.55192" }),
				V("path", { d: "M24.567 6.71875L26.3347 8.48649" }),
				V("path", { d: "M27.5016 9.65332L29.2693 11.4211" }),
				V("path", { d: "M30.4718 12.623L32.2395 14.3908" })
			]
		})
	] });
}, jw = function() {
	return H(B, { children: [
		H("symbol", {
			id: "unresolved-monomer",
			viewBox: "0 0 59 59",
			width: "59",
			height: "59",
			children: [V("rect", {
				className: "monomer-body",
				width: "29.5",
				height: "29.5",
				"data-actual-width": "29.5",
				"data-actual-height": "29.5",
				x: "0.5",
				y: "0.5",
				rx: "1.5",
				stroke: "#333333"
			}), V("rect", {
				width: "29.5",
				height: "29.5",
				"data-actual-width": "29.5",
				"data-actual-height": "29.5",
				x: "0.5",
				y: "0.5",
				rx: "1.5",
				fill: "#585858"
			})]
		}),
		V("symbol", {
			id: "unresolved-monomer-hover",
			children: V("rect", {
				width: "29.5",
				height: "29.5",
				x: "0.5",
				y: "0.5",
				rx: "1.5",
				fill: "none",
				stroke: "#0097A8",
				strokeWidth: "1.5"
			})
		}),
		H("symbol", {
			id: "unresolved-monomer-autochain-preview",
			viewBox: "0 0 32 32",
			width: "32",
			height: "32",
			"data-actual-width": "32",
			"data-actual-height": "32",
			children: [
				V("path", { d: "M1 4.63574V2.63574C1 1.53117 1.89543 0.635742 3 0.635742H5" }),
				V("path", { d: "M1 26.6357V28.6357C1 29.7403 1.89543 30.6357 3 30.6357H5" }),
				V("path", { d: "M31 4.63574V2.63574C31 1.53117 30.1046 0.635742 29 0.635742H27" }),
				V("path", { d: "M31 26.6357V28.6357C31 29.7403 30.1046 30.6357 29 30.6357H27" }),
				V("path", { d: "M7.02142 30.6357L10.0214 30.6357" }),
				V("path", { d: "M12.0013 30.6357L15.0013 30.6357" }),
				V("path", { d: "M16.9816 30.6357L19.9816 30.6357" }),
				V("path", { d: "M22.0222 30.6357L25.0222 30.6357" }),
				V("path", { d: "M1.02185 6.63574L1.02185 9.63574" }),
				V("path", { d: "M1.02185 11.6152L1.02185 14.6152" }),
				V("path", { d: "M1.02185 16.5957L1.02185 19.5957" }),
				V("path", { d: "M1.02185 21.6367L1.02185 24.6367" }),
				V("path", { d: "M7.02142 0.635742L10.0214 0.635742" }),
				V("path", { d: "M12.0013 0.635742L15.0013 0.635742" }),
				V("path", { d: "M16.9816 0.635742L19.9816 0.635742" }),
				V("path", { d: "M22.0222 0.635742L25.0222 0.635742" }),
				V("path", { d: "M31.0219 6.63574L31.0219 9.63574" }),
				V("path", { d: "M31.0219 11.6152L31.0219 14.6152" }),
				V("path", { d: "M31.0219 16.5957L31.0219 19.5957" }),
				V("path", { d: "M31.0219 21.6367L31.0219 24.6367" })
			]
		})
	] });
}, Mw = function() {
	return H(B, { children: [
		V("symbol", {
			id: "nucleotide",
			viewBox: "0 0 84 84",
			width: "42",
			height: "42",
			children: V("path", {
				className: "monomer-body",
				"data-actual-width": "42",
				"data-actual-height": "42",
				d: "M43.0152 71.4019C42.3887 71.771 41.6113 71.771 40.9848 71.4019L9.25584 52.7093C8.50744 52.2684 8.1292 51.3948 8.31974 50.5473L16.6358 13.5613C16.841 12.6485 17.6516 12 18.5871 12L65.4129 12C66.3484 12 67.159 12.6485 67.3642 13.5613L75.6803 50.5473C75.8708 51.3948 75.4926 52.2684 74.7442 52.7093L43.0152 71.4019Z",
				transform: "rotate(180, 42, 42)"
			})
		}),
		V("symbol", {
			id: "nucleotide-hover",
			viewBox: "0 0 84 84",
			width: "42",
			height: "42",
			children: V("path", {
				"data-actual-width": "42",
				"data-actual-height": "42",
				d: "M43.0152 71.4019C42.3887 71.771 41.6113 71.771 40.9848 71.4019L9.25584 52.7093C8.50744 52.2684 8.1292 51.3948 8.31974 50.5473L16.6358 13.5613C16.841 12.6485 17.6516 12 18.5871 12L65.4129 12C66.3484 12 67.159 12.6485 67.3642 13.5613L75.6803 50.5473C75.8708 51.3948 75.4926 52.2684 74.7442 52.7093L43.0152 71.4019Z",
				transform: "rotate(180, 42, 42)",
				fill: "none",
				stroke: "#0097A8",
				strokeWidth: "3"
			})
		}),
		H("symbol", {
			id: "nucleotide-autochain-preview",
			viewBox: "0 0 36 32",
			width: "36",
			height: "32",
			"data-actual-width": "36",
			"data-actual-height": "32",
			children: [
				V("path", { d: "M20.3771 2.38574L18.5929 1.0722C18.2402 0.812609 17.7598 0.812609 17.4071 1.0722L15.6229 2.38574M32.6021 11.3857L34.4405 12.7392C34.7769 12.9868 34.9239 13.4174 34.8092 13.8191L34.2725 15.6985M3.39787 11.3857L1.55948 12.7392C1.2231 12.9868 1.07608 13.4174 1.19078 13.8191L1.72751 15.6985M30.8088 27.8266L30.2138 29.9168C30.0914 30.3466 29.6988 30.643 29.252 30.643H27.0063M5.19116 27.8266L5.7931 29.9194C5.91633 30.3479 6.30831 30.643 6.75414 30.643H9.00194" }),
				V("path", { d: "M10.5017 30.6426L13.5017 30.6426" }),
				V("path", { d: "M16.5032 30.6426L19.5032 30.6426" }),
				V("path", { d: "M22.5046 30.6426L25.5046 30.6426" }),
				V("path", { d: "M2.23663 17.4971L3.06363 20.3808" }),
				V("path", { d: "M3.83911 23.0859L4.66611 25.9697" }),
				V("path", { d: "M22.356 3.85059L25.5765 6.22306" }),
				V("path", { d: "M27.5099 7.64746L30.7304 10.0199" }),
				V("path", { d: "M13.605 3.85156L10.3846 6.22404" }),
				V("path", { d: "M8.45105 7.64844L5.23059 10.0209" }),
				V("path", { d: "M33.7705 17.4971L32.9435 20.3808" }),
				V("path", { d: "M32.168 23.0859L31.341 25.9697" })
			]
		})
	] });
}, Nw = function() {
	return H(B, { children: [
		V("path", {
			strokeLinecap: "round",
			d: "M5,0 0,2.5 5,5z",
			id: "arrow-marker-content"
		}),
		V("marker", {
			id: "arrow-marker",
			markerHeight: "3",
			markerWidth: "5",
			orient: "auto",
			refX: "2.5",
			refY: "1.5",
			children: V("use", {
				href: "#arrow-marker-content",
				transform: "rotate(180 2.5 1.5) scale(1,0.6)",
				strokeWidth: "1.2500",
				fill: "black",
				stroke: "none"
			})
		}),
		V("marker", {
			id: "arrow-marker-arc",
			markerWidth: "5",
			markerHeight: "5",
			viewBox: "0 0 5 5",
			refX: "5",
			refY: "2.5",
			orient: "auto",
			children: V("use", {
				href: "#arrow-marker-content",
				transform: "rotate(180, 2.5, 2.5)",
				fill: "#365CFF",
				stroke: "none"
			})
		})
	] });
}, Pw = function() {
	return V("symbol", {
		id: "sequence-start-arrow",
		viewBox: "0 0 65 65",
		width: "65",
		height: "95",
		children: V("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 12 12",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			children: V("path", {
				d: "M10.2802 5.09664C10.9756 5.49813 10.9756 6.50187 10.2802 6.90336L2.56467 11.3579C1.86926 11.7594 1 11.2576 1 10.4546V1.54541C1 0.742426 1.86926 0.240558 2.56467 0.642053L10.2802 5.09664Z",
				stroke: "#7C7C7F"
			})
		})
	});
}, Fw = P("div", { target: "e1phidy70" })({
	name: "1fayh9l",
	styles: "padding:12px;font-size:12px;color:#000"
}), Iw = function() {
	var e = Y(), t = X(M_), n = X(N_) || "Error message", r = t !== "", i = function() {
		e(D_());
	};
	return H(Z, {
		isOpen: r,
		title: n,
		onClose: i,
		testId: "info-modal-window",
		children: [V(Z.Content, { children: V(Fw, {
			"data-testid": "error-message-body",
			children: t
		}) }), V(Z.Footer, { children: V(MS, {
			label: "Close",
			clickHandler: i,
			"data-testid": "info-modal-close"
		}) })]
	});
}, Lw = P("div", { target: "embh3ih3" })(function() {
	return { height: "100%" };
}, ""), Rw = P("div", { target: "embh3ih2" })(function() {
	return {
		display: "flex",
		alignItems: "center"
	};
}, ""), zw = P("div", { target: "embh3ih1" })(function() {
	return {
		background: "",
		"&.toggler-component-wrapper--disabled": {
			opacity: .4,
			pointerEvents: "none",
			cursor: "default"
		}
	};
}, ""), Bw = P("svg", { target: "embh3ih0" })(function() {
	return {
		"&.handCursor": { cursor: "\n      url('data:image/svg+xml;base64,PHN2ZwogICAgICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgICAgICB3aWR0aD0iMjQiCiAgICAgICAgaGVpZ2h0PSIyNCIKICAgICAgICBmaWxsPSJub25lIgogICAgICAgIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICA8cGF0aAogICAgICAgICAgICBmaWxsPSIjMDAwIgogICAgICAgICAgICBkPSJNMjAuNDM0IDcuNjczYy0uMS0uNi0uNzEzLTEuNzMxLTIuMzItMS43MzEtLjEyNiAwLS4yNTIuMDA3LS4zNzcuMDIzdi0uNzlhMS4wMSAxLjAxIDAgMCAwLS4wNDUtLjNjLS4xNzctLjU2NC0uODc2LTEuNjMxLTIuMjYyLTEuNjMxYTIuNTk5IDIuNTk5IDAgMCAwLS42NzYuMDg2IDIuMzk0IDIuMzk0IDAgMCAwLS4xNDYtLjIzYy0uNDUzLS42NDUtMS4xODYtMS0yLjA2My0xLS44NzcgMC0xLjU4NC4zNi0yLjAyNSAxLjAxN2EyLjQ2MSAyLjQ2MSAwIDAgMC0uMzYxLjg1IDIuNjYzIDIuNjYzIDAgMCAwLS40MDgtLjAzYy0xLjQ3NCAwLTIuMTI0IDEuMTUtMi4yNjIgMS43NTdhMS4wMzQgMS4wMzQgMCAwIDAtLjAyNC4yMjJWMTEuMWwtLjEzLS4xYy0uNTg4LS41LTIuMDM0LTEuMTIxLTMuMzkxLjAyOS0xLjM1NyAxLjE1LTEuMDE1IDIuNjY0LS40MzEgMy40NTIuNDUzLjc3MyA0LjUxMiA3LjQyNSAxMC4yMjMgNy40MjUgMy4yNSAwIDQuOTEtMS41MTIgNS43MjktMi43ODFhNi4yOTEgNi4yOTEgMCAwIDAgLjk4LTIuOFY3LjgzOGMuMDAxLS4wNTYtLjAwMy0uMTEtLjAxMS0uMTY1WiIKICAgIC8+CiAgICA8cGF0aAogICAgICAgICAgICBmaWxsPSIjZmZmIgogICAgICAgICAgICBzdHJva2U9IiNmZmYiCiAgICAgICAgICAgIGQ9Ik0xOC40NDggMTYuMjE1YTQuNDc0IDQuNDc0IDAgMCAxLS43IDEuODg3Yy0uODA1IDEuMi0yLjE1MyAxLjgtNC4wMDggMS44LTQuNzY4IDAtOC40ODQtNi40MTItOC41Mi02LjQ3NmEuNjY5LjY2OSAwIDAgMC0uMDktLjEyNmMtLjI5NC0uNDA4IDAtLjY1NS4xMDctLjc0OC4yNjctLjIyNy41NC0uMjM3LjgxLS4wMzFsMS43NyAxLjQ1MmExIDEgMCAwIDAgMS42NDQtLjc2M1Y2LjA4YS4yODcuMjg3IDAgMCAxIC4yOS0uMTQ4LjQ0LjQ0IDAgMCAxIC4zNzIuMTZ2NC43YTEgMSAwIDEgMCAyIDB2LTYuNDVjLjA2OC0uMjQ4LjMtLjI0OC40MjItLjI0OC4yIDAgLjQxNC4wMzIuNDgyLjI1NXY2LjQ0YTEgMSAwIDEgMCAyIDB2LTUuMmEuNzUuNzUgMCAwIDEgLjA3NC0uMTljLjA0OS0uMDgxLjEwOC0uMTUuMzI1LS4xNWEuMzUuMzUgMCAwIDEgLjMwNy4xNXY1LjM5YTEgMSAwIDEgMCAyIDBWOC4wNDdhLjU4My41ODMgMCAwIDEgLjM3Ny0uMWMuMDY1IDAgLjI1OC4wMDYuMzM0LjA3OGwuMDA0IDguMTlaIgogICAgLz4KPC9zdmc+Cg=='),\n      auto\n    " },
		"&.handCursorGrabbing": { cursor: "\n      url('data:image/svg+xml;base64,PHN2ZwogICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICAgd2lkdGg9IjI0IgogICAgaGVpZ2h0PSIyNCIKICAgIGZpbGw9Im5vbmUiCiAgICB2aWV3Qm94PSIwIDAgMzAgMzAiCiAgPgogICAgPHBhdGgKICAgICAgZmlsbD0iI2ZmZiIKICAgICAgZD0iTTEwLjc0NCAzQzguODkgMyA3LjM4NCA0LjUyNSA3LjM4NCA2LjR2LjIyaC0uMDEyYy0xLjk5NyAwLTMuNjIyIDEuNjAyLTMuNjIyIDMuNTY4bC4wMDEgNy4wMmMwIDEuNzcgMS41MTIgMy41MTUgMy4xMTIgNS4zNjEuNzIuODMgMS45MTkgMi4yMTYgMi4wMzQgMi43MzF2MS41MjJoMTMuNDQydi0xLjU1NGMwLS41OS42MTgtMS43NyAxLjE2My0yLjgxLjkzOC0xLjc4OSAxLjk5OC0zLjgxNSAxLjk5OC01Ljk5MSAwLTMuMjU4LS4wMS02LjI0OC0uMDEtNi4yNDggMC0xLjY5Ni0xLjM5LTMuMDgtMy4xLTMuMDgtLjIwMyAwLS40LjAyLS41OTIuMDU3YTMuNjUgMy42NSAwIDAgMC0zLjAzMy0xLjYwN2MtLjM2NyAwLS43Mi4wNTMtMS4wNTUuMTUzYTMuNjM2IDMuNjM2IDAgMCAwLTMuMDktMS43MDVjLS40NDQgMC0uODcuMDgtMS4yNjQuMjI1QTMuMzQ1IDMuMzQ1IDAgMCAwIDEwLjc0NCAzWiIKICAgIC8+CiAgICA8cGF0aAogICAgICBmaWxsPSIjMDAwIgogICAgICBkPSJNMTAuNzQ0IDQuNTU0YzEgMCAxLjgwOC44MjYgMS44MDggMS44NDV2MS4xOTdjMC0xLjEwOS45MjctMi4wMDggMi4wNjgtMi4wMDggMS4xNDMgMCAyLjA2OC45IDIuMDY4IDIuMDA4djEuNTUyYzAtMS4xMS45My0yLjAwOCAyLjA3Ny0yLjAwOCAxLjE0NyAwIDIuMDc2Ljg5OSAyLjA3NiAyLjAwOHYxLjA2OEExLjU0IDEuNTQgMCAwIDEgMjIuMzkgOC42OWMuODU2IDAgMS41NDguNjg0IDEuNTQ4IDEuNTMgMCAwIC4wMSAyLjk4OC4wMSA2LjI0NCAwIDMuMjU3LTMuMTYxIDYuNjM2LTMuMTYxIDguODAySDEwLjQ1YzAtMS45NC01LjE0Ni01Ljc3My01LjE0Ni04LjA2MXYtNy4wMmMwLTEuMTEyLjkyNi0yLjAxNCAyLjA3LTIuMDE1djQuMDUxYzAgLjM0Mi4zNS42Mi43ODEuNjIuNDMyIDAgLjc4Mi0uMjc4Ljc4Mi0uNjJWNi40YzAtMS4wMi44MDktMS44NDUgMS44MDctMS44NDVabTAtMS41NTRDOC44OSAzIDcuMzg0IDQuNTI1IDcuMzg0IDYuNHYuMjJoLS4wMTJjLTEuOTk3IDAtMy42MjIgMS42MDItMy42MjIgMy41NjhsLjAwMSA3LjAyYzAgMS43NyAxLjUxMiAzLjUxNSAzLjExMiA1LjM2MS43Mi44MyAxLjkxOSAyLjIxNiAyLjAzNCAyLjczMXYxLjUyMmgxMy40NDJ2LTEuNTU0YzAtLjU5LjYxOC0xLjc3IDEuMTYzLTIuODEuOTM4LTEuNzg5IDEuOTk4LTMuODE1IDEuOTk4LTUuOTkxIDAtMy4yNTgtLjAxLTYuMjQ4LS4wMS02LjI0OCAwLTEuNjk2LTEuMzktMy4wOC0zLjEtMy4wOC0uMjAzIDAtLjQuMDItLjU5Mi4wNTdhMy42NSAzLjY1IDAgMCAwLTMuMDMzLTEuNjA3Yy0uMzY3IDAtLjcyLjA1My0xLjA1NS4xNTNhMy42MzYgMy42MzYgMCAwIDAtMy4wOS0xLjcwNWMtLjQ0NCAwLS44Ny4wOC0xLjI2NC4yMjVBMy4zNDUgMy4zNDUgMCAwIDAgMTAuNzQ0IDNaIgogICAgLz4KICA8L3N2Zz4='),\n      auto\n    " }
	};
}, "");
function Vw() {
	var e = X(vg), t = I((0, z.useState)(!1), 2), n = t[0], r = t[1], i;
	try {
		i = xt.getKetcher(e);
	} catch (t) {
		Lt.error(`Failed to get ketcher instance with id ${e}`, t);
	}
	var a = (0, z.useCallback)(function() {
		return r(!0);
	}, [r]), o = (0, z.useCallback)(function() {
		return r(!1);
	}, [r]);
	return (0, z.useEffect)(function() {
		var e, t, n;
		return (e = i) == null || e.eventBus.addListener(ve.LOADING, a), (t = i) == null || t.eventBus.addListener(ve.SUCCESS, o), (n = i) == null || n.eventBus.addListener(ve.FAILURE, o), function() {
			var e, t, n;
			(e = i) == null || e.eventBus.removeListener(ve.LOADING, a), (t = i) == null || t.eventBus.removeListener(ve.SUCCESS, o), (n = i) == null || n.eventBus.removeListener(ve.FAILURE, o);
		};
	}, [
		i?.eventBus,
		o,
		a
	]), n;
}
function Hw(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Uw(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Hw(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Hw(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Ww(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (!n) {
		if (Array.isArray(e) || (n = Gw(e)) || t && e && typeof e.length == "number") {
			n && (e = n);
			var r = 0, i = function() {};
			return {
				s: i,
				n: function() {
					return r >= e.length ? { done: !0 } : {
						done: !1,
						value: e[r++]
					};
				},
				e: function(e) {
					throw e;
				},
				f: i
			};
		}
		throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	var a, o = !0, s = !1;
	return {
		s: function() {
			n = n.call(e);
		},
		n: function() {
			var e = n.next();
			return o = e.done, e;
		},
		e: function(e) {
			s = !0, a = e;
		},
		f: function() {
			try {
				o || n.return == null || n.return();
			} finally {
				if (s) throw a;
			}
		}
	};
}
function Gw(e, t) {
	if (e) {
		if (typeof e == "string") return Kw(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Kw(e, t) : void 0;
	}
}
function Kw(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function qw() {
	var e = Y(), t = X(W), n = X(y_);
	(0, z.useEffect)(function() {
		if (t) {
			var r = t.monomersLibrary, i = w(Dy(r, n.length ? n : t.defaultRnaPresetsLibraryItems, !0)), a = L_(), o = [], s = i.map(function(e) {
				return e.name;
			});
			if (a) {
				var c = Ww(a), l;
				try {
					for (c.s(); !(l = c.n()).done;) {
						for (var u = l.value, d = 0, f = u.name; s.includes(f);) d++, f = `${u.name}${"_Copy".repeat(d)}`;
						f !== u.name && z_(Uw(Uw({}, u), {}, { name: f }));
					}
				} catch (e) {
					c.e(e);
				} finally {
					c.f();
				}
				a = L_(), o = Dy(r, a);
			}
			return e(r_(r)), e(a_(null)), e(Av(i)), a && e(jv(o)), e(Pv()), function() {
				e(r_([])), e(Fv());
			};
		}
	}, [t, n]);
}
function Jw() {
	(0, z.useEffect)(function() {
		var e = `https://github.com/epam/ketcher/blob/${{}.HELP_LINK || "master"}/documentation/help.md#ketcher-macromolecules-mode`, t = function(t) {
			if (!t.defaultPrevented) {
				var n = t.target;
				if (!(n && (n.tagName === "INPUT" || n.tagName === "TEXTAREA" || n.isContentEditable || n.closest("[contenteditable=\"true\"]"))) && (t.key === "?" || t.key === "/" && t.shiftKey) && !t.repeat) {
					var r, i;
					t.preventDefault(), (r = window.open(e, "_blank")) == null || (i = r.focus) == null || i.call(r);
				}
			}
		};
		return window.addEventListener("keydown", t), function() {
			return window.removeEventListener("keydown", t);
		};
	}, []);
}
var Yw = P("div", { target: "ex562360" })({
	name: "1vtgpt7",
	styles: "position:absolute;top:0;left:0;height:100%;width:100%;display:flex;justify-content:center;align-items:center"
}), Xw = function() {
	return V(Yw, { children: V(eS, {}) });
}, Zw = function(e) {
	e.requestFullscreen ? e.requestFullscreen() : e.msRequestFullscreen ? e.msRequestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen && e.webkitRequestFullscreen();
}, Qw = function() {
	document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen();
}, $w = function() {
	return !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
}, eT = P("div", { target: "e1yct69a0" })({
	name: "14ocoqf",
	styles: "display:flex;& svg:first-of-type{display:flex;justify-content:center;align-items:center;width:24px;height:24px;padding:2px;border-radius:4px;}"
}), tT = function(e) {
	var t = I((0, z.useState)($w()), 2), n = t[0], r = t[1];
	return V(eT, {
		className: e.className,
		children: V(dn, {
			onClick: function() {
				var e = wt();
				n ? Qw() : Zw(e), r(!n);
			},
			iconName: n ? "fullscreen-exit" : "fullscreen-enter",
			testId: "fullscreen-mode-button"
		})
	});
}, nT = function() {
	return z.useContext(My);
}, rT = P(dn, { target: "e1erwxoo0" })({
	name: "1y95nj0",
	styles: "margin:2px;outline:none"
});
function iT() {
	var e;
	(e = document.activeElement) == null || e.blur();
}
var aT = P(Fn, { target: "e1ann9o40" })({
	name: "2gmlyg",
	styles: "display:flex;justify-content:space-between;font-weight:400;font-size:12px;line-height:14px;padding:7px 8px;text-transform:none;color:#333333;width:max-content"
}), oT = function(e) {
	var t = e.itemId, n = e.title, r = n === void 0 ? "" : n, i = e.disabled, a = e.testId, o = e.onClick, s = e.type, c = s === void 0 ? "icon-button" : s, l = nT(), u = l.isActive, d = l.activate, f = (0, z.useCallback)(function() {
		d(t), iT(), o && o();
	}, [d, t]), p = u(t);
	return V(B, { children: c === "icon-button" ? V(rT, {
		title: r,
		className: t + (p ? " active" : ""),
		isActive: p,
		onClick: f,
		iconName: t,
		testId: a,
		disabled: i
	}) : V(aT, {
		title: r,
		onClick: f,
		disabled: i,
		"data-testid": a,
		children: r
	}) });
}, sT = P(F, {
	shouldForwardProp: function(e) {
		return e !== "isActive";
	},
	target: "e13kdqxv4"
})("position:absolute;height:7px;width:7px;right:3px;bottom:3px;cursor:pointer;path{fill:", function(e) {
	return e.isActive ? "white" : void 0;
}, ";}"), cT = P("div", { target: "e13kdqxv3" })({
	name: "k5saax",
	styles: "display:flex;position:relative;align-items:center;&:active{.dropdown{fill:white;}}"
}), lT = P("div", { target: "e13kdqxv2" })("display:flex;border-radius:4px;flex-direction:", function(e) {
	return e.isVertical ? "column" : "row";
}, ";z-index:1;background-color:white;padding:2px;width:", function(e) {
	var t = e.isVertical, n = e.isAutoSize;
	return t && !n ? "38px" : "auto";
}, ";height:", function(e) {
	var t = e.isVertical, n = e.isAutoSize;
	return t || n ? "auto" : "38px";
}, ";"), uT = P(rn, { target: "e13kdqxv1" })({
	name: "a4hmbt",
	styles: "position:absolute"
}), dT = P("div", { target: "e13kdqxv0" })({
	name: "a1qh1t",
	styles: "display:flex;align-items:center;position:relative;width:32px;height:32px;padding:0;justify-content:center;border-radius:2px"
});
function fT(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function pT(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? fT(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : fT(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var mT = function(e) {
	var t = e.children, n = e.vertical, r = n === void 0 ? !1 : n, i = e.autoSize, a = i === void 0 ? !1 : i, o = e.disabled, s = o === void 0 ? !1 : o, c = e.needOpenByMenuItemClick, l = c === void 0 ? !1 : c, u = e.testId, d = e.layoutModeButton, f = d === void 0 ? !1 : d, p = e.generalTitle, m = e.activeItem, h = e.subMenuId, g = Y(), _ = (0, z.useRef)(null), v = I((0, z.useState)(!1), 2), y = v[0], b = v[1], x = nT().isActive, S = I(Xe([
		_,
		y,
		r,
		On
	]), 1)[0], C = X(Ng(h)), w = h ? C : null, T = function() {
		s || b(function(e) {
			return !e;
		});
	}, E = function() {
		y && b(!1);
	}, D = z.Children.map(t, function(e) {
		return e.type === oT ? e : null;
	}), O = D.map(function(e) {
		return e.props.itemId;
	}).filter(function(e) {
		return e;
	}), k = O.filter(function(e) {
		return x(e);
	})[0];
	(0, z.useEffect)(function() {
		h && k && k !== w && g(hg({
			groupName: h,
			activeItemName: k
		}));
	}, [
		g,
		h,
		k,
		w
	]);
	var ee = m ?? (k || w || O[0]), te = D.find(function(e) {
		return e.props.itemId === ee;
	}), ne = te?.props.testId, re = p ?? te?.props.title, A = document.querySelector(On);
	return V(cT, {
		"data-testid": u,
		ref: _,
		children: H(B, { children: [H(dT, { children: [V(oT, {
			disabled: s,
			itemId: ee,
			title: re,
			testId: ne,
			onClick: l ? T : wy
		}), y || V(sT, {
			className: "dropdown",
			name: "dropdown",
			onClick: T,
			isActive: x(ee),
			dataTestId: "dropdown-expand"
		})] }), A && (0, ts.createPortal)(V(uT, {
			in: y,
			timeout: 0,
			style: pT({}, S),
			unmountOnExit: !0,
			onClick: E,
			children: V(we, {
				onClickAway: E,
				children: V(lT, {
					isVertical: r,
					isAutoSize: a,
					islayoutModeButton: f,
					"data-testid": "multi-tool-dropdown",
					children: D.map(function(e) {
						return z.cloneElement(e, { key: e.props.itemId });
					})
				})
			})
		}), A)] })
	});
}, hT = P("div", { target: "e1fh0ozy3" })(function(e) {
	var t = e.theme, n = e.isHorizontal;
	return {
		backgroundColor: t.ketcher.color.background.primary,
		borderRadius: "4px",
		display: "flex",
		flexDirection: n ? "row" : "column",
		zIndex: t.ketcher.zIndex.toolbar
	};
}, ""), gT = P("hr", { target: "e1fh0ozy2" })("width:18px;margin:6px 0;align-self:center;border-width:thin 0px 0px 0px;border-style:solid;border-color:", function(e) {
	return e.theme.ketcher.color.divider;
}, ";"), _T = P("hr", { target: "e1fh0ozy1" })("height:18px;margin:0px 6px;align-self:center;border-width:0px thin 0px 0px;border-style:solid;border-color:", function(e) {
	return e.theme.ketcher.color.divider;
}, ";"), vT = P("div", { target: "e1fh0ozy0" })(function(e) {
	var t = e.theme, n = e.isHorizontal;
	return {
		display: "flex",
		flexDirection: n ? "row" : "column",
		flexWrap: "nowrap",
		alignItems: "center",
		backgroundColor: t.ketcher.color.background.primary,
		borderRadius: "2px",
		width: n ? void 0 : "32px",
		marginBottom: n ? void 0 : "8px",
		"> :last-child": n ? void 0 : { marginBottom: 0 }
	};
}, ""), yT = function(e) {
	var t = e.children, n = e.divider, r = n === void 0 ? !1 : n, i = e.isHorizontal;
	return H(B, { children: [V(vT, {
		isHorizontal: i,
		children: z.Children.map(t, function(e) {
			return e;
		})
	}), r && V(i ? _T : gT, {})] });
}, Q = function(e) {
	var t = e.children, n = e.onItemClick, r = e.activeMenuItems, i = e.testId, a = e.isHorizontal, o = z.useMemo(function() {
		return {
			isActive: function(e) {
				return r ? r.includes(e) : !1;
			},
			activate: function(e) {
				n(e);
			}
		};
	}, [r, n]), s = z.Children.map(t, function(e) {
		return e && e.type === yT ? e : null;
	});
	return V(My.Provider, {
		value: o,
		children: V(hT, {
			"data-testid": i,
			isHorizontal: a,
			children: s
		})
	});
};
Q.Group = yT, Q.Item = oT, Q.Submenu = mT;
var bT = function() {
	var e = X(W), t = Ay(), n = I((0, z.useState)(t), 2), r = n[0], i = n[1], a = X(yg), o = (0, z.useMemo)(function() {
		return {
			isActive: function(e) {
				return r === e;
			},
			activate: function(t) {
				t !== r && (i(t), e?.events.selectMode.dispatch(t), e?.events.layoutModeChange.dispatch(t));
			}
		};
	}, [r, e]);
	return (0, z.useEffect)(function() {
		i(t);
	}, [t]), V(My.Provider, {
		value: o,
		children: H(Q.Submenu, {
			disabled: a,
			testId: "layout-mode",
			vertical: !0,
			needOpenByMenuItemClick: !0,
			layoutModeButton: !0,
			children: [
				V(Q.Item, {
					itemId: "sequence-layout-mode",
					testId: "sequence-layout-mode",
					title: "Switch to sequence layout mode"
				}),
				V(Q.Item, {
					itemId: "snake-layout-mode",
					testId: "snake-layout-mode",
					title: "Switch to snake layout mode"
				}),
				V(Q.Item, {
					itemId: "flex-layout-mode",
					testId: "flex-layout-mode",
					title: "Switch to flex layout mode"
				})
			]
		})
	});
};
function xT(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (!n) {
		if (Array.isArray(e) || (n = ST(e)) || t && e && typeof e.length == "number") {
			n && (e = n);
			var r = 0, i = function() {};
			return {
				s: i,
				n: function() {
					return r >= e.length ? { done: !0 } : {
						done: !1,
						value: e[r++]
					};
				},
				e: function(e) {
					throw e;
				},
				f: i
			};
		}
		throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	var a, o = !0, s = !1;
	return {
		s: function() {
			n = n.call(e);
		},
		n: function() {
			var e = n.next();
			return o = e.done, e;
		},
		e: function(e) {
			s = !0, a = e;
		},
		f: function() {
			try {
				o || n.return == null || n.return();
			} finally {
				if (s) throw a;
			}
		}
	};
}
function ST(e, t) {
	if (e) {
		if (typeof e == "string") return CT(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? CT(e, t) : void 0;
	}
}
function CT(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
var wT = function(e) {
	var t = [], n = xT(e), r;
	try {
		for (n.s(); !(r = n.n()).done;) {
			var i = r.value, a = i.node, o = i.nodeIndexOverall, s = i.isNucleosideConnectedAndSelectedWithPhosphate, c = i.hasR1Connection, l = !!i.twoStrandedNode?.antisenseNode;
			if (a instanceof A) {
				var u, d, f;
				t.push({
					type: at.Nucleotide,
					baseLabel: a == null || (u = a.rnaBase) == null ? void 0 : u.label,
					sugarLabel: a == null || (d = a.sugar) == null ? void 0 : d.label,
					phosphateLabel: a == null || (f = a.phosphate) == null ? void 0 : f.label,
					rnaBaseMonomerItem: a.rnaBase instanceof mn ? a.rnaBase.variantMonomerItem : a.rnaBase.monomerItem,
					hasR1Connection: c,
					nodeIndexOverall: o,
					hasAntisense: l
				});
			} else if (a instanceof T) {
				var p, m;
				t.push({
					type: at.Nucleoside,
					baseLabel: a == null || (p = a.rnaBase) == null ? void 0 : p.label,
					sugarLabel: a == null || (m = a.sugar) == null ? void 0 : m.label,
					rnaBaseMonomerItem: a.rnaBase instanceof mn ? a.rnaBase.variantMonomerItem : a.rnaBase.monomerItem,
					isNucleosideConnectedAndSelectedWithPhosphate: s,
					hasR1Connection: c,
					nodeIndexOverall: o,
					hasAntisense: l
				});
			} else if (a?.monomer instanceof Ee) {
				var h;
				t.push({
					type: at.Phosphate,
					phosphateLabel: a == null || (h = a.monomer) == null ? void 0 : h.label,
					nodeIndexOverall: o,
					hasAntisense: l
				});
			}
		}
	} catch (e) {
		n.e(e);
	} finally {
		n.f();
	}
	return t;
};
function TT(e) {
	var t = e.node;
	return t instanceof A || t instanceof T || t?.monomer instanceof Ee;
}
var ET = function(e) {
	for (var t = "", n = e.length === 1 ? e[0] : $o.merge.apply(void 0, [{}].concat(w(e))), r = 0, i = [
		"sugarLabel",
		"baseLabel",
		"phosphateLabel"
	]; r < i.length; r++) {
		var a = i[r], o = (0, $o.get)(n, a, "");
		a === "baseLabel" ? t += `(${o})` : t += o;
	}
	return t;
}, DT = function(e) {
	if (e != null && e.length) {
		for (var t = (0, $o.flatten)(e), n = t.length, r = rx(t), i, a = !1, o = !0, s = !1, c = !0, l = wT(t), u = 0; u < l.length; u++) {
			var d = l[u], f = l[u - 1], p = d.type === at.Nucleotide || d.type === at.Nucleoside, m = f?.isNucleosideConnectedAndSelectedWithPhosphate;
			p && (a = !0), p || m ? d.hasR1Connection && (c = !1) : (c = !1, o = !1), d.hasAntisense && (s = !0);
		}
		return n > r && (t.every(TT) || (o = !1)), i = n === 1 || r === 1 && o ? ET(l) : o ? `${r} nucleotides` : `${n} elements`, {
			title: i,
			selectedSequenceLabeledNodes: l,
			isSelectedOnlyNucleoelements: o,
			isSelectedAtLeastOneNucleoelement: a,
			isSequenceFirstsOnlyNucleoelementsSelected: c,
			hasAntisense: s
		};
	}
};
function OT() {
	return (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []).every(function(e) {
		return e.every(function(e) {
			return Tt(e.twoStrandedNode);
		});
	});
}
function kT(e) {
	return e?.monomers.some(function(e) {
		return e.hydrogenBonds.length !== 0;
	});
}
function AT(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (!n) {
		if (Array.isArray(e) || (n = jT(e)) || t && e && typeof e.length == "number") {
			n && (e = n);
			var r = 0, i = function() {};
			return {
				s: i,
				n: function() {
					return r >= e.length ? { done: !0 } : {
						done: !1,
						value: e[r++]
					};
				},
				e: function(e) {
					throw e;
				},
				f: i
			};
		}
		throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	var a, o = !0, s = !1;
	return {
		s: function() {
			n = n.call(e);
		},
		n: function() {
			var e = n.next();
			return o = e.done, e;
		},
		e: function(e) {
			s = !0, a = e;
		},
		f: function() {
			try {
				o || n.return == null || n.return();
			} finally {
				if (s) throw a;
			}
		}
	};
}
function jT(e, t) {
	if (e) {
		if (typeof e == "string") return MT(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? MT(e, t) : void 0;
	}
}
function MT(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
var NT = function(e) {
	return e.map(function(e) {
		return e.monomerItem.props.MonomerNaturalAnalogCode;
	}).sort(function(e, t) {
		return e.localeCompare(t);
	}).join("");
}, PT = function(e) {
	var t = e.monomerItem;
	if (t.props.MonomerNaturalAnalogCode === "A" || t.props.MonomerNaturalAnalogCode === "C" || t.props.MonomerNaturalAnalogCode === "G" || t.props.MonomerNaturalAnalogCode === "T" || t.props.MonomerNaturalAnalogCode === "U") return !0;
	if (!e.monomerItem.isAmbiguous || e.subtype === Me.MIXTURE) return !1;
	var n = [
		"ACGT",
		"ACGU",
		"CGT",
		"CGU",
		"AGT",
		"AGU",
		"ACT",
		"ACU",
		"GT",
		"GU",
		"AT",
		"AU",
		"CT",
		"CU",
		"AC",
		"AG",
		"CG",
		"ACG"
	], r = NT(e.monomers);
	return n.some(function(e) {
		return e === r;
	});
}, FT = function(e) {
	return e?.some(function(e) {
		var t = e instanceof Ke && Xt(e);
		return e instanceof Ln && (e.hydrogenBonds.length > 0 || e.covalentBonds.length > 1) || Ut(e) && !PT(e) || t && (t.hydrogenBonds.length > 0 || !PT(t));
	});
}, IT = function(e) {
	return e?.every(function(e) {
		return e instanceof Ke ? e.label === p.SUGAR_DNA : !0;
	});
}, LT = function(e) {
	return e?.every(function(e) {
		return e instanceof Ke ? e.label === p.SUGAR_RNA : !0;
	});
}, RT = function(e) {
	return e?.some(function(e) {
		return e instanceof Ln && fn(e) || e instanceof Ke && Xt(e);
	});
}, zT = "aminoAcidModification-", BT = function(e) {
	var t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map(), i = Dt.provideEditorInstance();
	e.forEach(function(e) {
		var t, n = e.monomerItem.props.MonomerNaturalAnalogCode;
		!(e instanceof ue) || !n || (r.has(n) || r.set(n, []), (t = r.get(n)) == null || t.push(e));
	}), i?.monomersLibrary.forEach(function(e) {
		var i = r.get(e.props?.MonomerNaturalAnalogCode);
		if (!(!e.props || !i)) {
			var a = e.props.modificationTypes;
			a && a.forEach(function(r) {
				if (i.some(function(t) {
					return t.label !== e.label && !mt(t, e);
				})) {
					n.add(r);
					return;
				}
				i.every(function(t) {
					return t.label === e.label;
				}) || t.add(r);
			});
		}
	});
	var a = w(t.values()).filter(function(e) {
		return !n.has(e);
	}).map(function(t) {
		var n = kt(e, t, i.monomersLibrary);
		return {
			name: `${zT}${t}`,
			title: t,
			onMouseOver: function() {
				i.transientDrawingView.showModifyAminoAcidsView({ monomersToModify: w(n.keys()) }), i.transientDrawingView.update();
			},
			onMouseOut: function() {
				i.transientDrawingView.hideModifyAminoAcidsView(), i.transientDrawingView.update();
			}
		};
	});
	return a.sort(gn), a;
}, VT = function(e, t) {
	var n, r, i = t == null || (n = t.target) == null ? void 0 : n.__data__, a = i == null || (r = i.node) == null ? void 0 : r.monomer, o = [];
	return e.length ? o = e : a && (o = [a]), o.filter(function(e) {
		return e instanceof ue;
	});
}, HT = function(e) {
	if (e.length < 3) return !1;
	var t = new Set(e), n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set(), i = function(e) {
		var n = [];
		return e.forEachBond(function(r) {
			if (!(r instanceof be)) {
				var i = r.firstMonomer, a = r.secondMonomer;
				if (!(!i || !a)) {
					var o = r.getAnotherMonomer(e);
					o && t.has(o) && n.push(o);
				}
			}
		}), n;
	}, a = function e(t, a) {
		n.add(t), r.add(t);
		var o = AT(i(t)), s;
		try {
			for (o.s(); !(s = o.n()).done;) {
				var c = s.value;
				if (c !== a && (r.has(c) || !n.has(c) && e(c, t))) return !0;
			}
		} catch (e) {
			o.e(e);
		} finally {
			o.f();
		}
		return r.delete(t), !1;
	}, o = AT(e), s;
	try {
		for (o.s(); !(s = o.n()).done;) {
			var c = s.value;
			if (!n.has(c) && a(c, null)) return !0;
		}
	} catch (e) {
		o.e(e);
	} finally {
		o.f();
	}
	return !1;
}, $;
(function(e) {
	e.title = "sequence_menu_title", e.createRnaAntisenseStrand = "create_antisense_rna_chain", e.createDnaAntisenseStrand = "create_antisense_dna_chain", e.modifyInRnaBuilder = "modify_in_rna_builder", e.modifyAminoAcids = "modify_amino_acids", e.establishHydrogenBond = "establish_hydrogen_bond", e.deleteHydrogenBond = "delete_hydrogen_bond", e.editSequence = "edit_sequence", e.startNewSequence = "start_new_sequence", e.copy = "copy", e.paste = "paste", e.delete = "delete";
})($ ||= {});
var UT = function(e) {
	var t, n = e.selections, r = e.contextMenuEvent, i = X(W), a = Y(), o = DT(n), s = (n == null || (t = n.flat()) == null ? void 0 : t.flatMap(function(e) {
		return e.node.monomers;
	})) || [], c = VT(s, r), l = X(yg), u = Ay() === "sequence-layout-mode", d = BT(c), f = n?.some(function(e) {
		return e.some(function(e) {
			return kT(e.node);
		});
	}) ?? !1, p = s?.length > 0 && RT(s), m = !OT(n) || f, h = [
		{
			name: $.title,
			title: o?.title,
			isMenuTitle: !0,
			disabled: !0,
			hidden: function(e) {
				var t = e.props;
				return !(t != null && t.sequenceItemRenderer) || !(o != null && o.isSelectedAtLeastOneNucleoelement);
			}
		},
		{
			name: $.copy,
			title: "Copy",
			icon: V(F, { name: "copyMenu" }),
			disabled: s?.length === 0
		},
		{
			name: $.paste,
			title: "Paste",
			icon: V(F, { name: "pasteNavBar" }),
			disabled: !1,
			separator: !0
		},
		{
			name: $.editSequence,
			title: "Edit sequence",
			disabled: !1,
			hidden: function(e) {
				var t = e.props;
				return !(t != null && t.sequenceItemRenderer);
			}
		},
		{
			name: $.startNewSequence,
			title: "Start new sequence",
			disabled: !1,
			separator: p || m
		},
		{
			name: $.createRnaAntisenseStrand,
			title: "Create RNA antisense strand",
			disabled: FT(s),
			hidden: function() {
				return !s || !RT(s);
			}
		},
		{
			name: $.createDnaAntisenseStrand,
			title: "Create DNA antisense strand",
			disabled: FT(s),
			hidden: function() {
				return !s || !RT(s);
			}
		},
		{
			name: $.establishHydrogenBond,
			title: "Establish Hydrogen Bonds",
			disabled: function(e) {
				var t, r = e.props;
				return n?.length === 0 ? Tt(r == null || (t = r.sequenceItemRenderer) == null ? void 0 : t.twoStrandedNode) : OT(n);
			},
			hidden: function(e) {
				var t = e.props;
				return !(t != null && t.sequenceItemRenderer);
			}
		},
		{
			name: $.deleteHydrogenBond,
			title: "Remove hydrogen bonds",
			disabled: function(e) {
				var t, r = e.props;
				return n?.length === 0 ? !kT(r == null || (t = r.sequenceItemRenderer) == null ? void 0 : t.node) : !(n != null && n.some(function(e) {
					return e.some(function(e) {
						return kT(e.node);
					});
				}));
			},
			hidden: function(e) {
				var t = e.props;
				return !(t != null && t.sequenceItemRenderer);
			}
		},
		{
			name: $.modifyInRnaBuilder,
			title: "Modify in RNA Builder...",
			disabled: !(o != null && o.isSelectedOnlyNucleoelements) || o.hasAntisense,
			hidden: function(e) {
				var t = e.props;
				return !(t != null && t.sequenceItemRenderer) || !(o != null && o.isSelectedAtLeastOneNucleoelement);
			}
		},
		{
			name: $.modifyAminoAcids,
			title: "Modify amino acids",
			disabled: !1,
			hidden: !d.length,
			subMenuItems: d,
			separator: !0
		},
		{
			name: $.delete,
			title: "Delete",
			disabled: s?.length === 0,
			icon: V(F, { name: "deleteMenu" })
		}
	], g = function(e) {
		var t, r = e.id, s = e.props;
		if (i) switch (!0) {
			case r === $.modifyInRnaBuilder:
				i.events.turnOnSequenceEditInRNABuilderMode.dispatch(), a(c_(Kg.RNA)), a(Dv(!0)), a(gv({})), a(bv(null)), o != null && (t = o.selectedSequenceLabeledNodes) != null && t.length && o != null && o.title && (a(vv(o?.title)), a(_v(o?.selectedSequenceLabeledNodes)), a(yv(o?.isSequenceFirstsOnlyNucleoelementsSelected)));
				break;
			case r === $.startNewSequence:
				i.events.startNewSequence.dispatch(s.sequenceItemRenderer);
				break;
			case r === $.editSequence:
				i.events.editSequence.dispatch(s.sequenceItemRenderer);
				break;
			case r === $.createRnaAntisenseStrand:
				i.events.createAntisenseChain.dispatch(!1);
				break;
			case r === $.createDnaAntisenseStrand:
				i.events.createAntisenseChain.dispatch(!0);
				break;
			case r === $.establishHydrogenBond:
				i.events.establishHydrogenBond.dispatch(s.sequenceItemRenderer);
				break;
			case r === $.deleteHydrogenBond:
				var l = Fe.sequenceViewModel.chainsCollection.monomerToChain, u = /* @__PURE__ */ new Map();
				(n != null && n.length ? n.reduce(function(e, t) {
					return [].concat(w(e), w(t));
				}, []).map(function(e) {
					return e.twoStrandedNode;
				}) : [s.sequenceItemRenderer?.twoStrandedNode]).forEach(function(e) {
					if (e.antisenseChain && e.antisenseNode && !(e.antisenseNode instanceof Pn || e.antisenseNode instanceof Sn)) {
						u.has(e.antisenseChain) || u.set(e.antisenseChain, /* @__PURE__ */ new Set());
						var t = u.get(e.antisenseChain);
						if (!t) return;
						t.add(e);
					}
				});
				var d = !1;
				u.forEach(function(e, t) {
					var n = w(e.values())[0].chain, r = new Set(w(e.values()).map(function(e) {
						return e.antisenseNode;
					}));
					t.nodes.some(function(e) {
						return !r.has(e) && e.monomers.some(function(e) {
							return e.hydrogenBonds.some(function(t) {
								var r = t.getAnotherMonomer(e);
								return (r && l.get(r)) === n;
							});
						});
					}) || (d = !0);
				}), d ? i.events.openConfirmationDialog.dispatch({
					title: "Deletion of all Hydrogen Bonds",
					confirmationText: "Deleting all hydrogen bonds will cause the separation of two chains. Do you wish to proceed?",
					onConfirm: function() {
						i.events.deleteHydrogenBond.dispatch(s.sequenceItemRenderer);
					}
				}) : i.events.deleteHydrogenBond.dispatch(s.sequenceItemRenderer);
				break;
			case r?.startsWith(zT):
				var f = r?.replace(zT, "");
				i.events.modifyAminoAcids.dispatch({
					monomers: c,
					modificationType: f
				});
				break;
			case r === "copy":
				i.events.copySelectedStructure.dispatch();
				break;
			case r === "paste":
				i.events.pasteFromClipboard.dispatch();
				break;
			case r === "delete":
				i.events.deleteSelectedStructure.dispatch();
				break;
		}
	}, _ = document.querySelector(On);
	return _ && u && !l ? (0, ts.createPortal)(V(hb, {
		id: fb.FOR_SEQUENCE,
		handleMenuChange: g,
		menuItems: h
	}), _) : null;
}, WT = P("div", { target: "e1amohl43" })("display:flex;flex-direction:column;align-items:start;gap:8px;background:", function(e) {
	return e.theme.ketcher.color.background.primary;
}, ";border:", function(e) {
	return e.theme.ketcher.border.regular;
}, ";border-radius:", function(e) {
	return e.theme.ketcher.border.radius.regular;
}, ";box-shadow:", function(e) {
	return e.theme.ketcher.shadow.regular;
}, ";"), GT = P("p", { target: "e1amohl42" })("width:calc(100% - 16px);padding:8px;color:", function(e) {
	return e.theme.ketcher.color.text.primary;
}, ";background-color:#cceaee;font-size:", function(e) {
	return e.theme.ketcher.font.size.regular;
}, ";font-weight:700;word-break:break-all;text-align:left;margin:0;white-space:pre-wrap;"), KT = P(yn, { target: "e1amohl41" })({
	name: "156nqlv",
	styles: "height:100%;width:100%;padding:0 8px"
}), qT = P("div", { target: "e1amohl40" })({
	name: "10sp49k",
	styles: "width:100%;display:flex;gap:8px;padding:0 8px 4px"
}), JT = function(e) {
	var t = e.monomerCaps, n = e.attachmentPointsToBonds;
	return (0, z.useMemo)(function() {
		var e = [], r = [];
		return t && Object.entries(t).forEach(function(t) {
			var i = I(t, 2), a = i[0], o = i[1], s = !!n?.[a];
			s && r.push(a);
			var c = {
				id: a,
				label: qC(o),
				connected: s
			};
			e.push(c);
		}), {
			preparedAttachmentPointsData: e,
			connectedAttachmentPoints: r
		};
	}, [t, n]);
}, YT = function(e) {
	var t = e.idtAliases, n = e.attachmentPointsToBonds, r = e.monomerClass;
	return (0, z.useMemo)(function() {
		if (!t) return null;
		var e = t.base, i = t.modifications;
		if (!i) return ky(e);
		var a = i.endpoint5, o = i.internal, s = i.endpoint3;
		if (n) {
			var c = n.R1, l = n.R2;
			return r === S.Phosphate && c && !(c instanceof be) && c.firstMonomer instanceof Ke ? null : ky(c !== null && l === null ? s ?? o : c === null && l !== null ? a ?? o : c !== null && l !== null ? o ?? a ?? s : a ?? o ?? s);
		}
		var u = Object.values(i).every(function(t) {
			return t.includes(e);
		});
		if (s && a && o && u) return ky(e);
		var d = {};
		return Object.values(i).forEach(function(e) {
			var t = ky(e) ?? "", n = [t.charAt(0), t.slice(1)], r = n[0], i = n[1];
			d[i] = d[i] ? [].concat(w(d[i]), [r]) : [r];
		}), Object.entries(d).map(function(e) {
			var t = I(e, 2), n = t[0];
			return `(${t[1].join(", ")})${n}`;
		}).join(", ");
	}, [
		t,
		n,
		r
	]);
}, XT = P("span", { target: "epjjwrk3" })("width:max-content;max-width:100%;display:flex;flex-direction:column;align-items:flex-start;font-size:", function(e) {
	return e.theme.ketcher.font.size.regular;
}, ";font-weight:500;line-height:normal;color:", function(e) {
	return e.theme.ketcher.color.text.lightgrey;
}, ";padding-left:", function(e) {
	return e.preset ? "0" : "8px";
}, ";border-left:", function(e) {
	return e.preset ? "none" : "1px solid #D9DCEA";
}, ";"), ZT = P("p", { target: "epjjwrk2" })({
	name: "ti75j2",
	styles: "margin:0"
}), QT = P("span", { target: "epjjwrk1" })({
	name: "3myie7",
	styles: "color:#7c7c7c;margin-right:4px"
}), $T = P("span", { target: "epjjwrk0" })({
	name: "9ig07c",
	styles: "color:#585858;white-space:normal;overflow-wrap:anywhere;word-break:break-word"
});
function eE(e) {
	var t = e.idtAliasesText, n = e.axoLabsText, r = e.helmText, i = e.modificationTypeText, a = e.preset, o = [].concat(w(t ? [{
		label: "IDT",
		text: t
	}] : []), w(n ? [{
		label: "AxoLabs",
		text: n
	}] : []), w(r ? [{
		label: "HELM",
		text: r
	}] : []), w(i ? [{
		label: "Modification type",
		text: i
	}] : []));
	return o.length ? V(XT, {
		preset: a,
		children: o.map(function(e) {
			return H(ZT, { children: [H(QT, { children: [e.label, ":"] }), V($T, { children: e.text })] }, e.label);
		})
	}) : null;
}
var tE = P("div", { target: "e112ss7f3" })({
	name: "1m2mukt",
	styles: "flex:1;display:flex;align-items:center;flex-wrap:wrap;gap:8px;font-size:12px;line-height:14px"
}), nE = P("div", { target: "e112ss7f2" })("display:flex;align-items:center;gap:2px;border-radius:4px;background-color:", function(e) {
	return e.connected ? "#E1E5EA" : "transparent";
}, ";padding:", function(e) {
	return e.connected ? "4px" : "0";
}, ";color:", function(e) {
	return e.connected ? "#8A8B8E" : "inherit";
}, ";"), rE = P("span", { target: "e112ss7f1" })({
	name: "f3vz0n",
	styles: "font-weight:500"
}), iE = P("span", { target: "e112ss7f0" })({
	name: "16ceglb",
	styles: "font-weight:600"
}), aE = function(e) {
	var t = e.preparedAttachmentPointsData;
	return t.length ? V(tE, { children: t.map(function(e) {
		var t = e.id, n = e.connected, r = e.label;
		return H(nE, {
			connected: n,
			children: [H(rE, { children: [t, !n && ":"] }), !n && V(iE, { children: r })]
		}, t);
	}) }) : null;
}, oE = P(function(e) {
	var t = e.className, n = X(gg), r = n.monomer, i = n.attachmentPointsToBonds, a = r?.props.idtAliases, o = r?.props.aliasAxoLabs, s = r?.props.aliasHELM, c = r?.props.modificationTypes, l = JT({
		monomerCaps: r?.props.MonomerCaps,
		attachmentPointsToBonds: i
	}), u = l.preparedAttachmentPointsData, d = l.connectedAttachmentPoints, f = YT({
		idtAliases: a,
		attachmentPointsToBonds: i,
		monomerClass: r?.props.MonomerClass
	});
	if (!r) return null;
	var p = r.props.unresolved, m = p ? r.label : r.struct?.name || r.label, h = f || o || s || c;
	return (r.struct || p) && H(WT, {
		className: t,
		"data-testid": "polymer-library-preview",
		"data-idtaliases": f ?? void 0,
		"data-axolabs": o ?? void 0,
		"data-helm": s ?? void 0,
		"data-modificationtype": Iy(c),
		children: [
			m && V(GT, {
				"data-testid": "preview-tooltip-title",
				children: m
			}),
			p ? V(ZC, {}) : V(KT, {
				struct: r.struct,
				options: {
					connectedMonomerAttachmentPoints: d,
					usageInMacromolecule: Ye.MonomerPreview,
					labelInPreview: !0,
					needCache: !1
				}
			}),
			H(qT, { children: [V(aE, { preparedAttachmentPointsData: u }), h && V(eE, {
				idtAliasesText: f ?? void 0,
				axoLabsText: o ?? void 0,
				helmText: s ?? void 0,
				modificationTypeText: Array.isArray(c) ? c.join(", ") : c
			})] })
		]
	});
}, { target: "e86yc5p0" })("width:", bt.width + "px", ";height:", bt.height + "px", ";"), sE = P("div", { target: "ec5fs975" })("display:flex;flex-direction:column;align-items:center;gap:8px;padding:8px;background:", function(e) {
	return e.theme.ketcher.color.background.primary;
}, ";border:", function(e) {
	return e.theme.ketcher.border.regular;
}, ";border-radius:", function(e) {
	return e.theme.ketcher.border.radius.regular;
}, ";box-shadow:", function(e) {
	return e.theme.ketcher.shadow.regular;
}, ";"), cE = P("div", { target: "ec5fs974" })({
	name: "s5xdrg",
	styles: "display:flex;align-items:center"
}), lE = P("div", { target: "ec5fs973" })("font-size:", function(e) {
	return e.theme.ketcher.font.size.regular;
}, ";line-height:", function(e) {
	return e.theme.ketcher.font.size.regular;
}, ";font-weight:600;padding-right:2px;"), uE = P("div", { target: "ec5fs972" })("color:", function(e) {
	return e.theme.ketcher.color.text.lightgrey;
}, ";font-size:", function(e) {
	return e.theme.ketcher.font.size.regular;
}, ";font-weight:400;white-space:nowrap;"), dE = P("p", { target: "ec5fs971" })("color:", function(e) {
	return e.theme.ketcher.color.text.primary;
}, ";font-size:", function(e) {
	return e.theme.ketcher.font.size.regular;
}, ";font-weight:700;word-break:break-all;text-align:center;margin-top:0;margin-bottom:8px;"), fE = P(F, { target: "ec5fs970" })("height:14px;width:14px;margin-right:4px;color:", function(e) {
	return e.theme.ketcher.color.icon.grey;
}, ";stroke:", function(e) {
	return e.theme.ketcher.color.icon.grey;
}, ";"), pE = function(e) {
	var t = e.presetName, n = e.position, r = e.idtAliases;
	return (0, z.useMemo)(function() {
		if (!t || !r) return null;
		if (t.includes("MOE")) {
			var e = r.base, i = r.modifications, a = ky(i?.endpoint5) ?? `5${e}`, o = ky(i?.internal) ?? `i${e}`, s = ky(i?.endpoint3) ?? `3${e}`;
			switch (n) {
				case qh.Library: return `${a}, ${o}`;
				case qh.ChainStart: return a;
				case qh.ChainMiddle: return o;
				case qh.ChainEnd: return s;
			}
		}
		return ky(r.base);
	}, [
		t,
		n,
		r
	]);
}, mE = [
	"sugar",
	"base",
	"phosphate"
], hE = P(function(e) {
	var t = e.className, n = X(gg), r = n.monomers, i = n.name, a = n.position, o = n.idtAliases, s = r.every(function(e) {
		return e?.props.MonomerClass === S.CHEM;
	}), c = I(r, 2)[1], l = i ?? c?.props.Name, u = c?.props.aliasAxoLabs, d = pE({
		presetName: l,
		position: a,
		idtAliases: o
	}), f = d || u;
	return H(sE, {
		className: t,
		style: { alignItems: "flex-start" },
		"data-testid": "polymer-library-preview",
		children: [
			V(dE, {
				"data-testid": "preview-tooltip-title",
				children: l
			}),
			r.map(function(e, t) {
				return e ? H(cE, { children: [
					V(fE, { name: s ? "chem" : mE[t] }),
					V(lE, { children: e.label }),
					H(uE, { children: [
						"(",
						e.props.Name,
						")"
					] })
				] }, e.props.id) : null;
			}),
			f && V(eE, {
				preset: !0,
				idtAliasesText: d ?? void 0,
				axoLabsText: u
			})
		]
	});
}, { target: "e1wupxfd0" })(""), gE = P("div", { target: "envzkt90" })("display:flex;flex-direction:column;align-items:start;gap:8px;background:", function(e) {
	return e.theme.ketcher.color.background.primary;
}, ";border:", function(e) {
	return e.theme.ketcher.border.regular;
}, ";border-radius:", function(e) {
	return e.theme.ketcher.border.radius.regular;
}, ";box-shadow:", function(e) {
	return e.theme.ketcher.shadow.regular;
}, ";"), _E = P("div", { target: "e1m0yzrp2" })(function(e) {
	var t = e.connected, n = e.inBond, r = e.theme;
	return {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "2px",
		color: n || !t ? r.ketcher.color.text.primary : "#B4B9D6"
	};
}, ""), vE = P("p", { target: "e1m0yzrp1" })(function(e) {
	return {
		margin: 0,
		fontSize: e.theme.ketcher.font.size.small,
		lineHeight: "12px"
	};
}, ""), yE = P("p", { target: "e1m0yzrp0" })(function(e) {
	var t = e.inBond;
	return {
		margin: 0,
		padding: "4px",
		fontWeight: e.theme.ketcher.font.weight.bold,
		lineHeight: "14px",
		borderRadius: "4px",
		backgroundColor: t ? "#CDF1FC" : "transparent"
	};
}, ""), bE = function(e) {
	var t = e.attachmentPoints, n = e.attachmentPointInBond;
	return V(B, { children: t.map(function(e) {
		return H(_E, {
			connected: e.connected,
			inBond: e.id === n,
			children: [V(vE, { children: e.id }), V(yE, {
				inBond: e.id === n,
				children: e.label
			})]
		}, e.id);
	}) });
}, xE = P(function(e) {
	var t = e.className, n = X(gg), r = n.polymerBond, i = n.style, a = (0, z.useMemo)(function() {
		return i ? P(gE, { target: "e18hk05c1" })("top:", i?.top ?? "", ";left:", i?.left ?? "", ";right:", i?.right ?? "", ";") : P(gE, { target: "e18hk05c2" })("");
	}, [i]), o = r.firstMonomer, s = r.secondMonomer, c = r.firstMonomerAttachmentPoint, l = r.secondMonomerAttachmentPoint, u = JT({
		monomerCaps: o.monomerCaps,
		attachmentPointsToBonds: o.attachmentPointsToBonds
	}), d = u.preparedAttachmentPointsData, f = u.connectedAttachmentPoints, p = JT({
		monomerCaps: s?.monomerCaps,
		attachmentPointsToBonds: s?.attachmentPointsToBonds
	}), m = p.preparedAttachmentPointsData, h = p.connectedAttachmentPoints;
	return !o || !s ? null : V(a, {
		className: t,
		"data-testid": "polymer-library-preview",
		children: V(cw, {
			firstMonomer: o,
			secondMonomer: s,
			firstMonomerOverview: V(ew, {
				monomer: o,
				usage: Ye.BondPreview,
				connectedAttachmentPoints: f,
				selectedAttachmentPoint: c,
				attachmentPoints: V(bE, {
					attachmentPoints: d,
					attachmentPointInBond: c
				})
			}),
			secondMonomerOverview: V(ew, {
				monomer: s,
				usage: Ye.BondPreview,
				connectedAttachmentPoints: h,
				selectedAttachmentPoint: l,
				attachmentPoints: V(bE, {
					attachmentPoints: m,
					attachmentPointInBond: l
				})
			})
		})
	});
}, { target: "e18hk05c0" })("width:", bt.widthForBond, "px;height:", bt.heightForBond, "px;");
function SE(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function CE(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? SE(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : SE(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var wE = P("div", { target: "e88xzqx0" })("display:inline-block;position:absolute;background:", function(e) {
	return e.theme.ketcher.color.background.primary;
}, ";z-index:", function(e) {
	return e.theme.ketcher.zIndex.overlay;
}, ";"), TE = function() {
	var e = X(gg), t = (0, z.useRef)(null), n = I((0, z.useState)(!1), 2), r = n[0], i = n[1], a = xn(W);
	return (0, z.useEffect)(function() {
		if (!(!t.current || e.style)) if (e != null && e.type) {
			var n;
			t.current.setAttribute("style", ""), i(!0);
			var o = 5, c = t.current?.getBoundingClientRect(), l = c?.height || 0, u = c?.width || 0, d = (n = s.instance) == null || (n = n.canvasWrapper.node()) == null ? void 0 : n.getBoundingClientRect(), f = d?.top || 0, p = d?.bottom || 0, m = d?.left || 0, h = d?.right || 0, g = e.target?.getBoundingClientRect(), _ = g?.top || 0, v = g?.bottom || 0, y = g?.left || 0, b = g?.width || 0, x = y - b / 2, S = a?.ketcherRootElementBoundingClientRect, C = S?.x || 0, w = S?.y || 0, T = _ - l - o - w, E = v + o - w, D = y + b / 2 - u / 2 - C;
			if (_ - l - o >= f || v + l > p && v > p / 2 ? t.current.style.top = `${T}px` : t.current.style.top = `${E}px`, x > u / 2 && x + u / 2 < h) t.current.style.left = `${D}px`;
			else if (x < u / 2) t.current.style.left = `${m}px`;
			else {
				var O = 10;
				t.current.style.left = `${h - u - O}px`;
			}
		} else r && (i(!1), t.current.setAttribute("style", ""));
	}, [e]), e ? H(wE, {
		ref: t,
		style: CE({}, e?.style),
		children: [
			e.type === Kh.Monomer && V(oE, {}),
			e.type === Kh.Preset && V(hE, {}),
			e.type === Kh.Bond && V(xE, {}),
			e.type === Kh.AmbiguousMonomer && V(Kt, { preview: e })
		]
	}) : null;
}, EE = P(Fn, { target: "e1brfei30" })(function(e) {
	var t = e.theme, n = e.variant;
	return {
		color: n === "outlined" ? t.ketcher.color.text.primary : t.ketcher.color.button.text.primary,
		boxShadow: "none",
		transition: "none",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		cursor: "pointer",
		padding: "4px 8px",
		border: n === "outlined" ? t.ketcher.outline.small : "none",
		background: n === "outlined" ? t.ketcher.color.background.primary : t.ketcher.color.button.group.active,
		borderRadius: t.ketcher.border.radius.regular,
		textTransform: "none",
		fontSize: t.ketcher.font.size.regular,
		fontWeight: t.ketcher.font.weight.regular,
		":hover": {
			color: n === "outlined" ? t.ketcher.color.text.dark : t.ketcher.color.button.text.primary,
			background: n === "outlined" ? t.ketcher.color.background.primary : t.ketcher.color.button.group.hover,
			boxShadow: "none"
		},
		":disabled": {
			cursor: "auto",
			background: "#e1e5ea",
			outline: "none"
		}
	};
}, ""), DE = function() {
	var e = X(W), t = I((0, z.useState)(e?.events.changeSequenceTypeEnterMode), 2), n = t[0], r = t[1], i = I((0, z.useState)(!1), 2), a = i[0], o = i[1], s = X(yg), c = Ay(), l = !!s, u = Y(), d = function(e) {
		o((f(e) === "object" ? e.mode : e) === "sequence-layout-mode");
	};
	(0, z.useEffect)(function() {
		return e?.events.selectMode.add(d), e?.events.changeSequenceTypeEnterMode.add(function(e) {
			u(c_(e === Rg.PEPTIDE ? Kg.PEPTIDES : Kg.RNA)), r(e);
		}), e?.events.changeSequenceTypeEnterMode.dispatch(Ve.RNA), function() {
			e?.events.selectMode.remove(d);
		};
	}, [e]), (0, z.useEffect)(function() {
		d(c);
	}, [c]);
	var p = function(t) {
		e?.events.changeSequenceTypeEnterMode.dispatch(t);
	};
	return a ? V($n, {
		sx: {
			mr: 1,
			ml: 1
		},
		children: H(sr, {
			disabled: l,
			children: [
				V(EE, {
					"data-testid": `${Ve.RNA}Btn`,
					title: "RNA (Ctrl+Alt+R)",
					variant: n === Ve.RNA ? "contained" : "outlined",
					onClick: function() {
						return p(Ve.RNA);
					},
					children: "RNA"
				}),
				V(EE, {
					"data-testid": `${Ve.DNA}Btn`,
					title: "DNA (Ctrl+Alt+D)",
					variant: n === Ve.DNA ? "contained" : "outlined",
					onClick: function() {
						return p(Ve.DNA);
					},
					children: "DNA"
				}),
				V(EE, {
					"data-testid": `${Ve.PEPTIDE}Btn`,
					title: "Peptides (Ctrl+Alt+P)",
					variant: n === Ve.PEPTIDE ? "contained" : "outlined",
					onClick: function() {
						return p(Ve.PEPTIDE);
					},
					children: "PEP"
				})
			]
		})
	}) : null;
}, OE = function() {
	var e = Y(), t = X(W), n = X(Dg), r = X(Og), i = X(kg), a = X(Ag);
	return function() {
		var o = Nt(ns.default.mark(function o(s) {
			var c, l, u, d, f, p, m, h, g, _;
			return ns.default.wrap(function(o) {
				for (;;) switch (o.prev = o.next) {
					case 0:
						if (!(!t || s)) {
							o.next = 2;
							break;
						}
						return o.abrupt("return");
					case 2:
						if (c = ot.getIndigo(), l = t.drawingEntitiesManager.filterSelection(), u = new y(), d = l.hasDrawingEntities ? l : t.drawingEntitiesManager, f = yt.fromMonomers(w(d.monomers.values())), p = f.firstNode?.monomer, m = !p || f.chains.reduce(function(e, t) {
							return e + t.monomers.length;
						}, 0) <= cn(p).length, !(!d.hasDrawingEntities || !m)) {
							o.next = 12;
							break;
						}
						return e(cg(void 0)), o.abrupt("return");
					case 12: return h = u.serialize(new ie(), t.drawingEntitiesManager, void 0, !1, !0), o.next = 15, c.calculateMacromoleculeProperties({ struct: h }, {
						upc: i / Qh[n],
						nac: a / Qh[r]
					});
					case 15:
						g = o.sent;
						try {
							_ = g.properties && JSON.parse(g.properties), Oe(), e(cg(_));
						} catch (t) {
							Lt.error("Error during parsing macromolecule properties: ", t), e(cg(void 0));
						}
					case 17:
					case "end": return o.stop();
				}
			}, o);
		}));
		return function(e) {
			return o.apply(this, arguments);
		};
	}();
}, kE = ["className"];
function AE(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (!n) {
		if (Array.isArray(e) || (n = jE(e)) || t && e && typeof e.length == "number") {
			n && (e = n);
			var r = 0, i = function() {};
			return {
				s: i,
				n: function() {
					return r >= e.length ? { done: !0 } : {
						done: !1,
						value: e[r++]
					};
				},
				e: function(e) {
					throw e;
				},
				f: i
			};
		}
		throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	var a, o = !0, s = !1;
	return {
		s: function() {
			n = n.call(e);
		},
		n: function() {
			var e = n.next();
			return o = e.done, e;
		},
		e: function(e) {
			s = !0, a = e;
		},
		f: function() {
			try {
				o || n.return == null || n.return();
			} finally {
				if (s) throw a;
			}
		}
	};
}
function jE(e, t) {
	if (e) {
		if (typeof e == "string") return ME(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ME(e, t) : void 0;
	}
}
function ME(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function NE(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function PE(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? NE(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : NE(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var FE = "Other", IE = function(e, t) {
	var n, r = e == null || (n = e.monomerCount) == null ? void 0 : n[t];
	return r && Object.keys(r).length > 0;
}, LE = P("div", { target: "eifx56c30" })(function(e) {
	return {
		width: "100%",
		height: e.hasError ? "124px" : "177px",
		position: "relative",
		backgroundColor: "white",
		padding: "2px 0",
		borderRadius: "8px 8px",
		overflow: "hidden",
		boxShadow: "0px 2px 5px rgba(103, 104, 132, 0.15)"
	};
}, ""), RE = P("div", { target: "eifx56c29" })(function() {
	return { display: "flex" };
}, ""), zE = P("div", { target: "eifx56c28" })(function() {
	return {
		flex: 1,
		display: "flex",
		justifyContent: "center"
	};
}, ""), BE = P(F, { target: "eifx56c27" })(function() {
	return {
		display: "flex",
		alignItems: "center",
		width: "12px",
		height: "12px",
		padding: "2px 6px",
		cursor: "pointer"
	};
}, ""), VE = P("div", { target: "eifx56c26" })(function() {
	return {
		display: "flex",
		height: "25px",
		alignItems: "center",
		padding: "0 8px"
	};
}, ""), HE = P("div", { target: "eifx56c25" })(function() {
	return {
		display: "flex",
		alignItems: "center",
		fontSize: "14px",
		fontWeight: "700",
		padding: "0 8px",
		color: "#585858"
	};
}, ""), UE = P("div", { target: "eifx56c24" })(function() {
	return {
		display: "flex",
		alignItems: "center",
		height: "24px",
		borderLeft: "1px solid #CAD3DD",
		color: "#585858"
	};
}, ""), WE = P("div", { target: "eifx56c23" })(function() {
	return {
		fontSize: "14px",
		fontWeight: "700",
		padding: "0 8px"
	};
}, ""), GE = P("div", { target: "eifx56c22" })(function() {
	return {
		width: "100%",
		height: "100%",
		top: "-25px",
		position: "relative"
	};
}, ""), KE = P("div", { target: "eifx56c21" })(function() {
	return {
		width: "100%",
		padding: "0 4px 4px"
	};
}, ""), qE = P("div", { target: "eifx56c20" })(function() {
	return {
		display: "flex",
		width: "100%",
		height: "74px",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	};
}, ""), JE = P("div", { target: "eifx56c19" })(function() {
	return { fontSize: "14px" };
}, ""), YE = P("div", { target: "eifx56c18" })(function() {
	return { fontSize: "12px" };
}, ""), XE = P("div", { target: "eifx56c17" })(function() {
	return {
		display: "flex",
		padding: "4px 0px",
		height: "32px",
		gap: "12px"
	};
}, ""), ZE = P("div", { target: "eifx56c16" })(function() {
	return {
		display: "grid",
		gridTemplateColumns: "2fr 1fr",
		gap: "0 2px"
	};
}, ""), QE = P("div", { target: "eifx56c15" })(function() {
	return {
		height: "90px",
		backgroundColor: "white",
		borderRadius: "8px",
		padding: "5px"
	};
}, ""), $E = P("div", { target: "eifx56c14" })(function() {
	return {
		display: "flex",
		justifyContent: "space-between"
	};
}, ""), eD = P("div", { target: "eifx56c13" })(function() {
	return {
		display: "grid",
		gridTemplateColumns: "2fr 1fr"
	};
}, ""), tD = P("div", { target: "eifx56c12" })(function(e) {
	var t = e.disabled;
	return {
		display: "flex",
		alignItems: "center",
		padding: "0 0 0 6px",
		pointerEvents: t ? "none" : "auto",
		opacity: t ? .5 : 1
	};
}, ""), nD = P(function(e) {
	var t = e.className;
	return V(_, PE(PE({}, It(e, kE)), {}, { classes: { popper: t } }));
}, { target: "eifx56c11" })(function() {
	return M({}, `& .${ge.tooltip}`, {
		maxWidth: "220px",
		padding: "12px",
		backgroundColor: "white",
		color: "rgba(0, 0, 0, 0.87)",
		boxShadow: "0 1px 5px 0 #CCCCCC",
		fontSize: 11
	});
}, ""), rD = P("div", { target: "eifx56c10" })(function() {
	return {
		display: "flex",
		flexDirection: "column",
		gap: "4px",
		fontSize: "12px",
		fontWeight: "700",
		color: "#585858",
		borderBottom: "1px solid #585858",
		paddingBottom: "8px",
		marginBottom: "8px"
	};
}, ""), iD = P("div", { target: "eifx56c9" })(function() {
	return {
		fontSize: "10px",
		paddingRight: "5px",
		whiteSpace: "nowrap"
	};
}, ""), aD = P("div", { target: "eifx56c8" })(function() {
	return {
		fontSize: "14px",
		fontWeight: "700"
	};
}, ""), oD = P(F, { target: "eifx56c7" })(function() {
	return {
		width: "20px",
		height: "20px"
	};
}, ""), sD = P("div", { target: "eifx56c6" })(function() {
	return {
		display: "flex",
		alignItems: "center"
	};
}, ""), cD = P(GS, { target: "eifx56c5" })(function() {
	return {
		position: "relative",
		padding: "0 0 0 5px",
		zIndex: 1
	};
}, ""), lD = "text-input-field-input", uD = P(AC, { target: "eifx56c4" })(function() {
	return M({ margin: 0 }, `.${lD}`, {
		width: "60px",
		"::-webkit-inner-spin-button": {
			WebkitAppearance: "none",
			margin: 0
		},
		"::-webkit-outer-spin-button": {
			WebkitAppearance: "none",
			margin: 0
		},
		MozAppearance: "textfield"
	});
}, ""), dD = P("div", { target: "eifx56c3" })(function() {
	return {
		display: "grid",
		gridTemplateColumns: "repeat(8, 1fr)",
		gap: "4px 6px",
		width: "100%",
		backgroundColor: "white",
		borderRadius: "8px",
		padding: "6px",
		height: "90px",
		alignContent: "flex-start"
	};
}, ""), fD = P("div", { target: "eifx56c2" })("display:flex;position:relative;justify-content:space-between;background-color:#eff2f5;padding:4px 6px;font-weight:500;font-size:12px;border-radius:2px;min-width:50px;flex:1;opacity:", function(e) {
	return e.disabled ? .4 : 1;
}, ";&:after{content:'';position:absolute;bottom:0;left:0;width:15px;height:2px;background:", function(e) {
	var t = e.theme, n = e.monomerShortName;
	return (e.isPeptide ? t.ketcher.peptide.color : t.ketcher.monomer.color)[n]?.regular || t.ketcher.monomer.color.default.regular;
}, ";border-radius:0 0 0 2px;}"), pD = P("div", { target: "eifx56c1" })(function() {
	return { fontWeight: "700" };
}, ""), mD = function(e) {
	var t = (e.isPeptide ? h : je).map(function(t) {
		return [t, e.monomerCount[t] || 0];
	});
	return t.push([FE, e.monomerCount[FE] || 0]), t.sort(function(e, t) {
		return e[0] === FE ? 1 : e[0].localeCompare(t[0]);
	}), V(dD, { children: (0, as.default)(t, function(t) {
		var n = I(t, 2), r = n[0], i = n[1];
		return H(fD, {
			monomerShortName: r,
			"data-testid": r + "-option",
			isPeptide: e.isPeptide,
			disabled: i === 0,
			children: [V(pD, { children: r }), V("div", { children: i })]
		}, r);
	}) });
}, hD = function(e) {
	return V(tD, {
		"data-testid": e.testId,
		disabled: e.disabled,
		children: H(B, { children: [
			H(iD, { children: [e.name, e.value !== void 0 && ":"] }),
			e.onChangeValue ? V(uD, {
				value: e.value ?? "",
				id: `macromolecule-property-${e.name}`,
				"data-testid": `${e.testId}-input`,
				type: "number",
				min: 0,
				inputClassName: lD,
				onChange: function(t) {
					var n;
					return e == null || (n = e.onChangeValue) == null ? void 0 : n.call(e, Number(t));
				}
			}) : V(aD, {
				"data-testid": e.testId + "-value",
				children: e.value
			}),
			e.hint && V(nD, {
				title: e.hint,
				children: V(sD, { children: V(oD, {
					name: "about",
					dataTestId: e.name + "-info"
				}) })
			}),
			e.options && e.selectedOption && e.onChangeOption && V(cD, {
				options: e.options.map(function(e) {
					return {
						id: e,
						label: e
					};
				}),
				testId: e.testId + "-selector",
				currentSelection: e.selectedOption,
				selectionHandler: e.onChangeOption
			})
		] })
	});
}, gD = function(e) {
	var t = e.part, n = t.match(/^([A-Za-z]+)(\d+)$/);
	if (!n) return t;
	var r = I(n, 3);
	r[0];
	var i = r[1], a = r[2];
	return H("span", { children: [i, V("sub", { children: a })] });
}, _D = P("svg", { target: "eifx56c0" })(function() {
	return {
		width: "100%",
		height: "100%"
	};
}, "");
function vD(e, t, n) {
	var r = e.length;
	if (n >= r || n === 0) return {
		xs: e,
		ys: t
	};
	for (var i = [e[0]], a = [t[0]], o = (r - 2) / (n - 2), s = 0, c = 0; c < n - 2; c++) {
		for (var l = Math.floor((c + 1) * o) + 1, u = Math.floor((c + 2) * o) + 1, d = l, f = u, p = 0, m = 0, h = f - d, g = d; g < f; g++) p += e[g], m += t[g];
		p /= h, m /= h;
		for (var _ = Math.floor(c * o) + 1, v = Math.floor((c + 1) * o) + 1, y = -1, b = _, x = _; x < v; x++) {
			var S = Math.abs((e[s] - p) * (t[x] - t[s]) - (e[s] - e[x]) * (m - t[s]));
			S > y && (y = S, b = x);
		}
		i.push(e[b]), a.push(t[b]), s = b;
	}
	return i.push(e[r - 1]), a.push(t[r - 1]), {
		xs: i,
		ys: a
	};
}
var yD = function(e) {
	return e > 360 ? 5 : e > 300 ? 4 : e > 240 ? 3 : 2;
}, bD = function(e) {
	return e < 1 ? 0 : e < 2 ? 1 : e < 3 ? 2 : e < 5 ? 3 : e < 10 ? 5 : e < 100 ? Math.floor(e / 10) * 10 : e < 1e3 ? Math.floor(e / 50) * 50 : Math.floor(e / 100) * 100;
}, xD = function(e) {
	var t = e.data, n = vD(t.map(function(e, t) {
		return t + 1;
	}), t, 100), r = I((0, z.useState)(0), 2), i = r[0], a = r[1], o = (0, z.useRef)(null);
	(0, z.useEffect)(function() {
		if (!(!n.xs.length || !o.current)) {
			var e = o.current.width.baseVal.value, r = o.current.height.baseVal.value, i = {
				top: 10,
				right: 10,
				bottom: 20,
				left: 30
			};
			Cd(o.current).selectAll("*").remove();
			var a = Ih().domain([0, n.xs.length - 1]).range([i.left, e - i.right]), s = Ih().domain([0, 1]).range([r - i.bottom, i.top]), c = Wh().x(function(e, t) {
				return a(t);
			}).y(function(e) {
				return s(e);
			}).curve(Vh), l = Cd(o.current), u = yD(e), d = bD(t.length / u), f = d, p;
			if (d >= 1) {
				for (var m = -Infinity, h = -Infinity, g = -Infinity, _ = 2; _ <= u; _++) {
					var v = _, y = bD(t.length / v), b = Number((y * (v / t.length)).toFixed(2));
					(b > g || b === g && v > m) && (m = v, g = b, h = y);
				}
				p = Array.from({ length: m }, function(e, t) {
					return n.xs.findLastIndex(function(e) {
						return e <= (t + 1) * h && e > t * h;
					});
				}), f = h;
			} else p = w(Array(Math.min(u, n.xs.length)).keys()), f = 1;
			var x = gl(a).tickValues(p).tickFormat(function(e, t) {
				return ((t + 1) * f).toString();
			});
			l.append("g").attr("transform", `translate(0,${r - i.bottom})`).call(x).call(function(e) {
				return e.select(".domain").remove();
			}).call(function(e) {
				return e.selectAll("line").attr("stroke", "#CAD3DD").attr("y1", -r);
			}).call(function(e) {
				return e.selectAll("text").attr("font-size", "8px");
			});
			var S = _l(s).tickValues([
				0,
				.5,
				1
			]).tickFormat(gh(".1f"));
			l.append("g").attr("transform", `translate(${i.left},0)`).call(S).call(function(e) {
				return e.select(".domain").remove();
			}).call(function(t) {
				t.selectAll("line").each(function(t, n, r) {
					t === .5 ? Cd(r[n]).attr("x1", e).attr("stroke", "#CAD3DD").attr("stroke-dasharray", 2) : Cd(r[n]).remove();
				});
			}).call(function(e) {
				return e.selectAll("text").attr("font-size", "8px");
			}), l.append("path").datum(n.ys).attr("fill", "none").attr("stroke", "#167782").attr("stroke-width", 1).attr("d", c);
		}
	}, [t, i]);
	var s = new ResizeObserver((0, $o.debounce)(function(e) {
		var t = AE(e), n;
		try {
			for (t.s(); !(n = t.n()).done;) {
				var r = n.value;
				r.contentRect.width !== i && a(r.contentRect.width);
			}
		} catch (e) {
			t.e(e);
		} finally {
			t.f();
		}
	}, 100));
	return (0, z.useEffect)(function() {
		return o.current && s.observe(o.current), function() {
			s.disconnect();
		};
	}, [o, i]), V(_D, {
		"data-testid": "Hydrophobicity-Chart",
		ref: o
	});
}, SD = function(e) {
	return e.isError ? H(qE, { children: [V(JE, { children: "No Data Available" }), V(YE, { children: "Select monomer, chain or part of a chain" })] }) : H(KE, { children: [H(eD, { children: [H(XE, { children: [V(hD, {
		name: "Isoelectric Point",
		testId: "Isoelectric Point",
		value: (0, $o.isNumber)(e.macromoleculesProperties.pKa) ? (0, is.default)(e.macromoleculesProperties.pKa, 2) : "–",
		hint: "The isoelectric point is calculated as the median of all pKa values for the structure."
	}), V(hD, {
		name: "Extinction Coef.(1/Mcm)",
		testId: "Extinction Coefficient",
		value: (0, $o.isNumber)(e.macromoleculesProperties.extinctionCoefficient) ? (0, is.default)(e.macromoleculesProperties.extinctionCoefficient) : "–",
		hint: H("div", { children: [
			"The extinction coefficient for wavelength of 280nm is calculated using the method from",
			" ",
			V("i", { children: "Gill, S.C. and von Hippel, P.H. (1989)." }),
			" Natural analogue is used in place of a modified amino acid."
		] })
	})] }), V(hD, {
		name: "Hydrophobicity",
		testId: "Hydrophobicity",
		hint: H("div", { children: [
			H(rD, { children: [V("div", { children: "y = Hydrophobicity score" }), V("div", { children: "x = Position of the amino acid residue" })] }),
			"The hydrophobicity is calculated using the method from",
			" ",
			V("i", { children: "Black S.D. and Mould D.R. (1991)." }),
			" Natural analogue is used in place of a modified amino acid."
		] })
	})] }), H(ZE, { children: [e.macromoleculesProperties.monomerCount.peptides && V(mD, {
		monomerCount: e.macromoleculesProperties.monomerCount.peptides,
		isPeptide: !0
	}), V(QE, { children: e.macromoleculesProperties.hydrophobicity && V(xD, { data: e.macromoleculesProperties.hydrophobicity }) })] })] });
}, CD = function(e) {
	return !/[^0.,]/.test(String(e));
}, wD = function(e) {
	var t = Y(), n = X(Dg), r = X(Og), i = X(kg), a = X(Ag);
	return e.isError ? H(qE, { children: [V(JE, { children: "No Data Available" }), V(YE, { children: "Select a nucleotide/nucleoside, chain or part of a chain containing nucleotides/nucleosides" })] }) : H(KE, { children: [H($E, { children: [(0, $o.isNumber)(e.macromoleculesProperties.Tm) ? V(hD, {
		name: "Melting Temp. (°C)",
		value: (0, is.default)(e.macromoleculesProperties.Tm, 1),
		testId: "Melting-Temperature",
		hint: H("div", { children: [
			"The melting temperature is calculated using the method from",
			" ",
			V("i", { children: "Khandelwal G. and Bhyravabhotla J. (2010)." }),
			" Natural analogue is used in place of a modified base."
		] })
	}) : V("div", {}), H(XE, { children: [V(hD, {
		name: "[Unipositive Ions]",
		value: i,
		options: [
			"nM",
			"μM",
			"mM"
		],
		testId: "Unipositive Ions",
		selectedOption: n,
		disabled: !(0, $o.isNumber)(e.macromoleculesProperties.Tm) && !CD(i),
		onChangeOption: function(e) {
			t(lg(e));
		},
		onChangeValue: function(e) {
			t(fg(e.toString()));
		}
	}), V(hD, {
		name: "[Oligonucleotides]",
		value: a,
		options: [
			"nM",
			"μM",
			"mM"
		],
		testId: "Oligonucleotides",
		selectedOption: r,
		disabled: !(0, $o.isNumber)(e.macromoleculesProperties.Tm) && !CD(a),
		onChangeOption: function(e) {
			t(ug(e));
		},
		onChangeValue: function(e) {
			t(pg(e.toString()));
		}
	})] })] }), e.macromoleculesProperties.monomerCount.nucleotides && V(mD, { monomerCount: e.macromoleculesProperties.monomerCount.nucleotides })] });
}, TD;
(function(e) {
	e[e.PEPTIDES = 0] = "PEPTIDES", e[e.RNA = 1] = "RNA", e[e.NO_TAB = -1] = "NO_TAB";
})(TD ||= {});
var ED;
(function(e) {
	e.Da = "Da", e.kDa = "kDa", e.MDa = "MDa";
})(ED ||= {});
var DD = M(M(M({}, ED.Da, 1), ED.kDa, 1e3), ED.MDa, 1e6), OD = function(e) {
	return !(0, $o.isNumber)(e) || e < 1e3 ? ED.Da : e < 1e6 ? ED.kDa : ED.MDa;
}, kD, AD = function() {
	var e = Y(), t = X(W), n = X(Eg), r = X(Dg), i = X(Og), a = X(kg), o = X(Ag), s = n?.[0], c = I((0, z.useState)(TD.PEPTIDES), 2), l = c[0], u = c[1], d = I((0, z.useState)(OD(s?.mass)), 2), f = d[0], p = d[1], m = X(Tg), h = OE(), g = !m, _ = (0, z.useRef)(h), v = (0, z.useCallback)((0, $o.debounce)(function(e) {
		_.current(e);
	}, 500), []);
	(0, z.useEffect)(function() {
		_.current = function(e) {
			h(e);
		};
	}, [h]), (0, z.useEffect)(function() {
		return kD && t != null && t.events.selectEntities.hasHandler(kD) && t?.events.selectEntities.remove(kD), kD = function() {
			v(g);
		}, t?.events.selectEntities.add(kD), function() {
			t?.events.selectEntities.remove(kD);
		};
	}, [
		v,
		t,
		g
	]), (0, z.useEffect)(function() {
		v(g);
	}, [
		r,
		i,
		a,
		o,
		g,
		v
	]), (0, z.useEffect)(function() {
		u(IE(s, "nucleotides") ? TD.RNA : TD.PEPTIDES), p(OD(s?.mass));
	}, [s]);
	var y = function(e, t) {
		u(t);
	}, b = function() {
		e(og(!1));
	}, x = function(e) {
		p(e);
	}, S = !s || n.length > 1, C = S || !IE(s, "peptides"), w = S || !IE(s, "nucleotides"), T = (0, z.useMemo)(function() {
		return s != null && s.grossFormula ? V(HE, {
			"data-testid": "Gross-formula",
			children: s?.grossFormula.split(" ").map(function(e, t, n) {
				return H("span", { children: [V(gD, { part: e }), t < n.length - 1 ? " " : ""] }, `${e}-${t}`);
			})
		}) : null;
	}, [s?.grossFormula]), E = (0, z.useMemo)(function() {
		return s != null && s.mass ? H(B, { children: [V(WE, {
			"data-testid": "Molecular-Mass-Value",
			children: (0, is.default)(s?.mass / DD[f], 3)
		}), " "] }) : null;
	}, [s?.mass, f]);
	return m ? H(LE, {
		hasError: l === TD.PEPTIDES && C || l === TD.RNA && w,
		"data-testid": "macromolecule-properties-window",
		children: [
			H(RE, { children: [V(zE, { children: H("svg", {
				width: "16",
				height: "16",
				viewBox: "0 0 16 16",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				children: [V("path", {
					d: "M2 6H14",
					stroke: "#333333"
				}), V("path", {
					d: "M2 10H14",
					stroke: "#333333"
				})]
			}) }), V(BE, {
				name: "close",
				onClick: b,
				dataTestId: "macromolecule-properties-close"
			})] }),
			H(VE, { children: [T, E && H(UE, { children: [E, V(cD, {
				testId: "Molecular Mass Unit",
				options: [
					ED.Da,
					ED.kDa,
					ED.MDa
				].map(function(e) {
					return {
						id: e,
						label: e
					};
				}),
				currentSelection: f,
				selectionHandler: x
			})] })] }),
			V(GE, { children: V(Cy, {
				selectedTabIndex: l,
				onChange: y,
				isLayoutToRight: !0,
				tabs: [{
					caption: "Peptides",
					testId: "peptides-properties-tab",
					component: SD,
					props: {
						macromoleculesProperties: s,
						isError: C
					}
				}, {
					caption: "RNA/DNA",
					component: wD,
					testId: "rna-properties-tab",
					props: {
						macromoleculesProperties: s,
						isError: w
					}
				}]
			}) })
		]
	}) : null;
}, jD = qt(zt), MD = function(e) {
	var t = parseInt(e ?? "");
	return isNaN(t) ? 0 : t;
}, ND = function(e, t) {
	if (e === 0) return t;
	var n = s.instance.MINZOOMSCALE * 100, r = s.instance.MAXZOOMSCALE * 100;
	return e < n ? n : e > r ? r : e;
}, PD = function(e, t) {
	t && (t.value = `${Math.round(e)}%`);
}, FD = P(Ot, { target: "e1pc97tg0" })(function(e) {
	var t = e.theme, n = e.isActive;
	return {
		width: "28px",
		height: "28px",
		backgroundColor: n ? t.ketcher.color.button.group.active : "white",
		margin: "2px",
		padding: "0",
		borderRadius: "4px",
		outline: "none",
		":hover": { backgroundColor: n ? t.ketcher.color.button.group.hover : "white" },
		":hover svg": { fill: n ? "white" : t.ketcher.color.button.group.active }
	};
}, ""), ID = function() {
	var e = Y(), t = X(Tg), n = OE();
	return V(FD, {
		isActive: t,
		onClick: function() {
			var r = Nt(ns.default.mark(function r() {
				var i;
				return ns.default.wrap(function(r) {
					for (;;) switch (r.prev = r.next) {
						case 0: return i = !t, r.next = 3, n(i);
						case 3: e(sg({})), iT();
						case 5:
						case "end": return r.stop();
					}
				}, r);
			}));
			return function() {
				return r.apply(this, arguments);
			};
		}(),
		title: `Calculate properties (${jD.toggleMacromoleculesPropertiesVisibility})`,
		"data-testid": "calculate-macromolecule-properties-button",
		children: V("svg", {
			width: "15",
			height: "16",
			viewBox: "0 0 15 16",
			xmlns: "http://www.w3.org/2000/svg",
			fill: t ? "white" : "#333333",
			children: V("path", {
				fillRule: "evenodd",
				clipRule: "evenodd",
				d: "M9.87727 1.65517H9.03053V4.46737L9.42288 5.12973C9.76799 5.04496 10.1287 5 10.5 5C12.9853 5 15 7.01472 15 9.5C15 10.6812 14.5449 11.7562 13.8004 12.559C14.4936 14.1572 13.3016 16 11.456 16H2.54694C0.627617 16 -0.60048 14.0008 0.302223 12.3451C1.6087 9.94883 3.5345 6.39671 4.51457 4.49368V1.65517H3.66783V0H9.87727V1.65517ZM12.2962 13.6272C11.746 13.867 11.1385 14 10.5 14C8.01472 14 6 11.9853 6 9.5C6 7.98987 6.74386 6.65348 7.88515 5.83725L7.33705 4.91194V1.65517H6.20806V4.88502L6.11866 5.05976C5.15873 6.93619 3.14099 10.658 1.79676 13.1235C1.49524 13.6765 1.9056 14.3448 2.54694 14.3448H11.456C11.9075 14.3448 12.2417 14.0139 12.2962 13.6272ZM13.5375 9.5C13.5375 11.1776 12.1776 12.5375 10.5 12.5375C8.82244 12.5375 7.4625 11.1776 7.4625 9.5C7.4625 7.82243 8.82244 6.4625 10.5 6.4625C12.1776 6.4625 13.5375 7.82243 13.5375 9.5Z"
			})
		})
	});
};
function LD() {
	var e = Y(), t = X(_g), n = X(W), r = Ay(), i = X(yg), a = I((0, z.useState)([]), 2), o = a[0], s = a[1], c = I((0, z.useState)(!1), 2), l = c[0], u = c[1], d = I((0, z.useState)(), 2), f = d[0], p = d[1], m = [t], h = i, g = X(Pg), _ = r === "flex-layout-mode", v = o.filter(function(e) {
		return e && typeof e.forEachBond == "function";
	}), y = (n?.drawingEntitiesManager.selectedMicromoleculeEntities.length ?? 0) > 0 || !HT(v);
	return (0, z.useEffect)(function() {
		var e = function(e) {
			s(e), e.length && !FT(e) && (u(!1), IT(e) ? p("antisenseDnaStrand") : LT(e) ? p("antisenseRnaStrand") : (p("antisenseStrand"), u(!0)));
		};
		return n?.events.selectEntities.add(e), function() {
			n?.events.selectEntities.remove(e);
		};
	}, [n]), H(Q, {
		onItemClick: function(t) {
			yw[t] ? e(S_(t)) : t === "undo" || t === "redo" ? n?.events.selectHistory.dispatch(t) : t === "clear" ? (n?.events.selectTool.dispatch([t]), e(tg(g)), n?.events.selectTool.dispatch([g]), i && nx(e, n)) : t === "antisenseRnaStrand" || t === "antisenseDnaStrand" ? n?.events.createAntisenseChain.dispatch(t === "antisenseDnaStrand") : t === "arrange-ring" && n?.events.layoutCircular.dispatch();
		},
		activeMenuItems: m,
		isHorizontal: !0,
		children: [
			H(Q.Group, {
				isHorizontal: !0,
				divider: !0,
				children: [
					V(Q.Item, {
						itemId: "clear",
						title: `Clear Canvas (${jD.clear})`,
						testId: "clear-canvas"
					}),
					V(Q.Item, {
						itemId: "open",
						title: "Open...",
						disabled: h,
						testId: "open-file-button"
					}),
					V(Q.Item, {
						itemId: "save",
						title: "Save as...",
						testId: "save-file-button"
					})
				]
			}),
			H(Q.Group, {
				isHorizontal: !0,
				divider: !0,
				children: [V(Q.Item, {
					itemId: "undo",
					title: `Undo (${jD.undo})`,
					disabled: h,
					testId: "undo"
				}), V(Q.Item, {
					itemId: "redo",
					title: `Redo (${jD.redo})`,
					disabled: h,
					testId: "redo"
				})]
			}),
			_ && V(Q.Group, {
				isHorizontal: !0,
				divider: !0,
				children: V(Q.Item, {
					itemId: "arrange-ring",
					title: `Arrange as a Ring (${jD.arrangeRing})`,
					disabled: y,
					testId: "arrange-ring"
				})
			}),
			H(Q.Group, {
				isHorizontal: !0,
				children: [H(Q.Submenu, {
					disabled: !(o != null && o.length) || !RT(o) || FT(o),
					needOpenByMenuItemClick: l,
					vertical: !0,
					autoSize: !0,
					layoutModeButton: !0,
					generalTitle: "Create Antisense Strand",
					testId: "Create Antisense Strand",
					activeItem: f,
					children: [V(Q.Item, {
						itemId: "antisenseRnaStrand",
						title: `Create RNA Antisense Strand (${jD.createRnaAntisenseStrand})`,
						disabled: !(o != null && o.length) || !RT(o) || FT(o),
						testId: "antisenseRnaStrand",
						type: "button"
					}), V(Q.Item, {
						itemId: "antisenseDnaStrand",
						title: `Create DNA Antisense Strand (${jD.createDnaAntisenseStrand})`,
						disabled: !(o != null && o.length) || !RT(o) || FT(o),
						testId: "antisenseDnaStrand",
						type: "button"
					})]
				}), V(ID, {})]
			})
		]
	});
}
function RD() {
	var e = X(_g), t = X(W), n = Ay() === "sequence-layout-mode";
	return H(Q, {
		testId: "left-toolbar",
		onItemClick: function(e) {
			t?.events.selectTool.dispatch([e, { toolName: e }]);
		},
		activeMenuItems: [e],
		children: [H(Q.Group, {
			divider: !0,
			children: [
				V(Q.Item, {
					itemId: "hand",
					title: `Hand Tool (${jD.hand})`,
					testId: "hand"
				}),
				V(Q.Group, { children: H(Q.Submenu, {
					testId: "select-drop-down-button",
					subMenuId: Jh,
					needOpenByMenuItemClick: !0,
					children: [
						V(Q.Item, {
							itemId: "select-rectangle",
							title: `Select Rectangle (${jD.switchSelectTool})`,
							testId: "select-rectangle"
						}),
						V(Q.Item, {
							itemId: "select-lasso",
							title: `Lasso selection (${jD.switchSelectTool})`,
							testId: "select-lasso"
						}),
						V(Q.Item, {
							itemId: "select-structure",
							title: `Structure Selection (${jD.switchSelectTool})`,
							testId: "select-structure"
						})
					]
				}) }),
				V(Q.Item, {
					itemId: "erase",
					title: `Erase (${jD.erase})`,
					testId: "erase",
					disabled: n
				})
			]
		}), V(Q.Group, { children: H(Q.Submenu, {
			disabled: n,
			testId: "bonds-drop-down-button",
			needOpenByMenuItemClick: !1,
			children: [V(Q.Item, {
				itemId: "bond-single",
				title: "Single Bond (1)",
				testId: "single-bond",
				disabled: n
			}), V(Q.Item, {
				itemId: "bond-hydrogen",
				title: "Hydrogen Bond (2)",
				testId: "hydrogen-bond",
				disabled: n
			})]
		}) })]
	});
}
var zD = P("div", { target: "e1aw4j3q7" })({
	name: "bjn8wh",
	styles: "position:relative"
}), BD = P(Fn, { target: "e1aw4j3q6" })("display:flex;color:", function(e) {
	return e.theme.ketcher.color.dropdown.primary;
}, ";padding-right:0;padding-left:0;& svg{margin-left:2px;width:1rem;height:1rem;}"), VD = P("span", { target: "e1aw4j3q5" })({
	name: "td41hq",
	styles: "width:35px"
}), HD = P(de, { target: "e1aw4j3q4" })("& .MuiPopover-paper{padding:8px;width:175px;border:none;border-radius:0px 0px 4px 4px;box-shadow:", function(e) {
	return e.theme.ketcher.shadow.regular;
}, ";box-sizing:border-box;}"), UD = P("div", { target: "e1aw4j3q3" })({
	name: "5s1n17",
	styles: "display:flex;flex-direction:column;white-space:nowrap;word-break:keep-all;background:white"
}), WD = P(Fn, { target: "e1aw4j3q2" })("display:flex;justify-content:space-between;font-size:", function(e) {
	return e.theme.ketcher.font.size.regular;
}, ";line-height:14px;padding:7px 8px;text-transform:none;color:", function(e) {
	return e.theme.ketcher.color.dropdown.primary;
}, ";"), GD = P("span", { target: "e1aw4j3q1" })({
	name: "btyqtq",
	styles: "color:#cad3dd"
}), KD = P("input", { target: "e1aw4j3q0" })("border:1px solid #cad3dd;border-radius:4px;padding:3px 8px;color:", function(e) {
	return e.theme.ketcher.color.text.light;
}, ";font-size:", function(e) {
	return e.theme.ketcher.font.size.medium;
}, ";line-height:16px;margin-bottom:8px;&:hover{border-color:", function(e) {
	return e.theme.ketcher.color.input.border.hover;
}, ";}&:active,&:focus{border-color:", function(e) {
	return e.theme.ketcher.outline.selected.color;
}, ";outline:none;}&::after,&::before{display:none;}"), qD = function(e) {
	var t = e.onZoomSubmit, n = e.currentZoom, r = e.inputRef, i = (0, z.useCallback)(function(e) {
		var n = r.current;
		n && ([jD["zoom-out"], jD["zoom-in"]].includes(e.key) || e.nativeEvent.stopImmediatePropagation(), e.key === "Enter" && (t(), n.select()));
	}, [
		t,
		r,
		jD
	]);
	return (0, z.useEffect)(function() {
		var e = r.current;
		PD(n, e), document.activeElement === e && e?.select();
	}, [n, r]), (0, z.useEffect)(function() {
		var e = r.current;
		e?.focus(), e?.select();
	}, [r]), V(KD, {
		ref: r,
		"data-testid": "zoom-value",
		onFocus: function(e) {
			e.target.select();
		},
		onKeyDown: i
	});
}, JD = function() {
	var e = I((0, z.useState)(!1), 2), t = e[0], n = e[1], r = I((0, z.useState)(100), 2), i = r[0], a = r[1], o = (0, z.useRef)(null), c = (0, z.useRef)(null);
	(0, z.useEffect)(function() {
		var e;
		s == null || (e = s.instance) == null || e.subscribeOnZoomEvent(function() {
			var e;
			a(Math.round((s == null || (e = s.instance) == null ? void 0 : e.getZoomLevel()) * 100));
		});
	}, [s?.instance]);
	var l = (0, z.useCallback)(function() {
		var e = c.current;
		if (e) {
			var t = MD(e.value);
			if (t && t !== i) {
				var n = ND(t, i);
				PD(n, e), s.instance.zoomTo(n / 100);
			} else PD(i, e);
		}
	}, [i]);
	return H(zD, {
		ref: o,
		children: [H(BD, {
			onClick: function() {
				n(!0);
			},
			"data-testid": "zoom-selector",
			children: [H(VD, {
				"data-testid": "zoom-input",
				children: [i, "%"]
			}), V(F, { name: "chevron" })]
		}), V(HD, {
			open: t,
			onClose: function() {
				n(!1);
			},
			anchorEl: o.current,
			container: document.querySelector(On),
			anchorOrigin: {
				vertical: "bottom",
				horizontal: "right"
			},
			transformOrigin: {
				vertical: "top",
				horizontal: "right"
			},
			children: H(UD, { children: [
				V(qD, {
					onZoomSubmit: l,
					inputRef: c,
					currentZoom: i
				}),
				H(WD, {
					"data-testid": "zoom-out",
					title: "Zoom Out",
					onClick: function() {
						s.instance.zoomOut();
					},
					children: [V("span", { children: "Zoom out" }), V(GD, { children: jD["zoom-minus"] })]
				}),
				H(WD, {
					"data-testid": "zoom-in",
					title: "Zoom In",
					onClick: function() {
						s.instance.zoomIn();
					},
					children: [V("span", { children: "Zoom in" }), V(GD, { children: jD["zoom-plus"] })]
				}),
				H(WD, {
					"data-testid": "zoom-default",
					title: "Zoom 100%",
					onClick: function() {
						s.instance.resetZoom();
					},
					children: [V("span", { children: "Zoom 100%" }), V(GD, { children: jD["zoom-reset"] })]
				})
			] })
		})]
	});
};
function YD(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function XD(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? YD(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : YD(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
var ZD = [Ue.bondSingle, Ue.selectRectangle], QD = function() {
	var e = X(W), t = X(_g), n = X(wg), r = Y(), i = X(mv), a = X(Cg), o = X(Pg), s = (0, z.useCallback)(function() {
		r(r_(e?.monomersLibrary)), r(i_(e?.defaultRnaPresetsLibraryItems));
	}, [e]);
	(0, z.useEffect)(function() {
		return e?.events.updateMonomersLibrary.add(s), function() {
			e?.events.updateMonomersLibrary.remove(s);
		};
	}, [e]), (0, z.useEffect)(function() {
		var t = function() {
			e?.events.selectTool.dispatch([o]), r(tg(o));
		};
		return e && e.events.selectSelectionTool.add(t), function() {
			e?.events.selectSelectionTool.remove(t);
		};
	}, [
		r,
		e,
		o
	]), (0, z.useEffect)(function() {
		var n = function(e) {
			var n = I(e, 1)[0];
			n !== t && r(tg(n));
		};
		return e && (e.events.error.add(function(e) {
			r(w_(e));
		}), e.events.openErrorModal.add(function(e) {
			r(E_(e));
		}), r(tg("select-rectangle")), e.events.selectTool.dispatch(["select-rectangle"]), e.events.openMonomerConnectionModal.add(function(e) {
			return r(S_({
				name: "monomerConnection",
				additionalProps: e
			}));
		}), e.events.openConfirmationDialog.add(function(e) {
			return r(S_({
				name: "confirmationDialog",
				additionalProps: e
			}));
		}), e.events.selectTool.add(n)), function() {
			r(tg(null)), e?.events.selectTool.remove(n);
		};
	}, [e]);
	var c = (0, z.useCallback)(function(e) {
		return r(ig(e));
	}, [r]), l = (0, z.useCallback)((0, $o.debounce)(function(e) {
		return c(e);
	}, 500), [c]);
	(0, z.useEffect)(function() {
		var n = function(e) {
			var n = I(e, 1)[0];
			n !== t && r(tg(n));
		};
		return e && (e.events.error.add(function(e) {
			r(w_(e));
		}), e.events.openErrorModal.add(function(e) {
			r(E_(e));
		}), r(tg("select-rectangle")), e.events.selectTool.dispatch(["select-rectangle"]), e.events.openMonomerConnectionModal.add(function(e) {
			return r(S_({
				name: "monomerConnection",
				additionalProps: e
			}));
		}), e.events.selectTool.add(n)), function() {
			r(tg(null)), e?.events.selectTool.remove(n);
		};
	}, [e]);
	var d = (0, z.useCallback)(function(e, t) {
		l({
			type: Kh.Bond,
			polymerBond: e,
			style: t
		});
	}, [l]), f = (0, z.useCallback)(function(e) {
		if (e.buttons !== 1 && e.buttons !== 2) {
			if (n) {
				e.preventDefault(), e.stopPropagation();
				return;
			}
			var t = e.target.__data__?.polymerBond;
			if (!(t && !t.finished || t instanceof g)) {
				if (t) {
					d(t, gt(t, e.target.getBoundingClientRect()));
					return;
				}
				var r = e.target.__data__?.node, a = e.target.__data__?.monomer || r?.monomer;
				if (!(r && r instanceof Sn)) {
					if (a instanceof mn) {
						l({
							type: Kh.AmbiguousMonomer,
							monomer: a.variantMonomerItem,
							target: e.target
						});
						return;
					}
					var o = a.monomerItem, s = XD({}, a.attachmentPointsToBonds), c = r instanceof A || r instanceof T;
					if (r instanceof u) {
						var f = r.monomers;
						if (f.length > 1) {
							l({
								type: Kh.Preset,
								monomers: f.map(function(e) {
									return e.monomerItem;
								}),
								position: qh.ChainMiddle,
								target: e.target
							});
							return;
						}
					}
					if (c) {
						var p = r instanceof A ? [
							r.sugar.monomerItem,
							r.rnaBase.monomerItem,
							r.phosphate?.monomerItem
						] : [r.sugar.monomerItem, r.rnaBase.monomerItem];
						if (r.rnaBase instanceof mn) {
							l({
								type: Kh.AmbiguousMonomer,
								monomer: r.rnaBase.variantMonomerItem,
								presetMonomers: p,
								target: e.target
							});
							return;
						}
						var m = i.find(function(e) {
							var t = [
								e.sugar,
								e.base,
								e.phosphate
							];
							return p.every(function(e, n) {
								return e?.props.Name === t[n]?.props.Name;
							});
						}), h = r instanceof T ? qh.ChainEnd : r.firstMonomerInNode.R1AttachmentPoint === void 0 ? qh.ChainMiddle : qh.ChainStart;
						l({
							type: Kh.Preset,
							monomers: p,
							name: m?.name,
							idtAliases: m?.idtAliases,
							position: h,
							target: e.target
						});
						return;
					}
					l({
						type: Kh.Monomer,
						monomer: o,
						attachmentPointsToBonds: s,
						target: e.target
					});
				}
			}
		}
	}, [
		d,
		l,
		i,
		n
	]), p = (0, z.useCallback)(function() {
		l.cancel(), r(ig(void 0));
	}, [l, r]);
	return (0, z.useEffect)(function() {
		e?.events.mouseOverMonomer.add(f), e?.events.mouseLeaveMonomer.add(p), e?.events.mouseLeaveAttachmentPoint.add(p), e?.events.mouseDownAttachmentPoint.add(p), e?.events.mouseOverSequenceItem.add(f), e?.events.mouseLeaveSequenceItem.add(p), e?.events.mouseOverPolymerBond.add(f), e?.events.mouseLeavePolymerBond.add(p);
		var n = function(e) {
			p(), (e.buttons !== 1 || !ZD.includes(t)) && f(e);
		};
		return e?.events.mouseOnMoveMonomer.add(n), e?.events.mouseMoveAttachmentPoint.add(n), e?.events.mouseOnMoveSequenceItem.add(n), e?.events.mouseOnMovePolymerBond.add(n), window.addEventListener("hidePreview", p), function() {
			e?.events.mouseOverMonomer.remove(f), e?.events.mouseLeaveMonomer.remove(p), e?.events.mouseLeaveAttachmentPoint.remove(p), e?.events.mouseOverSequenceItem.remove(f), e?.events.mouseLeaveSequenceItem.remove(p), e?.events.mouseOverPolymerBond.remove(f), e?.events.mouseLeavePolymerBond.remove(p), e?.events.mouseOnMoveMonomer.remove(n), e?.events.mouseMoveAttachmentPoint.remove(n), e?.events.mouseOnMoveSequenceItem.remove(n), e?.events.mouseOnMovePolymerBond.remove(n), window.removeEventListener("hidePreview", p);
		};
	}, [
		e,
		t,
		f,
		p
	]), (0, z.useEffect)(function() {
		a || e?.events.resetSequenceEditMode.dispatch();
	}, [a]), V(B, {});
}, $D = function(e) {
	var t = e.selectedMonomers, n = e.contextMenuEvent, r = t || [], i = X(W), a = nt({ id: fb.FOR_SELECTED_MONOMERS }).hideAll, o = VT(r, n), s = function(e) {
		var t, n = ((i == null || (t = i.drawingEntitiesManager) == null || (t = t.selectedEntitiesArr) == null ? void 0 : t.length) ?? 0) > 0;
		return !(e != null && e.polymerBondRenderer) && (!(e != null && e.selectedMonomers) || e?.selectedMonomers.length === 0) && !n;
	}, c = BT(o), l = function(e) {
		return !!(e != null && e.polymerBondRenderer);
	}, u = r && r.length > 0 && RT(r), d = i?.mode.modeName !== "flex-layout-mode" || i?.drawingEntitiesManager.selectedMicromoleculeEntities.length > 0 || !HT(r), f = [
		{
			name: "copy",
			title: "Copy",
			icon: V(F, { name: "copyMenu" }),
			disabled: function(e) {
				var t = e.props, n = t === void 0 ? {} : t;
				return l(n) || s(n);
			}
		},
		{
			name: $.paste,
			title: "Paste",
			icon: V(F, { name: "pasteNavBar" }),
			disabled: function(e) {
				var t = e.props;
				return !s(t === void 0 ? {} : t);
			},
			separator: !0
		},
		{
			name: "create_antisense_rna_chain",
			title: "Create Antisense RNA Strand",
			separator: !1,
			disabled: FT(r),
			hidden: function(e) {
				var t = e.props;
				return !(t != null && t.selectedMonomers) || !RT(t?.selectedMonomers);
			}
		},
		{
			name: "create_antisense_dna_chain",
			title: "Create Antisense DNA Strand",
			disabled: FT(r),
			hidden: function(e) {
				var t = e.props;
				return !(t != null && t.selectedMonomers) || !RT(t?.selectedMonomers);
			},
			separator: u
		},
		{
			name: $.modifyAminoAcids,
			title: "Modify amino acids",
			disabled: !1,
			hidden: !c.length,
			subMenuItems: c
		},
		{
			name: "layout_circular",
			title: "Arrange as a Ring",
			disabled: d
		},
		{
			name: "edit_attachment_points",
			title: "Edit Attachment Points...",
			disabled: function(e) {
				var t = e.props;
				return !l(t);
			},
			separator: !0
		},
		{
			name: "delete",
			title: "Delete",
			icon: V(F, { name: "deleteMenu" }),
			disabled: function(e) {
				var t = e.props;
				return s(t === void 0 ? {} : t);
			}
		}
	], p = function(e) {
		var t = e.id, n = e.props;
		switch (!0) {
			case t === "layout_circular":
				i?.events.layoutCircular.dispatch(), a();
				break;
			case t === "copy":
				i?.events.copySelectedStructure.dispatch();
				break;
			case t === "create_antisense_rna_chain":
				i?.events.createAntisenseChain.dispatch(!1);
				break;
			case t === "create_antisense_dna_chain":
				i?.events.createAntisenseChain.dispatch(!0);
				break;
			case t === "delete":
				i?.events.deleteSelectedStructure.dispatch();
				break;
			case t === "paste":
				i?.events.pasteFromClipboard.dispatch();
				break;
			case t === "edit_attachment_points":
				var r, s = n == null || (r = n.polymerBondRenderer) == null ? void 0 : r.polymerBond;
				if (!s) return;
				i?.events.openMonomerConnectionModal.dispatch({
					firstMonomer: s.firstMonomer,
					secondMonomer: s.secondMonomer,
					polymerBond: s,
					isReconnectionDialog: !0
				});
				break;
			case t?.startsWith(zT):
				var c = t?.replace(zT, "");
				i?.events.modifyAminoAcids.dispatch({
					monomers: o,
					modificationType: c
				});
				break;
		}
	}, m = document.querySelector(On);
	return m && (0, ts.createPortal)(V(hb, {
		id: fb.FOR_SELECTED_MONOMERS,
		handleMenuChange: p,
		menuItems: f
	}), m);
}, eO = P(Ot, { target: "e1846tr80" })(function(e) {
	var t = e.theme, n = e.isActive;
	return {
		width: "40px",
		height: "31px",
		backgroundColor: n ? t.ketcher.color.button.group.active : "white",
		marginRight: "8px",
		border: n ? t.ketcher.outline.selected.color : t.ketcher.outline.small,
		borderRadius: "4px",
		outline: "none",
		":hover": { backgroundColor: n ? t.ketcher.color.button.group.hover : "white" },
		":hover svg": { fill: n ? "white" : t.ketcher.color.button.group.active }
	};
}, ""), tO = function() {
	var e = X(W), t = I((0, z.useState)(!0), 2), n = t[0], r = t[1], i = Ay() === "sequence-layout-mode", a = X(Cg);
	return (0, z.useEffect)(function() {
		i && a && e?.events.toggleIsSequenceSyncEditMode.dispatch(n);
	}, [i, a]), i && a ? V(eO, {
		isActive: n,
		onClick: function() {
			var t = !n;
			r(t), e?.events.toggleIsSequenceSyncEditMode.dispatch(t), iT();
		},
		"data-testid": "sync_sequence_edit_mode",
		"data-isactive": n,
		children: H("svg", {
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			fill: n ? "white" : "#333333",
			children: [
				V("rect", {
					x: "1",
					y: "1.5",
					width: "22",
					height: "2",
					rx: "1"
				}),
				V("rect", {
					x: "2.5",
					y: "1.5",
					width: "5",
					height: "1.5",
					rx: "0.75",
					transform: "rotate(90 2.5 1.5)"
				}),
				V("rect", {
					x: "9.33333",
					y: "1.5",
					width: "5",
					height: "1.5",
					rx: "0.75",
					transform: "rotate(90 9.33333 1.5)"
				}),
				V("rect", {
					x: "16.1667",
					y: "1.5",
					width: "5",
					height: "1.5",
					rx: "0.75",
					transform: "rotate(90 16.1667 1.5)"
				}),
				V("rect", {
					x: "23",
					y: "1.5",
					width: "5",
					height: "1.5",
					rx: "0.75",
					transform: "rotate(90 23 1.5)"
				}),
				V("path", { d: "M2.16873 14.2715C2.08963 14.3652 2.02518 14.4253 1.97537 14.4517C1.9285 14.478 1.8699 14.4912 1.79959 14.4912C1.66189 14.4912 1.55057 14.4458 1.46561 14.355C1.38357 14.2612 1.34256 14.1074 1.34256 13.8936V13.2871C1.34256 13.0703 1.38357 12.9165 1.46561 12.8257C1.55057 12.7319 1.66189 12.6851 1.79959 12.6851C1.90506 12.6851 1.99295 12.7129 2.06326 12.7686C2.1365 12.8242 2.19217 12.918 2.23025 13.0498C2.26834 13.1787 2.30789 13.2666 2.34891 13.3135C2.43387 13.4043 2.58475 13.4966 2.80154 13.5903C3.01834 13.6841 3.25564 13.731 3.51346 13.731C3.91482 13.731 4.24441 13.6372 4.50223 13.4497C4.66629 13.3354 4.74832 13.1948 4.74832 13.0278C4.74832 12.9165 4.70877 12.8125 4.62967 12.7158C4.55057 12.6162 4.42166 12.5342 4.24295 12.4697C4.12576 12.4258 3.86355 12.3657 3.45633 12.2896C2.96414 12.1987 2.59207 12.0889 2.34012 11.96C2.08816 11.8311 1.88895 11.6494 1.74246 11.415C1.59598 11.1807 1.52273 10.9272 1.52273 10.6548C1.52273 10.2241 1.70291 9.84766 2.06326 9.52539C2.42361 9.2002 2.89236 9.0376 3.46951 9.0376C3.70096 9.0376 3.91482 9.06396 4.11111 9.1167C4.31033 9.1665 4.49051 9.24414 4.65164 9.34961C4.76883 9.23535 4.88602 9.17822 5.0032 9.17822C5.13504 9.17822 5.24197 9.2251 5.324 9.31885C5.40897 9.40967 5.45145 9.56201 5.45145 9.77588V10.4526C5.45145 10.6694 5.40897 10.8247 5.324 10.9185C5.24197 11.0093 5.13504 11.0547 5.0032 11.0547C4.89188 11.0547 4.7952 11.021 4.71316 10.9536C4.64871 10.9038 4.60037 10.8042 4.56814 10.6548C4.53592 10.5054 4.4949 10.3984 4.4451 10.334C4.36014 10.2227 4.2327 10.1289 4.06277 10.0527C3.89285 9.97656 3.69656 9.93848 3.47391 9.93848C3.14871 9.93848 2.8909 10.0146 2.70047 10.167C2.51297 10.3164 2.41922 10.4731 2.41922 10.6372C2.41922 10.7485 2.4573 10.8569 2.53348 10.9624C2.61258 11.0649 2.72684 11.1455 2.87625 11.2041C2.97586 11.2451 3.25564 11.311 3.71561 11.4019C4.1785 11.4927 4.53299 11.5923 4.77908 11.7007C5.02811 11.8091 5.23465 11.979 5.39871 12.2104C5.56277 12.4419 5.6448 12.7173 5.6448 13.0366C5.6448 13.4819 5.48807 13.8379 5.17459 14.1045C4.75857 14.4561 4.2283 14.6318 3.58377 14.6318C3.33475 14.6318 3.09158 14.6011 2.85428 14.5396C2.6199 14.481 2.39139 14.3916 2.16873 14.2715ZM9.615 12.2632V13.5991H10.2214C10.4382 13.5991 10.5921 13.6416 10.6829 13.7266C10.7766 13.8086 10.8235 13.917 10.8235 14.0518C10.8235 14.1836 10.7766 14.292 10.6829 14.377C10.5921 14.459 10.4382 14.5 10.2214 14.5H8.10768C7.89381 14.5 7.74 14.459 7.64625 14.377C7.55543 14.292 7.51002 14.1821 7.51002 14.0474C7.51002 13.9155 7.55543 13.8086 7.64625 13.7266C7.74 13.6416 7.89381 13.5991 8.10768 13.5991H8.71412V12.2632L7.22438 10.0747C7.02516 10.0747 6.87867 10.0322 6.78492 9.94727C6.6941 9.8623 6.64869 9.75391 6.64869 9.62207C6.64869 9.4873 6.6941 9.37891 6.78492 9.29688C6.87867 9.21191 7.03395 9.16943 7.25074 9.16943L8.06813 9.17383C8.28492 9.17383 8.43873 9.21484 8.52955 9.29688C8.6233 9.37891 8.67018 9.4873 8.67018 9.62207C8.67018 9.82422 8.55152 9.9751 8.31422 10.0747L9.16676 11.3315L10.0017 10.0747C9.86988 10.0249 9.77613 9.96191 9.72047 9.88574C9.6648 9.80957 9.63697 9.72168 9.63697 9.62207C9.63697 9.4873 9.68238 9.37891 9.7732 9.29688C9.86695 9.21484 10.0222 9.17236 10.239 9.16943L11.0872 9.17383C11.304 9.17383 11.4578 9.21484 11.5486 9.29688C11.6423 9.37891 11.6892 9.4873 11.6892 9.62207C11.6892 9.75684 11.6423 9.8667 11.5486 9.95166C11.4548 10.0337 11.3025 10.0747 11.0916 10.0747L9.615 12.2632ZM13.7082 10.8745V13.5991H14.0334C14.2502 13.5991 14.404 13.6416 14.4949 13.7266C14.5886 13.8086 14.6355 13.917 14.6355 14.0518C14.6355 14.1836 14.5886 14.292 14.4949 14.377C14.404 14.459 14.2502 14.5 14.0334 14.5H12.8513C12.6345 14.5 12.4792 14.459 12.3855 14.377C12.2947 14.292 12.2493 14.1821 12.2493 14.0474C12.2493 13.9185 12.2947 13.8115 12.3855 13.7266C12.4763 13.6416 12.6169 13.5991 12.8074 13.5991V10.0747H12.6667C12.4499 10.0747 12.2947 10.0337 12.2009 9.95166C12.1101 9.8667 12.0647 9.75684 12.0647 9.62207C12.0647 9.4873 12.1101 9.37891 12.2009 9.29688C12.2947 9.21191 12.4499 9.16943 12.6667 9.16943L13.7082 9.17383L16.011 12.7861V10.0747H15.6858C15.469 10.0747 15.3137 10.0337 15.22 9.95166C15.1291 9.8667 15.0837 9.75684 15.0837 9.62207C15.0837 9.4873 15.1291 9.37891 15.22 9.29688C15.3137 9.21191 15.469 9.16943 15.6858 9.16943L16.8679 9.17383C17.0847 9.17383 17.2385 9.21484 17.3293 9.29688C17.4231 9.37891 17.47 9.4873 17.47 9.62207C17.47 9.75391 17.4246 9.8623 17.3337 9.94727C17.2429 10.0322 17.1038 10.0747 16.9163 10.0747V14.5H16.0242L13.7082 10.8745ZM21.9236 9.40234C21.9792 9.32617 22.0393 9.26904 22.1037 9.23096C22.1711 9.19287 22.2429 9.17383 22.3191 9.17383C22.4509 9.17383 22.5578 9.21924 22.6399 9.31006C22.7248 9.40088 22.7673 9.55469 22.7673 9.77148V10.5361C22.7673 10.7529 22.7248 10.9082 22.6399 11.002C22.5578 11.0928 22.4509 11.1382 22.3191 11.1382C22.1989 11.1382 22.1023 11.1045 22.029 11.0371C21.9558 10.9697 21.9016 10.8438 21.8664 10.6592C21.8459 10.5361 21.8049 10.4409 21.7434 10.3735C21.6233 10.2417 21.4548 10.1362 21.238 10.0571C21.0241 9.97803 20.8088 9.93848 20.592 9.93848C20.3225 9.93848 20.0749 9.99707 19.8493 10.1143C19.6237 10.2314 19.4245 10.4219 19.2517 10.6855C19.0788 10.9492 18.9924 11.2627 18.9924 11.626V12.2104C18.9924 12.644 19.1491 13.0059 19.4626 13.2959C19.779 13.5859 20.217 13.731 20.7766 13.731C21.1106 13.731 21.3933 13.6855 21.6247 13.5947C21.7595 13.542 21.903 13.438 22.0554 13.2827C22.1491 13.189 22.2224 13.1289 22.2751 13.1025C22.3279 13.0732 22.3879 13.0586 22.4553 13.0586C22.5754 13.0586 22.6809 13.104 22.7717 13.1948C22.8625 13.2856 22.9079 13.3926 22.9079 13.5156C22.9079 13.6387 22.8464 13.7705 22.7234 13.9111C22.5446 14.1162 22.3147 14.2773 22.0334 14.3945C21.6555 14.5527 21.238 14.6318 20.781 14.6318C20.2478 14.6318 19.7673 14.522 19.3396 14.3022C18.9939 14.1265 18.6994 13.8496 18.4563 13.4717C18.2131 13.0908 18.0915 12.6763 18.0915 12.228V11.6172C18.0915 11.1484 18.1999 10.7119 18.4167 10.3076C18.6364 9.90039 18.9397 9.58691 19.3264 9.36719C19.7131 9.14746 20.1233 9.0376 20.5569 9.0376C20.8176 9.0376 21.0608 9.06836 21.2863 9.12988C21.5149 9.18848 21.7273 9.2793 21.9236 9.40234Z" }),
				V("rect", {
					x: "23",
					y: "22.5",
					width: "22",
					height: "2",
					rx: "1",
					transform: "rotate(-180 23 22.5)"
				}),
				V("rect", {
					x: "21.5",
					y: "22.5",
					width: "5",
					height: "1.5",
					rx: "0.75",
					transform: "rotate(-90 21.5 22.5)"
				}),
				V("rect", {
					x: "14.6667",
					y: "22.5",
					width: "5",
					height: "1.5",
					rx: "0.75",
					transform: "rotate(-90 14.6667 22.5)"
				}),
				V("rect", {
					x: "7.83333",
					y: "22.5",
					width: "5",
					height: "1.5",
					rx: "0.75",
					transform: "rotate(-90 7.83333 22.5)"
				}),
				V("rect", {
					x: "1",
					y: "22.5",
					width: "5",
					height: "1.5",
					rx: "0.75",
					transform: "rotate(-90 1 22.5)"
				})
			]
		})
	}) : null;
}, nO = function(e, t) {
	var n = (0, z.useRef)(null);
	(0, z.useLayoutEffect)(function() {
		var r = e.current;
		if (r) return n.current = requestAnimationFrame(function() {
			r.style.transform = `translateX(${t}px)`;
		}), function() {
			n.current &&= (cancelAnimationFrame(n.current), null);
		};
	}, [e, t]);
}, rO = {
	rulerArea: "RulerArea-module_rulerArea__Kix1O",
	rulerInput: "RulerArea-module_rulerInput__nCNOa",
	rulerInputDragging: "RulerArea-module_rulerInputDragging__saoOk",
	rulerScale: "RulerArea-module_rulerScale__4YOKH",
	rulerHandle: "RulerArea-module_rulerHandle__g4GPl"
}, iO = (0, z.memo)(function(e) {
	var t = e.lineLengthValue, n = e.offsetX, r = e.isDragging, i = e.layoutMode, a = e.onCommitValue, o = (0, z.useRef)(null);
	nO(o, n);
	var s = t.toString(), c = I((0, z.useState)(null), 2), l = c[0], u = c[1], d = l === null ? s : l;
	return V("input", {
		className: Qt(rO.rulerInput, r && rO.rulerInputDragging),
		title: "Number of monomers in a line",
		type: "text",
		inputMode: "numeric",
		pattern: "[0-9]*",
		value: d,
		onChange: function(e) {
			u(e.target.value);
		},
		onBlur: function() {
			if (!l || l.trim() === "") {
				u(null);
				return;
			}
			var e = Number(l);
			if (Number.isNaN(e) || e < 1) {
				u(null);
				return;
			}
			var t = i === "sequence-layout-mode" ? Math.round(e / 10) * 10 : e;
			u(null), a(t);
		},
		onKeyDown: function(e) {
			e.key === "Enter" && (e.preventDefault(), e.currentTarget.blur());
		},
		"data-testid": "ruler-input",
		disabled: r,
		ref: o
	});
}), aO = 40, oO = 20, sO = 10, cO = 25, lO = 60, uO = (0, z.memo)(function(e) {
	var t = e.transform, n = e.layoutMode;
	e.lineLengthValue;
	var r = (0, z.useRef)(null), i = t.k - .5 < 2 ** -52, a = function(e, t, n, r) {
		var i = Math.max(0, Math.floor((e - r) / n)), a = Math.ceil((t - r) / n) + 10;
		return Array.from({ length: a - i }, function(e, t) {
			return r + (i + t) * n;
		});
	}, o = (0, z.useMemo)(function() {
		var e, i = ((e = r.current) == null || (e = e.ownerSVGElement) == null ? void 0 : e.width.baseVal.value) || 1e3, o = t.invertX(0), s = t.invertX(i);
		return n === "sequence-layout-mode" ? a(o, s, 10 * oO + sO, aO) : n === "snake-layout-mode" ? a(o, s, lO, cO) : [];
	}, [n, t]), s = (0, z.useMemo)(function() {
		var e = [];
		return o.forEach(function(r, a) {
			n === "sequence-layout-mode" ? e.push(V("line", {
				x1: t.applyX(r),
				y1: 14,
				x2: t.applyX(r),
				y2: 22,
				stroke: "#7C7C7F",
				strokeWidth: 1
			}, `ruler-mark-${r}`)) : n === "snake-layout-mode" && (i ? a % 5 == 0 ? e.push(V("text", {
				x: t.applyX(r),
				y: 18,
				fontSize: 10,
				fontWeight: 500,
				fill: "#7C7C7F",
				textAnchor: "middle",
				dominantBaseline: "middle",
				children: a
			}, `ruler-label-${r}`)) : e.push(V("line", {
				x1: t.applyX(r),
				y1: 14,
				x2: t.applyX(r),
				y2: 22,
				stroke: "#7C7C7F",
				strokeWidth: 1
			}, `ruler-mark-${r}`)) : e.push(V("text", {
				x: t.applyX(r),
				y: 18,
				fontSize: 10,
				fontWeight: 500,
				fill: "#7C7C7F",
				textAnchor: "middle",
				dominantBaseline: "middle",
				children: a
			}, `ruler-label-${r}`)));
			var s = o[a + 1];
			s !== void 0 && (i && n === "snake-layout-mode" || e.push(V("line", {
				x1: t.applyX(r + 10),
				y1: 18,
				x2: t.applyX(s - 10),
				y2: 18,
				stroke: "#B4B9D6",
				strokeDasharray: "2,2",
				strokeWidth: 1
			}, `ruler-fill-${r}-${s}`)));
		}), e;
	}, [
		o,
		n,
		t,
		i
	]);
	return V("svg", {
		className: rO.rulerScale,
		ref: r,
		"data-testid": "ruler-scale",
		children: s
	});
}), dO = (0, z.memo)(function(e) {
	var t = e.offsetX, n = e.onDragStart, r = e.onDrag, i = e.onDragEnd, a = (0, z.useRef)(null), o = (0, z.useRef)(null);
	return nO(a, t), (0, z.useEffect)(function() {
		if (o.current) {
			var e = Cd(o.current), t = Rd().on("start", n).on("drag", r).on("end", i);
			return e.call(t), function() {
				e.on(".drag", null);
			};
		}
	}, [
		r,
		i,
		n
	]), V("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		className: rO.rulerHandle,
		viewBox: "0 0 16 13",
		fill: "none",
		pointerEvents: "none",
		ref: a,
		"data-testid": "ruler-handle",
		children: H("g", {
			cursor: "pointer",
			pointerEvents: "all",
			ref: o,
			children: [
				V("mask", {
					id: "ruler-handle-mask",
					fill: "#fff",
					children: V("path", {
						fillRule: "evenodd",
						d: "M16 1.625a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v4.5a1 1 0 0 0 .4.8l7 5.25a1 1 0 0 0 1.2 0l7-5.25a1 1 0 0 0 .4-.8v-4.5Z",
						clipRule: "evenodd"
					})
				}),
				V("path", {
					fill: "#CAD3DD",
					fillRule: "evenodd",
					d: "M16 1.625a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v4.5a1 1 0 0 0 .4.8l7 5.25a1 1 0 0 0 1.2 0l7-5.25a1 1 0 0 0 .4-.8v-4.5Z",
					clipRule: "evenodd"
				}),
				V("path", {
					fill: "#B4B9D6",
					d: "m15.6 6.925-.6-.8.6.8Zm-8.2 5.25.6-.8-.6.8Zm-7-5.25.6-.8-.6.8Zm.6-5.3h14v-2H1v2Zm0 4.5v-4.5h-2v4.5h2Zm7 5.25-7-5.25-1.2 1.6 7 5.25 1.2-1.6Zm7-5.25-7 5.25 1.2 1.6 7-5.25-1.2-1.6Zm0-4.5v4.5h2v-4.5h-2Zm1.2 6.1a2 2 0 0 0 .8-1.6h-2l1.2 1.6Zm-9.4 5.25a2 2 0 0 0 2.4 0l-1.2-1.6-1.2 1.6ZM-1 6.125a2 2 0 0 0 .8 1.6l1.2-1.6h-2Zm16-4.5h2a2 2 0 0 0-2-2v2Zm-14-2a2 2 0 0 0-2 2h2v-2Z",
					mask: "url(#ruler-handle-mask)"
				})
			]
		})
	});
}), fO = function() {
	var e = I((0, z.useState)(new Gh(1, 0, 0)), 2), t = e[0], n = e[1];
	return (0, z.useEffect)(function() {
		var e = s.instance;
		if (e) {
			var t = function(e) {
				e && requestAnimationFrame(function() {
					n(e);
				});
			};
			return e.subscribeOnZoomEvent(t), function() {
				e.unsubscribeOnZoomEvent(t);
			};
		}
	}, [s.instance]), t;
}, pO = function() {
	var e, t, n, r = Ay(), i = xn(jg)[r], a = xn(W), o = (0, z.useRef)(0), s = I((0, z.useState)(0), 2), c = s[0], l = s[1], u = I((0, z.useState)(!1), 2), d = u[0], f = u[1], p = fO(), m = i / 10 - 1, h = (0, z.useMemo)(function() {
		if (r === "sequence-layout-mode") {
			var e = 10 * oO + sO;
			return aO + Math.floor(i / 10) * e;
		}
		return r === "snake-layout-mode" ? cO + i * lO : 0;
	}, [r, i]), g = I((0, z.useMemo)(function() {
		var e = p.applyX(h) + c, t = e - 8, n = e + 10, r = a?.canvas.width.baseVal.value;
		if (!r) return [n, t];
		var i = a?.canvas.parentElement, o = i?.scrollLeft || 0, s = o, l = o + (i?.clientWidth || r);
		return n + 35 > l && (n = l - 35), n < s && (n = s), [n, t];
	}, [
		a?.canvas.width.baseVal.value,
		a?.canvas.parentElement,
		p,
		h,
		c
	]), 2), _ = g[0], v = g[1], y = (0, z.useCallback)(function(e) {
		a?.events.setEditorLineLength.dispatch(M({}, r, e));
	}, [a == null || (e = a.events) == null ? void 0 : e.setEditorLineLength, r]), b = (0, z.useCallback)(function(e) {
		if (r === "sequence-layout-mode") {
			var t = (e - m * sO - aO) / oO;
			return Math.max(10, Math.round(t / 10) * 10);
		} else if (r === "snake-layout-mode") {
			var n = (e - cO) / lO;
			return Math.max(1, Math.round(n));
		}
		return i;
	}, [
		r,
		m,
		i
	]), x = (0, z.useCallback)(function(e) {
		var t = e - o.current, n = p.applyX(h) + t;
		return [t, p.invertX(n)];
	}, [p, h]), S = (0, z.useMemo)(function() {
		if (!d) return i;
		var e = I(x(o.current + c), 2)[1];
		return b(e);
	}, [
		d,
		i,
		x,
		o,
		c,
		b
	]), C = (0, z.useCallback)(function(e) {
		f(!0), o.current = e.sourceEvent.clientX, a?.events.toggleLineLengthHighlighting.dispatch(!0, h);
	}, [a == null || (t = a.events) == null ? void 0 : t.toggleLineLengthHighlighting, h]), w = (0, z.useCallback)(function(e) {
		var t = I(x(e.sourceEvent.clientX), 2), n = t[0], r = t[1];
		l(n), a?.events.toggleLineLengthHighlighting.dispatch(!0, r);
	}, [a == null || (n = a.events) == null ? void 0 : n.toggleLineLengthHighlighting, x]), T = (0, z.useCallback)(function(e) {
		f(!1);
		var t = I(x(e.sourceEvent.clientX), 2)[1], n = b(t);
		n !== i && y(n), l(0), o.current = 0, a?.events.toggleLineLengthHighlighting.dispatch(!1);
	}, [
		x,
		b,
		i,
		a?.events.toggleLineLengthHighlighting,
		y
	]);
	return r === "flex-layout-mode" || window._ketcher_isChainLengthRulerDisabled ? null : H("div", {
		className: Qt(rO.rulerArea, d && rO.rulerAreaDragging),
		"data-testid": "ruler-area",
		children: [
			V(iO, {
				lineLengthValue: d ? S : i,
				offsetX: _,
				isDragging: d,
				layoutMode: r,
				onCommitValue: y
			}),
			V(dO, {
				offsetX: v,
				onDragStart: C,
				onDrag: w,
				onDragEnd: T
			}),
			V(uO, {
				transform: p,
				layoutMode: r,
				lineLengthValue: i
			})
		]
	});
}, mO = { dragGhost: "DragGhost-module_dragGhost__m5lHf" }, hO = function(e) {
	var t = e.preset, n = t.sugar, r = t.phosphate, i = t.base;
	if (!n) return null;
	var a = I(rt(n), 2), o = a[0], s = a[1], c = new s(new o(n)), l = r ? function() {
		var e = I(rt(r), 2), t = e[0], n = e[1];
		return new n(new t(r));
	}() : null, u = i ? function() {
		var e = I(rt(i), 2), t = e[0], n = e[1];
		return new n(new t(i));
	}() : null, d = c.monomerSize, f = l?.monomerSize, p = u?.monomerSize, m = 0, h = 0, g = f ? m + d.width + 30 : 0, _ = h, v = m + (d.width - (p?.width || 0)) / 2, y = h + d.height + 30, b = Math.max(m + d.width, f ? g + f.width : 0, p ? v + p.width : 0), x = Math.max(h + d.height, f ? _ + f.height : 0, p ? y + p.height : 0), S = 2, C = (d.width - S * 2) / d.width, w = (d.height - S * 2) / d.height, T = Math.min(C, w), E = (d.width - d.width * T) / 2, D = (d.height - d.height * T) / 2, O = f ? Math.min((f.width - S * 2) / f.width, (f.height - S * 2) / f.height) : 1, k = f ? (f.width - f.width * O) / 2 : 0, ee = f ? (f.height - f.height * O) / 2 : 0, te = p ? Math.min((p.width - S * 2) / p.width, (p.height - S * 2) / p.height) : 1, ne = p ? (p.width - p.width * te) / 2 : 0, re = p ? (p.height - p.height * te) / 2 : 0, A = 4, j = 6;
	return V("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: b,
		height: x,
		viewBox: `0 0 ${b} ${x}`,
		overflow: "visible",
		children: H("g", {
			style: { filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.4))" },
			children: [
				H("g", {
					transform: `translate(${m}, ${h})`,
					children: [
						V("use", {
							href: c.monomerSymbolElementId,
							fill: "white"
						}),
						V("g", {
							transform: `translate(${E}, ${D}) scale(${T})`,
							children: V("use", {
								href: c.monomerSymbolElementId,
								fill: "#CAD3DD"
							})
						}),
						V("text", {
							x: d.width / 2,
							y: d.height / 2,
							textAnchor: "middle",
							dominantBaseline: "central",
							pointerEvents: "none",
							fill: "#333",
							fontSize: "7px",
							fontWeight: "bold",
							children: n.label
						})
					]
				}),
				f && H("g", {
					transform: `translate(${g}, ${_})`,
					children: [
						V("use", {
							href: l.monomerSymbolElementId,
							fill: "white"
						}),
						V("g", {
							transform: `translate(${k}, ${ee}) scale(${O})`,
							children: V("use", {
								href: l.monomerSymbolElementId,
								fill: "#CAD3DD"
							})
						}),
						V("text", {
							x: f.width / 2,
							y: f.height / 2,
							textAnchor: "middle",
							dominantBaseline: "central",
							pointerEvents: "none",
							fill: "#333",
							fontSize: "7px",
							fontWeight: "bold",
							children: r?.label
						})
					]
				}),
				p && H("g", {
					transform: `translate(${v}, ${y})`,
					children: [
						V("use", {
							href: u.monomerSymbolElementId,
							fill: "white"
						}),
						V("g", {
							transform: `translate(${ne}, ${re}) scale(${te})`,
							children: V("use", {
								href: u.monomerSymbolElementId,
								fill: "#CAD3DD"
							})
						}),
						V("text", {
							x: p.width / 2,
							y: p.height / 2,
							textAnchor: "middle",
							dominantBaseline: "central",
							pointerEvents: "none",
							fill: "#333",
							fontSize: "7px",
							fontWeight: "bold",
							children: i?.label
						})
					]
				}),
				f && H("g", { children: [V("line", {
					x1: m + d.width,
					y1: h + d.height / 2,
					x2: g + j / 3,
					y2: _ + f.height / 2,
					stroke: "white",
					strokeWidth: 7,
					strokeLinecap: "butt"
				}), V("line", {
					x1: m + d.width - j / 2,
					y1: h + d.height / 2,
					x2: g + j / 2,
					y2: _ + f.height / 2,
					stroke: "#CAD3DD",
					strokeWidth: A,
					strokeLinecap: "round"
				})] }),
				p && H("g", { children: [V("line", {
					x1: m + d.width / 2,
					y1: h + d.height,
					x2: v + p.width / 2,
					y2: y + j / 2,
					stroke: "white",
					strokeWidth: 7,
					strokeLinecap: "butt"
				}), V("line", {
					x1: m + d.width / 2,
					y1: h + d.height - j / 2,
					x2: v + p.width / 2,
					y2: y + j / 2,
					stroke: "#CAD3DD",
					strokeWidth: A,
					strokeLinecap: "round"
				})] })
			]
		})
	});
}, gO = function(e) {
	var t = e.monomerItem, n = (0, z.useMemo)(function() {
		if (bn(t)) return new lt(new mn(t));
		var e = I(rt(t), 2), n = e[0], r = e[1];
		return new r(new n(t));
	}, [t]), r = n.monomerSymbolElementId, i = n.monomerSize, a = i.width, o = i.height;
	return H("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: a,
		height: o,
		viewBox: `0 0 ${a} ${o}`,
		overflow: "visible",
		children: [V("use", {
			href: r,
			fill: "#CAD3DD",
			stroke: "white",
			strokeWidth: 2,
			style: { filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.4))" }
		}), V("text", {
			x: a / 2,
			y: o / 2,
			textAnchor: "middle",
			dominantBaseline: "central",
			pointerEvents: "none",
			fill: "#333",
			fontSize: "7px",
			fontWeight: "bold",
			children: t.label
		})]
	});
}, _O = function() {
	var e, t, n = xn(W), r = I((0, z.useState)(null), 2), i = r[0], a = r[1], o = (0, z.useRef)(null), c = (0, z.useRef)(null), l = (0, z.useRef)(null), u = fO();
	(0, z.useEffect)(function() {
		if (n) {
			var e = function(e) {
				a(e);
			};
			return n.events.setLibraryItemDragState.add(e), function() {
				n.events.setLibraryItemDragState.remove(e);
			};
		}
	}, [n]), (0, z.useEffect)(function() {
		if (!(!s.instance || !i)) {
			var e = s.instance.canvasWrapper.node();
			e && (l.current = e.getBoundingClientRect());
		}
	}, [i]);
	var d = (n == null || (e = n.ketcherRootElementBoundingClientRect) == null ? void 0 : e.left) || 0, f = (n == null || (t = n.ketcherRootElementBoundingClientRect) == null ? void 0 : t.top) || 0, p = l.current && i && i.position.x + d >= l.current.left && i.position.x + d <= l.current.right && i.position.y + f >= l.current.top && i.position.y + f <= l.current.bottom;
	return (0, z.useLayoutEffect)(function() {
		var e = o.current;
		if (!(!e || !i)) return c.current = requestAnimationFrame(function() {
			var t = i.position, n = t.x, r = t.y;
			if (p && l.current) {
				var a = u.k;
				e.style.transformOrigin = "0 0", e.style.transform = `translate(${n}px, ${r}px) scale(${a})`;
			} else e.style.transform = `translate(${n}px, ${r}px)`;
		}), function() {
			c.current &&= (cancelAnimationFrame(c.current), null);
		};
	}, [
		p,
		i,
		u.k
	]), i ? V("div", {
		className: mO.dragGhost,
		ref: o,
		"data-testid": "drag-ghost",
		children: en(i.item) ? V(hO, { preset: i.item }) : V(gO, { monomerItem: i.item })
	}) : null;
}, vO, yO, bO, xO, SO;
function CO() {
	return CO = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, CO.apply(null, arguments);
}
function wO(e) {
	return /*#__PURE__*/ z.createElement("svg", CO({
		width: 22,
		height: 24,
		viewBox: "0 0 22 24",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, e), vO ||= /*#__PURE__*/ z.createElement("path", {
		fill: "transparent",
		d: "M0 0h21.503v24H0z"
	}), yO ||= /*#__PURE__*/ z.createElement("path", {
		d: "M13.507 18.936l-2.04-1.92c-.7-.659-1.403-1.317-2.108-1.983v3.097c0 .43.003.86.007 1.289 0 .049-.007.09-.007.126v2.04c0 .834 0 1.557.003 2.02l.278.163c.719.3 1.434.307 2.151.033l4.264-2.469c-.358-.326-1.395-1.31-2.548-2.396zM6.159 19.39v-1.091L6.163 2.23v-.002L1.26 5.059C.421 5.647.002 6.482.002 7.553c0 2.944.006 5.888-.002 8.831-.003 1.08.398 1.913 1.212 2.517l4.946 2.856v-2.318-.05z",
		fill: "#676767"
	}), bO ||= /*#__PURE__*/ z.createElement("path", {
		d: "M18.642 4.137l1.672.966c.785.58 1.187 1.385 1.188 2.41v8.974c0 1-.385 1.79-1.133 2.367l-1.423.822h-.004c-.097-.097-6.384-6.375-6.513-6.386.044-.044.56-.582 1.278-1.33L20.3 5.097l-1.658-.96z",
		fill: "url(#logo_svg__paint0_linear_5175_84899)"
	}), xO ||= /*#__PURE__*/ z.createElement("path", {
		d: "M17.335 3.383L11.849.216c-.718-.29-1.455-.29-2.219.011l-.27.139s0 10.346.041 11.106c.341-.346 7.808-7.96 7.934-8.09z",
		fill: "url(#logo_svg__paint1_linear_5175_84899)"
	}), SO ||= /*#__PURE__*/ z.createElement("defs", null, /*#__PURE__*/ z.createElement("linearGradient", {
		id: "logo_svg__paint0_linear_5175_84899",
		x1: 19.854,
		y1: 4.363,
		x2: 11.579,
		y2: 13.111,
		gradientUnits: "userSpaceOnUse"
	}, /*#__PURE__*/ z.createElement("stop", { stopColor: "#3BC2D7" }), /*#__PURE__*/ z.createElement("stop", {
		offset: .74,
		stopColor: "#1D9DB1"
	})), /*#__PURE__*/ z.createElement("linearGradient", {
		id: "logo_svg__paint1_linear_5175_84899",
		x1: 19.854,
		y1: 4.363,
		x2: 11.579,
		y2: 13.111,
		gradientUnits: "userSpaceOnUse"
	}, /*#__PURE__*/ z.createElement("stop", { stopColor: "#3BC2D7" }), /*#__PURE__*/ z.createElement("stop", {
		offset: .74,
		stopColor: "#1D9DB1"
	}))));
}
var TO = P("div", { target: "e1dr48d30" })(function(e) {
	var t, n, r = e.theme;
	return {
		width: "430px",
		minHeight: "260px",
		padding: "0 18px",
		borderRadius: "6px",
		fontSize: "12px",
		color: r.ketcher.color.text.primary,
		fontWeight: (t = r.ketcher) == null || (t = t.font) == null || (t = t.weight) == null ? void 0 : t.regular,
		a: { color: "#167782" },
		".body": {
			borderRadius: "6px",
			padding: "5px 65px",
			overflowY: "auto",
			overflowX: "hidden",
			".versionName": {
				fontWeight: 400,
				marginBottom: "2px"
			},
			".firstline": { display: "inline-block" },
			".links": { textAlign: "right" },
			".indigoVersion": {
				marginTop: "20px",
				display: "flex",
				gap: "2px"
			}
		},
		".headerContent": {
			display: "flex",
			justifyContent: "space-between",
			padding: "0 30px",
			a: {
				display: "flex",
				alignItems: "center",
				gap: "10px",
				textDecoration: "none",
				color: (n = r.ketcher) == null || (n = n.color) == null || (n = n.text) == null ? void 0 : n.primary
			},
			".title": {
				fontSize: "20px",
				lineHeight: "22px"
			}
		},
		".indigoFirstLine": { display: "inline-block" },
		dd: {
			margin: 0,
			marginBottom: "0.2em"
		},
		dt: { marginTop: "3px" },
		".okButton": {
			border: "1px solid #333333",
			backgroundColor: "#FFFFFF",
			color: "#333333",
			display: "inline-flex",
			justifyContent: "center",
			alignItems: "center",
			outline: "none",
			minWidth: "70px",
			lineHeight: "14px",
			height: "24px",
			borderRadius: "4px",
			fontSize: "10px",
			"&:hover": {
				color: "#333333",
				border: "1px solid  #333333"
			},
			"&:active": {
				color: "#333333",
				border: "1px solid #333333"
			},
			"&:disabled": {
				color: "rgba(51, 51, 51, 0.7)",
				border: "1px solid rgba(51, 51, 51, 0.7)"
			}
		},
		".aboutFooter": {
			borderTop: "1px solid #e1e5ea",
			margin: 0,
			padding: "15px 0",
			display: "flex",
			justifyContent: "flex-end",
			alignItems: "center"
		}
	};
}, "");
function EO(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function DO(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? EO(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : EO(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function OO() {
	var e = Y(), t = X(Mg);
	(0, z.useEffect)(function() {
		function n() {
			return r.apply(this, arguments);
		}
		function r() {
			return r = Nt(ns.default.mark(function n() {
				var r, i;
				return ns.default.wrap(function(n) {
					for (;;) switch (n.prev = n.next) {
						case 0:
							if (r = ot.getIndigo(), !(r != null && r.info)) {
								n.next = 11;
								break;
							}
							return n.prev = 2, n.next = 5, r.info();
						case 5:
							i = n.sent, e(mg(DO(DO({}, t), {}, { indigoVersion: i.indigoVersion || "" }))), n.next = 11;
							break;
						case 9: n.prev = 9, n.t0 = n.catch(2);
						case 11:
						case "end": return n.stop();
					}
				}, n, null, [[2, 9]]);
			})), r.apply(this, arguments);
		}
		n();
	}, [e]);
}
var kO = "http://lifescience.opensource.epam.com/ketcher/#feedback", AO = "https://lifescience.opensource.epam.com/ketcher/index.html", jO = "http://lifescience.opensource.epam.com/", MO = "http://lifescience.opensource.epam.com/indigo/";
function NO() {
	var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
	if (!e.includes("T")) return e;
	var t = I(e.split("T"), 2);
	return `${t[0]}; ${t[1]}`;
}
function PO(e) {
	var t = e.isOpen, n = e.onClose, r = Y();
	OO();
	var i = X(Mg), a = i.buildDate, o = i.indigoVersion, s = i.version, c = NO(a), l = function() {
		r({ type: "MODAL_CLOSE" }), n();
	};
	return V(Z, {
		title: "",
		isOpen: t,
		onClose: l,
		hideHeaderBorder: !0,
		children: V(Z.Content, { children: H(TO, { children: [
			V("div", {
				className: "headerContent",
				children: H("a", {
					href: AO,
					target: "_blank",
					rel: "noopener noreferrer",
					children: [V(wO, {}), V("span", {
						className: "title",
						children: "Ketcher"
					})]
				})
			}),
			V("div", {
				className: "body",
				children: H("dl", { children: [
					V("dt", {
						"data-testid": "build-version",
						children: H("a", {
							href: AO,
							target: "_blank",
							rel: "noopener noreferrer",
							children: ["Version ", s]
						})
					}),
					H("dd", {
						"data-testid": "build-time",
						children: ["Build at ", V("time", { children: c })]
					}),
					H("div", {
						className: "infoLinks",
						children: [V("dt", { children: V("a", {
							href: kO,
							target: "_blank",
							rel: "noopener noreferrer",
							children: "Feedback"
						}) }), V("dt", { children: V("a", {
							href: jO,
							target: "_blank",
							rel: "noopener noreferrer",
							children: "EPAM Life Sciences"
						}) })]
					}),
					V("div", {
						className: "indigoVersion",
						children: V("a", {
							href: MO,
							target: "_blank",
							rel: "noopener noreferrer",
							children: "Indigo Toolkit"
						})
					}),
					V("div", {
						"data-testid": "build-indigo-version",
						children: o ? H("dd", { children: ["Version ", o] }) : V("p", { children: "Standalone" })
					})
				] })
			}),
			V("div", {
				className: "aboutFooter",
				children: V("button", {
					onClick: l,
					className: "okButton",
					"data-testid": "ok-button",
					children: "Ok"
				})
			})
		] }) })
	});
}
function FO(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function IO(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? FO(Object(n), !0).forEach(function(t) {
			M(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : FO(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function LO() {
	var e = I((0, z.useState)(!1), 2), t = e[0], n = e[1], r = {
		isOpen: t,
		onClose: function() {
			return n(!1);
		}
	};
	return H(B, { children: [H("div", {
		style: {
			display: "flex",
			alignItems: "center"
		},
		children: [V(dn, {
			iconName: "help",
			title: "Help (?)",
			onClick: function() {
				var e = {}.HELP_LINK || "master";
				window.open(`https://github.com/epam/ketcher/blob/${e}/documentation/help.md#ketcher-macromolecules-mode`, "_blank");
			},
			testId: "help-button"
		}), V(dn, {
			iconName: "about",
			title: "About",
			onClick: function() {
				return n(!0);
			},
			testId: "about-button"
		})]
	}), V(PO, IO({}, r))] });
}
var RO = P("div", { target: "e1lzguhf1" })("position:absolute;left:", function(e) {
	return e.left;
}, "px;top:", function(e) {
	return e.top;
}, "px;display:flex;flex-direction:row;gap:8px;transform:translate(-50%, -100%) translateY(-10px);z-index:100;"), zO = P("button", { target: "e1lzguhf0" })({
	name: "11kiyhp",
	styles: "width:28px;height:28px;display:flex;align-items:center;justify-content:center;background:white;border:none;border-radius:4px;cursor:pointer;padding:0;color:#2b2f3a;box-shadow:0 6px 10px rgba(103, 104, 132, 0.15);&:hover{color:#188794;}&:active{background:#167782;color:#fff;}&>svg{width:20px;height:20px;}"
}), BO = .1, VO = function() {
	var e = X(W), t = I((0, z.useState)(!1), 2), n = t[0], r = t[1], i = I((0, z.useState)(new Ce(0, 0)), 2), a = i[0], o = i[1], s = (0, z.useRef)(new Ce(0, 0)), c = (0, z.useCallback)(function() {
		if (e) {
			var t = e.drawingEntitiesManager?.getSelectedEntitiesBoundingBox();
			if (t) {
				var n = (t.left + t.right) / 2, r = t.top - 1.7, i = Gt.modelToView(new Ce(n, r)), a = Math.abs(i.x - s.current.x), c = Math.abs(i.y - s.current.y);
				(a > BO || c > BO) && (s.current = i, o(i));
			}
		}
	}, [e]);
	return (0, z.useEffect)(function() {
		if (e) {
			var t = function() {
				var t = (e.drawingEntitiesManager?.selectedEntitiesArr ?? []).filter(function(e) {
					return e instanceof Vt || e instanceof pt;
				}), n = e.selectedTool instanceof Re && (e.selectedTool.mode === "rotating" || e.selectedTool.mode === "moving");
				t.length >= 2 && e.mode.modeName !== "sequence-layout-mode" && e.selectedTool instanceof Re && !n ? (c(), r(!0)) : r(!1);
			};
			return e.events.selectEntities.add(t), function() {
				e.events.selectEntities.remove(t);
			};
		}
	}, [e, c]), (0, z.useEffect)(function() {
		if (!(!e || !n)) {
			var t = 0;
			return t = requestAnimationFrame(function n() {
				if (e.selectedTool instanceof Re && (e.selectedTool.mode === "rotating" || e.selectedTool.mode === "moving")) {
					r(!1);
					return;
				}
				c(), t = requestAnimationFrame(n);
			}), function() {
				return cancelAnimationFrame(t);
			};
		}
	}, [
		e,
		n,
		c
	]), n ? H(RO, {
		left: a.x,
		top: a.y,
		children: [
			V(zO, {
				onClick: function() {
					e?.events.flipHorizontal.dispatch();
				},
				title: "Flip horizontally",
				"data-testid": "floating-tool-flip-h",
				children: V(F, { name: "transform-flip-h" })
			}),
			V(zO, {
				onClick: function() {
					e?.events.flipVertical.dispatch();
				},
				title: "Flip vertically",
				"data-testid": "floating-tool-flip-v",
				children: V(F, { name: "transform-flip-v" })
			}),
			V(zO, {
				onClick: function() {
					e?.events.deleteSelectedStructure.dispatch(), r(!1);
				},
				title: "Delete",
				"data-testid": "floating-tool-delete",
				children: V(F, { name: "delete" })
			})
		]
	}) : null;
}, HO = Te(Bv);
function UO(e) {
	var t = e.onInit, n = e.ketcherId, r = e.theme, i = e.togglerComponent, a = e.monomersLibraryUpdate, o = e.monomersLibraryReplace, s = e.isMacromoleculesEditorTurnedOn, c = (0, z.useRef)(null), l = r ? (0, $o.merge)(zv, r) : zv, u = (0, $o.merge)(HO, { ketcher: l });
	return (0, z.useEffect)(function() {
		Rv.dispatch(eg(n));
	}, [n]), V(ct, {
		store: Rv,
		children: H(vt, {
			theme: u,
			children: [V(et, { styles: Vv }), V(Py, {
				rootRef: c,
				isMacromoleculesEditorTurnedOn: s,
				children: V(Lw, {
					ref: c,
					className: $e,
					children: V(WO, {
						ketcherId: n,
						theme: l,
						togglerComponent: i,
						monomersLibraryUpdate: a,
						monomersLibraryReplace: o,
						onInit: t
					})
				})
			})]
		})
	});
}
function WO(e) {
	var t = e.theme, n = e.togglerComponent, r = e.monomersLibraryUpdate, i = e.monomersLibraryReplace, a = e.onInit, o = Y(), s = (0, z.useRef)(null), c = X(j_), l = X(W), u = X(Sg), d = Vw(), f = I((0, z.useState)(!1), 2), p = f[0], m = f[1], h = jy(), g = I((0, z.useState)(), 2), _ = g[0], v = g[1], y = I((0, z.useState)(), 2), b = y[0], x = y[1], S = I((0, z.useState)([]), 2), C = S[0], w = S[1], T = nt({ id: fb.FOR_SEQUENCE }).show, E = nt({ id: fb.FOR_SELECTED_MONOMERS }).show;
	(0, z.useEffect)(function() {
		return o(ng({
			theme: t,
			canvas: s.current,
			monomersLibraryUpdate: r,
			monomersLibraryReplace: i,
			onInit: a
		})), function() {
			o(rg(null));
		};
	}, [o]), qw(), Jw(), (0, z.useEffect)(function() {
		l?.events.rightClickSequence.add(function(e) {
			var t = I(e, 2), n = t[0], r = t[1];
			v(r), x(n), window.dispatchEvent(new Event("hidePreview")), o(ag(!0)), T({
				event: n,
				props: { sequenceItemRenderer: n.target.__data__ }
			});
		}), l?.events.rightClickPolymerBond.add(function(e) {
			var t = I(e, 2), n = t[0], r = t[1];
			x(n), w([]), E({
				event: n,
				props: { polymerBondRenderer: r }
			});
		}), l?.events.rightClickSelectedMonomers.add(function(e) {
			var t = I(e, 2), n = t[0], r = t[1];
			w(r), x(n), E({
				event: n,
				props: { selectedMonomers: r }
			});
		}), l?.events.rightClickCanvas.add(function(e) {
			var t = I(e, 2), n = t[0], r = t[1];
			x(n), window.dispatchEvent(new Event("hidePreview")), o(ag(!0)), l.mode instanceof te ? (v(r), T({
				event: n,
				props: {}
			})) : (w(r), E({
				event: n,
				props: { selectedMonomers: r }
			}));
		}), l?.events.toggleMacromoleculesPropertiesVisibility.add(function() {
			o(sg({}));
		});
	}, [l]), (0, z.useEffect)(function() {
		return l?.zoomTool.observeCanvasResize(), function() {
			l?.zoomTool.destroy();
		};
	}, [l]), (0, z.useEffect)(function() {
		var e = function(e) {
			var t = e.detail;
			t && o(dg(t));
		};
		return window.addEventListener(O, e), function() {
			window.removeEventListener(O, e);
		};
	}, [o]);
	var D = function() {
		o(T_());
	}, k = (0, z.useCallback)(function() {
		m(function(e) {
			return !e;
		});
	}, []);
	return H(B, { children: [
		H(py, { children: [
			H(py.Top, {
				shortened: !p,
				"data-testid": "top-toolbar",
				children: [V(LD, {}), H(Rw, { children: [
					V(tO, {}),
					V(bT, {}),
					V(DE, {}),
					V(zw, {
						className: h ? "toggler-component-wrapper--disabled" : "",
						children: n
					}),
					V(_T, {}),
					V(LO, {}),
					V(tT, {}),
					V(_T, {}),
					V(JD, {})
				] })]
			}),
			V(py.Left, { children: V(RD, {}) }),
			H(py.Main, { children: [
				V(QD, {}),
				V(pO, {}),
				H(Bw, {
					id: "polymer-editor-canvas",
					"data-testid": "ketcher-canvas",
					"data-canvasmode": "macromolecules-mode",
					preserveAspectRatio: "xMidYMid meet",
					ref: s,
					width: "100%",
					height: "100%",
					style: {
						overflow: "hidden",
						overflowClipMargin: "content-box"
					},
					children: [
						H("defs", { children: [
							V(Dw, {}),
							V(Ew, {}),
							V(Ow, {}),
							V(kw, {}),
							V(Aw, {}),
							V(jw, {}),
							V(Mw, {}),
							V(Pw, {}),
							V(Nw, {})
						] }),
						V("g", {
							className: "drawn-structures",
							"data-testid": "drawn-structures"
						}),
						u && V("rect", {
							x: 0,
							y: 0,
							width: "100%",
							height: "100%",
							fill: "transparent",
							pointerEvents: "all"
						})
					]
				}),
				V(VO, {}),
				d && V(Xw, {})
			] }),
			V(py.Right, {
				hide: p,
				children: V(Xx, { toggleLibraryVisibility: k })
			}),
			V(py.Bottom, { children: V(AD, {}) }),
			V(py.InsideRoot, { children: p && V(Qx, { onClick: k }) })
		] }),
		V(TE, {}),
		V(_O, {}),
		V(UT, {
			selections: _,
			contextMenuEvent: b
		}),
		V($D, {
			selectedMonomers: C,
			contextMenuEvent: b
		}),
		V(Sw, {}),
		V(Iw, {}),
		V(Ft, {
			anchorOrigin: {
				vertical: "bottom",
				horizontal: "center"
			},
			open: !!c,
			onClose: D,
			autoHideDuration: 6e3,
			children: H(Cw, {
				id: "error-tooltip",
				children: [V(ww, {
					"data-testid": "error-tooltip",
					children: c
				}), V(Tw, {
					testId: "error-tooltip-close",
					iconName: "close",
					onClick: D
				})]
			})
		})
	] });
}
//#endregion
export { UO as default };
