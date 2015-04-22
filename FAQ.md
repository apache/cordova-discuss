#FAQ

## Do cookies work in Cordova apps?

There are two ways in which you may want to use cookies. The first is within XHR (Ajax) requests to remote resources. Unless you specifically remove them, your Ajax library will automatically use cookies in subsequent calls to remote APIs and resources you request. So given that some API returns a cookie required for future calls, you can assume it will be automatically sent when your app hits it again.

The other way your app may desire to use cookies is locally - ie within the app itself. This does not make sense within a Cordova app as it isn't running on a proper web server itself. If your intent is simply to store data for the app then you should make use the various [existing methods](http://cordova.apache.org/docs/en/4.0.0/cordova_storage_storage.md.html#Storage) to store data locally.
