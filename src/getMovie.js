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
  {"code": "AF","name": "Afghanistan"},
  {"code": "AX","name": "\u00c5land Islands"},
  {"code": "AL","name": "Albania"},
  {"code": "DZ","name": "Algeria"},
  {"code": "AS","name": "American Samoa"},
  {"code": "AD","name": "Andorra"},
  {"code": "AO","name": "Angola"},
  {"code": "AI","name": "Anguilla"},
  {"code": "AQ","name": "Antarctica"},
  {"code": "AG","name": "Antigua and Barbuda"},
  {"code": "AR","name": "Argentina"},
  {"code": "AM","name": "Armenia"},
  {"code": "AW","name": "Aruba"},
  {"code": "AU","name": "Australia"},
  {"code": "AT","name": "Austria"},
  {"code": "AZ","name": "Azerbaijan"},
  {"code": "BS","name": "Bahamas"},
  {"code": "BH","name": "Bahrain"},
  {"code": "BD","name": "Bangladesh"},
  {"code": "BB","name": "Barbados"},
  {"code": "BY","name": "Belarus"},
  {"code": "BE","name": "Belgium"},
  {"code": "BZ","name": "Belize"},
  {"code": "BJ","name": "Benin"},
  {"code": "BM","name": "Bermuda"},
  {"code": "BT","name": "Bhutan"},
  {"code": "BO","name": "Bolivia, Plurinational State of"},
  {"code": "BQ","name": "Bonaire, Sint Eustatius and Saba"},
  {"code": "BA","name": "Bosnia and Herzegovina"},
  {"code": "BW","name": "Botswana"},
  {"code": "BV","name": "Bouvet Island"},
  {"code": "BR","name": "Brazil"},
  {"code": "IO","name": "British Indian Ocean Territory"},
  {"code": "BN","name": "Brunei Darussalam"},
  {"code": "BG","name": "Bulgaria"},
  {"code": "BF","name": "Burkina Faso"},
  {"code": "BI","name": "Burundi"},
  {"code": "CV","name": "Cabo Verde"},
  {"code": "KH","name": "Cambodia"},
  {"code": "CM","name": "Cameroon"},
  {"code": "CA","name": "Canada"},
  {"code": "KY","name": "Cayman Islands"},
  {"code": "CF","name": "Central African Republic"},
  {"code": "TD","name": "Chad"},
  {"code": "CL","name": "Chile"},
  {"code": "CN","name": "China"},
  {"code": "CX","name": "Christmas Island"},
  {"code": "CC","name": "Cocos (Keeling) Islands"},
  {"code": "CO","name": "Colombia"},
  {"code": "KM","name": "Comoros"},
  {"code": "CG","name": "Congo"},
  {"code": "CD","name": "Congo, Democratic Republic of the"},
  {"code": "CK","name": "Cook Islands"},
  {"code": "CR","name": "Costa Rica"},
  {"code": "CI","name": "C\u00f4te d'Ivoire"},
  {"code": "HR","name": "Croatia"},
  {"code": "CU","name": "Cuba"},
  {"code": "CW","name": "Cura\u00e7ao"},
  {"code": "CY","name": "Cyprus"},
  {"code": "CZ","name": "Czechia"},
  {"code": "DK","name": "Denmark"},
  {"code": "DJ","name": "Djibouti"},
  {"code": "DM","name": "Dominica"},
  {"code": "DO","name": "Dominican Republic"},
  {"code": "EC","name": "Ecuador"},
  {"code": "EG","name": "Egypt"},
  {"code": "SV","name": "El Salvador"},
  {"code": "GQ","name": "Equatorial Guinea"},
  {"code": "ER","name": "Eritrea"},
  {"code": "EE","name": "Estonia"},
  {"code": "SZ","name": "Eswatini"},
  {"code": "ET","name": "Ethiopia"},
  {"code": "FK","name": "Falkland Islands (Malvinas)"},
  {"code": "FO","name": "Faroe Islands"},
  {"code": "FJ","name": "Fiji"},
  {"code": "FI","name": "Finland"},
  {"code": "FR","name": "France"},
  {"code": "GF","name": "French Guiana"},
  {"code": "PF","name": "French Polynesia"},
  {"code": "TF","name": "French Southern Territories"},
  {"code": "GA","name": "Gabon"},
  {"code": "GM","name": "Gambia"},
  {"code": "GE","name": "Georgia"},
  {"code": "DE","name": "Germany"},
  {"code": "GH","name": "Ghana"},
  {"code": "GI","name": "Gibraltar"},
  {"code": "GR","name": "Greece"},
  {"code": "GL","name": "Greenland"},
  {"code": "GD","name": "Grenada"},
  {"code": "GP","name": "Guadeloupe"},
  {"code": "GU","name": "Guam"},
  {"code": "GT","name": "Guatemala"},
  {"code": "GG","name": "Guernsey"},
  {"code": "GN","name": "Guinea"},
  {"code": "GW","name": "Guinea-Bissau"},
  {"code": "GY","name": "Guyana"},
  {"code": "HT","name": "Haiti"},
  {"code": "HM","name": "Heard Island and McDonald Islands"},
  {"code": "VA","name": "Holy See"},
  {"code": "HN","name": "Honduras"},
  {"code": "HK","name": "Hong Kong"},
  {"code": "HU","name": "Hungary"},
  {"code": "IS","name": "Iceland"},
  {"code": "IN","name": "India"},
  {"code": "ID","name": "Indonesia"},
  {"code": "IR","name": "Iran, Islamic Republic of"},
  {"code": "IQ","name": "Iraq"},
  {"code": "IE","name": "Ireland"},
  {"code": "IM","name": "Isle of Man"},
  {"code": "IL","name": "Israel"},
  {"code": "IT","name": "Italy"},
  {"code": "JM","name": "Jamaica"},
  {"code": "JP","name": "Japan"},
  {"code": "JE","name": "Jersey"},
  {"code": "JO","name": "Jordan"},
  {"code": "KZ","name": "Kazakhstan"},
  {"code": "KE","name": "Kenya"},
  {"code": "KI","name": "Kiribati"},
  {"code": "KP","name": "Korea, Democratic People's Republic of"},
  {"code": "KR","name": "Korea, Republic of"},
  {"code": "KW","name": "Kuwait"},
  {"code": "KG","name": "Kyrgyzstan"},
  {"code": "LA","name": "Lao People's Democratic Republic"},
  {"code": "LV","name": "Latvia"},
  {"code": "LB","name": "Lebanon"},
  {"code": "LS","name": "Lesotho"},
  {"code": "LR","name": "Liberia"},
  {"code": "LY","name": "Libya"},
  {"code": "LI","name": "Liechtenstein"},
  {"code": "LT","name": "Lithuania"},
  {"code": "LU","name": "Luxembourg"},
  {"code": "MO","name": "Macao"},
  {"code": "MG","name": "Madagascar"},
  {"code": "MW","name": "Malawi"},
  {"code": "MY","name": "Malaysia"},
  {"code": "MV","name": "Maldives"},
  {"code": "ML","name": "Mali"},
  {"code": "MT","name": "Malta"},
  {"code": "MH","name": "Marshall Islands"},
  {"code": "MQ","name": "Martinique"},
  {"code": "MR","name": "Mauritania"},
  {"code": "MU","name": "Mauritius"},
  {"code": "YT","name": "Mayotte"},
  {"code": "MX","name": "Mexico"},
  {"code": "FM","name": "Micronesia, Federated States of"},
  {"code": "MD","name": "Moldova, Republic of"},
  {"code": "MC","name": "Monaco"},
  {"code": "MN","name": "Mongolia"},
  {"code": "ME","name": "Montenegro"},
  {"code": "MS","name": "Montserrat"},
  {"code": "MA","name": "Morocco"},
  {"code": "MZ","name": "Mozambique"},
  {"code": "MM","name": "Myanmar"},
  {"code": "NR","name": "Nauru"},
  {"code": "NP","name": "Nepal"},
  {"code": "NL","name": "Netherlands, Kingdom of the"},
  {"code": "NC","name": "New Caledonia"},
  {"code": "NZ","name": "New Zealand"},
  {"code": "NI","name": "Nicaragua"},
  {"code": "NE","name": "Niger"},
  {"code": "NG","name": "Nigeria"},
  {"code": "NU","name": "Niue"},
  {"code": "NF","name": "Norfolk Island"},
  {"code": "MK","name": "North Macedonia"},
  {"code": "MP","name": "Northern Mariana Islands"},
  {"code": "NO","name": "Norway"},
  {"code": "OM","name": "Oman"},
  {"code": "PK","name": "Pakistan"},
  {"code": "PW","name": "Palau"},
  {"code": "PS","name": "Palestine, State of"},
  {"code": "PA","name": "Panama"},
  {"code": "PG","name": "Papua New Guinea"},
  {"code": "PY","name": "Paraguay"},
  {"code": "PE","name": "Peru"},
  {"code": "PH","name": "Philippines"},
  {"code": "PN","name": "Pitcairn"},
  {"code": "PL","name": "Poland"},
  {"code": "PT","name": "Portugal"},
  {"code": "PR","name": "Puerto Rico"},
  {"code": "QA","name": "Qatar"},
  {"code": "RE","name": "R\u00e9union"},
  {"code": "RO","name": "Romania"},
  {"code": "RU","name": "Russian Federation"},
  {"code": "RW","name": "Rwanda"},
  {"code": "BL","name": "Saint Barth\u00e9lemy"},
  {"code": "SH","name": "Saint Helena, Ascension and Tristan da Cunha"},
  {"code": "KN","name": "Saint Kitts and Nevis"},
  {"code": "LC","name": "Saint Lucia"},
  {"code": "MF","name": "Saint Martin (French part)"},
  {"code": "PM","name": "Saint Pierre and Miquelon"},
  {"code": "VC","name": "Saint Vincent and the Grenadines"},
  {"code": "WS","name": "Samoa"},
  {"code": "SM","name": "San Marino"},
  {"code": "ST","name": "Sao Tome and Principe"},
  {"code": "SA","name": "Saudi Arabia"},
  {"code": "SN","name": "Senegal"},
  {"code": "RS","name": "Serbia"},
  {"code": "SC","name": "Seychelles"},
  {"code": "SL","name": "Sierra Leone"},
  {"code": "SG","name": "Singapore"},
  {"code": "SX","name": "Sint Maarten (Dutch part)"},
  {"code": "SK","name": "Slovakia"},
  {"code": "SI","name": "Slovenia"},
  {"code": "SB","name": "Solomon Islands"},
  {"code": "SO","name": "Somalia"},
  {"code": "ZA","name": "South Africa"},
  {"code": "GS","name": "South Georgia and the South Sandwich Islands"},
  {"code": "SS","name": "South Sudan"},
  {"code": "ES","name": "Spain"},
  {"code": "LK","name": "Sri Lanka"},
  {"code": "SD","name": "Sudan"},
  {"code": "SR","name": "Suriname"},
  {"code": "SJ","name": "Svalbard and Jan Mayen"},
  {"code": "SE","name": "Sweden"},
  {"code": "CH","name": "Switzerland"},
  {"code": "SY","name": "Syrian Arab Republic"},
  {"code": "TW","name": "Taiwan, Province of China"},
  {"code": "TJ","name": "Tajikistan"},
  {"code": "TZ","name": "Tanzania, United Republic of"},
  {"code": "TH","name": "Thailand"},
  {"code": "TL","name": "Timor-Leste"},
  {"code": "TG","name": "Togo"},
  {"code": "TK","name": "Tokelau"},
  {"code": "TO","name": "Tonga"},
  {"code": "TT","name": "Trinidad and Tobago"},
  {"code": "TN","name": "Tunisia"},
  {"code": "TR","name": "T\u00fcrkiye"},
  {"code": "TM","name": "Turkmenistan"},
  {"code": "TC","name": "Turks and Caicos Islands"},
  {"code": "TV","name": "Tuvalu"},
  {"code": "UG","name": "Uganda"},
  {"code": "UA","name": "Ukraine"},
  {"code": "AE","name": "United Arab Emirates"},
  {"code": "GB","name": "United Kingdom of Great Britain and Northern Ireland"},
  {"code": "US","name": "United States of America"},
  {"code": "UM","name": "United States Minor Outlying Islands"},
  {"code": "UY","name": "Uruguay"},
  {"code": "UZ","name": "Uzbekistan"},
  {"code": "VU","name": "Vanuatu"},
  {"code": "VE","name": "Venezuela, Bolivarian Republic of"},
  {"code": "VN","name": "Viet Nam"},
  {"code": "VG","name": "Virgin Islands (British)"},
  {"code": "VI","name": "Virgin Islands (U.S.)"},
  {"code": "WF","name": "Wallis and Futuna"},
  {"code": "EH","name": "Western Sahara"},
  {"code": "YE","name": "Yemen"},
  {"code": "ZM","name": "Zambia"},
  {"code": "ZW","name": "Zimbabwe"}
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
