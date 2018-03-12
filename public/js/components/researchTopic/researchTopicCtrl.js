angular.module("chasingProgress")
    .controller("researchTopicCtrl", function($scope, $state, researchTopicSvc, alertify) {




        $scope.addResearchTopic = function() {
            researchTopicSvc.addResearchTopic($scope.topicName, $scope.topicImage, $scope.topicImageBackground)
                .then(function(response) {
                    $scope.researchTopics = response.data;
                    alertify.success("Added " + response.data.topicName)
                    $scope.topicName = "";
                    $scope.topicImage  = "";
                    $scope.topicImageBackground = "";
                })
        }

        researchTopicSvc.getResearchTopics()
            .then(function(response) {
                $scope.researchTopics = response.data;
            })

        $scope.openResearchTopicPage = function(index) {
            $state.go('researchTopicPage', {
                researchTopicId: index
            });
        }

        $scope.deleteTopic = function(topic) {
            alertify.confirm("You are about to delete the " + topic.topicName + " topic and all of its notes. Sure you wanna do this?", function() {
                researchTopicSvc.deleteTopic(topic)
                    .then(function(response) {
                        alertify.success('DELETED')
                    })
            }, function() {
                alertify.error('Cancel')
            });
        }

    });
