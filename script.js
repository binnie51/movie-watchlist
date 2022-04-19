
let searchBtn = $("#searchBtn");
let moviesCard = $(".movie-cards");
let modal$ = $ ('.modal').modal();

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
                let container = $("<div>", { class: 'col s3 m3' });

                let card = $("<div>", { class: 'card' });

                let imgTag = $("<div>", { class: 'card-image' });

                let poster = $("<img>", { src: movie.Poster, height: 532 });

                let cardTitle = $("<span>", { class: 'card-title' });
                cardTitle.text(movie.Title);
                imgTag.append(poster);
                card.append(imgTag);
                imgTag.append(cardTitle);

                let trailer = $("<div>", { class: 'card-action' });

                let trailerBtn = $("<button>", { class: 'btn trailerBtn' });
                trailerBtn.data('data', movie.imdbID)
                trailerBtn.text("Trailer");
                trailer.append(trailerBtn);

                let descriptionBtn = $("<button>", { class: 'btn descriptionBtn' });
                descriptionBtn.text("Description");

                trailer.append(descriptionBtn);
                card.append(trailer);
                container.append(card);
                moviesCard.append(container);
            })
        });
});

function renderTrailerByImdbId(imdbId) {
    console.log('click')
    let moviesUrl = "https://imdb-api.com/en/API/Trailer/k_g52895d2/" + imdbId
    fetch(moviesUrl)
        .then(function(response) {
            return response.json();
        })


    .then(function (data) {
      console.log(data);
      modal$.empty();   
      let modalContent = $("<div>", { class: 'modal-content'});
      let modalHeader = $("<h4>");
      modalHeader.text(data.fullTitle)
      modalContent.append(modalHeader)
      let iframe = $("<iframe>")
      iframe.attr('src', data.linkEmbed);
      iframe.attr('height', "720px");
      iframe.attr('width', "1280px");
      modalContent.append(iframe)
      modal$.append(modalContent)
        $('#modal1').modal('open')  

    })
}
//event listener for play button to retrieve trailer data on click
$(document).on('click', '.trailerBtn', function(e) {
    const imdbId = $(e.target).data('data')
    renderTrailerByImdbId(imdbId)
});




//target add to watchlist button and add event listener
// let selectTitle = document.querySelector(".watchlistBtn");
// selectTitle.addEventListener("click", addWatchlist);
//local storage functions -- still needs data and a place to render
function addWatchlist() {
    console.log("test");
    localStorage.setItem("selectTitle", JSON.stringify(selectTitle));
};

function getWatchlist() {
    localStorage.getItem("selectTitle")
    return JSON.parse(selectTitle);
};