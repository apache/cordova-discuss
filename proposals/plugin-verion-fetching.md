# Plugin Version Fetching Proposal

## Overview

This is a proposal to improve the way we fetch plugins from npm. There is a need for us to do something beyond pinning plugin versions in cordova-lib as that does not support third party plugins. If we are solving this problem in Cordova, we can do so in a general way that improves the stability of the entire ecosystem and not just core. This proposal suggests that we add support for a mapping of plugin versions to project requirements in the plugin package.json that the CLI can check against. This would replace the current `<engine>` tag in the plugin.xml.

The reason we insert this into the package.json is that it is possible to get a package.json from npm without fetching the whole package (`npm info <plugin-package-name>`), thus preventing the need to fetch all the versions of a plugin to find a compatible version. This way the pinning information can live in the npm package rather than a centralized location like cordova-lib.

### Proposal

I propose we add this entry to the "cordova" key in the package.json for plugins:

```
cordovaDependencies:
{
    <plugin-version>:
    {
        <constraint>: <constraint-version>,
        ...,

    },
    ...
}
```

#### `<plugin-version>` allowed values
* Single version (e.g. `1.0.0`)
* Upper Bound (e.g. `<2.0.0`). This is for BIG breaking changes. For example, if we made a change to some platform that breaks compatibility with all earlier versions of a plugin, we would use this tag to retroactively update their mappings. It won't override earlier tags, just add to them. This is sugar; we could leave it out if we want to keep things simple

#### `<constraint>` allowed values:
* `cordova`
* Platforms (e.g. `cordova-android`)
* Plugins (e.g. `cordova-plugin-camera`)


#### `<constraint-version>` syntax:
* npm semver

Essentially, this compiles the plugin.xml `<engine>` tags for each version of a plugin into one handy list in package.json. Each entry in the object needs to only specify the platform versions it cares about, just like the engine tag. We can also add support for plugin dependency versions (as in the plugin.xml's `<dependency>` tag).

When the user runs `cordova plugin add <plugin-package-name>`, the CLI will check the plugin versions in descending order to examine each "engine" entry and determine if the current project can support that plugin version. It will then try and fetch the highest compatible plugin version (see [1] and [2] for high level pseudocode). The CLI must clearly indicate why the user is not getting the latest version of a plugin if it is not compatible with the current project. This can take the form of listing the engine information for the latest plugin version in some human readable way.

If a plugin version's engine information is not specified, the CLI will use the engine information for the next version down. For example, consider the following entry:

```
cordovaDependencies: {
    "0.0.1": { ... },
    "1.0.0": { ... }
}
```

Here, we have specified the project requirements of two versions of a plugin (0.0.1 and 1.0.0). All versions of the plugin between 0.0.1 and 1.0.0 are assumed to have the engine information that is specified in the 0.0.1 entry. If the current project satisfies the 0.0.1 engine information, then we get the highest version of the plugin that is greater than or equal to 0.0.1 and less than 1.0.0. This helps us to reduce the size of the mapping if the project requirements don't change across multiple releases.

Fetching should always fall back to the current behavior (fetching latest/pinned plugin versions) if there are no versions of the plugin that the project supports. This is to make sure that if some plugin developer neglects their plugin mapping, their plugin does not become impossible to install without giving a specific version. However, in this case the CLI will deliver a stern warning that the project might not build and explain what project requirements were not satisfied.

### Generating the mapping

We can include a script in plugman to generate the mapping based on old `<engine>` tags in a git repo to make it easier for other developers to opt in. For future releases, the mapping will have to be updated as part of the release step. This should mostly involve us staying up to date with the `<engine>` tag information like we have in the past and updating older versions if there were breaking changes in the platform (with a new upper bound).

While the cordova CLI version can be used as a constraint in the mapping, we should probably default to using platform constraints instead whenever possible. My reasoning here is that it is too easy for the CLI version to go out of sync with a project's installed platforms/plugins. Still, after discussing this with others offline it was made clear to me that it should be available as a constraint because it is more likely that third party plugin developers test against a CLI version rather than individual platforms.

## Pros

* Works for third party and core plugins
* Keeps plugin platform dependencies in the plugin
* Allows for more nuanced plugin fetching than pinning does (project's platform versions will be taken into account)

## Cons

* We need to be vigilant in generating this mapping and maintaining plugin.xml when making releases

## Footnotes

#### [1] Plugin Fetching behavior for `cordova plugin add`
```
If version is specified by user (i.e. '@'):
    Fetch that version
Else if version is specified in config.xml:
    Fetch that version
Else:
    If Cordova dependency constraint mappings are found in plugin's package.json:
        If some plugin version's constraint mapping is satisfied by current project:
            Let x = plugin version of highest mapping that is satisfied
            Let y = plugin version of the next mapping above x (an unsatisfied mapping)

            Fetch highest version of plugin that is >= x and < y
            Print brief explanation as to why that version was fetched
        Else:
            Fetch latest (or pinned) version of plugin
            Warn user that the project might not build
    Else:
        Fetch latest (or pinned) version of plugin (i.e. the current behavior)
```

##### [2] Logic for determining if a plugin version's constraint mapping is satisfied
```
First, add all applicable upper range constraints to this plugin version's constraint mapping (see <plugin-version> allowed values above)

If Cordova version is constrained and installed version does not satisfy semver constraint:
    return NotSatisfied
Else:
    For each platform/plugin in constraint mapping:
        If that platform/plugin is installed in project:
            If project's installed platform/plugin version satisfies the mapped semver constraint:
                Continue
            Else:
                Return NotSatisfied
        Else:
            Continue

    Return Satisfied
```
