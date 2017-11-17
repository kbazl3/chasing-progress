const dailyTodoCtrl = require('./controllers/dailyTodoCtrl'),
      mongoose = require('mongoose'),
      request = require('request');

mongoose.Promise = global.Promise;

request.get("https://cryptic-ravine-99712.herokuapp.com/api/dailyList", function(error, response, body) {
    console.log(body);
  let parsedJson = JSON.parse(body);
  // request({
  //     url: "https://cryptic-ravine-99712.herokuapp.com/api/dailyLogs",
  //     method: 'PUT',
  //     json: parsedJson.dailyTasks
  // }, function(error, request, body) {
  //     console.log("create daily log", body);
  // })
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

console.log("also hitting this");



// dailyTodoCtrl.getDailyTaskszzz()
// console.log(dailyTodoCtrl.dailyTodoObject);
