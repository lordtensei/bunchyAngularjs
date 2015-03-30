'use strict';

angular.module('jwtApp')
    .controller('CommentsCtrl', function ($scope, $stateParams, rideServices, alert) {

        $scope.rideID = $stateParams.rideID;

        function init() {

        }

        $scope.addComment = function (comment) {
            rideServices.addComment({
                rideid: $scope.rideID,
                comment: $scope.comment
            }).success(function () {
                alert('success', "Comment added", '');
                //$state.go('myteams');
            }).error(function (err) {
                alert('warning', "Unable to create team?", '');
            });
        }

        function getComments(rideid) {
            //usSpinnerService.spin('loginSpin');
            rideServices.getCommentsByRideID(RideID).success(function (comments) {
                $scope.comments = comments;
                //usSpinnerService.stop('loginSpin');
            }).error(errorCallback);
        }


        function errorCallback(err) {
            if (err == null) {
                alert('warning', "unable to get comments! ", "No web server?");
                $state.go('login');
            }
            if (err.message == 'location_not_set') {
                alert('warning', "Please set your location", "");
                $state.go('locationset');
            } else {
                alert('warning', "unable to get comments! ", err.message);
                $state.go('login');
            }
        }

        init();
    });