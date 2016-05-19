# CI for PRs submitted for Plugins
We are currently working on introducing a CI (Continuous Integration) build process for the PRs submitted to the cordova plugin repositories. This would help the community to catch issues before checking in the code. I am currently working on a prototype. I would like to share the idea and get early feedback on it.

## Background
Currently, Cordova plugins have [continuous intergration builds][buildbot] running:

* Periodically with master branch
* Per commit

This process, though helpful, have the following disadvantages:

* Code issues, that might break cordova, are not caught before checking in.
* There is no easy way for the code submitter to reproduce the error locally
* The [UI][buildbot] provided by the CI system is not very intutive.
* CI builds could not be run per plugin. Each build has to run tests for all the plugins

## Proposal
This proposal recommends to use [Jenkins][jenkins] as our new CI system instead of buildbot. With Jenkins and its huge list of plugins, we could achieve a lot more functionality such as GitHub Pull requests, updating PRs, generating test reports and a much better UI.

Initially, we considered using the [Jenkins Master machine][apachejenkins] provided by ASF. But, after further discussions through [emails][infraemails] and [infra ticket][infraticket], we realized that it is not possible to hook up our slave machines with the ASF master. So, we need a new Jenkins master machine that could be hooked to our slave machines **and** accessible publicly. We have decided to use a Jenkins master machine that is deployed on Azure cloud. You could see the prototype here - [http://cordova-ci.cloudapp.net:8080/](http://cordova-ci.cloudapp.net:8080/)

This master machine will be connected to two slaves which are actual physical machines. One of them will be a [Windows 10 machine][win10slave] and the other will be a [Mac machine][macslave].

The Jenkins master uses the [ghprb][ghprb] (Github Pull Request Builder Plugin) plugin to poll github, every five minutes, to check for new PRs and changes to existing PRs. If a new PR (or a commit to an existing PR) has been detected, then the change is picked up and a new CI build is triggered on the following platforms:

* iOS (on Mac OS Slave)
* Android (on Mac OS Slave)
* Android (on Windows 10 Slave)
* Windows 8.1 Store (on Windows 10 Slave)
* Windows 8.1 Phone (on Windows 10 Slave)
* Windows 10  Store (on Windows 10 Slave)

This build uses the [cordova-paramedic][paramedic] package to test the plugin. This package will help to test the specific plugin that is changed. Paramedic also provides a simple and easy way for the PR submitter to reproduce the error locally and test the changes.

Once the build is complete, the PR will be updated with the a comment indicating the result of the CI build and a link to the build job. You could see a sample PR created as a prototype here - [https://github.com/sarangan12/cordova-plugin-console/pull/18](https://github.com/sarangan12/cordova-plugin-console/pull/18). The build link will have detailed console logs and also device logs.

A new github user (such as "CordovaQA") will be created to update the comments in the PR. This approach has been used by [Apache Spark project][sparkpr] also.

In addition to new changes submitted to PR, a CI build could be triggered by fixed phrases in the PR comments (such as "CordovaQA - Test these changes."). In addition to the CI builds per PR, there will be periodic builds per plugin on the master branch.The Jenkins master will have Github OAuth integrated in it. Everybody (even without a GitHub authentication) will have [view][viewaccess] access. Edit/Configure access will be provided based on per request basis.

## Status of Prototype
Currently, the prototype is a work in progress. It should be completed soon. I will send out the updates to the dev list once the prototype is complete.

## Future considerations
In future we might consider using services such as saucelabs to run our CI builds (instead of physical slaves).

[buildbot]: https://ci.apache.org/waterfall?category=cordova
[jenkins]: https://jenkins.io/
[apachejenkins]: https://builds.apache.org/
[infraticket]: https://issues.apache.org/jira/browse/INFRA-11527
[infraemails]: https://mail-archives.apache.org/mod_mbox/www-builds/201603.mbox/%3CBN3PR03MB13680A9928B866FA661CE0B3D1B50@BN3PR03MB1368.namprd03.prod.outlook.com%3E
[win10slave]: http://cordova-ci.cloudapp.net:8080/computer/windows-slave/
[macslave]: http://cordova-ci.cloudapp.net:8080/computer/mac-slave/
[ghprb]: https://github.com/janinko/ghprb
[sparkpr]: https://github.com/apache/spark/pull/12745
[viewaccess]: http://cordova-ci.cloudapp.net:8080/view/Console%20Plugin/
[paramedic]: https://github.com/apache/cordova-paramedic
