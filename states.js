var timeTakenForTossing = function(job) {
  var timeTaken = 4000; // for small
  if (job.size == 'medium') {
    timeTaken = 5000;
  } else if (job.size == 'large') {
    timeTaken = 6000;
  }
  return timeTaken;
}

var states = [
  { name: 'created', message: 'Order Recieved' },
  { name: 'accepted', timeTaken: 1000, message: 'Order has been accepted' },
  { name: 'tossed', timeTaken: timeTakenForTossing, message: 'Dough has been tossed' },
  { name: 'spread', timeTaken: 5000, message: 'Sauce has been spread' },
  { name: 'topped', timeTaken: function(job) { return 1000 * job.toppings }, message: 'Toppings have been added' },
  { name: 'cooked', timeTaken: 10000, message: 'Put in the oven' },
  { name: 'boxed', timeTaken: 2000, message: 'Tasted and put in the box' },
  { name: 'ready', timeTaken: 0, message: 'Ready for eating' }
];

module.exports = states;