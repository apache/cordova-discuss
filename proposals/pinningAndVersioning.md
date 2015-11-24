# Pinning and Versioning

## Pinning Plugins

We want to start pinning core plugins to `cordova-lib`. When a user using the `cordova-cli` runs the command `cordova plugin add cordova-plugin-device`, the version that is pinned in `cordova-lib` should be fetched from **npm** instead of fetching the `latest` tag.

This assumes:
* user has not specified a version during add step. (`cordova plugin add cordova-plugin-file@2.0.0`)
* user does not  have a version specified in `config.xml`. (`<plugin name="cordova-plugin-device" spec="2.0.0" />`)

The user specified version will always trump the pinned `cordova-lib` plugin version.

I plan on pinning the plugins in the `package.json` of `cordova-lib`.

    'cordovaPlugins' : {
    'cordova-plugin-file':'~3.0.0',
    'cordova-plugin-device':'~1.0.0'
    }

I suggest using the same pinning strategy as we currently do for platforms. `~1.0.0` would grab version `1.0.0` or the highest `patch` releases. It is essentially equivalent to `1.0.x`.These pinned versions should be reviewed and updated with each release of `cordova-cli` and `cordova-lib`.

## Why Pin?

Cordova needs to do a better job at stability. 

Currently, `cordova-cli` fetches the `latest` plugins from **npm**. When we release major updates for plugins, they may require newer versions of platforms and tools. When this happens, developers using older versions of platforms and tools will start to see `engine` tag failures when attempting to install the `latest` plugins. They will have to explicitly install older versions by running `cordova plugin add cordova-plugin-file@2.0.0`. This is useable but not ideal. Users will most likely get confused when they first see the `engine` failures.

## Versioning

Each `cordova` version (`cordova-cli/cordova-lib`) will now always have pinned plugins and platforms. We will only tell users to update their tools and advise against updating platforms and plugins independently (unless they want to live on the edge or need those bug fixes asap). This `cordova` version will be the outwards facing version users will see. 

`cordova` will still follow `SemVer`. Now, a `major` platform bump will be considered a `major` version bump for `cordova`. This will lead to a higher frequency of `major` `cordova` releases. We will try to mitigate this by trying to get platforms to release `major` updates around similar timelines, but this won't always be the case. 

Plugin version updates will be handled on a case by case basis. Most plugin updates will only require a `minor` update to `cordova`.

## Updating

Hopefully these new strategies will allow us to offer an improved updating workflow. The goal would be to have a `cordova update` command which would update the projects platforms and plugins based on what is pinned in `cordova`. A user would just have update their version of `cordova` and run the `cordova update` command on their project to be using the most up to date version of `cordova` in their projects. 

Also, part of the updating workflow would be to better support `cordova platform/plugin check` and `cordova outdated` to see which plugins and platforms can be updated. 
