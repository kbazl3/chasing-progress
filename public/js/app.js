
angular.module('chasingProgress', ['ui.router','angular-parallax','ngAnimate', 'ui.bootstrap', 'textAngular', 'chart.js', 'ngAlertify', 'ngSanitize'])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');



        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/js/components/home/home.html',
                controller: 'homeCtrl',
                resolve: {
                    homeResolve: function(homeSvc) {
                        return homeSvc.getQuotes()
                    }
                }
            })

            .state('todo', {
                url: '/todo',
                templateUrl: '/js/components/todo/todo.html',
                controller: 'todoCtrl',
                resolve: {
                    todoResolve: function(todoSvc) {
                        return todoSvc.getTodoData()
                    }
                }
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

            .state('researchTopic', {
                url: '/researchTopic',
                templateUrl: '/js/components/researchTopic/researchTopic.html',
                controller: 'researchTopicCtrl'
            })

            .state('researchTopicPage', {
                url: '/researchTopicPage/:researchTopicId',
                templateUrl: '/js/components/researchTopic/researchTopicPage/researchTopicPage.html',
                controller: 'researchTopicPageCtrl',
                resolve: {
                    researchTopicResolve: function(researchTopicSvc) {
                        return researchTopicSvc.getResearchTopics();
                    }
                }
            })

    });
