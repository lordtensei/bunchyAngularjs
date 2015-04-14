'use strict';

angular.module('jwtApp')
    .controller('EditbunchCtrl', function ($state, $scope, $stateParams, bunchServices, alert) {

        function init() {
            $scope.friendsinvited = [];

            $scope.profiles = [{
                name: 'Personal'
            }, {
                name: 'Business'
            }];

            $scope.abilities = [{
                name: 'All'
            }, {
                name: 'Beginner'
            }, {
                name: 'Intermediate'
            }, {
                name: 'Advanced'
            }];

            $scope.policies = [{
                name: 'None'
            }, {
                name: 'Drop'
            }, {
                name: 'No drop'
            }];

            $scope.privateoptions = [{
                name: 'Private'
            }, {
                name: 'Public'
            }];

            $scope.profile = {};
            $scope.ability = {};
            $scope.policy = {};
            $scope.private = {};

            bunchServices.getBunchByID($stateParams.bunchID).success(function (bunch) {
                $scope.bunch = bunch;
                $scope.profile.selected = {
                    "name": bunch.profile
                };

                if (bunch.private == true) {
                    $scope.private.selected = {
                        "name": 'Private'
                    };
                } else {
                    $scope.private.selected = {
                        "name": 'Public'
                    };
                }

            }).error(function () {
                alert('success', 'unable to get bunch');
            });
        }

        $scope.submit = function () {

            if ($scope.private.selected.name == 'Private') {
                $scope.bunch.private = true;
            } else {
                $scope.bunch.private = false;
            }

            $scope.bunch.profile = $scope.profile.selected.name;

            bunchServices.editBunch(
                $scope.bunch
            ).success(function () {
                alert('success', "Bunch updated", '');
                $state.go('myteams');
            }).error(function (err) {
                alert('warning', "Unable to update bunch?", '');
            });
        }

        init();
    });