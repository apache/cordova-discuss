# Migration of Jira Issues to Github
- Status: Proposed

## Overview
This is a proposal to migrate Jira issues over to GitHub. [See issue CB-13157](https://issues.apache.org/jira/browse/CB-13157)

## Current
Currently, issues for all Cordova repos are tracked on [Jira](issues.apache.org/jira/browse/CB).

## Proposal
This proposal recommends that issues are mirgated from Jira to Github so that the issues are with the code. This is recommended because:
* Jira can be a barrier to actually creating issues.
* This is an expected open source workflow.
* This helps to modernize Cordova.
* Issues should be with the code.

There are two potential options when using Github to track issues:

## Option 1
When issues are migrated to Github, each repository will contain its own set of issues. In each repo, there will be a list of the issues, which can be found under the Github "Issues" tab. Therefore, the issues can be found with the code. This can allow developers to reference pull requests more easily. Developers will also be able to "watch" repos and receive notifications when pull requests are sent or when new issues are created. We encourage and want to make it easy for committers to watch Github for the repos they want to be involved in.

## Option 2
When issues are migrated to Github, they are added to one "issues" repository. There will be one master “issues” repo that can track all of the Cordova issues on GitHub.

## Notes
In both of these scenarios, issues are migrated over from Jira to Github. Jira will continue to be around for security issues. Alternatively, we could use a private GitHub repo for security tracking (if private repos are an option on the Github Apache org).

There will also be standard labels to follow to help tag each issues. It would be nice to agree on a suggested labels list to help tag and organize issues. List of potential labels include:

### Type
* Bug
* Enhancement/new feature
* Question/user support 
* Invalid

### Status
* Triaged
* Priority (low, medium, high)
* Waiting for user/waiting for contributor
* In progress
* Easy fix
* Backlog
* Duplicate
* Milestones (Github feature)

## Additional Work
Update documentation:
* Update [contribute page](https://cordova.apache.org/contribute/). Links need to point to Github instead of Apache.
* Update [contributor guidelines](https://cordova.apache.org/contribute/contribute_guidelines.html).
* Update [committer workflow in cordova-coho](https://github.com/apache/cordova-coho/blob/master/docs/committer-workflow.md).
* Update [triaging doc in cordova-coho](https://github.com/apache/cordova-coho/blob/master/docs/jira-triage.md). This document will contain the list of labels (backlog, priority, etc).
* Update pull request templates (link to relevant issues).
* Add issue template.

## Links
* https://issues.apache.org/jira/browse/CB-13157
* https://cordova.apache.org/contribute/
* https://cordova.apache.org/contribute/contribute_guidelines.html 
* https://github.com/apache/cordova-coho/blob/master/docs/committer-workflow.md
* https://github.com/apache/cordova-coho/blob/master/docs/jira-triage.md
