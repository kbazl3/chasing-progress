angular.module("chasingProgress")
    .service("homeSvc", function($http) {

        let d = new Date().getDate();

        const createVideoThumbnails = function(ary) {
            ary.forEach(function(videoObj) {
                var x = videoObj.video.indexOf("embed/");
                let embedID = videoObj.video.slice(x + 6, x + 17)
                videoObj.thumbnail = "https://img.youtube.com/vi/" + embedID + "/0.jpg"
            })
        }

        this.getQuotes = function() {
            return $http({
                method: 'GET',
                url: '/api/quotes'
            }).then(function(response) {
                return {
                    quotesList: response.data,
                    date: d
                }
            });
        };

        this.addNewQuote = function(quote, author) {
            return $http({
                method: 'POST',
                url: '/api/quotes',
                data: {
                    quote: quote,
                    author: author
                }
            }).then(function(response) {
                return response.data
            });
        }

        this.deleteQuote = function(quote) {
            return $http({
                method: 'DELETE',
                url: '/api/quotes/' + quote._id
            }).then(function(response) {
                return response
            })
        }

        this.updateQuote = function(updatedQuote, author, quoteObj) {
            return $http({
                method: "PUT",
                url: "/api/quotes/" + quoteObj._id,
                data: {
                    quote: updatedQuote,
                    author: author
                }
            }).then(function(response) {
                return response;
            })
        }

        this.addQuoteNote = function(quote, notes) {
            quote.notes.push({
                note: notes,
                dateCreated: new Date()
            })
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
                createVideoThumbnails(response.data)
                return {
                    videosList: response.data,
                    date: d
                }
            });
        };

        this.addNewVideo = function(video) {
            return $http({
                method: 'POST',
                url: '/api/embeddedVideos',
                data: {
                    video: video
                }
            }).then(function(response) {
                return response.data
            });
        }

        this.addVideoNote = function(video, notes) {
            video.notes.push({
                note: notes,
                dateCreated: new Date()
            })
            return $http({
                method: 'PUT',
                url: '/api/embeddedVideos/' + video._id,
                data: video
            }).then(function(response) {
                return response
            })
        }

        this.updateVideo = function(video, title, videoObj) {
            return $http({
                method: "PUT",
                url: "/api/embeddedVideos/" + videoObj._id,
                data: {
                    video: video,
                    videoTitle: title
                }
            }).then(function(response) {
                return response;
            })
        }

        this.deleteVideo = function(video) {
            return $http({
                method: 'DELETE',
                url: '/api/embeddedVideos/' + video._id
            }).then(function(response) {
                return response
            })
        }

        this.getImages = function() {
            return $http({
                method: 'GET',
                url: '/api/images'
            }).then(function(response) {
                return response.data;
            });
        };

        this.addNewImage = function(image) {
            return $http({
                method: 'POST',
                url: '/api/images',
                data: {
                    image: image
                }
            }).then(function(response) {
                return response.data
            });
        }

        this.addImageNote = function(image, notes) {
            image.notes.push({
                note: notes,
                dateCreated: new Date()
            })
            return $http({
                method: 'PUT',
                url: '/api/images/' + image._id,
                data: image
            }).then(function(response) {
                return response
            })
        }

        this.updateImage = function(image, imageObj) {
            return $http({
                method: "PUT",
                url: "/api/images/" + imageObj._id,
                data: {
                    image: image
                }
            }).then(function(response) {
                return response;
            })
        }

        this.deleteImage = function(image) {
            return $http({
                method: 'DELETE',
                url: '/api/images/' + image._id
            }).then(function(response) {
                return response
            })
        }









        let _cachedPromise;
        if (_cachedPromise) {
            console.log(cached);
            return _cachedPromise
        } else {

        }



    });
