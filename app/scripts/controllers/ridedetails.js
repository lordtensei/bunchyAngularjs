'use strict';

angular.module('jwtApp')
    .controller('RidedetailsCtrl', function ($scope, alert, $state, $stateParams, usSpinnerService, rideServices) {

        $scope.ridedetailid = $stateParams.ridedetailid;

        function init() {
            getRidedetails($scope.ridedetailid);


        };


        function getRidedetails(ridedetailid) {
            rideServices.getRidedetails(ridedetailid).success(function (ridedetails) {
                $scope.ridedetails = ridedetails;
                console.log(ridedetails);
            }).error(errorCallback);
        }

        function errorCallback(err) {
            if (err == null) {
                alert('warning', "unable to get bunches! ", "No web server?");
                $state.go('login');
            }
            if (err.message == 'location_not_set') {
                alert('warning', "Please set your location", "");
                $state.go('locationset');
            } else {
                alert('warning', "unable to get bunches! ", err.message);
                $state.go('login');
            }
        };

        init();

    });