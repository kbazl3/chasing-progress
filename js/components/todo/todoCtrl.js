angular.module('chasingProgress')
    .controller('todoCtrl', function($scope) {

        $scope.todoList = [];
        $scope.completedList = [];
        var peopleToContact = [
            {
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
                person: "Brooke",
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
                person: "Obama",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
            {
                person: "Obama",
                picture: "http://www.freeiconspng.com/uploads/obama-face-png-3.png"
            },
        ]

        $scope.addTodo = function() {
            console.log($scope.addTodoInput);
            $scope.todoList.push({
                task: $scope.addTodoInput,
                createdAt: new Date()
            });

            $scope.addTodoInput = "";
        };

        $scope.markComplete = function(completedTask, index) {
            completedTask.completedAt = new Date();
            $scope.completedList.push(completedTask);
            $scope.todoList.splice(index, 1);
        };

    });
