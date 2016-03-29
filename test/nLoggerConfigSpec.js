describe('nLoggerConfig', () => {

	let nLoggerConfigProvider;
	let nLoggerConfig;

	beforeEach(() => {
		module('nCore.nLogger.config');
	});

	// What should the feature do?
	it('should return defaults', () => {

		inject(['nLoggerConfig', (_nLoggerConfig) => {
			nLoggerConfig = _nLoggerConfig; // to use the instance in other parts
		}]);

		// What is the actual output?
		const actual = nLoggerConfig;

		// What is the expected output?
		const expected = {
			blacklist: ['log', 'warn', 'info', 'error'],
			console: {
				enable: true
			}
		};

		expect(actual).toEqual(expected);
	});

	// What should the feature do?
	it('should configure defaults console.enable to false', () => {

		// load the provider with module to be able to call its configuration methods
		module(['nLoggerConfigProvider', (_nLoggerConfigProvider) => {
			nLoggerConfigProvider = _nLoggerConfigProvider; // to use the provider in other parts
			nLoggerConfigProvider.configure({console: {enable: false}});
		}]);

		inject(['nLoggerConfig', (_nLoggerConfig) => {
			nLoggerConfig = _nLoggerConfig; // to use the instance in other parts
		}]);

		// What is the actual output?
		const actual = nLoggerConfig;

		// What is the expected output?
		const expected = {
			blacklist: ['log', 'warn', 'info', 'error'],
			console: {
				enable: false
			}
		};

		expect(actual).toEqual(expected);
	});

	// What should the feature do?
	it('should return defaults if no configuration object is provided', () => {

		// What is the actual output?
		let actual;

		// load the provider with module to be able to call its configuration methods
		module(['nLoggerConfigProvider', (_nLoggerConfigProvider) => {
			nLoggerConfigProvider = _nLoggerConfigProvider; // to use the provider in other parts
			actual = nLoggerConfigProvider.configure();
		}]);

		inject(['nLoggerConfig', (_nLoggerConfig) => {
			nLoggerConfig = _nLoggerConfig; // to use the instance in other parts
		}]);

		// What is the expected output?
		const expected = {
			blacklist: ['log', 'warn', 'info', 'error'],
			console: {
				enable: true
			}
		};

		expect(actual).toEqual(expected);
	});
});