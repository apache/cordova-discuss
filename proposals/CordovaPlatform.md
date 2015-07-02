<a name="CordovaPlatform"></a>
## CordovaPlatform
**Kind**: global class  

* [CordovaPlatform](#CordovaPlatform)
  * [new CordovaPlatform()](#new_CordovaPlatform_new)
  * [.locations](#CordovaPlatform+locations) : <code>Object</code>
    * [.www](#CordovaPlatform+locations.www) : <code>String</code>
    * [.configXml](#CordovaPlatform+locations.configXml) : <code>String</code>
    * [.cordovaJs](#CordovaPlatform+locations.cordovaJs) : <code>String</code>
    * [.cordovaJsSrc](#CordovaPlatform+locations.cordovaJsSrc) : <code>String</code>
  * [.root](#CordovaPlatform+root) : <code>String</code>
  * [.projectConfig](#CordovaPlatform+projectConfig) : <code>ConfigParser</code>

<a name="new_CordovaPlatform_new"></a>
### new CordovaPlatform()
Encapsulates and stores platform's information.

<a name="CordovaPlatform+locations"></a>
### cordovaPlatform.locations : <code>Object</code>
Simple object that exposes platform's filesystem locations, such as www  directory.

**Kind**: instance property of <code>[CordovaPlatform](#CordovaPlatform)</code>  

* [.locations](#CordovaPlatform+locations) : <code>Object</code>
  * [.www](#CordovaPlatform+locations.www) : <code>String</code>
  * [.configXml](#CordovaPlatform+locations.configXml) : <code>String</code>
  * [.cordovaJs](#CordovaPlatform+locations.cordovaJs) : <code>String</code>
  * [.cordovaJsSrc](#CordovaPlatform+locations.cordovaJsSrc) : <code>String</code>

<a name="CordovaPlatform+locations.www"></a>
#### locations.www : <code>String</code>
Platform's www directory location

**Kind**: static property of <code>[locations](#CordovaPlatform+locations)</code>  
<a name="CordovaPlatform+locations.configXml"></a>
#### locations.configXml : <code>String</code>
Platform's config.xml file location

**Kind**: static property of <code>[locations](#CordovaPlatform+locations)</code>  
<a name="CordovaPlatform+locations.cordovaJs"></a>
#### locations.cordovaJs : <code>String</code>
Location of cordova.js that shipped with platform.  NOTE: THIS PATH IS NOT ABSOLUTE. IT IS RELATIVE TO PLATFORM'S  ORIGINAL PACKAGE DIRECTORY, NOT THE INSTALLED PLATFORM'S LOCATION.

**Kind**: static property of <code>[locations](#CordovaPlatform+locations)</code>  
<a name="CordovaPlatform+locations.cordovaJsSrc"></a>
#### locations.cordovaJsSrc : <code>String</code>
Location of platform's cordova.js sources, shipped with platform.  NOTE: THIS PATH IS NOT ABSOLUTE. IT IS RELATIVE TO PLATFORM'S  ORIGINAL PACKAGE DIRECTORY, NOT THE INSTALLED PLATFORM'S LOCATION.

**Kind**: static property of <code>[locations](#CordovaPlatform+locations)</code>  
<a name="CordovaPlatform+root"></a>
### cordovaPlatform.root : <code>String</code>
The installed platform's root location.

**Kind**: instance property of <code>[CordovaPlatform](#CordovaPlatform)</code>  
<a name="CordovaPlatform+projectConfig"></a>
### cordovaPlatform.projectConfig : <code>ConfigParser</code>
Represents the platform's design-time and runtime configuration which  stored in config.xml file.

**Kind**: instance property of <code>[CordovaPlatform](#CordovaPlatform)</code>  
