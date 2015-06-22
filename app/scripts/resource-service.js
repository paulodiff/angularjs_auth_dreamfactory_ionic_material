'use strict';
angular.module('angularjsAuthTutorialApp').factory('ResourceService', function($resource) {
    return $resource('/games/:gameid', {gameid: '@gameid'});
});