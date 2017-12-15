angular.module("chasingProgress")
    .service("homeSvc", function($http) {

        this.getQuotes = function() {
            return $http({
              method: 'GET',
              url: '/api/quotes'
            }).then(function(response) {
                return response;
            });
        };

        this.getEmbeddedVideos = function() {
            return $http({
              method: 'GET',
              url: '/api/embeddedVideos'
            }).then(function(response) {
                return response;
            });
        };



});
