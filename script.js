// The below code fills in the first row of the table
// var movie = "Dune";
// var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

// fetch(queryURL)
//   .then(function (response) {
//     return response.json();
//   }).then(function (data) {
//     console.log(data);

//     // Create and save a reference to new empty table row
//     const tableRow = $('<tr>');

//     // Create and save references to 3 td elements containing the Title, Year, and Actors from the Fetch response object
//     const title = $('<td>');
//     title.text(data.Title);

//     const year = $('<td>');
//     year.text(data.Year);

//     const actors = $('<td>');
//     actors.text(data.Actors);

//     // Append the td elements to the new table row
//     tableRow.append(title, year, actors);

//     // Append the table row to the tbody element
//     const tbody = $('tbody');
//     tbody.append(tableRow);

//   });

// // Repeat the above logic to add rows for two more movies of your choice

// var movie = "Evil Dead";
// var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

// fetch(queryURL)
//   .then(function (response) {
//     return response.json();
//   }).then(function (data) {
//     console.log(data);

//     // Create and save a reference to new empty table row
//     const tableRow = $('<tr>');

//     // Create and save references to 3 td elements containing the Title, Year, and Actors from the Fetch response object
//     const title = $('<td>');
//     title.text(data.Title);

//     const year = $('<td>');
//     year.text(data.Year);

//     const actors = $('<td>');
//     actors.text(data.Actors);

//     // Append the td elements to the new table row
//     tableRow.append(title, year, actors);

//     // Append the table row to the tbody element
//     const tbody = $('tbody');
//     tbody.append(tableRow);

//   });

// var movie = "The Void";
// var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

// fetch(queryURL)
//   .then(function (response) {
//     return response.json();
//   }).then(function (data) {
//     console.log(data);

//     // Create and save a reference to new empty table row
//     const tableRow = $('<tr>');

//     // Create and save references to 3 td elements containing the Title, Year, and Actors from the Fetch response object
//     const title = $('<td>');
//     title.text(data.Title);

//     const year = $('<td>');
//     year.text(data.Year);

//     const actors = $('<td>');
//     actors.text(data.Actors);

//     // Append the td elements to the new table row
//     tableRow.append(title, year, actors);

//     // Append the table row to the tbody element
//     const tbody = $('tbody');
//     tbody.append(tableRow);

//   });

// BONUS: Once complete, try to make your code as DRY as possible through the use of functions

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

      // Create and save references to 3 td elements containing the Title, Year, and Actors from the Fetch response object
      const title = $('<td>');
      title.text(data.Title);

      const year = $('<td>');
      year.text(data.Year);

      const actors = $('<td>');
      actors.text(data.Actors);

      const plot = $('<td>');
      plot.text(data.Plot);

      const poster = $('<td id="posters">');
      poster.css('text-align', 'center');
      const img = $('<img id="posterImg">');
      img.attr('src', data.Poster);
      img.css('height', '200px');
      poster.append(img);
      console.log(data.Poster);

      // Append the td elements to the new table row
      tableRow.append(title, year, actors, plot, poster);

      // Append the table row to the tbody element
      const tbody = $('.table tbody');
      tbody.append(tableRow);

    })
    .catch(function (error) {
      // this block will run when promise operation failed and return an error
      console.log(error);
    });
};

// chooseMovie('Barbarian');
// chooseMovie('The Thing');
// chooseMovie('The Void');
// chooseMovie('Midsommar');
// chooseMovie('Scream');

// const whichFilm = chooseMovie(prompt("Add a film"));

const addFilm = $('.add');

addFilm.on('click', () => {
  chooseMovie(prompt("Add a film"));
});



