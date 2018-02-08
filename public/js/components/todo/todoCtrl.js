angular.module('chasingProgress')
    .controller('todoCtrl', function($scope, $interval, todoSvc, todoResolve) {

        console.log(todoResolve);

        $scope.dailyData = todoResolve.daily.dailyTasks;
        $scope.groceryList = todoResolve.grocery;
        $scope.dailyContact = todoResolve.contact;
        $scope.subTodoLists = todoResolve.todoLists;
        $scope.weeklyData = todoResolve.weekly;


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

        // $scope.labels = todoResolve.chartLabels;
        $scope.labels = todoResolve.daily.chartLabels.aryOfFilteredDates;
        $scope.series = ['Completed'];
        $scope.data = [
            todoResolve.daily.chartLabels.aryOfPercentCompleted
        ];
        $scope.color = 'red';
        // $scope.onHover =
        $scope.onClick = function(points, evt) {
            console.log(points, evt);
        };

        // $scope.options = {
        //   scales: {
        //     yAxes: [
        //       {
        //         id: 'y-axis-1',
        //         type: 'linear',
        //         display: true,
        //         position: 'left'
        //       },
        //       {
        //         id: 'y-axis-2',
        //         type: 'linear',
        //         display: true,
        //         position: 'right'
        //       }
        //     ]
        //   }
        // };


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

        //*************************  GROCERY LIST  ************************************************


        $scope.addGroceryItem = function(groceryItem) {
            todoSvc.addGroceryItem(groceryItem)
                .then(function(response) {
                    console.log(response);

                })
            $scope.addGroceryItemInput = "";
        }

        $scope.deleteGroceryItem = function(groceryItem) {
            todoSvc.deleteGroceryItem(groceryItem)
                .then(function(response) {

                })
        }


        //*************************  SUB TODO LIST  ************************************************

        $scope.isCollapsed = true;

        $scope.addSubTodo = function(addSubTodoInput, listImage) {
            todoSvc.addSubTodo(addSubTodoInput, listImage)
                .then(function(response) {
                    console.log(response);
                })
            $scope.addSubTodoInput = "";
        }

        $scope.addTaskToSubTodoList = function(subTask, listName) {
            $scope.subTask = "";
            todoSvc.addTaskToList(subTask, listName)
                .then(function(response) {
                    console.log($scope.subTask);

                })
        }

        $scope.updateSubTask = function(index, listName) {
            todoSvc.updateSubTask(index, listName)
                .then(function(response) {
                    console.log(response);
                })
        }

        $scope.deleteSubTask = function(index, listName) {
            todoSvc.deleteSubTodo(index, listName)
                .then(function(response) {
                    console.log(response);
                })
        }

    });
