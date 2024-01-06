let arrayOfMovies = JSON.parse(localStorage.getItem("local-storage-data"));
const bigPoster = $('.bigPoster');
const movieList = $('.movieList');
const closeModalBtn = $('.closeModalBtn');
const movieNotFoundModal = $('#movieNotFoundModal');

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

      removeSpan.on('click', () => {
        listItem.remove();
        smlPoster.remove();
      })

      const movieForArray = {
        title: data.Title,
        year: data.Year,
        actors: data.Actors,
        plot: data.Plot,
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

addFilm.on('click', () => {
  if (arrayOfMovies.length === 9) {
    addMovieModal.modal("show");
  } else {
    chooseMovie(movieInput.val());
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