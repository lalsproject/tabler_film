const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDUyZDdkNWQzOGY1NzcyZTJiZDIzNWU2OWNkMzgwNiIsIm5iZiI6MTczMjA2MzcyNC40NTY0NTUyLCJzdWIiOiI2NzNjM2YyMjI0ODViODViM2NhOGNkMDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.B6BV6DpV28JJ6MUzmzdNgiEHq1Rr3pPbXIFuV5va4Zk',
  },
};

// State untuk menyimpan filter dan pagination
let currentState = {
  page: 1,
  genre: '',
  country: '',
  sortBy: 'popularity.desc',
  searchQuery: '',
  totalPages: 1
};

// Daftar negara yang tersedia
const countries = [
  { code: 'US', name: 'Amerika Serikat' },
  { code: 'GB', name: 'Inggris' },
  { code: 'JP', name: 'Jepang' },
  { code: 'KR', name: 'Korea Selatan' },
  { code: 'IN', name: 'India' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'FR', name: 'Prancis' },
  { code: 'DE', name: 'Jerman' },
  { code: 'IT', name: 'Italia' },
  { code: 'ES', name: 'Spanyol' }
];

// Daftar kategori dengan ikon
const categories = [
  { id: 28, name: 'Action', icon: 'fa-bolt' },
  { id: 12, name: 'Adventure', icon: 'fa-mountain' },
  { id: 16, name: 'Animation', icon: 'fa-film' },
  { id: 35, name: 'Comedy', icon: 'fa-laugh' },
  { id: 80, name: 'Crime', icon: 'fa-user-secret' },
  { id: 99, name: 'Documentary', icon: 'fa-camera' },
  { id: 18, name: 'Drama', icon: 'fa-theater-masks' },
  { id: 10751, name: 'Family', icon: 'fa-home' },
  { id: 14, name: 'Fantasy', icon: 'fa-hat-wizard' },
  { id: 36, name: 'History', icon: 'fa-landmark' },
  { id: 27, name: 'Horror', icon: 'fa-skull' },
  { id: 10402, name: 'Music', icon: 'fa-music' },
  { id: 9648, name: 'Mystery', icon: 'fa-search' },
  { id: 10749, name: 'Romance', icon: 'fa-heart' },
  { id: 878, name: 'Science Fiction', icon: 'fa-rocket' },
  { id: 53, name: 'Thriller', icon: 'fa-bomb' },
  { id: 10752, name: 'War', icon: 'fa-shield-alt' },
  { id: 37, name: 'Western', icon: 'fa-hat-cowboy' }
];

// Fungsi untuk menampilkan loading
function showLoading() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  loadingOverlay.classList.add('active');
}

// Fungsi untuk menyembunyikan loading
function hideLoading() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  loadingOverlay.classList.remove('active');
}

// Fungsi untuk memuat daftar genre
async function loadGenres() {
  try {
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error('Error loading genres:', error);
    return [];
  }
}

// Fungsi untuk membuat kategori cards
function createCategoryCards(genres) {
  const categoriesGrid = document.getElementById('categoriesGrid');
  categoriesGrid.innerHTML = '';

  genres.forEach(genre => {
    const category = categories.find(cat => cat.id === genre.id);
    if (category) {
      const card = document.createElement('div');
      card.className = 'category-card';
      card.onclick = () => selectCategory(genre.id);
      card.innerHTML = `
        <i class="fas ${category.icon} category-icon"></i>
        <div class="category-name">${genre.name}</div>
        <div class="category-count">${Math.floor(Math.random() * 1000)} film</div>
      `;
      categoriesGrid.appendChild(card);
    }
  });
}

// Fungsi untuk memilih kategori
function selectCategory(genreId) {
  currentState.genre = genreId;
  currentState.page = 1;
  loadMovies();
}

// Fungsi untuk memuat daftar negara
function loadCountries() {
  const countrySelect = document.getElementById('countrySelect');
  
  countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country.code;
    option.textContent = country.name;
    countrySelect.appendChild(option);
  });
}

// Fungsi untuk menangani error gambar
function handleImageError(img) {
  img.onerror = null; // Mencegah loop error
  img.src = 'assets/default.png'; // Gunakan gambar lokal
  img.alt = 'Gambar tidak tersedia';
}

// Fungsi untuk menampilkan film
function displayMovies(movies, totalPages) {
  const viewFilm = document.getElementById('viewFilm');
  viewFilm.innerHTML = ''; // Bersihkan konten sebelumnya

  currentState.totalPages = totalPages;
  updatePagination();

  movies.forEach(movie => {
    // Ambil genre untuk film ini
    const movieGenres = movie.genre_ids ? movie.genre_ids.map(id => {
      const genre = categories.find(cat => cat.id === id);
      return genre ? genre.name : '';
    }).filter(name => name) : [];

    const movieCard = `
      <div class="movie-card">
        <img 
          src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
          alt="${movie.title}"
          class="movie-poster"
          onerror="handleImageError(this)"
        />
        <div class="movie-info">
          <h3 class="movie-title">${movie.title}</h3>
          <div class="movie-meta">
            <span class="movie-year">${movie.release_date ? movie.release_date.split('-')[0] : 'TBA'}</span>
            <span class="movie-rating">
              <i class="fas fa-star"></i>
              ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
            </span>
          </div>
          <div class="movie-genres">
            ${movieGenres.map(genre => `
              <span class="genre-tag" onclick="selectCategory(${categories.find(cat => cat.name === genre).id})">
                ${genre}
              </span>
            `).join('')}
          </div>
          <p class="movie-overview">${movie.overview ? movie.overview.substring(0, 100) + '...' : 'Tidak ada deskripsi tersedia.'}</p>
          <div class="movie-actions">
            <button class="action-button play-button" onclick="playMovie(${movie.id}, '${movie.title.replace(/'/g, "\\'")}')">
              <i class="fas fa-play"></i>
              Play
            </button>
            <button class="action-button info-button" onclick="showDetails(${movie.id})">
              <i class="fas fa-info-circle"></i>
              Info
            </button>
          </div>
        </div>
      </div>
    `;
    viewFilm.innerHTML += movieCard;
  });
}

// Fungsi untuk memperbarui pagination
function updatePagination() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  // Previous button
  const prevButton = document.createElement('button');
  prevButton.className = 'page-button';
  prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
  prevButton.disabled = currentState.page === 1;
  prevButton.onclick = () => changePage(currentState.page - 1);
  pagination.appendChild(prevButton);

  // Page numbers
  const startPage = Math.max(1, currentState.page - 2);
  const endPage = Math.min(currentState.totalPages, startPage + 4);

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement('button');
    pageButton.className = `page-button ${i === currentState.page ? 'active' : ''}`;
    pageButton.textContent = i;
    pageButton.onclick = () => changePage(i);
    pagination.appendChild(pageButton);
  }

  // Next button
  const nextButton = document.createElement('button');
  nextButton.className = 'page-button';
  nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
  nextButton.disabled = currentState.page === currentState.totalPages;
  nextButton.onclick = () => changePage(currentState.page + 1);
  pagination.appendChild(nextButton);
}

// Fungsi untuk mengubah halaman
function changePage(page) {
  currentState.page = page;
  loadMovies();
}

// Fungsi untuk memuat film dengan filter
async function loadMovies() {
  showLoading();
  let url = 'https://api.themoviedb.org/3/discover/movie?';
  const params = new URLSearchParams({
    include_adult: false,
    include_video: false,
    language: 'en-US',
    page: currentState.page,
    sort_by: currentState.sortBy
  });

  // Tambahkan filter genre jika ada
  if (currentState.genre) {
    params.append('with_genres', currentState.genre);
  }

  // Tambahkan filter negara jika ada
  if (currentState.country) {
    params.append('with_origin_country', currentState.country);
  }

  // Jika ada query pencarian, gunakan endpoint pencarian
  if (currentState.searchQuery) {
    url = `https://api.themoviedb.org/3/search/movie?`;
    params.append('query', currentState.searchQuery);
  }

  try {
    const response = await fetch(url + params.toString(), options);
    const data = await response.json();
    
    if (data.results) {
      displayMovies(data.results, data.total_pages);
    } else {
      console.error('Tidak ada hasil yang ditemukan');
      document.getElementById('viewFilm').innerHTML = '<div class="no-results">Tidak ada film yang ditemukan</div>';
    }
  } catch (error) {
    console.error('Error loading movies:', error);
    document.getElementById('viewFilm').innerHTML = '<div class="error-message">Terjadi kesalahan saat memuat film</div>';
  } finally {
    hideLoading();
  }
}

// Fungsi untuk memutar film
function playMovie(movieId, movieTitle) {
  window.location.href = `player.html?id=${movieId}&title=${encodeURIComponent(movieTitle)}`;
}

// Fungsi untuk menampilkan detail film (placeholder)
function showDetails(movieId) {
  alert(`Detail untuk film ID: ${movieId} akan segera hadir!`);
}

// Event listener untuk pencarian dan filter
document.addEventListener('DOMContentLoaded', async () => {
  showLoading();
  const genres = await loadGenres();
  loadCountries();
  loadMovies();
  
  const searchInput = document.getElementById('searchInput');
  const countrySelect = document.getElementById('countrySelect');
  const sortSelect = document.getElementById('sortSelect');

  // Event listener untuk pencarian
  searchInput.addEventListener('input', (e) => {
    currentState.searchQuery = e.target.value;
    currentState.page = 1;
    if (e.target.value.length > 2 || e.target.value.length === 0) {
      loadMovies();
    }
  });

  // Event listener untuk filter negara
  countrySelect.addEventListener('change', (e) => {
    currentState.country = e.target.value;
    currentState.page = 1;
    loadMovies();
  });

  // Event listener untuk filter pengurutan
  sortSelect.addEventListener('change', (e) => {
    currentState.sortBy = e.target.value;
    currentState.page = 1;
    loadMovies();
  });
});
