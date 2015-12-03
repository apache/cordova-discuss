# Plugin Version Fetching Proposal

## Overview

This is a counterproposal to pinning plugin versions in cordova-lib. The issue with pinning plugin versions in lib is that it does not support third party plugins. If we are solving this problem in Cordova, we can do so in a general way that improves the stability of the entire ecosystem and not just core. This proposal suggests that we add support for a mapping of plugin versions to project requirements in the plugin package.json that the CLI can check against.

The reason we insert this into the package.json is that it is possible to get a package.json from npm without fetching the whole package (`npm info <plugin-package-name>`), thus preventing the need to fetch all the versions of a plugin to find a compatible version. This way the pinning information can live in the npm package rather than a centralized location like cordova-lib.

## Proposal

I propose we add this entry to the "cordova" key in the package.json for plugins:

```
cordovaDependencies: {
    <plugin version>:
        {
            cordova: <cli version>,
            android: <platform version>,
            ios: <platform version>,
            ...
        },
    ...
}
```

Essentially, this compiles the plugin.xml engine tags for each version of a plugin into one handy list in package.json. Each entry in the object needs to only specify the platform versions it cares about, just like the engine tag. Platform versions take precedence over the CLI version specified. If a plugin version's engine information is not specified, we use the engine information for the next version down.

For example, consider the following entry:

```
cordovaDependencies: {
    "0.0.1": { ... },
    "1.0.0": { ... }
}
```

All versions of the plugin from 0.0.1 to 1.0.0 are assumed to have the engine information that is specified in the 0.0.1 entry. If the current project satisfies the 0.0.1 engine information, then we get the highest version of the plugin that is greater than or equal to 0.0.1 and less than 1.0.0. Supporting ranges like these just helps to cut down on the size of the mapping.

When the user runs `cordova plugin add <plugin-package-name>`, the CLI will check the plugin versions in descending order and look at each engine entry to see if the current project can support that plugin version (see [1] for high level pseudocode). The CLI must clearly indicate why the user is not getting the latest version of a plugin if it is not compatible with the current project. This can take the form of listing the engine information for the latest plugin version in some human readable way.

### Generating the mapping

Generating the cordovaDependencies list will be automated and done automatically as a plugin is published. A script can be added to plugman that goes through a git repo and gathers the engine information from plugin.xml. This gives third party plugins an easy way of generating the mapping as well.

## Pros

* Works for third party and core plugins
* Keeps plugin platform dependencies in the plugin
* Allows for more nuanced plugin fetching than pinning does (project's platform versions will be taken into account)

## Cons

* We need to be vigilant in generating this mapping and maintaining plugin.xml when making releases

## Footnotes

[1] High level pseudocode for `cordova plugin add <plugin-package-name>`:
```
// User specified versions should always trump everything else
if(user specified a version) {
    return fetch(user's verion)
}
else if(config.xml specifies a version) {
    return fetch(config.xml's version)
}
else {
    // Fetch the plugin information from npm
    package = exec(npm info plugin-package)
    dependencies = package.cordova.cordovaDependencies

    if(!dependencies) {
        return fetch(latest plugin version)
    }
    else {
        // Search for the newest version that works with the current project
        for(pluginVersion in dependencies DESC) {

            // Version-range and platform checking logic is omitted here
            if(current project satisfies dependencies[pluginVersion]) {
                return fetch("plugin-package-name@" + pluginVersion)
            }
        }

        /*
         * We couldn't find a version that works with this project. Warn the
         * user that their project might not build and fetch latest.
         */
    }
}
```
