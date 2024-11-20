const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDUyZDdkNWQzOGY1NzcyZTJiZDIzNWU2OWNkMzgwNiIsIm5iZiI6MTczMjA2MzcyNC40NTY0NTUyLCJzdWIiOiI2NzNjM2YyMjI0ODViODViM2NhOGNkMDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.B6BV6DpV28JJ6MUzmzdNgiEHq1Rr3pPbXIFuV5va4Zk",
  },
};

fetch(
  "https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=en-US&page=1&sort_by=popularity.desc",
  options
)
  .then((res) => res.json())
  .then((res) => {
    console.log(res["results"][19]);
    let view = '';
    for (let i = 1; i < res["results"].length; i++) {
      let title = res['results'][i]['original_title'];
      let overview = res['results'][i]['overview'];
      let image = `https://image.tmdb.org/t/p/w500${res['results'][i]['poster_path']}`;
      let backdrop = `https://image.tmdb.org/t/p/w500${res['results'][i]['backdrop_path']}`;
      // console.log(res["results"][i]);
      // console.log(i)
      view += `
        <div class="col-sm-6 col-lg-3">
          <div class="card">
            
            <div class="card-body" style="background: linear-gradient(to bottom, transparent, #000000), url(${backdrop});background-repeat:no-repeat;background-size:cover;">
              <img src="${image}" style="margin-bottom:10px;border-radius:5px;">
              <div>
                  <h3 class="card-title">${title}</h3>
                  <p>${overview}</p>
                  
              </div>
            </div>
            <div class="card-footer" style="background: #000000;border-color: #000000;">
              <a href="#" class="btn btn-youtube w-100 btn-icon" aria-label="play">
                <i class="ti ti-player-play"></i><span>&#160;Play</span>
              </a>
            </div>
          </div>
        </div>
      `
    }
    $('#viewFilm').html(view);
  })
  .catch((err) => console.error(err));
