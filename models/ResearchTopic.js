var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


    const researchTopicSchema = new Schema({
        topicName: {type: String, required: true},
        dateCreated: {type: Date, default: new Date()},
        topicImage: {type: String, required: true},
        topicBackgroundImage: String,
        notes: [{
            note: {type: String},
            dateCreated: {type: Date, default: new Date()}
        }]
    });



module.exports = mongoose.model("ResearchTopic", researchTopicSchema);
