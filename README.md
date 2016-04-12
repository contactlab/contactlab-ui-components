# ContactLab Pattern Library UI Components

### Installation
To include the components in your project you first need Bower installed on your machine.

Stable branch

	bower install https://github.com/contactlab/contactlab-ui-components

Development branch (unstable)

	bower install https://github.com/contactlab/contactlab-ui-components#develop

### Dependencies
The following required libraries and polyfills are resolved by Bower during the installation:

- Polymer
- MomentJS
- Rome
- Fetch API *(polyfill)*
- ES6 Promises *(polyfill)*
- Web Animations *(polyfill)*

### How to use & Documentation
For detailed instruction on how to install amd use the ContactLab Pattern Library components check out the [documentation website](https://ux.contactlab.com).

### IE issues
Internet Explorer 11 does not support the .from() method in the Array object. You can use [this polyfill](https://github.com/ChilldeinEistee/Array.from) to fix the issue. In a future release we will ship this polyfill within the project.

### Testing
Work in progress

<!-- ### Building
* gulp build: 					creates a minified file containing all the components in the root folder.
* gulp build -s: 				vulcanize every single component separately.
* gulp build -s 'folder':		vulcanize specific component. -->

### License
Apache 2.0 [http://www.apache.org/licenses/](http://www.apache.org/licenses/)
