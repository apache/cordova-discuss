# cordova-create breakout Proposal

status - In Progress

## Overview

Continuing the trend of breaking up cordova-lib into smaller modules, I'd like to see us break out `cordova-create`.

`cordova-create` handles creating a cordova compatible project. It also handles templates. 

This module would allow third party tools to not have to depend on `cordova` and/or `cordova-lib` to create cordova style projects. Some third party tools already have their own implementations to create a cordova style project that may differ from cordova's implementation which can cause problems.

With `cordova-create`, we also get the benefits of having a smaller module that is easier to maintain and test.

### Proposal

Break out cordova-create into its own module and publish it to npm. It will live in the `cordova-lib` repo. `cordova-create` will be a dependency of `cordova-lib` and used when creating a cordova project.

We already have a implentation ready for review at https://github.com/carynbear/cordova-create. This will have to be moved into cordova-lib's repo if this proposal is approved.

## References

* Issue: https://issues.apache.org/jira/browse/CB-11607
* Implementation: https://github.com/carynbear/cordova-create
