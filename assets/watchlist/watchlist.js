//let watchlist = [];
let showWatchlist = $(".savedtitles")
let clear = $(".clearBtn")
let $clearList = $("#clearList")

//first get pre-existing movies from local storage otherwise create new array
$(document).ready(function() {
    let storedList = localStorage.getItem("watchlist");
    let watchlist = [];
    if (watchlist) {
        watchlist = JSON.parse(storedList);
        console.log(watchlist)

        for(var i = 0; i < watchlist.length; i++){

        // let container$ = $("<div>", { class: 'col'});
        let card$ = $("<div>", { class: 'card horizontal'});
        let imgTag$ = $("<div>", { class: 'card-image' });
        let poster$ = $("<img>", { src: watchlist[i].poster, width: 225, height: 266});
        
        let movieCardContent = $("<div>", {class:'card-content'});

        let title = $("<h5>");
        let year = $("<h6>");
        let director = $("<h6>");

        // popoulate card 
        title.html(watchlist[i].title);
        year.html(watchlist[i].year);
        director.html(watchlist[i].director);

        imgTag$.append(poster$);
        movieCardContent.append(title);
        movieCardContent.append(year);
        movieCardContent.append(director);
        
        card$.append(imgTag$);
        card$.append(movieCardContent);
        showWatchlist.append(card$);
        }
    }
            else {
                watchlist = [];
            }
  
    
    
    console.log("loaded watchlist", watchlist);
    
});