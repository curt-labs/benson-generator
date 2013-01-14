# Hey you, you like the softwares? Open Source? Javascript? You'll dig me.


I'm a [yeoman.io](https://github.com/yeoman/yeoman) application that incorporates the [express](https://github.com/visionmedia/express) node.js library. Some of my yeoman.io features are broken right now, but I'm working on that...believe you me.

Oh the web.config file is in case you want to throw this on IIS using [iisnode](https://github.com/tjanczuk/iisnode).


# Welcome, Friend!

## What am I?

Yeoman is a robust and opinionated client-side stack, comprised of tools and frameworks that can help developers quickly build beautiful web applications. We take care of providing everything needed to get started without any of the normal headaches associated with a manual setup.

![image](http://yeoman.io/media/yeoman-masthead.png)

Yeoman is fast, performant and is optimized to work best in modern browsers.

For more information about the project, see [yeoman.io](http://yeoman.io).


## Installation

Simply run:

```shell
curl -L get.yeoman.io | bash
```

*Yeoman requires Node >=0.8*

## Documentation

For more information on Yeoman, please read our [complete documentation](https://github.com/yeoman/yeoman/tree/master/docs/cli).

Yeoman supports a powerful set of high-level commands. These include:

```shell
yeoman init      # Initialize and scaffold a new project using generator templates
yeoman build     # Build an optimized version of your app, ready to deploy
yeoman server    # Launch a preview server which will begin watching for changes
yeoman test      # Run a Mocha test harness in a headless PhantomJS

yeoman install   # Install a package from the client-side package registry
yeoman uninstall # Uninstall the package
yeoman update    # Update a package to the latest version
yeoman list      # List the packages currently installed
yeoman search    # Query the registry for matching package names
yeoman lookup    # Look up info on a particular package

```

A common initial workflow with Yeoman might be:

```shell
yeoman init        # Invoke the most basic application scaffold (Bootstrap, Boilerplate etc.)
yeoman server      # Fire off a file watch/server process which also places an
                   # intermediate build of your project in `temp`
yeoman build       # Build your project, creating an optimized version in a new `dist` directory
yeoman server:dist # Serve up the production-ready version of your application

```

Some more examples of how to use our commands include:

```shell
# Generators for MVC/MV* Frameworks
yeoman init quickstart                   # Skip our questions and get a H5BP, jQuery and Modernizr base
yeoman init bbb                          # Backbone Boilerplate generator scaffold
yeoman init ember                        # Ember-Rails generator scaffold
yeoman init ember-starter                # Create a "Hello World" Yeoman project with the Ember Starter Kit
yeoman init backbone                     # Backbone-Rails generator scaffold
yeoman init angular                      # Invoke the AngularJS generator scaffold
yeoman init angular:controller           # Invoke the AngularJS Controller sub-generator

# Generator for Chrome Apps
yeoman init chromeapp

# Additional server profiles
yeoman server:app                        # Serves up an intermediate build of your application
yeoman server:dist                       # Serves up a production build, if you've built before
yeoman server:test                       # Serves your test suite

# Package management
yeoman search jquery                       # Lookup jQuery in the Bower registry
yeoman install jquery underscore [depName] # Install a dependency or dependencies
yeoman update jquery                       # Update a specific dependency (e.g jquery)
```
![image](http://yeoman.io/media/yeoman-packages.png)

We also have [extended documentation](https://github.com/mklabs/yeoman/wiki/_pages) available for those more interested in the Yeoman internals.


#### Issue submission

In order for us to help you please check that you've completed the following steps:

* Made sure you're on the latest version
* Read our documentation and README to ensure the issue hasn't been noted or solved already
* Used the search feature to ensure that the bug hasn't been reported before
* Included as much information about the bug as possible, including any output you've received, what OS and version you're on.
* Shared the output from `echo $PATH $NODE_PATH` and `brew doctor` as this can also help track down the issue.

Then open a [new issue](https://github.com/yeoman/yeoman/issues/new) and one of the team will be happy to follow up with you.


#### Bower

Yeoman uses [Bower](http://twitter.github.com/bower/) as its package manager. The Bower registry is currently being populated, you may find that certain packages work and others do not. We are actively working with the Bower team to resolve this issue and hope to have fully functional packages in place upon launch.


## Browser Support

* Modern browsers (latest version of Chrome, Safari, Firefox, Opera and IE10)
* Chrome on Android
* Mobile Safari

![image](http://yeoman.io/media/yeoman-browsers.png)

## Platform Support

Yeoman 1.0 will support OS X and Linux. We will be aiming to bring in support for Windows in a [future](https://github.com/yeoman/yeoman/issues/216) version of the project.

## Contribute

We are more than happy to accept external contributions to the project in the form of feedback, bug reports and even better - pull requests :) At this time we are primarily focusing on improving the user-experience and stability of Yeoman for our first release. Please keep this in mind if submitting feature requests, which we're happy to consider for future versions.

### Repos

Yeoman has three primary repos:

* [main project](http://github.com/yeoman/yeoman)
* [generators](http://github.com/yeoman/generators)
* [yeoman.io](http://github.com/yeoman/yeoman.io)

### Quick Start

* Clone this repo and `cd` into it
* Run this command: `./setup/install.sh`
* `cd` into the `/cli` directory and run `sudo npm link` after the install is complete.
* Navigate to a new directory and run `yeoman init` to make sure everything is working as expected.

You can keep Yeoman up to date by using `git pull --rebase upstream master && cd cli && npm link`, where `upstream` is a remote pointing to this repo.

### Style Guide

This project uses single-quotes, two space indentation, multiple var statements and whitespace around arguments. Please ensure any pull requests follow this closely. If you notice existing code which doesn't follow these practices, feel free to shout and we will address this.

### Pull Request Guidelines

* Please check to make sure that there aren't existing pull requests attempting to address the issue mentioned. We also recommend checking for issues related to the issue on the tracker, as a team member may be working on the issue in a branch or fork.
* Lint the code by running `grunt` in the `/cli` folder before submitting a pull request
* Develop in a topic branch, not master

### Tests

Yeoman has a test suite to ensure it's reliably and accurately working as a developer tool. You can find the main test suite in [`test/test-build.js`](https://github.com/yeoman/yeoman/blob/master/cli/test/test-build.js), most of the assertions are [checks against yeoman cli stdout](https://github.com/mklabs/yeoman/wiki/test-build).

To run our test suite:

```sh
npm test
```

Do note that if any CLI prompts are not accounted for the test suite will have a timeout failure.

### Developer Docs

We have significant developer docs for you if you'd like to hack on Yeoman.

Currently you can find much of the details on [mklabs' yeoman wiki](https://github.com/mklabs/yeoman/wiki/_pages) but also [our primary project](https://github.com/yeoman/yeoman/tree/master/docs/cli).

You're also welcome to `git blame` back to commit messages and pull requests. As a project we value comprehensive discussion for our fellow developers.

## About

Yeoman is an open-source project by [Google](http://google.com) which builds on top of [Grunt](https://github.com/cowboy/grunt) and [node-build-script](http://github.com/h5bp/node-build-script). We utilize a number of useful open-source solutions including:

* Twitter Bootstrap
* HTML5 Boilerplate
* Modernizr
* Twitter Bower
* Node.js
* NPM
* Compass
* Socket.IO
* CoffeeScript
* Mocha
* Jasmine
* PhantomJS
* And [more...](https://github.com/yeoman/yeoman/wiki/Tools-Used)

Version 1 of the project features the combined efforts of:

* [Paul Irish](http://paulirish.com)
* [Addy Osmani](http://addyosmani.com)
* [Mickael Daniel](http://blog.mklog.fr)
* [Sindre Sorhus](http://sindresorhus.com)
* [Eric Bidelman](http://ericbidelman.com)

and other developers.


## License

Yeoman is released under a [BSD](http://opensource.org/licenses/bsd-license.php) license.



![express logo](http://f.cl.ly/items/0V2S1n0K1i3y1c122g04/Screen%20Shot%202012-04-11%20at%209.59.42%20AM.png)

  Fast, unopinionated, minimalist web framework for [node](http://nodejs.org). [![Build Status](https://secure.travis-ci.org/visionmedia/express.png)](http://travis-ci.org/visionmedia/express)

```js
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('Hello World');
});

app.listen(3000);
```

## Installation

    $ npm install -g express

 To install the 3.0 alpha:
 
    $ npm install -g express@3.0

## Quick Start

 The quickest way to get started with express is to utilize the executable `express(1)` to generate an application as shown below:

 Create the app:

    $ npm install -g express
    $ express /tmp/foo && cd /tmp/foo

 Install dependencies:

    $ npm install

 Start the server:

    $ node app

## Features

  * Built on [Connect](http://github.com/senchalabs/connect)
  * Robust routing
  * HTTP helpers (redirection, caching, etc)
  * View system supporting 14+ template engines
  * Content negotiation
  * Focus on high performance
  * Environment based configuration
  * Executable for generating applications quickly
  * High test coverage

## Philosophy

  The Express philosophy is to provide small, robust tooling for HTTP servers. Making
  it a great solution for single page applications, web sites, hybrids, or public
  HTTP APIs.
  
  Built on Connect you can use _only_ what you need, and nothing more, applications
  can be as big or as small as you like, even a single file. Express does
  not force you to use any specific ORM or template engine. With support for over
  14 template engines via [Consolidate.js](http://github.com/visionmedia/consolidate.js)
  you can quickly craft your perfect framework.

## More Information

  * Join #express on freenode
  * [Google Group](http://groups.google.com/group/express-js) for discussion
  * Follow [tjholowaychuk](http://twitter.com/tjholowaychuk) on twitter for updates
  * Visit the [Wiki](http://github.com/visionmedia/express/wiki)

## Viewing Examples

First install the dev dependencies to install all the example / test suite deps:

    $ cd express
    $ npm install

then run whichever tests you want:

    $ node examples/content-negotiation

## Running Tests

To run the test suite first invoke the following command within the repo, installing the development dependencies:

    $ npm install

then run the tests:

    $ make test

## License 

(The MIT License)

Copyright (c) 2009-2012 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.