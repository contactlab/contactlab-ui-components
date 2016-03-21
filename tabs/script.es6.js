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
		}
	}

	attached(){
		this.tabContents = this.querySelectorAll('.tab-content');
		Array.prototype.map.call(this.tabContents, (content, i)=>{
			if(i!=this.active) content.style.display = 'none';
		});
	}



	/*----------
	EVENT HANDLERS
	----------*/
	_activateThis(evt){
		evt ? evt.preventDefault() : null;
		this.active = parseInt(evt.currentTarget.parentNode.getAttribute('data-index'));
		this.fire('changed', {'active':this.active});
	}




	/*----------
	OBSERVERS
	----------*/
	_changeTab(newVal, oldVal){
		if(this.tabContents!=undefined){
			Array.prototype.map.call(this.tabContents, (el, i)=>{
				if(i===newVal)
					el.style.display = 'block';
				else
					el.style.display = 'none';
			});
		}
	}



	/*----------
	COMPUTED
	----------*/
	_computedLabels(tabContents, labels){
		var newLabels = labels;

		if(tabContents.length>=labels.length){
			for(var i=0; i<tabContents.length; i++){
				if(newLabels[i]===undefined){
					newLabels.push('Tab '+(i+1));
				}
			}
		} else {
			console.warn("Some of the labels need a content");
		}

		return newLabels;
	}

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
