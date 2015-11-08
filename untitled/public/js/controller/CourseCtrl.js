/**
 * Created by Zarif on 08/11/2015.
 */

ctrls.controller('CourseCtrl', function ($scope, $rootScope, $state, $http, toastr) {
    //if(!$rootScope.user) $state.go('login')

    var baseUrl = $rootScope.baseUrl;
    init();

    $scope.createCourse = function () {

        console.log(baseUrl);
        if(!$scope.validate()) {
            toastr.warning('You must enter all fields', 'Error');
            console.log($scope.courseName, $scope.courseCredit, $scope.courseId);
            return;
        }

        var newCourse = {
            name: $scope.courseName,
            id: $scope.courseId,
            credits: $scope.courseCredit
        };

        $http.post(baseUrl + "courses", newCourse)
            .success(function () {
                toastr.success('Course added!', 'Success!');
                init();
                console.log('Course added');
            })
            .error(function (res, status) {
                if(status == 401) {
                    toastr.error('You are not authorized to do that', 'Error');
                }
                else{
                    toastr.error('Could not add course', 'Error');
                }
            })
    };

    $scope.validate = function(){
        return (!!$scope.courseName) &&  (!!$scope.courseId) && (!!$scope.courseCredit);
    }

    function init(){
        $scope.courseName = "";
        $scope.courseId = "";
        $scope.courseCredit = "";
    }

});