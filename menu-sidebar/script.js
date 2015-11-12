'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MenuClab = (function () {
	function MenuClab() {
		_classCallCheck(this, MenuClab);
	}

	_createClass(MenuClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = 'menu-clab';
			this.properties = {
				title: {
					type: String,
					value: 'Title'
				},
				titleIcon: {
					type: String,
					value: 'fa-hand-peace-o'
				},
				reduceText: {
					type: String,
					value: 'Riduci menu'
				},
				reduceOpen: {
					type: String,
					value: 'clab clab-icon-expand expand'
				},
				reduceClose: {
					type: String,
					value: 'clab clab-icon-resize compress'
				},
				menu: {
					type: Array,
					value: []
				}
			};
		}
	}, {
		key: 'attached',
		value: function attached() {
			this._iosMenu();

			setTimeout(function () {
				var firstLevelA = $('menu-clab .first-level-menu>li>a');
				var secondLevelA = $('menu-clab .second-level-menu>li>a');

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = firstLevelA[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var e = _step.value;

						if (location.hash.search(e.getAttribute('href')) > -1) e.parentNode.classList.add('active');else e.parentNode.classList.remove('active');
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = secondLevelA[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var e = _step2.value;

						if (location.hash.search(e.getAttribute('href')) > -1) e.parentNode.classList.add('active');else e.parentNode.classList.remove('active');
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}, 10);
		}
	}, {
		key: '_openItem',
		value: function _openItem(evt) {
			var selector = 'menu-clab .first-level-menu>li>a, menu-clab .second-level-menu>li>a';
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = $(selector)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var e = _step3.value;

					if (location.hash.search(e.getAttribute('href')) > -1) e.parentNode.classList.add('active');else e.parentNode.classList.remove('active');
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;

			try {
				for (var _iterator4 = $('menu-clab .first-level-menu>li')[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var e = _step4.value;

					e.classList.remove('open');
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}

			if (evt.currentTarget.nextElementSibling.tagName === 'UL') {
				evt.preventDefault();
				evt.currentTarget.parentNode.classList.add('open');
				var _iteratorNormalCompletion5 = true;
				var _didIteratorError5 = false;
				var _iteratorError5 = undefined;

				try {
					for (var _iterator5 = $(selector)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
						var e = _step5.value;

						e.parentNode.classList.remove('active');
					}
				} catch (err) {
					_didIteratorError5 = true;
					_iteratorError5 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion5 && _iterator5.return) {
							_iterator5.return();
						}
					} finally {
						if (_didIteratorError5) {
							throw _iteratorError5;
						}
					}
				}

				evt.currentTarget.parentNode.classList.add('active');
			}
		}
	}, {
		key: '_activeItem',
		value: function _activeItem(evt) {
			var selector = 'menu-clab .second-level-menu>li>a';
			var _iteratorNormalCompletion6 = true;
			var _didIteratorError6 = false;
			var _iteratorError6 = undefined;

			try {
				for (var _iterator6 = $(selector)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
					var e = _step6.value;

					e.parentNode.classList.remove('active');
				}
			} catch (err) {
				_didIteratorError6 = true;
				_iteratorError6 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion6 && _iterator6.return) {
						_iterator6.return();
					}
				} finally {
					if (_didIteratorError6) {
						throw _iteratorError6;
					}
				}
			}

			evt.currentTarget.parentNode.classList.add('active');
		}
	}, {
		key: '_iosMenu',
		value: function _iosMenu() {
			$('body main').on('click', function (evt) {
				switch (evt.target.nodeName) {
					case 'INPUT':
					case 'BUTTON':
					case 'TEXTAREA':
					case 'LABEL':
					case 'SELECT':
						return true;
						break;
					default:
						document.querySelector('#logo a').focus();
						var _iteratorNormalCompletion7 = true;
						var _didIteratorError7 = false;
						var _iteratorError7 = undefined;

						try {
							for (var _iterator7 = $('menu-clab .first-level-menu>li')[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
								var e = _step7.value;

								e.classList.remove('open');
							}
						} catch (err) {
							_didIteratorError7 = true;
							_iteratorError7 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion7 && _iterator7.return) {
									_iterator7.return();
								}
							} finally {
								if (_didIteratorError7) {
									throw _iteratorError7;
								}
							}
						}

						break;
				}
			});
		}
	}, {
		key: '_reduce',
		value: function _reduce() {
			document.body.classList.toggle('main-sidebar-small');
		}
	}, {
		key: '_computeTitleIcon',
		value: function _computeTitleIcon(icon) {
			return ['clab', icon].join(' ');
		}
	}, {
		key: '_computeReduceIcons',
		value: function _computeReduceIcons(classes) {
			return classes;
		}
	}]);

	return MenuClab;
})();

Polymer(MenuClab);