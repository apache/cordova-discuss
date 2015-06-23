
/*jshint node:true, unused:false */

var ConfigParser  = require('cordova-common').ConfigParser;
var PluginInfo  = require('cordova-common').PluginInfo;
var Requirement  = require('cordova-common').Requirement;

/**
 * Class, that acts as abstraction over particular platform. Encapsulates the
 *   platform's properties and methods.
 *
 * Platform that implements own PlatformApi instance _should implement all
 *   prototype methods_ of this class to be fully compatible with cordova-lib.
 *
 * The PlatformApi instance also should define the following field:
 *
 * * platform: String that defines a platform name.
 */
function PlatformApi() {}

/**
 * Installs platform to specified directory and creates a platform project.
 *
 * @param  {CordovaProject} cordovaProject A CordovaProject instance, that defines a
 *   project structure and configuration, that should be applied to new platform
 *   (contains platform's target location and ConfigParser instance for
 *   project's config). This argument is optional and if not defined, this means
 *   that platform is used as standalone project and is not a part of cordova
 *   project.
 * @param  {Object}  options  An options object. The most common options are:
 * @param  {String}  options.customTemplate  A path to custom template, that
 *   should override the default one from platform.
 * @param  {Boolean}  options.link  Flag that indicates that platform's sources
 *   will be linked to installed platform instead of copying.
 *
 * @return {Promise<PlatformApi>} Promise either fulfilled with PlatformApi
 *   instance or rejected with CordovaError.
 */
PlatformApi.createPlatform = function (cordovaProject, options) {};

/**
 * Gets a PlatformInfo object, that represents the platform structure.
 *
 * @return  {PlatformInfo}  A structure that contains the description of
 *   platform's file structure and other 'static' properties of platform.
 */
PlatformApi.getPlatformInfo = function () {};

/**
 * Updates installed platform with provided www assets and new app
 *   configuration. This method is required for CLI workflow and will be called
 *   each time before build, so the changes, made to app configuration and www
 *   code, will be applied to platform.
 *
 * @param {CordovaProject} cordovaProject A CordovaProject instance, that defines a
 *   project structure and configuration, that should be applied to platform
 *   (contains project's www location and ConfigParser instance for project's
 *   config).
 *
 * @return  {Promise}  Return a promise either fulfilled, or rejected with
 *   CordovaError instance.
 */
PlatformApi.prototype.prepare = function (cordovaProject) {};

/**
 * Installs a new plugin into platform. This method only copies non-www files
 *   (sources, libs, etc.) to platform. It also doesn't resolves the
 *   dependencies of plugin. Both of handling of www files, such as assets and
 *   js-files and resolving dependencies are the responsibility of caller.
 *
 * @param  {PluginInfo}  plugin  A PluginInfo instance that represents plugin
 *   that will be installed.
 * @param  {Object}  installOptions  An options object. Possible options below:
 * @param  {Boolean}  installOptions.link: Flag that specifies that plugin
 *   sources will be symlinked to app's directory instead of copying (if
 *   possible).
 * @param  {Object}  installOptions.variables  An object that represents
 *   variables that will be used to install plugin. See more details on plugin
 *   variables in documentation:
 *   https://cordova.apache.org/docs/en/4.0.0/plugin_ref_spec.md.html
 *
 * @return  {Promise}  Return a promise either fulfilled, or rejected with
 *   CordovaError instance.
 */
PlatformApi.prototype.addPlugin = function (plugin, installOptions) {};

/**
 * Removes an installed plugin from platform.
 *
 * @param  {String}  pluginId  An id of plugin that should be removed from
 *   platform.
 *
 * @return  {Promise}  Return a promise either fulfilled, or rejected with
 *   CordovaError instance.
 */
PlatformApi.prototype.removePlugin = function (pluginId) {};

/**
 * Builds an application package for current platform.
 *
 * @param  {Object}  buildOptions  A build options. This object's structure is
 *   highly depends on platform's specific. The most common options are:
 * @param  {Boolean}  buildOptions.debug  Indicates that packages should be
 *   built with debug configuration. This is set to true by default unless the
 *   'release' option is not specified.
 * @param  {Boolean}  buildOptions.release  Indicates that packages should be
 *   built with release configuration. If not set to true, debug configuration
 *   will be used.
 * @param   {Boolean}  buildOptions.device  Specifies that built app is intended
 *   to run on device
 * @param   {Boolean}  buildOptions.emulator: Specifies that built app is
 *   intended to run on emulator
 * @param   {String}  buildOptions.target  Specifies the device id that will be
 *   used to run built application.
 * @param   {Boolean}  buildOptions.nobuild  Indicates that this should be a
 *   dry-run call, so no build artifacts will be produced.
 * @param   {String[]}  buildOptions.archs  Specifies chip architectures which
 *   app packages should be built for. List of valid architectures is depends on
 *   platform.
 * @param   {String}  buildOptions.buildConfig  The path to build configuration
 *   file. The format of this file is depends on platform.
 * @param   {String[]} buildOptions.argv Raw array of command-line arguments,
 *   passed to `build` command. The purpose of this property is to pass a
 *   platform-specific arguments, and eventually let platform define own
 *   arguments processing logic.
 *
 * @return {Promise<String[]>} A promise either fulfilled with an array of build
 *   artifacts (application packages) paths if package was built successfully,
 *   or rejected with CordovaError.
 *
 * The return value in most cases will contain only one item but in some cases
 *   there could be multiple items in output array, e.g. when multiple
 *   arhcitectures is specified.
 */
PlatformApi.prototype.build = function(buildOptions) {};

/**
 * Builds an application package for current platform and runs it on
 *   specified/default device. If no 'device'/'emulator'/'target' options are
 *   specified, then tries to run app on default device if connected, otherwise
 *   runs the app on emulator.
 *
 * @param   {Object}  runOptions  An options object. The structure is the same
 *   as for build options.
 *
 * @return {Promise} A promise either fulfilled if package was built and ran
 *   successfully, or rejected with CordovaError.
 */
PlatformApi.prototype.run = function(runOptions) {};

/**
 * Cleans out the build artifacts from platform's directory.
 *
 * @return  {Promise}  Return a promise either fulfilled, or rejected with
 *   CordovaError.
 */
PlatformApi.prototype.clean = function() {};

/**
 * Performs a requirements check for current platform. Each platform defines its
 *   own set of requirements, which should be resolved before platform can be
 *   built successfully.
 *
 * @return  {Promise<Requirement[]>}  Promise, resolved with set of Requirement
 *   objects for current platform.
 */
PlatformApi.prototype.requirements = function() {};
