/**
 * Created by Zarif on 07/11/2015.
 */

app.factory('authInterceptorService', ['$q','$location', function ($q, $location){
    var responseError = function (rejection) {
        if (rejection.status === 403) {
            window.localStorage.removeItem('userObject');
            $location.path('/login');
        }
        return $q.reject(rejection);
    };

    return {
        responseError: responseError
    };
}]);

