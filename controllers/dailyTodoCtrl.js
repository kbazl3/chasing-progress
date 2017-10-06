var DailyTodo = require('./../models/DailyTodo');

module.exports = {

    addDailyTask: function(req, res) {
        DailyTodo.create(req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    getDailyTasks: function(req, res) {
        DailyTodo.find(req.query, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
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
        if (req.body.completed === true) {
            req.body.completedAt = new Date();
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
    }

};
