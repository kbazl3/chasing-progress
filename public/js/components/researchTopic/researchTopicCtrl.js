angular.module("chasingProgress")
    .controller("researchTopicCtrl", function($scope, $state, researchTopicSvc) {




        $scope.addResearchTopic = function() {
            researchTopicSvc.addResearchTopic($scope.topicName, $scope.topicImage, $scope.topicImageBackground)
                .then(function(response) {
                    $scope. researchTopics = response.data;
                    console.log(response.data);
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

});
