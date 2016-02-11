'use strict';

/**
 * @ngdoc function
 * @name yoAngApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yoAngApp
 */
 angular.module('yoAngApp')
 .controller('AboutCtrl', function ($scope, $firebaseArray) {

    $scope.rate = 5;
    $scope.max = 10;
    $scope.isReadonly = false;

    // Reference database
    var myFirebaseRef = new Firebase("https://yoangapp.firebaseio.com/products");
    // All data in $scope
    $scope.products = $firebaseArray(myFirebaseRef);

    $scope.addComment = function (formData, $index) {
        
        $scope.array = {name: formData.username , text: formData.comment , star: formData.rate};
        
        var childC = myFirebaseRef.child("/" + $index + "/comments/");
    
        childC.push($scope.array);

        formData.comment = '';
        formData.username = '';
        formData.rate = '';
        $scope.calculateAverage($index);
    };


    
    $scope.calculateAverage = function($index){ 
        
        var sum  = 0;
        var total = 0;
        
        console.log(total);
        var ruteComment = myFirebaseRef.child("/" + $index + "/comments/");

        ruteComment.once("value", function(ObjComment) {
            total = ObjComment.numChildren();
        });

        for (var i = 0; i < total; i++) {
            var ruteStar = ruteComment.child(i + "/star/");
            ruteStar.once("value", function(ObjStar) {
                sum = sum + ObjStar.val();
            });
        };

       var wround = sum/total;
       var round = Math.round(wround);
       return round;

   };

});
