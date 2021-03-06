// Global Variables
//--------------------------------------------------------------------------------

// allows access to keys.js, which contains my twitter api keys.
var keys = require("./keys.js");

// allows access to twitter, request, spotify, and fs node packages
var Twitter = require("twitter");
var Request = require("request");
var Spotify = require('node-spotify-api');
var fs = require("fs");


// variable for the question being asked lir
// i.e. "spotify-this-song" or "my-tweets"
var question = process.argv[2];

// variable for the search term following the question
// either a song title or movie name
var searchTerm = process.argv[3];

// variable that will change teh search term if 
// the "do-what-it-says" command is executed
var readFile = false;

// variable for counting the results from commands
var num = 0;

// Functions
//--------------------------------------------------------------------------------


// function for "my-tweets"
function searchTweets() {
	console.log("finding my tweets...");
	console.log("-----------------------------------------------------------");

	var client = new Twitter(keys.twitterKeys);

	var params = {screen_name: 'etuck94'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
  			// for loop to loop through 20 tweets
  			for (i=0; i<20; i++) {
  				num++;

  				console.log(num);
  				console.log(tweets[i].created_at);
  				console.log(tweets[i].text);
 				console.log("-----------------------------------------------------------");
  			}
  		}
  		num = 0;
	});

}


// function for "movie-this"
function searchMovie() {
	console.log("Finding your movie...");
	console.log("-----------------------------------------------------------");

	// if there is no searchTerm, use "Mr Nobody" as default
	if (!searchTerm) {
		searchTerm = "Mr Nobody";
	}

	Request("http://www.omdbapi.com/?t="+searchTerm+"&y=&plot=short&apikey=40e9cece", function(error, response, body) {
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


// function for "spotify-this-song"
function searchSong() {
	console.log("Searching Spotify...");
 	console.log("-----------------------------------------------------------");

 	// unique spotify credentials
	var spotify = new Spotify({
  		id: "7c7499d95f314e409780538e24ed9809",
  		secret: "f8685b1c922a4f169edf1e5e83b31681",
	});

	// Readfile is set to true when the read function is run
	if (readFile === true) {
		searchTerm = "I want it that way";
		readFile = false;
	}
	// if there is no searchTerm, use "the sign" as default
	if (!searchTerm) {
		searchTerm = "the sign";
	}


 	// search spotify for track name, limit results to 20.
	spotify.search({ type: 'track', query: searchTerm, limit: 20 }, function(err, data) {
  		if (err) {
  			console.log("Sorry, we are having trouble finding your song");
    		return console.log('Error occurred: ' + err);
  		}
  		// will print out 5 results to save space
 		for (i=0; i<20; i++) {
 			num++

 			// prints out the track, artsit, and album name, and the spotify url
 			console.log(num);
 			console.log(JSON.stringify("Track Name: " + data.tracks.items[i].name, null, 2));
 			console.log(JSON.stringify("Artist Name: " + data.tracks.items[i].album.artists[0].name, null, 2));
 			console.log(JSON.stringify("Album Name: " + data.tracks.items[i].album.name, null, 2));
 			console.log(JSON.stringify("URL: " + data.tracks.items[i].album.artists[0].external_urls.spotify, null, 2));
 			console.log("-----------------------------------------------------------");
 		}		 
	});
	num = 0;
}


// function for "do-what-it-says"
function read() {
	console.log("Doing what it says...");
	console.log("-----------------------------------------------------------");

	readFile = true;

	// reads from file random txt
	fs.readFile("random.txt", "utf8", function(error, data) {
			console.log(data);
			// search spotify
			searchSong();
	});

}




// Main Process
//--------------------------------------------------------------------------------

// switch statement determines which question liri is being asked.
switch(question) {
	case "my-tweets":
		// searchs twitter for recent tweets
		searchTweets();
		break;
	case "spotify-this-song":
		// searchs spotify for songs based on the searchTerm user input
		searchSong();
		break;
	case "movie-this":
		// searchs OMDB for movie title based on search parameter
		searchMovie();
		break;
	case "do-what-it-says":
		// reads file using fs, and runs search spotify
		read();
		break;
	default:
		// if liri doesnt recognize a command, this is the default statement
		console.log("Liri doesnt know how to do that");
}

