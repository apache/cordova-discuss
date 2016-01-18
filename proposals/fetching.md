# Unified Cordova Fetching Proposal

### Current

Three existing fetching implementations.

1. Platform Fetching 
    - Platform.js https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/platform.js#L258
    - Lazy Load https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/lazy_load.js

2. Plugin Fetching
    - possiblyFetch https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/plugman/install.js#L104
    - fetch.js https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/plugman/fetch.js
    - registry.fetch https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/plugman/registry/registry.js#L123

3. Template Fetching
    - create.js https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/create.js#L167
    - remote load https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/remote_load.js

Both lazy load and remote load use gitclone.js https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/gitclone.js

Currently, platforms and templates are cached at `~/.cordova/lib/npm_cache/PACKAGE`. On master, plugins are being cached to `~/.npm/PACKAGE`.

### Proposal:

* Create a new module named `cordova-fetch`. Fetches from npm, git and local paths. 
* Start using system installed `npm` instead of packaging our own `npm` in `cordoba-lib`. We already check for `git` being installed, we should do the same for `npm`. We would use  `superspawn` to shell out to the system `npm`.
* Stop using `.cordova/npm_cache/` and instead use `.npm/` for all of our `npm caching`. This will allow us to move away from passing custom config options to npm. 
* Update existing fetching logic to use new `cordova-fetch` module.
