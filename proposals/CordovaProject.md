<a name="CordovaProject"></a>
## CordovaProject
**Kind**: global class  

* [CordovaProject](#CordovaProject)
  * [new CordovaProject()](#new_CordovaProject_new)
  * [.locations](#CordovaProject+locations) : <code>Object</code>
    * [.www](#CordovaProject+locations.www) : <code>String</code>
    * [.configXml](#CordovaProject+locations.configXml) : <code>String</code>
    * [.platforms](#CordovaProject+locations.platforms) : <code>String</code>
    * [.plugins](#CordovaProject+locations.plugins) : <code>String</code>
  * [.root](#CordovaProject+root) : <code>String</code>
  * [.buildConfig](#CordovaProject+buildConfig) : <code>BuildConfig</code>
  * [.projectConfig](#CordovaProject+projectConfig) : <code>ConfigParser</code>

<a name="new_CordovaProject_new"></a>
### new CordovaProject()
Encapsulates and stores project information.

<a name="CordovaProject+locations"></a>
### cordovaProject.locations : <code>Object</code>
Simple object that exposes this project's filesystem locations, such as www  directory.

**Kind**: instance property of <code>[CordovaProject](#CordovaProject)</code>  

* [.locations](#CordovaProject+locations) : <code>Object</code>
  * [.www](#CordovaProject+locations.www) : <code>String</code>
  * [.configXml](#CordovaProject+locations.configXml) : <code>String</code>
  * [.platforms](#CordovaProject+locations.platforms) : <code>String</code>
  * [.plugins](#CordovaProject+locations.plugins) : <code>String</code>

<a name="CordovaProject+locations.www"></a>
#### locations.www : <code>String</code>
Www directory location

**Kind**: static property of <code>[locations](#CordovaProject+locations)</code>  
<a name="CordovaProject+locations.configXml"></a>
#### locations.configXml : <code>String</code>
config.xml file location

**Kind**: static property of <code>[locations](#CordovaProject+locations)</code>  
<a name="CordovaProject+locations.platforms"></a>
#### locations.platforms : <code>String</code>
Installed platforms location

**Kind**: static property of <code>[locations](#CordovaProject+locations)</code>  
<a name="CordovaProject+locations.plugins"></a>
#### locations.plugins : <code>String</code>
Installed plugins location

**Kind**: static property of <code>[locations](#CordovaProject+locations)</code>  
<a name="CordovaProject+root"></a>
### cordovaProject.root : <code>String</code>
The project's root location.

**Kind**: instance property of <code>[CordovaProject](#CordovaProject)</code>  
<a name="CordovaProject+buildConfig"></a>
### cordovaProject.buildConfig : <code>BuildConfig</code>
Represents the configuration, used for building project. Populated with  values from build.json, if exists, or with some default values,  if not.

**Kind**: instance property of <code>[CordovaProject](#CordovaProject)</code>  
<a name="CordovaProject+projectConfig"></a>
### cordovaProject.projectConfig : <code>ConfigParser</code>
Represents the project design-time and runtime configuration which stored in  project's config.xml file.

**Kind**: instance property of <code>[CordovaProject](#CordovaProject)</code>  
