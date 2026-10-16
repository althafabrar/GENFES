/* =====================================================
   GENFES - CONTACT FORM
   EmailJS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");

    if (!form) {
        return;
    }

    const submitButton = form.querySelector(
        'button[type="submit"]'
    );

    if (!submitButton) {
        return;
    }

    // ==========================================
    // EMAILJS INITIALIZATION
    // ==========================================

    // emailjs.init({
    //     publicKey: "aUwCQo9UfA1AUypbm"
    // });


    const originalButtonHTML = submitButton.innerHTML;


    // ==========================================
    // FORM SUBMIT
    // ==========================================

    form.addEventListener("submit", function (event) {

        event.preventDefault();


        // Loading
        submitButton.disabled = true;

        submitButton.innerHTML = `
            Sending...
            <i class="bi bi-arrow-repeat"></i>
        `;


        // ==========================================
        // SEND EMAIL
        // ==========================================

        console.log(
            "PUBLIC KEY YANG DIPAKAI:",
            "aUwCQo9UfA1AUypbm"
        );

        emailjs.sendForm(
            "service_jzqzjec",
            "template_l6gm9lh",
            form,
            {
                publicKey: "aUwCQo9UfA1AUypbm"
            }
        )
            .then(() => {

                submitButton.innerHTML = `
                Message Sent
                <i class="bi bi-check-circle"></i>
            `;

                form.reset();

                alert("Your message has been sent successfully!");

            })
            .catch((error) => {

                console.error("EMAILJS ERROR:", error);
                console.log("STATUS:", error.status);
                console.log("TEXT:", error.text);

                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonHTML;

                alert(
                    "Email gagal dikirim!\n\n" +
                    "Status: " + error.status +
                    "\nPesan: " + error.text
                );

            });

    });

});