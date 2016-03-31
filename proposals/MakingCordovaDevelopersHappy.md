# Cordova Contributor
Rob Posener

## Background

This email thread is very important but seems to have “died”.  I want to contribute by providing some first-hand app developer experience and recommendations to fix this situation.  I have tried to limit my comments to MY specific experience with Cordova and leave it to you to extrapolate (or not) to “there may be others seeing and feeling this”.  As an overall comment, its NOT just the quality of the documentation that lets Cordova down, its a combination of many things.

From the tone of some of the comments in this email thread, I'm not sure that anyone is going to listen, let alone act on what I have to contribute here.

From the tone of a number of responses that I have received when I have tried to contribute (yes, I have signed an ICLA), I’m not sure that anyone is going to listen, let alone act on what I have to contribute here.

I have been a software developer since 1965.  I have also held most IT roles.  I have used many tools and languages.  I have been developing software using HTML, CSS and JavaScript since 2000.  I have been using Cordova since 2013.

Since 2013 I have used Android Studio, Visual Studio, the CLI and UltraEdit as tools in conjunction with Cordova.

My vision for what Cordova does/should be (rightly or wrongly – but generally set by the “hype” surrounding Cordova) is:

1. To allow me to code once and release many times to different platforms.
2. To isolate me from having to know or understand the idiosyncrasies of each platform.
3. To NOT require me to pepper my app's code with specific platform tests.
4. To let me put code into the WWW folder ONLY and for Cordova to manage all other folders (ie, WWW is mine and sacrosanct, all of the others are yours and I must not touch them).
5. To let me use a multitude of tools to do my development (eg, Android Studio, Visual Studio, UltraEdit and CLI) and for all of them to “play nicely with each other”.
6. To allow me to spend most of my time developing my app-specific code and NOT to have to spend much time getting Cordova, Android Studio, Visual Studio and UltraEdit to work.

Right now, I truly believe that I would have been better off learning how to develop natively for each of the Android, Windows and Browser platforms that I am targeting rather than using Cordova.
I'm about “an inch away” from stopping using Cordova and doing just that.  Clearly I don't want to do this because of the substantial time investment that I have made, so I am writing this epistle.

Yes, developing with Cordova have improved over the years.  I happily agree that a new Cordova app developer would have a lot less trouble developing an app now than I have had over the past 2 -and-a-bit years.  The points I make below are “current” (not historical) (ie, they still exist).

## Details

Cordova developers use the term “use case” a lot.  I have never seen “persona” being used.
Cordova developers' mental picture seems to be of the following personas:

1. A Cordova app developer (a consumer of Cordova)
2. A Cordova contributor (an Apache Cordova Contributor)
3. A Cordova plugin developer

But there are more.

There are different grades of “Cordova App Developer”:

1. Very experienced
2. Novice

There are different grades of “Cordova Contributor”:

1. Very experienced
2. Novice

Further, your assumptions:

1. About Cordova app developers' prior knowledge and experience are not correct.
2. That Cordova app developers are working on Cordova app development at their desks full time are not correct.
3. About Cordova app developers speaking up if they have a problem are not correct.  It would open a massive floodgate if they all did so.  Many Cordova app developers don't do that.  I don't do that.  I am not sure if I have found a bug in Cordova or if it is something that I am doing... so I just soldier-on in silence.  I fear being laughed at.  I fear being humiliated.  I fear showing my ignorance.  I fear being put down.  I fear criticism.
4. That Cordova app developers will just open up your code and have a look so that they can understand how it works (eg, like Raymond Camden frequently does).
5. That Cordova app developers speak the same level of English as you.

Getting these personas right is important so that you can empathise with them.

**Recommendation 1:** Document the vision for what Cordova does/should be and what it is not (eg, doesn't address the different platform UIs).

**Recommendation 2:** Develop these personas.

**Recommendation 3:** Document all of these personas for all Cordova contributors to view.

## Some Examples of Where Cordova has Gone Wrong for Me

I know that the list below is long and doesn't have many details.  I could write a page on each example to justify it with all of the details, but I currently don't feel inclined to do so (I've already invested many hours collating this list and wordsmithing it) until I see some intent for action to correct these situations.

1. Cordova subject knowledge:  The amount of knowledge required to determine if a bug in a Cordova-based app is a Cordova app developer problem, a change in the Cordova platform or plugin specifications or a Cordova problem is very, very high.  

    **Recommendation 4:** Fixing many of the following items by implementing their recommendations will solve some of this.

2. Underlying platform knowledge: The need to understand the underlying platform is still quite high when developing with Cordova (eg, appExit does not exit the app on the Windows platform).  A lot of my knowledge has come about by trial and error.  I am not talking about the UI here.  

    **Recommendation 5:** Identify these differences and embed in platform and plugin code (a) a test to see if in “debug mode” and then (b) a console.log display to warn Cordova app developers of the situation and what to do about it.  

    **Recommendation 6:** Add a discussion on these differences under “Platform Quirks”.

3. splashscreen plugin: Just recently on this Dev email thread it came out that there was no code written for a particular feature, even though the documentation blithely said it existed (and had done so for the past 2+ years).  

    **Recommendation 7:** Every syllable of every word in the documentation must be tested for correctness before being published.

4. splashscreen plugin: If you analyse at 30,000 feet what has been going on with this plugin you will see that it is a mess (even now, some <preferences> that have been implemented for the Android platform have not been implemented for the Windows platform.  

    **Recommendation 8:** Someone needs to stand back from developing the splashscreen plugin and analyse what to do about fixing this mess.

5. file plugin: Having a statement like “For usage, please refer to HTML5 Rocks' excellent FileSystem article“ not only abrogates the Cordova contributors' responsibility but also injects a massive doubt in the Cordova app developer's mind (“Does this other site really reflect how this file plugin works?  Has this other site's documentation been kept up-to-date as the file plugin has had on-going development?  Why are the Cordova developers being lazy and not writing this how-to-use-our-product material themselves?”).  
    **Recommendation 9:** Document the file plugin as has been done for other plugins.  By all means, continue to reference the HTML5 Rocks article, but do not rely on it being the prime source of documentation.

6. Documentation: The “less is best/minimalist” approach is killing Cordova's reputation. There was an excellent example in the past day or so on the splashscreen target email thread where someone asked “does the file name require an extension” and the response was “it answers that above” quoting “the parameter needs a file name”.  Every person I know would expect that statement to mean “NNNNN.EEE”.  Only the pedants would have read it to mean “NNNNN”.  The underlying stance was “it is plain what is required here” as opposed to adding a sentence “Do NOT include an extension.”. Sure, adding more documentation increases the maintenance costs, but it significantly reduces the on-going support costs (eg, reduces the number of questions on Stack Overflow and lets Cordova app developers find their own answers... which is their preferred approach.  It also reduces the Cordova app developer's frustrations.  

    So it comes down to:

    1. Do you (the Cordova contributors) want to spend your time maintaining documentation?
        **OR**
    2. Do you (the Cordova contributors) want to spend your time answering questions on Stack Overflow and fighting a loosing battle keeping Cordova's reputation intact?

    **Recommendation 10:** Add a “Tips and Tricks” section to each topic (eg, add a how to read files synchronously example).

7. Documentation: The documentation search function doesn't work – so how are Cordova app developers supposed to find out how to use Cordova?  

    **Recommendation 11:** Fix the search function (there is a JIRA for this == CB-10844).

8. Documentation: Doesn't explain how to use the Browser platform - “We know, let's see you find out”.  I've said it before, “No documentation === no product.”  

    **Recommendation 12:** Update the documentation (there is a JIRA for this == CB-10872) to include the Browser platform.

9. Interoperability between tools: AS, VS and CLI – its getting better but they still don't play nicely together.  IMHO for interoperability to work, it is critically important that Cordova app developers changes are ONLY recorded in the WWW folder, that no tool modifies anything in the WWW folder and that no tool requires any Cordova app developer to record something in any folder other than the WWW folder.  This would also have the added benefit of providing guidance to Cordova contributors who want to do something outside this (eg, “[Android] Need a solution to config.xml and AndroidManifest.xml feature requests“).  

    **Recommendation 13:** Publish these absolute rules and make sure all Cordova contributors and all tool developers (eg, Google and Microsoft) understand them.

10. Consistency between platforms: Why do I need to include JavaScript code in my app that tests which platform I am working on?  

    **Recommendation 14:** Identify where this is currently needed and implement changes to obviate this need

11. Windows platform: IMHO this platform still isn't ready for prime time (I have a long list to support this opinion) but basically, I have spent the past 3 months (starting from a base of having a Cordova app that works 100% on Android) with an effort of about 3 hours per day and I still can't get the Windows platform to work the same as Android.  

    **Recommendation 15:** Have the Microsoft TACO team address these issues.

12. Consistency: Something that works on one platform doesn't work on another (splashscreen works fine on Android (but only now with the latest 3.2.1 release) but still doesn't on Windows (just a few: the spinner doesn't display; the image is displayed OK then goes to black for 6 seconds before the app's home screen is displayed).  

    **Recommendation 16:** Identify where there are differences and address them.

13. Managing the versions: With the plethora of tools, platforms and plugins available it is quite hard to keep up with the version numbers of what I am using and what is the latest available. 

    **Recommendation 17:** Consolidate all of the current “--version” functions from all of the different tools into the one command that shows “Your app uses these tools, platforms and plugins with these versions” as well as “The latest versions available for those tools, platforms and plugins are:”.  A nicely formatted table would suffice.  This can be run whenever a Cordova app developer wants to check for if there are later versions of what they are using.  

    **Recommendation 18:** Provide a standard API for a Cordova app to retrieve the version number of each Cordova tool, platform and plugin is in use with the app.  I, as a Cordova app developer, want this so that when I get support calls about my app I can ascertain which of these tools, platforms and plugins are in use (by asking the user to look in “About App”) so that I can then decide if a later version has fixed a problem.

14. Bug reporting: there have been serious bugs occurring (there have been a couple of major ones just recently because of something introduced in a new release).  Yes, this email thread was reasonably concerned about a couple of the problems.  But Cordova app developers were left to keep banging their heads against the “Is it something that I have done, is it a change in the specifications or is it Cordova?” wall.  Some asked a question on Stack Overflow.  But I bet there were 10 times that many who suffered in silence (like me).  

    **Recommendation 19:** There needs to be an alert notification mechanism for urgent and critical bugs and regression bugs.  Saying “All Cordova app developers need to keep a watching eye on JIRA for bugs that may impact them” doesn't cut it.  JIRA requires a whole set of additional knowledge that a Cordova app developer just shouldn't have to have.  By making JIRA usage a mandatory requirement of Cordova app developers, you are increasing the barrier to use for Cordova.

15. Bug fixing: I understand the issue of all Cordova contributors are volunteers and they self-choose what they want to work on next, BUT, change requests DO need to be prioritised.  High-priority bug fixes DO need to be addressed before new features.  

    **Recommendation 20:** Someone needs to have the responsibility of (a) assigning a high priority to urgent bugs and (b) monitoring that these are being fixed in a “timely manner”.  

    **Recommendation 21:** The monthly metrics package should be upgraded to include “Best”, “Average” and “Worst” time to fix high-priority bug/change requests.

16. Support: Where in the documentation is it written that Cordova app developers must actively look at Stack Overflow for answers, and that there is a very active community on Stack Overflow?  

    **Recommendation 22:** Just as there is a “Want to Contribute?” page on the Cordova web site, there should also be a “How to be a Cordova App Developer” page on the Cordova web site.  

    **Recommendation 23:**  Document how the documentation web page “Edit” button works in here.

17. Support: Why should Cordova app developers have to go outside of the Cordova Documentation web site for information on how to get Cordova to work?  It is one thing to answer a question on Stack Overflow.  It is another to be analysing these questions and answers to look for opportunities to add them to the documentation.  

    **Recommendation 24:** Get someone to take responsibility for periodically trawling Stack Overflow for “good questions and answers” and merge these back into the Cordova Documentation web site.  

    **Recommendation 25:** Get someone to curate the responses on Stack Overflow to mark as “wrong”, “changed” or “obsolete” those answers that are no longer applicable.

18. Cordova app development workflow cycle times: It takes about 5 minutes to build and initiate the running of my app.  By that time I have forgotten what I was doing.  During that 5 minutes I go onto other things (to improve my productivity) and that compounds the “memory loss” situation.  

    **Recommendation 26:** Speed up this build cycle time.

19. Complexity: Most Cordova examples and commentators show very simple code.  As soon as combinations are added, lots of functions don't work as expected.  I have code that doesn't work but if I shift it around, it does work.  I have code that works on the first build and run, but fails on all subsequent builds and runs (without changing a line of code) unless I delete the app from the platform or delete a plugin first.  

    **Recommendation 27:** Develop more automated tests on complex apps, rather than just simple tests.

20. Cordova development cycle times: The overall Cordova development operation comes across as Cordova contributors writing good code, even fantastic code, but not supporting it or delivering what Cordova app developers need.  Yep, new features and bug fixes are being churned out in a very fast manner (the “train” as I have seen it called), but as the features have increased, the number of regression bugs have increased.  

    **Recommendation 28:** Slow down the pace of releases.  

    **Recommendation 29:** Spend more time performing integration testing before publishing a new release.  

    **Recommendation 30:** Develop more automated tests that exercise complex interactions.

21. Bluetooth plugin: Why isn't this part of the core set of plugins?  Bluetooth is a ubiquitous capability on all platforms.  This is another example of inconsistencies within Cordova.  

    **Recommendation 31:** Obtain the “best” pre-existing Cordova Bluetooth plugin and bring it into the Cordova core plugins fold.

22. Asking for feedback: On first inspection, putting an “Edit” button on every documentation page seems like a good idea.  However, most Cordova app developers don't work that way.  Its kind of like writing a User's Guide... the developers can say “we tried”, but no one reads the User's Guide and so the underlying problem still exists.  You can argue that that's how Cordova app developers SHOULD behave, but, in reality, its not how they DO behave.  I have given a more detailed insight into this in the email thread “Edit to Edit on Github for Docs”.

23. Barrier to entry as a Cordova contributor: The barrier to becoming a Cordova contributor is high.  I can't even work out what tool is used for developing the markdown documentation (every markdown tool seems to have its own quirks).  When I asked this question (2 months ago), I was just ignored.  The communications-between- contributors style is one that takes getting used to.  Yes, I understand that you are all busy “doing stuff” and emails are written in abbreviated form, but this comes across as “a closed clique communications style”.  I personally, have been working on my own (as in, my own boss) for 30+ years and I'm not used to having someone “bark orders at me”.  Often I misunderstand statements that are made by Cordova contributors. 

    **Recommendation 32:** On the “Want to Contribute?” page, add a link to a new web page listing the tools that are used to develop, test, document and distribute Cordova.  

    **Recommendation 33:** Try to be a little more “sociable” when communicating with new Cordova contributors (like me... I'm not shy and sensitive, but a little bit of courtesy would go a long way).  Be more empathetic and try “asking” rather than “telling” them to do something (like “create a JIRA for that”).

24. Cordova contributor bureaucracy: It seems that whenever anyone suggests something for Cordova, the standard reply is “fill in a JIRA and we'll look at it”.  This comes across as “Fill in the form process obsession in the extreme”.  It would be a lot less frustrating for newbies to have a response of “Would you like me to create a JIRA for you?”.  I and others (eg, see “cordova-android pull request: Update SystemWebViewEngine” → “That is too much for me and I don't have enough time to learn how to do that, I've tried to help others by fixing an issue that I had an others might have too.  Please reject my pull request,”) have been turned off by this.  

    **Recommendation 34:** Look for ways to automate the creation of a JIRA from an email.

25. Overall: We'd all like to “just write code” and “add new features” but getting the above issues addressed properly is a necessary fact of life for all professional developers.  

    **Recommendation 35:** Stop all development of new features and spend a few months fixing the above.