var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var dailyTodoSchema = new Schema({
    task: { type: String, required: true },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("DailyTodo", dailyTodoSchema);
