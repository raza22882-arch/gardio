document.addEventListener("DOMContentLoaded", function () {

  /* =========================================
     NAVIGATION DROPDOWNS
  ========================================= */

  const navButtons = document.querySelectorAll(".nav-button");

  navButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {
      event.stopPropagation();

      const dropdown = button.closest(".nav-dropdown");

      if (!dropdown) return;

      // Close other dropdowns
      document.querySelectorAll(".nav-dropdown").forEach(function (item) {
        if (item !== dropdown) {
          item.classList.remove("open");
        }
      });

      // Toggle clicked dropdown
      dropdown.classList.toggle("open");
    });

  });


  /* =========================================
     CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
  ========================================= */

  document.addEventListener("click", function () {

    document.querySelectorAll(".nav-dropdown").forEach(function (dropdown) {
      dropdown.classList.remove("open");
    });

  });


  /* =========================================
     MOBILE MENU
  ========================================= */

  const mobileMenu = document.querySelector(".mobile-menu");
  const mainNav = document.querySelector(".main-nav");
  const navActions = document.querySelector(".nav-actions");

  if (mobileMenu && mainNav) {

    mobileMenu.addEventListener("click", function (event) {

      event.stopPropagation();

      const isOpen = mainNav.classList.toggle("mobile-open");

      // Animate hamburger
      mobileMenu.classList.toggle("active", isOpen);

      // Accessibility
      mobileMenu.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      mobileMenu.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );

      // Body scroll
      document.body.classList.toggle("menu-open", isOpen);

      // Close dropdowns when opening/closing menu
      if (!isOpen) {
        document.querySelectorAll(".nav-dropdown").forEach(function (dropdown) {
          dropdown.classList.remove("open");
        });
      }

      // Keep existing nav-actions behavior if needed
      if (navActions) {
        navActions.classList.toggle("mobile-open", isOpen);
      }

    });


    /* =========================================
       CLOSE MOBILE MENU AFTER CLICKING A LINK
    ========================================= */

    mainNav.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {

        mainNav.classList.remove("mobile-open");
        mobileMenu.classList.remove("active");

        mobileMenu.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-label", "Open menu");

        document.body.classList.remove("menu-open");

        if (navActions) {
          navActions.classList.remove("mobile-open");
        }

      });

    });

  }


  /* =========================================
     SMOOTH SCROLL FOR INTERNAL LINKS
  ========================================= */

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

      const id = link.getAttribute("href");

      if (!id || id === "#") {
        return;
      }

      const element = document.querySelector(id);

      if (element) {

        event.preventDefault();

        element.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });


  /* =========================================
     IMAGE ERROR HANDLING
  ========================================= */

  document.querySelectorAll("img").forEach(function (img) {

    img.addEventListener("error", function () {
      img.classList.add("asset-missing");
    });

  });


  /* =========================================
     RESET MOBILE MENU WHEN RESIZING
  ========================================= */

  window.addEventListener("resize", function () {

    if (window.innerWidth > 900) {

      mainNav?.classList.remove("mobile-open");
      mobileMenu?.classList.remove("active");

      mobileMenu?.setAttribute("aria-expanded", "false");
      mobileMenu?.setAttribute("aria-label", "Open menu");

      navActions?.classList.remove("mobile-open");

      document.body.classList.remove("menu-open");

      document.querySelectorAll(".nav-dropdown").forEach(function (dropdown) {
        dropdown.classList.remove("open");
      });

    }

  });

});