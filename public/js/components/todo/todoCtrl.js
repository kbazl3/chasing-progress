angular.module('chasingProgress')
    .controller('todoCtrl', function($scope, todoSvc, todoResolve, alertify, $location, $anchorScroll, $filter) {

        console.log(todoResolve);


        $scope.dailyData = todoResolve.daily;
        $scope.groceryList = todoResolve.grocery;
        $scope.dailyContact = todoResolve.dailyContact;
        console.log($scope.dailyContact);
        $scope.todoLists = todoResolve.todoLists;
        $scope.weeklyData = todoResolve.weekly;
        let editedDailyTask;


        //*************************  DAILY TASKS  ************************************************

        $scope.isEditingDailyTask = false;
        $scope.isAddingOrEditingDailyTask = false;

        $scope.addDailyTask = function(task) {
            todoSvc.addDailyTask(task)
                .then(function(response) {
                    alertify.success("Success");
                    todoResolve.daily.dailyTasks.push(response.data);
                });
            $scope.addDailyTaskInput = "";
        };

        $scope.deleteDailyTask = function(dailyTask, index) {
            alertify.confirm("You are about to delete the " + dailyTask.task + " daily task. Sure you wanna do this?", function() {
                todoSvc.deleteDailyTask(dailyTask._id)
                    .then(function(response) {
                        alertify.success("Deleted");
                        todoResolve.daily.dailyTasks.splice(index, 1);
                    });
            }, function() {
                alertify.error('Cancel')
            });
        };


        $scope.toggleDailyTaskComplete = function(task) {
            todoSvc.toggleDailyTaskComplete(task)
                .then(function(response) {
                    alertify.success("Completed " + response.data.task + " today.  Keep the momentum going.");
                });
        };

        $scope.editDailyTask = function(task, index) {
            $scope.isEditingDailyTask = true;
            $scope.isAddingOrEditingDailyTask = true;;
            editedDailyTask = task;
            $scope.addDailyTaskInput = task.task
            $location.hash('dailyTaskInput')
            $anchorScroll();
        }

        $scope.updateDailyTask = function() {
            todoSvc.updateDailyTask($scope.addDailyTaskInput, editedDailyTask)
                .then(function(response) {
                    console.log(response);
                    alertify.success('UPDATED')
                    $scope.addDailyTaskInput = "";
                    $scope.isEditingDailyTask = false;
                })
        }

        $scope.cancelDailyTaskEdit = function() {
            $scope.addDailyTaskInput = "";
            $scope.isEditingDailyTask = false;
            $scope.isAddingOrEditingDailyTask = false;
            editedDailyTask = {};
        }

        // $scope.labels = todoResolve.chartLabels;
        $scope.labels = todoResolve.daily.chartLabels.aryOfFilteredDates;
        $scope.series = ['Completed'];
        $scope.data = [
            todoResolve.daily.chartLabels.aryOfPercentCompleted
        ];
        $scope.color = 'red';
        // $scope.hoverIn =

        $scope.isEditingLog = false;

        const editDailyLog = function(points) {
            $scope.isEditingLog = true;
            $scope.editedDailyLog = todoResolve.daily.dailyLogs[points[0]._index];
            console.log($scope.editedDailyLog);
        }

        $scope.toggleDailyLogComplete = function(index, logObj) {
            logObj.tasks[index].completed = !logObj.tasks[index].completed
        }

        $scope.updateDailyLog = function(log) {
            todoSvc.updateDailyLog(log)
                .then(function(response) {
                    console.log(response);
                })
        }



        $scope.onChartClick = function(points, evt) {
            editDailyLog(points);
            $scope.$apply('isEditingLog', function() {

            })

            // console.log(todoResolve.daily.dailyLogs[points[0]._index].tasks);
            // $scope.isEditingLog = true;
            // $scope.$watch('isEditingLog', function() {
            //     console.log("changed");
            // })
            // editDailyLog(points)
            // alertify.delay(20000).log(function() {
            //     let str;
            //     str = "<h2>" + $filter('date')(todoResolve.daily.dailyLogs[points[0]._index].dateCreated) + "</h2><br><p>" + todoResolve.daily.dailyLogs[points[0]._index]._id + "</p>";
            //     todoResolve.daily.dailyLogs[points[0]._index].tasks.forEach(function(taskObj) {
            //         str += "<b>" + taskObj.task + ":</b>" + "——" + taskObj.completed + "<br>"
            //     })
            //
            //     return str;
            // }())
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
                    alertify.success("Added");
                    todoResolve.weekly.weeklyTasks.push(response.data);
                });
            $scope.addWeeklyTaskInput = "";
        };

        $scope.deleteWeeklyTask = function(weeklyTask, index) {
            alertify.confirm("You are about to delete the. Sure you wanna do this?", function() {
                todoSvc.deleteWeeklyTask(weeklyTask._id)
                    .then(function(response) {
                        alertify.success("Deleted");
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
            alertify.confirm("You are about to delete this list and all of the tasks associated with it. Sure you wanna do this?", function() {
                todoSvc.deleteList(list)
                    .then(function(response) {
                        alertify.success("Deleted");
                        todoResolve.todoLists.splice(index, 1);
                    });
            }, function() {
                alertify.error('Cancel')
            });
        }

        $scope.addTaskToList = function(task, list, index) {
            todoSvc.addTaskToList(task, list)
                .then(function(response) {
                    alertify.success("Added task to " + list.listName + " list");
                    $scope.userInput[index] = "";
                })
        }

        $scope.toggleCompletedTodoTask = function(index, list) {
            todoSvc.toggleCompletedTodoTask(index, list)
                .then(function(response) {
                    console.log(response);
                })
        }

        $scope.deleteTask = function(index, list) {
            alertify.confirm("You are about to delete this task. Sure you wanna do this?", function() {
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

        $scope.addNewContact = function() {
            console.log($scope.newContact, $scope.contactImage);
            todoSvc.addNewContact($scope.newContact, $scope.contactImage)
                .then(function(response) {
                    alertify.success('ADDED' + response)
                    $scope.newContact = "";
                    $scope.contactImage = "";
                })
        }

    });
