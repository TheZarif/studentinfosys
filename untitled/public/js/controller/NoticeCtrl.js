/**
 * Created by Zarif on 08/11/2015.
 */

ctrls.controller('NoticeCtrl', function ($scope, $rootScope, $state, $http, toastr, AuthorizationFactory) {
    //if(!$rootScope.user) $state.go('login')

    var userId = $rootScope.user.userId;
    $scope.roleType = $rootScope.user.roleType;
    var baseUrl = $rootScope.baseUrl;
    $scope.authorizer = AuthorizationFactory;
    $scope.event = {};

    var viewCreateNotice = false;
    $scope.viewIfCreateNotice = function () {
        return viewCreateNotice;
    };
    $scope.toggleViewCreateNotice = function () {
        viewCreateNotice = !viewCreateNotice;
    };

    $scope.createNotice = function () {

        if(!validate()) {
            toastr.warning('You must enter all fields', 'Error');
            return;
        }

        $http.post(baseUrl + "events", $scope.event)
            .success(function () {
                toastr.success('Notice sent!', 'Success!');
                $scope.event = {};
                console.log('Course added');
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

    $scope.getEvents = function () {
        $http.get(baseUrl + "getNotificationsForUser/" + userId)
            .success(function (notifications) {
                console.log('notifications retrieved for user: '+ userId);
                $scope.events = events;
            })
            .error(function (res, status) {
                if(status == 401) {
                    toastr.error('You are not authorized to do that', 'Error');
                    //$state.go();
                }
                else{
                    toastr.error('Could not add course', 'Error');
                }
            })
    };

    $scope.deleteNotice = function (event) {
        remove($scope.events, event);

        $http.delete(baseUrl + "events/" + event._id)
            .success(function () {
                remove(events, event);
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

    $scope.events = [
        {
            subject: "Oooh",
            body: "Hello",
            sender: "Abdus"
        },
        {
            subject: "Oh",
            body: "Hi",
            sender: "Abdus"
        }
    ]



    function validate(){
        return (!!$scope.event && ($scope.event != {}) && !!$scope.event.subject  &&  !!$scope.event.description)
    }

    function remove(events, event){
        var index = events.indexOf(event);
        if(index > -1)      events.splice(index, 1);
    }

});