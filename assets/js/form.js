document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded"); // Debugging log

    // Load form.html dynamically into the container
    fetch("form.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("popup-container").innerHTML = data;
            console.log("Popup loaded"); // Debugging log

            // Add event listeners for buttons after the form loads
            document.getElementById("btn1").addEventListener("click", openPopup);
            document.getElementById("btn2").addEventListener("click", openPopup);
            
            // Add event listener for close button
            document.getElementById("close-btn").addEventListener("click", closePopup);
        })
        .catch(error => console.error("Error loading form.html:", error));
});

// Function to open the popup
function openPopup() {
    const popup = document.getElementById("popup");
    if (popup) {
        popup.style.display = "flex";
        console.log("Popup Opened"); // Debugging log
    } else {
        console.error("Popup element not found!");
    }
}

// Function to close the popup
function closePopup() {
    const popup = document.getElementById("popup");
    if (popup) {
        popup.style.display = "none";
        console.log("Popup Closed"); // Debugging log
    }
}
