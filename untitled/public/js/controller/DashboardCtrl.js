/**
 * Created by Zarif on 08/11/2015.
 */

ctrls.controller('DashboardCtrl', function (DashboardFactory, $rootScope, $scope) {

    var user = $rootScope.user;

    $scope.optionsList = DashboardFactory.getOptions(user.roleId);
    $scope.selectedItem = $scope.optionsList[1];

    $scope.selectItem = function (selectedItem) {
        $scope.selectedItem = selectedItem;
    }
})