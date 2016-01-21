'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModalClab = (function () {
	function ModalClab() {
		_classCallCheck(this, ModalClab);
	}

	_createClass(ModalClab, [{
		key: 'beforeRegister',

		/*get behaviors() {
  	return this._behaviors || (this._behaviors = [Polymer.NeonAnimationRunnerBehavior]);
  }
  
  set behaviors(value) {
  	this._behaviors = value;
  }*/

		value: function beforeRegister() {
			this.is = 'modal-clab';
			this.properties = {
				title: {
					type: String,
					value: 'Modal title'
				},
				visible: {
					type: Boolean,
					value: false
				},
				primary: {
					type: String
				},
				secondary: {
					type: String
				},

				content: {
					type: String,
					value: null
				},
				maxWidth: {
					type: String,
					value: '500px'
				} /*,
      animationConfig:{
      value:()=>{
      	return {
      		'entry':{
      			name: 'scale-up-animation',
      			node: this
      		},
      		'exit':{
      			name: 'fade-out-animation',
      			node: this
      		}
      	}
      }
      }*/
			};
			/*this.listeners={
   	'neon-animation-finish': '_onNeonAnimationFinish'
   }*/
		}

		/*----------
  EVENT HANDLERS
  ----------*/

	}, {
		key: '_closeModal',
		value: function _closeModal(evt) {
			evt.stopPropagation();
			this.hide();
			this.fire('close');
		}
	}, {
		key: '_block',
		value: function _block(evt) {
			evt.stopPropagation();
		}
	}, {
		key: '_primary',
		value: function _primary(evt) {
			this.fire('modal-primary');
		}
	}, {
		key: '_secondary',
		value: function _secondary(evt) {
			this.fire('modal-secondary');
		}
	}, {
		key: 'show',
		value: function show() {
			this.visible = true;
			this.style.display = 'block';
			//this.playAnimation('entry');
		}
	}, {
		key: 'hide',
		value: function hide() {
			this.visible = false;
			this.style.display = 'none'; // da commentare per provare i neon-elements
			//this.playAnimation('exit');
		}

		/*_onNeonAnimationFinish(){
  	if(!this.visible){
  		this.style.display='none';
  	}
  }*/

		/*----------
  COMPUTE
  ----------*/

	}, {
		key: '_computeWidth',
		value: function _computeWidth(width) {
			return 'max-width:' + width;
		}
	}]);

	return ModalClab;
})();

Polymer(ModalClab);