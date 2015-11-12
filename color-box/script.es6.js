class ColorBox {

	beforeRegister(){
		this.is = "color-box";
		this.properties = {
			label: {
				type: String,
				value: "Color Name"
			},
			hex:{
				type: String,
				value: "000000"
			}
		}
	}


	getClass(str){
		return str.toLowerCase().replace(' ','-');
	}

}


Polymer(ColorBox);