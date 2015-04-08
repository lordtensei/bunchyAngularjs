'use strict';

angular.module('jwtApp')
    .controller('BunchcreateCtrl', function ($scope, $http, API_URL, leafletData, alert, $state, $auth, usSpinnerService, locationServices, bunchServices, friendServices) {

        function init() {

            $scope.friendsinvited = [];

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
            }).error(errorCallback);

            getFriends();
        }

        function errorCallback(err) {
            if (err == null) {
                alert('warning', "unable to create bunch! ", "No web server?");
                $state.go('login');
            }
            if (err.message == 'location_not_set') {
                alert('warning', "Please set your location", "");
                $state.go('locationset');
            } else {
                alert('warning', "unable to create bunch! ", err.message);
                $state.go('login');
            }
        }

        function getFriends() {
            //usSpinnerService.spin('loginSpin');
            friendServices.getFriends().success(function (friends) {
                console.log(friends);
                $scope.friends = friends;
                // usSpinnerService.stop('loginSpin');
            }).error(errorCallback);
        }


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

        $scope.inviteFriend = function (friendid, fname, lname) {
            $scope.friendsinvited.push({
                id: friendid,
                fname: fname,
                lname: lname
            });
        };

        $scope.unInviteFriend = function (idx) {
            $scope.friendsinvited.splice(idx, 1);
        };

        $scope.submit = function () {

            var startlocation = [{
                lat: $scope.markers.mainMarker.lat,
                lng: $scope.markers.mainMarker.lng
            }]

            if ($scope.privateradio == 'Yes') {
                $scope.private = true;
            } else {
                $scope.private = false;
            }

            bunchServices.createBunch({
                name: $scope.name,
                desc: $scope.desc,
                ability: $scope.ability.selected.name,
                policy: $scope.policy.selected.name,
                profile: $scope.profile.selected.name,
                startlocation: startlocation,
                website: $scope.website,
                private: $scope.private,
                invited: $scope.friendsinvited
            }).success(function (result) {
                //console.log(result);
                $scope.bunch = result;
                alert('success', "Team created", '');
                $state.go('addride', {
                    "bunchID": $scope.bunch.id
                });
            }).error(errorCallback);
        }

        init();
    });