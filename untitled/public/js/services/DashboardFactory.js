/**
 * Created by Zarif on 08/11/2015.
 */

app.factory('DashboardFactory', [ function (){
    var getOptions = function (role) {
        if      (role == "Admin")             return adminList;
        else if (role == "Student")           return studentList;
        else if (role == "Staff")             return staffList;
        else if (role == "Teacher")           return teacherList;

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

