/*jshint esversion: 6 */

angular.module('chasingProgress')
    .service('todoSvc', function($http, $q, $interval) {
        const baseUrl = "http://localhost:8090";
        let sortedData = {
            todoList: [],
            completedList: [],
        };


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
                person: "Ryan Hadley",
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
                person: "Obama",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
        ];
        var randomNumber;

        var setDailyContact = function() {
            randomNumber = parseInt((Math.random() * peopleToContact.length).toFixed());
            sortedData.dailyContact = peopleToContact[randomNumber];
        };

        const sortTasks = function(tasks) {
            tasks.forEach(function(task) {
                if (task.task === "Finish Daily Tasks") {
                    sortedData.dailyTasks = task.dailyTasks;
                }
                else if (task.completed === false) {
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
                console.log(response);
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
                    url: baseUrl + "/api/todoList?taskId=" + taskId
                })
                .then(function(response) {});
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

        const resetDailyTasks = function() {
            return $http({
                    method: "PUT",
                    url: baseUrl + "/api/todoList/59d0846d904ff13874ffeef5",
                    data: {
                        task: "Finish Daily Tasks",
                        dailyTasks: [{
                            task: "25 pushups - 25 situps - 60 second plank",
                            completed: false
                        }, {
                            task: "cold shower",
                            completed: false
                        }, {
                            task: "aloe vera",
                            completed: false
                        }, {
                            task: "read 30 mins",
                            completed: false
                        }, {
                            task: "code 1 hour",
                            completed: false
                        }, {
                            task: "meditate 15 mins",
                            completed: false
                        }]
                    }
                })
                .then(function(response) {
                    return response;
                });
        };



        console.log(new Date().getHours());

        $interval(function() {
            if (new Date().getHours() === 3) {
                resetDailyTasks();
            }
        }, 82800000);

        //every 23 hours we check to see if it is 3am.  If it is then we reset daily tasks to incomplete
        //when task is completed, run a PUT for JUST that task









    });
