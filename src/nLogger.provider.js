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
