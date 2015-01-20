'use strict';

// define globals
var express = require('express'),
    io = require('socket.io'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = io.listen(server),
    path = require('path'),
    favicon = require('static-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    store = require('./store.js'),
    worker = require('./worker.js');

// set up our socket server
require('./sockets.js')(io);
worker(io.sockets);

// start the server
server.listen(3000);

// optional - set socket.io logging level
io.set('log level', 1);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/api/pizzas', function(req, res) {
  res.status(200).json({pizzas: store.getAll()});
});

// middleware settings
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));

// for production
app.use(express.static(__dirname +  '/public'));

// for development purposes, access during
// iterative development as /angular-dev
// see below if you want to add back the development env
app.use('/angular-dev', express.static(__dirname  + '/angular-frontend/app'));

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
