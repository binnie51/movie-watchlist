//define global variables
let searchBtn = $("#searchBtn");
let trailerID;
var apiKey = '528cb2fd';

// const childrenArray = [];


//add click event listener ffor main search function
searchBtn.on("click", function() {
    //assign variable, targeting input value in DOM
    let keyTerm = $("input").val();
    //assign variable to URL, concatenating title and APIkey
    let requestUrl = "http://www.omdbapi.com/?s=" + keyTerm + "&apikey=" + apiKey;
        //perform an API Call to request and return JSON data from OMDB
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })

    .then(function(data) {
            console.log(data) // search results


            
            // let title = data.Title();
            console.log(keyTerm)

            let moviesUrl = "http://www.omdbapi.com/?i=" + data.Search[0].imdbID + "&apikey=" + apiKey;
            return fetch(moviesUrl)
        })
        //perform an API call to request and return JSON data specific to title search
        //calling async request returns a promise
        .then(async function(response) {
            //and then when data is received, return as JSON
            var data = await response.json();
            console.log(data) 


        })
});

//assign variable to access play button in the DOM to play trailer
let playBtn = $("#playBtn");

//assign variable to provided API Key
const imdbAPIKey = "k_g52895d2";

//perform an API call to request data and return in JSON using async/await 
//on line 40 write async in front of function indicating that the code will not run in the order it is written. why? without that preface, the code will run without a received request. When it runs asynchronously, use "await" to ensure the code knows to run AFTER the data gets received.
async function getTrailer() {
    console.log("click");
    let requestUrl = "https://imdb-api.com/en/API/Trailer/k_g52895d2/" + trailerID;
    var response = await fetch(requestUrl);
    var data = await response.json();
    console.log(data)
    console.log(data.linkEmbed);
    //target DOM to embed trailer in iframe src
    document.querySelector(".myTrailer").src = data.linkEmbed;
}
//event listener for play button to retrieve trailer data on click
playBtn.on("click", getTrailer)

//target add to watchlist button and add event listener
let selectTitle = document.querySelector(".watchlistBtn");
selectTitle.addEventListener("click", addWatchlist);
//local storage functions -- still needs data and a place to render
function addWatchlist() {
    console.log("test");
    localStorage.setItem("selectTitle", JSON.stringify(selectTitle));
};

function getWatchlist() {
    localStorage.getItem("selectTitle")
    return JSON.parse(selectTitle);
};