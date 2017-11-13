const DailyTodo = require('./models/DailyTodo');

let dailyTasks;

DailyTodo.find()
    .exec(function(err, result) {
        if (err) {
            console.log("error");
        } else {
            dailyTasks = result;
            console.log("indside", dailyTasks);

        }
    })

    console.log("outside", dailyTasks);
