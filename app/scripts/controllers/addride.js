'use strict';

angular.module('jwtApp')
    .controller('AddrideCtrl', function ($scope, $stateParams, $state, usSpinnerService, $auth, alert, stravaServices, locationServices, bunchServices, rideServices) {

        $scope.routePlaceholder = 'Enter route name';
        $scope.routeButton = 'Add route';
        $scope.routeButtonStrava = 'Add Strava route';

        function init() {

            $scope.bunch = {};
            $scope.routes = [];
            $scope.isstravaauth = {};
            $scope.showmap = {};
            $scope.cen = {};
            $scope.paths = {};
            $scope.oneoffdate = new Date();
            $scope.availableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            $scope.hour = {};
            $scope.stravaride = {};
            $scope.hours = ['1', '2', '3', '4', '5', '6', '7'];
            $scope.multipleSelect = {};
            $scope.multipleSelect.days = ['Tuesday', 'Thursday'];
            $scope.oneoff = false;
            $scope.oneoffradio = 'No';
            $scope.minDate = new Date();
            $scope.time = new Date(0, 0, 0, 5, 30, 0, 0);
            $scope.oneofftime = new Date(0, 0, 0, 5, 30, 0, 0);

            $scope.layers = {
                baselayers: {
                    osm: {
                        name: 'mapbox',
                        type: 'xyz',
                        url: 'http://a.tiles.mapbox.com/v4/craigvl.lc6j9gf5/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY3JhaWd2bCIsImEiOiJTSEt3NFE0In0.uqpehJUakJt_dPUiaTKLag',
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            continuousWorld: true
                        }
                    }
                },
                overlays: {
                    lines: {
                        name: 'Lines',
                        type: 'group',
                        visible: true
                    }
                }
            };

            locationServices.getUserLocation().success(function (startlocation) {
                $scope.startlocation = startlocation;
                $scope.cen = {
                    lat: $scope.startlocation.lat,
                    lng: $scope.startlocation.lng,
                    zoom: 13
                }
            }).error(function () {
                console.log('unable to get locations');
                alert('success', 'Please select a location');
                $state.go('locationset');
            });

            bunchServices.getBunchByID($stateParams.bunchID).success(function (bunch) {
                console.log(bunch);
                $scope.bunch = bunch;
            }).error(function () {
                console.log('unable to get bunch');
                alert('success', 'unable to get bunch');
                $state.go('myteams');
            });

            $scope.getStravaActivities();
        }

        $scope.addRoute = function () {
            $scope.routes.push({
                name: $scope.stravaride.selected.name,
                activityid: $scope.stravaride.selected.id,
                path: $scope.paths.p1.latlngs
            });
            $scope.routeButtonStrava = 'Add another Strava route';
        };

        $scope.addRouteNonStrava = function () {
            $scope.routes.push({
                name: $scope.routename
            });
            $scope.routename = '';
            $scope.routeButton = 'Add another route';
            $scope.routePlaceholder = 'Enther another route name';
        };

        $scope.deleteRoute = function (idx) {
            $scope.routes.splice(idx, 1);
        };

        $scope.getStravaActivities = function () {
            $scope.showmap = false;
            stravaServices.getStravaActivities().success(function (stravarides) {
                $scope.stravarides = stravarides;
                $scope.isstravaauth = true;
                $scope.showmap = true;
            }).error(function (err) {
                $scope.isstravaauth = false;
                $scope.showmap = false;
            });
        };

        $scope.stravaAuth = function () {
            usSpinnerService.spin('createSpin');
            $auth.link('strava', $auth.getPayload()).then(function (res) {
                $scope.getStravaActivities();
                usSpinnerService.stop('createSpin');
            }).catch(function (err) {
                alert('warning', "Unable to connect to Strava! ", '', 4000);
                usSpinnerService.stop('createSpin');
            });
        };

        $scope.getStravaRoute = function () {
            usSpinnerService.spin('createSpin');
            stravaServices.getStravaActivity($scope.stravaride.selected.id).success(function (stravaride) {
                $scope.cen = {
                        lat: stravaride.startlat,
                        lng: stravaride.startlng,
                        zoom: 11
                    },
                    $scope.paths = {
                        p1: {
                            color: '#008000',
                            weight: 4,
                            latlngs: stravaride.routearray,
                            layer: 'lines'
                        }
                    }
                usSpinnerService.stop('createSpin');
            }).error(function (err) {
                alert('warning', "Strava activities! ", err.message);
            })
        };

        $scope.submit = function () {

            if ($scope.oneoffradio == 'Yes') {
                $scope.oneoff = true;
            } else {
                $scope.oneoff = false;
            };

            var daysofweeks = [{}];

            rideServices.addRideDetails({
                bunchid: $scope.bunch.id,
                name: $scope.name,
                oneoff: $scope.oneoff,
                daysofweek: $scope.multipleSelect.days,
                time: $scope.time,
                routes: $scope.routes,
                oneoffdate: $scope.oneoffdate
            }).success(function () {
                alert('success', "Team created", '');
                $state.go('myteams');
            }).error(function (err) {
                alert('warning', "Unable to create team?", '');
            });
        }

        init();

    });