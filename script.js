/* ==========================================================================
   PixOrbital — script.js
   Handles: mobile navigation, contact form validation + mailto fallback,
   footer year, header scroll shadow, active-section nav indicator,
   scroll-reveal animation, and the back-to-top control.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initContactForm();
  initFooterYear();
  initHeaderScrollState();
  initActiveSectionIndicator();
  initScrollReveal();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   Footer year (Stage 11)
   -------------------------------------------------------------------------- */
function initFooterYear() {
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* --------------------------------------------------------------------------
   Header scroll shadow (Stage 12)
   -------------------------------------------------------------------------- */
function initHeaderScrollState() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const toggle = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
}

/* --------------------------------------------------------------------------
   Active section indicator (Stage 12)
   -------------------------------------------------------------------------- */
function initActiveSectionIndicator() {
  const navLinks = document.querySelectorAll(".nav-link");
  if (!navLinks.length || !("IntersectionObserver" in window)) return;

  const linkByHash = new Map();
  navLinks.forEach((link) => {
    const hash = link.getAttribute("href");
    if (hash && hash.startsWith("#")) linkByHash.set(hash.slice(1), link);
  });

  const sections = [...linkByHash.keys()]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (id) => {
    const target = linkByHash.get(id);
    if (!target) return;
    navLinks.forEach((l) => l.classList.remove("is-active"));
    target.classList.add("is-active");
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* --------------------------------------------------------------------------
   Scroll reveal (Stage 12) — progressive enhancement, staggered per group
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  if (!("IntersectionObserver" in window)) return;

  const selector =
    ".why-card, .service-row, .solution-card, .case-file, .insight-card, .process-step, .tech-row";
  const elements = Array.from(document.querySelectorAll(selector));
  if (!elements.length) return;

  // Stagger delay based on position within each element's parent group
  const groups = new Map();
  elements.forEach((el) => {
    const parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });

  groups.forEach((group) => {
    group.forEach((el, index) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${Math.min(index, 5) * 90}ms`;
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   Back to top (Stage 12)
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  const toggle = () => {
    btn.classList.toggle("back-to-top--visible", window.scrollY > 600);
  };

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* --------------------------------------------------------------------------
   Mobile navigation (Stage 2)
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.dataset.state = "closed";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
  };

  const openMenu = () => {
    menu.dataset.state = "open";
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    document.body.style.overflow = "hidden";
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  // Close on link click (so navigating actually dismisses the panel)
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.dataset.state === "open") {
      closeMenu();
      toggle.focus();
    }
  });

  // Close if resized past the mobile breakpoint
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && menu.dataset.state === "open") {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   Contact form (Stage 10) — client-side validation + mailto: fallback.
   No backend exists, so this never pretends to submit to a server.
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const successEl = document.getElementById("form-success");

  const fields = {
    name: { el: document.getElementById("cf-name"), errorEl: document.getElementById("cf-name-error") },
    email: { el: document.getElementById("cf-email"), errorEl: document.getElementById("cf-email-error") },
    company: { el: document.getElementById("cf-company"), errorEl: document.getElementById("cf-company-error") },
    interest: { el: document.getElementById("cf-interest"), errorEl: document.getElementById("cf-interest-error") },
    details: { el: document.getElementById("cf-details"), errorEl: document.getElementById("cf-details-error") },
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(field, message) {
    field.el.setAttribute("aria-invalid", message ? "true" : "false");
    field.errorEl.textContent = message || "";
  }

  function validateField(key) {
    const field = fields[key];
    const value = field.el.value.trim();

    if (!value) {
      setError(field, "This field is required.");
      return false;
    }

    if (key === "email" && !emailPattern.test(value)) {
      setError(field, "Enter a valid email address.");
      return false;
    }

    if (key === "details" && value.length < 10) {
      setError(field, "Tell us a little more — a few sentences is plenty.");
      return false;
    }

    setError(field, "");
    return true;
  }

  // Validate on blur for immediate, non-annoying feedback
  Object.keys(fields).forEach((key) => {
    fields[key].el.addEventListener("blur", () => validateField(key));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let allValid = true;
    Object.keys(fields).forEach((key) => {
      if (!validateField(key)) allValid = false;
    });

    if (!allValid) {
      successEl.hidden = true;
      // Move focus to the first invalid field
      const firstInvalid = Object.values(fields).find(
        (f) => f.el.getAttribute("aria-invalid") === "true"
      );
      if (firstInvalid) firstInvalid.el.focus();
      return;
    }

    const name = fields.name.el.value.trim();
    const email = fields.email.el.value.trim();
    const company = fields.company.el.value.trim();
    const interest = fields.interest.el.value.trim();
    const details = fields.details.el.value.trim();

    const subject = `New project inquiry from ${name}`;
    const body =
      `Name: ${name}\n` +
      `Company: ${company}\n` +
      `Email: ${email}\n` +
      `Area of interest: ${interest}\n\n` +
      `Project details:\n${details}`;

    const mailtoUrl =
      `mailto:contact.hr@pixorbital.in` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    successEl.hidden = false;
  });
}
