angular.module("chasingProgress")
    .service("researchTopicSvc", function($http) {

        this.addResearchTopic = function(topicName, topicImage) {
            return $http({
                method: 'POST',
                url: '/api/researchTopic',
                data: {
                    topicName: topicName,
                    topicImage: topicImage
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
            let researchTopicObject = {
                notes: researchTopicNotes,
                dateCreated: new Date()
            }
            return $http({
                method: 'PUT',
                url:'/api/researchTopic/' + researchTopic._id,
                data: researchTopicObject
            })
        }

    });
