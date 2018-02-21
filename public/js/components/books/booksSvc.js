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
            console.log(book);
            return $http({
                method: 'put',
                url: '/api/bookNotes/' + book._id,
                data: book
            })
        }

        this.deleteBook = function(book) {
            console.log(book);
            return $http({
                    method: "DELETE",
                    url: "/api/bookNotes/" + book._id
                })
                .then(function(response) {
                    return response;
                });
        };

        this.deleteBookNote = function(index, book) {
            console.log(index, book);
            book.notes.splice(index, 1);
            return $http({
                    method: "PUT",
                    url: "/api/bookNotes/" + book._id,
                    data: book
                })
                .then(function(response) {
                    console.log(response);
                    return response;
                });
        }

        this.updateBookNote = function(book) {
            return $http({
                    method: "PUT",
                    url: "/api/bookNotes/" + book._id,
                    data: book
                })
                .then(function(response) {
                    console.log(response);
                    return response;
                });
        }

        // this.getOneBook = function(bookId) {
        //
        // }

});
