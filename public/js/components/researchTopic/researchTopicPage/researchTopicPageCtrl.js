angular.module("chasingProgress")
    .controller("researchTopicPageCtrl", function($scope, $stateParams, researchTopicResolve, researchTopicSvc) {

        $scope.researchTopic = researchTopicResolve.data[$stateParams.researchTopicId];

        $scope.addResearchTopicNotes = function(researchTopic, researchTopicNotes) {
            researchTopicSvc.newNotes(researchTopic, researchTopicNotes)
                .then(function(response) {
                })
        }

        $scope.deleteNote = function(note, index) {
            console.log(researchTopicResolve.data[$stateParams.researchTopicId], index);
            researchTopicSvc.deleteNote(researchTopicResolve.data[$stateParams.researchTopicId], index)
                // .then(function(response) {
                //     console.log(response)
                // })
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
