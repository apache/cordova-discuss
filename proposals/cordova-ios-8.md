# Proposed changes for Cordova iOS 8 (Major)

## 1. Support new iOS 18 icon requirements

iOS 18 introduces dark mode icons and tinted icons, similar to Android's adaptive icons. The [updated guidelines](https://developer.apple.com/design/human-interface-guidelines/app-icons#Platform-considerations) state that dark mode icons are made by providing a "foreground" image with a transparent background, while tinted icons are made from a monochrome image.

Xcode 15 and newer support providing a single 1024×1024 icon image (and a PR [already exists](https://github.com/apache/cordova-ios/pull/1309) for it), and automatically generating all the necessary icon sizes. Cordova iOS 8 should standardize on that, and add support for the 2 new icon variants. Note that this will require bumping the minimum iOS version of the template app to at least iOS 12, and the required Xcode version to a minimum of 15.

Since we already have support for `foregound` and `monochrome` URLs in config.xml `icon` elements on Android, reusing those for dark mode and tinted icons on iOS seems like the best option:

```xml
<icon src="assets/ios/app_icon.png"
      foreground="assets/ios/dark_app_icon.png"
      monochrome="assets/greyscale_app_icon.png" />
```


## 2. Update the app template and use Swift & storyboards

The template project essentially consists of 2 empty class files, and a handful of supporting metadata files. Right now these are Objective-C classes with header files and implementation files, and it seems like it would be cleaner and easier to have Swift files.

This would also be an opportunity to move from a `MainViewController.xib` file to the more modern storyboard layouts, which handle automatically initializing the view controller and setting the size appropriately.

Also a good opportunity to regenerate the Xcode project and file structure to align with current Xcode best practices. If we set iOS 13 as the minimum supported platform version for the Cordova template project, we could also adopt the `UISceneDelegate` to better support multiple windows (as is now standard for new iOS projects).


## 3. Consume CordovaLib as a Swift package rather than a subproject

The main upside here is that CordovaLib would automatically be handled by Xcode as a framework (without any weird signing issues) rather than as a static library. Currently, the way we consume CordovaLib as a static library requires the use of non-standard linker flags (`-ObjC`) and does not properly pick up things like the embedded Privacy Manifest. Using Xcode's built-in Swift Package Manager support, we could have it automatically handle that for us.

One big downside here is that CordovaLib would be pulled from git, and we'd need to do some work to ensure that it gets pulled from a tag. The tag/reference is configured in the Xcode project file, which is a bit of a pain as far as updating, but could probably be done with a regex as part of coho's versioning scripts.
Local development would also be a slight problem, but it is possible to point to local file paths for Swift packages, so something like the `--link` flag might still be able to work.

We could potentially look at splitting CordovaLib out into its own GitHub repo with its own versioning to simplify this process slightly, but that's not strictly necessary. CordovaLib can already be consumed as a Swift package just by pointing to the cordova-ios git repo.

> [!WARNING]
> One unanswered question here is how this would interact with the idea of consuming plugins as Swift packages via a subproject. jcesarmobile was seeing some issues previously around plugins needing to depend on CordovaLib, and Swift package manager doesn't have a concept like npm's peer dependencies.


## 4. Clean up manual initialization code in `CDVAppDelegate`

There is a lot of old cruft in `CDVAppDelegate` to manually create the window and view controller. This should be automatically handled by storyboards nowadays, and the use of `UIScreen` here prevents compatibility with Apple Vision Pro.

The `CDVAppDelegate` base class should focus itself solely on handling the URL stuff (and that can be cleaned up a bit too, to simplify the multiple notifications that we're currently doing by including the additional data as `userInfo` on the `NSNotification`).


## 5. Clean up `CDVViewController` and make it friendlier for embedding

There is a lot of old cruft in `CDVViewController` from the early days of iOS when views needed to manually configure their bounds and do their own initialization. I believe the web view also ends up getting created twice due to a weird initialization quirk, which is inefficient and leads to slower app startup. It would be good to review and clean up and streamline all of this as much as possible.

`CDVViewController` is also intended as public API to be used by developers wanting to embed a single Cordova view within their existing iOS app. There are friction points around things like background colours, splash screens, and web view configuration that can probably be addressed by better taking advantage of Xcode features like `IBInspectable` properties to allow configuration through storyboards.

### Configurable Properties
In particular, I think the following properties should be made easily configurable:
* `splashScreenEnabled` boolean, to control whether the splash screen is enabled for this view controller (default true)
* `configFilePath` string, to point to the file to read for Cordova configuration (default "config.xml")


## 6. Remove duplicate entitlement files and xcconfig from template project
Pretty well all of the settings from the xcconfig files should be set in the Xcode project file rather than in special configuration files. These configuration files end up setting properties globally across the entire Xcode project, which can be an issue if someone has edited their project to include multiple targets.
I assume we can't remove them entirely because we use them as an injection point for plugins, and it powers the CocoaPods integration, but we should stop doing things like setting specific codesigning identities here and let Xcode handle that automatically.

Xcode has also gotten smarter about automatically handling the differences in debug/release entitlements, and the current system of having 2 separate plist files feels weird. Unfortunately this is a common injection point for plugins using `config-file` so we'll need some sort of fallback handling here for at least one major version cycle.


# Wishlist Items

## Use `WKScriptMessageHandlerWithReply` on newer iOS versions
This should allow us to return plugin results directly to the webview via promise callbacks, as opposed to doing our own JSON serialization. This API is only available in iOS 14 and newer, so retaining the existing behaviour as a fallback would be worthwhile (and needed to continue supporting 3rd party web view plugins).

## Automatic status bar handling
> [!NOTE]
> Blocked on private WebKit API.

Show and hide the status bar automatically based on whether the web view asks to extend behind the safe area via `viewport-fit`. Unfortuantely, detecting this and doing it dynamically at runtime requires using an API that isn't public on `WKUIDelegate` (`_webView:didChangeSafeAreaShouldAffectObscuredInsets:`). We wouldn't be able to do this as part of standard Cordova unless that API is made publicly accessible otherwise we'd risk app rejections. I submitted FB11990786 last year requesting that it be exposed, and have received no response.

Newer versions of iOS `WKWebView` support the `theme-color` meta tag and make that colour accessible as an observable property, so we could dynamically colour the status bar based on that as well.

## Fix several permissions headaches
> [!NOTE]
> Partially blocked on private WebKit API.

We have to work around permissions issues for things like geolocation and device orientation, when those should be handled automatically by the web view.

In the case of geolocation, the problem is that we need to be able to grant permission based on the requester origin. A private API exists for this in `WKUIDelegate` (`_webkit:requestGeolocationPermissionForOrigin:initiatedByFrame:decisionHandler`), but we can't use that without the risk of app store rejection. I've filed FB13756330 requesting that to be made publicly accessible.

There are public APIs for media access and device orientation that we should look at adopting. We just need to decide how we want to implement the origin check and what the policy should be for origins listed in config.xml `allow-navigation` declarations.
