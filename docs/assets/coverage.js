(() => {
  const input = document.querySelector("#tutorial-filter");
  const cards = [...document.querySelectorAll(".tutorial-card")];
  const chips = [...document.querySelectorAll(".filter-chip")];
  let coverage = "all";
  const apply = () => {
    const query = (input?.value || "").trim().toLowerCase();
    for (const card of cards) {
      const matchesText = !query || card.dataset.search.includes(query);
      const matchesCoverage = coverage === "all" || card.dataset.coverage === coverage;
      card.hidden = !(matchesText && matchesCoverage);
    }
    for (const heading of document.querySelectorAll(".tutorial-family")) {
      const grid = heading.nextElementSibling;
      heading.hidden = !!grid && ![...grid.querySelectorAll(".tutorial-card")].some(card => !card.hidden);
    }
  };
  input?.addEventListener("input", apply);
  for (const chip of chips) chip.addEventListener("click", () => {
    coverage = chip.dataset.coverage;
    chips.forEach(item => item.classList.toggle("active", item === chip));
    apply();
  });
})();

