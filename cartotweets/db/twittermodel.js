var CONFIG = require('../config');
var BaseModel = require('./db.js').BaseModel;
var util = require('util');
var l = require('log4js').getLogger();

l.setLevel(CONFIG.log_level);

function TwitterModel(){}

TwitterModel.prototype.batchInsert = function(values_array, callback){
	var sql = "INSERT INTO "+ CONFIG.tweets_table_name +" (\
		tweet_id, \
		tweet_user_id, \
		tweet_user_name, \
		tweet_user_screen_name, \
		tweet_user_followers_count, \
		tweet_user_profile_image_url, \
		tweet_text, \
		tweet_created_at, \
		tweet_retweet_count, \
		tweet_retweeted, \
		the_geom \
	) \
	VALUES " + values_array.join(',');

	BaseModel.query(callback, sql);
}

TwitterModel.prototype.value_template = function(s,d){
  for(var p in d) s = s.replace(new RegExp('{'+p+'}', 'g'), d[p]);
  return s;
};

TwitterModel.prototype.formatTweet = function(tweet){
	return valueTemplate(
		" ( \
			'{tweet_id}', \
			'{tweet_user_id}', \
			'{tweet_user_name}', \
			'{tweet_user_screen_name}', \
			'{tweet_user_followers_count}', \
			'{tweet_user_profile_image_url}', \
			'{tweet_text}', \
			'{tweet_created_at}', \
			'{tweet_retweet_count}', \
			'{tweet_retweeted}', \
			{coordinates} \
		)",
		{
			tweet_id: tweet.id_str,
			tweet_user_id: tweet.user.id_str,
			tweet_user_name: tweet.user.name.replace(/'/g, "''"),// Strange (but effective) way to escape single quotes
			tweet_user_screen_name: tweet.user.screen_name.replace(/'/g, "''"),
			tweet_user_followers_count: tweet.user.followers_count,
			tweet_user_profile_image_url: tweet.user.profile_image_url,
			tweet_text: tweet.text.replace(/'/g, "''"),
			tweet_created_at: tweet.created_at,
			tweet_retweet_count: tweet.retweet_count,
			tweet_retweeted: (tweet.retweeted == true)?1:0,
			coordinates: this.getTweetCoordinates(tweet)
		}
	);
};

TwitterModel.prototype.addTweets = function(tweets_list, callback, filter){
    if(typeof filter != 'function'){
        filter = function(){return true};
    }

	var values_array = [];
	for(i in tweets_list){
        if(filter(tweets_list[i])){
            values_array.push(this.formatTweet(tweets_list[i]));
        }
	}

	this.batchInsert(values_array, callback);
};

TwitterModel.prototype.getTweetCoordinates = function(tweet){
    if(tweet.coordinates != null){
        //Returns a Point
        tweet.coordinates.crs = {"type":"name","properties":{"name":"EPSG:4326"}};
        return "ST_GeomFromGeoJSON('" + JSON.stringify(tweet.coordinates) + "')";
    } else if (tweet.place != null && typeof tweet.place.bounding_box != 'undefined'){
        //There is no Point defined, but a Polygon (place property)
        tweet.place.bounding_box.crs = {"type":"name","properties":{"name":"EPSG:4326"}};
        return "ST_Centroid(ST_MakeValid(ST_GeomFromGeoJSON('" + JSON.stringify(tweet.place.bounding_box) + "')))";
    }
    //There is no coordinates
    return null;
};

TwitterModel.prototype.createTable = function(callback) {
	var sql = "CREATE TABLE "+ CONFIG.tweets_table_name +" ( \
				tweet_id VARCHAR(200),\
				tweet_user_id TEXT,\
				tweet_user_name TEXT,\
				tweet_user_screen_name TEXT,\
				tweet_user_followers_count BIGINT,\
				tweet_user_profile_image_url TEXT,\
				tweet_text TEXT,\
				tweet_created_at DATE,\
				tweet_retweet_count BIGINT,\
				tweet_retweeted BOOLEAN\
			);";
	BaseModel.query(function(err, data){
    if (CONFIG.cartodb_auth_config.multiUser=="true"){
      l.debug('Multiuser account detected');
      BaseModel.query(function(){}, "SELECT cdb_cartodbfytable('" + CONFIG.cartodb_auth_config.user + "','"+ CONFIG.tweets_table_name +"')");  
    }
    else{
      BaseModel.query(function(){}, "SELECT cdb_cartodbfytable('"+ CONFIG.tweets_table_name +"')");
    }
    
	
    
		callback(err, data);
	}, sql);
}

var valueTemplate = function(s,d){
  for(var p in d) s = s.replace(new RegExp('{'+p+'}', 'g'), d[p]);
  return s;
};

module.exports = TwitterModel;
