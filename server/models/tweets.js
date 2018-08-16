var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Tweets = mongoose.Schema({
    id        : Schema.Types.ObjectId,
    tweet     : String,
    userId    : String,
    time      : Date,
    upVotes   : Number,
    downVotes : Number,
    views     : Number
});

module.exports = mongoose.model('Tweets', Tweets);