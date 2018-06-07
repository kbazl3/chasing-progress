var ResearchTopic = require('./../models/ResearchTopic');

module.exports = {
    addResearchTopic: (req, res) => {
        ResearchTopic.create(req.body, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    getResearchTopics: (req, res) => {
        ResearchTopic.find(req.query, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    deleteResearchTopic: (req, res) => {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        ResearchTopic.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },

    updateResearchTopic: (req, res) => {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        ResearchTopic.findOneAndUpdate({
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
