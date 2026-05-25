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

// Fade-in on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.philosophy-card, .content-card, .product-card, .pillar-list li').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});
