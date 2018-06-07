var WeeklyLogs = require('./../models/WeeklyLogs');

module.exports = {

    addWeeklyLog: (req, res) => {
        WeeklyLogs.create(req.body, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    getWeeklyLogs: (req, res) => {
        WeeklyLogs.find(req.query, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    deleteWeeklyLogs: (req, res) => {
        WeeklyLogs.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    updateWeeklyLogs: (req, res) => {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        WeeklyLogs.findOneAndUpdate({
            _id: req.params.id
        }, req.body, (err, productItem) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(productItem);
            }
        });
    }

};
