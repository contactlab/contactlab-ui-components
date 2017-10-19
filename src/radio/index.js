'use strict';

import { dashify } from './../_libs/utils';
import props from './props';
import './view.html';

class RadioClab {

  get behaviors() {
    return [{ dashify }];
  }

  beforeRegister() {
    this.is = "radio-clab";
    this.properties = props;
  }

  _computeType(wt) {
    return ['row', wt].join(' ');
  }

  _computeInline(inline){
    inline ? this.classList.add('inline') : this.classList.remove('inline');
  }

  _isChecked(index, active) {
    return index === active;
  }

  _isDisabled(index, disabledArr) {
    return disabledArr.includes(index)
  }

  _onChange(evt) {
    const clickedIndex = parseInt(evt.target.dataset.index, 10)
    this.set('active', clickedIndex)
  }
}


Polymer(RadioClab);
