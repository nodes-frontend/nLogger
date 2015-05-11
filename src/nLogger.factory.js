(function () {
	'use strict';

	angular
		.module('nCore.nLogger')
		.factory('nLogger', nLoggerFactory);

	/* @ngInject */
	function nLoggerFactory() {

		return function(){};
	}

})();
