import props from './props';
import './view.html';

class FeatureClab {
	beforeRegister() {
		this.is = 'feature-clab';
		this.properties = props;
	}

	_computeFeatureClass(size, vertical) {
		let arr = ['feature'];
		if (size) arr.push(size);
		if (vertical) arr.push('vertical');
		return arr.join(' ');
	}

	_compDisplay(prop) {
		return prop != null && prop != undefined && prop ? '' : 'display:none';
	}
}

Polymer(FeatureClab);
