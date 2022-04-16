console.log("test");

// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=528cb2fd
// API key: 528cb2fd


// 

let searchBtn = $("#searchBtn");

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

        }).then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
        })
});

