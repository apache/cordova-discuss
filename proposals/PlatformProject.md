# PlatformProject and platform specific code refactoring for cordova-lib

This is based on the [PlatformProject](https://github.com/kamrik/CordovaPlatformProject) experiment 
discussed during the last Cordova hangout and described in this 
[presentation from ApacheCon](http://kamrik.org/PlatformProjectSlides/).

Corresponding mailing list discussion [is here](http://markmail.org/thread/3dw4mis4qo5d4ecz).

There are two directions in which this can be developed independently:
 1. Lower level code: Moving platform specific logic into platform repos
 1. Higher level code: Refactoring the CLI in terms of PlatformProject

## Moving platform specific logic into platform repos

Currently cordova-lib uses most of the platform specific ligic via [PlatformProjectAdapter](https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/platforms/platforms.js#L55).
Which exposes the following functions:

From `cordova/metadata/<platform>_parser.js`   e.g: [ios_parser.js](https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/metadata/ios_parser.js)

    var PARSER_PUBLIC_METHODS = [
        'config_xml',
        'cordovajs_path',
        'update_from_config',
        'update_project',
        'update_www',
        'www_dir',
    ];

From `plugman/platforms/<platform>.js`   e.g. [ios.js](https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/plugman/platforms/ios.js)

    var HANDLER_PUBLIC_METHODS = [
        'package_name',
        'parseProjectFile',
        'purgeProjectFileCache',
    ];


Actually moving the files to platform repos should be done as the last stage, most of the rearrangement needs to happen in cordova-lib before the files can be moved.

In my opinion the best model for eventually combining the common and platform-specific logic in runtime is a “mixin”. When we first instantiate the common object, we might not even have access to platform specific code because the platform files are not yet there. Once we install the platform and require the platform specific module, we can mix the logic from there into the already existing PlatformProjectAdaper (or later PlatformProject) object. 

The following should be done for each platform independently:
 * Combine the logic from `cordova/metadata/` and `plugman/platforms/`. 
   For example, the ios logic can be moved from `src/cordova/metadata/ios_parser.js` 
   and `src/plugman/platforms/ios.js` to `src/platforms/ios/something.js`
 * Along the way try to take out as much logic into common/generic modules like xml_helpers 
   (but try to make it less cordova specific) or platform specific modules of general interest for people outside cordova.
   Those modules can be later spun off to be independent npm packages just like [node-xcode](https://github.com/alunny/node-xcode) and [plist](https://github.com/TooTallNate/plist.js)
 * Use a file system wrapper like [this one](https://github.com/kamrik/cordova-lib/blob/projfs/cordova-lib/src/platforms/ProjFs.js) 
   to minimize the amount of brain dead logic messing around with checking and creating parent dirs etc. 
   This abstraction can also allow git like operations of the filesystem level if needed to avoid re-running slow tasks.
   In addition it can later become an excellent helper in profiling and testing.


## Refactoring the CLI in terms of PlatformProject
This should be fairly straightforward but will touch a lot of places in the code, and will break many of the tests that rely on mocking lower level functions.

Currently the high level parts of plugin installation logic are re-implemented in PlatformProject because the
logic in corodva-lib was too tightly integrated with fetching and action-stack so it was easier to just rewrite 
a somewhat simplified version of it.

Plugin un-installation logic needs to be added. My original idea for PlatformProject was to use it in workflows where plugins are [never uninstalled](http://kamrik.org/PlatformProjectSlides/#/13). But in order for the CLI to work as people are used to, uninstallation is definitely needed.

The above will require to store some metadata for PlatformProject instaces on the filesystem. Probably as a json file in the PlatformProject’s root dir. This file should remove the need for platform.json files currently used.




