import {_computeClass, _percent, _computeProp} from './methods/internal';
import props from './props';
import './view.html';

class ProgressClab {
  get behaviors() {
    return [{_computeClass, _percent, _computeProp}];
  }

  beforeRegister() {
    this.is = 'progress-clab';
    this.properties = props;
  }
}

Polymer(ProgressClab);
