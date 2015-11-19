function init(callback){
    module.exports.BaseModel = new (require('./basemodel.js'));
    module.exports.TwitterModel = new (require('./twittermodel.js'));
    callback();
}

module.exports.init = init
