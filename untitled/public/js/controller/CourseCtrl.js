/**
 * Created by Zarif on 08/11/2015.
 */

ctrls.controller('CourseCtrl', function ($scope, $rootScope, $state, $http, toastr, CourseService) {

    var userId;
    if ($rootScope.user)    userId = $rootScope.user.userId || "";
    else                    userId = "";
    var baseUrl = $rootScope.baseUrl;

    var viewCreateCourse = false;
    $scope.viewIfCreateCourse = function () {return viewCreateCourse;};
    $scope.toggleViewCreateCourse = function () {viewCreateCourse = !viewCreateCourse;};

    $scope.course = {};
    $scope.courses = [];

    $scope.createCourse = function () {
        CourseService.createCourse($scope.course, function () {
            $scope.course = {};
            $scope.courses.push(course);
        });
    };

    $scope.getCourses = function () {
        CourseService.getCourses(function (courses) {
            $scope.courses = courses;
        });
    };

    $scope.updateCourse = function (course) {
        CourseService.updateCourse(course);
    };

    $scope.getTeachers = function(){
        $http.get(baseUrl + "teachers")
            .success(function (teachers) {
                console.log('Teachers retrieved');
                $scope.teachers = teachers;
            })
            .error(function (res, status) {
                if (status == 401) {
                    toastr.error('You are not authorized to do that', 'Error');
                    //$state.go();
                }
                else {
                    toastr.error('Could not retrieve teachers', 'Error');
                }
            })
    };
    $scope.getTeachers();
    $scope.getCourses();
    $scope.teachers= [
        "Rayhan",
        "Sakib",
        "Rabi",
        "Afrina"
    ]
    $scope.courses = [
        {
            courseName: "Network Security",
            courseCode: 'CSE 802',
            credit: '3',
            teacherAssigned: 'Raihan',
            semester: '8th'
        },
        {
            courseName: "Network Security",
            courseCode: 'CSE 802',
            credit: '3',
            teacherAssigned: 'Raihan',
            semester: '8th'
        }
    ];
    $scope.semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];


    $scope.validateSemester = function (data) {
        if($scope.semesters.indexOf(data) > -1){     return true;    }
        else                                         return "Incorrect input";
    }

});