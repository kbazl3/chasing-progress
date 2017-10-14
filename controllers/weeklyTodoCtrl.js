var WeeklyTodo = require('./../models/WeeklyTodo'),
    WeeklyLogs = require('./../models/WeeklyLogs');

module.exports = {

    addWeeklyTask: function(req, res) {
        WeeklyTodo.create(req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    // getWeeklyTasks: function(req, res) {
    //     WeeklyTodo.find(req.query, function(err, result) {
    //         if (err) {
    //             res.status(500).send(err);
    //         }
    //         res.status(200).send(result);
    //     });
    // },

    getWeeklyTasks: function(req, res, next) {
        WeeklyTodo.find(req.query)
            .exec(function(err, result) {
                let weeklyData = {}
                if (err) {
                    res.status(500 + "getPractice function error").json(err);
                } else {
                    weeklyData.weeklyTasks = result;
                    WeeklyLogs.find(req.query, function(err, weeklyLogs) {
                        console.log(weeklyLogs);
                        if (err) {
                            res.status(500).send(err);
                        }
                        weeklyData.weeklyLogs = weeklyLogs
                        res.status(200).json(weeklyData);
                    });

                }
            })
    },

    deleteWeeklyTask: function(req, res) {
        WeeklyTodo.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    updateWeeklyTask: function(req, res) {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        WeeklyTodo.findOneAndUpdate({
            _id: req.params.id
        }, req.body, function(err, productItem) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(productItem);
            }
        });
    },

    resetAllWeeklyTasks: function(req, res) {
        WeeklyTodo.findOneAndUpdate({
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
