class NoteClab{

	beforeRegister(){
		this.is = "note-clab";
		this.properties = {
			type: {
				type: String
			},

			classes: {
				type: String,
				computed: 'computeClasses(type)'
			}
		}
	}

	computeClasses(type){
		var arr=['input-note'];
		if(type!=undefined) arr.push(type);
		return arr.join(' ');
	}
}


Polymer(NoteClab);