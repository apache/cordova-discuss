# Cordova Face To Face Meeting

 | |
--- | --- | ---
Date | 14 & 15 October, 2015
Location | Building 33, 16070 NE 36th Way, Redmond, WA, USA 98052 (Room Name - Rainier)
Streaming | Working on a link


## Agenda

### Day 1: October 14, 2015

Time | Agenda
-----|-------
08:00 - 10:00 | Optional Breakfast and Networking
10:30 - 11:00 | Introductions, State of the Union (@Shaz)
11:00 - 12:00 | Cordova Round Table (discuss broadly applicable topics like roadmap, processes, etc)
12:00 - 1:00  | Lunch
 1:00 - 4:00  | Smaller workgroups - to discuss specific topcs
 4:00 - 5:00  | Getting back together, discuss results from breakouts
5:00 |  End time (and head to bar for beer)

### Day2: October 15, 2015

Time | Agenda
-----|-------
 9:00 - 10:00 | Breakfast
10:00 - 12:00 | Cordova Ecosystem Show and tell - presentations on how Cordova is used in tools or projects.
12:00 - 1:00  | Lunch
 1:00 - 4:00  | Smaller workgroups - to discuss specific topcs
 4:00 - 5:00  | Getting back together, discuss results from breakouts
 5:00         | End of sessions, recap


## Topics for Breakout Sessions and people interested in it

### Cordova Community Processes & Engineering System

Topic | Attendee
------|---------
Cordova Security Process and Procedures - (Discussion on timelines, mostly for PMC/Committers) | Joe, Carlos
JIRA triage - Who's responsible & accountable - Stategies for dealing with Bug/Quality debt  | Nikhil
Keep documentation up-to-date | Nikhil
Cordova Workflow for Contributors (How do I debug a platform issue?) | Joe, Carlos
Communication of breaking changes - major platform updates | Nikhil
How do we maintain high quality? | Nikhil
How to encourage external contribution? |


### Plugin Ecosystem

Topic | Attendee
------|---------
How to influence quality improvements for Cordova plugins? |
Documenting platforms APIs for plugins |
Cocoapods as dependencies in plugin.xml same way as gradle | Carlos
TACO Kits - validated plugins, How to have a slower and safer adoption on upgrades | Carlos
Versioning Hell - Which plugin works with which platform? How should I upgrade my Cordova project? | Nikhil
What can we learn from the React Native plugin API? NativeScript API? |
Tips and Documentation for Debugging Cordova Plugins |
CPR end of life discussion | Steve


### Downstream Tooling ideas

Topic | Attendee
------|---------
Tension between innovation vs. being part of an ecosystem |
What belongs in Cordova and what should be left to downstream tools? |
What do integrators need from Cordova? |
PlatformApi refactoring |
Standardized logging and error/progress reporting |


### Hybrid Apps & Native Development

Topic | Attendee
------|---------
What is needed to allow customizing native (Xcode/Gradle/...) projects when using the CLI? |
Is the distinction between the CLI vs. platform-centered workflow still valid? |
Supporting multiple web views (e.g. for native navigation + web content scenarios) |
Can we share tools or plugins with React Native? |
Allow per-platform ids? |


### CI & Testing

Topic | Attendee
------|----------
Current state of CI and testing | Everyone, right?
Why aren't we looking at the CI? | Everyone, yes.
Future steps for our CI Software | Everyone.
Future steps for our CI Hardware | Everyone.
Future steps for testing | Everyone, definitely.


### Others

Topic | Attendee
------|---------
2 Modes, Production vs. Dev to support ES6, Typescript, www-dist | Carlos
A new inAppBrowser for iOS based on SafariViewController | Carlos
Cordova Desktop Browser - Electron JS + Emulation/Ripple | Carlos
3rd Party npm dependencies  & checked into Cordova git (legal, screaning, maintaining) | Carlos


### More

- How can we improve the development experience?
  - What can we learn from the React Native developer experience?
    - Replacing 'white screen of death' with an error reporting screen
    - Adding a development/debugger menu
  - How can we make platform installation easier?
    - Improve requirements checking and error messages
    - Install SDKs with one command (TACO)
- Platform-specific topics
  -(windows) why is windows icon list so limited?  should it be possible to specify more?
  -(windows) Any options for HTML5 debugging for Windows 10 devices?
  -(windows) security related to windows preview apps - how to allow dyanmic content to access plugin APIs?
  -(web-os) web-os setup broken, document and discuss)
  -(iOS) wkwebview - recap of current approach, is it iOS 9 only?
  -(android) annoyance/issue - appending of architecture digit problem?
