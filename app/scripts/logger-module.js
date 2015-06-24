'use strict'; 
angular.module('angularjsAuthTutorialApp')
/** 
  * Service that gives us a nice Angular-esque wrapper around the 
  * stackTrace.js pintStackTrace() method. 
 */ 
.factory("traceService",function(){ 
			return({ 
				print: printStackTrace 
			}); 
		})
.provider("$exceptionHandler",{ 
		$get: function(exceptionLoggingService){ 
			return(exceptionLoggingService); 
		} 
	})
.factory("exceptionLoggingService", 
	["$log","$window", "traceService","DSP_API_KEY",
	function($log, $window, traceService, DSP_API_KEY)
	{ 
		function error(exception, cause)
		{ 
		// preserve the default behaviour which will log the error 
		// to the console, and allow the application to continue running. 
			$log.error.apply($log, arguments); 
			// now try to log the error to the server side. 
			try{ 
				var errorMessage = exception.toString(); 
				// use our traceService to generate a stack trace 
				var stackTrace = traceService.print({e: exception}); 
				// use AJAX (in this example jQuery) and NOT 
				// an angular service such as $http 
				$log.log('posting ERROR REMOTE with ajax..');
				$log.log($window.navigator.userAgent);
				$log.log($window.location.href);
				//$log.log(stackTrace);


 				var data2post = {
          			"url": $window.location.href, 
					"userAgent": $window.navigator.userAgent,
					"message": errorMessage, 
					"type": "exception", 
					//stackTrace: stackTrace, 
					"inserted": Date(),
					"cause": ( cause || "") 
      			};

				$log.log(data2post);
				$log.log('header:' + DSP_API_KEY);
	//$httpProvider.defaults.headers.common['X-DreamFactory-Application-Name'] = DSP_API_KEY;
	// _xhrObj.setRequestHeader("X-DreamFactory-Application-Name", DSP_API_KEY);

				$.ajax({ 
					type: "POST", 
					beforeSend: function (request)
            		{
                		request.setRequestHeader("X-DreamFactory-Application-Name", DSP_API_KEY);
            		},
					url: "https://dsp-paulo-difficiliora.cloud.dreamfactory.com:443/rest/db/log", 
					contentType: "application/json", 
					processData: false,
					data: data2post
				}); 

	


			} catch (loggingError){ 
				$log.warn("Error server-side logging failed"); 
				$log.log(loggingError); 
				} 
			} 
			return(error); 
	}] 
); 