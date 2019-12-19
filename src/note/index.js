import props from './props';
import './view.html';

class NoteClab {
  beforeRegister() {
    this.is = 'note-clab';
    this.properties = props;
  }

  computeClasses(type) {
    var arr = ['input-note'];
    if (type != undefined) arr.push(type);
    return arr.join(' ');
  }
}

Polymer(NoteClab);
