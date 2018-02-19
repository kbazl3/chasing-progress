angular.module("chasingProgress")
    .controller("bookDetailsCtrl", function($scope, $stateParams, booksResolve, bookSvc, toastr) {
        console.log(booksResolve.data[$stateParams.bookId]);

        $scope.chosenBook = booksResolve.data[$stateParams.bookId];

        $scope.addBookNotes = function(book, bookNotes) {
            bookSvc.newNotes(book, bookNotes)
                .then(function(response) {
                    console.log(response);
                    toastr.success("Added new note");
                })
        }


});
