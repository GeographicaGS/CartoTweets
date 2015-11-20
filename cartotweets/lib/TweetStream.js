var Twitter = require("twitter");
var CONFIG = require('../config');

var l = require('log4js').getLogger();
l.setLevel(CONFIG.log_level);

function TweetStream(auth_config, stream_options){
    //Init Stream API
    var twitter = new Twitter(auth_config);
    var stream_path = "statuses/filter";

    //Public methods
    this.startStream = function(callback){
        twitter.stream(stream_path, stream_options, function(stream) {
            stream.on('data', function(tweet) {
                callback(tweet);
            });
            stream.on('error', function(err){
                l.error(err);
            });
        });
    };
}

module.exports = TweetStream;
