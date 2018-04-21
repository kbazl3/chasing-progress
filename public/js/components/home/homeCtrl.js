/*jshint esversion: 6 */


angular.module('chasingProgress')
    .controller('homeCtrl', function($scope, $sce, homeSvc, $state, alertify) {


        $scope.isEditingQuote = false;
        $scope.isEditingVideo = false;
        $scope.isManagingHomePage = true;
        $scope.manageImages = true;
        $scope.manageQuotes = true;
        $scope.manageVideos = true;
        let editedQuote;


        let d = new Date().getDate();

        //write this so it only grabs 1 quote instead of all
        //documents in collection aren't always guarenteed to be the same index every time
        homeSvc.getQuotes()
            .then(function(response) {
                // console.log(response);
                $scope.dailyQuote = response.quotesList[d];
                $scope.quotesList = response.quotesList;
            })

        //write this so it only grabs 1 video instead of all
        homeSvc.getEmbeddedVideos()
            .then(function(response) {
                // console.log(response.videosList[response.date]);
                $scope.video = $sce.trustAsHtml(response.videosList[response.date].video);
                $scope.videosList = response.videosList
            })

        homeSvc.getImages()
            .then(function(response) {
                console.log(response);
                // $scope.getMotivatedImage = response
                $scope.imagesList = response;
            })

        $scope.addNewQuote = function(quote, author) {
            homeSvc.addNewQuote(quote, author)
                .then(function(response) {
                    alertify.success(response)
                })
        }

        $scope.deleteQuote = function(index) {
            console.log($scope.quotesList[index]);
            homeSvc.deleteQuote($scope.quotesList[index])
                .then(function(response) {
                    alertify.success('deleted')
                })
        }

        $scope.editQuote = function(index) {
            $scope.newQuote = $scope.quotesList[index].quote;
            $scope.newQuoteAuthor = $scope.quotesList[index].author;
            editedQuote = $scope.quotesList[index];
            $scope.isEditingQuote = true;
        }

        $scope.updateQuote = function(quote, author) {
            console.log(editedQuote);
            homeSvc.updateQuote(quote, author, editedQuote)
                .then(function(response) {
                    alertify.success('Updated')
                    $scope.isEditingQuote = false;
                    $scope.newQuote = "";
                    $scope.newQuoteAuthor = "";
                })
        }


        $scope.toggleManagePage = function(string) {
            if (string === "quotes") {
                $scope.manageQuotes = false;
                $scope.manageVideos = true;
                $scope.manageImages = true;
            } else if (string === "videos") {
                $scope.manageQuotes = true;
                $scope.manageVideos = false;
                $scope.manageImages = true;
            } else {
                $scope.manageQuotes = true;
                $scope.manageVideos = true;
                $scope.manageImages = false;
            }
        }


        //get this shizzz outof here
        $scope.toggleNewQuoteForm = function() {
            $scope.isAddingNewQuote = true;
        }

        $scope.addNewQuote = function(quote, author) {
            homeSvc.addNewQuote(quote, author)
                .then(function(response) {
                    alertify.success(response)
                    $scope.newQuote = "";
                    $scope.newQuoteAuthor = "";
                })
        }

        let editedVideo;

        $scope.addNewVideo = function(video) {
            homeSvc.addNewVideo(video)
                .then(function(response) {
                    alertify.success(response)
                    $scope.newVideo = "";
                })
        }

        $scope.deleteVideo = function(index) {
            console.log($scope.videosList[index]);
            homeSvc.deleteVideo($scope.videosList[index])
                .then(function(response) {
                    alertify.success('deleted')
                })
        }

        $scope.editVideo = function(index) {
            $scope.newVideo = $scope.videosList[index].video;
            $scope.newVideoTitle = $scope.videosList[index].videoTitle;
            editedVideo = $scope.videosList[index];
            $scope.isEditingVideo = true;
        }

        $scope.updateVideo = function(video, title) {
            console.log(editedVideo);
            homeSvc.updateVideo(video, title, editedVideo)
                .then(function(response) {
                    alertify.success('Updated')
                    $scope.isEditingVideo = false;
                    $scope.newVideo = "";
                    $scope.newVideoTitle = "";
                })
        }


        $scope.addNewImage = function(video) {
            homeSvc.addNewImage(video)
                .then(function(response) {
                    alertify.success(response)
                    $scope.newImage = "";
                })
        }

        $scope.deleteImage = function(image) {
            homeSvc.deleteImage(image)
                .then(function(response) {
                    alertify.success('deleted')
                })
        }

        $scope.editImage = function(index) {
            $scope.newImage = $scope.videosList[index].video;
            $scope.newImageTitle = $scope.videosList[index].videoTitle;
            editedImage = $scope.videosList[index];
            $scope.isEditingImage = true;
        }

        $scope.updateImage = function(video, title) {
            console.log(editedImage);
            homeSvc.updateImage(video, title, editedImage)
                .then(function(response) {
                    alertify.success('Updated')
                    $scope.isEditingImage = false;
                    $scope.newImage = "";
                })
        }




    });
