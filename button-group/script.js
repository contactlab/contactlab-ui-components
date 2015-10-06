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
			observer: '_initilize',
			reflectToAttribute: true
		}
	},
	attached: function(){
		this._initilize();
	},
	_initilize: function(){
		var btns = this.getContentChildren();
		for(var i = 0; i < btns.length; i++){
			btns[i].classList.remove('full');
			btns[i].setAttribute('data-i',i);
			btns[i].addEventListener('click',this._selectElement.bind(this))
		}
		btns[this.value].classList.add('full');
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
			btns[i].classList.remove('full');
		}
		evt.target.classList.add('full');
		this.value = parseInt(evt.target.getAttribute('data-i'));
	}
});