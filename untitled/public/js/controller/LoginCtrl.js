/**
 * Created by Zarif on 06/11/2015.
 */

ctrls.controller('LoginCtrl', function ($scope, $http, $rootScope, $state, toastr, UserAuthFactory, AuthenticationFactory, $window) {
    $scope.email = "";
    $scope.password = "";
    $scope.rememberMe = false;
    var url = 'http://localhost:3000/api/';

    $scope.submit = function () {
        if($scope.validate()){
            UserAuthFactory.login($scope.email, $scope.password)
                .success(function (data) {
                    AuthenticationFactory.isLogged = true;
                    AuthenticationFactory.user = data.user.email;
                    AuthenticationFactory.userRole = data.user.roleId;

                    $window.sessionStorage.token = data.token;
                    $window.sessionStorage.user = data.user.email; // to fetch the user details on refresh
                    $window.sessionStorage.userRole = data.user.roleId; // to fetch the user details on refresh

                    $rootScope.user = data.user;
                    localStorage.setItem('userObject', JSON.stringify($rootScope.user));
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