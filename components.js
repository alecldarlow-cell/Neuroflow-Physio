// ============================================================
//  SHARED COMPONENTS — injected into every page
// ============================================================

function currentPage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function renderNav() {
  const links = [
    { href:'index.html',    label:'Home'     },
    { href:'about.html',    label:'About'    },
    { href:'classes.html',  label:'Classes'  },
    { href:'services.html', label:'Services' },
    { href:'contact.html',  label:'Contact', cta:true },
  ];
  const pg = currentPage();
  const items = links.map(l => {
    const active = pg === l.href ? ' active' : '';
    const cls = l.cta ? ' class="nav-cta"' : (active ? ` class="active"` : '');
    return `<li><a href="${l.href}"${cls}>${l.label}</a></li>`;
  }).join('');
  document.getElementById('main-nav').innerHTML = `
    <a href="index.html" class="nav-logo">
      <img src="logofull.png" alt="Norwich Neuro Physio & Pilates" class="nav-logo-img">
    </a>
    <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <ul class="nav-links">${items}</ul>
  `;
  
  // Mobile menu toggle
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isOpen);
  });
  
  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function renderFooter() {
  document.getElementById('main-footer').innerHTML = `
    <div class="footer-top">
      <div>
        <div class="footer-brand">
          <img src="logofull.png" alt="Norwich Neuro Physio & Pilates" class="footer-logo-img">
        </div>
        <div class="footer-tagline">Specialist Neurorehabilitation &amp; Movement — Norwich, Norfolk</div>
      </div>
      <nav class="footer-nav">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="classes.html">Classes</a>
        <a href="services.html">Services</a>
        <a href="contact.html">Contact</a>
      </nav>
    </div>
    <div class="footer-bottom">
      <p>© 2026 Norwich Neuro Physio &amp; Pilates. All rights reserved.</p>
      <div class="footer-reg">
        <span class="reg-badge">HCPC Registered</span>
        <span class="reg-badge">MCSP Member</span>
        <span class="reg-badge">CSP Member</span>
      </div>
    </div>
  `;
}

function initScrollNav() {
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

function initFadeUp() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 90);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderFooter();
  initScrollNav();
  initFadeUp();
});
