/* =====================================================
   GENFES - SHARED JAVASCRIPT
   Navbar, mobile menu, anchor scroll, small interactions
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    /* ========================================
       NAVBAR
    ======================================== */

    const navbar = document.getElementById("navbar");

    function handleNavbar() {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleNavbar);
    handleNavbar();


    /* ========================================
       MOBILE MENU
    ======================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            const isOpen = navMenu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.className = isOpen
                    ? "bi bi-x-lg"
                    : "bi bi-list";
            }

        });


        /* Tutup menu ketika link diklik */

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.className = "bi bi-list";
                }

            });

        });

    }

    /* ========================================
       SMOOTH ANCHOR SCROLL
    ======================================== */

    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );


    anchorLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);

            if (!target) return;


            event.preventDefault();


            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* ========================================
       BUTTON / CARD MICRO INTERACTION
    ======================================== */

    const interactiveElements = document.querySelectorAll(
        ".btn, .contact-cta-button, .event-read-more"
    );


    interactiveElements.forEach(element => {

        element.addEventListener("mouseenter", () => {
            element.classList.add("interaction-hover");
        });


        element.addEventListener("mouseleave", () => {
            element.classList.remove("interaction-hover");
        });

    });

    /* ========================================
       REDUCED MOTION
    ======================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (prefersReducedMotion.matches) {

        document.documentElement.classList.add(
            "reduce-motion"
        );

    }


    console.log(
        "Genfes website loaded successfully."
    );

});
