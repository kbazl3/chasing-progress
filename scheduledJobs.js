const dailyTodoCtrl = require('./controllers/dailyTodoCtrl');


let dailyTasks = function() {

    dailyTodoCtrl.getDailyTaskszzz()
        .then(function(response) {
            console.log(response);
        });
}
dailyTasks();
