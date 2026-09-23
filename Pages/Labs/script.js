(() => {
  'use strict';

  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const desktopDropdowns = [...document.querySelectorAll('.dropdown')];
  const mobileDropdowns = [...document.querySelectorAll('.mobile-dropdown')];

  function closeDesktopDropdowns(except = null) {
    desktopDropdowns.forEach(dropdown => {
      if (dropdown === except) return;
      dropdown.classList.remove('is-open');
      dropdown.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
    });
  }

  desktopDropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('.dropdown-toggle');
    if (!button) return;

    button.addEventListener('click', event => {
      event.preventDefault();
      const isOpen = dropdown.classList.contains('is-open');
      closeDesktopDropdowns(dropdown);
      dropdown.classList.toggle('is-open', !isOpen);
      button.setAttribute('aria-expanded', String(!isOpen));
    });

    button.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        button.click();
        dropdown.querySelector('.menu a')?.focus();
      } else if (event.key === 'Escape') {
        closeDesktopDropdowns();
        button.focus();
      }
    });

    dropdown.querySelectorAll('.menu a').forEach(link => {
      link.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
          closeDesktopDropdowns();
          button.focus();
        }
      });
    });
  });

  document.addEventListener('click', event => {
    if (!event.target.closest('.dropdown')) closeDesktopDropdowns();
  });

  function setMobileMenu(open) {
    mobileToggle?.classList.toggle('is-open', open);
    mobileMenu?.classList.toggle('is-open', open);
    mobileToggle?.setAttribute('aria-expanded', String(open));
    mobileToggle?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileMenu?.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
  }

  mobileToggle?.addEventListener('click', () => {
    setMobileMenu(!mobileMenu?.classList.contains('is-open'));
  });

  mobileDropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('.mobile-dropdown-toggle');
    button?.addEventListener('click', () => {
      const isOpen = dropdown.classList.contains('is-open');
      mobileDropdowns.forEach(item => {
        item.classList.remove('is-open');
        item.querySelector('.mobile-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
      });
      dropdown.classList.toggle('is-open', !isOpen);
      button.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMobileMenu(false));
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    closeDesktopDropdowns();
    if (mobileMenu?.classList.contains('is-open')) {
      setMobileMenu(false);
      mobileToggle?.focus();
    }
  });

  const desktopMedia = window.matchMedia('(min-width: 901px)');
  desktopMedia.addEventListener?.('change', event => {
    if (event.matches) {
      setMobileMenu(false);
      mobileDropdowns.forEach(item => {
        item.classList.remove('is-open');
        item.querySelector('.mobile-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Keep placeholder links from jumping the page. Real URLs can be dropped in later.
  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', event => event.preventDefault());
  });
})();
