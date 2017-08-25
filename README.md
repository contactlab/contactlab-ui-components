# Contactlab Pattern Library UI Components
**Polymer v3 (hybrid)**

This is a hybrid version of the legacy Contactlab Pattern Library UI Components that works with ```Polymer v3``` using ```global CSS``` styles and ```ShadyDOM```.

This is a required step **for us** since we need to upgrade our applications to Polymer v3 & NPM workflows while keeping this UI components with stable functionalities and appearance.

We are currently working on the **next iteration of our Design System** that will involve a complete rewrite of both styles and scripts of there components in a full Web Components v1 / Polymer v3 syntax.

<!--[![Build Status](https://travis-ci.org/contactlab/contactlab-ui-components.svg)](https://travis-ci.org/contactlab/contactlab-ui-components)-->

## Installation

### Required tools
- [NodeJS](https://nodejs.org/)
- NPM/Yarn

```
$ yarn add https://github.com/contactlab/contactlab-ui-components#3.0-hybrid
```

### Enabling ShadyDOM with WebComponents v1
In the main .html file add this script snippet **BEFORE** loading the WebComponents v1 polyfills.

```html
<script>
  window.ShadyDOM = { force: true };
  window.customElements.forcePolyfill = true;
</script>
```

This is a **required** step to work with this version of the Contactlab Pattern Library components.

### How to use
Importing all the UI components library
```javascript
import 'contactlab-ui-components';
```

Importing a single component, ```<button-clab>``` for instance:
```javascript
import 'contactlab-ui-components/src/button';
```

### Dependencies
The following required libraries and polyfills are resolved by the package manager during the installation:

- [Polymer v3](https://www.polymer-project.org/)
- [Ikonograph v2](https://github.com/contactlab/ikonograph/releases/tag/v2.0.0)
- [MomentJS](http://momentjs.com/)
- [Rome](https://bevacqua.github.io/rome/)
- [Fetch API](http://github.github.io/fetch/) *(polyfill)*
- [ES6 Promises](https://github.com/stefanpenner/es6-promise) *(polyfill)*
- [Web Animations](https://github.com/web-animations/web-animations-js) *(polyfill)*

### How to use & Documentation

For detailed instruction on how to install and use the Contactlab Pattern Library components check out the [documentation website](https://ux.contactlab.com).

### Development

Running the command

	$ yarn run dev

you can work with Javascript files. This command automatically compiles ES6(2015) to ES5 via Babel and Webpack and starts a static web server on `localhost:3000`.

### Styling

To compile and watch the sass files run:

```
$ yarn run sass
```

<!--### Testing

Start test suites with **web-component-tester**:

	$ yarn test

If you want to see tests on your browser (Chrome):

	$ yarn run test:p-->

### NOTE on Yarn
> Everything can be run with NPM as well!

### Git branching policies
Any feature/bug fixing/refactor must be developed on a **feature branch** derived from the **develop** branch and integrate the changes through a **pull request** to have a code review.

### License
Released under the [Apache 2.0](LICENSE) license.
