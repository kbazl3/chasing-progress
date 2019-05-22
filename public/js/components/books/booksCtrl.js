angular.module("chasingProgress")
    .controller("booksCtrl", function($scope, bookSvc, $uibModal, $log, $document, $state, alertify) {





        $scope.newBook = function() {
            let bookObj = {
                title: $scope.bookTitle,
                coverImage: $scope.coverImage
            }
            bookSvc.newBook(bookObj)
                .then(function(response) {
                    alertify.success("Added " + response.data.title);
                    $scope.bookTitle = "";
                    $scope.coverImage = "";
                    $scope.books.push(response.data);
                })
        }

        bookSvc.getBooks()
            .then(function(response) {
                $scope.books = response.data;
            });

        $scope.openBookPage = function(index) {
            $state.go('bookPage', {bookId: index})
        }

        $scope.deleteBook = function(book, index) {
            alertify.confirm("You are about to delete " + book.title + " and all of the notes you have with it. Sure you wanna do this?", function() {
                bookSvc.deleteBook(book)
                    .then(function(response) {
                        alertify.success("Deleted " + book.title);
                        $scope.books.splice(index, 1);
                    });
            }, function() {
                alertify.error('Cancel')
            });

        }


    });
