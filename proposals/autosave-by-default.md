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
Example: cordova platform add ios --no-save
This command will allow the ios platform to NOT be saved.

### Future Goals
Include a global config to turn autosave off for cordova.
https://issues.apache.org/jira/browse/CB-11982

### Links
https://issues.apache.org/jira/browse/CB-12008

### Motivation
 Our analytics show --save usage is pretty low (presumably due to people not knowing about it). By having autosave as the default, users won’t have to worry about remembering to save. If users don’t want to save, there are options to opt out of saving with the new --no-save flag.

### Use Cases/Tests:
1. Cordova platform add ios (saves to package.json/config.xml and installed platform list)
2. Cordova platform remove ios (remove from package.json/config.xml and installed platform list)
3. Cordova plugin add cordova-plugin-camera (saves to package.json/config.xml and installed plugin list)
4. Cordova plugin remove cordova-plugin-camera (removes from package.json/config.xml and installed plugin list)
5. Cordova platform add ios --no-save (does not save to package.json/config.xml, ONLY the installed platform list)
6. Cordova platform remove ios --no-save (does not remove from package.json/config.xml, ONLY the installed platform list) What will it 
7. Cordova plugin add cordova-plugin-camera--no-save (does not save to package.json/config.xml, ONLY the installed plugin list)
8. Cordova plugin remove cordova-plugin-camera --no-save (does not remove from package.json/config.xml, ONLY the installed plugin list)
9. Check that without --save, it should successfully add and remove a plugin with variables
10. Check that without --save, it should successfully add and remove multiple plugins
