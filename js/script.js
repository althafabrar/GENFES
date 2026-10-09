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
       SERVICE CARD - LEFT TO RIGHT
    ======================================== */

    const serviceSection = document.querySelector(".services-section");
    const serviceCards = document.querySelectorAll(
        ".services-section .service-card"
    );

    if (serviceSection && serviceCards.length) {
        serviceCards.forEach((card, index) => {
            card.style.setProperty(
                "--service-delay",
                `${index * 180}ms`
            );
        });

        const serviceObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                serviceCards.forEach((card) => {
                    card.classList.add("service-card-visible");
                });

                serviceObserver.disconnect();
            });
        }, {
            threshold: 0.15
        });

        serviceObserver.observe(serviceSection);
    }


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


/* ========================================
   STATISTICS NUMBER SCRAMBLE
======================================== */

const statNumbers = document.querySelectorAll(".stat-card strong");

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;

        // Supaya animasi tidak berulang setiap scroll
        if (element.dataset.animated === "true") return;

        element.dataset.animated = "true";

        const originalText = element.textContent.trim();
        const digits = originalText.match(/\d/g);
        const duration = 3000;
        const startTime = performance.now();

        if (!digits) return;

        function scrambleNumber(currentTime) {
            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            // Semakin mendekati akhir, semakin banyak angka asli muncul
            const revealedDigits = Math.floor(
                progress * digits.length
            );

            let digitIndex = 0;

            const scrambledText = originalText.replace(/\d/g, () => {
                const originalDigit = digits[digitIndex];
                const currentIndex = digitIndex++;

                if (progress === 1 ||
                    currentIndex < revealedDigits) {
                    return originalDigit;
                }

                return Math.floor(Math.random() * 10);
            });

            element.textContent = scrambledText;

            if (progress < 1) {
                requestAnimationFrame(scrambleNumber);
            } else {
                // Pastikan angka, koma, dan tanda + kembali persis
                element.textContent = originalText;
            }
        }

        requestAnimationFrame(scrambleNumber);
    });
}, {
    threshold: 0.5
});

statNumbers.forEach((number) => {
    statObserver.observe(number);
});


/* ========================================
   ABOUT STORY - TYPEWRITER
======================================== */

const aboutStory = document.querySelector(".about-story");

if (aboutStory) {
    const storyLabel = aboutStory.querySelector(".story-label");
    const storyTitle = aboutStory.querySelector("h2");
    const storyParagraphs = aboutStory.querySelectorAll("p");

    const elementsToType = [
        storyLabel,
        storyTitle,
        ...storyParagraphs
    ].filter(Boolean);

    const originalTexts = elementsToType.map(element =>
        element.textContent.replace(/\s+/g, " ").trim()
    );

    let storyStarted = false;

    // Simpan teks asli, lalu kosongkan untuk efek mengetik
    elementsToType.forEach(element => {
        element.textContent = "";
        element.classList.add("typing-active");
    });

    const storyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting || storyStarted) return;

            storyStarted = true;

            let elementIndex = 0;
            let charIndex = 0;

            function typeNextCharacter() {
                if (elementIndex >= elementsToType.length) {
                    elementsToType.forEach(element => {
                        element.classList.remove("typing-active");
                    });
                    storyObserver.disconnect();
                    return;
                }

                const element = elementsToType[elementIndex];
                const text = originalTexts[elementIndex];

                element.textContent += text.charAt(charIndex);
                charIndex++;

                if (charIndex >= text.length) {
                    elementIndex++;
                    charIndex = 0;

                    // Jeda singkat sebelum mengetik elemen berikutnya
                    setTimeout(typeNextCharacter, 150);
                } else {
                    setTimeout(typeNextCharacter, 5);
                }
            }

            typeNextCharacter();
        });
    }, { threshold: 0.2 });

    storyObserver.observe(aboutStory);
}

