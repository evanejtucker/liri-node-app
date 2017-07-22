// Global Variables
//--------------------------------------------------------------------------------

// allows access to keys.js, which contains my twitter api keys.
var keys = require("./keys.js");

// allows access to twitter, request, and spotify node packages
var twitter = require("twitter");
var request = require("request");

// varaibles to store api keys from keys.js
var consumer_key = keys.twitterKeys.consumer_key;
var consumer_secret = keys.twitterKeys.consumer_secret;
var access_token_key = keys.twitterKeys.access_token_key;
var access_token_secret = keys.twitterKeys.access_token_secret;

// variable for the question being asked lir
// i.e. "spotify-this-song" or "my-tweets"
var question = process.argv[2];

// variable for the search term following the question
// either a song title or movie name
var searchTerm = process.argv[3];



// Functions
//--------------------------------------------------------------------------------

function searchTweets() {
	console.log("finding my tweets...");
	
	// adding twitter credentials
	var client = new twitter({
	  consumer_key: process.env.consumer_key,
	  consumer_secret: process.env.consumer_secret,
	  access_token_key: process.env.access_token_key,
	  access_token_secret: process.env.access_token_secret
	});

	client.get('search/tweets', {q: "node.js"}, function(error, tweets, response) {
	  // if(error) throw error;
	  console.log(tweets);  // The favorites. 
	  console.log(JSON.stringify(response, null, 2));  // Raw response object. 
	});

}

function searchMovie() {
	console.log("Finding your movie...");

	request("http://www.omdbapi.com/?t="+searchTerm+"&y=&plot=short&apikey=40e9cece", function(error, response, body) {
	  // If the request is successful (i.e. if the response status code is 200)
	  if (!error && response.statusCode === 200) {
	    // Parse the body of the site and recover just the imdbRating
	    console.log("Title: " + JSON.parse(body).Title);
	    console.log("Release Year: " + JSON.parse(body).Year);
	    console.log("Rating: " + JSON.parse(body).imdbRating);
	    console.log("Country: " + JSON.parse(body).Country);
	    console.log("Plot: " + JSON.parse(body).Plot);
	    console.log("Actors: " + JSON.parse(body).Actors);
	    console.log("Website: " + JSON.parse(body).Website);
	  }
	});
}

function searchSong() {
	console.log("Searching Spotify...");
}


// Main Process
//--------------------------------------------------------------------------------

switch(question) {
	case "my-tweets":
		searchTweets();
		break;
	case "spotify-this-song":
		searchSong();
		break;
	case "movie-this":
		searchMovie();
		break;
	case "do-what-it-says":
		console.log("Doing what it says...");
		break;
}

