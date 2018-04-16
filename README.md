## :warning: Deprecated

This package is deprecated in favor of [our new design system](https://github.com/contactlab/design-system).

**Thus:**
- no new developments will be made;
- all issue will be closed with the tag `won't fix`;
- no new pull-requests will be accepted (except for bug fixes - *see below*);
- only blocking bugs will be fixed, if necessary.

# Contactlab Pattern Library UI Components

[![Build Status](https://travis-ci.org/contactlab/contactlab-ui-components.svg)](https://travis-ci.org/contactlab/contactlab-ui-components)

### Required tools
- [NodeJS](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/lang/en/)


### Installation
Polymer 1.x version (stable)

```
$ yarn add contactlab-ui-components@1.4
```

Polymer 3.x (preview)

```
$ yarn add contactlab-ui-components@2.0
```

Legacy version on Bower

```
$ bower install clab-ui-components#1.3.7
```

### Shady DOM & Global CSS
**WARNING:** both versions of the Contactlab Pattern Library make use of the ```Shady DOM``` instead of ```the Shadow DOM``` and styles are applied via a global CSS file, so after the package installation you should move, (manually or with an automation tool) the ```./_assets/css/contactlab-pattern.min.css``` file in a distributable folder and link to it.

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

### How to use & Documentation

For detailed instruction on how to install and use the Contactlab Pattern Library components check out the [documentation website](https://ux.contactlab.com).


### NOTE on Yarn
> Everything can be run with NPM as well!

### Git branching policies
Any feature/bug fixing/refactor must be developed on a **feature branch** derived from the **develop** branch and integrate the changes through a **pull request** to have a code review.

### License
Released under the [Apache 2.0](LICENSE) license.
