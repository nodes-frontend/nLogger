# nCore.nLogger
[![Build Status](https://travis-ci.org/nodes-frontend/nLogger.svg?branch=master)](https://travis-ci.org/nodes-frontend/nLogger)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A module for logging functionality. This is not for production.
Please note that we do not disable console methods outside of our angular application scope.

When the global DEBUG_ENV variable is set to false we disable all console methods based on your config.

## Configuration

Use the provider to overwrite defaults.

```javascript
var myConfig = nLoggerConfigProvider.configure();
nLoggerConfigProvider.configure(myConfig);
```

The .configure() method acts as a getter if no arguments is provided and a setter otherwise.

Default settings:
 
```javascript
nLoggerConfigProvider.configure({
	blacklist: ['log', 'warn', 'info', 'error'], //These methods are disabled in prod env
	console: {
		enable: true //Disable the logger console prints
	},
	messages: {
		enable: true, //Disable the logger message prints
		dismissOnTimeout: false,
		timeout: 4000,
		dismissButton: false,
		dismissButtonHtml: '&times;',
		dismissOnClick: true
	}
});
``` 

## Usage

All logging methods takes 3 arguments:

```javascript
nLogger.method(message, data, methodSpecificOptions);
```

Message and data can be of any type, methodSpecificOptions can overwrite the defaults and must be an object.

```javascript
angular.module('demoApp', ['nCore'])
	.run(function(nLogger) {

		nLogger.log('nLogger.log', {data: 'foo'}, {dismissButton: false});

		nLogger.error('nLogger.error', new Error('Error'));

		nLogger.warning('nLogger.warning', {o: '1'});

		nLogger.success('nLogger.success', [0,1,2,3,{a: 1}]);

		nLogger.info('nLogger.info', window.console);
		
	});
```

