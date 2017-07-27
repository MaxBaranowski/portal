var app = angular.module('start', ['ui.router', 'ngResource','firebase']);
    app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'public/home.html',
                controller: 'homeCtrl'
            })
            .state('news', {
                url: '/news',
                templateUrl: 'public/news.html',
                controller: 'newsCtrl'
            })
            .state('catalog', {
                url: '/catalog',
                templateUrl: 'public/catalog.html',
                controller: 'catalogCtrl'
            })
            .state('auto', {
                url: '/auto',
                templateUrl: 'public/catalog-auto.html',
                controller: 'catalogAutoCtrl'
            })
            .state('auto/detail', {
                url: '/auto/:id',
                templateUrl: 'public/auto-detail.html',
                controller: "autoDetailCtrl"
            })
            .state('weather', {
                url: '/weather',
                templateUrl: 'public/weather.html',
                controller: 'weatherCtrl'
            })
            .state('finance', {
                url: '/finance',
                templateUrl: 'public/finance.html',
                controller: 'financeCtrl'
            })
            .state('forum', {
                url: '/forum',
                templateUrl: 'public/forum.html',
                controller: 'forumCtrl'
            })
            .state('userAccount', {
                url: '/account',
                templateUrl: 'public/user-account.html',
                controller: 'userAccountCtrl'
            })
            $urlRouterProvider.otherwise('/');
            // $locationProvider.html5Mode(true);
    });
    app.run();


