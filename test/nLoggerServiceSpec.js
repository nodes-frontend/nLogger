var nLogger;
var nLoggerConfig;
var nLoggerConfigDefaults;
var DEBUG_ENV;
var nLoggerRequiredFunctions = ['log', 'error', 'warning', 'success', 'info'];
var _window;

function _beforeEach() {
	module('nCore.nLogger.factory');

	module(function($provide) {
		$provide.provider('nLoggerConfig', function() {

			this.$get = function() {
				return nLoggerConfigDefaults;
			};
		});

		$provide.constant('DEBUG_ENV', DEBUG_ENV);

		$provide.value('$window', {
			console: undefined
		});
	});

	inject(['nLogger', '$window', function(_nLogger, $window) {
		nLogger = _nLogger;
		_window = $window;
	}]);
}

describe('nLogger - general', function() {

	beforeEach(function() {

		DEBUG_ENV 					= true;
		nLoggerConfigDefaults 		= {
			blacklist: ['log', 'warn', 'info', 'error'],
			console: {
				enable: true
			}
		};

		_beforeEach();
	});

	nLoggerRequiredFunctions.forEach(function(expected){

		// What should the feature do?
		it('should have "' + expected + '" defined', function() {

			// What is the actual output?
			var actual = nLogger[expected];

			// What is the expected output?
			expect(actual).toEqual(jasmine.any(Function));
		});
	});
});

describe('nLogger - Production', function() {

	var blacklist = ['log', 'warn', 'info', 'error'];

	// TODO: TEST IF CONSOLE[TYPE] is BEING OVERWRITTEN DEPENDING ON DEBUG_ENV
	beforeEach(function() {
		DEBUG_ENV = false;

		nLoggerConfigDefaults = {
			blacklist: blacklist
		};

		_beforeEach();
	});

	// It should disable all console[type] from blacklisted array
	blacklist.forEach(function(blacklisted) {

		// What should the feature do?
		it('Should disable console.' + blacklisted, function() {
			// What is the actual output?
			var actual = _window.console[blacklisted]();

			// What is the expected output?
			var expected = 'disabled';

			expect(actual).toEqual(expected);
		});
	});
});

describe('nLogger - console enabled', function() {

	beforeEach(function() {

		DEBUG_ENV = true;

		nLoggerConfigDefaults = {
			console: {
				enable: true
			}
		};

		_beforeEach();
	});

	// What should the feature do?
	it('"log" should call console.log', function() {

		spyOn(console, 'log');

		nLogger.log();

		// What is the actual output?
		var actual = console.log;

		// What is the expected output?
		expect(actual).toHaveBeenCalled();
	});

	// What should the feature do?
	it('"error" should call console.error', function() {

		spyOn(console, 'error');

		nLogger.error();

		// What is the actual output?
		var actual = console.error;

		// What is the expected output?
		expect(actual).toHaveBeenCalled();
	});

	// What should the feature do?
	it('"warning" should call console.warn', function() {

		spyOn(console, 'warn');

		nLogger.warning();

		// What is the actual output?
		var actual = console.warn;

		// What is the expected output?
		expect(actual).toHaveBeenCalled();
	});

	// What should the feature do?
	it('"success" should call console.log', function() {

		spyOn(console, 'log');

		nLogger.success();

		// What is the actual output?
		var actual = console.log;

		// What is the expected output?
		expect(actual).toHaveBeenCalled();
	});

	// What should the feature do?
	it('"info" should call console.info', function() {

		spyOn(console, 'info');

		nLogger.info();

		// What is the actual output?
		var actual = console.info;

		// What is the expected output?
		expect(actual).toHaveBeenCalled();
	});
});

describe('nLogger - console disabled', function() {

	beforeEach(function() {

		DEBUG_ENV = true;

		nLoggerConfigDefaults = {
			console: {
				enable: false
			}
		};

		_beforeEach();
	});

	// What should the feature do?
	it('"log" should not call console.log', function() {

		spyOn(console, 'log');

		nLogger.log();

		// What is the actual output?
		var actual = console.log;

		// What is the expected output?
		expect(actual).not.toHaveBeenCalled();
	});

	// What should the feature do?
	it('"error" should not call console.error', function() {

		spyOn(console, 'error');

		nLogger.error();

		// What is the actual output?
		var actual = console.error;

		// What is the expected output?
		expect(actual).not.toHaveBeenCalled();
	});

	// What should the feature do?
	it('"warning" should not call console.warn', function() {

		spyOn(console, 'warn');

		nLogger.warning();

		// What is the actual output?
		var actual = console.warn;

		// What is the expected output?
		expect(actual).not.toHaveBeenCalled();
	});

	// What should the feature do?
	it('"success" should not call console.log', function() {

		spyOn(console, 'log');

		nLogger.success();

		// What is the actual output?
		var actual = console.log;

		// What is the expected output?
		expect(actual).not.toHaveBeenCalled();
	});

	// What should the feature do?
	it('"info" should not call console.info', function() {

		spyOn(console, 'info');

		nLogger.info();

		// What is the actual output?
		var actual = console.info;

		// What is the expected output?
		expect(actual).not.toHaveBeenCalled();
	});
});