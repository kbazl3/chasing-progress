var Images = require('./../models/Images');

module.exports = {
    addImage: function(req, res) {
        Images.create(req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    getImages: function(req, res) {
        Images.find({}, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },


    deleteImage: function(req, res) {
        Images.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    addImageNote: function(req, res) {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        Images.findOneAndUpdate({
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
