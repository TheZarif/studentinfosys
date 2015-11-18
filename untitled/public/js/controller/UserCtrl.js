/**
 * Created by Zarif on 06/11/2015.
 */

ctrls.controller('UserCtrl', function ($scope, $rootScope, $state, $http, toastr, AuthorizationFactory) {
    //if(!$rootScope.user) $state.go('login')

    var baseUrl = $rootScope.baseUrl;
    var userId = $rootScope.user.userId;
    var defaultSelected = 'Students';

    $scope.roleType = $rootScope.user.roleId;
    $scope.authorizer = AuthorizationFactory.isAuthorized;
    $scope.selectedItem = defaultSelected;
    $scope.semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
    $scope.user = {};

    var viewCreateUser = false;
    $scope.viewIfCreateUser = function () {
        return viewCreateUser;
    };

    $scope.toggleViewCreateUser = function () {
        if(viewCreateUser)      viewCreateUser = false;
        else {                  viewCreateUser = true;}
    };

    $scope.createUser = function () {
        if(!validate($scope.user)) {
            toastr.error("Required fields missing", "Oops!");
            return;
        }
        $http.post(baseUrl + "users", $scope.user)
            .success(function (data, status) {
                toastr.success('User added!', 'Success!');
                $scope.user = {};
                console.log('User added');
            })
            .error(function (res, status) {
                var message = "";
                if(status == 403){toastr.error('You are not logged in!', 'Error');}
                else if(status == 401) {toastr.error('You are not authorized to do that', 'Error');}
                else{toastr.error('Could not add user', 'Error');}
            })
    };

    $scope.selectItem = function (type) {
        $scope.selectedItem = type;
        $scope.getUsers(type);
    }

    $scope.getUsers = function(type){
        $http.get(baseUrl + "All" + type )
            .success(function (users) {
                console.log('users retrieved for user: '+ userId);
                $scope.users = users;
            })
            .error(function (res, status) {
                if(status == 401) {
                    toastr.error('You are not authorized to do that', 'Error');
                    $scope.users = [];
                }
                else{
                    toastr.error('Could not load users', 'Error');
                    $scope.users = [];
                }
            })
    };

    $scope.editUser = function (user) {
        $http.put(baseUrl + "users/" + user._id, user)
            .success(function (data) {
                toastr.success("User updated");
            })
            .error(function (err) {
                toastr.error("Error")
            })
    };

    $scope.deleteUser = function (user) {
        var r = window.confirm("Are you sure?");
        if(r == true)   {
            $http.delete(baseUrl + "users/" + user._id)
                .success(function (data) {
                    toastr.success("User deleted");
                    remove($scope.users, user)
                })
                .error(function (err) {
                    toastr.error("Error")
                })
        }
    };



    $scope.ifStudent = function (user) {
        return user.roleId == "Student";
    }

    $scope.getUsers(defaultSelected);

    function remove(objects, object){
        var index = objects.indexOf(object);
        if(index > -1)      objects.splice(index, 1);
    }

    function validate(user){
        if(!user)   return false;
        else return !!user.userName && !!user.email && !!user.password && !!user.roleId;
    }

});