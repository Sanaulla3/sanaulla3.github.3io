
var Q = require('q');
var User = require('../models/usermodel');
var Tweets = require('../models/tweets');

var self = module.exports = {

signUp : function (userInfo, callback){
        var deferred = Q.defer();
        if (userInfo.email && userInfo.password) {
                User.findOne({ email : userInfo.email }, function (err, obj){
                    if (err) { 
                        return deferred.reject('{ error:' + err + ' }');
                    }
                    else if(obj){
                        deferred.reject("User Id already taken. Try Another");
                    }else{
                        User.create({
                            email : userInfo.email,
                            password : userInfo.password

                        }, function(err, user) {
                            if (err)
                                deferred.reject(err);
                            deferred.resolve(user);
                        });      
                    }
                    
                });        
            }
            else {
                deferred.reject("Both fields are required");
            }

            deferred.promise.nodeify(callback);
            return deferred.promise;
    },

    logIn : function ( data, callback ){
        var deferred = Q.defer();
         if (data.email && data.password) {
                 User.find({email: data.email},  function(err, user) {
                        if (err)
                            deferred.reject(err);
                        
                        if(user[0]){
                            // if the user is found but the password is wrong
                            if (!(user[0].password == data.password))
                                return deferred.reject("wrong password");

                             deferred.resolve(user[0]);//'{"error":false, "status":"login success"}');
                        }else{
                            return deferred.reject("no user account with this credentials");
                        }
                    });      
            }
            else {
                deferred.reject("Both fields are required");
            }

        deferred.promise.nodeify(callback);
        return deferred.promise;
    },

    addTweet : function ( data, callback ){
        var deferred = Q.defer();
        
        if (data.userId) {
            var newTweet = new Tweets();
            newTweet.id    = data.id;
            newTweet.userId    = data.userId;
            newTweet.tweet = data.tweet;
            newTweet.time    = data.time;
            newTweet.upVotes = data.upVotes;
            newTweet.downVotes    = data.downVotes;
            newTweet.views = data.views;
            
            // save the tweet
            newTweet.save(function(err, tweet) {
                if (err)
                    throw err;
                    deferred.resolve(tweet);
            });      
        }
        else {
            deferred.reject("Both tweet and userid are required");
        }

        deferred.promise.nodeify(callback);
        return deferred.promise;
    },


    upVote : function ( data, callback ){
        var deferred = Q.defer();

        if (data.tweet && data.id) {
            if(data.isLiked != 'false'){
                Tweets.findByIdAndUpdate({_id: data._id},{ $set: { 
                                upVotes: data.upVotes, 
                                downVotes: data.downVotes 
                            } 
                    },
                    { 'new': true}, function( err, res){
                        if (err) {
                            deferred.resolve(err);
                        } else if(res && res!=null) {
                            User.findByIdAndUpdate({_id: data.id},
                                { $push: { isLiked: data._id } },
                                { 'new': true}, function( err, res){
                                    if (err) {
                                        deferred.resolve(err);
                                    } else if(res && res!=null) {
                                        User.findByIdAndUpdate({_id: data.id},
                                            { $pull: { isDisliked: data._id } },
                                            { 'new': true}, function( err, res){
                                                if (err) {
                                                    deferred.resolve(err);
                                                } else if(res && res!=null) {
                                                    console.dir("Disliked removed");
                                                }
                                        });
                                    }
                            });
                        }
                });
            }
            else{
                Tweets.findByIdAndUpdate({_id: data._id},{ $set: { 
                                upVotes: data.upVotes, 
                                downVotes: data.downVotes 
                            } 
                    },
                    { 'new': true}, function( err, res){
                        if (err) {
                            deferred.resolve(err);
                        } else if(res && res!=null) {
                            User.findByIdAndUpdate({_id: data.id},
                                { $pull: { isLiked: data._id } },
                                { 'new': true}, function( err, res){
                                    if (err) {
                                        deferred.resolve(err);
                                    } else if(res && res!=null) {
                                        console.log("Like removed");
                                    }
                            });
                        }
                });
            }
            deferred.resolve(data);      
        }
        else {
            deferred.reject("Both comment and userid are required");
        }

        deferred.promise.nodeify(callback);
        return deferred.promise;
    },

    downVote: function ( data, callback ){
        var deferred = Q.defer();

        if (data.tweet && data.id) {
            if(data.isDisliked != 'false'){
                Tweets.findByIdAndUpdate({_id: data._id},{ $set: { 
                                upVotes: data.upVotes, 
                                downVotes: data.downVotes 
                            } 
                    },
                    { 'new': true}, function( err, res){
                        if (err) {
                            deferred.resolve(err);
                        } else if(res && res!=null) {
                            User.findByIdAndUpdate({_id: data.id},
                                { $push: { isDisliked: data._id } },
                                { 'new': true}, function( err, res){
                                    if (err) {
                                        deferred.resolve(err);
                                    } else if(res && res!=null) {
                                        User.findByIdAndUpdate({_id: data.id},
                                            { $pull: { isLiked: data._id } },
                                            { 'new': true}, function( err, res){
                                                if (err) {
                                                    deferred.resolve(err);
                                                } else if(res && res!=null) {
                                                    console.dir("like removed");
                                                }
                                        });
                                    }
                            });
                        }
                });
            }
            else{
                Tweets.findByIdAndUpdate({_id: data._id},{ $set: { 
                                upVotes: data.upVotes, 
                                downVotes: data.downVotes 
                            } 
                    },
                    { 'new': true}, function( err, res){
                        if (err) {
                            deferred.resolve(err);
                        } else if(res && res!=null) {
                            User.findByIdAndUpdate({_id: data.id},
                                { $pull: { isDisliked: data._id } },
                                { 'new': true}, function( err, res){
                                    if (err) {
                                        deferred.resolve(err);
                                    } else if(res && res!=null) {
                                        console.dir("Dislike removed");
                                    }
                            });
                        }
                });
            }
            deferred.resolve(data);      
        }
        else {
            deferred.reject("Both comment and userid are required");
        }

        deferred.promise.nodeify(callback);
        return deferred.promise;
    },

    getTweets : function(data, callback ){
        var deferred = Q.defer();
        if(!!data.startIndex && !!data.lastIndex){
            Tweets.find({}).exec(function(err, result) {
                if(err)
                    deferred.reject(err)
                if(!!result){
                    len = result.length;
                    result = result.reverse().slice(data.startIndex, data.lastIndex);
                    for(let key in result){
                        Tweets.findByIdAndUpdate({_id: result[key]._id},
                            { $inc: { views: 1 } },
                            { 'new': true}, function( err, res){
                                if (err) {
                                    deferred.resolve(err);
                                } else if(res && res!=null) {
                                    console.dir("View incremented.");
                                }
                        });
                    }
                    deferred.resolve({data: result, len: len})
                }
            });
        }
        deferred.promise.nodeify(callback);
        return deferred.promise;
    }

};