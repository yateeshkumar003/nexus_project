// ---------- Utilities ----------
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const lerp = (a, b, t) => a + (b - a) * t;

// ---------- Header / Nav ----------
const navToggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('navMenu');
if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    // Prevent body scroll when nav is open
    if(open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  // Close nav on outside click (for mobile)
  document.addEventListener('click', function(e){
    if(navList.classList.contains('open')) {
      const navMenuRect = navList.getBoundingClientRect();
      if(!navList.contains(e.target) && !navToggle.contains(e.target)) {
        navList.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    }
  });
}

// Mobile sub-menu
document.querySelectorAll('.has-sub .sub-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const li = btn.closest('.has-sub');
    const open = li.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
});

// ---------- Footer year ----------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Counters ----------
const statObserver = ('IntersectionObserver' in window)
  ? new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    )
  : null;

document.querySelectorAll('.stat-number').forEach((el) => {
  if (statObserver) statObserver.observe(el);
  else animateCounter(el); // fallback if IO not supported
});

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10) || 0;
  const duration = 1400;
  const start = performance.now();

  function step(ts) {
    const t = clamp((ts - start) / duration, 0, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.floor(lerp(0, target, eased)).toLocaleString();
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ---------- Dynamic SVG Pie Charts ----------
const pies = document.querySelectorAll('.pie');
const PIE_TOTAL =
  Array.from(pies).reduce((sum, p) => sum + (parseInt(p.dataset.value, 10) || 0), 0) || 1;
function createPie(container, value, label, color) {
  const total = PIE_TOTAL;
  const size = 220;
  const radius = size / 2 - 12;
  const circumference = 2 * Math.PI * radius;
  const fraction = value / total;
  const dash = fraction * circumference;
  const svgNS = 'http://www.w3.org/2000/svg';

  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);

  // Background ring
  const bg = document.createElementNS(svgNS, 'circle');
  bg.setAttribute('cx', size / 2);
  bg.setAttribute('cy', size / 2);
  bg.setAttribute('r', radius);
  bg.setAttribute('fill', 'none');
  bg.setAttribute('stroke', 'rgba(255,255,255,0.12)');
  bg.setAttribute('stroke-width', '14');

  // Foreground arc
  const fg = document.createElementNS(svgNS, 'circle');
  fg.setAttribute('cx', size / 2);
  fg.setAttribute('cy', size / 2);
  fg.setAttribute('r', radius);
  fg.setAttribute('fill', 'none');
  fg.setAttribute('stroke', color);
  fg.setAttribute('stroke-width', '14');
  fg.setAttribute('stroke-linecap', 'round');
  fg.setAttribute('transform', `rotate(-90 ${size / 2} ${size / 2})`);
  fg.setAttribute('stroke-dasharray', `${dash} ${circumference - dash}`);
  fg.style.filter = 'drop-shadow(0 6px 12px rgba(0,0,0,.35))';

  // Center value text
  const valueText = document.createElementNS(svgNS, 'text');
  valueText.setAttribute('x', size / 2);
  valueText.setAttribute('y', size / 2 - 4);
  valueText.setAttribute('text-anchor', 'middle');
  valueText.setAttribute('fill', '#2f3334ff');
  valueText.setAttribute('font-size', '28');
  valueText.setAttribute('font-weight', '800');
  valueText.textContent = value.toLocaleString();

  // + symbol
  const plusText = document.createElementNS(svgNS, 'text');
  plusText.setAttribute('x', size / 2);
  plusText.setAttribute('y', size / 2 + 22);
  plusText.setAttribute('text-anchor', 'middle');
  plusText.setAttribute('fill', '#9FF6DE');
  plusText.setAttribute('font-size', '14');
  plusText.textContent = '+';

  // Animate drawing of arc (SMIL)
  const animate = document.createElementNS(svgNS, 'animate');
  animate.setAttribute('attributeName', 'stroke-dasharray');
  animate.setAttribute('from', `0 ${circumference}`);
  animate.setAttribute('to', `${dash} ${circumference - dash}`);
  animate.setAttribute('dur', '1.2s');
  animate.setAttribute('fill', 'freeze');
  fg.appendChild(animate);

  svg.append(bg, fg, valueText, plusText);
  container.appendChild(svg);

  const labelTag = document.createElement('div');
  labelTag.className = 'label';
  labelTag.textContent = label;
  container.appendChild(labelTag);
}

pies.forEach((p) => {
  const value = parseInt(p.dataset.value, 10) || 0;
  const label = p.dataset.label || '';
  const color = p.dataset.color || '#1ABC9C';
  createPie(p, value, label, color);
});

// ---------- Testimonials Marquee ----------
const track = document.getElementById('marqueeTrack');
if (track) {
  let speed = 0.5; // px per frame
  let running = true;
  (function duplicateCards() {
    const items = Array.from(track.children);
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  })();
  let offset = 0;
  function animateMarquee() {
    if (running) {
      offset -= speed;
      const first = track.children[0];
      if (first) {
        const cardWidth = first.getBoundingClientRect().width + 16;
        if (Math.abs(offset) >= cardWidth) {
          offset += cardWidth;
          track.appendChild(track.children[0]);
        }
      }
      track.style.transform = `translateX(${offset}px)`;
    }
    requestAnimationFrame(animateMarquee);
  }
  requestAnimationFrame(animateMarquee);

  const pauseBtn = document.getElementById('pauseBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (pauseBtn) {
    pauseBtn.addEventListener('click', (e) => {
      running = !running;
      e.currentTarget.textContent = running ? 'Pause' : 'Play';
      e.currentTarget.setAttribute('aria-pressed', (!running).toString());
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      speed = clamp(speed + 0.2, 0.2, 3);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      speed = clamp(speed - 0.2, 0.2, 3);
    });
  }
}

// ---------- Smooth anchor scrolling ----------
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (navList && navList.classList.contains('open') && navToggle) {
        navList.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    }
  });
});
