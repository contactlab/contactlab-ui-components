import test from 'ava';
import props from '../props';
import {_computeClass, _computeIconClass} from '../methods/internal';

const element = '<button-clab>';

test(`${element} properties: types & default values`, t => {
	t.is(props.type.type, String);
	t.is(props.type.value, '');
	t.is(props.type.reflectToAttribute, true);

	t.is(props.appearance.type, String);
	t.is(props.appearance.value, '');

	t.is(props.size.type, String);
	t.is(props.size.value, '');

	t.is(props.icon.type, String);
	t.is(props.icon.value, '');

	t.is(props.disabled.type, Boolean);
	t.is(props.disabled.value, false);
	t.is(props.disabled.reflectToAttribute, true);

	t.is(props.buttonType.type, String);
	t.is(props.buttonType.value, 'button');
});

test(`${element} _computeClass`, t => {
	const type = 'type';
	const appearance = 'appearance';
	const size = 'size';
	t.is(_computeClass(), 'btn   ');
	t.is(_computeClass(type), `btn ${type}  `);
	t.is(_computeClass(null, appearance), `btn  ${appearance} `);
	t.is(_computeClass(null, null, size), `btn   ${size}`);
	t.is(_computeClass(null, null, null, true), `btn    block`);
	t.is(
		_computeClass(type, appearance, size, true),
		`btn ${type} ${appearance} ${size} block`
	);
});

test(`${element} _computeIconClass`, t => {
	const str = 'test';
	t.is(_computeIconClass(), 'icon ');
	t.is(_computeIconClass(str), `icon ${str}`);
});
