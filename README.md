# Contactlab Pattern Library UI Components

[![Build Status](https://travis-ci.org/contactlab/contactlab-ui-components.svg)](https://travis-ci.org/contactlab/contactlab-ui-components)

### Installation
To include the components in your project you first need Bower installed on your machine.

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

### Builds
`$ gulp build` - Bundle and minify all the components in a single **clab-ui-components.html** file in the root.

`$ gulp build -c [component]` - Build and minify a single component inside its folder, specified by the argument passed after the flag, and create a **[component].html** file.

`$ gulp build -c [component1],[component2],[component3]` - Same as above except it builds multiple components individually.

### Testing  
Start test suites with **web-component-tester**:

	$ wct

If you want to see tests on your browser (Chrome):

	$ wct -p

### License
Apache 2.0
