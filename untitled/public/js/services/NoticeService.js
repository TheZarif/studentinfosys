/**
 * Created by Zarif on 18/11/2015.
 */

app.service('NoticeService', function ($http, toastr, $rootScope) {
    var baseUrl = $rootScope.baseUrl;

    this.createNotice = function (event, successFunc, errFunc) {
        if(!validate()) {
            toastr.warning('You must enter all fields', 'Error');
            return;
        }

        $http.post(baseUrl + "events", event)
            .success(function (data) {
                toastr.success('Notice sent!', 'Success!');
                successFunc();
                console.log('Course added', data);
            })
            .error(function (res, status) {
                if(status == 401) {
                    toastr.error('You are not authorized to do that', 'Sorry');
                }
                else{
                    toastr.error('Could not add event', 'Error');
                }
            })
    };

    this.getEvents = function (userId, successFunc, errFunc) {
        $http.get(baseUrl + "getNotificationsForUser/" + userId)
            .success(function (notifications) {
                if(successFunc)     successFunc();
                console.log('notifications retrieved for user: '+ userId);
                this.events = events;
            })
            .error(function (res, status) {
                if(status == 401) {
                    toastr.error('You are not authorized to do that', 'Error');
                }
                else{
                    toastr.error('Could not get Notices', 'Oops');
                }
            })
    };

    this.deleteNotice = function (event, successFunc, errFunc) {
        $http.delete(baseUrl + "events/" + event._id)
            .success(function () {
                if(successFunc)     successFunc();
            })
            .error(function (res, status) {
                if(status == 401) {
                    toastr.error('You are not authorized to do that', 'Error');
                    //$state.go();
                }
                else{
                    toastr.error('Could not delete course', 'Error');
                }
            })
    };

    function validate(){
        return (!!$scope.event && ($scope.event != {}) && !!$scope.event.subject  &&  !!$scope.event.description)
    }


});