# Play Services Version Proposal

- Status: Proposed

## Overview
This is a proposal to offer an alternative solution for [CB-13145](https://issues.apache.org/jira/browse/CB-13145).

## Problem
Plugins using different versions of Google Play Services or the `+` to indicate range cause gradle to error out with the following error:

```
> Failed to apply plugin [id 'com.google.gms.google-services']
   > For input string: "+"
```

## Potential Solution
Currently, the proposed solution is to create an Android only preference in `config.xml` to control the version of Google Play Services for the whole project. For instance, `config.xml` would look like this:
`<preference name = "PlayServicesVersion" value = "11.0.0"/>`

Then if, for example, the `phonegap-plugin-push` wanted to include FCM libraries in `plugin.xml`, it would contain:
`<framework src="com.google.firebase:firebase-messaging:$PlayServicesVersion"/>`

If the `cordova-plugin-google-analytics` wanted to include Play Services in its `plugin.xml` it would contain:
`<framework src="com.google.android.gms:play-services-analytics:$PlayServicesVersion"/>`

These plugins would both use the same version of Google Play Services. This gets around the problem of plugins using `+` in the framework tag (which isn't supported anymore) or having the two plugins pin different versions of Play Services (gradle errors with that).

## Proposal
We want to use a generic way to define variables in `config.xml` that `plugin.xml` can use. We propose extending the variable tag. Below is the current variable tag.

```
<plugin name="cordova-plugin-device" spec="^1.1.0">
    <variable name="MY_VARIABLE" value="my_variable_value" />
</plugin>

```

The current variable tag goes in and finds `MY_VARIABLE` in `plugin.xml` of `cordova-plugin-device` and replaces it with the value.

In order to extend the variable tag, we will need to:

1. Allow the variable tag to be declared outside of a plugin tag (not nested/root level).

```
<variable name="MY_VARIABLE" value="my_variable_value" />
```

2. Run it against every plugin as it is getting installed.

The original solution assumes that both plugin authors are using the same preference name (PlayServicesVersion) and expects the application author to add it to the `config.xml`. 

The plugin should auto add the variable it needs to `config.xml` if a default isn't there. So assuming we want `<variable name="PlayServicesVersion" value="11.0.1" />` in `config.xml`, it would get auto added by `plugin.xml` if it doesn't already exist. If it does exist, don't touch it.

We are still dependent on the plugin authors to use the standardized variables. So in this case, both plugin authors would have to use PlayServicesVersion in their plugin.xml


## Links
* https://issues.apache.org/jira/browse/CB-13145
* http://cordova.apache.org/docs/en/latest/config_ref/index.html