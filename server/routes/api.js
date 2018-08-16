const express = require('express')
const userCtrl = require('../controllers/userctrl');
const router = express.Router();

/**
 * API END POINTS BEGIN
 */

module.exports = function(app) {
    // =====================================
    // SIGNUP ===============================
    // =====================================
      app.post('/signup', function(req, res){
        userCtrl.signUp(req.body).then(function(data){
          console.log(data);
          return res.status(200).json({status: 'Success!!! ', profile: data});
        }, function(err){
          console.log(err);
          return res.status(401).json({error: true, status: err} );
        })
         
      })

    // =====================================
    // LOGIN ===============================
    // =====================================

      app.post('/login', function(req, res){
        userCtrl.logIn(req.body).then(function(data){
          console.log(data.email);
          return res.status(200).json({status: 'Success!!! ', profile: data});
        }, function(err){
          console.log(err);
          return res.status(401).json({error: true, status: err} );
        })
         
      })

      app.post('/getTweets', function(req, res){
        console.dir(req.body);
        userCtrl.getTweets(req.body).then(function(data){
          console.log(data);
          return res.status(200).json({status: 'Success!!! ', data: data});
        }, function(err){
          console.log(err);
          return res.status(401).json({error: true, status: err} );
        })
         
      })

      app.post('/tweet', function(req, res){
        console.dir(req.body);
        userCtrl.addTweet(req.body).then(function(data){
          console.log(data);
          return res.status(200).json({status: 'Success!!! ', data: data});
        }, function(err){
          console.log(err);
          return res.status(401).json({error: true, status: err} );
        })
         
      })

      app.post('/upVote', function(req, res){
        console.dir(req.body);
        userCtrl.upVote(req.body).then(function(data){
          console.log(data);
          return res.status(200).json({status: 'Success!!! ', data: data});
        }, function(err){
          console.log(err);
          return res.status(401).json({error: true, status: err} );
        })
         
      })

      app.post('/downVote', function(req, res){
        console.dir(req.body);
        userCtrl.downVote(req.body).then(function(data){
          console.log(data);
          return res.status(200).json({status: 'Success!!! ', data: data});
        }, function(err){
          console.log(err);
          return res.status(401).json({error: true, status: err} );
        })
         
      })

      return router;
};