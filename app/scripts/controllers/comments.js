'use strict';

angular.module('jwtApp')
    .controller('CommentsCtrl', function ($scope, $state, $stateParams, usSpinnerService, rideServices, alert) {

        $scope.rideid = $stateParams.rideid;

        function init() {
            getComments($scope.rideid);
            getRiders($scope.rideid);
        }

        $scope.addComment = function () {
            rideServices.addComment({
                rideid: $scope.rideid,
                comment: $scope.comment
            }).success(function () {
                alert('success', "Comment added", '');
                getComments($scope.rideid);
                //$state.go('comments');
            }).error(function (err) {
                alert('warning', "Unable to add comment?", '');
            });
        }

        function getRiders(rideid) {
            rideServices.getRiders(rideid).success(function (riderlist) {
                $scope.riders = riderlist;
            }).error(errorCallback);
        }

        function getComments(rideid) {
            usSpinnerService.spin('loginSpin');
            rideServices.getCommentsByRideID(rideid).success(function (commentlist) {
                $scope.comments = commentlist;
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