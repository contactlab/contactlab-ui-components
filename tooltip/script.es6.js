class TooltipClab{

	beforeRegister(){
		this.is = "tooltip-clab";
		this.properties = {
			ttId: String,
			ttTitle: String,
			ttContent: String,
			fixed: {
				type: Boolean,
				value: true
			},
			titleIsHtml: {
				type: Boolean,
				value: false
			},
			contentIsHtml: {
				type: Boolean,
				value: false
			},
			shownOn: {
				type: String,
				value: "mouseover"
			},
			hideOn: {
				type: String,
				value: "mouseleave"
			},
			tipJoint: {
				type: String,
				value: "top left"
			}
		}
	}

	ready(){
		let tt = new Opentip('#'+this.ttId, this.ttContent, this.ttTitle, {
			tipJoint: this.tipJoint,
			fixed: this.fixed,
			showOn: this.shownOn,
			hideOn: this.hideOn
		});
		console.log(tt);

		/*this.querySelector('#'+this.ttId).setAttribute('data-ot', this.ttContent);
		this.querySelector('#'+this.ttId).setAttribute('data-ot-title', this.ttTitle);		
		this.querySelector('#'+this.ttId).setAttribute('data-ot-fixed', this.fixed);*/	
	}


}

Polymer(TooltipClab);

