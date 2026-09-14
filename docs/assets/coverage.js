(() => {
  const input = document.querySelector("#tutorial-filter");
  const cards = [...document.querySelectorAll(".tutorial-card")];
  const chips = [...document.querySelectorAll(".filter-chip")];
  const capability = document.querySelector("#capability-filter");
  const difficulty = document.querySelector("#difficulty-filter");
  const language = document.querySelector("#language-filter");
  let coverage = "all";
  const apply = () => {
    const query = (input?.value || "").trim().toLowerCase();
    for (const card of cards) {
      const matchesText = !query || card.dataset.search.includes(query);
      const matchesCoverage = coverage === "all" || card.dataset.coverage === coverage;
      const matchesCapability = !capability || capability.value === "all" || card.dataset.capability === capability.value;
      const matchesDifficulty = !difficulty || difficulty.value === "all" || card.dataset.difficulty === difficulty.value;
      const matchesLanguage = !language || language.value === "all" || card.dataset.language === language.value;
      card.hidden = !(matchesText && matchesCoverage && matchesCapability && matchesDifficulty && matchesLanguage);
    }
    for (const heading of document.querySelectorAll(".tutorial-family")) {
      const grid = heading.nextElementSibling;
      heading.hidden = !!grid && ![...grid.querySelectorAll(".tutorial-card")].some(card => !card.hidden);
    }
  };
  input?.addEventListener("input", apply);
  capability?.addEventListener("change", apply);
  difficulty?.addEventListener("change", apply);
  language?.addEventListener("change", apply);
  for (const chip of chips) chip.addEventListener("click", () => {
    coverage = chip.dataset.coverage;
    chips.forEach(item => item.classList.toggle("active", item === chip));
    apply();
  });
})();
