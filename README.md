# Contactlab Pattern Library UI Components

[![Build Status](https://travis-ci.org/contactlab/contactlab-ui-components.svg)](https://travis-ci.org/contactlab/contactlab-ui-components)

## Installation

### Required tools
- [NodeJS](https://nodejs.org/)
- [Bower](https://bower.io/) (```$ npm install -g bower```)
<!-- - [Gulp](http://gulpjs.com) (```$ npm install -g gulp-cli``` and ```npm install --save-dev gulp```) (only for development) -->

Stable branch

	$ bower install clab-ui-components

Development branch (unstable)

	$ bower install https://github.com/contactlab/contactlab-ui-components#develop

### Dependencies
The following required libraries and polyfills are resolved by Bower during the installation:

- [Polymer](https://www.polymer-project.org/1.0/)
- [MomentJS](http://momentjs.com/)
- [Rome](https://bevacqua.github.io/rome/)
- [Fetch API](http://github.github.io/fetch/) *(polyfill)*
- [ES6 Promises](https://github.com/stefanpenner/es6-promise) *(polyfill)*
- [Web Animations](https://github.com/web-animations/web-animations-js) *(polyfill)*

### How to use & Documentation

For detailed instruction on how to install and use the Contactlab Pattern Library components check out the [documentation website](https://ux.contactlab.com).

<!-- ### IE issues
Internet Explorer 11 does not support the .from() method in the Array object. You can use [this polyfill](https://github.com/ChilldeinEistee/Array.from) to fix the issue. In a future release we will ship this polyfill within the project. -->

### Repository clone and dependencies installation

From the command line, run

```
$ yarn
$ bower install
```

to install required dependencies.

### Development

Running the command

	$ yarn run dev

you can work with Javascript files. This command automatically compiles ES6(2015) to ES5 via Babel and Webpack and starts a static web server on `localhost:8080`.

#### Complete
Bundle and minify all the components in a single **clab-ui-components.html** file in the root:

    $ yarn run build

#### Custom
Bundle and minify a group of components in a single bundle **clab-ui-components-custom.html** file in the root:

    $ yarn run build g=tooltip,radio,checkbox

#### No-Polymer
Add a `no-polymer` flag to **exclude Polymer** from vulcanization bundle:
> NOTE: **as is not possible to include two vulcanized copy of Polymer** within an application bundle, this "no-polymer" bundle will allow you to include Polymer in your vulcanized application and still be able to include the `contactlab-ui-components` as a normal `import`.

    $ yarn run build no-polymer
    $ yarn run build g=tooltip,radio,checkbox no-polymer

#### Sanity check
A ***pure*** demo is located at `contactlab-ui-components/_demo/demo-pure.html` to test the components after a build.  
Note that only the ***complete*** build file is included in the `demo-pure.html`. You need to change the `import` if you want to test a ***custom*** bundle.


### Testing

Start test suites with **web-component-tester**:

	$ yarn test

If you want to see tests on your browser (Chrome):

	$ yarn run test:p

### NOTE on Yarn
> Everything can be run with NPM as well!

### Git branching policies
Any feature/bug fixing/refactor must be developed on a **feature branch** derived from the **develop** branch and integrate the changes through a **pull request** to have a code review.

### License
Released under the [Apache 2.0](LICENSE) license.
