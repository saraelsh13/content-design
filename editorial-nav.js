const menuToggle = document.querySelector(".cohere-nav-toggle");
const portfolioNav = document.querySelector("#cohere-side-nav");

if (menuToggle && portfolioNav) {
  const compact = window.matchMedia("(max-width: 720px)");
  const sidebar = menuToggle.closest(".cohere-sidebar");
  const preference = "sara-cohere-navigation-open";

  let isOpen = false;
  try {
    isOpen = sessionStorage.getItem(preference) === "true";
  } catch {
    // Navigation remains usable when browser storage is disabled.
  }

  function renderMenu() {
    menuToggle.hidden = !compact.matches;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    portfolioNav.hidden = compact.matches && !isOpen;
  }

  function setMenu(open) {
    isOpen = open;
    renderMenu();
    try {
      sessionStorage.setItem(preference, String(open));
    } catch {
      // The current page can still open and close the menu.
    }
  }

  menuToggle.addEventListener("click", () => setMenu(!isOpen));

  portfolioNav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (compact.matches && link && link.pathname === location.pathname && link.hash) {
      setMenu(false);
      menuToggle.focus({ preventScroll: true });
    }
  });

  sidebar.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && compact.matches && isOpen) {
      setMenu(false);
      menuToggle.focus();
    }
  });

  compact.addEventListener("change", renderMenu);
  renderMenu();
}
