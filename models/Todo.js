var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var todoSchema = new Schema({
    task: String,
    dateCreated: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("Todo", todoSchema);
