// allows access to keys.js, which contains my twitter api keys.
var keys = require("./keys.js");

// varaibles to store api keys from keys.js
var consumer_key = keys.twitterKeys.consumer_key;
var consumer_secret = keys.twitterKeys.consumer_secret;
var access_token_key = keys.twitterKeys.access_token_key;
var access_token_secret = keys.twitterKeys.access_token_secret;

console.log(process.argv);