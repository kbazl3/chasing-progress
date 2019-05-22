angular.module("chasingProgress")
    .controller("researchTopicPageCtrl", function($scope, $stateParams, researchTopicResolve, researchTopicSvc, alertify, $location, $anchorScroll) {

        $scope.isEditingNote = false; //initally set the edit buttons to false so that they don't show up
        let researchTopicIndex; //initiliaze variable to keep track of the research topic

        $scope.researchTopic = researchTopicResolve.data[$stateParams.researchTopicId];

        $scope.addResearchTopicNotes = function(researchTopic, researchTopicNotes) {
            researchTopicSvc.newNotes(researchTopic, researchTopicNotes)
                .then(function(response) {
                    alertify.success("Added note ");
                    $scope.htmlVariable = "";
                })
        }

        $scope.deleteNote = function(index) {

            alertify.confirm("You are about to delete a note. Sure you wanna do this?", function() {
                researchTopicSvc.deleteNote(researchTopicResolve.data[$stateParams.researchTopicId], index)
                    .then(function(response) {
                        alertify.success('DELETED')
                    })
            }, function() {
                alertify.error('Cancel')
            });
        }

        $scope.editNote = function(note, index) {
            $scope.isEditingNote = true;
            $scope.htmlVariable = note.note
            $location.hash('wysiwig')
            $anchorScroll();
            researchTopicIndex = index;
        }

        $scope.cancelNoteEdit = function() {
            $scope.isEditingNote = false;
            $scope.htmlVariable = "";
        }

        $scope.updateTopicNotes = function() {
            researchTopicSvc.updateTopicNotes(researchTopicResolve.data[$stateParams.researchTopicId], researchTopicIndex, $scope.htmlVariable)
                .then(function(response) {
                    alertify.success("updated");
                    $scope.htmlVariable = "";
                    $scope.isEditingNote = false;
                })
        }
});
