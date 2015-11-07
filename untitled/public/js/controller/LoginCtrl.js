/**
 * Created by Zarif on 06/11/2015.
 */


ctrls.controller('LoginCtrl', function ($scope, $http, $rootScope, $state, toastr) {
    $scope.username = "";
    $scope.password = "";
    $scope.rememberMe = false;
    var url = 'http://localhost:3000/api/';

    $scope.submit = function () {
        if($scope.username != '' && $scope.password != ''){
            $http.post(url + 'authenticateUser', {email: $scope.username, password: $scope.password})
                .success(function (data, status) {
                    toastr.success('Logged in!', 'Success!');
                    $rootScope.user = data[0];
                    localStorage.setItem('userObject', JSON.stringify($rootScope.user));
                    $state.go('home')
                })
                .error(function () {
                    toastr.error('Log in failed', 'Error');
                })
        }
    }



})