'use strict';

angular.module('jwtApp')
    .factory('friendServices', function (API_URL, $http) {
        return {
            getAllUsers: function () {
                return $http.get(API_URL + 'friends/allusers')
            },
            getFriends: function () {
                return $http.get(API_URL + 'friends/friends')
            },
            getNonFriends: function () {
                return $http.get(API_URL + 'friends/notfriends')
            },
            addFriend: function (friendid) {
                return $http.post(API_URL + 'friends/addfriend', {
                    friendid: friendid
                })
            },
            removeFriend: function (friendid) {
                return $http.post(API_URL + 'friends/removefriend', {
                    friendid: friendid
                })
            }
        }
    });