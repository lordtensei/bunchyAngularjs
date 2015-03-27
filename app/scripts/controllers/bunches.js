'use strict';

angular.module('jwtApp')
    .controller('BunchesCtrl', function ($scope, $http, API_URL, alert, $state, usSpinnerService, leafletData, locationServices, rideServices, bunchServices, dateServices, moment) {

        function init() {
            $scope.tabs[moment().day()].active = true;
            loadBunchesForActiveTab();
        }

        function errorCallback(err) {
            if (err == null) {
                alert('warning', "unable to get bunches! ", "No web server?");
                $state.go('login');
            }
            if (err.message == 'location_not_set') {
                alert('warning', "Please set your location", "");
                $state.go('locationset');
            } else {
                alert('warning', "unable to get bunches! ", err.message);
                $state.go('login');
            }
        }

        function drawMarkers(bunches) {
            angular.forEach(bunches, function (bunch, key) {
                $scope.markers.push({
                    lat: bunch.startlocation[0].lat,
                    lng: bunch.startlocation[0].lng,
                    message: bunch.name,
                    layer: 'rides',
                    zoom: 8
                });
            });
        }

        function getRides(dayofyear) {
            usSpinnerService.spin('loginSpin');
            bunchServices.getRidesByUserandDay(dayofyear).success(function (rides) {
                console.log(rides);
                $scope.bunches = rides;
                drawMarkers(rides);
                usSpinnerService.stop('loginSpin');
            }).error(errorCallback);
        }

        function getBunchesOneOff(dayofyear) {
            usSpinnerService.spin('loginSpin');
            bunchServices.getBunchesByUserandDayOneOff(dayofyear).success(function (bunches) {
                $scope.oneoffbunches = bunches;
                drawMarkers(bunches);
                usSpinnerService.stop('loginSpin');
            }).error(errorCallback);
        }

        function getRiders(rideid) {
            rideServices.getRiders(rideid).success(function (riders) {}).error(errorCallback);
        }

        function loadBunchesForActiveTab() {
            var activetab = $scope.active();
            $scope.center = {};
            $scope.markers = [];
            var adddays = dateServices.DaysToAdd(dateServices.GetDayNumber(moment().format('dddd')), dateServices.GetDayNumber(activetab.title));
            var datefortab = moment().add(adddays, 'd');
            getRides(datefortab.dayOfYear());
            getBunchesOneOff(datefortab.dayOfYear());
            $scope.dayofweekdisplay = datefortab.toDate();
        }

        $scope.tabs = [
            {
                title: 'Sun'
            },
            {
                title: 'Mon'
            },
            {
                title: 'Tue'
            },
            {
                title: 'Wed'
            },
            {
                title: 'Thu'
            },
            {
                title: 'Fri'
            },
            {
                title: 'Sat'
            }
        ];

        $scope.active = function () {
            return $scope.tabs.filter(function (tab) {
                return tab.active;
            })[0];
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
                rides: {
                    name: 'Rides',
                    type: 'markercluster',
                    visible: true
                }
            }
        };

        $scope.refresh = function () {
            loadBunchesForActiveTab();
        };

        $scope.addBunch = function () {
            usSpinnerService.spin('loginSpin');
            $state.go('bunchcreate');
        };

        $scope.tabclick = function () {
            loadBunchesForActiveTab();
        }

        $scope.in = function (rideid) {
            rideServices.addRider(rideid).success(function (rider) {
                alert('success', "You'r in!", '');
                console.log('success');
                loadBunchesForActiveTab();
            }).error(errorCallback);
        }

        $scope.out = function (rideid) {
            alert('danger', "You'r out! ", '');
            rideServices.removeRider(rideid).success(function (rider) {
                loadBunchesForActiveTab();
            }).error(errorCallback);
        }

        locationServices.getUserLocation().success(function (startlocation) {
            $scope.startlocation = startlocation;
            $scope.center = {
                lat: $scope.startlocation.lat,
                lng: $scope.startlocation.lng,
                zoom: 12
            };
        }).error(errorCallback);

        init();

    });