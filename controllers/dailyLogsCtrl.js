var DailyLogs = require('./../models/DailyLogs');

module.exports = {

    addDailyLog: (req, res) => {
        DailyLogs.create(req.body, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    getDailyLogs: (req, res) => {
        DailyLogs.find(req.query, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    deleteDailyLogs: (req, res) => {
        DailyLogs.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    updateDailyLogs: (req, res) => {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        DailyLogs.findOneAndUpdate({
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
