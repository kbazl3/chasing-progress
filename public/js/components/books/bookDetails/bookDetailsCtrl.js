angular.module("chasingProgress")
    .controller("bookDetailsCtrl", function($scope, $stateParams, booksResolve, bookSvc, alertify, $location, $anchorScroll) {
        console.log(booksResolve.data[$stateParams.bookId]);

        $scope.chosenBook = booksResolve.data[$stateParams.bookId];

        let bookNoteIndex;
        $scope.isEditingNote = false;

        $scope.addBookNotes = function(book, bookNotes) {
            bookSvc.newNotes(book, bookNotes)
                .then(function(response) {
                    alertify.success("Added new note");
                    $scope.htmlVariable = "";
                })
        }

        $scope.deleteBookNote = function(index, book) {

            alertify.confirm("You are about to delete a note from " + book.title + ". Sure you wanna do this?", function() {
                bookSvc.deleteBookNote(index, book)
                    .then(function(response) {
                        alertify.success("Deleted");
                    });
            }, function() {
                alertify.error('Cancel')
            });
        }

        $scope.editBookNote = function(index, book) {
            $scope.isEditingNote = true
            $scope.htmlVariable = book.notes[index].notes;
            bookNoteIndex = index;
            $location.hash('wysiwig')
            $anchorScroll();
        }

        $scope.updateBookNotes = function(book) {
            $scope.isEditingNote = false;
                book.notes[bookNoteIndex].notes = $scope.htmlVariable;

            bookSvc.updateBookNote(book)
                .then(function(response) {
                    $scope.htmlVariable = "";
                })
        }

        $scope.cancelNoteEdit = function() {
            $scope.isEditingNote = false;
        }




    });
