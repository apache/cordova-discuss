# Third-party Package Manager Support For Plugins 
- Status: Proposed

Corresponding mailing list discussion [is here](http://markmail.org/message/5qvg6rwr4nz4q7mc).

JIRA issue tracking this [is here](https://issues.apache.org/jira/browse/CB-9825)

This is not a platform specific issue, at least for cordova-ios, and
is the domain of the cordova-lib/cli currently. The
cordova-lib re-factor might change this however.

Proposed support is through the existing `<engine>` and `<framework>` tags.

## Example usage

```
<engines>
    <engine name="cocoapods" version=">=0.39.0"  platform="ios" />
    <engine name="nuget" version=">=3.2" platform="windows" />
</engines>

<framework src="path/to/mypod.podspec" type="podspec" />
<framework src="path/to/mynu.nuspec" type="nuspec" />
```

The above use [existing documented attributes](https://cordova.apache.org/docs/en/5.1.1/plugin_ref/spec.html) for both the `<engine>` and `<framework>` tags.

## Engine tag

The `name` attribute would specify the command-line package manager to be used, for example "cocoapods" or "nuget". The `version` attribute should correspond to the version of the package manager supported -- the package manager itself should support sending its version to `stdout`. In this case, the `platform` attribute supported is implicit (since cocoapods is only supported in OS X and nuget in Windows), so the attribute is superfluous.

## Framework Tag

The `src` attribute can be a relative path or a URL. The `type` attribute specifies the type of framework that corresponds to the `engine` supported. In this case type `podspec` means that the lib should be installed using the `cocoapods` package manager, and `nuspec` for the `nuget` package manager.
