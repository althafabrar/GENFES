/* ========================================
   GENFES
   MAIN JAVASCRIPT
======================================== */


/* ========================================
   ELEMENTS
======================================== */

const navbar = document.getElementById("navbar");

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");

const navLinks = document.querySelectorAll(".nav-link");

const watchVideo = document.getElementById("watchVideo");

const videoModal = document.getElementById("videoModal");

const closeVideo = document.getElementById("closeVideo");

const videoModalOverlay =
    document.getElementById("videoModalOverlay");

const heroVideo =
    document.getElementById("heroVideo");


/* ========================================
   NAVBAR SCROLL
======================================== */

function handleNavbarScroll() {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    handleNavbarScroll
);


/* Jalankan saat halaman pertama dibuka */
handleNavbarScroll();


/* ========================================
   MOBILE MENU
======================================== */

function toggleMobileMenu() {

    const isOpen =
        navMenu.classList.toggle("active");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );


    if (isOpen) {

        menuToggle.innerHTML =
            '<i class="bi bi-x-lg"></i>';

        document.body.classList.add(
            "no-scroll"
        );

    } else {

        menuToggle.innerHTML =
            '<i class="bi bi-list"></i>';

        document.body.classList.remove(
            "no-scroll"
        );

    }

}


menuToggle.addEventListener(
    "click",
    toggleMobileMenu
);


/* ========================================
   CLOSE MOBILE MENU
   WHEN NAV LINK CLICKED
======================================== */

navLinks.forEach((link) => {

    link.addEventListener(
        "click",
        () => {

            navMenu.classList.remove(
                "active"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.innerHTML =
                '<i class="bi bi-list"></i>';

            document.body.classList.remove(
                "no-scroll"
            );

        }
    );

});


/* ========================================
   VIDEO MODAL
======================================== */

function openVideoModal() {

    videoModal.classList.add("active");

    document.body.classList.add(
        "no-scroll"
    );

}


function closeVideoModal() {

    videoModal.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "no-scroll"
    );


    if (heroVideo) {

        heroVideo.pause();

        heroVideo.currentTime = 0;

    }

}


/* Open */
if (watchVideo) {

    watchVideo.addEventListener(
        "click",
        openVideoModal
    );

}


/* Close button */
if (closeVideo) {

    closeVideo.addEventListener(
        "click",
        closeVideoModal
    );

}


/* Close overlay */
if (videoModalOverlay) {

    videoModalOverlay.addEventListener(
        "click",
        closeVideoModal
    );

}


/* ========================================
   ESC KEY
======================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            videoModal.classList.contains("active")
        ) {

            closeVideoModal();

        }

    }
);

// =========================
// CONTACT FORM
// =========================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Thank you! Your message has been received.");

        contactForm.reset();

    });

}