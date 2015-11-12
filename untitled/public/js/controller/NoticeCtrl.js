/**
 * Created by Zarif on 08/11/2015.
 */

ctrls.controller('NoticeCtrl', function ($scope, $rootScope, $state, $http, toastr) {
    //if(!$rootScope.user) $state.go('login')

    var userId = $rootScope.user.userId;
    var baseUrl = $rootScope.baseUrl;
    init();

    $scope.createNotice = function () {

        if(!validate()) {
            toastr.warning('You must enter all fields', 'Error');
            return;
        }

        var newNotice = {
            subject: $scope.subject,
            description: $scope.description
        };

        $http.post(baseUrl + "notice", newNotice)
            .success(function () {
                toastr.success('Course added!', 'Success!');
                init();
                console.log('Course added');
            })
            .error(function (res, status) {
                if(status == 401) {
                    toastr.error('You are not authorized to do that', 'Error');
                }
                else{
                    toastr.error('Could not add notice', 'Error');
                }
            })
    };

    $scope.getNotifications = function () {
        $http.get(baseUrl + "notifcations", {userId : userId})
            .success(function (notifications) {
                console.log('notifications retrieved for user: '+ userId);
                $scope.notifications = notifications;
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



    function validate(){
        return (!!$scope.subject  &&  !!$scope.description)
    }

    function init(){
        $scope.subject = "";
        $scope.description = "";
    }

});