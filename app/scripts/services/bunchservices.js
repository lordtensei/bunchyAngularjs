'use strict';

angular.module('jwtApp')
    .factory('bunchServices', function (API_URL, $http) {
        return {
            getRidesByUserandDay: function (id) {
                return $http.get(API_URL + 'bunch/getridesbylocationandday?id=' + id)
            },
            getBunchesByUser: function () {
                return $http.get(API_URL + 'bunch/byuser');
            },
            getRidesByUserandDayOneOff: function (id) {
                return $http.get(API_URL + 'bunch/getoneoffridesbylocationandday?id=' + id)
            },
            getBunchByID: function (id) {
                return $http.get(API_URL + 'bunch/' + id)
            },
            editBunch: function (bunch) {
                console.log(bunch);
                return $http.post(API_URL + 'bunch/edit', bunch)
            },
            createBunch: function (bunch) {
                return $http.post(API_URL + 'bunch/create', bunch)
            }
        }
    });