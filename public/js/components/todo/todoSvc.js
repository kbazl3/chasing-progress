/*jshint esversion: 6 */

angular.module('chasingProgress')
    .service('todoSvc', function($http, $q, $interval, $filter) {



        let peopleToContact = [{
                person: "Obama",
                picture: "../../images/mom.jpg"
            },
            {
                person: "Mom",
                picture: "../../images/mom.jpg"
            },
            {
                person: "Dad",
                picture: "../../images/dad.jpg"
            },
            {
                person: "Breer",
                picture: "../../images/breer.jpg"
            },
            {
                person: "Jen",
                picture: "../../images/jen.jpg"
            },
            {
                person: "Shane",
                picture: "../../images/shaneo.jpg"
            },
            {
                person: "April",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Mason",
                picture: "../../images/mason.jpeg"
            },
            {
                person: "Tayia",
                picture: "../../images/tayia.jpeg"
            },
            {
                person: "Brandon",
                picture: "../../images/brandon.jpg"
            },
            {
                person: "Kurtis",
                picture: "../../images/kurt.jpg"
            },
            {
                person: "Zeke",
                picture: "../../images/zeke.jpg"
            },
            {
                person: "Matt Miya",
                picture: "../../images/matt.jpg"
            },
            {
                person: "Dan Lang",
                picture: "../../images/dan.jpg"
            },
            {
                person: "Zack Tuesch",
                picture: "../../images/zack.jpg"
            },
            {
                person: "Fred ",
                picture: "../../images/fred.jpg"
            },
            {
                person: "Drew Baby",
                picture: "../../images/drew.png"
            },
            {
                person: "Choice",
                picture: "../../images/choice.png"
            },
            {
                person: "Coleman",
                picture: "../../images/coleman.jpg"
            },
            {
                person: "Luis",
                picture: "../../images/luis.jpg"
            },
            {
                person: "Amar",
                picture: "../../images/amar.jpg"
            },
            {
                person: "Amanda G",
                picture: "../../images/tayia.jpg"
            },
            {
                person: "Skyler Brinley",
                picture: "../../images/skyler.jpg"
            },
            {
                person: "Maxson",
                picture: "../../images/tayia.jpg"
            },
            {
                person: "Dethrone",
                picture: "../../images/dethrone.jpg"
            },
            {
                person: "Danny Pobieglo",
                picture: "../../images/danny.jpg"
            },
            {
                person: "Ian",
                picture: "../../images/tayia.jpg"
            },
            {
                person: "Rod",
                picture: "../../images/rod.jpg"
            },
            {
                person: "Tyler Tuesch",
                picture: "../../images/tayia.jpg"
            },
            {
                person: "Ryan Hadley",
                picture: "../../images/ryan hads.jpg"
            },
        ];

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

        this.updateDailyTask = function(task) {
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
            todoData.contact = peopleToContact[new Date().getDate()];
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
                            dfd.resolve(todoData);
                        });
                    });
                });
            });
            return dfd.promise;
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
