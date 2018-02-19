angular.module("chasingProgress")
    .controller("researchTopicCtrl", function($scope, $state, researchTopicSvc, toastr) {




        $scope.addResearchTopic = function() {
            researchTopicSvc.addResearchTopic($scope.topicName, $scope.topicImage, $scope.topicImageBackground)
                .then(function(response) {
                    $scope. researchTopics = response.data;
                    console.log(response.data);
                    toastr.success("Added " + response.data.topicName);
                })
        }

        researchTopicSvc.getResearchTopics()
            .then(function(response) {
                $scope.researchTopics = response.data;
                console.log(response.data);
            })

        $scope.openResearchTopicPage = function(index) {
            $state.go('researchTopicPage', {researchTopicId: index});
        }

        $scope.deleteTopic = function(topic) {
            researchTopicSvc.deleteTopic(topic)
                .then(function(response) {
                    console.log('successfully deleted' + topic.topicName);
                    toastr.success("Deleted " + response.data.topicName);
                })
        }

});
