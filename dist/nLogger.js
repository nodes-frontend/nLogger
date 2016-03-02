/**
 * A simple logger service for Nodes Angular apps, part of the nCore.
 * @version v1.0.0 - 2016-03-02
 * @link https://github.com/nodes-galactic/nLogger
 * @author Dennis Haulund Nielsen
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function () {
	'use strict';

	angular.module('nCore.nLogger', ['DEBUG_ENV', 'nCore.nLogger.config', 'nCore.nLogger.factory']);

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
	function nLoggerFactory(nLoggerConfig, DEBUG_ENV) {

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

			if(defaults.console.enable) {
				console.log('%c ' + message, css , (data || ''));
			}

		}

		function error(message, data, options) {

			var css = 'font-weight: bold; color: red;';

			if(defaults.console.enable) {
				console.error('%c ' + message, css , (data || ''));
			}

		}

		function warning(message, data, options) {

			var css = 'font-weight: bold; color: #de770f;';

			if(defaults.console.enable) {
				console.warn('%c ' + message, css , (data || ''));
			}

		}

		function success(message, data, options) {

			var css = 'font-weight: bold; color: #3a945b;';

			if(defaults.console.enable) {
				console.log('%c ' + message, css , (data || ''));
			}

		}

		function info(message, data, options) {

			var css = 'font-weight: bold; color: #74bfdd;';

			if(defaults.console.enable) {
				console.info('%c ' + message, css , (data || ''));
			}

		}

	}
	nLoggerFactory.$inject = ["nLoggerConfig", "DEBUG_ENV"];

})();
