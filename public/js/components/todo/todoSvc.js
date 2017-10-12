/*jshint esversion: 6 */

angular.module('chasingProgress')
    .service('todoSvc', function($http, $q, $interval) {
        const baseUrl = "http://localhost:8090";
        let sortedData = {
            todoList: [],
            completedList: [],
        };
        let dailyTasks;


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
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Kurtis",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Zeke",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Matt Miya",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Dan Lang",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Zack Tuesch",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Fred ",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Drew Baby",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Choice",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Coleman",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Luis",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Amar",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Amanda G",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Skyler Brinley",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Maxson",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Dethrone",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Skyler Brinley",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Danny Pobieglo",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Ian",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Rod",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Tyler Tuesch",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Ryan Hadley",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
        ];

        console.log(peopleToContact.length);
        var randomNumber;

        var setDailyContact = function() {
            randomNumber = parseInt((Math.random() * peopleToContact.length).toFixed());
            sortedData.dailyContact = peopleToContact[randomNumber];
        };

        const sortTasks = function(tasks) {
            tasks.forEach(function(task) {
            if (task.completed === false) {
                    sortedData.todoList.push(task);
                } else {
                    sortedData.completedList.push(task);
                }
            });
        };

        this.getTasks = function(dailyList) {
            var dfd = $q.defer();
            $http({
                method: 'GET',
                url: baseUrl + "/api/todoList"
            }).then(function(response) {
                sortTasks(response.data);
                dfd.resolve(sortedData);
            });
            setDailyContact();
            return dfd.promise;
        };

        this.addTask = function(task) {
            return $http({
                method: 'POST',
                url: baseUrl + "/api/todoList",
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
                    url: baseUrl + "/api/todoList/" + taskId
                })
                .then(function(response) {
                    return response;
                });
        };

        this.updateTask = function(id, task) {
            return $http({
                    method: "PUT",
                    url: baseUrl + "/api/todoList/" + id,
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
            return $http({
                method: 'GET',
                url: baseUrl + "/api/dailyList"
            }).then(function(response) {
                dailyTasks = response.data;
                return response.data;
            });
        };

        this.addDailyTask = function(task) {
            return $http({
                method: 'POST',
                url: baseUrl + "/api/dailyList",
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
                    url: baseUrl + "/api/dailyList/" + taskId
                })
                .then(function(response) {
                    return response
                });
        };

        this.updateDailyTask = function(task) {
            task.completed = !task.completed;
            console.log(task._id);
            return $http({
                    method: "PUT",
                    url: baseUrl + "/api/dailyList/" + task._id,
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
                    url: baseUrl + "/api/dailyList/reset/" + task._id,
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
        //     if (new Date().getHours() === 3) {
        //         dailyTasks.forEach(function(task) {
        //             resetDailyTasks(task);
        //         })
        //     }
        // }, 5000);



        //every 24 (86400000 milliseconds) hours we check to see if it is 3am.  If it is then we reset daily tasks to incomplete
        //when task is completed, run a PUT for JUST that task









    });
