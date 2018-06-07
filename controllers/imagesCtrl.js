var Images = require('./../models/Images');

module.exports = {
    addImage: (req, res) => {
        Images.create(req.body, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    getImages: (req, res) => {
        Images.find({}, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },


    deleteImage: (req, res) => {
        Images.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    addImageNote: (req, res) => {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        Images.findOneAndUpdate({
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
