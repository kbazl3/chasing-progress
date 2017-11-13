const dailyTodoCtrl = require('./controllers/dailyTodoCtrl');


let dailyTasks = dailyTodoCtrl.getDailyTasks().dailyTasks;
console.log(dailyTasks);
