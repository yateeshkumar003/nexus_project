/* ============  NAV / HAMBURGER  ============ */
const navToggle = document.querySelector('.nav-toggle');
const navMenu   = document.getElementById('navMenu');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('open');
  });
}

/* show / hide sub-menu on mobile */
document.querySelectorAll('.sub-toggle').forEach(btn=>{
  btn.addEventListener('click',e=>{
    const parent=btn.closest('.has-sub');
    const open=parent.classList.toggle('open');
    btn.setAttribute('aria-expanded',open);
  });
});

/* ============  PRICE MAP (final fees)  ============ */
const PRICE_TABLE = {
  'Introduction to Research & Publication': { inr: 2100,  usd: 26  },
  'Original Research (OR)'                : { inr: 22500, usd: 270 },
  'Letter to Editor (LTE)'                : { inr: 11200, usd: 135 },
  'Mixed Combo 2 (Intro + OR + LTE)'      : { inr: 33000, usd: 388 },
  'Mixed Combo 3 (Intro + 2OR + LTE)'     : { inr: 51000, usd: 596 },
  'Combo 2OR'                             : { inr: 40500, usd: 486 },
  'Combo 3OR'                             : { inr: 57375, usd: 690 },
  'Combo 5OR'                             : { inr: 90000, usd: 1080 },
  'NR'                                    : { inr: 20000, usd: 240 },
  'Combo 2NR'                             : { inr: 36000, usd: 450 }
};

/* ============  INITIALISE PAGE  ============ */
const qs        = new URLSearchParams(window.location.search);
const courseKey = qs.get('course') || '';
const currency  = (qs.get('curr') || 'inr').toLowerCase();  // 'inr' | 'usd'

const titleEl   = document.getElementById('courseTitle');
const amtInput  = document.getElementById('amount');
const payBtn    = document.getElementById('payBtn');

(function init(){
  if(!PRICE_TABLE[courseKey]){
    if(titleEl) titleEl.textContent = 'Unknown Course';
    if(amtInput) amtInput.value = '';
    if(payBtn) payBtn.textContent = 'Pay';
    return;
  }

  if(titleEl) titleEl.textContent = courseKey;
  const price = PRICE_TABLE[courseKey][currency];

  if(currency === 'usd'){
    if(amtInput) amtInput.value = `$${price}.00`;
    if(payBtn) payBtn.textContent = `Pay $${price}.00`;
  }else{
    if(amtInput) amtInput.value = `₹${price.toLocaleString('en-IN')}.00`;
    if(payBtn) payBtn.textContent = `Pay ₹${price.toLocaleString('en-IN')}.00`;
  }
})();

/* ============  SIMPLE FORM HANDLER  ============ */
function handleSubmit(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const amount = amtInput ? amtInput.value : '';
  alert(`Thank you, ${name}! Redirecting to payment gateway for ${amount}.`);
  // TODO: integrate actual payment gateway here
  return false;
}
