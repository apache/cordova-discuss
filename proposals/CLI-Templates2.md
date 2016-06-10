# CLI templates Part 2 Proposal

status - proposed

## Overview

Now that we support templates in `cordova`, I think it is time to enhance this feature a bit. Currently, it pretty much copies over all of the files from the template repo or module. This can cause problems because it doesn't usually make sense to copy over files like:

* package.json belonging to a template
* RELEASENOTES.md
* .git
* NOTICE
* LICENSE
* Copyright
* .npmignore

Files we do want:

* config.xml
* .gitignore
* node_modules
* platforms/plugins
* hooks
* merges
* other files or folders

Sometimes we do want a `package.json` copied over. `package.json` could have build scripts that are essential for the template to work. To handle this use case, template authors are suggested to put template files in a subdirectory and point to that subdirectory in `index.js`. All files in the subdirectory are copied over. 

Example: https://github.com/apache/cordova-app-hello-world/blob/master/index.js

### Proposal

Update the current template implementation to ignore the list of files above that shouldn't be copied over when using `--template`. If a subdirectory is used, copy the entire contents of the subdirectory.

If a `package.json` exists in the subdirectory, we should update its fields like we do to `config.xml`. https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/create.js#L378-L382. Only field to update in `package.json` should be `package.name`. `package.name` should be updated to use `config.name` lowercased (npm package names have to be lowercase). `config.name` is the optional third argument `cordova create` takes.

Example:
`cordova create PATH APPID NAME CONFIGOPTIONS`

Currently, package.json's version defaults to `1.0.0`. `config.xml` version seems to start at `0.0.1`. Probably a good idea to update our templates to set the initial version in `config.xml` to 1.0.0 instead. 

### Future Work

* create a how to create templates guide for docs. Talk about subdirectory as suggested method, add keyword `cordova:template`.
* create a search similar to plugins.cordova.io for templates based on the keyword.

## References
Original Proposal: https://github.com/cordova/cordova-discuss/blob/master/proposals/CLI-Templates.md
