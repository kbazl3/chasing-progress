var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var weeklyTodoSchema = new Schema({
    task: { type: String, required: true },
    completed: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("WeeklyTodo", weeklyTodoSchema);
