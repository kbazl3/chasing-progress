angular.module("chasingProgress")
    .controller("booksCtrl", function($scope, bookSvc, $uibModal, $log, $document, $state, toastr) {





        $scope.newBook = function() {
            let bookObj = {
                title: $scope.bookTitle,
                coverImage: $scope.coverImage
            }
            bookSvc.newBook(bookObj)
                .then(function(response) {
                    console.log(response);
                    toastr.success("Added " + response.data.book);
                })
        }

        bookSvc.getBooks()
            .then(function(response) {
                $scope.books = response.data;
            });

        $scope.openBookPage = function(index) {
            $state.go('bookPage', {bookId: index})
        }

        $scope.deleteBook = function(book) {
            bookSvc.deleteBook(book)
                .then(function(response) {
                    console.log(response);
                })
        }


    });
