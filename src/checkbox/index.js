import {dashify} from '../_libs/utils';
import props from './props';
import './view.html';

class CheckboxClab {
	get behaviors() {
		return [{dashify}];
	}

	beforeRegister() {
		this.is = 'checkbox-clab';
		this.properties = props;
	}

	ready() {
		if (typeof label === 'undefined') {
			console.warn('WARNING <checkbox-clab>: "label" not specified');
			return false;
		}
	}

	toggleActive() {
		this.set('active', !this.active);
		return new Promise(resolve => resolve(true));
	}

	_onChange(evt) {
		this.toggleActive().then(res => {
			this.dispatchEvent(
				new CustomEvent('selected-change', {
					bubbles: true,
					composed: true
				})
			);
		});
	}

	_computeType(type) {
		return ['row', type].join(' ');
	}
}

Polymer(CheckboxClab);
