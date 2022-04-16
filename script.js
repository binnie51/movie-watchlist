console.log("test");

// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=528cb2fd
// API key: 528cb2fd

// writing function to fetch url through te use of async and await ln:27 
let searchBtn = $("#searchBtn");
let trailerID;
searchBtn.on("click", function() {
    console.log("click");
    let title = $("input").val();
    let requestUrl = "http://www.omdbapi.com/?s=" + title + "&apikey=528cb2fd"
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
                // let title = data.Title();
            console.log(title)


            let moviesUrl = "http://www.omdbapi.com/?i=" + data.Search[0].imdbID + "&apikey=528cb2fd"
            return fetch(moviesUrl)
        })

    .then(async function(response) {
        var data = await response.json();
        console.log(data)
        trailerID = data.imdbID;
        getTrailer();
    })
});

// var for key value pairs
// var movieDetail = {
//     title: title,
//     director: data.Director,
    
// }

let playBtn = $("#playBtn");
const imdbAPIKey = "k_g52895d2";

async function getTrailer() {
    console.log("click");
    let requestUrl = "https://imdb-api.com/en/API/Trailer/k_g52895d2/" + trailerID;
    var response = await fetch(requestUrl);
    var data = await response.json();
    console.log(data)
    console.log(data.linkEmbed);
    document.querySelector(".myTrailer").src = data.linkEmbed;



}
playBtn.on("click", getTrailer)
