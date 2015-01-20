'use strict';

angular.module('pizzeriaApp')
.controller('MainCtrl', function ($log, $scope, $http, pizzaSocket) {


  $scope.size = 'small';
  $scope.toppings = 0;
  $scope.pendingPizzas = [];

  $http.get('/api/pizzas').then(function (response) {
    $scope.pendingPizzas = response.data.pizzas || [];
  });

  $scope.addPizza = function() {
    var model = {
      size: $scope.size,
      toppings: $scope.toppings
    };
    console.log('adding pizza');
    pizzaSocket.emit('addPizza', 'user', model);
  };

  $scope.getClassFor = function(size) {
    return {active: $scope.size === size};
  };

  $scope.updateToppings = function(delta) {
    $scope.toppings = delta + $scope.toppings;
    if ($scope.toppings < 0) {
      $scope.toppings = 0;
    }
  };

  $scope.$on('socket:newPizza', function(event, data) {
    $log.debug('got a message', event.name, data);
    $scope.pendingPizzas.push(data);
  });

  $scope.$on('socket:updatePizza', function(event, data) {
    $log.debug('got a message', event.name, data);
    
    for (var i = 0; i < $scope.pendingPizzas.length; i++) {
      if ($scope.pendingPizzas[i].id == data.id) {
        $scope.pendingPizzas[i] = data;
        break;
      }
    }

  });
});
