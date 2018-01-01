angular.module("chasingProgress")
    .controller("researchTopicPageCtrl", function($scope, $stateParams, researchTopicResolve, researchTopicSvc) {

        $scope.researchTopic = researchTopicResolve.data[$stateParams.researchTopicId];

        $scope.addResearchTopicNotes = function(researchTopic, researchTopicNotes) {
            console.log($scope.htmlVariable);
            researchTopicSvc.newNotes(researchTopic, researchTopicNotes)
                .then(function(response) {
                    console.log(response);
                })
        }



});
