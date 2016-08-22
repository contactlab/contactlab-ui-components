class CurtainClab{

	beforeRegister(){
		this.is = "curtain-clab";
		this.properties = {
			id:String,
			options:Array,
			highlighted:Object,
			labelField:String,
			valueField:String,
			dontHide:{
				type:Boolean,
				notify:true
			},
			maxInView:Number,
			disabled:{
				type:Boolean,
				value:false
			},
			open:{
				type:Boolean,
				value:false
			},

			//_liHeight:Number,
			maxHeight: {
				type: Number,
				value: 28
			},
			_listMaxHeight:String,
			_listHeight:String,
			_hidden:{
				type:Boolean,
				value:false
			},
			_computedStyles:String
		};
		this.observers=[
			'_setLiHeight(options, maxInView, disabled)',
			'_compStyles(_hidden, _listMaxHeight, _listHeight, open)'
		]
	}

	attached(){
		this.addEventListener('mousedown', evt=>{
			switch(evt.target.localName){
				case 'ol':
					this.dontHide=true;
					break;
				case 'li':
					this.dontHide=false;
					let i=evt.target.getAttribute('data-i');
					this.fire('do-select', {index:i});
					break;
				default:
					this.dontHide=false;
			}
		});
		this.addEventListener('mouseup', evt=>{ this.dontHide=false; });
	}




	/*----------
		EVENT HANDLERS
	----------*/
	doHighlight(evt){
		let i=evt.target.getAttribute('data-i');
		this.fire('do-highlight', {index:i});
	}



	/*----------
		METHODS
	----------*/
	_setLiHeight(options, maxInView, disabled){
		if(options!=undefined && options.length>0 && maxInView!=undefined && !disabled){
			this.async(()=>{
				if(this.maxHeight == undefined || this.maxHeight == ''){
					this.set('_hidden', true);
					this.maxHeight = 28;
					this.set('_listMaxHeight', (this.maxHeight * maxInView) + 'px');
					this.set('_hidden', false);
				} else {
					this.set('_hidden', true);
					this.set('_listMaxHeight', (this.maxHeight * maxInView) + 'px');
					this.set('_hidden', false);
				}

				this.set('_listHeight', (this.maxHeight * options.length) + 'px');
				this.$.list.scrollTop=0;
			}, 100);
		}
	}




	/*----------
		COMPUTERS
	----------*/
	_compHighlight(highlighted, option){
		return (highlighted[this.valueField]===option[this.valueField])? 'selected' : '';
	}

	_compLabel(opt){
		return opt[this.labelField];
	}

	_compStyles(hidden, maxHeight, height, open){
		let arr=[];
		if(hidden) arr.push('display:block; opacity:0');
		if(maxHeight!=undefined) arr.push('max-height:'+maxHeight);
		if(height!=undefined) arr.push('height:'+height);
		if(open) arr.push('display:block');
		this.set('_computedStyles', arr.join(';'));
	}





	/*----------
		PUBLIC
	----------*/
	scrollToHighlight(i, goesUp){
		let offsetTop=this.$.list.children[i].offsetTop,
			scrollTop=this.$.list.scrollTop,
			h=this.$.list.clientHeight,
			visible=(offsetTop<scrollTop || offsetTop>=(scrollTop+h))? false : true;

		if(!visible && !goesUp) this.$.list.scrollTop+=this.$.list.clientHeight; else if(!visible && goesUp) this.$.list.scrollTop-=this.$.list.clientHeight;
	}

}



Polymer(CurtainClab);
