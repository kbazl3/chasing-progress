angular.module("chasingProgress")
    .service("homeSvc", function($http) {

        let d = new Date().getDate();

        this.getQuotes = function() {
            return $http({
              method: 'GET',
              url: '/api/quotes'
            }).then(function(response) {
                return response.data[d];
            });
        };

        this.addQuoteNote = function(quote, notes) {
            quote.notes.push({
                note: notes,
                dateCreated: new Date()
            })
            // quote.notes = [];
            console.log(quote);
            return $http({
                method: 'PUT',
                url: '/api/quotes/' + quote._id,
                data: quote
            }).then(function(response) {
                return response
            })
        }

        this.getEmbeddedVideos = function() {
            return $http({
              method: 'GET',
              url: '/api/embeddedVideos'
            }).then(function(response) {
                return response.data[d]
            });
        };

        this.addVideoNote = function(video, notes) {
            video.notes.push({
                note: notes,
                dateCreated: new Date()
            })
            console.log(video);
            return $http({
                method: 'PUT',
                url: '/api/embeddedVideos/' + video._id,
                data: video
            }).then(function(response) {
                return response
            })
        }



});
