/*
================================================================================
  L U M I N A   F O R G E   -  D E S I G N   F O U N D A T I O N
  Client: PTL Atelier Ventures
  Interaction Script: Custom Blueprint Mechanics, Momentum Feeds, & Theme Controllers
================================================================================
*/

// Load the responsive foundation before interaction initialization.
// Keeping this in a dedicated stylesheet preserves the existing design system
// while allowing the current HTML's desktop-oriented inline grid spans to be
// safely overridden on mobile.
(() => {
  const href = 'css/responsive-foundation.css';
  if (!document.querySelector(`link[href="${href}"]`)) {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = href;
    document.head.appendChild(stylesheet);
  }
})();

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. ATELIER BRAND THEME CONTROLLER
  // ==========================================
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlElement = document.documentElement;

  // Restore saved theme or default to light
  const currentTheme = localStorage.getItem('ptl-theme') || 'light';
  htmlElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = htmlElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';

      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('ptl-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    // ◑ represent half light, half dark balance
    if (theme === 'dark') {
      themeIcon.textContent = '●'; // solid for deep architectural blue
      themeIcon.style.color = '#C5A880';
    } else {
      themeIcon.textContent = '◑'; // contrast outline for light mode
      themeIcon.style.color = '';
    }
  }


  // ==========================================
  // 2. QUIET HEADER OVERLAY & NARRATIVE LINKS
  // ==========================================
  const menuToggle = document.getElementById('menuToggle');
  const menuClose = document.getElementById('menuClose');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const navPreviewImage = document.getElementById('navPreviewImage');

  if (menuToggle && navOverlay) {
    menuToggle.addEventListener('click', () => {
      navOverlay.classList.add('is-active');
      document.body.style.overflow = 'hidden'; // Lock scrolling
    });
  }

  const closeMenu = () => {
    if (navOverlay) {
      navOverlay.classList.remove('is-active');
    }
    document.body.style.overflow = ''; // Unlock scrolling
  };

  if (menuClose) {
    menuClose.addEventListener('click', closeMenu);
  }

  // Close overlay on clicking any navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(closeMenu, 300);
    });

    // Blueprint hover pre-rendering mechanism
    link.addEventListener('mouseenter', (e) => {
      const imgSrc = e.currentTarget.getAttribute('data-img');
      if (imgSrc && navPreviewImage) {
        navPreviewImage.src = imgSrc;
        navPreviewImage.classList.add('is-visible');
      }
    });

    link.addEventListener('mouseleave', () => {
      if (navPreviewImage) {
        navPreviewImage.classList.remove('is-visible');
      }
    });
  });


  // ==========================================
  // 3. LEDGER FORM - COMPONENT VALUE TRACKING
  // ==========================================
  const formSelects = document.querySelectorAll('.ledger-select');
  formSelects.forEach(select => {
    select.addEventListener('change', (e) => {
      // Keep state of select active so label doesn't overlap text
      if (e.target.value !== "") {
        e.target.setAttribute('value', e.target.value);
      } else {
        e.target.removeAttribute('value');
      }
    });
  });


  // ==========================================
  // 4. SCROLL REVEAL (ELEGANT ATELIER DECELLERATION)
  // ==========================================
  const scrollElements = document.querySelectorAll('.reveal-on-scroll');

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters screen
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, observerOptions);

  scrollElements.forEach(el => {
    scrollObserver.observe(el);
  });


  // ==========================================
  // 5. GRAPHITE DRAFTING CURSOR (DESKTOP PHYSICS)
  // ==========================================
  const draftingDot = document.getElementById('draftingDot');
  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;

  if (draftingDot) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Custom animation loop for physics smoothing (inertia)
    const updateCursorPhysics = () => {
      const ease = 0.15; // smooth friction ratio
      dotX += (mouseX - dotX) * ease;
      dotY += (mouseY - dotY) * ease;

      draftingDot.style.left = `${dotX}px`;
      draftingDot.style.top = `${dotY}px`;

      requestAnimationFrame(updateCursorPhysics);
    };

    requestAnimationFrame(updateCursorPhysics);
  }

});
