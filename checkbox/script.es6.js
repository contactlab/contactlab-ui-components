class CheckboxClab{

	get behaviors() {
      return [UtilBehavior];
    }

	beforeRegister(){
		this.is = "checkbox-clab";
		this.properties = {
			labels: Array,
			wrapperType: String,
			active: {
				value:[],
				type: Array,
				notify: true
			},
			disabled: Array
		}
	}

	/*----------
	EVENT HANDLERS
	----------*/
	_updateActive(evt){
		let t=evt.target;
		let index=Number(t.getAttribute('data-index'));
		let active=this.active;

		if(t.checked){
			active.push(index);
		} else {
			let i=active.indexOf(index);
			active.splice(i, 1);
		}

		this.set('active', active);
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
