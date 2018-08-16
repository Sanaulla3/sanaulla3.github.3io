const express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// configuration ===============================================================
mongoose.connect('mongodb://localhost:27017/twit'); // connect to our database

const app = module.exports =  express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // read cookies
app.use(cors())

app.use(session({
  secret: 'Twitter',
  saveUninitialized: true,
  resave: true,
}));
const api = require('./routes/api')(app);

app.use('/', api);

module.exports = app;