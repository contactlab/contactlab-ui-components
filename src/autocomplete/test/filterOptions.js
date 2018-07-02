import test from 'ava';
import filterOptions from '../libs/filterOptions';

const options = [
  { label: 'ciccio', value: 1 },
  { label: '[puzzo', value: 2 },
  { label: 'figa+', value: 9999 }
];

test('filterOptions - true', t => {
  t.is(
    filterOptions(true, 'ci', 'label', options)[0].label,
    'ciccio'
  );
  t.is(
    filterOptions(true, 'pu', 'label', options)[0].label,
    '[puzzo'
  );
  t.is(
    filterOptions(true, '[pu', 'label', options)[0].label,
    '[puzzo'
  );
  t.is(
    filterOptions(true, '+', 'label', options)[0].label,
    'figa+'
  );
  t.is(
    filterOptions(true, '[ci', 'label', options).length,
    0
  );
});

test('filterOptions - false', t => {
  t.is(filterOptions(false, 'ci', 'label', options).length, options.length);
});
