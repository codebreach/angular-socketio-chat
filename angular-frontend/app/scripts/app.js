'use strict';

angular
  .module('pizzeriaApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io'
  ])
  .value('nickName', 'anonymous');
