var Booknotes = require('./../models/BookNotes');

module.exports = {
    addBook: (req, res) => {
        Booknotes.create(req.body, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    getBooks: (req, res) => {
        Booknotes.find(req.query, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    deleteBook: (req, res) => {
        Booknotes.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    addBookNote: (req, res) => {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        if (req.body.completed === true) {
            req.body.completedAt = new Date();
        }
        Booknotes.findOneAndUpdate({
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
    },
    getOneBook: (req, res, next) => {
        Booknotes.findOne({
            _id: req.params.id
        }, (err, book) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).json(book)
            }
        })
    }

};
