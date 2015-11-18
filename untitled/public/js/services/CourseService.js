/**
 * Created by Zarif on 18/11/2015.
 */

app.service('CourseService', function ($http, toastr, $rootScope) {

    var baseUrl = $rootScope.baseUrl;

    this.createCourse = function (course, successFunc) {
        if (!this.validate(course)) {
            toastr.warning('You must enter all fields', 'Oops!');
            return;
        }
        $http.post(baseUrl + "courses", course)
            .success(function (course) {
                toastr.success('Course added!', 'Success!');
                console.log('Course added');
                if(successFunc)     successFunc();
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

    this.getCourses = function (successFunc) {
        $http.get(baseUrl + "courses")
            .success(function (courses) {
                console.log('Courses retrieved');
                successFunc(courses);
            })
            .error(function (res, status) {
                if (status == 401) {toastr.error('You are not authorized to do that', 'Error');}
                else {toastr.error('Could not add course', 'Error');}
            })
    };

    this.updateCourse = function (course) {
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

    this.getCoursesForTeacher = function (userId, courses) {
        return [];
    };

    this.getCoursesForStudent = function (userId, courses) {

    };

    this.validate = function (course) {
        return (!!course.courseName) && (!!course.courseCode) && (!!course.credit);
    };
});