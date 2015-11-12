class ModalClab{

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
			}
		}
	}

	_closeModal(evt){
		evt.stopPropagation();
		this.visible = false;
	}

	_block(evt){
		evt.stopPropagation();
	}

	_primary(evt){
		this.fire('modal-primary');
	}

	_secondary(evt){
		this.fire('modal-secondary');
	}

}


Polymer(ModalClab);