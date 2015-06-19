'use strict';

angular.module('angularjsAuthTutorialApp')


// inject 'UserDataService'
.controller('TopLevelAppCtrl', ['$scope', 'UserDataService', function ($scope, UserDataService) {

	// Add $scope variable to store the user
	//$scope.currentUser = '';
    $scope.currentUser = UserDataService.getCurrentUser();
	$scope.testVar = $scope.currentUser.display_name;

}])

.controller('MainCtrl', ['$scope', function ($scope) {
        
 }])

.controller('LoginCtrl', ['$scope', '$location', 'UserEventsService','$http', 
	function($scope, $location, UserEventsService,$http) {

		console.log('LoginCtrl start');

        $scope.$on(UserEventsService.login.loginSuccess, function(e, userDataObj) {
    		console.log('LoginCtrl SUCCESS');
    		console.log(userDataObj);
            console.log('Setting session_id : ' + userDataObj.session_id);
            $http.defaults.headers.common['X-DreamFactory-Session-Token'] = userDataObj.session_id;



    		$scope.$parent.currentUser = userDataObj;
            $location.url('/');
        	}
        );
    }])

	.controller('LogoutCtrl', ['$scope', '$location', 'UserEventsService','$http',
                function($scope, $location, UserEventsService,$http) {
		console.log('LogoutCtrl start');
        $scope.$on(UserEventsService.logout.logoutSuccess, function(e, userDataObj) {
    		console.log('LogoutCtrl SUCCESS');
            console.log(userDataObj);
    		console.log('remove session_id');

            $http.defaults.headers.common['X-DreamFactory-Session-Token'] = '';

    		$scope.$parent.currentUser = userDataObj;
            $location.url('/');
        });
    }])

.controller('UserInfoCtrl', ['$scope','$http', function($scope,$http) {

$scope.userData = $scope.$parent.currentUser;
$http.get('https://dsp-paulo-difficiliora.cloud.dreamfactory.com:443/rest/db/log').
  success(function(data, status, headers, config) {
     console.log('UserInfoCtrl SUCCESS');
       console.log(status);
       console.log(data);
       console.log(headers);
       console.log(config);
       $scope.elenco = data.record;


  }).
  error(function(data, status, headers, config) {
     console.log('UserInfoCtrl error');
        console.log(status);
        console.log(data);
       console.log(headers);
       console.log(config);

  });



    //https://dsp-paulo-difficiliora.cloud.dreamfactory.com:443/rest/db/log

}])    
.controller('NavigationCtrl', ['$scope', function($scope) {

            $scope.hasUser = false;
            $scope.$watch('currentUser', function(newValue, oldValue) {
                $scope.hasUser = !!newValue;
            })
    }]);