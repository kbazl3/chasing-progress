angular.module('chasingProgress')
    .controller('todoCtrl', function($scope, $interval, todoSvc) {



        $scope.dailyList = [{
                    task: "25 pushups - 25 situps - 60 second plank"
                }, {
                    task: "cold shower"
                }, {
                    task: "aloe vera"
                }, {
                    task: "read 30 mins"
                }, {
                    task: "code 1 hour"
                }];



        todoSvc.getTasks($scope.dailyList)
            .then(function(response) {

                $scope.dailyContact = response.dailyContact;
                $scope.completedList = response.completedList;
                $scope.todoList = response.todoList;

                console.log(response);
            });



        $scope.addTask = function(task) {
            todoSvc.addTask(task)
                .then(function(response) {

                });
        };

        $scope.deleteTask = function(task) {
            console.log(task._id);
            todoSvc.deleteTask(task._id)
                .then(function(response) {
                    console.log(response);
                });
        };

        $scope.updateTask = function(id, task) {
            task.completed = !task.completed;
            todoSvc.updateTask(id, task)
                .then(function(response) {
                    console.log(response);
                });
        };


    });
