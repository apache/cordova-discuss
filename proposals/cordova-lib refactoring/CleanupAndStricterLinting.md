# Cleanup cordova-lib code base

The current code base of `cordova-lib` is a mess.

This includes all projects in the [cordova-lib git repository](https://github.com/apache/cordova-lib)

- `cordova-common`
- `cordova-fetch`
- `cordova-lib`
- `cordova-serve`


## Replace JSHint and JSCS with ESLint

JSHint does minimal checks and JSCS has been deprecated in favor of ESLint.

I suggest to replace the current style checkers with ESLint. This allows to set much more strict styling rules than at at this moment.

I recommend using a popular preset, such as [airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base). Example configuration:

```yaml
root: true

extends: airbnb-base
```

Many styling issues could be fixed by simply running:

```
./node_modules/.bin/eslint --fix .
```



Optionally the indent could be set to 4 instead of 2, because that's used in the current code base.


## Use actual ES6 classes

Currently `cordova-lib` uses multiple ways of defining a prototype. Since support for NodeJS 0.x has been reopped, all of these can be replaced with ES6 classes for a much cleaner code base.


## Use ES6 promises

Currently `cordova-lib` uses the defer API of the `q` library. Since support for NodeJS 0.x has been reopped, all of these can be replaced with native ES6 promises.


# Remove addProperty functions

The addProperty function obscures the code base. It's much better understandable if simple module syntax is used like in any other NodeJS project. This also makes tools able to parse and understand modules.

For example `cordova-common.js` looks like this:

```js
const addProperty = require('./src/util/addProperty');

module.exports = { };

addProperty(module, 'events', './src/events');
addProperty(module, 'superspawn', './src/superspawn');

addProperty(module, 'ActionStack', './src/ActionStack');
addProperty(module, 'CordovaError', './src/CordovaError/CordovaError');
addProperty(module, 'CordovaLogger', './src/CordovaLogger');
addProperty(module, 'CordovaCheck', './src/CordovaCheck');
addProperty(module, 'CordovaExternalToolErrorContext', './src/CordovaError/CordovaExternalToolErrorContext');
addProperty(module, 'PlatformJson', './src/PlatformJson');
addProperty(module, 'ConfigParser', './src/ConfigParser/ConfigParser');
addProperty(module, 'FileUpdater', './src/FileUpdater');

addProperty(module, 'PluginInfo', './src/PluginInfo/PluginInfo');
addProperty(module, 'PluginInfoProvider', './src/PluginInfo/PluginInfoProvider');

addProperty(module, 'PluginManager', './src/PluginManager');

addProperty(module, 'ConfigChanges', './src/ConfigChanges/ConfigChanges');
addProperty(module, 'ConfigKeeper', './src/ConfigChanges/ConfigKeeper');
addProperty(module, 'ConfigFile', './src/ConfigChanges/ConfigFile');
addProperty(module, 'mungeUtil', './src/ConfigChanges/munge-util');

addProperty(module, 'xmlHelpers', './src/util/xml-helpers');
```

The following would be much easier to understand:

```js
module.exports = {
  events: require('./src/events'),
  superspawn: require('./src/superspawn'),

  ActionStack: require('./src/ActionStack'),
  CordovaError: require('./src/CordovaError/CordovaError'),
  CordovaLogger: require('./src/CordovaLogger'),
  CordovaCheck: require('./src/CordovaCheck'),
  CordovaExternalToolErrorContext: require('./src/CordovaError/CordovaExternalToolErrorContext'),
  PlatformJson: require('./src/PlatformJson'),
  ConfigParser: require('./src/ConfigParser/ConfigParser'),
  FileUpdater: require('./src/FileUpdater'),

  PluginInfo: require('./src/PluginInfo/PluginInfo'),
  PluginInfoProvider: require('./src/PluginInfo/PluginInfoProvider'),

  PluginManager: require('./src/PluginManager'),

  ConfigChanges: require('./src/ConfigChanges/ConfigChanges'),
  ConfigKeeper: require('./src/ConfigChanges/ConfigKeeper'),
  ConfigFile: require('./src/ConfigChanges/ConfigFile'),
  mungeUtil: require('./src/ConfigChanges/munge-util'),

  xmlHelpers: require('./src/util/xml-helpers')
};
```
