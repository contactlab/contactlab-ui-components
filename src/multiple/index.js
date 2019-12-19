import {dashify} from '../_libs/utils';
import props from './props';
import './view.html';
import '../note/';
import '../spinner/';

class MultipleClab {
	get behaviors() {
		return [{dashify}];
	}

	beforeRegister() {
		this.is = 'multiple-clab';
		this.properties = props;
	}

	attached() {
		// Fetch options
		if (this.url != undefined) {
			let timeoutID = window.setTimeout(() => {
				this.spinner = true;
			}, 400);

			fetch(this.url, {
				method: 'GET'
			})
				.then(res => {
					if (res.status !== 200) {
						console.log(
							'Looks like there was a problem. Status Code: ' + res.status
						);

						window.clearTimeout(timeoutID);
						timeoutID = undefined;
						if (this.spinner) this.spinner = false;
						return;
					}
					res.json().then(data => {
						this.set('options', data);
						window.clearTimeout(timeoutID);
						timeoutID = undefined;
						if (this.spinner) this.spinner = false;

						this.async(() => {
							this._setWrapperHeights();
						}, 100);
					});
				})
				.catch(err => {
					console.error('Fetch Error ==> ', err);

					this.type = 'error';
					window.clearTimeout(timeoutID);
					timeoutID = undefined;
					if (this.spinner) this.spinner = false;
				});
		} else {
			this.async(() => {
				this._setWrapperHeights();
			}, 100);
		}

		// Global vars
		this.lastSelected = undefined;
	}

	/*----------
  EVENT HANDLERS
  ----------*/
	_handleSelection(evt) {
		if (this.disabled) return;

		let i = parseInt(evt.target.getAttribute('data-index'));

		if (evt.ctrlKey || (evt.metaKey && navigator.platform === 'MacIntel')) {
			if (this.options[i].selected) {
				return this._removeThis(evt.target);
			} else {
				return this._selectThis(evt.target);
			}
		} else if (evt.shiftKey && typeof this.lastSelected !== undefined) {
			return this._selectThese(evt.target.getAttribute('data-index'));
		}

		this.set(
			'options',
			this.options.map(op =>
				Object.assign({}, op, {
					selected: false
				})
			)
		);
		this.set('selected', []);
		this._selectThis(evt.target);
	}

	_loadContent(evt) {
		if (this.disabled) return;

		let maxScrollable = evt.target.scrollHeight - evt.target.clientHeight;
		if (evt.target.scrollTop == maxScrollable) {
			evt.preventDefault();

			if (typeof this.url !== undefined) {
				//load more content
				let timeoutID = window.setTimeout(() => {
					this.spinner = true;
				}, 400);

				fetch(this.url, {
					method: 'GET'
				}).then(res => {
					if (res.status !== 200) {
						console.log(
							'Looks like there was a problem. Status Code: ' + res.status
						);
						if (typeof timeoutID === 'number') {
							window.clearTimeout(timeoutID);
							timeoutID = undefined;
							this.spinner = false;
						}
						return;
					}
					res.json().then(data => {
						let newData = this.options.concat(data);
						this.set('options', newData);

						if (typeof timeoutID == 'number') {
							window.clearTimeout(timeoutID);
							timeoutID = undefined;
							this.spinner = false;
						}
					});
				});
			}
		}
	}

	/*----------
  METHODS
  ----------*/
	_selectThis(elem) {
		let i = elem.getAttribute('data-index');
		this.push('selected', this.options[i]);
		this.set('options.' + i + '.selected', true);
		this.dispatchEvent(
			new CustomEvent('change', {
				bubbles: true,
				composed: true,
				detail: {
					selected: this.selected
				}
			})
		);
		this.lastSelected = i;
	}

	_removeThis(elem) {
		let i = elem.getAttribute('data-index');
		let temp = this.selected.filter(function(obj) {
			return obj.label !== elem.innerHTML;
		});
		this.set('selected', temp);
		this.set('options.' + i + '.selected', false);
		this.dispatchEvent(
			new CustomEvent('change', {
				bubbles: true,
				composed: true,
				detail: {
					selected: this.selected
				}
			})
		);
		this.lastSelected = undefined;
	}

	_selectThese(lastClicked) {
		let arr = [],
			first,
			last;
		if (this.lastSelected > lastClicked) {
			first = lastClicked;
			last = this.lastSelected;
		} else {
			first = this.lastSelected;
			last = lastClicked;
		}

		for (var i = first; i <= last; i++) {
			arr.push(i);
			if (this.selected.indexOf(this.options[i]) == -1)
				this.push('selected', this.options[i]);
		}

		this._highlightElems(arr);
		this.dispatchEvent(
			new CustomEvent('change', {
				bubbles: true,
				composed: true,
				detail: {
					selected: this.selected
				}
			})
		);
	}

	_highlightElems(idx) {
		this.async(() => {
			idx.map(i => {
				Array.prototype.map.call(
					this.querySelectorAll('.options-list li'),
					el => {
						if (el.getAttribute('data-index') == i) {
							this.set('options.' + i + '.selected', true);
						}
					}
				);
			});
		}, 100);
	}

	/*----------
  OBSERVERS
  ----------*/
	_setOptions(promise) {
		promise().then(resp => {
			this.set('options', resp);
		});
	}

	_disabledChanged(newVal, oldVal) {
		if (newVal) this.type = 'disabled';
	}

	/*----------
  COMPUTED
  ----------*/
	_compWrapperType(type) {
		let arr = ['multiple-wrapper'];
		if (type) arr.push(type);
		return arr.join(' ');
	}

	_computeSelection(selected) {
		let str = '';
		selected ? (str = 'selected') : null;
		return str;
	}

	/*----------
  UTILITIES
  ----------*/
	_setWrapperHeights() {
		if (this.liHeight == undefined) this.liHeight = 35;
		this.querySelector('.options-list').style.maxHeight =
			this.liHeight * this.maxInView + 'px';
	}
}

Polymer(MultipleClab);
