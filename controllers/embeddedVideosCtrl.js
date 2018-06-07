var EmbeddedVideo = require('./../models/EmbeddedVideo');

module.exports = {
    addEmbeddedVideo: (req, res)  => {
        EmbeddedVideo.create(req.body, (err, result)  => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    getEmbeddedVideos: (req, res)  => {
        EmbeddedVideo.find(req.query, (err, result)  => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    deleteEmbeddedVideo: (req, res)  => {
        EmbeddedVideo.findByIdAndRemove(req.params.id, (err, result)  => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    updateEmbeddedVideo: (req, res)  => {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        EmbeddedVideo.findOneAndUpdate({
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
