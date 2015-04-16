'use strict';

angular.module('jwtApp')
    .controller('EditbunchCtrl', function ($state, $scope, $stateParams, bunchServices, friendServices, alert) {

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

            $scope.privateoptions = [{
                name: 'Private'
            }, {
                name: 'Public'
            }];

            $scope.profile = {};
            $scope.ability = {};
            $scope.policy = {};
            $scope.private = {};
            $scope.center = {};

            bunchServices.getBunchByID($stateParams.bunchID).success(function (bunch) {
                $scope.bunch = bunch;

                $scope.ability.selected = {
                    "name": bunch.ability
                };

                $scope.policy.selected = {
                    "name": bunch.policy
                };

                $scope.profile.selected = {
                    "name": bunch.profile
                };

                if (bunch.private == true) {
                    $scope.private.selected = {
                        "name": 'Private'
                    };
                } else {
                    $scope.private.selected = {
                        "name": 'Public'
                    };
                }

                $scope.center = {
                        lat: bunch.startlocation[0].lat,
                        lng: bunch.startlocation[0].lng,
                        zoom: 13
                    },

                    $scope.markers = {
                        mainMarker: {
                            lat: bunch.startlocation[0].lat,
                            lng: bunch.startlocation[0].lng,
                            focus: true,
                            draggable: true
                        }
                    }

                //Add invited friends to friends array
                angular.forEach(bunch.invited, function (value, key) {
                    $scope.friendsinvited.push(value);
                });

            }).error(function () {
                alert('warning', 'unable to get bunch');
            });

            getFriends();
        }

        $scope.$on("leafletDirectiveMap.click", function (event, args) {
            var leafEvent = args.leafletEvent;
            $scope.markers.mainMarker.lat = leafEvent.latlng.lat;
            $scope.markers.mainMarker.lng = leafEvent.latlng.lng;
        });

        function getFriends() {
            //usSpinnerService.spin('loginSpin');
            friendServices.getFriends().success(function (friends) {
                $scope.friends = friends;
                // usSpinnerService.stop('loginSpin');
            }).error(function () {
                alert('warning', 'unable to get friends');
            });
        }

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

            if ($scope.private.selected.name == 'Private') {
                $scope.bunch.private = true;
            } else {
                $scope.bunch.private = false;
            }

            $scope.bunch.profile = $scope.profile.selected.name;
            $scope.bunch.ability = $scope.ability.selected.name;
            $scope.bunch.policy = $scope.policy.selected.name;

            $scope.bunch.invited = $scope.friendsinvited;

            $scope.bunch.startlocation[0].lat = $scope.markers.mainMarker.lat;
            $scope.bunch.startlocation[0].lng = $scope.markers.mainMarker.lng;

            bunchServices.editBunch(
                $scope.bunch
            ).success(function () {
                alert('success', "Bunch updated", '');
                $state.go('myteams');
            }).error(function (err) {
                alert('warning', "Unable to update bunch?", '');
            });
        }

        init();
    });