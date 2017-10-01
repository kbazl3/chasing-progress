/*jshint esversion: 6 */

angular.module('chasingProgress')
    .service('todoSvc', function($http, $q, $interval) {
        const baseUrl = "http://localhost:8090";
        let sortedData = {
            todoList: [],
            completedList: [],
            dailyList: []
        };

        var dailyList = [{
            task: "25 pushups - 25 situps - 60 second plank"
        }, {
            task: "cold shower"
        }, {
            task: "aloe vera"
        }, {
            task: "read 30 mins"
        }, {
            task: "code 1 hour"
        }, {
            task: "meditate 15 mins"
        }];


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
                picture: "../../images/shaeno.jpg"
            },
            {
                person: "April",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Mason",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Tayia",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
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
                if (task.completed === false) {
                    sortedData.todoList.push(task);
                } else {
                    sortedData.completedList.push(task);
                }
            });
        };

        this.getTasks = function(dailyList) {
            var dfd = $q.defer();
            console.log(dailyList);


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



        console.log(new Date().getHours());

        // $interval(function() {
        //     if (new Date().getHours() === 21) {
        //         sortedData.dailyList = [{
        //             task: "25 pushups - 25 situps - 60 second plank"
        //         }, {
        //             task: "cold shower"
        //         }, {
        //             task: "aloe vera"
        //         }, {
        //             task: "read 30 mins"
        //         }, {
        //             task: "code 1 hour"
        //         }];
        //     }
        // }, 5000);

        //every 24 hours we run 'getdailytasks' and update them all to completed: false
        //when task is completed, run a put for JUST that task








    });
