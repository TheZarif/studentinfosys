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
        }
    }

    return {
        getOptions : isAuthorized
    };
}]);

