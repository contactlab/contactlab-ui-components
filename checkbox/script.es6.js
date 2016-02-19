class CheckboxClab{

	get behaviors() {
      return [UtilBehavior];
    }

	beforeRegister(){
		this.is = "checkbox-clab";
		this.properties = {
			labels: {
				type: Array
			},
			wrapperType: {
				type: String,
				value: ''
			},
			active: {
				type: Array
			},
			disabled: {
				type: Array
			}
		}
	}

	/*---------- 
	COMPUTE
	----------*/
	_computeType(type){
		return ['row',type].join(' ');
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


Polymer(CheckboxClab);