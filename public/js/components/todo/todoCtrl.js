angular.module('chasingProgress')
    .controller('todoCtrl', function($scope, $interval, todoSvc) {



        todoSvc.getTasks($scope.dailyList)
            .then(function(response) {
                $scope.dailyContact = response.dailyContact;
                $scope.completedList = response.completedList;
                $scope.todoList = response.todoList;
                $scope.dailyCompletedPercentage = response.dailyCompletedPercentage;
            });



        todoSvc.getDailyTasks()
            .then(function(response) {
                console.log(response);
                $scope.dailyData = response;
            });

        todoSvc.getWeeklyTasks()
            .then(function(response) {
                console.log(response);
                $scope.weeklyData = response
            })


        $scope.addTask = function(task) {
            todoSvc.addTask(task)
                .then(function(response) {

                });
                $scope.addTaskInput = "";
        };

        $scope.deleteTask = function(task) {
            console.log(task._id);
            if(prompt('Are you sure you want to delete this?')) {

            }
            todoSvc.deleteTask(task._id)
                .then(function(response) {
                    console.log(response);
                });
        };

        $scope.updateTask = function(id, task) {
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
                $scope.addDailyTaskInput = "";
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
                $scope.addWeeklyTaskInput = "";
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
