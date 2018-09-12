# Swift Plugin Support
- Status: Completed

## Overview

The purpose of this proposal is to support iOS plugin written by Swift.
I propose introducing two functions. 

- The first function will edit the `Bridging-Header.h` according to the settings defined in `plugin.xml`. 

- The second is setting the application’s Swift version according to the settings defined in `config.xml`.

Note that we can specify the Swift version for the application. Plugins with different Swift version can not be imported simultaneously. This is contrary with CocoaPod libraries in which Swift version can be specified for each.


## Bridging-Header

Introduce the `BridgingHeader` type attribute value in the `header-file` tag in plugin.xml

ex.
```
<header-file src="src/ios/Hoge-Bridging-Header.h" type="BridgingHeader" />
```

This specification is similar to the proposal https://issues.apache.org/jira/browse/CB-10071 where the value is `SwiftObjcBridgingHeader`. The specification here is little simpler.

When the `type` attribute is set to `BridgingHeader`, the `Bridging-Header.h` file, located in cordova-ios template is updated as

```
#import <Cordova/CDV.h>
#import "Plugins/cordova-plugin-xxxx/Hoge-Bridging-Header.h"
```

This new feature, i.e. updating `Bridging-Header.h` file, is working at 

`after plugin add`
`after plugin rm`


Do not introduce any other auxiliary files such as ios.json to manage plugins' BridgingHeader files.
Therefore if two plugins specify the sample BridgingHeader file, although this hardly occurs, `updated Bridging-Header.h` becomes as follows,

```
#import <Cordova/CDV.h>
#import "Plugins/cordova-plugin-xxxx/Hoge-Bridging-Header.h"
#import "Plugins/cordova-plugin-xxxx/Hoge-Bridging-Header.h"
```

After removing one plugin, this becomes

```
#import <Cordova/CDV.h>
#import "Plugins/cordova-plugin-xxxx/Hoge-Bridging-Header.h"
```

## Select application swift version

Introducing the `SwiftVersion` preference tag option in `config.xml`.

ex.
```
<preference name="SwiftVersion" value="4.1" />
```

This specifies the Swift version of the application, by calling the Xcode module. This is set after the following command(s):

`cordova prepare`

Do not introduce any other auxiliary files such as ios.json to manage which swift versions is fixed or not.
Therefore updating swift version is performed every time after doing `cordova prepare` if the above preference exists in `config.xml`.
