# CocoaPods Improvement
- Status: Proposed

## Overview

The purpose of this proposal is to improve CocoaPods support by:

- Deprecate the `framework` tag usage of `type="podspec"`
- Improve readability
- Add missing default configurations

## Example End Result in `plugin.xml`
```
<podspec>
  <config>
    <source url="https://github.com/brightcove/BrightcoveSpecs.git" />
    <source url="https://github.com/CocoaPods/Specs.git"/>
  </config>

  <pods use-frameworks="true">
    <pod name="PromiseKit" />
    <pod name="Foobar1" spec="~> 2.0.0" />
    <pod name="Foobar2" git="git@github.com:hoge/foobar1.git" />
    <pod name="Foobar3" git="git@github.com:hoge/foobar2.git" branch="next" />
    <pod name="Foobar4" swift-version="4.1" />
    <pod name="Foobar5" swift-version="3.0" />
  <pods>
</podspec>
```

## New Tags
### `<podspec>`
- Available in the global scope
- Available in the platform scope
- Has no attributes
- Has a body consisting of two tags
  - `<config>`
  - `<pods>`

### `<config>`
- Available in the `podspec` tag
- Has no attributes
- Has a body consisting of `<source>` tag

### `<pods>`
- Available in the `podspec` tag
- Has `use-frameworks` attribute, of which the default value is `` (empty). The value `true` means to use.
- Has `inhibit-all-warnings` attribute, of which the default value is `` (empty). The value `true` means to use.
- Has a body consisting of `<pod>` tag


### `<source>`
- Available in the `config` tag
- Has `url` attribute
- Has no content in the body.

### `<pod>`
- Available in the `pods` tag
- Avaialble attributes:
  - `name`
  - `spec`
  - `tag`
  - `branch`
  - `commit`
  - `configurations`
  - `git`
  - `http`
  - `podspec`
  - `path`
  - `swift-version`
  - `options`

## Usage Example
### Example 1: Default Case
The `plugin.xml` fie contains:
```
<pod name="GoogleAnalytics" spec="~> 3.1" />
```

On prepare, the `Podfile` file will become:
```
pod 'GoogleAnalytics', '~> 3.1'
```

### Example 2: Spec from file path
The `plugin.xml` fie contains:
```
<pod name="Alamofire" path="~/Documents/Alamofire" />
```

On prepare, the `Podfile` file will become:
```
 pod ‘Alamofire’, :path => ‘~/Documents/Alamofire’
```

### Example 3: Options Usage
The `options` attribute value is written in a key-value pair system.

```
<pod name="Alamofire" options=":git => 'https://github.com/Alamofire/Alamofire.git', :tag => '3.1.1'" />
```

Because there are so many features that CocoaPods supplies, it would be difficult to keep track of all.  
Some of them may also be less likely used over others for example:
- svn (`:svn`) and its head (`:head`)
- mercurial (`:hg`)
- bazaar (`:bzr`).



## Extending `pods.json`
Since the current `pods.json` file only records each library spec, it must be extended to support the ability to manage the settings of each pod.

## Current File Structure
```
{
   "SwiftMessages": {
       "name": "SwiftMessages",
       "type": "podspec",
       "spec": "~> 4.1",
       "count": 1
   }
}
```


## New File Structure
```
{
    "declarations": {
      "use_frameworks!" : {
        "declaration": "use_frameworks!",
        "count": 1
      },
      "inhibit_all_warnings!": {
        "declaration": "inhibit_all_warnings!",
        "count": 1
      }
    },
    "sources": {
      "https://github.com/CocoaPods/Specs.git": {
        "source" : "https://github.com/CocoaPods/Specs.git",
        "count" : 1
      },
      …
    },
    "libraries": {
      "SwiftMessages": {
        "name": "SwiftMessages",
        "type": "podspec",
        "spec": "~> 4.1",
        "swift-version": “4.1",
        "count": 1
      }
    }
}
```
To support the new ability, the `pods.json` file will be broken into three primary sections. 

**Declarations Section**
The section will contain the overall Cocoapods declarations. For example: `use-framework`.

**Sources Section**
The source section will contain a list of known sources where pods come from. In some situations, a user may have their own private registry which contains private pods.

**Libraries Section**
This section is identical to the original file with the added properties.

### Other Notes
- The `count` parameter in the new `pods.json` file structure indicates the number of plugins having Podfile settings.
- `Podfile` is modified according to this `pods.json` file.
- All the elements with the `count > 0` is added in Podfile.
- If the same key with a different element is about to be added, only the count parameter is increased for the previous element with the same key and show warnings.

**For example**

pluginA has

```
<podspec>
  <pods>
    <pod name="Foobar1" spec="~> 2.0.0" />
  <pods>
</podspec>
```

pluginB has

```
<podspec>
  <pods>
    <pod name="Foobar1" spec="~> 3.0.0" />
  <pods>
</podspec>
```

If the developer adds pluginA and pluginB in this order, the resulting `pods.json` becomes

```
{
    "declarations": {
    },
    "sources": {
      },
    "libraries": {
      "Foobar1": {
        "name": "Foobar1",
        "type": "podspec",
        "spec": "~> 2.0.0",
        "count": 2
      }
    }
}
```

- If there is an old `pods.json` file in the project, the file should be automatically updated to the new pods.json.
- When the developer removes a plugin, the corresponding count parameter is decreased. If the count becomes zero, the element is removed.

- This new feature works only in `plugin.xml`, not in `config.xml`. This is for avoiding complexity. If we support `config.xml` we should detect all changes of `config.xml` every time when doing `cordova prepare` and find differences with previous `config.xml` settings to update `pods.json`. This process becomes very complex like a config_munge in `cordova-common` where `count` does not seem to work well.
 Supporting only `plugin.xml` is rather simple because we should check `plugin add` and `plugin rm` only. 

## Compatibility

The `framework` tag with `type="podspec"` is still available for the compatibility.

```
   <framework src="SwiftMessages" type="podspec" spec="~> 4.1" />
```

Combining new and old formula in `plugin.xml` will update Podfile.

In a later release, we can official remove the old formula compeltely.
