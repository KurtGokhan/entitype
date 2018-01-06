import * as chaiCore from 'chai';
import chaiAsPromised = require('chai-as-promised');
import chaiSpies = require('chai-spies');
import chaiString = require('chai-string');
import satisfySql from './satisfy-sql';

chaiCore.use(chaiString);
chaiCore.use(chaiAsPromised);
chaiCore.use(chaiSpies);
chaiCore.use(satisfySql);
