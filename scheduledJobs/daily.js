const dailyTodoCtrl = require('../controllers/dailyTodoCtrl'),
    mongoose = require('mongoose'),
    request = require('request');

mongoose.Promise = global.Promise;

const percentCompleted = function(ary) {
    let complete = 0;
    ary.forEach(function(task) {
        if (task.completed) {
            complete++;
        }
    })
    return (complete / ary.length) * 100;
}

request.get("https://cryptic-ravine-99712.herokuapp.com/api/dailyList", function(error, response, body) {
    let parsedJson = JSON.parse(body);
    request({
        url: "https://cryptic-ravine-99712.herokuapp.com/api/dailyLogs",
        method: 'POST',
        json: {
            tasks: parsedJson.dailyTasks,
            percentCompleted: percentCompleted(parsedJson.dailyTasks)
        }
    }, function(error, request, body) {

    })
    parsedJson.dailyTasks.forEach(function(task) {
        task.completed = false;
        request({
            url: "https://cryptic-ravine-99712.herokuapp.com/api/dailyList/" + task._id,
            method: 'PUT',
            json: task
        }, function(error, request, bodys) {

        })
    })
});
console.log(new Date().getDay());
if (new Date().getDay() === 4) {
    console.log("herjalsdfjadsfa");
}
