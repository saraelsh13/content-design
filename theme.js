(() => {
  const choices = ["paper", "soft", "notes"];
  let theme = "paper";
  try {
    const saved = localStorage.getItem("sara-portfolio-theme");
    if (choices.includes(saved)) theme = saved;
  } catch {}
  const apply = value => {
    document.documentElement.dataset.theme = value;
    document.querySelectorAll("[data-theme-choice]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.themeChoice === value));
    });
  };
  apply(theme);
  document.addEventListener("DOMContentLoaded", () => {
    apply(theme);
    document.querySelectorAll("[data-theme-choice]").forEach(button => {
      button.addEventListener("click", () => {
        theme = button.dataset.themeChoice;
        apply(theme);
        try { localStorage.setItem("sara-portfolio-theme", theme); } catch {}
        const status = document.getElementById("theme-status");
        if (status) status.textContent = button.textContent.trim() + " theme applied.";
      });
    });
  });
})();
