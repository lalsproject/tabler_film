const serverList = {
  1: {
    name: "Vidsrc To",
    url: "https://vidsrc.to/embed/movie/",
  },
  2: {
    name: "Vidsrc Xyz",
    url: "https://vidsrc.xyz/embed/movie/",
  },
  3: {
    name: "Vidlink",
    url: "https://vidlink.pro/movie/",
  },
  4: {
    name: "Autoembed",
    url: "https://autoembed.co/movie/tmdb/",
  },
  5: {
    name: "Vidbinge",
    url: "https://player.vidbinge.com/media/tmdb-movie-",
  },
  6: {
    name: "Vidsrc VIP",
    url: "https://vidsrc.vip/embed/movie/",
  },
  7: {
    name: "Smashy",
    url: "https://player.smashy.stream/movie/",
  },
  8: {
    name: "Vidsrc CC",
    url: "https://vidsrc.cc/v3/embed/movie/",
  },
  9: {
    name: "Prime Wire",
    url: "https://www.primewire.tf/embed/movie?tmdb=",
  },
};

const searchParams = new URLSearchParams(window.location.search);
if(searchParams.get('genre') == null){
  window.location = '?genre=';
}else{
  $('#searchDiv').remove();
}


const numServer = Object.keys(serverList).length;

// Initialize genre map
let genreMap = new Map();

// Pagination state
let currentPage = 1;
let totalPages = 500; // Total halaman default untuk daftar film populer

// Search pagination state
let searchQuery = "";
let searchCurrentPage = 1;
let searchTotalPages = 500;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDUyZDdkNWQzOGY1NzcyZTJiZDIzNWU2OWNkMzgwNiIsIm5iZiI6MTczMjA2MzcyNC40NTY0NTUyLCJzdWIiOiI2NzNjM2YyMjI0ODViODViM2NhOGNkMDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.B6BV6DpV28JJ6MUzmzdNgiEHq1Rr3pPbXIFuV5va4Zk", // Replace with your actual TMDB API token
  },
};

// Load genres when page loads
document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("data-bs-theme", localStorage.getItem("data-bs-theme"));
  $('#bodyId').attr('data-bs-theme',localStorage.getItem("data-bs-theme"));
  fetchGenres().then(() => {
    fetchMovies(searchParams.get('genre'));
    updatePagination();
  });

  // Event listener for search button
  document.getElementById("searchButton").addEventListener("click", () => {
    searchQuery = document.getElementById("searchQuery").value.trim();
    if (searchQuery) {
      searchCurrentPage = 1;
      fetchSearchMovies(searchQuery, searchCurrentPage,searchParams.get('genre'));
      updateSearchPagination();
    }
  });

  // Event listeners for pagination
  document.getElementById("prevPage").addEventListener("click", (e) => {
    e.preventDefault();
    if (searchQuery) {
      if (searchCurrentPage > 1) {
        searchCurrentPage--;
        fetchSearchMovies(searchQuery, searchCurrentPage,searchParams.get('genre'));
        updateSearchPagination();
      }
    } else {
      if (currentPage > 1) {
        currentPage--;
        fetchMovies(searchParams.get('genre'));
        updatePagination();
      }
    }
  });

  document.getElementById("nextPage").addEventListener("click", (e) => {
    e.preventDefault();
    if (searchQuery) {
      if (searchCurrentPage < searchTotalPages) {
        searchCurrentPage++;
        fetchSearchMovies(searchQuery, searchCurrentPage,searchParams.get('genre'));
        updateSearchPagination();
      }
    } else {
      if (currentPage < totalPages) {
        currentPage++;
        fetchMovies(searchParams.get('genre'));
        updatePagination();
      }
    }
  });
});

// Fetch genres from API
function fetchGenres() {
  return fetch("https://api.themoviedb.org/3/genre/movie/list", options)
    .then((res) => res.json())
    .then((data) => {
      let genreView = ``;
      data.genres.forEach((genre) => {
        if (genre.id == searchParams.get('genre')) {
          genreView += `
          <a class="dropdown-item active" href="javascript:void(0)" onclick="window.location='?genre=${genre.id}'">
          ${genre.name}
          </a>`;
          $('#genTitle').html(`Streaming Film | ${genre.name}`);
          $('#pageTitle').html(`Streaming Film | ${genre.name}`);
        }else{

          genreView += `
          <a class="dropdown-item" href="javascript:void(0)" onclick="window.location='?genre=${genre.id}'">
          ${genre.name}
          </a>
          `;
        }
        genreMap.set(genre.id, genre.name);
      });
      $('#genreList').html(genreView);
    })
    .catch((err) => console.error("Error fetching genres:", err));
}

// Fetch popular movies
function fetchMovies(genre='') {
  showLoadingPlaceholder();
  let url;
  if(genre != ''){
    url = `https://api.themoviedb.org/3/discover/movie?page=${currentPage}&with_genres=${genre}`;
  }else{
    url = `https://api.themoviedb.org/3/discover/movie?page=${currentPage}`;
    $('#genTitle').html(`Streaming Film | All`);
  }
  fetch(
    url,
    options
  )
    .then((res) => res.json())
    .then((res) => {
      displayMovies(res.results);
      totalPages = res.total_pages;
      updatePagination();
    })
    .catch((err) => {
      console.error(err);
      hideLoadingPlaceholder();
    });
}

// Fetch searched movies
function fetchSearchMovies(query, page,genre='') {
  showLoadingPlaceholder();
  let url;
  if(genre != ''){
    url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query
    )}&page=${page}&with_genres=${genre}`;
  }else{
    url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query
    )}&page=${page}`;
    $('#genTitle').html(`Streaming Film | All`);
  }
  fetch(
    url,
    options
  )
    .then((res) => res.json())
    .then((res) => {
      displayMovies(res.results);
      searchTotalPages = res.total_pages;
      updateSearchPagination();
    })
    .catch((err) => {
      console.error(err);
      hideLoadingPlaceholder();
    });
}

// Display movie results
function displayMovies(movies) {
  let view = "";
  movies.forEach((movie) => {
    let title = movie.original_title;
    let overview = movie.overview;
    let image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    let backdrop = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
    let date = movie.release_date;

    // Generate genre badges
    let genres = movie.genre_ids
      .map((id) => genreMap.get(id))
      .map((genre) => `<span class="badge bg-red-lt mb-1">${genre}</span>`)
      .join(" ");

    view += `
      
      <div class="col-sm-6 col-lg-3">
        <div class="card">
          <div class="card-body" style="border-radius:5px;background: linear-gradient(to bottom, transparent, var(--tblr-body-bg)), url(${backdrop});background-repeat:no-repeat;background-size:cover;">
            <img src="${image}" style="margin-bottom:10px; border-radius:5px;">
            <div>
              <h3 class="card-title">${title}</h3>
              <p class="text-muted" style="font-size:12px;">
                <i class="ti ti-calendar-event"></i> ${date} | 
                <i class="ti ti-stars"></i> ${movie.vote_average}
              </p>
              <p>${genres}</p>
              <p>${overview}</p>
            </div>
          </div>
          <div class="card-footer" style="background: var(--tblr-body-bg); border-color: var(--tblr-body-bg);">
            <div class="row">`;
    for (let i = 1; i <= numServer; i++) {
      view += `
        <div class="col-sm-4 col-sm-6 mb-2">
        <a href="javascript:void(0)" onclick="showMovie('${movie.id}','${i}')" class="btn btn-youtube w-100 btn-icon">
        <i class="ti ti-player-play"></i><span>&#160;${serverList[i].name}</span>
        </a>
        </div>`;
    }
    view += `    
            </div>
          </div>
        </div>
      </div>
    `;
  });
  hideLoadingPlaceholder();
  $("#viewFilm").html(view);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Update pagination buttons for popular movies
function updatePagination() {
  const prevButton = document.getElementById("prevPage").parentElement;
  const nextButton = document.getElementById("nextPage").parentElement;

  prevButton.classList.toggle("disabled", currentPage <= 1);
  nextButton.classList.toggle("disabled", currentPage >= totalPages);
}

// Update pagination buttons for search results
function updateSearchPagination() {
  const prevButton = document.getElementById("prevPage").parentElement;
  const nextButton = document.getElementById("nextPage").parentElement;

  prevButton.classList.toggle("disabled", searchCurrentPage <= 1);
  nextButton.classList.toggle(
    "disabled",
    searchCurrentPage >= searchTotalPages
  );
}

// Show movie in iframe popup
function showMovie(idMovie, serverId) {
  if (serverId != "" || serverId != 0) {
    Fancybox.show([
      {
        type: "iframe",
        src: `${serverList[serverId]["url"]}${idMovie}`,
      },
    ]);
    $(".is-close-btn").remove();
  }
}

// Show placeholder while loading
function showLoadingPlaceholder() {
  let placeholder = "";
  for (let i = 0; i < 8; i++) {
    placeholder += `
      <div class="col-sm-6 col-lg-3">
        <div class="card">
          <div class="card-body" style="height: 300px; background: #ccc; border-radius: 10px;">
            <div class="placeholder-glow">
              <span class="placeholder col-12" style="height: 200px; display: block;"></span>
              <span class="placeholder col-6 mt-2"></span>
              <span class="placeholder col-8 mt-2"></span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  $("#viewFilm").html(placeholder);
}

// Hide placeholder after loading
function hideLoadingPlaceholder() {
  $("#viewFilm").html("");
}
