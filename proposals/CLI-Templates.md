# Cordova CLI Create with Template argument
- Status: Completed

This proposal is to update the Cordova CLI to support the argument --template for create command

    $cordova create myApp --template=<NPM ID | GIT URL | Local Path>

- NPM ID is a npm package name with optional version
- GIT ULR is a git url, similar format as adding platforms and plugins via Git
- Local Path, is a local directory 

- This will allow to specify the IBM NPM Cordova Template like $cordova create myApp --template=cordova-app-hello-world or $cordova create myApp --template=cordova-app-hello-world@3.9.x

--template is a bit different from --copy-from, it copies everything from the template including hooks, res, config.xml, hooks, dot files (.gitignore) (it will also copy plugins and platforms but this is not recommended since templates should be small, and platforms and plugins can be specified in config.xml)

--copy-from will just be an alias to --template
--copy-from will mark deprecated and later removed

If user pass any of the optional arguments for the app ID, NAME it will put those values in config.xml even if the template contains a config.xml

if the template is missing certain files or directories it get's default ones here is the list:
config.xml a default one is created  from cordoba-app-hello-world
hooks/, the default hooks with readme is created
www/, is missing the default is created from cordoba-app-hello-world

### References:
- [JIRA CB-9964](https://issues.apache.org/jira/browse/CB-9964)
- [Discussion](https://github.com/cordova/cordova-discuss/issues/5)
- [Lib PR] (https://github.com/apache/cordova-lib/pull/339)
- [CLI PR] (https://github.com/apache/cordova-cli/pull/226)

