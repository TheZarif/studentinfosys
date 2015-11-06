/**
 * Created by Zarif on 06/11/2015.
 */

ctrls.controller('HomeCtrl', function ($scope, $rootScope, $state, $http) {
    if(!$rootScope.user) $state.go('login')

    var baseUrl = $rootScope.baseUrl;

    $scope.user = {}

    $scope.setActive = function(active){
        $scope.active = active;
    }

    $scope.createUser = function (newUser) {
        $http.post(baseUrl + "users", newUser)
            .success(function (data, status) {
                console.log('User added');
             })
            .error(function (err) {

            })
    }

})