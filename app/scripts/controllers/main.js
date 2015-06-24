'use strict';

angular.module('angularjsAuthTutorialApp')


// inject 'UserDataService'
.controller('TopLevelAppCtrl', ['$scope', 'UserDataService', function ($scope, UserDataService) {

	// Add $scope variable to store the user
	//$scope.currentUser = '';
    $scope.currentUser = UserDataService.getCurrentUser();
	  $scope.testVar = $scope.currentUser.display_name;

}])

.controller('MainCtrl', ['$scope','$log', 
                function ($scope, $log) {
        
}])

.controller('LoginCtrl', 
          ['$scope', '$location', 'UserEventsService','$http','$log',
	function($scope,    $location,   UserEventsService,  $http,  $log) {

		    $log.log('LoginCtrl start');

        $scope.$on(UserEventsService.login.loginSuccess, function(e, userDataObj) {
    		$log.log('LoginCtrl SUCCESS');
    		$log.log(userDataObj);
        $log.log('Setting session_id : ' + userDataObj.session_id);
        $http.defaults.headers.common['X-DreamFactory-Session-Token'] = userDataObj.session_id;

    		$scope.$parent.currentUser = userDataObj;
            $location.url('/');
        	}
        );
    }])

	.controller('LogoutCtrl', ['$scope', '$location', 'UserEventsService','$http','$log',
                function($scope, $location, UserEventsService,$http,$log) {
		$log.log('LogoutCtrl start');
        $scope.$on(UserEventsService.logout.logoutSuccess, function(e, userDataObj) {
    		console.log('LogoutCtrl SUCCESS');
            console.log(userDataObj);
    		console.log('remove session_id');

            $http.defaults.headers.common['X-DreamFactory-Session-Token'] = '';

    		$scope.$parent.currentUser = userDataObj;
            $location.url('/');
        });
    }])

.controller('UserInfoCtrl', 
    ['$scope','$http','$log',
      function($scope,$http,$log) {

        $scope.userData = $scope.$parent.currentUser;



$http.get('https://dsp-paulo-difficiliora.cloud.dreamfactory.com:443/rest/db/log').
  success(function(data, status, headers, config) {
       $log.log('UserInfoCtrl SUCCESS');
       $log.log(status);
       $log.log(data);
       $log.log(headers);
       $log.log(config);
       $scope.elenco = data.record;


  }).
  error(function(data, status, headers, config) {
        $log.log('UserInfoCtrl error');
        $log.log(status);
        $log.log(data);
        $log.log(headers);
        $log.log(config);

  });


  $scope.getData = function(){
      $log.log('getData ....');
      $http.get('https://dsp-paulo-difficiliora.cloud.dreamfactory.com:443/rest/db/log').
  success(function(data, status, headers, config) {
       $log.log('UserInfoCtrl SUCCESS');
       $log.log(status);
       $log.log(data);
       $log.log(headers);
       $log.log(config);
       $scope.elenco = data.record;
      }).
  error(function(data, status, headers, config) {
        $log.log('UserInfoCtrl error');
        $log.log(status);
        $log.log(data);
        $log.log(headers);
        $log.log(config);
    });
  };


  //https://dsp-paulo-difficiliora.cloud.dreamfactory.com:443/rest/db/log
  $scope.postLogWithError = function (){
    console.log('postLogWithError ....');
    var data2post = {};

    ERRORE.go();


    $http.post(
        'https://dsp-paulo-difficiliora.cloud.dreamfactory.com:443/rest/db/log1',
        data2post).
    success(function(data, status, headers, config) {
     console.log('postLogWithError SUCCESS');
       console.log(status);
       console.log(data);
       console.log(headers);
       console.log(config);
       $scope.elenco = data.record;


  });


  };

  $scope.postLog = function (){

    console.log('postLog ....');

    var data2post = {
          "address":  faker.address.streetName() + ' ' + faker.address.city(),
          "age":      faker.helpers.randomNumber(),
          "balance":  faker.helpers.randomNumber(),
          "company":  faker.company.companyName(),
          "counter":  faker.helpers.randomNumber(),
          "email":    faker.internet.email(),
          "gender":   faker.name.findName(),
          "inserted": faker.date.past(),
          "ipAddress":faker.internet.ip(),
          "isActive": 1,
          "userAgent":faker.internet.userAgent(),
          "latitude": faker.address.latitude(),
          "longitude":faker.address.longitude(),
          "name":     faker.name.findName(),
          "phone":    faker.phone.phoneNumber(),
          "picture":  faker.image.imageUrl(),
          "registered":faker.date.recent()
      };

      console.log(data2post);

$http.post('https://dsp-paulo-difficiliora.cloud.dreamfactory.com:443/rest/db/log',
  data2post).
  success(function(data, status, headers, config) {
     console.log('postLog SUCCESS');
       console.log(status);
       console.log(data);
       console.log(headers);
       console.log(config);
       $scope.elenco = data.record;


  }).
  error(function(data, status, headers, config) {
     console.log('postLog error');
        console.log(status);
        console.log(data);
       console.log(headers);
       console.log(config);

  });


  };


}])    
.controller('NavigationCtrl', ['$scope', function($scope) {

            $scope.hasUser = false;
            $scope.$watch('currentUser', function(newValue, oldValue) {
                $scope.hasUser = !!newValue;
            })
    }]);