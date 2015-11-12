/**
 * Created by Zarif on 08/11/2015.
 */

ctrls.controller('NoticeCtrl', function ($scope, $rootScope, $state, $http, toastr, AuthorizationFactory) {
    //if(!$rootScope.user) $state.go('login')

    var userId = $rootScope.user.userId;
    $scope.roleType = $rootScope.user.roleType;
    var baseUrl = $rootScope.baseUrl;
    $scope.authorizer = AuthorizationFactory;
    init();

    var viewCreateNotice = false;
    $scope.viewIfCreateNotice = function () {
        return viewCreateNotice;
    };
    $scope.toggleViewCreateNotice = function () {
        if(viewCreateNotice)       viewCreateNotice = false;
        else                       viewCreateNotice = true;
    };

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
                    toastr.error('You are not authorized to do that', 'Sorry');
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
                $scope.notices = notices;
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

    $scope.deleteNotice = function (notice) {
        remove($scope.notices, notice);

        $http.get(baseUrl + "notice", {userId : userId})
            .success(function (notifications) {
                console.log('notifications retrieved for user: '+ userId);
                remove(notices, notice);
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

    $scope.notices = [
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
        return (!!$scope.subject  &&  !!$scope.description)
    }

    function init(){
        $scope.subject = "";
        $scope.description = "";
    }

    function remove(notices, notice){
        var index = notices.indexOf(notice);
        if(index > -1)      notices.splice(index, 1);
    }

});