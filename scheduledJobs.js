const dailyTodoCtrl = require('./controllers/dailyTodoCtrl'),
      mongoose = require('mongoose'),
      request = require('request');

mongoose.Promise = global.Promise;

request.get("/api/dailyList", function(error, response, body) {
  // let json = JSON.parse(body);
  console.log(response, "xxxxxxxxxxxxxx", body);
});



// dailyTodoCtrl.getDailyTaskszzz()
// console.log(dailyTodoCtrl.dailyTodoObject);
