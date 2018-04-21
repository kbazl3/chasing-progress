var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


    const imageSchema = new Schema({
        image: {type: String, required: true},
        dateCreated: {type: Date, default: new Date()}
    });


module.exports = mongoose.model("Images", imageSchema);
