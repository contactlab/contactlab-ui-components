'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import template from './view.html';
import props from './props';
import { dashify, viewLabel } from './../_libs/utils';
import { _computeRangeWrapperClasses, _compDisabled} from './methods/internal';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import '@polymer/polymer/lib/elements/dom-if';

class RangeClab extends mixinBehaviors(
  [{ dashify, viewLabel, _computeRangeWrapperClasses, _compDisabled }], PolymerElement)  {

  static get is() { return 'range-clab'; }

  static get template() { return template; }

  static get properties() { return props; }

  _updateCompValue(evt) {
    return this.value = parseInt(evt.currentTarget.value);
  }

}


customElements.define(RangeClab.is, RangeClab);
