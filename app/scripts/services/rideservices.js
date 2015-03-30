'use strict';

angular.module('jwtApp')
    .factory('rideServices', function (API_URL, $http) {
        return {
            getUserRides: function () {
                return $http.get(API_URL + 'ride/byuser')
            },
            addRider: function (rideid) {
                return $http.post(API_URL + 'ride/addrider', {
                    rideid: rideid
                })
            },
            addRideDetails: function (rideDetails) {
                return $http.post(API_URL + 'ride/addridedetails', rideDetails)
            },
            getCommentsByRideID: function (rideID) {
                return $http.get(API_URL + 'ride/comments?id=', rideID)
            },
            addComment: function (comment) {
                return $http.post(API_URL + 'ride/addcomment', comment)
            },
            removeRider: function (rideid) {
                return $http.post(API_URL + 'ride/removerider', {
                    rideid: rideid
                })
            },
            getRiders: function (rideid) {
                return $http.get(API_URL + 'ride/getriders?id=' + rideid)
            }
        }
    });