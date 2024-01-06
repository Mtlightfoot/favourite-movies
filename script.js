let arrayOfMovies = JSON.parse(localStorage.getItem("local-storage-data"));
const bigPoster = $('.bigPoster');
const movieList = $('.movieList');

if (arrayOfMovies === null) {
  arrayOfMovies = [];
} else {
  for (i = 0; i < arrayOfMovies.length; i++) {

    const tableRow = $('<tr>');

    const title = $('<td>');
    title.text(arrayOfMovies[i].title);

    const year = $('<td>');
    year.text(arrayOfMovies[i].year);

    const actors = $('<td>');
    actors.text(arrayOfMovies[i].actors);

    const plot = $('<td>');
    plot.text(arrayOfMovies[i].plot);

    const smlPoster = $('<div class="smallPoster">');
    smlPoster.css({ 'background-image': `url(${arrayOfMovies[i].poster})` });
    bigPoster.append(smlPoster);

    const rating = $('<td id="rating">');
    rating.attr('width', '15%');
    const ratingButton = $('<button>');
    ratingButton.addClass('rating btn btn-warning col-12');
    if (ratingButton.textContent === undefined) {
      ratingButton.text("Rate");
    } else {
      ratingButton.text(arrayOfMovies[i].rating);
    }

    rating.append(ratingButton);

    // const removeMovie = $('<button>');
    // removeMovie.addClass('removeMovie btn btn-danger col-12 mt-3');
    // removeMovie.text('Remove');
    // rating.append(removeMovie);

    ratingButton.on('click', () => {
      let userRating = prompt("Out of 10, what would you rate this film?");
      if (userRating < 0 || userRating > 10) {
        do {
          userRating = prompt("Please enter a rating between 0 - 10");
        }
        while (userRating < 0 || userRating > 10);
      }
      ratingButton.text(userRating);
      console.log(userRating)
      console.log(arrayOfMovies)
    });

    tableRow.append(title, year, actors, plot, rating);

    const tbody = $('.table tbody');
    tbody.append(tableRow);

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
        return alert("Movie not found, please check your spelling!")
      } else if (data.Title === "Null") {
        return
      }

      // Creation of list item
      const listItem = $('<li class="list-group-item d-flex justify-content-between align-items-start">');
      const listDiv = $('<div class="ms-2 col-6">');
      const listDivItem = $('<div class="fw-bold">');
      const removeSpan = $('<span class="badge bg-danger rounded-pill">');
      listDivItem.text(data.Title);
      removeSpan.text("X");
      listItem.append(listDiv);
      listDiv.append(listDivItem);
      listDiv.append(data.Year);
      listItem.append(removeSpan)

      movieList.append(listItem);

      const smlPoster = $('<div class="smallPoster">');
      smlPoster.css({ 'background-image': `url(${data.Poster})` });
      bigPoster.append(smlPoster);

      // const rating = $('<td id="rating">');
      // const ratingButton = $('<button>');
      // ratingButton.addClass('rating btn btn-warning col-12');
      // ratingButton.text("Rate");
      // rating.append(ratingButton);

      // ratingButton.on('click', () => {
      //   let userRating = prompt("Out of 10, what would you rate this film?");
      //   if (userRating < 0 || userRating > 10) {
      //     do {
      //       userRating = prompt("Please enter a rating between 0 - 10");
      //     }
      //     while (userRating < 0 || userRating > 10);
      //   }
      //   ratingButton.text(userRating);
      //   movieForArray.rating = userRating;
      // });

      const removeMovie = $('<button>');
      removeMovie.addClass('removeMovie btn btn-danger col');
      removeMovie.text('Remove');
      // rating.append(removeMovie);

      removeMovie.on('click', () => {
        tableRow.remove();
      })

      // Append the td elements to the new table row
      tableRow.append(title, year, removeMovie);

      // Append the table row to the tbody element
      const tbody = $('.table tbody');
      tbody.append(tableRow);

      const movieForArray = {
        title: data.Title,
        year: data.Year,
        actors: data.Actors,
        plot: data.Plot,
        poster: data.Poster
      }

      arrayOfMovies.push(movieForArray);

    })
    .catch(error => {
      console.log(error)
    });
};

// add film button function
const addFilm = $('.add');

// movie input value
const movieInput = $('.movieInput');

addFilm.on('click', () => {
  chooseMovie(movieInput.val());
});

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
const tBody = $('.tableBody');

clearBtn.on('click', () => {
  saveMessage.text("Your movie list has been cleared!");

  localStorage.clear();

  tBody.html("");

  arrayOfMovies = [];

  function emptyMessage() {
    saveMessage.text("");
  }

  setTimeout(emptyMessage, 3000);
});

// Array for saving big poster

// let z = 0;

// createPosterBtn.on('click', function () {
//   // if (arrayOfMovies.length === 9) {
//   //   bigPoster.removeAttr('hidden');
//   // } else {
//   //   alert("You must have exactly 9 movies in your list")
//   //   bigPoster.attr('hidden', 'hidden');
//   // }

//   const allPosters = [];

//   $('.smallPoster').each(function () {
//     const posters = arrayOfMovies[z].poster;
//     allPosters.push(posters);
//     $(this).css({ 'background-image': `url(${posters})` });
//     z++;
//   })

// });