var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var weeklyLogsSchema = new Schema({
    tasks: {type: Array, required: true},
    week: Number,
    percentCompleted: Number
});

module.exports = mongoose.model("WeeklyLogs", weeklyLogsSchema);
