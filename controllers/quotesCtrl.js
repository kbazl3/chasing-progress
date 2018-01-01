var Quotes = require('./../models/Quotes');

module.exports = {
    addQuote: function(req, res) {
        Quotes.create(req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    getQuotes: function(req, res) {
        Quotes.find({}, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },


    deleteQuote: function(req, res) {
        Quotes.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    addQuoteNote: function(req, res) {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        Quotes.findOneAndUpdate({
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
