import {onAnimationComplete} from '../_libs/animations';
import props from './props';
import './view.html';
import '../button';

class AlertClab {
	beforeRegister() {
		this.is = 'alert-clab';
		this.properties = props;
	}

	attached() {
		// Preparing the animations
		if (!this.noAnimation) {
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
					transform: 'translateY(-0.5rem)'
				},
				{
					transform: 'translateY(0)'
				}
			];

			this.alertEnter = target => {
				return new GroupEffect([
					new KeyframeEffect(target, opacity, {
						duration: 180,
						fill: 'forwards',
						direction: 'normal'
					}),
					new KeyframeEffect(target, translateY, {
						duration: 180,
						fill: 'forwards',
						direction: 'normal'
					})
				]);
			};
			this.alertExit = target => {
				return new GroupEffect([
					new KeyframeEffect(target, opacity, {
						duration: 80,
						fill: 'forwards',
						direction: 'reverse'
					}),
					new KeyframeEffect(target, translateY, {
						duration: 80,
						fill: 'forwards',
						direction: 'reverse'
					})
				]);
			};
		}
	}

	/*----------
  	EVENT HANDLERS
  ----------*/
	_handleClick(evt) {
		const type = evt.target.type;
		this.dispatchEvent(
			new CustomEvent(type, {
				bubbles: true,
				composed: true
			})
		);
	}

	_close(evt) {
		this.visible = false;
		this.dispatchEvent(
			new CustomEvent('close', {
				bubbles: true,
				composed: true
			})
		);
	}

	/*----------
  	OBSERVERS
  ----------*/
	_animateShowHide(val, oldval) {
		let target = this.$$('.alert');

		if (val) {
			if (target == null) {
				this.set('_alertStyle', 'display:block; opacity:1');
				return;
			}

			target.style.display = 'block';
			if (!this.noAnimation && oldval != undefined) {
				let animation = this.alertEnter(target);
				let player = document.timeline.play(animation);
			} else {
				target.style.opacity = 1;
			}
		} else {
			if (!this.noAnimation && target != null) {
				let animation = this.alertExit(target);
				let player = document.timeline.play(animation);
				onAnimationComplete(player, () => {
					target.style.display = 'none';
				});
			} else if (target != null) {
				target.style.opacity = 0;
				target.style.display = 'none';
			}
		}
	}

	_computeClasses(type, fixed) {
		const arr = ['alert', type];
		fixed ? arr.push('fixed') : null;
		return arr.join(' ');
	}
}

Polymer(AlertClab);
