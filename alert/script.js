Polymer({
	is: 'alert-clab',
	properties: {
		title: {
			type: String,
			value: 'Title'
		},
		type: {
			type: String,
			value: 'success'
		},
		visible: {
			type: Boolean,
			value: false
		},
		labels:{
			type: Object,
			value: {
				primary: 'Confirm',
				secondary: 'Cancel'
			}
		}
	},
	_computeType: function(type){
		return ['alert',type].join(' ');
	},
	_close: function(){
		this.visible = false;
	},
	_handleClick: function(evt){
		if(!evt.target.classList.contains('flat')){
			this.fire('primary', {secondary: true});
		}else{
			this.fire('secondary', {primary: true});
		}
	}
});