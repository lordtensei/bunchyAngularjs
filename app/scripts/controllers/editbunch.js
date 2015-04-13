'use strict';

angular.module('jwtApp')
    .controller('EditbunchCtrl', function ($state, $scope, $stateParams, bunchServices, alert) {




        bunchServices.getBunchByID($stateParams.bunchID).success(function (bunch) {
            $scope.bunch = bunch;
        }).error(function () {
            alert('success', 'unable to get bunch');
            $state.go('myteams');
        });

        $scope.submit = function () {

            bunchServices.editBunch(
                $scope.bunch
            ).success(function () {
                alert('success', "Bunch updated", '');
                $state.go('myteams');
            }).error(function (err) {
                alert('warning', "Unable to update bunch?", '');
            });

            $state.go('myteams');
        }

    });