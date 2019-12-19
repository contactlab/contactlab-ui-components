import {_computeRangeWrapperClasses, _compDisabled} from './methods/internal';
import {dashify, viewLabel} from '../_libs/utils';
import props from './props';
import './view.html';

class RangeClab {
	get behaviors() {
		return [{dashify, viewLabel, _computeRangeWrapperClasses, _compDisabled}];
	}

	beforeRegister() {
		this.is = 'range-clab';
		this.properties = props;
	}

	_updateCompValue(evt) {
		return (this.value = parseInt(evt.currentTarget.value));
	}
}

Polymer(RangeClab);
