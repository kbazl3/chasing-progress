angular.module("chasingProgress")
    .controller("bookDetailsCtrl", function($scope, $stateParams, booksResolve, bookSvc) {
        console.log(booksResolve.data[$stateParams.bookId]);

        $scope.chosenBook = booksResolve.data[$stateParams.bookId];

        $scope.addBookNotes = function(book, bookNotes) {
            bookSvc.newNotes(book, bookNotes)
                .then(function(response) {
                    console.log(response);
                })
        }


        $scope.addBookNotez = function(book, bookNotes) {
            console.log($scope.htmlVariable);
            bookSvc.newNotes(book, bookNotes)
                .then(function(response) {
                    console.log(response);
                })
        }


});
