/**
 * Created by Zarif on 06/11/2015.
 */

ctrls.controller('NavCtrl', function ($scope, $rootScope, $http, $state) {

    var url = $rootScope.baseUrl;
    $scope.user = $rootScope.user;


    $scope.login = function () {
        window.alert($scope.username )
    }

    $scope.logout = function () {
        $http.get(url + "logout").success(function (data, status) {
            window.alert("Logged out successfully");
            window.localStorage.clear();
            $rootScope.user = $scope.user = null;
            $state.go('login');
        })
    }

})