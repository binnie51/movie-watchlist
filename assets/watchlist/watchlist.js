//let watchlist = [];
let showWatchlist = $(".savedtitles")
//first get pre-existing movies from local storage otherwise create new array
$(document).ready(function() {
    let storedList = localStorage.getItem("watchlist");
    let watchlist = [];
    if (watchlist) {
        watchlist = JSON.parse(storedList);
        console.log(watchlist)

        for(var i = 0; i < watchlist.length; i++){

        let container$ = $("<div>", { class: 'col s4 m4' });
        let card$ = $("<div>", { class: 'card' });
        let imgTag$ = $("<div>", { class: 'card-image' });
        let poster$ = $("<img>", { src: watchlist[i].poster, height: 532 });
        let cardTitle$ = $("<div>", { class: 'card-title' });
        let cardYear$ = $("<div>", { class: 'card-title' });
        let cardRuntime$ = $("<div>", { class: 'card-title' });
        let cardPlot$ = $("<div>", { class: 'card-title' });
        cardTitle$.text("Title: " + watchlist[i].title);
        cardYear$.text("Year:" +watchlist[i].year);
        cardRuntime$.text("Runtime: "+ watchlist[i].runtime);
        cardPlot$.text("Review: " + watchlist[i].plot);
        imgTag$.append(poster$);
        card$.append(imgTag$);
        card$.append(cardTitle$);
        card$.append(cardYear$);
        card$.append(cardRuntime$);
        card$.append(cardPlot$);

        container$.append(card$);
        showWatchlist.append(container$);
            }}
            else {
                watchlist = [];
            
            }
  
    
    
    console.log("loaded watchlist", watchlist);
});

// let container$ = $("<div>", { class: 'col s12' });
// let card$ = $("<div>", { class: 'card' });



// let imgTag$ = $("<div>", { class: 'card-image' });
// let poster$ = $("<img>", { src: watchlist.Poster, height: 532 });
// let cardTitle$ = $("<span>", { class: 'card-title' });


// cardTitle$.text(watchlist.Title);
// imgTag$.append(poster$);
// card$.append(imgTag$);
// imgTag$.append(cardTitle$);
// cardTitle$.append(showWatchlist);

// let container = $("<div>", { class: 'col s3 m3' });
//                 let card = $("<div>", { class: 'card' });
//                 let imgTag = $("<div>", { class: 'card-image' });
//                 let poster = $("<img>", { src: movie.Poster, height: 532 });
//                 let cardTitle = $("<span>", { class: 'card-title' });

// cardTitle.text(movie.Title);
// imgTag.append(poster);
// card.append(imgTag);
// imgTag.append(cardTitle);

// let trailer = $("<div>", { class: 'card-action' });
// let trailerBtn = $("<button>", { class: 'btn trailerBtn' });

// trailerBtn.data('data', movie.imdbID);
// trailerBtn.text("Trailer");
// trailer.append(trailerBtn);

// let descriptionBtn = $("<button>", { class: 'btn descriptionBtn' });

// descriptionBtn.text("Description");
// descriptionBtn.data('data', movie.imdbID);

// //add button to add watchlist
// let watchlistBtn = $("<button>", { class: 'btn addWatchlistBtn' });

// watchlistBtn.html(`<i class="material-icons">add_circle_outline</i>`).data({
//     poster: movie.Poster,
//     title: movie.Title,
//     year: movie.Year,
//     runtime: movie.Runtime,
//     rated: movie.Rated,
//     plot: movie.plot
// });

// trailer.append(descriptionBtn);
// trailer.append(watchlistBtn);
// card.append(trailer);
// container.append(card);
// moviesCard.append(container);

//render local storage to watchlist.html