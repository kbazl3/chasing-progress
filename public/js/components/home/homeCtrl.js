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

        $scope.managePage = () => {
            $scope.isManagingHomePage = !$scope.isManagingHomePage;
        }

        $scope.toggleManagePage = (string) => {
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


        $scope.deleteQuote = (index) => {
            alertify.confirm("Are you sure?", () => {
                homeSvc.deleteQuote($scope.quotesList[index])
                    .then((response) => {
                        alertify.success('deleted')
                    })
            })

        }

        $scope.editQuote = (index) => {
            $scope.newQuote = $scope.quotesList[index].quote;
            $scope.newQuoteAuthor = $scope.quotesList[index].author;
            editedQuote = $scope.quotesList[index];
            $scope.isEditingQuote = true;
            $location.hash('manage-page-top')
            $anchorScroll();
        }

        $scope.updateQuote = (quote, author) => {
            homeSvc.updateQuote(quote, author, editedQuote)
                .then((response) => {
                    alertify.success('Updated')
                    $scope.isEditingQuote = false;
                    $scope.newQuote = "";
                    $scope.newQuoteAuthor = "";
                })
        }

        $scope.addNewQuote = (quote, author) => {
            homeSvc.addNewQuote(quote, author)
                .then((response) => {
                    alertify.success(response)
                    $scope.newQuote = "";
                    $scope.newQuoteAuthor = "";
                })
        }

        $scope.cancelQuoteEdit = () => {
            $scope.newQuote = "";
            $scope.newQuoteAuthor = "";
            $scope.isEditingQuote = false;
            editedQuote = {};
        }

        // ********************** Video **********************
        // *****************************************************

        let editedVideo;

        $scope.addNewVideo = (video, videoTitle) => {
            homeSvc.addNewVideo(video, videoTitle)
                .then((response) => {
                    alertify.success(response)
                    $scope.newVideo = "";
                })
        }

        $scope.deleteVideo = (index) => {
            alertify.confirm("Are you sure?", () => {
                homeSvc.deleteVideo($scope.videosList[index])
                    .then((response) => {
                        alertify.success('deleted')
                    })
            })

        }

        $scope.editVideo = (index) => {
            $scope.newVideo = $scope.videosList[index].video;
            $scope.newVideoTitle = $scope.videosList[index].videoTitle;
            editedVideo = $scope.videosList[index];
            $scope.isEditingVideo = true;
            $location.hash('manage-page-top')
            $anchorScroll();
        }

        $scope.updateVideo = (video, title) => {
            homeSvc.updateVideo(video, title, editedVideo)
                .then((response) => {
                    alertify.success('Updated')
                    $scope.isEditingVideo = false;
                    $scope.newVideo = "";
                    $scope.newVideoTitle = "";
                })
        }

        $scope.cancelVideoUpdate = () => {
            $scope.isEditingVideo = false;
            $scope.newVideo = "";
            $scope.newVideoTitle = "";
            editedVideo = {};
        }

        // ********************** Image **********************
        // *****************************************************

        $scope.addNewImage = (video) => {
            homeSvc.addNewImage(video)
                .then((response) => {
                    alertify.success(response)
                    $scope.newImage = "";
                })
        }

        $scope.deleteImage = (image) => {
            alertify.confirm('Are you sure you want to delete this?', () => {
                homeSvc.deleteImage(image)
                    .then((response) => {
                        alertify.success('deleted')
                    })
            })

        }

        $scope.editImage = (index) => {
            $scope.newImage = $scope.videosList[index].video;
            $scope.newImageTitle = $scope.videosList[index].videoTitle;
            editedImage = $scope.videosList[index];
            $scope.isEditingImage = true;
            $location.hash('manage-page-top')
            $anchorScroll();
        }

        $scope.updateImage = (video, title) => {
            homeSvc.updateImage(video, title, editedImage)
                .then((response) => {
                    alertify.success('Updated')
                    $scope.isEditingImage = false;
                    $scope.newImage = "";
                })
        }

        $scope.cancelImageEdit = () => {
            $scope.newImage = "";
            $scope.isEditingImage = false;
            editedImage = {};
        }


        // ********************** CONTACT **********************
        // *****************************************************

        let editedContact;
        $scope.addNewContact = (name, picture) => {
            homeSvc.addNewContact(name, picture)
                .then((response) => {
                    console.log(response);
                })
        }

        $scope.deleteContact = (person) => {
            alertify.confirm("Are you sure?", () => {
                homeSvc.deleteContact(person)
                    .then((response) =>{
                        alertify.success('deleted')
                    })
            })

        }

        $scope.editContact = (index) => {
            editedContact = $scope.contactsList[index];
            $scope.newContact = editedContact.name;
            $scope.newContactImage = editedContact.contactImage;
            $scope.isEditingContact = true;
            $location.hash('manage-page-top')
            $anchorScroll();
        }

        $scope.updateContact = (name, image) => {
            homeSvc.updateContact(name, image, editedContact)
                .then((response) => {
                    alertify.success('UPDATED')
                    $scope.newContact = "";
                    $scope.newContactImage = "";
                    $scope.isEditingContact = false;
                })
        }

        $scope.cancelContactEdit = () => {
            $scope.newContact = "";
            $scope.newContactImage = "";
            $scope.isEditingContact = false;
            editedContact = {};
        }



    });
