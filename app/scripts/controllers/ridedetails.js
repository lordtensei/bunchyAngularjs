'use strict';

angular.module('jwtApp')
    .controller('RidedetailsCtrl', function ($scope, alert, $state, $stateParams, usSpinnerService, rideServices) {

        $scope.ridedetailid = $stateParams.ridedetailid;
        $scope.rideid = $stateParams.rideid;
        console.log($scope.rideid);

        function init() {
            getRidedetails($scope.ridedetailid, $scope.rideid);
        };

        function getRidedetails(ridedetailid, rideid) {
            rideServices.getRidedetails(ridedetailid, rideid).success(function (ridedetails) {
                $scope.ridedetails = ridedetails;
                console.log(ridedetails);
            }).error(errorCallback);
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

        function getComments(rideid) {
            usSpinnerService.spin('loginSpin');
            rideServices.getCommentsByRideID(rideid).success(function (commentlist) {
                $scope.ridedetails.comments = commentlist;
                usSpinnerService.stop('loginSpin');
            }).error(errorCallback);
        }
    
    function getRoutes(rideid) {
            usSpinnerService.spin('loginSpin');
            rideServices.getRoutesByRideID(rideid).success(function (routes) {
                $scope.routes = routes;
                usSpinnerService.stop('loginSpin');
            }).error(errorCallback);
        }

        $scope.back = function () {
            $state.go('bunches');
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

        init();

    });