var DailyLogs = require('./../models/DailyLogs');

module.exports = {

    addDailyLog: function(req, res) {
        DailyLogs.create(req.body, function(err, result) {
            console.log(req.body);
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    getDailyLogs: function(req, res) {
        DailyLogs.find(req.query, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    deleteDailyLogs: function(req, res) {
        console.log(req.params);
        DailyLogs.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    updateDailyLogs: function(req, res) {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        DailyLogs.findOneAndUpdate({
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
