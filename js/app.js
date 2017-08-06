angular.module('chasingProgress', ['ui.router'])
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

            .state('goals', {
                url: '/goals',
                templateUrl: '/js/components/goals/goals.html',
                controller: 'goalsCtrl'
            })

            .state('calendar', {
                url: '/calendar',
                templateUrl: '/js/components/calendar/calendar.html',
                controller: 'calendarCtrl'
            })

            .state('visionBoard', {
                url: '/visionBoard',
                templateUrl: '/js/components/visionBoard/visionBoard.html',
                controller: 'visionBoardCtrl'
            });
    });
