/**
 * Created by Zarif on 06/11/2015.
 */

ctrls.controller('LoginCtrl', function ($scope, $http, $rootScope, $state, toastr, UserAuthFactory, AuthenticationFactory, $window) {
    $scope.email = "";
    $scope.password = "";
    $scope.rememberMe = false;

    $scope.submit = function () {
        if($scope.validate()){
            UserAuthFactory.login($scope.email, $scope.password)
                .success(function (data) {
                    AuthenticationFactory.isLogged = true;
                    AuthenticationFactory.user = data.user;

                    //For retrieving from storage if page refreshes
                    $window.sessionStorage.token = data.token;
                    $window.sessionStorage.email = data.user.email;
                    $window.sessionStorage.roleId = data.user.roleId;
                    $window.sessionStorage.userName = data.user.userName;
                    $window.sessionStorage.userId = data.user.userId;

                    toastr.success('Logged in!', 'Success!');
                    $state.go('dashboard')
                })
                .error(function () {
                    toastr.error("Invalid Credentials");
                })
            ;
        }
        else{
            toastr.warning("Fields empty", "")
        }
    }

    $scope.validate = function(){
        return (!!$scope.email) && (!!$scope.password);
    }



});