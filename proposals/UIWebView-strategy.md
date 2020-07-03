UIWebView Strategy for Cordova iOS
==================================

As of August 2019, Apple is now showing a deprecation warning when uploading apps to the App Store that include UIWebView-related code. UIWebView has been unofficially deprecated in favour of the new WKWebView for a while, but Apple has now made it officially deprecated. As a result, all Cordova apps built for iOS will receive this deprecation warning on upload. Currently it is just a warning, but Apple has not provided a timeline for when it will start rejecting apps that use UIWebView APIs.

We've had [a plan](https://cordova.apache.org/news/2018/08/01/future-cordova-ios-webview.html) for several years to make it easier to migrate to WKWebView and eventually deprecate UIWebView use by Cordova, but almost no progress has been made on this objective since the plan was outlined over a year ago.

Cordova users are clamoring for a fix to the problem and there are pull requests open to remove UIWebView entirely, but if we proceed without a concrete plan then we are guaranteed to cause a lot of pain and suffering for Cordova users.

The goal of this document is to outline several potential migration plans, and facilitate discussion on the pros and cons of each.


High-Level Goals
----------------

* Make WKWebView the default web view for Cordova iOS applications
* Make it possible to build Cordova iOS apps without including any UIWebView APIs
* Maintain compatibility as much as possible with existing plugins
* Provide a means for Cordova apps to transition from UIWebView to WKWebView


Challenges
----------

* UIWebView-related classes are potentially part of the public API exposed to plugins
* Moving all apps over to WKWebView will result in data being lost (localStorage, indexedDB, etc.)
* WKWebView does not support all the same features as UIWebView and has stricter security requirements, and **many existing Cordova iOS apps will not work if run in WKWebView** without changes
* The current WKWebView plugin needs updates to use Scheme Handlers to avoid issues that require a local web server.
* The InAppBrowser plugin also uses UIWebView. Moving to WKWebView would potentially lose some functionality.
    * Ideally, the InAppBrowser should be deprecated in favour of SFSafariViewController which severely restricts functionality in the name of security. Currently InAppBrowser use could largely be considered bad practice.
* Few contributors with very limited time, and significant work to be done to implement any of these strategies


Cordova-iOS Migration Options
-----------------------------

### 1. Cordova-iOS 6 drops UIWebView entirely

This is probably the easiest option, but is also a very large breaking change that potentially breaks existing plugins and existing apps.

The steps are roughly:

1. Move the existing WKWebView plugin into cordova-ios.
2. Update to use Scheme Handlers with WKWebView.
3. Remove all the existing UIWebView code.


### 2. Cordova-iOS 6 defaults to WKWebView, with option to disable UIWebView

This is a more gradual transition, closer to what had originally been announced, but runs the risk of Apple setting a rejection deadline that's more aggressive than what we're able to meet.

The steps are roughly:

1. Move the existing WKWebView plugin into cordova-ios, with a preference to pick the webview engine.
2. Update to use Scheme Handlers with WKWebView.
3. Update the "Hello Cordova" template to have the webview preference default to WKWebView.
4. Add warnings to cordova-ios for apps that are using the UIWebView preference.
5. Wrap all the UIWebView code behind a compiler definition that can be controlled by a preference, to allow disabling all the UIWebView code.
6. [Next Major] Disable the UIWebView code by default, but allow it to be enabled by the preference for apps that require it.


InAppBrowser Migration Options
------------------------------

### 1. Drop UIWebView code entirely

As above, this is easiest, but a potentially breaking change for existing apps.

### 2. Pick webview based on preference

Similar to above, the webview would be determined based on a config.xml preference. The UIWebView code would also need to be conditionally guarded by a compiler definition.

Steps would be:

1. Update IAB plugin to pick the webview based on the config.xml preference.
2. Wrap the UIWebView code in compiler definitions that are controlled by a preference, matching cordova-ios.


### 3. Deprecated IAB

Probably also a major breaking change, but this would be better in the long term.

An ideal scenario would be to integrate SFSafariViewController into Cordova-iOS (rather than as a plugin) and allow any URL that is not in the allow-navigation list to open in SFSafariViewController automatically. Apps would lose the ability to customize the page, but that has been a major security concern for years (particularly around OAuth login pages).

> Out of scope, but if this is the decided strategy, Cordova-Android should also be updated to use Chrome Custom Tabs in the same situations, so that IAB can be deprecated for both platforms at the same time.

