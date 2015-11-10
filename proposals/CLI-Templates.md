## Cordova CLI Create with Template argument



This proposal is to update the Cordova CLI to support the argument --template for create command

    $cordova craete myApp --template=<NPM ID | GIT URL | Local Path>

- NPM ID is a npm package name with optional version
- GIT ULR is a git url, similar format as adding platforms and plugins via Git
- Local Path, is a local directory 

- This will allow to specify the IBM NPM Cordova Template like $cordova create myApp --template=cordova-template-mfp or $cordova create myApp --template=cordova-template-mfp@1.0.0

--template is different from --copy-from, it copies everything from the template including hooks, res, config.xml, hooks, dot files (.gitignore) except plugins and platforms, templates should not have this folder but if they do they get ignored and not copy
if the template is missing certain files or directories it get's default ones here is the list:
config.xml a default one is created  from cordoba-app-hello-world
hooks, the default hooks with readme is created
www/, is missing the default is created from cordoba-app-hello-world

References:
- [JIRA CB-9964](https://issues.apache.org/jira/browse/CB-9964)
- [Discussion](https://github.com/cordova/cordova-discuss/issues/5)
