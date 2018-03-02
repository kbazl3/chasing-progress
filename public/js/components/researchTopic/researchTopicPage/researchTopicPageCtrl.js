angular.module("chasingProgress")
    .controller("researchTopicPageCtrl", function($scope, $stateParams, researchTopicResolve, researchTopicSvc, toastr, $location, $anchorScroll) {

        $scope.isEditingNote = false;
        let researchTopicIndex;

        $scope.researchTopic = researchTopicResolve.data[$stateParams.researchTopicId];

        $scope.addResearchTopicNotes = function(researchTopic, researchTopicNotes) {
            researchTopicSvc.newNotes(researchTopic, researchTopicNotes)
                .then(function(response) {
                    toastr.success("Added note ");
                    $scope.htmlVariable = "";
                })
        }

        $scope.deleteNote = function(note, index) {
            researchTopicSvc.deleteNote(researchTopicResolve.data[$stateParams.researchTopicId], index)
                .then(function(response) {
                    console.log(response)
                    toastr.success("deleted note");
                })
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
                    toastr.success("updated");
                    $scope.htmlVariable = "";
                })
        }

        



});
