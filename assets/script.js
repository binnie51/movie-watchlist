let searchBtn = $("#searchBtn");
let moviesCard = $(".movie-cards");
let modal$ = $('.modal').modal();
let movieDescription = $('.modal').modal();
var container = $(".container");

let trailerID;
//add click event listener ffor main search function
searchBtn.on("click", function() {
    //assign variable, targeting input value in DOM
    let title = $("input").val();

    //assign variable to URL, concatenating title and APIkey
    let requestUrl = "https://www.omdbapi.com/?s=" + title + "&apikey=528cb2fd";
    //perform an API Call to request and return JSON data from OMDB
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            moviesCard.html("");
            data.Search.forEach(function(movie) {
                let container = $("<div>", { class: 'col l4 m6 s12' });
                let card = $("<div>", { class: 'card hoverable', width: 450 });
                let imgTag = $("<div>", { class: 'card-image' });
                let poster = $("<img>", { src: movie.Poster, height: 532, width: 450 });
                let cardTitle = $("<span>", { class: 'card-title' });

                cardTitle.text(movie.Title);
                imgTag.append(poster);
                card.append(imgTag);
                imgTag.append(cardTitle);

                // trailer button
                let trailer = $("<div>", { class: 'card-action' });
                let trailerBtn = $("<button>", { class: 'btn trailerBtn' });

                trailerBtn.data('data', movie.imdbID);
                trailerBtn.text("Trailer");

                // movies description button
                let descriptionBtn = $("<button>", { class: 'btn descriptionBtn' });

                descriptionBtn.text("Description");
                descriptionBtn.data('data', movie.imdbID);

                // button to add watchlist
                let watchlistBtn = $("<button>", { class: 'btn addWatchlistBtn' });

                watchlistBtn.html(`<i class="material-icons">add_circle_outline</i>`)
                watchlistBtn.data('data', movie.imdbID);

                trailer.append(trailerBtn);
                trailer.append(descriptionBtn);
                trailer.append(watchlistBtn);

                card.append(trailer);
                container.append(card);
                moviesCard.append(container);
            });
        });
});

// Show trailers 
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

            let modalContent = $("<div>", { class: 'modal-content trailer-modal-content' });
            let modalHeader = $("<h4>");
            let vidCon = $("<div>", { class: 'video-container' });

            // Close Modal
            let closeModal = $("<div>", {class: 'modal-footer'});
            let closeBtn = $('<a>', {href: "#!", class: 'modal-close waves-effect waves-green btn-flat'})

            modalHeader.text(data.fullTitle);
            modalContent.append(modalHeader);
            
            closeBtn.text("Close");
            closeModal.append(closeBtn);

            let iframe = $("<iframe>");

            iframe.attr('src', data.linkEmbed);
            iframe.attr('height', "480px");
            iframe.attr('width', "853px");
            vidCon.append(iframe);
            modalContent.append(vidCon);
            modalContent.append(closeModal);
            modal$.append(modalContent);

            $('#modal1').modal('open');

        });
};

// show description on id "modal1"
function renderDescriptionbyImdb(imdbId) {
    console.log('click')
    let moviesUrl = "https://www.omdbapi.com/?i=" + imdbId + "&apikey=528cb2fd"

    fetch(moviesUrl)
        .then(function(response) {
            console.log(response);
            return response.json();
        })

    .then(function(data) {
        console.log("data: ", data);
        test = data
        movieDescription.empty();

        let descriptionContent = $("<div>", { class:'description-modal-content' });
        let descriptionHeader = $("<h3>");

        descriptionHeader.text(data.Title);
        descriptionContent.append(descriptionHeader);

        // Close Modal
        let closeModal = $("<div>", {class: 'modal-footer'});
        let closeBtn = $('<a>', {href: "#!", class: 'modal-close waves-effect waves-green btn-flat'})

        let directorName = $('<p>');
        let year = $('<p>');
        let runTime = $('<p>');
        let rating = $('<p>');
        let plot = $("<p>");

        directorName.text("Director: " + data.Director);
        year.text("Year: " + data.Year);
        runTime.text("Running Time:" + data.Runtime);
        rating.text("Rating: " + data.imdbRating);
        plot.text(data.Plot);

        descriptionContent.append(directorName);
        descriptionContent.append(year);
        descriptionContent.append(runTime);
        descriptionContent.append(rating);
        descriptionContent.append(plot);

        closeBtn.text("Close");
        closeModal.append(closeBtn);

        movieDescription.append(descriptionContent);
        movieDescription.append(closeModal);


        $('#modal1').modal('open');

    });
};

// Shows movies' trailer on "modal1"
function renderWatchListbyImdb(imdbId) {
    console.log('click')
    let moviesUrl = "https://www.omdbapi.com/?i=" + imdbId + "&apikey=528cb2fd"

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
            director: data.Director,
            rated: data.Rated,
            plot: data.Plot
        }
        watchlist.push(storelist);
        //save movie data to local storage
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        console.log("saved to watchlist", storelist);
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
    renderWatchListbyImdb(imdbId);
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