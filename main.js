// Nav scroll class
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Nuvos AI app carousel
(function () {
  let current = 0;
  let autoTimer;
  const total = 8;

  function init() {
    const dots = document.getElementById('carouselDots');
    if (!dots) return;
    for (let i = 0; i < total; i++) {
      const d = document.createElement('span');
      d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dots.appendChild(d);
    }
    startAuto();
  }

  function goTo(index) {
    current = (index + total) % total;
    document.getElementById('carouselTrack').style.transform = `translateX(-${current * 100}%)`;
    document.querySelectorAll('.carousel-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
  }

  window.carouselMove = function (dir) {
    clearInterval(autoTimer);
    goTo(current + dir);
    startAuto();
  };

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 7000);
  }

  document.addEventListener('DOMContentLoaded', init);
})();

// Nuvos AI waitlist form
function handleNuvos(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  const confirm = document.getElementById('nuvos-confirm');
  if (input.value) {
    e.target.style.display = 'none';
    confirm.style.display = 'block';
  }
}

// Beta registration form
function updateBetaCounter(remaining) {
  const numEl = document.querySelector('.beta-spots-num');
  const noteEl = document.querySelector('.beta-note');
  if (numEl) numEl.textContent = remaining;
  if (noteEl) noteEl.textContent = `${remaining} lugar${remaining !== 1 ? 'es' : ''} restante${remaining !== 1 ? 's' : ''}. Una vez lleno el cupo, el registro se cerrará automáticamente.`;
  if (remaining === 0) closeBetaForm();
}

function closeBetaForm() {
  const form = document.querySelector('.beta-form');
  const card = document.querySelector('.beta-form-card');
  if (form) form.style.display = 'none';
  if (card && !card.querySelector('.beta-confirm')) {
    const closed = document.createElement('div');
    closed.className = 'beta-confirm';
    closed.style.display = 'block';
    closed.innerHTML = '<div class="confirm-check">✗</div><h3>Cupo lleno</h3><p>Los 20 lugares de la versión Beta ya fueron ocupados. Deja tu email en la lista de espera de Nuvos AI para ser el primero en saber del lanzamiento oficial.</p>';
    card.appendChild(closed);
  }
}

async function fetchBetaCount() {
  try {
    const res = await fetch('/.netlify/functions/beta-count');
    const data = await res.json();
    updateBetaCounter(data.remaining);
  } catch {
    // Si falla la función, no cambia el número del HTML
  }
}

function handleBeta(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data).toString()
  }).then(() => {
    form.style.display = 'none';
    document.getElementById('beta-confirm').style.display = 'block';
    fetchBetaCount();
  }).catch(() => {
    alert('Error al enviar. Por favor intenta de nuevo.');
  });
}

document.addEventListener('DOMContentLoaded', fetchBetaCount);

// Newsletter form
function handleSubscribe(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  const confirm = document.getElementById('nl-confirm');
  if (input.value) {
    e.target.style.display = 'none';
    confirm.style.display = 'block';
  }
}

// Scroll animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('anim-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.07 });

// Fade up — general cards and blocks
document.querySelectorAll(
  '.philosophy-card, .content-card, .product-card, .nuvos-feat, .ebook-card, .nuvo-featured, .nuvos-waitlist, .topics-wrap'
).forEach((el, i) => {
  el.classList.add('anim-fade-up');
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  observer.observe(el);
});

// Fade left — left-side text blocks
document.querySelectorAll(
  '.about-text, .teaser-left, .hero-text'
).forEach(el => {
  el.classList.add('anim-fade-left');
  observer.observe(el);
});

// Fade right — right-side elements
document.querySelectorAll(
  '.about-pillars, .teaser-right, .hero-image'
).forEach(el => {
  el.classList.add('anim-fade-right');
  observer.observe(el);
});

// Scale in — section labels and titles
document.querySelectorAll(
  '.section-label, .section-title, .nuvos-hero-title, .teaser-title'
).forEach(el => {
  el.classList.add('anim-scale');
  observer.observe(el);
});

// Stagger — pillar list items
document.querySelectorAll('.pillar-list li').forEach((el, i) => {
  el.classList.add('anim-fade-up');
  el.style.transitionDelay = `${i * 90}ms`;
  observer.observe(el);
});

// Stagger — tags
document.querySelectorAll('.tag').forEach((el, i) => {
  el.classList.add('anim-fade-up');
  el.style.transitionDelay = `${i * 40}ms`;
  observer.observe(el);
});
