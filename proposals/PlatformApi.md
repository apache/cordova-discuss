<a name="PlatformApi"></a>
## PlatformApi()
Class, that acts as abstraction over particular platform. Encapsulates the  platform's properties and methods.Platform that implements own PlatformApi instance _should implement all  prototype methods_ of this class to be fully compatible with cordova-lib.The PlatformApi instance also should define the following field:* platform: String that defines a platform name.

**Kind**: global function  

* [PlatformApi()](#PlatformApi)
  * _instance_
    * [.getPlatformInfo()](#PlatformApi+getPlatformInfo) ⇒ <code>PlatformInfo</code>
    * [.prepare(cordovaProject)](#PlatformApi+prepare) ⇒ <code>Promise</code>
    * [.addPlugin(plugin, installOptions)](#PlatformApi+addPlugin) ⇒ <code>Promise</code>
    * [.removePlugin(plugin)](#PlatformApi+removePlugin) ⇒ <code>Promise</code>
    * [.build(buildOptions)](#PlatformApi+build) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.run(runOptions)](#PlatformApi+run) ⇒ <code>Promise</code>
    * [.clean()](#PlatformApi+clean) ⇒ <code>Promise</code>
    * [.requirements()](#PlatformApi+requirements) ⇒ <code>Promise.&lt;Array.&lt;Requirement&gt;&gt;</code>
  * _static_
    * [.createPlatform(cordovaProject, options)](#PlatformApi.createPlatform) ⇒ <code>[Promise.&lt;PlatformApi&gt;](#PlatformApi)</code>
    * [.updatePlatform(cordovaProject, options)](#PlatformApi.updatePlatform) ⇒ <code>[Promise.&lt;PlatformApi&gt;](#PlatformApi)</code>

<a name="PlatformApi+getPlatformInfo"></a>
### platformApi.getPlatformInfo() ⇒ <code>PlatformInfo</code>
Gets a PlatformInfo object, that represents the platform structure.

**Kind**: instance method of <code>[PlatformApi](#PlatformApi)</code>  
**Returns**: <code>PlatformInfo</code> - A structure that contains the description of  platform's file structure and other 'static' properties of platform.  
<a name="PlatformApi+prepare"></a>
### platformApi.prepare(cordovaProject) ⇒ <code>Promise</code>
Updates installed platform with provided www assets and new app  configuration. This method is required for CLI workflow and will be called  each time before build, so the changes, made to app configuration and www  code, will be applied to platform.

**Kind**: instance method of <code>[PlatformApi](#PlatformApi)</code>  
**Returns**: <code>Promise</code> - Return a promise either fulfilled, or rejected with  CordovaError instance.  

| Param | Type | Description |
| --- | --- | --- |
| cordovaProject | <code>CordovaProject</code> | A CordovaProject instance, that defines a   project structure and configuration, that should be applied to platform   (contains project's www location and ConfigParser instance for project's   config). |

<a name="PlatformApi+addPlugin"></a>
### platformApi.addPlugin(plugin, installOptions) ⇒ <code>Promise</code>
Installs a new plugin into platform. This method only copies non-www files  (sources, libs, etc.) to platform. It also doesn't resolves the  dependencies of plugin. Both of handling of www files, such as assets and  js-files and resolving dependencies are the responsibility of caller.

**Kind**: instance method of <code>[PlatformApi](#PlatformApi)</code>  
**Returns**: <code>Promise</code> - Return a promise either fulfilled, or rejected with  CordovaError instance.  

| Param | Type | Description |
| --- | --- | --- |
| plugin | <code>PluginInfo</code> | A PluginInfo instance that represents plugin   that will be installed. |
| installOptions | <code>Object</code> | An options object. Possible options below: |
| installOptions.link: | <code>Boolean</code> | Flag that specifies that plugin   sources will be symlinked to app's directory instead of copying (if   possible). |
| installOptions.variables | <code>Object</code> | An object that represents   variables that will be used to install plugin. See more details on plugin   variables in documentation:   https://cordova.apache.org/docs/en/4.0.0/plugin_ref_spec.md.html |

<a name="PlatformApi+removePlugin"></a>
### platformApi.removePlugin(plugin) ⇒ <code>Promise</code>
Removes an installed plugin from platform.Since method accepts PluginInfo instance as input parameter instead of plugin  id, caller shoud take care of managing/storing PluginInfo instances for  future uninstalls.

**Kind**: instance method of <code>[PlatformApi](#PlatformApi)</code>  
**Returns**: <code>Promise</code> - Return a promise either fulfilled, or rejected with  CordovaError instance.  

| Param | Type | Description |
| --- | --- | --- |
| plugin | <code>PluginInfo</code> | A PluginInfo instance that represents plugin   that will be installed. |

<a name="PlatformApi+build"></a>
### platformApi.build(buildOptions) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Builds an application package for current platform.

**Kind**: instance method of <code>[PlatformApi](#PlatformApi)</code>  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - A promise either fulfilled with an array of build  artifacts (application packages) if package was built successfully,  or rejected with CordovaError. The resultant build artifact objects is not  strictly typed and may conatin arbitrary set of fields as in sample below.```{  architecture: 'x86',  buildType: 'debug',  path: '/path/to/build',  type: 'app'}```The return value in most cases will contain only one item but in some cases  there could be multiple items in output array, e.g. when multiple  arhcitectures is specified.  

| Param | Type | Description |
| --- | --- | --- |
| buildOptions | <code>Object</code> | A build options. This object's structure is   highly depends on platform's specific. The most common options are: |
| buildOptions.debug | <code>Boolean</code> | Indicates that packages should be   built with debug configuration. This is set to true by default unless the   'release' option is not specified. |
| buildOptions.release | <code>Boolean</code> | Indicates that packages should be   built with release configuration. If not set to true, debug configuration   will be used. |
| buildOptions.device | <code>Boolean</code> | Specifies that built app is intended   to run on device |
| buildOptions.emulator: | <code>Boolean</code> | Specifies that built app is   intended to run on emulator |
| buildOptions.target | <code>String</code> | Specifies the device id that will be   used to run built application. |
| buildOptions.nobuild | <code>Boolean</code> | Indicates that this should be a   dry-run call, so no build artifacts will be produced. |
| buildOptions.archs | <code>Array.&lt;String&gt;</code> | Specifies chip architectures which   app packages should be built for. List of valid architectures is depends on   platform. |
| buildOptions.buildConfig | <code>String</code> | The path to build configuration   file. The format of this file is depends on platform. |
| buildOptions.argv | <code>Array.&lt;String&gt;</code> | Raw array of command-line arguments,   passed to `build` command. The purpose of this property is to pass a   platform-specific arguments, and eventually let platform define own   arguments processing logic. |

<a name="PlatformApi+run"></a>
### platformApi.run(runOptions) ⇒ <code>Promise</code>
Builds an application package for current platform and runs it on  specified/default device. If no 'device'/'emulator'/'target' options are  specified, then tries to run app on default device if connected, otherwise  runs the app on emulator.

**Kind**: instance method of <code>[PlatformApi](#PlatformApi)</code>  
**Returns**: <code>Promise</code> - A promise either fulfilled if package was built and ran  successfully, or rejected with CordovaError.  

| Param | Type | Description |
| --- | --- | --- |
| runOptions | <code>Object</code> | An options object. The structure is the same   as for build options. |

<a name="PlatformApi+clean"></a>
### platformApi.clean() ⇒ <code>Promise</code>
Cleans out the build artifacts from platform's directory.

**Kind**: instance method of <code>[PlatformApi](#PlatformApi)</code>  
**Returns**: <code>Promise</code> - Return a promise either fulfilled, or rejected with  CordovaError.  
<a name="PlatformApi+requirements"></a>
### platformApi.requirements() ⇒ <code>Promise.&lt;Array.&lt;Requirement&gt;&gt;</code>
Performs a requirements check for current platform. Each platform defines its  own set of requirements, which should be resolved before platform can be  built successfully.

**Kind**: instance method of <code>[PlatformApi](#PlatformApi)</code>  
**Returns**: <code>Promise.&lt;Array.&lt;Requirement&gt;&gt;</code> - Promise, resolved with set of Requirement  objects for current platform.  
<a name="PlatformApi.createPlatform"></a>
### PlatformApi.createPlatform(cordovaProject, options) ⇒ <code>[Promise.&lt;PlatformApi&gt;](#PlatformApi)</code>
Installs platform to specified directory and creates a platform project.

**Kind**: static method of <code>[PlatformApi](#PlatformApi)</code>  
**Returns**: <code>[Promise.&lt;PlatformApi&gt;](#PlatformApi)</code> - Promise either fulfilled with PlatformApi  instance or rejected with CordovaError.  

| Param | Type | Description |
| --- | --- | --- |
| cordovaProject | <code>CordovaProject</code> | A CordovaProject instance, that defines a   project structure and configuration, that should be applied to new platform   (contains platform's target location and ConfigParser instance for   project's config). This argument is optional and if not defined, this means   that platform is used as standalone project and is not a part of cordova   project. |
| options | <code>Object</code> | An options object. The most common options are: |
| options.customTemplate | <code>String</code> | A path to custom template, that   should override the default one from platform. |
| options.link | <code>Boolean</code> | Flag that indicates that platform's sources   will be linked to installed platform instead of copying. |

<a name="PlatformApi.updatePlatform"></a>
### PlatformApi.updatePlatform(cordovaProject, options) ⇒ <code>[Promise.&lt;PlatformApi&gt;](#PlatformApi)</code>
Updates already installed platform.

**Kind**: static method of <code>[PlatformApi](#PlatformApi)</code>  
**Returns**: <code>[Promise.&lt;PlatformApi&gt;](#PlatformApi)</code> - Promise either fulfilled with PlatformApi  instance or rejected with CordovaError.  

| Param | Type | Description |
| --- | --- | --- |
| cordovaProject | <code>CordovaProject</code> | A CordovaProject instance, that   defines a project structure and configuration, that should be applied to   new platform (contains platform's target location and ConfigParser instance   for project's config). This argument is optional and if not defined, this   means that platform is used as standalone project and is not a part of   cordova project. |
| options | <code>Object</code> | An options object. The most common options are: |
| options.customTemplate | <code>String</code> | A path to custom template, that   should override the default one from platform. |
| options.link | <code>Boolean</code> | Flag that indicates that platform's sources   will be linked to installed platform instead of copying. |

