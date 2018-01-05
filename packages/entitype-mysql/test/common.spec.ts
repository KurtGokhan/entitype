import { defineTests as basic } from 'common/test/query/basic/index.spec';
import { defineTests as orderby } from 'common/test/query/basic/orderby.spec';
import { setupConfiguration } from './helper';

basic(setupConfiguration);
orderby(setupConfiguration);
