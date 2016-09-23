class ModalClab{

	get behaviors() {
		return [AnimationsBehavior];
	}

	beforeRegister(){
		this.is = 'modal-clab';
		this.properties = {
			title: {
				type: String,
				value: 'Modal title'
			},
			visible: {
				type: Boolean,
				value: false,
				observer: '_animateShowHide'
			},
			primary: {
				type: String,
				value:null
			},
			secondary: {
				type: String,
				value:null
			},
			warning: {
				type: String,
				value:null
			},
			primaryDisabled:{
				type:Boolean,
				value:false
			},
			content: {
				type: String,
				value: null
			},
			stopClose:{
				type:Boolean,
				value:false
			},
			width: {
				type: Number,
				value: 840
			},
			noAnimation:{
				type:Boolean,
				value:false
			},
			noActions:{
				type:Boolean,
				value:false
			}
		};
	}

	attached(){
		// Preparing the animations
		if(!this.noAnimation){
			let opacity=[
				{opacity: 0},
				{opacity: 1}
			];
			let scale=[
				{transform: 'scale(.95)'},
				{transform: 'scale(1)'}
			];

			this.modalEnter = (target)=>{
				return new GroupEffect([
					new KeyframeEffect(target, opacity, {
						duration:190,
						fill:'forwards',
						direction: 'normal'
					}),
					new KeyframeEffect(this.querySelector('.modal'), scale, {
						duration:190,
						fill:'forwards',
						direction: 'normal'
					})
				]);
			}
			this.modalExit = (target)=>{
				return new GroupEffect([
					new KeyframeEffect(target, opacity, {
						duration:150,
						fill:'forwards',
						direction: 'reverse'
					}),
					new KeyframeEffect(this.querySelector('.modal'), scale, {
						duration:150,
						fill:'forwards',
						direction: 'reverse'
					})
				]);
			}
		}
	}

	_computeWidth(width) {
		let str = 'max-width:' + width + 'px';
		return str;
	}

	/*----------
		EVENT HANDLERS
	----------*/
	_closeModal(evt){
		evt.stopPropagation();
		if(!this.stopClose) this.visible=false;
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

	_warningAction(evt){
		this.fire('modal-warning');
	}



	/*----------
		OBSERVERS
	----------*/
	_animateShowHide(val, oldval){
		let target=this.querySelector('.modal-overlay');

		if(oldval!=undefined){
			if(val){
				document.querySelector('body').classList.add('no-scroll');
				target.style.display='block';
				if(!this.noAnimation) {
					let animation= this.modalEnter(target);
					let player = document.timeline.play(animation);
				} else {
					target.style.opacity=1;
				}
			} else {
				document.querySelector('body').classList.remove('no-scroll');
				if(!this.noAnimation){
					let animation= this.modalExit(target);
					let player = document.timeline.play(animation);
					this._onAnimationComplete(player, ()=>{
						target.style.display='none';
					});
				} else {
					target.style.display='none';
					target.style.opacity=0;
				}
			}
		}
	}



	/*----------
		PUBLIC
	----------*/
	show(){
		this.visible=true;
	}
	hide(){
		this.visible=false;
	}
}


Polymer(ModalClab);
