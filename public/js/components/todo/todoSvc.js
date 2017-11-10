/*jshint esversion: 6 */

angular.module('chasingProgress')
    .service('todoSvc', function($http, $q, $interval) {
        const baseUrl = "http://localhost:8090";
        let sortedTodoTasks = {
            todoList: [],
            completedList: []
        };
        let sortedDailyTasks = {
            dailyTasks: [],
            percentCompleted: 0
        }
        let sortedWeeklyTasks = {
            weeklyTasks: [],
            percentCompleted: 0
        }
        let dailyTasks,
            weeklyTasks;


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


        sortedTodoTasks.dailyContact = peopleToContact[new Date().getDate()];



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

        const percentCompleted = function(ary) {
            let complete = 0;
            ary.forEach(function(task) {
                if (task.completed) {
                    complete++;
                }
            })
            return (complete / ary.length) * 100;
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
                dailyTasks = response.data.dailyTasks;
                sortedDailyTasks.dailyTasks = response.data;
                sortedDailyTasks.percentCompleted = percentCompleted(response.data.dailyTasks);
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




        const resetDailyTasks = function(task) {
            return $http({
                    method: "PUT",
                    url: "/api/dailyList/reset/" + task._id,
                    data: {
                        task: task.task,
                        completed: false
                    }
                })
                .then(function(response) {
                    console.log(response);
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
                console.log(weeklyTasks);
                sortedWeeklyTasks.weeklyTasks = response.data.weeklyTasks;
                sortedWeeklyTasks.percentCompleted = percentCompleted(response.data.weeklyTasks)
                sortedWeeklyTasks.weeklyLogs = response.data.weeklyLogs
                dfd.resolve(sortedWeeklyTasks)
            });
            return dfd.promise;
        };


        this.addWeeklyTask = function(task) {
            console.log(task);
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
            console.log(task._id);
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

        const resetWeeklyTasks = function(task) {
            return $http({
                    method: "PUT",
                    url: "/api/weeklyList/reset/" + task._id,
                    data: {
                        task: task.task,
                        completed: false
                    }
                })
                .then(function(response) {
                    console.log(response);
                    return response;
                });
        };



        console.log(new Date().getHours());

        // $interval(function() {
        //     if (new Date().getHours() === 14) {
        //         dailyTasks.forEach(function(task) {
        //             resetDailyTasks(task);
        //         })
        //     }
        //     if (new Date().getHours() === 14 && new Date().getDay() === 4) {
        //         console.log("hitting");
        //         weeklyTasks.forEach(function(task) {
        //             resetWeeklyTasks(task);
        //         })
        //     }
        // }, 10000);

        // $interval(function() {
        //     if (new Date().getHours() === 22 && new Date().getDay() === 5) {
        //         console.log(sortedWeeklyTasks);
        //         var weeklyLog = {
        //             tasks: sortedWeeklyTasks.weeklyTasks,
        //             week: sortedWeeklyTasks.weeklyLogs[sortedWeeklyTasks.weeklyLogs.length - 1].week,
        //             percentCompleted: sortedWeeklyTasks.percentCompleted
        //         }
        //         weeklyLog.week++;
        //         console.log(weeklyLog);
        //         return $http({
        //             method: 'POST',
        //             url: baseUrl + "/api/weeklyLogs",
        //             data: weeklyLog
        //         }).then(function(response) {
        //             return response;
        //         });
        //
        //     }
        //
        // }, 10000);


        /*
            stats

            I want to see how many i've completed out of how many total tasks there are
            I want to look back on certain weeks to see which tasks were completed and which ones were not
            I want to see how often a certain task is getting completed over number of weeks


            //weekly stats:  every sunday at 3am we create a new WeeklyStats object to store.  Object of all weekly tasks, and whether they were completed
            //increment the week each sunday at 3am?
            each weekly task has a "dateCreated" property.
            create an array of objects. each object will have a "first day of week" and "las day of week" property
            loop over array of tasks?
            take the first task and take its "dateCreated" property and make it the "first day of week"

        */



        //every 24 (86400000 milliseconds) hours we check to see if it is 3am.  If it is then we reset daily tasks to incomplete









    });
