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

    $scope.addComment = function ($index, $comment) {

        $scope.array = {name: formData.username , text: formData.comment , star: formData.rate};
        
        var childC = myFirebaseRef.child("/" + $index + "/comments/");

        childC.push($scope.array);

        formData.comment = '';
        formData.username = '';
        formData.rate = '';
        $scope.calculateAverage($index);
    };


    $scope.deleteComment = function ($index, $comment) {

        var ruteComment = myFirebaseRef.child("/" + $index + "/comments/");

        ruteComment.once("value", function(snapshot) {
            var a = snapshot.numChildren();
            console.log(a);
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
