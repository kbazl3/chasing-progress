angular.module('chasingProgress')
    .controller('todoCtrl', function($scope, $interval, todoSvc, todoResolve) {

        console.log(todoResolve);

        $scope.dailyData = todoResolve;

        todoSvc.getTasks($scope.dailyList)
            .then(function(response) {
                $scope.dailyContact = response.dailyContact;
                $scope.completedList = response.completedList;
                $scope.todoList = response.todoList;
                $scope.dailyCompletedPercentage = response.dailyCompletedPercentage;
            });


        todoSvc.getWeeklyTasks()
            .then(function(response) {
                $scope.weeklyData = response;
            })

        todoSvc.getGroceries()
            .then(function(response) {
                $scope.groceryList = response.data
            })

        todoSvc.getSubTodoLists()
            .then(function(response) {
                $scope.subTodoLists = response.data
            })


        $scope.addTask = function(task) {
            todoSvc.addTask(task)
                .then(function(response) {

                });
            $scope.addTaskInput = "";
        };

        $scope.deleteTask = function(task) {
            if (prompt('Are you sure you want to delete this?')) {

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


        $scope.labels = todoResolve.chartLabels;
        $scope.series = ['Completed'];
        $scope.data = [
            todoResolve.aryOfDailyLogPercentCompleted
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



        $scope.addSubTodo = function(addSubTodoInput) {
            todoSvc.addSubTodo(addSubTodoInput)
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
