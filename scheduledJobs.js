const dailyTodoCtrl = require('./controllers/dailyTodoCtrl'),
      mongoose = require('mongoose'),
      request = require('request');

mongoose.Promise = global.Promise;

request.get("https://cryptic-ravine-99712.herokuapp.com/api/dailyList", function(error, response, body) {
  let json = JSON.parse(body);
  json.dailyTasks.forEach(function(task) {
      task.completed = false;
      request({
          url: "https://cryptic-ravine-99712.herokuapp.com/api/dailyList",
          method: 'PUT',
          json: task
      }, function(error, request, body) {
              console.log(body);
          })
  })
});



// dailyTodoCtrl.getDailyTaskszzz()
// console.log(dailyTodoCtrl.dailyTodoObject);
