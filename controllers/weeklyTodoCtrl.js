var WeeklyTodo = require('./../models/WeeklyTodo');

module.exports = {

    addWeeklyTask: function(req, res) {
        WeeklyTodo.create(req.body, function(err, result) {
            console.log(req.body);
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    getWeeklyTasks: function(req, res) {
        WeeklyTodo.find(req.query, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            dailyTasks = result;
            res.status(200).send(result);
        });
    },

    deleteWeeklyTask: function(req, res) {
        console.log(req.params);
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
                console.log("asdfasdfas");
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
