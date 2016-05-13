### New Information Architecture for Cordova Website
- Status: Completed

As a part of the task of improving the Cordova documentation, we came up with a new Information Architecture for the website. The current architecture was not very comprehensive and lacked a well-defined structure which made the documentation difficult to follow and find for people. Also we decided to add some new content based on the customer feedback from our website survey.

New articles to be added: 

- Debug and Test (for both apps and plugins)
- Publish (app to the appstore for all platforms)
- Automate Tasks (tips to use tools like grunt, gulp and uglify with Cordova)
- Register with NPM
- Sample Apps (section containing some sample apps built on Cordova)
- Tutorials (source control and more)
- Architecture (runtime and tooling articles)
- Pass data from Cordova app to host (under Advanced Topics)

This is the proposed new IA:

- Overview
- Architecture
	- Runtime Architecture
	- Tooling Architecture
- Create apps 
	- Create your first app
	- Develop for platforms
	- Manage versions and platforms
	- Debug and test
	- Automate Tasks
	- Store data
	- Manage privacy
	- Manage security
	- Whitelisting
	- Publish
- Create plugins
	- Create a plugin 
	- Register with NPM
	- Develop for platforms
	- Use Plugman
	- Debug and test		
- Advanced Topics
	- Embed Cordova in native apps
	- Pass data from Cordova app to host
- Reference
	- Config.xml
	- Events
	- Plugin APIs
	- CLI
	- Hooks
	- Plugin.xml
- Tutorials
	- Share your app in source control
- Sample Apps

We also did a document scrub and tried to figure out the articles which need to be modified or updated with the current information and plan to work on them. Some of these needs to be converted into proper reference as seen in the IA.

Please give feedback or let us know if you would like to help with this task.

Jira tasks for bringing the new IA up and improving the existing content can be found here:
https://issues.apache.org/jira/browse/CB-10354?jql=labels%20%3D%20Docs-6.x

If anyone wants to help out, please feel free to assign any of the tasks to yourself. I have added the changes we felt needed in the description of the tasks and also general guidelines for overall content of the articles.