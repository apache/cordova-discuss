# Telemetry Proposal

Currently, we have no definitive way of answering the following questions:
- What features of Cordova are used and how often are they used ?
- How many users are using cordova as a tool 
> Note: NPM download counts are not accurate enough due to issues with caching, bots, etc...
- A breakdown view of cordova versions in use in the wild
 
The goal of this proposal is to suggest an implementation of telemetry in cordova.
Implementing telemetry in cordova will allow us to collect minimal and anonymous information that we could leverage 
to improve the user experience of our users, give us better insights into how many active users we have.

## What do we want to measure and why ?
The following information are what we want to gather/measure:

- What features/commands are being used and what is their frequency of use ?
- What is Cordova's active usage ? How many users are using cordova as a tool (using NPM downloads as a proxy is flawed in some regards)
- A breakdown analysis of cordova versions in use in the wild, this could inform our deprecation policies

Gathering this information will allow us to measure Cordova's active usage, Cordova's version breakdown (How many people are using cordova@4.0.0 vs cordova@5.0.0).

# Privacy 
The data gathered should adhere to the following rules:
- The data gathered should be anonymous, with no personally identifiable information collected
- The data gathered should only be used to guide new features implementation and the resolutions of issues, to better the lives of Cordova ecosystem actors(App Builders, Cordova Developers, etc...)
- Only Cordova PMC members should have access to the data collected
- Users should explicitly give their consent before telemetry is collected on them
- Users should be able to opt-out of telemetry any time they want by running ```cordova telemetry off```.
  They can opt back in with ```cordova telemetry on```.
> Note: the action of opting out of telemetry will be logged, but anything after that won't be.


# Where is the data saved ?
We will leverage Google Analytics to save the data gathered, and its dashboard will help us visualize and analyze data.

# Who has access to the data ?
Cordova PMC members will be the ones with access to the data. Later on, we can build on that and make aggregated version of the data public.

# Implementation specifics

### Repositories affected
The repository that will be modified to include telemetry is ```cordova-cli```. 

### Opt-in Prompt
Users shall be shown a timed prompt (with a link to a privacy notice) the first time they run cordova, and asked whether they want to enable telemetry or not.
If the prompt times out with the user having not provided any answer,
it will be assumed they do not agree to telemetry being collected.

### No Telemetry Flag
Users might opt out of telemetry on a command basis by using the ```--no-telemetry``` flag.
That way, they have the ability to enable telemetry and yet still disable it for specific commands as they see fit.
e.g: ```cordova run ios --no-telemetry```

### Continuous Integration environments
In CI environments, there will be a way to disable the telemetry prompt on first usage by setting an environment variable.
In case the environment variable is not set, the command invoked will wait for a few seconds, then proceed. This should ensure existing tools that make use of
cordova cli as an API don't break. Note however, that a delay is introduced.

### Per User
Telemetry shall be collected on a per-user basis.

### Offline scenario
In case the machine goes offline and sending telemetry fails, it shall be sent the next time it comes back online.


# Schema of payload

```
{
    time: 1461872979, // seconds since epoch
    user_id: '75890ed9-d2c4-4544-a89b-2d45884e6d5f', // randomly generated
    cordova_version: '6.1.1',
    os: 'Macintosh',
    command: 'prepare',
    command_result: 'succeeded',
}
```

# Next Steps
What is described in this document is the first step. In the future, we might consider tackling the following additional challenges:
 
- Errors & diagnostics: What commands are failing often ? and Why ?

