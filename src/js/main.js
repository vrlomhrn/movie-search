// ! Fetch
// TODO Home
(() => {
  const API_KEY = config.API_KEY;
  (async () => {
    const trending = await getTrending();
    updateUI(trending);
  })();

  // TODO Search button
  const searchButton = document.querySelector('.search-button');
  searchButton.addEventListener('click', async function () {
    try {
      const inputKeyword = document.querySelector('.input-keyword');
      const movies = await getMovies(inputKeyword.value);
      updateUI(movies);
    } catch (error) {
      (() => {
        (() => {
          setTimeout('location.reload(true);');
        })();
        window.onload;
      })();
      alert(error);
    } finally {
      console.log('Succesfull loaded');
    }
  });
  function getTrending(movies) {
    return fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((response) => response.results);
  }
  function getMovies(keyword) {
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyword}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something wrong, I can feel it.');
        }
        return response.json();
      })
      .then((response) => {
        if (response.total_pages < 1) {
          throw new Error('Movie Not Found');
        }
        return response.results;
      });
  }

  function updateUI(movies) {
    let cards = '';
    movies.forEach((m) => (cards += showCards(m)));
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = cards;
  }

  function getMovieDetail(tmdb) {
    return fetch(`https://api.themoviedb.org/3/movie/${tmdb}?api_key=${API_KEY}&language=en-US`)
      .then((response) => response.json())
      .then((detail) => detail);
  }
  function updateUIDetail(detail) {
    const movieDetail = showMovieDetails(detail);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
  }

  // ? If detail clicked
  // TODO Binding Event
  document.addEventListener('click', async function (event) {
    if (event.target.classList.contains('modal-detail-button')) {
      const tmdb = event.target.dataset.tmdb;
      const movieDetail = await getMovieDetail(tmdb);
      updateUIDetail(movieDetail);
    }
  });

  function showCards(movie) {
    if (movie.poster_path == null) {
      return '';
    }
    return `<div class="col-md-4 my-1">
            <div class="card">
              <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top">
                <div class="card-body">
                  <h5 class="card-title">${movie.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${movie.release_date}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-tmdb="${movie.id}">Show Details</a>
                </div>
            </div>
          </div>`;
  }

  function showMovieDetails(detail) {
    return `<div class="container-fluid">
              <div class="row">
              <h5 class="modal-title m-auto" id="movieDetailModalLabel ">${detail.title}</h5>
                  <div class="col-md-4 padding-style">
                      <img src="https://image.tmdb.org/t/p/w500/${detail.poster_path}" class="img-fluid" />
                  </div>
                  <div class="col-md padding-style">
                      <ul class="list-group">
                      <li class="list-group-item"><strong>Title:</strong> ${(title = detail.title)}</li>
                      <li class="list-group-item"><strong>Release Date: </strong>${detail.release_date}</li>
                      <li class="list-group-item"><strong>Ratings:</strong> ${detail.vote_average}</li>
                      <li class="list-group-item"><strong>Status:</strong> ${detail.status}</li>
                      <li class="list-group-item"><strong>Description: </strong><br>${detail.overview}</li>
                      </ul>
                </div>
            </div>
          </div>`;
  }
})();
