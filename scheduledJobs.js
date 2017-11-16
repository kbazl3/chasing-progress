const dailyTodoCtrl = require('./controllers/dailyTodoCtrl'),
      mongoose = require('mongoose'),
      request = require('request');

mongoose.Promise = global.Promise;

request.get("https://cryptic-ravine-99712.herokuapp.com/api/dailyList", function(error, response, body) {
  // let json = JSON.parse(body);
  body.dailyTasks.forEach(function(task) {
      console.log(task);
  })
});



// dailyTodoCtrl.getDailyTaskszzz()
// console.log(dailyTodoCtrl.dailyTodoObject);
