angular.module("chasingProgress")
    .controller("bookDetailsCtrl", function($scope, $stateParams, booksResolve, bookSvc, toastr, $location, $anchorScroll) {
        console.log(booksResolve.data[$stateParams.bookId]);

        $scope.chosenBook = booksResolve.data[$stateParams.bookId];

        let bookNoteIndex;
        $scope.isEditingNote = false;

        $scope.addBookNotes = function(book, bookNotes) {
            bookSvc.newNotes(book, bookNotes)
                .then(function(response) {
                    toastr.success("Added new note");
                    $scope.htmlVariable = "";
                })
        }

        $scope.deleteBookNote = function(index, book) {
            bookSvc.deleteBookNote(index, book)
            .then(function(response) {
            })
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
