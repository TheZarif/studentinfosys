/**
 * Created by Zarif on 20/11/2015.
 */

ctrls.controller('ProfileCtrl', function ($scope, AuthenticationFactory, $http, $rootScope, toastr) {
    $scope.user = AuthenticationFactory.user;

    $scope.savePassword = function () {
        if($scope.password) {
            $http.post($rootScope.baseUrl + "", $scope.password)
                .success(function (data) {
                    console.log(data);
                    toastr.success("Updated password", "Success");
                })
                .error(function () {
                    toastr.warning("Could not save password", "Sorry");
                })
        }
    }
})