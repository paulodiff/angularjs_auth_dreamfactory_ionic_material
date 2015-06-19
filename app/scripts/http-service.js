angular.module('angularjsAuthTutorialApp')
.factory('HttpService', function($http) {
    var service = {
        query: function() {
            return $http.get('/games');
            
        },
        get: function(id) {
            return $http.get('/games/' + id);
        },
        // making save dual-function like default ngResource behavior (no separate update w/PUT)
        save: function(data) {
            if(angular.isDefined(data.gameid)) {
                return $http.post('/games/' + data.gameid, data);
            } else {
                return $http.post('/games', data);
            }
        },
        delete: function(id) {
            return $http.delete('/games/' + id);
        }
    };
    
    return service;    
})