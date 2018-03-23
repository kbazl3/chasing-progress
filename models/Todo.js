var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var subTodoSchema = new Schema({
    listName: { type: String, required: true },
    listThumbnail: String,
    dateCreated: {
        type: Date,
        default: new Date()
    },
    percentCompleted: Number,
    completedAt: Date,
    tasks: [
        {
            taskName: String,
            completed: {type: Boolean, default: false},
            dateCreated: {
                type: Date,
                default: new Date()
            },
        }
    ]
});

module.exports = mongoose.model("SubTodo", subTodoSchema);
