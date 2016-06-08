class TooltipClab{

	beforeRegister(){
		this.is = "tooltip-clab";
		this.properties = {
			type: {
				type: String,
				value: ""
			},
			visible: {
				type: Boolean,
				value: false,
				observer: '_observVisibility'
			},
			wait: {
				type:Number,
				value:500
			}
		}
	}



	/*----------
	EVENT HANDLERS
	----------*/
	_handleMouseOnLabel(evt){
		switch(evt.type){
			case 'mouseenter':
				this._resetTimeout('hideInterval');
				if(!this.visible){
					this._startTimeout('showInterval', ()=>{
						this.show();
					}, this.wait);
				}
				break;
			case 'mouseleave':
				this._resetTimeout('showInterval');
				if(this.visible){
					this._startTimeout('hideInterval', ()=>{
						this.hide();
					}, 100);
				}
				break;
		}
	}

	_handleMouseOnTT(evt){
		switch(evt.type){
			case 'mouseenter':
				this._resetTimeout('hideInterval');
				break;
			case 'mouseleave':
				this._startTimeout('hideInterval', ()=>{
					this.hide();
				}, 100);
				break;
		}
	}





	/*----------
	METHODS
	----------*/
	_startTimeout(type, fn, time){
		if(this[type]!=undefined) this._resetTimeout();
		this[type] = this.async(()=>{ fn(); }, time);
	}
	_resetTimeout(type){
		this.cancelAsync(this[type]);
		this[type]=undefined;
	}


	_positionHorizontal(left, right, arrowLeft){
		let tooltip=this.querySelector('.tooltip');
		let arrow=this.querySelector('.tooltip .arrow');

		tooltip.style.left = left;
		tooltip.style.right = right;
		arrow.style.left = arrowLeft + 'px';
	}
	_positionVertical(tooltipTop, rotation, top, bottom){
		let tooltip=this.querySelector('.tooltip');
		let arrow=this.querySelector('.tooltip .arrow');

		tooltip.style.top = tooltipTop + 'px';
		arrow.style.webkitTransform = 'rotate(' + rotation + 'deg)';
		arrow.style.msTransform = 'rotate(' + rotation + 'deg)';
		arrow.style.transform = 'rotate(' + rotation + 'deg)';
		arrow.style.top = top;
		arrow.style.bottom = bottom;
	}
	_setTooltipPosition(){
		let targetSize;
		if(Polymer.dom(this.querySelector('.tt-label')).node.$) //if the content is a component or not
			targetSize=Polymer.dom(this.querySelector('.tt-label')).node.children[0].getBoundingClientRect();
		else targetSize=this.querySelector('.tt-label').getBoundingClientRect();
		let tooltipSize = this.querySelector('.tooltip').getBoundingClientRect();
		let center = targetSize.left + ( targetSize.width / 2 );

		if ( ( tooltipSize.width / 2 ) > ( center - 20 ) ) // rientra a sinistra
			this._positionHorizontal( '20px', 'auto', ( center - 25 ) );
		else if ( ( center + tooltipSize.width / 2 ) > window.innerWidth - 20 ) // rientra a destra
			this._positionHorizontal( 'auto', '20px', ( ( tooltipSize.width - ( targetSize.width / 2 ) ) - 5 ) );
		else this._positionHorizontal( ( center - ( tooltipSize.width / 2 ) ) + 'px', 'auto', ( ( tooltipSize.width / 2 ) - 5 ) );
		if ( ( targetSize.bottom + tooltipSize.height ) > window.innerHeight ) // allinea verticalmente
			this._positionVertical( ( targetSize.top -  tooltipSize.height - 5 ), '-135', 'auto', '-5px' );
		else this._positionVertical( ( targetSize.bottom + 5 ), '45', '-5px', 'auto' );
	}


	/*----------
	OBSERVERS
	----------*/
	_observVisibility(newv, oldv){
		let hideTooltip=(evt)=>{
			this.hide();
			document.body.removeEventListener('wheel', hideTooltip.bind(this));
		}
		if(newv){
			document.body.addEventListener('wheel', hideTooltip.bind(this));
		}
	}



	/*----------
	COMPUTED
	----------*/
	_computeTooltipClass(type, visible){
		var arr = ['tooltip'];
		if(type) arr.push(type);
		if(visible) arr.push('visible');
		return arr.join(' ');
	}



	/*----------
	PUBLIC
	----------*/
	show(){
		this.targetPosition = window.getComputedStyle(this).getPropertyValue('position');
		this.visible=true;
		// Polymer.dom.flush();

		this._setTooltipPosition();
		this.querySelector('.tooltip').style.opacity='1';
	}

	hide(){
		this.querySelector('.tooltip').style.opacity='0';
		this.visible=false;
	}


}

Polymer(TooltipClab);
