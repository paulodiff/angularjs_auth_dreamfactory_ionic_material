'use strict';

angular
    .module('angularjsAuthTutorialApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'dfUserManagement',
        'ngMockE2E'
    ])

    .constant('DSP_URL', 'https://dsp-paulo-difficiliora.cloud.dreamfactory.com')
    .constant('DSP_API_KEY', 'servizi')
    .config(['$httpProvider', 'DSP_API_KEY', function($httpProvider, DSP_API_KEY) {
        $httpProvider.defaults.headers.common['X-DreamFactory-Application-Name'] = DSP_API_KEY;
    }])

    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/logout', {
                templateUrl: 'views/logout.html',
                controller: 'LogoutCtrl'
            })
            .when('/user-info', {
                templateUrl: 'views/user-info.html',
                controller: 'UserInfoCtrl',
                resolve: {


                }
            })
            .otherwise({
                redirectTo: '/'
            });
    })











    ;
