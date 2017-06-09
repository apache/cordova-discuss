# Jshint to Eslint Proposal
- Status: Proposed
- CB-12895

## Current

Currently, the .jschintrc files in most cordova repos have the following settings: 

```
{   "node": true
  , "bitwise": true
  , "undef": true
  , "trailing": true
  , "quotmark": true
  , "indent": 4
  , "unused": "vars"
  , "latedef": "nofunc"
  , "jasmine": true
  , "esversion": 6
}
```

## Overview

This is a proposal to determine which settings/rules we should keep, ignore, or add when moving from jshint to eslint.

When we switch to eslint, we will be able to keep the same jshint settings (listed above). 

We are also using ‘extends’, which is taking a set of rules and adding them to your config. There are more than one 'extends' to pick from and so far we are using semi-standard because it supports checking for semi-colons. (Note : semi-standard adds Standard, and then adds the one rule on top of that for semicolons).

When using semi-standard, eslint is pickier about a few more things than jshint. It has certain rules that are built in. These additional rules in eslint could either be just turned off and ignored if we don’t think they are necessary. (In some cases you can customize your rules. For instance, you can change the indenting from 2 to 4).

Link to the standard rules —> https://standardjs.com/rules.html

There are many rules and listed below are the ones that have come up most frequently when testing eslint using extending semi-standard in cordova-repos.

1. Fixable: means that this rule is fixable using the --fix flag on the command line. The checks/rules below are all fixable.: 
 
* `comma-spacing` - enforce spacing before and after comma
* `keyword-spacing` - enforce spacing before and after keywords
* `no-multi-spaces` - disallow use of multiple spaces
* `space-before-function-paren` - require or disallow a space before function opening parenthesis
* `spaced-comment` - require or disallow a space immediately following the // or /* in a comment
* `space-infix-ops` - require spaces around operators
 
2. Not fixable with --fix flag, but also come up a lot:

* `brace-style` - enforce one true brace style
* `camelcase` - require camel case names
* `curly` - specify curly brace conventions for all control statements
* `eqeqeq` - require the use of === and !==
* `no-extra-boolean-cast` - disallow double-negation boolean casts in a boolean context
* `no-throw-literal` - restrict what can be thrown as an exception
* `operator-linebreak` - enforce operators to be placed before or after line breaks
* `padded-blocks` - enforce padding within blocks

## Proposal

I propose that we keep the eslint semi-standard defaults in initially and remove padded-block, operator-linebreaker, and no-throw-literal.

## Questions
Would we like to use eslint's semi-standard default rules across the cordova repos or would we prefer to ignore certain ones and turn them off? Are there any other eslint rules not listed above that we would like to turn off or customize? Concerns? Thoughts? Pros and cons?

## Links
* Link to all the eslint rules —> http://eslint.org/docs/2.0.0/rules/
* Link to the standard rules --> https://standardjs.com/rules.html 
* Link semi-standard example --> https://github.com/Flet/eslint-config-semistandard/blob/master/eslintrc.json
* Link to Jira issue CB-12895 --> https://issues.apache.org/jira/browse/CB-12895