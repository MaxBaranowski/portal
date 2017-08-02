var app = angular.module('start', ['ui.router', 'ngResource','firebase']);
    app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/../app/public/home.html',
                controller: 'homeCtrl'
            })
            .state('news', {
                url: '/news',
                templateUrl: '/../app/public/news.html',
                controller: 'newsCtrl'
            })
            .state('catalog', {
                url: '/catalog',
                templateUrl: '/../app/public/catalog.html',
                controller: 'catalogCtrl'
            })
            .state('auto', {
                url: '/auto',
                templateUrl: '/../app/public/catalog-auto.html',
                controller: 'catalogAutoCtrl'
            })
            .state('auto/detail', {
                url: '/auto/:id',
                templateUrl: '/../app/public/auto-detail.html',
                controller: "autoDetailCtrl"
            })
            .state('weather', {
                url: '/weather',
                templateUrl: '/../app/public/weather.html',
                controller: 'weatherCtrl'
            })
            .state('finance', {
                url: '/finance',
                templateUrl: '/../app/public/finance.html',
                controller: 'financeCtrl'
            })
            .state('forum', {
                url: '/forum',
                templateUrl: '/../app/public/forum.html',
                controller: 'forumCtrl'
            })
            .state('userAccount', {
                url: '/account',
                templateUrl: '/../app/public/user-account.html',
                controller: 'userAccountCtrl'
            })
            $urlRouterProvider.otherwise('/');
            // $locationProvider.html5Mode(true);
    });
    app.run();


