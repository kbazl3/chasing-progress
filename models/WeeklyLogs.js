var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var weeklyLogsSchema = new Schema({
    tasks: {type: Array, required: true},
    week: Number,
    percentCompleted: Number,
    dateCreated: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("WeeklyLogs", weeklyLogsSchema);
