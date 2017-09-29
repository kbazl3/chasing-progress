/*jshint esversion: 6 */

angular.module('chasingProgress')
    .service('todoSvc', function($http) {
        const baseUrl = "http://localhost:8090";

        this.getTasks = function() {
            return $http({
              method: 'GET',
              url: baseUrl + "/api/todoList"
            }).then(function(response) {
                return response;
            });
        };

        this.addTask = function(task) {
          return $http({
            method: 'POST',
            url: baseUrl + "/api/todoList",
            data: {
                task: task
            }
          }).then(function(response) {
              return response;
          });
        };


        this.deleteTask = function(taskId) {
            return $http({
                    method: "DELETE",
                    url: baseUrl + "/api/todoList?taskId=" + taskId
                })
                .then(function(response) {
                });
        };


    });
