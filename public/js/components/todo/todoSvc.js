/*jshint esversion: 6 */

angular.module('chasingProgress')
    .service('todoSvc', function($http, $q, $interval, $filter) {





        // const sortTaskz = function(tasks) {
        //     let completed = [],
        //         incomplete = [];
        //     tasks.forEach(function(task) {
        //         if (task.completed) {
        //             completed.push(task)
        //         } else {
        //             incomplete.push(task)
        //         }
        //     })
        //     return {
        //         completed: completed,
        //         incomplete: incomplete
        //     }
        // };

        const percentCompleted = function(ary) {
            let complete = 0;
            ary.forEach(function(task) {
                if (task.completed) {
                    complete++;
                }
            })
            return Math.round((complete / ary.length) * 100);
        }

        const findAverage = function(ary) {
            let sum = 0;
            ary.forEach(function(number) {
                sum += number.percentCompleted
            })
            return sum / ary.length;
        }

        const getDailyLogStats = function(ary) {
            let obj = {};
            ary.forEach(function(number) {
                number.tasks.forEach(function(tasks) {
                    if (!obj.hasOwnProperty(tasks.task)) {
                        obj[tasks.task] = {};
                        obj[tasks.task].timesCompleted = 0;
                        obj[tasks.task].runningTotal = 0;
                        if (tasks.completed) {
                            obj[tasks.task].timesCompleted++;
                            obj[tasks.task].runningTotal++;
                        } else {
                            obj[tasks.task].runningTotal++;
                        }

                    } else {
                        if (tasks.completed) {
                            obj[tasks.task].timesCompleted++;
                            obj[tasks.task].runningTotal++;
                        } else {
                            obj[tasks.task].runningTotal++;
                        }

                    }
                })
            })
            console.log(obj)
            return obj;
        }

        //COUNT UP WHICH TASKS HAVE BEEN COMPLETED AND WHICH HAVEN'T https://jsfiddle.net/6toke15n/
        //not all arrays will have the same Tasks meaning each task will have to be divided by a different amount
        //loop through tasks in each daily log
        // if obj has own property (taskName)
        // if (task) then update counter for completed and update counter for average

        const createChartLabels = function(ary) {
            let aryOfFilteredDates = [],
                aryOfPercentCompleted = [];
            ary.forEach(function(obj) {
                aryOfFilteredDates.push($filter('date')(obj.dateCreated));
                aryOfPercentCompleted.push(obj.percentCompleted)
            })
            return {
                aryOfFilteredDates: aryOfFilteredDates,
                aryOfPercentCompleted: aryOfPercentCompleted
            }
        }

        //*************************  DAILY TASKS  ************************************************

        this.addDailyTask = function(task) {
            return $http({
                method: 'POST',
                url: "/api/dailyList",
                data: {
                    task: task
                }
            }).then(function(response) {
                return response;
            });
        };


        this.deleteDailyTask = function(taskId) {
            return $http({
                    method: "DELETE",
                    url: "/api/dailyList/" + taskId
                })
                .then(function(response) {
                    return response
                });
        };

        this.toggleDailyTaskComplete = function(task) {
            task.completed = !task.completed;
            return $http({
                    method: "PUT",
                    url: "/api/dailyList/" + task._id,
                    data: {
                        task: task.task,
                        completed: task.completed
                    }
                })
                .then(function(response) {
                    return response;
                });
        };

        this.updateDailyTask = function(editedDailyTask, dailyTaskObj) {
            return $http({
                    method: "PUT",
                    url: "/api/dailyList/" + dailyTaskObj._id,
                    data: {
                        task: editedDailyTask,
                    }
                })
                .then(function(response) {
                    return response;
                });
        }

        this.updateDailyLog = function(log) {
            log.percentCompleted = percentCompleted(log.tasks);
            return $http({
                    method: "PUT",
                    url: "/api/dailyLogs/" + log._id,
                    data: log
                })
                .then(function(response) {
                    return response;
                });
        }

        //*************************  WEEKLY TASKS  ************************************************

        this.addWeeklyTask = function(task) {
            return $http({
                method: 'POST',
                url: "/api/weeklyList",
                data: {
                    task: task
                }
            }).then(function(response) {
                return response;
            });
        };


        this.deleteWeeklyTask = function(taskId) {
            return $http({
                    method: "DELETE",
                    url: "/api/weeklyList/" + taskId
                })
                .then(function(response) {
                    return response
                });
        };

        this.updateWeeklyTask = function(task) {
            task.completed = !task.completed;
            return $http({
                    method: "PUT",
                    url: "/api/weeklyList/" + task._id,
                    data: {
                        task: task.task,
                        completed: task.completed
                    }
                })
                .then(function(response) {
                    return response;
                });
        };

        //*************************  GROCERIES  ************************************************

        this.addGroceryItem = function(groceryItem) {
            return $http({
                method: 'POST',
                url: "/api/groceryList",
                data: {
                    groceryItem: groceryItem
                }
            }).then(function(response) {
                return response;
            });

        }

        this.deleteGroceryItem = function(item) {
            return $http({
                method: 'Delete',
                url: "/api/groceryList/" + item._id
            })
        }

        //*************************  TODO LISTS  ************************************************

        this.addTodoList = function(todoList, listImage) {
            return $http({
                method: 'POST',
                url: "/api/todoList",
                data: {
                    listName: todoList,
                    listThumbnail: listImage
                }
            }).then(function(response) {
                return response;
            });

        }

        this.deleteList = function(list) {
            return $http({
                method: 'DELETE',
                url: "/api/todoList/" + list._id
            }).then(function(response) {
                return response;
            })
        }


        this.addTaskToList = function(task, listName) {
            listName.tasks.push({
                taskName: task
            })
            return $http({
                    method: "PUT",
                    url: "/api/todoList/" + listName._id,
                    data: listName
                })
                .then(function(response) {
                    return response;
                });
        };

        this.deleteTask = function(index, list) {
            list.tasks.splice(index, 1);
            return $http({
                    method: "PUT",
                    url: "/api/todoList/" + list._id,
                    data: list
                })
                .then(function(response) {
                    return response;
                });
        }

        this.toggleCompletedTodoTask = function(index, list) {
            list.tasks[index].completed = !list.tasks[index].completed;
            return $http({
                    method: "PUT",
                    url: "/api/todoList/" + list._id,
                    data: list
                })
                .then(function(response) {
                    return response;
                });
        }

        this.updateTask = function(updatedTask, list, editedTaskIndex) {
            list.tasks[editedTaskIndex].taskName = updatedTask;
            return $http({
                    method: "PUT",
                    url: "/api/todoList/" + list._id,
                    data: list
                })
                .then(function(response) {
                    return response;
                });
        }

        let todoData = {
            daily: {},
            weekly: {}
        };

        getTodoDataz = function() {
            var dfd = $q.defer();
            //***************TODO LIST CALL**********
            $http({
                method: 'GET',
                url: "/api/todoList"
            }).then(function(response) {
                response.data.forEach(function(list) {
                    list.percentCompleted = percentCompleted(list.tasks)
                    list.isCollapsed = true;
                    // list.tasks = sortTaskz(list.tasks);
                })
                todoData.todoLists = response.data;

                //***************DAILY CALL**********
                $http({
                    method: 'GET',
                    url: "/api/dailyList"
                }).then(function(response) {
                    todoData.daily = response.data;
                    todoData.daily.percentCompleted = percentCompleted(response.data.dailyTasks);
                    todoData.daily.chartLabels = createChartLabels(response.data.dailyLogs);
                    todoData.daily.dailyLogAverage = findAverage(response.data.dailyLogs);

                    //***************GROCERY CALL**********
                    $http({
                        method: 'GET',
                        url: "/api/groceryList"
                    }).then(function(response) {
                        todoData.grocery = response.data;

                        //***************WEEKLY CALL**********
                        $http({
                            method: 'GET',
                            url: "/api/weeklyList"
                        }).then(function(response) {
                            todoData.weekly.weeklyTasks = response.data.weeklyTasks;
                            todoData.weekly.percentCompleted = percentCompleted(response.data.weeklyTasks)

                            //***************Contact CALL**********
                            $http({
                                method: 'GET',
                                url: "/api/contact"
                            }).then(function(response) {
                                console.log(response.data, [new Date().getDate()]);
                                todoData.dailyContact = response.data[new Date().getDate()]
                                dfd.resolve(todoData);
                            });

                        });
                    });
                });
            });
            return dfd.promise;
        }


        //*************************  CONTACTS  ************************************************

        this.addNewContact = function(name, image) {
            console.log(name, image);

              return $http({
                method: 'POST',
                url: '/api/contact',
                data: {
                    name: name,
                    contactImage: image
                }
              }).then(function(response) {
                  return response;
              });

        }

        var _cachedPromise;
        this.getTodoData = function() {
            if (_cachedPromise) {
                console.log("cached");
                return _cachedPromise
            } else {
                console.log("not cached");
                _cachedPromise = getTodoDataz();
                return _cachedPromise
            }
        }


    });
