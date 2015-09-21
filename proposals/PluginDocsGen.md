# Cordova docs-gen proposal

## Intro

Cordova plugins documentation currently live separated from source code so that sync issues can occur on commits.
Proposed solution uses [JSDoc](http://usejsdoc.org/) to generate a plugin API docs, while allows to wrap the generated docs into template (markdown with handlebars partials) with extra-details like Quirks or additional examples.

## Libraries/frameworks used

* [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown/)

Proposal is currently implemented for cordova-plugin-camera only: [generated doc result](https://github.com/apache/cordova-plugin-camera/blob/dcc81bfbe16244cb460d3c5da79fe6ec22795ce7/README.md).

**Pros**:

* A nice TOC helps in understanding what APIs are exposed,
* A better structure for args with a table showing default values,
* Hyperlinks for type definitions,
* Literate programming makes sense - docs & code remain together,
* A common plugin [template](https://github.com/daserge/dmd-plugin-cordova-plugin) that is shared among all cordova official plugins including basic details such as:
  * How to install,
  * Where to file bugs,
  * Where to discuss design questions,
  * Provide a pointer to slack plugins community,
  * Buildbot badge.

**Cons**:

* Requires a generation script before every commit

**Summary instructions**:

* Put a template including license, header, install steps and extra docs (quirks) to `jsdoc2md/TEMPLATE.md`,
* Document `www` folder source code using JSDoc,
* [Mark all template extra-docs sections, which will be linked to as an `<a>` with `name`](https://github.com/MSOpenTech/cordova-plugin-camera/blame/5001fe35a091a6846e3207fe70fb5502743cfcd3/jsdoc2md/TEMPLATE.md#L96),
    * [Link JSDocs to the template' extra docs sections](https://github.com/MSOpenTech/cordova-plugin-camera/blob/5001fe35a091a6846e3207fe70fb5502743cfcd3/www/Camera.js#L126),
* Call `npm install` to install dev dependencies,
* Call [npm run gen-docs](https://github.com/MSOpenTech/cordova-plugin-camera/blob/5001fe35a091a6846e3207fe70fb5502743cfcd3/package.json#L45) to generate the documentation,
    * Docs generation script will also be called [automatically*](https://github.com/apache/cordova-plugin-camera/blob/dcc81bfbe16244cb460d3c5da79fe6ec22795ce7/package.json#L42) via [husky](https://www.npmjs.com/package/husky) precommit hook (*`npm install` is required).
