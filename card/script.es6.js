class CardClab {

	beforeRegister(){
		this.is = "card-clab";
		this.properties = {
			/**
	       * Title of the card
	       */
			title: {
				type: String,
				value: null
			},
			/**
	       * Inner text of the primary button
	       */
			primaryLabel: {
				type: String,
				value: 'OK'
			},
			/**
	       * Inner text of the secondary button
	       */
			secondaryLabel: {
				type: String,
				value: 'Cancel'
			},
			/**
	       * Add an icon to the card (class)
	       */
			icon: {
				type: String,
				value: ''
			},
			/**
	       * Whether the card is big
	       */
			big: {
				type: Boolean,
				value: false
			},
			/**
	       * Whether the <content> is in table format
	       */
			table: {
				type: Boolean,
				value: false
			},
			/**
	       * Source of the image
	       */
			figure: {
				type: String,
				value: null
			},
			/**
	       * Effect to apply on the image
	       */
			effect: {
				type: String,
				value: null
			},
			/**
	       * Whether the buttons are shown
	       */
			noActions: {
				type:Boolean,
				value:false
			},
			/**
	       * Add an url to the card
	       */
			link: {
				type:Object,
				value:null
			}
		}
	}

	/*---------- 
	COMPUTED
	----------*/
	_computeIconClass(icon){
		return icon;
	}

	_computeCardClass(big){
		let classes = ['card-title'];
		big ? classes.push('big-icon') : null;
		return classes.join(' ');
	}

	_computeEffectClass(effect){
		return ['card', effect].join(' ');
	}



	/*---------- 
	UTILS
	----------*/
	_showActions(noactions, link){
		if(link) return false;
		return !!!noactions;
	}

	_showTitle(title){
		title==null? false :  true;
	}


}


Polymer(CardClab);