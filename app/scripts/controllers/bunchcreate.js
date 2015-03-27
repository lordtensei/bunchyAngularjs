'use strict';

angular.module('jwtApp')
    .controller('BunchcreateCtrl', function ($scope, $http, API_URL, leafletData, alert, $state, $auth, usSpinnerService, locationServices, bunchServices) {

        function init() {

            $scope.profiles = [{
                name: 'Personal'
            }, {
                name: 'Business'
            }];

            $scope.abilities = [{
                name: 'All'
            }, {
                name: 'Beginner'
            }, {
                name: 'Intermediate'
            }, {
                name: 'Advanced'
            }];

            $scope.policies = [{
                name: 'None'
            }, {
                name: 'Drop'
            }, {
                name: 'No drop'
            }];

            $scope.profile = {};
            $scope.ability = {};
            $scope.policy = {};

            locationServices.getUserLocation().success(function (startlocation) {
                $scope.startlocation = startlocation;

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
                            message: "Where does the team meet?",
                            draggable: true
                        }
                    }
            }).error(function () {
                console.log('unable to get locations');
                alert('success', 'Please select a location');
                $state.go('locationset');
            });
        }

        $scope.minDate = new Date();
        $scope.time = new Date(0, 0, 0, 5, 30, 0, 0);
        $scope.oneofftime = new Date(0, 0, 0, 5, 30, 0, 0);
        $scope.center = {};
        $scope.privateradio = 'No';
        $scope.private = false;

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
                ability: $scope.ability.selected.name,
                policy: $scope.policy.selected.name,
                profile: $scope.profile.selected.name,
                //oneoff: $scope.oneoff,
                startlocation: startlocation,
                website: $scope.website,
                //daysofweek: $scope.multipleSelect.days,
                //time: $scope.time,
                //routes: $scope.routes,
                //oneoffdate: $scope.oneoffdate,
                private: $scope.private
                    //sponsored: $scope.sponsored,
                    //sponsorname: $scope.sponsorname
            }).success(function () {
                alert('success', "Team created", '');
                $state.go('myteams');
            }).error(function (err) {
                alert('warning', "Unable to create team?", '');
            });
        }
        init();
    });