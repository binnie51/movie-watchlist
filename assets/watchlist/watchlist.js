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

        let container$ = $("<div>", { class: 'col s12 m4 center'});
        let card$ = $("<div>", { class: 'card', width: 450 });
        let imgTag$ = $("<div>", { class: 'card-image' });
        let poster$ = $("<img>", { src: watchlist[i].poster, height: 532, width: 450 });
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