'use strict';

angular.module('jwtApp').directive('riders', function () {
    return {
        restrict: 'A',
        scope: {
            riders: '=riders'
        },
        templateUrl: 'views/riders.html',
        controller: function ($scope, rideServices) {

            //$scope.riders = [];
            console.log($scope.riders);

            $scope.populatetab = function () {
                rideServices.getRiders($scope.bunch.id).success(function (riders) {
                    $scope.riders = riders;
                });
            };
        }
    };
});