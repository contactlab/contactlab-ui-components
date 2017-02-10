/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	module.exports = __webpack_require__(5);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Polymer = exports.Polymer = window.Polymer;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var UtilBehavior = exports.UtilBehavior = {
	
	  _dashify: function _dashify(str) {
	    return str.toLowerCase().replace(/ /g, '-');
	  },
	
	  _viewLabel: function _viewLabel(label, icon) {
	    var bool = false;
	    if (label != undefined && label.length > 0) bool = true;else bool = false;
	    if (icon != undefined && icon.length > 0) bool = true;
	    return bool;
	  },
	
	  _getIndex: function _getIndex(item, items) {
	    return items.indexOf(item);
	  }
	};
	
	var AnimationsBehavior = exports.AnimationsBehavior = {
	
	  _onAnimationComplete: function _onAnimationComplete(elem, fn) {
	    if (elem.finished) {
	      elem.finished.then(fn);
	    } else {
	      elem.onfinish = fn;
	    }
	  }
	};
	
	var DropdownBehavior = exports.DropdownBehavior = {
	  getSelectedLabel: function getSelectedLabel() {
	    return this.selected[this.labelField];
	  },
	
	  getSelectedValue: function getSelectedValue() {
	    return this.selected[this.valueField];
	  },
	
	  setByLabel: function setByLabel(str) {
	    var _this = this;
	
	    this.options.map(function (opt) {
	      if (opt[_this.labelField] === str) {
	        _this._setSelected(opt);
	        return;
	      }
	    });
	  },
	
	  setByValue: function setByValue(str) {
	    var _this2 = this;
	
	    this.options.map(function (opt) {
	      if (opt[_this2.valueField] === str) {
	        _this2._setSelected(opt);
	        return;
	      }
	    });
	  },
	
	  isValorized: function isValorized() {
	    return !this.isNotValorized();
	  },
	
	  isNotValorized: function isNotValorized() {
	    return this.selected === undefined || this.selected === null || this.selected[this.valueField] === undefined || this.selected[this.valueField] === null;
	  },
	
	  setValue: function setValue(obj, prevent) {
	    var _this3 = this;
	
	    prevent = prevent ? true : false;
	    this.preventChange = prevent;
	
	    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
	      this._setSelected(obj);
	    } else {
	      this.options.map(function (opt) {
	        if (opt[_this3.valueField] === obj) {
	          _this3._setSelected(opt);
	          return;
	        }
	      });
	    }
	
	    this.preventChange = false;
	  },
	
	  getValue: function getValue() {
	    var v;
	    if (this.isNotValorized()) {
	      v = undefined;
	    } else if (typeof this.selected === 'string' || this.selected instanceof String) {
	      v = this.selected;
	    } else if (_typeof(this.selected) === "object") {
	      v = this.selected[this.valueField];
	    } else {
	      console.error(this.is + ": Invalid value type [" + _typeof(this.selected) + "]");
	    }
	    return v;
	  },
	
	  getValueObject: function getValueObject() {
	    var _this4 = this;
	
	    var v;
	    if (this.isNotValorized(this.selected)) {
	      v = undefined;
	    } else if (typeof this.selected === 'string' || this.selected instanceof String) {
	      this.options.map(function (opt) {
	        if (opt[_this4.valueField] === _this4.selected) {
	          v = opt;
	          return;
	        }
	      });
	      if (v === undefined) {
	        console.warn(this.is + ": There is no option with value equal to [" + this.selected + "]");
	      }
	    } else if (_typeof(this.selected) === "object") {
	      v = this.selected;
	    } else {
	      console.warn(this.is + ": Invalid value type [" + _typeof(this.selected) + "]");
	    }
	    return v;
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ButtonClab = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _polymer = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ButtonClab = exports.ButtonClab = function () {
	  function ButtonClab() {
	    _classCallCheck(this, ButtonClab);
	  }
	
	  _createClass(ButtonClab, [{
	    key: 'beforeRegister',
	    value: function beforeRegister() {
	      this.is = 'button-clab';
	      this.properties = {
	        /**
	         * `type` additional class for the type of btn
	         */
	        type: {
	          type: String,
	          value: "",
	          reflectToAttribute: true
	        },
	        /**
	         * `appearance` additional class for the type
	         */
	        appearance: {
	          type: String,
	          value: ""
	        },
	        /**
	         * `size` additional class for the size
	         */
	        size: {
	          type: String,
	          value: ""
	        },
	        /**
	         * `type` insert a valid icon class to add an icon
	         */
	        icon: {
	          type: String,
	          value: ""
	        },
	        /**
	         * Whether is disabled or not
	         */
	        disabled: {
	          type: Boolean,
	          value: false,
	          reflectToAttribute: true
	        },
	        /**
	         * If it use block layout (auto width)
	         */
	        block: {
	          type: Boolean,
	          value: false,
	          reflectToAttribute: true
	        }
	      };
	    }
	  }, {
	    key: '_click',
	    value: function _click(evt) {
	      this.dispatchEvent(new CustomEvent('btnclick'), { bubbles: true });
	    }
	
	    /**
	     * Computes the class of the button joining the values of 'type', 'appearence' and 'size'
	     */
	
	  }, {
	    key: '_computeClass',
	    value: function _computeClass(type, appearance, size, block) {
	      var arr = ['btn', type, appearance, size];
	      block ? arr.push('block') : null;
	      return arr.join(' ');
	    }
	
	    /**
	     * Computes the class of the icon if 'icon' has a value
	     */
	
	  }, {
	    key: '_computeIconClass',
	    value: function _computeIconClass(icon) {
	      return ['icon', icon].join(' ');
	    }
	  }]);
	
	  return ButtonClab;
	}();
	
	(0, _polymer.Polymer)(ButtonClab);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CheckboxClab = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _polymer = __webpack_require__(1);
	
	var _behaviors = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CheckboxClab = exports.CheckboxClab = function () {
	  function CheckboxClab() {
	    _classCallCheck(this, CheckboxClab);
	  }
	
	  _createClass(CheckboxClab, [{
	    key: "beforeRegister",
	    value: function beforeRegister() {
	      this.is = "checkbox-clab";
	      this.properties = {
	        /** Label of the checkbox */
	        label: {
	          type: String
	        },
	        /** Wrapper style type */
	        wrapperType: {
	          type: String
	        },
	        /** Determine if the check is checked or not */
	        active: {
	          type: Boolean,
	          value: false
	        },
	        /** Determine if the check is disabled or not */
	        disabled: {
	          type: Boolean,
	          value: false
	        }
	      };
	    }
	
	    /***
	     *     _     _  __
	     *    | |   (_)/ _|
	     *    | |    _| |_ ___
	     *    | |   | |  _/ _ \
	     *    | |___| | ||  __/
	     *    \_____/_|_| \___|
	     *
	     *
	     */
	
	  }, {
	    key: "ready",
	    value: function ready() {
	      if (typeof label === 'undefined') {
	        console.warn('WARNING <checkbox-clab>: "label" not specified');
	        return false;
	      }
	    }
	
	    /***
	     *    ___  ___     _   _               _
	     *    |  \/  |    | | | |             | |
	     *    | .  . | ___| |_| |__   ___   __| |___
	     *    | |\/| |/ _ \ __| '_ \ / _ \ / _` / __|
	     *    | |  | |  __/ |_| | | | (_) | (_| \__ \
	     *    \_|  |_/\___|\__|_| |_|\___/ \__,_|___/
	     *
	     *
	     */
	
	    /**
	     * Toggle checked or not of the checkbox
	     */
	
	  }, {
	    key: "toggleActive",
	    value: function toggleActive() {
	      this.set('active', !this.active);
	      return new Promise(function (resolve) {
	        return resolve(true);
	      });
	    }
	
	    /***
	     *    ______     _            _
	     *    | ___ \   (_)          | |
	     *    | |_/ / __ ___   ____ _| |_ ___  ___
	     *    |  __/ '__| \ \ / / _` | __/ _ \/ __|
	     *    | |  | |  | |\ V / (_| | ||  __/\__ \
	     *    \_|  |_|  |_| \_/ \__,_|\__\___||___/
	     *
	     *
	     */
	
	    /***
	     *     _     _     _
	     *    | |   (_)   | |
	     *    | |    _ ___| |_ ___ _ __   ___ _ __ ___
	     *    | |   | / __| __/ _ \ '_ \ / _ \ '__/ __|
	     *    | |___| \__ \ ||  __/ | | |  __/ |  \__ \
	     *    \_____/_|___/\__\___|_| |_|\___|_|  |___/
	     *
	     *
	     */
	
	  }, {
	    key: "_onChange",
	    value: function _onChange(evt) {
	      var _this = this;
	
	      this.toggleActive().then(function (res) {
	        _this.dispatchEvent(new CustomEvent('selected-change'));
	      });
	    }
	
	    /***
	     *     _____                             _
	     *    /  __ \                           | |
	     *    | /  \/ ___  _ __ ___  _ __  _   _| |_ ___ _ __ ___
	     *    | |    / _ \| '_ ` _ \| '_ \| | | | __/ _ \ '__/ __|
	     *    | \__/\ (_) | | | | | | |_) | |_| | ||  __/ |  \__ \
	     *     \____/\___/|_| |_| |_| .__/ \__,_|\__\___|_|  |___/
	     *                          | |
	     *                          |_|
	     */
	
	    /**
	     * Compute style of the wrapper
	     */
	
	  }, {
	    key: "_computeType",
	    value: function _computeType(type) {
	      return ['row', type].join(' ');
	    }
	  }, {
	    key: "behaviors",
	    get: function get() {
	      return [_behaviors.UtilBehavior];
	    }
	  }]);
	
	  return CheckboxClab;
	}();
	
	(0, _polymer.Polymer)(CheckboxClab);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ModalClab = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _polymer = __webpack_require__(1);
	
	var _behaviors = __webpack_require__(2);
	
	var _script = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ModalClab = exports.ModalClab = function () {
		function ModalClab() {
			_classCallCheck(this, ModalClab);
		}
	
		_createClass(ModalClab, [{
			key: "beforeRegister",
			value: function beforeRegister() {
				this.is = 'modal-clab';
				this.properties = {
					title: {
						type: String,
						value: 'Modal title'
					},
					visible: {
						type: Boolean,
						value: false,
						observer: '_animateShowHide'
					},
					primary: {
						type: String,
						value: null
					},
					secondary: {
						type: String,
						value: null
					},
					warning: {
						type: String,
						value: null
					},
					primaryDisabled: {
						type: Boolean,
						value: false
					},
					content: {
						type: String,
						value: null
					},
					stopClose: {
						type: Boolean,
						value: false
					},
					width: {
						type: Number,
						value: 840
					},
					noAnimation: {
						type: Boolean,
						value: false
					},
					noActions: {
						type: Boolean,
						value: false
					}
				};
			}
		}, {
			key: "attached",
			value: function attached() {
				var _this = this;
	
				// Preparing the animations
				if (!this.noAnimation) {
					(function () {
						var opacity = [{
							opacity: 0
						}, {
							opacity: 1
						}];
						var scale = [{
							transform: 'scale(.95)'
						}, {
							transform: 'scale(1)'
						}];
	
						_this.modalEnter = function (target) {
							return new GroupEffect([new KeyframeEffect(target, opacity, {
								duration: 190,
								fill: 'forwards',
								direction: 'normal'
							}), new KeyframeEffect(_this.querySelector('.modal'), scale, {
								duration: 190,
								fill: 'forwards',
								direction: 'normal'
							})]);
						};
						_this.modalExit = function (target) {
							return new GroupEffect([new KeyframeEffect(target, opacity, {
								duration: 150,
								fill: 'forwards',
								direction: 'reverse'
							}), new KeyframeEffect(_this.querySelector('.modal'), scale, {
								duration: 150,
								fill: 'forwards',
								direction: 'reverse'
							})]);
						};
					})();
				}
			}
		}, {
			key: "detached",
			value: function detached() {
				document.querySelector('body').classList.remove('no-scroll');
			}
		}, {
			key: "_computeWidth",
			value: function _computeWidth(width) {
				var str = 'max-width:' + width + 'px';
				return str;
			}
	
			/*----------
	  	EVENT HANDLERS
	  ----------*/
	
		}, {
			key: "_closeModal",
			value: function _closeModal(evt) {
				evt.stopPropagation();
				if (!this.stopClose) this.visible = false;
				this.dispatchEvent(new CustomEvent('close'), {
					bubbles: true
				});
			}
		}, {
			key: "_block",
			value: function _block(evt) {
				evt.stopPropagation();
			}
		}, {
			key: "_primaryAction",
			value: function _primaryAction(evt) {
				this.dispatchEvent(new CustomEvent('modal-primary'), {
					bubbles: true
				});
			}
		}, {
			key: "_secondaryAction",
			value: function _secondaryAction(evt) {
				this.dispatchEvent(new CustomEvent('modal-secondary'), {
					bubbles: true
				});
			}
		}, {
			key: "_warningAction",
			value: function _warningAction(evt) {
				this.dispatchEvent(new CustomEvent('modal-warning'), {
					bubbles: true
				});
			}
	
			/*----------
	  	OBSERVERS
	  ----------*/
	
		}, {
			key: "_animateShowHide",
			value: function _animateShowHide(val, oldval) {
				var target = this.querySelector('.modal-overlay');
	
				if (oldval != undefined) {
					if (val) {
						document.querySelector('body').classList.add('no-scroll');
						target.style.display = 'block';
						if (!this.noAnimation) {
							var animation = this.modalEnter(target);
							var player = document.timeline.play(animation);
						} else {
							target.style.opacity = 1;
						}
					} else {
						document.querySelector('body').classList.remove('no-scroll');
						if (!this.noAnimation) {
							var _animation = this.modalExit(target);
							var _player = document.timeline.play(_animation);
							this._onAnimationComplete(_player, function () {
								target.style.display = 'none';
							});
						} else {
							target.style.display = 'none';
							target.style.opacity = 0;
						}
					}
				}
			}
	
			/*----------
	  	PUBLIC
	  ----------*/
	
		}, {
			key: "show",
			value: function show() {
				this.visible = true;
			}
		}, {
			key: "hide",
			value: function hide() {
				this.visible = false;
			}
		}, {
			key: "behaviors",
			get: function get() {
				return [_behaviors.AnimationsBehavior];
			}
		}]);
	
		return ModalClab;
	}();
	
	(0, _polymer.Polymer)(ModalClab);

/***/ }
/******/ ]);
//# sourceMappingURL=bundle-custom.js.map