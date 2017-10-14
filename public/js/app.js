angular.module('chasingProgress', ['ui.router','angular-parallax'])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/js/components/home/home.html',
                controller: 'homeCtrl'
            })

            .state('todo', {
                url: '/todo',
                templateUrl: '/js/components/todo/todo.html',
                controller: 'todoCtrl'
            })

            .state('journal', {
                url: '/journal',
                templateUrl: '/js/components/journal/journal.html',
                controller: 'journalCtrl'
            })

            .state('visionBoard', {
                url: '/visionBoard',
                templateUrl: '/js/components/visionBoard/visionBoard.html',
                controller: 'visionBoardCtrl'
            });
    });
