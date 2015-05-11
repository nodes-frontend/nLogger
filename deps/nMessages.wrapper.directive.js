(function () {
	'use strict';

	angular
		.module('nCore.nMessages.wrapper', ['nCore.nMessages.provider'])
		.directive('nMessagesWrapper', wrapper);

	/* @ngInject */
	function wrapper(nMessages) {

		var directive = {
			restrict: 'EA',
			replace: true,
			compile: compile,
			templateUrl: 'src/nMessages.wrapper.template.html'
		};
		return directive;

		function compile(tElem, tAttrs) {

			return function(scope) {
				// pænere end ..Pos!
				scope.hPos = nMessages.settings.horizontalPosition;
				scope.vPos = nMessages.settings.verticalPosition;

				scope.messages = nMessages.messages;
			};
		}

	}

})();
