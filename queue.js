var debug = require('debug')('queue');
var queue = require('fake-queue')();

queue.addPizza = function(pizza) {
	queue.push('pizzas', pizza);
}

queue.addPizzaHandler = function(handler) {
	queue.pop('pizzas', handler);
}

module.exports = queue;