const API_KEY = '51263920-db59373ee5be443f392f33310'; 
const API_URL = 'https://pixabay.com/api/';
const perPage = 15;
let currentPage = 1;
let currentQuery = '';

document.getElementById('searchButton').addEventListener('click', () => {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) return alert('Napište, co hledáte.');
  currentQuery = query;
  currentPage = 1;
  searchImages();
});

async function searchImages() {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}&q=${encodeURIComponent(currentQuery)}&image_type=photo&per_page=${perPage}&page=${currentPage}`);
    if (!response.ok) throw new Error();
    const data = await response.json();
    renderGallery(data.hits);
    renderPagination(Math.ceil(data.totalHits / perPage));
  } catch {
    alert('Nic nenalezeno. Zkuste to znovu.');
  }
}

function renderGallery(images) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = images.length
    ? images.map(img => `<img src="${img.webformatURL}" alt="" style="cursor:pointer" onclick="openModal('${img.largeImageURL}')">`).join('')
    : '<p>Žádné obrázky nebyly nalezeny.</p>';
}

function renderPagination(totalPages) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = i === currentPage ? 'active' : '';
    btn.onclick = () => {
      currentPage = i;
      searchImages();
    };
    pagination.appendChild(btn);
  }
}

//modal
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');

function openModal(src) {
  modal.style.display = 'block';
  modalImg.src = src;
}

closeModal.onclick = () => (modal.style.display = 'none');

window.onclick = e => {
  if (e.target === modal) modal.style.display = 'none';
};

