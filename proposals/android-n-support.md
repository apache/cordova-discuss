# Android N and Cordova
- Status: Proposed

The purpose of this discuss is to highlight the new features of Android N
that may affect Cordova. I did a brief investigation of the upcoming changes
and did some minor testing (building a trivial app, running mobilespec, etc).
I didn't find too many issues, but we should track them as they come up.

You can see a JIRA query for all Android N related issues
[here][android-n-query]. If you file an issue, be sure to add the "AndroidN"
label so that it shows up.


## Multi-Window Support

This is the big new feature of Android N and one that presents some minor
problems for existing Cordova apps. When apps that are compiled with the pre-N
SDK are put into multi-window mode, the user gets a message saying "App may not
work in multi-window mode". Cordova apps definitely fall into the non-working
category because they tend to either crash or randomly restart when placed into
multi-window mode.

The issue is in the way Android handles resizing an app. By default, Android
just destroys/restarts the current Activity whenever the app changes size.
Unfortunately, in a Cordova app the webview gets destroyed along with the
Activity and the app will appear to restart from scratch. In practice, this
mostly looks like the app randomly restarts sometimes when it's resized. The
app also sometimes crashes (may be related to the first point
[here][other-behavior-changes]).

The fix is a really simple one-line change to AndroidManifest.xml and it works
even with pre-N SDK versions. We just need to make sure that people are aware of
the issue so that they can either update to newer versions of cordova-android (once
we've published a fix) or make the change themselves if they're unwilling to update.

I don't think that multi-window support will require any changes to core plugins.
Some third party plugins that have their own UI might run into issues and may need
to update, but I haven't done any research. The issue there is that Android assumes
that any Activity spawned by a multi-window supporting activity also supports
multi-window, so you could potentially get into a weird state where you add a plugin
that does not support it and it causes problems. It's something to be aware of.
Developers can also disable multi-window support by editing AndroidManifest.xml.

[android-n-query]: https://issues.apache.org/jira/issues/?jql=project%20%3D%20CB%20AND%20status%20in%20(Open%2C%20%22In%20Progress%22%2C%20Reopened)%20AND%20labels%20%3D%20AndroidN
[other-behavior-changes]: http://developer.android.com/preview/behavior-changes.html#other