# CartoTweets
Connect your CartoDB account with Twitter. A docker way.

Quick Start
-----------

First you need:

* A CartoDB user and API Key:

 *Sing Up* or *Login* in [CartoDB](https://cartodb.com/), and then go to the **Your API Keys**
 option in your user menu to get the key string.

* A Twitter account:

 Well, probably you already have a Twitter Account (if you don't, it's [easy](https://twitter.com/)), so then you'll have to go to  [apps.twitter.com](https://apps.twitter.com) page and create a Twitter App.

 Follow the instructions, and finally you'll be able to access to a **Keys and Access Tokens** section in your new App settings page.

 There you'll have a **Application Settins** block, which corresponds to the **TWITTER_CONSUMER** *Key* and *Secret* strings, and **Your Access Token** block with the **TWITTER_TOKEN** *key* and *Secret* strings. That's all you need to connect your app to the Twitter API.

Once you have your credentials, just build the docker:

```bash
docker build -t "cartotweets" .
```

And the run it with the proper globals defined with your *Keys* and *Secrets*:

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

I know, that's a huge command to write by hand in the console, filling parameter by parameter... And to make it worse, those are not all options that you can pass to the docker container.

Well, that's why both the **config.cnf** file and the **run.sh** script exists. Just take a look at them and you will understand it right away.

So a better way to run the docker after the build command, is by filling the parameters in the *config.cnf* file 
and then run:

```bash
chmod +x run.sh #if it doesn't have it already...
./run.sh
```

Then hopefully you'll see the output of the docker while the node module is getting a lot of tweets into a **tweets** dataset on your CartoDB account. As a note, sometimes it takes a few minutes to appear in the CartoDB web interface.
