# Separation of restore and prepare

Currently Cordova has a feature to save platform and plugins to config.xml, and
restore them when running `cordova prepare`.  While this is incredible useful
functionality, the combining of two seperable actions into a single command
leads to unexpected behaviour.  The act of restoring should be split into its
own Cordova command, unrelated to the act of preparing.

This is help by reducing the complexity of the prepare logic, and significantly
improving the performance.  Previously, we would restore a platform, prepare
it, install plugins, and then prepare again
[(CB-11589)](https://issues.apache.org/jira/browse/CB-11589).  Attempting to
fix this caused unexpected issues with plugins not being installed when adding
new platforms [(CB-11698)](https://issues.apache.org/jira/browse/CB-11698), and
the current code now has issues with calling prepare before installing plugins
rather than after installing them
[(CB-11777)](https://issues.apache.org/jira/browse/CB-11777).

The current code also results in unexpected restoring when prepare is called as
part of another command, such as build.  Someone can run `cordova prepare ios`
to restore the iOS platform and plugins, but running `cordova build ios` will
(unintuitively) restore all platforms -- without building them.


Cordova should have a `cordova restore` or `cordova install` (to match npm)
command to restore platforms and plugins.

Cordova should not restore by default when running `cordova prepare`, but could
optionally have a `--restore` flag to maintain the current behaviour.


This should happen in Cordova 7.0, coinciding with the [saving of
platforms/plugins to
package.json](https://github.com/cordova/cordova-discuss/pull/53) instead of
config.xml.
