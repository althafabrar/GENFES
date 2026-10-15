/* =====================================================
   GENFES - HOME PAGE JAVASCRIPT
   Video modal, scroll reveals, home animations and typewriter
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
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

});




/* ========================================
   ADVANTAGES LETTER SCRAMBLE
   REPLAY WHEN SCROLLING INTO VIEW
======================================== */

const advantageTextElements = document.querySelectorAll(
    ".advantage-card h3, .advantage-card p"
);

if (advantageTextElements.length > 0) {
    const scrambleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const advantageTextObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const element = entry.target;

            if (!entry.isIntersecting) return;

            // Ambil teks asli, bukan teks hasil scramble
            const originalText = element.dataset.originalText;

            // Mulai animasi setiap kali elemen masuk ke layar
            let frame = 0;
            const totalFrames = 60;

            function scrambleText() {
                const progress = Math.min(frame / totalFrames, 1);
                const revealedCharacters = Math.floor(
                    progress * originalText.length
                );

                element.textContent = Array.from(originalText)
                    .map((character, index) => {
                        if (
                            character === " " ||
                            character === "\n" ||
                            index < revealedCharacters
                        ) {
                            return character;
                        }

                        return scrambleCharacters[
                            Math.floor(Math.random() * scrambleCharacters.length)
                        ];
                    })
                    .join("");

                frame++;

                if (frame <= totalFrames) {
                    requestAnimationFrame(scrambleText);
                } else {
                    element.textContent = originalText;
                }
            }

            requestAnimationFrame(scrambleText);
        });
    }, { threshold: 0.35 });

    advantageTextElements.forEach((element) => {
        // Simpan teks asli hanya sekali
        if (!element.dataset.originalText) {
            element.dataset.originalText = element.textContent;
        }

        advantageTextObserver.observe(element);
    });
}


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
                typingTimer = setTimeout(typeNextCharacter, 2);
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
