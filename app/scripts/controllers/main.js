'use strict';

/**
 * @ngdoc function
 * @name yoAngApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yoAngApp
 */
 angular.module('yoAngApp').controller('MainCtrl', function ($scope) {

 	var baseURL='http://lorempixel.com/960/450/';
 	$scope.setInterval=5000;

 	$scope.slides = [
 	{
 		title:'Aprende a mantenerte en forma',
 		image:baseURL+'sports/',
 		text:'¡Practica algún deporte todos los días'
 	},
 	{
 		title:'Buena alimentación',
 		image:baseURL+'food/',
 		text:'¡La importancia de frutas y verduras en la dieta!'
 	},
 	{
 		title:'En contacto con la naturaleza',
 		image:baseURL+'nature/',
 		text:'¡Mantente en armonía con la naturaleza!'
 	}

 	];

 	 $scope.blocks = [
	{
 		title:'Buena alimentación',
 		image:baseURL+'city/'
 	},
 		
 	{
 		title:'Buena alimentación',
 		image:baseURL+'business/'
 	},
 	
 	{
 		title:'En contacto con la naturaleza',
 		image:baseURL+'fashion/'
 	}

 	];


 });