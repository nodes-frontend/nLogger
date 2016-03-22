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

	// What should the feature do?
	it('should configure defaults console.enable to false', function() {

		// load the provider with module to be able to call its configuration methods
		module(['nLoggerConfigProvider', function(_nLoggerConfigProvider) {
			nLoggerConfigProvider = _nLoggerConfigProvider; // to use the provider in other parts
			nLoggerConfigProvider.configure({console: {enable: false}});
		}]);

		inject(['nLoggerConfig', function(_nLoggerConfig) {
			nLoggerConfig = _nLoggerConfig; // to use the instance in other parts
		}]);

		// What is the actual output?
		var actual = nLoggerConfig;
		// What is the expected output?
		var expected = {
			blacklist: ['log', 'warn', 'info', 'error'],
			console: {
				enable: false
			}
		};

		expect(actual).toEqual(expected);
	});

	// What should the feature do?
	it('should return defaults if no configuration object is provided', function() {

		// What is the actual output?
		var actual;

		// load the provider with module to be able to call its configuration methods
		module(['nLoggerConfigProvider', function(_nLoggerConfigProvider) {
			nLoggerConfigProvider = _nLoggerConfigProvider; // to use the provider in other parts
			actual = nLoggerConfigProvider.configure();
		}]);

		inject(['nLoggerConfig', function(_nLoggerConfig) {
			nLoggerConfig = _nLoggerConfig; // to use the instance in other parts
		}]);

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