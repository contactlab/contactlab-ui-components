class TooltipClab{

	beforeRegister(){
		this.is = "tooltip-clab";
		this.properties = {
			content: {
				type: String,
				value: 'The content'
			},
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
			},

			_dontHide: {
				type:Boolean,
				value:false
			}
		};
		this.listeners = {
			'mouseenter': '_handleMouseOnLabel',
			'mouseout': '_handleMouseOnLabel'
		}
	}



	/*----------
	EVENT HANDLERS
	----------*/
	_handleMouseOnLabel(evt){
		if(evt.type=='mouseenter'){
			console.log('mouseenter----------------->', evt);
			// let x=evt.clientX;
			// let y=evt.clientY;
			// let targetRect=Polymer.dom(evt.target).node.getBoundingClientRect();
			// document.body.addEventListener('mousemove', (e)=>{
			// 	this.curX=e.clientX;
			// 	this.curY=e.clientY;
			// 	console.log('x: ', x, this.curX, targetRect.left, targetRect.right);
			// 	console.log('starting y: '+ y, this.curY, targetRect.top, targetRect.bottom);
			// });

			this._resetTimeout();
			if(!this.visible){
				//console.log(evt.target, 'mouseenter');
				this._startTimeout(()=>{
					this.targetPosition = window.getComputedStyle(this).getPropertyValue('position');
					if(!this.visible) this.show();
					Polymer.dom.flush();

					this._setTooltipPosition();
					this.querySelector('.tooltip').style.opacity='1';
				}, this.wait);
			}

		} else if(evt.type=='mouseout' && this.visible) {
			console.log(this, 'mouseout');
			this._startTimeout(()=>{
				this.querySelector('.tooltip').style.opacity='0';
				this.hide();
			}, 100);

		}
	}

	_hideTooltip(evt){
		if(this.visible){
			this.querySelector('.tooltip').style.opacity='0';
			this.hide();
		}

		if(evt.type=='wheel'){
			document.body.removeEventListener('wheel', this._hideTooltip.bind(this));
		}
	}



	/*----------
	METHODS
	----------*/
	_startTimeout(fn, time){
		if(this.interval) this._resetTimeout();
		this.interval=window.setTimeout(()=>{ fn(); }, time);
	}
	_resetTimeout(){
		window.clearTimeout(this.interval);
		this.interval=undefined;
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
		if(newv){
			document.body.addEventListener('wheel', this._hideTooltip.bind(this));
		}
	}



	/*----------
	COMPUTED
	----------*/
	_computeBtnClass(type){
		var arr = ['tooltip'];
		if(type) arr.push(type);
		return arr.join(' ');
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

Polymer(TooltipClab);
