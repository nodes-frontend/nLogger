let nLogger;
let nLoggerConfig;
let nLoggerConfigDefaults;
let ENVIRONMENT;
let nLoggerRequiredFunctions = ['log', 'error', 'warning', 'success', 'info'];
let _window;

var _beforeEach = () => {
	module('nCore.nLogger.factory');

	module(($provide) => {
		$provide.provider('nLoggerConfig', class {
			$get() {
				return nLoggerConfigDefaults;
			};
		});

		$provide.constant('ENVIRONMENT', ENVIRONMENT);

		$provide.value('$window', {
			console: undefined
		});
	});

	inject(['nLogger', '$window', (_nLogger, $window) => {
		nLogger = _nLogger;
		_window = $window;
	}]);
};

describe('nLogger - general', () => {

	beforeEach(() => {
		
		ENVIRONMENT 				= 'DEVELOPMENT';
		nLoggerConfigDefaults 		= {
			blacklist: ['log', 'warn', 'info', 'error'],
			console: {
				enable: true
			}
		};

		_beforeEach();
	});

	nLoggerRequiredFunctions.forEach((expected) => {

		// What should the feature do?
		it('should have "' + expected + '" defined', () => {

			// What is the actual output?
			const actual = nLogger[expected];

			// What is the expected output?
			expect(actual).toEqual(jasmine.any(Function));
		});
	});
});

describe('nLogger - Production', () => {

	var blacklist = ['log', 'warn', 'info', 'error'];

	// TODO: TEST IF CONSOLE[TYPE] is BEING OVERWRITTEN DEPENDING ON DEBUG_ENV
	beforeEach(() => {
		ENVIRONMENT = 'PRODUCTION';

		nLoggerConfigDefaults = {
			blacklist: blacklist
		};

		_beforeEach();
	});

	// It should disable all console[type] from blacklisted array
	blacklist.forEach((blacklisted) => {

		// What should the feature do?
		it('Should disable console.' + blacklisted, () => {
			// What is the actual output?
			const actual = _window.console[blacklisted]();

			// What is the expected output?
			const expected = 'disabled';

			expect(actual).toEqual(expected);
		});
	});
});

describe('nLogger - console enabled', () => {

	beforeEach(() => {

		ENVIRONMENT = 'DEVELOPMENT';

		nLoggerConfigDefaults = {
			console: {
				enable: true
			}
		};

		_beforeEach();
	});

	// What should the feature do?
	it('"log" should call console.log', () => {

		spyOn(console, 'log');

		nLogger.log();

		// What is the actual output?
		const actual = console.log;

		// What is the expected output?
		expect(actual).toHaveBeenCalled();
	});

	// What should the feature do?
	it('"error" should call console.error', () => {

		spyOn(console, 'error');

		nLogger.error();

		// What is the actual output?
		const actual = console.error;

		// What is the expected output?
		expect(actual).toHaveBeenCalled();
	});

	// What should the feature do?
	it('"warning" should call console.warn', () => {

		spyOn(console, 'warn');

		nLogger.warning();

		// What is the actual output?
		const actual = console.warn;

		// What is the expected output?
		expect(actual).toHaveBeenCalled();
	});

	// What should the feature do?
	it('"success" should call console.log', () => {

		spyOn(console, 'log');

		nLogger.success();

		// What is the actual output?
		const actual = console.log;

		// What is the expected output?
		expect(actual).toHaveBeenCalled();
	});

	// What should the feature do?
	it('"info" should call console.info', () => {

		spyOn(console, 'info');

		nLogger.info();

		// What is the actual output?
		const actual = console.info;

		// What is the expected output?
		expect(actual).toHaveBeenCalled();
	});
});

describe('nLogger - console disabled', () => {

	beforeEach(() => {
		
		ENVIRONMENT = 'DEVELOPMENT';

		nLoggerConfigDefaults = {
			console: {
				enable: false
			}
		};

		_beforeEach();
	});

	// What should the feature do?
	it('"log" should not call console.log', () => {

		spyOn(console, 'log');

		nLogger.log();

		// What is the actual output?
		const actual = console.log;

		// What is the expected output?
		expect(actual).not.toHaveBeenCalled();
	});

	// What should the feature do?
	it('"error" should not call console.error', () => {

		spyOn(console, 'error');

		nLogger.error();

		// What is the actual output?
		const actual = console.error;

		// What is the expected output?
		expect(actual).not.toHaveBeenCalled();
	});

	// What should the feature do?
	it('"warning" should not call console.warn', () => {

		spyOn(console, 'warn');

		nLogger.warning();

		// What is the actual output?
		const actual = console.warn;

		// What is the expected output?
		expect(actual).not.toHaveBeenCalled();
	});

	// What should the feature do?
	it('"success" should not call console.log', () => {

		spyOn(console, 'log');

		nLogger.success();

		// What is the actual output?
		const actual = console.log;

		// What is the expected output?
		expect(actual).not.toHaveBeenCalled();
	});

	// What should the feature do?
	it('"info" should not call console.info', () => {

		spyOn(console, 'info');

		nLogger.info();

		// What is the actual output?
		const actual = console.info;

		// What is the expected output?
		expect(actual).not.toHaveBeenCalled();
	});
});