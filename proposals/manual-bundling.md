# Allow developers to bundle Cordova JS files manually

## Goal

Make Cordova integrate better with a modern JavaScript setup.

Basically it comes down to that Cordova should allow using node modules. This allows better integration with tooling such as:

- Package managers ([npm] / [yarn])
- Module bundlers ([webpack] / [browserify] / [rollup])
- IDEs (Atom ([autocomplete-modules], [js-hyperclick]))
- Linters ([eslint-plugin-import])
- Miscellaneous tooling ([depcheck])


## Current situation

Let's say I would like to build a Cordova app for Android using the camera plugin.

Steps:

1. Create a Cordova project using `cordova create`.
2. Remove the legacy hooks directory and obsolete .npmignore.
3. Add the desired Android platform and camera plugin.

   Now this is where things get weird.

   A directory `/platforms/android/platform_www` is created.

   Inside this folder is a file `cordova.js`, which contains a UMD bundle with the following modules:

   - `'cordova'` → https://github.com/apache/cordova-js/blob/master/src/cordova.js
   - `'cordova/exec'` → https://github.com/apache/cordova-android/blob/master/cordova-js-src/exec.js
   - `'cordova/platform'` → https://github.com/apache/cordova-android/blob/master/cordova-js-src/platform.js
   - `'cordova/android/*'` → https://github.com/apache/cordova-android/tree/master/cordova-js-src/android
   - `'cordova/plugin/android/*'` → https://github.com/apache/cordova-android/tree/master/cordova-js-src/plugin/android
   - `'cordova/*'` → https://github.com/apache/cordova-js/tree/master/src/common (except for exec and platform, not sure if they're the `_b` postfixed ones, but it doesn't really matter)

   In addition there is a `cordova_plugins.js`, which maps the plugins to a file location.

   Also there is a `plugins/cordova-plugin-camera/www/*`, which contains the files from https://github.com/apache/cordova-plugin-camera/tree/master/www, but with a `.` as a path separator, whereas in any other situation this would be a `/`.

   However, if I take a look at what the `cordova` package on npm is, it's the CLI, which is totally unrelated to the UMD bundle.
   
   In addition to `/platforms`, there's also a `/plugins` directory. This contains the following:
   
   - Copies of the plugins that already exist in `node_modules`, but with the dotfiles missing.
   - `android.json` — This appears to duplicate some info from `package.json` and `config.xml`, but in another format.
   - `fetch.json` — This appears to duplicate some info from `package.json`, but in yet another format.


## Proposal

As a modern JavaScript developer, I would like to use *<this year's popular tool>* to bundle my dependencies and code.

- Get rid of `cordova.js`.
- Get rid of `www/`.
- Get rid of `plugins/`.

### 1. Load plugins from the `node_modules` directory, not `plugins`

Cordova already downloads packages to `node_modules` using `cordova-fetch`. There's no need to maintain a copy of them in the `plugins` directory.

This also allows plugin creators to use npm dependencies for both hooks and browser code the way this would be done for other packages.

### 2. Let a developer require Cordova using its own build tools.

Based on [cordova-plugin-camera] as an example:

As a developer, I'd like to turn this:

```js
navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions)
```

Into this:

```js
import CordovaCamera from 'cordova-plugin-camera';


CordovaCamera.getPicture(cameraSuccess, cameraError, cameraOptions);
```

This can be done by adding the following to `package.json`:

```json
  "main": "www/Camera.js"
```

### 3. Use [cordova-js] as a proxy to the platform

Instead of using a custom merge of [cordova-js] and *cordova-`<platform name>`*, the Cordova platform would register itself at runtime, so *cordova-js* basically works as a proxy to the registered platform. For example:

In [cordova-android] `package.json`:

```json
  "main": "cordova-src-js/index.js"
```

In [cordova-android] `index.js`:

```js
const cordova = require('cordova-js');

const platform = require('./platform');


cordova.setPlatform(platform);
```

In the Cordova app code:

```js
// CORDOVA_PLATFORM is set by the build tool, e.g. using webpack.DefinePlugin.
require(CORDOVA_PLATFORM)
```

Plugins would make calls to `cordova-js/exec` (replacing `cordova/exec`) independant of the platform. If a developer wishes to use an outdated plugin, it's the developer's responsibility to alias `cordova/*` calls to `cordova-js/*`.


### 4. Dependency management

Cordova doesn't need to define special dependency management for plugins. `npm` can handle this.

Cordova plugins and platforms depend on the same instance of `cordova-js`. For this reason all Cordova platforms and plugins should specify `cordova-js` in their `package.json`'s `peerDependencies`.

Also if plugins depend on other plugins, this can be handled by specifying them as `peerDependencies`.


### 5. Fix up the browserify setup

I'm not very familiar with browserify, but I imagine a lot of aliasing is going on. I suppose these could be removed if everything can be loaded from `node_modules` like any other dependencies.

Even better, everything related to browserify could be removed. Instead a new hook can be introduced. Unlike other hooks, this hook *must* be implemented. This hook *must* build the web app. This hook should will receive an additional parameter attached to the context, specifying build directories for each platform it is called for.


[autocomplete-modules]: https://atom.io/packages/autocomplete-modules
[browserify]: http://browserify.org
[cordova-cli]: https://www.npmjs.com/package/cordova
[cordova-android]: https://github.com/apache/cordova-android
[cordova-plugin-camera]: https://github.com/apache/cordova-plugin-camera
[cordova-js]: https://github.com/apache/cordova-js
[depcheck]: https://github.com/depcheck/depcheck
[eslint-plugin-import]: https://github.com/benmosher/eslint-plugin-import
[js-hyperclick]: https://atom.io/packages/js-hyperclick
[npm]: https://www.npmjs.com
[rollup]: https://rollupjs.org
[webpack]: https://webpack.js.org
[yarn]: https://yarnpkg.com
