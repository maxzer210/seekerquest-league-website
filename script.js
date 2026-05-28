// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile burger
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Animated counters
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString();
    if (current >= target) clearInterval(timer);
  }, 16);
}

// Intersection observer for counters & feature cards
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    if (el.dataset.target) animateCounter(el);
    if (el.classList.contains('feature-card')) {
      const delay = el.dataset.delay || 0;
      setTimeout(() => el.classList.add('visible'), +delay);
    }
    io.unobserve(el);
  });
}, { threshold: 0.25 });

document.querySelectorAll('[data-target]').forEach(el => io.observe(el));
document.querySelectorAll('.feature-card').forEach(el => io.observe(el));

// Join form
const form = document.getElementById('joinForm');
const success = document.getElementById('formSuccess');
form.addEventListener('submit', e => {
  e.preventDefault();
  form.style.display = 'none';
  success.style.display = 'block';
});
