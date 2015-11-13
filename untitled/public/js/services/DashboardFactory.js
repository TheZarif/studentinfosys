/**
 * Created by Zarif on 08/11/2015.
 */

app.factory('DashboardFactory', [ function (){
    var getOptions = function (role) {
        if      (role == "Admins")             return adminList;
        else if (role == "Students")           return studentList;
        else if (role == "Staffs")             return staffList;
        else if (role == "Teachers")           return teacherList;

    };

    var adminList = [
        {
            label: "Profiles",
            link: "users_page"
        },
        {
            label: "Courses",
            link: "courses_page"
        },
        {
            label: "Notification",
            link: "notice_page"
        }
    ];
    var studentList = [
        {
            label: "Courses",
            link: "courses"
        },
        {
            label: "Notification",
            link: "notice_page"
        }
    ];
    var staffList = [
        {
            label: "Students",
            link: "users_page"
        },
        {
            label: "Notification",
            link: "notice_page"
        }
    ];
    var teacherList = [
        {
            label: "Courses",
            link: "courses"
        },
        {
            label: "Notification",
            link: "notice_page"
        }
    ];

    return {
        getOptions : getOptions
    };
}]);

