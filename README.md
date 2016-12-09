# Contactlab Pattern Library UI Components

[![Build Status](https://travis-ci.org/contactlab/contactlab-ui-components.svg)](https://travis-ci.org/contactlab/contactlab-ui-components)

## Installation

### Required tools
- [NodeJS](https://nodejs.org/)
- [Bower](https://bower.io/) (```$ npm install -g bower```)
- [Gulp](http://gulpjs.com) (```$ npm install -g gulp-cli``` and ```npm install --save-dev gulp```) (only for development)

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
$ npm install
$ bower install
```

to install required dependencies.

### Development

Running the command

```
$ gulp dev
```

you can work with Javascript files. This command automatically compiles ES6 to ES5 via Babel and Webpack.
If you only need to work with markup and styles, you can run

```
$ gulp ux
```

to automatically compile SASS to CSS on every .scss file save.

**Both** actions starts a webserver as explained above.

### Builds

`$ gulp build` - Bundle and minify all the components in a single **clab-ui-components.html** file in the root.

`$ gulp build -c [component]` - Build and minify a single component inside its folder, specified by the argument passed after the flag, and create a **[component].html** file.

`$ gulp build -c [component1],[component2],[component3]` - Same as above except it builds multiple components individually.

### Testing

Start test suites with **web-component-tester**:

	$ wct

If you want to see tests on your browser (Chrome):

	$ wct -p

### Git branching policies

Any feature/bug fixing/refactor must be developed on a **feature branch** derived from the **develop** branch and integrate the changes through a **pull request** to have a code review.

### License
Apache 2.0
