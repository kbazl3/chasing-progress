var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var dailyLogsSchema = new Schema({
    tasks: {type: Array, required: true},
    dateCreated: {type: Date, default: new Date().setDate(new Date().getDate() - 1)},
    percentCompleted: {type: Number}
});

module.exports = mongoose.model("DailyLogs", dailyLogsSchema);
