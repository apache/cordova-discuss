# Remove "--nofetch option" and All Old Fetching Code
- Status: Proposed

## Overview
This is a proposal to remove `--nofetch` option and all older fetching code. [See issue CB-13055](https://issues.apache.org/jira/browse/CB-13055)

## Current
Currently, `Cordova` uses `cordova-fetch` for fetching modules by default.

## Proposal
Ths proposal recommends dropping older methods of fetching as it can reduce maintenance in `Cordova`. The following is proposed to be removed:

- remove --nofetch option (remove the flag and workflow that occurs when fetch is false)
- remove lazy_load
- remove gitclone.js
- remove npm dependency (from package.json)
- remove remoteload.js

## Additional Work
Update anywhere that these fetch, lazy_load, gitclone, npm dependency references or files are being used.

## Links
 * [Original fetch proposal](https://github.com/cordova/cordova-discuss/pull/33)
 * [CB-13055](https://issues.apache.org/jira/browse/CB-13055)