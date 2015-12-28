module.exports= function(){
	var faker = require("faker");
	var _ = require("lodash");
	return {
		options: _.times(20, function(n){
			var prod=faker.commerce.productName();
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