After some long sessions, Simon, Jesse and Steve have come up with some recommendations on plugins. Please read through and provide feedback on this pull request. Some of these recommendations will need to be broken up into their own proposals. 

* [Audit](audit.md)
* [Downloads](charts/downloads)
* [Defects & Pull Requests](charts/Issues/Issues+PRs_Jan'17.png)
 
**NOTE**: Data for this proposal was collected on October 28th, 2015.
 

# Cordova Plugins:
## Keep:
* Camera
* Contacts (needs refactor but low priority)
* Device
* Device Motion (needs more discussion, low priority)
* Device Orientation (rename, low priority)
* File
* File-Transfer
* Geolocation
* Globalization (make sync, available at startup)
* In-App-Browser (refactor)
* Media Capture (needs more discussion)
* Network-Information (investigate extending)
* Status Bar
* Test-Framework
* Vibration (low priority, low maintenance) 
* Whitelist (remove iOS support since AST takes over)

## Deprecate:
* Battery-Status
* Dialogs (Should use HTML/CS/JS dialogs instead)
* Media (Suggest alternatives + webAudio)

## Integrate into core platforms:
* Console
* Splashscreen

## Add to hello world template as default plugins:
* Status Bar
* Device (Need to discuss)

## Recommendation Highlights:
* **In-App-Browser**: Needs a refactor. Remove insertcss & executescript. Encourage use through apis instead of window.open.
* **Media-capture**: Look at alternatives and see if we can deprecate. If we do want to keep it long term, it will need a big refactor to catch up to spec
* **Media**: Recommend using web audio api instead and look into creating a web audio api plugin to polyfill support for android 4 to 4.4. 
* **Globalization**: Deprecate async calls and make plugin sync.
* **File-Transfer**: Start recommending xhr2 instead. Create tutorials using xhr2 instead of file-transfer.
* **Device-Orientation**: Consider renaming plugin to cordova-plugin-compass. Needs improved API but low priority.
* **Whitelist**: Remove support for iOS due to AST, keep for Android due to intent whitelisting. [Proposal](https://github.com/cordova/cordova-discuss/pull/2://github.com/cordova/cordova-discuss/pull/27)

# Third Party Plugins Recommendations:
* **cordova-plugin-ionic-keyboard**: Discuss if this should be installed by deafault for iOS apps. If so, should it be a cordova core plugin? Should it ship with hello world template or be included in ios core? We would want ionic to keep taking care of it.
* **cordova-plugin-local-notifications**: promote & contribute back to https://github.com/katzer/cordova-plugin-local-notifications
* **cordova-admob-pro**: Promote https://github.com/floatinghotpot/cordova-admob-pro

To view more info on recommendation and stats on downloads, open PRs and open issues, please view the full [audit](audit.md). Every plugin has a recommendation. 

# Deprecation process
Update readmes of those plugins with notice of deprecation and possibly suggesting alternatives. Remove components from JIRA and stop any current or future work on them. Encourage people from the community to take ownership by forking if desired. 

Feedback requested!
