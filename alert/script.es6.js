class AlertClab {

	get behaviors() {
		return [AnimationsBehavior];
	}

	beforeRegister(){
		this.is = 'alert-clab';
		this.properties = {
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
				value: false,
				observer: '_animateShowHide'
			},
			labels:{
				type: Object,
				value: {
					primary: 'Confirm',
					secondary: 'Cancel'
				}
			},
			notify:{
				type:Boolean,
				value:false
			},
			noAnimation:{
				type:Boolean,
				value:false
			}
		}
	}



	attached(){
		if(this.visible) this.querySelector('.alert').style.display='block';

		// Preparing the animations
		let target=this.querySelector('.alert');
		let opacity=[
			{opacity: 0},
			{opacity: 1}
		];
		let translateY=[
			{transform: 'translateY(-5px)'},
			{transform: 'translateY(0)'}
		];

		this.alertEnter = new GroupEffect([
			new KeyframeEffect(target, opacity, {
				duration:190,
				fill:'forwards',
				direction: 'normal'
			}),
			new KeyframeEffect(target, translateY, {
				duration:190,
				fill:'forwards',
				direction: 'normal'
			})
		]);
		this.alertExit = new GroupEffect([
			new KeyframeEffect(target, opacity, {
				duration:150,
				fill:'forwards',
				direction: 'reverse'
			}),
			new KeyframeEffect(target, translateY, {
				duration:150,
				fill:'forwards',
				direction: 'reverse'
			})
		]);
	}



	/*----------
		EVENT HANDLERS	
	----------*/
	_handleClick(evt){
		if(evt.target.childNodes[1].classList.contains('flat')){
			this.fire('primary');
		} else {
			this.fire('secondary');
		}
	}

	_close(evt){
		this.visible = false;
		this.fire('close');
	}




	/*----------
		OBSERVERS
	----------*/
	_animateShowHide(val){
		if(this.querySelector('.alert')==undefined) return;
		let target=this.querySelector('.alert');

		if(val){
			target.style.opacity=0;
			target.style.display='block';
			if(!this.noAnimation) {
				let player = document.timeline.play(this.alertEnter);
			}
		} else {
			if(!this.noAnimation){
				let player = document.timeline.play(this.alertExit);
				this._onAnimationComplete(player, ()=>{
					target.style.display='none';
				});
			} else {
				target.style.display='none';
			}
		}
	}



	/*----------
		COMPUTED
	----------*/
	_computeType(str, type){
		return [str,type].join(' ');
	}

}


Polymer(AlertClab);