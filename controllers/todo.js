var Todo = require('./../models/Todo');

module.exports = {
    addTask: function(req, res) {
        Todo.create(req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    getTasks: function(req, res) {
        Todo.find(req.query, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    deleteTask: function(req, res) {
        Todo.findByIdAndRemove(req.query.taskId, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    // updateTask: function(req, res) {
    //     if (!req.params.id) {
    //         return res.status(400).send('id query needed');
    //     }
    //     console.log(req.query);
    //     console.log(req.body);
    //     console.log(req.params);
    //     Todo.findByIdAndUpdate(req.query.id, req.body, function(err, result) {
    //         if (err) {
    //             res.status(500).send(err);
    //         }
    //         res.status(200).send(result);
    //     });
    // }

    updateTask: function(req, res) {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        if (req.body.completed === true) {
            req.body.completedAt = new Date();
        }
        Todo.findOneAndUpdate({
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

    addDailyTasks: function(req, res) {
        Todo.create(req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(result);
            }
        });
    },

    updateDailyTask: function(req, res) {
        // Todo.
    }

};
