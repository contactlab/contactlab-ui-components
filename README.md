# ContactLab Pattern Library UI Components

### Installation
To include the components in your project you first need Bower installed on your machine.

Stable branch

	bower install https://github.com/contactlab/contactlab-ui-components

Development branch (unstable)

	bower install https://github.com/contactlab/contactlab-ui-components#develop

### Dependencies
The following required libraries and polyfills are resolved by Bower during the installation:

- [Polymer](https://www.polymer-project.org/1.0/)
- [MomentJS](http://momentjs.com/)
- [Rome](https://bevacqua.github.io/rome/)
- [Fetch API](http://github.github.io/fetch/) *(polyfill)*
- [ES6 Promises](https://github.com/stefanpenner/es6-promise) *(polyfill)*
- [Web Animations](https://github.com/web-animations/web-animations-js) *(polyfill)*

### How to use & Documentation
For detailed instruction on how to install and use the ContactLab Pattern Library components check out the [documentation website](https://ux.contactlab.com).

### IE issues
Internet Explorer 11 does not support the .from() method in the Array object. You can use [this polyfill](https://github.com/ChilldeinEistee/Array.from) to fix the issue. In a future release we will ship this polyfill within the project.

### Builds

`$ gulp build`  				
Build all elements inside a single file (clab-ui-components.html)  
`$ gulp build --all` 	
Build all elements inside a poper folder (elementName/elementName.html)  
`$ gulp build --single [elementName]`  
Build single choosen element inside proper folder (elementName/elementName.html)  
`$ gulp build --single [elementName1,elementName2,...]`  
Build every choosen elements and wrap in a file (clab-ui-components-custom.html)

<!-- ### Building
* gulp build: 					creates a minified file containing all the components in the root folder.
* gulp build -s: 				vulcanize every single component separately.
* gulp build -s 'folder':		vulcanize specific component. -->

### Testing
Work in progress

### License
Apache 2.0 [http://www.apache.org/licenses/](http://www.apache.org/licenses/)
