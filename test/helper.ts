import * as chai from 'chai';
import chaiAsPromised = require('chai-as-promised');
import chaiSpies = require('chai-spies');
import chaiString = require('chai-string');

chai.use(chaiString);
chai.use(chaiAsPromised);
chai.use(chaiSpies);
