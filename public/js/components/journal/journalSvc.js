angular.module("chasingProgress")
    .service("bookSvc", function($http) {

        this.newBook = function(bookObj) {
          return $http({
            method: 'POST',
            url: '/api/bookNotes',
            data: bookObj
          }).then(function(response) {
              return response;
          });
        };

        this.getBooks = function() {
            return $http({
              method: 'GET',
              url: '/api/bookNotes'
            }).then(function(response) {
                return response;
            });
        };

        this.newNotes = function(book, bookNotes) {
            let notesObj = {
                notes: bookNotes,
                dateCreated: new Date()
            }
            book.notes.push(notesObj);
            // book.notes = [];
            console.log(book);
            return $http({
                method: 'put',
                url: '/api/bookNotes/' + book._id,
                data: book
            })
        }

});
