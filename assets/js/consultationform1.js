document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded");

    fetch("/services/consultationform1.html")
        .then(response => response.text())
        .then(data => {
            let container = document.getElementById("popup-container");

            if (!container) {
                console.error("ERROR: #popup-container is missing from the main HTML!");
                return;
            }

            container.innerHTML = data;
            console.log("Popup form loaded successfully!");
            

            setTimeout(() => {
                let popup = document.getElementById("popup");
                if (!popup) {
                    console.error("ERROR: #popup element is NOT found after loading consultationform.html!");
                    return;
                }

                document.querySelectorAll(".open-popup").forEach(button => {
                    button.addEventListener("click", openPopup);
                });

                let closeButton = document.getElementById("close-btn");
                if (closeButton) {
                    closeButton.addEventListener("click", closePopup);
                } else {
                    console.error("Close button not found!");
                }
            }, 100);
        })
        .catch(error => console.error("Error loading consultationform.html:", error));

    // Initialize EmailJS
    if (typeof emailjs !== "undefined") {
        emailjs.init("wyNyfxtn7cYxbE6oh"); // Replace with your EmailJS Public Key
    } else {
        console.error("EmailJS failed to load!");
    }

    // Form Submission Handler
    let form = document.querySelector(".contactForm");
    if (!form) {
        console.error("Form not found!");
        return;
    }

    form.addEventListener("submit", function(event) {
        console.log("hello-function");
        event.preventDefault();
        handleFormSubmit(this);
    });
});

// Function to open the popup
function openPopup() {
    let popup = document.getElementById("popup");
    if (popup) {
        popup.style.display = "flex";
        console.log("Popup Opened");
    } else {
        console.error("Popup element not found when trying to open!");
    }
}

// Function to close the popup
function closePopup() {
    let popup = document.getElementById("popup");
    if (popup) {
        popup.style.display = "none";
        console.log("Popup Closed");
    }
}

// Form Handling
function handleFormSubmit(form) {
    let isValid = true;

    const name = document.querySelector("input[name='name']");
    const email = document.querySelector("input[name='email']");
    const phone = document.querySelector("input[name='phone_no']");
    const subject = document.querySelector("input[name='subject']");
    const message = document.querySelector("textarea[name='message']");

    document.querySelectorAll(".error-message").forEach(el => el.remove());

    if (name.value.trim() === "") {
        showError(name, "Please enter your full name.");
        isValid = false;
    }

    if (email.value.trim() === "") {
        showError(email, "Please enter your email address.");
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showError(email, "Please enter a valid email address.");
        isValid = false;
    }

    // if (subject.value.trim() === "") {
    //     showError(subject, "Please enter the subject.");
    //     isValid = false;
    // }

    // if (phone.value.trim() === "") {
    //     showError(phone, "Please enter your phone number.");
    //     isValid = false;
    // }

    // if (message.value.trim() === "") {
    //     showError(message, "Please enter your message.");
    //     isValid = false;
    // } else if (message.value.length < 10) {
    //     showError(message, "Message must be at least 10 characters.");
    //     isValid = false;
    // }

    if (!isValid) return;

    emailjs.sendForm("service_m2isdj9", "template-contact", form)
        .then(response => {
            console.log("Email sent successfully!", response);
            document.querySelector(".contact-form-success").classList.remove("d-none");
            document.querySelector(".contact-form-error").classList.add("d-none");
        })
        .catch(error => {
            console.error("Email sending failed:", error);
            document.querySelector(".contact-form-success").classList.add("d-none");
            document.querySelector(".contact-form-error").classList.remove("d-none");
            document.querySelector(".mail-error-message").textContent = error.text;
        });

    // form.reset();
}

// Function to show validation error
function showError(input, message) {
    const error = document.createElement("div");
    error.className = "error-message text-danger";
    error.textContent = message;
    input.parentNode.appendChild(error);
}
