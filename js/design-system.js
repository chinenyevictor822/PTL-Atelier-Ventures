/*
================================================================================
  L U M I N A   F O R G E   -   D E S I G N   F O U N D A T I O N
  Client: PTL Atelier Ventures
  Interaction Script: Custom Blueprint Mechanics, Momentum Feeds, & Theme Controllers
================================================================================
*/

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

  themeToggle.addEventListener('click', () => {
    const activeTheme = htmlElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('ptl-theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
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

  menuToggle.addEventListener('click', () => {
    navOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden'; // Lock scrolling
  });

  const closeMenu = () => {
    navOverlay.classList.remove('is-active');
    document.body.style.overflow = ''; // Unlock scrolling
  };

  menuClose.addEventListener('click', closeMenu);

  // Close overlay on clicking any navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(closeMenu, 300);
    });

    // Blueprint hover pre-rendering mechanism
    link.addEventListener('mouseenter', (e) => {
      const imgSrc = e.currentTarget.getAttribute('data-img');
      if (imgSrc) {
        navPreviewImage.src = imgSrc;
        navPreviewImage.classList.add('is-visible');
      }
    });

    link.addEventListener('mouseleave', () => {
      navPreviewImage.classList.remove('is-visible');
    });
  });


  // ==========================================
  // 3. LEDGER FORM - COMPONENT VALUE TRACKING
  // ==========================================
  const formSelect = document.getElementById('projectCommission');
  if (formSelect) {
    formSelect.addEventListener('change', (e) => {
      // Keep state of select active so label doesn't overlap text
      if (e.target.value !== "") {
        e.target.setAttribute('value', e.target.value);
      } else {
        e.target.removeAttribute('value');
      }
    });
  }


  // ==========================================
  // 4. SCROLL REVEAL (ELEGANT ATELIER DECELLERATION)
  // ==========================================
  const scrollElements = document.querySelectorAll('.reveal-on-scroll');

  // Wrap demo sections in scroll reveals dynamically to test animation
  const sectionsToReveal = document.querySelectorAll('.section-container');
  sectionsToReveal.forEach((sec, idx) => {
    if (idx > 0) { // Keep first section instantly visible
      sec.classList.add('reveal-on-scroll');
    }
  });

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

  // Select all reveal nodes
  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
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
