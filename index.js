/*jshint esversion: 6 */

const express = require("express"),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
    //   cors = require("cors"),
      port = process.env.PORT || 8090,
      app = express(),
    //   secrets = require('./secrets.js')
      mongoUri = process.env.MONGO_LABS_URI || secrets.MONGO_LABS_URI,
      todoCtrl = require("./controllers/todoCtrl.js"),
      dailyTodoCtrl = require('./controllers/dailyTodoCtrl.js'),
      weeklyTodoCtrl = require('./controllers/weeklyTodoCtrl'),
      weeklyLogsCtrl = require('./controllers/weeklyLogsCtrl'),
      dailyLogsCtrl = require('./controllers/dailyLogsCtrl');

app.use(bodyParser.json());
// app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/scripts', express.static(__dirname + '/node_modules/angular-animate'));
app.use('/scripts', express.static(__dirname + '/node_modules/angular'));
app.use('/scripts', express.static(__dirname + '/node_modules/angular-ui-router/release'));
app.use('/scripts', express.static(__dirname + '/node_modules/angular-parallax'));
app.use('/scripts', express.static(__dirname + '/node_modules/angular-parallax-npm'));
mongoose.Promise = global.Promise;

app.post('/api/todoList', todoCtrl.addTask);
app.get('/api/todoList', todoCtrl.getTasks);
app.delete('/api/todoList/:id', todoCtrl.deleteTask);
app.put('/api/todoList/:id', todoCtrl.updateTask);

app.post('/api/dailyList', dailyTodoCtrl.addDailyTask);
app.get('/api/dailyList', dailyTodoCtrl.getDailyTasks);
app.delete('/api/dailyList/:id', dailyTodoCtrl.deleteDailyTask);
app.put('/api/dailyList/:id', dailyTodoCtrl.updateDailyTask);
app.put('/api/dailyList/reset/:id', dailyTodoCtrl.resetAllDailyTasks);

app.post('/api/weeklyList', weeklyTodoCtrl.addWeeklyTask);
app.get('/api/weeklyList', weeklyTodoCtrl.getWeeklyTasks);
app.delete('/api/weeklyList/:id', weeklyTodoCtrl.deleteWeeklyTask);
app.put('/api/weeklyList/:id', weeklyTodoCtrl.updateWeeklyTask);
app.put('/api/weeklyList/reset/:id', weeklyTodoCtrl.resetAllWeeklyTasks);

app.post('/api/weeklyLogs', weeklyLogsCtrl.addWeeklyLog);
app.get('/api/weeklyLogs', weeklyLogsCtrl.getWeeklyLogs);
app.delete('/api/weeklyLogs/:id', weeklyLogsCtrl.deleteWeeklyLogs);

app.post('/api/dailyLogs', dailyLogsCtrl.addDailyLog);
app.get('/api/dailyLogs', dailyLogsCtrl.getDailyLogs);
app.delete('/api/dailyLogs/:id', dailyLogsCtrl.deleteDailyLogs);

app.listen(port, () => {
    console.log("listening on ", + port);
});

mongoose.connect(mongoUri, {
    useMongoClient: true
});

mongoose.connection.once('open', () => {
    console.log('connected to MongoDB at ', mongoUri);
});
