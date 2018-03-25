angular.module("chasingProgress")
    .controller("researchTopicCtrl", function($scope, $state, researchTopicSvc, alertify, $location, $anchorScroll) {

        $scope.isEditing = false;
        let editedTopic;

        $scope.addResearchTopic = function() {
            researchTopicSvc.addResearchTopic($scope.topicName, $scope.secondaryText, $scope.topicImage, $scope.topicBackgroundImage)
                .then(function(response) {
                    alertify.success("Added " + response.data.topicName)
                    $scope.topicName = "";
                    $scope.secondaryText = "";
                    $scope.topicImage  = "";
                    $scope.topicBackgroundImage = "";
                    $scope.researchTopics.push(response.data);
                })
        }

        researchTopicSvc.getResearchTopics()
            .then(function(response) {
                console.log(response.data);
                $scope.researchTopics = response.data;
            })

        $scope.openResearchTopicPage = function(index) {
            $state.go('researchTopicPage', {
                researchTopicId: index
            });
        }

        $scope.deleteTopic = function(topic, index) {
            alertify.confirm("You are about to delete the " + topic.topicName + " topic and all of its notes. Sure you wanna do this?", function() {
                researchTopicSvc.deleteTopic(topic)
                    .then(function(response) {
                        alertify.success('DELETED')
                        $scope.researchTopics.splice(index, 1);
                    })
            }, function() {
                alertify.error('Cancel')
            });
        }

        $scope.toggleUpdateTopic = function(topic) {
            $scope.topicName = topic.topicName;
            $scope.secondaryText = topic.secondaryText;
            $scope.topicImage  = topic.topicImage;
            $scope.topicBackgroundImage = topic.topicBackgroundImage;
            $scope.isEditing = true;
            editedTopic = topic;
            $location.hash('topicInputFields')
            $anchorScroll();
        }

        $scope.updateTopic = function() {
            researchTopicSvc.updateResearchTopic(editedTopic, $scope.topicName, $scope.secondaryText, $scope.topicImage, $scope.topicBackgroundImage)
                .then(function(response) {
                    alertify.success("Updated " + response.data.topicName)
                    $scope.topicName = "";
                    $scope.secondaryText = "";
                    $scope.topicImage  = "";
                    $scope.topicBackgroundImage = "";
                    $scope.researchTopics.push(response.data);
                })
                $scope.isEditing = false;
        }

        $scope.cancelEdit = function() {
            $scope.isEditing = false;
            $scope.topicName = "";
            $scope.secondaryText = "";
            $scope.topicImage  = "";
            $scope.topicBackgroundImage = "";
        }

    });
