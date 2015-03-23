'use strict';

angular.module('jwtApp')
    .controller('LoginCtrl', function ($scope, alert, usSpinnerService, $auth, $state) {

        $scope.authenticate = function (provider) {
            usSpinnerService.spin('loginSpin');
            $auth.authenticate(provider).then(function (res) {
                //alert('success', 'welcome back ' + res.data.user.email);
                if (res.data.user.locationid == null) {
                    alert('success', 'Please select a location ');
                    $state.go('locationset');
                }
                usSpinnerService.stop('loginSpin');
            }).catch(handleError);
        }

        $scope.strava = function () {
            usSpinnerService.spin('loginSpin');
        }

        $scope.submit = function () {
            usSpinnerService.spin('loginSpin');
            $auth.login({
                    email: $scope.email,
                    password: $scope.password
                })
                .then(function (res) {
                    alert('success', 'welcome back ' + res.data.user.email);
                    usSpinnerService.stop('loginSpin');
                }, handleError);
        }

        function handleError(err) {
            console.log(err.data);
            console.log(err.message);
            usSpinnerService.stop('loginSpin');
            alert('warning', 'something went wrong! ', err.data.message);
        }
    });