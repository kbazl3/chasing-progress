angular.module('chasingProgress')
    .controller('todoCtrl', function($scope, $interval, todoSvc) {

        var d = new Date().getHours();
        console.log(new Date().getMinutes());

        $interval(function() {
            if (new Date().getHours() === 02) {
                $scope.todoList.push({
                    task: "25 pushups - 25 situps - 60 second plank"
                }, {
                    task: "cold shower"
                }, {
                    task: "aloe vera"
                }, {
                    task: "read 30 mins"
                }, {
                    task: "code 1 hour"
                });
                //If I don't finish a daily task ^^ this will duplicate it.
            }
        }, 5000);

        $scope.todoList = [];
        $scope.completedList = [];
        var peopleToContact = [{
                person: "Obama",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Mom",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Dad",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Breer",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Jen",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Shane",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
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

        var chosenContacts = [1, 2, 3];
        var randomNumber;

        var getDailyContact = function() {
            if (chosenContacts.includes(randomNumber)) {
                getRandomNumber();
            } else {
                chosenContacts.push(randomNumber);
                $scope.todoList.push({
                    task: "Contact " + peopleToContact[randomNumber].person,
                    picture: peopleToContact[randomNumber].picture
                });
            }
        };

        var getRandomNumber = function() {
            randomNumber = parseInt((Math.random() * peopleToContact.length).toFixed());
            getDailyContact();
            return randomNumber;
        };

        getRandomNumber();

        $scope.markComplete = function(completedTask, index) {
            completedTask.completedAt = new Date();
            $scope.completedList.push(completedTask);
            $scope.todoList.splice(index, 1);
        };


        todoSvc.getTasks()
            .then(function(response) {
                $scope.todoList = response.data;
            });

        $scope.addTask = function(task) {
            todoSvc.addTask(task)
                .then(function(response) {
                    console.log(response);
                });
        };

        $scope.deleteTask = function(task) {
            console.log(task._id);
            todoSvc.deleteTask(task._id)
                .then(function(response) {
                    console.log(response);
                });
        };



    });
