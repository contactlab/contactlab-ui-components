module.exports= function(){
	var faker = require("faker");
	var _ = require("lodash");
	return {
		options: _.times(1000, function(n){
			var prod=faker.name.findName();
			return {
				label: prod,
				value: prod
			}
		})
	}
}

//https://egghead.io/lessons/nodejs-creating-demo-apis-with-json-server

// To generate:
// json-server generate.js