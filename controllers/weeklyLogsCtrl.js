var WeeklyLogs = require('./../models/WeeklyLogs');

module.exports = {

    addWeeklyLog: function(req, res) {
        WeeklyLogs.create(req.body, function(err, result) {
            console.log(req.body);
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    getWeeklyLogs: function(req, res) {
        WeeklyLogs.find(req.query, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    deleteWeeklyLogs: function(req, res) {
        console.log(req.params);
        WeeklyLogs.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    updateWeeklyLogs: function(req, res) {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        WeeklyLogs.findOneAndUpdate({
            _id: req.params.id
        }, req.body, function(err, productItem) {
            if (err) {
                console.log("asdfasdfas");
                res.status(500).send(err);
            } else {
                res.status(200).json(productItem);
            }
        });
    }

};




[{task: "Kettlebell", dateCreated: "2017-10-14T03:40:31.645Z"},
{task: "Laundry", dateCreated: "2017-10-14T03:40:31.645Z"},
{task: "Clean room", dateCreated: "2017-10-12T21:14:10.830Z"}]
