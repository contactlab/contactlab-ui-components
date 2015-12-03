class TabsClab{

	beforeRegister(){
		this.is = 'tabs-clab';
		this.properties = {
			labels: {
				type: Array,
				value: []
			},
			pills: {
				type: Boolean,
				value: false
			},
			active: {
				type: Number,
				value: 0
			},
			tabs: {
				type: Array,
				value: [],
				readonly: true
			},
			tabContent: {
				type: Array
			}
		}
	}

	attached(){
		this.tabContent = this.querySelectorAll('.tab-content');
		/*for(let content of Array.from(this.tabContent)){
			content.style.display = 'none';
		}*/
		Array.from(this.tabContent).forEach(function(content){
			content.style.display = 'none';
		});
		this.tabContent[this.active].style.display = 'block';
	}

	_computedLabels(tabContent, labels){
		var newLabels = labels;

		if(tabContent.length>=labels.length){
			for(var i=0; i<tabContent.length; i++){
				if(newLabels[i]===undefined){
					newLabels.push('Tab '+(i+1));
				}
			}
		} else {
			console.error("There are labels without content" );
		}

		return newLabels;
	}

	_computeType(pills){
		let arr = [];
		pills ? arr.push('pills') : arr.push('tabs');
		return arr.join(' ');
	}

	_changeTab(evt,index){
		evt ? evt.preventDefault() : null;
		this.active = parseInt(evt.currentTarget.parentNode.getAttribute('data-index'));
		
		for(let content of Array.from(this.tabContent)){
			content.style.display = 'none';
		}
		this.tabContent[this.active].style.display = 'block';
	}

	_computeActive(active,index){
		let arr = ['tab'];
		(active === index) ? arr.push('active') : arr;
		return arr.join(' ');
	}

}


Polymer(TabsClab);