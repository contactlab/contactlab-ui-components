class TabsClab{

	beforeRegister(){
		this.is = 'tabs-clab';
		this.properties = {
			labels: {
				type: Array,
				value: []
			},
			pills: {
				type: Boolean,
				value: false
			},
			vertical: {
				type: Boolean,
				value: false
			},
			centered: {
				type: Boolean,
				value: false
			},
			fullWidth: {
				type: Boolean,
				value: false
			},
			active: {
				type: Number,
				value: 0,
				observer: '_changeTab'
			}
		};
	}



	/*----------
	EVENT HANDLERS
	----------*/
	_activateThis(evt){
		evt ? evt.preventDefault() : null;
		this.active = parseInt(evt.currentTarget.parentNode.getAttribute('data-index'));
		this.fire('change', {'active':this.active});
	}




	/*----------
	OBSERVERS
	----------*/
	_changeTab(val, old){
		if(val!=undefined){
			let contents = this.contents==undefined?this.getEffectiveChildren():this.contents;
			if(old!=undefined) this.$.content.innerHTML='';
			this.$.content.appendChild(contents[val].cloneNode(true));
		}
	}



	/*----------
	COMPUTED
	----------*/
	_computeType(pills, vertical, centered, fullWidth){
		let arr = [];
		pills ? arr.push('pills') : arr.push('tabs');
		if(vertical) arr.push('vertical');
		if(centered) arr.push('centered');
		if(fullWidth) arr.push('full-width');
		return arr.join(' ');
	}

	_computeActive(active,index){
		let arr = ['tab'];
		(active === index) ? arr.push('active') : arr;
		return arr.join(' ');
	}

}


Polymer(TabsClab);
