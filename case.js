/* ----------  NAV / HAMBURGER ---------- */
const navToggle = document.querySelector('.nav-toggle');
const navMenu   = document.getElementById('navMenu');
navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.sub-toggle').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const parent=btn.closest('.has-sub');
    const open=parent.classList.toggle('open');
    btn.setAttribute('aria-expanded',open);
  });
});

/* ----------  TABS ---------- */
document.querySelectorAll('.tab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});


/* ----------  FOOTER YEAR ---------- */
document.getElementById('year').textContent=new Date().getFullYear();