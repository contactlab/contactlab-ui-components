Polymer({
	is: 'group-clab',
	properties: {
		small: {
			type: Boolean,
			value: false
		},
		type: {
			type: String,
			value: ''
		},
		value: {
			type: Number,
			value: 0,
			observer: '_initialize',
			reflectToAttribute: true
		}
	},
	attached: function(){
		this._initialize();
	},
	_initialize: function(){
		var btns = this.getContentChildren();
		for(var i = 0; i < btns.length; i++){
			(typeof btns[i].appearance === 'string') ? btns[i].appearance = '' : null;
			btns[i].setAttribute('data-i',i);
			btns[i].addEventListener('click',this._selectElement.bind(this))
		}
		(typeof btns[this.value].appearance === 'string') ? btns[this.value].appearance = 'full' : null;
	},
	_computeGroupClass: function(type,small){
		var arr = ['buttons-group',type];
		small ? arr.push('small') : null;
		return arr.join(' ');
	},
	_selectElement: function(evt){
		evt.preventDefault();
		var btns = this.getContentChildren();
		for(var i = 0; i < btns.length; i++){
			btns[i].appearance = '' ;
		}
		this.value = parseInt(evt.target.parentNode.getAttribute('data-i'));
		btns[this.value].appearance = 'full';
	}
});