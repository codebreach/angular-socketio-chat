var debug = require('debug')('worker');
var queue = require('./queue.js');
var store = require('./store.js');
var states = require('./states.js');

var pizzaWorkerGenerator = function(socket, name) {
  var isRunning = false;

  var findStateIndex = function(currentState) {
    states.indexO(function(item) { return item.name == currentState.name; });
  }

  return function(job, done) {
    if (isRunning) {
      // get put back on the queue as all chefs are busy
      setImmediate(function() {
        done(true /* error */);
      });
      return;
    }
    isRunning = true;
    debug(name + ' starting job ', job.id);

    var currentState = job.state;
    var nextState = states[states.indexOf(currentState) + 1];

    var timeTaken = nextState.timeTaken;
    if (typeof(timeTaken) == 'function') {
      timeTaken = timeTaken(job);
    }

    debug(name + ' ' + job.id + ': sleeping ' + timeTaken + 'ms for ' + currentState.name);
    if (nextState) {
      job.inProgress = 'being ' + nextState.name + ' (' + timeTaken/1000 + 's)';    
      store.update(job);
      socket.emit('updatePizza', job);
    }
    setTimeout(function() {
      debug(name + ' ' + job.id + ': at ' + nextState.name);
      
      job.state = nextState;
      job.updateTime = new Date();
      job.inProgress = '';
    
      store.update(job);
      if (nextState != states[states.length - 1]) {
        queue.addPizza(job);
      }
      socket.emit('updatePizza', job);

      isRunning = false;
      done(false /* error */);
    }, timeTaken);
  };  
};

module.exports = function(socket) {
  for (var i = 1; i <= 6; i++) {
    var name = 'worker:' + i;
    queue.addPizzaHandler(pizzaWorkerGenerator(socket, name));
  }
};