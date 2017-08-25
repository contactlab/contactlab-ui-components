'use strict';

import { onAnimationComplete } from './../_libs/animations';
import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { LegacyElementMixin } from '@polymer/polymer/lib/legacy/legacy-element-mixin';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import template from './view.html';
import '@polymer/polymer/lib/elements/dom-if';
import "./../button";

class AlertClab extends mixinBehaviors([LegacyElementMixin], PolymerElement) {

  static get is() { return 'alert-clab'; }

  static get template() { return template; }

  static get properties() {
    return {
      title: {
        type: String,
        value: 'Title'
      },
      type: {
        type: String,
        value: 'success'
      },
      visible: {
        type: Boolean,
        value: false,
        notify: true,
        observer: '_animateShowHide'
      },
      primary: {
        type: String,
        value: 'Confirm'
      },
      secondary: {
        type: String,
        value: 'Cancel'
      },
      notify: {
        type: Boolean,
        value: false
      },
      noAnimation: {
        type: Boolean,
        value: false
      }
    }
  }

  connectedCallback(){
    super.connectedCallback();
    // Preparing the animations
    if(!this.noAnimation) {
      let opacity = [
        {
          opacity: 0
        },
        {
          opacity: 1
        }
			];
      let translateY = [
        {
          transform: 'translateY(-5px)'
        },
        {
          transform: 'translateY(0)'
        }
			];

      this.alertEnter = (target) => {
        return new GroupEffect([
					new KeyframeEffect(target, opacity, {
            duration: 190,
            fill: 'forwards',
            direction: 'normal'
          }),
					new KeyframeEffect(target, translateY, {
            duration: 190,
            fill: 'forwards',
            direction: 'normal'
          })
				]);
      }
      this.alertExit = (target) => {
        return new GroupEffect([
					new KeyframeEffect(target, opacity, {
            duration: 150,
            fill: 'forwards',
            direction: 'reverse'
          }),
					new KeyframeEffect(target, translateY, {
            duration: 150,
            fill: 'forwards',
            direction: 'reverse'
          })
				]);
      }
    }
  }



  /*----------
  	EVENT HANDLERS
  ----------*/
  _handleClickP(evt) {
      this.dispatchEvent(new CustomEvent('primary',{
        bubbles: true,
        composed: true
      }));
   }

  _handleClickS(evt) {
      this.dispatchEvent(new CustomEvent('secondary',{
        bubbles: true,
        composed: true
      }));
   }

  _close(evt) {
    this.visible = false;
    this.dispatchEvent(new CustomEvent('close',{
      bubbles: true,
      composed: true
    }));
  }




  /*----------
  	OBSERVERS
  ----------*/
  _animateShowHide(val, oldval) {
    let target = this.$$('.alert');

    if(val) {
      if(target == null) {
        this.set('_alertStyle', 'display:block; opacity:1');
        return;
      }

      target.style.display = 'block';
      if(!this.noAnimation && oldval != undefined) {
        let animation = this.alertEnter(target);
        let player = document.timeline.play(animation);
      } else {
        target.style.opacity = 1;
      }

    } else {
      if(!this.noAnimation && target != null) {
        let animation = this.alertExit(target);
        let player = document.timeline.play(animation);
        onAnimationComplete(player, () => {
          target.style.display = 'none';
        });
      } else if(target != null) {
        target.style.display = 'none';
        target.style.opacity = 0;
      }
    }
  }



  /*----------
  	COMPUTED
  ----------*/
  _computeType(str, type) {
    return [str, type].join(' ');
  }

}


customElements.define(AlertClab.is, AlertClab);
