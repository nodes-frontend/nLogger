describe('nLoggerConfig', function() {

	var nLoggerConfigProvider;
	var nLoggerConfig;

	beforeEach(function() {
		module('nCore.nLogger.config');
	});

	// What should the feature do?
	it('should return defaults', function() {

		inject(['nLoggerConfig', function(_nLoggerConfig) {
			nLoggerConfig = _nLoggerConfig; // to use the instance in other parts
		}]);

		// What is the actual output?
		var actual = nLoggerConfig;

		// What is the expected output?
		var expected = {
			blacklist: ['log', 'warn', 'info', 'error'],
			console: {
				enable: true
			}
		};

		expect(actual).toEqual(expected);
	});
});