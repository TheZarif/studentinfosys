/**
 * Created by Zarif on 06/11/2015.
 */

ctrls.controller('UserCtrl', function ($scope, $rootScope, $state, $http, toastr, AuthorizationFactory) {
    //if(!$rootScope.user) $state.go('login')

    var baseUrl = $rootScope.baseUrl;
    var userId = $rootScope.user.userId;
    $scope.roleType = $rootScope.user.roleType;
    $scope.authorizer = AuthorizationFactory.isAuthorized;

    $scope.selectedItem = 'teacher';


    $scope.user = {};
    var viewCreateUser = false;
    $scope.viewIfCreateUser = function () {
        return viewCreateUser;
    };
    $scope.toggleViewCreateUser = function () {
        if(viewCreateUser)      viewCreateUser = false;
        else                    viewCreateUser = true;
    };

    $scope.createUser = function () {
        $http.post(baseUrl + "users", $scope.user)
            .success(function (data, status) {
                toastr.success('User added!', 'Success!');
                $scope.user = {};
                console.log('User added');
            })
            .error(function (res, status) {
                var message = "";
                if(status == 403){
                    toastr.error('You are not logged in!', 'Error');
                }
                else if(status == 401) {
                    toastr.error('You are not authorized to do that', 'Error');
                }
                else{
                    toastr.error('Could not add user', 'Error');
                }

            })
    };

    $scope.selectItem = function (type) {
        $scope.selectedItem = type;
        $scope.getUsers(type);
    }

    $scope.getUsers = function(type){
        $http.get(baseUrl + "users", type)
            .success(function (users) {
                console.log('users retrieved for user: '+ userId);
                $scope.users = users;
            })
            .error(function (res, status) {
                if(status == 401) {
                    toastr.error('You are not authorized to do that', 'Error');
                    $scope.users = [];
                    //$state.go();
                }
                else{
                    toastr.error('Could not load users', 'Error');
                    $scope.users = [];
                }
            })
    };

    $scope.editUser = function (user) {
        $http.put(baseUrl + "users/" + user.userId, user)
            .success(function (data) {
                toastr.success("User updated");
            })
            .error(function (err) {
                toastr.error("Error")
            })
    }

    $scope.users = [
        {
            _id: "10101",
            userName: "Sami",
            email: "sami@yahoo.com",
            contactNo: "+88017171756",
            designation: ""
        },
        {
            _id: "10111",
            userName: "Jamil",
            email: "jamil@yahoo.com",
            contactNo: "+88017171756",
            designation: "Associate Professor"
        }
    ]

    $scope.getUsers();

});