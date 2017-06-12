'use strict';

import "./view.html";

class NoteClab extends Polymer.Element {
        
  static get is() { return 'note-clab'; }

  static get properties() {
    return {
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


customElements.define(NoteClab.is, NoteClab);
