'use strict';

angular.module('jwtApp')
    .controller('LogoutCtrl', function ($state, $auth, $http, API_URL) {
        $http.get(API_URL + 'auth/logout/');
        $auth.logout();
        $state.go('main');
    });