angular.module("chasingProgress")
    .controller("researchTopicPageCtrl", function($scope, $stateParams, researchTopicResolve, researchTopicSvc) {

        $scope.researchTopic = researchTopicResolve.data[$stateParams.researchTopicId];

        $scope.addResearchTopicNotes = function(researchTopic, researchTopicNotes) {
            researchTopicSvc.newNotes(researchTopic, researchTopicNotes)
                .then(function(response) {
                })
        }

        $scope.deleteNote = function(note, index) {
            console.log(researchTopicResolve.data[$stateParams.researchTopicId].notes[index], index);
        }

        $scope.editNote = function(note) {
            console.log(note.note);
        }



});
