import props from './props';
import './view.html';

class SpinnerClab {
  beforeRegister() {
    this.is = 'spinner-clab';
    this.properties = props;
  }
}

Polymer(SpinnerClab);
