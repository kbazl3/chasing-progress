/*jshint esversion: 6 */

const express = require("express"),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
    //   cors = require("cors"),
      port = process.env.PORT || 8090,
      app = express(),
      secrets = require('./secrets.js'),
      mongoUri = process.env.MONGO_LABS_URI || secrets.MONGO_LABS_URI,
      todoCtrl = require("./controllers/todoCtrl.js"),
      dailyTodoCtrl = require('./controllers/dailyTodoCtrl.js'),
      weeklyTodoCtrl = require('./controllers/weeklyTodoCtrl'),
      weeklyLogsCtrl = require('./controllers/weeklyLogsCtrl'),
      dailyLogsCtrl = require('./controllers/dailyLogsCtrl'),
      groceryCtrl = require('./controllers/groceryCtrl'),
      bookNotesCtrl = require('./controllers/bookNotesCtrl'),
      quotesCtrl = require('./controllers/quotesCtrl');

app.use(bodyParser.json());
// app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules/angular'));
app.use('/scripts', express.static(__dirname + '/node_modules/angular-animate'));
app.use('/scripts', express.static(__dirname + '/node_modules/angular-ui-router/release'));
app.use('/scripts', express.static(__dirname + '/node_modules/angular-parallax-npm'));
app.use('/scripts', express.static(__dirname + '/node_modules/angular-ui-bootstrap'));
app.use('/scripts', express.static(__dirname + '/node_modules/textangular'));
mongoose.Promise = global.Promise;

app.post('/api/todoList', todoCtrl.addTask);
app.get('/api/todoList', todoCtrl.getTasks);
app.delete('/api/todoList/:id', todoCtrl.deleteTask);
app.put('/api/todoList/:id', todoCtrl.updateTask);
app.get('/api/todoList/test', todoCtrl.test);

app.post('/api/dailyList', dailyTodoCtrl.addDailyTask);
app.get('/api/dailyList', dailyTodoCtrl.getDailyTasks);
app.delete('/api/dailyList/:id', dailyTodoCtrl.deleteDailyTask);
app.put('/api/dailyList/:id', dailyTodoCtrl.updateDailyTask);

app.post('/api/weeklyList', weeklyTodoCtrl.addWeeklyTask);
app.get('/api/weeklyList', weeklyTodoCtrl.getWeeklyTasks);
app.delete('/api/weeklyList/:id', weeklyTodoCtrl.deleteWeeklyTask);
app.put('/api/weeklyList/:id', weeklyTodoCtrl.updateWeeklyTask);

app.post('/api/groceryList', groceryCtrl.addGrocery);
app.get('/api/groceryList', groceryCtrl.getGroceries);
app.delete('/api/groceryList/:id', groceryCtrl.deleteGrocery);
app.put('/api/groceryList/:id', groceryCtrl.updateGrocery);

app.post('/api/weeklyLogs', weeklyLogsCtrl.addWeeklyLog);
app.get('/api/weeklyLogs', weeklyLogsCtrl.getWeeklyLogs);
app.delete('/api/weeklyLogs/:id', weeklyLogsCtrl.deleteWeeklyLogs);

app.post('/api/dailyLogs', dailyLogsCtrl.addDailyLog);
app.get('/api/dailyLogs', dailyLogsCtrl.getDailyLogs);
app.delete('/api/dailyLogs/:id', dailyLogsCtrl.deleteDailyLogs);

app.post('/api/bookNotes', bookNotesCtrl.addBook);
app.put('/api/bookNotes/:id', bookNotesCtrl.addBookNote);
app.get('/api/bookNotes', bookNotesCtrl.getBooks);
app.delete('/api/bookNotes/:id', bookNotesCtrl.deleteBook);

app.post('/api/quotes', quotesCtrl.addQuote);
app.put('/api/quotes/:id', quotesCtrl.addQuoteNote);
app.get('/api/quotes', quotesCtrl.getQuotes);
app.delete('/api/quotes/:id', quotesCtrl.deleteQuote);

app.listen(port, () => {
    console.log("listening on ", + port);
});

mongoose.connect(mongoUri, {
    useMongoClient: true
});

mongoose.connection.once('open', () => {
    console.log('connected to MongoDB at ', mongoUri);
});

module.exports = app;
