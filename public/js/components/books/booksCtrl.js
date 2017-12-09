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
                // console.log(response.data);
                $scope.books = response.data;
            });

        $scope.openBookPage = function(index) {
            $state.go('bookPage', {bookId: index})
        }

        var $ctrl = this;


        $ctrl.open = function(size, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                appendTo: parentElem,
                resolve: {
                    items: function() {
                        return $ctrl.items;
                    }
                }
            });
            modalInstance.result
                .then(function(selectedItem) {
                    $ctrl.selected = selectedItem;
                }, function() {
                    $log.info('Modal dismissed at: ' + new Date());
                });
        };

        $ctrl.openComponentModal = function() {
            var modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                component: 'modalComponent',
                resolve: {
                    items: function() {
                        return $ctrl.items;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $ctrl.selected = selectedItem;
            }, function() {
                $log.info('modal-component dismissed at: ' + new Date());
            });
        };



    });
