# Android Studio Project Structure Migration


JIRA issue tracking this is [here](https://issues.apache.org/jira/browse/CB-11244)

Currently our existing Android projects have the old Android Project structure
created by default, even for new projects, which makes no sense since we no
longer support Eclipse as the default project editor and have moved to Android
Studio for Android development.

The main reason for doing this is to clean up dependencies and to allow for
projects and dependencies to work more like how modern Android projects work
and to remove as much custom Gradle code as possible. This would also allow us
in the future to move towards having Android Plugin code work as Android
Libraries with Resources instead of just copying things across, which gives us
the ability to add JUnit tests and bundled resources. This would dramatically
increase the quality of plugins such as InAppBrowser, and third party plugins
such as the Barcode Scanner.

This would have to be done on the next major version, and the upgrade would be
tricky to do. However, the benefits at this point would greatly outweigh the
costs of maintaining the old project structure. The old cordova-common code in
Cordova-Android 5.0.x would allow for plugins in the short term to work with
both projects until we get the new project structure ready.

This change would require the following change to cordova-lib, which can be found
on this repository [here](https://github.com/infil00p/cordova-lib/commit/73d6fc0d0290de0b6d341b60a02ffe1e4fce1d3f)


