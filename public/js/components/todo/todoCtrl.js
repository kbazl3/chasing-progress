angular.module('chasingProgress')
    .controller('todoCtrl', function($scope, $interval, todoSvc) {


        if (!$scope.todoList) {
            todoSvc.getTasks($scope.dailyList)
                .then(function(response) {
                    console.log(response.dailyCompletedPercentage);
                    $scope.dailyContact = response.dailyContact;
                    $scope.completedList = response.completedList;
                    $scope.todoList = response.todoList;
                    $scope.dailyCompletedPercentage = response.dailyCompletedPercentage;
                });
        }


            todoSvc.getDailyTasks()
                .then(function(response) {
                    $scope.dailyList = response;
                });

            todoSvc.getWeeklyTasks()
                .then(function(response) {
                    $scope.weeklyList = response;
                })






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
            task.completed = !task.completed;  //do this in service
            todoSvc.updateTask(id, task)
                .then(function(response) {
                    console.log(response);
                });
        };


        //*************************  DAILY TASKS  ************************************************

        $scope.addDailyTask = function(task) {
            todoSvc.addDailyTask(task)
                .then(function(response) {

                });
        };

        $scope.deleteDailyTask = function(task) {
            console.log(task._id);
            todoSvc.deleteDailyTask(task._id)
                .then(function(response) {
                    console.log(response);
                });
        };

        $scope.updateDailyTask = function(task) {
            todoSvc.updateDailyTask(task)
                .then(function(response) {
                    console.log(response);
                });
        };

        //*************************  WEEKLY TASKS  ************************************************

        $scope.addWeeklyTask = function(task) {
            todoSvc.addWeeklyTask(task)
                .then(function(response) {

                });
        };

        $scope.deleteWeeklyTask = function(task) {
            console.log(task._id);
            todoSvc.deleteWeeklyTask(task._id)
                .then(function(response) {
                    console.log(response);
                });
        };

        $scope.updateWeeklyTask = function(task) {
            todoSvc.updateWeeklyTask(task)
                .then(function(response) {
                    console.log(response);
                });
        };




    });
