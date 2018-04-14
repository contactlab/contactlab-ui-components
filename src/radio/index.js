'use strict';

import { PolymerElement } from '@polymer/polymer/polymer-element';
import template from './view.html';
import props from './props';
import { dashify } from './../_libs/utils';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import '@polymer/polymer/lib/elements/dom-repeat';

class RadioClab extends mixinBehaviors([{ dashify }], PolymerElement)  {

  static get is() { return 'radio-clab'; }

  static get template() { return template; }

  static get properties() { return props; }


  /*----------
    COMPUTED
  ----------*/
  _computeType(wt) {
    return ['row', wt].join(' ');
  }

  _computeInline(inline){
    inline ? this.classList.add('inline') : this.classList.remove('inline');
  }

  /*----------
    UTILS
  ----------*/
  _isChecked(index, active) {
    return index === active;
  }

  _isDisabled(index, disabledArr) {
    return disabledArr.includes(index)
  }

  /*----------
    LISTENERS
  ----------*/

  _onChange(evt) {
    const clickedIndex = parseInt(evt.target.dataset.index, 10)
    this.set('active', clickedIndex)
  }
}


customElements.define(RadioClab.is, RadioClab);
