Polymer({
	is: 'group-clab',
	properties: {
		small: {
			type: Boolean,
			value: false
		},
		disabled: {
			type: Boolean,
			value: false,
			observer: '_updateDisabled'
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
		var btns = this.getContentChildren();
		for(var i = 0; i < btns.length; i++){
			btns[i].classList.add('group-item');
		}
		this._initialize();
	},
	_updateDisabled: function(){
		var btns = this.querySelectorAll('button');
		for(var i = 0; i < btns.length; i++){
			btns[i].disabled = this.disabled;
		}
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