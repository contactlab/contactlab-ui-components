# Contactlab Pattern Library UI Components
**Polymer v3 (hybrid)**

[![Build Status](https://travis-ci.org/contactlab/contactlab-ui-components.svg?branch=next)](https://travis-ci.org/contactlab/contactlab-ui-components)

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

### How to use & Documentation

For detailed instruction on how to install and use the Contactlab Pattern Library components check out the [documentation website](https://ux.contactlab.com).

### Development
To start a development server on ```localhost:3000``` plus Webpack in *watch* mode, you can use the command

```
$ yarn dev
```

To run the **unit tests** written with [Ava.js](https://github.com/avajs/ava)

```
$ yarn test
```

Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) to better understand how to develop and integrate changes on this repo.

### Styling

To compile and watch the sass files run:

```
$ yarn run sass
```

### Notable changes from v1.4 / master branch
* **[tabs-clab]** do not accept HTML content anymore, you can still get the current opened tab via the `active` attribute or the `change` event.
* **[dropdown-clab]** has a [known issue](https://github.com/contactlab/contactlab-ui-components/issues/171) which prevents the curtain to show while it is in `search` mode.

### NOTE on Yarn
> Everything can be run with NPM as well!

### Git branching policies
Any feature/bug fixing/refactor must be developed on a **feature branch** derived from the **develop** branch and integrate the changes through a **pull request** to have a code review.

### License
Released under the [Apache 2.0](LICENSE) license.
