'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import template from './view.html';

class AccordionClab extends PolymerElement {

  static get is() { return 'accordion-clab'; }

  static get template() { return template; }

  static get properties() {
    return {
      title: {
        type: String,
        value: 'Title'
      },
      type: {
        type: String,
        value: ''
      },
      open: {
        type: Boolean,
        value: false,
        observer: '_animateOpenClose'
      }
    }
  }

  connectedCallback(){
    super.connectedCallback();

    // Preparing the animations
    let height = [
      { height: '0' },
      { height: 'auto' }
		];
    let margin = [
      { 'margin-bottom': '0' },
      { 'margin-bottom': '20px' }
		];

    this.openAccordion = new GroupEffect([
			new KeyframeEffect(this.$.content, height, {
        duration: 100,
        fill: 'forwards',
        direction: 'normal'
      }),
			new KeyframeEffect(this.$.block, margin, {
        duration: 100,
        fill: 'forwards',
        direction: 'normal'
      }),
		]);

    this.closeAccordion = new GroupEffect([
			new KeyframeEffect(this.$.content, height, {
        duration: 100,
        fill: 'forwards',
        direction: 'reverse'
      }),

			new KeyframeEffect(this.$.block, margin, {
        duration: 100,
        fill: 'forwards',
        direction: 'reverse'
      }),
		]);
  }



  /*----------
  	OBSERVERS
  ----------*/
  _animateOpenClose(val, old) {
    if(old != undefined) {
      if(val) {
        let player = document.timeline.play(this.openAccordion);
        this.$.block.classList.add('active');
        setTimeout(() => {
          this.$.content.classList.add('opened');
        }, 110);
      } else {
        let player = document.timeline.play(this.closeAccordion);
        this.$.block.classList.remove('active');
        this.$.content.classList.remove('opened');
      }
    }
  }



  /*----------
  	COMPUTED
  ----------*/
  _computeType(type) {
    return ['accordion-block', type].join(' ');
  }

  _toggleActive() {
    this.open = !this.open;
  }

}


customElements.define(AccordionClab.is, AccordionClab);
