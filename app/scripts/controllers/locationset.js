'use strict';

angular.module('jwtApp')
    .controller('LocationsetCtrl', function ($scope, $http, API_URL, $state, alert) {

        $scope.local = {};

        $http.get(API_URL + 'location').success(function (locations) {
            $scope.locations = locations;
        }).error(function () {});

        $scope.setLocation = function () {

            $http.get(API_URL + 'location/setlocation/?id=' + $scope.local.selected.id).success(function () {

                alert('success', "Location set", '');
                $state.go('bunches');

            }).error(function (err) {
                alert('warning', "unable to set location! ", err.message);
                $state.go('login');
            });
        };
    });