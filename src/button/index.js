import {_computeClass, _computeIconClass} from './methods/internal';
import props from './props';
import './view.html';

class ButtonClab {
  get behaviors() {
    return [{_computeClass, _computeIconClass}];
  }

  beforeRegister() {
    this.is = 'button-clab';
    this.properties = props;
  }

  _click(evt) {
    this.dispatchEvent(
      new CustomEvent('btnclick', {
        bubbles: true,
        composed: true
      })
    );
  }
}

Polymer(ButtonClab);
