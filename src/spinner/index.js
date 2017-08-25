'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { _computeClass, _computeBgColor } from './methods/internal';
import template from './view.html';
import props from './props';
import '@polymer/polymer/lib/elements/dom-if';

class SpinnerClab extends mixinBehaviors(
  [{ _computeClass, _computeBgColor }],PolymerElement) {

  static get is() { return 'spinner-clab'; }

  static get template() { return template; }

  static get properties() { return props; }

}

customElements.define(SpinnerClab.is, SpinnerClab);
