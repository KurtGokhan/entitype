import { defineTests as edit } from './basic/edit.spec';
import { defineTests as basic } from './basic/index.spec';
import { defineTests as orderby } from './basic/orderby.spec';
import { defineTests as escape } from './escape/index.spec';
import { defineTests as manyToMany } from './many-to-many/index.spec';
import { defineTests as oneToOne } from './one-to-one/basic.spec';

import { defineTests as boolTest } from './where/boolean.spec';
import { defineTests as combine } from './where/combine.spec';
import { defineTests as comparison } from './where/comparison.spec';
import { defineTests as equality } from './where/equality.spec';
import { defineTests as error } from './where/error.spec';
import { defineTests as inTest } from './where/in.spec';
import { defineTests as like } from './where/like.spec';
import { defineTests as nullTest } from './where/null.spec';
import { defineTests as count } from './where/with-count.spec';


export function defineTests(setupConfiguration: () => void) {
  basic(setupConfiguration);
  orderby(setupConfiguration);
  edit(setupConfiguration);
  escape(setupConfiguration);
  manyToMany(setupConfiguration);
  oneToOne(setupConfiguration);

  boolTest(setupConfiguration);
  combine(setupConfiguration);
  comparison(setupConfiguration);
  equality(setupConfiguration);
  error(setupConfiguration);
  inTest(setupConfiguration);
  like(setupConfiguration);
  nullTest(setupConfiguration);
  count(setupConfiguration);
}
