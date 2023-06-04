import { fetchMovieAvailability, fetchMovieList } from "./api.js";

const loader = document.getElementById("loader");
const movielistHolder = document.getElementById("movie-holder");
document.addEventListener("DOMContentLoaded", function () {
  showLoader();
  fetchMovieList()
    .then(function (movielist) {
      renderMovieComponents(movielist);
      removeLoader();
    })
    .catch(function (error) {
      console.error("Error:", error);
      removeLoader();
    });
});
function showLoader() {
  const loaderr = document.createElement("h2");
  loaderr.textContent = "Loading...";
  loader.appendChild(loaderr);
}
function removeLoader() {
  loader.remove();
}

function renderMovieComponents(movielist) {
  movielist.forEach(function (movie) {
    const movieLink = document.createElement("a");
    movieLink.classList.add("movie-link");
    movieLink.href = `/${movie.name}`;

    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");
    movieDiv.dataset.d = movie.name;

    const movieImgWrapper = document.createElement("div");
    movieImgWrapper.classList.add("movie-img-wrapper");
    movieImgWrapper.style.backgroundImage = `url(${movie.imgUrl})`;
    movieImgWrapper.style.backgroundSize = "cover";

    const movieName = document.createElement("h4");
    movieName.textContent = `${movie.name}`;

    movieDiv.appendChild(movieImgWrapper);
    movieDiv.appendChild(movieName);

    movieLink.appendChild(movieDiv);
    movielistHolder.appendChild(movieLink);
  });
}
