#  Cordova nightly builds proposal

We'd like to complete the work, started by @stevesgill in [CB-7904](https://issues.apache.org/jira/browse/CB-7904) and get nightly builds of cordova and related packages published on NPM.

## Background

Currently the only way to test the development version of cordova is to clone cordova and all dependent repos, link them to each other and npm install every cordova repository, which is pretty complicated. Using `cordova-coho` tool makes the process of setting up development cordova version a bit easier, but there is still a lot of caveats.

Having development version of cordova published on npm would allow everyone to easily set up development version of cordova to test unreleased features, reproduce the bugs or confirm they get fixed in current version.

Nightly builds in our understanding are an npm packages created from current 'master' branches of respective repos and available on NPM under `nightly` dist tag (`next` tag should be available as well and aliased to `nightly` ), so they easily could be installed like `npm i cordova@nightly`. All appropriate dependencies of nightly packages also will be updated to point to their nightly versions, e.g. `cordova-cli@6.2.0-nightly` will depend on `cordova-lib@6.2.0-nightly`, etc.

The nightly version of cordova-lib will also have main platform pinned to their nightly versions, so `cordova install android` will automatically install `cordova-android@nightly` to allow early adopters test new features and bugfixes in platforms.

The full format of nightly version is `<package_id>@<next_version>-nightly.<build_date>.<commit_SHA>`, for example:

```
cordova-lib@6.2.0-nightly.2016.05.12.16498003
```

This format is fully Semver-compatible and allows to us to easily recreate the same the cordova setup locally

The nightly packages, we're planning to release, include Cordova tools (cordova-cli, cordova-lib, etc.) and the major platforms (Android, iOS, Windows)

## How it will work

All the aspects of creating and publishing nightly builds are automated using `cordova coho` command. Running `coho nightly` assumes the following steps:

1. For every package to publish update respective repo to the latest commit
2. For every package determine if there are any changes present since last nightly and if not - exclude that package from release. This step is required since we can't do automated unpublish of releases older than 1 day, so we need to do release only for actual changes to keep `npm view versions` list clean.

2. For every package update version to nightly version
  - Also update dependencies versions to point to nightly versions of other `cordova-*` dependencies
  - Also update bundled dependencies - 'npm link' corresponding repos
3. For every package run the tests to make sure that release will not contain any known bugs
4. Publish packages on NPM under `nightly` dist tag

The `cordova coho` command also accepts `--pretend` options to run these steps locally without publishing packages to NPM

## Current status

The work is currently in progress and the following items are completed:

1. The [Jenkins job](https://builds.apache.org/view/A-D/view/Cordova/job/cordova-nightly/) that has npm set up using credentials for publishing packages
2. The [update](https://github.com/apache/cordova-coho/pull/116) for `coho nightly` that supports publishing of 'cordova-cli' and `cordova-lib`
3. Patches for `cordova-cli` and `cordova-lib` that fixes some tests that were failing when were running on nightly builds
4. Support for [building arbitrary repos](https://github.com/apache/cordova-coho/pull/122) has been added.
5. Support for [building nightlies for platforms](https://github.com/apache/cordova-coho/pull/124) has been added.

## Next steps

- [] Update cordova to print necessary warnings and information about nightly versions of dependencies and platforms when running `cordova --version` and `cordova platform ls`
