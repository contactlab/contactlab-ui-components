kawoTooltip
===========
[![kawo-tooltip version](https://img.shields.io/badge/kawo--tooltip-v1.0.6-brightgreen.svg)](https://github.com/mailmangroup/kawo-tooltip/) [![License](http://img.shields.io/badge/License-MIT-blue.svg)](http://opensource.org/licenses/MIT)

We wanted a super simple, zero config options, declarative tooltip library with no dependencies. We couldn't find one, so we wrote our own.

[View Demo](http://jsfiddle.net/alexduncan/ce296hyo/)

# Installation

Just use bower to install.
```bash
$ bower install kawo-tooltip
```

### RequireJS
The tooltip self-initializes so all you need to do is require it.
```javascript
require.config({
	paths: {
		kawoTooltip: '../bower_components/kawo-tooltip/dist/kawo-tooltip.min'
	}
});

require( [ 'kawoTooltip' ], function() {

});
```

### Basic Script Include
```html
<script src="./bower-components/kawo-tooltip/dist/kawo-tooltip.min.js"></script>
```


# Usage

Simply add the attribute `data-tooltip` to any element on which you wish to display a tooltip.
```html
<p data-tooltip="Text to display">This tooltip works on almost any HTML element.</p>
```
The `data-tooltip` attribute can contain HTML.


# Styling The Tooltip

By default `kawo-tooltip.js` only defines essential styles. Both the tooltip and the arrow have the classes `.kawo-tooltip` and `.kawo-tooltip-arrow` applied to them so you can style them as you wish. As a minimum we recommend the following styles.

```css
.kawo-tooltip {
	max-width: 200px;
	padding: 5px 8px;
	font-size: 14px;
	color: #fff;
	background-color: #333;
}

.kawo-tooltip-arrow {
	border: 6px solid #333;
	border-bottom-color: transparent;
	border-right-color: transparent;
}
```

For reference when writing your CSS styles; this is what the tooltip HTML looks like:
```html
<div class="kawo-tooltip" style="[...]">
	<span> ...content from data-tooltip attribute goes here... </span>
	<div class="kawo-tooltip-arrow" style="[...]"></div>
</div>
```


# Build Your Own

If you want to customise **kawo-tooltip** you can build your own minified version using `uglifyjs`.
```bash
$ uglifyjs kawo-tooltip.js -c -m -o dist/kawo-tooltip.min.js
```