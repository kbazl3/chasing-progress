/*jshint esversion: 6 */


angular.module('chasingProgress')
    .controller('homeCtrl', function($scope, $sce, homeSvc) {

        let d = new Date().getDate();

        homeSvc.getQuotes()
            .then(function(response) {
                $scope.dailyQuote = response.data[d];
            })

        homeSvc.getEmbeddedVideos()
            .then(function(response) {
                console.log(response.data);
                $scope.video = $sce.trustAsHtml(response.data[d].video);
            })


    });
