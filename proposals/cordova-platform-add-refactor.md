As part of the ongoing focus on modernizing and improving maintainability of Cordova tooling, while also improving the developer experience of using Cordova, I'd like to propose some refactoring to how platform adding is structured. This is hopefully the first of several such cleanups.

The end functionality should be the same in the ideal case, and the API of the `cordova platform add` command should not change (except the removal of some deprecated flags perhaps).

## Platform Add

I would like to separate the implementation of platform adding into 4 steps:

1. **fetch:** Runs npm to install the platform into ./node_modules/ and add it to package.json as a devDependency, then adds it to the list of platforms in the cordova section of package.json

2. **install:** Uses the platform module from ./node_modules/ to create the platform's native project under ./platform/&lt;platform_name&gt;/

3. **plugin-setup:** Runs any installation/preparation code for plugins that need to be installed in the newly-created platform project.

3. **prepare:** Runs the platform's prepare script to copy preferences and resources from config.xml into the project

Each of these steps should be implemented as a stateless function that can be run individually and returns a Promise, which will allow for much easier unit testing and the ability to reuse these smaller steps in other cordova commands (like the proposed `cordova install` command).

What follows is the rough pseudo-code for what each of these steps should do.


### Platform Fetch
Runs npm to install the platform package into ./node_modules/ and add it to package.json as a devDependency, then adds it to the list of platforms in the cordova section of package.json

**Parameters:**
* `platform_spec : string` - A platform package specification.

  Examples:
  * `android` (meaning `cordova-android`)
  * `cordova-electron` (meaning `cordova-electron`)
  * `@dpogue/android` (meaning `@dpogue/android`)
  * `ios@^4.0.0` (meaning `cordova-ios` with version `^4.0.0`)
  * `windows@1.0.0` (meaning `cordova-windows` with version `1.0.0`)
  * `android@~6.1.0` (meaning `cordova-android` with version `~6.1.0`)

**Returns:** `Promise<string>` - A promise resolving with the name of the installed platform.

```javascript
function cordova_platform_fetch(platform_spec) {
    let platform_module = platform_spec

    // Turn "android" into "cordova-android"
    // But leave "@dpogue/whatever" as it is
    if (!platform_spec.startsWith('cordova-') && !platform_spec.startsWith('@')) {
        platform_module = 'cordova-' + platform_spec
    }

    // Get the platform name with any version specifiers stripped off
    let platform_name = platform_spec.slice(0, platform_spec.lastIndexOf('@'))

    let pkgJson = new PackageHelper('package.json')

    // TODO: See if there's an easy way to determine if the platform is already
    // installed with a matching version and avoid the npm invocation

    return Promise({
        // Use npm to install the platform as per the spec provided
        // Probably use cordova-fetch for this
        return invoke(`npm install --save-dev ${platform_module}`)
    })
    .then({
        // Save the platform name into the cordova section of package.json
        return pkgJson.addPlatform(platform_name)
    })
    .then({
        return platform_name
    })
}
```


### Platform Install
Uses a platform installed in ./node_modules/ to create the platform native project under the ./platforms/ directory.

**Parameters**
* `platform_name : string` - The name of the platform to install into the ./platforms directory.

**Returns:** `Promise<PlatformApi>` - A promise resolving with the PlatformAPI instance for the newly installed platform project.

```javascript
function cordova_platform_install(platform) {
    let platform_module = platform

    // Turn "android" into "cordova-android"
    // But leave "@dpogue/whatever" as it is
    if (!platform.startsWith('cordova-') && !platform.startsWith('@')) {
        platform_module = 'cordova-' + platform
    }


    let nativePackage = require(platform_module)

    return nativePackage.createPlatform(...)
}
```


### Platform Plugin Setup
Runs the installation/preparation code for any already-installed plugins that need to be installed in the newly-created platform native project.

This probably needs to do something along the lines of [`restoreMissingPluginsForPlatform`](https://github.com/apache/cordova-lib/blob/c8cb3c59b8e6d49ef181ed0861257fde51e054d0/src/cordova/prepare.js#L135-L191) from the existing prepare.js.


### Platform Prepare
Runs the platform's prepare script to copy preferences and resources from config.xml into the project

```javascript
function cordova_platform_prepare(platformApi) {
    return platformApi.prepare(...)
}
```


## Future work: Cordova Install

The hope is that by splitting the prepare step into multiple sub-steps, some of those sub-steps can be reused by a new [`cordova install`](https://github.com/apache/cordova-discuss/pull/54) command.

```javascript
function cordova_install() {
    let pkgJson = new PackageHelper('package.json')

    Object.entries(pkgJson.cordovaDependencies).forEach(([dependency, version]) => {
        // Do no fetching ourselves, tell the user to use npm for that
        if (!fs.existsSync('node_modules/' + dependency)) {
            throw new CordovaError(`Missing ${dependency}: Please run 'npm install'`)
        }

        let packageData = fs.readJsonSync('node_modules/' + dependency + '/package.json')

        // Ensure installed module versions match our package.json version
        if (!semverMatch(packageData.version, version)) {
            throw new CordovaError('Wrong version installed for $dep')
        }
    })


    return Promise.all(
        // Install all the platforms
        pkgJson.cordovaPlatforms.map((platform) => {
            cordova_platform_install(platform)
        })
    )
    .then({
        // Install all the plugins
        return Promise.all(
            pkgJson.cordovaPlugins.map(plugin => {
                cordova_plugin_install(plugin)
            })
        )
    })
}
```


## Open Questions

* We need to handle the projectRoot somewhere because this probably needs to get passed into every single function 😢

* I don't especially want to touch the plugin installation code as part of this, but it will probably need to undergo the same sort of refactor at some point

