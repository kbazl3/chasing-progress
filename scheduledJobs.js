const dailyTodoCtrl = require('./controllers/dailyTodoCtrl'),
      mongoose = require('mongoose');

mongoose.Promise = global.Promise;



dailyTodoCtrl.getDailyTaskszzz()
    .then(function(response) {
        console.log("promise in scheudledJobs.js");
    });
