/**
 * Created by Zarif on 08/11/2015.
 */

ctrls.controller('DashboardCtrl', function (DashboardFactory, $rootScope, $scope, AuthenticationFactory, toastr, $location) {

    if(AuthenticationFactory.isLogged){
        var user = AuthenticationFactory.user;

        $scope.optionsList  = DashboardFactory.getOptions(user.roleId);
        $scope.selectedItem = $scope.optionsList[0];

        $scope.selectItem = function (selectedItem) {
            $scope.selectedItem = selectedItem;
        }
    }
    else{
        toastr.warning('The page you are trying to access requires you to log in', "Oops!");
        $location('/login');
    }

});