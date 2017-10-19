'use strict';

import { _computeClass, _computeBgColor } from './methods/internal';
import props from './props';
import './view.html';

class SpinnerClab {

  get behaviors() {
    return [{ _computeClass, _computeBgColor }];
  }

  beforeRegister() {
    this.is = 'spinner-clab';
    this.properties = props;
  }

}

Polymer(SpinnerClab);
