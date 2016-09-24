# Unified Cordova npm save & restore Proposal
- Status: Proposed

### Current

Existing save/restore functionality

1. `cordova plugin add/rm PLUGINNAME||gitURL||localPlugin --save`
    - adds/rms `<plugin name="cordova-plugin-device" spec="../../cordova-plugin-device" />` to `config.xml`.
    - plugin add: https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/plugin.js#L210-L235
    - plugin rm: https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/plugin.js#L291-L298

2. `cordova platform add/rm Platform||gitURL||localPath --save`
    - adds/rms `<engine name="ios" spec="~4.2.1" />` to `config.xml`
    - platform rm: https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/platform.js#L247-L263
    - platform add: https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/platform.js#L227-L238

3. `cordova platform/plugin save`
    - adds installed but not saved plugins + platforms to `config.xml`
    - platforms: https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/platform.js#L247-L263
    - plugins: https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/plugin.js#L409-L451

4. autosave for platforms and plugins (didn't test, not documented)
    - manually create .cordova/config.json, add `"auto_save_plugins":"true"` and `"auto_save_platforms":"true"`
    - https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/platform.js#L76
    - https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/plugin.js#L538-L542
 
5. `cordova prepare` restores missing plugins and platforms based on `config.xml`
    - https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/restore-util.js
    - https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/prepare.js#L46
    - https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/prepare.js#L66

### Proposal:

* Move saved plugins/platforms to `package.json`. Introduce new `cordova` key in `package.json` that stores what plugins and platforms have been saved. This is required for restoring.

```javascript
{
...
    "dependencies": {
        "cordova-plugin-device": "^1.1.3",
        "cordova-android": "^5.2.2" 
    }
    "cordova": {
        "platforms": ["andoid"],
        "plugins": ["cordova-plugin-device"]
    }
...
}
```

* Update `--save` logic to save to `package.json`. `cordova-fetch` allows us to pass the `--save` flag down to our `npm install PLUGIN/PLATFORM` command. Plugins and Platforms get added as regular dependencies in `package.json` this way. `cordova plugin/platform add/rm` would also add/rm the plugin/platform to/from the new `cordova` key in `package.json`.
* autosave: remove functionality. Have docs telling users they can set autosave in npm config if they want it. `npm config set save=true`. `cordova-fetch` will use system *npm*, so this *should* work, but we will have to test it.
* restore: continue restoring during prepare. Instead of looking in `config.xml`, look in `package.json` at `cordova` key.
* cordova platform/plugin save: Adds existing, unsaved platforms/plugins to package.json's `cordova` key and edits `dependencies` with platoform/plugins + versions.
* cordova plugin fetching logic will still be respected. If you don't specify a version, the proper version based on `cordovaDependencies` will be fetched.
* cordova platform fetching logic will also stay intact. cordova will grab the pinned platform version unless a different version is specified. 

My plan is to keep the existing save/restore `config.xml` logic for cordova@6.x and start adding the `package.json` logic beside it. If your project has a `package.json`, it will start saving to it as well as `config.xml`. In cordova@7, I want to rip out saving to `config.xml` logic. 

The reason for this change is to add `package.json` in a standard cordova app and have it work as it would in a node style project. This will lead to cordova developers able to use npm modules while building their apps. 

### New Requirements

* Need to create a easy way to migrate `config.xml` saved platforms and plugins into `package.json`. I'm thinking this happens during the restore phase which runs on prepare. Alternatively, we could create a new command to do it. 
* Automatically add `package.json` to existing cordova projects which don't have it. 

### Quirks

* Running `npm install` on your projects will fetch the dependencies in `package.json`, but a `cordova prepare` (restore) will be needed to install them to your cordova project.
* Running `npm install cordova-plugin-device` will fetch the plugin, but won't install it. `cordova plugin add cordova-plugin-device --save` will still be required. Same goes for platforms. Positive is, the plugin/platform will already be fetched.
* cordova git subdirectories syntax will not be supported anymore for adding plugins. Ex: http://cordova.apache.org/docs/en/latest/reference/cordova-cli/index.html#plugin-spec

### Future goals

* Cordova@7 will drop save/restore support from `config.xml` and only use `package.json`

### Links

* Issues + KANBANBOARD will follow after discussion
