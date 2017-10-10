/*jshint esversion: 6 */

const express = require("express"),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      cors = require("cors"),
      port = 8090,
      app = express(),
      mongoUri = "mongodb://localhost:27017/chasingProgress",
      todoCtrl = require("./controllers/todoCtrl.js"),
      dailyTodoCtrl = require('./controllers/dailyTodoCtrl.js');



app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/scripts', express.static(__dirname + '/node_modules/angular-animate'));
app.use('/scripts', express.static(__dirname + '/node_modules/angular'));
app.use('/scripts', express.static(__dirname + '/node_modules/angular-ui-router/release'));
app.use('/scripts', express.static(__dirname + '/node_modules/angular-parallax'));
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



app.listen(port, () => {
    console.log("listening on ", + port);
});


mongoose.connect(mongoUri);
mongoose.connection.once('open', () => {
    console.log('connected to MongoDB at ', mongoUri);
});
