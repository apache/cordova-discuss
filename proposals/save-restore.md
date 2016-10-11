# Unified Cordova npm save & restore Proposal
- Status: Proposed

## Current

Existing save/restore functionality

1. `cordova plugin add/rm PLUGINNAME||gitURL||localPlugin --save`
    - adds/rms `<plugin name="cordova-plugin-device" spec="../../cordova-plugin-device" />` to `config.xml`.
    - plugin add: https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/plugin.js#L210-L235
    - plugin rm: https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/plugin.js#L291-L298
    - plugin variables: https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/plugin.js#L156-L175 & https://github.com/apache/cordova-lib/blob/master/cordova-lib/src/cordova/plugin.js#L445-L464

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

## Proposal:

* Support saving and restoring plugins/platforms in `package.json`. 
* `config.xml` is used preferences, `package.json` is used for saving & restoring.
* Introduce a new `cordova` key in `package.json` that stores an array of saved platforms and a plugins object containing saved plugins. The `cordova` key will also store plugin variables, with the key being the plugin name and the value being an object that contains the variable information. The `cordova` key is required for restoring.

Example: 
```javascript
{
...
    "dependencies": {
        "cordova-plugin-device": "^1.1.3",
        "cordova-android": "^5.2.2" 
    },
    //new cordova key
    "cordova": {
        "platforms": ["andoid","ios"],
        "plugins": {
          //store plugin variables if present
          "cordova-plugin-facebook4": {"APP_ID":"123456", "APP_NAME":"myApp"},
          "cordova-plugin-device": {}
        }
    }
...
}
```

* `--save` should save to `package.json` as well as `config.xml`. This is already possible with `cordova-fetch`. `cordova plugin/platform add/rm --save --fetch` will update `config.xml` and `package.json` if it exists. The `--fetch` flag allows us to pass the `--save` flag down to our `npm install PLUGIN/PLATFORM` command. Plugins and platforms get added as regular dependencies in `package.json` this way. The plan is to make `--fetch` default in **cordova@7**.
* `cordova plugin/platform add/rm --save` will add/rm the plugin/platform to the new `cordova` key. If your plugin has variables, they will also be added/removed to the `cordova` key in this step.
* restoring:  Look in both `config.xml` and `package.json` for plugin and platform dependencies. Use `cordova` key from `package.json` to restore. Restoring currently happens on a prepare. Restoring may become its own command in **cordova@7**. Read the proposal for that [here](https://github.com/cordova/cordova-discuss/pull/5://github.com/cordova/cordova-discuss/pull/54). 
* autosave: remove functionality. Have docs telling users they can set autosave in npm config if they want it. `npm config set save=true`. `cordova-fetch` will use system *npm*, so this *should* work, but we will have to test it.
* `cordova platform/plugin save`: Adds existing, unsaved platforms/plugins to `package.json`. Edits need to be made to the `cordova` key and `dependencies` key.

My plan is to add the new save/restore `package.json` logic alongside the existing `config.xml` logic. If your project has a `package.json`, it will start saving to it as well as `config.xml`. 

### Notes

* cordova plugin fetching logic will still be respected. If you don't specify a plugin version, the proper version based on `cordovaDependencies` will be fetched.
* cordova platform fetching logic will stay intact. cordova will grab the pinned platform version unless a different version is specified.
* cordova plugin dependency resolution will work as it currently does. This includes making sure a plugin doesn't install twice. 

### New Requirements

* Need to create a easy way to migrate `config.xml` saved platforms and plugins into `package.json`. I'm thinking this happens during the restore phase. Alternatively, we could create a new command to do it (`cordova install`).
* Automatically add `package.json` to existing cordova projects which don't have it. This would happen in `prepare`. **cordova@7** feature.

### Quirks

* Running `npm install` on your projects will fetch the dependencies in `package.json`, but a `cordova prepare` (restore) will be needed to install them to your cordova project.
* Running `npm install cordova-plugin-device` will fetch the plugin, but won't install it. `cordova plugin add cordova-plugin-device --save` will still be required. Same goes for platforms. Positive is, the plugin/platform will already be fetched.
* cordova git subdirectories syntax will not be supported anymore for adding plugins. Ex: http://cordova.apache.org/docs/en/latest/reference/cordova-cli/index.html#plugin-spec
* Need to decide if we are okay with dependencies being saved as `^4.2.0` in`package.json` vs `~4.2.0` in config.xml. This means we are telling our users it is safe to do minor plugin and platform updates when they have to restore. Our current policy has been to only allow patch updates. I think we are ready for this but lets discuss. We have gotten much better at following semver. 

### Future goals

* **Cordova@8** will drop save/restore support from `config.xml` and only use `package.json`. This should give ample time to downstreams and IDEs to prepare.

### Links

* Issues + KANBANBOARD will follow after discussion

### Motivation

1) Remove technical debt. We would remove a bunch of code in regards to managing our depenendencies and instead rely on **npm** to do the work.
2) Update to a more modern/expected system for users to manage their dependencies
3) We are going to add a `package.json`. Having a `package.json` may also encourage users to use other node modules in their development.
