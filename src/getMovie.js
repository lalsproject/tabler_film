
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
};

const numServer = Object.keys(serverList).length;

document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("data-bs-theme", localStorage.getItem("data-bs-theme"));
  $('#bodyId').attr('data-bs-theme',localStorage.getItem("data-bs-theme"));
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDUyZDdkNWQzOGY1NzcyZTJiZDIzNWU2OWNkMzgwNiIsIm5iZiI6MTczMjA2MzcyNC40NTY0NTUyLCJzdWIiOiI2NzNjM2YyMjI0ODViODViM2NhOGNkMDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.B6BV6DpV28JJ6MUzmzdNgiEHq1Rr3pPbXIFuV5va4Zk",
    },
  };

  let currentPage = localStorage.getItem("currentPage") || 1; // Ambil halaman terakhir dari localStorage atau 1 jika tidak ada
  const totalPages = 500; // Total halaman default
  let genreMap = new Map(); // Map untuk menyimpan genre ID dan nama

  // Fungsi untuk mengambil daftar genre
  function fetchGenres() {
    return fetch("https://api.themoviedb.org/3/genre/movie/list", options)
      .then((res) => res.json())
      .then((data) => {
        data.genres.forEach((genre) => {
          genreMap.set(genre.id, genre.name);
        });
      })
      .catch((err) => console.error("Error fetching genres:", err));
  }

  // Fungsi untuk menampilkan placeholder loading
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

  // Fungsi untuk menyembunyikan placeholder
  function hideLoadingPlaceholder() {
    $("#viewFilm").html("");
  }

  // Fungsi untuk mengambil data film berdasarkan halaman
  function fetchMovies() {
    showLoadingPlaceholder();

    fetch(
      `https://api.themoviedb.org/3/movie/popular?page=${currentPage}`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        let view = "";
        res.results.forEach((movie) => {
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

        // Scroll kembali ke atas setelah konten berhasil dimuat
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((err) => {
        console.error(err);
        hideLoadingPlaceholder();
      });
  }

  // Fungsi untuk memperbarui state tombol pagination
  function updatePagination() {
    const prevButton = document.getElementById("prevPage").parentElement;
    const nextButton = document.getElementById("nextPage").parentElement;

    prevButton.classList.toggle("disabled", currentPage <= 1);
    nextButton.classList.toggle("disabled", currentPage >= totalPages);
  }

  // Event listener tombol Previous dan Next
  document.getElementById("prevPage").addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      localStorage.setItem("currentPage", currentPage); // Simpan halaman yang dipilih ke localStorage
      updatePagination();
      fetchMovies();
    }
  });

  document.getElementById("nextPage").addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      localStorage.setItem("currentPage", currentPage); // Simpan halaman yang dipilih ke localStorage
      updatePagination();
      fetchMovies();
    }
  });

  // Jalankan saat halaman dimuat
  fetchGenres().then(() => {
    fetchMovies();
    updatePagination();
  });
});

function showMovie(idMovie, serverId) {
  if (serverId != "" || serverId != 0) {
    Fancybox.show([
      {
        type: "iframe",
        src: `${serverList[serverId]['url']}${idMovie}`,
      },
    ]);
    $(".is-close-btn").remove();
  }
}
