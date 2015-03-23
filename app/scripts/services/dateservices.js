'use strict';

angular.module('jwtApp')
    .factory('dateServices', function () {
        return {
            //http://stackoverflow.com/questions/7611402/how-to-get-the-date-of-the-next-sunday
            DaysToAdd: function (currentdayofweek, desireddayofweek) {
                //In this case we do want to use < rather than <= as we do want to show the current date for "Today"
                if (desireddayofweek < currentdayofweek) {
                    desireddayofweek = (desireddayofweek + 7);
                }
                return (desireddayofweek - currentdayofweek);
            },
            GetDayNumber: function (dayname) {
                if (dayname.toLowerCase() == 'sunday' || dayname.toLowerCase() == 'sun') {
                    return 0;
                }
                if (dayname.toLowerCase() == 'monday' || dayname.toLowerCase() == 'mon') {
                    return 1;
                }
                if (dayname.toLowerCase() == 'tuesday' || dayname.toLowerCase() == 'tue') {
                    return 2;
                }
                if (dayname.toLowerCase() == 'wednesday' || dayname.toLowerCase() == 'wed') {
                    return 3;
                }
                if (dayname.toLowerCase() == 'thursday' || dayname.toLowerCase() == 'thu') {
                    return 4;
                }
                if (dayname.toLowerCase() == 'friday' || dayname.toLowerCase() == 'fri') {
                    return 5;
                }
                if (dayname.toLowerCase() == 'saturday' || dayname.toLowerCase() == 'sat') {
                    return 6;
                }
            }
        }
    });