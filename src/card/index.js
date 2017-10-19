'use strict';

import {
  _computeCardClass,
  _computeEffectClass,
  _showActions,
  _showLink,
  _showTitle
} from './methods/internal';
import props from './props';
import './view.html';
import "./../button/";

class CardClab {

  get behaviors() {
    return [{ _computeCardClass, _computeEffectClass, _showActions, _showLink, _showTitle }];
  }

  beforeRegister() {
    this.is = "card-clab";
    this.properties = props;
  }

  _handleClick(evt) {
    if(Polymer.dom(evt.target).node.children[0].classList.contains('primary'))
      this.dispatchEvent(new CustomEvent('primary',{
        bubbles: true,
        composed: true
      }));
    else
      this.dispatchEvent(new CustomEvent('secondary',{
        bubbles: true,
        composed: true
      }));
  }

}


Polymer(CardClab);
