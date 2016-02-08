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
			},
			open: {
				type:Boolean,
				value:false,
				observer: '_animateOpenClose'
			}
		}
	}

	attached(){
		this.height = this.querySelector('.accordion-content').clientHeight;

		// Preparing the animations
		this.block=this.querySelector('.accordion-block');
		this.content=this.querySelector('.accordion-content');
		/*this.content.style.height=0;
		this.content.style.opacity=1;*/
		this.content.animate([
				{'height':'auto', 'opacity':'0'},
				{'height':'0', 'opacity':'1'}
			], {
				'duration':0,
				'fill':'forwards'
			});

		let height=[
			{height: '0'},
			{height: this.height+'px'}
		];
		let bgColor=[
			{'background-color': 'rgba(255, 255, 255, 0)'},
			{'background-color': 'rgba(255, 255, 255, 1)'}
		];
		let margin=[
			{'margin-bottom': '0'},
			{'margin-bottom': '20px'}
		];
		let padding=[
			{'padding': '0'},
			{'padding': '20px'}
		];
		let shadow=[
			{'box-shadow': '0 0 0 0 rgba(0, 0, 0, 0)'},
			{'box-shadow': '0 2px 5px 0 rgba(0, 0, 0, 0.16)'}
		];

		this.openAccordion = new GroupEffect([
			new KeyframeEffect(this.content, height, {
				duration:100,
				fill:'forwards',
				direction: 'normal'
			}),
			new KeyframeEffect(this.block, bgColor, {
				duration:100,
				fill:'forwards',
				direction: 'normal'
			}),
			new KeyframeEffect(this.block, margin, {
				duration:100,
				fill:'forwards',
				direction: 'normal'
			}),
			new KeyframeEffect(this.block, padding, {
				duration:100,
				fill:'forwards',
				direction: 'normal'
			}),
			new KeyframeEffect(this.block, shadow, {
				duration:100,
				fill:'forwards',
				direction: 'normal'
			})
		]);

		this.closeAccordion = new GroupEffect([
			new KeyframeEffect(this.content, height, {
				duration:100,
				fill:'forwards',
				direction: 'reverse'
			}),
			new KeyframeEffect(this.block, bgColor, {
				duration:100,
				fill:'forwards',
				direction: 'reverse'
			}),
			new KeyframeEffect(this.block, margin, {
				duration:100,
				fill:'forwards',
				direction: 'reverse'
			}),
			new KeyframeEffect(this.block, padding, {
				duration:100,
				fill:'forwards',
				direction: 'reverse'
			}),
			new KeyframeEffect(this.block, shadow, {
				duration:100,
				fill:'forwards',
				direction: 'reverse'
			})
		]);
	}



	_animateOpenClose(val, old){
		if(old!=undefined){
			if(val){
				let player = document.timeline.play(this.openAccordion);
				this.querySelector('.accordion-title').classList.add('active');
			} else {
				let player = document.timeline.play(this.closeAccordion);
				this.querySelector('.accordion-title').classList.remove('active');
			}
		}
	}



	_computeType(type){
		return ['accordion-block',type].join(' ');
	}

	_toggleActive(){
		this.open=!this.open;
	}

}


Polymer(AccordionClab);