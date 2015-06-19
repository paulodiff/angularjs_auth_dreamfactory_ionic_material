// We will be using backend-less development
// $http uses $httpBackend to make its calls to the server
// $resource uses $http, so it uses $httpBackend too
// We will mock $httpBackend, capturing routes and returning data
// http://www.jeremyzerr.com/angularjs-backend-less-development-using-httpbackend-mock


// Set $httpBackend.whenGET for mock or .passThrough() for serve
angular.module('angularjsAuthTutorialApp').run(function($httpBackend, DataMockModule) {
    
    $httpBackend.whenGET('/games').respond(function(method, url, data) {
        var games = DataMockModule.findAll();
        return [200, games, {}];
    });
    
    $httpBackend.whenGET(/\/games\/\d+/).respond(function(method, url, data) {
        // parse the matching URL to pull out the id (/games/:id)
        var gameid = url.split('/')[2];
        
        var game = DataMockModule.findOne(gameid);

        return [200, game, {}];
    });

    // this is the creation of a new resource
    $httpBackend.whenPOST('/games').respond(function(method, url, data) {
        var params = angular.fromJson(data);

        var game = DataMockModule.addOne(params);
        
        // get the id of the new resource to populate the Location field
        var gameid = game.gameid;
        
        return [201, game, { Location: '/games/' + gameid }];
    });

    // this is the update of an existing resource (ngResource does not send PUT for update)
    $httpBackend.whenPOST(/\/games\/\d+/).respond(function(method, url, data) {
        var params = angular.fromJson(data);

        // parse the matching URL to pull out the id (/games/:id)
        var gameid = url.split('/')[2];
        
        var game = DataMockModule.updateOne(gameid, params);
        
        return [201, game, { Location: '/games/' + gameid }];
    });
    
    // this is the update of an existing resource (ngResource does not send PUT for update)
    $httpBackend.whenDELETE(/\/games\/\d+/).respond(function(method, url, data) {
        // parse the matching URL to pull out the id (/games/:id)
        var gameid = url.split('/')[2];
        
        DataMockModule.deleteOne(gameid);
        
        return [204, {}, {}];
    });    
    

    $httpBackend.whenGET(/views\//).passThrough();
    $httpBackend.whenPOST('https://dsp-paulo-difficiliora.cloud.dreamfactory.com/rest/user/session').passThrough();
    $httpBackend.whenDELETE('https://dsp-paulo-difficiliora.cloud.dreamfactory.com/rest/user/session').passThrough();
    $httpBackend.whenGET('https://dsp-paulo-difficiliora.cloud.dreamfactory.com:443/rest/db/log')
    .respond(function(method, url, data) {
        var games = {};
        games.record = DataMockModule.findAll();
        return [200, games, {}];
    });

});