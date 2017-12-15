
angular.module('chasingProgress', ['ui.router','angular-parallax','ngAnimate', 'ui.bootstrap', 'textAngular'])
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

            .state('books', {
                url: '/books',
                templateUrl: '/js/components/books/books.html',
                controller: 'booksCtrl'
            })

            .state('bookPage', {
                url: '/bookPage/:bookId',
                templateUrl: '/js/components/books/bookDetails/bookDetailsTmpl.html',
                controller: 'bookDetailsCtrl',
                resolve: {
                    booksResolve: function(bookSvc) {
                        return bookSvc.getBooks()
                    }
                }
            })

            .state('visionBoard', {
                url: '/visionBoard',
                templateUrl: '/js/components/visionBoard/visionBoard.html',
                controller: 'visionBoardCtrl'
            });
    });
