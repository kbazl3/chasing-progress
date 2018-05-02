/*jshint esversion: 6 */


angular.module('chasingProgress')
    .controller('homeCtrl', function($scope, $sce, homeSvc, $state, alertify, $location, $anchorScroll) {


        $scope.isEditingQuote = false;
        $scope.isEditingVideo = false;
        $scope.isManagingHomePage = false;
        $scope.manageImages = true;
        // $scope.manageQuotes = true;
        $scope.manageVideos = true;
        $scope.manageContacts = true;
        let editedQuote;

        $scope.managePage = function() {
            $scope.isManagingHomePage = !$scope.isManagingHomePage;
        }

        $scope.toggleManagePage = function(string) {
            if (string === "quotes") {
                $scope.manageQuotes = false;
                $scope.manageVideos = true;
                $scope.manageImages = true;
                $scope.manageContacts = true;
            } else if (string === "videos") {
                $scope.manageQuotes = true;
                $scope.manageVideos = false;
                $scope.manageImages = true;
                $scope.manageContacts = true;
            } else if (string === 'contacts') {
                $scope.manageQuotes = true;
                $scope.manageVideos = true;
                $scope.manageImages = true;
                $scope.manageContacts = false;
            } else {
                $scope.manageQuotes = true;
                $scope.manageVideos = true;
                $scope.manageImages = false;
                $scope.manageContacts = true;
            }
        }

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
                $scope.video = $sce.trustAsHtml(response.videosList[response.date].video);
                $scope.videosList = response.videosList
            })

        homeSvc.getImages()
            .then(function(response) {
                $scope.imagesList = response;
                $scope.dailyImage = response[6]
            })

        homeSvc.getContacts()
            .then(function(response) {
                $scope.contactsList = response.data;
            })



        // ********************** Quote **********************
        // *****************************************************


        $scope.deleteQuote = function(index) {
            alertify.confirm("Are you sure?", function() {
                homeSvc.deleteQuote($scope.quotesList[index])
                    .then(function(response) {
                        alertify.success('deleted')
                    })
            })

        }

        $scope.editQuote = function(index) {
            $scope.newQuote = $scope.quotesList[index].quote;
            $scope.newQuoteAuthor = $scope.quotesList[index].author;
            editedQuote = $scope.quotesList[index];
            $scope.isEditingQuote = true;
            $location.hash('manage-page-top')
            $anchorScroll();
        }

        $scope.updateQuote = function(quote, author) {
            homeSvc.updateQuote(quote, author, editedQuote)
                .then(function(response) {
                    alertify.success('Updated')
                    $scope.isEditingQuote = false;
                    $scope.newQuote = "";
                    $scope.newQuoteAuthor = "";
                })
        }

        $scope.addNewQuote = function(quote, author) {
            homeSvc.addNewQuote(quote, author)
                .then(function(response) {
                    alertify.success(response)
                    $scope.newQuote = "";
                    $scope.newQuoteAuthor = "";
                })
        }

        $scope.cancelQuoteEdit = function() {
            $scope.newQuote = "";
            $scope.newQuoteAuthor = "";
            $scope.isEditingQuote = false;
            editedQuote = {};
        }

        // ********************** Video **********************
        // *****************************************************

        let editedVideo;

        $scope.addNewVideo = function(video) {
            homeSvc.addNewVideo(video)
                .then(function(response) {
                    alertify.success(response)
                    $scope.newVideo = "";
                })
        }

        $scope.deleteVideo = function(index) {
            alertify.confirm("Are you sure?", function() {
                homeSvc.deleteVideo($scope.videosList[index])
                    .then(function(response) {
                        alertify.success('deleted')
                    })
            })

        }

        $scope.editVideo = function(index) {
            $scope.newVideo = $scope.videosList[index].video;
            $scope.newVideoTitle = $scope.videosList[index].videoTitle;
            editedVideo = $scope.videosList[index];
            $scope.isEditingVideo = true;
            $location.hash('manage-page-top')
            $anchorScroll();
        }

        $scope.updateVideo = function(video, title) {
            homeSvc.updateVideo(video, title, editedVideo)
                .then(function(response) {
                    alertify.success('Updated')
                    $scope.isEditingVideo = false;
                    $scope.newVideo = "";
                    $scope.newVideoTitle = "";
                })
        }

        $scope.cancelVideoUpdate = function() {
            $scope.isEditingVideo = false;
            $scope.newVideo = "";
            $scope.newVideoTitle = "";
            editedVideo = {};
        }

        // ********************** Image **********************
        // *****************************************************

        $scope.addNewImage = function(video) {
            homeSvc.addNewImage(video)
                .then(function(response) {
                    alertify.success(response)
                    $scope.newImage = "";
                })
        }

        $scope.deleteImage = function(image) {
            alertify.confirm('Are you sure you want to delete this?', function() {
                homeSvc.deleteImage(image)
                    .then(function(response) {
                        alertify.success('deleted')
                    })
            })

        }

        $scope.editImage = function(index) {
            $scope.newImage = $scope.videosList[index].video;
            $scope.newImageTitle = $scope.videosList[index].videoTitle;
            editedImage = $scope.videosList[index];
            $scope.isEditingImage = true;
            $location.hash('manage-page-top')
            $anchorScroll();
        }

        $scope.updateImage = function(video, title) {
            homeSvc.updateImage(video, title, editedImage)
                .then(function(response) {
                    alertify.success('Updated')
                    $scope.isEditingImage = false;
                    $scope.newImage = "";
                })
        }

        $scope.cancelImageEdit = function() {
            $scope.newImage = "";
            $scope.isEditingImage = false;
            editedImage = {};
        }


        // ********************** CONTACT **********************
        // *****************************************************

        let editedContact;
        $scope.addNewContact = function(name, picture) {
            homeSvc.addNewContact(name, picture)
                .then(function(response) {
                    console.log(response);
                })
        }

        $scope.deleteContact = function(person) {
            alertify.confirm("Are you sure?", function() {
                homeSvc.deleteContact(person)
                    .then(function(response) {
                        alertify.success('deleted')
                    })
            })

        }

        $scope.editContact = function(index) {
            editedContact = $scope.contactsList[index];
            $scope.newContact = editedContact.name;
            $scope.newContactImage = editedContact.contactImage;
            $scope.isEditingContact = true;
            $location.hash('manage-page-top')
            $anchorScroll();
        }

        $scope.updateContact = function(name, image) {
            homeSvc.updateContact(name, image, editedContact)
                .then(function(response) {
                    alertify.success('UPDATED')
                    $scope.newContact = "";
                    $scope.newContactImage = "";
                    $scope.isEditingContact = false;
                })
        }

        $scope.cancelContactEdit = function() {
            $scope.newContact = "";
            $scope.newContactImage = "";
            $scope.isEditingContact = false;
            editedContact = {};
        }



    });
