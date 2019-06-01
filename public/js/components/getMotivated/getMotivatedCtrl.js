/*jshint esversion: 6 */


angular.module('chasingProgress')
    .controller('getMotivatedCtrl', function($scope, $sce, getMotivatedSvc, $state, alertify, $location, $anchorScroll) {


        $scope.quotePanel = false;
        $scope.isEditingVideo = false;
        $scope.isManagingHomePage = true;
        $scope.manageImages = true;
        // $scope.manageQuotes = true;
        $scope.manageVideos = true;
        $scope.manageContacts = true;
        let editedQuote;

        $scope.managePage = () => {
            $scope.isManagingHomePage = !$scope.isManagingHomePage;
            $location.hash('chasing-progress')
            $anchorScroll();
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
        getMotivatedSvc.getQuotes()
            .then(function(response) {

                $scope.dailyQuote = response.quotesList[d];
                $scope.quotesList = response.quotesList;
            })

        //write this so it only grabs 1 video instead of all
        getMotivatedSvc.getEmbeddedVideos()
            .then(function(response) {
                console.log("videos", response)
                $scope.video = $sce.trustAsHtml(response.videosList[25].video);
                $scope.videosList = response.videosList
            })

        getMotivatedSvc.getImages()
            .then(function(response) {
                $scope.imagesList = response;
                $scope.dailyImage = response[d]
            })

        getMotivatedSvc.getContacts()
            .then(function(response) {
                $scope.contactsList = response.data;
            })



        // ********************** Quote **********************
        // *****************************************************


        $scope.deleteQuote = (index) => {
            console.log($scope.quotesList[index])
            alertify.confirm("Are you sure?", () => {
                getMotivatedSvc.deleteQuote($scope.quotesList[index])
                    .then((response) => {
                        alertify.success('deleted')
                        $scope.quotesList.splice(index, 1);
                    })
            })

        }

        $scope.editQuote = (index) => {
            $scope.newQuote = $scope.quotesList[index].quote;
            $scope.newQuoteAuthor = $scope.quotesList[index].author;
            editedQuote = $scope.quotesList[index];
            $scope.quotePanel = true;
            $location.hash('manage-page-top')
            $anchorScroll();
        }

        $scope.updateQuote = (quote, author) => {
            getMotivatedSvc.updateQuote(quote, author, editedQuote)
                .then((response) => {
                    alertify.success('ADDED')
                    $scope.quotePanel = false;
                    $scope.newQuote = "";
                    $scope.newQuoteAuthor = "";
                })
        }

        $scope.addNewQuote = (quote, author) => {
            getMotivatedSvc.addNewQuote(quote, author)
                .then((response) => {
                    alertify.success("ADDED")
                    $scope.newQuote = "";
                    $scope.newQuoteAuthor = "";
                    console.log(response)
                    $scope.quotesList.push(response)
                })
        }

        $scope.cancelQuoteEdit = () => {
            $scope.newQuote = "";
            $scope.newQuoteAuthor = "";
            $scope.quotePanel = false;
            editedQuote = {};
        }

        // ********************** Video **********************
        // *****************************************************

        const createVideoThumbnails = function(videoObj) {
            var x = videoObj.video.indexOf("embed/");
            let embedID = videoObj.video.slice(x + 6, x + 17);
            videoObj.thumbnail = "https://img.youtube.com/vi/" + embedID + "/0.jpg";
            videoObj.link = "https://www.youtube.com/embed/" + embedID;
            return videoObj;
        }

        let editedVideo;

        $scope.addNewVideo = (video, videoTitle) => {
            getMotivatedSvc.addNewVideo(video, videoTitle)
                .then((response) => {
                    alertify.success("ADDED")
                    $scope.newVideo = "";
                    $scope.newVideoTitle = "";
                    response = createVideoThumbnails(response);
                    $scope.videosList.push(response);
                })
        }

        $scope.deleteVideo = (index) => {
            alertify.confirm("Are you sure?", () => {
                getMotivatedSvc.deleteVideo($scope.videosList[index])
                    .then((response) => {
                        alertify.success('deleted')
                        $scope.videosList.splice(index, 1);
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
            getMotivatedSvc.updateVideo(video, title, editedVideo)
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
            getMotivatedSvc.addNewImage(video)
                .then((response) => {
                    console.log(response);
                    alertify.success('ADDED')
                    $scope.newImage = "";
                    $scope.imagesList.push(response)
                })
        }

        $scope.deleteImage = (image, index) => {
            alertify.confirm('Are you sure you want to delete this?', () => {
                getMotivatedSvc.deleteImage(image)
                    .then((response) => {
                        alertify.success('deleted')
                        $scope.imagesList.splice(index, 1);
                        image
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
            getMotivatedSvc.updateImage(video, title, editedImage)
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
            getMotivatedSvc.addNewContact(name, picture)
                .then((response) => {
                    alertify.success('ADDED ' + response.data.name);
                    $scope.contactsList.push(response.data);
                    $scope.newContact = "";
                    $scope.newContactImage = "";
                })
        }

        $scope.deleteContact = (person, index) => {
            alertify.confirm("Are you sure?", () => {
                getMotivatedSvc.deleteContact(person)
                    .then((response) =>{
                        alertify.success('DELETED')
                        $scope.contactsList.splice(index, 1)
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
            getMotivatedSvc.updateContact(name, image, editedContact)
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



    const birthDate = new Date(1989, 8, 22).getTime() / 1000; 
    const expectedDeathDate = new Date(2069, 8, 22).getTime() / 1000;
    const daysLived = new Date().getTime() / 1000;
    const epoch = new Date('Jan 1, 70 00:00:00.000 GMT').getTime() / 1000

    // console.log(expectedDeathDate - daysLived);
    // console.log(expectedDeathDate - (daysLived - birthDate));

    //get my birth date and convert it to days assign it to "birthDate"
    // add 29200 days to birthdate and assign it to "expectedDeathDate"
    //  call new Date() and assign to "daysLived"
    // 18250 days or 50 years.  subtract a day each 
    
