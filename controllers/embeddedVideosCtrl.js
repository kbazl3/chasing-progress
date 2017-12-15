var EmbeddedVideo = require('./../models/EmbeddedVideo');

module.exports = {
    addEmbeddedVideo: function(req, res) {
        EmbeddedVideo.create(req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    getEmbeddedVideos: function(req, res) {
        EmbeddedVideo.find(req.query, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    deleteEmbeddedVideo: function(req, res) {
        EmbeddedVideo.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    updateEmbeddedVideo: function(req, res) {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        EmbeddedVideo.findOneAndUpdate({
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
