var Todo = require('./../models/Todo');

module.exports = {
    addTodoList: function(req, res) {
        Todo.create(req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    getTodoLists: function(req, res) {
        Todo.find(req.query, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            console.log(result);
            res.status(200).send(result);
        });
    },
    deleteTodoList: function(req, res) {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        Todo.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    updateTodoList: function(req, res) {
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
                res.status(500).send(err);
            } else {
                res.status(200).json(productItem);
            }
        });
    },
    test: function(req, res) {
        return 'foo';
    }

};
