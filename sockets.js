var debug = require('debug')('sockets');
var states = require('./states.js');
var store = require('./store.js');
var queue = require('./queue.js');

module.exports = function (io) {
  'use strict';

  io.on('connection', function (socket) {
    debug('user connected');
    socket.broadcast.emit('user connected');

    socket.on('addPizza', function (from, msg) {
      debug('got pizza', from, msg);
      msg.state = states[0];
      msg.stateHistory = [states[0]];

      msg = store.add(msg);
   	  io.sockets.emit('newPizza', msg);

      debug('adding pizza to queue', from, msg);
      queue.addPizza(msg);
    });
  });
};

