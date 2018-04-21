angular.module("chasingProgress")
    .service("researchTopicSvc", function($http) {

        this.addResearchTopic = function(topicName, secondaryText, topicImage, topicBackgroundImage) {
            return $http({
                method: 'POST',
                url: '/api/researchTopic',
                data: {
                    topicName: topicName,
                    secondaryText: secondaryText,
                    topicImage: topicImage,
                    topicBackgroundImage: topicBackgroundImage
                }
            }).then(function(response) {
                return response;
            });
        };

        this.getResearchTopics = function() {
            return $http({
              method: 'GET',
              url: '/api/researchTopic'
            }).then(function(response) {
                return response;
            });
        };

        this.deleteTopic = function(topic) {
            return $http({
                method: 'DELETE',
                url: '/api/researchTopic/' + topic._id
            }).then(function(response) {
                return response;
            })
        }

        this.updateResearchTopic = function(editedTopic, newTopicName, newSecondaryText, newTopicImage, newTopicImageBackground) {
            console.log(editedTopic, newTopicName, newSecondaryText, newTopicImage, newTopicImageBackground);
            return $http({
              method: 'PUT',
              url: '/api/researchTopic/' + editedTopic._id,
              data: {
                  topicName: newTopicName,
                  secondaryText: newSecondaryText,
                  topicImage: newTopicImage,
                  topicBackgroundImage: newTopicImageBackground
              }
            }).then(function(response) {
                return response;
            });

        }

        this.newNotes = function(researchTopic, researchTopicNotes) {
            researchTopic.notes.push({
                note: researchTopicNotes
            })
            return $http({
                method: 'PUT',
                url:'/api/researchTopic/' + researchTopic._id,
                data: researchTopic
            }).then(function(response) {
                return response
            })
        }

        this.deleteNote = function(researchTopic, index) {
            researchTopic.notes.splice(index, 1);
            return $http({
                    method: "PUT",
                    url: "/api/researchTopic/" + researchTopic._id,
                    data: researchTopic
                })
                .then(function(response) {
                    return response;
                });
        }

        this.updateTopicNotes = function(topic, indexOfNote, updatedNote) {
            topic.notes[indexOfNote].note = updatedNote
            return $http({
                    method: "PUT",
                    url: "/api/researchTopic/" + topic._id,
                    data: topic
                })
                .then(function(response) {
                    return response;
                });
        }

    });
