'use strict';

angular.module('jwtApp')
    .factory('bunchServices', function (API_URL, $http) {
        return {
            getBunchesByUserandDay: function (id) {
                return $http.get(API_URL + 'bunch/byuserandday?id=' + id)
            },
            getBunchesByUsers: function () {
                return $http.get(API_URL + 'bunch/byuser');
            },
            getBunchesByUserandDayOneOff: function (id) {
                return $http.get(API_URL + 'bunch/byuseranddayoneoff?id=' + id)
            },
            getBunchByID: function (id) {
                return $http.get(API_URL + 'bunch/' + id)
            },
            createBunch: function (bunch) {
                return $http.post(API_URL + 'bunch/create', bunch)
            }
        }
    });