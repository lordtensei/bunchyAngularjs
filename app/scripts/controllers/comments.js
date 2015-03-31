'use strict';

angular.module('jwtApp')
    .controller('CommentsCtrl', function ($scope, $state, $stateParams, usSpinnerService, rideServices, alert) {

        $scope.rideID = $stateParams.rideID;

        function init() {
            getComments($scope.rideID);
        }

        $scope.addComment = function (comment) {
            rideServices.addComment({
                rideid: $scope.rideID,
                comment: $scope.comment
            }).success(function () {
                alert('success', "Comment added", '');
                getComments($scope.rideID);
                //$state.go('comments');
            }).error(function (err) {
                alert('warning', "Unable to add comment?", '');
            });
        }

        function getComments(rideid) {
            console.log(rideid);
            usSpinnerService.spin('loginSpin');
            rideServices.getCommentsByRideID(rideid).success(function (commentlist) {
                $scope.comments = commentlist;
                console.log($scope.comments);
                usSpinnerService.stop('loginSpin');
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