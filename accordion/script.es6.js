class AccordionClab {

	beforeRegister(){
		this.is = "accordion-clab";
		this.properties = {
			title: {
				type: String,
				value: 'Title'
			},
			type: {
				type: String,
				value: ''
			}
		}
	}

	_computeType(type){
		return ['accordion-block',type].join(' ');
	}

	_toggleActive(){
		this.querySelector('.accordion-block').classList.toggle('active');
	}

}


Polymer(AccordionClab);