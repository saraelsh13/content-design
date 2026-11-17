const menuToggle = document.querySelector(".cohere-nav-toggle");
const portfolioNav = document.querySelector("#cohere-side-nav");

if (menuToggle && portfolioNav) {
  const compact = window.matchMedia("(max-width: 900px)");

  function setMenu(open) {
    menuToggle.setAttribute("aria-expanded", String(open));
    portfolioNav.hidden = compact.matches && !open;
  }

  function syncLayout() {
    menuToggle.hidden = !compact.matches;
    setMenu(false);
  }

  menuToggle.addEventListener("click", () => {
    setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  portfolioNav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (compact.matches && link && link.pathname === location.pathname && link.hash) {
      setMenu(false);
      menuToggle.focus({ preventScroll: true });
    }
  });

  document.querySelector(".cohere-sidebar").addEventListener("keydown", (event) => {
    if (event.key === "Escape" && compact.matches && !portfolioNav.hidden) {
      setMenu(false);
      menuToggle.focus();
    }
  });

  compact.addEventListener("change", syncLayout);
  syncLayout();
}
