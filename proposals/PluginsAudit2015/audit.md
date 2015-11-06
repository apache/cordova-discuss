# Cordova Plugins

**NOTE**: Data for this proposal was collected on October 28th, 2015. 

## Battery-Status
* 1 Month Downloads: 5116
* Open Issues: 18
* Open Pull Requests: 3
* Spec: http://www.w3.org/TR/battery-status/ 
* android 5 has the ability to grab battery info in uiwebview built in
* isPlugged is useful but not being used much
* Recommendation: Deprecate! 

## Camera
* 1 Month Downloads: 17503
* Open Issues: 85
* Open Pull Requests: 20
* Recommendation: Keep. Continue merging PRs and avoiding adding too many new features

## Console
* 1 Month Downloads: 45894
* Open Issues: 5
* Open Pull Requests: 1
* console output should show up in Xcode by default. 
* Recommendation: Move functionality back into platforms

## Contacts
* 1 Month Downloads: 6096
* Open Issues: 71
* Open Pull Requests: 10
* Spec: http://www.w3.org/TR/contacts-api/ (discontinued)
* API needs to be redone. Currently brittle and many platform specific quirks
* Recommendation: Keep. Leave it as is and revist if new Contacts API is published by W3C. Api does need to be redone, but low priority.

## Device
* 1 Month Downloads: 53695
* Open Issues: 7
* Open Pull Requests: 1
* Refactor: Update interface to be async?
* Maybe keep it the same
* Recommendation: Keep. Discuss if it makes sense to add it to hello world template as a default plugin. Add it to phonegap template. Add it as a dependency on tests that need it (Device-motion). Discuss if switching api async makes sense.

## Device Orientation (compass)
* 1 Month Downloads: 3823
* Open Issues: 8
* Open Pull Requests: 3
* No Spec
* maybe combine device-motion + compass?
* Needs better API
* rename to cordova plugin compass? 
* Recommendation: Keep. Consider renaming plugin to cordova-plugin-compass. Needs improved API but low priority.

## Device Motion (Accelerometer)
* 1 Month Downloads: 3886
* Open Issues: 8
* Open Pull Requests: 0
* spec http://www.w3.org/TR/orientation-event/
* Starting to become available in browsers http://caniuse.com/#search=orientation 
* rename to cordova-plugin-device-orientation-motion?
* low priority: polish code, update code to remove accelerometer references. 
* Recommendation: Keep. Code needs a cleanup but low priority.

## Dialogs
* 1 Month Downloads: 12456
* Open Issues: 13
* Open Pull Requests: 17
* Using custom styled divs should be used instead of alerts
* In HTML 5.1 there is a proposed dialog element which actually seems pretty good. http://www.w3.org/html/wg/drafts/html/master/single-page.html#the-dialog-element 
* looks good on android
* looks ugly on ios
* currently not sync which is how default alerts work 
* window.alert still available but says index.html
* Recommendation: Deprecate! Encourage use of HTML/CSS/JS divs instead.

## File
* 1 Month Downloads: 21252
* Open Issues: 60
* Open Pull Requests: 15
* phonegap-plugin-file or phonegap-plugin-fs. Consumes cordova-plugin-file. Create downstream version with a better interface. Current one is based on standard which is ugly. (rip shelljs file ops)
* Can we treat some urls consistency across all platforms? Possibly use Flex Air package for inspiration.
* ex: app:, temp:, 
* cdvfile wasn’t consistent enough across platforms
* Recommendation: Keep. Work on creating more consistency across platforms. Especially with cdvfile. Create phonegap-plugin-file with improved api.

## File Transfer
* 1 Month Downloads: 16597
* Open Issues: 72
* Open Pull Requests: 8
* xhr2 is an alternative
* available on all the platforms now. 
* http://caniuse.com/#search=xhr2
* Recommendation: Keep for now, but also start recommending xhr2 instead. Create tutorials using xhr2 instead of file-transfer.

## Geolocation
* 1 Month Downloads: 14709
* Open Issues: 35
* Open Pull Requests: 10
* Spec: http://dev.w3.org/geo/api/spec-source.html 
* Recommendation: Keep.

## Globalization
* 1 Month Downloads: 5108
* Open Issues: 12
* Open Pull Requests: 0
* Deprecate async calls
* query all these values at startup and provide a synchronous API to get these values
* Maybe it would be better to have JS libraries handle this?
* Recommendation: Keep. Deprecate async calls and make plugin sync.

## In-App-Browser
* 1 Month Downloads: 17904
* Open Issues: 116
* Open Pull Requests: 36
* API needs a refactor
* Cordova Webview based inappbrowser as a replacement would have big security issues if we opened up third party links in it. So we shouldn’t do it.
* Carlos suggested new inappbrowser based on safariview. He can elaborate more.
* encourage people to use it through apis instead of window.open shims
* demo of oauth workflow + demo of closing inappbrowser via js (url change)
* http://ngcordova.com/docs/plugins/oauth/
* get rid of insertcss & executescript. Use fileapi instead
* Recommendation: Keep. Needs a refactor. Remove insertcss & executescript. Encourage use through apis instead of window.open. Make demos doing oAuth. Maybe phonegap-plugin-oauth.

## Media 
* 1 Month Downloads: 6396
* Open Issues: 68
* Open Pull Requests: 19
* Too many quirks between platforms
* Maybe implement web audio api spec instead as a plugin
* web audio supported in iOS 8.4+ and Android 5+
* create web audio plugin for Android 4 to 4.4
* alternative: https://www.npmjs.com/package/cordova-plugin-nativeaudio
* Recommendation: Deprecate! Recommend using web audio api instead and look into creating a web audio api plugin to polyfill support for android 4 to 4.4. 

## Media-Capture
* 1 Month Downloads: 5092
* Open Issues: 37
* Open Pull Requests: 9
* Spec: http://www.w3.org/TR/mediacapture-streams/ (Last call draft)
* Needs a api refactor
* Issues with localization/globalization for custom UI
* Alternatives?
* https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Browser_compatibility or https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getUserMedia (deprecated)
* WebAudio can handle playing audio
* camera plugin can handle video and pics
* recording audio is missing. Options:
* https://www.npmjs.com/package/cordova-plugin-audio-recorder-api
* https://www.npmjs.com/package/cordova-plugin-audiorecorder
* Recommendation: Keep for now, but look at alternatives and see if we can deprecate. If we do want to keep it long term, it will need a big refactor to catch up to spec

## Network-Information
* 1 Month Downloads: 13418
* Open Issues: 14
* Open Pull Requests: 0
* Spec http://www.w3.org/TR/netinfo-api/ (discountinued)
* Maybe this should be extended?
* extra properties if cell data? 
* Recommendation: Keep, investigate to see if extending functionality makes sense

## Status-Bar
* 1 Month Downloads: 33072
* Open Issues: 27
* Open Pull Requests: 3
* no spec
* pretty much required for iOS
* Recommendation: Keep, add to hello world template

## SplashScreen
* 1 Month Downloads: 52474
* Open Issues: 33
* Open Pull Requests: 16
* Does two things:
    1. What device does when app is open
    2. mimic same image on screen while webview is loaded
* issue on WP: flash between these two steps
* Recommendation: Move functionality back into platforms

## Test-Framework
* 1 Month Downloads: 215
* Open Issues: 2
* Open Pull Requests: 2
* Recommendation: Keep

## Vibration
* 1 Month Downloads: 4851
* Open Issues: 14
* Open Pull Requests: 4
* Spec: http://www.w3.org/TR/vibration/
* Recommendation: Keep, but low priority

## Whitelist
* 1 Month Downloads: 92152
* Open Issues: 2
* Open Pull Requests: 3
* Android requires whitelist plugin due to native intent URI whitelisting which isn’t handled by CSP. CSP for webview whitelisting.
* iOS will just use ATS & CSP. No need for whitelist anymore.
* Windows only uses CSP
* Recommendation: Remove support for iOS due to AST, keep for Android due to intent whitelisting.

# Third Party

## Ionic Keyboard
* 1 Month Downloads: 27169
* Open Issues: 56
* Open Pull Requests: 5 
* Pretty much required for iOS dev. Should this be in core in iOS or ship with hello world?
* Recommendation: Discuss if this should be in iOS or cordova core plugin & chat with ionic about it. Maybe ship with hello world template. We would want ionic to keep taking care of it.

## Local Notifications 
* 1 Month Downloads: 265
* Open Issues: 173
* Open Pull Requests: 14
* npm package (fork) at: https://www.npmjs.com/package/cordova-plugin-local-notifications
* Github repo (original) at https://github.com/katzer/cordova-plugin-local-notifications 
* Need to help these two merge, add `ecosystem:cordova` so it shows up on search
* Recommendation: promote & contribute back to https://github.com/katzer/cordova-plugin-local-notifications 
 
## Ads
* 1 Month Downloads: 2621
* Open Issues: 64
* Open Pull Requests: 4
* npm package at https://www.npmjs.com/package/cordova-plugin-admobpro 
* Github repo at https://github.com/floatinghotpot/cordova-admob-pro 
* Recommendation: promote 
