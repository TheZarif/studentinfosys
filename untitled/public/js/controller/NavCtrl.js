/**
 * Created by Zarif on 06/11/2015.
 */

'use strict';

ctrls.controller('NavCtrl', function ($scope, $state, UserAuthFactory, AuthenticationFactory) {

    $scope.user = AuthenticationFactory.user;
    $scope.isLoggedIn = AuthenticationFactory.isLogged;

    $scope.logout = function () {
        UserAuthFactory.logout();
        $scope.isLoggedIn = false;
        $state.go('login');
    }
});