'use strict';

angular.module('jwtApp').directive('stravaRoute', function () {
    return {
        scope: {
            cen: '=',
            center: '=',
            layers: '='
        },
        templateUrl: 'templates/stravaRoute.html'
    };
});