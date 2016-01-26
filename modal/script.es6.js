class ModalClab{

	/*get behaviors() {
		return this._behaviors || (this._behaviors = [Polymer.NeonAnimationRunnerBehavior]);
	}

	set behaviors(value) {
		this._behaviors = value;
	}*/

	beforeRegister(){
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
			warningBtn: {
				type: String
			},
			
			content: {
				type: String,
				value: null
			},
			maxWidth:{
				type: String,
				value: '500px'
			}/*,
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
	_closeModal(evt){
		evt.stopPropagation();
		this.visible=false;
		this.fire('close');
	}

	_block(evt){
		evt.stopPropagation();
	}

	_primaryAction(evt){
		this.fire('modal-primary');
	}

	_secondaryAction(evt){
		this.fire('modal-secondary');
	}

	_thirdAction(evt){
		this.fire('modal-third');
	}



	show(){
		this.visible=true;
		//this.style.display='block';
		//this.playAnimation('entry');
	}
	hide(){
		this.visible=false;
		//this.style.display='none'; // da commentare per provare i neon-elements
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
	_computeWidth(width){
		return 'max-width:' + width;
	}

	_checkIfTrue(str){
		if(str!=undefined && str.length>0){
			return true;
		} else {
			return false;
		}
	}


}


Polymer(ModalClab);
