// This file is to include reusable sections of the website across pages

// Include the navbar
fetch("/reusable_sections/header.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("HeaderSection").innerHTML = data;
  });

// Include the footer
fetch("/reusable_sections/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("FooterSection").innerHTML = data;
  });

// include the links under head tag
fetch("/reusable_sections/whatsapp_floating.html")
  .then((response) => response.text())
  .then((data) => {
   
    document.getElementById("whatsapp_chat").innerHTML = data;
  });