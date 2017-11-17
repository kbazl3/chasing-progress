const dailyTodoCtrl = require('./controllers/dailyTodoCtrl'),
      mongoose = require('mongoose'),
      request = require('request');

mongoose.Promise = global.Promise;

request.get("https://cryptic-ravine-99712.herokuapp.com/api/dailyList", function(error, response, body) {
  let parsedJson = JSON.parse(body);
  request({
      url: "https://cryptic-ravine-99712.herokuapp.com/api/dailyLogs",
      method: 'POST',
      json: parsedJson.dailyTasks
  }, function(error, request, body) {
      console.log("create daily log xxxxxxxxxxxxxxxxxxxxxx", body);
      console.log("error xxxxxxxxxxxxxxxxxxxxxx", error);
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

// dailyTodoCtrl.getDailyTaskszzz()
// console.log(dailyTodoCtrl.dailyTodoObject);
