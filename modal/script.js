Polymer({
	is: 'modal-clab',
	properties:{
		title: {
			type: String,
			value: 'Modal title'
		},
		visible: {
			type: Boolean,
			value: false
		},
		primary: {
			type: String,
		},
		secondary: {
			type: String,
		}
	},
	_closeModal: function(evt){
		evt.stopPropagation();
		this.visible = false;
	},
	_block: function(evt){
		evt.stopPropagation();
	},
	_primary: function(evt){
		this.fire('modal-primary');
	},
	_secondary: function(evt){
		this.fire('modal-secondary');
	}
});