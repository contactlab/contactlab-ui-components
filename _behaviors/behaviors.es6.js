let UtilBehavior={

	_dashify:(str)=>{
		return str.toLowerCase().replace(/ /g,'-');
	},

	_viewLabel:(label, icon)=>{
		let bool=false;
		if(label!=undefined && label.length>0) bool=true; else bool=false;
		if(icon!=undefined && icon.length>0) bool=true;
		return bool;
	},

	_getIndex:(item, items)=>{
		return items.indexOf(item);
	}
};




let AnimationsBehavior={

	_onAnimationComplete:(elem, fn)=>{
		if(elem.finished){
			elem.finished.then(fn);
		} else {
			elem.onfinish = fn;
		}
	}
};



let DropdownBehavior={
	getSelectedLabel:function(){
		return this.selected[this.labelField];
	},

	getSelectedValue:function(){
		return this.selected[this.valueField];
	},

	setByLabel:function(str){
		this.options.map(opt=>{
			if(opt[this.labelField]===str){
				this._setSelected(opt);
				return;
			}
		});
	},

	setByValue:function(str){
		this.options.map(opt=>{
			if(opt[this.valueField]===str){
				this._setSelected(opt);
				return;
			}
		});
	},

	isValorized:function(){
		return !this.isNotValorized();
	},

	isNotValorized:function(){
		return this.selected === undefined || this.selected === null || this.selected[this.valueField] === undefined || this.selected[this.valueField] === null;
	},

	setValue: function(obj, prevent){
		console.log('RULE-HEADER.setValue(' + (typeof obj) + '): ', obj);
		prevent = prevent ? true : false;
		this.preventChange = prevent;

		if(typeof obj === 'object'){
			this._setSelected(obj);
			console.log('RULE-HEADER.setValue(obj): ', obj);
		} else {
			this.options.map(opt=>{
				if(opt[this.valueField]===obj){
					this._setSelected(opt);
					return;
				}
			});
		}

		this.preventChange=false;
	},

	getValue:function(){
		var v;
		if( this.isNotValorized() ) {
			v = undefined;

		} else if(typeof this.selected === 'string' || this.selected instanceof String) {
			v = this.selected;

		} else if(typeof this.selected === "object"){
			v = this.selected[this.valueField];

		} else {
			console.error(this.is + ": Invalid value type [" + (typeof this.selected) + "]");
		}
		return v;
	},

	getValueObject:function(){
		var v;
		if( this.isNotValorized(this.selected) ) {
			v = undefined;

		} else if(typeof this.selected === 'string' || this.selected instanceof String) {
			this.options.map(opt=>{
				if(opt[this.valueField] === this.selected) {
					v = opt;
					return;
				}
			});
			if(v === undefined) {
				console.warn(this.is + ": There is no option with value equal to [" + this.selected + "]");
			}

		} else if(typeof this.selected === "object"){
			v = this.selected;

		} else {
			console.warn(this.is + ": Invalid value type [" + (typeof this.selected) + "]");
		}
		return v;
	}
};
