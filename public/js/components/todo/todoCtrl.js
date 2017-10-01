angular.module('chasingProgress')
    .controller('todoCtrl', function($scope, $interval, todoSvc) {



        todoSvc.getTasks($scope.dailyList)
            .then(function(response) {

                $scope.dailyContact = response.dailyContact;
                $scope.completedList = response.completedList;
                $scope.todoList = response.todoList;
                $scope.dailyList = response.dailyTasks;
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
