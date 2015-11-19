#!/bin/bash

source config.cnf

docker run \
	-e HASHTAGS=$hashtags \
	-e LOCATIONS=$locations \
	-e TABLENAME=$cartodb_tablename \
	-e BUFFER=$buffer_size \
	-e LOG_LEVEL=$log_level \
	-e TWITTER_CONSUMER_KEY=$twitter_consumer_key \
	-e TWITTER_CONSUMER_SECRET=$twitter_consumer_secret \
	-e TWITTER_TOKEN_KEY=$twitter_token_key \
	-e TWITTER_TOKEN_SECRET=$twitter_token_secret \
	-e CARTODB_USER=$cartodb_user \
	-e CARTODB_APIKEY=$cartodb_apikey \
 -it gettweets
