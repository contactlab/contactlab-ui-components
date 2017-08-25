'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import template from './view.html';
import props from './props';
import '@polymer/polymer/lib/elements/dom-if';

class FeatureClab extends PolymerElement {

  static get is() { return 'feature-clab'; }

  static get template() { return template; }

  static get properties() { return props; }


  /*----------
  COMPUTE
  ----------*/
  _computeFeatureClass(size, vertical) {
    let arr = ['feature'];
    if(size) arr.push(size);
    if(vertical) arr.push('vertical');
    return arr.join(' ');
  }

  _compDisplay(prop) {
    return prop != null && prop != undefined && prop ? '' : 'display:none';
  }


}


customElements.define(FeatureClab.is, FeatureClab);
