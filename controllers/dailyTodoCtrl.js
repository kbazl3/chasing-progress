var DailyTodo = require('./../models/DailyTodo'),
    DailyLogs = require('./../models/DailyLogs');

module.exports = {

    addDailyTask: (req, res) => {
        DailyTodo.create(req.body, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },


    getDailyTasks: (req, res, next) => {
        DailyTodo.find()
            .exec((err, result) => {
                let dailyData = {}
                if (err) {
                    res.status(500 + "getPractice function error").json(err) ;
                } else {
                    dailyData.dailyTasks = result;
                    DailyLogs.find(req.query, (err, dailyLogs) => {
                        if (err) {
                            res.status(500).send(err);
                        }
                        dailyData.dailyLogs = dailyLogs
                        res.status(200).json(dailyData);
                    });

                }
            })
    },

    deleteDailyTask: (req, res) => {
        DailyTodo.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    updateDailyTask: (req, res) => {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        DailyTodo.findOneAndUpdate({
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
