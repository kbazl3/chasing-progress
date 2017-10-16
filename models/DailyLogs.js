var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var dailyLogsSchema = new Schema({
    tasks: {type: Array, required: true},
    dateCreated: {type: Date, default: new Date()},
    percentCompleted: {type: Number}
});

module.exports = mongoose.model("DailyLogs", dailyLogsSchema);

// {
//     "tasks": [{"_id": "59d802f149cdf40bf019144f", "task": "25 pushups - 25 situps - 60s plank", "dateCreated": "2017-10-14T20:57:50.151Z", "completed": true},
//     {"_id": "59d8031149cdf40bf0191450", "task": "Read for 30 minutes", "dateCreated": "2017-10-14T20:57:50.151Z", "completed": true},
//     {"_id": "59d8032649cdf40bf0191451", "task": "Write or study code 60 mins", "dateCreated": "2017-10-14T20:57:50.151Z", "completed": false},
//     {"_id": "59d8033149cdf40bf0191452", "task": "Cold shower", "dateCreated": "2017-10-14T20:57:50.151Z", "completed": false},
//     {"_id": "59dfbddb54caf175c42cf2b3", "task": "Aloe Vera + Fish oil", "dateCreated": "2017-10-14T20:57:50.151Z", "completed": true}],
//     "percentCompleted": 45
// }
