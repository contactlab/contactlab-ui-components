import props from './props';
import './view.html';

class AccordionClab {
  beforeRegister() {
    this.is = 'accordion-clab';
    this.properties = props;
  }

  attached() {
    this.block = this.querySelector('.accordion-block');
    this.content = this.querySelector('.accordion-content');

    // Preparing the animations
    let height = [{height: '0'}, {height: 'auto'}];
    let margin = [{'margin-bottom': '0'}, {'margin-bottom': '2rem'}];

    this.openAccordion = new GroupEffect([
      new KeyframeEffect(this.content, height, {
        duration: 100,
        fill: 'forwards',
        direction: 'normal'
      }),
      new KeyframeEffect(this.block, margin, {
        duration: 100,
        fill: 'forwards',
        direction: 'normal'
      })
    ]);

    this.closeAccordion = new GroupEffect([
      new KeyframeEffect(this.content, height, {
        duration: 100,
        fill: 'forwards',
        direction: 'reverse'
      }),

      new KeyframeEffect(this.block, margin, {
        duration: 100,
        fill: 'forwards',
        direction: 'reverse'
      })
    ]);
  }

  /*----------
  	OBSERVERS
  ----------*/
  _animateOpenClose(val, old) {
    if (old != undefined) {
      if (val) {
        let player = document.timeline.play(this.openAccordion);
        this.querySelector('.accordion-block').classList.add('active');
        setTimeout(() => {
          this.querySelector('.accordion-content').classList.add('opened');
        }, 110);
        return 'open';
      } else {
        let player = document.timeline.play(this.closeAccordion);
        this.querySelector('.accordion-block').classList.remove('active');
        this.querySelector('.accordion-content').classList.remove('opened');
        return 'close';
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

Polymer(AccordionClab);
