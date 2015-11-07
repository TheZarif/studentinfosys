/**
 * Created by Zarif on 08/11/2015.
 */

app.factory('DashboardFactory', [ function (){
    var getOptions = function (role) {
        if(role == "admin")             return adminList;
        else if (role == "student")     return studentList;
        else if (role == "staff")       return staffList;
        else if (role == "teacher")       return teacherList;

    }

    var adminList = [
        {
            label: "Profiles",
            link: "create_user"
        },
        {
            label: "Create Course",
            link: "create_course"
        },
        {
            label: "Notification",
            link: "create_notice"
        }
    ];
    var studentList = [
        {
            label: "Courses",
            link: "courses"
        },
        {
            label: "Notification",
            link: "notification"
        }
    ];
    var staffList = [
        {
            label: "Courses",
            link: "courses"
        },
        {
            label: "Notification",
            link: "notification"
        }
    ];
    var teacherList = [
        {
            label: "Courses",
            link: "courses"
        },
        {
            label: "Notification",
            link: "notification"
        }
    ];

    return {
        getOptions : getOptions
    };
}]);
