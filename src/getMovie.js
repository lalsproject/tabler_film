const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDUyZDdkNWQzOGY1NzcyZTJiZDIzNWU2OWNkMzgwNiIsIm5iZiI6MTczMjA2MzcyNC40NTY0NTUyLCJzdWIiOiI2NzNjM2YyMjI0ODViODViM2NhOGNkMDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.B6BV6DpV28JJ6MUzmzdNgiEHq1Rr3pPbXIFuV5va4Zk',
  },
};

fetch(
  'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
  options
)
  .then(res => res.json())
  .then(res => {
    console.log(res['results']);
    for (let i = 0; i < res['results'].length; i++) {
      console.log(res['results'][i]);
    }
  })
  .catch(err => console.error(err));
