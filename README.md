# CartoTweets
Connect your CartoDB account with Twitter. A docker way.

Quick Start
-----------

First you need:

* A CartoDB user and API Key:

 *Sing Up* or *Login* in [CartoDB](https://cartodb.com/), and then go to the **Your API Keys**
 option in your user menu to get the key string.

* A Twitter account:

 Well, probably you already have a Twitter Account (if you don't, it's [easy](https://twitter.com/)), so then you'll have to go to  [apps.twitter.com](https://apps.twitter.com) page and **create a Twitter App**.

 Follow the instructions, and finally you'll be able to access to a **Keys and Access Tokens** section in your new App settings page.

 There you'll have a **Application Settins** block, which corresponds to the **TWITTER_CONSUMER** *Key* and *Secret* strings, and **Your Access Token** block with the **TWITTER_TOKEN** *key* and *Secret* strings. That's all you need to connect your app to the Twitter API.

Once you have your credentials, just run:

```bash
docker run \
    -e HASHTAGS=<yourhashtag> \
    -e TWITTER_CONSUMER_KEY=<your_twitter_consumer_key> \
    -e TWITTER_CONSUMER_SECRET=<your_twitter_consumer_secret> \
    -e TWITTER_TOKEN_KEY=<your_twitter_token_key> \
    -e TWITTER_TOKEN_SECRET=<your_twitter_token_secret> \
    -e CARTODB_USER=<your_cartodb_user> \
    -e CARTODB_APIKEY=<your_cartodb_apikey> \
    -e CARTODB_MULTIUSER_ACCOUNT=false
 -it "geographica/cartotweets"
```

If you want to use a location as filter, for example filter tweets at San Francisco:
```bash
docker run \
    -e LOCATIONS=-122.75,36.8,-121.75,37.8 \
    -e TWITTER_CONSUMER_KEY=<your_twitter_consumer_key> \
    -e TWITTER_CONSUMER_SECRET=<your_twitter_consumer_secret> \
    -e TWITTER_TOKEN_KEY=<your_twitter_token_key> \
    -e TWITTER_TOKEN_SECRET=<your_twitter_token_secret> \
    -e CARTODB_USER=<your_cartodb_user> \
    -e CARTODB_APIKEY=<your_cartodb_apikey> \
    -e CARTODB_MULTIUSER_ACCOUNT=false
 -it "geographica/cartotweets"
```


I know, that's a huge command to write by hand in the console, filling parameter by parameter... And to make it worse, those are not all options that you can pass to the docker container.

Well, that's why both the **config.cnf** file and the **run.sh** script exists. Just take a look at them and you will understand it right away.

So a better way to run the docker after the build command is by filling the parameters in the *config.cnf* file
and then running:

```bash
chmod +x run.sh #if it doesn't have it already...
./run.sh
```

Then hopefully you'll see the output of the docker while the node module is getting a lot of tweets into a **tweets** dataset on your CartoDB account.

*Caveats:*
* *The changes could take a few minutes to appear in the CartoDB web interface.*
* If you use *hashtag* and *locations* filters, the Twitter API allways does an OR filter indeed, so some tweets with the hashtags could not be received, depending on the rate of tweets you're receiving due to the *locations* filter.

Options
-------

You can customize the module behavior by passing the following environment variables to the docker container:

* HASHTAGS

 A coma-separated list with the hashtags to filter the tweet stream. All tweets that contains at least one of the hashtags will be inserted. Since it uses CartoDB,  **only geolocated tweets will be inserted**.

* LOCATIONS

 Coordinates defining a [Bounding box](http://wiki.openstreetmap.org/wiki/Bounding_Box) to filter tweets by its geolocation.

* TABLENAME

 The name of the dataset that will be used in your CartoDB account to store the tweets. It will be created if it doesn't exists.

* BUFFER

  In some situations you could be receiving up to 50 tweets by second, so this variable set a number of tweets that will be buffered before to launch an insert to CartoDB. Nonetheless, some hashtags filters can make the stream much more slower, so a timeout is used by default to save the tweet buffer every 5 seconds.

* LOGLEVEL

 Defines the verbosity level. The accepted values are: ALL | DEBUG | INFO | WARN | ERROR | FATAL | OFF

 If you want to see the rate at which you're getting tweets, then set this to *DEBUG* level. Once you get sure it's working as it should, probably it's better to set it to *INFO* level instead, in order to reduce the size of the Docker logs.

* CARTODB_MULTIUSER_ACCOUNT

 Set this variable to 'true' if you have a multiuser account on CartoDB. If you don't know what it is, you can safely ignore this parameter :)

* TWEETER_CONSUMER_KEY, TWEETER_CONSUMER_SECRET, TWEETER_TOKEN_KEY, TWEETER_TOKEN_SECRET

 These are the standard credentials you will need to connect to the Twitter API.

* CARTODB_USER

 The username of your CartoDB account.

* CARTODB_APIKEY

 The CartoDB API Key.


**Note:** You can define each one of these variables with the *-e* options along the *docker run* command, or you can use the *config.cnf* file and the *run.sh* script instead.
