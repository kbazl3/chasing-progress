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
        console.log(req.query.taskId);
        Todo.findByIdAndRemove(req.query.taskId, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    }

    // update: function(req, res) {
    //     Lesson.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
    //         if (err) {
    //             res.status(500).send(err);
    //         }
    //         res.status(200).send(result);
    //     });
    // },

};
