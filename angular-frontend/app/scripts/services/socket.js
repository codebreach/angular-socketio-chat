'use strict';
angular.module('pizzeriaApp')
.factory('pizzaSocket', function (socketFactory) {
      var socket = socketFactory();
      socket.forward('broadcast');
      socket.forward('updatePizza');
      socket.forward('newPizza');
      return socket;
    });
