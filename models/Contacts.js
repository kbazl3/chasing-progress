var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



    var contactSchema = new Schema({
        name: {type: String, required: true},
        dateCreated: {type: Date, default: new Date()},
        contactImage: {type: String}
    });



module.exports = mongoose.model("Contact", contactSchema);
