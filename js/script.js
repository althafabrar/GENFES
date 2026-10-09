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


    const revealElements = document.querySelectorAll(`
    .section-heading,
    .about-gallery,
    .about-story,
    .about-statistics,
    .about-advantages,
    .stat-card,
    .advantage-card,
    .services-heading,
    .contact-cta-content
`);


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
                `${index * 250}ms`
            );
        });

        const serviceObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    serviceCards.forEach((card) => {
                        card.classList.add("service-card-visible");
                    });
                } else {
                    serviceCards.forEach((card) => {
                        card.classList.remove("service-card-visible");
                    });
                }
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

    let typingTimer = null;
    let typingRun = 0;
    let isTyping = false;

    function resetStory() {
        typingRun++;

        if (typingTimer !== null) {
            clearTimeout(typingTimer);
            typingTimer = null;
        }

        isTyping = false;

        elementsToType.forEach(element => {
            element.textContent = "";
            element.classList.add("typing-active");
        });
    }

    function startTyping() {
        if (isTyping) return;

        isTyping = true;

        const currentRun = ++typingRun;
        let elementIndex = 0;
        let charIndex = 0;

        function typeNextCharacter() {
            if (currentRun !== typingRun) return;

            if (elementIndex >= elementsToType.length) {
                elementsToType.forEach(element => {
                    element.classList.remove("typing-active");
                });

                isTyping = false;
                typingTimer = null;
                return;
            }

            const element = elementsToType[elementIndex];
            const text = originalTexts[elementIndex];

            element.textContent += text.charAt(charIndex);
            charIndex++;

            if (charIndex >= text.length) {
                elementIndex++;
                charIndex = 0;

                typingTimer = setTimeout(typeNextCharacter, 150);
            } else {
                typingTimer = setTimeout(typeNextCharacter, 0);
            }
        }

        typeNextCharacter();
    }

    resetStory();

    const storyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startTyping();
            } else {
                resetStory();
            }
        });
    }, {
        threshold: 0.2
    });

    storyObserver.observe(aboutStory);
}


// =========================
// NEWS ARTICLE DETAIL
// =========================

document.addEventListener("DOMContentLoaded", function () {
    const newsList = document.getElementById("newsList");
    const articleDetail = document.getElementById("articleDetail");
    const readArticle = document.getElementById("readArticle");
    const backToNews = document.getElementById("backToNews");
    const slides = document.querySelectorAll(".article-slide");

    if (
        !newsList ||
        !articleDetail ||
        !readArticle ||
        !backToNews
    ) {
        return;
    }

    let currentSlide = 0;
    let slideInterval = null;

    function showArticle() {
        newsList.hidden = true;
        articleDetail.hidden = false;

        currentSlide = 0;
        updateSlide();

        // Mulai slideshow, foto berganti setiap 4 detik
        clearInterval(slideInterval);

        if (slides.length > 1) {
            slideInterval = setInterval(function () {
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlide();
            }, 4000);
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function updateSlide() {
        slides.forEach(function (slide, index) {
            slide.classList.toggle("active", index === currentSlide);
        });
    }

    function hideArticle() {
        clearInterval(slideInterval);
        slideInterval = null;

        articleDetail.hidden = true;
        newsList.hidden = false;

        window.scrollTo({
            top: newsList.offsetTop - 100,
            behavior: "smooth"
        });
    }

    readArticle.addEventListener("click", function (event) {
        event.preventDefault();
        showArticle();
    });

    backToNews.addEventListener("click", hideArticle);
});


/* ========================================
   ADVANTAGES LETTER SCRAMBLE
======================================== */

const advantageTexts = document.querySelectorAll(
    ".advantage-card h3, .advantage-card h4"
);

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const advantageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const element = entry.target;

        if (!entry.isIntersecting) return;
        if (element.dataset.scrambling === "true") return;

        element.dataset.scrambling = "true";

        const originalText =
            element.dataset.originalText ||
            element.textContent.trim();

        element.dataset.originalText = originalText;

        let frame = 0;
        const duration = 1000;
        const totalFrames = 20;

        function scrambleText() {
            const progress = Math.min(frame / totalFrames, 1);
            const revealedCount = Math.floor(
                progress * originalText.length
            );

            element.textContent = [...originalText]
                .map((char, index) => {
                    if (char === " ") return " ";
                    if (index < revealedCount) return char;

                    return letters[
                        Math.floor(Math.random() * letters.length)
                    ];
                })
                .join("");

            frame++;

            if (frame <= totalFrames) {
                setTimeout(scrambleText, duration / totalFrames);
            } else {
                element.textContent = originalText;
                element.dataset.scrambling = "false";
            }
        }

        scrambleText();
    });
}, {
    threshold: 0.5
});

advantageTexts.forEach((element) => {
    advantageObserver.observe(element);
});

/* ========================================
   ADVANTAGES - LETTER SCRAMBLE ON SCROLL
======================================== */

const advantageCards = document.querySelectorAll(".advantage-card");
const scrambleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const advantageScrambleObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const card = entry.target;

            // Saat kartu keluar dari layar, izinkan animasi diputar lagi
            if (!entry.isIntersecting) {
                card.dataset.scrambling = "false";
                return;
            }

            // Jangan mulai ulang jika animasi masih berjalan
            if (card.dataset.scrambling === "true") return;

            card.dataset.scrambling = "true";

            const textElements = card.querySelectorAll("h3, p");

            textElements.forEach((element, elementIndex) => {
                // Simpan teks asli agar tidak mengacak teks yang sudah berubah
                if (!element.dataset.originalText) {
                    element.dataset.originalText = element.textContent
                        .replace(/\s+/g, " ")
                        .trim();
                }

                const originalText = element.dataset.originalText;
                const characters = [...originalText];
                let frame = 0;
                const totalFrames = 20;

                function scramble() {
                    const progress = Math.min(frame / totalFrames, 1);
                    const revealed = Math.floor(
                        progress * characters.length
                    );

                    element.textContent = characters
                        .map((character, index) => {
                            if (character === " ") return " ";
                            if (index < revealed) return character;

                            return scrambleCharacters[
                                Math.floor(
                                    Math.random() * scrambleCharacters.length
                                )
                            ];
                        })
                        .join("");

                    frame++;

                    if (frame <= totalFrames) {
                        setTimeout(scramble, 40);
                    } else {
                        element.textContent = originalText;

                        // Tandai kartu selesai jika semua teks sudah normal
                        const allFinished = [...textElements].every(
                            (item) =>
                                item.textContent === item.dataset.originalText
                        );

                        if (allFinished) {
                            card.dataset.scrambling = "false";
                        }
                    }
                }

                setTimeout(scramble, elementIndex * 100);
            });
        });
    },
    {
        threshold: 0.3
    }
);

advantageCards.forEach((card) => {
    advantageScrambleObserver.observe(card);
});