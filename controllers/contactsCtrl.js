var Contact = require('./../models/Contacts');

module.exports = {
    addContact: (req, res) => {
        console.log('hitting');
        Contact.create(req.body, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    getContacts: (req, res) => {
        Contact.find(req.query, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    deleteContact: (req, res) => {
        Contact.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    updateContact: (req, res) => {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        Contact.findOneAndUpdate({
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
