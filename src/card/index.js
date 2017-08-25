'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import template from './view.html';
import '@polymer/polymer/lib/elements/dom-if';
import "./../button";
import props from './props';

class CardClab extends PolymerElement {

  static get is() { return 'card-clab'; }

  static get template() { return template; }

  static get properties() { return props }


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
