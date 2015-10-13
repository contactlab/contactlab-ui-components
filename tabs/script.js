Polymer({
	is: 'tabs-clab',
	properties: {
		labels: {
			type: Array,
			value: ['Tab 1', 'Tab 2']
		},
		default: {
			type: Number,
			value: 0
		},
		active: {
			type: Number,
			value: 0
		},
		tabs: {
			type: Array,
			value: [],
			readonly: true
		}
	},
	attached: function(){
		console.log(this.default);
		this._changeTab(null, this.default);
	},
	_changeTab: function(evt,index){
		evt ? evt.preventDefault() : null;
		if(typeof index === 'number'){
			this.active = index;
		}else{
			this.active = parseInt(evt.currentTarget.parentNode.getAttribute('data-index'));
		}
	}
});