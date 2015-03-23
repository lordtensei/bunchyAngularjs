'use strict';

angular.module('jwtApp')
    .factory('stravaServices', function (API_URL, $http) {
        return {
            getStravaActivities: function () {
                return $http.get(API_URL + 'strava/activities')
            },
            getStravaActivity: function (id) {
                return $http.get(API_URL + 'strava/activity?id=' + id)
            }
        }
    });