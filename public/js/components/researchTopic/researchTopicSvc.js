angular.module("chasingProgress")
    .service("researchTopicSvc", function($http) {

        this.addResearchTopic = function(topicName, topicImage, topicBackgroundImage) {
            return $http({
                method: 'POST',
                url: '/api/researchTopic',
                data: {
                    topicName: topicName,
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
                console.log(response);
                return response;
            });
        };

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

    });
