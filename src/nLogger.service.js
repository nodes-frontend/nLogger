(function () {
	'use strict';

	angular
		.module('nCore.nLogger.factory', [])
		.service('nLogger', nLoggerFactory);

	/* @ngInject */
	function nLoggerFactory(nMessages, nLoggerConfig, DEBUG_ENV) {

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
		if(!DEBUG_ENV){

			if(!window.console) {
				window.console = {};
			}

			for(var i = 0; i < nLoggerConfig.blacklist.length; i++) {
				console[nLoggerConfig.blacklist[i]] = function(){};
			}
		}

		return service;

		/*
			Public Methods
		 */

		function log(message, data, options) {

			var css = 'font-weight: bold;';

			var msg = {
				content: message,
				type: ''
			};

			angular.extend(msg, defaults.messages, options);

			if(defaults.messages.enable && DEBUG_ENV) {
				nMessages.create(msg);
			}

			if(defaults.console.enable) {
				console.log('%c ' + message, css , (data || ''));
			}

		}

		function error(message, data, options) {

			var css = 'font-weight: bold; color: red;';

			var msg = {
				content: message,
				type: 'error'
			};

			angular.extend(msg, defaults.messages, options);

			if(defaults.messages.enable && DEBUG_ENV) {
				nMessages.create(msg);
			}

			if(defaults.console.enable) {
				console.error('%c ' + message, css , (data || ''));
			}

		}

		function warning(message, data, options) {

			var css = 'font-weight: bold; color: gold;';

			var msg = {
				content: message,
				type: 'warning'
			};

			angular.extend(msg, defaults.messages, options);

			if(defaults.messages.enable && DEBUG_ENV) {
				nMessages.create(msg);
			}

			if(defaults.console.enable) {
				console.warn('%c ' + message, css , (data || ''));
			}

		}

		function success(message, data, options) {

			var css = 'font-weight: bold; color: green;';

			var msg = {
				content: message,
				type: 'success'
			};

			angular.extend(msg, defaults.messages, options);

			if(defaults.messages.enable && DEBUG_ENV) {
				nMessages.create(msg);
			}

			if(defaults.console.enable) {
				console.log('%c ' + message, css , (data || ''));
			}

		}

		function info(message, data, options) {

			var css = 'font-weight: bold; color: blue;';

			var msg = {
				content: message,
				type: 'info'
			};

			angular.extend(msg, defaults.messages, options);

			if(defaults.messages.enable && DEBUG_ENV) {
				nMessages.create(msg);
			}

			if(defaults.console.enable) {
				console.info('%c ' + message, css , (data || ''));
			}

		}

	}

})();
