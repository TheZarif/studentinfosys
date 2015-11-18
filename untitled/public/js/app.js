/**
 * Created by User on 03-Nov-15.
 */
/**
 * Created by IIT on 02-Nov-15.
 */
var app = angular.module("app",[
    'ui.router',
    'toastr',
    'controllers',
    'xeditable',
    'ui.bootstrap'
]);

app.run(function ($rootScope, $window, $location, AuthenticationFactory) {

    AuthenticationFactory.check();
    $rootScope.$on("$stateChangeStart", function(event, nextRoute) {
        if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
            $location.path("/login");
        } else {
            // check if user object exists else fetch it. This is incase of a page refresh
            if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;
            if (!AuthenticationFactory.userRole) AuthenticationFactory.userRole = $window.sessionStorage.userRole;
        }
    });


    $rootScope.baseUrl = "http://localhost:3000/api/authenticate/";
    $rootScope.user = JSON.parse(localStorage.getItem('userObject'));
    //$rootScope.user = {
    //    userId: "BSSE0430",
    //    userName: "Zarif",
    //    roleId: "Staffs",
    //    email: "Zarif@mg.com"
    //}
    console.log("Local storage User Object:");
    console.log($rootScope.user);
})

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl',
            access: {
                requiredLogin: true
            }
        })
        .state('dashboard.item', {
            url: '/:item'
        })

        .state('test', {
            url: '/test',
            templateUrl: 'views/create_notice.html',
            controller: 'NoticeCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })


    $urlRouterProvider.otherwise('/dashboard')

    //$httpProvider.interceptors.push('authInterceptorService');
    $httpProvider.interceptors.push('TokenInterceptor');

});

app.config(function(toastrConfig) {
    angular.extend(toastrConfig, {
        allowHtml: false,
        closeButton: true,
        closeHtml: '<button>&times;</button>',
        extendedTimeOut: 1000,
        messageClass: 'toast-message',
        tapToDismiss: true,
        timeOut: 3000,
        titleClass: 'toast-title',
        toastClass: 'toast'
    });
});



app.run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

var ctrls = angular.module('controllers', []);