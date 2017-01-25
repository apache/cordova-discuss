# Create New Cordova Config Command Proposal
Status : Proposed

## Current
Currently, telemetry and update-notifier use https://github.com/yeoman/configstore under the hood. Stores configs in ~/.config/configstore/

Sample code

const Configstore = require('configstore');
const pkg = require('./package.json');

// create a Configstore instance with an unique ID e.g.
// package name and optionally some default values
const conf = new Configstore(pkg.name, {foo: 'bar'});

console.log(conf.get('foo'));
//=> 'bar'

conf.set('awesome', true);
console.log(conf.get('awesome'));
//=> true

// use dot-notation to access nested properties
conf.set('bar.baz', true);
console.log(conf.get('bar'));
//=> {baz: true}

conf.delete('awesome');
console.log(conf.get('awesome'));
//=> undefined

## Proposal
Create a new cordova config command modeled after npm config command. It will include a global config to turn autosave off for cordova. https://docs.npmjs.com/cli/config

### Future Goals ?
Any other suggestions on what else you would like to see in the global config?

### Links
https://issues.apache.org/jira/browse/CB-11982
https://github.com/yeoman/configstore 
https://docs.npmjs.com/cli/config

### Motivation
This new command provides the ability to store environment variables (similarly to browserify, fetch, and save).