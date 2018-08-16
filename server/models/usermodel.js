var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Tweets = require('./tweets');

var userInfo = mongoose.Schema({
    email        : String,
    password     : String,
    isLiked: [{
        type: Schema.Types.ObjectId,
        unique : true,
        ref: 'Tweets'
    }],
    isDisliked: [{
        type: Schema.Types.ObjectId,
        unique : true,
        ref: 'Tweets'
    }],
});

 var userModel = mongoose.model('userModel', userInfo);
 module.exports = userModel;