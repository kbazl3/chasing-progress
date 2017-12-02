angular.module("chasingProgress")
    .controller("journalCtrl", function($scope, bookService) {

        $scope.newBook = function() {
            let bookObj = {
                title: $scope.bookTitle,
                coverImage: $scope.coverImage
            }
            bookService.newBook(bookObj)
                .then(function(response) {
                    console.log(response);
                })
        }

        bookService.getBooks()
            .then(function(response) {
                console.log(response.data);
                $scope.books = response.data;
            });

        $scope.addBookNotes = function(book, bookNotes) {
            bookService.newNotes(book, bookNotes)
                .then(function(response) {
                    console.log(response);
                })
        }

    });
