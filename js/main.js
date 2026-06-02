/* =============================================================
   FontDale — site behaviour
   - <site-header> / <site-footer> shared components (light DOM,
     so the global stylesheet applies and it works from file://)
   - mobile nav toggle
   - newsletter form handling
   - scroll-reveal animations
   ============================================================= */

const NAV_ITEMS = [
  { id: "home",       label: "Home",       href: "index.html" },
  { id: "directory",  label: "Directory",  href: "directory.html" },
  { id: "events",     label: "Events",     href: "events.html" },
  { id: "about",      label: "About Us",   href: "about.html" },
  { id: "newsletter", label: "Newsletter", href: "newsletter.html" },
];

const FOOTER_LINKS = [
  "Privacy Policy",
  "Terms of Service",
  "Sustainability",
  "Careers",
  "Press",
];

/* ----- Header ----- */
class SiteHeader extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute("active") || "";
    const links = NAV_ITEMS.map(
      (i) =>
        `<a class="nav__link${i.id === active ? " is-active" : ""}" href="${i.href}">${i.label}</a>`
    ).join("");

    this.innerHTML = `
      <header class="site-header">
        <div class="container site-header__inner">
          <a class="brand" href="index.html">FontDale</a>
          <nav class="nav" id="primary-nav">${links}</nav>
          <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>`;

    const nav = this.querySelector("#primary-nav");
    const toggle = this.querySelector(".nav-toggle");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", (e) => {
      if (e.target.matches(".nav__link")) nav.classList.remove("is-open");
    });
  }
}

/* ----- Footer ----- */
class SiteFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    const links = FOOTER_LINKS.map((l) => `<a href="#">${l}</a>`).join("");
    this.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="site-footer__top">
            <div>
              <a class="brand" href="index.html">FontDale</a>
              <p class="site-footer__tag">Where Elegance Meets the Urban Pulse. A curated destination for the discerning.</p>
            </div>
            <nav class="footer-links">${links}</nav>
          </div>
          <div class="site-footer__bottom">
            © ${year} FontDale Premium Lifestyle Mall. All rights reserved.
          </div>
        </div>
      </footer>`;
  }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);

/* ----- Newsletter form ----- */
function initForms() {
  document.querySelectorAll("form[data-newsletter]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const ok = form.querySelector(".form-success");
      if (ok) ok.classList.add("is-visible");
      form.reset();
    });
  });
}

/* ----- Scroll reveal ----- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !els.length) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  initForms();
  initReveal();
});
