export default async function handler(request) {
    // Hanya menerima POST
    if (request.method !== "POST") {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Method not allowed"
            }),
            {
                status: 405,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

    try {
        // Pastikan API key tersedia
        const apiKey = process.env.RESEND_API_KEY;

        if (!apiKey) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "RESEND_API_KEY belum dikonfigurasi di Vercel."
                }),
                {
                    status: 500,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        const body = await request.json();

        const name = String(body.name || "").trim();
        const email = String(body.email || "").trim();
        const subject = String(body.subject || "").trim();
        const message = String(body.message || "").trim();

        // Validasi
        if (!name || !email || !subject || !message) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Semua field wajib diisi."
                }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        // Validasi email sederhana
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Format email tidak valid."
                }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        // Batasi panjang input
        if (
            name.length > 100 ||
            email.length > 200 ||
            subject.length > 200 ||
            message.length > 5000
        ) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Data yang dikirim terlalu panjang."
                }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        // Mencegah HTML injection
        const escapeHtml = (value) => {
            return value
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        };

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeSubject = escapeHtml(subject);
        const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

        // Kirim email melalui Resend
        const resendResponse = await fetch(
            "https://api.resend.com/emails",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    from: "Genfes Website <onboarding@resend.dev>",
                    to: ["azhariar6@gmail.com"],
                    reply_to: email,
                    subject: `[GENFES CONTACT] ${subject}`,
                    html: `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="UTF-8">
                            <title>New Contact Message</title>
                        </head>

                        <body style="
                            margin: 0;
                            padding: 30px;
                            background: #f4f4f8;
                            font-family: Arial, sans-serif;
                        ">

                            <div style="
                                max-width: 650px;
                                margin: auto;
                                background: #ffffff;
                                border-radius: 16px;
                                overflow: hidden;
                                box-shadow: 0 10px 30px rgba(0,0,0,.08);
                            ">

                                <div style="
                                    padding: 25px 30px;
                                    background: linear-gradient(
                                        135deg,
                                        #6d5dfc,
                                        #8b5cf6,
                                        #38bdf8
                                    );
                                    color: white;
                                ">
                                    <h2 style="
                                        margin: 0;
                                        font-size: 24px;
                                    ">
                                        New Message from Genfes Website
                                    </h2>

                                    <p style="
                                        margin: 8px 0 0;
                                        opacity: .9;
                                    ">
                                        Someone submitted the Contact Form.
                                    </p>
                                </div>

                                <div style="padding: 30px;">

                                    <p style="
                                        margin: 0 0 8px;
                                        color: #777;
                                        font-size: 13px;
                                    ">
                                        NAME
                                    </p>

                                    <p style="
                                        margin: 0 0 22px;
                                        font-size: 16px;
                                        font-weight: 600;
                                    ">
                                        ${safeName}
                                    </p>


                                    <p style="
                                        margin: 0 0 8px;
                                        color: #777;
                                        font-size: 13px;
                                    ">
                                        EMAIL
                                    </p>

                                    <p style="
                                        margin: 0 0 22px;
                                        font-size: 16px;
                                    ">
                                        ${safeEmail}
                                    </p>


                                    <p style="
                                        margin: 0 0 8px;
                                        color: #777;
                                        font-size: 13px;
                                    ">
                                        SUBJECT
                                    </p>

                                    <p style="
                                        margin: 0 0 22px;
                                        font-size: 16px;
                                        font-weight: 600;
                                    ">
                                        ${safeSubject}
                                    </p>


                                    <p style="
                                        margin: 0 0 8px;
                                        color: #777;
                                        font-size: 13px;
                                    ">
                                        MESSAGE
                                    </p>

                                    <div style="
                                        padding: 18px;
                                        background: #f7f7fb;
                                        border-radius: 10px;
                                        line-height: 1.7;
                                        font-size: 15px;
                                    ">
                                        ${safeMessage}
                                    </div>

                                </div>

                                <div style="
                                    padding: 20px 30px;
                                    border-top: 1px solid #eeeeee;
                                    color: #888;
                                    font-size: 12px;
                                ">
                                    This email was sent from the
                                    Genfes website Contact Form.
                                </div>

                            </div>

                        </body>
                        </html>
                    `
                })
            }
        );

        const resendData = await resendResponse.json();

        if (!resendResponse.ok) {
            console.error("Resend error:", resendData);

            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Email gagal dikirim."
                }),
                {
                    status: 500,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Email berhasil dikirim.",
                id: resendData.id
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

    } catch (error) {
        console.error("Server error:", error);

        return new Response(
            JSON.stringify({
                success: false,
                message: "Terjadi kesalahan pada server."
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }
}