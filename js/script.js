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
       VIDEO MODAL
    ======================================== */

    const watchVideo = document.getElementById("watchVideo");
    const videoModal = document.getElementById("videoModal");
    const closeVideo = document.getElementById("closeVideo");
    const videoModalOverlay = document.getElementById("videoModalOverlay");
    const heroVideo = document.getElementById("heroVideo");


    function openVideo() {

        if (!videoModal) return;

        videoModal.classList.add("active");

        document.body.classList.add("modal-open");

    }


    function closeVideoModal() {

        if (!videoModal) return;

        videoModal.classList.remove("active");

        document.body.classList.remove("modal-open");


        if (heroVideo) {
            heroVideo.pause();
            heroVideo.currentTime = 0;
        }

    }


    if (watchVideo) {
        watchVideo.addEventListener("click", openVideo);
    }


    if (closeVideo) {
        closeVideo.addEventListener("click", closeVideoModal);
    }


    if (videoModalOverlay) {
        videoModalOverlay.addEventListener(
            "click",
            closeVideoModal
        );
    }


    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            videoModal &&
            videoModal.classList.contains("active")
        ) {
            closeVideoModal();
        }

    });


    /* ========================================
       SCROLL REVEAL
    ======================================== */

    const revealElements = document.querySelectorAll(
        `
        .section-heading,
        .about-gallery,
        .about-story,
        .about-statistics,
        .about-advantages,
        .services-heading,
        .service-card,
        .contact-cta-content
        `
    );


    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("reveal-visible");
                    } else {
                        entry.target.classList.remove("reveal-visible");
                    }

                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        revealElements.forEach(element => {
            element.classList.add("reveal-element");
            revealObserver.observe(element);
        });

    } else {
        revealElements.forEach(element => {
            element.classList.add("reveal-visible");
        });
    }


    /* ========================================
       SERVICE CARD STAGGER
    ======================================== */

    const serviceCards = document.querySelectorAll(
        ".service-card"
    );

    serviceCards.forEach((card, index) => {

        card.style.setProperty(
            "--animation-delay",
            `${index * 0.12}s`
        );

    });


    /* ========================================
       STAT CARD STAGGER
    ======================================== */

    const statCards = document.querySelectorAll(
        ".stat-card"
    );

    statCards.forEach((card, index) => {

        card.style.setProperty(
            "--animation-delay",
            `${index * 0.1}s`
        );

    });


    /* ========================================
       ADVANTAGE CARD STAGGER
    ======================================== */

    const advantageCards = document.querySelectorAll(
        ".advantage-card"
    );

    advantageCards.forEach((card, index) => {

        card.style.setProperty(
            "--animation-delay",
            `${index * 0.12}s`
        );

    });


    /* ========================================
       HERO PARALLAX
    ======================================== */

    const heroBackground = document.querySelector(
        ".hero-background"
    );


    if (heroBackground) {

        let ticking = false;


        window.addEventListener("scroll", () => {

            if (!ticking) {

                window.requestAnimationFrame(() => {

                    const scrollPosition = window.scrollY;

                    if (scrollPosition < window.innerHeight) {

                        heroBackground.style.transform =
                            `translateY(${scrollPosition * 0.12}px)`;

                    }

                    ticking = false;

                });

                ticking = true;

            }

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
       ACTIVE NAV LINK
    ======================================== */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navigationLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    if (
        sections.length > 0 &&
        navigationLinks.length > 0
    ) {

        window.addEventListener("scroll", () => {

            let currentSection = "";

            sections.forEach(section => {

                const sectionTop =
                    section.offsetTop - 150;

                const sectionHeight =
                    section.offsetHeight;

                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY <
                    sectionTop + sectionHeight
                ) {

                    currentSection =
                        section.getAttribute("id");

                }

            });


            navigationLinks.forEach(link => {

                link.classList.remove("active");

                const href =
                    link.getAttribute("href");

                if (
                    href === `#${currentSection}`
                ) {
                    link.classList.add("active");
                }

            });

        });

    }


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