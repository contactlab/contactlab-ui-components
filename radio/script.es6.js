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
		switch(typeof n){
			case 'number':
				return i==n;
				break;
			case 'object':
				for(let x=0; x<n.length; x++){
					if(i == n[x]) return true;
				}
				break;
		}
	}

}


Polymer(RadioClab);