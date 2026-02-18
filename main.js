const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

const revealTargets = document.querySelectorAll(".section, .card, .slot");
revealTargets.forEach((el, idx) => {
  el.classList.add("reveal");
  el.style.transitionDelay = `${Math.min(idx * 18, 220)}ms`;
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
);

revealTargets.forEach((el) => revealObserver.observe(el));

const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navAnchors.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
      });
    });
  },
  { threshold: 0.35, rootMargin: "-20% 0px -55% 0px" }
);

sections.forEach((section) => activeObserver.observe(section));

const hero = document.querySelector(".hero");
const heroWire = document.querySelector(".hero-wireframe");

if (hero && heroWire) {
  const updateWireOffset = () => {
    const rect = hero.getBoundingClientRect();
    const inView = rect.bottom > 0;
    if (!inView) return;
    const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
    heroWire.style.transform = `translateY(${progress * 14}px)`;
  };

  window.addEventListener("scroll", updateWireOffset, { passive: true });
  window.addEventListener("resize", updateWireOffset);
  updateWireOffset();
}
