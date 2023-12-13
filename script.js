let arrayOfMovies = JSON.parse(localStorage.getItem("local-storage-data"));

if (arrayOfMovies === null) {
  arrayOfMovies = [];
} else {
  for (i = 0; i < arrayOfMovies.length; i++) {
    console.log(arrayOfMovies[i].title)

    const tableRow = $('<tr>');

    const title = $('<td>');
    title.text(arrayOfMovies[i].title);

    const year = $('<td>');
    year.text(arrayOfMovies[i].year);

    const actors = $('<td>');
    actors.text(arrayOfMovies[i].actors);

    const plot = $('<td>');
    plot.text(arrayOfMovies[i].plot);

    const poster = $('<td id="posters">');
    poster.css('text-align', 'center');
    const img = $('<img id="posterImg">');
    img.attr('src', arrayOfMovies[i].poster);
    img.css('height', '200px');
    poster.append(img);

    const rating = $('<td id="rating">');
    rating.attr('width', '15%');
    const ratingButton = $('<button>');
    ratingButton.addClass('rating btn btn-warning');
    ratingButton.text(arrayOfMovies[i].rating);
    rating.append(ratingButton);

    tableRow.append(title, year, actors, plot, poster, rating);

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
      console.log(data);

      // Create and save a reference to new empty table row
      const tableRow = $('<tr>');
      tableRow.attr('scope', 'row');

      // Create and save references to 3 td elements containing the Title, Year, and Actors from the Fetch response object
      const title = $('<td>');
      title.attr('width', "10%");
      title.text(data.Title);

      const year = $('<td>');
      year.attr('width', "5%");
      year.text(data.Year);

      const actors = $('<td>');
      actors.attr('width', "20%");
      actors.text(data.Actors);

      const plot = $('<td>');
      plot.attr('width', "35%");
      plot.text(data.Plot);

      const poster = $('<td id="posters">');
      poster.attr('width', '15%');
      poster.css('text-align', 'center');
      const img = $('<img id="posterImg">');
      img.attr('src', data.Poster);
      img.css('height', '200px');
      poster.append(img);

      const rating = $('<td id="rating">');
      rating.attr('width', '15%');
      const ratingButton = $('<button>');
      ratingButton.addClass('rating btn btn-warning');
      ratingButton.text("Rate");
      rating.append(ratingButton);

      ratingButton.on('click', () => {
        let userRating = prompt("Out of 10, what would you rate this film?");
        if (userRating < 0 || userRating > 10) {
          do {
            userRating = prompt("Please enter a rating between 0 - 10");
          }
          while (userRating < 0 || userRating > 10);
        }
        ratingButton.text(userRating);
        movieForArray.rating = userRating;
      });

      // Append the td elements to the new table row
      tableRow.append(title, year, actors, plot, poster, rating);

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

      console.log(arrayOfMovies);

    })
    .catch(function (response) {
    });
};

// add film button function
const addFilm = $('.add');

addFilm.on('click', () => {
  chooseMovie(prompt("Add a film"));
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

  function emptyMessage() {
    saveMessage.text("");
  }

  setTimeout(emptyMessage, 3000);
});
