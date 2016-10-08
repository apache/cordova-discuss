<a name="ProjectApi"></a>
## ProjectApi
Class, that acts as abstract on top of Cordova project. Encapsulates the  basic properties, that represents project configuration and methods for  managing the project.

**Kind**: global class  

* [ProjectApi](#ProjectApi)
  * _instance_
    * [.getProjectInfo()](#ProjectApi+getProjectInfo) ⇒ <code>CordovaProject</code>
    * [.addPlatform(platformSpec, [options])](#ProjectApi+addPlatform) ⇒ <code>Promise</code>
    * [.removePlatform(platformName, [options])](#ProjectApi+removePlatform) ⇒ <code>Promise</code>
    * [.addPlugin(pluginSpec, [options], saveToProject, link, searchPath, variables)](#ProjectApi+addPlugin) ⇒ <code>Promise</code>
    * [.removePlugin(pluginId, [options])](#ProjectApi+removePlugin) ⇒ <code>Promise</code>
    * [.getPlatforms()](#ProjectApi+getPlatforms) ⇒ <code>Array.&lt;PlatformApi&gt;</code>
    * [.getPlatform(platformName)](#ProjectApi+getPlatform) ⇒ <code>PlatformApi</code>
    * [.getPlugins()](#ProjectApi+getPlugins) ⇒ <code>Array.&lt;PluginInfo&gt;</code>
    * [.getPlugin()](#ProjectApi+getPlugin) ⇒ <code>PluginInfo</code>
    * [.prepare([platform], [prepareOptions])](#ProjectApi+prepare) ⇒ <code>Promise</code>
    * [.build([platform], [buildOptions])](#ProjectApi+build) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.run([platform], [runOptions])](#ProjectApi+run) ⇒ <code>Promise</code>
    * [.serve([platform], [serveOptions])](#ProjectApi+serve) ⇒ <code>Promise</code>
    * [.clean([platform], [cleanOptions])](#ProjectApi+clean) ⇒ <code>Promise</code>
    * [.requirements([platform])](#ProjectApi+requirements) ⇒ <code>Promise.&lt;Array.&lt;Requirement&gt;&gt;</code>
  * _static_
    * [.getProjectAt(projectDir)](#ProjectApi.getProjectAt) ⇒ <code>[Promise.&lt;ProjectApi&gt;](#ProjectApi)</code>
    * [.createProject(targetDir, [appName], [appId], [options])](#ProjectApi.createProject) ⇒ <code>[Promise.&lt;ProjectApi&gt;](#ProjectApi)</code>

<a name="ProjectApi+getProjectInfo"></a>
### projectApi.getProjectInfo() ⇒ <code>CordovaProject</code>
Gets a ProjectInfo structure that describes the project.

**Kind**: instance method of <code>[ProjectApi](#ProjectApi)</code>  
**Returns**: <code>CordovaProject</code> - A CordovaProject object.  
<a name="ProjectApi+addPlatform"></a>
### projectApi.addPlatform(platformSpec, [options]) ⇒ <code>Promise</code>
Adds a new platform to project.

**Kind**: instance method of <code>[ProjectApi](#ProjectApi)</code>  
**Returns**: <code>Promise</code> - A promise either fulfilled if platform is installed  successfully, or rejected with CordovaError.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| platformSpec | <code>String</code> |  | A platform spec that should be one of   following: - valid platform name: 'android', 'windows', etc. - valid npm identifier, that resolves to valid platform: cordova-android@4.0 - git url, that points to repo with valid platform:       http://github.com/apache/cordova-android.git#4.0.0 - path to local repo of valid platform:     /my/cordova/repositories/cordova-android |
| [options] | <code>Object</code> |  | The options object. Supported properties: |
| [options.saveToProject] | <code>Boolean</code> | <code>false</code> | Flag that indicates, that added platform   should be saved into project configuration to be easily restored after. The   approach is similar to 'npm install --save' command. |

<a name="ProjectApi+removePlatform"></a>
### projectApi.removePlatform(platformName, [options]) ⇒ <code>Promise</code>
Removes a platform from project.

**Kind**: instance method of <code>[ProjectApi](#ProjectApi)</code>  
**Returns**: <code>Promise</code> - A promise either fulfilled if platform is removed  successfully, or rejected with CordovaError.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| platformName | <code>String</code> |  | A name of platform that should be removed   from project. |
| [options] | <code>Object</code> |  | The options object. Supported properties: |
| [options.saveToProject] | <code>Boolean</code> | <code>false</code> | Flag that indicates, that   platform also should be removed from project configuration. |

<a name="ProjectApi+addPlugin"></a>
### projectApi.addPlugin(pluginSpec, [options], saveToProject, link, searchPath, variables) ⇒ <code>Promise</code>
Adds a new plugin into project. Installs it to each platform in project.

**Kind**: instance method of <code>[ProjectApi](#ProjectApi)</code>  
**Returns**: <code>Promise</code> - A promise either fulfilled if plugin is installed  successfully, or rejected with CordovaError.  

| Param | Type | Description |
| --- | --- | --- |
| pluginSpec | <code>String</code> | A plugin spec that should be one of following:   - valid plugin id that can be resolved through either cordova   plugin registry or npm:       'org.apache.cordova.globalization', 'cordova-plugin-globalization'   - valid npm identifier, that resolves to valid plugin:       cordova-plugin-globalization@1.0.0   - git url, that points to repo with valid plugin:       http://github.com/apache/cordova-plugin-globalization.git#r1.0.0   - path to local repo of valid plugin:       /my/cordova/repositories/cordova-plugin-globalization |
| [options] | <code>Object</code> | An options object. Possible options are: |
| saveToProject | <code>Boolean</code> | Flag that indicates, that added plugin should   be saved into project configuration. |
| link | <code>Boolean</code> | Flag that specifies that plugin sources will be   symlinked to app's directory instead of copying if possible. |
| searchPath | <code>String</code> | Valid path, that will be used to search for   plugin in local filesystem. |
| variables | <code>Object</code> | An object that represents variables that will be   used to install plugin. See more details on plugin variables in   documentation:   https://cordova.apache.org/docs/en/4.0.0/plugin_ref_spec.md.html |

<a name="ProjectApi+removePlugin"></a>
### projectApi.removePlugin(pluginId, [options]) ⇒ <code>Promise</code>
Removes a plugin from project.

**Kind**: instance method of <code>[ProjectApi](#ProjectApi)</code>  
**Returns**: <code>Promise</code> - A promise either fulfilled if platform is removed  successfully, or rejected with CordovaError.  

| Param | Type | Description |
| --- | --- | --- |
| pluginId | <code>String</code> | An id of plugin that should be removed from   project. |
| [options] | <code>Object</code> | The options object. Supported properties: |
| options.saveToProject | <code>Boolean</code> | Flag that indicates, that plugin   also should be removed from project configuration. |

<a name="ProjectApi+getPlatforms"></a>
### projectApi.getPlatforms() ⇒ <code>Array.&lt;PlatformApi&gt;</code>
Gets all platforms, installed into project.

**Kind**: instance method of <code>[ProjectApi](#ProjectApi)</code>  
**Returns**: <code>Array.&lt;PlatformApi&gt;</code> - An array of PlatformApi instances.  
<a name="ProjectApi+getPlatform"></a>
### projectApi.getPlatform(platformName) ⇒ <code>PlatformApi</code>
Gets a platform by name

**Kind**: instance method of <code>[ProjectApi](#ProjectApi)</code>  
**Returns**: <code>PlatformApi</code> - PlatformApi instance for specified platform.  

| Param | Type | Description |
| --- | --- | --- |
| platformName | <code>String</code> | The platform name. |

<a name="ProjectApi+getPlugins"></a>
### projectApi.getPlugins() ⇒ <code>Array.&lt;PluginInfo&gt;</code>
Gets all the plugins, installed into project.

**Kind**: instance method of <code>[ProjectApi](#ProjectApi)</code>  
**Returns**: <code>Array.&lt;PluginInfo&gt;</code> - An array of PluginInfo instances.  
<a name="ProjectApi+getPlugin"></a>
### projectApi.getPlugin() ⇒ <code>PluginInfo</code>
Gets plugins, specified by id.

**Kind**: instance method of <code>[ProjectApi](#ProjectApi)</code>  
**Returns**: <code>PluginInfo</code> - A PluginInfo instance for specified plugin.  
<a name="ProjectApi+prepare"></a>
### projectApi.prepare([platform], [prepareOptions]) ⇒ <code>Promise</code>
Prepares a project for building specified platform/platforms. The prepare  step is need to be performed to update configuration and www assets for  each platform from application's ones before the application will be built.  The prepare step isn't required if no configuration changes or www assets  changes was made.

**Kind**: instance method of <code>[ProjectApi](#ProjectApi)</code>  
**Returns**: <code>Promise</code> - A promise either fulfilled, if platform/platforms  prepared successfully, or rejected with CordovaError otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| [platform] | <code>String</code> &#124; <code>Array.&lt;String&gt;</code> | Single platform or array of platform   names, that needs to be prepared. If omitted, all platform, added to   project will be prepared. |
| [prepareOptions] | <code>Object</code> | An options object with following fields: |
| prepareOptions.browserify | <code>Boolean</code> | Specifies that project should be   prepared with 'browserify' flow to embed all plugins' JS files and cordova   JS sources into one single file. |

<a name="ProjectApi+build"></a>
### projectApi.build([platform], [buildOptions]) ⇒ <code>Promise.&lt;Object&gt;</code>
Builds an application package for specified platform/platforms.

**Kind**: instance method of <code>[ProjectApi](#ProjectApi)</code>  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A promise either fulfilled with an array of build  artifacts for each platform, if package was built successfully, or rejected  with CordovaError. The keys of resultant object is a platform names, and  values - arrays of build artifact objects. The structure of build artifacts  is descriped in PlatformApi reference.  

| Param | Type | Description |
| --- | --- | --- |
| [platform] | <code>String</code> &#124; <code>Array.&lt;String&gt;</code> | A list of platform names/single name.   If not specified, builds packages for all platforms, installed into   project. |
| [buildOptions] | <code>Object</code> | A build options. This object's structure is   highly depends on platform's specific. The most common options are: |
| buildOptions.debug | <code>Boolean</code> | Indicates that packages should be   built with debug configuration. This is set to true by default unless the   'release' option is not specified. |
| buildOptions.release | <code>Boolean</code> | Indicates that packages should be   built with release configuration. If not set to true, debug configuration   will be used. |
| buildOptions.device | <code>Boolean</code> | Specifies that built app is intended   to run on device |
| buildOptions.emulator: | <code>Boolean</code> | Specifies that built app is   intended to run on emulator |
| buildOptions.target | <code>String</code> | Specifies the device id that will be   used to run built application. |
| buildOptions.nobuild | <code>Boolean</code> | Indicates that this should be a   dry-run call, so no build artifacts will be produced. |
| buildOptions.archs | <code>Array.&lt;String&gt;</code> | Specifies chip architectures which   app packages should be built for. List of valid architectures is depends on   platform. |
| buildOptions.buildConfig | <code>String</code> | The path to build configuration   file. The format of this file is depends on platform. |
| buildOptions.argv | <code>Array.&lt;String&gt;</code> | Raw array of command-line arguments,   passed to `build` command. The purpose of this property is to pass a   platform-specific arguments, and eventually let platform define own   arguments processing logic. |

<a name="ProjectApi+run"></a>
### projectApi.run([platform], [runOptions]) ⇒ <code>Promise</code>
Builds and runs an application package for specified platform on specified  device/emulator.

**Kind**: instance method of <code>[ProjectApi](#ProjectApi)</code>  
**Returns**: <code>Promise</code> - A promise either fulfilled if application ran successfully,  or rejected with CordovaError.  

| Param | Type | Description |
| --- | --- | --- |
| [platform] | <code>String</code> &#124; <code>Array.&lt;String&gt;</code> | A list of platform names/single name.   If omitted, method runs packages for all platforms, installed into project. |
| [runOptions] | <code>Object</code> | An options object. The structure is the same   as for build options. |

<a name="ProjectApi+serve"></a>
### projectApi.serve([platform], [serveOptions]) ⇒ <code>Promise</code>
Runs an application on a local web-server and launches a browser to display  application content.

**Kind**: instance method of <code>[ProjectApi](#ProjectApi)</code>  
**Returns**: <code>Promise</code> - A promise either fulfilled, if server ran successfully,  or rejected with CordovaError otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| [platform] | <code>String</code> | A platform to run server for. |
| [serveOptions] | <code>Object</code> | A set of options to pass to serve command.   Available options are: |
| serveOptions.port | <code>Number</code> | A port to bind server to. |
| serveOptions.target | <code>String</code> | A browser name. Available targets   depends on platform. Most common are: 'chrome', 'safari', 'opera', 'firefox'.s |

<a name="ProjectApi+clean"></a>
### projectApi.clean([platform], [cleanOptions]) ⇒ <code>Promise</code>
Cleans out the build artifacts for specified platform.

**Kind**: instance method of <code>[ProjectApi](#ProjectApi)</code>  
**Returns**: <code>Promise</code> - A promise either fulfilled or rejected with CordovaError.  

| Param | Type | Description |
| --- | --- | --- |
| [platform] | <code>String</code> &#124; <code>Array.&lt;String&gt;</code> | A list of platform names/single   platform, which needs to be cleaned. If not specified, run clean for all   platforms, installed into project. |
| [cleanOptions] | <code>Object</code> | An options object. The structure is not   defined explicitly, so it can be used to pass some platfom specific vaues   to platform. |

<a name="ProjectApi+requirements"></a>
### projectApi.requirements([platform]) ⇒ <code>Promise.&lt;Array.&lt;Requirement&gt;&gt;</code>
Performs a requirements check for each platforms installed. Each platform  defines its own set of requirements, which should be resolved before  platform can be built successfully.

**Kind**: instance method of <code>[ProjectApi](#ProjectApi)</code>  
**Returns**: <code>Promise.&lt;Array.&lt;Requirement&gt;&gt;</code> - Promise resolved with set of Requirement  objects for each platform.  

| Param | Type | Description |
| --- | --- | --- |
| [platform] | <code>String</code> &#124; <code>Array.&lt;String&gt;</code> | A list of platform names/single   platform, which requirements needs to be checked for. |

<a name="ProjectApi.getProjectAt"></a>
### ProjectApi.getProjectAt(projectDir) ⇒ <code>[Promise.&lt;ProjectApi&gt;](#ProjectApi)</code>
Gets a ProjectApi instance for specified directory.

**Kind**: static method of <code>[ProjectApi](#ProjectApi)</code>  
**Returns**: <code>[Promise.&lt;ProjectApi&gt;](#ProjectApi)</code> - Returns a promise either fulfilled with a  Cordova project instance or rejected with CordovaError.  

| Param | Type | Description |
| --- | --- | --- |
| projectDir | <code>String</code> | Path to cordova project. |

<a name="ProjectApi.createProject"></a>
### ProjectApi.createProject(targetDir, [appName], [appId], [options]) ⇒ <code>[Promise.&lt;ProjectApi&gt;](#ProjectApi)</code>
Initializes an empty cordova project at specified directory. Copies

**Kind**: static method of <code>[ProjectApi](#ProjectApi)</code>  
**Returns**: <code>[Promise.&lt;ProjectApi&gt;](#ProjectApi)</code> - Returns a promise either fulfilled with a  Cordova project instance or rejected with CordovaError.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| targetDir | <code>String</code> |  | Path to directory, where new project will be   created. |
| [appName] | <code>String</code> | <code>&#x27;HelloCordova&#x27;</code> | Application name, that will be   used for '<name>' element in config.xml. If not specified, 'HelloCordova'   will be used. |
| [appId] | <code>String</code> | <code>&#x27;io.cordova.hellocordova&#x27;</code> | Application id in   form of reverse domain style identifier, that will be used for 'id'   attribute of '<widget>' element. If not specified 'io.cordova.hellocordova'   will be used. |
| [options] | <code>Object</code> |  | An options object. The most common options are: |
| options.wwwSource | <code>String</code> |  | Specifies the www assets source for new   application instead of default one. If not specified, the Cordova   HelloWorld assets will be used. |
| options.link | <code>Boolean</code> |  | Specifies that www source will be symlinked   to app's directory instead of copying. |

