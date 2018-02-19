angular.module('chasingProgress')
    .controller('todoCtrl', function($scope, $interval, todoSvc, todoResolve, toastr) {

        console.log(todoResolve);


        $scope.dailyData = todoResolve.daily;
        $scope.groceryList = todoResolve.grocery;
        $scope.dailyContact = todoResolve.contact;
        $scope.subTodoLists = todoResolve.todoLists;
        $scope.weeklyData = todoResolve.weekly;


        //*************************  DAILY TASKS  ************************************************

        $scope.addDailyTask = function(task) {
            todoSvc.addDailyTask(task)
                .then(function(response) {
                    toastr.success("Added " + response.data.task + " to Daily Tasks");

                });
            $scope.addDailyTaskInput = "";
        };

        $scope.deleteDailyTask = function(task) {
            todoSvc.deleteDailyTask(task._id)
                .then(function(response) {
                    toastr.success("Deleted " + response.data.task + " from Daily Tasks");
                });
        };

        $scope.updateDailyTask = function(task) {
            todoSvc.updateDailyTask(task)
                .then(function(response) {
                    toastr.success("Completed " + response.data.task + " today.  Keep the momentum going.");
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
                    toastr.success("Added " + response.data.task + " to Weekly Tasks");
                });
            $scope.addWeeklyTaskInput = "";
        };

        $scope.deleteWeeklyTask = function(task) {
            todoSvc.deleteWeeklyTask(task._id)
                .then(function(response) {
                    toastr.success("Deleted " + response.data.task + " from Weekly Tasks");
                });
        };

        $scope.updateWeeklyTask = function(task) {
            todoSvc.updateWeeklyTask(task)
                .then(function(response) {
                    toastr.success("Completed " + response.data.task + " for the week.  Keep the Momentum going.");
                });
        };

        //*************************  GROCERY LIST  ************************************************


        $scope.addGroceryItem = function(groceryItem) {
            todoSvc.addGroceryItem(groceryItem)
                .then(function(response) {
                    console.log(response);
                    toastr.success("Added " + response.data.groceryItem + " to Grocery List");
                })
            $scope.addGroceryItemInput = "";
        }

        $scope.deleteGroceryItem = function(groceryItem) {
            todoSvc.deleteGroceryItem(groceryItem)
                .then(function(response) {
                    toastr.success("Deleted " + response.data.groceryItem + " from Grocery List");
                })
        }


        //*************************  SUB TODO LIST  ************************************************

        $scope.isCollapsed = true;

        $scope.addSubTodo = function(addSubTodoInput, listImage) {
            todoSvc.addSubTodo(addSubTodoInput, listImage)
                .then(function(response) {
                    console.log(response);
                    toastr.success("Added " + response.data.listName);
                })
            $scope.addSubTodoInput = "";
        }

        $scope.deleteList = function(list) {
            console.log(list.listName);
            if (confirm("Are you sure you want to delete the " + list.listName + " list?")) {
                todoSvc.deleteList(list)
                    .then(function(response) {
                        toastr.success("Deleted " + response.data.listName);
                    })
            }
        }

        $scope.addTaskToSubTodoList = function(subTask, list) {
            console.log(list.listName);
            $scope.subTask = "";
            todoSvc.addTaskToList(subTask, list)
                .then(function(response) {
                    console.log($scope.subTask);
                    toastr.success("Added " + subTask + " to " + list.listName + " list");
                })
        }

        $scope.updateSubTask = function(index, list) {
            console.log(list);
            todoSvc.updateSubTask(index, list)
                .then(function(response) {
                    console.log(response);
                    toastr.success("Completed " + list.tasks[index].taskName);
                })
        }

        $scope.deleteSubTask = function(index, list) {
            todoSvc.deleteSubTask(index, list)
                .then(function(response) {
                    console.log(response);
                    toastr.success("Deleted " + list.tasks[index].taskName);
                })
        }



    });
