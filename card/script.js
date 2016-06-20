'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CardClab = function () {
	function CardClab() {
		_classCallCheck(this, CardClab);
	}

	_createClass(CardClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "card-clab";
			this.properties = {
				/**
         * Title of the card
         */
				title: String,
				/**
         * Inner text of the primary buttons
         */
				primary: {
					type: String,
					value: 'OK'
				},
				/**
    * Inner text of the secondary buttons
    */
				secondary: {
					type: String,
					value: 'Cancel'
				},
				/**
    * Add an url to the card
    {
     class:'',
     href:'',
     text:''
    }
    */
				link: {
					type: Object,
					value: {}
				},
				/**
         * Add an icon to the card (class)
         */
				icon: String,
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
					type: Boolean,
					value: false
				}
			};
		}

		/*----------
  EVENT HANDLERS
  ----------*/

	}, {
		key: '_handleClick',
		value: function _handleClick(evt) {
			if (Polymer.dom(evt.target).node.children[0].classList.contains('primary')) this.fire('primary');else this.fire('secondary');
		}

		/*----------
  COMPUTED
  ----------*/

	}, {
		key: '_computeCardClass',
		value: function _computeCardClass(big) {
			var classes = ['card-title'];
			big ? classes.push('big-icon') : null;
			return classes.join(' ');
		}
	}, {
		key: '_computeEffectClass',
		value: function _computeEffectClass(effect) {
			return ['card', effect].join(' ');
		}

		/*----------
  UTILS
  ----------*/

	}, {
		key: '_showActions',
		value: function _showActions(noActions, link) {
			return !link.hasOwnProperty('href') && !noActions;
		}
	}, {
		key: '_showLink',
		value: function _showLink(noActions, link) {
			return link.hasOwnProperty('href') && !noActions;
		}
	}, {
		key: '_showTitle',
		value: function _showTitle(title) {
			return title != undefined;
		}
	}]);

	return CardClab;
}();

Polymer(CardClab);