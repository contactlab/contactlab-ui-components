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

	// attached(){
	// 	this.tabContents = this.querySelectorAll('.tab-content');
	// 	if(this.tabContents.length>0){
	// 		Array.prototype.map.call(this.tabContents, (content, i)=>{
	// 			if(i!=this.active) content.style.display = 'none';
	// 		});
	// 	}
	// }



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
		// if(this.tabContents!=undefined){
		// 	Array.prototype.map.call(this.tabContents, (el, i)=>{
		// 		if(i===val)
		// 		el.style.display = 'block';
		// 		else
		// 		el.style.display = 'none';
		// 	});
		// }

		if(val!=undefined){
			let contents = _.cloneDeep(this.getEffectiveChildren());
			if(contents.length<1) return;
			console.log(contents[val].innerHTML)
			this.set('activeContent', contents[val].innerHTML);

			// while(this.$.content.firstChild){
			// 	this.$.content.removeChild(this.$.content.firstChild);
			// }
			// this.$.content.appendChild(contents[val]);

				// if(this.restamp) this.$.content.appendChild(contents[val].cloneNode(true));
				// 	else this.$.content.appendChild(contents[val]);
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
