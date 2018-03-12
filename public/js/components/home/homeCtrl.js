/*jshint esversion: 6 */


angular.module('chasingProgress')
    .controller('homeCtrl', function($scope, $sce, homeSvc, $state, alertify) {






        let d = new Date().getDate();

        //write this so it only grabs 1 quote instead of all
        //documents in collection aren't always guarenteed to be the same index every time
        homeSvc.getQuotes()
            .then(function(response) {
                $scope.dailyQuote = response;
            })

        //write this so it only grabs 1 video instead of all
        homeSvc.getEmbeddedVideos()
            .then(function(response) {
                $scope.video = $sce.trustAsHtml(response.video);
            })




    });
