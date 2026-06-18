document.addEventListener('DOMContentLoaded', () => {
  // Language toggle functionality
  let currentLanguage = 'en';
  const langToggle = document.getElementById('langToggle');
  const navLinks = {
    'en': ['Top Reviews', 'About', 'Built With', 'Contact'],
    'fr': ['Avis vedettes', 'À propos', 'Construit avec', 'Contact']
  };

  function updateLanguage(lang) {
    currentLanguage = lang;
    const elements = document.querySelectorAll('[data-en][data-fr]');
    elements.forEach(element => {
      const text = element.getAttribute(`data-${lang}`);
      if (text) {
        element.textContent = text;
      }
    });

    // Update nav links
    const navAnchors = document.querySelectorAll('nav a[href^="#"]');
    navAnchors.forEach((link, index) => {
      link.textContent = navLinks[lang][index];
    });

    // Update button text
    if (langToggle) {
      langToggle.textContent = lang === 'en' ? '🇬🇧 EN | 🇫🇷 FR' : '🇬🇧 EN | 🇫🇷 FR';
    }
  }

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const newLang = currentLanguage === 'en' ? 'fr' : 'en';
      updateLanguage(newLang);
    });
  } else {
    console.warn('Language toggle button not found');
  }

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('nav a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Card hover effects
  const features = document.querySelectorAll('.card');
  features.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-6px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  // Card reveal animation
  const revealItems = document.querySelectorAll('.card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.15,
  });

  revealItems.forEach(item => observer.observe(item));
});
