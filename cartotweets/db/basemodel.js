var CartoDB = require('cartodb'),
	CONFIG = require('../config.js');

function BaseModel() {}

BaseModel.prototype.query = function(callback, query, parameters){
	var client = new CartoDB({user: CONFIG.cartodb_auth_config.user, api_key: CONFIG.cartodb_auth_config.apiKey});

	client.on('connect', function() {
	    client.query(query, parameters, function(err, data){
			if (data) {
				data = data.rows;
			}
			callback(err, data);
	    });
	});

	client.connect();
};

module.exports = BaseModel;
