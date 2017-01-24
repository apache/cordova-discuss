# Autosave by default for cordova@7 Proposal
Status : Proposed

## Current
To save or remove dependencies, users must include the --save flag.

Examples: 
cordova platform add ios --save
cordova plugin add cordova-plugin-camera --save

## Proposal
Autosave will be the default option.
Example: cordova platform add ios
This command will automatically save the ios platform.
Include a --no-save flag to not save.
Example: cordova platform add ios --nosave
This command will allow the ios platform to NOT be saved.

### Notes
Autosave will only be used in the cli right now (not cordova-lib).
If you're using cordova-lib directly, you will still need to use the
--save flag.

### Future Goals
Include a global config to turn autosave off for cordova.
https://issues.apache.org/jira/browse/CB-11982

### Links
https://issues.apache.org/jira/browse/CB-12008

### Motivation
 Our analytics show --save usage is pretty low (presumably due to people not knowing about it). By having autosave as the default, users won’t have to worry about remembering to save. If users don’t want to save, there are options to opt out of saving with the new --nosave flag.

### Use Cases/Tests:
1. Cordova platform add ios, expect save to be true.
2. Cordova platform remove ios, expect save to be true.
3. Cordova plugin add cordova-plugin-camera, expect save to be true.
4. Cordova plugin remove cordova-plugin-camera, expect save to be true.
5. Cordova platform add ios --nosave, expect save to be false.
6. Cordova platform remove ios --nosave, expect save to be false. 
7. Cordova plugin add cordova-plugin-camera--nosave, expect save to be false.
8. Cordova plugin remove cordova-plugin-camera --nosave, expect save to be false.
