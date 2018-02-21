angular.module("chasingProgress")
    .controller("bookDetailsCtrl", function($scope, $stateParams, booksResolve, bookSvc, toastr) {
        console.log(booksResolve.data[$stateParams.bookId]);

        $scope.chosenBook = booksResolve.data[$stateParams.bookId];

        let bookNoteIndex;

        $scope.addBookNotes = function(book, bookNotes) {
            bookSvc.newNotes(book, bookNotes)
                .then(function(response) {
                    console.log(response);
                    toastr.success("Added new note");
                })
        }

        $scope.deleteBookNote = function(index, book) {
            bookSvc.deleteBookNote(index, book)
            // .then(function(response) {
            //     console.log(resonse);
            // })
        }

        $scope.editBookNote = function(index, book) {
            $scope.htmlVariable = book.notes[index].notes;
            bookNoteIndex = index;
        }

        $scope.updateBookNotes = function(book) {
            // console.log($scope.htmlVariable, bookNoteIndex, book)
                book.notes[bookNoteIndex].notes = $scope.htmlVariable;
                console.log(book);

            bookSvc.updateBookNote(book)
                .then(function(response) {
                    console.log(response);
                })
        }




    });
