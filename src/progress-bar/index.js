'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { _computeClass, _percent, _computeProp } from './methods/internal';
import template from './view.html';
import props from './props';

class ProgressClab extends mixinBehaviors(
  [{ _computeClass, _percent, _computeProp }], PolymerElement) {

  static get is() { return 'progress-clab'; }

  static get template() { return template; }

  static get properties() { return props; }

}

customElements.define(ProgressClab.is, ProgressClab);
