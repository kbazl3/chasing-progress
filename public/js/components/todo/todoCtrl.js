angular.module('chasingProgress')
    .controller('todoCtrl', function($scope, todoSvc, todoResolve, alertify, $location, $anchorScroll, $filter) {

        console.log(todoResolve);


        $scope.dailyData = todoResolve.daily;
        $scope.groceryList = todoResolve.grocery;
        $scope.dailyContact = todoResolve.contact;
        $scope.todoLists = todoResolve.todoLists;
        $scope.weeklyData = todoResolve.weekly;


        //*************************  DAILY TASKS  ************************************************

        $scope.addDailyTask = function(task) {
            todoSvc.addDailyTask(task)
                .then(function(response) {
                    alertify.success("Added " + response.data.task + " to Daily Tasks");
                    todoResolve.daily.dailyTasks.push(response.data);
                });
            $scope.addDailyTaskInput = "";
        };

        $scope.deleteDailyTask = function(dailyTask, index) {
            alertify.confirm("You are about to delete the " + dailyTask.task + " daily task. Sure you wanna do this?", function() {
                todoSvc.deleteDailyTask(dailyTask._id)
                    .then(function(response) {
                        alertify.success("Deleted " + response.data.task + " from Daily Tasks");
                        todoResolve.daily.dailyTasks.splice(index, 1);
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
        $scope.onChartClick = function(points, evt) {
            console.log(todoResolve.daily.dailyLogs[points[0]._index].tasks);
            alertify.delay(20000).log(function() {
                let str;
                // let str = "<h2>" + todoResolve.daily.dailyLogs[points[0]._index].dateCreated + "</h2><br>";
                str = "<h2>" + $filter('date')(todoResolve.daily.dailyLogs[points[0]._index].dateCreated) + "</h2><br><p>" + todoResolve.daily.dailyLogs[points[0]._index]._id + "</p>";
                todoResolve.daily.dailyLogs[points[0]._index].tasks.forEach(function(taskObj) {
                    str += "<b>" + taskObj.task + ":</b>" + "——" + taskObj.completed + "<br>"
                })
                return str;
            }())
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
                    todoResolve.weekly.weeklyTasks.push(response.data);
                });
            $scope.addWeeklyTaskInput = "";
        };

        $scope.deleteWeeklyTask = function(weeklyTask, index) {
            alertify.confirm("You are about to delete the " + weeklyTask.task + " weekly task. Sure you wanna do this?", function() {
                todoSvc.deleteWeeklyTask(weeklyTask._id)
                    .then(function(response) {
                        alertify.success("Deleted " + response.data.task + " from Weekly Tasks");
                        todoResolve.weekly.weeklyTasks.splice(index, 1);
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
                    todoResolve.grocery.push(response.data);
                })
            $scope.addGroceryItemInput = "";
        }

        $scope.deleteGroceryItem = function(groceryItem, index) {
            todoSvc.deleteGroceryItem(groceryItem)
                .then(function(response) {
                    alertify.success("Deleted " + response.data.groceryItem + " from Grocery List");
                    todoResolve.grocery.splice(index, 1);
                })
        }


        //*************************  TODO LIST  ************************************************
        let editedTaskIndex;
        $scope.isCollapsed = true;
        $scope.userInput = [];
        $scope.isEditingTask = false;

        $scope.addTodoList = function(newListInput, listImage) {
            todoSvc.addTodoList(newListInput, listImage)
                .then(function(response) {
                    console.log(response);
                    alertify.success("Added " + response.data.listName);
                    todoResolve.todoLists.push(response.data);
                })
            $scope.newListInput = "";
            $scope.listThumbnailImage = "";
        }

        $scope.deleteList = function(list, index) {
            alertify.confirm("You are about to delete the " + list.listName + " list. Sure you wanna do this?", function() {
                todoSvc.deleteList(list)
                    .then(function(response) {
                        alertify.success("Deleted " + response.data.task + " from your todo lists");
                        todoResolve.todoLists.splice(index, 1);
                    });
            }, function() {
                alertify.error('Cancel')
            });
        }

        $scope.addTaskToList = function(task, list, index) {
            todoSvc.addTaskToList(task, list)
                .then(function(response) {
                    alertify.success("Added " + task + " to " + list.listName + " list");
                    $scope.userInput[index] = "";
                })
        }

        $scope.toggleCompletedTodoTask = function(index, list) {
            todoSvc.toggleCompletedTodoTask(index, list)
                .then(function(response) {
                    console.log(response);
                    alertify.success("Completed " + list.tasks[index].taskName);
                })
        }

        $scope.deleteTask = function(index, list) {
            alertify.confirm("You are about to delete the " + list.tasks[index].taskName + " task from your " + list.listName + " list. Sure you wanna do this?", function() {
                todoSvc.deleteTask(index, list)
                    .then(function(response) {
                        alertify.success("Deleted ");
                    });
            }, function() {
                alertify.error('Cancel')
            });

        }

        $scope.editTask = function(taskIndex, listIndex, list) {
            console.log(taskIndex, listIndex, list);
            $scope.isEditingTask = true
            $scope.userInput[listIndex] = list.tasks[taskIndex].taskName;
            editedTaskIndex = taskIndex;
            $location.hash('wysiwig')
            $anchorScroll();
        }

        $scope.updateTask = function(updatedTask, listIndex, list) {
            todoSvc.updateTask(updatedTask, list, editedTaskIndex)
                .then(function(response) {
                    alertify.success('updated')
                    $scope.userInput[listIndex] = "";
                    $scope.isEditingTask = false;
                })

        }

        $scope.cancelTaskEdit = function(listIndex) {
            $scope.isEditingTask = false;
            $scope.userInput[listIndex] = "";
        }

        $scope.icon = [];
        $scope.hoverIn = function(list, index) {
            $scope.icon[index] = true;
        }

        $scope.hoverOut = function(list, index) {
            $scope.icon[index] = false;
        }



    });
