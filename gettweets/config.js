config = {
    log_level: process.env.LOG_LEVEL, // ALL | DEBUG | INFO | WARN | ERROR | FATAL | OFF
    buffer_size: process.env.BUFFER,
    tweets_table_name: process.env.TABLENAME,

    twitter_auth_config : {
	   "consumer_key": process.env.TWITTER_CONSUMER_KEY,
	   "consumer_secret": process.env.TWITTER_CONSUMER_SECRET,
	   "access_token_key": process.env.TWITTER_TOKEN_KEY,
	   "access_token_secret": process.env.TWITTER_TOKEN_SECRET
	},

    cartodb_auth_config : {
        user: process.env.CARTODB_USER,
        apiKey: process.env.CARTODB_APIKEY
    }
}

module.exports = config;
