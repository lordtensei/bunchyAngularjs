'use strict';

angular.module('jwtApp')
    .factory('bunchServices', function (API_URL, $http) {
        return {
            getRidesByUserandDay: function (id) {
                return $http.get(API_URL + 'bunch/getridesbylocationandday?id=' + id)
            },
            getBunchesByUsers: function () {
                return $http.get(API_URL + 'bunch/byuser');
            },
            getRidesByUserandDayOneOff: function (id) {
                return $http.get(API_URL + 'bunch/getoneoffridesbylocationandday?id=' + id)
            },
            getBunchByID: function (id) {
                return $http.get(API_URL + 'bunch/' + id)
            },
            createBunch: function (bunch) {
                return $http.post(API_URL + 'bunch/create', bunch)
            }
        }
    });