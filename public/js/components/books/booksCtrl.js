angular.module("chasingProgress")
    .controller("booksCtrl", function($scope, bookSvc, $uibModal, $log, $document, $state) {





        $scope.newBook = function() {
            let bookObj = {
                title: $scope.bookTitle,
                coverImage: $scope.coverImage
            }
            bookSvc.newBook(bookObj)
                .then(function(response) {
                    console.log(response);
                })
        }

        bookSvc.getBooks()
            .then(function(response) {
                $scope.books = response.data;
            });

        $scope.openBookPage = function(index) {
            $state.go('bookPage', {bookId: index})
        }


    });
