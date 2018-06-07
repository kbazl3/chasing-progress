var Todo = require('./../models/Todo');

module.exports = {
    addTodoList: (req, res) => {
        Todo.create(req.body, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    getTodoLists: (req, res) => {
        Todo.find(req.query, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    deleteTodoList: (req, res) => {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        Todo.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    updateTodoList: (req, res) => {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        if (req.body.completed === true) {
            req.body.completedAt = new Date();
        }
        Todo.findOneAndUpdate({
            _id: req.params.id
        }, req.body, (err, productItem) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(productItem);
            }
        });
    },
    test: (req, res) => {
        return 'foo';
    }

};
