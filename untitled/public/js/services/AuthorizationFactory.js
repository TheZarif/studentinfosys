/**
 * Created by Zarif on 13/11/2015.
 */


app.factory('AuthorizationFactory', [ function (){

    var student = "student";
    var teacher = "teacher";
    var staff = "staff";
    var admin = "admin";


    var isAuthorized = {
        createNotice: function (roleType) {
            if(roleType == student)     return false;
            else                        return true;
        },
        createAdmin: function (roleType) {
            if(roleType == admin)       return true;
            else                        return false;
        },
        createStaff: function (roleType) {
            if(roleType == admin)       return true;
            else                        return false;
        },
        createTeacher: function (roleType) {
            if(roleType == admin)       return true;
            else                        return false;
        },
        createStudent: function (roleType) {
            if(roleType == admin || staff)       return true;
            else                        return false;
        }
    }

    return {
        isAuthorized : isAuthorized
    };
}]);

