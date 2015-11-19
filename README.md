# CartoTweets
Connect your CartoDB account with Twitter. A docker way.

Quick Start
-----------

First you need:

* A CartoDB account:

 TODO: get CartoDB apikey instructions

* A Twitter account:

 TODO: get Twitter necessary KEYs and SECRETs instructions

Once you have your credentials, just build the docker:

```bash
docker build -t "cartotweets" .
```

And the run it with the proper globals defined:

```bash
docker run \
    -e TWITTER_CONSUMER_KEY=<your_twitter_consumer_key> \
    -e TWITTER_CONSUMER_SECRET=<your_twitter_consumer_secret> \
    -e TWITTER_TOKEN_KEY=<your_twitter_token_key> \
    -e TWITTER_TOKEN_SECRET=<your_twitter_token_secret> \
    -e CARTODB_USER=<your_cartodb_user> \
    -e CARTODB_APIKEY=<your_cartodb_apikey> \
 -it "cartotweets"
```
