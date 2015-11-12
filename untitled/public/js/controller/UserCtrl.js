/**
 * Created by Zarif on 06/11/2015.
 */

ctrls.controller('UserCtrl', function ($scope, $rootScope, $state, $http, toastr) {
    //if(!$rootScope.user) $state.go('login')

    var baseUrl = $rootScope.baseUrl;

    $scope.user = {};
    var viewCreateUser = false;
    $scope.viewIfCreateUser = function () {
        return viewCreateUser;
    }
    $scope.toggleViewCreateUser = function () {
        if(viewCreateUser)       viewCreateUser = false;
        else                            viewCreateUser = true;
    }

    $scope.createUser = function (newUser) {
        $http.post(baseUrl + "users", newUser)
            .success(function (data, status) {
                toastr.success('User added!', 'Success!');
                $scope.user = {};
                console.log('User added');
            })
            .error(function (res, status) {
                var message = "";
                if(status == 403){
                    toastr.error('You are not logged in!', 'Error');
                }
                else if(status == 401) {
                    toastr.error('You are not authorized to do that', 'Error');
                }
                else{
                    toastr.error('Could not add user', 'Error');
                }

            })
    }

})