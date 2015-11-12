/**
 * Created by Zarif on 13/11/2015.
 */

ctrls.controller('StudentCtrl', function ($scope, $rootScope, $state, $http, toastr) {
    //if(!$rootScope.user) $state.go('login')
    var userId;
    if ($rootScope.user)    userId = $rootScope.user.userId || "";
    else                    userId = "";
    var baseUrl = $rootScope.baseUrl;

    $scope.getCourses = function () {
        $http.get(baseUrl + "allcourses", {userId : userId})
            .success(function (courses) {
                console.log('Courses retrieved');
                $scope.courses = courses;
            })
            .error(function (res, status) {
                if (status == 401) {
                    toastr.error('You are not authorized to do that', 'Error');
                    //$state.go();
                }
                else {
                    toastr.error('Could not get courses', 'Error');
                }
            })
    };

    $scope.courses = [
        {
            courseName:"Networking"
        },
        {
            courseName: "Data Mining"
        }
    ]


});