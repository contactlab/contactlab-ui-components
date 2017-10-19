'use strict';

import props from './props';
import './view.html';

class LabelClab {

  beforeRegister() {
    this.is = 'label-clab';
    this.properties = props;
  }

  _removeClicked(evt) {
    this.dispatchEvent(new CustomEvent('remove',{
      bubbles: true,
      composed: true
    }));
  }

  _computeClass(badge, type) {
    let arr = [badge ? 'badge' : 'label'];
    if(type != null) arr.push(type);
    return arr.join(' ');
  }

}

Polymer(LabelClab);
