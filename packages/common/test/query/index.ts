import { useConfiguration } from 'entitype';

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


export function defineTests(adapterName: string) {
  let setupConfiguration = () => {
    useConfiguration({ adapter: adapterName });
  };

  basic(adapterName, setupConfiguration);
  orderby(adapterName, setupConfiguration);
  edit(adapterName, setupConfiguration);
  escape(adapterName, setupConfiguration);
  manyToMany(adapterName, setupConfiguration);
  oneToOne(adapterName, setupConfiguration);

  boolTest(adapterName, setupConfiguration);
  combine(adapterName, setupConfiguration);
  comparison(adapterName, setupConfiguration);
  equality(adapterName, setupConfiguration);
  error(adapterName, setupConfiguration);
  inTest(adapterName, setupConfiguration);
  like(adapterName, setupConfiguration);
  nullTest(adapterName, setupConfiguration);
  count(adapterName, setupConfiguration);
}
