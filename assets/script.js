let searchBtn = $("#searchBtn");
let moviesCard = $(".movie-cards");
let modal$ = $('.modal').modal();
let movieDescription = $('.modal').modal();

let trailerID;
//add click event listener ffor main search function
searchBtn.on("click", function() {
    //assign variable, targeting input value in DOM
    let title = $("input").val();

    //assign variable to URL, concatenating title and APIkey
    let requestUrl = "http://www.omdbapi.com/?s=" + title + "&apikey=528cb2fd";
    //perform an API Call to request and return JSON data from OMDB
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            moviesCard.html("");
            data.Search.forEach(function(movie) {
                let container = $("<div>", { class: 'col s3 m4' });
                let card = $("<div>", { class: 'card', width: 450 });
                let imgTag = $("<div>", { class: 'card-image' });
                let poster = $("<img>", { src: movie.Poster, height: 532, width: 450 });
                let cardTitle = $("<span>", { class: 'card-title' });

                cardTitle.text(movie.Title);
                imgTag.append(poster);
                card.append(imgTag);
                imgTag.append(cardTitle);

                let trailer = $("<div>", { class: 'card-action' });
                let trailerBtn = $("<button>", { class: 'btn trailerBtn' });

                trailerBtn.data('data', movie.imdbID);
                trailerBtn.text("Trailer");
                trailer.append(trailerBtn);

                let descriptionBtn = $("<button>", { class: 'btn descriptionBtn' });

                descriptionBtn.text("Description");
                descriptionBtn.data('data', movie.imdbID);

                //add button to add watchlist
                let watchlistBtn = $("<button>", { class: 'btn addWatchlistBtn' });

                watchlistBtn.html(`<i class="material-icons">add_circle_outline</i>`)
                watchlistBtn.data('data', movie.imdbID);

                trailer.append(descriptionBtn);
                trailer.append(watchlistBtn);
                card.append(trailer);
                container.append(card);
                moviesCard.append(container);
            });
        });
});

function renderTrailerByImdbId(imdbId) {
    console.log('click');
    let moviesUrl = "https://imdb-api.com/en/API/Trailer/k_g52895d2/" + imdbId;
    fetch(moviesUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            modal$.empty();

            let modalContent = $("<div>", { class: 'modal-content' });
            let modalHeader = $("<h4>");

            modalHeader.text(data.fullTitle);
            modalContent.append(modalHeader);

            let iframe = $("<iframe>");

            iframe.attr('src', data.linkEmbed);
            iframe.attr('height', "720px");
            iframe.attr('width', "1280px");
            modalContent.append(iframe);
            modal$.append(modalContent);

            $('#modal1').modal('open');

        });
};

// show description on id "modal2"
function renderDescriptionbyImdb(imdbId) {
    console.log('click')
    let moviesUrl = "http://www.omdbapi.com/?i=" + imdbId + "&apikey=528cb2fd"

    fetch(moviesUrl)
        .then(function(response) {
            console.log(response);
            return response.json();
        })

    .then(function(data) {
        console.log("data: ", data);
        test = data
        movieDescription.empty();

        let descriptionContent = $("<div>", { class: 'modal-content' });
        let descriptionHeader = $("<h4>");

        descriptionHeader.text(data.Title);
        descriptionContent.append(descriptionHeader);


        let directorName = $('<h5>');
        let year = $('<h5>');
        let runTime = $('<h5>');
        let rating = $('<h5>');
        let plot = $("<p>");

        directorName.text("Director: " + data.Director);
        year.text("YR: " + data.Year);
        runTime.text("Run Time:" + data.Runtime);
        rating.text("Rating: " + data.imdbRating);
        plot.text(data.Plot);

        descriptionContent.append(directorName);
        descriptionContent.append(year);
        descriptionContent.append(runTime);
        descriptionContent.append(rating);
        descriptionContent.append(plot);

        movieDescription.append(descriptionContent);


        $('#modal1').modal('open');

    });
};
function renderWatchListbyImdb(imdbId) {
    console.log('click')
    let moviesUrl = "http://www.omdbapi.com/?i=" + imdbId + "&apikey=528cb2fd"

    fetch(moviesUrl)
        .then(function(response) {
            console.log(response);
            return response.json();
        })

    .then(function(data) {
        console.log("data: ", data);
        let storelist = {
            poster: data.Poster,
            title: data.Title,
            year: data.Year,
            runtime: data.Runtime,
            rated: data.Rated,
            plot: data.Plot
        }
        watchlist.push(storelist);
        //save movie data to local storage
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        console.log("saved to watchlist", storelist);
        $('#modal1').modal('open');

    });
};


//event listener for play button to retrieve trailer data on click
$(document).on('click', '.trailerBtn', function(e) {
    const imdbId = $(e.target).data('data');

    renderTrailerByImdbId(imdbId);
});

//add watchlist button to add data to watchlist.html file
//target add to watchlist button and add event listener
$(document).on('click', '.addWatchlistBtn', function(e) {
    let imdbId = $(e.currentTarget).data('data');
    renderWatchListbyImdb(imdbId)
    //add movie data to watchlist array
   
});

// event listener for movies descriptions 
$(document).on('click', '.descriptionBtn', function(e) {
    const imdbId = $(e.target).data('data');
    console.log(imdbId);
    renderDescriptionbyImdb(imdbId);

});

//define watchlist globally
let watchlist = null;
//first get pre-existing movies from local storage otherwise create new array
$(document).ready(function() {
    watchlist = localStorage.getItem("watchlist");
    if (watchlist != null) {
        watchlist = JSON.parse(watchlist);
    } else {
        watchlist = [];
    }
    console.log("loaded watchlist", watchlist);
});

//render local storage to watchlist.html