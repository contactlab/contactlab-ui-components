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
				notify: true
			},
			current:{
				type:String,
				notify:true
			},
			_content:Array
		};
		this.observers=[
			'_changeTab(active, _content)'
		]
	}

	attached(){
		this._content = this.getEffectiveChildren();
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
	_changeTab(active, content){
		if(active!=undefined){
			this.set('current', this.labels[active]);

			if(content!=undefined && content.length>0){
				while(Polymer.dom(this.$.activeContentWrapper).firstChild){
					Polymer.dom(this.$.activeContentWrapper).removeChild(Polymer.dom(this.$.activeContentWrapper).firstChild);
				}
				Array.prototype.map.call(this._content, (node, i)=>{
					if(i==active){
						Polymer.dom(this.$.activeContentWrapper).appendChild(node);
						Polymer.dom.flush();
						return;
					}
				});
			}
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
