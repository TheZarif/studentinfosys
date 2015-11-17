/**
 * Created by Zarif on 14/11/2015.
 */
app.factory('AuthenticationFactory', function($window) {
    var auth = {
        isLogged: false,
        check: function() {
            if ($window.sessionStorage.token && $window.sessionStorage.user) {
                this.isLogged = true;
            } else {
                this.isLogged = false;
                delete this.user;
            }
        }
    };

    return auth;
});

app.factory('UserAuthFactory', function($window, $location, $http, AuthenticationFactory) {
    return {
        login: function(email, password) {
            return $http.post('http://localhost:3000/api/login', {
                email: email,
                password: password
            });
        },
        logout: function() {

            if (AuthenticationFactory.isLogged) {

                AuthenticationFactory.isLogged = false;
                delete AuthenticationFactory.user;
                delete AuthenticationFactory.userRole;
                delete AuthenticationFactory.userName;
                delete AuthenticationFactory.userId;

                delete $window.sessionStorage.token;
                delete $window.sessionStorage.user;
                delete $window.sessionStorage.userRole;
                delete $window.sessionStorage.userName;
                delete $window.sessionStorage.userId;

                $location.path("/login");
            }

        }
    }
});

app.factory('TokenInterceptor', function($q, $window) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers['X-Access-Token'] = $window.sessionStorage.token;
                config.headers['X-Key'] = $window.sessionStorage.user;
                config.headers['Content-Type'] = "application/json";
            }
            return config || $q.when(config);
        },

        response: function(response) {
            return response || $q.when(response);
        }
    };
});