var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



    var bookNotesSchema = new Schema({
        title: {type: String, required: true},
        dateCreated: {type: Date, default: new Date()},
        coverImage: {type: String},
        notes: {type: Array}
    });



module.exports = mongoose.model("BookNotes", bookNotesSchema);
