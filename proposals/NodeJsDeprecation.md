# Deprecation of node.js 0.x and upgrade to a minimum usage of node.js 6.x in Apache Cordova
- Status: Proposed

Right now, all the platforms and plugins require a minimum of `node 0.10` to be installed. `node 0.10` has been out of LTS [1] for a while now, and its maintenance period (security bug fixes) **stops on Oct 2016**. `node 0.12` will be out of maintenance **Jan 1st 2017**.

I propose an immediate deprecation of our `node 0.x` support, and a migration to a minimum of `node 6.x` once the deprecation period is over. The deprecation period will run for 3 months, and ends Jan 1st 2017. `node 6.x` will be on active LTS **Oct 2016**, with `node 7.x` as the **current** release at the same time [2].

What does `node 6.x` give us? `99% ES2015 (ES6)` support [3], and `100% ES2016 (ES7)` support [4].

Also, on **Oct 1st 2016**, the **default** `node` version that people download on `nodejs.org` will be `node 6.x`.


## Proposed Timeline

**Oct 1st 2016** - deprecate use of `node 0.x`. Make sure all AppVeyor/Travis CI builds still test using `node 0.x` as well as `node 6.x`. Add a requirements check that will print out a deprecation notice if they are using a node < 6, and telling them to upgrade to a minimum of 6.

**Jan 1st 2017** - Make sure all AppVeyor/Travis CI builds only test for `node 6.x`. Safe to use ES6 and ES7 features in Apache Cordova. Tools and platforms will have to bump a major version.


## Sources
 
[1] https://github.com/nodejs/LTS

[2] https://nodejs.org/en/blog/community/v5-to-v7/

[3] http://node.green/#ES2015

[4] http://node.green/#ES2016






