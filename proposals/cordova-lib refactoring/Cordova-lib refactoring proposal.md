The proposal describes the way how we can improve current cordova lib design and interaction between cordova lib and platforms. The document contains high-level descriptions of proposed interfaces only. Fo more details on methods signatures see *.js files in this pull request.

The most important points of this proposal are:

## 1. The PlatformApi class

PlatformApi (or CordovaPlatform) class - an abstraction around particular platform that exposes all the actions for this platform (such as build/run), so they're accessible programmatically. It also knows how to install/uninstall plugins with all source files, web assets and js files, so this is no more responsibility of cordova-lib. It also exposes single 'prepare' method to provide a way for cordova-lib to apply project's settings/www content to platform.

The PlatformApi class needs to be implemented by each platform, that wants to use new API flow. For those platforms, which doesn't provide own PlatformApi, there will be a polyfill in cordova-lib.

There is a PR to cordova-lib, which implements the polyfill: https://github.com/MSOpenTech/cordova-lib/pull/2

### Proposed class structure

#### Constructor

    function PlatformApi() {}

#### Static methods

    PlatformApi.createPlatform = function (cordovaProject, options) {};
    PlatformApi.updatePlatform = function (cordovaProject, options) {};

These methods are equal to bin/create and bin/update scripts. Installs/updates platform to specified directory and creates a platform project. Accepts a CordovaProject instance, that defines a project structure and configuration, that should be applied to new platform, and an options object.

#### Platform-specific information

    PlatformApi.prototype.getPlatformInfo = function () {};

Gets a CordovaPlatform object, that represents the platform structure:
Platform's directories/main files locations (config.xml, www, etc.)

#### CLI workflow integration

    PlatformApi.prototype.prepare = function (cordovaProject) {};

Updates installed platform with provided www assets and new app configuration. This method is required for CLI workflow and will be called each time before build, so the changes, made to app configuration and www code, will be applied to platform. 

__NOTE:__ The `prepare` method doesn't rebuild `cordova_plugins` file and doesn't reapply assets and js files, installed by plugins, to platform's www directory. Accepts a `CordovaProject` instance, that defines a project structure and configuration, that should be applied to platform

#### Plugin management

    PlatformApi.prototype.addPlugin = function (plugin, installOptions) {};
    PlatformApi.prototype.removePlugin = function (plugin) {};

Installs/uninstalls a plugin into platform. These methods handles all the files, shipped by plugin (sources, libs, assets, js-files). Accepts a `PluginInfo` instance that represents plugin that will be installed/uninstalled, and an `options` object.

__NOTE:__ The methods doesn't resolve the dependencies of plugin. Resolving dependencies is still the responsibility of caller.

__NOTE:__ Since `uninstall` method accepts PluginInfo instance as input parameter instead of plugin id, the caller should take care of managing/storing PluginInfo instances for future uninstalls.

##### Platform's 'actions'

    PlatformApi.prototype.build = function(buildOptions) {};
    PlatformApi.prototype.run = function(runOptions) {};
    PlatformApi.prototype.clean = function() {};
    PlatformApi.prototype.requirements = function() {};

These methods are equal to platform's executable scripts. The main difference is that they accepts a structured `options` object instead of array of command line arguments. The `options` structure is highly depends on platform's specific. The detailed list of common options see [PlatformApi reference](PlatformApi.js)

## 2. The ProjectAPI class

ProjectAPI (or CordovaProject) class - an abstraction of cordova project with multiple platforms/plugins installed. Manages the platforms and delegates the responsibilities to corresponding platform:

    Project.run -> this.platforms.foreach(platform.run);

It also does some additional job:

  * fetches plugins/platforms from any sources (git/npm/web)
  * resolves plugin dependencies
  * handles platform's restrictions (<engine> tag)

### Proposed class structure

#### Constructor

    function ProjectApi () {}

#### Static methods

    ProjectApi.getProjectAt = function (projectDir) {};

'Static' method, that gets a ProjectApi instance for specified directory. Returns a `ProjectApi` instance.

    ProjectApi.createProject = function (targetDir, appName, appId, options) {};

Initializes an empty cordova project at specified directory. Returns a promise fulfilled with a `ProjectAPI` instance.

#### Project-specific information

    ProjectApi.prototype.getProjectInfo = function () {};

Gets a ProjectInfo structure that describes the project. Similar to `PlatformApi.getPlatformInfo`

#### Platform management

    ProjectApi.prototype.addPlatform = function (platformSpec, options) {};

Adds a new platform to project. Accepts a platform spec that should be one of following:

  - valid platform name: 'android', 'windows', etc.
  - valid npm identifier, that resolves to valid platform: cordova-android@4.0
  - git url, that points to repo with valid platform: http://github.com/apache/cordova-android.git#4.0.0
  - path to local repo of valid platform: /my/cordova/repositories/cordova-android

Does all of the job, related to acquiring the platform code from NPM/git/other sources.

    ProjectApi.prototype.removePlatform = function (platformName, options) {};

Removes a platform from project.

    ProjectApi.prototype.getPlatforms = function () {};
    ProjectApi.prototype.getPlatform = function (platformName) {};

Gets all/single platform, installed into project. Returns an array of/single `PlatformApi` instance.

#### Plugins management

    ProjectApi.prototype.addPlugin = function (pluginSpec, options) {};
    ProjectApi.prototype.removePlugin = function (pluginId, options) {};

Adds/removes a plugin into/from project. Also installs/uninstalls it to/from each platform in project. Accepts a plugin spec that should be one of following:

  - valid plugin id that can be resolved through either cordova plugin registry or npm: 'org.apache.cordova.globalization', 'cordova-plugin-globalization'
  - valid npm identifier, that resolves to valid plugin: `cordova-plugin-globalization@1.0.0`
  - git url, that points to repo with valid plugin: `http://github.com/apache/cordova-plugin-globalization.git#r1.0.0`
  - path to local repo of valid plugin: `/my/cordova/repositories/cordova-plugin-globalization`

These methods also responsible for fetching plugin's source from available distribution channels and resolving plugin's dependencies.

    ProjectApi.prototype.getPlugins = function () {};
    ProjectApi.prototype.getPlugin = function (pluginId) {};

Gets all/single the plugin, installed into project. Returns an array of/single `PluginInfo` instance.

#### Project-platform integration

    ProjectApi.prototype.prepare = function (platform, prepareOptions) {};

'Prepares' a project for building specified platform/platforms. The prepare step is need to be performed to update configuration and www assets for each platform from application's ones before the application will be built. The prepare step isn't required if no configuration changes or www assets changes was made.

#### Project's 'actions'

    ProjectApi.prototype.build = function (platform, buildOptions) {};
    ProjectApi.prototype.run = function (platform, runOptions) {};
    ProjectApi.prototype.serve = function (platform, serveOptions) {};
    ProjectApi.prototype.clean = function(platform, cleanOptions) {};
    ProjectApi.prototype.requirements = function(platform) {};

These methods works as project-level platform's actions.

    PlatformApi.getPlatform(platform).build(buildOptions)

etc. The `platform` parameter is optional, and if not specified, the command works just as

    PlatformApi.getPlatforms().forEach(function (platform){
        platform.build(buildOptions);
    })

For `options` reference see [ProjectAPI](ProjectApi.js)

## `cordova-common` module

'cordova-common' module - required to share similar code between platforms and lib. Currently there are following candidates for moving to `cordova-common`:

    `superspawn`
    `ActionStack`
    `CordovaError`
    `PlatformJson`
    `ConfigParser`
    `PluginInfo`
    `PluginInfoProvider`
    `ConfigChanges`
    `ConfigKeeper`
    `ConfigFile`
    `mungeUtil`
    `xmlHelpers`

The PR for `cordova-common` module is ready and published here: https://github.com/MSOpenTech/cordova-lib/pull/3.

## Links:
PlatformApi proposal with APIs' definitions: https://github.com/cordova/cordova-discuss/pull/9
PlatformApi polyfill implementation for cordova-lib: https://github.com/MSOpenTech/cordova-lib/pull/2
`cordova-common` implementation: https://github.com/MSOpenTech/cordova-lib/pull/3

Pull requests:

- `PlatformApi` polyfill: https://github.com/MSOpenTech/cordova-lib/pull/2
- `cordova-common` implementation: https://github.com/MSOpenTech/cordova-lib/pull/3

