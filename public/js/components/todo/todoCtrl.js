angular.module('chasingProgress')
    .controller('todoCtrl', function($scope, todoSvc, todoResolve, alertify) {

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
                    alertify.success("Added " + response.data.task + " to Daily Tasks");

                });
            $scope.addDailyTaskInput = "";
        };

        $scope.deleteDailyTask = function(dailyTask) {
            alertify.confirm("You are about to delete the " + dailyTask.task + " daily task. Sure you wanna do this?", function() {
                todoSvc.deleteDailyTask(dailyTask._id)
                    .then(function(response) {
                        alertify.success("Deleted " + response.data.task + " from Daily Tasks");
                    });
            }, function() {
                alertify.error('Cancel')
            });


        };

        $scope.updateDailyTask = function(task) {
            todoSvc.updateDailyTask(task)
                .then(function(response) {
                    alertify.success("Completed " + response.data.task + " today.  Keep the momentum going.");
                });
        };

        // $scope.labels = todoResolve.chartLabels;
        $scope.labels = todoResolve.daily.chartLabels.aryOfFilteredDates;
        $scope.series = ['Completed'];
        $scope.data = [
            todoResolve.daily.chartLabels.aryOfPercentCompleted
        ];
        $scope.color = 'red';
        // $scope.hoverIn =
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
                    alertify.success("Added " + response.data.task + " to Weekly Tasks");
                });
            $scope.addWeeklyTaskInput = "";
        };

        $scope.deleteWeeklyTask = function(weeklyTask) {
            alertify.confirm("You are about to delete the " + weeklyTask.task + " weekly task. Sure you wanna do this?", function() {
                todoSvc.deleteWeeklyTask(weeklyTask._id)
                    .then(function(response) {
                        alertify.success("Deleted " + response.data.task + " from Weekly Tasks");
                    });
            }, function() {
                alertify.error('Cancel')
            });
        };

        $scope.updateWeeklyTask = function(task) {
            todoSvc.updateWeeklyTask(task)
                .then(function(response) {
                    alertify.success("Completed " + response.data.task + " for the week.  Keep the Momentum going.");
                });
        };

        //*************************  GROCERY LIST  ************************************************


        $scope.addGroceryItem = function(groceryItem) {
            todoSvc.addGroceryItem(groceryItem)
                .then(function(response) {
                    alertify.success("Added " + response.data.groceryItem + " to Grocery List");
                })
            $scope.addGroceryItemInput = "";
        }

        $scope.deleteGroceryItem = function(groceryItem) {
            todoSvc.deleteGroceryItem(groceryItem)
                .then(function(response) {
                    alertify.success("Deleted " + response.data.groceryItem + " from Grocery List");
                })
        }


        //*************************  SUB TODO LIST  ************************************************

        $scope.isCollapsed = true;

        $scope.addSubTodo = function(addSubTodoInput, listImage) {
            todoSvc.addSubTodo(addSubTodoInput, listImage)
                .then(function(response) {
                    console.log(response);
                    alertify.success("Added " + response.data.listName);
                })
            $scope.addSubTodoInput = "";
            $scope.listThumbnailImage = "";
        }

        $scope.deleteList = function(list) {
            alertify.confirm("You are about to delete the " + list.listName + " list. Sure you wanna do this?", function() {
                todoSvc.deleteList(list)
                    .then(function(response) {
                        alertify.success("Deleted " + response.data.task + " from your todo lists");
                    });
            }, function() {
                alertify.error('Cancel')
            });
        }

        $scope.addTaskToSubTodoList = function(subTask, list, index) {
            todoSvc.addTaskToList(subTask, list)
                .then(function(response) {
                    alertify.success("Added " + subTask + " to " + list.listName + " list");
                    $scope.newVar[index] = "";
                })
        }

        $scope.updateSubTask = function(index, list) {
            console.log(list);
            todoSvc.updateSubTask(index, list)
                .then(function(response) {
                    console.log(response);
                    alertify.success("Completed " + list.tasks[index].taskName);
                })
        }

        $scope.deleteSubTask = function(index, list) {
            alertify.confirm("You are about to delete the " + list.tasks[index].taskName + " task from your " + list.listName + " list. Sure you wanna do this?", function() {
                todoSvc.deleteSubTask(index, list)
                    .then(function(response) {
                        alertify.success("Deleted ");
                    });
            }, function() {
                alertify.error('Cancel')
            });

        }

        $scope.icon = [];
        $scope.hoverIn = function(list, index) {
            $scope.icon[index] = true;
        }

        $scope.hoverOut = function(list, index) {
            $scope.icon[index] = false;
        }



    });
