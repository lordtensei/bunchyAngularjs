'use strict';

angular.module('jwtApp').directive('riders', function () {
    return {
        restrict: 'A',
        scope: {
            ride: '=ride'
        },
        templateUrl: 'views/riders.html',
        controller: function ($scope, rideServices) {

            $scope.riders = [];

            $scope.$on('someEvent', function (event, mass) {
                console.log(mass);
            });

            $scope.populatetab = function () {
                rideServices.getRiders($scope.ride.id).success(function (riders) {
                    $scope.riders = riders;
                });
            };
        }
    };
});