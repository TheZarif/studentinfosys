/**
 * Created by Zarif on 08/11/2015.
 */

ctrls.controller('CourseCtrl', function ($scope, $rootScope, $state, $http, toastr) {
    //if(!$rootScope.user) $state.go('login')
    var userId;
    if ($rootScope.user)    userId = $rootScope.user.userId || "";
    else                    userId = "";
    var baseUrl = $rootScope.baseUrl;

    var viewCreateCourse = false;
    $scope.viewIfCreateCourse = function () {
        return viewCreateCourse;
    };
    $scope.toggleViewCreateCourse = function () {
        if(viewCreateCourse)       viewCreateCourse = false;
        else                       viewCreateCourse = true;
    };

    $scope.course = {};
    $scope.courses = []

    $scope.createCourse = function () {
        if (!$scope.validate()) {
            toastr.warning('You must enter all fields', 'Oops!');
            return;
        }

        $http.post(baseUrl + "courses", $scope.course)
            .success(function (course) {
                toastr.success('Course added!', 'Success!');
                $scope.course = {};
                $scope.courses.push(course);
                console.log('Course added');
            })
            .error(function (res, status) {
                if (status == 401) {
                    toastr.error('You are not authorized to do that', 'Error');
                }
                else {
                    toastr.error('Could not add course', 'Error');
                }
            })
    };

    $scope.getCourses = function () {
        $http.get(baseUrl + "courses")
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
                    toastr.error('Could not add course', 'Error');
                }
            })
    };

    $scope.validate = function () {
        return (!!$scope.course.courseName) && (!!$scope.course.courseCode) && (!!$scope.course.credit);
    };

    $scope.updateCourse = function (course) {
            $http.put(baseUrl + "courses/"+ course._id, course)
                .success(function (data) {
                    toastr.success('Course updated');
                })
                .error(function (res, status) {
                    if (status == 401) {
                        toastr.error('You are not authorized to do that', 'Error');
                        //$state.go();
                    }
                    else {
                        toastr.error('Could not update course', 'Error');
                    }
                })

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
                    toastr.error('Could not add course', 'Error');
                }
            })
    };
    //$scope.getTeachers();
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
            courseId: 'CSE 802',
            credits: '3',
            teacherAssigned: 'Raihan',
            semester: '8th'
        },
        {
            courseName: "Network Security",
            courseId: 'CSE 802',
            credits: '3',
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