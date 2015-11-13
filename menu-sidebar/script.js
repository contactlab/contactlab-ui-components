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
				$('menu-clab .first-level-menu>li>a').each(function (i, e) {
					if (location.hash.search(e.getAttribute('href')) > -1) {
						e.parentNode.classList.add('active');
					} else {
						e.parentNode.classList.remove('active');
					}
				});

				$('menu-clab .second-level-menu>li>a').each(function (i, e) {
					if (location.hash.search(e.getAttribute('href')) > -1) {
						e.parentNode.classList.add('active');
					} else {
						e.parentNode.classList.remove('active');
					}
				});
			}, 10);
		}
	}, {
		key: '_openItem',
		value: function _openItem(evt) {
			var selector = 'menu-clab .first-level-menu>li>a, menu-clab .second-level-menu>li>a';
			$(selector).each(function (i, e) {
				if (location.hash.search(e.getAttribute('href')) > -1) {
					e.parentNode.classList.add('active');
				} else {
					e.parentNode.classList.remove('active');
				}
			});
			$('menu-clab .first-level-menu>li').each(function (i, e) {
				e.classList.remove('open');
			});
			if (evt.currentTarget.nextElementSibling.tagName === 'UL') {
				evt.preventDefault();
				evt.currentTarget.parentNode.classList.add('open');
				$(selector).each(function (i, e) {
					e.parentNode.classList.remove('active');
				});
				evt.currentTarget.parentNode.classList.add('active');
			}
		}
	}, {
		key: '_activeItem',
		value: function _activeItem(evt) {
			var selector = 'menu-clab .second-level-menu>li>a';
			$(selector).each(function (i, e) {
				e.parentNode.classList.remove('active');
			});
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
						$('menu-clab .first-level-menu>li').each(function (i, e) {
							e.classList.remove('open');
						});
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