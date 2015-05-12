/**
 * 
 * @version v1.0.0 - 2015-05-12
 * @link 
 * @author 
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function () {
	'use strict';

	angular.module('nCore.nLogger', ['DEBUG_ENV', 'nCore.nLogger.config', 'nCore.nLogger.factory', 'nCore.nMessages']);

})();

(function () {
	'use strict';

	angular
		.module('nCore.nLogger.config', [])
		.provider('nLoggerConfig', nLoggerProvider);

	function nLoggerProvider() {
		/*jshint validthis: true */

		var defaults = {
			blacklist: ['log', 'warn', 'info', 'error'],
			console: {
				enable: true
			},
			messages: {
				enable: true,
				dismissOnTimeout: false,
				timeout: 4000,
				dismissButton: false,
				dismissButtonHtml: '&times;',
				dismissOnClick: true
			}
		};

		// If config provided, acts as a setter, else acts as a getter
		this.configure = function(config) {
			if(!arguments[0]) {
				return defaults;
			} else {
				angular.extend(defaults, config);
			}
		};

		/* @ngInject */
		this.$get = function() {
			return defaults;
		};

	}

})();

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
	nLoggerFactory.$inject = ["nMessages", "nLoggerConfig", "DEBUG_ENV"];

})();

