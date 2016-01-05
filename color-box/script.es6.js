class ColorBox {

	get behaviors() {
      return [UtilBehavior];
    }

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

}


Polymer(ColorBox);