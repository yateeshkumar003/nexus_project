// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#navMenu");

navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true" || false;
  navToggle.setAttribute("aria-expanded", !expanded);
  navMenu.classList.toggle("show");
});

// Submenu toggle
const subToggle = document.querySelector(".sub-toggle");
const hasSub = document.querySelector(".has-sub");

subToggle.addEventListener("click", () => {
  const expanded = subToggle.getAttribute("aria-expanded") === "true" || false;
  subToggle.setAttribute("aria-expanded", !expanded);
  hasSub.classList.toggle("open");
});
