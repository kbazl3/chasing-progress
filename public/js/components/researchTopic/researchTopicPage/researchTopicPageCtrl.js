angular.module("chasingProgress")
    .controller("researchTopicPageCtrl", function($scope, $stateParams, researchTopicResolve, researchTopicSvc, toastr) {

        $scope.researchTopic = researchTopicResolve.data[$stateParams.researchTopicId];

        $scope.addResearchTopicNotes = function(researchTopic, researchTopicNotes) {
            researchTopicSvc.newNotes(researchTopic, researchTopicNotes)
                .then(function(response) {
                    toastr.success("Added note ");
                })
        }

        $scope.deleteNote = function(note, index) {
            console.log(note);
            console.log(researchTopicResolve.data[$stateParams.researchTopicId], index);
            researchTopicSvc.deleteNote(researchTopicResolve.data[$stateParams.researchTopicId], index)
                .then(function(response) {
                    console.log(response)
                    toastr.success("deleted note");
                })
        }

        $scope.editNote = function(note) {
            //click edit
            //note html goes into wysiwig.
                //goes into modal?
                //goes into wysiwig below?
                    //if so, toggle "add book notes" and "edit note" button
            console.log(note.note);
        }



});
