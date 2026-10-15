
document.addEventListener("DOMContentLoaded", function () {
    const newsList = document.getElementById("newsList");
    const articleDetail = document.getElementById("articleDetail");
    const readArticle = document.getElementById("readArticle");
    const backToNews = document.getElementById("backToNews");

    const heroContent = document.querySelector(".news-hero-content");
    const sectionHeading = document.querySelector(".news-section-heading");
    const featuredCard = document.querySelector(".featured-news-card");

    const slides = document.querySelectorAll(".article-slide");

    let currentSlide = 0;
    let slideInterval = null;
    let isTransitioning = false;

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ========================================
       HERO EDITORIAL REVEAL
    ======================================== */

    if (heroContent) {
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                heroContent.classList.add("editorial-visible");
            });
        });
    }


    /* ========================================
       SCROLL REVEAL
    ======================================== */

    const revealElements = [
        sectionHeading,
        featuredCard
    ].filter(Boolean);

    if ("IntersectionObserver" in window && !reduceMotion) {
        const revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("reveal-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add("reveal-visible");
        });
    }


    /* ========================================
       SLIDESHOW ARTIKEL
    ======================================== */


    function updateSlide() {
        slides.forEach(function (slide, index) {
            slide.classList.toggle("active", index === currentSlide);
    
            console.log(
                slide.getAttribute("src"),
                "active:",
                slide.classList.contains("active")
            );
        });
    }

    function startSlideshow() {
        stopSlideshow();

        if (slides.length <= 1) {
            console.warn("Slideshow membutuhkan minimal 2 foto.");
            return;
        }

        // Pastikan foto pertama tampil saat slideshow dimulai.
        currentSlide = 0;
        updateSlide();

        slideInterval = setInterval(function () {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlide();

            console.log("Foto aktif:", currentSlide + 1);
        }, 4000);
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
        slideInterval = null;
    }


    /* ========================================
       TRANSISI HALAMAN ARTIKEL
    ======================================== */

    function showArticle() {
        if (
            !newsList ||
            !articleDetail ||
            isTransitioning ||
            articleDetail.hidden === false
        ) {
            return;
        }

        isTransitioning = true;

        newsList.classList.add("is-leaving");

        window.setTimeout(function () {
            newsList.hidden = true;
            newsList.classList.remove("is-leaving");

            articleDetail.hidden = false;
            articleDetail.classList.remove("is-leaving");

            currentSlide = 0;
            updateSlide();
            startSlideshow();

            /* Jalankan kembali animasi teks artikel
               jika CSS lama menggunakan kelas ini. */
            articleDetail.classList.remove("text-animated");

            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    articleDetail.classList.add("text-animated");
                });
            });

            window.scrollTo({
                top: 0,
                behavior: reduceMotion ? "auto" : "smooth"
            });

            isTransitioning = false;
        }, reduceMotion ? 0 : 250);
    }

    function hideArticle() {
        if (
            !newsList ||
            !articleDetail ||
            isTransitioning ||
            articleDetail.hidden
        ) {
            return;
        }

        isTransitioning = true;

        stopSlideshow();
        articleDetail.classList.add("is-leaving");

        window.setTimeout(function () {
            articleDetail.hidden = true;
            articleDetail.classList.remove("is-leaving");
            articleDetail.classList.remove("text-animated");

            newsList.hidden = false;

            requestAnimationFrame(function () {
                newsList.classList.remove("is-leaving");

                window.scrollTo({
                    top: Math.max(
                        0,
                        newsList.getBoundingClientRect().top +
                        window.scrollY - 100
                    ),
                    behavior: reduceMotion ? "auto" : "smooth"
                });

                isTransitioning = false;
            });
        }, reduceMotion ? 0 : 250);
    }

    /* ========================================
       EVENT LISTENERS
    ======================================== */

    if (readArticle) {
        readArticle.addEventListener("click", function (event) {
            event.preventDefault();
            showArticle();
        });
    }

    if (backToNews) {
        backToNews.addEventListener("click", function (event) {
            event.preventDefault();
            hideArticle();
        });
    }

    /* Bersihkan timer ketika halaman ditinggalkan. */
    window.addEventListener("pagehide", stopSlideshow);
});
