## :warning: Deprecated

This package is deprecated in favor of [our new design system](https://github.com/contactlab/design-system).

**Thus:**

-   no new developments will be made;
-   all issue will be closed with the tag `won't fix`;
-   no new pull-requests will be accepted (except for bug fixes - _see below_);
-   only blocking bugs will be fixed, if necessary.

# Contactlab Pattern Library UI Components

[![Build Status](https://travis-ci.org/contactlab/contactlab-ui-components.svg)](https://travis-ci.org/contactlab/contactlab-ui-components)

## Installation

Polymer 1.x version (stable)

```sh
$ npm install contactlab-ui-components@1.4

# --- or ----

$ yarn add contactlab-ui-components@1.4
```

Polymer 3.x (preview)

```sh
$ npm install contactlab-ui-components@2.0

# --- or ----

$ yarn add contactlab-ui-components@2.0
```

Legacy version on Bower

```
$ bower install clab-ui-components#1.3.7
```

## Shady DOM & Global CSS

**WARNING:** both versions of the Contactlab Pattern Library make use of the `Shady DOM` instead of the `Shadow DOM` and styles are applied via a global CSS file, so after the package installation you should move (manually or with an automation tool) the `./_assets/css/contactlab-pattern.min.css` file in a distributable folder and link to it.

## Development

To start a development server on `localhost:3000` plus Webpack in _watch_ mode, you can use the command

```sh
$ npm run dev
```

To run the **unit tests** written with [AVA](https://github.com/avajs/ava)

```sh
$ npm test
```

Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) to better understand how to develop and integrate changes on this repo.

## How to use & Documentation

For detailed instruction on how to install and use the Contactlab Pattern Library components check out the [documentation website](https://ux.contactlab.com).

## Git branching policies

Any feature/bug fixing/refactor must be developed on a **feature branch** derived from the **master** branch and integrate the changes through a **pull request** in order to have a code review.

## License

Released under the [Apache 2.0](LICENSE) license.
