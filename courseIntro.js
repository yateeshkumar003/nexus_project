/* ----------  MOBILE NAV (hamburger) ---------- */
const navToggle = document.querySelector('.nav-toggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !expanded);
  navMenu.classList.toggle('open');
});

/* sub-menu toggle on mobile */
document.querySelectorAll('.sub-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const parent = btn.closest('.has-sub');
    const open   = parent.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
});

/* ----------  SIMPLE TABS ---------- */
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    /* remove active classes */
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    /* activate clicked tab + its panel */
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

/* ----------  FOOTER YEAR ---------- */
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();