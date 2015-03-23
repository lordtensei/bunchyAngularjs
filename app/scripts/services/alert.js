'use strict';

angular.module('jwtApp')
    .service('alert', function ($rootScope, $timeout) {
        var alertTimeout;

        return function (type, title, message, timeout) {
            $rootScope.close = function () {
                    $rootScope.alert.show = false;
                },
                $rootScope.alert = {
                    hasBeenShown: true,
                    show: true,
                    type: type,
                    message: message,
                    title: title
                };
            $timeout.cancel(alertTimeout);
            if (timeout != 0) {
                alertTimeout = $timeout(function () {
                    $rootScope.alert.show = false;
                }, timeout || 2500);
            }
        }
    });