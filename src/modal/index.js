'use strict';

import { onAnimationComplete } from './../_libs/animations';
import props from './props';
import './view.html';
import "./../button/";

class ModalClab {

  beforeRegister() {
    this.is = 'modal-clab';
    this.properties = props;
  }

  attached() {
    // Preparing the animations
    if (!this.noAnimation) {
      let opacity = [{
          opacity: 0
        },
        {
          opacity: 1
        }
      ];
      let scale = [{
          transform: 'scale(.95)'
        },
        {
          transform: 'scale(1)'
        }
      ];

      this.modalEnter = (target) => {
        return new GroupEffect([
          new KeyframeEffect(target, opacity, {
            duration: 190,
            fill: 'forwards',
            direction: 'normal'
          }),
          new KeyframeEffect(this.querySelector('.modal'), scale, {
            duration: 190,
            fill: 'forwards',
            direction: 'normal'
          })
        ]);
      }
      this.modalExit = (target) => {
        return new GroupEffect([
          new KeyframeEffect(target, opacity, {
            duration: 150,
            fill: 'forwards',
            direction: 'reverse'
          }),
          new KeyframeEffect(this.querySelector('.modal'), scale, {
            duration: 150,
            fill: 'forwards',
            direction: 'reverse'
          })
        ]);
      }
    }
  }

  detached() {
    document.querySelector('body').classList.remove('no-scroll');
  }

  _computeWidth(width) {
    let str = 'max-width:' + width + 'px';
    return str;
  }

  _closeModal(evt) {
    evt.stopPropagation();
    if (!this.stopClose) this.visible = false;
    this.dispatchEvent(new CustomEvent('close', {
      bubbles: true,
      composed: true
    }));
  }

  _block(evt) {
    evt.stopPropagation();
  }

  _primaryAction(evt) {
    this.dispatchEvent(new CustomEvent('modal-primary', {
      bubbles: true,
      composed: true
    }));
  }

  _secondaryAction(evt) {
    this.dispatchEvent(new CustomEvent('modal-secondary', {
      bubbles: true,
      composed: true
    }));
  }

  _warningAction(evt) {
    this.dispatchEvent(new CustomEvent('modal-warning', {
      bubbles: true,
      composed: true
    }));
  }


  _animateShowHide(val, oldval) {
    let target = this.querySelector('.modal-overlay');

    if (val) {
      document.querySelector('body').classList.add('no-scroll');
      target.style.display = 'block';
      if (!this.noAnimation && this.modalEnter) {
        let animation = this.modalEnter(target);
        let player = document.timeline.play(animation);
      } else {
        target.style.opacity = 1;
      }
     // Check if was a previously attached modal to avoid to remove the "no-scroll" class from the body needed for another modal.
      // The oldval should be "false"
    } else if (typeof oldval !== 'undefined') {
      document.querySelector('body').classList.remove('no-scroll');
      if (!this.noAnimation && this.modalExit) {
        let animation = this.modalExit(target);
        let player = document.timeline.play(animation);
        onAnimationComplete(player, () => {
          target.style.display = 'none';
        });
      } else {
        target.style.display = 'none';
        target.style.opacity = 0;
      }
    }
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}


Polymer(ModalClab);
