var Grocery = require('./../models/Grocery');

module.exports = {
    addGrocery: (req, res)  => {
        Grocery.create(req.body, (err, result)  => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    getGroceries: (req, res)  => {
        Grocery.find(req.query, (err, result)  => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    deleteGrocery: (req, res)  => {
        Grocery.findByIdAndRemove(req.params.id, (err, result)  => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    updateGrocery: (req, res)  => {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        Grocery.findOneAndUpdate({
            _id: req.params.id
        }, req.body, (err, productItem)  => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(productItem);
            }
        });
    },
    test: (req, res)  => {
        return 'foo';
    }

};
