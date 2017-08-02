We have come with a few ideas for the next major version of Cordova. 

### Goals

* Reduce maintenance burden of cordova tooling
* Refactor cordova-lib 
* Improve unit test coverage
    
### Proposed Changes

* Remove non cordova-fetch fetching code
    * remove no-fetch flag + any associated files with non cordova-fetch fetching
    * drop npm dependency
    * issue: https://issues.apache.org/jira/browse/CB-13055

* Create new `cordova install` command
    * remove restore functionality from `cordova prepare` command
    * move restore functionality into new `cordova install` command. (installing plugins/platforms listed in `package.json` and `config.xml`)
    * update docs to include `cordova install` 
    * issue: https://issues.apache.org/jira/browse/CB-11981
    * proposal: https://github.com/cordova/cordova-discuss/pull/54

* Remove plugins dir from cordova projects
This directory has traditionally been a staging directory. We copy plugins from the `plugins` directory to `platforms/platform/...` when a plugin needs to get installed. Now, these plugin directories also live in `node_modules` directory. I propose we delete the `plugins` directory and instead just copy the plugins straight from `node_modules`.
    * TODO: investigate reason why `fetch.json`, + `<platform>.json` exist and if we need them. They live in plugins directory right now.
    * https://issues.apache.org/jira/browse/CB-13059

* Remove `cordova platform save` command
This command isn't necessary anymore since we save by default since `cordova@7`. It was previously used to save added plugins and platforms to `config.xml`. 
    * **Do Now** add deprecation notice for next `cordova@7` release.
    * remove use of `cordovaProject/platforms/platforms.json`
    * axe `cordova-lib/src/cordova.platform_metadata.js`
    * issue: https://issues.apache.org/jira/browse/CB-13057

* Remove deprecated platforms (non platform api compatibile platforms).
This is just a continuation of what we started in `cordova@7`
    * **Do Now** deprecate `webos` (in cordova@7)
    * Remove `webos`, `bb10`, `ubuntu` + all associated files 
    * issue: https://issues.apache.org/jira/browse/CB-13056
    * previous `cordova@7` release
        * deprecated `bb10` & `ubuntu` https://issues.apache.org/jira/browse/CB-12674
        * removed polyfill support for previously deprecated platforms https://issues.apache.org/jira/browse/CB-11242
        * removed `firefoxos` https://github.com/apache/cordova-lib/commit/41bc8dafa928855a690c70e0b950dc72f37ac9fc
        * removed `wp8` https://github.com/apache/cordova-lib/commit/6f0a5611aadb56cb1bba8beeb3c22b45eeffc974
        * removed `amazon-fireos` https://github.com/apache/cordova-lib/commit/0d637f2d67a95ef709443eaa9d7481eb14f79b8d

* Incompatible plugins should make the build fail
Currently, if a plugin fails the engine requirement it is skipped and the build continues. It makes more sense for the build to fail and have a force flag to make the build continue if that is the intended behavior. 
    * issue: https://issues.apache.org/jira/browse/CB-12122

* `plugin add` should use `cordovaDependency` in `package.json` instead of `engine` tag in `plugin.xml` when installing plugins
The plan has always been to replace `engine` tag with `cordovaDependency`.
    * issue: https://issues.apache.org/jira/browse/CB-13123
