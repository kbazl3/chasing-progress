const mongoose = require('mongoose'),
      Schema = mongoose.Schema;



    var quotesSchema = new Schema({
        quote: {type: String, required: true},
        author: {type: String},
        dateCreated: {type: Date, default: new Date()},
        notes: [{
            note: {type: String},
            dateCreated: {type: Date, default: new Date()}
        }]
    });


module.exports = mongoose.model("Quotes", quotesSchema);
