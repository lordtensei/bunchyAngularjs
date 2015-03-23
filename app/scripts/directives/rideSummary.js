'use strict';

angular.module('jwtApp').directive('rideSummary', function () {
    return {
        scope: {
            rides: '='
        },
        templateUrl: 'views/rideSummary.html'
    };
});