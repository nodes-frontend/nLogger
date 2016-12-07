/**
 * A simple logger service for Angular apps, part of the nCore.
 * @version v0.0.0-semantically-released - 2016-12-07
 * @link https://github.com/nodes-frontend/nLogger
 * @author https://github.com/nodes-frontend/nLogger/graphs/contributors
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function () {
	'use strict';

	angular.module('nCore.nLogger', ['ENVIRONMENT', 'nCore.nLogger.config', 'nCore.nLogger.factory']);

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
	nLoggerFactory.$inject = ["nLoggerConfig", "ENVIRONMENT", "$window"];

})();
