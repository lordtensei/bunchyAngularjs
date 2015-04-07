'use strict';

angular.module('jwtApp')
    .controller('FriendsCtrl', function ($scope, $state, alert, $auth, friendServices) {

        function init() {
            getFriends();
            getNonFriends();
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
                alert('warning', "unable to get friends! ", err.message);
                $state.go('login');
            }
        }

        function getFriends() {
            //usSpinnerService.spin('loginSpin');
            friendServices.getFriends().success(function (friends) {
                console.log(friends);
                $scope.friends = friends;
                // usSpinnerService.stop('loginSpin');
            }).error(errorCallback);
        }

        function getNonFriends() {
            //usSpinnerService.spin('loginSpin');
            friendServices.getNonFriends().success(function (nonfriends) {
                $scope.nonfriends = nonfriends;
                // usSpinnerService.stop('loginSpin');
            }).error(errorCallback);
        }

        $scope.addFriend = function (friendid) {
            console.log(friendid);
            friendServices.addFriend(friendid).success(function (friend) {
                alert('success', "Friend added!", '');
                getFriends();
                getNonFriends();
            }).error(errorCallback);
        }

        $scope.removeFriend = function (friendid) {
            console.log(friendid);
            friendServices.removeFriend(friendid).success(function (friend) {
                alert('success', "Friend removed!", '');
                getFriends();
                getNonFriends();
            }).error(errorCallback);
        }


        init();

    });