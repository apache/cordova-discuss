# Unified Cordova Fetching Proposal

### Current

Three existing fetching implementations.

1. Platform Fetching 
    - Platform.js https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/platform.js#L258
    - Lazy Load https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/lazy_load.js

2. Plugin Fetching

    a) cordova plugin fetching
        - plugin.js https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/plugin.js#L147
        - fetch.js https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/plugman/fetch.js
        - registry.fetch https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/plugman/registry/registry.js#L123
    b) plugman plugin fetching
        - install.js https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/plugman/install.js
        - possiblyFetch https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/plugman/install.js#L104
        - fetch.js https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/plugman/fetch.js
        - registry.fetch https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/plugman/registry/registry.js#L123

3. Template Fetching
    - create.js https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/create.js#L167
    - remote load https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/remote_load.js

Both lazy load and remote load use gitclone.js https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/gitclone.js

Currently, platforms and templates are cached at `~/.cordova/lib/npm_cache/PACKAGE`. On master, plugins are being cached to `~/.npm/PACKAGE`.

### Proposal:

* Create a new module named `cordova-fetch`. Fetches from npm and git. 
* Start using system installed `npm` instead of packaging our own `npm` in `cordoba-lib`. We already check for `git` being installed, we should do the same for `npm`. We would use  `superspawn` to shell out to the system `npm`.
* Stop using `.cordova/npm_cache/`. Modules instead get fetched to root `node_modules` directory in your applications
* Add new `--fetch` flag to `cordova` and `plugman` to use `cordova-fetch` over existing fetching methods
* Plugin/platform removal should run `npm uninstall` on your cordova projects to remove the module from the apps `node_modules` directory.
* if a `package.json` exists, adding `--save` will also add the dependency to `package.json` (as well as to `config.xml`). This won't be used until a future update is made to move save functionality from `config.xml` to `package.json`. Just adding it now for future proofing.

### New Requirements

* Have to remove support for installing plugins/platforms from git subdirectoires. https://cordova.apache.org/docs/en/5.0.0/guide/cli/#advanced-plugin-options. I recommend we add deprecation notices for this ASAP.
* Every plugin, platform and template requires a `package.json`

### Quirks

* Currently, I am using a diff of `npm ls` to determine which module was just installed. This is because the user can pass in a git url as a target to `cordova-fetch`. If the git url repo-name is different than the `package.name`, only way to get what module was just installed is by doing a diff before and after the installation. The diffing technique can fail if the user is adding a module that has already been npm installed. Luckily cordova doesn't allow adding platform/plugin which has already been added. cordova platform/plugin rm will also remove the module from the applications `node_modules` directory.
* As a fallback to the diffing method, I am taking the target or repo-name as the module name. Hopefully this won't be needed.

### Future goals

* add a package.json to cordova projects, update `cordova` to start using `package.json` instead of `config.xml`. This requires moving over a lot of properties we currently parse in `config.xml` and updating tools to look in `package.json` before checking `config.xml`.
