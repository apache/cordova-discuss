
/*jshint node:true, unused:false */

/**
 * @class Class, that acts as abstract on top of Cordova project. Encapsulates the
 *   basic properties, that represents project configuration and methods for
 *   managing the project.
 */
function ProjectApi () {}

/**
 * Gets a ProjectApi instance for specified directory.
 *
 * @param   {String}  projectDir  Path to cordova project.
 *
 * @return  {Promise<ProjectApi>}  Returns a promise either fulfilled with a
 *   Cordova project instance or rejected with CordovaError.
 */
ProjectApi.getProjectAt = function (projectDir) {};

/**
 * Initializes an empty cordova project at specified directory. Copies
 *
 * @param  {String} targetDir Path to directory, where new project will be
 *   created.
 * @param  {String} [appName = 'HelloCordova']   Application name, that will be
 *   used for '<name>' element in config.xml. If not specified, 'HelloCordova'
 *   will be used.
 * @param  {String} [appId = 'io.cordova.hellocordova']     Application id in
 *   form of reverse domain style identifier, that will be used for 'id'
 *   attribute of '<widget>' element. If not specified 'io.cordova.hellocordova'
 *   will be used.
 * @param  {Object} [options]   An options object. The most common options are:
 * @param  {String} options.wwwSource  Specifies the www assets source for new
 *   application instead of default one. If not specified, the Cordova
 *   HelloWorld assets will be used.
 * @param  {Boolean}  options.link  Specifies that www source will be symlinked
 *   to app's directory instead of copying.
 *
 * @return {Promise<ProjectApi>} Returns a promise either fulfilled with a
 *   Cordova project instance or rejected with CordovaError.
 */
ProjectApi.createProject = function (targetDir, appName, appId, options) {};

/**
 * Gets a ProjectInfo structure that describes the project.
 *
 * @return  {CordovaProject}  A CordovaProject object.
 */
ProjectApi.prototype.getProjectInfo = function () {};

/**
 * Adds a new platform to project.
 *
 * @param  {String}  platformSpec  A platform spec that should be one of
 *   following:
 *
 * - valid platform name: 'android', 'windows', etc.
 * - valid npm identifier, that resolves to valid platform: cordova-android@4.0
 * - git url, that points to repo with valid platform:
 *       http://github.com/apache/cordova-android.git#4.0.0
 * - path to local repo of valid platform:
 *     /my/cordova/repositories/cordova-android
 *
 * @param {Object}  [options] The options object. Supported properties:
 * @param {Boolean} [options.saveToProject = false]  Flag that indicates, that added platform
 *   should be saved into project configuration to be easily restored after. The
 *   approach is similar to 'npm install --save' command.
 *
 * @return {Promise} A promise either fulfilled if platform is installed
 *   successfully, or rejected with CordovaError.
 */
ProjectApi.prototype.addPlatform = function (platformSpec, options) {};

/**
 * Removes a platform from project.
 *
 * @param  {String}  platformName  A name of platform that should be removed
 *   from project.
 * @param {Object}   [options] The options object. Supported properties:
 * @param {Boolean}  [options.saveToProject = false]  Flag that indicates, that
 *   platform also should be removed from project configuration.
 *
 * @return {Promise} A promise either fulfilled if platform is removed
 *   successfully, or rejected with CordovaError.
 */
ProjectApi.prototype.removePlatform = function (platformName, options) {};

/**
 * Adds a new plugin into project. Installs it to each platform in project.
 *
 * @param  {String}  pluginSpec  A plugin spec that should be one of following:
 *
 *   - valid plugin id that can be resolved through either cordova
 *   plugin registry or npm:
 *       'org.apache.cordova.globalization', 'cordova-plugin-globalization'
 *   - valid npm identifier, that resolves to valid plugin:
 *       cordova-plugin-globalization@1.0.0
 *   - git url, that points to repo with valid plugin:
 *       http://github.com/apache/cordova-plugin-globalization.git#r1.0.0
 *   - path to local repo of valid plugin:
 *       /my/cordova/repositories/cordova-plugin-globalization
 *
 * @param  {Object}  [options]    An options object. Possible options are:
 * @param  {Boolean} saveToProject Flag that indicates, that added plugin should
 *   be saved into project configuration.
 * @param  {Boolean} link       Flag that specifies that plugin sources will be
 *   symlinked to app's directory instead of copying if possible.
 * @param  {String}  searchPath Valid path, that will be used to search for
 *   plugin in local filesystem.
 * @param  {Object}  variables  An object that represents variables that will be
 *   used to install plugin. See more details on plugin variables in
 *   documentation:
 *   https://cordova.apache.org/docs/en/4.0.0/plugin_ref_spec.md.html
 *
 * @return {Promise} A promise either fulfilled if plugin is installed
 *   successfully, or rejected with CordovaError.
 */
ProjectApi.prototype.addPlugin = function (pluginSpec, options) {};

/**
 * Removes a plugin from project.
 *
 * @param  {String}  pluginId  An id of plugin that should be removed from
 *   project.
 * @param {Object} [options] The options object. Supported properties:
 * @param {Boolean}  options.saveToProject  Flag that indicates, that plugin
 *   also should be removed from project configuration.
 *
 * @return {Promise} A promise either fulfilled if platform is removed
 *   successfully, or rejected with CordovaError.
 */
ProjectApi.prototype.removePlugin = function (pluginId, options) {};

/**
 * Gets all platforms, installed into project.
 *
 * @return  {PlatformApi[]}  An array of PlatformApi instances.
 */
ProjectApi.prototype.getPlatforms = function () {};

/**
 * Gets a platform by name
 *
 * @param   {String}  platformName  The platform name.
 *
 * @return  {PlatformApi}  PlatformApi instance for specified platform.
 */
ProjectApi.prototype.getPlatform = function (platformName) {};

/**
 * Gets all the plugins, installed into project.
 *
 * @return  {Array<PluginInfo>}  An array of PluginInfo instances.
 */
ProjectApi.prototype.getPlugins = function () {};

/**
 * Gets plugins, specified by id.
 *
 * @return  {PluginInfo}  A PluginInfo instance for specified plugin.
 */
ProjectApi.prototype.getPlugin = function (pluginId) {};

/**
 * Prepares a project for building specified platform/platforms. The prepare
 *   step is need to be performed to update configuration and www assets for
 *   each platform from application's ones before the application will be built.
 *   The prepare step isn't required if no configuration changes or www assets
 *   changes was made.
 *
 * @param   {String|String[]}  [platform]  Single platform or array of platform
 *   names, that needs to be prepared. If omitted, all platform, added to
 *   project will be prepared.
 * @param   {Object}  [prepareOptions]  An options object with following fields:
 * @param   {Boolean} prepareOptions.browserify Specifies that project should be
 *   prepared with 'browserify' flow to embed all plugins' JS files and cordova
 *   JS sources into one single file.
 *
 * @return  {Promise}  A promise either fulfilled, if platform/platforms
 *   prepared successfully, or rejected with CordovaError otherwise.
 */
ProjectApi.prototype.prepare = function (platform, prepareOptions) {};

/**
 * Builds an application package for specified platform/platforms.
 *
 * @param   {String|String[]}  [platform]  A list of platform names/single name.
 *   If not specified, builds packages for all platforms, installed into
 *   project.
 *
 * @param  {Object}  [buildOptions]  A build options. This object's structure is
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
 * @return {Promise<Object>} A promise either fulfilled with an array of build
 *   artifacts for each platform, if package was built successfully, or rejected
 *   with CordovaError. The keys of resultant object is a platform names, and
 *   values - arrays of build artifact objects. The structure of build artifacts
 *   is descriped in PlatformApi reference.
 */
ProjectApi.prototype.build = function (platform, buildOptions) {};

/**
 * Builds and runs an application package for specified platform on specified
 *   device/emulator.
 *
 * @param   {String|String[]}  [platform]  A list of platform names/single name.
 *   If omitted, method runs packages for all platforms, installed into project.
 * @param   {Object}  [runOptions]  An options object. The structure is the same
 *   as for build options.
 *
 * @return {Promise} A promise either fulfilled if application ran successfully,
 *   or rejected with CordovaError.
 */
ProjectApi.prototype.run = function (platform, runOptions) {};

/**
 * Runs an application on a local web-server and launches a browser to display
 *   application content.
 *
 * @param   {String}  [platform]      A platform to run server for.
 * @param   {Object}  [serveOptions]  A set of options to pass to serve command.
 *   Available options are:
 * @param   {Number}  serveOptions.port  A port to bind server to.
 * @param   {String}  serveOptions.target  A browser name. Available targets
 *   depends on platform. Most common are: 'chrome', 'safari', 'opera', 'firefox'.s
 *
 * @return  {Promise}  A promise either fulfilled, if server ran successfully,
 *   or rejected with CordovaError otherwise.
 */
ProjectApi.prototype.serve = function (platform, serveOptions) {};

/**
 * Cleans out the build artifacts for specified platform.
 *
 * @param   {String|String[]}  [platform]  A list of platform names/single
 *   platform, which needs to be cleaned. If not specified, run clean for all
 *   platforms, installed into project.
 * @param   {Object}  [cleanOptions]  An options object. The structure is not
 *   defined explicitly, so it can be used to pass some platfom specific vaues
 *   to platform.
 *
 * @return {Promise} A promise either fulfilled or rejected with CordovaError.
 */
ProjectApi.prototype.clean = function(platform, cleanOptions) {};

/**
 * Performs a requirements check for each platforms installed. Each platform
 *   defines its own set of requirements, which should be resolved before
 *   platform can be built successfully.
 *
 * @param   {String|String[]}  [platform]  A list of platform names/single
 *   platform, which requirements needs to be checked for.
 *
 * @return  {Promise<Requirement[]>}  Promise resolved with set of Requirement
 *   objects for each platform.
 */
ProjectApi.prototype.requirements = function(platform) {};
