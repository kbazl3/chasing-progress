var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var todoSchema = new Schema({
    task: { type: String, required: true },
    dateCreated: {
        type: Date,
        default: new Date()
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: Date,
});

module.exports = mongoose.model("Todo", todoSchema);
