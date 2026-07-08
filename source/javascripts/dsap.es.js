var m = Object.defineProperty;
var p = (a, t, e) => t in a ? m(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var r = (a, t, e) => (p(a, typeof t != "symbol" ? t + "" : t, e), e);
class g {
  constructor() {
    r(this, "elems");
    r(this, "maxScrollDelta", 1e3);
    this.init();
  }
  init() {
    this.elems = document.querySelectorAll("[data-dsap]"), this.elems.forEach((t) => {
      t.dataset.dsap = crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
    }), this.style = document.createElement("style"), this.style.id = "dsap-style", this.style.innerHTML = `:root{--dsap-max-scroll-delta: ${this.maxScrollDelta}}`, document.head.appendChild(this.style), this.doScroll(), window.addEventListener("scroll", this.debounce(this.doScroll.bind(this)), { passive: !0 });
  }
  doScroll() {
    const t = window.scrollY, e = t + window.innerHeight;
    let i = [`:root{--dsap-max-scroll-delta: ${this.maxScrollDelta}}`];
    this.elems.forEach((s) => {
      const o = s.getBoundingClientRect().top + t, h = o + s.getBoundingClientRect().height, c = s.hasAttribute("data-dsap-scroll");
      let l = !1, n = !1, d = 0;
      e < o ? n = !1 : t > h ? n = !0 : l = !0, c && (l ? d = ((e - o) / (s.getBoundingClientRect().height + window.innerHeight) * this.maxScrollDelta).toFixed(0) : n && (d = this.maxScrollDelta)), s.dataset.dsapIs = l ? "in" : n ? "above" : "below", l && (s.dataset.dsapSeen = !0), c && i.push(`[data-dsap="${s.dataset.dsap}"]{--dsap-scroll-delta: ${d}}`);
    }), this.style.innerHTML !== i.join("") && (this.style.innerHTML = i.join(""));
  }
  debounce(t) {
    let e;
    return (...i) => {
      e && cancelAnimationFrame(e), e = requestAnimationFrame(() => {
        t(...i);
      });
    };
  }
}
export {
  g as DSAP
};
