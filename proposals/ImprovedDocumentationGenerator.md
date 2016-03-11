Doc System Improvement Proposal
===============================

## Motivation

Our current docs are becoming slightly out of date and not keeping up with our development pace. The current docs system has a high latency and steep learning curve for maintenance, and it has started functionally and visually lagging behind docs for related technologies (see [react][react_docs], [unity][unity_docs], [ember][ember_docs], [angular][angular_docs], [ionic][ionic_docs]).

This proposal aims to accomplish the following three goals for our documentation:

- add a search feature
- make contribution very easy
- set up automatic deployment

Below is a formalized list of requirements that are proposed for the Cordova docs.

## Requirements

The following features must be supported by the Cordova docs.

<dl>
    <dt>"edit on github" buttons</dt>
    <dd>
        Can easily submit changes to the docs via a PR on GitHub by clicking on an "Edit this page" button or something similar.
    </dd>
    <dt>search</dt>
    <dd>
        Can search through the full text of the docs.
    </dd>
    <dt>doc versions</dt>
    <dd>
        Can browse and change docs for any Cordova version.
    </dd>
    <dt>localization</dt>
    <dd>
        Can easily translate the docs into and/or read the docs in different languages.
    </dd>
    <dt>API docs</dt>
    <dd>
        Can automatically get generated docs for public APIs (plugins, cordova-lib, cordova-js).
    </dd>
    <dt>analytics</dt>
    <dd>
        Can have analytics for the docs website.
    </dd>
</dl>

The following features are nice to have in the Cordova docs.

<dl>
    <dt>easy transition</dt>
    <dd>
        Changes to the docs inconvenience people as little as possible.
    </dd>
    <dt>good UI</dt>
    <dd>
        The UI for the docs is aesthetically pleasing, intuitive to use, and gets relevant information with as little friction as possible.
    </dd>
</dl>

## Constraints

<dl>
    <dt>free</dt>
    <dd>
        We don't have a budget outside of our own computing power and engineering resources.
    </dd>
    <dt>static</dt>
    <dd>
        The generated docs should be static files (unless we find a free hosted solution).
    </dd>
</dl>

## Solutions

### [Sphinx][sphinx]/[Readthedocs][rtfd]

Sphinx is a mature and complete documentation system written in Python. All documentation hosted by [readthedocs.org][rtfd] uses Sphinx. Sphinx meets all functional requirements of this proposal.

Pros:

- mature and used by many large software projects; many people know it
- feature-rich: search, referencing, internationalization, templating, generation, plugins, and many others

Cons:

- needs some knowledge of Python
- needs migration from Markdown to [reStructuredText][rest]
- needs migration from Crowdin to Sphinx's own [internationalization tools][sphinx_int]

### [Jekyll][jekyll]

Jekyll is a static site generator written in Ruby. It is used to generate the docs of [React.js][react_docs]. It meets some functional requirements of this proposal.

Pros:

- mature and used for many static websites; many people know it
- integrates well with other tools
- has powerful templating for the output

Cons:

- does not have search or internationalization

### [JSDoc][jsdoc]

JSDoc is a mature documentation system written in JS. It is used as a back-end to generate automated source code docs for many JS projects. It meets some functional requirements of this proposal.

Pros:

- mature and widely used; many people know it
- integrates well with other tools

Cons:

- does not have search or internationalization

### [Current System][cordova-docs]

The current Cordova docs could also be extended to meet the proposed requirements.

Pros:

- no migration required

Cons:

- does not have search or templating
- non-standard, so the learning curve remains

Proposals
=========

### Option #1: Sphinx

Sphinx (either with readthedocs.org or without) would provide a complete solution for Cordova's documentation needs. However, it would require a (hefty) migration.

### Option #2: Jekyll + JSDoc + Crowdin

A mix of Jekyll, JSDoc, and the current Crowdin pipeline would suit Cordova's documentation needs. The existing documentation can be migrated to such a system with only moderate effort.

Notes
=====

[This prior analysis][comparison] was used to decide on a JS documentation framework. Currently no quantitative analysis has been made to compare the solution candidates, but one can be carried out if required.

[react_docs]:   https://facebook.github.io/react/docs/getting-started.html
[unity_docs]:   http://docs.unity3d.com/Manual/index.html
[ember_docs]:   http://guides.emberjs.com/v1.12.0/
[angular_docs]: https://docs.angularjs.org/api
[ionic_docs]:   http://ionicframework.com/docs/

[comparison]:   http://blog.fusioncharts.com/2013/12/jsdoc-vs-yuidoc-vs-doxx-vs-docco-choosing-a-javascript-documentation-generator/
[sphinx]:       http://sphinx-doc.org/
[rtfd]:         https://readthedocs.org/
[rest]:         http://docutils.sourceforge.net/rst.html
[sphinx_int]:   http://sphinx-doc.org/latest/intl.html
[jekyll]:       http://jekyllrb.com/
[jsdoc]:        http://usejsdoc.org/
[cordova-docs]: https://github.com/apache/cordova-docs
