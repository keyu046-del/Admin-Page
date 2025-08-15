document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookingForm");
  const contactForm = document.getElementById("contactForm");
  const confirmation = document.getElementById("confirmation");
  const contactConfirmation = document.getElementById("contactConfirmation");
  const customerGallery = document.getElementById("customerGallery");

  function loadGallery() {
    if (!customerGallery) return;
    customerGallery.innerHTML = "";
    const reviews = JSON.parse(localStorage.getItem('photoReviews') || '[]');
    if (reviews.length === 0) {
      customerGallery.innerHTML = "<p>No customer photos yet.</p>";
      return;
    }
    reviews.forEach(({ image, caption }) => {
      const div = document.createElement("div");
      div.className = "review-card";
      div.innerHTML = `<img src="${image}" alt="Customer"><p>${caption || ""}</p>`;
      customerGallery.appendChild(div);
    });
  }

  loadGallery();

  bookingForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const name = formData.get("name");
    const service = formData.get("service");
    const time = formData.get("time");

    if (!name || !service || !time) {
      confirmation.style.color = "red";
      confirmation.innerText = "Please fill all booking details.";
      return;
    }

    confirmation.style.color = "green";
    confirmation.innerText = `Thank you, ${name}! Your appointment for ${service} at ${time} has been received.`;
    bookingForm.reset();
  });

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const contactName = formData.get("contactName");
    const contactEmail = formData.get("contactEmail");
    const message = formData.get("message");

    if (!contactName || !contactEmail || !message) {
      contactConfirmation.style.color = "red";
      contactConfirmation.innerText = "Please complete all contact fields.";
      return;
    }

    contactConfirmation.style.color = "green";
    contactConfirmation.innerText = `Thanks, ${contactName}. We will get back to you at ${contactEmail}.`;
    contactForm.reset();
  });
});