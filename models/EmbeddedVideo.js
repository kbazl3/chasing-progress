const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    const embeddedVideo = new Schema({
        video: {type: String, required: true},
        dateCreated: {type: Date, default: new Date()},
        notes: [{
            note: {type: String},
            dateCreated: {type: Date, default: new Date()}
        }]

    });


module.exports = mongoose.model("EmbeddedVideo", embeddedVideo);
