let arrayOfMovies = JSON.parse(localStorage.getItem("local-storage-data"));
const bigPoster = $('.bigPoster');
const movieList = $('.movieList');
const closeModalBtn = $('.closeModalBtn');
const movieNotFoundModal = $('#movieNotFoundModal');
const moreMovieDetails = $('#moreMovieDetails');
const downloadPoster = $('.downloadPoster');

if (arrayOfMovies === null) {
  arrayOfMovies = [];
} else {
  for (i = 0; i < arrayOfMovies.length; i++) {

    const listItem = $('<li class="list-group-item d-flex justify-content-between align-items-start">');
    const listDiv = $('<div class="ms-2 col-6">');
    const listDivItem = $('<div class="fw-bold">');
    const removeSpan = $('<button class="badge bg-danger rounded-pill">');
    listDivItem.text(arrayOfMovies[i].title);
    removeSpan.text("X");
    listItem.append(listDiv);
    listDiv.append(listDivItem);
    listDiv.append(arrayOfMovies[i].year);
    listItem.append(removeSpan)

    movieList.append(listItem);

    const smlPoster = $('<div class="smallPoster">');
    smlPoster.css({ 'background-image': `url(${arrayOfMovies[i].poster})` });
    bigPoster.append(smlPoster);

    let title = arrayOfMovies[i].title;
    let year = arrayOfMovies[i].year;
    let plot = arrayOfMovies[i].plot;
    let genre = arrayOfMovies[i].genre;
    let director = arrayOfMovies[i].director;
    let actors = arrayOfMovies[i].actors;
    let runtime = arrayOfMovies[i].runtime;
    let boxOffice = arrayOfMovies[i].boxOffice;

    smlPoster.on('click', () => {
      $('.modalTitle').text(`${title} - ${year}`);
      $('.modalPlot').text(plot);
      $('.modalGenre').text(genre);
      $('.modalDirector').text(director);
      $('.modalActors').text(actors);
      $('.modalRuntime').text(runtime);
      $('.modalBoxOffice').text(boxOffice);
      moreMovieDetails.modal("show");
    })

    removeSpan.on('click', () => {
      listItem.remove();
      smlPoster.remove();
    })

    console.log(arrayOfMovies)
  }
}

function chooseMovie(movie) {

  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

  fetch(queryURL)
    .then(function (response) {
      // this block will wait until fetch promise is fulfilled

      return response.json();
    }).then(function (data) {
      if (data.Title === undefined) {
        return movieNotFoundModal.modal("show");
      } else if (data.Title === "Null") {
        return
      }
      console.log(data)
      // Creation of list item
      const listItem = $('<li class="list-group-item d-flex justify-content-between align-items-start">');
      const listDiv = $('<div class="ms-2 col-6">');
      const listDivItem = $('<div class="fw-bold">');
      const removeSpan = $('<button class="badge bg-danger rounded-pill">');
      listDivItem.text(data.Title);
      removeSpan.text("X");
      listItem.append(listDiv);
      listDiv.append(listDivItem);
      listDiv.append(data.Year);
      listItem.append(removeSpan)

      movieList.append(listItem);

      // Creation of Movie Poster
      const smlPoster = $('<div class="smallPoster">');
      smlPoster.css({ 'background-image': `url(${data.Poster})` });
      bigPoster.append(smlPoster);

      smlPoster.on('click', () => {
        $('.modalTitle').text(`${data.Title} - ${data.Year}`);
        $('.modalPlot').text(data.Plot);
        $('.modalGenre').text(data.Genre);
        $('.modalDirector').text(data.Director);
        $('.modalActors').text(data.Actors);
        $('.modalRuntime').text(data.Runtime);
        $('.modalBoxOffice').text(data.BoxOffice);
        moreMovieDetails.modal("show");
        console.log(data.Title)
      })

      removeSpan.on('click', () => {
        movieIndex = arrayOfMovies.indexOf(movieForArray);
        arrayOfMovies.splice(movieIndex, 1);
        listItem.remove();
        smlPoster.remove();
      })

      const movieForArray = {
        title: data.Title,
        year: data.Year,
        actors: data.Actors,
        plot: data.Plot,
        genre: data.Genre,
        director: data.Director,
        runtime: data.Runtime,
        boxOffice: data.BoxOffice,
        poster: data.Poster
      }

      arrayOfMovies.push(movieForArray);
      console.log(arrayOfMovies)
    })
    .catch(error => {
      console.log(error)
    });
};

// add film button function
const addFilm = $('.add');

// movie input value
const movieInput = $('.movieInput');
const addMovieModal = $('#addMovieModal');

// Added function so that pressing enter clicks the add film button
movieInput.on("keypress", function (event) {
  if (event.key == 'Enter') {
    addFilm.click();
  }
})

addFilm.on('click', () => {
  if (arrayOfMovies.length === 9) {
    addMovieModal.modal("show");
  } else {
    chooseMovie(movieInput.val());
    movieInput.val("");
  }
});

closeModalBtn.on("click", function () {
  $('.modal').modal("hide");
})

// save list button function
const saveBtn = $('.saveBtn');
const saveMessage = $(".saveMessage");

saveBtn.on('click', () => {
  saveMessage.text("Your movie list has been saved!");

  localStorage.setItem("local-storage-data", JSON.stringify(arrayOfMovies));

  function emptyMessage() {
    saveMessage.text("");
  }

  setTimeout(emptyMessage, 3000);
})

// clear list button function
const clearBtn = $('.clearBtn');

clearBtn.on('click', () => {
  saveMessage.text("Your movie list has been cleared!");

  localStorage.clear();

  movieList.html("");

  bigPoster.html("");

  arrayOfMovies = [];

  function emptyMessage() {
    saveMessage.text("");
  }

  setTimeout(emptyMessage, 3000);
});
