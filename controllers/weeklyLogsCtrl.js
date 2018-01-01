var WeeklyLogs = require('./../models/WeeklyLogs');

module.exports = {

    addWeeklyLog: function(req, res) {
        WeeklyLogs.create(req.body, function(err, result) {
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
                res.status(500).send(err);
            } else {
                res.status(200).json(productItem);
            }
        });
    }

};
