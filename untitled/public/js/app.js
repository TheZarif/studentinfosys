/**
 * Created by User on 03-Nov-15.
 */
/**
 * Created by IIT on 02-Nov-15.
 */
var app = angular.module("app",[
    'ui.router',
    'toastr',
    'controllers'
]);

app.run(function ($rootScope) {
    $rootScope.baseUrl = "http://localhost:3000/api/";
    $rootScope.user = JSON.parse(localStorage.getItem('userObject'));
    console.log("Local storage User Object:");
    console.log($rootScope.user);
})

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/dashboard.html',
            controller: 'HomeCtrl'
        })
        .state('test', {
            url: '/test',
            templateUrl: 'views/create_user.html',
            controller: 'HomeCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
    $urlRouterProvider.otherwise('/home')

    $httpProvider.interceptors.push('authInterceptorService');
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
