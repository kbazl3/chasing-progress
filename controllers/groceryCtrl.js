var Grocery = require('./../models/Grocery');

module.exports = {
    addGrocery: function(req, res) {
        Grocery.create(req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    getGroceries: function(req, res) {
        Grocery.find(req.query, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    deleteGrocery: function(req, res) {
        Grocery.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    updateGrocery: function(req, res) {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        if (req.body.completed === true) {
            req.body.completedAt = new Date();
        }
        Grocery.findOneAndUpdate({
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
