import test from 'tape';
import { identity } from '../app/utils/utils';

test('placeholder', (t) => {
  t.plan(1);

  t.equal('xxx', identity('xxx'));
});
