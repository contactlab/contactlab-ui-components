'use strict';

import {Polymer} from "./../_assets/js/polymer";

class NoteClab extends Polymer.Element {
        
    static get is() { return 'note-clab'; }

  beforeRegister() {
    this.is = "note-clab";
    this.properties = {
      type: String,
      classes: {
        type: String,
        computed: 'computeClasses(type)',
        readonly: true
      }
    }
  }

  /*----------
  COMPUTED
  ----------*/
  computeClasses(type) {
    var arr = ['input-note'];
    if(type != undefined) arr.push(type);
    return arr.join(' ');
  }
}


Polymer(NoteClab);
