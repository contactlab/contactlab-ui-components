class RadioClab{

	get behaviors() {
      return [UtilBehavior];
    }

	beforeRegister(){
		this.is = "radio-clab";
		this.properties = {
			labels: {
				type: Array
			},
			name: {
				type: String
			},
			wrapperType: {
				type: String,
				value: ''
			},
			active: {
				type: Number
			},
			disabled: {
				type: Array
			}
		}
	}



	/*---------- 
	COMPUTED
	----------*/
	_computeType(wt){
		return ['row',wt].join(' ');
	}



	/*---------- 
	UTILS
	----------*/
	_checkIfTrue(i, n){
		if(typeof n === 'number'){
			return i == n;
		} else if(typeof n === 'object'){
			for(let x=0; x<n.length; x++){
				if(i == n[x]) return true;
			}
		}
	}

}


Polymer(RadioClab);