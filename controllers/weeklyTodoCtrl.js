var WeeklyTodo = require('./../models/WeeklyTodo'),
    WeeklyLogs = require('./../models/WeeklyLogs');

module.exports = {

    addWeeklyTask: (req, res) => {
        WeeklyTodo.create(req.body, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    getWeeklyTasks: (req, res, next) => {
        WeeklyTodo.find(req.query)
            .exec((err, result) => {
                let weeklyData = {}
                if (err) {
                    res.status(500 + "getPractice  error").json(err) ;
                } else {
                    weeklyData.weeklyTasks = result;
                    WeeklyLogs.find(req.query, (err, weeklyLogs) => {
                        if (err) {
                            res.status(500).send(err);
                        }
                        weeklyData.weeklyLogs = weeklyLogs
                        res.status(200).json(weeklyData);
                    });

                }
            })
    },

    deleteWeeklyTask: (req, res) => {
        WeeklyTodo.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    updateWeeklyTask: (req, res) => {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        WeeklyTodo.findOneAndUpdate({
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
