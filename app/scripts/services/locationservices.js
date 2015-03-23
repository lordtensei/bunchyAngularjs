'use strict';

angular.module('jwtApp')
    .factory('locationServices', function (API_URL, $http) {
        return {
            getLocations: function () {
                return $http.get(API_URL + 'location')
            },
            getUserLocation: function () {
                return $http.get(API_URL + 'location/byuser')
            }
        }
    });