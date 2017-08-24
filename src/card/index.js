'use strict';

import './view.html';
import "./../button";

class CardClab extends Polymer.Element {
        
  static get is() { return 'card-clab'; }

  static get properties() {
    return {
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
    }
  }



  /*----------
  EVENT HANDLERS
  ----------*/
  _handleClickP(evt) {
     this.dispatchEvent(new CustomEvent('primary',{
        bubbles: true,
        composed: true
      }));
  }

   _handleClickS(evt) {
     this.dispatchEvent(new CustomEvent('secondary',{
        bubbles: true,
        composed: true
      }));
  }



  /*----------
  COMPUTED
  ----------*/
  _computeCardClass(big) {
    let classes = ['card-title'];
    big ? classes.push('big-icon') : null;
    return classes.join(' ');
  }

  _computeEffectClass(effect) {
    return ['card', effect].join(' ');
  }



  /*----------
  UTILS
  ----------*/
  _showActions(noActions, link) {
    return !link.hasOwnProperty('href') && !noActions;
  }

  _showLink(noActions, link) {
    return link.hasOwnProperty('href') && !noActions;
  }

  _showTitle(title) {
    return title != undefined;
  }


}


customElements.define(CardClab.is, CardClab);
