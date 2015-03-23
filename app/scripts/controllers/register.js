'use strict';

angular.module('jwtApp')
    .controller('RegisterCtrl', function ($scope, $http, API_URL, alert, $auth, $state) {
        $scope.local = {};
        $http.get(API_URL + 'location').success(function (locations) {
            $scope.locations = locations;
        }).error(function (err) {
            if (err == null) {
                alert('warning', "unable to get locations! ", "No web server?");
                $state.go('login');
            } else {
                alert('warning', "unable to get locations! ", err.message);
                $state.go('login');
            }
        })

        $scope.submit = function () {
            $auth.signup({
                    email: $scope.email,
                    password: $scope.password,
                    firstname: $scope.firstname,
                    lastname: $scope.lastname,
                    location: $scope.local.selected
                })
                .then(function (res) {
                    alert('success', 'Account Created! ', 'Welcome ' + res.data.user.email + '! You have been sent a verification email.');
                })
                .catch(function (err) {
                    alert('warning', 'Something went wrong! ', err.data.message);
                });
        }
    });