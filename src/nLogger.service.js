(function () {
	'use strict';

	angular
		.module('nCore.nLogger.factory', [])
		.service('nLogger', nLoggerFactory);

	/* @ngInject */
	function nLoggerFactory(nLoggerConfig, ENVIRONMENT, $window) {

		// Fetch default settings from config provider
		var defaults = nLoggerConfig;

		var service = {
			log: log,
			error: error,
			warning: warning,
			success: success,
			info: info
		};
		
		// Disable all blacklisted console methods if in production
		if(ENVIRONMENT === 'PRODUCTION'){

			if(!$window.console) {
				$window.console = {};
			}

			for(var i = 0; i < defaults.blacklist.length; i++) {
				$window.console[defaults.blacklist[i]] = function(){return 'disabled'};
			}
		}

		return service;

		/*
			Public Methods
		 */

		function log(message, data) {

			var css = 'font-weight: bold;';

			if(defaults.console.enable) {
				console.log('%c ' + message, css, (data || ''));
			}

		}

		function error(message, data) {

			var css = 'font-weight: bold; color: red;';

			if(defaults.console.enable) {
				console.error('%c ' + message, css, (data || ''));
			}

		}

		function warning(message, data) {

			var css = 'font-weight: bold; color: #de770f;';

			if(defaults.console.enable) {
				console.warn('%c ' + message, css, (data || ''));
			}

		}

		function success(message, data) {

			var css = 'font-weight: bold; color: #3a945b;';

			if(defaults.console.enable) {
				console.log('%c ' + message, css, (data || ''));
			}

		}

		function info(message, data) {

			var css = 'font-weight: bold; color: #74bfdd;';

			if(defaults.console.enable) {
				console.info('%c ' + message, css, (data || ''));
			}

		}

	}

})();
