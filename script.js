// =============================================
// NAVBAR - Scroll Effect & Mobile Menu
// =============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// =============================================
// TYPEWRITER EFFECT
// =============================================
const roles = [
  'Frontend Developer',
  'UI/UX Tasarımcı',
  'Full Stack Developer',
  'Problem Çözücü',
  'Açık Kaynak Destekçisi'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  const current = roles[roleIndex];
  const speed = isDeleting ? 60 : 110;

  if (!isDeleting) {
    typeEl.innerHTML = current.slice(0, charIndex + 1) + '<span class="cursor">|</span>';
    charIndex++;
    if (charIndex === current.length) {
      setTimeout(() => { isDeleting = true; type(); }, 2200);
      return;
    }
  } else {
    typeEl.innerHTML = current.slice(0, charIndex - 1) + '<span class="cursor">|</span>';
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(type, speed);
}

type();

// =============================================
// SCROLL ANIMATIONS (Intersection Observer)
// =============================================
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add fade-in to sections
document.querySelectorAll('section > .container, .hero-content').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// =============================================
// SKILL BAR ANIMATION
// =============================================
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        setTimeout(() => {
          fill.style.width = width + '%';
        }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) skillObserver.observe(skillsSection);

// =============================================
// PROJECT FILTER TABS
// =============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Active tab
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        requestAnimationFrame(() => {
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// =============================================
// CONTACT FORM
// =============================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-primary');
    btn.textContent = 'Gönderiliyor...';
    btn.disabled = true;

    // Simüle edilmiş gönderim
    setTimeout(() => {
      formSuccess.classList.add('show');
      btn.textContent = 'Gönderildi ✓';
      contactForm.reset();

      setTimeout(() => {
        formSuccess.classList.remove('show');
        btn.innerHTML = '<span>Mesaj Gönder</span><span class="btn-arrow">→</span>';
        btn.disabled = false;
      }, 4000);
    }, 1500);
  });
}

// =============================================
// BACK TO TOP BUTTON
// =============================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 600) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =============================================
// SMOOTH ACTIVE NAV LINKS ON SCROLL
// =============================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-links a').forEach(a => a.style.color = '');
        link.style.color = '#6366f1';
      }
    }
  });
});

// =============================================
// CARD ANIMATION KEYFRAME (dinamik ekleme)
// =============================================
const style = document.createElement('style');
style.textContent = `
@keyframes fadeInCard {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(style);
