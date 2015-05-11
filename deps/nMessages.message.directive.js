(function () {
	'use strict';

	angular
		.module('nCore.nMessages.message', ['nCore.nMessages.provider'])
		.directive('nMessagesMessage', message);

	/* @ngInject */
	function message(nMessages, $timeout) {

		var directive = {
			restrict: 'EA',
			transclude: true,
			templateUrl: 'src/nMessages.message.template.html',
			scope: {
				message: '=nMessagesMessage'
			},
			link: link,
			controller: controller
		};
		return directive;

		function link(scope, element) {
			if (scope.message.dismissOnTimeout) {
				$timeout(function () {
					nMessages.dismiss(scope.message.id);
				}, scope.message.timeout);
			}

			if (scope.message.dismissOnClick) {
				element.bind('click', function () {
					nMessages.dismiss(scope.message.id);
					scope.$apply();
				});
			}
		}

		function controller($scope, nMessages) {
			$scope.dismiss = function () {
				nMessages.dismiss($scope.message.id);
			};
		}

	}

})();
