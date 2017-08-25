'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import template from './view.html';
import props from './props';

class NoteClab extends PolymerElement {

  static get is() { return 'note-clab'; }

  static get template() { return template; }

  static get properties() { return props; }

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
