var Quotes = require('./../models/Quotes');

module.exports = {
    addQuote: (req, res) => {
        Quotes.create(req.body, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    getQuotes: (req, res) => {
        Quotes.find({}, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },


    deleteQuote: (req, res) => {
        Quotes.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    addQuoteNote: (req, res) => {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        Quotes.findOneAndUpdate({
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
