'use strict';

angular.module('jwtApp')
    .controller('MyteamsCtrl', function ($scope, $state, usSpinnerService, bunchServices, alert) {

        $scope.bunches = {};

        function init() {
            getBunches();
        };

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

        $scope.addBunch = function () {
            usSpinnerService.spin('loginSpin');
            $state.go('bunchcreate');
        };

        $scope.addRide = function (bunch) {
            usSpinnerService.spin('loginSpin');
            $state.go('addride', {
                "bunchID": bunch.id
            });
        };

        $scope.editBunch = function (bunch) {
            usSpinnerService.spin('loginSpin');
            $state.go('editbunch', {
                "bunchID": bunch.id
            });
        };

        function getBunches() {
            usSpinnerService.spin('loginSpin');
            bunchServices.getBunchesByUser().success(function (bunches) {
                $scope.bunches = bunches;
                usSpinnerService.stop('loginSpin');
            }).error(errorCallback);
        };

        init();

    });