var shortId = require('shortid');
var store = {};

module.exports = {
  add: function(item) {
  	item.id = shortId.generate();
  	store[item.id] = item;
  	return item;
  },
  update: function(item) {
    store[item.id] = item;
    return item;
  },
  getAll: function() {
  	var items = [];
  	var keys = Object.keys(store);
  	for (var i = 0; i < keys.length; i++) {
  		items.push(store[keys[i]]);
  	}
    return items;
  }
}
