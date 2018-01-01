angular.module('chasingProgress')
    .controller('ModalDemoCtrl', function($uibModal, $log, $document) {
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


        $ctrl.open2 = function(size, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'myModalContent2.html',
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

    });

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('chasingProgress')
    .controller('ModalInstanceCtrl', function($uibModalInstance, items, $scope, homeSvc, $sce) {
        var $ctrl = this;

        homeSvc.getQuotes()
            .then(function(response) {
                $scope.dailyQuote = response;
            })

        homeSvc.getEmbeddedVideos()
            .then(function(response) {
                $scope.embeddedVideo = response;
                $scope.video = $sce.trustAsHtml(response.video);
            })

        $scope.addQuoteNotes = function(dailyQuote, htmlVariable) {
            homeSvc.addQuoteNote(dailyQuote, htmlVariable)
                .then(function(response) {
                })
        }

        $scope.addVideoNotes = function(embeddedVideo, videoNotesInput) {
            homeSvc.addVideoNote(embeddedVideo, videoNotesInput)
                .then(function(response) {

                })
        }







        $ctrl.ok = function() {
            $uibModalInstance.close($ctrl.selected.item);
        };

        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    });

// Please note that the close and dismiss bindings are from $uibModalInstance.

angular.module('chasingProgress')
    .component('modalComponent', {
        templateUrl: 'myModalContent.html',
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: function() {
            var $ctrl = this;

            $ctrl.$onInit = function() {
                $ctrl.items = $ctrl.resolve.items;
                $ctrl.selected = {
                    item: $ctrl.items[0]
                };
            };


            $ctrl.cancel = function() {
                $ctrl.dismiss({
                    $value: 'cancel'
                });
            };
        }
    });
