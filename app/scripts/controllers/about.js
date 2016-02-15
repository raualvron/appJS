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


    $scope.deleteComment = function (comment, $product) {

        var ruteComment = myFirebaseRef.child("/" + $product + "/comments/");
        ruteComment.once("value", function(snapshot) {
           snapshot.forEach(function(snapshot2) {
            if(angular.equals(snapshot2.val(),comment)){
               var ruteDelete = myFirebaseRef.child("/" + $product + "/comments/" + snapshot2.key());
                    ruteDelete.remove();
            }
         });
       });
    };



    $scope.calculateAverage = function($index){ 

        var sum  = 0;
        var total = 0;


        var ruteComment = myFirebaseRef.child("/" + $index + "/comments/");

        ruteComment.once("value", function(ObjComment) {
            total = ObjComment.numChildren();
        });

        ruteComment.once("value", function(snapshot) {
            snapshot.forEach(function(snapshot) {
               snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key();
                if (key == 'star') {
                    sum += childSnapshot.val();
                }
            });
           });
        });

        var wround = sum/total;
        var round = Math.round(wround);
        return round;

    };

});
