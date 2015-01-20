'use strict';

angular.module('pizzeriaApp')
  .value('messageFormatter', function(date, nick, message) {
    return date.toLocaleTimeString() + ' - ' +
           nick + ' - ' +
           message + '\n';
    
  });
