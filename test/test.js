import test from 'tape';
import { identity } from '../src/utils/utils';

test('placeholder', (t) => {
  t.plan(1);

  t.equal('xxx', identity('xxx'));
});
