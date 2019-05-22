//this code is ran every night at 3am with the help of the add-on "heroku scheduler"

const dailyTodoCtrl = require('../controllers/dailyTodoCtrl'),
    mongoose = require('mongoose'),
    request = require('request');  //Allows an HTTP request to be called from the backend

mongoose.Promise = global.Promise;

const percentCompleted = function(ary) { //a helper function that takes in task objects and returns a percent completed
    let complete = 0;
    ary.forEach(function(task) {
        if (task.completed) {
            complete++;
        }
    })
    return (complete / ary.length) * 100;
}


request.get("https://cryptic-ravine-99712.herokuapp.com/api/dailyList", function(error, response, body) {
    let parsedJson = JSON.parse(body); //pulls the dailyList data for the day to determine which tasks were completed
    request({ // create an object with today's daily task stats and posts it to daily logs
        url: "https://cryptic-ravine-99712.herokuapp.com/api/dailyLogs",
        method: 'POST',
        json: {
            tasks: parsedJson.dailyTasks,
            percentCompleted: percentCompleted(parsedJson.dailyTasks)
        }
    }, function(error, request, body) {

    })
    parsedJson.dailyTasks.forEach(function(task) { //resets all of the daily tasks to "incomplete"
        task.completed = false;
        request({
            url: "https://cryptic-ravine-99712.herokuapp.com/api/dailyList/" + task._id,
            method: 'PUT',
            json: task
        }, function(error, request, bodys) {

        })
    })
});

if (new Date().getDay() === 0) {  //if the day is sunday then reset weekly tasks
    request.get("https://cryptic-ravine-99712.herokuapp.com/api/weeklyList", function(error, response, body) { //pull the data for the weekly tasks
        let parsedJson = JSON.parse(body);
        request({ //create an object with this weeks weekly stats and post it to weekly logs
            url: "https://cryptic-ravine-99712.herokuapp.com/api/weeklyLogs",
            method: 'POST',
            json: {
                tasks: parsedJson.weeklyTasks,
                percentCompleted: percentCompleted(parsedJson.weeklyTasks)
            }
        }, function(error, request, body) {

        })
        parsedJson.weeklyTasks.forEach(function(task) { //reset all weekly tasks to "incomplete"
            task.completed = false;
            request({
                url: "https://cryptic-ravine-99712.herokuapp.com/api/weeklyList/" + task._id,
                method: 'PUT',
                json: task
            }, function(error, request, bodys) {

            })
        })
    });
}
