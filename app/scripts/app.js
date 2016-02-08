'use strict';

/**
 * @ngdoc overview
 * @name yoAngAppApp
 * @description
 * # yoAngAppApp
 *
 * Main module of the application.
 */
angular
  .module('yoAngApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
      })
      .otherwise({
        redirectTo: '/'
      });
  });
