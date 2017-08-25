'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import template from './view.html';

class NoteClab extends PolymerElement {

  static get is() { return 'note-clab'; }

  static get template() { return template; }

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
