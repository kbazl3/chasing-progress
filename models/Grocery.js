var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



    var grocerySchema = new Schema({
        groceryItem: {type: String, required: true},
        dateCreated: {type: Date, default: new Date()}
    });



module.exports = mongoose.model("Grocery", grocerySchema);
