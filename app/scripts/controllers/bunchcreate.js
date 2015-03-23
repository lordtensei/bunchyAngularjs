'use strict';

angular.module('jwtApp')
    .controller('BunchcreateCtrl', function ($scope, $http, API_URL, leafletData, alert, $state, $auth, usSpinnerService, stravaServices, locationServices, bunchServices) {

        function init() {

            locationServices.getUserLocation().success(function (startlocation) {
                $scope.startlocation = startlocation;
                $scope.cen = {
                        lat: $scope.startlocation.lat,
                        lng: $scope.startlocation.lng,
                        zoom: 13
                    },

                    $scope.center = {
                        lat: $scope.startlocation.lat,
                        lng: $scope.startlocation.lng,
                        zoom: 13
                    },

                    $scope.markers = {
                        mainMarker: {
                            lat: $scope.startlocation.lat,
                            lng: $scope.startlocation.lng,
                            focus: true,
                            message: "Where does the ride meet?",
                            draggable: true
                        }
                    }
            }).error(function () {
                console.log('unable to get locations');
                alert('success', 'Please select a location');
                $state.go('locationset');
            });

            $scope.getStravaActivities();
        }

        $scope.routes = [];
        $scope.showmap = {};
        $scope.isstravaauth = {};
        $scope.minDate = new Date();
        $scope.time = new Date(0, 0, 0, 5, 30, 0, 0);
        $scope.oneofftime = new Date(0, 0, 0, 5, 30, 0, 0);
        $scope.center = {};
        $scope.paths = {};
        $scope.cen = {};
        $scope.oneoffdate = new Date();
        $scope.availableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        $scope.hour = {};
        $scope.stravaride = {};
        $scope.hours = ['1', '2', '3', '4', '5', '6', '7'];
        $scope.multipleSelect = {};
        $scope.multipleSelect.days = ['Tuesday', 'Thursday'];
        $scope.oneoff = false;
        $scope.oneoffradio = 'No';
        $scope.privateradio = 'No';
        $scope.private = false;
        $scope.sponsoredradio = 'No';

        $scope.addRoute = function () {
            $scope.routes.push({
                name: $scope.stravaride.selected.name,
                activityid: $scope.stravaride.selected.id,
                path: $scope.paths.p1.latlngs
            });
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

        $scope.defaults = {
            tileLayer: "http://a.tiles.mapbox.com/v4/craigvl.lc6j9gf5/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY3JhaWd2bCIsImEiOiJTSEt3NFE0In0.uqpehJUakJt_dPUiaTKLag",
        }

        $scope.$on("leafletDirectiveMap.click", function (event, args) {
            var leafEvent = args.leafletEvent;
            $scope.markers.mainMarker.lat = leafEvent.latlng.lat;
            $scope.markers.mainMarker.lng = leafEvent.latlng.lng;
        });

        $scope.submit = function () {

            var startlocation = [{
                lat: $scope.markers.mainMarker.lat,
                lng: $scope.markers.mainMarker.lng
            }]

            if ($scope.oneoffradio == 'Yes') {
                $scope.oneoff = true;
            } else {
                $scope.oneoff = false;
            }

            if ($scope.privateradio == 'Yes') {
                $scope.private = true;
            } else {
                $scope.private = false;
            }

            if ($scope.sponsoredradio == 'Yes') {
                $scope.sponsored = true;
            } else {
                $scope.sponsored = false;
            }

            var daysofweeks = [{}];

            bunchServices.createBunch({
                name: $scope.name,
                desc: $scope.desc,
                oneoff: $scope.oneoff,
                startlocation: startlocation,
                daysofweek: $scope.multipleSelect.days,
                time: $scope.time,
                routes: $scope.routes,
                oneoffdate: $scope.oneoffdate,
                private: $scope.private,
                sponsored: $scope.sponsored,
                sponsorname: $scope.sponsorname
            }).success(function () {
                alert('success', "Ride created", '');
                $state.go('bunches');
            }).error(function (err) {
                alert('warning', "Unable to create ride?", '');
            });
        }
        init();
    });