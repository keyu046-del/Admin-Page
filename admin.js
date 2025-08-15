const form = document.getElementById('uploadForm');
const gallery = document.getElementById('gallery');

function loadGallery() {
  gallery.innerHTML = '';
  const reviews = JSON.parse(localStorage.getItem('photoReviews') || '[]');
  reviews.forEach(({ image, caption }) => {
    const div = document.createElement('div');
    div.className = 'review-card';
    div.innerHTML = `<img src="${image}" alt="Customer photo"><p>${caption || ''}</p>`;
    gallery.appendChild(div);
  });
}

form?.addEventListener('submit', function (e) {
  e.preventDefault();
  const fileInput = document.getElementById('photo');
  const caption = document.getElementById('caption').value;
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function () {
    const imageData = reader.result;
    const newReview = { image: imageData, caption };
    const reviews = JSON.parse(localStorage.getItem('photoReviews') || '[]');
    reviews.push(newReview);
    localStorage.setItem('photoReviews', JSON.stringify(reviews));
    form.reset();
    loadGallery();
  };
  reader.readAsDataURL(file);
});

const ADMIN_PASSWORD = "keya123";
function checkLogin() {
  const input = document.getElementById("adminPassword").value;
  const error = document.getElementById("loginError");
  if (input === ADMIN_PASSWORD) {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("adminContent").style.display = "block";
    loadGallery();
  } else {
    error.textContent = "Incorrect password. Try again.";
    error.style.color = "red";
  }
}
