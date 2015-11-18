/**
 * Created by Zarif on 06/11/2015.
 */

ctrls.controller('NavCtrl', function ($scope, $rootScope, $http, $state, UserAuthFactory) {

    var url = $rootScope.baseUrl;
    $scope.user = $rootScope.user;


    $scope.login = function () {
        window.alert($scope.username )
    }

    $scope.logout = function () {
        UserAuthFactory.logout();
        //$http.get(url + "logout").success(function (data, status) {
        //    window.alert("Logged out successfully");
        //    window.localStorage.clear();
        //    $rootScope.user = $scope.user = null;
        //    $state.go('login');
        //})
        $state.go('login');
    }

})