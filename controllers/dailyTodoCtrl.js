var DailyTodo = require('./../models/DailyTodo'),
    DailyLogs = require('./../models/DailyLogs');

module.exports = {

    addDailyTask: function(req, res) {
        DailyTodo.create(req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },


    getDailyTasks: function(req, res, next) {
        DailyTodo.find()
            .exec(function(err, result) {
                let dailyData = {}
                if (err) {
                    res.status(500 + "getPractice function error").json(err);
                } else {
                    dailyData.dailyTasks = result;
                    DailyLogs.find(req.query, function(err, dailyLogs) {
                        if (err) {
                            res.status(500).send(err);
                        }
                        dailyData.dailyLogs = dailyLogs
                        res.status(200).json(dailyData);
                    });

                }
            })
    },

    deleteDailyTask: function(req, res) {
        console.log(req.params);
        DailyTodo.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    updateDailyTask: function(req, res) {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        DailyTodo.findOneAndUpdate({
            _id: req.params.id
        }, req.body, function(err, productItem) {
            if (err) {
                console.log("asdfasdfas");
                res.status(500).send(err);
            } else {
                res.status(200).json(productItem);
            }
        });
    },

    resetAllDailyTasks: function(req, res) {
        DailyTodo.findOneAndUpdate({
            _id: req.params.id
        }, req.body, function(err, productItem) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(productItem);
            }
        });
    },

    getDailyTaskszzz: function(req, res, next) {
        console.log("hitting");
        DailyTodo.find()
            .exec(function(err, result) {
                if (err) {
                    res.status(500 + "getPractice function error").json(err);
                } else {
                    console.log(result);
                    result.forEach(function() {
                        console.log(result);
                    })

                }
            })
    }

};
