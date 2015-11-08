/**
 * Created by Zarif on 06/11/2015.
 */


ctrls.controller('LoginCtrl', function ($scope, $http, $rootScope, $state, toastr) {
    $scope.username = "";
    $scope.password = "";
    $scope.rememberMe = false;
    var url = 'http://localhost:3000/api/';

    $scope.submit = function () {
        if($scope.validate()){
            $http.post(url + 'authenticateUser', {email: $scope.username, password: $scope.password})
                .success(function (data, status) {
                    $rootScope.user = data[0];
                    localStorage.setItem('userObject', JSON.stringify($rootScope.user));
                    toastr.success('Logged in!', 'Success!');
                    $state.go('home')
                })
                .error(function () {
                    toastr.error('Log in failed', 'Error');
                })
        }
        else{
            toastr.warning("Fields empty", "")
        }
    }

    $scope.validate = function(){
        return (!!$scope.username) && (!!$scope.password);
    }



})