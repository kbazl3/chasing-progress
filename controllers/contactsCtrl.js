var Contact = require('./../models/Contacts');

module.exports = {
    addContact: function(req, res) {
        console.log('hitting');
        Contact.create(req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    getContacts: function(req, res) {
        Contact.find(req.query, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    deleteContact: function(req, res) {
        Contact.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    updateContact: function(req, res) {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        Contact.findOneAndUpdate({
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
