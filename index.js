/*jshint esversion: 6 */

const express = require("express"),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      cors = require("cors"),
      port = 8090,
      app = express(),
      mongoUri = "mongodb://localhost:27017/chasingProgress",
      todoCtrl = require("./controllers/todo.js");



app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));
mongoose.Promise = global.Promise;

app.post('/api/todoList', todoCtrl.addTask);
app.get('/api/todoList', todoCtrl.getTasks);
app.delete('/api/todoList', todoCtrl.deleteTask);
app.put('/api/todoList/:id', todoCtrl.updateTask);


app.post('/api/dailyList', todoCtrl.addDailyTasks);
// app.post('/api/food/reviews', foodCtrl.addReview);

// app.get('/api/food/review', foodCtrl.getOneReview);



app.listen(port, () => {
    console.log("listening on ", + port);
});


mongoose.connect(mongoUri);
mongoose.connection.once('open', () => {
    console.log('connected to MongoDB at ', mongoUri);
});
