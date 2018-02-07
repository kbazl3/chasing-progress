/*jshint esversion: 6 */

angular.module('chasingProgress')
    .service('todoSvc', function($http, $q, $interval, $filter) {
        let sortedTodoTasks = {
            todoList: [],
            completedList: []
        };
        // let sortedDailyTasks = {
        //     dailyTasks: [],
        //     percentCompleted: 0,
        // }
        // let sortedWeeklyTasks = {
        //     weeklyTasks: [],
        //     percentCompleted: 0
        // }
        // let dailyTasks,
        //     weeklyTasks;


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


        // sortedTodoTasks.dailyContact = peopleToContact[new Date().getDate()];



        const sortTasks = function(tasks) {
            if (sortedTodoTasks.todoList.length === 0) {
                tasks.forEach(function(task) {

                    if (task.completed === false) {
                        sortedTodoTasks.todoList.push(task);
                    } else {
                        sortedTodoTasks.completedList.push(task);
                    }
                });
            }
        };

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



        this.getTasks = function(dailyList) {
            var dfd = $q.defer();
            $http({
                method: 'GET',
                url: "/api/todoList"
            }).then(function(response) {
                sortTasks(response.data);
                dfd.resolve(sortedTodoTasks);
            });
            return dfd.promise;
        };

        this.addTask = function(task) {
            return $http({
                method: 'POST',
                url: "/api/todoList",
                data: {
                    task: task
                }
            }).then(function(response) {
                return response;
            });
        };


        this.deleteTask = function(taskId) {
            return $http({
                    method: "DELETE",
                    url: "/api/todoList/" + taskId
                })
                .then(function(response) {
                    return response;
                });
        };

        this.updateTask = function(id, task) {
            task.completed = !task.completed;
            return $http({
                    method: "PUT",
                    url: "/api/todoList/" + id,
                    data: {
                        task: task.task,
                        completed: task.completed
                    }
                })
                .then(function(response) {
                    return response;
                });
        };



        //*************************  DAILY TASKS  ************************************************

        this.getDailyTasks = function(dailyList) {
            let dfd = $q.defer();
            $http({
                method: 'GET',
                url: "/api/dailyList"
            }).then(function(response) {
                let aryOfDates = [],
                    aryOfDailyLogPercentCompleted = [];

                response.data.dailyLogs.forEach(function(dailyLog) {
                    aryOfDates.push($filter('date')(dailyLog.dateCreated));
                    aryOfDailyLogPercentCompleted.push(dailyLog.percentCompleted);
                })
                dailyTasks = response.data.dailyTasks;
                sortedDailyTasks.dailyTasks = response.data;
                sortedDailyTasks.percentCompleted = percentCompleted(response.data.dailyTasks);
                sortedDailyTasks.chartLabels = aryOfDates;
                sortedDailyTasks.aryOfDailyLogPercentCompleted = aryOfDailyLogPercentCompleted;
                dfd.resolve(sortedDailyTasks);
            });
            return dfd.promise;
        };



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

        this.getWeeklyTasks = function(dailyList) {
            let dfd = $q.defer();
            $http({
                method: 'GET',
                url: "/api/weeklyList"
            }).then(function(response) {
                weeklyTasks = response.data.weeklyTasks;
                sortedWeeklyTasks.weeklyTasks = response.data.weeklyTasks;
                sortedWeeklyTasks.percentCompleted = percentCompleted(response.data.weeklyTasks)
                sortedWeeklyTasks.weeklyLogs = response.data.weeklyLogs
                dfd.resolve(sortedWeeklyTasks)
            });
            return dfd.promise;
        };


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

        this.getGroceries = function() {
            return $http({
              method: 'GET',
              url: "/api/groceryList"
            }).then(function(response) {
                return response;
            });
        };

        this.deleteGroceryItem = function(item) {
            return $http({
                method: 'Delete',
                url: "/api/groceryList/" + item._id
            })
        }

        this.addSubTodo = function(subTodoList, listImage) {
            console.log(listImage);
            return $http({
                method: 'POST',
                url: "/api/subTodo",
                data: {
                    listName: subTodoList,
                    listThumbnail: listImage
                }
            }).then(function(response) {
                return response;
            });

        }

        this.getSubTodoLists = function() {
            return $http({
              method: 'GET',
              url: "/api/subTodo"
            }).then(function(response) {
                response.data.forEach(function(list) {
                    list.isCollapsed = true;
                })
                return response;
            });
        };


        this.addTaskToList = function(task, listName) {

            listName.tasks.push({
                taskName: task
            })
            console.log(listName);
            return $http({
                    method: "PUT",
                    url: "/api/subTodo/" + listName._id,
                    data: listName
                })
                .then(function(response) {
                    return response;
                });
        };

        this.deleteSubTodo = function(index, list) {
            list.tasks.splice(index, 1);
            console.log(list.tasks);
            return $http({
                    method: "PUT",
                    url: "/api/subTodo/" + list._id,
                    data: list
                })
                .then(function(response) {
                    return response;
                });
        }

        this.updateSubTask = function(index, list) {
            console.log(list.tasks[index].completed);
            list.tasks[index].completed = !list.tasks[index].completed;
            return $http({
                    method: "PUT",
                    url: "/api/subTodo/" + list._id,
                    data: list
                })
                .then(function(response) {
                    return response;
                });
        }

        //have a completed section for every seperate list
        // let todoData = {
        //     todoList: [{
        //         listName: "listName",
        //         listThumbnail: "image",

        //         completed: [],
        //         incompleted: [],
        //         percentCompleted
        //     }],
        //     daily: {
        //         dailyList: [],
        //         dailyLogs: [],
        //         percentCompleted: Number,
        //         chartLabels: []
        //     },
        //     weekly: {
        //         weeklyList: [],
        //         weeklyLogs: [],
        //         percentCompleted: Number
        //     },
        //     contact: "string",
        //     groceries: ["array of strings"]
        // };

        let todoData = {
            daily: {}
        };

        this.getTodoData = function() {
            todoData.contact = peopleToContact[new Date().getDate()];
            var dfd = $q.defer();
            $http({
                method: 'GET',
                url: "/api/subTodo"
            }).then(function(response) {
                response.data.forEach(function(list) {
                    list.percentCompleted = percentCompleted(list.tasks)
                    // list.tasks = sortTaskz(list.tasks);
                })
                todoData.todoLists = response.data;
                // console.log(todoData);


                $http({
                    method: 'GET',
                    url: "/api/dailyList"
                }).then(function(response) {
                    // console.log(response.data);
                    todoData.daily = response.data;
                    todoData.daily.percentCompleted = percentCompleted(response.data.dailyTasks);
                    todoData.daily.chartLabels = createChartLabels(response.data.dailyLogs);
                    console.log(todoData);

                    $http({
                      method: 'GET',
                      url: "/api/groceryList"
                    }).then(function(response) {
                        todoData.grocery = response.data;

                        $http({
                            method: 'GET',
                            url: "/api/weeklyList"
                        }).then(function(response) {
                            weeklyTasks = response.data.weeklyTasks
                            todoData.weekly = {};
                            todoData.weekly.weeklyTasks = response.data.weeklyTasks;
                            todoData.weekly.percentCompleted = percentCompleted(response.data.weeklyTasks)
                            // sortedWeeklyTasks.weeklyLogs = response.data.weeklyLogs
                            dfd.resolve(todoData);
                        });


                    });

                });


            });
            return dfd.promise;
        }



    });
